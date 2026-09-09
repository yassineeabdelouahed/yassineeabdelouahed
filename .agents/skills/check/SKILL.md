---
name: check
description: "Exécuter la porte qualité unifiée de pré-publication sur le contenu marketing — encapsule scripts/eval-runner.py pour noter le risque d'hallucination, la justification des déclarations (avec --evidence), l'adéquation à la voix de marque (avec --brand), la structure (avec --schema), la qualité du contenu et la lisibilité, plus une vérification de provenance C2PA pour les actifs IA dans les campagnes ciblant l'UE ; renvoie un score composite avec une décision PASS / WARN / BLOCKED et des suggestions de correction par problème. Se contente de rendre compte — ne modifie jamais le contenu. Se déclenche sur \"/digital-marketing-pro:check\", \"is this safe to publish\", \"run a hallucination check on this draft\", \"validate this copy against the brand voice\", \"pre-publish quality gate\". Résout automatiquement le profil de marque actif ; se combine avec /digital-marketing-pro:c2pa-metadata pour corriger les manifestes manquants."
user-invocable: true
triggers:
  - check this content before publishing
  - run the eval suite on this draft
  - validate this marketing copy
  - pre-publish quality gate
  - hallucination check
  - dm check
  - eval my content
  - is this safe to publish
allowed-tools: Read Bash Glob Grep
---

# /digital-marketing-pro:check — Porte qualité unifiée de pré-publication

Cette compétence est la porte de référence de pré-publication pour le contenu marketing. Elle encapsule la suite d'évaluation (`scripts/eval-runner.py`) et produit une décision unique de réussite/échec avec des problèmes actionnables.

## Efficacité du contexte

Compétence lourde. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement les plages trouvées avec `offset` + `limit`. Listez l'espace de travail de la marque dans `~/.claude-marketing/brands/{slug}/` (ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` quand cette variable d'environnement est définie) avant d'ouvrir les fichiers. En cas de ré-invocation en cours de session, ignorez les fichiers déjà en contexte.

Utilisez cette compétence **avant de publier tout contenu marketing** — articles de blog, textes publicitaires, e-mails, posts sociaux, landing pages, communiqués de presse, ou tout texte de marque.

## Pourquoi cette compétence existe

Une version antérieure livrait un hook global PreToolUse qui exécutait automatiquement une vérification d'hallucination + de conformité de marque sur chaque opération Write/Edit dans chaque projet. Ce hook a été retiré car il se déclenchait globalement sur tous les plugins et projets (écritures Slack, PR GitHub, modifications de code — tout y passait), créant de la friction dans le travail non marketing.

`/digital-marketing-pro:check` remplace cette porte automatique par une **porte explicitement invoquée par l'utilisateur**. Le travail est le même ; le déclenchement est intentionnel.

## Ce que la vérification évalue

La vérification délègue à `scripts/eval-runner.py` (l'orchestrateur d'évaluation maître) qui appelle quatre scripts satellites :

| Dimension | Script | Ce qui est vérifié |
|---|---|---|
| **Hallucination** | `hallucination-detector.py` | Statistiques non attribuées, URL de substitution (example.com / your-site.com), superlatifs non étayés (« meilleur », « n°1 », « leader »), citations fabriquées |
| **Déclarations** | `claim-verifier.py` (quand `--evidence` est fourni) | Recoupe des déclarations spécifiques avec un fichier de preuves fourni par l'utilisateur |
| **Voix de marque** | `brand-voice-scorer.py` (quand `--brand` est fourni) | Note le contenu par rapport au profil de voix de la marque active (formalité, énergie, humour, autorité, listes de mots préférés/à éviter) |
| **Structure** | `output-validator.py` (quand `--schema` est fourni) | Vérifie que le contenu correspond au schéma attendu (blog_post, email, ad_copy, social_post, landing_page, press_release, content_brief, campaign_plan) |
| **Provenance C2PA** (conformité) | `embed-c2pa.py` (vérification de présence) | Quand les `target_markets` de la marque incluent une juridiction UE/EEE ET qu'un actif accompagnant est généré par IA : vérifie qu'un manifeste de provenance C2PA est présent et valide. Manifeste manquant ou invalide → **CRITIQUE / BLOCKED** (article 50 de l'AI Act européen, applicable à partir du 2 août 2026) |

Plus la notation de qualité de contenu et de lisibilité (toujours exécutée).

## Sous-commandes et modes

### Par défaut (run-quick)

```
/digital-marketing-pro:check <file-path-or-content>
```

Exécute l'**évaluation rapide** : détection d'hallucination + qualité de contenu + lisibilité. Rapide (~2 secondes), zéro dépendance externe. À utiliser pour les vérifications de routine.

### Évaluation complète (run-full)

```
/digital-marketing-pro:check <file-path-or-content> --full
```

Exécute les 6 dimensions : hallucination + déclarations (si preuve fournie) + voix de marque (si marque fournie) + structure (si schéma fourni) + qualité de contenu + lisibilité. À utiliser avant de publier tout ce qui est destiné au client ou à l'externe.

### Axé conformité (run-compliance)

```
/digital-marketing-pro:check <file-path-or-content> --compliance --brand <slug> [--evidence <path>] [--schema <name>]
```

Exécute hallucination + déclarations + voix de marque + structure. Idéal pour les secteurs réglementés (santé, services financiers, alcool, cannabis, jeux d'argent) où la justification des déclarations et la fidélité à la voix de marque comptent le plus.

### Avec fichier de preuves

```
/digital-marketing-pro:check <file-path> --evidence <evidence-file.json>
```

Quand le contenu fait des déclarations spécifiques que vous voulez justifier, fournissez un fichier de preuves JSON :

```json
{
  "evidence": [
    {
      "claim": "50% increase in conversions",
      "source": "GA4 Q4 report",
      "date": "2025-12-31",
      "verified": true
    },
    {
      "claim": "Trusted by Fortune 500 companies",
      "source": "Customer roster (internal)",
      "date": "2026-04-01",
      "verified": true
    }
  ]
}
```

La vérification extraira chaque déclaration du contenu et signalera celles qui ne correspondent à aucune entrée de preuve.

### Avec validation de schéma

```
/digital-marketing-pro:check <file-path> --schema blog_post
```

Vérifie que le contenu correspond aux exigences structurelles du schéma nommé. Schémas disponibles : `blog_post`, `email`, `ad_copy`, `social_post`, `landing_page`, `press_release`, `content_brief`, `campaign_plan`. Utilisez `--schema list` pour voir tous les schémas avec leurs exigences.

### Avec vérification de la voix de marque

```
/digital-marketing-pro:check <file-path> --brand acme
```

Note le contenu par rapport au profil de voix de marque dans `~/.claude-marketing/brands/acme/profile.json`. Rapporte une répartition par dimension (formalité, énergie, humour, autorité) plus l'écart par rapport aux listes de mots préférés/à éviter.

## Format de sortie

La vérification renvoie un rapport unifié :

```
DM CHECK REPORT — <file or content snippet>
=============================================

Composite Score: 73.4 / 100  (Grade: B-)
Auto-Reject: NO

Dimensions:
  Hallucination ............ 96/100  PASS  (weight 0.40)
  Content Quality .......... 78/100  PASS  (weight 0.35)
  Readability .............. 65/100  PASS  (weight 0.25)

Issues Found:
  CRITICAL: None
  WARNING (2):
    - Line 14: Unattributed statistic "76% of buyers prefer..."
      Suggestion: cite source or rephrase as observation
    - Line 22: Superlative "best in class" without substantiation
      Suggestion: replace with measurable claim or proof point

Decision: PASS — safe to publish but address WARNINGs first
```

Si un problème CRITIQUE est trouvé, la décision = **BLOCKED** et l'utilisateur doit corriger avant de publier.

## Détections de « tells » IA (section consultative, jamais notée)

En parallèle des scoreurs d'eval-runner, exécutez les deux détections de tells et rapportez-les comme une unique section CONSULTATIVE dans la sortie de la vérification :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/ai-tell-scan.py"          --file <input>   # Tier 1: surface
python "${CLAUDE_PLUGIN_ROOT}/scripts/structural-tell-scan.py"  --file <input>   # Tier 2: structure
```

- **Niveau 1 (surface)** — vocabulaire privilégié par les LLM, marqueurs de portée significative, grappes d'adverbes atténuants, ouvertures connectives et participiales, densité de tirets cadratins, phrases isolées non étayées. Rapportez la notation globale FAIBLE/MODÉRÉE/ÉLEVÉE et les phrases signalées avec leur correction suggérée. Les marqueurs de portée significative sont rapportés avec `"fix": "Delete this sentence; do not reword it."` — transmettez cela mot pour mot, car reformuler n'est pas le bon remède.
- **Niveau 2 (structure)** — la bande globale OK/NOTE/ATTENTION plus chaque constat NOTE/ATTENTION avec ses portées (moralisation, symétrie des sections, titres parallèles, spécificité, positionnement, régularité des paragraphes, développement d'entités). Pour `entity_development`, transmettez toujours que la correction consiste à développer un élément spécifique existant, jamais à supprimer des éléments spécifiques.

**Cette section entière n'affecte JAMAIS la décision PASS/WARN/BLOCKED.** Les deux scripts gardent leurs seuils en interne, délibérément en dehors de la configuration d'évaluation, car ce sont des jugements éditoriaux destinés à un relecteur humain, pas des portes de publication — et parce qu'un détecteur proxy a un vrai taux de faux positifs sur de l'écriture authentiquement humaine. (Le seul endroit où une détection de tell fait office de porte est le `humanize_passed` du content-engine, et uniquement sur les deux tells assez précis pour servir de porte : `significance_marker` et `soft_adverb_cluster`. `llm_favored_word` a été retiré de cet ensemble le 2026-08-15 après qu'on a mesuré qu'il ne se déclenchait **que** sur de la prose publiée avant l'existence de ChatGPT et jamais sur de la prose de modèle. Cette porte est un plancher de densité — mesuré, il n'échoue sur aucune écriture humaine publiée et n'attrape aucune prose de modèle non éditée — donc ne rapportez jamais une réussite comme preuve qu'un texte se lit comme humain.) Les deux détections ne mesurent que le texte visible ; aucune ne peut voir, et aucune n'a de rapport avec, un quelconque filigrane statistique.

## Article 50 de l'AI Act européen — porte de provenance C2PA

La vérification gagne une dimension de conformité pour les actifs générés par IA dans les campagnes ciblant l'UE. Elle se déclenche quand **les deux** conditions sont réunies :

1. Les `target_markets` du profil actif (ou de `--brand`) incluent une juridiction UE/EEE, **et**
2. Un actif accompagnant est déclaré généré par IA — soit les métadonnées du fichier l'indiquent, soit le JSON `--evidence` déclare `ai_generated: true` pour cet actif.

Quand les deux sont réunies, la porte exécute une vérification de présence de manifeste C2PA sur l'actif via `embed-c2pa.py` (mode présence/vérification — il ne modifie pas l'actif). Un **manifeste de provenance C2PA manquant ou invalide est un problème CRITIQUE → décision = BLOCKED.** L'article 50 s'applique à partir du **2 août 2026** (sanction jusqu'à 15 M€ ou 3 % du chiffre d'affaires mondial). Pour intégrer un manifeste conforme, exécutez `/digital-marketing-pro:c2pa-metadata`.

Si `embed-c2pa.py` n'est pas présent dans l'inventaire de scripts ou si l'actif ne peut pas être résolu, affichez la dimension comme SKIPPED avec un avertissement (ne faites jamais silencieusement PASS une vérification d'actif IA pour l'UE).

## Fonctionnement de la compétence

La compétence suit ce déroulé :

1. **Résoudre l'entrée.** Si l'utilisateur a passé un chemin de fichier, lisez-le. S'il a passé du contenu en ligne, utilisez-le.
2. **Résoudre les options.** Si `--brand` n'est pas spécifié, tentez de le charger depuis la marque active dans `~/.claude-marketing/brands/_active-brand.json`. Si `--schema` n'est pas spécifié, déduisez-le du type de contenu si évident (markdown de blog → `blog_post`, etc.) ou sautez la vérification de structure.
3. **Construire la commande eval-runner.** Choisissez l'action : `run-quick` (par défaut), `run-full` (avec `--full`), `run-compliance` (avec `--compliance`).
4. **Exécuter via Bash.**
   ```
   python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --action run-quick --file <input> [--brand <slug>] [--evidence <path>] [--schema <name>]
   ```
5. **Analyser la sortie JSON.** Extrayez le score composite, la note, les scores par dimension, les alertes, la décision de rejet automatique.
6. **Mettre en forme pour l'utilisateur.** Présentez le rapport lisible par un humain montré ci-dessus. Commencez par la décision (PASS / WARN / BLOCKED).
7. **Si BLOCKED, refusez de recommander la publication.** Exigez toujours que l'utilisateur traite les problèmes CRITIQUES avant de continuer.

## Scripts appelés

- `scripts/eval-runner.py` — orchestrateur maître
- `scripts/hallucination-detector.py` — invoqué par eval-runner
- `scripts/claim-verifier.py` — invoqué par eval-runner si `--evidence` fourni
- `scripts/brand-voice-scorer.py` — invoqué par eval-runner si `--brand` fourni
- `scripts/output-validator.py` — invoqué par eval-runner si `--schema` fourni
- `scripts/content-scorer.py` — invoqué par eval-runner
- `scripts/readability-analyzer.py` — invoqué par eval-runner
- `scripts/embed-c2pa.py` — vérification de présence/validation pour la porte C2PA de l'article 50 de l'AI Act européen (uniquement quand une marque ciblant l'UE a un actif généré par IA)

Tous les scripts utilisent uniquement la bibliothèque standard (sauf brand-voice-scorer qui utilise éventuellement nltk). Aucun appel API externe, aucun accès internet requis.

## Exemples

### Exemple 1 : vérification rapide sur un brouillon

```
User: /digital-marketing-pro:check drafts/q2-launch-blog.md

Skill:
1. Read drafts/q2-launch-blog.md
2. Run python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --action run-quick --file drafts/q2-launch-blog.md
3. Parse JSON output:
   composite_score: 81.2, grade: B+, auto_rejected: false
   hallucination: 92/100 pass, content_quality: 76/100 pass, readability: 84/100 pass
   alerts: 1 warning ("unattributed stat in line 14")
4. Format report:

DM CHECK REPORT — drafts/q2-launch-blog.md
============================================
Composite Score: 81.2 / 100  (Grade: B+)
Decision: PASS

Dimensions:
  Hallucination ......... 92/100  pass
  Content Quality ....... 76/100  pass
  Readability ........... 84/100  pass

Issues Found:
  WARNING (1):
    - Line 14: Unattributed statistic "76% of marketers say..."
      Suggestion: cite source or rephrase as observation

Decision: PASS — safe to publish; recommend addressing the WARNING first.
```

### Exemple 2 : évaluation complète avec marque + preuve + schéma

```
User: /digital-marketing-pro:check drafts/healthcare-ad.md --full --brand healthfirst --evidence facts/q2-claims.json --schema ad_copy

Skill:
1. Read drafts/healthcare-ad.md
2. Run python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --action run-full --file drafts/healthcare-ad.md --brand healthfirst --evidence facts/q2-claims.json --schema ad_copy
3. Parse JSON output. Composite: 58.4, grade: D+, auto_rejected: true
4. Format report with CRITICAL issues highlighted
5. Decision: BLOCKED. Two unattributed health claims need substantiation before this can publish.
```

### Exemple 3 : vérification de conformité sur du contenu réglementé

```
User: /digital-marketing-pro:check drafts/financial-services-landing.md --compliance --brand finadvisor --evidence facts/finra-disclosures.json

Skill:
1. Read content
2. Run python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --action run-compliance --file drafts/financial-services-landing.md --brand finadvisor --evidence facts/finra-disclosures.json
3. Output prioritises hallucination + claim verification + brand voice + structure
4. Returns decision with FINRA-relevant issues highlighted
```

### Exemple 4 : vérification rapide sur du contenu en ligne

```
User: /digital-marketing-pro:check "Our amazing product boosts conversion by 347% — visit example.com today!"

Skill:
1. Detect inline content (not a file path)
2. Write content to a temp file
3. Run quick eval
4. Report:
   CRITICAL: 2
     - Placeholder URL "example.com" — replace with real URL before publishing
     - Unattributed statistic "347%" — fabricated stat or missing citation
   Decision: BLOCKED
```

## Quel mode utiliser selon le scénario

| Scénario | Mode recommandé |
|---|---|
| Vérification de contenu de routine pendant la rédaction | `/digital-marketing-pro:check <file>` (rapide) |
| Avant de publier tout contenu externe | `/digital-marketing-pro:check <file> --full --brand <slug>` |
| Contenu de secteur réglementé (santé / financier / alcool / cannabis / jeux d'argent) | `/digital-marketing-pro:check <file> --compliance --brand <slug> --evidence <facts>` |
| Livrable orienté client (Growth Plan, Yearly Planner, rapport mensuel) | `/digital-marketing-pro:check <file> --full --brand <slug>` |
| Texte publicitaire spécifiquement | `/digital-marketing-pro:check <file> --schema ad_copy --brand <slug>` |
| E-mail spécifiquement | `/digital-marketing-pro:check <file> --schema email --brand <slug>` |
| Article de blog spécifiquement | `/digital-marketing-pro:check <file> --schema blog_post --brand <slug>` |

## Règles de comportement

1. **Ne jamais rapporter PASS s'il y a des problèmes CRITIQUES.** Toujours BLOCKED.
2. **Toujours rapporter le score composite et la note.** Même en cas de PASS, mettez en avant les marges d'amélioration.
3. **Toujours inclure des suggestions actionnables.** Chaque problème doit être associé à une recommandation de correction.
4. **Résoudre la marque active si non spécifiée.** Vérifiez `~/.claude-marketing/brands/_active-brand.json`. Si aucune marque active, exécutez sans `--brand` (sautez la dimension voix de marque).
5. **Ne jamais modifier le contenu.** Cette compétence ne fait que rapporter — l'utilisateur (ou l'agent qui a produit le contenu) effectue la correction.
6. **Signaler explicitement les dimensions ignorées.** Si l'utilisateur n'a pas fourni `--evidence` ou `--schema`, notez que les dimensions correspondantes ont été ignorées.

## Compétences et commandes associées

- `/digital-marketing-pro:engagement growth-plan` — produit le livrable de la Partie 8 ; devrait être vérifié avec `/digital-marketing-pro:check --full --schema content_brief` avant livraison client
- `/digital-marketing-pro:content-engine` — produit du contenu marketing ; le flux de travail recommandé est `/digital-marketing-pro:content-engine` → relecture → `/digital-marketing-pro:check` → publication
- `/digital-marketing-pro:eval-content` — alias hérité qui redirige vers cette compétence

## Références associées

- `scripts/eval-runner.py` — l'orchestrateur maître que cette compétence encapsule
- `skills/context-engine/eval-framework-guide.md` — documentation complète du cadre d'évaluation
- `skills/context-engine/eval-rubrics.md` — grilles de notation par dimension
- `docs/architecture.md` Section 16 (Couche d'évaluation) — architecture du cadre d'évaluation

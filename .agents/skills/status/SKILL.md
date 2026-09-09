---
name: status
description: "Affiche un instantané de statut en lecture seule de la marque active via scripts/dm-status.py : résumé de profil, engagements avec la partie actuelle et l'ancienneté de mise à jour, les cinq derniers insights, les violations de conformité récentes, et le mode de dépendance Python — avec les variantes --quiet, --json, --section, et --brand. Se déclenche sur \"/digital-marketing-pro:status\", \"what's my DMP status\", \"what brand am I on\", \"show engagement status\", \"status snapshot\". Ne modifie jamais l'état : changer de marque se fait via /digital-marketing-pro:switch-brand, faire avancer les engagements via /digital-marketing-pro:engagement, le statut des connecteurs via /digital-marketing-pro:integrations, et les vérifications de contenu via /digital-marketing-pro:check."
user-invocable: true
triggers:
  - what's my dmp status
  - show plugin status
  - active brand status
  - dm status
  - what brand am i on
  - show engagement status
  - status snapshot
  - check brand context
allowed-tools: Read Bash Glob Grep
---

# /digital-marketing-pro:status — Instantané de statut unifié

Cette compétence affiche un instantané de statut complet pour la marque Digital Marketing Pro active : résumé de profil, tous les engagements avec leur partie actuelle et leur ancienneté de mise à jour, les insights récents, les violations de conformité récentes, et le mode de dépendance Python.

## Efficacité de contexte

Compétence lourde. **Faites un grep avant tout Read** sur un fichier référencé, puis ne lisez (`Read`) que les plages correspondantes avec `offset` + `limit`. Listez l'espace de travail de la marque dans `~/.claude-marketing/brands/{slug}/` (ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` lorsque cette variable d'environnement est définie) avant d'ouvrir des fichiers. Lors d'une réinvocation en cours de session, ignorez les fichiers déjà en contexte.

Une version antérieure exécutait un hook SessionStart qui lançait `setup.py` à chaque démarrage de session Claude Code pour afficher une bannière récapitulative de marque de 15 lignes. Ce hook a été supprimé car il se déclenchait globalement sur chaque projet, que l'utilisateur fasse ou non du travail marketing. `/digital-marketing-pro:status` en est le remplacement explicite à la demande — une vue plus riche, lorsque vous la demandez.

## Ce qu'elle affiche

L'instantané de statut comporte 5 sections :

| Section | Contenu |
|---|---|
| **Marque** | Nom, slug, secteur (avec drapeau réglementé), modèle économique, dimensions de voix, traits, canaux, langues, marchés, concurrents, objectif principal, drapeau d'enregistrement automatique des insights |
| **Engagements** | Tous les engagements de la marque avec : partie actuelle, comptages terminé/en cours/bloqué, jours depuis la dernière mise à jour, décisions de relance en attente, nombre de documents versionnés |
| **Insights récents** | Les 5 derniers insights capturés avec type, résumé, jours depuis le dernier enregistrement |
| **Violations de conformité récentes** | Les 5 dernières violations avec règle, catégorie, sévérité ; total sur les 30 derniers jours |
| **Dépendances Python** | Version de Python, mode (knowledge-only / lite / full), packages disponibles + manquants |

## Sous-commandes et modes

### Par défaut

```
/digital-marketing-pro:status
```

Instantané complet pour la marque active. Lit `~/.claude-marketing/brands/_active-brand.json` pour trouver le slug actif.

### Marque spécifique

```
/digital-marketing-pro:status --brand acme-corp
```

Instantané pour une marque nommée (ne change pas le pointeur de marque active).

### Résumé compact sur une ligne

```
/digital-marketing-pro:status --quiet
```

Sortie :

```
DMP STATUS | Acme Corp | engagements: 2 active / 3 total | deps: lite
```

### Sortie JSON

```
/digital-marketing-pro:status --json
```

JSON lisible par machine pour consommation par des compétences en aval ou du scripting.

### Section unique

```
/digital-marketing-pro:status --section brand
/digital-marketing-pro:status --section engagements
/digital-marketing-pro:status --section insights
/digital-marketing-pro:status --section compliance
/digital-marketing-pro:status --section deps
```

N'affiche que la section demandée. Utile lorsque vous n'avez besoin que d'un seul élément d'état.

## Comment la compétence opère

1. **Résoudre la marque cible.** Si `--brand` est fourni, l'utiliser. Sinon lire `~/.claude-marketing/brands/_active-brand.json` pour le slug actif. Si aucune marque active, demander à l'utilisateur d'exécuter d'abord `/digital-marketing-pro:brand-setup`.

2. **Exécuter le script.**
   ```
   python ${CLAUDE_PLUGIN_ROOT}/scripts/dm-status.py [--brand <slug>] [--json] [--quiet] [--section <name>]
   ```

3. **Transmettre la sortie formatée à l'utilisateur.** Le script fait le gros du travail ; la compétence est une simple couche d'orchestration.

4. **Pour la sortie JSON**, analyser et faire ressortir les indicateurs de santé clés dans la réponse (par ex. mettre en évidence les engagements qui n'ont pas été mis à jour depuis 14 jours ou plus, ou qui ont des décisions de relance en attente d'action).

## Exemples

### Exemple 1 : Instantané par défaut

```
User: /digital-marketing-pro:status

Skill runs: python "${CLAUDE_PLUGIN_ROOT}/scripts/dm-status.py"
Output:

============================================================
  DIGITAL MARKETING PRO — STATUS SNAPSHOT
  Generated: 2026-05-03T08:30:00Z
============================================================

BRAND
------------------------------------------------------------
  Name:         Acme Corp (acme-corp)
  Tagline:      Build better, ship faster
  Industry:     B2B SaaS (regulated: no)
  Model:        B2B_SaaS | Revenue: subscription
  Voice:        Formality 6/10 | Energy 7/10 | Humor 4/10 | Authority 8/10
  Traits:       confident, precise, technical
  Channels:     linkedin, google_search, email
  Primary:      linkedin
  Languages:    en (+ es, fr)
  Markets:      3 configured
  Competitors:  CompetitorX, CompetitorY, CompetitorZ
  Primary goal: Grow MRR by 40% in Q2
  Auto-save:    insights = enabled

ENGAGEMENTS
------------------------------------------------------------
  2026-q2
    Part 9: Channel Strategy Fan-out
    Completed: 8 / 12 | In progress: 9
    Updated 2d ago | 2 doc(s) versioned

  2026-rebrand
    Part 5: Client Validation Document
    Completed: 4 / 12 | Awaiting input: 5
    Updated 14d ago | 1 pending re-run decision(s)

RECENT INSIGHTS
------------------------------------------------------------
  Total: 23 insights
  Last saved: 1d ago
    · [session_learning] LinkedIn Document Ads outperform Sponsored Content...
    · [campaign_outcome] Q1 retargeting CPL dropped 30% after creative refresh
    · [audience_finding] Tier-2 city audience converts 2x at lower CPL
    · [competitive] CompetitorX launched freemium tier on 2026-04-15
    · [voice_drift] Recent blog posts trending more formal than profile target

RECENT COMPLIANCE VIOLATIONS
------------------------------------------------------------
  Total: 4 | Last 30 days: 1
    · [warning] missing_unsubscribe (email)
    · [info] superlative_unsubstantiated (ad_copy)
    ...

PYTHON DEPENDENCIES
------------------------------------------------------------
  Python:       3.11.9
  Mode:         full
  Available:    nltk, textstat, requests, beautifulsoup4, qrcode, Pillow

============================================================
Tip: /digital-marketing-pro:status --json for machine-readable output
Tip: /digital-marketing-pro:status --quiet for one-line summary
============================================================

Skill highlights:
- 2026-rebrand has a pending re-run decision awaiting action
- 2026-rebrand has not been updated in 14d — recommend a status check
```

### Exemple 2 : Vérification rapide en cours de session

```
User: /digital-marketing-pro:status --quiet

Output: DMP STATUS | Acme Corp | engagements: 2 active / 2 total | deps: full
```

### Exemple 3 : JSON pour du scripting

```
User: /digital-marketing-pro:status --json

Output: {valid JSON snapshot — pipeable to jq, parseable by other skills}
```

### Exemple 4 : Quand aucune marque n'est configurée

```
User: /digital-marketing-pro:status

Output:
No active brand found.
Pass --brand <slug> explicitly, or run /digital-marketing-pro:brand-setup to create one.
Workspace: ~/.claude-marketing      # or $CLAUDE_PLUGIN_DATA/digital-marketing-pro if set
```

## Règles de comportement

1. **Ne jamais modifier l'état.** Opération en lecture seule. N'écrit jamais dans le profil de marque, l'état d'engagement, ou tout fichier persistant.
2. **Ne jamais échouer silencieusement.** Si un profil de marque est manquant ou corrompu, le script rapporte l'erreur spécifique dans la sortie.
3. **Faire ressortir les indicateurs de santé après l'instantané.** Si la sortie JSON est demandée ou si la compétence est analysée pour un usage en aval, mettre en évidence : les engagements sans mise à jour depuis 14 jours ou plus, les décisions de relance en attente, les violations de conformité récentes, les dépendances Python manquantes.
4. **Respecter CLAUDE_PLUGIN_DATA.** Lorsque la variable d'environnement est définie, le script lit depuis `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/...` plutôt que `~/.claude-marketing/...`.
5. **Rapide.** Le script ne lit que des fichiers d'état ; n'invoque jamais d'autres scripts ; ne fait jamais d'appels réseau.

## Ce que cette compétence ne fait PAS

- Ne modifie pas le profil de marque, l'état d'engagement, ou tout fichier persistant
- N'enregistre pas d'insights, de violations de conformité, ou toute donnée
- Ne déclenche pas de scripts d'évaluation (utilisez `/digital-marketing-pro:check` pour cela)
- Ne fait pas avancer les parties d'engagement (utilisez `/digital-marketing-pro:engagement next` pour cela)
- Ne change pas la marque active (utilisez `/digital-marketing-pro:switch-brand` pour cela)

## Compétences et commandes associées

- `/digital-marketing-pro:brand-setup` — créer ou mettre à jour un profil de marque
- `/digital-marketing-pro:switch-brand` — changer la marque active
- `/digital-marketing-pro:engagement status` — statut détaillé spécifique à l'engagement
- `/digital-marketing-pro:check` — porte qualité de pré-publication sur le contenu
- `/digital-marketing-pro:integrations` — statut des connecteurs (distinct de /digital-marketing-pro:status)

## Références associées

- `scripts/dm-status.py` — le script sous-jacent
- `docs/getting-started.md` — contexte sur ce qui a été perdu lorsque le hook SessionStart a été supprimé et pourquoi /digital-marketing-pro:status l'a remplacé

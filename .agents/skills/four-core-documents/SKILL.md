---
name: four-core-documents
description: "Produisez la Partie 3 de l'engagement en 12 parties : les quatre documents de colonne vertébrale stratégique répartis sur 61 étapes — 3.1 Analyse de l'entreprise & des SBU, 3.2 Cadre de segmentation, 3.3 Positionnement de marque & Communications, 3.4 DMFlow — avec des exécutions --doc pour un document unique, des relances --view v2, et un assemblage exécutif --combined. Se déclenche sur « /digital-marketing-pro:four-core-documents », « produce the four core documents », « run part 3 of the engagement », « generate the strategic spine », « re-run positioning as v2 ». Nécessite un engagement initialisé avec la Partie 1 terminée ; lit les faits Stone, la recherche de la Partie 2, et le profil de marque, et alimente /digital-marketing-pro:growth-plan."
user-invocable: true
triggers:
  - produce the four core documents
  - run part 3 of the engagement
  - generate the strategic spine
  - business and SBU analysis
  - segmentation framework
  - brand positioning document
  - DMFlow document
  - re-run a core document as v2
allowed-tools: Read Write Edit Bash Glob Grep
engagement-part: "3"
view-preference: v2-primary
---

# /digital-marketing-pro:four-core-documents — La colonne vertébrale stratégique (61 étapes)

Cette compétence produit la Partie 3 de la méthodologie d'engagement : les quatre documents qui, ensemble, définissent la marque en profondeur stratégique. Chaque stratégie de canal, chaque brief créatif, chaque texte s'y réfère.

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement les plages correspondantes avec `offset` + `limit`. Lister l'espace de travail de la marque sous `~/.claude-marketing/brands/{slug}/` (ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` quand cette variable d'environnement est définie) avant d'ouvrir des fichiers. En cas de réinvocation en cours de session, ignorer les fichiers déjà en contexte.

**Spécification :** [four-core-documents-spec.md](../context-engine/four-core-documents-spec.md) — les 61 étapes exactes réparties sur les quatre documents.

**Contexte d'engagement :** [engagement-flow-methodology.md](../context-engine/engagement-flow-methodology.md) — où la Partie 3 s'inscrit dans le flux en 12 parties.

## Préconditions

Avant d'exécuter cette compétence, vérifier :

1. **Le profil de marque existe** à `~/.claude-marketing/brands/{brand-slug}/profile.json`. Sinon, exécuter d'abord `/digital-marketing-pro:brand-setup`.
2. **L'engagement est initialisé** avec le fichier d'état `_engagement.json` présent. Sinon, exécuter d'abord `/digital-marketing-pro:engagement start`.
3. **La Partie 1 (Intrants client) est terminée**. Les faits Stone et les hypothèses Opinion doivent être capturés avant que la Partie 3 puisse commencer.
4. **La Partie 2 (Recherche externe) est au moins démarrée**. Une partie de la recherche de la Partie 2 peut se poursuivre en parallèle de la Partie 3, mais le lancement doit avoir eu lieu.

Si une précondition échoue, NE PAS produire de résultat. Indiquer plutôt à l'utilisateur quoi exécuter d'abord.

## Sous-commandes

### Produire les quatre documents

```
/digital-marketing-pro:four-core-documents <brand-slug> <engagement-id>
```

Produit 3.1, 3.2, 3.3, 3.4 dans l'ordre. Le temps réel varie selon la complexité de l'engagement.

### Produire un seul document

```
/digital-marketing-pro:four-core-documents <brand-slug> <engagement-id> --doc 3.1
```

Produit uniquement le document spécifié. Utile pour les relances (Partie 6) ou quand un document doit être refait indépendamment.

### Produire des relances v2

```
/digital-marketing-pro:four-core-documents <brand-slug> <engagement-id> --view v2 --doc "3.1,3.3"
```

Produit les versions v2 des documents spécifiés. `--doc` prend un seul id (`3.1`) ou une liste séparée par des virgules (`"3.1,3.3"`). Utilisé pendant la Partie 6 après que la Decision Matrix a déclenché des relances. (Les indicateurs canoniques sont `--doc`, `--view v2`, et `--combined` — il n'existe pas de `--docs`.)

### Produire le Document Central Combiné (3.C)

```
/digital-marketing-pro:four-core-documents <brand-slug> <engagement-id> --combined
```

Assemble les quatre documents centraux canoniques (dernière version de chacun) en un seul fichier de référence exécutif avec une table des matières maîtresse, un tableau maître des hypothèses, et un index maître des sources. Produit uniquement quand une audience exécutive a besoin d'une lecture en un seul fichier.

## Ordre de production

Les quatre documents sont produits dans l'ordre car chacun s'appuie sur le précédent :

1. **3.1 Analyse de l'entreprise & des SBU** (18 étapes) — fondamental. Établit la réalité de l'entreprise.
2. **3.2 Cadre de segmentation** (15 étapes) — dépend des SBU et données client de 3.1.
3. **3.3 Positionnement de marque & Communications** (19 étapes) — dépend des personas de 3.2.
4. **3.4 DMFlow** (9 étapes) — dépend de 3.1, 3.2, et 3.3 pour prendre les décisions de canal.

Lors des relances, seuls les documents concernés sont régénérés. Les autres documents restent à leur version actuelle.

## Production par document

### 3.1 — Analyse de l'entreprise & des SBU (18 étapes)

Lire la section spécification pour 3.1 dans [four-core-documents-spec.md](../context-engine/four-core-documents-spec.md). Les 18 étapes sont :

1. Identification des SBU
2. Justification de la séparation des SBU
3. Sources de revenu par SBU
4. Économie unitaire par SBU
5. Cartographie de la chaîne de valeur
6. Portfolio d'offres à la granularité de la tâche
7. Architecture de tarification
8. Modèle organisationnel et de mise sur le marché
9. Architecture de vente et de distribution
10. SWOT complet avec preuves
11. Leviers de croissance
12. Contraintes
13. Économie de l'acquisition client
14. Économie de la rétention client
15. Dépendances de partenariat et de canal
16. Profil de risque
17. Implications stratégiques pour l'engagement
18. Questions ouvertes

**Entrées :**

- `part-01-client-inputs/stone-facts.json` — faits de vérité terrain
- `part-02-external-research/` — recherche externe non biaisée (données sectorielles, contexte de marché)
- Profil de marque à `~/.claude-marketing/brands/{slug}/profile.json`
- (Ne PAS utiliser les hypothèses Opinion comme vérité terrain — ce sont des questions de recherche, pas des faits)

**Sortie :**

`engagements/{id}/part-03-four-core-documents/v1/3.1-business-and-sbu-analysis.md`

(Pour les relances v2 : même chemin mais dans `v2/` au lieu de `v1/`)

**Structure de sortie :**

```markdown
---
document: 3.1-business-and-sbu-analysis
version: v1.0
engagement: {engagement-id}
brand: {brand-slug}
produced: {iso-timestamp}
view: v1   # or v2 for re-runs
---

# 3.1 Business & SBU Analysis

## Step 1: SBU Identification

[Content for step 1]

## Step 2: SBU Separation Rationale

[Content for step 2]

... (all 18 steps, in order)

## Sources

[Numbered list of every cited source: client docs, public sources, industry reports, Stone facts referenced]

## Open Questions

[Anything that could not be answered with available info]

## Change Log

### v1.0 — {date}
- Initial unbiased research version produced from Part 2 + Stone facts.
```

### 3.2 — Cadre de segmentation (15 étapes)

Les 15 étapes :

1. Identification des groupes cibles (TG)
2. Notation des TG sur les critères
3. Priorisation des TG
4. Décomposition en sous-TG
5. Développement de persona par TG principal (en utilisant [actionable-persona-format.md](../context-engine/actionable-persona-format.md))
6. Attributs comportementaux par persona
7. Attributs psychographiques par persona
8. Cartographie des états de besoin
9. Distribution géographique
10. (B2B uniquement) Unité de décision multi-parties prenantes par persona (en utilisant [b2b-decision-making-unit.md](../context-engine/b2b-decision-making-unit.md))
11. (B2B uniquement) Définition du MQL
12. (B2B uniquement) Définition du SQL
13. (B2B uniquement) Logique de pipeline
14. Anti-personas
15. Consignes d'activation

Les étapes 10 à 13 sont ignorées pour les engagements B2C. La compétence détecte B2B vs B2C à partir du champ `business_model.type` du profil de marque.

**Entrées :**

- 3.1 (venant d'être produit) pour la base SBU + client
- `part-04-competitive-customer-market/v1/4.3-customer-analysis.md` si disponible (pour la recherche client non biaisée)
- Profil de marque

**Sortie :**

`engagements/{id}/part-03-four-core-documents/v1/3.2-segmentation-framework.md`

### 3.3 — Positionnement de marque & Communications (19 étapes)

Les 19 étapes :

1. Options de positionnement envisagées
2. Justification par option
3. Arbitrages par option
4. Positionnement retenu avec argumentaire de défense
5. Énoncé de positionnement (une phrase formelle)
6. Arbitrages explicites
7. Promesse de marque
8. Preuves à l'appui de la promesse de marque
9. Architecture de message principale
10. Piliers de message (3-5)
11. Preuves par pilier
12. Variations de message au niveau du segment
13. Cadre de communication full-funnel (TOFU/MOFU/BOFU/rétention/défense)
14. Principes de ton de voix
15. Règles explicites de ce qu'il ne faut pas dire
16. Traitement des sujets sensibles
17. Posture de communication de crise
18. Consignes d'application sur les canaux
19. Questions de positionnement ouvertes

**Entrées :**

- 3.1 + 3.2 (venant d'être produits)
- `part-04-competitive-customer-market/v1/4.2-competitor-positioning.md` si disponible
- Profil de marque (pour les signaux de voix de marque actuels)

**Sortie :**

`engagements/{id}/part-03-four-core-documents/v1/3.3-brand-positioning-and-communications.md`

### 3.4 — DMFlow (9 étapes)

Les 9 étapes :

1. Univers de canaux envisagés (en utilisant [five-digital-markets.md](../context-engine/five-digital-markets.md))
2. Sélection de canal avec justification par canal
3. Architecture de tunnel par canal
4. Logique de mix média entre payant/organique/gagné/détenu
5. Logique d'allocation budgétaire au niveau de l'entreprise (avec répartition In-Market vs Out-Market selon [in-market-out-market.md](../context-engine/in-market-out-market.md))
6. Interdépendances et séquencement des canaux
7. Cadre de conversion
8. Approche de mesure
9. Implications stratégiques et pondérations des pistes

**Entrées :**

- 3.1 + 3.2 + 3.3 (venant d'être produits)
- Profil de marque (pour les canaux actuels, l'enveloppe budgétaire)
- [channel-families.md](../context-engine/channel-families.md) pour la taxonomie à 7 familles / 17 canaux

**Sortie :**

`engagements/{id}/part-03-four-core-documents/v1/3.4-dmflow.md`

## Discipline qualité (s'applique aux quatre documents)

1. **Chaque allégation cite une source.** Pas de « nous pensons » — seulement « les preuves montrent » avec la source citée.
2. **Chaque hypothèse est explicite.** Lors de l'estimation du CAC, de la LTV, de la taille de marché, etc., énoncer la méthodologie et les intrants.
3. **Chaque recommandation découle de l'analyse.** Aucune conclusion que le corps du texte ne soutient pas.
4. **Pas de déclarations génériques.** « Marque forte » est générique. « 92 % de rappel de marque dans le segment cible selon [source] » est précis.
5. **Les quatre documents se référencent mutuellement de façon cohérente.** Une persona définie en 3.2 doit être la même persona référencée dans les variations de message de 3.3 et la sélection de canaux de 3.4.
6. **Les questions ouvertes sont documentées**, pas cachées.
7. **Les faits Stone sont des faits ; les hypothèses Opinion sont des questions.** Ne pas élever une Opinion au rang de fait dans le document.
8. **Le Cadre de décision multidimensionnel** (voir [decision-framework.md](../context-engine/decision-framework.md)) est utilisé pour tout choix (sélection de canal, priorisation de persona, arbitrages de positionnement).

## Discipline du fichier unique

Chaque document est produit sous forme d'un fichier unique contenant toutes ses étapes. Si un document ne peut pas être terminé en un seul tour à cause des limites de sortie :

1. Enregistrer le document partiel produit jusqu'ici
2. Continuer le même fichier là où il s'est arrêté au tour suivant (NE JAMAIS démarrer un nouveau fichier)
3. Le fichier n'est considéré complet que lorsque toutes les étapes sont présentes

Il n'existe **aucun état de continuation caché** — la compétence ne persiste pas de pointeur de coupure. Le fichier partiel déjà enregistré sur disque est le seul enregistrement. Si la sortie est interrompue en milieu de document, relancer le document : lire le partiel enregistré comme contexte et continuer à ajouter les étapes restantes au **même** fichier. Pour une exécution interrompue au niveau de l'engagement, reprendre depuis le dernier artefact de point de contrôle de la partie via `/digital-marketing-pro:resume`. Le fichier enregistré est toujours la source de vérité.

## Après la production

Une fois les quatre documents produits (ou après chacun individuellement) :

1. Mettre à jour le Living Project Instruction File :
   - Section Faits stratégiques : extraire l'énoncé de positionnement, le résumé de persona principale, les sélections de canaux, l'économie unitaire
   - Section Historique des versions : ajouter les nouvelles entrées v1.0
2. Marquer la Partie 3 (ou le sous-document spécifique) comme terminée dans `_engagement.json`
3. Informer l'utilisateur que la Partie 4 est la prochaine étape naturelle

## Relances v2

Lorsqu'invoquée avec `--view v2`, la compétence :

1. Lit la version v1 du document demandé
2. Lit le Document de validation client de la Partie 5 (les changements demandés par le client)
3. Lit le sous-ensemble pertinent de changements s'appliquant à ce document
4. Produit la v2 avec une section d'en-tête listant ce qui a changé vs v1 :

```markdown
## v1 → v2 Changes

- Section X (Step N): {what changed} — driven by {client validation finding ID}
- Section Y: ...
```

5. Enregistre dans `v2/{doc-name}.md` (le fichier v1 reste intact)
6. Incrémente la version dans `_engagement.json` via `engagement-state.py bump-version`
7. Met à jour le LIF avec les faits stratégiques modifiés

## Exemples

### Exemple 1 : première production des quatre documents

```
User: Produce the four core documents for the Acme engagement.

Skill response:
1. Verify pre-conditions: brand profile ✓, engagement initialised ✓, Part 1 complete ✓, Part 2 in progress ✓
2. Begin 3.1 Business & SBU Analysis. Read Stone facts, Part 2 research, brand profile. Walk all 18 steps. Cite sources throughout. Save to v1/3.1-business-and-sbu-analysis.md.
3. Begin 3.2 Segmentation Framework. Read 3.1, Part 4.3 if available. Detect business model = B2B from profile, so include steps 10-13. Walk 15 steps. Save to v1/3.2-segmentation-framework.md.
4. Begin 3.3 Brand Positioning. Read 3.1, 3.2, Part 4.2 if available. Walk 19 steps. Save to v1/3.3-brand-positioning-and-communications.md.
5. Begin 3.4 DMFlow. Read 3.1, 3.2, 3.3. Apply 5 Digital Markets taxonomy. Walk 9 steps. Save to v1/3.4-dmflow.md.
6. Update LIF: positioning statement, primary persona, channel selections, blended CAC estimate.
7. Mark Part 3 completed.
8. Brief: "Part 3 complete. 4 documents, 61 steps. Total ~12,000 words across all four. Recommend reviewing 3.3 (positioning) carefully — the chosen positioning has notable trade-offs documented in step 6."
```

### Exemple 2 : relance v2 après la Partie 5

```
User: Re-run 3.3 and 3.4 as v2 — client rejected the positioning and we need to redo the channel mix as a result.

Skill response:
1. Verify Part 5 Client Validation Document exists with positioning rejection captured ✓
2. Begin 3.3 v2. Read 3.3 v1 + Client Validation Document. Re-do positioning per client direction. Add v1→v2 changes header. Save to v2/3.3-brand-positioning-and-communications.md.
3. Begin 3.4 v2. Read 3.4 v1 + (now updated) 3.3 v2. Re-do channel mix to align with new positioning. Add v1→v2 changes header. Save to v2/3.4-dmflow.md.
4. Bump versions: engagement-state.py bump-version --doc 3.3 + --doc 3.4
5. Update LIF: new positioning statement, new channel selections, version history.
6. Brief: "v2 re-runs complete. 3.1 and 3.2 unchanged (still v1.0). 3.3 and 3.4 now at v2.0. Both views remain available. Operating decisions should reference v2 docs."
```

### Exemple 3 : production du Document Central Combiné pour une revue exécutive

```
User: Produce the Combined Core Document for the executive presentation next week.

Skill response:
1. Verify all four core documents exist (latest version of each) ✓
2. Read 3.1 v1.0, 3.2 v1.0, 3.3 v2.0, 3.4 v2.0
3. Synthesise into single document with:
   - Master TOC at top
   - Each document as a major section
   - Master Assumptions Table (extract every "Assumption" call-out from all four docs)
   - Master Source Index (de-duplicated list of every source cited)
4. Save to part-03-four-core-documents/3.C-combined-core-document.md
5. Brief: "3.C produced. 60+ pages. Includes master TOC + assumptions table + source index. Recommended exports: PDF for the executive deck, DOCX if they want to annotate."
```

## Compétences associées

- `engagement-workflow` — orchestre le flux en 12 parties qui contient la Partie 3
- `client-validation-document` — livrable de la Partie 5 qui déclenche les relances v2
- Compétences et agents existants consommés par celle-ci : `audience-intelligence`, `competitive-intel`, `market-intelligence`, `brand-guardian`

## Références associées

- [four-core-documents-spec.md](../context-engine/four-core-documents-spec.md) — la spécification canonique en 61 étapes
- [actionable-persona-format.md](../context-engine/actionable-persona-format.md) — Étape 5 de 3.2
- [b2b-decision-making-unit.md](../context-engine/b2b-decision-making-unit.md) — Étapes 10-13 de 3.2 (B2B)
- [five-digital-markets.md](../context-engine/five-digital-markets.md) — Étape 1 de 3.4
- [in-market-out-market.md](../context-engine/in-market-out-market.md) — Étape 5 de 3.4
- [channel-families.md](../context-engine/channel-families.md) — Étape 2 de 3.4
- [decision-framework.md](../context-engine/decision-framework.md) — utilisé tout au long pour la prise de décision
- [unit-economics-framework.md](../context-engine/unit-economics-framework.md) — Étape 4 de 3.1

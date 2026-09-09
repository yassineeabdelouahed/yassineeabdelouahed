---
name: backlink-gap
description: "Find referring domains that link to your competitors but not to you, ranked by an outreach-priority score (0.40 DR + 0.25 link-overlap + 0.20 traffic + 0.15 topical relevance) — outputs a four-gate quality scorecard, a 30-prospect outreach shortlist, broken-link candidates, and pre-filled outreach templates. Triggers on \"/digital-marketing-pro:backlink-gap\", \"where are competitors getting links we aren't\", \"plan a link-building campaign\", \"quarterly backlink audit\", \"first 50 link targets for a new client\". Consumes backlink CSV exports from the brand's connected backlink MCP, runs scripts/backlink_gap.py, reads the brand profile for DR thresholds and voice, and hands off to /digital-marketing-pro:digital-pr and /digital-marketing-pro:pr-pitch."
argument-hint: "[brand-name]"
user-invocable: true
---

# /digital-marketing-pro:backlink-gap

## Objectif

Identifier les prospects de backlinks à plus fort effet de levier — les domaines qui font des liens vers plusieurs concurrents mais pas vers vous — et les classer selon un score de priorité argumenté combinant l'autorité, le signal de chevauchement de liens, le trafic en aval, et la pertinence thématique. Produit un ensemble de livrables numérotés prêts pour transmission à l'outreach.

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** tout fichier référencé, puis `Read` uniquement les plages correspondantes avec `offset` + `limit`. Lister `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. Lors d'une réinvocation en cours de session, ignorer les fichiers déjà dans le contexte.

## Quand l'utiliser

- Audit de backlinks trimestriel — « où nos concurrents ont-ils gagné des liens ce trimestre que nous n'avons pas gagnés ? »
- Plan de netlinking avant lancement pour un nouveau produit ou hub de contenu
- Qualification de RP digitales — séparer les prospects « lierait vers n'importe qui » des prospects « forte confiance qu'ils lieront vers notre espace »
- Récupération concurrentielle — un concurrent vous a déplacé et vous voulez savoir quels liens ont bougé
- Onboarding d'un nouveau client nécessitant un backlog de « 50 premières cibles de liens »

**Ne pas utiliser** lorsque vous avez seulement besoin de chiffres de *quantité* de backlinks (utiliser directement le MCP de backlinks connecté de la marque) ou lorsque vous avez besoin d'une analyse de *texte d'ancre* de votre propre profil (c'est un audit distinct — couvert dans `seo-audit`).

## Contexte de marque (appliqué automatiquement)

1. Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`
2. Si aucune marque n'existe : demander « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut
3. Appliquer `skills/context-engine/industry-profiles.md` pour les seuils de qualité de lien spécifiques au secteur (les secteurs YMYL devraient fixer un `--min-dr` plus élevé)
4. Appliquer `skills/context-engine/compliance-rules.md` pour filtrer les éditeurs bloqués (par ex. les réseaux de type PBN ou de liens payants explicitement interdits par la marque)

## Entrées

| Entrée | Source | Requis ? |
|---|---|---|
| CSV de nos backlinks | Export depuis le MCP de backlinks connecté (Ahrefs / Semrush / SE Ranking / Moz) pour le domaine principal de la marque | oui |
| CSV de backlinks des concurrents (2+) | Même exporteur, un par concurrent (2 minimum pour le signal de chevauchement de liens ; 3-5 est le point idéal) | oui |
| Filtre DR/DA minimal | Flag CLI, valeur par défaut du profil de marque, ou standard sectoriel | facultatif |
| Nombre Top-N | Combien de prospects faire ressortir | facultatif |

**Un seul concurrent est autorisé** (le script avertit plutôt que de générer une erreur) mais le « signal partagé » résultant est du bruit — une analyse d'écart à un seul concurrent revient en réalité à « qui les lie » plutôt qu'à « qui lie systématiquement dans notre espace ».

## Processus (10 étapes, livrables numérotés)

Tous les résultats vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/{YYYY-MM-DD}/`.

1. **`00-input.md`** — capturer notre domaine, la liste des concurrents (avec justification : pourquoi ces N ?), les paramètres de filtre, l'horodatage d'exécution
2. **`01-data-pull.md`** — extraire les backlinks pour `{brand}.tld` et chaque concurrent via le MCP de backlinks connecté de la marque. **Garde-fou budgétaire** : si le MCP expose un coût en crédits, sommer le coût estimé et demander « Continuer ? (o/N — N par défaut) » avant la récupération lorsque le total dépasse 200 crédits.
3. **`02-ours.csv`** — notre export de backlinks (brut)
4. **`03-comp-{competitor}.csv`** — un CSV par concurrent (brut)
5. **`04-gap-run.json`** — exécuter le script :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/backlink_gap.py" \
       --ours "${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/{date}/02-ours.csv" \
       --competitors \
         "${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/{date}/03-comp-competitor1.csv" \
         "${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/{date}/03-comp-competitor2.csv" \
       --min-dr {brand.profile.min_link_dr or 20} \
       --top 100 \
       --out "${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/{date}/04-gap-run.json"
   ```
   `--competitors` prend une liste explicite de chemins CSV séparés par des espaces (`nargs="+"`) — **énumérez chaque fichier `03-comp-*.csv` ; le script n'étend pas un glob `*`**, donc un `03-comp-*.csv` entre guillemets échouerait avec FileNotFoundError. Listez un chemin par concurrent.
6. **`05-quality-scorecard.md`** — lire `quality_scorecard` depuis `04-gap-run.json`. Si `status: needs_review`, diagnostiquer :
   - `data_freshness: fail` → CSV d'entrée de plus de 90 jours. Re-extraire les données ; les graphes de backlinks se dégradent vite.
   - `sample_size: fail` → une entrée a moins de 50 domaines référents uniques. Soit le domaine est trop récent, soit l'export a été tronqué. Re-exporter sans limite de lignes.
   - `competitor_coverage: warn` → un seul concurrent. Ajouter au moins 1 de plus pour un véritable signal de chevauchement.
   - `link_overlap_signal: fail` → moins de 5 domaines référents lient vers ≥2 concurrents. Soit les concurrents sont mal choisis (ils ne partagent pas un espace de contenu entre eux), soit les données sont incomplètes. Rechoisir les concurrents.
7. **`06-prospect-shortlist.md`** — top 30 prospects, formatés pour transmission à l'outreach : domaine, DR, nombre de liens à travers les concurrents, angle d'outreach suggéré (article invité, lien cassé, mention de page ressource)
8. **`07-broken-link-candidates.md`** — sous-ensemble où un ou plusieurs liens concurrents renvoient une erreur 4xx (exécuter un passage HTTP HEAD rapide sur les URL de backlinks concurrents — utiliser le MCP de récupération web connecté de la marque). Ce sont des « gains faciles » — proposez votre URL comme remplacement.
9. **`08-outreach-templates.md`** — trois variantes de modèle : (a) pitch à froid page ressource, (b) remplacement de lien cassé, (c) mention concurrent. Chacune pré-remplie avec la voix de marque issue des champs de voix du profil de marque + `skills/context-engine/guidelines-framework.md`.
10. **`PLAN.md`** — résumé d'une page : statistiques + tableau de bord qualité + top 10 des prospects avec angle d'outreach + cadence recommandée (3-5 pitchs/semaine pour une qualité d'outreach durable).

## Format de sortie

```
${CLAUDE_PLUGIN_DATA}/{brand}/seo/backlink-gap/2026-06-04/
├── 00-input.md
├── 01-data-pull.md
├── 02-ours.csv
├── 03-comp-{competitor1}.csv
├── 03-comp-{competitor2}.csv
├── ...
├── 04-gap-run.json
├── 05-quality-scorecard.md
├── 06-prospect-shortlist.md
├── 07-broken-link-candidates.md
├── 08-outreach-templates.md
└── PLAN.md
```

## Tableau de bord qualité (les quatre portes)

| Porte | Ce qu'elle vérifie | Pourquoi cela compte |
|---|---|---|
| **data_freshness** | Tous les CSV d'entrée ont une date de modification dans les 90 jours | Les graphes de backlinks se dégradent vite — des données périmées vous font poursuivre des liens morts |
| **sample_size** | Chaque entrée a ≥ 50 domaines référents uniques | En dessous, le calcul d'écart a trop peu de signal pour classer |
| **competitor_coverage** | ≥ 2 CSV de concurrents fournis | Le « signal partagé » est ce qui sépare les vrais prospects du bruit |
| **link_overlap_signal** | ≥ 5 domaines référents lient vers ≥ 2 des concurrents | Si aucun domaine n'est partagé, vos concurrents ne sont pas réellement en concurrence dans le même espace de contenu |

`status: ready` requiert que les quatre portes soient validées (`competitor_coverage: warn` ne bloque pas — c'est un signal doux).

## Score de priorité (0-1, affiché dans 04-gap-run.json)

```
priority = 0.40 × DR_normalised
         + 0.25 × link_count_normalised  (how many competitors this domain links to)
         + 0.20 × traffic_normalised
         + 0.15 × topical_relevance
```

**Pourquoi link_count est pondéré plus que le trafic :** un domaine qui lie vers 3/3 concurrents est sans ambiguïté dans votre espace et disposé à faire un lien. Un domaine à fort trafic qui ne lie qu'à 1 seul pourrait n'être qu'un éditeur de niveau 1 qui a par hasard couvert l'un de vous en passant.

## Enchaînements

Cette compétence est un producteur dans une chaîne plus longue :

1. `/digital-marketing-pro:competitor-analysis` — choisit les bons concurrents
2. **`/digital-marketing-pro:backlink-gap`** — *cette compétence*
3. `/digital-marketing-pro:digital-pr` — consomme `06-prospect-shortlist.md` + `08-outreach-templates.md`
4. `/digital-marketing-pro:pr-pitch` — rédige des pitchs individuels par prospect
5. `/digital-marketing-pro:performance-report` — les ré-exécutions trimestrielles de cette compétence alimentent le KPI « liens gagnés »

## Conseils et mises en garde

- **Plus de concurrents ne veut pas dire mieux.** Trois à cinq concurrents ciblés valent mieux que dix choisis au hasard. La porte du « signal partagé » fonctionne mieux lorsque tous les concurrents sont dans le même espace de contenu.
- **Le DR/DA de différents exporteurs ne sont pas comparables.** Ne mélangez pas un export Ahrefs avec un export Moz — le script ne sait pas normaliser entre exporteurs. Choisissez un seul fournisseur par audit.
- **La pertinence thématique est le signal le plus faible dans la plupart des exports** car peu d'exporteurs la fournissent bien. Le script utilise 0,5 par défaut si absente, ce qui est le juste neutre. Ne le remplacer que si vous disposez d'un score de pertinence thématique organisé.
- **Ne contactez pas 100 prospects en une semaine.** Le résultat est un backlog, pas une file d'attente. Cadence durable : 3-5 pitchs hautement personnalisés par semaine et par responsable d'outreach.
- **Les candidats à liens cassés ont tendance à avoir le meilleur taux de réponse** (les pitchs de remplacement de lien cassé surpassent généralement les pitchs à froid par une large marge — les chiffres « 30-60 % vs 5-15 % » sont une règle empirique illustrative, non mesurée ; validez avec vos propres données d'outreach) — travaillez toujours d'abord la liste `07-broken-link-candidates.md`.
- **Ré-exécutez trimestriellement**, pas mensuellement. Les données de backlinks évoluent assez lentement pour que des exécutions mensuelles produisent surtout du bruit.
- **Les secteurs YMYL** (santé, finance, juridique) devraient fixer `--min-dr 40` pour filtrer les éditeurs à faible autorité pouvant nuire à l'E-E-A-T.

## Agents utilisés

- `seo-specialist` (principal) — interprétation de la qualité des prospects
- `competitive-intel` — justification de la sélection de l'ensemble de concurrents (étape 1)
- `pr-outreach` — rédaction des modèles d'outreach (étape 8)
- `brand-guardian` — filtre des éditeurs interdits à l'étape 6

## Voir aussi

- `/digital-marketing-pro:competitor-analysis` — choisir les concurrents pour cet audit
- `/digital-marketing-pro:digital-pr` — exécute l'outreach réel
- `/digital-marketing-pro:seo-drift` — ré-exécuter trimestriellement pour suivre l'écart
- `/digital-marketing-pro:seo-audit` — audit plus large au niveau du site, incluant la santé du profil propre
- `scripts/backlink_gap.py` — le moteur d'écart sous-jacent

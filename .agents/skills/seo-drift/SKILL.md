---
name: seo-drift
description: "Compare deux instantanés SEO provenant de la même source — GSC, le rapport GSC AI Performance, un export d'outil de suivi de positionnement, ou des sondages aeo-audit — pour produire un rapport de dérive : principaux gagnants et perdants par métrique, classification croissance/déclin/remaniement/stable/nouveau/perdu, et un tableau de bord qualité à quatre portes. Se déclenche sur \"/digital-marketing-pro:seo-drift\", \"compare this month's GSC export to last month's\", \"what moved after the core update\", \"did the content refresh work\", \"which queries lost AI Mode impressions\". Exécute scripts/seo_drift.py sur deux fichiers CSV, lit le profil de marque pour les seuils de bruit, et oriente les constats vers /digital-marketing-pro:seo-audit, /digital-marketing-pro:aeo-geo, ou /digital-marketing-pro:content-engine."
argument-hint: "[brand-name]"
user-invocable: true
---

# /digital-marketing-pro:seo-drift

## Objectif

Prendre deux instantanés de données de performance SEO — séparés par des semaines, une mise à jour Core, une actualisation de contenu, ou un changement d'algorithme — et produire un rapport de dérive structuré : principaux gagnants, principaux perdants, classifications (croissance / déclin / remaniement / stable / nouveau / perdu), et motifs diagnostiques. Fonctionne avec le GSC classique, le nouveau GSC AI Performance Report, les exports d'outils de suivi de positionnement, et les résultats de sondage `aeo-audit`.

## Efficacité de contexte

Compétence lourde. **Faites un grep avant tout Read** sur un fichier référencé, puis ne lisez (`Read`) que les plages correspondantes avec `offset` + `limit`. Listez `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. Lors d'une réinvocation en cours de session, ignorez les fichiers déjà en contexte.

## Quand l'utiliser

- **Revue de performance mensuelle** — le mois dernier contre le mois précédent
- **Triage de mise à jour Core** — avant la mise à jour contre après la mise à jour + fenêtre de stabilisation (utilisez 14 jours ou plus après la fin du déploiement)
- **Suivi des citations en AI Mode** — sorties `aeo-audit` trimestrielles pour voir quelles requêtes ont gagné/perdu des citations en AI Mode (l'écart de citation Google AI Mode est un indicateur avancé de déclin organique)
- **Attribution d'une actualisation de contenu** — avant contre après une mise à jour de contenu planifiée, pour attribuer la progression à l'actualisation plutôt qu'à d'autres facteurs
- **Rapport GSC AI Performance** — écarts mois sur mois sur le nouveau rapport combiné AI Overviews + AI Mode (3 juin 2026)
- **Audit de migration de site** — référence pré-migration contre stabilisation post-migration

**Ne pas utiliser** pour une analyse à un instant T unique (utilisez la compétence source — `seo-audit`, `aeo-audit`, `gsc-ai-performance`).

## Contexte de marque (appliqué automatiquement)

1. Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`
2. Si aucune marque n'existe : demander "Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ?" — ou procéder avec les valeurs par défaut
3. Appliquer `skills/context-engine/industry-profiles.md` pour les seuils de bruit spécifiques au secteur (les secteurs YMYL devraient utiliser un `--noise` plus élevé pour filtrer la volatilité routinière liée aux Quality Rater Guidelines)

## Entrées

| Entrée | Source | Requis ? |
|---|---|---|
| CSV de référence | Instantané le plus ancien | oui |
| CSV actuel | Instantané le plus récent | oui |
| Clés de jointure | Auto-détectées (`query`, `keyword`, `page`, `url`) ou drapeau `--join-on` | optionnel |
| Seuil de bruit | `--noise` (5 % par défaut) — le % en dessous duquel une métrique est « stable » | optionnel |
| Top-N | `--top` (20 par défaut) — gagnants/perdants par métrique | optionnel |

**Les deux instantanés doivent provenir de la même source.** Mélanger un export GSC avec un export Ahrefs produira des résultats absurdes — les sources différentes comptent des choses différentes.

## Processus (10 étapes, sortie en fichiers numérotés)

Toutes les sorties vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-drift/{YYYY-MM-DD}/`.

1. **`00-input.md`** — capturer la plage de dates de référence, la plage de dates actuelle, la source (GSC / GSC AI / outil de suivi de positionnement / aeo-audit), le contexte de marque
2. **`01-baseline.csv`** — copier ici l'export de référence (afin que l'exécution de dérive soit reproductible des mois plus tard)
3. **`02-current.csv`** — copier ici l'export actuel
4. **`03-drift-run.json`** — exécuter le script :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/seo_drift.py" \
       --baseline "${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-drift/{date}/01-baseline.csv" \
       --current  "${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-drift/{date}/02-current.csv" \
       --top 30 --noise 5 \
       --out "${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-drift/{date}/03-drift-run.json"
   ```
5. **`04-quality-scorecard.md`** — lire `quality_scorecard` depuis `03-drift-run.json`. Si `status: needs_review`, diagnostiquer :
   - `date_range_distinct: warn` → le script n'a pas pu valider automatiquement. Confirmez manuellement dans `00-input.md` que la référence et l'actuel couvrent des fenêtres non chevauchantes.
   - `sample_size: fail` → l'une des entrées a moins de 50 lignes. Réexportez sans limite de lignes.
   - `metric_compatibility: fail` → aucune métrique numérique commune aux DEUX entrées. Incohérence de nom de colonne — réexportez depuis la même source.
   - `no_lookup_collisions: fail` → clés en double dans une entrée (par ex. la même paire requête × page en double). Réexportez avec déduplication ou utilisez `--join-on` pour ajouter une colonne distinctive.
6. **`05-biggest-gainers.md`** — récit sur les 10 principaux gagnants en impressions / clics / position. Pour chacun : hypothèse sur la cause (nouveau contenu ? backlinks gagnés ? la mise à jour Core a favorisé l'E-E-A-T ? rotation de Featured Snippet ?). Confier les candidats à `/digital-marketing-pro:content-engine` pour amplification.
7. **`05-biggest-losers.md`** — récit sur les 10 principaux perdants. Pour chacun : matrice de triage — `est_YMYL × a_eu_un_changement_récent × fenêtre_de_mise_à_jour_Core` → action (actualiser le contenu / rétablir le changement annulé / attendre le prochain cycle d'algorithme / accepter et réallouer).
8. **`06-ai-mode-shift.md`** *(uniquement si la source d'entrée est le GSC AI Performance Report)* — les requêtes qui ont PERDU des impressions en AI Mode sont un indicateur avancé. Recouper avec `/digital-marketing-pro:aeo-audit` pour vérifier la perte de citation dans les sondages synthétiques.
9. **`07-classification-distribution.md`** — tableau de comptage :
   - croissance / déclin / remaniement / stable / nouveau / perdu
   - Si plus de 40 % en déclin : probablement une mise à jour Core ou un rattrapage concurrentiel. Exécuter `/digital-marketing-pro:seo-audit` pour le diagnostic.
   - Si plus de 20 % en remaniement : probablement un glissement d'intention (repondération AI Mode). Exécuter `/digital-marketing-pro:aeo-geo` pour s'aligner sur les nouveaux motifs d'intention.
10. **`PLAN.md`** — résumé sur une seule page : statistiques + tableau de bord + top 5 des actions classées par impact × effort, avec suggestions de responsable (responsable SEO / responsable contenu / équipe dev).

## Format de sortie

```
${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-drift/2026-06-04/
├── 00-input.md
├── 01-baseline.csv
├── 02-current.csv
├── 03-drift-run.json
├── 04-quality-scorecard.md
├── 05-biggest-gainers.md
├── 05-biggest-losers.md
├── 06-ai-mode-shift.md       (uniquement lorsque l'entrée est le GSC AI Performance Report)
├── 07-classification-distribution.md
└── PLAN.md
```

## Tableau de bord qualité (les quatre portes)

| Porte | Ce qu'elle vérifie | Pourquoi c'est important |
|---|---|---|
| **date_range_distinct** | La référence et l'actuel couvrent des fenêtres non chevauchantes | Des fenêtres qui se chevauchent produisent des écarts faux positifs — les mêmes données des deux côtés |
| **sample_size** | Chaque entrée a ≥ 50 lignes | En dessous de ce seuil, la dérive est du bruit |
| **metric_compatibility** | ≥ 1 métrique numérique existe dans les deux entrées | Si les colonnes diffèrent (par ex. Ahrefs contre GSC), il n'y a rien à comparer |
| **no_lookup_collisions** | Aucune clé en double au sein d'une entrée | Les doublons rendent le calcul de l'écart ambigu |

`status: ready` requiert la réussite des portes échantillon, compatibilité de métrique et absence de collision (date-range-distinct est `warn`, pas `fail` — le script ne peut pas toujours détecter automatiquement les dates).

## Règles de classification

Chaque ligne du rapport tombe dans une catégorie :

| Classification | Déclencheur | Interprétation |
|---|---|---|
| **croissance** | ≥ 2 métriques en hausse de plus de X % (bruit), aucune métrique en baisse de plus de 10 % | Gain clair — étudier pour amplification |
| **déclin** | ≥ 2 métriques en baisse de plus de X % (bruit), aucune métrique en hausse de plus de 10 % | Perte claire — trier selon YMYL × fenêtre de mise à jour Core |
| **remaniement** | Mouvements significatifs en sens opposés (par ex. impressions en hausse, position en baisse) | Signature AI Mode — le contenu est montré plus largement mais pour des intentions légèrement différentes |
| **stable** | Aucune métrique n'a bougé de plus que le seuil de bruit | Aucune action |
| **nouveau** | Absent dans la référence, présent dans l'actuel | Nouveau contenu ou nouvelle couverture SERP — à suivre |
| **perdu** | Présent dans la référence, absent dans l'actuel | Contenu supprimé, désindexé, ou sorti de la fenêtre de suivi |

**La position est un cas particulier** : pour la position, *les chiffres plus bas sont meilleurs*. Le script inverse automatiquement la direction de l'écart de position pour le classement gain/perte — vous verrez -85,9 % sous position comme un gain principal (la page est passée de la position 12 à la position 2).

## Transmissions de la chaîne

Cette compétence est typiquement un consommateur + diagnosticien :

1. `/digital-marketing-pro:gsc-ai-performance` ou `seo-audit` ou `aeo-audit` — génère les instantanés
2. **`/digital-marketing-pro:seo-drift`** — *cette compétence*
3. Bifurcation selon le constat :
   - **Déclin élevé** → `/digital-marketing-pro:seo-audit` pour la vérification côté technique + `/digital-marketing-pro:content-decay-scan` pour le côté contenu
   - **Remaniement élevé** → `/digital-marketing-pro:aeo-geo` pour le réalignement d'intention
   - **Croissance élevée** → `/digital-marketing-pro:content-engine` pour des briefs d'amplification

## Astuces et mises en garde

- **Ne pas exécuter pendant un déploiement de mise à jour Core.** Attendez que Google annonce « déploiement terminé » + 7 à 14 jours de stabilisation. Les écarts en cours de déploiement ne sont pas fiables.
- **Les écarts de position sont plus bruités que les écarts d'impressions/clics** — les pages qui oscillent entre les positions 8 et 12 produisent des écarts de position de ±30 % qui ne signifient rien. Faites davantage confiance aux mouvements d'impressions/clics pour le diagnostic.
- **Le décalage de données de GSC est d'environ 3 jours.** Pour extraire les données du « mois en cours », utilisez une plage de dates se terminant il y a 3 jours, pas hier.
- **Le GSC AI Performance Report (3 juin 2026) n'a PAS de données de clics.** La dérive sur le rapport IA se limite aux impressions. N'essayez pas d'en calculer une dérive de CTR.
- **Pour le triage de mise à jour Core, exécutez la dérive deux fois** : avant la mise à jour contre le lendemain de la fin du déploiement (le « choc »), et avant la mise à jour contre 14 jours après (l'« état stabilisé »). Les deux sont souvent en désaccord, et c'est la vue à 14 jours qui compte.
- **La classification remaniement est un indicateur avancé** — quand le nombre de remaniements augmente fortement, une repondération d'intention est en cours. La dérive du trimestre suivant montrera généralement une croissance/déclin plus clair. Ne réagissez pas trop vite.

## Agents utilisés

- `analytics-analyst` (principal) — interprétation + hypothèses de cause
- `seo-specialist` — pour les hypothèses de cause technique sur les perdants
- `competitive-intel` — quand le déclin est corrélé à un gain d'un concurrent
- `market-intelligence` — pour le contexte de mise à jour d'algorithme (y avait-il une mise à jour Core dans la fenêtre ?)

## Voir aussi

- `/digital-marketing-pro:gsc-ai-performance` — récupérer le GSC AI Performance Report (source d'entrée)
- `/digital-marketing-pro:seo-audit` — diagnostiquer les causes du déclin
- `/digital-marketing-pro:aeo-audit` — diagnostiquer la perte de citation en AI Mode
- `/digital-marketing-pro:content-decay-scan` — pour le triage du déclin côté contenu
- `/digital-marketing-pro:content-engine` — pour amplifier les gagnants
- `scripts/seo_drift.py` — le moteur de dérive sous-jacent

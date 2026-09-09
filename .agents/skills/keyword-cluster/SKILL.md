---
name: keyword-cluster
description: "Construire un plan de cluster de contenu pilier+déclinaisons à partir de mots-clés de départ — clustering par chevauchement SERP via keyword_cluster.py, regroupement par intention, un ordre de construction priorisé, une carte de maillage interne avec suggestions d'ancres, et un tableau de bord qualité à quatre portes (cannibalisation, orphelin, couverture, diversité d'ancres), livré sous forme d'un jeu de fichiers numérotés se terminant par PLAN.md. Se déclenche sur \"/digital-marketing-pro:keyword-cluster\", \"cluster these keywords\", \"design our topical hub\", \"are these pages cannibalising each other\", \"plan the pillar pages\". Lit le profil de marque et les règles de conformité pour filtrer les termes interdits ; consomme les mots-clés de départ issus de /digital-marketing-pro:keyword-research et transmet PLAN.md à /digital-marketing-pro:content-brief."
argument-hint: "[brand-name or path/to/seeds.csv]"
user-invocable: true
---

# /digital-marketing-pro:keyword-cluster

## Objectif

Prendre un ensemble de mots-clés de départ et produire un plan de cluster prêt à la publication : pages piliers avec leurs déclinaisons, regroupées par intention, priorisées par une formule de notation assumée, avec une carte de maillage interne et un tableau de bord qualité à quatre portes. La sortie est structurée pour être transmise directement à `/digital-marketing-pro:content-brief` ou `/digital-marketing-pro:content-engine`.

## Efficacité du contexte

Skill lourd. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement les plages trouvées avec `offset` + `limit`. Lister `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. Lors d'une réinvocation en cours de session, ignorer les fichiers déjà présents dans le contexte.

## Quand l'utiliser

- Intégration d'un nouveau programme de contenu — transformer un brief de 20 mots-clés en un hub thématique structuré
- Audit d'une bibliothèque de contenu existante pour détecter la cannibalisation (deux pages en concurrence pour la même intention)
- Conception d'une architecture pilier+déclinaisons avant tout début de rédaction
- Préparation d'un SEO programmatique sur des centaines de variantes (utiliser ce skill une fois par famille de sujets)
- Réorganisation du graphe de maillage interne d'un site existant

**Ne pas utiliser** lorsque vous avez simplement besoin d'*expansion* de mots-clés (utiliser `/digital-marketing-pro:keyword-research`) ou d'analyse de *classement* / de fonctionnalités SERP (utiliser `/digital-marketing-pro:rank-monitor`, avec `--features` pour les fonctionnalités SERP).

## Contexte de marque (appliqué automatiquement)

1. Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`
2. Si aucune marque n'existe : demander « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut
3. Appliquer les recommandations spécifiques au secteur depuis `skills/context-engine/industry-profiles.md`
4. Appliquer `skills/context-engine/compliance-rules.md` pour filtrer la terminologie interdite avant le clustering

## Entrées

| Entrée | Source | Requis ? |
|---|---|---|
| Mots-clés de départ (3–500) | CSV avec colonne `keyword` (facultatif : `volume`, `kd`, `intent`) | oui |
| Résultats SERP par mot-clé | JSON : `{keyword: [top result URLs]}` provenant de n'importe quel rank-tracker / export Ahrefs / Semrush | **fortement recommandé** — sans cela, le script bascule sur un clustering lexical, moins fiable |
| Pays / langue cible | Depuis le profil de marque | override facultatif |
| Filtres volume min / KD max | Flags CLI | facultatif |
| Seuil de chevauchement | Flag CLI `--overlap` (0.4 par défaut en mode SERP, 0.3 en mode lexical) | facultatif |

Si le JSON des SERP n'est pas disponible, vous pouvez en construire un rapidement en lançant le MCP de rank-tracker connecté de la marque (Ahrefs / SE Ranking / Semrush) pour chaque mot-clé de départ et en enregistrant les 10 premières URL. Ne sautez cette étape que si les mots-clés de départ sont trop nombreux pour justifier le coût en API — mais signalez le mode à confiance réduite dans le livrable final.

## Processus (10 étapes, sortie en fichiers numérotés)

Toutes les sorties vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/keyword-cluster/{YYYY-MM-DD}/`.

1. **`00-input.md`** — capturer les mots-clés de départ, la source, les filtres, le contexte de marque, l'horodatage de l'exécution
2. **`01-seed-expansion.md`** — si les mots-clés de départ sont < 20, les étendre via le MCP de keyword research de la marque (Ahrefs `getRelatedKeywords`, etc.) jusqu'à ~50–200 ; sinon, ignorer. Documenter la source de l'expansion.
3. **`02-filtered.csv`** — appliquer les filtres volume min / KD max / mots interdits. Enregistrer l'ensemble filtré en CSV (c'est ce que le script consomme).
4. **`03-serps.json`** — récupérer les 10 premières URL SERP par mot-clé via le rank-tracker connecté (ignorer si les SERP sont déjà fournies). **Garde-fou budgétaire** : si le coût estimé dépasse 500 crédits, afficher le coût et demander « Continuer ? (o/N — par défaut N) » avant de récupérer les données.
5. **`04-cluster-run.json`** — exécuter le script :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/keyword_cluster.py" \
       --keywords "${CLAUDE_PLUGIN_DATA}/{brand}/seo/keyword-cluster/{date}/02-filtered.csv" \
       --serps "${CLAUDE_PLUGIN_DATA}/{brand}/seo/keyword-cluster/{date}/03-serps.json" \
       --overlap 0.4 \
       --min-volume {profile.min_volume or 0} \
       --max-kd {profile.max_kd or 100} \
       --out "${CLAUDE_PLUGIN_DATA}/{brand}/seo/keyword-cluster/{date}/04-cluster-run.json"
   ```
6. **`05-quality-scorecard.md`** — lire le bloc `quality_scorecard` de `04-cluster-run.json`. Si `status: needs_review`, diagnostiquer :
   - `cannibalisation: fail` → deux clusters partagent le même pilier+intention. Fusionnez-les ou réattribuez le pilier du cluster de priorité inférieure.
   - `orphan: fail` → un cluster multi-mots-clés n'a 0 déclinaison. Retokénisez ses membres ou baissez `--overlap`.
   - `coverage: fail` → moins de 80 % des mots-clés de départ sont clusterisés. Baissez `--overlap` à 0.3 ou étendez les mots-clés de départ.
   - `anchor_diversity: fail` → les noms de piliers sont trop similaires. Réécrivez les noms de cluster avec des variations synonymiques.
   - `fragmentation_warning: true` (piliers seuls > 50 %) → seuil de chevauchement trop strict. Essayez d'abord `--overlap 0.3`.
7. **`06-pillar-pages.md`** — pour chaque cluster avec `priority_score >= 0.5`, rédiger un brief d'un paragraphe pour la page pilier (intention, audience, longueur cible, questions clés à traiter). Ces briefs alimentent `/digital-marketing-pro:content-brief`.
8. **`07-internal-link-map.md`** — vue en tableau des `internal_link_targets` issus de la sortie du script. Par cluster : vers quels autres clusters faire un lien + suggestions de texte d'ancre. C'est le fichier que votre équipe dev ou votre template CMS doit consommer.
9. **`08-build-order.md`** — trié par `priority_score` décroissant. Cadence de construction recommandée : les 10 % du haut au T1, les 30 % suivants au T2, le reste en backlog.
10. **`PLAN.md`** — résumé sur une seule page : statistiques + tableau de bord qualité + 5 clusters prioritaires + transmission au skill suivant de la chaîne.

## Format de sortie

```
${CLAUDE_PLUGIN_DATA}/{brand}/seo/keyword-cluster/2026-06-04/
├── 00-input.md
├── 01-seed-expansion.md      (uniquement si les mots-clés ont été étendus)
├── 02-filtered.csv
├── 03-serps.json             (si mode SERP)
├── 04-cluster-run.json       (sortie brute du script)
├── 05-quality-scorecard.md
├── 06-pillar-pages.md
├── 07-internal-link-map.md
├── 08-build-order.md
└── PLAN.md                   (le livrable)
```

`PLAN.md` est ce que vous transmettez à la marque / au client / au skill suivant. Tout le reste est un état intermédiaire auditable.

## Tableau de bord qualité (les quatre portes)

Chaque exécution produit un tableau de bord depuis `scripts/keyword_cluster.py`. **Les quatre doivent réussir** pour obtenir `status: ready` :

| Porte | Ce qu'elle vérifie | Pourquoi c'est important |
|---|---|---|
| **cannibalisation** | Aucun deux clusters ne partagent la même paire `(pillar, primary_intent)` | Évite de rédiger deux pages en concurrence pour la même SERP |
| **orphan** | Chaque cluster multi-mots-clés a ≥1 déclinaison (les clusters pilier seul sont exemptés et étiquetés) | Détecte les bugs de clustering où une tête de cluster n'a aucun sujet de support |
| **coverage** | ≥ 80 % des mots-clés de départ sont assignés à au moins un cluster | Détecte les mots-clés « poubelle » et les seuils trop stricts |
| **anchor_diversity** | Chaque cluster multi-mots-clés a ≥ 2 variantes de texte d'ancre suggérées | Empêche la sur-optimisation du texte d'ancre dans le graphe de maillage interne |

Un `fragmentation_warning: true` (piliers seuls > 50 %) est un signal **doux** — l'exécution est valide mais vous devriez envisager de baisser `--overlap` et de relancer.

## Transmissions de chaîne

Ce skill est un producteur dans la chaîne :

1. `/digital-marketing-pro:keyword-research` — génère les mots-clés de départ
2. **`/digital-marketing-pro:keyword-cluster`** — *ce skill*
3. `/digital-marketing-pro:content-brief` — consomme `PLAN.md` + `06-pillar-pages.md` pour briefer chaque pilier
4. `/digital-marketing-pro:content-engine` — rédige le contenu
5. `/digital-marketing-pro:seo-implement` — applique la carte de maillage interne au CMS

## Astuces et mises en garde

- **Le mode SERP est nettement supérieur au mode lexical.** Le clustering lexical ne peut pas voir que « shopify seo » et « ecommerce platform seo » ciblent des SERP qui se chevauchent alors que « shopify themes » n'en fait pas partie.
- **Les seuils de chevauchement par défaut sont prudents.** Si vous obtenez `fragmentation_warning: true`, baissez d'abord à 0.3. Si vous obtenez `cannibalisation: fail` avec trop peu de clusters, montez à 0.5.
- **Le score de priorité n'est pas un classement** — c'est un ordre de construction de départ. Un cluster avec `priority_score: 0.3` peut rester votre plus grande opportunité de conversion s'il correspond à une ligne de produit à forte marge. Utilisez les `business_goals` du profil de marque pour surcharger mécaniquement.
- **N'exécutez pas ce skill sur des exports GSC bruts** sans filtrage préalable. Les exports GSC contiennent des milliers de variantes longue traîne de la même requête — elles vont toutes se regrouper et produire un méga-cluster unique.
- **Les clusters pilier seul sont valides** — ils représentent des intentions distinctes qui manquent simplement de candidats déclinaisons dans votre ensemble de mots-clés de départ. Ajoutez des mots-clés via l'expansion de l'étape 2 si vous voulez des déclinaisons.
- **La carte de maillage interne est une suggestion, pas une consigne.** Le texte d'ancre final doit être revu pour la voix de marque (appliquer les champs de voix du profil de marque + `skills/context-engine/guidelines-framework.md`).

## Agents utilisés

- `seo-specialist` (principal) — interprétation + recommandations finales de pages piliers
- `competitive-intel` — pour le raisonnement sur le chevauchement SERP lorsque les résultats semblent surprenants
- `brand-guardian` — revue du texte d'ancre par rapport aux listes de termes interdits

## Voir aussi

- `/digital-marketing-pro:keyword-research` — génère les mots-clés de départ (à utiliser en premier)
- `/digital-marketing-pro:content-brief` — consomme le plan de cluster (à utiliser ensuite)
- `/digital-marketing-pro:seo-implement` — applique la carte de maillage interne au CMS
- `/digital-marketing-pro:seo-drift` — à relancer trimestriellement pour détecter la dérive des clusters
- `scripts/keyword_cluster.py` — le moteur de clustering sous-jacent

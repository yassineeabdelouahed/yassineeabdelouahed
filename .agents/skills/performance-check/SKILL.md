---
name: performance-check
description: "Puiser des métriques en direct depuis chaque MCP analytique connecté vers un instantané cross-canal unique : tableau de bord KPI avec statut RAG vs objectifs du profil, tendances période sur période, benchmarks sectoriels, principales réussites et préoccupations, et 3-5 actions recommandées — puis persister l'instantané via performance-monitor.py pour l'historique de tendance. Se déclenche sur \"/digital-marketing-pro:performance-check\", \"how are our marketing metrics\", \"pull current KPIs\", \"quick performance snapshot\", \"are we hitting our targets\". Lit le profil de marque pour les objectifs KPI et les benchmarks sectoriels ; signale les lacunes de données pour les plateformes non connectées. Se combine avec /digital-marketing-pro:performance-report, qui transforme ces instantanés en récit pour les parties prenantes."
user-invocable: true
triggers:
  - check marketing performance
  - pull current KPIs
  - performance snapshot
  - how are our marketing metrics
  - compare performance to targets
  - marketing performance check
  - quick KPI health check
  - check campaign performance
---

# /digital-marketing-pro:performance-check

## Objectif

Puiser des métriques en direct depuis tous les MCP analytiques connectés et produire un instantané de performance complet. Compare la performance actuelle aux objectifs KPI définis dans le profil de marque, aux benchmarks de la période précédente, et aux moyennes sectorielles. Conçu pour des contrôles de santé rapides — à exécuter quotidiennement, hebdomadairement, ou à la demande pour rester au fait de la performance marketing sans naviguer entre les plateformes.

**Périmètre (vs `/digital-marketing-pro:performance-report`) :** ce skill est la couche de **récupération en direct + persistance d'instantané** — il récupère les métriques actuelles depuis les plateformes et enregistre un instantané pour l'historique de tendance. Lorsqu'un livrable narratif et formaté pour les parties prenantes est nécessaire (synthèse exécutive, commentaire par canal, recommandations priorisées, formatage à l'image de la marque), exécuter `/digital-marketing-pro:performance-report`, qui consomme les instantanés persistés par ce skill plutôt que de les récupérer à nouveau. Utiliser `performance-check` pour *voir les chiffres maintenant* ; utiliser `performance-report` pour *raconter l'histoire*.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Période** : Aujourd'hui, cette semaine, ce mois, ce trimestre, ou une plage de dates personnalisée (par exemple, « 14 derniers jours », « 1er janvier - 31 janvier »)
- **Focus par canal** (optionnel) : Canaux ou plateformes spécifiques à prioriser (par exemple, « recherche payante uniquement », « email et social »).
  Si omis, toutes les plateformes connectées sont incluses
- **Période de comparaison** (optionnel) : Période à comparer — période précédente, même période l'an dernier, ou plage personnalisée.
  Par défaut, la période précédente équivalente
- **Objectifs KPI** (optionnel) : Remplacer les objectifs pour ce contrôle.
  Si omis, les objectifs sont puisés depuis les objectifs et paramètres KPI de profile.json
- **Granularité** (optionnel) : Vue journalière, hebdomadaire, ou agrégée. Par défaut, vue agrégée pour la période sélectionnée

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Détecter les MCP analytiques connectés** : Vérifier `.mcp.json` et les connexions MCP actives pour identifier quelles plateformes sont disponibles
   (google-analytics, google-ads, meta-marketing, linkedin-marketing, tiktok-ads, mailchimp, stripe, mixpanel, amplitude, shopify, etc.).
   Journaliser toute plateforme attendue mais non connectée afin que l'utilisateur soit informé des lacunes de couverture.
3. **Puiser les métriques depuis chaque plateforme connectée** : Demander les métriques clés pour la période spécifiée :
   - Trafic : sessions, utilisateurs, pages vues, nouveaux vs récurrents (isoler le canal par défaut GA4 **« AI Assistant »** — les référencements depuis ChatGPT, Gemini, Copilot, Perplexity, etc. — pour que le trafic issu de l'IA ne soit pas noyé sous Référent/Direct)
   - Publicités : impressions, clics, dépense, CPC, CPM
   - Conversions : leads, achats, inscriptions, réalisations d'objectifs
   - Revenu : revenu total, valeur moyenne de commande, nombre de transactions
   - Engagement : taux d'ouverture, taux de clic, taux de rebond, temps sur le site
   - Spécifique à la plateforme : délivrabilité email, portée sociale, vues vidéo, installations d'app
4. **Agréger en un tableau de bord unifié** : Normaliser les métriques entre plateformes en une vue cross-canal unique avec une nomenclature cohérente, conversion de devise si multi-devises, et comptages de conversion dédupliqués là où les plateformes se chevauchent
5. **Calculer les KPI vs objectifs** : Comparer les valeurs réelles aux objectifs de `profile.json` — signaler en vert (dans les temps ou dépassant), jaune (dans les 10 % de l'objectif), ou rouge (manqué de plus de 10 %). Inclure la variance absolue et en pourcentage pour chaque KPI.
6. **Comparer à la période précédente** : Calculer le changement période sur période pour chaque métrique et associer une direction de tendance (hausse/baisse/stable) avec le pourcentage de changement. Si des données d'une année sur l'autre sont disponibles, les inclure comme point de référence secondaire.
7. **Benchmarker par rapport au secteur** : Référencer `skills/context-engine/industry-profiles.md` pour le secteur de la marque afin de contextualiser la performance par rapport aux moyennes de la catégorie. Signaler les métriques significativement au-dessus ou en dessous des normes sectorielles.
8. **Identifier les constats notables** : Faire ressortir les 3 principales réussites (métriques les plus performantes ou plus grandes améliorations), les 3 principales préoccupations (métriques sous-performantes ou en déclin), et tout changement matériel justifiant une investigation plus approfondie. Avant de qualifier un changement de taux de conversion de « statistiquement significatif », le confirmer avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/significance-tester.py" --control-visitors {n} --control-conversions {n} --variant-visitors {n} --variant-conversions {n} --confidence 0.95` — ne jamais qualifier un mouvement de significatif sur la seule base d'un écart de pourcentage brut.
9. **Générer des actions recommandées** : Sur la base des données, produire 3 à 5 prochaines étapes spécifiques et actionnables — par exemple, « Mettre en pause l'ad set X sous-performant », « Augmenter le budget sur le canal Y à fort ROAS », « Investiguer la baisse de trafic sur Z », « Mettre à l'échelle la variante créative gagnante », « Exécuter /digital-marketing-pro:anomaly-scan pour un diagnostic plus approfondi ».
10. **Enregistrer l'instantané de performance** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand {slug} --action save-snapshot --data '{...métriques actuelles...}'`
    pour persister l'instantané pour la comparaison historique et le suivi de tendance sur les futures exécutions.
11. **Journaliser les insights significatifs** : Pour toute métrique présentant une déviation notable, enregistrer via
    `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action save-insight --data '{"type":"anomaly","insight":"...","context":"..."}'`
    afin que les constats apparaissent dans les futurs rapports et la planification de campagne.

## Résultat

Un instantané de performance structuré contenant :

- **Synthèse exécutive** : Aperçu de 2-3 phrases de la santé marketing globale avec le constat le plus important mis en évidence
- **Tableau de métriques canal par canal** : Trafic, impressions, clics, conversions, revenu, dépense, CPA, ROAS, et taux d'engagement
  par plateforme — triable par n'importe quelle colonne
- **Tableau de bord KPI** : Chaque KPI suivi avec valeur réelle, valeur cible, pourcentage de l'objectif, variance (absolue et %),
  flèche de tendance (vs période précédente), et statut RAG (rouge/orange/vert)
- **Résumé cross-canal** : Dépense totale, conversions totales, CPA consolidé, ROAS consolidé, revenu total, ratio
  d'efficacité marketing, et évaluation globale de la santé
- **Comparaison période sur période** : Changement en pourcentage pour toutes les métriques clés vs la période de comparaison avec des
  indicateurs directionnels et des données de tendance de type sparkline
- **Contexte de benchmark sectoriel** : Comparaison des métriques clés aux moyennes sectorielles issues de industry-profiles.md, avec un
  classement en percentile là où les données sont disponibles
- **Constats notables** : Top 3 des réussites, top 3 des préoccupations, et toute anomalie méritant une investigation plus approfondie — chacune avec des
  points de données à l'appui et un indicateur de sévérité
- **Actions recommandées** : 3 à 5 prochaines étapes spécifiques avec classement de priorité, impact attendu, et la plateforme ou campagne
  à laquelle chaque action s'applique
- **Lacunes de données** : Toute plateforme attendue mais non connectée, métriques n'ayant pas pu être récupérées, ou périodes
  avec des données incomplètes — afin que l'utilisateur sache ce qui manque au tableau

## Agents utilisés

- **analytics-analyst** — Interprétation des métriques, analyse des KPI, normalisation cross-canal, identification des tendances, benchmarking sectoriel, génération d'insights, et recommandation d'actions
- **performance-monitor-agent** — Agrégation des données depuis les MCP connectés, comparaison de référence, persistance des instantanés, analyse de tendance historique, et détection des lacunes

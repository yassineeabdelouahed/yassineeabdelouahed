---
name: quality-report
description: "Rendre compte des tendances de qualité de contenu dans le temps à partir des évaluations journalisées : graphiques de tendance de score hebdomadaires, un classement par type de contenu, une répartition de performance par dimension, des alertes de régression signalées statistiquement, les meilleurs et pires exemples de contenu, et 3-7 recommandations d'amélioration priorisées. Se déclenche sur \"/digital-marketing-pro:quality-report\", \"is our content quality improving\", \"show quality trends for the last month\", \"which content types score worst\", \"any quality regressions lately\". Puise les données via quality-tracker.py depuis les évaluations journalisées par /digital-marketing-pro:eval-content — exécutez d'abord des évaluations sinon il n'y a rien à rapporter. Lit le profil de marque pour les objectifs de qualité et eval-rubrics.md pour les stratégies d'amélioration spécifiques par dimension."
---

# /digital-marketing-pro:quality-report

## Objectif

Intelligence de qualité rapportée dans le temps. Montre les tendances de score d'évaluation à travers les jours et les semaines, identifie quels types de contenu s'améliorent ou déclinent, détecte les alertes de régression où la qualité est tombée en dessous des références établies, fait ressortir le meilleur et le pire contenu de la marque, et fournit des recommandations actionnables pour améliorer la qualité de contenu à travers l'organisation.

Cette commande transforme les données d'évaluation journalisées par /digital-marketing-pro:eval-content en insight stratégique. Au lieu d'évaluer une seule pièce de contenu, elle analyse le motif à travers toutes les évaluations pour répondre à : Notre qualité de contenu s'améliore-t-elle ou décline-t-elle ? Quels types de contenu sont les plus forts ? Quelles dimensions nécessitent le plus de travail ? Y a-t-il des régressions à adresser ? Quels changements spécifiques auront le plus grand impact sur la qualité globale ?

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Période** (optionnel) : La fenêtre de reporting — `7d`, `14d`, `30d`, `60d`, `90d`, ou une plage de dates personnalisée (`AAAA-MM-JJ to AAAA-MM-JJ`). Par défaut, 30 jours. Les périodes plus longues offrent une meilleure visibilité de tendance mais peuvent inclure des données obsolètes d'avant des changements de processus
- **Filtre de type de contenu** (optionnel) : Concentrer le rapport sur un type de contenu spécifique — `blog_post`, `email`, `ad_copy`, `social_post`, `landing_page`, `press_release`, `content_brief`, `campaign_plan`, ou `all`. Par défaut, tous les types. Utile pour approfondir la trajectoire de qualité d'un flux de contenu spécifique
- **Focus de dimension** (optionnel) : Se concentrer sur une dimension de notation spécifique — `content_quality`, `brand_voice`, `hallucination_risk`, `claim_verification`, `output_structure`, `readability`, ou `all`. Par défaut, toutes les dimensions. Utile lorsque l'équipe travaille à améliorer un aspect de qualité spécifique

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer les standards de qualité de la marque et le contexte sectoriel pour la comparaison de benchmark. Vérifier également les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger tout objectif de qualité ou définition de SLA. Vérifier les procédures d'agence à `~/.claude-marketing/sops/` — les workflows d'agence peuvent définir des seuils de qualité minimum pour les livrables client. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Extraire les tendances de qualité** : Exécuter `scripts/quality-tracker.py --brand {slug} --action get-trends --days {period}` pour récupérer les données d'évaluation en série temporelle — scores composites et scores par dimension tracés sur la fenêtre de reporting. Si un filtre de type de contenu est appliqué, passer `--content-type {content_type}`. Cela retourne des agrégats journaliers et hebdomadaires, des moyennes mobiles, et des indicateurs de direction de tendance.
3. **Extraire le résumé de qualité** : Exécuter `scripts/quality-tracker.py --brand {slug} --action get-summary --days {period}` pour récupérer des statistiques agrégées — nombre total d'évaluations exécutées, score composite moyen, distribution des notes (combien de A, B, C, etc.), répartition réussite/échec/revue, et moyennes par dimension avec écarts-types.
4. **Vérifier les régressions** : Exécuter `scripts/quality-tracker.py --brand {slug} --action check-regression --days {period}` pour détecter les baisses de qualité statistiquement significatives. Le détecteur de régression compare la moyenne des 7 derniers jours à la référence de la période complète et signale toute dimension ou type de contenu où la qualité a décliné de plus d'un écart-type. Chaque alerte de régression inclut la sévérité (mineure, modérée, sévère), la dimension ou le type de contenu affecté, la valeur de référence, la valeur actuelle, et la direction de la tendance.
5. **Extraire le meilleur et le pire contenu** : Exécuter `scripts/quality-tracker.py --brand {slug} --action get-best --days {period} --limit 5` et `scripts/quality-tracker.py --brand {slug} --action get-worst --days {period} --limit 5` pour récupérer les évaluations les mieux et les moins bien notées de la période. Elles fournissent des exemples concrets illustrant à quoi ressemble une bonne et une mauvaise qualité pour cette marque.
6. **Analyser les motifs** : Synthétiser les données de tendance, les statistiques résumées, les alertes de régression, et les meilleurs/pires exemples pour identifier des motifs actionnables :
   - Quels types de contenu notent constamment le plus haut et le plus bas — et ce qui les différencie
   - Quelles dimensions sont les forces et les faiblesses de la marque — et comment cela se mappe aux problèmes courants
   - Si la qualité tend à la hausse, est stable, ou en déclin — et à quoi correspondent les points d'inflexion (changements de processus, changements d'équipe, nouveaux modèles, mises à jour de guidelines)
   - Ce que le contenu le plus performant a en commun par rapport au contenu le moins performant
   - S'il existe des effets de jour de la semaine ou de volume (la qualité chute quand plus de contenu est produit)
7. **Générer des recommandations** : Sur la base de l'analyse de motifs, produire des recommandations spécifiques et priorisées pour améliorer la qualité. Chaque recommandation inclut le problème qu'elle adresse, l'impact attendu (quelle dimension et de combien), l'action suggérée (changement de processus, mise à jour de modèle, focus de formation, configuration d'outil), et un exemple concret. Référencer `skills/context-engine/eval-rubrics.md` pour des stratégies d'amélioration spécifiques par dimension.
8. **Formater comme un rapport prêt pour l'exécutif** : Structurer le résultat à la fois pour un balayage rapide (synthèse exécutive avec métriques clés) et une revue détaillée (données de tendance complètes, détails de régression, recommandations avec justification).

## Résultat

Un rapport d'intelligence de qualité structuré contenant :

- **Synthèse exécutive** : Aperçu de 3-5 puces — total d'évaluations sur la période, score composite moyen avec note, direction de la tendance de qualité (amélioration/stable/déclin avec pourcentage de changement), nombre d'alertes de régression, et la recommandation unique la plus impactante
- **Métriques de qualité globales** : Total des évaluations exécutées, score composite moyen, score composite médian, écart-type, distribution des notes (nombre et pourcentage pour chaque note), répartition réussite/échec/revue (nombre et pourcentage), et comparaison à la période précédente (si des données existent)
- **Graphique de tendance hebdomadaire** : Visualisation textuelle montrant le score composite par semaine sur la période de reporting — formatée en graphique ASCII simple ou tableau structuré avec moyennes, hauts, bas hebdomadaires, et nombre d'évaluations. Inclut un indicateur de ligne de tendance (ascendant, plat, descendant) et des pourcentages de changement semaine sur semaine
- **Classement par type de contenu** : Tableau classé des types de contenu par score composite moyen — montrant le type de contenu, le nombre d'évaluations, le composite moyen, la note, la meilleure et la pire dimension, et la direction de la tendance. Met en évidence quels types de contenu s'améliorent le plus vite et lesquels déclinent
- **Répartition de performance par dimension** : Pour chacune des six dimensions de notation — score moyen, direction de tendance, nombre d'échecs (en dessous du seuil), problèmes les plus courants, et les types de contenu où cette dimension note le plus bas. Si un focus de dimension a été demandé, fournir une analyse plus approfondie pour cette dimension incluant un histogramme de distribution de score et une catégorisation des motifs d'échec
- **Alertes de régression** : Chaque régression avec niveau de sévérité (mineure/modérée/sévère), la dimension ou le type de contenu affecté, la valeur de référence, la valeur actuelle, l'ampleur du déclin (en points et en pourcentage), la période probable où la régression a commencé, et les causes potentielles basées sur la corrélation avec d'autres points de données. Trié par sévérité — régressions sévères en premier
- **Meilleur contenu performant** : Top 5 des évaluations avec le type de contenu, le score composite, la note, les dimensions marquantes, et ce qui a fait que ce contenu note bien — motifs actionnables à reproduire
- **Pire contenu performant** : Bottom 5 des évaluations avec le type de contenu, le score composite, la note, les dimensions en échec, et les problèmes spécifiques qui ont tiré les scores vers le bas — problèmes actionnables à éviter
- **Recommandations d'amélioration de qualité** : Liste priorisée de 3 à 7 recommandations spécifiques, chacune avec :
  - Le problème ou motif qu'elle adresse
  - L'impact attendu (quelles dimensions s'améliorent et de combien)
  - L'action spécifique à entreprendre (mettre à jour un modèle, configurer un seuil, ajuster un processus, concentrer la formation sur une dimension)
  - Un exemple concret ou une illustration avant/après
  - Niveau d'effort (gain rapide, effort modéré, investissement significatif)
- **Comparaison à la période précédente** : Si suffisamment de données historiques existent, comparaison côte à côte des métriques clés entre la période actuelle et la période équivalente précédente — montrant l'amélioration ou le déclin à travers le score composite, le taux de réussite, les moyennes par dimension, et le nombre de régressions

## Agents utilisés

- **quality-assurance** — Récupération et agrégation des données de qualité depuis le journal d'évaluation, détection de régression par comparaison de référence statistique, identification du meilleur/pire contenu avec extraction de motifs, calcul de distribution des notes, et calcul de tendance à travers la fenêtre de reporting
- **analytics-analyst** — Interprétation de tendance et analyse de motifs à travers les types de contenu et les dimensions, identification de corrélation entre les changements de qualité et les facteurs de processus ou d'équipe, génération de recommandations ancrées dans les motifs de données plutôt que des conseils génériques, synthèse de synthèse exécutive, et analyse comparative de période avec contexte statistique

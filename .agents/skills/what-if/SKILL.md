---
name: what-if
description: "Comparer 2 à 4 scénarios de budget marketing côte à côte avec des projections directionnelles à estimation ponctuelle — revenu, ROI, et risque par scénario, écarts par rapport à la référence actuelle, et une recommandation avec les principaux compromis explicités. L'alternative rapide au Monte Carlo complet via /digital-marketing-pro:simulate ; les sorties sont des aides à la planification construites à partir d'hypothèses énoncées, pas des prévisions. Se déclenche sur \"/digital-marketing-pro:what-if\", \"should we shift budget from paid to content\", \"compare these two budget splits\", \"what happens if we double the ads budget\", \"quick scenario check before the meeting\". Exécute revenue-simulator.py en mode what-if et se calibre par rapport à la performance historique par canal du profil de marque."
---

# /digital-marketing-pro:what-if

## Objectif

Outil de comparaison rapide de scénarios. Tester 2 à 4 scénarios marketing les uns contre les autres — différentes allocations budgétaires, mix de canaux, ou approches stratégiques — et voir les résultats projetés côte à côte. C'est l'alternative plus légère et plus rapide à la simulation Monte Carlo complète (`/digital-marketing-pro:simulate`). Là où simulate exécute des milliers d'itérations avec des distributions de probabilité complètes, what-if utilise des estimations ponctuelles avec de simples bandes de variance pour donner des réponses directionnelles en quelques minutes. À utiliser pour une prise de décision rapide lorsque vous avez besoin d'un avis rapide sur « devrions-nous faire A ou B ? » sans la profondeur statistique d'une simulation complète — réunions d'équipe, discussions Slack, appels de planification rapides, ou pour affiner les options avant d'exécuter une analyse plus approfondie.

> **Sortie simulée — pas une prévision.** Les projections de what-if sont des estimations ponctuelles directionnelles produites par `revenue-simulator.py` à partir de vos hypothèses énoncées et de benchmarks historiques, pas des prédictions mesurées. Traiter chaque chiffre de scénario comme une aide à la planification : valider les hypothèses de ROI par rapport à vos propres données avant d'engager un budget. Tous les chiffres en dollars donnés en exemple dans cette compétence sont SYNTHÉTIQUES (illustratifs uniquement — ne jamais réutiliser ces chiffres).

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Scénarios à comparer** : 2 à 4 scénarios nommés, chacun avec des allocations budgétaires au niveau du canal et un ROI attendu par canal. Exemples : « Scénario A : lourd en payant — 50 000 $ Google Ads, 30 000 $ Meta, 10 000 $ e-mail » vs « Scénario B : porté par le contenu — 20 000 $ Google Ads, 15 000 $ Meta, 40 000 $ contenu, 15 000 $ SEO ». Chaque scénario a besoin d'un nom descriptif et d'une répartition budgétaire par canal. Si l'utilisateur ne fournit que des descriptions de haut niveau (« plus sur le payant, moins sur l'organique »), demander des allocations en dollars précises ou des répartitions en pourcentage
- **Référence actuelle** : l'allocation budgétaire existante et la performance récente comme point de référence pour la comparaison — ce que la marque fait actuellement afin que chaque scénario montre un écart clair. Si non fourni, extraire des données historiques du contexte de marque
- **Critères d'évaluation (optionnel)** : ce qui compte le plus pour cette décision — revenu total, efficacité du ROI, niveau de risque, rapidité d'impact, ou une combinaison pondérée. Par défaut le revenu attendu si non spécifié
- **Horizon temporel (optionnel)** : à quelle distance projeter — par défaut 3 mois. Les horizons plus courts favorisent les canaux payants, les horizons plus longs favorisent les investissements organiques et de contenu en raison des effets composés

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Extraire la performance historique par canal, les données de ROI récentes, et les benchmarks connus pour calibrer les projections de scénario. Vérifier aussi la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut sectorielles.
2. **Définir la référence actuelle et les scénarios alternatifs** : structurer l'état actuel comme le Scénario 0 (référence) avec des données de performance récentes réelles. Puis définir chaque scénario utilisateur avec des budgets par canal et des hypothèses de ROI — en utilisant les données historiques de la marque lorsqu'elles sont disponibles, les benchmarks sectoriels sinon. Signaler toute hypothèse s'écartant significativement de la performance historique afin que l'utilisateur puisse la valider.
3. **Exécuter une simulation rapide** : exécuter `revenue-simulator.py` en mode what-if — une projection simplifiée qui calcule le revenu attendu par scénario en utilisant des estimations ponctuelles avec des bandes de variance (pas un Monte Carlo complet), applique des rendements décroissants basiques pour les canaux proches de la saturation, et tient compte du temps de montée en puissance par canal (le SEO et le contenu prennent des mois à livrer, le payant est immédiat). Exécution plus rapide, précision directionnelle.
4. **Comparer les résultats projetés** : construire un tableau de comparaison côte à côte montrant le revenu projeté de chaque scénario, le ROI total, l'écart par rapport à la référence (à la fois en dollars absolus et en pourcentage), la contribution au niveau canal, et un indicateur de risque simple (faible/moyen/élevé selon la concentration et la sensibilité aux hypothèses). Classer les scénarios selon les critères d'évaluation de l'utilisateur.
5. **Identifier le meilleur scénario et les principaux compromis** : sélectionner le scénario avec le meilleur rendement attendu et le scénario avec le meilleur rendement ajusté au risque (s'il diffère). Articuler les principaux compromis entre les meilleures options — ce que vous gagnez, ce que vous sacrifiez, et quelles hypothèses devraient se vérifier pour que chacune livre comme projeté.

## Sortie

Une comparaison de scénarios concise contenant :

- **Comparaison de scénarios côte à côte** : chaque scénario montrant le revenu projeté, le ROI total, le coût, et le niveau de risque — formaté comme un tableau de comparaison propre avec la référence comme colonne de référence et les écarts mis en évidence pour chaque alternative
- **Écart par rapport à la référence actuelle** : par scénario, le changement absolu et en pourcentage du revenu projeté, du ROI, et du coût par rapport à ce que la marque fait aujourd'hui — rendant immédiatement clair si chaque scénario est une amélioration et de combien
- **Recommandation avec raisonnement** : le scénario recommandé avec une explication claire du pourquoi — équilibrant le rendement attendu, le risque, la faisabilité, et l'alignement avec les objectifs de marque. Si deux scénarios sont proches, expliquer ce qui ferait pencher la décision dans un sens ou dans l'autre
- **Principaux compromis entre les meilleurs scénarios** : les gains et sacrifices précis de choisir un scénario de tête plutôt qu'un autre — dépendances de canal, différences de temps de montée en puissance, concentration du risque, et réversibilité si le pari ne paie pas

## Agents utilisés

- **marketing-scientist** — modélisation de scénarios avec estimations ponctuelles et bandes de variance, projection de ROI par canal avec ajustements de temps de montée en puissance et de rendements décroissants, analyse de comparaison côte à côte avec calculs d'écarts, évaluation des risques selon la sensibilité aux hypothèses et la concentration par canal, et synthèse de recommandation équilibrant le rendement attendu par rapport au profil de risque et à l'adéquation stratégique
</content>

---
name: qbr-plan
description: "Préparer un package complet de Revue Business Trimestrielle à partir des données de campagne du trimestre : une scorecard de performance objectifs vs réels vs benchmarks, top 3 des réussites avec histoires d'attribution, analyse des causes racines des sous-performances, décomposition du ROI et de l'efficacité budgétaire, 3-5 recommandations stratégiques, cas d'affaires d'upsell, une feuille de route pour le prochain trimestre, des éléments d'action avec responsables, et un score de santé de compte. Se déclenche sur \"/digital-marketing-pro:qbr-plan\", \"prepare the QBR\", \"build the quarterly review for this client\", \"quarterly business review deck\", \"summarize the quarter for the client meeting\". Lit le profil de marque, les guidelines, les modèles personnalisés, et les procédures d'agence ; travaille à partir des données de campagne fournies par l'utilisateur et structure le contenu de la présentation — il ne récupère pas lui-même les métriques de plateforme en direct."
---

# /digital-marketing-pro:qbr-plan

## Objectif

Préparer une présentation de Revue Business Trimestrielle complète avec rétrospective de performance, insights stratégiques, et feuille de route prospective. Traduit les données brutes de campagne en un récit convaincant qui démontre la valeur, adresse les défis avec transparence, et construit la confiance dans la stratégie du prochain trimestre.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Trimestre en revue** : Trimestre et année spécifiques (par exemple, Q4 2025) et la plage de dates exacte couverte
- **Campagnes et canaux actifs** : Toutes les campagnes ayant tourné pendant le trimestre avec les canaux, objectifs, et statut (actif, en pause, terminé)
- **Objectifs vs résultats réels** : Cibles trimestrielles initiales et performance réelle pour chaque KPI — trafic, leads, conversions, revenu, ROAS, etc.
- **Budget vs dépense réelle** : Allocation budgétaire planifiée par canal et dépense réelle avec explications des écarts
- **Réussites et défis clés** : Succès notables méritant d'être mis en avant et obstacles rencontrés avec évaluation de l'impact
- **Objectifs du prochain trimestre** : Objectifs métier et priorités marketing déjà identifiés pour le trimestre à venir
- **Signaux de satisfaction client** : Scores NPS, retours reçus, tickets de support, ou sentiment qualitatif de l'équipe cliente
- **Opportunités d'upsell/cross-sell** : Services additionnels, périmètre élargi, ou nouveaux canaux dont le client pourrait bénéficier
- **Évolutions concurrentielles** : Mouvements notables des concurrents, changements de marché, ou tendances sectorielles observées pendant le trimestre
- **Changements d'équipe** : Tout changement de staffing côté agence ou client ayant affecté l'engagement

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les guidelines** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Agréger les données de performance de campagne** : Organiser toutes les métriques de campagne par canal et objectif — impressions, clics, conversions, dépense, revenu, et métriques dérivées (CTR, CPC, CPA, ROAS, taux de conversion)
3. **Comparer les résultats aux objectifs et benchmarks** : Mapper la performance réelle aux cibles trimestrielles, aux résultats du trimestre précédent, et aux benchmarks sectoriels pour montrer la progression, la régression, ou une performance exceptionnelle
4. **Identifier les principales réussites avec attribution** : Sélectionner les 3 réussites les plus impactantes du trimestre et construire des histoires d'attribution — ce qui a été fait, pourquoi ça a fonctionné, et comment ça se connecte aux résultats métier
5. **Analyser les sous-performances avec causes racines** : Pour tout KPI ayant manqué son objectif, mener une analyse de cause racine — facteurs externes (marché, saisonnalité, concurrence), facteurs internes (budget, créatif, timing), et actions correctives prises ou recommandées
6. **Calculer le ROI et l'efficacité budgétaire** : Calculer le ROI global et par canal, les tendances de coût par acquisition, le taux d'utilisation du budget, et les gains ou pertes d'efficacité par rapport aux trimestres précédents
7. **Évaluer les évolutions du paysage concurrentiel** : Résumer l'activité concurrentielle notable — nouvelles campagnes, entrées de marché, changements de prix, ou évolutions de positionnement ayant affecté ou pouvant affecter la performance
8. **Développer des recommandations stratégiques pour le prochain trimestre** : Formuler 3 à 5 recommandations spécifiques et actionnables liées aux insights de données — quoi mettre à l'échelle, quoi arrêter, quoi tester, et quoi surveiller
9. **Identifier les opportunités d'upsell** : Mapper les lacunes de couverture actuelle ou les opportunités émergentes vers des services additionnels avec une justification de cas d'affaires (impact projeté et investissement requis)
10. **Construire la structure des slides exécutives** : Concevoir le flux de la présentation — synthèse exécutive d'abord, puis analyse approfondie de la performance, insights stratégiques, et plan prospectif — optimisé pour une réunion de 45-60 minutes
11. **Créer une annexe avec les données détaillées** : Compiler les tableaux de données granulaires, les répartitions au niveau campagne, et les métriques à l'appui qui étayent le récit principal sans encombrer les slides centraux
12. **Ajouter les éléments d'action des prochaines étapes avec responsables** : Définir les éléments d'action spécifiques émergeant de la QBR avec la partie responsable (agence ou client), l'échéance, et les critères de succès pour chacun

## Résultat

Un package de présentation QBR structuré contenant :

- **Slide de synthèse exécutive** : Aperçu d'une page avec les points forts du trimestre, le score global par rapport aux objectifs, et le principal enseignement pour la direction
- **Scorecard de performance** : Objectifs vs réels vs benchmarks dans un format tableau lisible d'un coup d'œil avec des indicateurs de statut codés par couleur (dans les temps, à risque, manqué)
- **Analyse campagne par campagne** : Résumés de performance de chaque campagne individuelle avec métriques, insights, et actions d'optimisation prises
- **Analyse d'efficacité budgétaire** : Dépense vs retour par canal avec taux d'utilisation, lignes de tendance de coût, et comparaison d'efficacité aux trimestres précédents
- **Top 3 des réussites avec histoire d'attribution** : Décomposition détaillée des plus grands succès — ce qui les a portés, l'impact mesuré, et comment le reproduire
- **Analyse des sous-performances avec actions correctives** : Évaluation honnête des manquements avec cause racine, quantification de l'impact, et étapes correctives spécifiques (prises et planifiées)
- **Mise à jour d'intelligence concurrentielle** : Résumé des mouvements concurrentiels notables et des évolutions de marché avec implications pour la stratégie
- **Recommandations stratégiques (3-5)** : Recommandations étayées par les données pour le prochain trimestre avec impact attendu, investissement nécessaire, et calendrier de mise en œuvre
- **Opportunités d'upsell/cross-sell avec cas d'affaires** : Recommandations de service ou périmètre additionnel avec ROI projeté et exigences d'investissement
- **Feuille de route du prochain trimestre avec jalons** : Plan par phase pour le trimestre à venir avec livrables clés, dates de lancement, et revues de points de contrôle
- **Annexe avec tableaux de données brutes** : Données de performance granulaires, métriques complètes de campagne, et calculs à l'appui pour référence
- **Éléments d'action avec responsables et échéances** : Prochaines étapes spécifiques issues de la QBR avec responsable assigné (agence/client), date d'échéance, et critères de succès
- **Score de santé de compte (1-10)** : Score composite basé sur la performance, la santé de la relation, la trajectoire de croissance, et les facteurs de risque avec la justification de la notation

## Agents utilisés

- **analytics-analyst** — Agrégation des données de performance, analyse objectif vs réel, calculs de ROI, benchmarking, analyse d'efficacité budgétaire, conception de scorecard, et compilation des données d'annexe
- **marketing-strategist** — Recommandations stratégiques, évaluation concurrentielle, identification d'opportunités d'upsell, récit exécutif, développement de feuille de route, et scoring de santé de compte

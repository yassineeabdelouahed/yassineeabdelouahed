# Guide de la science marketing

Connaissances de référence pour la science marketing, l'inférence causale, la modélisation prédictive et la rigueur expérimentale. Utilisez ce guide pour ancrer les recommandations dans des méthodes statistiques plutôt que dans l'intuition.

---

## 1. Modélisation bayésienne du mix marketing (MMM)

### Ce que c'est
Un modèle statistique qui décompose le chiffre d'affaires (ou les conversions) en contributions de chaque canal marketing plus des facteurs externes. Contrairement aux modèles d'attribution qui attribuent du crédit aux points de contact, le MMM fonctionne avec des données agrégées et capture les effets offline + online ensemble.

### Pourquoi bayésien plutôt que fréquentiste
- **Quantification de l'incertitude** : Produit des intervalles de crédibilité, pas des estimations ponctuelles — « la TV génère 120 000 $-180 000 $/mois » est plus utile que « la TV génère 150 000 $ »
- **Fonctionne avec des données limitées** : Les priors bayésiens compensent quand vous avez moins de 3 ans de données
- **Intègre les connaissances du domaine** : Définir des priors à partir de références sectorielles (par ex. « la demi-vie de l'adstock TV est typiquement de 3 à 6 semaines ») pour régulariser les estimations
- **Gère mieux la colinéarité** : Les canaux qui dépensent toujours ensemble (courant en marketing) causent une instabilité dans les modèles fréquentistes ; les priors stabilisent les estimations bayésiennes
- **Mise à jour itérative** : À mesure que de nouvelles données arrivent, mettre à jour la postérieure sans reconstruire depuis zéro

### Composants clés
- **Transformation adstock** : Modélise l'effet de report de la publicité — une publicité TV vue aujourd'hui influence encore les achats la semaine prochaine. Paramétré par le taux de décroissance (à quelle vitesse l'effet s'estompe) et optionnellement le décalage (délai avant l'effet de pic). Adstock géométrique : `adstock_t = spend_t + decay * adstock_{t-1}`. Taux de décroissance typiques : TV 0,7-0,9, display digital 0,3-0,5, recherche 0,1-0,2, social 0,3-0,6
- **Courbes de saturation** : Modélisent les rendements décroissants — les premiers 10 000 $ sur Facebook génèrent plus d'incrémental que les dixièmes 10 000 $. Fonction de Hill : `response = max_response * (spend^slope) / (half_saturation^slope + spend^slope)`. Le paramètre de demi-saturation (K) représente le niveau de dépense auquel vous obtenez 50 % de la réponse maximale
- **Coefficients variables dans le temps** : Saisonnalité, tendance et changements de régime. L'efficacité de la TV en décembre diffère de celle de mars. Utiliser des termes de Fourier ou des effets temporels hiérarchiques
- **Variables de contrôle** : Changements de prix, promotions, activité concurrentielle, météo, jours fériés, évolutions macroéconomiques, impacts du COVID, lancements de produits

### Exigences de données
- **Minimum** : 2 ans de données hebdomadaires (104 observations). 3 ans ou plus préférés
- **Données de canal** : Dépense hebdomadaire par canal (pas les impressions — la dépense est la variable de décision)
- **Variable de réponse** : Chiffre d'affaires, conversions ou leads hebdomadaires
- **Facteurs externes** : Indices météorologiques, indicateurs de jours fériés, dépenses concurrentes (si disponibles), indicateurs économiques
- **Granularité** : L'hebdomadaire est la norme. Le quotidien ajoute du bruit sans améliorer le signal pour la plupart des canaux. Le mensuel perd trop d'information

### Interpréter les résultats
- **% de contribution par canal** : Quelle fraction du chiffre d'affaires total chaque canal génère (y compris la base/organique)
- **ROI par canal** : Chiffre d'affaires généré par dollar dépensé, avec intervalles de crédibilité
- **ROI marginal** : Le rendement du PROCHAIN dollar dépensé (plus utile que le ROI moyen pour les décisions budgétaires)
- **Allocation budgétaire optimale** : Déplacer le budget des canaux à faible ROI marginal vers les canaux à ROI marginal élevé jusqu'à ce que les ROI marginaux s'égalisent
- **Points de saturation** : Où chaque canal atteint des rendements décroissants — le niveau de dépense au-delà duquel le ROI marginal tombe sous votre seuil (typiquement 1,0x ou votre coût du capital)

---

## 2. Tests d'incrémentalité

### Tests de geo-lift
Diviser les marchés géographiques en groupes test et contrôle. Exécuter la campagne uniquement sur les marchés test. Mesurer le lift du test vs contrôle après prise en compte des différences préexistantes.
- **Conception** : Minimum 10 unités géographiques (DMA, état, ville). Randomiser ou apparier sur la performance pré-période. Exécuter pendant minimum 4 semaines (8+ préférées pour les campagnes de marque)
- **Puissance** : Nécessite un volume suffisant par géo. Règle empirique — chaque géo a besoin de 100+ conversions/semaine pour une mesure basée sur les conversions
- **Analyse** : Différence-en-différences avec effets fixes géo. Rapporter le % de lift, l'intervalle de confiance et le coût par conversion incrémentale
- **Pièges** : Débordement entre géos adjacentes (utiliser des zones tampons), effets saisonniers (s'assurer que la période de test est représentative), petites tailles d'échantillon (les géos sont l'unité, pas les utilisateurs)

### Analyse de rétention (holdout)
Retenir la campagne pour un échantillon aléatoire de 10 à 20 % de l'audience éligible. Comparer les taux de conversion entre les groupes exposés et retenus.
- **Avantage** : La randomisation au niveau utilisateur est plus propre qu'au niveau géo
- **Inconvénient** : Coût d'opportunité de ne pas servir 10 à 20 % de l'audience ; contamination si les utilisateurs retenus voient des publicités par d'autres canaux
- **Idéal pour** : Campagnes de retargeting, campagnes e-mail, audiences CRM où vous contrôlez la liste d'utilisateurs

### Méthode du contrôle synthétique
Lorsque vous ne pouvez pas randomiser, construire un contrefactuel statistique à partir d'une combinaison pondérée d'unités de contrôle qui correspond au comportement pré-période de l'unité traitée.
- **Cas d'usage** : « Nous avons lancé sur un nouveau marché — que se serait-il passé sans marketing ? »
- **Méthode** : Trouver des pondérations pour les marchés de contrôle telles que la combinaison pondérée corresponde étroitement à la trajectoire de résultats pré-période du marché traité
- **Avantage** : Fonctionne avec aussi peu qu'une seule unité traitée (lancement sur un seul marché)
- **Limitation** : Nécessite un pool suffisant d'unités de contrôle non traitées avec des caractéristiques similaires

### Méthodologie des publicités fantômes / PSA
Dans les environnements programmatiques, montrer un PSA (message d'intérêt public) au groupe de contrôle dans la même enchère. Les deux groupes remportent les mêmes enchères, mais le contrôle voit une publicité non commerciale.
- **Méthode d'incrémentalité digitale la plus propre** : Contrôle le biais de sélection dans le ciblage publicitaire
- **Mesure** : Le véritable lift incrémental de la création/du message, pas seulement du ciblage

### Test de marchés appariés
Apparier des marchés similaires selon la performance historique, la démographie et les caractéristiques de marché. Assigner un marché de chaque paire au traitement, l'autre au contrôle. Alterner le traitement entre les paires améliore l'équilibre.

---

## 3. Inférence causale pour les marketeurs

### Pourquoi la corrélation n'égale pas la causalité
Dépenser plus en recherche de marque est corrélé à un chiffre d'affaires plus élevé — mais la recherche de marque capture la demande existante plutôt que de la créer. Réduire la recherche de marque pourrait ne perdre que très peu de chiffre d'affaires incrémental. Sans méthodes causales, vous sur-créditez les canaux qui récoltent la demande et sous-créditez ceux qui la créent.

### Différence-en-différences (DiD)
Comparer le changement de résultats (avant vs après) entre un groupe traité et un groupe de contrôle. La « différence des différences » élimine les facteurs de confusion invariants dans le temps.
- **Exigences** : Hypothèse de tendances parallèles — les groupes traité et de contrôle doivent avoir des trajectoires de résultats similaires avant l'intervention
- **Application** : « Nous avons lancé une nouvelle campagne dans la Région A le 1er mars. Comparer le changement avant/après de la Région A à celui de la Région B »

### Conception à discontinuité de régression (RDD)
Exploiter un seuil ou un point de coupure pour identifier des effets causaux. Les unités juste au-dessus et juste en dessous du seuil sont presque identiques, créant une quasi-expérience.
- **Application** : « Les utilisateurs ayant obtenu un score de lead de 81+ ont reçu un appel commercial. Comparer les taux de conversion des utilisateurs ayant un score de 79-80 vs 81-82 »
- **Exigence** : La variable de classement (score de lead) ne doit pas être manipulable près du point de coupure

### Variables instrumentales (IV)
Trouver un facteur externe (instrument) qui affecte le traitement (dépense marketing) mais n'affecte pas directement le résultat (ventes) sauf via le traitement.
- **Exemple** : La météo comme instrument pour les campagnes de trafic en magasin — un mauvais temps réduit l'exposition à la campagne mais n'affecte pas directement l'intention d'achat en ligne
- **Difficile à trouver** : Les instruments valides sont rares en marketing ; à utiliser avec prudence

### Appariement par score de propension (PSM)
Lorsque vous ne pouvez pas randomiser, estimer la probabilité d'assignation au traitement (score de propension) selon des caractéristiques observables. Apparier les unités traitées et non traitées avec des scores de propension similaires.
- **Application** : Comparer les clients ayant reçu un e-mail promotionnel à ceux qui ne l'ont pas reçu, en appariant sur l'historique d'achat, l'engagement et la démographie
- **Limitation** : Ne contrôle que les facteurs de confusion observés — les différences non observées demeurent

---

## 4. Courbes de saturation et optimisation budgétaire

### Ce que signifie la saturation en pratique
À un certain niveau de dépense, chaque dollar supplémentaire produit un rendement incrémental moindre. Les premiers 1 000 $ sur TikTok Ads pourraient générer 5 000 $ de chiffre d'affaires. Le 100e lot de 1 000 $ pourrait ne générer que 200 $. Savoir où vous vous situez sur la courbe est essentiel pour l'allocation budgétaire.

### Fonction de Hill (modèle standard)
`response = max_response * (spend^slope) / (K^slope + spend^slope)`
- **max_response** : Chiffre d'affaires maximum théorique si la dépense était infinie
- **K (demi-saturation)** : Niveau de dépense auquel la réponse atteint 50 % du maximum. K plus bas = saturation plus rapide
- **slope** : Pente de la courbe. slope > 1 = courbe en S (démarrage lent, milieu rapide, fin lente). slope < 1 = concave (démarrage rapide, rendements décroissants immédiatement)

### Optimisation pratique
1. Estimer la courbe de saturation par canal à partir du MMM ou de données historiques
2. Calculer le ROI marginal au niveau de dépense actuel : dérivée de la fonction de réponse
3. Classer les canaux par ROI marginal
4. Déplacer le budget des canaux à ROI marginal le plus bas vers ceux à ROI marginal le plus élevé jusqu'à ce que les ROI marginaux s'égalisent entre les canaux (ou atteignent des contraintes de dépense minimale)
5. Définir un plancher de ROI — ne pas dépenser au-delà du point où le ROI marginal tombe sous 1,0x (ou votre ROAS cible)

---

## 5. Modèles d'interaction entre canaux

### Complémentarité (synergie)
Canaux qui s'amplifient mutuellement lorsqu'ils sont actifs simultanément. TV + recherche payante : la TV crée la notoriété, la recherche capture le pic de demande. Social + e-mail : le social réchauffe l'audience, l'e-mail convertit. Quantifier la synergie en ajoutant des termes d'interaction au MMM : `revenue ~ TV + search + TV*search`. Un coefficient d'interaction positif signifie que l'effet combiné dépasse la somme des effets individuels.

### Cannibalisation
Canaux qui se volent des conversions mutuellement. Recherche de marque vs organique : les deux capturent la même intention. Retargeting vs e-mail : les deux ciblent les clients existants avec des offres similaires. Un coefficient d'interaction négatif dans le MMM signale une cannibalisation.

### Quantification de la synergie
Rapporter le pourcentage de chiffre d'affaires attribuable aux interactions entre canaux par rapport aux effets de canal individuels. Fourchette typique : 5 à 20 % du chiffre d'affaires total généré par le marketing provient des synergies. Les marques à forte synergie (celles avec des stratégies multicanales solides) peuvent atteindre 25 à 30 %.

---

## 6. Simulation de chiffre d'affaires (Monte Carlo)

### Méthodologie
1. Définir des distributions de probabilité pour chaque intrant : ROI par canal (distribution normale avec moyenne et écart-type issus des postérieures du MMM), scénarios budgétaires (fixes ou en fourchette), multiplicateurs saisonniers (historiques), facteurs concurrentiels (basés sur des scénarios)
2. Tirer des échantillons aléatoires de chaque distribution
3. Calculer le chiffre d'affaires pour chaque tirage : `revenue = sum(channel_spend_i * channel_ROI_i * seasonal_multiplier * competitive_factor) + baseline`
4. Répéter 10 000 fois ou plus
5. Analyser la distribution des chiffres d'affaires simulés

### Interprétation des résultats
- **Chiffre d'affaires attendu** : Moyenne de toutes les simulations
- **Fourchette de confiance** : 10e percentile (baisse), 50e (médiane), 90e (hausse)
- **Probabilité d'atteindre l'objectif** : Pourcentage de simulations qui dépassent l'objectif de chiffre d'affaires
- **Analyse de sensibilité** : Quels paramètres d'entrée ont le plus grand impact sur la variance du chiffre d'affaires (exécuter des simulations avec chaque paramètre fixé pour voir lequel, une fois fixé, réduit le plus la variance)

---

## 7. Prédiction et intervention sur le churn

### Signaux comportementaux
- Déclin de la fréquence de connexion (>30 % de baisse sur 4 semaines)
- Rétrécissement de l'usage des fonctionnalités (utilisation de moins de fonctionnalités produit)
- Augmentation du volume de tickets de support (signal de frustration)
- Échecs de paiement ou rétrogradations
- Raccourcissement de la durée des sessions

### Signaux d'engagement
- Taux d'ouverture d'e-mail en déclin sur 3 envois consécutifs ou plus
- Taux de clics tombant sous 50 % de la moyenne de la cohorte
- Désabonnement de catégories de contenu
- Fréquence de visite d'application/site réduite
- Aucun engagement avec les nouvelles fonctionnalités ou annonces

### Signaux transactionnels
- Déclin de la fréquence d'achat (>40 % de baisse vs période précédente)
- Diminution du panier moyen
- Rétrécissement des catégories (achat sur moins de catégories)
- Dépendance croissante aux coupons/remises
- Taux d'abandon de panier en hausse

### Niveaux de score de risque et playbook d'intervention
| Score | Niveau | Intervention |
|-------|------|-------------|
| 0-30 | Risque faible | Séquences de nurturing, contenu de renforcement de la valeur, éducation produit |
| 30-60 | Risque moyen | Offre personnalisée, prise de contact par le success manager, campagne d'adoption de fonctionnalités |
| 60-80 | Risque élevé | Offre de rétention (remise/mise à niveau), prise de contact par la direction, séquence de reconquête |
| 80-100 | Critique | Offre de sauvetage urgente, interception proactive de l'annulation, prise de contact 1:1 |

---

## 8. Rigueur expérimentale

### Taille d'échantillon et durée d'exécution
Utiliser une analyse de puissance avant de lancer tout test. Intrants : effet minimum détectable (MDE), niveau de signification (typiquement 0,05), puissance statistique (typiquement 0,80), taux de conversion de référence. Outils : `sample-size-calculator.py` et `significance-tester.py`. Durée = taille d'échantillon requise / trafic quotidien. Ne jamais arrêter un test prématurément en se basant sur un « coup d'œil » aux résultats, sauf en utilisant des méthodes de test séquentiel.

### Correction pour tests multiples
Vous exécutez 5 variantes ? La probabilité d'au moins un faux positif à alpha=0,05 monte à 23 %. Appliquer la correction de Bonferroni (alpha / nombre de tests) pour la simplicité, ou Holm-Bonferroni pour plus de puissance. Pour les métriques liées, envisager plutôt le contrôle du taux de fausses découvertes (FDR).

### Test séquentiel
Les méthodes séquentielles de groupe permettent des analyses intermédiaires planifiées avec des limites d'arrêt anticipé. Les fonctions de dépense (O'Brien-Fleming, Pocock) contrôlent l'erreur globale de Type I tout en permettant un arrêt anticipé pour des effets très importants. Définir les limites d'arrêt avant le début du test — pas pendant.

### Métriques garde-fou
Métriques qui ne doivent PAS se dégrader pendant que vous optimisez la métrique principale. Exemples : chiffre d'affaires par utilisateur (garde-fou) pendant le test d'un taux d'inscription plus élevé (principale) ; vitesse de chargement de page (garde-fou) pendant le test d'une nouvelle mise en page (principale) ; satisfaction client (garde-fou) pendant le test d'un taux d'upsell plus élevé (principale). Si un garde-fou se dégrade au-delà d'un seuil prédéfini, arrêter le test indépendamment de l'amélioration de la métrique principale.

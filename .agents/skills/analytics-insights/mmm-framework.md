# Marketing Mix Modeling — Cadre et mise en œuvre

## Qu'est-ce que le Marketing Mix Modeling ?

Le Marketing Mix Modeling (MMM) est une technique statistique qui quantifie l'impact de chaque canal marketing (et des facteurs externes) sur les résultats de l'entreprise — généralement le revenu ou les conversions. Contrairement à l'attribution multi-touch, le MMM utilise des données agrégées (pas de suivi au niveau utilisateur), ce qui le rend conforme à la confidentialité par conception et capable de mesurer les canaux hors ligne et non cliquables.

### Quand le MMM est la bonne approche

| Utilisez le MMM quand | N'utilisez pas le MMM quand |
|-------------|-------------------|
| Vous dépensez sur 5 canaux ou plus et devez optimiser l'allocation | Vous n'utilisez qu'1 à 2 canaux (variance insuffisante) |
| Vous devez mesurer la TV, la radio, l'affichage extérieur, ou d'autres canaux hors ligne | Vous avez besoin d'une optimisation en temps réel au niveau de la campagne |
| Des restrictions de confidentialité limitent le suivi au niveau utilisateur | Vous avez moins de 2 ans de données historiques |
| Vous voulez quantifier l'impact de la saisonnalité, des promotions, ou des facteurs externes | Votre dépense hebdomadaire par canal est < 1 000 $ (signal insuffisant) |
| Vous avez besoin d'un cadre d'allocation budgétaire stratégique | Vous devez attribuer des conversions individuelles à des points de contact |

---

## MMM vs Attribution vs Incrémentalité

| Dimension | MMM | Attribution multi-touch (MTA) | Test d'incrémentalité |
|-----------|-----|-------------------------------|----------------------|
| **Niveau de données** | Agrégé (hebdomadaire/géo) | Niveau utilisateur | Niveau utilisateur ou géo |
| **Impact sur la confidentialité** | Aucun (pas de données utilisateur) | Élevé (nécessite un suivi) | Faible à modéré |
| **Canaux couverts** | Tous (y compris hors ligne) | Digital cliquable uniquement | Un canal à la fois |
| **Horizon temporel** | Historique (2+ ans idéalement) | Temps réel / récent | Expérience ponctuelle |
| **Granularité** | Niveau canal / tactique | Niveau point de contact / campagne | Une seule variable testée |
| **Latence** | Semaines pour construire le modèle | Temps réel | 2-8 semaines par test |
| **Idéal pour** | Allocation budgétaire entre canaux | Cartographie de parcours, optimisation de campagne | Valider le véritable lift d'une tactique spécifique |
| **Limite** | Ne peut pas optimiser au sein d'un canal | Biaisé par l'attribution centrée sur le clic | Ne teste qu'une chose à la fois |
| **Usage recommandé** | Planification budgétaire annuelle/trimestrielle | Gestion de campagne quotidienne/hebdomadaire | Validation des résultats du MMM |

**Utiliser ensemble :** le MMM fixe l'allocation budgétaire stratégique. L'attribution optimise au sein des canaux. Les tests d'incrémentalité valident les deux.

---

## Liste de contrôle des exigences de données

### Exigences de données minimales

- [ ] **Période :** 2 ans ou plus de données hebdomadaires (104+ points de données minimum)
- [ ] **Variable dépendante :** revenu hebdomadaire, conversions, ou autre KPI
- [ ] **Dépense marketing :** dépense hebdomadaire par canal (au minimum : recherche payante, social payant, display, e-mail, TV, radio, OOH, affiliation — selon le cas)
- [ ] **Données d'impression / GRP :** pour les canaux où la dépense seule ne capture pas la livraison (en particulier la TV)
- [ ] **Données de tarification :** prix de vente moyen ou profondeur de remise par semaine
- [ ] **Calendrier de promotions :** dates et types de toutes les promotions (soldes, coupons, offres groupées)
- [ ] **Changements de distribution :** ouvertures/fermetures de magasins, nouveaux partenaires de vente au détail, changements de disponibilité du site web

### Variables additionnelles recommandées

- [ ] **Indicateurs de saisonnalité :** semaine de l'année, indicateurs de jours fériés, rentrée scolaire, etc.
- [ ] **Données macroéconomiques :** indice de confiance des consommateurs, taux de chômage, tendances de catégorie
- [ ] **Activité concurrentielle :** estimations de dépense des concurrents (SimilarWeb/Pathmatics), indicateurs de promotions des concurrents
- [ ] **Données météo :** température, précipitations (pour les catégories pertinentes comme les boissons, l'habillement, le voyage)
- [ ] **RP / médias gagnés :** mentions médiatiques, part de voix, indicateurs d'événements viraux
- [ ] **Lancements de produit :** dates d'introduction de nouveaux produits
- [ ] **Changements de plateforme :** mises à jour iOS, changements d'algorithme, jalons de dépréciation des cookies

### Standards de qualité des données

| Exigence | Standard | Pourquoi cela compte |
|-------------|----------|---------------|
| Granularité | Hebdomadaire (pas mensuelle) | Les données mensuelles ont trop peu d'observations et masquent la variation intra-mois |
| Cohérence | Même définition appliquée sur toutes les semaines | Changer la façon dont une métrique est calculée en cours de jeu de données introduit un biais |
| Exhaustivité | Pas de lacunes dans aucune série temporelle | Les semaines manquantes créent des erreurs dans les calculs d'adstock |
| Alignement de la dépense | Dépense enregistrée la semaine où le média a diffusé, pas au moment de la facturation | Un décalage temporel fausse les relations de cause à effet |
| Cohérence monétaire | Toutes les valeurs dans la même devise, ajustées de l'inflation si > 3 ans | Le mélange de devises fausse l'interprétation des coefficients |

---

## Guidance de conception du modèle

### Transformation adstock

La publicité a un effet de report — une publicité vue cette semaine influence encore le comportement la semaine suivante. L'adstock modélise cette décroissance.

**Formule d'adstock géométrique :**
```
Adstock_t = Spend_t + decay_rate * Adstock_(t-1)
```

| Canal | Taux de décroissance typique | Demi-vie (semaines) | Justification |
|---------|-------------------|-------------------|-----------|
| TV | 0,70 - 0,85 | 2-4 | La notoriété de marque persiste |
| Radio | 0,50 - 0,70 | 1-2 | Mémoire plus courte que la TV |
| OOH | 0,60 - 0,80 | 1,5-3 | Renforcement basé sur la localisation |
| Recherche payante | 0,10 - 0,30 | < 1 | Basé sur l'intention, réponse quasi immédiate |
| Social payant | 0,30 - 0,50 | 0,5-1 | Report court, exposition fréquente |
| Display / Programmatique | 0,40 - 0,60 | 1-1,5 | La notoriété persiste mais s'estompe |
| E-mail | 0,10 - 0,20 | < 0,5 | Action quasi immédiate |
| Contenu / SEO | 0,80 - 0,95 | 3-10+ | Actif cumulatif à longue durée de vie |

### Rendements décroissants (saturation)

Chaque dollar dépensé supplémentaire génère un rendement incrémental plus faible. Modélisez cela avec une fonction de Hill ou une transformation logarithmique.

**Fonction de Hill :**
```
Response = Spend^alpha / (Spend^alpha + K^alpha)
```

Où :
- **alpha** contrôle la forme de la courbe (raideur)
- **K** est le point de demi-saturation (niveau de dépense auquel la réponse atteint 50 % du maximum)

**Guide d'interprétation :**

| Niveau de saturation | Ce que cela signifie | Action |
|-----------------|---------------|--------|
| Bien en dessous du point de saturation | La dépense incrémentale est très efficace | Augmenter l'investissement |
| Proche du point de saturation | Les rendements décroissants commencent | Maintenir ou tester de petites augmentations |
| Au-dessus du point de saturation | La dépense additionnelle a un effet incrémental minimal | Réallouer vers des canaux sous-saturés |

---

## Guide d'interprétation des résultats

### Résultats clés d'un MMM

| Résultat | Définition | Comment l'utiliser |
|--------|-----------|---------------|
| **% de contribution** | Part du résultat total (revenu) expliquée par chaque canal | Comprendre quels canaux génèrent le plus de volume |
| **ROI / ROAS** | Revenu généré par dollar dépensé sur chaque canal | Identifier les canaux les plus efficaces |
| **ROI marginal** | Revenu généré par le prochain dollar dépensé (au niveau de dépense actuel) | Optimiser l'allocation budgétaire (égaliser le ROI marginal entre canaux) |
| **Courbe de saturation** | Courbe dépense-réponse pour chaque canal | Identifier les canaux sous-dépensés et sur-dépensés |
| **Référence (baseline)** | Revenu qui se produirait sans aucun marketing | Comprendre la force de la demande organique |
| **Paramètres d'adstock** | Taux de décroissance et décalage de pic pour chaque canal | Comprendre les effets de report et de timing |

### Interpréter l'optimiseur de budget

L'optimisation devrait égaliser le **ROI marginal** entre les canaux. L'allocation optimale est celle où :
- ROI marginal du canal A = ROI marginal du canal B = ... = ROI marginal du canal N

**Cadre de décision de réallocation :**

| Scénario | ROI marginal actuel | Action optimale |
|----------|---------------------|---------------|
| Le canal est sous-saturé | ROI marginal élevé (> moyenne) | Augmenter la dépense ; s'attendre à un lift incrémental |
| Le canal est sur-saturé | ROI marginal faible (< moyenne) | Réduire la dépense ; réallouer vers des canaux à ROI plus élevé |
| Le canal est proche de l'optimal | ROI marginal proche de la moyenne | Maintenir la dépense actuelle |

### Signaux d'alerte dans les résultats du MMM

- [ ] Un canal aux performances connues comme médiocres affiche un ROI élevé (facteur confondant possible)
- [ ] La référence représente > 80 % du total (le marketing semble n'avoir presque aucun impact — probablement un problème de modèle)
- [ ] La réallocation recommandée suggère de réduire un canal de > 50 % (valider d'abord avec un test d'incrémentalité)
- [ ] Les taux de décroissance de l'adstock semblent déraisonnables (par ex. décroissance de la recherche payante > 0,8)
- [ ] Le R-carré du modèle est < 0,8 (variance non expliquée significative)
- [ ] Le MAPE hors échantillon (erreur moyenne en pourcentage absolu) est > 15 %

---

## Optimisation budgétaire à l'aide du MMM

### Processus étape par étape

1. **Exécuter le modèle** avec les données actuelles pour établir la contribution de référence et le ROI par canal
2. **Générer les courbes de saturation** pour chaque canal afin de visualiser les rendements décroissants
3. **Calculer le ROI marginal** aux niveaux de dépense actuels pour chaque canal
4. **Exécuter l'optimiseur** en maintenant le budget total constant pour trouver l'allocation qui maximise le revenu total
5. **Appliquer les contraintes métier** (dépense minimale de marque, obligations contractuelles, minimums par canal)
6. **Générer des scénarios** — optimiser au budget actuel, +10 %, +20 %, -10 %, -20 %
7. **Valider les recommandations clés** avec des tests d'incrémentalité avant de faire de grands changements
8. **Mettre en œuvre progressivement** — déplacer les budgets de 10-20 % par trimestre, pas d'un coup
9. **Réexécuter le modèle** après 1-2 trimestres avec de nouvelles données pour évaluer l'impact

### Modèle de planification de scénarios

| Scénario | Budget total | Canal A | Canal B | Canal C | Canal D | Revenu prédit | ROAS prédit |
|----------|-------------|-----------|-----------|-----------|-----------|-------------------|---------------|
| Allocation actuelle | X $ | X $ | X $ | X $ | X $ | X $ | X,Xx |
| Optimisé par MMM (même budget) | X $ | X $ | X $ | X $ | X $ | X $ | X,Xx |
| Optimisé par MMM (+10 % de budget) | X $ | X $ | X $ | X $ | X $ | X $ | X,Xx |
| Optimisé par MMM (+20 % de budget) | X $ | X $ | X $ | X $ | X $ | X $ | X,Xx |
| Optimisé par MMM (-10 % de budget) | X $ | X $ | X $ | X $ | X $ | X $ | X,Xx |

---

## Options de mise en œuvre

### Cadres open source

| Cadre | Développeur | Langage | Forces | Limites |
|-----------|-----------|---------|-----------|-------------|
| **Robyn** | Meta | R (avec wrapper Python) | Réglage automatisé des hyperparamètres via Nevergrad, optimiseur de budget intégré, communauté active | Nécessite un environnement R, courbe d'apprentissage abrupte |
| **Meridian** | Google | Python | Approche bayésienne, s'intègre aux données Google, bien documenté | Plus récent, communauté plus petite |
| **LightweightMMM** | Google (prédécesseur de Meridian) | Python (JAX) | Bayésien, priors flexibles, méthodologie éprouvée | En cours de remplacement par Meridian |
| **PyMC-Marketing** | PyMC Labs | Python | Entièrement bayésien, hautement personnalisable, fondements statistiques solides | Nécessite une expertise en modélisation bayésienne |

### Décision construire vs acheter

| Facteur | Open source (construire) | Solution fournisseur (acheter) |
|--------|-------------------|---------------------|
| Coût | Logiciel gratuit ; temps de l'équipe interne | 50 K$-300 K$+/an |
| Délai pour le premier modèle | 4-8 semaines (avec une équipe expérimentée) | 6-12 semaines (onboarding fournisseur) |
| Personnalisation | Contrôle total | Limité au cadre du fournisseur |
| Équipe requise | Data scientist avec connaissance du domaine marketing | Analyste marketing (le fournisseur gère la modélisation) |
| Maintenance | Responsabilité interne | Gérée par le fournisseur |
| Transparence | Visibilité complète du modèle | Souvent une boîte noire |
| Idéal pour | Équipes disposant de compétences data science et souhaitant du contrôle | Équipes sans ressources data science |

---

## Méthodologie de validation

### Validation intra-échantillon

- **R-carré (ajusté) :** devrait être > 0,85 pour un modèle bien ajusté
- **Analyse des résidus :** les résidus devraient être normalement distribués sans motif systématique
- **Signes des coefficients :** tous les coefficients de canal devraient être positifs (le marketing devrait augmenter le revenu)
- **VIF (facteur d'inflation de la variance) :** vérifier la multicolinéarité ; un VIF > 5 justifie une investigation

### Validation hors échantillon

- **Période de holdout :** réserver les 10-15 % les plus récents des données pour la validation
- **MAPE (erreur moyenne en pourcentage absolu) :** objectif < 10 %, acceptable < 15 %
- **Couverture de l'intervalle de prédiction :** les valeurs réelles devraient tomber dans l'intervalle de prédiction à 90 % environ 90 % du temps

### Validation externe

- **Calibration par test d'incrémentalité :** exécuter un test de geo-lift ou de holdout sur un canal clé et comparer le lift mesuré à la contribution prédite du MMM. S'ils divergent de plus de 30 %, recalibrer le modèle.
- **Vérification de bon sens métier :** partager les résultats avec les responsables de canal. Si quelqu'un dit « cela ne correspond pas à ce que je vois opérationnellement », investiguer avant de publier.
- **Comparaison cross-modèle :** si possible, exécuter une seconde approche de modélisation (par ex. bayésienne + fréquentiste) et comparer. La convergence augmente la confiance.

### Liste de contrôle de validation

- [ ] R-carré > 0,85
- [ ] MAPE < 15 % sur les données de holdout
- [ ] Tous les coefficients de canal ont le bon signe (positif)
- [ ] Pas de problème de multicolinéarité (VIF < 5)
- [ ] Les résidus ne montrent aucun motif systématique
- [ ] Les paramètres d'adstock se situent dans des fourchettes raisonnables
- [ ] Au moins un test d'incrémentalité corrobore un constat clé du MMM
- [ ] Les responsables de canal ont revu et stress-testé les résultats
- [ ] Les courbes de saturation s'alignent avec l'intuition opérationnelle
- [ ] Les recommandations de l'optimiseur de budget sont raisonnables directionnellement

---

## Maintenance du programme MMM

| Activité | Cadence | Propriétaire |
|----------|---------|-------|
| Rafraîchissement complet du modèle (ré-estimer tous les paramètres) | Trimestrielle | Data science |
| Validation du pipeline de données | Mensuelle | Ingénierie analytique |
| Test de nouvelles variables (ajout/retrait de contrôles) | Trimestrielle | Data science + Marketing |
| Génération de scénarios d'optimisation budgétaire | Trimestrielle (avant la planification budgétaire) | Data science + Ops marketing |
| Test d'incrémentalité pour validation | 1-2 par trimestre | Marketing + Data science |
| Revue des résultats avec les parties prenantes | Trimestrielle | Direction marketing |
| Mise à jour de la documentation du modèle | À chaque rafraîchissement | Data science |

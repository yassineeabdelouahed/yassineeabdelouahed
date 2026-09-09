# Tests d'incrémentalité — Conception d'expérience

## Pourquoi les tests d'incrémentalité comptent

Les modèles d'attribution vous disent quels canaux ont touché une conversion. Les tests d'incrémentalité vous disent quels canaux **ont causé** une conversion. La différence est cruciale : un canal peut recevoir un crédit d'attribution pour des conversions qui se seraient produites de toute façon (demande organique captée par le payant). Les tests d'incrémentalité isolent le véritable lift causal en comparant un groupe de traitement (exposé au marketing) à un groupe de contrôle (non exposé).

---

## Quand utiliser chaque approche de mesure

| Question | Meilleure méthode | Pourquoi |
|----------|-------------|-----|
| « Comment devrais-je allouer le budget entre les canaux ? » | MMM | Examine tous les canaux simultanément avec des données historiques |
| « Quels points de contact contribuent au parcours client ? » | Attribution multi-touch | Cartographie les parcours au niveau utilisateur vers la conversion |
| « Ce canal spécifique génère-t-il réellement un revenu incrémental ? » | Test d'incrémentalité | Isole l'impact causal avec une expérience contrôlée |
| « Notre campagne de marque génère-t-elle réellement de la demande ? » | Test d'incrémentalité (geo-lift) | Les effets de marque sont difficiles à attribuer ; les expériences mesurent le véritable lift |
| « Devrais-je augmenter la dépense sur Facebook de 30 % ? » | Test d'incrémentalité | Teste le rendement marginal des changements de dépense |
| « Quel est l'effet de halo à long terme de la TV sur la recherche ? » | MMM | Capture les effets cross-canaux dans le temps |

---

## Modèles de conception d'expérience

### 1. Test de lift géographique (geo-lift)

**Objectif :** mesurer l'impact incrémental d'un canal ou d'une campagne en comparant des géographies traitées à des géographies de contrôle.

**Idéal pour :** les canaux où un holdout au niveau utilisateur est difficile (TV, radio, OOH, YouTube) ou lorsque le lift de conversion au niveau de la plateforme n'est pas disponible.

| Élément de conception | Spécification |
|---------------|---------------|
| **Unité de test** | Région géographique (DMA, état, ville, cluster de codes postaux) |
| **Groupe de traitement** | Géographies où l'activité marketing est présente (ou augmentée) |
| **Groupe de contrôle** | Géographies appariées où l'activité marketing est retenue (ou maintenue à la référence) |
| **Méthode d'appariement** | Contrôle synthétique, appariement par score de propension, ou appariement manuel sur des variables clés |
| **Variables d'appariement clés** | Revenu de référence, population, motif de saisonnalité, taux de croissance historique |
| **Durée du test** | 4 à 8 semaines (dépend du cycle de conversion et de la puissance requise) |
| **Période de refroidissement** | 1 à 2 semaines après le test pour capturer les conversions différées |
| **Métrique primaire** | Revenu incrémental (ou conversions) en traitement vs contrôle |
| **Métriques secondaires** | iROAS, CPA, lift de recherche de marque, % de nouveaux clients |

**Guide étape par étape :**

1. **Définir l'hypothèse** — « Augmenter la dépense Facebook de 50 % dans les géographies de traitement générera un revenu incrémental avec un iROAS > 2,0 »
2. **Sélectionner les géographies** — extraire 12 à 24 mois de revenu hebdomadaire historique par géographie. Identifier 4 à 10 géographies de traitement et 10 à 20 géographies de contrôle potentielles.
3. **Apparier les géographies** — utiliser des méthodes de contrôle synthétique (CausalImpact en R, GeoLift de Meta) pour trouver le groupe de contrôle qui reproduit le mieux le comportement pré-test du groupe de traitement.
4. **Valider l'appariement** — exécuter une période « placebo » pré-test. Le contrôle synthétique devrait suivre le groupe de traitement à 2-3 % près pendant la période pré-test.
5. **Exécuter le test** — mettre en œuvre le traitement (augmentation/diminution de la dépense) uniquement dans les géographies de traitement. Ne rien changer dans les géographies de contrôle.
6. **Surveiller hebdomadairement** — suivre les problèmes de qualité de données mais éviter les changements en cours de test.
7. **Analyser les résultats** — comparer la performance réelle du traitement à la prédiction du contrôle synthétique. Calculer le lift, l'intervalle de confiance, et l'iROAS.
8. **Valider** — vérifier que le lift est statistiquement significatif (p < 0,10 pour les tests marketing) et significatif sur le plan économique.

### 2. Test de holdout au niveau utilisateur

**Objectif :** retenir aléatoirement le marketing d'un sous-ensemble d'utilisateurs pour mesurer le lift incrémental.

**Idéal pour :** l'e-mail, les notifications push, le retargeting, les campagnes CRM.

| Élément de conception | Spécification |
|---------------|---------------|
| **Unité de test** | Utilisateur individuel (cookie, e-mail, ID d'appareil) |
| **Groupe de traitement** | Utilisateurs qui reçoivent l'activité marketing |
| **Groupe de contrôle** | Utilisateurs retenus aléatoirement qui NE reçoivent PAS l'activité |
| **Randomisation** | Assignation véritablement aléatoire au niveau utilisateur (pas au niveau session) |
| **Taille du contrôle** | 10-20 % de l'audience éligible (équilibrer puissance vs risque de revenu) |
| **Durée du test** | 2-4 semaines (ou 1 cycle de conversion complet, selon le plus long) |
| **Métrique primaire** | Taux de conversion ou revenu par utilisateur (traitement vs contrôle) |

**Considérations clés :**
- Le groupe de contrôle doit être véritablement retenu — pas d'exposition publicitaire, pas d'e-mail, pas de retargeting
- S'assurer que la randomisation est au niveau utilisateur, pas au niveau session (évite la contamination)
- Suivre les deux groupes pendant la même durée, y compris la fenêtre de conversion post-exposition

### 3. Tests de lift de conversion des plateformes

Ce sont des outils d'incrémentalité intégrés fournis par les plateformes publicitaires.

**Meta Conversion Lift :**

| Élément | Détail |
|---------|--------|
| **Fonctionnement** | Meta répartit aléatoirement votre audience cible entre test (voit les publicités) et contrôle (ne les voit pas). Mesure le lift de conversion. |
| **Configuration** | Via Meta Experiments dans Ads Manager ou via API |
| **Exigences minimales** | ~10 K$+ de dépense pendant le test, volume de conversion suffisant (~100+ conversions en contrôle) |
| **Durée** | 2-4 semaines recommandées |
| **Résultats** | Conversions incrémentales, revenu incrémental, coût par conversion incrémentale, % de lift |
| **Limite** | Ne mesure que l'impact propre de Meta ; le groupe de contrôle peut tout de même voir des publicités concurrentes |

**Google Conversion Lift :**

| Élément | Détail |
|---------|--------|
| **Fonctionnement** | Google utilise des expériences géographiques ou utilisateur pour mesurer les conversions incrémentales de Google Ads |
| **Configuration** | Via Google Ads Experiments (nécessite un représentant Google pour le géo-based) |
| **Types** | Brand Lift (enquêtes), Search Lift (recherches incrémentales), Conversion Lift (conversions incrémentales) |
| **Exigences minimales** | Dépense significative (généralement 50 K$+ pour des résultats fiables) |
| **Durée** | 2-6 semaines |
| **Résultats** | Conversions incrémentales, lift relatif, coût par conversion incrémentale |

---

## Calculs de puissance statistique

### Pourquoi la puissance compte

Un test sans puissance statistique suffisante produira des résultats non concluants. Exécuter un test sous-dimensionné gaspille du temps et du budget. Calculer la puissance **avant** de commencer.

### Paramètres clés

| Paramètre | Définition | Valeur typique |
|-----------|-----------|---------------|
| **Niveau de significativité (alpha)** | Probabilité de faux positif (erreur de type I) | 0,10 pour le marketing (0,05 pour la rigueur stricte) |
| **Puissance (1 - bêta)** | Probabilité de détecter un effet réel | 0,80 (80 %) minimum |
| **Effet minimal détectable (MDE)** | Plus petit lift qu'il faut détecter | Dépend du contexte métier (typiquement 5-20 %) |
| **Taux de conversion de référence** | Taux de conversion actuel sans traitement | À partir des données historiques |
| **Taille d'échantillon / durée du test** | Nombre d'utilisateurs ou de géo-semaines nécessaires | Calculé à partir des paramètres ci-dessus |

### Règles empiriques de calcul de puissance

| CVR de référence | MDE (relatif) | Taille d'échantillon approximative par groupe |
|-------------|----------------|----------------------------------|
| 1 % | 20 % | ~80 000 |
| 1 % | 10 % | ~320 000 |
| 3 % | 20 % | ~25 000 |
| 3 % | 10 % | ~100 000 |
| 5 % | 20 % | ~15 000 |
| 5 % | 10 % | ~60 000 |
| 10 % | 20 % | ~7 000 |
| 10 % | 10 % | ~28 000 |

*Basé sur un test bilatéral, alpha=0,05, puissance=0,80. Pour alpha=0,10 (courant en marketing), les tailles d'échantillon sont ~20 % plus faibles.*

### Calcul de la durée

```
Test Duration (weeks) = Required Sample Size / Weekly Eligible Users
```

Si la durée requise dépasse 8 semaines, vous avez trois options :
1. Augmenter le MDE (accepter de ne détecter que des effets plus larges)
2. Relâcher l'alpha à 0,10
3. Augmenter la taille du groupe de test (réduire le pourcentage de holdout du contrôle)

---

## Cadre d'analyse des résultats

### Calcul du ROAS incrémental (iROAS)

```
iROAS = (Revenue_treatment - Revenue_control_projected) / Incremental_Spend
```

Où :
- **Revenue_treatment** = revenu réel dans le groupe/les géographies de traitement
- **Revenue_control_projected** = revenu du groupe de contrôle mis à l'échelle de la taille du groupe de traitement (ou prédiction du contrôle synthétique)
- **Incremental_Spend** = dépense additionnelle en traitement vs ce que le contrôle aurait reçu

### Interpréter les résultats

| Résultat | iROAS | Interprétation | Action |
|--------|-------|---------------|--------|
| Fortement positif | > 3,0 | Le canal est hautement incrémental | Augmenter la dépense (tester à un niveau plus élevé) |
| Modérément positif | 1,5 - 3,0 | Le canal est incrémental mais l'efficacité varie | Maintenir la dépense ; optimiser le ciblage/la création |
| Marginalement positif | 1,0 - 1,5 | Le canal est à peine incrémental | Investiguer les segments ; peut valoir la peine uniquement pour des audiences spécifiques |
| Point d'équilibre | ~1,0 | Le revenu incrémental équivaut à la dépense | Non rentable en réponse directe ; évaluer la valeur de marque |
| Négatif | < 1,0 | Le canal ne génère pas un retour incrémental suffisant | Réduire la dépense ; réallouer le budget |
| Pas de lift significatif | l'IC inclut 0 | Impossible de confirmer que le canal a un impact incrémental | Le test était sous-dimensionné ou le canal n'est vraiment pas incrémental ; reconcevoir le test |

### Interprétation de l'intervalle de confiance

Toujours rapporter les intervalles de confiance, pas seulement les estimations ponctuelles.

| Scénario | IC 90 % pour le lift | Interprétation |
|----------|----------------|---------------|
| Positif significatif | [5 %, 15 %] | Le lift est probablement réel ; estimation ponctuelle ~10 % |
| Positif significatif (large) | [2 %, 30 %] | Le lift est réel mais son ampleur est incertaine ; un test plus large est nécessaire pour la précision |
| Non significatif | [-3 %, 12 %] | Impossible de conclure que le lift diffère de zéro ; sous-dimensionné ou pas d'effet |
| Négatif significatif | [-15 %, -3 %] | Le marketing pourrait avoir un impact négatif (rare ; investiguer la qualité des données) |

---

## Pièges courants

### Pièges de conception

| Piège | Problème | Prévention |
|---------|---------|------------|
| **Contamination** | Le groupe de contrôle est exposé au traitement par débordement | Utiliser des tests au niveau géographique pour les canaux à large portée ; s'assurer que les holdouts au niveau utilisateur sont véritablement retenus |
| **Biais de sélection** | Les groupes de traitement et de contrôle diffèrent à la référence | Valider la qualité de l'appariement pendant la période pré-test ; utiliser la randomisation lorsque possible |
| **Puissance insuffisante** | Le test se termine sans résultat statistiquement significatif | Effectuer les calculs de puissance avant de tester ; prolonger la durée si nécessaire |
| **Durée trop courte** | Le test se termine avant la fin du cycle de conversion complet | La durée du test devrait être au moins 1,5x le cycle de conversion moyen |
| **Confusion de saisonnalité** | Le test se déroule pendant une période atypique (Black Friday, creux d'été) | Éviter les grands événements saisonniers ou en tenir compte dans l'analyse |

### Pièges d'analyse

| Piège | Problème | Prévention |
|---------|---------|------------|
| **Peeking** | Vérifier les résultats avant la fin du test et arrêter tôt | S'engager à l'avance sur la durée du test ; utiliser des méthodes de test séquentiel si un arrêt anticipé est nécessaire |
| **Comparaisons multiples** | Tester de nombreux segments gonfle le taux de faux positifs | Pré-spécifier la métrique primaire ; utiliser la correction de Bonferroni pour les analyses secondaires |
| **Ignorer la nouveauté** | Le lift initial d'une nouvelle tactique s'estompe à mesure que la nouveauté s'estompe | Prolonger la durée du test ou exécuter un test de suivi 3 mois plus tard |
| **Extrapolation** | Supposer que les résultats d'un niveau de test s'appliquent à tous les niveaux de dépense | L'iROAS à 50 K$/semaine n'égale pas l'iROAS à 200 K$/semaine (rendements décroissants) |
| **Biais de plateforme** | Faire confiance aux tests de lift menés par la plateforme sans examen critique | Valider de manière croisée avec des tests de lift géographique indépendants |

---

## Feuille de route des tests d'incrémentalité

### Cadre de priorisation

| Canal | Dépense actuelle | ROAS d'attribution | Confiance dans l'attribution | Priorité du test d'incrémentalité |
|---------|-------------|-----------------|--------------------------|----------------------------|
| Recherche de marque | Élevée | Très élevé | Faible (convertirait de toute façon) | **Élevée** — probablement sur-attribuée |
| Retargeting | Moyenne | Élevé | Faible (biais de sélection) | **Élevée** — cible des convertisseurs, ne cause pas les conversions |
| Prospection sociale | Élevée | Moyen | Moyenne | **Moyenne** — tester pour calibrer |
| Recherche non-marque | Moyenne | Moyen | Moyenne-élevée | **Faible** — probablement attribuée assez fidèlement |
| TV / Vidéo | Élevée | Faible/Aucun | Très faible | **Élevée** — pas de données d'attribution ; MMM + geo-lift nécessaires |
| Flux e-mail | Faible | Élevé | Moyenne | **Moyenne** — le test de holdout est facile |

### Modèle de calendrier de test annuel

| Trimestre | Test | Canal | Conception | Objectif |
|---------|------|---------|--------|-----------|
| T1 | Holdout de recherche de marque | Google Ads | Geo-lift (mettre en pause la marque dans les géographies de test) | Déterminer quelle part de la recherche de marque est vraiment incrémentale |
| T1 | Holdout de retargeting | Meta | Holdout au niveau utilisateur (10 % contrôle) | Mesurer le véritable lift du retargeting vs le retour organique |
| T2 | Test de mise à l'échelle de prospection | Meta | Geo-lift (+50 % de dépense dans les géographies de test) | Déterminer l'iROAS à un niveau de dépense plus élevé |
| T2 | Holdout de flux e-mail | E-mail | Holdout au niveau utilisateur (15 % contrôle) | Mesurer le revenu incrémental des flux automatisés |
| T3 | Geo-lift TV / YouTube | YouTube/TV | Geo-lift (introduire dans de nouvelles géographies) | Mesurer l'impact incrémental du haut du tunnel |
| T3 | Mise à l'échelle de la recherche non-marque | Google Ads | Geo-lift (+30 % de budget dans les géographies de test) | Valider l'augmentation budgétaire recommandée par le MMM |
| T4 | Holdout de haute saison | Meta + Google | Activité de test réduite pendant le T4 | Mesurer si la dépense de haute saison est incrémentale ou capte de la demande organique |

---

## Liste de contrôle de mise en œuvre

- [ ] Les 3 principaux canaux à tester identifiés selon la dépense et l'écart de confiance d'attribution
- [ ] Hypothèse, métrique primaire, et critères de succès définis pour chaque test
- [ ] Calculs de puissance effectués et taille d'échantillon suffisante confirmée
- [ ] Conception de test sélectionnée (geo-lift, holdout utilisateur, lift de conversion de plateforme)
- [ ] Groupes de traitement et de contrôle appariés avec un alignement pré-test validé
- [ ] Plan de test documenté, y compris date de début, date de fin, et méthode d'analyse
- [ ] Suivi configuré pour détecter les problèmes de qualité de données pendant le test
- [ ] Engagement à ne rien changer en traitement ou en contrôle pendant la période de test
- [ ] Résultats analysés avec des intervalles de confiance, pas seulement des estimations ponctuelles
- [ ] Constats partagés avec les parties prenantes et documentés dans un journal de test
- [ ] Résultats utilisés pour calibrer le MMM ou mettre à jour l'allocation budgétaire
- [ ] Prochaine série de tests planifiée selon la feuille de route annuelle

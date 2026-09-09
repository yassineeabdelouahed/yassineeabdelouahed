# Modèles de reporting — Hebdomadaire, mensuel, trimestriel

## Philosophie du reporting

Les rapports existent pour piloter des décisions, pas pour afficher des données. Chaque section de chaque rapport devrait répondre à l'une de ces trois questions : que s'est-il passé ? pourquoi cela s'est-il passé ? que devrions-nous faire à ce sujet ?

### Principes de conception des rapports

| Principe | Application |
|-----------|-------------|
| **Commencer par la réponse** | Débuter par l'insight principal, pas par la méthodologie |
| **Comparer à quelque chose** | Chaque chiffre a besoin de contexte — période précédente, objectif, ou benchmark |
| **Séparer le signal du bruit** | Ne signaler que les métriques ayant dépassé la variance normale |
| **Terminer par une action** | Chaque rapport se conclut par des prochaines étapes recommandées |
| **S'adapter à l'audience** | Les exécutifs reçoivent des synthèses ; les opérationnels reçoivent le détail |

---

## Modèle de rapport de performance hebdomadaire

**Objectif :** faire ressortir ce qui a changé cette semaine, pourquoi cela compte, et quoi faire la semaine prochaine.
**Audience :** équipe marketing, responsables de département.
**Livraison :** chaque lundi avant 10h.

### Section 1 : résumé exécutif (3-5 phrases)

Rédiger un bref récit couvrant :
- La performance globale vs objectif (dans les temps / hors des temps / en avance)
- La chose la plus importante qui s'est produite cette semaine
- L'action la plus importante pour la semaine prochaine

### Section 2 : fiche de score

| Métrique | Cette semaine | Semaine dernière | Variation WoW | Objectif | vs Objectif |
|--------|-----------|-----------|------------|--------|-----------|
| Revenu | X $ | X $ | +X % | X $ | +/-X % |
| Sessions | X | X | +X % | X | +/-X % |
| Leads / Conversions | X | X | +X % | X | +/-X % |
| CAC / CPA | X $ | X $ | +X % | X $ | +/-X % |
| ROAS (mixte) | X,Xx | X,Xx | +X % | X,Xx | +/-X % |
| Revenu e-mail | X $ | X $ | +X % | X $ | +/-X % |

**Convention de codage couleur :**
- Vert : > 5 % au-dessus de l'objectif
- Jaune : à moins de 5 % de l'objectif
- Rouge : > 5 % en dessous de l'objectif

### Section 3 : instantané de performance par canal

| Canal | Dépense | Revenu | ROAS | CPA | Sessions | CVR | Notes |
|---------|-------|---------|------|-----|----------|-----|-------|
| Recherche payante | | | | | | | |
| Social payant | | | | | | | |
| Recherche organique | — | | — | — | | | |
| E-mail / SMS | — | | — | — | | | |
| Direct | — | | — | — | | | |
| Recommandation | — | | — | — | | | |

### Section 4 : alertes et anomalies

Pour chaque anomalie détectée :
1. **Quoi :** quelle métrique a évolué et de combien
2. **Pourquoi :** cause profonde (confirmée ou hypothétique)
3. **Et alors :** impact si non traité
4. **Et maintenant :** action recommandée

### Section 5 : tests et expériences de la semaine

| Nom du test | Statut | Canal | Hypothèse | Résultats préliminaires | Décision |
|-----------|--------|---------|------------|--------------------|---------|
| | En cours / Terminé | | | | Continuer / Arrêter / Étendre |

### Section 6 : priorités de la semaine prochaine

- [ ] Priorité 1 : [Action] — Propriétaire — Date d'échéance
- [ ] Priorité 2 : [Action] — Propriétaire — Date d'échéance
- [ ] Priorité 3 : [Action] — Propriétaire — Date d'échéance

---

## Modèle de rapport de performance mensuel

**Objectif :** revue de performance complète avec analyse de tendance et implications stratégiques.
**Audience :** direction marketing, parties prenantes cross-fonctionnelles, finance.
**Livraison :** avant le 5e jour ouvré du mois suivant.

### Section 1 : résumé exécutif

| Élément | Détail |
|------|--------|
| **Mois** | [Mois Année] |
| **Revenu vs objectif** | X $ vs X $ objectif (+/-X %) |
| **Dépense vs budget** | X $ vs X $ budget (+/-X %) |
| **Tendance d'efficacité** | Direction et ampleur de la tendance du ROAS/CAC mixte |
| **Réussite principale** | Le résultat positif le plus important |
| **Risque principal** | La préoccupation la plus importante nécessitant une attention |
| **Décision clé nécessaire** | Ce que la direction doit décider sur la base de ces données |

### Section 2 : tunnel de revenu et de conversion

| Étape du tunnel | Ce mois | Mois dernier | Variation MoM | Variation YoY | Objectif |
|-------------|------------|------------|------------|------------|--------|
| Impressions / Portée | | | | | |
| Sessions / Trafic | | | | | |
| Leads / Ajouts au panier | | | | | |
| MQL / Paiements initiés | | | | | |
| Clients / Commandes | | | | | |
| Revenu | | | | | |

**Taux de conversion étape par étape :**

| Transition | Taux | Variation MoM | Benchmark |
|-----------|------|------------|-----------|
| Session → Lead | X % | | |
| Lead → MQL | X % | | |
| MQL → Client | X % | | |
| Global (Session → Client) | X % | | |

### Section 3 : analyse approfondie par canal

Pour chaque canal actif, rapporter :

**Recherche payante**
- Dépense : X $ (vs X $ budget)
- Revenu attribué : X $
- ROAS : X,Xx
- Campagnes les plus performantes (top 3 par revenu)
- Campagnes sous-performantes signalées
- Insights au niveau des mots-clés (nouveaux gagnants, CPC en hausse)

**Social payant**
- Dépense : X $ (vs X $ budget)
- Revenu attribué : X $
- ROAS : X,Xx
- Résumé de performance créative (top 3 des annonces par ROAS, alertes de fatigue créative)
- Insights d'audience (meilleurs segments, signaux de saturation)

**SEO / Organique**
- Sessions : X (tendance MoM)
- Classements de mots-clés : résumé des mouvements
- Performance du contenu : pages les plus performantes par trafic et conversion
- Santé technique : Core Web Vitals, erreurs de crawl

**E-mail / SMS**
- Revenu : X $
- Revenu en % du total : X %
- Croissance de la liste : +X nouveaux abonnés nets
- Performance de campagne : taux d'ouverture, CTR, revenu par envoi
- Performance des flux : revenu des flux automatisés

**Recommandation / Affiliation / Partenariats**
- Revenu : X $
- Principales sources de recommandation
- Performance des partenaires

### Section 4 : analyse de cohorte et de rétention (le cas échéant)

| Mois d'acquisition | Mois 0 | Mois 1 | Mois 2 | Mois 3 | Mois 6 | Mois 12 |
|-------------------|---------|---------|---------|---------|---------|----------|
| [il y a 3 mois] | 100 % | X % | X % | X % | | |
| [il y a 2 mois] | 100 % | X % | X % | | | |
| [il y a 1 mois] | 100 % | X % | | | | |
| [ce mois] | 100 % | | | | | |

### Section 5 : réconciliation budgétaire

| Canal | Budget | Dépense réelle | Écart | Efficacité (ROAS/CPA) | Recommandation |
|---------|--------|-------------|----------|----------------------|----------------|
| | | | | | Augmenter / Maintenir / Diminuer |

### Section 6 : résultats des expériences

| Test | Canal | Hypothèse | Résultat | Sig. stat. ? | Estimation d'impact | Prochaine étape |
|------|---------|------------|--------|-----------|-----------------|-----------|
| | | | Victoire / Défaite / Non concluant | Oui / Non | X $/mois | Étendre / Itérer / Arrêter |

### Section 7 : plan du mois suivant

- Les 3 principales priorités avec propriétaires et critères de succès
- Changements d'allocation budgétaire (le cas échéant)
- Expériences planifiées
- Risques ou dépendances connus

---

## Modèle de revue d'activité trimestrielle (QBR)

**Objectif :** revue stratégique reliant la performance marketing aux résultats de l'entreprise.
**Audience :** équipe exécutive, conseil d'administration (le cas échéant).
**Livraison :** sous 10 jours ouvrés après la fin du trimestre.

### Structure du QBR

1. **Résumé du trimestre** (1 diapositive / section)
   - Revenu vs objectif, dépense vs budget, métriques d'efficacité clés
   - 3 réussites principales, 1 échec principal

2. **Fiche de score des objectifs** (1 diapositive / section)

   | Objectif T[X] | Cible | Réel | Statut | Commentaire |
   |-----------|--------|--------|--------|------------|
   | Revenu | X $ | X $ | Dans/Hors des temps | |
   | Nouveaux clients | X | X | | |
   | CAC | X $ | X $ | | |
   | LTV:CAC | X:1 | X:1 | | |
   | Métrique de marque | X | X | | |

3. **Revue du portefeuille de canaux** (1 diapositive par canal)
   - Performance trimestrielle, tendance vs trimestres précédents, efficacité, signaux de saturation

4. **Insights clients** (1 diapositive / section)
   - Évolution du mix de canaux d'acquisition, tendances de rétention, performance au niveau segment

5. **Paysage concurrentiel** (1 diapositive / section)
   - Évolution de la part de marché, activité des concurrents, part de voix

6. **Enseignements des expériences** (1 diapositive / section)
   - Tous les tests exécutés dans le trimestre, résultats, impact cumulé

7. **Stratégie du trimestre suivant** (2-3 diapositives / sections)
   - Objectifs, demande de budget, stratégie de canal, paris clés, atténuation des risques

8. **Annexe**
   - Tableaux de données détaillés, notes de méthodologie, glossaire

---

## Modèle de rapport de campagne

**Objectif :** évaluer la performance d'une campagne spécifique par rapport à ses objectifs.
**Usage :** post-campagne (sous 5 jours ouvrés après la fin de la campagne).

### Vue d'ensemble de la campagne

| Champ | Détail |
|-------|--------|
| Nom de la campagne | |
| Objectif | Notoriété / Considération / Conversion |
| Dates de diffusion | Début — Fin |
| Budget total | X $ |
| Dépense totale | X $ |
| Audience cible | |
| Canaux utilisés | |

### Performance vs objectifs

| Métrique d'objectif | Cible | Réel | % de la cible | Verdict |
|-----------------|--------|--------|------------|---------|
| | | | | Atteint / Manqué / Dépassé |

### Performance créative

| Variante créative | Impressions | CTR | CPA | ROAS | Taux d'engagement |
|-----------------|-------------|-----|-----|------|----------------|
| | | | | | |

### Performance d'audience

| Segment | Part de dépense | Part de revenu | CPA | ROAS |
|---------|------------|---------------|-----|------|
| | | | | |

### Enseignements clés

1. Ce qui a fonctionné et devrait être répété
2. Ce qui a sous-performé et pourquoi
3. Ce qui devrait être testé la prochaine fois

---

## Bonnes pratiques de visualisation de données

| Type de graphique | Idéal pour | À éviter quand |
|-----------|----------|------------|
| Graphique linéaire | Tendances dans le temps | Moins de 4 points de données |
| Graphique à barres | Comparer des catégories | Plus de 10 catégories |
| Barres empilées | Partie-vers-tout dans le temps | Plus de 5 segments |
| Camembert | Part simple (2-4 segments max) | Plus de 4 segments (utiliser des barres) |
| Nuage de points | Corrélation entre deux métriques | Petits jeux de données |
| Tableau | Les valeurs précises comptent | L'audience a besoin de reconnaissance de motif |
| Sparkline | Tendance en ligne dans une fiche de score | Quand le détail est nécessaire |

### Règles de formatage pour les tableaux de bord exécutifs

- [ ] Pas plus de 6-8 métriques visibles sans défilement
- [ ] Chaque métrique a un contexte de comparaison (vs objectif, vs période précédente)
- [ ] La couleur est utilisée pour le statut, pas la décoration (rouge/jaune/vert uniquement)
- [ ] Les titres sont des insights, pas des libellés (« Revenu en hausse de 12 % MoM » et non « Graphique du revenu »)
- [ ] Les filtres sont par défaut sur la vue la plus courante (30 derniers jours, tous les canaux)
- [ ] Lisible sur mobile si les parties prenantes y accèdent depuis un téléphone
- [ ] Les données se rafraîchissent automatiquement — aucune mise à jour manuelle requise

---

## Guide de formatage par partie prenante

| Audience | Format | Longueur | Focus | Cadence de mise à jour |
|----------|--------|--------|-------|----------------|
| PDG / Conseil | Présentation ou one-pager | 3-5 diapositives | Impact commercial, décisions stratégiques | Trimestrielle |
| VP Marketing | Tableau de bord + récit | 2-3 pages | Performance vs objectifs, allocation des ressources | Mensuelle |
| Responsables de canal | Tableaux détaillés + analyse | 3-5 pages | Optimisation tactique, résultats de tests | Hebdomadaire |
| Cross-fonctionnel (Ventes, Produit) | Tableau de bord partagé | 1 page | Métriques partagées, pipeline, attribution | Mensuelle |
| Finance | Feuille de calcul + résumé | Réconciliation budgétaire | Dépense vs budget, ROI, prévisions | Mensuelle |

---

## Liste de contrôle : avant d'envoyer tout rapport

- [ ] Chaque métrique a un contexte de comparaison (période précédente, objectif, ou benchmark)
- [ ] Les anomalies sont expliquées, pas seulement signalées
- [ ] Le résumé exécutif peut se suffire à lui-même sans lire le rapport complet
- [ ] Les éléments d'action ont des propriétaires et des échéances
- [ ] Les données ont été validées par rapport à la source de vérité
- [ ] Les choix de visualisation correspondent au message (tendance = ligne, comparaison = barres)
- [ ] Le rapport a été revu par au moins un autre membre de l'équipe
- [ ] Envoyé selon le calendrier (jamais en retard — fixer des attentes si les données sont retardées)

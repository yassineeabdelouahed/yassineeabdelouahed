# Conception de tableau de bord marketing — Architecture et bonnes pratiques

> **Provenance des benchmarks (au 2026-08) :** les montants en dollars de ce document sont des a priori de planification, pas des cotations — les taux de marché et d'enchère évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, rafraîchissez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et consignez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le registre (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Hiérarchie des tableaux de bord

Les tableaux de bord marketing devraient exister en trois niveaux, chacun servant une audience, une cadence, et une profondeur de détail différentes.

```
Executive Dashboard (C-Suite, VP)
├── 5-7 KPIs | Monthly review | Strategic decisions
│
Operational Dashboard (Directors, Managers)
├── 15-20 metrics | Weekly review | Tactical adjustments
│
Campaign Dashboard (Specialists, Analysts)
└── 30+ metrics | Daily/real-time | Execution optimization
```

| Niveau | Audience | Nombre de KPI | Cadence de revue | Plage temporelle | Fréquence de mise à jour |
|------|----------|-----------|----------------|------------|-----------------|
| Exécutif | C-suite, VP, conseil d'administration | 5-7 | Mensuelle | MoM, QoQ, YoY | Rafraîchissement hebdomadaire |
| Opérationnel | Directeurs, managers | 15-20 | Hebdomadaire | WoW, MoM | Rafraîchissement quotidien |
| Campagne | Spécialistes, analystes | 30+ | Quotidienne | Quotidien, horaire | Temps réel ou horaire |

---

## Modèle de tableau de bord exécutif

### Objectif
Donner à la direction une vue en un seul écran de l'impact du marketing sur les résultats de l'entreprise. Pas de défilement. Pas d'onglets. Chaque métrique a un contexte (vs objectif, vs période précédente).

### Métriques requises (5-7 maximum)

| Métrique | Visualisation | Contexte nécessaire |
|--------|--------------|----------------|
| Revenu généré par le marketing | Fiche de score avec sparkline | vs objectif, vs même mois l'année dernière |
| CAC mixte | Fiche de score avec flèche de tendance | vs objectif, changement MoM |
| Pipeline influencé par le marketing | Fiche de score avec sparkline | vs objectif, vs mois précédent |
| ROAS ou ROI mixte | Fiche de score avec flèche de tendance | vs objectif, répartition par canal en infobulle |
| Total des leads qualifiés (MQL/SQL/PQL) | Graphique à barres (mensuel, tendance sur 6 mois) | Superposition de la ligne d'objectif |
| Mix de canaux (% de revenu par canal) | Barres empilées ou donut | Changement MoM mis en évidence |
| Taux de conversion du tunnel | Graphique de tunnel horizontal | vs benchmark, vs période précédente |

### Mise en page du tableau de bord exécutif

```
┌────────────────────────────────────────────────────────────────┐
│  MARKETING PERFORMANCE — [Month] [Year]          [Date range] │
├──────────┬──────────┬──────────┬──────────┬──────────┐        │
│ Revenue  │ CAC      │ Pipeline │ ROAS     │ Leads    │        │
│ $1.2M    │ $142     │ $4.8M    │ 5.2x     │ 3,841    │        │
│ ▲ +12%   │ ▼ -8%    │ ▲ +18%   │ ▲ +0.3x  │ ▲ +15%   │        │
│ vs target│ vs target│ vs target│ vs target│ vs target│        │
├──────────┴──────────┴──────────┴──────────┴──────────┘        │
│                                                                │
│  ┌─── Revenue by Channel (6-mo) ──┐  ┌── Funnel (MoM) ──────┐│
│  │ [Stacked bar chart]             │  │ Visitors → Leads      ││
│  │                                 │  │ Leads → MQLs          ││
│  │                                 │  │ MQLs → SQLs           ││
│  │                                 │  │ SQLs → Closed Won     ││
│  └─────────────────────────────────┘  └───────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

### Règles du tableau de bord exécutif

- [ ] Chaque métrique affiche un contexte de comparaison (vs objectif, vs période précédente, vs même période l'année dernière)
- [ ] Codage couleur : vert = dans les temps, jaune = à moins de 10 % de l'objectif, rouge = plus de 10 % d'écart avec l'objectif
- [ ] Pas plus de 7 métriques sur la vue principale
- [ ] Flèches de direction de tendance sur chaque fiche de score
- [ ] Le sélecteur de plage de dates est par défaut sur le mois en cours avec comparaison au mois précédent
- [ ] Pas de jargon — utiliser le langage métier, pas des termes spécifiques à la plateforme

---

## Modèle de tableau de bord opérationnel

### Objectif
Permettre aux responsables marketing d'identifier les problèmes, repérer les opportunités, et effectuer des ajustements tactiques hebdomadaires sur tous les canaux.

### Groupes de métriques

#### Trafic et acquisition

| Métrique | Visualisation | Seuil d'alerte |
|--------|--------------|-----------------|
| Sessions quotidiennes (total + par canal) | Graphique linéaire avec répartition par canal | Baisse >20 % vs moyenne sur 7 jours |
| Nouveaux vs visiteurs récurrents | Graphique en aires empilées | Baisse de la part de visiteurs récurrents >15 % |
| Sessions de recherche organique | Graphique linéaire avec tendance | Déclin >15 % semaine sur semaine |
| Sessions de trafic payant | Graphique linéaire par plateforme | Rythme budgétaire >120 % ou <80 % |
| Trafic de référence | Graphique à barres top 10 sources | Alerte de nouveau référent à fort volume |
| Trafic direct | Graphique linéaire | Un pic peut indiquer un problème de suivi |

#### Conversion et revenu

| Métrique | Visualisation | Seuil d'alerte |
|--------|--------------|-----------------|
| Taux de conversion global | Graphique linéaire avec moyenne sur 30 jours | Baisse >15 % vs moyenne sur 30 jours |
| Taux de conversion par canal | Graphique à barres (horizontal) | Tout canal >20 % sous la moyenne |
| Revenu par canal (quotidien) | Graphique en aires empilées | Baisse >25 % sur tout canal |
| Panier moyen | Graphique linéaire avec tendance | Baisse >10 % vs moyenne glissante |
| Taux d'abandon de panier | Graphique linéaire | Hausse de plus de 5 points par rapport à la référence |
| Taux lead-vers-MQL | Pourcentage de tunnel | Baisse sous 20 % |
| Taux MQL-vers-SQL | Pourcentage de tunnel | Baisse sous 30 % |

#### Performance e-mail

| Métrique | Visualisation | Seuil d'alerte |
|--------|--------------|-----------------|
| Volume d'envoi e-mail (hebdomadaire) | Graphique à barres | N/A |
| Taux d'ouverture par type de campagne | Graphique à barres groupées | Baisse sous 15 % |
| Taux de clic par type de campagne | Graphique à barres groupées | Baisse sous 2 % |
| Taux de désabonnement | Graphique linéaire | Pic au-dessus de 0,5 % par campagne |
| Taux de croissance de la liste (net) | Graphique linéaire | Croissance négative pendant 2 semaines ou plus |
| Revenu par e-mail envoyé | Fiche de score avec tendance | Baisse sous 0,10 $ |

#### Réseaux sociaux

| Métrique | Visualisation | Seuil d'alerte |
|--------|--------------|-----------------|
| Taux d'engagement par plateforme | Graphique à barres (horizontal) | Baisse >25 % vs moyenne glissante |
| Croissance des abonnés (net) | Graphique linéaire par plateforme | Croissance négative sur toute plateforme |
| Trafic social vers le site web | Graphique linéaire | Baisse >30 % semaine sur semaine |
| Publications les plus performantes (hebdomadaire) | Tableau avec métriques d'engagement | N/A (informationnel) |

#### Publicité payante

| Métrique | Visualisation | Seuil d'alerte |
|--------|--------------|-----------------|
| Dépense quotidienne par plateforme | Graphique à barres empilées | Rythme >120 % du budget quotidien |
| CPA par plateforme | Graphique linéaire | CPA >130 % de l'objectif |
| ROAS par plateforme | Graphique à barres | ROAS <80 % de l'objectif |
| Part d'impressions (recherche) | Graphique linéaire | Baisse sous 70 % pour les termes de marque |
| Distribution du Quality Score | Histogramme | >30 % des mots-clés sous un QS de 5 |

---

## Modèle de tableau de bord de campagne

### Objectif
Fournir des données de performance en temps réel pour les campagnes actives afin que les spécialistes puissent optimiser l'exécution au quotidien.

### Métriques au niveau de la campagne

| Métrique | Fréquence de mise à jour | Visualisation |
|--------|-----------------|--------------|
| Impressions (cumulées + quotidiennes) | Temps réel | Graphique linéaire avec ligne de rythme cible |
| Clics et CTR | Temps réel | Fiche de score + graphique linéaire |
| Conversions et CVR | Horaire | Fiche de score + graphique linéaire |
| Coût et CPA | Horaire | Fiche de score + graphique de consommation budgétaire |
| ROAS | Horaire | Fiche de score avec tendance |
| Rythme budgétaire | Temps réel | Barre de progression (% du budget dépensé vs % de la période écoulée) |
| Statut des tests A/B | Quotidienne | Tableau (variante, impressions, CVR, niveau de confiance) |
| Performance au niveau de l'annonce | Quotidienne | Tableau triable par CTR, CPA, ROAS |
| Performance des mots-clés | Quotidienne | Tableau avec QS, CPC, conversions |
| Performance de l'audience | Quotidienne | Tableau par segment d'audience |
| Performance de l'emplacement | Quotidienne | Tableau par appareil, lieu, heure de la journée |

### Visualisation du rythme budgétaire

```
Budget: $10,000 | Period: Nov 1-30 | Today: Nov 15 (50% elapsed)

Ideal pace:   ████████████████░░░░░░░░░░░░░░░░  50% ($5,000)
Actual spend:  ███████████████████░░░░░░░░░░░░░  58% ($5,800)  ⚠️ Over-pacing

Status: Over-pacing by 8% — reduce bids by 5-10% or pause low-performers
```

---

## Bonnes pratiques de visualisation

### Guide de sélection du type de graphique

| Type de données | Meilleure visualisation | Quand l'utiliser | À éviter |
|-----------|-------------------|-------------|-------|
| KPI unique (valeur actuelle) | Fiche de score / grand chiffre | Résumé exécutif, métriques clés | Utiliser un graphique pour un seul chiffre |
| Tendance dans le temps (1 métrique) | Graphique linéaire avec sparkline | Trafic, taux de conversion, tendances de revenu | Camembert pour des données de série temporelle |
| Tendance dans le temps (plusieurs) | Multi-lignes ou aires empilées | Comparaison de canaux dans le temps | Plus de 5 lignes sur un même graphique |
| Comparaison (catégories) | Graphique à barres horizontal | Performance de canal, comparaison de campagnes | Graphiques 3D, barres verticales avec de longs libellés |
| Partie d'un tout | Donut ou barres empilées | Allocation budgétaire, mix de trafic | Camembert avec plus de 6 parts |
| Distribution | Histogramme | Distribution du Quality Score, fourchettes de CPC | Graphique linéaire pour des données non continues |
| Tunnel / flux | Graphique de tunnel ou Sankey | Étapes du tunnel de conversion | Graphique à barres pour des données de flux séquentiel |
| Performance vs objectif | Graphique à puces (bullet chart) ou jauge | Suivi KPI vs objectif | Jauge compliquée avec plusieurs aiguilles |
| Corrélation de deux métriques | Nuage de points | CPC vs taux de conversion, dépense vs revenu | Sans libellés d'axes clairs et de contexte |
| Heure de la journée/jour de la semaine | Carte de chaleur | Motifs d'engagement, timing de conversion | Graphique linéaire avec 168 points de données horaires |
| Géographique | Carte choroplèthe | Performance régionale | Cartes pour des données non géographiques |
| Comparaison de nombreux éléments | Tableau avec mise en forme conditionnelle | Rapports de mots-clés, comparaisons d'annonces | Graphiques trop complexes |

### Principes de conception

- [ ] Utiliser des palettes de couleurs cohérentes sur tous les tableaux de bord (assigner une couleur par canal de façon permanente)
- [ ] Ordre de lecture de gauche à droite : les métriques les plus importantes en haut à gauche
- [ ] Espace blanc entre les sections — ne pas entasser les métriques
- [ ] Chaque graphique a un titre qui énonce l'insight, pas seulement le nom de la métrique (« Le revenu est en tendance de +12 % au-dessus de l'objectif » plutôt que « Revenu »)
- [ ] Inclure la plage de dates et l'heure du dernier rafraîchissement sur chaque page de tableau de bord
- [ ] Utiliser un formatage numérique cohérent (devise, pourcentages, abréviations)
- [ ] Ajouter des annotations pour les événements connus (lancement de campagne, panne du site, jour férié, mise à jour d'algorithme)
- [ ] Sparklines pour une visualisation de tendance compacte sur les fiches de score
- [ ] Mise en forme conditionnelle : rouge/jaune/vert liés à des seuils spécifiques, pas des plages arbitraires

---

## Configuration des seuils d'alerte

### Alertes critiques (notification immédiate)

| Condition | Seuil | Action |
|-----------|-----------|--------|
| Baisse du trafic du site | >30 % vs moyenne sur 7 jours (vérification horaire) | Vérifier les problèmes du site, les ruptures de suivi, les changements d'algorithme |
| Effondrement du taux de conversion | Baisse >40 % vs moyenne sur 7 jours | Vérifier les landing pages, le paiement, les formulaires, le suivi |
| Pic de dépense publicitaire | >150 % du budget quotidien | Vérifier un emballement d'enchère automatisée, les plafonds budgétaires |
| Baisse de revenu | >25 % vs même jour la semaine dernière | Recouper trafic, CVR, AOV pour diagnostiquer |
| Refus de campagne | Toute annonce ou mot-clé refusé | Revoir la raison du refus, corriger, re-soumettre |

### Alertes d'avertissement (jour ouvré suivant)

| Condition | Seuil | Action |
|-----------|-----------|--------|
| Déclin du trafic | >20 % vs moyenne sur 7 jours (vérification quotidienne) | Investiguer par canal |
| Baisse du taux de conversion | >15 % vs moyenne sur 30 jours | Vérification de test A/B, audit de landing page |
| Hausse du CPA | >20 % au-dessus de l'objectif pendant 3 jours consécutifs ou plus | Ajustements d'enchère, revue d'audience |
| Taux de rebond d'e-mail | >5 % sur un envoi | Hygiène de liste, vérification de la réputation de domaine |
| Pic de taux de rebond | Hausse de plus de 10 points par rapport à la référence | Pertinence du contenu, vitesse de page, UX mobile |
| Sous-dépense publicitaire | <70 % du budget quotidien en fin de journée | Vérifier la compétitivité des enchères, les restrictions de ciblage |

### Alertes informationnelles (revue hebdomadaire)

| Condition | Seuil | Action |
|-----------|-----------|--------|
| Baisse du Quality Score d'un mot-clé | Tout mot-clé perd 2 points ou plus | Revoir la pertinence de l'annonce et la landing page |
| Nouveau référent à fort trafic | Une source de référence envoie 100+ sessions/semaine | Investiguer la source, envisager un partenariat |
| Fatigue d'audience | Fréquence >10 par utilisateur par semaine | Rafraîchir la création, élargir l'audience |
| Changement de classement organique | Tout mot-clé du top 10 sort de la page 1 | Rafraîchissement de contenu, audit technique |

---

## Recommandations d'outils

| Outil | Prix | Idéal pour | Forces clés |
|------|-------|----------|---------------|
| Google Looker Studio | Gratuit | Tableaux de bord natifs GA4, petites équipes | Intégration Google poussée, connecteurs personnalisés, liens partageables |
| Tableau | 70-150 $/utilisateur/mois | Analytics d'entreprise, mélange de données complexe | Modélisation de données puissante, visualisations avancées, grands jeux de données |
| Power BI | 10-20 $/utilisateur/mois | Équipes de l'écosystème Microsoft | Intégration Excel, abordable, DAX pour des calculs personnalisés |
| Databox | 0-199 $/mois | Agrégation de tableaux de bord multi-sources | 70+ intégrations natives, mobile-first, suivi d'objectifs |
| Klipfolio | 90-400 $/mois | Reporting d'agence (multi-client) | Marque blanche, distribution automatisée, 100+ sources de données |
| Supermetrics | 29-579 $/mois | Pipeline de données vers tableurs/outils BI | Extrait de 100+ plateformes marketing, rafraîchissements planifiés |
| Google Sheets + Supermetrics | ~30 $/mois | Équipes légères, analyse personnalisée | Flexible, scriptable, interface familière |
| Mixpanel / Amplitude | 0 $-sur mesure | Tableaux de bord produit et croissance | Analytics basé sur les événements, analyse de tunnel et de cohorte |

### Arbre de décision de sélection d'outil

```
Do you primarily use Google ecosystem (GA4, Google Ads)?
├── Yes → Looker Studio (free, native integration)
│   └── Need advanced modeling? → Add Supermetrics for data pipeline
│
├── No → Multi-platform data sources?
│   ├── Yes, many sources → Databox or Klipfolio (pre-built connectors)
│   └── Few sources → Power BI (affordable) or Tableau (powerful)
│
└── Agency with multiple clients?
    └── Klipfolio (white-label) or Databox (automated reports)
```

---

## Arbitrages de fraîcheur des données

| Niveau de fraîcheur | Fréquence de mise à jour | Usage typique | Arbitrage |
|----------------|-----------------|-------------|-----------|
| Temps réel | Continu/secondes | Tableaux de bord de campagne, suivi de la dépense | Coûts d'API plus élevés, infrastructure plus complexe |
| Quasi-temps réel | Toutes les 15-60 minutes | Tableaux de bord opérationnels, rythme budgétaire | Complexité modérée, le plus actionnable |
| Quotidien | Une fois par jour (nuit) | Tableaux de bord opérationnels et exécutifs | Simple à construire, suffisant pour la plupart des décisions |
| Agrégat hebdomadaire | Cumul hebdomadaire | Tableaux de bord exécutifs, analyse de tendance | Lisse le bruit, manque les anomalies quotidiennes |
| Agrégat mensuel | Cumul mensuel | Rapports au conseil, revues stratégiques | Tendances à long terme uniquement, pas de valeur tactique |

### Fraîcheur recommandée par tableau de bord

- **Exécutif :** un rafraîchissement quotidien est suffisant (les décisions sont mensuelles/trimestrielles)
- **Opérationnel :** rafraîchissement quotidien minimum, horaire pour les métriques de publicité payante
- **Campagne :** temps réel pour la dépense et les impressions, horaire pour les conversions et le CPA

---

## Anti-modèles de tableau de bord

| Anti-modèle | Pourquoi il échoue | Correction |
|-------------|-------------|-----|
| Métriques de vanité uniquement | Les impressions et abonnés sans résultats commerciaux induisent la direction en erreur | Toujours relier au revenu, au pipeline, ou à la conversion |
| Trop de métriques | 50+ métriques sur un écran provoque une paralysie d'analyse | Appliquer le système de niveaux — maximum 7 pour l'exécutif |
| Pas de contexte de comparaison | Un chiffre sans contexte est dénué de sens (« 1 234 conversions » — est-ce bon ?) | Toujours montrer vs objectif, vs période précédente, vs benchmark |
| Plage de dates manquante | Des métriques sans période claire sont impossibles à interpréter | Afficher la plage de dates de manière visible sur chaque page |
| Données obsolètes sans mention | Le tableau de bord affiche des données vieilles de 3 jours sans l'indiquer | Afficher « Dernière mise à jour : [horodatage] » de manière visible |
| Définitions incohérentes | « Conversion » signifie des choses différentes sur différents graphiques | Inclure les définitions de métriques dans un onglet glossaire |
| Pas de chemin d'approfondissement | L'exécutif voit une métrique rouge mais ne peut pas investiguer davantage | Relier les tableaux de bord exécutif → opérationnel → campagne |
| Surcharge de graphiques | Chaque métrique dans un graphique complexe alors qu'un tableau serait plus clair | Utiliser la visualisation la plus simple et efficace |
| Pas d'annotations | Changements de métrique soudains sans contexte sur ce qui s'est passé | Ajouter des marqueurs d'événement (lancements, pannes, jours fériés, mises à jour) |
| Jargon spécifique à la plateforme | Utiliser « CPM » et « ROAS » avec une audience exécutive non-marketing | Traduire en langage métier pour les tableaux de bord exécutifs |

---

## Modèles par modèle économique

### Zones d'intérêt du tableau de bord SaaS

| Niveau de tableau de bord | Métriques clés | Considérations particulières |
|---------------|------------|----------------------|
| Exécutif | MRR, NRR, CAC, LTV:CAC, pipeline qualifié | Afficher la cascade de MRR (nouveau + expansion - contraction - désabonnement) |
| Opérationnel | Vélocité de leads, taux d'activation, essai-vers-payant, adoption de fonctionnalités | Suivre les leads qualifiés produit aux côtés des leads qualifiés marketing |
| Campagne | Demandes de démo, débuts d'essai gratuit, téléchargements de contenu par étape | L'attribution au pipeline est critique — suivre à travers le CRM |

### Zones d'intérêt du tableau de bord e-commerce

| Niveau de tableau de bord | Métriques clés | Considérations particulières |
|---------------|------------|----------------------|
| Exécutif | Revenu, AOV, CVR, ROAS, taux de rachat | Revenu par canal avec superposition de marge |
| Opérationnel | Trafic par source, abandon de panier, % de revenu e-mail, performance produit | Segmenter par revenu de client nouveau vs récurrent |
| Campagne | ROAS par campagne, performance au niveau produit, métriques d'annonces dynamiques | Suivi quotidien de la santé du flux de stock |

### Zones d'intérêt du tableau de bord de génération de leads B2B

| Niveau de tableau de bord | Métriques clés | Considérations particulières |
|---------------|------------|----------------------|
| Exécutif | Pipeline généré, revenu généré par le marketing, CAC par canal | Fenêtres d'attribution longues (60-180 jours) |
| Opérationnel | MQL, SQL, taux lead-vers-opportunité, engagement de contenu | Suivre par persona et niveau de compte |
| Campagne | CPL, score de qualité de lead, taux de complétion de formulaire, téléchargements de contenu | Alignement de la notation des leads avec le retour commercial |

### Zones d'intérêt du tableau de bord d'agence

| Niveau de tableau de bord | Métriques clés | Considérations particulières |
|---------------|------------|----------------------|
| Exécutif client | KPI spécifiques au client, ROAS, progression des objectifs | En marque blanche, aux couleurs de la marque, simple |
| Responsable de compte | Performance cross-client, comptes à risque, signaux de vente incitative | Métriques d'efficacité (heures par compte, marge) |
| Spécialiste | Performance spécifique à la plateforme, opportunités d'optimisation | Métriques de plateforme approfondies avec contexte de benchmark |

---

## Liste de contrôle de mise en œuvre

- [ ] Hiérarchie de tableau de bord définie (exécutif, opérationnel, campagne)
- [ ] Propriétaires de métrique assignés pour chaque métrique de chaque tableau de bord
- [ ] Sources de données connectées et validées (recoupement avec les rapports natifs de la plateforme)
- [ ] Fréquence de rafraîchissement configurée par niveau de tableau de bord
- [ ] Palette de couleurs standardisée sur tous les tableaux de bord (une couleur par canal/source)
- [ ] Seuils d'alerte configurés pour les conditions critiques et d'avertissement
- [ ] Contexte de comparaison ajouté à chaque métrique (vs objectif, vs période précédente)
- [ ] Chemins d'approfondissement reliés entre les niveaux de tableau de bord
- [ ] Onglet glossaire avec les définitions de métriques ajouté à chaque tableau de bord
- [ ] Annotations d'événements configurées pour les campagnes, lancements, pannes
- [ ] Permissions d'accès définies (les exécutifs voient le niveau exécutif, pas le bruit de campagne)
- [ ] Distribution automatisée planifiée (PDF par e-mail hebdomadaire, partage de lien)
- [ ] Audit trimestriel du tableau de bord planifié (retirer les métriques inutilisées, en ajouter de nouvelles)
- [ ] Formation des utilisateurs terminée pour tous les consommateurs du tableau de bord

---

*Un tableau de bord que personne ne consulte est pire que pas de tableau de bord du tout. Concevez pour les décisions de votre audience, pas pour la curiosité de votre analyste. Chaque métrique à l'écran devrait répondre à une question que quelqu'un pose réellement, et chaque réponse devrait suggérer une action qu'il peut réellement entreprendre.*

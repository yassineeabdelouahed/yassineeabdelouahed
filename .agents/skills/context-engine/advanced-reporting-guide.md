# Guide de reporting avancé

Connaissances de référence pour la génération de rapports PDF, les modèles de tableau de bord, l'attribution multi-touch, l'analyse de cohorte, le reporting d'écart budgétaire, la mesure d'incrémentalité, et l'automatisation de rapports programmés. Utilisez ce guide lors de la construction, de la livraison, ou de l'automatisation de rapports de performance marketing.

---

## 1. Génération de PDF avec habillage de marque

### WeasyPrint (HTML/CSS vers PDF)

- **Méthode** : Écrire le rapport en HTML avec du CSS en ligne ou lié. Convertir en PDF via `weasyprint.HTML(string=html_content).write_pdf(output_path)`
- **Intégration du CSS de marque** :
  - Définir `--brand-primary`, `--brand-secondary`, `--brand-accent` comme propriétés CSS personnalisées à partir des valeurs hexadécimales du profil de marque
  - Déclarations `@font-face` pour les polices de marque (intégrer WOFF/WOFF2 ou référencer les polices système)
  - Marges de page : `@page { margin: 2cm; @top-center { content: "Campaign Report — Q1 2026"; font-size: 9pt; } @bottom-right { content: "Page " counter(page) " of " counter(pages); } }`
  - Placement du logo : `<img>` à position fixe dans la zone d'en-tête. Recommandé : 120x40 px pour l'en-tête, 200x60 px pour la page de couverture
- **Limitations** : Aucune exécution JavaScript (les graphiques doivent être pré-rendus en images ou en SVG en ligne). Prise en charge limitée de CSS Grid — utiliser Flexbox ou une mise en page en tableau pour les structures complexes

### ReportLab (PDF programmatique)

- **Méthode** : Construire le PDF de manière programmatique avec `canvas.Canvas` ou `SimpleDocTemplate` avec des flowables Platypus
- **Intégration de marque** :
  - Enregistrer les couleurs de marque : `colors.HexColor('#1a73e8')` pour le primaire, secondaire, accent
  - Enregistrer les polices de marque : `pdfmetrics.registerFont(TTFont('BrandFont', 'path/to/font.ttf'))`
  - Modèle de page avec logo : `canvas.drawImage('logo.png', x, y, width, height)` dans le callback `onPage`
  - En-têtes/pieds de page : Période de campagne, avis de confidentialité, numéros de page via les hooks `onPage`/`onPageEnd`
- **Intégration de graphiques** : Générer des graphiques avec matplotlib, sauvegarder en PNG/SVG, intégrer via `canvas.drawImage` ou le flowable `Image`

### Checklist d'intégration des actifs de marque

| Actif | Source | Placement |
|---|---|---|
| Logo (principal) | `logo_url` du profil de marque | Page de couverture (centré, 200x60 px), en-tête (aligné à gauche, 120x40 px) |
| Couleurs de marque | `brand_colors` du profil de marque | Titres, couleurs de graphiques, en-têtes de tableau, lignes d'accentuation, boutons CTA |
| Polices | Profil de marque ou repli système | Corps : 10-11pt, Titres : 14-18pt, Légendes : 8-9pt |
| Texte d'en-tête | Dynamique par rapport | « Rapport de performance mensuel — [Nom de marque] — [Plage de dates] » |
| Texte de pied de page | Modèle statique | « Confidentiel — Préparé par [Nom de l'agence/équipe] — Page X sur Y » |
| Page de couverture | Modèle | Logo de marque, titre du rapport, plage de dates, préparé pour/par, version |

---

## 2. Modèles de structure de rapport par audience

### Résumé exécutif direction générale (1-2 pages)

1. **Titre de performance** : Une phrase résumant la période. « Le chiffre d'affaires issu du marketing a crû de 23 % trimestre sur trimestre, porté par la recherche payante et l'e-mail. »
2. **Tableau de bord de KPI** : 3-5 KPI au format grand chiffre avec flèches de tendance :
   - Chiffre d'affaires attribué au marketing : X $ (+Y % vs période précédente)
   - Coût d'acquisition client : X $ (-Y % vs période précédente)
   - Pipeline issu du marketing : X $
   - ROAS : X,Xx
   - Nouveaux leads/clients nets : X
3. **Sparklines de tendance** : Ligne de tendance sur 12 semaines ou 6 mois pour chaque KPI. Aucun libellé d'axe — juste la direction
4. **Points saillants stratégiques** : 2-3 puces sur ce qui a fonctionné, ce qui n'a pas fonctionné, et ce qui change la période suivante
5. **Résumé budgétaire** : Dépense prévue vs réelle. Une ligne par canal. Total en bas

### Rapport pour l'équipe marketing (5-10 pages)

1. **Résumé exécutif** (1 page) : Identique au format direction générale ci-dessus
2. **Performance par canal** (2-3 pages) : Une section par canal actif. Tableau de métriques, graphique de tendance, meilleurs et moins performants, optimisations effectuées
3. **Approfondissements de campagne** (1-2 pages) : Campagnes majeures lancées ou terminées. Performance vs objectifs. Enseignements clés
4. **Résultats de test A/B** (1 page) : Tests exécutés, gagnants, niveaux de confiance, estimations d'impact. Tests planifiés pour la période suivante
5. **Performance de contenu** (1 page) : Meilleur contenu par trafic, engagement, conversions. Alertes de décroissance de contenu. Rythme de publication vs plan
6. **Plan de la période suivante** (1 page) : Priorités, campagnes planifiées, allocation budgétaire, expériences à mener

### Rapport client (5-8 pages)

1. **Page de couverture à l'image de marque** : Logo client, titre du rapport, plage de dates, préparé par
2. **Résumé exécutif** (1 page) : Performance vs objectifs convenus. Statut feu tricolore (vert/jaune/rouge) par objectif
3. **Performance par objectif** (2-3 pages) : Chaque objectif du SOW obtient une section dédiée avec KPI, graphiques, et commentaire
4. **Contexte concurrentiel** (0,5-1 page) : Comment la performance se compare aux références sectorielles et aux mouvements des concurrents
5. **Optimisations et enseignements** (1 page) : Ce qui a été testé, ce qui a été appris, comment cela informe la stratégie
6. **Plan de la période suivante** (1 page) : Activités planifiées, calendrier, résultats attendus
7. **Annexe** : Tableaux de données brutes, notes méthodologiques, glossaire des termes

---

## 3. Modèles de tableau de bord Looker Studio par modèle économique

### Tableau de bord SaaS

| Section | Métriques | Visualisation |
|---|---|---|
| **Chiffre d'affaires** | MRR, ARR, taux de croissance MRR, MRR d'expansion, MRR perdu (churned), MRR net nouveau | Graphique linéaire chronologique (12 mois). Barre empilée pour les composants MRR |
| **Acquisition** | Nouveaux essais, taux de conversion essai-vers-payant, CAC, CAC par canal, période de retour du CAC | Graphique en entonnoir (visite→essai→payant). Graphique en barres pour le CAC par canal |
| **Rétention** | Taux de churn de logos, taux de churn de chiffre d'affaires, rétention nette de chiffre d'affaires (NRR), ratio DAU/MAU | Carte de chaleur de cohorte (cohortes mensuelles, rétention sur 12 mois). Graphique linéaire pour la tendance NRR |
| **Engagement** | Taux d'activation (% complétant l'action clé dans les 7 premiers jours), taux d'adoption de fonctionnalités, volume de tickets de support | Graphique en barres pour l'adoption de fonctionnalités. Entonnoir pour les étapes d'intégration |
| **Économie unitaire** | LTV, ratio LTV:CAC, marge brute par client | Tuiles de score avec flèches de tendance. Nuage de points LTV vs CAC par segment |

### Tableau de bord e-commerce

| Section | Métriques | Visualisation |
|---|---|---|
| **Chiffre d'affaires** | Chiffre d'affaires brut, chiffre d'affaires net, panier moyen, chiffre d'affaires par visiteur, chiffre d'affaires par catégorie de produit | Chronologique (quotidien/hebdomadaire). Treemap pour la part de chiffre d'affaires par catégorie |
| **Trafic** | Sessions, utilisateurs, nouveaux vs récurrents, trafic par canal, trafic par appareil | Graphique en aires empilées par canal. Camembert pour la répartition par appareil |
| **Conversion** | Taux de conversion global, taux d'ajout au panier, taux d'abandon de panier, taux de complétion du checkout | Graphique en entonnoir (vue PDP→ajout au panier→checkout→achat). Graphique linéaire pour la tendance du taux de conversion |
| **Produit** | Meilleurs produits par chiffre d'affaires, par unités, par marge, rotation des stocks | Tableau avec sparklines. Graphique en barres pour le top 10 des produits |
| **Médias payants** | ROAS par canal, CPA, dépense publicitaire, chiffre d'affaires attribué, part d'impressions | Graphique en barres pour le ROAS par canal. Cascade (waterfall) pour dépense vs chiffre d'affaires |

### Tableau de bord de génération de leads B2B

| Section | Métriques | Visualisation |
|---|---|---|
| **Pipeline** | MQL, SQL, opportunités, valeur du pipeline, valeur des affaires gagnées, vélocité (jours jusqu'à la clôture) | Graphique en entonnoir (lead→MQL→SQL→opp→clôturé). Chronologique pour la valeur du pipeline |
| **Taux de conversion** | Lead→MQL, MQL→SQL, SQL→Opp, Opp→Clôturé. Par canal et par campagne | Graphique en barres horizontales par étape. Carte de chaleur par canal x étape |
| **Efficacité des coûts** | CPL, coût par MQL, coût par SQL, coût par opportunité, CAC | Graphique en barres par canal. Ligne de tendance pour le CPL mixte |
| **Contenu** | Téléchargements, remplissages de formulaire, inscriptions à des webinaires, pipeline attribué au contenu | Tableau avec attribution. Graphique en barres pour le meilleur contenu par pipeline généré |
| **Mix canal** | Volume de leads et score de qualité par canal, allocation budgétaire vs résultats | Nuage de points (volume vs qualité). Barre empilée pour budget vs pipeline |

### Tableau de bord multi-client d'agence

| Section | Métriques | Visualisation |
|---|---|---|
| **Vue d'ensemble client** | Nombre de clients, MRR total sous gestion, taille moyenne des rétentions, scores de santé client | Tuiles de score. Tableau avec codage couleur de santé (vert/jaune/rouge) |
| **Cumul de performance** | KPI agrégés à travers tous les clients : total des leads générés, chiffre d'affaires total attribué, ROAS moyen | Barre empilée par client. Ligne de tendance pour la performance agrégée |
| **Utilisation de la rétention** | Heures allouées vs utilisées par client, % d'utilisation, clients à risque (>90 % utilisés) | Graphique en barres par client. Ligne de seuil à 100 % |
| **Suivi des livrables** | Livrables à échéance, terminés, en retard. Par client et par membre d'équipe | Chronologie de style Gantt. Tableau de statut avec indicateurs RAG |
| **Santé client** | NPS, temps de réponse, taux de livraison dans les délais, performance vs objectifs | Graphique radar par client. Ligne de tendance pour le NPS du portefeuille |

---

## 4. Méthodologie d'attribution multi-touch

### Définitions des modèles

| Modèle | Distribution du crédit | Idéal pour | Limitations |
|---|---|---|---|
| **Premier contact** | 100 % à la première interaction | Comprendre l'efficacité de canal en haut de tunnel | Ignore toutes les interactions de nurturing et de closing |
| **Dernier contact** | 100 % à la dernière interaction avant conversion | Comprendre la clôture en bas de tunnel | Ignore toute la notoriété et le nurturing |
| **Linéaire** | Crédit égal à chaque point de contact | Équité simple quand aucun point de contact n'est clairement plus important | Traite une visite de blog occasionnelle de la même manière qu'une démo produit |
| **Décroissance temporelle** | Plus de crédit aux points de contact récents. Demi-vie typique : 7 jours | Cycles de vente où les contacts plus tardifs comptent davantage | Sous-évalue les points de contact de notoriété précoces |
| **Basé sur la position (en U)** | 40 % premier contact, 40 % dernier contact, 20 % réparti au milieu | Vue équilibrée valorisant à la fois la découverte et la conversion | Les pourcentages fixes peuvent ne pas refléter l'influence réelle |
| **En W** | 30 % premier contact, 30 % création de lead, 30 % création d'opportunité, 10 % milieu | B2B avec des étapes de tunnel définies | Nécessite un suivi des étapes CRM, implémentation complexe |
| **Piloté par les données (algorithmique)** | Un modèle ML attribue le crédit sur la base d'une analyse statistique de tous les chemins de conversion | Organisations avec un volume de données suffisant (1 000+ conversions/mois) | Boîte noire, nécessite un volume de données significatif, spécifique à la plateforme |

### Exigences de données d'attribution

- **Suivi inter-canaux** : Paramètres UTM sur tous les liens (utm_source, utm_medium, utm_campaign, utm_content, utm_term). Pixels de plateforme sur toutes les pages de conversion (Meta Pixel, tag Google, LinkedIn Insight Tag). Imports de conversion offline pour les appels téléphoniques, visites en magasin, événements
- **Résolution d'identité** : Cookies de première partie pour le suivi inter-session. ID d'utilisateur connecté lorsque disponible. Correspondance e-mail CRM pour l'inter-appareil. Correspondance probabiliste comme repli (moins fiable après la dépréciation des cookies)
- **Fenêtre de conversion** : Définir la fenêtre de rétrospection maximale. Courant : 30 jours pour l'e-commerce, 90 jours pour le B2B, 7 jours pour les achats impulsifs. Tous les contacts hors de la fenêtre sont exclus de l'attribution
- **Conversions assistées** : GA4 fournit nativement des données de conversion assistée. Pour l'attribution personnalisée, interroger tous les points de contact dans la fenêtre de conversion, pas seulement la session de conversion

### Format de sortie du rapport d'attribution

Pour chaque canal/campagne :

| Colonne | Description |
|---|---|
| Canal/Campagne | Nom du canal marketing ou de la campagne |
| Conversions premier contact | Conversions attribuées selon le modèle premier contact |
| Conversions dernier contact | Conversions attribuées selon le modèle dernier contact |
| Conversions linéaires | Conversions attribuées selon le modèle linéaire |
| Conversions pilotées par les données | Conversions attribuées selon le modèle algorithmique (si disponible) |
| Conversions assistées | Total des conversions où ce canal est apparu dans le chemin mais n'était pas le contact de conversion |
| Ratio d'assistance | Conversions assistées / conversions dernier contact. >1,0 = davantage un assistant ; <1,0 = davantage un closer |
| Chiffre d'affaires attribué | Chiffre d'affaires crédité à ce canal selon le modèle sélectionné |
| ROAS | Chiffre d'affaires attribué / dépense pour ce canal |

---

## 5. Cadres d'analyse de cohorte

### Cohortes temporelles

- **Cohorte d'acquisition** : Regrouper les utilisateurs par la semaine ou le mois où ils ont converti pour la première fois (inscrit, acheté, abonné). Suivre le comportement sur les périodes suivantes
- **Tableau de rétention standard** : Lignes = cohorte (période d'acquisition), Colonnes = période depuis l'acquisition (Semaine 0, Semaine 1, ..., Semaine 12). Cellules = % de la cohorte encore active/retenue
- **Options de métrique** : Utilisateurs actifs (connectés), chiffre d'affaires retenu (toujours payant), taux de rachat, usage de fonctionnalités

### Cohortes comportementales

| Base de cohorte | Segments | Objectif d'analyse |
|---|---|---|
| **Catégorie du premier achat** | Par catégorie de produit de la première commande | Le premier achat prédit-il la LTV et le comportement de rachat ? |
| **Canal d'acquisition** | Organique, recherche payante, social, e-mail, parrainage | Quels canaux produisent les clients avec la meilleure rétention ? |
| **Première fonctionnalité utilisée** | Par première interaction significative avec une fonctionnalité | Le chemin d'intégration prédit-il la rétention ? |
| **Valeur de commande initiale** | 0-25 $, 25-50 $, 50-100 $, 100+ $ | La dépense initiale prédit-elle la valeur vie client ? |
| **Niveau d'engagement à l'inscription** | Élevé (5+ actions à la première session), Moyen (2-4), Faible (1) | L'engagement précoce prédit-il la rétention ? |

### Analyse de la courbe de rétention

- **Rétention semaine sur semaine** : Tracer le % retenu à chaque période. Schéma normal : forte chute initiale (Semaine 0→1), déclin progressif, puis stabilisation
- **Point de stabilisation** : La période à laquelle la rétention se stabilise (typiquement Semaine 8-12 pour le SaaS, Semaine 4-6 pour l'e-commerce). Les utilisateurs retenus au-delà de ce point sont probablement à long terme
- **Comparaison de cohorte** : Superposer les courbes de rétention de différentes cohortes. Les cohortes plus récentes retiennent-elles mieux que les plus anciennes ? Si oui, les améliorations produit/intégration fonctionnent
- **Impact d'intervention** : Comparer les courbes de rétention avant et après un changement spécifique (e-mail de cycle de vie introduit, flux d'intégration repensé). Mesurer le delta à chaque période

---

## 6. Reporting d'écart budgétaire et d'incrémentalité

### Structure du rapport d'écart budgétaire

| Colonne | Description |
|---|---|
| Canal | Canal marketing (Google Ads, Meta Ads, E-mail, Contenu, SEO, etc.) |
| Dépense prévue | Budget alloué pour la période |
| Dépense réelle | Montant dépensé à ce jour |
| Écart ($) | Réel - Prévu |
| Écart (%) | (Réel - Prévu) / Prévu x 100 |
| Rythme | Sur la bonne voie, Sous-dépensé (>10 % en dessous du rythme), Surdépensé (>10 % au-dessus du rythme) |
| Résultats prévus | KPI cible (leads, chiffre d'affaires, conversions) pour le budget |
| Résultats réels | KPI réel livré |
| Écart d'efficacité | CPA/ROAS réel vs CPA/ROAS prévu |

### Analyse du rythme

- **Taux d'exécution quotidien** : Dépense réelle / jours écoulés. Comparer au taux d'exécution requis (budget restant / jours restants)
- **Projection** : Si le rythme actuel se poursuit, quelle sera la dépense totale ? Signaler si le total projeté dépasse le budget de plus de 5 %
- **Alerte de sous-dépense** : Si un canal a un rythme >15 % sous le budget à mi-période, signaler pour investigation. Causes courantes : retards d'approbation publicitaire, faible volume de recherche, saturation d'audience, campagnes en pause
- **Alerte de surdépense** : Si un canal a un rythme >10 % au-dessus du budget, signaler immédiatement. Causes courantes : agressivité de la stratégie d'enchère, concurrence d'enchère inattendue, duplication de campagne

### Reporting d'incrémentalité

**Conception de test de geo-lift** :
1. Sélectionner des régions géographiques de traitement et de contrôle avec des métriques de référence similaires (population, chiffre d'affaires, démographie)
2. Exécuter l'activité marketing dans les régions de traitement uniquement pendant 4-8 semaines
3. Mesurer le lift de conversion dans les régions de traitement vs contrôle
4. Calculer les conversions incrémentales = conversions de traitement - (conversions de contrôle x facteur d'échelle)
5. ROAS incrémental = chiffre d'affaires incrémental / dépense marketing dans les régions de traitement

**Analyse de rétention (holdout)** :
1. Retenir aléatoirement 10-20 % de l'audience d'une campagne ou d'un canal
2. Mesurer le taux de conversion dans le groupe exposé vs le groupe retenu
3. Incrémentalité = (taux de conversion exposé - taux de conversion retenu) / taux de conversion exposé
4. Exemple : Taux de conversion exposé = 5 %, Taux de conversion retenu = 3 %, Incrémentalité = 40 % (40 % des conversions étaient véritablement incrémentales)

**ROAS ajusté à l'incrémentalité** :
- ROAS standard = chiffre d'affaires total attribué / dépense
- ROAS incrémental = (chiffre d'affaires attribué x % d'incrémentalité) / dépense
- Exemple : ROAS standard = 5,0x, incrémentalité = 40 %, ROAS incrémental = 2,0x. Cela reflète le véritable retour sur dépense publicitaire

---

## 7. Automatisation de rapports programmés

### Configuration de programmation de type cron

| Type de rapport | Calendrier | Heure de livraison | Fraîcheur des données |
|---|---|---|---|
| Pulse quotidien | Chaque jour ouvré | 8h00 fuseau horaire du destinataire | Jour précédent (coupure à minuit) |
| Résumé hebdomadaire | Chaque lundi | 9h00 fuseau horaire du destinataire | 7 derniers jours (lun-dim) |
| Revue mensuelle | 3e jour ouvré du mois | 10h00 fuseau horaire du destinataire | Mois calendaire précédent |
| Revue d'activité trimestrielle | 5e jour ouvré du trimestre | 10h00 fuseau horaire du destinataire | Trimestre précédent |
| Ad hoc / déclenché | Sur événement (fin de campagne, seuil budgétaire, détection d'anomalie) | Dans l'heure suivant le déclencheur | Temps réel ou quasi temps réel |

### Configuration des canaux de livraison

| Canal | Format | Charge utile | Remarques |
|---|---|---|---|
| **E-mail** | Pièce jointe PDF + résumé HTML dans le corps | Objet : « [Marque] [Type de rapport] — [Plage de dates] ». Corps : 3-5 métriques clés en ligne. Pièce jointe : rapport PDF complet | Suivre l'ouverture de l'e-mail pour confirmer la réception |
| **Slack** | Blocs de message avec métriques en ligne + lien PDF | Canal ou DM. Utiliser le Block Kit pour les métriques formatées. Téléverser le PDF dans le fil. Épingler les rapports importants | Utiliser les webhooks Slack ou l'API pour la livraison programmatique |
| **Google Drive** | PDF téléversé dans un dossier partagé | Structure de dossier : `Reports/{Brand}/{Year}/{Report Type}/`. Nom de fichier : `{Brand}_{Report}_{DateRange}.pdf` | Notification de partage via Drive ou e-mail séparé |
| **Google Slides** | Diaporama dans Drive partagé | Diaporama modèle mis à jour avec des données fraîches. Nouveau diaporama par période. Anciens diaporamas archivés | Idéal pour les QBR et les présentations client |

### Gestion des erreurs pour l'automatisation de rapports

| Erreur | Détection | Réponse |
|---|---|---|
| **Source de données indisponible** | Timeout d'API ou réponse d'erreur pendant l'extraction de données | Réessayer 3x avec un backoff exponentiel (1min, 5min, 15min). Si tout échoue, envoyer un rapport partiel avec un espace réservé « [Données indisponibles] » et alerter le propriétaire |
| **Problème de fraîcheur des données** | Vérification d'horodatage — les données sont plus anciennes que prévu | Inclure une bannière d'avertissement : « Données au [horodatage]. Les données de [Source] peuvent être retardées. » Poursuivre avec des données obsolètes plutôt que de bloquer le rapport |
| **Échec de rendu** | La génération PDF lève une exception | Se replier sur un e-mail en texte brut avec les métriques clés. Journaliser l'erreur pour le débogage. Alerter le propriétaire |
| **Échec de livraison** | Rebond e-mail, erreur d'API Slack, erreur de permission Drive | Réessayer la livraison 2x. Si persistant, alerter le propriétaire via un canal alternatif. Journaliser l'échec dans le suivi d'exécution |
| **Anomalie dans les données** | Valeurs de métrique hors de la plage attendue (>3 écarts-types) | Inclure un encart d'anomalie dans le rapport. Ne pas supprimer les données anormales. Signaler pour revue humaine |

---

## 8. Bonnes pratiques de visualisation de données

### Guide de sélection du type de graphique

| Relation de données | Type de graphique | Quand l'utiliser |
|---|---|---|
| **Comparaison** (éléments) | Graphique en barres horizontales | Comparer 5 catégories ou plus par une seule métrique (par ex., chiffre d'affaires par canal) |
| **Comparaison** (temps) | Graphique en barres verticales ou barres groupées | Comparer des valeurs à travers des périodes de temps discrètes (chiffre d'affaires mensuel par canal) |
| **Tendance** | Graphique linéaire | Montrer un changement dans le temps continu (trafic quotidien, chiffre d'affaires hebdomadaire) |
| **Composition** | Barre empilée ou barre empilée à 100 % | Montrer des parties d'un tout dans le temps (mix canal en % du total) |
| **Composition** (statique) | Camembert/donut | Parties d'un tout à un instant unique. Utiliser uniquement avec 2-5 catégories |
| **Corrélation** | Nuage de points | Relation entre deux variables (dépense vs chiffre d'affaires par campagne) |
| **Distribution** | Histogramme ou boîte à moustaches | Étalement des valeurs (distribution de la taille des affaires, distribution du temps de conversion) |
| **Flux/Conversion** | Graphique en entonnoir | Étapes séquentielles avec abandon (lead→MQL→SQL→clôturé) |
| **Classement** | Barre horizontale (triée) | Meilleurs/moins performants (top 10 des mots-clés par trafic) |
| **Géospatial** | Carte choroplèthe | Performance par région (chiffre d'affaires par état, trafic par pays) |

### Normes d'accessibilité et de design

- **Palettes sûres pour les daltoniens** : Utiliser des palettes distinguables par les utilisateurs daltoniens. Éviter les combinaisons rouge-vert. Recommandé : bleu-orange, bleu-jaune, ou utiliser des motifs/formes en plus de la couleur
- **Ratios de contraste** : Le texte sur des arrière-plans colorés doit respecter le WCAG AA (4,5:1 pour le texte normal, 3:1 pour le grand texte)
- **Divulgation progressive** : Commencer par les métriques résumées (tuiles de score, tuiles de KPI). Puis les graphiques de tendance. Puis les tableaux détaillés. Permettre l'exploration du résumé au détail
- **Conventions d'annotation** : Marquer les événements importants sur les graphiques chronologiques (lancement de campagne, mise à jour d'algorithme, événement saisonnier). Utiliser des lignes verticales avec libellés. Limiter les annotations à 3-5 par graphique maximum
- **Libellés de données** : Inclure des libellés de données directs sur les graphiques en barres quand il y a moins de 10 barres. Éviter les libellés sur les graphiques linéaires (utiliser les infobulles ou la légende). Toujours libeller les axes avec les unités
- **Échelles cohérentes** : Lors de la comparaison de graphiques côte à côte, utiliser la même échelle d'axe Y. Quand les échelles doivent différer, indiquer clairement la différence
- **Espace blanc** : Ne pas surcharger les tableaux de bord. Un enseignement clé par visuel. Maximum 6-8 visualisations par page de tableau de bord

# Alignement ventes-marketing — Cadre & opérations SMarketing

Une référence complète pour construire l'alignement opérationnel entre les ventes et le marketing. Couvre les définitions de tunnel partagées, les accords de niveau de service, les processus de transfert de lead, les boucles de retour, la mise en œuvre du RevOps, et des modèles prêts à l'emploi.

---

## Définitions de tunnel partagées

Chaque désalignement commence par le marketing et les ventes définissant différemment les mêmes termes. Verrouiller ces définitions avant tout le reste.

### Définitions des étapes du tunnel

| Étape | Définition | Critères | Responsable |
|-------|-----------|----------|-------|
| **Visiteur** | Individu anonyme atteignant une propriété détenue | Vue de page ou session app sans information identifiante | Marketing |
| **Lead** | Individu connu ayant fourni des coordonnées | Remplissage de formulaire, inscription, lancement de chat, ou correspondance d'enrichissement de données | Marketing |
| **MQL (Marketing Qualified Lead)** | Lead démontrant une adéquation + un engagement suffisants pour justifier l'attention des ventes | Atteint le seuil de notation de lead (adéquation démographique + signaux comportementaux) | Marketing |
| **SQL (Sales Qualified Lead)** | Lead accepté par les ventes comme méritant d'être poursuivi après qualification initiale | Le commercial confirme le budget, le besoin, ou une évaluation active via le premier contact | Ventes |
| **Opportunité** | Deal actif dans le pipeline avec un calendrier et des parties prenantes définis | Appel de découverte terminé, exigences documentées, décideur identifié | Ventes |
| **Client** | Deal clôturé, contrat signé, premier paiement reçu | Contrat exécuté ou premier achat effectué | Ventes (transfert à la Réussite client) |
| **Défenseur de marque** | Client qui recommande, note, ou promeut activement | NPS 9-10, parrainage effectué, participation à une étude de cas, ou avis public | Réussite client + Marketing |

### Déclencheurs de transition

| Transition | Événement déclencheur | SLA |
|-----------|---------------|-----|
| Visiteur vers Lead | S'identifie (formulaire, inscription, chat) | Instantané (automatisé) |
| Lead vers MQL | Atteint le seuil de notation de lead | Dans l'heure ouvrée suivant la notation |
| MQL vers SQL | Le commercial accepte et prend le premier contact | Dans les 4 heures ouvrées suivant la notification MQL |
| SQL vers Opportunité | Appel de découverte terminé, adéquation confirmée | Dans les 5 jours ouvrés suivant l'acceptation SQL |
| Opportunité vers Client | Contrat signé, paiement traité | Selon les benchmarks du cycle de vente |
| Client vers Défenseur de marque | Atteint les métriques de succès + signaux d'engagement | Déclenché à 90 jours post-onboarding |

---

## Accords de niveau de service (SLA)

### SLA marketing envers les ventes

Le marketing s'engage à livrer un volume et une qualité de leads précis à chaque période.

| Métrique | Objectif | Mesure |
|--------|--------|-------------|
| **Volume de MQL** | [N] MQL par mois (calculé à rebours depuis l'objectif de chiffre d'affaires) | Nombre de MQL du CRM/MAP |
| **Score de qualité des MQL** | Score de lead moyen de [X]+ pour tous les MQL transmis | Moyenne du système de notation de lead |
| **Taux d'acceptation MQL-vers-SQL** | > 60 % des MQL acceptés par les ventes comme SQL | Conversion d'étape CRM |
| **Exhaustivité des données de lead** | 100 % ont email, nom, entreprise ; 80 % ont téléphone, poste, taille d'entreprise | Audit des champs CRM |
| **Délai de livraison** | Les MQL sont routés dans l'heure suivant la qualification | Audit d'horodatage d'automatisation |
| **Support de contenu** | Contenu d'aide à la vente mis à jour mensuellement ; nouveaux actifs pour chaque campagne | Conformité au calendrier de contenu |

### SLA ventes envers le marketing

Les ventes s'engagent à travailler chaque lead qualifié avec rapidité et cohérence, et à fournir un retour structuré.

| Métrique | Objectif | Mesure |
|--------|--------|-------------|
| **Rapidité au lead** | Premier contact dans les 4 heures ouvrées suivant la notification MQL | Horodatage d'activité CRM |
| **Cadence de suivi** | Minimum 6 touches sur 14 jours avant de disqualifier | Taux de complétion de séquence/cadence |
| **Disposition de chaque MQL** | 100 % des MQL marqués comme acceptés, disqualifiés, ou recyclés dans les 5 jours ouvrés | Audit de disposition CRM |
| **Retour de disqualification** | Code de raison requis pour chaque MQL rejeté | Complétion de liste déroulante CRM |
| **Hygiène du CRM** | Toutes les opportunités ont l'étape, le montant, la date de clôture, et la prochaine étape mis à jour chaque semaine | Score de qualité des données CRM |
| **Retour gagné/perdu** | Raison enregistrée pour chaque deal clôturé-gagné et clôturé-perdu dans les 48 heures | Champ de raison de clôture CRM |

### Calcul du SLA : de l'objectif de chiffre d'affaires à l'objectif de MQL

Travailler à rebours depuis l'objectif de chiffre d'affaires pour déterminer combien de MQL le marketing doit livrer.

```
OBJECTIF DE CHIFFRE D'AFFAIRES :   1 000 000 $ / trimestre
TAILLE DE DEAL MOYENNE :           25 000 $
DEALS NÉCESSAIRES :                40
TAUX DE SUCCÈS :                   25 %
OPPORTUNITÉS NÉCESSAIRES :         160
TAUX SQL-VERS-OPPORTUNITÉ :        50 %
SQL NÉCESSAIRES :                  320
TAUX MQL-VERS-SQL :                60 %
MQL NÉCESSAIRES :                  534 par trimestre (178/mois)
```

---

## Processus de transfert de lead

### Critères de notation MQL

| Catégorie | Signal | Points |
|----------|--------|--------|
| **Adéquation démographique** | | |
| Le poste correspond au ICP | VP, Directeur, comité de direction dans la fonction cible | +20 |
| La taille de l'entreprise correspond au ICP | 50-500 employés (ajuster à votre ICP) | +15 |
| Le secteur correspond au ICP | Secteurs verticaux cibles | +10 |
| Géographie | Marchés cibles | +5 |
| **Signaux comportementaux** | | |
| Visite de la page de tarification | A consulté la page de tarification | +15 |
| Demande de démo | A soumis un formulaire démo/essai | +25 |
| Engagement au contenu (forte intention) | A téléchargé une étude de cas, un calculateur de ROI, un guide comparatif | +10 chacun |
| Engagement au contenu (faible intention) | Visite de blog, engagement social | +2 chacun |
| Engagement email | A ouvert 3+ emails en 30 jours | +5 |
| Visites répétées | 3+ sessions en 7 jours | +10 |
| **Signaux négatifs** | | |
| Employé d'un concurrent | Travaille chez un concurrent connu | -50 |
| Étudiant / email personnel | Domaine .edu ou email gratuit (si le ciblage est entreprise) | -20 |
| Désabonné | S'est désinscrit de l'email | -30 |
| Aucun engagement en 30 jours | Décroissance du score pour inactivité | -5 par semaine |

**Seuil MQL :** 50 points (ajuster selon votre taux d'acceptation MQL-vers-SQL ; viser 60 %+ d'acceptation)

### Règles de routage

| Condition | Assignation |
|-----------|-----------|
| Grande entreprise (500+ employés) | AE entreprise par territoire |
| Marché intermédiaire (50-499 employés) | AE marché intermédiaire par tour de rôle |
| PME (< 50 employés) | Équipe SDR pour la qualification, puis AE |
| Compte nommé sur la liste cible | Propriétaire de compte assigné (quel que soit le score de lead) |
| Recommandation de partenaire | Équipe de vente partenaire |
| Client existant (signal d'upsell) | Account manager / CSM |

### Benchmarks de rapidité au lead

| Temps de réponse | Impact sur le taux de qualification |
|---------------|--------------------------|
| < 5 minutes | Référence (100 % de la conversion attendue) |
| 5-30 minutes | 80 % de la conversion attendue |
| 30-60 minutes | 60 % de la conversion attendue |
| 1-24 heures | 35 % de la conversion attendue |
| > 24 heures | 10 % de la conversion attendue |

**La donnée est sans ambiguïté :** les leads contactés dans les 5 minutes ont 9 fois plus de chances de convertir que les leads contactés après 30 minutes.

### Conditions de remise en file

| Condition | Action |
|-----------|--------|
| Les ventes ne peuvent pas joindre après 6 tentatives sur 14 jours | Retour au nurturing marketing ; réintègre la file MQL si le score remonte |
| Le lead est intéressé mais le timing est mauvais (6+ mois) | Placer en nurturing long terme ; définir un rappel CRM pour le réengagement |
| Le lead est qualifié mais la mauvaise persona | Router vers la bonne équipe/segment de vente |
| Le lead a besoin de plus d'éducation | Retour au marketing avec des recommandations de contenu précises des ventes |

---

## Boucles de retour

### Demandes de contenu des ventes au marketing

| Type de demande | Délai cible | Format |
|-------------|-------------------|--------|
| Contenu de gestion d'objection | 1 semaine | One-pager, extrait email, ou argumentaire |
| Battlecard concurrentielle | 2 semaines | Document de comparaison structuré |
| Étude de cas pour un secteur/cas d'usage précis | 3-4 semaines | Étude de cas complète avec approbation client |
| Positionnement de mise à jour produit | 1 semaine après la sortie | Document de messages + modèle d'email |
| Support événement/webinaire | 3 semaines avant l'événement | Landing page, séquence email, posts sociaux |

### Reporting en boucle fermée

Pour chaque deal clôturé (gagné ou perdu), suivre quels points de contact marketing ont influencé le parcours :

```
DEAL : [Nom de l'entreprise]
RÉSULTAT : Gagné / Perdu
TAILLE DU DEAL : [X] $
CYCLE DE VENTE : [X jours]
SOURCE DU LEAD : [Attribution premier contact]
POINTS DE CONTACT MARKETING :
  - [Date] [Point de contact 1 : par ex. Livre blanc téléchargé]
  - [Date] [Point de contact 2 : par ex. Webinaire suivi]
  - [Date] [Point de contact 3 : par ex. CTA email cliqué]
POINTS DE CONTACT VENTES :
  - [Date] [Activité 1 : par ex. Appel à froid SDR]
  - [Date] [Activité 2 : par ex. Démo AE]
RAISON DE DISQUALIFICATION (si perdu) : [Code de raison + notes]
CONCURRENT (si perdu) : [Qui ils ont choisi]
FACTEUR DÉCISIF (si gagné) : [Ce qui a fait pencher la décision]
```

### Codes de raison de disqualification

| Code | Raison | Action marketing |
|------|--------|-----------------|
| DQ-01 | Pas de budget | Nurturing avec du contenu ROI ; réengager l'année fiscale suivante |
| DQ-02 | Pas d'autorité (mauvaise persona) | Affiner les critères de ciblage et la notation de lead |
| DQ-03 | Pas de besoin (le problème n'existe pas) | Revoir le ciblage de contenu ; resserrer la définition de l'ICP |
| DQ-04 | Mauvais timing (> 6 mois) | Séquence de nurturing long terme |
| DQ-05 | Concurrent choisi | Alimenter la veille concurrentielle ; revoir le positionnement |
| DQ-06 | Mauvaises données (mauvaises coordonnées, spam) | Auditer les sources de lead ; resserrer la validation de formulaire |
| DQ-07 | Trop petit / pas ICP | Ajuster la notation ; envisager un parcours en libre-service |

---

## Tableau de bord de métriques partagées

### Métriques d'alignement principales

| Métrique | Formule | Objectif | Responsable |
|--------|---------|--------|-------|
| **Pipeline sourcé par le marketing** | Valeur totale du pipeline issue des leads générés par le marketing | 40-60 % du pipeline total | Conjoint |
| **Chiffre d'affaires influencé par le marketing** | Chiffre d'affaires clôturé où le marketing a touché le parcours | 60-80 % du chiffre d'affaires total | Conjoint |
| **Taux lead-vers-client** | Clients / Total des leads | Dépend du secteur (SaaS : 2-5 %) | Conjoint |
| **Taux d'acceptation MQL-vers-SQL** | SQL / MQL | > 60 % | Indicateur de qualité marketing |
| **Taux SQL-vers-opportunité** | Opportunités / SQL | > 50 % | Indicateur de qualité des ventes |
| **Rapidité au lead** | Temps médian entre le MQL et le premier contact commercial | < 1 heure | Ventes |
| **Durée du cycle de vente** | Jours médians du SQL à la clôture | Benchmark par rapport aux trimestres précédents | Conjoint |
| **Taille de deal moyenne** | Chiffre d'affaires / Deals | Benchmark par rapport aux trimestres précédents | Conjoint |
| **CAC par canal** | Coût d'acquisition total / Clients par canal | En baisse trimestre après trimestre | Conjoint |

---

## Cadence de réunions

### Quotidien : standup pipeline (15 minutes)

- **Qui :** responsable de l'équipe SDR + responsable de campagne marketing
- **Ordre du jour :** MQL livrés hier, priorités de suivi du jour, tout signal de qualité de lead
- **Résultat :** ajustements de routage en temps réel, retour immédiat sur la qualité des campagnes

### Hebdomadaire : revue de performance des campagnes (30 minutes)

- **Qui :** ops marketing + ops ventes + 1 représentant AE
- **Ordre du jour :** volume et qualité des MQL cette semaine, performance des campagnes par source, taux de disposition des leads, demandes de contenu
- **Résultat :** tableau de bord hebdomadaire, mises à jour de la file de demandes de contenu

### Mensuel : revue de santé du tunnel (60 minutes)

- **Qui :** VP Marketing + VP Ventes + RevOps
- **Ordre du jour :** taux de conversion full-funnel, conformité SLA, ratio de couverture du pipeline, analyse d'attribution, débriefing de veille concurrentielle
- **Résultat :** rapport d'alignement mensuel, ajustements SLA, décisions d'allocation de ressources

### Trimestriel : planification stratégique (demi-journée)

- **Qui :** CMO + CRO + RevOps + responsables d'équipe
- **Ordre du jour :** revue de l'objectif de chiffre d'affaires, affinement de l'ICP, recalibrage du modèle de notation, planification de campagne, évaluation de la stack technique, renégociation du SLA
- **Résultat :** SLA mis à jour, calendrier de campagne du prochain trimestre, documentation ICP, changements du modèle de notation

---

## Schémas de désalignement communs

### Cadre diagnostique

| Symptôme | Le marketing dit | Les ventes disent | Cause racine | Correction |
|---------|---------------|------------|-----------|-----|
| Faible conversion | « Nous générons assez de leads » | « Les leads sont mauvais » | Critères MQL trop laxistes ; notation de lead non calibrée | Atelier de notation conjoint ; recalibrer avec les données de deals clôturés |
| Manque de pipeline | « Nous atteignons les objectifs de MQL » | « Pas assez de pipeline » | Les MQL ne convertissent pas en opportunités | Resserrer la notation démographique ; ajouter des signaux d'intention |
| Cycles de vente longs | « Les leads sont bien nurturés » | « Les leads ne sont pas prêts à acheter » | Le nurturing de contenu ne répond pas aux objections d'achat | Cartographier le contenu aux étapes du parcours acheteur ; inclure la contribution des ventes sur les sujets |
| CAC élevé | « Nous avons besoin de plus de budget » | « Nous avons besoin de meilleurs leads, pas plus » | Le mix de canaux inclut des sources de faible qualité | Analyser le CAC par canal ; couper les sous-performants ; réinvestir dans les canaux éprouvés |
| Chiffre d'affaires manqué malgré le volume | « Nous avons livré 120 % de l'objectif MQL » | « Le taux de succès a chuté de 15 % » | Arbitrage quantité sur qualité | Faire passer l'objectif MQL à une métrique pondérée par la qualité ; mettre en œuvre le suivi MQL-vers-chiffre d'affaires |

---

## Revenue Operations (RevOps)

### Qu'est-ce que le RevOps

Le RevOps est une fonction centralisée qui possède les processus, la technologie, les données, et le reporting à travers le marketing, les ventes, et la réussite client. Il élimine les silos opérationnels qui causent le désalignement.

### Responsabilités clés du RevOps

| Domaine | Responsabilités |
|--------|-----------------|
| **Processus** | Définitions des étapes du tunnel, règles de routage de lead, processus de transfert, gestion des SLA |
| **Technologie** | CRM, MAP, engagement commercial, attribution, outils BI — gouvernance de la stack unifiée |
| **Données** | Source de vérité unique pour le pipeline, la conversion, et les métriques de chiffre d'affaires ; hygiène des données |
| **Reporting** | Tableaux de bord partagés, analytics de tunnel, attribution, prévision |
| **Habilitation** | Formation aux processus interfonctionnels, documentation de playbook, onboarding des nouvelles recrues |

### Phases de mise en œuvre du RevOps

| Phase | Calendrier | Focus |
|-------|----------|-------|
| **Fondation** | Mois 1-2 | Auditer l'état actuel ; documenter les processus existants ; identifier les écarts ; définir les étapes du tunnel |
| **Unification** | Mois 3-4 | Intégrer CRM + MAP ; construire des tableaux de bord partagés ; mettre en œuvre la notation de lead ; définir les SLA |
| **Optimisation** | Mois 5-6 | Lancer le suivi des SLA ; mettre en œuvre le reporting en boucle fermée ; établir la cadence de réunions |
| **Maturité** | Continu | Notation prédictive ; modélisation d'attribution ; prévision de chiffre d'affaires ; amélioration continue des processus |

---

## Modèles

### Structure du document SLA

```
ACCORD DE NIVEAU DE SERVICE VENTES-MARKETING
Date d'entrée en vigueur : [Date]
Cadence de revue : Trimestrielle

OBJECTIFS DE CHIFFRE D'AFFAIRES :
- Objectif de chiffre d'affaires trimestriel : [X] $
- Couverture de pipeline requise : [X]x (par ex. 3x)

ENGAGEMENTS MARKETING :
- Volume de MQL : [N] par mois
- Qualité des MQL : objectif de taux d'acceptation de [X] %
- Exhaustivité des données : [Standards]
- Vitesse de routage : [Délai]
- Livraison de contenu : [Cadence et délais de réponse]

ENGAGEMENTS VENTES :
- Rapidité au lead : [Délai]
- Cadence de suivi : [Touches minimum]
- Délai de disposition : [Délai]
- Hygiène du CRM : [Standards]
- Livraison de retour : [Cadence]

PROCESSUS D'ESCALADE :
- Violation de SLA identifiée par : [RevOps / alerte automatisée]
- Première escalade : [Chef d'équipe, dans les 24 heures]
- Deuxième escalade : [Niveau VP, dans les 48 heures]

REVUE ET AMENDEMENT :
- Revue mensuelle de conformité SLA en réunion de santé du tunnel
- Renégociation trimestrielle en session de planification stratégique
- Chaque partie peut demander une revue d'urgence avec un préavis de 48 heures

SIGNATURES :
VP Marketing : _____________ Date : _______
VP Ventes : _____________ Date : _______
```

### Ordre du jour de revue de pipeline

```
REVUE HEBDOMADAIRE DE PIPELINE — [Date]

1. MÉTRIQUES DE TUNNEL (5 min)
   - MQL livrés cette semaine : [N] (objectif : [N])
   - Taux d'acceptation MQL : [X%] (objectif : 60 %+)
   - Rapidité au lead médiane : [X heures] (objectif : < 4 heures)

2. INSPECTION DES DEALS (15 min)
   - Deals clôturant ce mois : [Revoir les 10 principaux par valeur]
   - Deals bloqués (aucune activité depuis 14+ jours) : [Revoir et assigner des actions]
   - Deals à risque : [Identifier et discuter]

3. IMPACT DES CAMPAGNES (5 min)
   - Campagne la plus performante cette semaine : [Campagne] — [N] MQL à [X%] d'acceptation
   - Campagne sous-performante : [Campagne] — [Problème et action recommandée]

4. BOUCLE DE RETOUR (5 min)
   - Demandes de contenu des ventes : [Liste]
   - Signaux de qualité de lead : [Problèmes précis]
   - Veille concurrentielle : [Ce que les ventes entendent]

ÉLÉMENTS D'ACTION :
- [Responsable] [Action] [Date d'échéance]
```

### Rapport mensuel ventes-marketing

```
RAPPORT D'ALIGNEMENT MENSUEL — [Mois Année]

SYNTHÈSE EXÉCUTIVE :
[2-3 phrases sur la santé globale de l'alignement]

CONFORMITÉ SLA MARKETING :
| Métrique              | Objectif | Réel  | Statut |
|---------------------|---------|---------|--------|
| Volume de MQL          | [N]     | [N]     | [Atteint/Manqué] |
| Taux d'acceptation MQL | 60%     | [X%]    | [Atteint/Manqué] |
| Exhaustivité des données | 80%   | [X%]    | [Atteint/Manqué] |
| Livraison de contenu    | À temps | [X/Y]   | [Atteint/Manqué] |

CONFORMITÉ SLA VENTES :
| Métrique              | Objectif   | Réel     | Statut |
|---------------------|------------|------------|--------|
| Rapidité au lead       | < 4 heures | [X heures] | [Atteint/Manqué] |
| Cadence de suivi       | 6 touches  | [X moy.]   | [Atteint/Manqué] |
| Taux de disposition    | 100% en 5j | [X%]       | [Atteint/Manqué] |
| Hygiène CRM            | Hebdo      | [X% conforme] | [Atteint/Manqué] |

PERFORMANCE DU TUNNEL :
| Étape               | Volume | Taux de conversion | vs mois précédent |
|---------------------|--------|-----------------|-----------------|
| Leads               | [N]    | —               | [+/- X%]        |
| MQL                 | [N]    | [X%]            | [+/- X%]        |
| SQL                 | [N]    | [X%]            | [+/- X%]        |
| Opportunités        | [N]    | [X%]            | [+/- X%]        |
| Clôturé-Gagné       | [N]    | [X%]            | [+/- X%]        |

ATTRIBUTION DE CHIFFRE D'AFFAIRES :
- Sourcé par le marketing : [X] $ ([X%] du total)
- Influencé par le marketing : [X] $ ([X%] du total)
- Sourcé par les ventes : [X] $ ([X%] du total)

INSIGHTS CLÉS :
1. [Insight avec données à l'appui]
2. [Insight avec données à l'appui]
3. [Insight avec données à l'appui]

PRIORITÉS DU MOIS PROCHAIN :
1. [Priorité + responsable]
2. [Priorité + responsable]
3. [Priorité + responsable]
```

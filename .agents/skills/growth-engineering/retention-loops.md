# Boucles de rétention — Engagement & prévention du churn

> La rétention est le fondement d'une croissance durable. Aucune stratégie
> d'acquisition ne survit à un seau percé. Ce guide couvre les cadres pour construire
> des produits qui créent l'habitude, prédire le churn, et réengager les
> utilisateurs perdus.

---

## Cadre du Hook Model

Le Hook Model de Nir Eyal explique comment les produits créent un usage habituel à
travers une boucle en quatre étapes.

```
Trigger → Action → Variable Reward → Investment
   ↑                                      |
   └──────────────────────────────────────┘
```

### Étape 1 : déclencheur (Trigger)

Les déclencheurs incitent l'utilisateur à agir. Ils se présentent sous deux formes.

| Type de déclencheur | Description | Exemples |
|---|---|---|
| **Déclencheurs externes** | Signaux environnementaux qui incitent à l'action | Notification push, e-mail, publicité, bouton CTA, mention d'un collègue |
| **Déclencheurs internes** | États émotionnels ou routines qui incitent à l'action | Ennui (scroller Instagram), anxiété (vérifier Slack), curiosité (ouvrir Reddit) |

**Objectif :** Commencer avec des déclencheurs externes, puis associer le produit à
des déclencheurs internes via des expériences positives répétées.

### Étape 2 : action

Le comportement le plus simple réalisé en anticipation d'une récompense. Suit le
modèle comportemental de BJ Fogg : B = MAT (Behavior = Motivation + Ability +
Trigger).

| Principe de conception | Mise en œuvre |
|---|---|
| Réduire la friction | Moins de clics, chargement plus rapide, UI plus simple |
| Augmenter la motivation | Proposition de valeur claire au point d'action |
| Assurer la visibilité du déclencheur | La notification arrive quand l'utilisateur peut agir dessus |

### Étape 3 : récompense variable

La récompense doit être variable (imprévisible) pour maintenir l'engagement dans le
temps. Les récompenses fixes perdent leur pouvoir.

| Type de récompense | Description | Exemple de produit |
|---|---|---|
| Récompenses de la tribu | Validation sociale, acceptation, appartenance | Likes, commentaires, nombres d'abonnés |
| Récompenses de la chasse | Ressources, informations, offres | Contenu du fil d'actualité, résultats de recherche, alertes de bonnes affaires |
| Récompenses du soi | Maîtrise, compétence, accomplissement | Passage de niveau, badges de compétence, compteurs de série |

### Étape 4 : investissement

L'utilisateur investit quelque chose dans le produit qui le rend plus précieux dans
le temps et augmente les coûts de changement.

| Type d'investissement | Exemple | Effet sur la rétention |
|---|---|---|
| Données | Préférences sauvegardées, historique, fichiers | Plus de personnalisation, plus difficile de partir |
| Contenu | Posts, documents, projets | Valeur accumulée stockée dans le produit |
| Réputation | Avis, notes, nombre d'abonnés | Capital social qui ne se transfère pas |
| Compétence | Workflows appris, raccourcis clavier | Avantage d'efficacité dans le produit actuel |
| Connexions sociales | Membres d'équipe, contacts, abonnés | Réseau enfermé dans la plateforme |

---

## Modèles de prédiction du churn

### Indicateurs avancés de churn

Identifier les utilisateurs à risque avant qu'ils n'annulent. Ces signaux
apparaissent typiquement 2-4 semaines avant le churn.

| Catégorie de signal | Indicateurs spécifiques | Niveau de risque |
|---|---|---|
| **Baisse d'usage** | Fréquence de connexion en baisse de 40%+, durée de session en diminution, moins d'actions clés | Élevé |
| **Désengagement de fonctionnalité** | Arrête d'utiliser les fonctionnalités avancées, revient à un usage basique uniquement | Moyen-élevé |
| **Signaux de support** | Plusieurs tickets non résolus, scores CSAT négatifs, escalade de plainte | Élevé |
| **Signaux de facturation** | Paiement échoué, demande de rétrogradation, visite de la page d'annulation | Critique |
| **Signaux d'équipe** | Le compte admin devient inactif, le nombre de sièges diminue, un utilisateur clé part | Élevé |
| **Signaux d'engagement** | Arrête d'ouvrir les e-mails, ignore les messages dans l'app, se désabonne des mises à jour | Moyen |
| **Signaux concurrentiels** | Visite les pages de tarification concurrentes (si suivi), mentionne des concurrents en support | Moyen-élevé |

### Modèle de notation du risque de churn

| Facteur | Poids | Fourchette de score | Méthode de notation |
|---|---|---|---|
| Tendance de fréquence de connexion (14 jours) | 25% | 0-100 | 100 si stable/en croissance, 0 si déclin de plus de 60% |
| Usage des fonctionnalités clés (14 jours) | 20% | 0-100 | Basé sur les actions vs moyenne historique |
| Sentiment des tickets de support | 15% | 0-100 | Analyse de sentiment NLP sur les tickets récents |
| Jours depuis la dernière connexion | 15% | 0-100 | 100 si <3 jours, 50 si 3-7, 25 si 7-14, 0 si >14 |
| Statut de contrat/facturation | 10% | 0-100 | 100 si sain, 0 si paiement échoué ou visite de la page d'annulation |
| Complétion de l'onboarding | 10% | 0-100 | Pourcentage des étapes d'onboarding complétées |
| Score NPS / CSAT | 5% | 0-100 | Dernière réponse d'enquête normalisée sur 0-100 |

**Paliers de risque :**
- 80-100 : Sain — nurturing et upsell
- 60-79 : À surveiller — point de contact proactif
- 40-59 : À risque — intervention requise
- 0-39 : Critique — outreach personnel immédiat

---

## Séquences de winback

### Flux e-mail de winback

| E-mail | Timing après churn | Approche d'objet | Stratégie de contenu |
|---|---|---|---|
| 1 | Jour 1 | « Nous sommes désolés de vous voir partir » | Demander du feedback, offrir de l'aide pour résoudre les problèmes |
| 2 | Jour 7 | « Voici ce que vous manquez » | Mettre en avant les nouvelles fonctionnalités ou améliorations depuis leur départ |
| 3 | Jour 14 | « Nous avons apporté des changements basés sur votre feedback » | Montrer les améliorations spécifiques liées à leur raison de churn |
| 4 | Jour 30 | « Revenez avec [X% de réduction / mois gratuit] » | Incitation à durée limitée pour revenir |
| 5 | Jour 60 | « Beaucoup a changé chez [Produit] » | Récapitulatif des mises à jour majeures, pas de vente forcée |
| 6 | Jour 90 | « Dernière chance : offre spéciale pour les clients de retour » | Incitation finale, puis passer au nurturing trimestriel |

### Tactiques de winback par raison de churn

| Raison de churn | Approche de winback | Offre |
|---|---|---|
| Prix / budget | Option de rétrogradation, réduction annuelle, suspension d'abonnement | 20-30% de réduction ou mois gratuit |
| Fonctionnalité manquante | Notifier quand la fonctionnalité sort, inviter à la bêta | Accès anticipé à la fonctionnalité demandée |
| Mauvaise expérience | Excuses personnelles de la direction, support dédié | Onboarding sur-mesure, CSM dédié |
| A basculé vers un concurrent | Contenu de comparaison concurrentielle, assistance à la migration | Service de migration gratuit, essai prolongé |
| N'en a plus besoin | Rester en contact avec du contenu de valeur, réengagement saisonnier | Palier gratuit pour maintenir la relation |
| Mauvais onboarding | Proposer une session de mise en place guidée, flux d'onboarding amélioré | Appel d'onboarding individuel avec un expert produit |

---

## Méthodologie d'analyse de cohorte

### Mettre en place l'analyse de cohorte

```
Cohort Definition: Group users by sign-up week or month
Metric: Retention rate (% of cohort still active in period N)
Periods: Week 0, Week 1, Week 2, ... Week 12 (or Month 0-12)
```

### Modèle de tableau de rétention de cohorte

| Cohorte | Semaine 0 | Semaine 1 | Semaine 2 | Semaine 4 | Semaine 8 | Semaine 12 |
|---|---|---|---|---|---|---|
| Jan S1 (500 utilisateurs) | 100% | 45% | 32% | 22% | 18% | 15% |
| Jan S2 (600 utilisateurs) | 100% | 48% | 35% | 25% | 20% | 17% |
| Jan S3 (550 utilisateurs) | 100% | 52% | 38% | 28% | 23% | 20% |

### Ce qu'il faut chercher

| Motif | Interprétation | Action |
|---|---|---|
| La courbe de rétention s'aplatit | Les utilisateurs qui survivent aux premières semaines ont tendance à rester | Se concentrer sur l'amélioration de la rétention précoce (Semaine 1-2) |
| Les cohortes récentes retiennent mieux | Les améliorations produit ou d'onboarding fonctionnent | Continuer à itérer sur ce qui a changé |
| Les cohortes récentes retiennent moins bien | Quelque chose s'est cassé — régression, problème de qualité, mauvaise audience | Investiguer les changements récents, revoir les sources d'acquisition |
| Chute nette à une semaine spécifique | Les utilisateurs heurtent un mur à ce point de leur parcours | Cartographier le parcours utilisateur jusqu'à cette semaine, identifier la friction |
| Un segment retient beaucoup mieux | Vous avez trouvé votre profil client idéal | Doubler la mise sur l'acquisition de ce segment |

---

## Conception de boucle d'habitude

### Checklist d'usage actif quotidien

Concevoir votre produit pour soutenir des habitudes quotidiennes.

- [ ] Il existe un cas d'usage quotidien clair (pas juste un outil hebdomadaire/mensuel)
- [ ] Les utilisateurs reçoivent un déclencheur significatif chaque jour (notification, digest e-mail, tableau de bord)
- [ ] La première action à l'ouverture du produit prend moins de 5 secondes
- [ ] Le contenu ou les données variables se rafraîchissent quotidiennement (nouveaux insights, fils mis à jour, tâches fraîches)
- [ ] Compléter l'action clé délivre un feedback visible immédiat
- [ ] Les utilisateurs investissent quelque chose à chaque session (données, contenu, préférences)
- [ ] Le suivi de série ou de constance est visible (optionnel mais puissant)
- [ ] Les éléments sociaux créent de la responsabilisation (visibilité d'équipe, objectifs partagés)

### Chronologie de formation d'habitude

| Phase | Durée | Comportement de l'utilisateur | Rôle du produit |
|---|---|---|---|
| Apprentissage | Jours 1-7 | Explore, évalue, décide | Accompagner à travers l'activation, démontrer la valeur |
| Pratique | Jours 8-21 | Utilise avec un effort conscient, construit une routine | Renforcer les déclencheurs, célébrer la progression |
| Habituation | Jours 22-60 | L'usage devient automatique, fait partie du workflow | Réduire davantage la friction, introduire des fonctionnalités avancées |
| Maîtrise | Jours 60+ | Power user, ambassadeur, investi | Opportunités d'expansion, invites de parrainage, communauté |

---

## Déclencheurs de réengagement

### Types de déclencheurs et timing

| Déclencheur | Canal | Timing | Contenu |
|---|---|---|---|
| Relance d'inactivité | E-mail | 3 jours sans connexion | « Votre [projet/tâche/donnée] vous attend » |
| Déclencheur social | Push / E-mail | Quand un coéquipier prend une action | « Alex a commenté votre document » |
| Déclencheur de valeur | E-mail | Hebdomadaire | Digest personnalisé d'insights, métriques, ou mises à jour |
| Déclencheur d'accomplissement | Dans l'app + E-mail | Lors d'un jalon | « Vous êtes à 80% de votre objectif — continuez » |
| Déclencheur de contenu | E-mail | Quand un nouveau contenu pertinent est publié | « Nouveau modèle dans votre catégorie » |
| Déclencheur de fonctionnalité | Dans l'app + E-mail | Quand une nouvelle fonctionnalité pertinente sort | « Nouveau : la fonctionnalité que vous avez demandée est en direct » |
| Déclencheur externe | Push | Basé sur calendrier ou événement | « Votre rapport est prêt pour la réunion de lundi » |
| Déclencheur FOMO | E-mail / Push | Quand les pairs sont actifs | « Votre équipe a complété 15 tâches cette semaine » |

### Matrice de priorité de réengagement

| Segment utilisateur | Jours d'inactivité | Priorité | Approche |
|---|---|---|---|
| Haute valeur, récemment perdu | 3-7 jours | Critique | Outreach personnel, message dans l'app, e-mail |
| Haute valeur, modérément perdu | 7-30 jours | Élevée | Séquence e-mail de winback, appel téléphonique du CSM |
| Faible valeur, récemment perdu | 3-7 jours | Moyenne | E-mail de relance automatisé, notification push |
| Faible valeur, modérément perdu | 7-30 jours | Faible | Séquence e-mail automatisée, pas d'effort manuel |
| Tout segment, perdu à long terme | 30+ jours | À évaluer | Analyse coût-bénéfice — peut ne pas valoir la peine d'être poursuivi |

---

## Benchmarks de rétention par modèle économique

### Rétention mensuelle (% actifs après N mois)

| Modèle économique | Mois 1 | Mois 3 | Mois 6 | Mois 12 | Notes |
|---|---|---|---|---|---|
| SaaS B2B (PME) | 70-80% | 55-65% | 45-55% | 35-45% | Plus élevé avec des contrats annuels |
| SaaS B2B (Entreprise) | 90-95% | 85-92% | 80-88% | 75-85% | Les contrats pluriannuels stabilisent |
| Abonnement grand public | 60-70% | 40-50% | 30-40% | 20-30% | Très variable selon la catégorie |
| Application mobile (Social) | 25-35% | 12-18% | 8-12% | 5-8% | Rétention Jour 1 : 25-40% |
| Application mobile (Utilitaire) | 30-40% | 18-25% | 12-18% | 8-12% | Plus élevé si un cas d'usage quotidien existe |
| E-commerce (achat répété) | 25-35% | 15-22% | 10-15% | 8-12% | Mesuré par achat répété |
| Marketplace | 30-40% | 20-30% | 15-22% | 10-18% | Le côté offre retient mieux que le côté demande |

### Benchmarks de Net Revenue Retention (SaaS B2B)

| Fourchette NRR | Évaluation | Exemples |
|---|---|---|
| >130% | Élite — l'expansion dépasse significativement le churn | Snowflake, Twilio, Datadog |
| 110-130% | Solide — mécanique d'expansion saine | HubSpot, Slack, Zoom |
| 100-110% | Acceptable — l'expansion compense à peu près le churn | La plupart des SaaS B2B matures |
| 90-100% | Préoccupant — légère contraction nette | Un problème de churn émerge |
| <90% | Critique — le revenu se contracte à partir des clients existants | Intervention de rétention urgente nécessaire |

---

## Notation de la santé client

### Composantes du score de santé

| Composante | Poids | Source de données | Notation |
|---|---|---|---|
| Profondeur d'usage du produit | 25% | Analytics produit | Fonctionnalités utilisées / Total des fonctionnalités disponibles |
| Fréquence d'usage | 20% | Analytics produit | Connexions réelles / Connexions attendues pour le plan |
| Santé du support | 15% | Help desk | Inverse des tickets ouverts + sentiment |
| Profondeur de relation | 15% | CRM | Nombre de parties prenantes engagées, sponsor exécutif |
| Tendance de valeur de contrat | 10% | Système de facturation | En croissance, stable, ou en déclin |
| Progression de l'onboarding | 10% | Suivi d'onboarding | % des jalons de mise en œuvre complétés |
| Sentiment d'enquête | 5% | Outil NPS / CSAT | Dernier score d'enquête |

### Actions par score de santé

| Score de santé | Libellé | Couleur | Action |
|---|---|---|---|
| 85-100 | Florissant | Vert | Upsell/expansion, demander un parrainage, candidat pour étude de cas |
| 70-84 | Sain | Vert clair | Points de contact standards, incitations d'adoption de fonctionnalité |
| 50-69 | Neutre | Jaune | Outreach proactif, appel de revue d'usage, offre de formation |
| 30-49 | À risque | Orange | Escalader au CSM, point de contact exécutif, créer un plan de réussite |
| 0-29 | Critique | Rouge | Intervention immédiate, appel exécutif-à-exécutif, offre de sauvegarde |

### Cadence de revue du score de santé

- [ ] Alertes automatisées pour tout compte tombant sous 50 (immédiat)
- [ ] Revue hebdomadaire de tous les comptes en Jaune ou en dessous par l'équipe CS
- [ ] Analyse de tendance du score de santé mensuelle sur toute la base client
- [ ] Analyse de corrélation trimestrielle : score de santé vs résultats de churn réels (calibrer le modèle)
- [ ] Raffinement du modèle semestriel basé sur la précision de prédiction

---

*La rétention n'est pas une fonctionnalité. C'est le résultat cumulé de la livraison
constante de valeur, de la construction d'habitudes, et de la détection des
problèmes avant que les utilisateurs n'abandonnent. Chaque point de pourcentage de
rétention amélioré compose en une économie unitaire dramatiquement meilleure.*

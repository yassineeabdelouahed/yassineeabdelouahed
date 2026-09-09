# Guide des opérations d'agence — Gestion multi-clients

Cette référence définit les procédures opérationnelles standard pour les agences gérant plusieurs marques clientes via le plugin Digital Marketing Pro. Elle couvre l'intégration, le suivi de la santé du portefeuille, les cadres de SOP, les rythmes de reporting, l'intelligence inter-clients, l'isolation des identifiants, et les règles de marque blanche.

---

## 1. Flux d'intégration client

Suivez ces étapes séquentiellement lors de l'intégration d'un nouveau client. Temps d'intégration total estimé : 45 à 90 minutes selon la complexité d'intégration.

| Étape | Action | Commande / Outil | Temps est. | Remarques |
|---|---|---|---|---|
| 1 | **Créer le profil de marque** | `/digital-marketing-pro:brand-setup` | 10-15 min | Parcourir l'identité, la voix, les audiences, les concurrents, les objectifs. Produit `profile.json` dans `~/.claude-marketing/brands/{slug}/`. |
| 2 | **Créer le profil d'identifiants** | `/digital-marketing-pro:credential-switch` | 5-10 min | Configurer les clés API et jetons de plateforme. Stocké dans `~/.claude-marketing/credentials/{slug}.json`. Ne jamais partager les identifiants entre marques. |
| 3 | **Connecter le CRM** | `/digital-marketing-pro:crm-sync` | 5-10 min | Lier le CRM (HubSpot, Salesforce, Pipedrive). Valider la connexion avec une requête de test. Importer les nombres de contacts initiaux. |
| 4 | **Valider les connexions MCP** | Vérification manuelle | 5-10 min | Tester chaque serveur MCP configuré (analytics, publicités, e-mail, search console). Confirmer les flux de données. Journaliser toute connexion échouée pour suivi. |
| 5 | **Assigner les SOP depuis la bibliothèque** | `/digital-marketing-pro:sop-library` | 5 min | Sélectionner les modèles de SOP applicables selon le forfait de service du client (contenu, médias payants, reporting, CRM, SEO). Personnaliser les rythmes. |
| 6 | **Assigner les membres de l'équipe** | `/digital-marketing-pro:team-assign` | 5 min | Cartographier les rôles : chargé de compte, stratège, créateur de contenu, acheteur média, analyste. Définir les préférences de notification. |
| 7 | **Configurer le rythme de reporting** | Configuration manuelle | 5 min | Configurer : pulse hebdomadaire (auto), revue mensuelle (semi-auto), QBR (manuel). Définir les canaux de livraison (Slack, e-mail, Google Slides). |
| 8 | **Exécuter le premier audit de campagne** | `/digital-marketing-pro:campaign-audit` | 15-25 min | Inventaire et tri de l'état actuel inter-canaux (payant, organique, e-mail, SEO, AEO, CRM, analytics web, posture de conformité). Produit une notation sain / gain rapide / lacune stratégique / 🔴 signal d'alerte par élément plus un résumé exécutif, sauvegardé dans `~/Documents/DigitalMarketingPro/{brand}/audits/`. Exécuter ceci AVANT de proposer quoi que ce soit de nouveau pour la marque. |
| 9 | **Créer un instantané de métriques de référence** | `/digital-marketing-pro:performance-check` | 5-10 min | Extraire les métriques actuelles de toutes les plateformes connectées. Stocker comme référence pour les comparaisons futures. Enregistrer dans `performance/baseline-{date}.json`. |

### Checklist de vérification post-intégration

- [ ] Profil de marque complet (tous les champs requis renseignés)
- [ ] Identifiants stockés et validés (aucun secret exposé)
- [ ] Au moins 1 connexion MCP active et retournant des données
- [ ] SOP assignées et rythmes configurés
- [ ] Rôles d'équipe cartographiés
- [ ] Instantané de référence sauvegardé
- [ ] Premier audit de campagne documenté
- [ ] Client ajouté au tableau de bord de portefeuille

---

## 2. Gestion de portefeuille

### Score de santé client (0-100)

Le score de santé client fournit un résumé en un seul chiffre de la santé du compte. Calculer chaque semaine pour chaque client actif.

| Dimension | Pondération | Plage de score | Comment calculer |
|---|---|---|---|
| **Activité de campagne** | 25 % | 0-100 | Nombre de campagnes actives vs plan (100 = toutes les campagnes prévues sont en cours). Déduire 20 points si aucune campagne lancée dans les 14 derniers jours. Déduire 10 points si le pipeline a moins de 2 campagnes à venir. |
| **Rythme budgétaire** | 25 % | 0-100 | Dépense vs plan (100 = à moins de 5 % de la dépense prévue). Tendance ROAS : +10 si en amélioration, -10 si en déclin sur 30 jours. Tendance CPA : +10 si en amélioration, -10 si en déclin. Plafonner les déductions à 0. |
| **Atteinte des KPI** | 25 % | 0-100 | KPI principal : score = (réel / objectif) x 100, plafonné à 100. Déduire 10 par KPI secondaire sous 80 % de l'objectif. Direction de tendance : +5 si en amélioration, -5 si en déclin. |
| **Pipeline de contenu** | 15 % | 0-100 | Couverture du calendrier de contenu : (éléments programmés / éléments planifiés) x 100. Déduire 25 si aucun contenu programmé pour les 7 prochains jours. Déduire 10 si la couverture du calendrier est <50 % pour les 30 prochains jours. |
| **Santé de l'engagement** | 10 % | 0-100 | Temps de réponse moyen à l'engagement social (100 = <2h, 75 = <6h, 50 = <24h, 25 = >24h). Taux d'engagement social vs moyenne mobile sur 30 jours : +10 si au-dessus, -10 si en dessous. |

### Système de feu tricolore

| Statut | Plage de score | Action requise |
|---|---|---|
| **Vert** | 80-100 | Sain. Poursuivre la stratégie actuelle. Noter toute dimension sous 70 pour une optimisation proactive. |
| **Ambre** | 60-79 | Attention nécessaire. Identifier la dimension au score le plus bas. Créer un plan d'action sous 48 heures. Planifier un point avec le chargé de compte. |
| **Rouge** | En dessous de 60 | Intervention urgente. Identifier les causes profondes à travers toutes les dimensions. Escalader vers le directeur de compte. Créer un plan de redressement sous 24 heures. Planifier un point client d'urgence si des facteurs externes sont impliqués. |

### Vue du tableau de bord de portefeuille

Le tableau de bord de portefeuille montre tous les clients en un coup d'œil :

| Colonne | Données |
|---|---|
| Nom du client | Nom de marque + slug |
| Score de santé | Score composite (0-100) avec indicateur de feu tricolore |
| Dimension la plus faible | Nom de la dimension la plus faible + score |
| Dépense mensuelle | Dépense publicitaire totale sur toutes les plateformes |
| ROAS | Retour sur dépense publicitaire mixte |
| Campagnes actives | Nombre de campagnes actuellement en cours |
| Prochain livrable | Prochain rapport ou lancement de campagne programmé |
| Chargé de compte | Membre de l'équipe assigné |

Recommandé : Exécuter le scan de portefeuille chaque lundi à 8h. Signaler automatiquement tout client passé du Vert à l'Ambre ou de l'Ambre au Rouge depuis le dernier scan.

---

## 3. Cadre de SOP

Les SOP définissent des processus reproductibles pour chaque catégorie de service. Chaque SOP comporte : des étapes numérotées, un rôle responsable, une checklist qualité, des exigences d'approbation, et un temps estimé.

### Catégories de SOP

| Catégorie | SOP | Rythme typique | Rôle responsable |
|---|---|---|---|
| **Production de contenu** | Rédaction de blog, contenu réseaux sociaux, newsletters e-mail, scripts vidéo, études de cas, livres blancs | Par élément (varie selon le calendrier de contenu) | Créateur de contenu |
| **Médias payants** | Configuration de campagne, cycles d'optimisation hebdomadaires, revues budgétaires mensuelles, renouvellement créatif, planification de test A/B | Configuration : par campagne. Optimisation : hebdomadaire. Budget : mensuel. Créatif : toutes les 2-4 semaines. | Acheteur média |
| **Reporting** | Pulse hebdomadaire, revue de performance mensuelle, préparation QBR, planification annuelle | Par rythme (voir Section 4) | Analyste / Chargé de compte |
| **Opérations CRM** | Import de leads, hygiène du pipeline, actualisation de la segmentation, nettoyage de données, audit de consentement | Import de leads : au besoin. Hygiène : hebdomadaire. Segmentation : mensuel. Audit de consentement : trimestriel. | Spécialiste CRM |
| **SEO** | Surveillance de mots-clés, optimisation de contenu, audits techniques, prospection de netlinking, mises à jour SEO local | Surveillance de mots-clés : hebdomadaire. Optimisation de contenu : mensuel. Audit technique : trimestriel. Netlinking : continu. | Spécialiste SEO |

### Structure du modèle de SOP

Chaque document de SOP suit cette structure :

```
SOP: [Name]
Category: [Content Production | Paid Media | Reporting | CRM | SEO]
Responsible: [Role]
Cadence: [Frequency]
Estimated Time: [Duration]
Approval: [None | Team Lead | Account Manager | Account Director]

Steps:
1. [Action] — [Details]
2. [Action] — [Details]
...

Quality Checklist:
- [ ] [Check 1]
- [ ] [Check 2]
...

Escalation: [When to escalate and to whom]
```

### Règles de maintenance des SOP

- Revoir et mettre à jour les SOP trimestriellement ou après tout échec de processus significatif.
- Documenter toutes les exceptions et solutions de contournement découvertes durant l'exécution.
- Versionner les SOP : inclure une date de « Dernière mise à jour » et un numéro de « Version ».
- Les SOP appartiennent au rôle responsable mais sont approuvées par le chargé de compte avant que les changements ne prennent effet.

---

## 4. Rythme de reporting client

| Type de rapport | Fréquence | Jour/heure de livraison | Auto-généré ? | Canal de livraison | Approbateur | Contenu |
|---|---|---|---|---|---|---|
| **Pulse hebdomadaire** | Chaque lundi | Lundi 9h00 fuseau horaire client | Oui (`performance-check` + `report-generator`) | Slack + E-mail | Aucun (envoi auto) | KPI de premier niveau, rythme de dépense, succès/signalements, actions à mener pour la semaine |
| **Revue mensuelle** | 1er jour ouvré du mois | D'ici la fin de journée | Semi-auto (l'analyste revoit, ajoute des commentaires) | Google Slides + E-mail | Chargé de compte | Rapport de KPI complet, ventilations par canal, performance de contenu, rapprochement budgétaire, plan du mois suivant |
| **QBR (Revue d'activité trimestrielle)** | Tous les 90 jours | Réunion programmée | Manuel (le stratège prépare) | Présentation + export PDF | Directeur de compte | Revue stratégique, tendances de marché, analyse concurrentielle, résultats trimestriels vs objectifs, stratégie du trimestre suivant, recommandations budgétaires |
| **Planification annuelle** | Janvier (ou début d'exercice fiscal du client) | Atelier programmé | Manuel (l'équipe collabore) | Document stratégique + Google Slides | Administrateur d'agence | Bilan de l'année, définition des objectifs annuels, allocation budgétaire, stratégie de canal, cadre de calendrier de contenu, opportunités de croissance |

### Checklist de livraison de rapport

- [ ] Données extraites de toutes les sources connectées (aucune donnée obsolète de plus de 24h pour l'hebdomadaire, 48h pour le mensuel)
- [ ] Tous les KPI calculés avec les bonnes périodes de comparaison
- [ ] Anomalies signalées avec explications (pas seulement des chiffres)
- [ ] Les actions à mener sont spécifiques, assignées, et limitées dans le temps
- [ ] Voix de marque appliquée (professionnelle pour le destiné au client, détaillée pour l'interne)
- [ ] Canal de livraison confirmé (bon canal Slack, bonnes adresses e-mail)
- [ ] Copie de sauvegarde enregistrée dans `~/.claude-marketing/brands/{slug}/reports/`

---

## 5. Enseignements inter-clients

Les agences peuvent extraire des schémas précieux à travers leur portefeuille, mais l'isolation des données est primordiale. Suivez ces règles strictement.

### Analyse inter-clients autorisée

| Type d'analyse | Comment l'appliquer | Exemple de résultat |
|---|---|---|
| **Détection de schéma** | Agréger des métriques anonymisées à travers 5 clients ou plus du même secteur. Rapporter les constats comme des schémas généraux. | « Les objets d'e-mail avec des chiffres obtiennent un taux d'ouverture 15 % plus élevé à travers 8 clients SaaS B2B. » |
| **Benchmarking anonymisé** | Comparer les métriques d'un client unique à la moyenne anonymisée du portefeuille pour son secteur/segment. Ne jamais révéler quels clients composent la référence. | « Votre CPC de 2,40 $ est 20 % en dessous de la moyenne du portefeuille de 3,00 $ pour le SaaS B2B. » |
| **Enseignements partagés** | Uniquement sur opt-in. Chaque client doit consentir explicitement à ce que ses données anonymisées soient incluses dans les références d'agence. Documenter le consentement. | Rapport de référence d'agence (clients opt-in uniquement) : « Taux d'ouverture e-mail moyen T4 : 24,3 % (n=12 clients). » |
| **Optimisation des ressources** | Analyser la répartition de la charge de travail de l'équipe à travers les comptes. Identifier les membres d'équipe sous-utilisés ou surchargés. | « Le Créateur de contenu A est à 120 % de capacité cette semaine. Le Créateur de contenu B a 30 % de disponibilité. » |

### Actions inter-clients interdites

- Ne jamais exposer le nom de marque, les données, la stratégie, ou la performance d'un client à un autre client.
- Ne jamais utiliser le contenu propriétaire, les actifs créatifs, ou les données d'audience d'un client pour un autre client.
- Ne jamais partager des données brutes entre limites de marques, même anonymisées, sans opt-in explicite.
- Ne jamais référencer les résultats spécifiques d'un client dans des propositions à des prospects sans autorisation écrite.
- Ne jamais permettre à des connexions MCP d'une marque d'interroger les sources de données d'une autre marque.

---

## 6. Isolation des identifiants

### Modèle de sécurité

| Composant | Implémentation | Détails |
|---|---|---|
| **Emplacement de stockage** | `~/.claude-marketing/credentials/{slug}.json` | Chaque marque a son propre fichier d'identifiants. Les permissions de fichier devraient être en lecture seule pour l'utilisateur (chmod 600 sous Unix). |
| **Suivi du profil actif** | `~/.claude-marketing/credentials/_active-profile.json` | Contient le slug du profil d'identifiants actuellement actif. Un seul profil peut être actif à la fois. |
| **Changement de profil** | `/digital-marketing-pro:credential-switch` ou `setup.py --switch-credentials` | Change le profil d'identifiants actif. Tous les appels MCP et API suivants utilisent les clés du nouveau profil. |
| **Chargement des variables d'environnement** | Identifiants chargés comme variables d'environnement au démarrage de la session | Chaque profil se cartographie à des variables d'environnement : par ex., `SENDGRID_API_KEY`, `GOOGLE_ADS_CUSTOMER_ID`. |
| **Isolation inter-marques** | Frontière stricte | Les identifiants ne traversent JAMAIS les frontières de marque. Une demande pour les données de la Marque A doit utiliser les identifiants de la Marque A. Tenter d'utiliser les identifiants de la Marque B pour les opérations de la Marque A est une erreur au niveau système. |

### Piste d'audit

Chaque opération sur les identifiants est journalisée :

| Événement | Données journalisées |
|---|---|
| Profil créé | Horodatage, slug, plateformes configurées (aucun secret journalisé) |
| Profil changé | Horodatage, slug_origine, slug_destination, ID utilisateur/session |
| Profil mis à jour | Horodatage, slug, champs modifiés (aucun secret journalisé) |
| Profil supprimé | Horodatage, slug, statut de confirmation |
| Vérification de validation | Horodatage, slug, résultat (réussite/échec par plateforme, aucun secret exposé) |

### Bonnes pratiques

- Utiliser des noms de variables d'environnement préfixés par client lors de la gestion de plusieurs profils dans le même environnement : `ACME_SENDGRID_API_KEY`, `BETA_SENDGRID_API_KEY`.
- Après chaque changement d'identifiant, exécuter `/digital-marketing-pro:validate-profile --brand {brand}` — cela sonde chaque connecteur référencé par le profil et rapporte réussite/échec/classe d'erreur sans jamais afficher les valeurs d'identifiants. Ajouter `--connectors slack,hubspot` pour sonder uniquement le sous-ensemble tourné.
- Faire tourner les clés API trimestriellement. Journaliser les dates de rotation dans les métadonnées du profil d'identifiants.
- Ne jamais stocker d'identifiants dans le répertoire du plugin, le JSON de profil de marque, ou tout fichier sous contrôle de version.
- Si un identifiant est suspecté compromis : faire tourner immédiatement la clé sur la plateforme, mettre à jour le profil, revalider, et journaliser l'incident.

---

## 7. Marque blanche

### Règles de voix des rapports

| Contexte | Directives de voix | À faire | À ne pas faire |
|---|---|---|---|
| **Rapports destinés au client** | Voix agence : professionnelle, troisième personne, aucune personnalité de marque ne transparaît | « La performance de la campagne a dépassé les objectifs de 12 % ce mois-ci. » | « On a cartonné ce mois-ci ! » ou tout langage décontracté/de personnalité de marque |
| **Rapports internes** | Voix d'équipe : peut référencer plusieurs clients, utiliser des raccourcis, être direct | « Le ROAS T4 d'Acme est en baisse. Besoin de revoir la création. » | Partager en interne sans marquer comme confidentiel |
| **Résumés exécutifs** | Niveau portefeuille : métriques agrégées, recommandations stratégiques | « L'efficacité de la dépense publicitaire du portefeuille s'est améliorée de 8 % trimestre sur trimestre à travers 15 comptes. » | Inclure des noms ou données de clients individuels sauf si le résumé est destiné à ce client spécifique |
| **Tableaux de bord client** | Vue mono-client : toutes les données limitées à ce client uniquement | Afficher les KPI, campagnes, et tendances de ce client | Afficher toute donnée inter-clients, référence de sources identifiables, ou noms d'autres clients |

### Règles de marquage pour les livrables

| Élément | Règle |
|---|---|
| **Logo** | Utiliser le logo de l'agence sur tous les rapports destinés au client. Ne jamais utiliser le marquage du plugin Digital Marketing Pro. |
| **Palette de couleurs** | Utiliser les couleurs de marque de l'agence pour les modèles de rapport. Les couleurs de marque du client peuvent être utilisées pour les exemples de contenu au sein du rapport. |
| **Pied de page** | Inclure le nom de l'agence, les coordonnées, et un avis de confidentialité. Exemple : « Confidentiel. Préparé par [Nom de l'agence] pour [Nom du client]. » |
| **Paternité** | Les rapports sont attribués à l'agence, pas à des outils IA ou plugins individuels. |
| **Sources de données** | Référencer les sources de données de manière générique : « Données analytics », « Données de plateforme publicitaire ». Ne pas référencer les noms de serveurs MCP spécifiques ou les internes du plugin. |

### Règles d'isolation des tableaux de bord

- Chaque tableau de bord client est limité exclusivement au slug de marque de ce client.
- L'URL ou les jetons d'accès du tableau de bord ne doivent pas donner accès aux données d'autres clients.
- Les tableaux de bord au niveau portefeuille sont internes uniquement et doivent nécessiter une authentification agency-admin.
- Les filtres sur les tableaux de bord de portefeuille doivent revenir par défaut à la vue agrégée ; explorer un client spécifique nécessite une sélection explicite.
- Ne jamais afficher les données de deux clients différents sur le même écran dans un contexte destiné au client.

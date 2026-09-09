---
name: client-onboarding
description: "Générer un dossier d'intégration complet pour un nouveau client marketing — ordre du jour de réunion de lancement, questionnaire de découverte de 20 à 30 questions, cartographie des parties prenantes avec matrice RACI, checklist d'accès plateforme par plateforme, plan de jalons à 30-60-90 jours, cadence de communication, protocole d'escalade, modèle d'e-mail de bienvenue, brief interne pour l'équipe, registre des risques, et un plan d'action jour par jour pour la première semaine. Se déclenche sur \"/digital-marketing-pro:client-onboarding\", \"we just signed a new client\", \"build a kickoff agenda and discovery questionnaire\", \"30-60-90 day plan for the new account\", \"what access do we need from the client\". Lit le profil de marque, les guidelines, les modèles personnalisés et les procédures d'agence afin que le dossier corresponde au process interne."
---

# /digital-marketing-pro:client-onboarding

## Objectif

Générer un flux d'intégration complet pour un nouvel engagement marketing. Couvre la planification du lancement, la découverte, l'alignement des parties prenantes, le provisionnement des accès, la définition des jalons, et les protocoles de communication pour assurer une transition en douceur du contrat signé au compte actif, avec des attentes claires des deux côtés.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom du client et secteur** : le nom de l'entreprise du nouveau client, son secteur d'activité, et son segment de marché
- **Services contractualisés** : quels services marketing sont inclus dans l'engagement (SEO, PPC, social, contenu, e-mail, analytics, etc.)
- **Chronologie de l'engagement** : durée du contrat et dates clés — date de début, premier livrable, première revue, fin de contrat
- **Structure d'équipe (côté agence)** : responsable de compte, stratège, spécialistes, et toute ressource partagée assignée au compte
- **Structure d'équipe (côté client)** : contact principal, responsable marketing, valideurs, et experts métier disponibles
- **Besoins d'accès au compte** : plateformes, outils et comptes nécessitant des identifiants ou des permissions (Google Ads, Analytics, CMS, comptes sociaux, CRM, etc.)
- **Niveau de maturité du client** : startup, PME, ou grand compte — détermine la complexité de l'intégration, les niveaux d'approbation, et les exigences de conformité
- **Liste des parties prenantes** : toutes les personnes impliquées dans l'engagement avec rôles, autorité de décision, et préférences de communication
- **Préférences de communication** : canaux préférés (Slack, e-mail, appels), fuseau horaire, disponibilité pour les réunions, et attentes de délai de réponse
- **Critères de succès** : ce que le client considère comme un engagement réussi à 30, 60, et 90 jours — et les KPI contractuels s'ils sont définis

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifiez aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions et les fichiers de catégorie pertinents. Vérifiez les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Rechercher les meilleures pratiques d'intégration propres au secteur du client** : identifiez les considérations d'intégration spécifiques au secteur — exigences réglementaires, timing saisonnier, sources de données courantes, et périodes de montée en puissance typiques pour le secteur du client
3. **Construire l'ordre du jour de la réunion de lancement** : structurez un lancement de 60 à 90 minutes couvrant les présentations, l'aperçu de l'engagement, l'alignement des objectifs, la présentation du processus, la remise des accès, la mise en place de la communication, et les prochaines étapes immédiates
4. **Créer le questionnaire de découverte** : rédigez 20 à 30 questions couvrant le contexte business, le paysage concurrentiel, les efforts marketing passés, les guidelines de marque, les actifs de contenu, l'accès aux données, les flux d'approbation, et les définitions du succès
5. **Cartographier les parties prenantes et les décideurs** : construisez une cartographie des parties prenantes avec une matrice RACI (Responsable, Approbateur, Consulté, Informé) pour les activités clés — approbation de contenu, changements de budget, changements de stratégie, reporting, et escalades
6. **Définir la checklist d'accès et de permissions** : créez une checklist plateforme par plateforme de tous les comptes, outils et systèmes nécessitant un accès — avec le niveau de permission, le propriétaire, et la date limite de provisionnement
7. **Fixer les jalons à 30-60-90 jours** : définissez des jalons spécifiques et mesurables pour chaque phase — découverte et mise en place (30 jours), optimisation et premiers résultats (60 jours), fonctionnement complet et première revue de performance (90 jours)
8. **Établir la cadence de communication** : concevez le calendrier récurrent de réunions et de reporting — appels de statut hebdomadaires, rapports de performance mensuels, revues d'affaires trimestrielles, et déclencheurs d'escalade ad hoc
9. **Créer le protocole d'escalade** : définissez les niveaux de sévérité (informatif, urgent, critique), les attentes de délai de réponse, les chemins d'escalade côté agence et côté client, et le suivi de résolution
10. **Construire la checklist de transfert de connaissances** : listez tous les actifs, documents, identifiants, fichiers de marque, données historiques, et connaissance institutionnelle que le client doit fournir pour que l'agence puisse opérer efficacement
11. **Compiler en un document d'intégration unifié** : assemblez tous les éléments en un dossier d'intégration structuré unique avec propriété claire, échéances, et un plan d'action pour la première semaine afin de créer une dynamique immédiate

## Résultat

Un dossier d'intégration client structuré contenant :

- **Ordre du jour de la réunion de lancement** : ordre du jour structuré de 60 à 90 minutes avec sujets de discussion, allocations de temps, intervenants, et supports à lire au préalable
- **Questionnaire de découverte** : 20 à 30 questions ciblées organisées par catégorie (business, concurrentiel, marque, technique, processus) avec espace pour les réponses
- **Cartographie des parties prenantes avec matrice RACI** : carte visuelle de toutes les parties prenantes avec autorité de décision, affectations RACI pour les activités clés, et coordonnées
- **Checklist d'accès au compte** : liste plateforme par plateforme avec niveaux de permission requis, propriétaire actuel, contact agence, et échéance de provisionnement
- **Plan de jalons à 30-60-90 jours** : calendrier de jalons par phase avec livrables spécifiques, critères de succès, et dates de point de contrôle par phase
- **Cadence de communication** : calendrier complet de réunions et de reporting — points de contact hebdomadaires, mensuels et trimestriels avec participants et modèles d'ordre du jour
- **Protocole d'escalade** : définitions des niveaux de sévérité (informatif/urgent/critique) avec délais de réponse, chemins d'escalade, et processus de suivi de résolution
- **Checklist de transfert de connaissances** : liste catégorisée de tous les actifs, documents, données, et accès que le client doit fournir avec échéances et parties responsables
- **Modèle d'e-mail de bienvenue** : e-mail prêt à envoyer présentant l'équipe de compte, confirmant les détails du lancement, et listant les actions préalables au lancement
- **Brief interne pour l'équipe** : document interne à l'agence résumant le contexte client, les parties prenantes clés, les sensibilités, les opportunités, et la stratégie de compte
- **Registre des risques avec atténuation** : risques d'intégration identifiés (accès retardé, disponibilité des parties prenantes, lacunes de données) avec probabilité, impact, et mesures d'atténuation
- **Plan d'action pour la première semaine** : calendrier jour par jour des cinq premiers jours ouvrés avec tâches spécifiques, propriétaires, et critères d'achèvement

## Agents utilisés

- **marketing-strategist** — Cartographie des parties prenantes, planification des jalons, conception de la communication, développement du questionnaire de découverte, évaluation des risques, et orchestration du flux d'intégration

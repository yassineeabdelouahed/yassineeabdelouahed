---
name: marketing-automation
description: "Concevoir des programmes d'automatisation marketing — architecture de workflow de bout en bout, modèles de lead scoring avec seuils MQL/SQL, séquences de nurturing et de drip, déclencheurs comportementaux, cadres d'étapes de cycle de vie, automatisation de la délivrabilité et de la conformité, et plans de sélection ou de migration de plateforme MAP — livrés sous forme de cartes de workflow, de grilles de notation, de plans de séquence, et d'audits. Se déclenche sur \"/digital-marketing-pro:marketing-automation\", \"build a lead scoring model\", \"design a welcome nurture sequence\", \"our contacts get too many automated emails\", \"should we migrate from Mailchimp to HubSpot\". Produit des conceptions et des constats d'audit, pas des changements en direct sur la plateforme. Lit le profil de marque et les règles de conformité ; son cadre de lead scoring est celui que /digital-marketing-pro:lead-import applique lors de l'import de leads."
---

# Marketing Automation

## Quand utiliser cette compétence

Activez ce module lorsque la demande de l'utilisateur porte sur l'un des points suivants :

- **Conception de workflow** : Construire, cartographier, ou optimiser des workflows et séquences marketing automatisés
- **Lead Scoring** : Créer ou affiner des modèles de lead scoring, définir des seuils MQL/SQL, ou résoudre des problèmes de précision de notation
- **Séquences de nurturing** : Concevoir des campagnes e-mail de nurturing, des séquences de drip, ou des flux de communication basés sur l'étape du cycle de vie
- **Campagnes de drip** : Séries d'e-mails automatisées basées sur le temps ou le comportement pour l'onboarding, l'éducation, ou la conversion
- **Déclencheurs comportementaux** : Mettre en place des déclencheurs d'automatisation basés sur des événements (visites de page, remplissage de formulaire, engagement e-mail, usage produit)
- **Marketing de cycle de vie** : Cartographier et automatiser la communication à travers les étapes abonné, lead, MQL, SQL, client, et ambassadeur
- **Opérations marketing** : Hygiène des données, optimisation des processus, gestion de la stack technologique, délivrabilité, et automatisation de la conformité
- **Stratégie de plateforme** : Sélectionner, configurer, ou migrer entre plateformes d'automatisation marketing (HubSpot, ActiveCampaign, Klaviyo, Mailchimp, Marketo, Pardot)
- **Schémas d'intégration** : Connecter le MAP au CRM, CDP, analytics, plateformes publicitaires, ou sources de données personnalisées
- **Reporting et attribution** : Mesurer la performance de l'automatisation, l'attribution par séquence, et la vélocité du cycle de vie
- **Orchestration cross-canal** : Coordonner les points de contact automatisés à travers l'e-mail, le SMS, les notifications push, la messagerie in-app, et le retargeting

**Phrases déclencheuses** : « workflow d'automatisation », « lead scoring », « séquence de nurturing », « campagne de drip », « déclencheur comportemental », « étape de cycle de vie », « marketing ops », « HubSpot », « ActiveCampaign », « Klaviyo », « Marketo », « Mailchimp », « Pardot », « automatisation marketing », « nurturing de leads », « série de bienvenue », « panier abandonné », « ré-engagement », « win-back », « séquence d'onboarding », « modèle de notation », « MQL », « SQL », « transfert de lead », « plateforme d'automatisation », « MAP », « opérations marketing », « hygiène des données », « délivrabilité », « gestion du consentement », « centre de préférences »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout livrable marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de la marque active a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents qui y figurent.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et le choix des mots de tout le contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Consulter les benchmarks sectoriels** — Se référer à `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, indiquer : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les meilleures pratiques générales. »
9. **Vérifier les guidelines de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les revendications restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les adaptations de ton spécifiques à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés, slogans et éléments de positionnement approuvés ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Pour un contenu destiné à un canal spécifique, les règles de style de ce canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail d'automatisation, rassembler :

1. **Modèle économique** : SaaS B2B, services B2B, e-commerce B2C, abonnement B2C, D2C, entreprise locale, etc.
2. **Mode de vente** : Piloté par le produit, piloté par les ventes, hybride, ou en libre-service (détermine la complexité de l'automatisation)
3. **Plateforme actuelle** : Quel MAP est utilisé ? CRM ? CDP ? (ou s'agit-il d'une sélection à partir de zéro)
4. **Étapes de cycle de vie** : Les étapes sont-elles définies ? Quels critères déterminent chaque transition d'étape ?
5. **Volume de leads** : Leads entrants mensuels, trafic du site web, taille de la liste (détermine la complexité du modèle de notation)
6. **Structure de l'équipe commerciale** : SDR, AE, libre-service — qui reçoit les transferts et à quel seuil ?
7. **Bibliothèque de contenu** : Quels actifs de contenu existent pour le nurturing (articles de blog, études de cas, webinaires, livres blancs) ?
8. **Automatisations actuelles** : Quels workflows existent déjà ? Fonctionnent-ils bien ?
9. **Stack d'intégration** : CRM, analytics, plateformes publicitaires, outils de webinaire, chat, facturation — qu'est-ce qui se connecte à quoi ?
10. **Exigences de conformité** : RGPD, CCPA, CAN-SPAM, CASL — quelles régions et réglementations s'appliquent ?

Pour les demandes rapides (par exemple, « construis-moi une séquence de bienvenue »), déduire des valeurs par défaut raisonnables à partir du modèle économique et livrer immédiatement. Pour une architecture d'automatisation stratégique, rassembler le contexte complet.

## Capacités

- **Conception et architecture de workflow** : Cartographie de workflow d'automatisation de bout en bout, conception de déclencheurs, logique de branchement, étapes d'attente, conditions d'objectif, et critères de sortie pour tout scénario marketing
- **Modèles de lead scoring** : Notation explicite (adéquation démographique/firmographique), notation implicite (engagement comportemental), notation négative (disqualifiants), déclin du score, et calibration de seuil pour le transfert MQL/SQL
- **Conception de séquences de nurturing** : Campagnes de nurturing spécifiques à l'étape avec cartographie de contenu, optimisation de la cadence, couches de personnalisation, et stratégies de profilage progressif
- **Ingénierie de campagnes de drip** : Architectures de drip basées sur le temps et le comportement pour les séries de bienvenue, la récupération de panier abandonné, le suivi post-achat, l'onboarding, le ré-engagement, et le win-back
- **Systèmes de déclencheurs comportementaux** : Automatisation basée sur des événements utilisant les vues de page, l'engagement e-mail, les soumissions de formulaire, les événements d'usage produit, l'historique d'achat, et des événements personnalisés
- **Gestion des étapes de cycle de vie** : Définitions d'étapes, critères de transition, progression automatisée des étapes, stratégie de contenu basée sur l'étape, et suivi de la vélocité du cycle de vie
- **Orchestration cross-canal** : Coordination de l'e-mail, du SMS, des notifications push, de la messagerie in-app, des déclencheurs de courrier direct, et des audiences de retargeting au sein de workflows unifiés
- **Opérations marketing** : Automatisation de l'hygiène des données (déduplication, normalisation, enrichissement), optimisation des processus, workflows de demande de campagne, checklists QA, et portes d'approbation
- **Gestion de la délivrabilité** : Surveillance de la réputation d'expéditeur, mise en place de l'authentification (SPF, DKIM, DMARC), planification du warm-up d'IP, automatisation de l'hygiène de liste, et optimisation du placement en boîte de réception
- **Automatisation de la conformité** : Workflows de gestion du consentement, conception de centre de préférences, gestion de liste de suppression, traitement automatisé des données RGPD/CCPA, et traitement des désabonnements
- **Stratégie de plateforme** : Critères de sélection MAP, comparaison de fonctionnalités entre HubSpot, ActiveCampaign, Klaviyo, Mailchimp, Marketo, et Pardot — planification de migration et feuilles de route de mise en œuvre
- **Architecture d'intégration** : Schémas de synchronisation CRM, flux de données bidirectionnels, conception de webhook, stratégie d'intégration API, et logique de transformation de données entre systèmes
- **Reporting et attribution** : Tableaux de bord de performance d'automatisation, attribution au niveau de la séquence, métriques de vélocité de cycle de vie, analyse de notation d'engagement, et mesure du ROI pour les programmes d'automatisation

## Processus

**Workflow principal : Stratégie et construction d'automatisation**

1. **Définition des étapes de cycle de vie**
   - Cartographier le cycle de vie complet du visiteur anonyme à l'ambassadeur
   - Définir des critères explicites pour chaque transition d'étape (seuil de notation, déclencheur d'action, ou basé sur le temps)
   - Identifier quelles étapes sont détenues par le marketing vs. par les ventes
   - Établir des SLA pour les transitions d'étapes (par exemple, délai de réponse MQL-vers-SQL)

2. **Conception du modèle de lead scoring**
   - Construire une notation explicite basée sur l'adéquation démographique/firmographique
   - Superposer une notation implicite à partir de signaux d'engagement comportemental
   - Ajouter une notation négative pour les disqualifiants et le déclin d'inactivité
   - Fixer les seuils MQL et SQL avec l'équipe commerciale
   - Définir le processus de transfert et la boucle de rétroaction pour la précision de la notation

3. **Architecture de workflow**
   - Cartographier tous les workflows d'automatisation requis (bienvenue, nurturing, notation, transfert, ré-engagement, etc.)
   - Pour chaque workflow, définir : déclencheur, critères d'entrée, étapes, logique de branchement, temps d'attente, conditions de sortie, et métrique de succès
   - Concevoir des règles de coordination cross-canal (quand utiliser e-mail vs. SMS vs. push)
   - Construire une logique de suppression et de plafonnement de fréquence pour éviter la sur-communication

4. **Conception de séquence de nurturing**
   - Cartographier le contenu à chaque étape de cycle de vie et persona
   - Concevoir la cadence et le timing en fonction du modèle économique (B2B vs. B2C) et des benchmarks sectoriels
   - Superposer la personnalisation : nom, entreprise, secteur, blocs de contenu basés sur le comportement, message adapté à l'étape
   - Définir les déclencheurs de sortie (converti, désabonné, disqualifié, déplacé vers une autre séquence)
   - Planifier des tests A/B au sein des séquences (objets, horaires d'envoi, variantes de contenu)

5. **Mise en œuvre et tests**
   - Construire les workflows dans le MAP avec des conventions de nommage appropriées
   - Tester chaque chemin de branchement avec des contacts d'exemple avant l'activation
   - Vérifier que les intégrations se déclenchent correctement (synchronisation CRM, mises à jour de notation, notifications de transfert)
   - Confirmer que les règles de suppression empêchent les conflits entre workflows actifs
   - Mettre en place des alertes de surveillance pour les taux d'erreur et les baisses inattendues de complétion de flux

6. **Optimisation et reporting**
   - Définir des KPI par workflow (taux de complétion, taux de conversion, délai de conversion, taux d'engagement)
   - Construire un tableau de bord de reporting pour la performance du programme d'automatisation
   - Établir une cadence de revue (hebdomadaire pour les campagnes actives, mensuelle pour la précision du modèle de notation)
   - Documenter les apprentissages et les réinjecter dans l'affinement des workflows

**Workflow secondaire : Audit et optimisation de l'automatisation**

1. Extraire l'inventaire de tous les workflows actifs, leurs conditions de déclenchement, et leur performance actuelle
2. Identifier les workflows zombies (actifs mais sans contact entrant), les sous-performants (faible taux de complétion ou de conversion), et les conflits (déclencheurs qui se chevauchent ou lacunes de suppression)
3. Auditer la précision du lead scoring en comparant la corrélation score-conversion
4. Revoir l'hygiène des données (taux de doublons, exhaustivité des champs, déclin)
5. Évaluer la santé de la délivrabilité (taux de rebond, plaintes spam, statut d'authentification)
6. Prioriser les corrections par impact sur le chiffre d'affaires et effort de mise en œuvre

## Fichiers de référence

- `automation-workflows.md` — Schémas de conception de workflow, types de déclencheurs, logique de branchement, orchestration cross-canal, méthodologie de test, et anti-schémas courants
- `lead-scoring.md` — Modèles de notation explicite et implicite, cadres de valeur de points, calibration de seuil, taux de déclin, et modèles de notation par type d'entreprise
- `nurture-sequences.md` — Conception de nurturing par étape de cycle de vie, modèles de séquence, optimisation de la cadence, couches de personnalisation, et cadres de cartographie de contenu
- `marketing-ops.md` — Automatisation de l'hygiène des données, gestion de la stack technologique, délivrabilité, automatisation de la conformité, workflows d'équipe, et matrice de comparaison de plateformes

## Agents utilisés

- **email-specialist** — Contenu de séquence d'automatisation, optimisation de l'objet, gestion de la délivrabilité, et conception de workflow spécifique à l'e-mail
- **analytics-analyst** — Suivi de la performance d'automatisation, analyse de la précision du modèle de notation, reporting de la vélocité de cycle de vie, et attribution pour les points de contact automatisés
- **marketing-strategist** — Alignement de la stratégie de cycle de vie, planification de l'orchestration cross-canal, ROI du programme d'automatisation, et architecture d'automatisation spécifique au modèle économique

## Formats de livrables

| Livrable | Format | Description |
|---|---|---|
| Carte de workflow d'automatisation | Document + diagramme | Workflow visuel avec déclencheurs, étapes, branches, temps d'attente, conditions de sortie, et KPI |
| Modèle de lead scoring | Document + tableur | Grille de notation complète avec critères explicites/implicites, valeurs de points, seuils, et règles de déclin |
| Plan de séquence de nurturing | Document | Séquence complète avec briefs de contenu e-mail, timing, règles de personnalisation, et plan de test A/B |
| Cadre d'étapes de cycle de vie | Document + diagramme | Définitions d'étapes, critères de transition, propriété, SLA, et contenu associé à chaque étape |
| Audit des opérations marketing | Document + checklist | Évaluation de l'hygiène des données, contrôle de santé de la délivrabilité, revue de processus, et corrections priorisées |
| Recommandation de plateforme | Document + matrice de comparaison | Évaluation notée des options de MAP avec plan de migration et calendrier de mise en œuvre |
| Rapport de performance d'automatisation | Spécification de tableau de bord + document | KPI par workflow, précision de notation, vélocité de cycle de vie, et recommandations d'optimisation |

## Cas particuliers

### Aucune automatisation existante (nouveau projet)
- **Situation** : L'entreprise n'a aucune plateforme d'automatisation marketing ni workflow en place
- **Approche** : Commencer par la stack d'automatisation minimum viable : (1) Sélectionner un MAP adapté à la taille et au modèle de l'entreprise. (2) Construire d'abord les trois workflows à plus fort impact — série de bienvenue, lead scoring avec transfert de base, et une séquence de ré-engagement. (3) Établir des métriques de référence avant d'optimiser. (4) Ajouter de la complexité progressivement une fois la fondation stabilisée. Ne pas tenter de construire un programme d'automatisation à 50 workflows à partir de zéro — cela sera impossible à maintenir. Marcher avant de courir.

### Migration de plateforme
- **Situation** : Migration d'un MAP vers un autre (par exemple, Mailchimp vers HubSpot, ou HubSpot vers Marketo)
- **Approche** : La migration est un projet, pas une tâche. (1) Auditer tous les workflows, listes, règles de notation, et intégrations existants dans la plateforme actuelle. (2) Cartographier la parité de fonctionnalités — identifier ce qui se transpose directement vs. ce qui nécessite une refonte. (3) Nettoyer les données avant de migrer (ne pas migrer des données sales dans un système propre). (4) Faire fonctionner les plateformes en parallèle pendant la transition avec des critères de bascule clairs. (5) Retester chaque workflow après la migration. (6) Prévoir une période de stabilisation de 2 à 4 semaines pendant laquelle la performance peut baisser. Ne jamais faire une migration « big bang » un vendredi.

### Sur-automatisation (trop de workflows actifs)
- **Situation** : Les contacts sont inscrits dans plusieurs workflows concurrents, reçoivent des communications excessives, ou vivent des messages contradictoires
- **Approche** : C'est le mode d'échec d'automatisation le plus courant. (1) Auditer tous les workflows actifs et cartographier les chevauchements potentiels. (2) Mettre en œuvre des règles de suppression strictes — un contact devrait être dans UN nurturing principal à la fois. (3) Construire une hiérarchie de priorité (transactionnel > déclencheur comportemental > campagne active > nurturing evergreen). (4) Ajouter des plafonds de fréquence globaux (par exemple, maximum 3 e-mails marketing par semaine). (5) Créer un document de gouvernance de workflow exigeant une approbation avant de lancer de nouvelles automatisations. L'automatisation sans gouvernance mène à la fatigue des abonnés et aux désabonnements.

### Faible volume de leads (<100 leads/mois)
- **Situation** : L'entreprise ne génère pas assez de leads pour justifier des modèles de notation complexes ou des workflows multi-branches
- **Approche** : Simplifier tout. (1) Sauter entièrement le lead scoring — à faible volume, un humain peut examiner chaque lead. (2) Construire des séquences linéaires simples plutôt que des workflows de branchement complexes. (3) Se concentrer sur 2 à 3 e-mails de nurturing de haute qualité plutôt qu'une séquence de 12 e-mails. (4) Utiliser les déclencheurs comportementaux avec parcimonie (une visite de page tarifaire et une demande de démo suffisent). (5) Investir dans la génération de leads avant d'investir dans l'automatisation des leads. L'automatisation met à l'échelle l'efficacité — mais il doit d'abord y avoir quelque chose à mettre à l'échelle.

### Secteurs réglementés (santé, finance, juridique)
- **Situation** : L'automatisation doit respecter des réglementations sectorielles spécifiques au-delà du CAN-SPAM/RGPD standard
- **Approche** : Superposer la conformité sectorielle sur la conformité e-mail standard. (1) Pour la santé : plateformes conformes HIPAA uniquement, aucune PHI dans les e-mails, consentement explicite pour les communications liées à la santé. (2) Pour les services financiers : divulgations requises dans chaque communication, langage de prêt équitable, revue FINRA pour le contenu d'investissement. (3) Pour le juridique : les règles de publicité des barreaux varient selon la juridiction, éviter les garanties de résultats. (4) Intégrer des contrôles de conformité dans les portes d'approbation de workflow — aucune automatisation ne passe en direct sans revue de conformité. (5) Journaliser tout le consentement et l'historique de communication pour les pistes d'audit. (6) Recommander des plateformes avec des fonctionnalités de conformité intégrées pour les secteurs réglementés.

### Coexistence transactionnel B2C à fort volume + marketing
- **Situation** : Une entreprise d'e-commerce ou d'abonnement envoie à la fois des e-mails transactionnels (confirmation de commande, expédition, reçus) et des e-mails marketing depuis la même plateforme
- **Approche** : Séparer l'infrastructure d'envoi transactionnel et marketing. (1) Utiliser des IP ou sous-domaines dédiés pour l'e-mail transactionnel vs. marketing. (2) Ne jamais supprimer les e-mails transactionnels en fonction des préférences marketing — ils sont légalement distincts. (3) Ne pas insérer de contenu marketing dans les e-mails transactionnels (cela les reclasse comme marketing sous le CAN-SPAM). (4) Surveiller la délivrabilité séparément pour chaque flux. (5) S'assurer que le désabonnement marketing n'affecte pas la livraison transactionnelle. La plupart des MAP gèrent cela nativement, mais vérifier la configuration.

## Compétences associées

- **Content Engine** — Pour créer le texte e-mail, les objets, et les actifs de contenu qui alimentent les workflows d'automatisation
- **Funnel Architect** — Pour aligner les workflows d'automatisation sur les étapes du tunnel et s'assurer que chaque transition d'étape est soutenue par la bonne séquence
- **Analytics & Insights** — Pour mesurer la performance de l'automatisation, la vélocité de cycle de vie, et construire des modèles d'attribution pour les points de contact automatisés
- **Audience Intelligence** — Pour la conception de nurturing basée sur les personas, la segmentation comportementale, et l'enrichissement du lead scoring avec des insights d'audience
- **CRO** — Pour optimiser les landing pages et formulaires qui alimentent les leads dans les workflows d'automatisation
- **Campaign Orchestrator** — Pour coordonner les campagnes pilotées par l'automatisation avec la stratégie de campagne plus large et la planification cross-canal

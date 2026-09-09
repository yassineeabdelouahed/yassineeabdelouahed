---
name: reputation-management
description: "Playbook complet de gestion de la réputation : génération d'avis conforme FTC, cadres de réponse aux avis négatifs, communication de crise à 3 niveaux avec une chronologie de crise sévère sur 72 heures, évaluation de la sécurité de marque à 4 couches, conception du suivi de sentiment, et plans de récupération 30/60/90 jours — livrés sous forme de plans prêts à l'emploi, de réponses rédigées, et d'audits. Se déclenche sur \"/digital-marketing-pro:reputation-management\", \"we're getting hit with negative reviews\", \"prepare a crisis communication plan\", \"how do we get more Google reviews\", \"someone is spreading misinformation about us\". Lit le profil de marque, les guidelines, et les règles de conformité ; il planifie et rédige — il ne publie pas de réponses et ne surveille pas les plateformes lui-même. Pour une réponse à un avis unique, /digital-marketing-pro:review-response est le module ciblé associé."
---

# Gestion de la réputation

## Quand utiliser cette compétence

Activez cette compétence lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- Générer davantage d'avis clients ou gérer les avis existants sur les plateformes
- Répondre aux avis négatifs (Google, Yelp, G2, Capterra, Trustpilot, Amazon, BBB, sites spécifiques au secteur)
- Se préparer à ou répondre à une crise de marque (rappel de produit, scandale d'un dirigeant, violation de données, plainte virale, action en justice)
- Évaluer et atténuer les risques de sécurité de marque dans la publicité et les partenariats
- Surveiller le sentiment de marque sur les réseaux sociaux, les plateformes d'avis, et la presse
- Construire un plan de récupération de réputation après un événement négatif
- Gérer la presse négative, des résultats de recherche défavorables, ou de la désinformation
- Gérer les avis d'employés sur des plateformes comme Glassdoor ou Indeed
- Concevoir des stratégies proactives de construction de réputation
- Évaluer les paramètres de sécurité de marque pour les placements publicitaires et l'adjacence de contenu
- Naviguer les contraintes légales sur les réponses de réputation (diffamation, HIPAA, secteurs réglementés)
- Traiter les attaques d'avis frauduleux ou la manipulation d'avis par des concurrents

## Contexte de marque (appliqué automatiquement)

Avant de produire un quelconque résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de marque actif a été affiché au démarrage de la session. Utiliser le nom de marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité, et les concurrents montrés là.
2. **Si vous avez besoin du profil complet**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, d'énergie, d'humour, d'autorité doivent façonner tout le ton et les choix de mots du contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — Consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux procéder avec les meilleures pratiques générales. »
9. **Vérifier les guidelines de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et faire respecter : `restrictions.md` pour les mots interdits, les revendications restreintes, et les avertissements obligatoires ; `channel-styles.md` pour les remplacements de ton spécifiques au canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les taglines, et le langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Lors de la production de contenu pour un canal spécifique, les règles de style du canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations déjà présentes dans son profil de marque.

## Contexte requis

Avant l'exécution, recueillir les éléments suivants auprès de l'utilisateur (demander s'ils ne sont pas fournis) :

- **Situation actuelle** : S'agit-il d'une construction de réputation proactive, d'une réponse de crise réactive, ou d'une maintenance de réputation continue ?
- **Niveau de sévérité** : Pour les situations de crise, quelle est l'ampleur et l'intensité ? (Avis négatif isolé, conversation négative en tendance, couverture presse, action en justice)
- **Secteur** : Nécessaire pour les contraintes de conformité (santé/HIPAA, finance/FINRA, juridique/règles du barreau, gouvernement)
- **Paysage de plateformes** : Quelles plateformes d'avis et canaux sociaux sont les plus pertinents pour l'entreprise
- **Profil d'avis actuel** : Note moyenne, volume d'avis, tendance des avis, et taux de réponse
- **Voix de marque** : Guidelines de ton et de style de communication
- **Parties prenantes** : Qui doit être impliqué dans les approbations (légal, RP, direction, service client)
- **Suivi existant** : Quels outils ou processus sont en place pour le suivi du sentiment
- **Historique** : Toute crise ou problème de réputation passé et comment il a été géré
- **Ressources** : Capacité d'équipe pour la gestion des avis, la réponse de crise, et le suivi continu

## Capacités

### Génération d'avis
- **Sollicitation conforme FTC** : Demander des avis sans inciter spécifiquement aux avis positifs. Les incitations à laisser un avis (pas un avis positif) nécessitent une divulgation. Ne jamais filtrer les avis selon le niveau de satisfaction (demander aux clients satisfaits de laisser un avis public tout en orientant les clients insatisfaits vers un retour privé est interdit)
- **Timing spécifique à la plateforme** : Avis Google (après achat/fin de service), G2/Capterra (après un usage significatif du produit, typiquement 30-60 jours), Amazon (après livraison avec le bouton de demande d'avis), Yelp (ne jamais solliciter directement -- Yelp pénalise les avis sollicités)
- **Séquences de demande d'avis** : Email, SMS, invites in-app, codes QR sur les reçus/emballages, relances post-interaction
- **Stratégie de volume d'avis** : Une vélocité d'avis constante compte plus que des pics ponctuels. Construire des flux automatisés de demande d'avis déclenchés par les jalons clients
- **Priorisation des plateformes d'avis** : Concentrer les efforts sur les plateformes qui influencent les décisions d'achat pour le secteur spécifique (Google pour le local, G2 pour le SaaS, TripAdvisor pour l'hôtellerie, Healthgrades pour le médical)

### Cadre de réponse aux avis négatifs
- **Timing de réponse** : Répondre dans les 24 heures pour les avis publics. La rapidité démontre l'attention. Les réponses tardives paraissent désinvoltes
- **Structure de réponse** : Reconnaître la préoccupation, s'excuser pour l'expérience (sans admettre de faute), expliquer ce qui s'est passé si approprié, offrir une résolution, et déplacer la conversation hors ligne
- **Calibrage du ton** : Professionnel et empathique quel que soit le ton de l'avis. Ne jamais argumenter, se mettre sur la défensive, ou blâmer publiquement le client. La réponse est destinée aux futurs lecteurs, pas seulement à l'auteur de l'avis
- **Déclencheurs de revue légale** : Savoir quand une réponse nécessite une revue légale (menace de contentieux, allégations d'activité illégale, sujets de secteur réglementé, revendications de diffamation potentielles)
- **Protocole de suivi** : Après avoir résolu le problème hors ligne, demander poliment si le client envisagerait de mettre à jour son avis. Ne jamais exiger ou faire pression
- **Contestations d'avis** : Processus spécifiques à la plateforme pour signaler des avis frauduleux, diffamatoires, ou violant les règles pour suppression

### Communication de crise (cadre à 3 niveaux)

**Niveau 1 -- Crise mineure** (plainte isolée, article négatif unique, problème localisé sur les réseaux sociaux)
- **Indicateurs de sévérité** : Portée limitée, pas de reprise médiatique, contenu sur une seule plateforme ou conversation
- **Chronologie de réponse** : Répondre dans les 24 heures avec un accusé de réception préparé
- **Actions** : Réponse directe au client, surveillance de la propagation, préparation d'une déclaration d'attente si nécessaire
- **Parties prenantes** : Responsable service client, responsable réseaux sociaux

**Niveau 2 -- Crise modérée** (plainte en tendance, plusieurs médias, amplification par des influenceurs, problème régional)
- **Indicateurs de sévérité** : Portée croissante, demandes médiatiques, plusieurs plaintes clients sur le même sujet, hashtag en tendance
- **Chronologie de réponse** : Déclaration publique dans les 4 heures. Alignement interne dans les 2 heures
- **Actions** : Activer l'équipe de crise, publier une déclaration d'attente, préparer la réponse complète, surveiller en temps réel, informer la direction
- **Parties prenantes** : VP/Directeur Marketing, équipe RP, conseil juridique, direction du service client
- **Matrice de messages par partie prenante** : Messages différents pour les clients (empathie + action), les employés (faits + orientation), les médias (déclaration officielle), les investisseurs (évaluation d'impact + plan de réponse), les partenaires (réassurance + calendrier)
- **Protocole de changement de voix de marque** : Passer de la voix marketing standard à la voix de crise -- plus humaine, plus directe, moins polie, zéro humour, zéro promotion

**Niveau 3 -- Crise sévère** (violation de données, problème de sécurité produit, inconduite d'un dirigeant, indignation virale, action réglementaire)
- **Indicateurs de sévérité** : Couverture médiatique nationale/internationale, implication réglementaire, responsabilité légale potentielle, impact client significatif
- **Chronologie de réponse** : Accusé de réception initial dans l'heure. Réponse complète dans les 4 heures. Mises à jour continues toutes les 24-48 heures
- **Actions** : Réponse au niveau du PDG, coordination juridique, notification réglementaire (si requise), notification client, remédiation opérationnelle, enquête tierce (si nécessaire)
- **Chronologie de 72 heures** : Heure 0-1 (reconnaître, assembler l'équipe), Heure 1-4 (recherche de faits, déclaration d'attente), Heure 4-24 (réponse détaillée, prise de contact client, déclaration médias), Heure 24-48 (mises à jour opérationnelles, briefings des parties prenantes), Heure 48-72 (annonce du plan de récupération, cadence de communication continue)
- **Parties prenantes** : PDG/Direction générale, conseiller juridique général, conseil d'administration (si société cotée), agence RP, contacts réglementaires

### Sécurité de marque (cadre à 4 couches)

**Couche 1 -- Sécurité de placement publicitaire**
- S'assurer que les publicités n'apparaissent pas aux côtés de contenu nuisible, offensant, ou inapproprié pour la marque
- Paramètres de sécurité de marque spécifiques à la plateforme (exclusions de contenu Google, filtres d'inventaire Meta, exclusions de placement YouTube)
- Outils de vérification tiers (IAS, DoubleVerify) pour les environnements programmatiques
- Listes d'exclusion de mots-clés et de sites

**Couche 2 -- Sécurité des associations**
- Vérifier les partenaires, influenceurs, et sponsors pour l'alignement et le risque de marque
- Diligence raisonnable sur les partenaires de co-marketing, les sponsors d'événements, et les placements médias
- Surveillance continue des entités associées à la marque pour les controverses émergentes

**Couche 3 -- Sécurité du contenu**
- S'assurer que le contenu produit par la marque ne crée pas involontairement de problèmes de sécurité de marque
- Processus de revue de contenu pour la sensibilité culturelle, l'inclusivité, et la mauvaise interprétation potentielle
- Workflows d'approbation des publications sur les réseaux sociaux et calendriers de contenu à l'épreuve des crises

**Couche 4 -- Sécurité des données**
- Protéger les données clients dans les opérations marketing
- Conformité au RGPD, au CCPA, et à d'autres réglementations de confidentialité dans les contextes marketing
- Évaluations du traitement des données par les fournisseurs pour les partenaires martech

### Cadre de suivi du sentiment
- **Portée du suivi** : Mentions sur les réseaux sociaux, plateformes d'avis, actualités/presse, forums, sites d'avis employés, résultats de recherche
- **Notation du sentiment** : Classification positive, neutre, négative avec pondération d'intensité
- **Seuils d'alerte** : Définir des seuils de pic déclenchant une escalade (par ex. 3x le volume normal de mentions négatives en 24 heures)
- **Benchmarking concurrentiel** : Comparer les tendances de sentiment face aux concurrents clés
- **Regroupement thématique** : Regrouper le sentiment par thème (qualité produit, service client, tarification, direction) pour identifier les problèmes systémiques
- **Analyse de tendance** : Rapports de tendance de sentiment hebdomadaires/mensuels pour identifier les évolutions graduelles avant qu'elles ne deviennent des crises

### Playbooks de récupération de réputation

**Plan à 30 jours (stabilisation immédiate)**
- Auditer l'état actuel de réputation sur toutes les plateformes
- Répondre à tous les avis négatifs en attente
- Lancer une campagne de génération d'avis pour diluer le contenu négatif avec des avis positifs frais
- Publier du leadership éclairé ou de la presse positive pour améliorer les résultats de recherche
- Mettre en place l'infrastructure de suivi si elle n'existe pas déjà

**Plan à 60 jours (reconstruction)**
- Exécuter une stratégie de contenu ciblant les résultats de recherche négatifs (SEO pour la réputation)
- Lancer des campagnes de témoignages clients et d'études de cas
- S'engager dans l'action communautaire et les initiatives de responsabilité sociale
- Construire des relations médiatiques pour des placements presse positifs
- Mettre en place un processus systématique de gestion des avis

**Plan à 90 jours (renforcement)**
- Mesurer le changement de sentiment et l'amélioration du profil d'avis
- Établir une cadence continue de suivi et de maintenance de la réputation
- Créer un playbook de communication de crise pour prévenir les futurs dommages de réputation
- Construire un programme de défense de marque avec les clients et employés satisfaits
- Réaliser un audit de réputation pour benchmarker les progrès et fixer des objectifs continus

## Processus

### Réponse aux avis négatifs (cas d'usage le plus courant)

1. **Évaluer l'avis** -- Lire attentivement. Déterminer si la plainte est légitime, exagérée, ou fabriquée. Vérifier si l'auteur de l'avis est un client réel. Évaluer la plateforme et la visibilité de l'avis.
2. **Vérifier les déclencheurs légaux** -- L'avis mentionne-t-il une action en justice, allègue-t-il un comportement illégal, ou implique-t-il un sujet réglementé ? Si oui, faire transiter par le légal avant de répondre.
3. **Rédiger la réponse** -- Suivre le cadre : reconnaître, faire preuve d'empathie, expliquer (brièvement et sans excuses), offrir une résolution, et inviter à une conversation hors ligne. Rester sous 150 mots pour les réponses publiques.
4. **Vérification de ton** -- S'assurer que la réponse est empathique, professionnelle, et non défensive. La lire du point de vue d'un client potentiel voyant à la fois l'avis et la réponse. La réponse doit faire paraître la marque meilleure, pas pire.
5. **Publier et suivre** -- Publier la réponse, la journaliser dans le système de gestion des avis, et fixer un rappel de suivi pour vérifier si le client a répondu ou mis à jour son avis.
6. **Résoudre hors ligne** -- Si le client s'engage, résoudre le problème par communication directe. Documenter la résolution pour l'amélioration des processus internes.
7. **Analyse de motifs** -- Analyser régulièrement les avis négatifs pour les thèmes récurrents. Faire remonter les motifs aux équipes produit, opérations, et service client pour des correctifs systémiques.

### Activation de la réponse de crise

1. **Évaluation de sévérité** -- Classifier la crise comme niveau 1, 2, ou 3 selon la portée, l'implication médiatique, l'impact client, et l'exposition légale.
2. **Assembler l'équipe** -- Activer les parties prenantes appropriées selon le niveau. Établir un canal de communication pour la coordination en temps réel.
3. **Recherche de faits** -- Rassembler toutes les informations disponibles. Ce qui s'est passé, quand, qui est affecté, quelle est l'ampleur, et ce que l'on sait vs ce qui relève de la spéculation.
4. **Déclaration d'attente** -- Publier un bref accusé de réception indiquant que la marque est consciente de la situation et enquête. Cela achète du temps sans laisser un vide de silence.
5. **Réponse détaillée** -- Rédiger la réponse complète abordant ce qui s'est passé, ce que la marque fait à ce sujet, et ce que les parties affectées devraient faire. Adapter le message par groupe de parties prenantes.
6. **Diffusion** -- Publier la réponse via les canaux appropriés (déclaration sur le site web, réseaux sociaux, email aux clients concernés, communiqué de presse si les médias sont impliqués).
7. **Surveiller et mettre à jour** -- Suivre la conversation en temps réel. Mettre à jour les parties prenantes et le public à intervalles réguliers. Corriger la désinformation rapidement.
8. **Revue post-crise** -- Après que la crise s'est apaisée, réaliser une rétrospective. Qu'est-ce qui l'a causée, comment était la réponse, que faut-il changer dans le playbook de crise, et quels changements opérationnels préviennent la récidive.

## Fichiers de référence

- `review-strategy.md` -- Tactiques de génération d'avis, règles de sollicitation spécifiques à la plateforme, modèles de réponse, et workflows de gestion des avis
- `crisis-communication.md` -- Détails du cadre de crise à 3 niveaux, modèles de messages par partie prenante, playbook de chronologie sur 72 heures, et guide de rétrospective post-crise
- `brand-safety.md` -- Cadre de sécurité de marque à 4 couches, paramètres spécifiques à la plateforme, critères d'évaluation des fournisseurs, et checklists d'audit de sécurité de marque
- `sentiment-monitoring.md` -- Recommandations d'outils de suivi, guides de configuration d'alerte, modèles de reporting, et méthodes de benchmarking concurrentiel
- `recovery-playbooks.md` -- Plans de récupération 30/60/90 jours, tactiques SEO pour la réputation, conceptions de programme de défense, et cadres d'audit de réputation
- `review-management-platforms.md` -- Paysage des plateformes d'avis, comparaison d'outils, politiques spécifiques aux plateformes, et guidance de conformité FTC pour la gestion des avis

## Formats de sortie

- **Réponse d'avis** : Texte de réponse prêt à publier adapté à l'avis spécifique, à la plateforme, et à la voix de marque
- **Plan de communication de crise** : Évaluation de sévérité, matrice de parties prenantes, messages par audience, chronologie, et plan de diffusion par canal
- **Audit de sécurité de marque** : Évaluation couche par couche, scores de risque, analyse d'écart, et actions de remédiation priorisées
- **Rapport de sentiment** : Référence de sentiment actuelle, analyse de tendance, comparaison concurrentielle, et ventilation au niveau thématique
- **Plan de récupération de réputation** : Plan d'action 30/60/90 jours avec tactiques spécifiques, parties responsables, métriques de succès, et chronologie
- **Playbook de gestion des avis** : Procédures opérationnelles standard pour la génération d'avis, le suivi, la réponse, et l'escalade

## Cas particuliers

### Crise pendant un lancement de campagne
Si une crise survient pendant un lancement de campagne planifié, mettre en pause immédiatement tout contenu marketing programmé. Le contenu promotionnel diffusé aux côtés d'une réponse de crise paraît déconnecté de la réalité et amplifie le contrecoup. Reprendre les campagnes uniquement après que la crise est résolue et que le sentiment public s'est stabilisé. Prévoir une période tampon -- relancer les promotions trop rapidement peut raviver les critiques.

### Confinement de crise régional
Lorsqu'une crise est localisée à un marché ou une région, tenter le confinement avant qu'elle ne se propage. Répondre dans la langue locale et sur les plateformes locales. Ajuster les calendriers de contenu globaux pour éviter les publications croisées déconnectées de la réalité. Informer immédiatement les équipes régionales même si leurs marchés ne sont pas encore affectés, afin qu'elles puissent se préparer.

### Crise causée par un influenceur vs causée par l'entreprise
Le playbook de réponse diffère selon l'origine de la crise. Pour les problèmes causés par un influenceur (un influenceur dit quelque chose d'offensant tout en étant associé à la marque), distancer la marque, invoquer la clause de moralité, et concentrer le message sur les valeurs de marque. Pour les problèmes causés par l'entreprise (défaut produit, inconduite d'un employé, violation de données), assumer le problème, prendre ses responsabilités, et concentrer le message sur les actions entreprises.

### Portes légales dans les secteurs réglementés
Dans la santé, la finance, et les services juridiques, chaque déclaration publique peut avoir des implications de conformité. Intégrer une revue légale obligatoire dans la chronologie de réponse de crise. Pour les entités couvertes par HIPAA, ne jamais reconnaître une relation patient spécifique dans une réponse d'avis. Pour les services financiers, ne jamais faire de déclarations pouvant être interprétées comme un conseil en investissement ou des garanties. Ces portes légales ajoutent du temps de réponse, donc préparer des modèles de réponse pré-approuvés pour les scénarios courants.

### Vague de critiques sur les réseaux sociaux avec désinformation
Lorsqu'une marque fait face à des critiques virales construites sur des informations inexactes, résister à l'envie de répondre émotionnellement ou de manière répétée. Publier une correction factuelle claire et unique via les canaux officiels. Ne pas s'engager dans des échanges répétés avec des commentateurs individuels. Armer les supporters et les employés avec des éléments de langage exacts. Surveiller l'amplification par les influenceurs ou les médias et répondre directement aux comptes à forte portée diffusant de la désinformation.

### Attaques d'avis frauduleux
Si une entreprise est ciblée par des avis négatifs frauduleux coordonnés (sabotage de concurrent, ancien employé mécontent, harcèlement en ligne), documenter le motif (timing, profils des auteurs, similarités de langage), signaler à la plateforme avec des preuves, et répondre à chaque avis de manière professionnelle (la réponse est destinée aux lecteurs authentiques, pas aux faux auteurs d'avis). Envisager une action en justice pour diffamation démontrable. Accélérer la génération d'avis authentiques pour diluer l'impact.

### Gestion des avis d'employés (Glassdoor)
Les plateformes d'avis d'employés influencent le recrutement et la perception de marque. Répondre aux avis Glassdoor négatifs avec le même professionnalisme que les avis clients. Ne jamais tenter d'identifier des auteurs d'avis anonymes. Traiter les thèmes systémiques dans le contenu de marque employeur. Encourager les employés satisfaits à partager leur expérience de manière authentique (ne jamais imposer ou inciter des avis positifs spécifiques).

## Compétences liées

- **Marketing d'influence et de créateurs** -- Gestion des risques de réputation issus des partenariats et controverses d'influenceurs
- **Publicité payante** -- Paramètres de sécurité de marque dans les plateformes publicitaires et mise en pause des campagnes pendant les crises
- **Moteur de contenu** -- Création de contenu positif pour la récupération de réputation et le leadership éclairé
- **Analytics et insights** -- Analyse des données de sentiment et suivi des métriques de réputation
- **SEO** -- Optimisation des résultats de recherche pour la gestion de la réputation (suppression des résultats négatifs)
- **Canaux émergents** -- Suivi et gestion de la réputation sur les plateformes et canaux communautaires plus récents
</content>

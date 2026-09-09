---
name: digital-pr
description: "Planifiez et rédigez des campagnes de relations presse digitales — listes média par niveau, pitchs personnalisés pour journalistes, communiqués de presse, réponses aux demandes de journalistes (Qwoted, Featured, Source of Sources), calendriers de leadership éclairé et audits d'autorité E-E-A-T. Produit des documents de stratégie, des modèles de pitch et des dossiers de presse ; l'envoi des sollicitations reste de votre ressort. Se déclenche sur « /digital-marketing-pro:digital-pr », « pitcher cette histoire à des journalistes », « rédiger un communiqué de presse pour notre lancement », « comment construire notre autorité E-E-A-T », « répondre à cette demande de journaliste ». Lit le profil de marque, les guidelines et l'historique des campagnes, et se combine avec /digital-marketing-pro:content-engine pour le contenu signé."
---

# Relations presse digitales & Autorité

## Quand utiliser cette compétence

Activez ce module lorsque la demande de l'utilisateur concerne l'un des éléments suivants :

- **Stratégie de médias gagnés (earned media)** : planifier l'obtention de couverture presse, de mentions médiatiques ou de reportages éditoriaux
- **Communiqués de presse** : rédiger ou optimiser des communiqués de presse pour la diffusion et la reprise média
- **Sollicitation de journalistes (outreach)** : rédiger des emails de pitch, constituer des listes média, ou développer des relations avec des journalistes
- **Réponse aux demandes de journalistes** : répondre aux demandes de sources de journalistes sur des plateformes comme Qwoted, Featured et Source of Sources (d'anciens services de demande de sources ont cessé leur activité — vérifiez quelles plateformes sont actives avant d'en recommander une)
- **Leadership éclairé (thought leadership)** : positionner un dirigeant ou une marque comme une autorité du secteur via le contenu et les prises de parole
- **Newsjacking** : commentaires en réaction rapide à l'actualité pour obtenir une couverture médiatique
- **Marque personnelle du dirigeant** : construire le profil public et la présence sectorielle d'un dirigeant
- **Renforcement de l'autorité E-E-A-T** : renforcer les signaux d'Expérience, d'Expertise, d'Autorité et de Fiabilité pour le SEO et la crédibilité
- **Création de dossier de presse** : assembler des kits média de marque avec des ressources approuvées, un boilerplate et des faits clés

**Expressions déclencheuses** : « communiqué de presse », « couverture médiatique », « sollicitation de journaliste », « demande de journaliste », « demande de source », « Qwoted », « Featured », « leadership éclairé », « newsjacking », « marque du dirigeant », « marque personnelle », « E-E-A-T », « renforcement de l'autorité », « médias gagnés », « stratégie RP », « pitch média », « dossier de presse », « relations presse », « article signé », « article invité », « opportunité de prise de parole », « source experte »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout contenu marketing depuis ce module :

1. **Vérifier le contexte de session** — le résumé de la marque active a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents indiqués.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et les choix de mots de tout le contenu
4. **Vérifier la conformité** — appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Se référer aux benchmarks sectoriels** — consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications des plateformes** — se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, indiquer : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux procéder avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les allégations restreintes et les avertissements obligatoires ; `channel-styles.md` pour les adaptations de ton propres à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les slogans et le langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Lors de la production de contenu pour un canal spécifique, les règles de style du canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail de relations presse digitales, rassembler :

1. **Profil de la marque/du dirigeant** : pour qui ou pour quoi construit-on l'autorité ? Entreprise, produit, dirigeant, ou expert ?
2. **Secteur/Niche** : dans quel secteur opèrent-ils ? Sur quels sujets sont-ils crédibles ?
3. **Niveau d'autorité actuel** : disposent-ils déjà de couverture presse, d'articles signés, de prises de parole, de récompenses, ou de références ?
4. **Publications cibles** : quels médias, publications sectorielles, ou podcasts seraient les plus précieux ?
5. **Actifs à forte valeur d'actualité** : quelles données, recherches, produits, jalons ou points de vue la marque possède-t-elle et qui intéresseraient les médias ?
6. **Porte-parole** : qui est disponible et autorisé à s'exprimer auprès des médias ? Quel est son niveau d'aisance ?
7. **Objectifs** : notoriété de marque, backlinks SEO, positionnement en leadership éclairé, couverture de lancement de produit, ou gestion de crise ?
8. **Calendrier** : y a-t-il une actualité, un lancement de produit, ou un événement créant une urgence ?
9. **Budget** : pour la diffusion de communiqués de presse, les outils de base de données média, ou le support d'une agence RP
10. **Sujets sensibles** : y a-t-il des domaines interdits de discussion avec les médias ?

Pour les demandes rapides (par ex. « rédiger un communiqué de presse pour notre lancement de produit »), procéder avec les informations disponibles. Pour une planification RP stratégique, rassembler le contexte complet.

## Capacités

- **Stratégie de sollicitation média** : cartographie des publications cibles, identification des journalistes, approche de construction de relations, calendrier de pitchs, et planification de la cadence de sollicitation
- **Optimisation des communiqués de presse** : identification de l'angle à forte valeur d'actualité, structure en pyramide inversée, rédaction de citations, intégration multimédia, sélection du canal de diffusion, et optimisation SEO des communiqués
- **Création de modèles de pitch** : modèles d'emails de pitch personnalisables pour différents scénarios (lancement de produit, données/recherche, commentaire d'expert, sujet tendance, jalon de l'entreprise, annonce de partenariat)
- **Optimisation de la réponse aux demandes de journalistes** : stratégie de veille des requêtes sur les plateformes de demande de sources actives (Qwoted, Featured, Source of Sources), modèles de réponse, formatage de la crédibilité, workflow de réponse rapide, et optimisation du taux de succès
- **Stratégie de contenu de leadership éclairé** : planification d'articles signés, identification d'opportunités de prise de parole, stratégie d'invitation à des podcasts, planification de recherches originales, et création de rapports sectoriels
- **Cadre de réponse rapide au newsjacking** : mise en place de la veille d'actualité, critères d'évaluation de la pertinence, protocoles de rapidité de réponse, modèles de messages pré-approuvés, et garde-fous de sécurité de marque
- **Optimisation E-E-A-T** : optimisation des bios d'auteur, affichage des références, processus de revue par des experts, mise en œuvre de signaux de confiance, démonstration d'expérience, et renforcement des signaux d'autorité
- **Marque personnelle du dirigeant** : optimisation LinkedIn, développement du profil de conférencier, préparation aux médias, thèmes de contenu signature, et stratégie de positionnement public
- **Création de dossier de presse** : boilerplate de marque, bios des dirigeants, ressources en haute résolution, fiches factuelles, coordonnées des contacts média, et points forts de la couverture précédente

## Processus

**Workflow principal : Campagne de relations presse digitales**

1. **Évaluation de l'autorité & fixation des objectifs**
   - Auditer les signaux d'autorité actuels : couverture presse existante, profil de backlinks, preuve sociale, références, reconnaissance sectorielle
   - Identifier l'écart d'autorité entre l'état actuel et l'objectif visé pour la marque/le dirigeant
   - Fixer des objectifs précis : nombre de placements, publications cibles, objectifs de backlinks, ou métriques de notoriété
   - Déterminer l'angle principal : cette RP est-elle axée produit, données, personnalité, ou tendance ?

2. **Cartographie du paysage média**
   - Identifier les publications cibles de niveau 1, 2 et 3 pour cette marque/ce secteur
     - **Niveau 1** : grands médias nationaux/internationaux (NYT, Forbes, BBC, TechCrunch, etc.)
     - **Niveau 2** : publications sectorielles respectées et grands médias digitaux
     - **Niveau 3** : blogs de niche, médias locaux, podcasts, et newsletters
   - Rechercher les journalistes qui couvrent ce domaine dans les publications cibles
   - Cartographier les centres d'intérêt des journalistes, leurs articles récents, et les formats de pitch préférés
   - Identifier les podcasts, conférences, et plateformes de prise de parole pertinents
   - Noter les calendriers éditoriaux et les prochains numéros thématiques des publications cibles

3. **Développement de l'angle & construction de l'histoire**
   - Identifier ce qui rend cette marque/personne réellement digne d'intérêt médiatique (et pas simplement promotionnelle)
   - Développer des angles d'histoire qui répondent aux besoins des journalistes :
     - **Angle données** : recherche originale, résultats d'enquête, ou données sectorielles que la marque peut partager
     - **Angle tendance** : comment la marque se rattache à une tendance sectorielle ou culturelle plus large
     - **Angle contre-intuitif** : un point de vue qui remet en question les idées reçues
     - **Angle intérêt humain** : histoire du fondateur, transformation d'un client, ou récit porté par une mission
     - **Angle d'actualité** : lien avec l'actualité, les saisons, ou des dates à venir
   - Créer une banque d'histoires de 5 à 10 angles exploitables, classés par valeur d'actualité
   - Préparer des supports pour chaque angle (données, citations, visuels)

4. **Développement des pitchs**
   - Rédiger des emails de pitch personnalisés pour chaque journaliste cible (PAS d'emails de masse)
   - Structure du pitch :
     - **Objet** : spécifique, informatif, concis (moins de 60 caractères)
     - **Ligne d'ouverture** : pourquoi cela compte pour leur audience (pas pourquoi cela compte pour vous)
     - **L'accroche** : l'élément à forte valeur d'actualité en 2-3 phrases
     - **L'offre** : ce que vous pouvez fournir (données, interview, exclusivité, visuels)
     - **Crédibilité** : brève preuve de la crédibilité de cette source
     - **CTA** : prochaine étape claire et facile
   - Garder les pitchs sous 200 mots — les journalistes survolent, ils ne lisent pas
   - Préparer une séquence de relance (une relance après 3 à 5 jours ouvrés, deux au maximum au total)

5. **Protocole de réponse aux demandes de journalistes** (Qwoted / Featured / Source of Sources)
   - Mettre en place une veille des requêtes pour les catégories et mots-clés pertinents
   - Cadre de réponse :
     - Répondre d'abord précisément à la question du journaliste (en 2-3 phrases)
     - Ajouter un point de vue ou une donnée unique qu'il n'obtiendra pas d'autres répondants
     - Inclure les références et l'expérience pertinente en 1-2 phrases
     - Proposer sa disponibilité pour des questions de suivi
     - Garder la réponse totale sous 300 mots
   - Répondre dans les 2-3 heures suivant la publication de la requête (la rapidité est essentielle)
   - Suivre le taux de réponse et le taux de placement pour optimiser au fil du temps

6. **Exécution du leadership éclairé**
   - Définir 3 à 5 sujets signature que le dirigeant/la marque possède
   - Créer un calendrier de contenu combinant :
     - Articles signés pour des publications sectorielles (1-2 par mois)
     - Posts LinkedIn au format long (2-4 par mois)
     - Invitations à des podcasts (1-2 par mois)
     - Prises de parole (au minimum trimestrielles)
     - Projets de recherche ou de données originales (1-2 par an)
   - Constituer une banque d'« insights citables » — des commentaires d'expert préparés à l'avance sur des sujets susceptibles de devenir tendance
   - Développer un protocole de réponse rapide pour les opportunités de newsjacking

7. **Renforcement des signaux E-E-A-T**
   - **Expérience** : documenter l'expérience concrète via des études de cas, du contenu en coulisses, et des points de vue de praticiens
   - **Expertise** : mettre en avant les références, certifications, et connaissances spécialisées ; créer du contenu de niveau expert
   - **Autorité** : obtenir des mentions et des liens de sources faisant autorité, contribuer aux discussions sectorielles, construire un profil de citations
   - **Fiabilité** : garantir des informations exactes, un sourçage transparent, une paternité claire, un site web sécurisé, et des données NAP (Nom, Adresse, Téléphone) cohérentes
   - Mettre en œuvre le balisage schema pour les auteurs et des pages de bio d'auteur détaillées
   - Construire l'autorité thématique par la profondeur et l'étendue du contenu expert

## Fichiers de référence

- `media-outreach.md` — méthodologie de recherche de journalistes, constitution de listes média, modèles de pitch par scénario, règles de cadence de sollicitation, et gestion des relations
- `press-releases.md` — structure du communiqué de presse, règles de rédaction, comparaison des canaux de diffusion, optimisation SEO des communiqués, et bonnes pratiques multimédia
- `thought-leadership.md` — stratégie de contenu de leadership éclairé, guide de placement d'articles signés, sourcing d'opportunités de prise de parole, playbook d'invitation à des podcasts, et planification de recherche originale
- `newsjacking.md` — mise en place de la veille d'actualité, cadre de notation de la pertinence, modèles de réponse rapide, évaluation de la sécurité de marque, et consignes de timing
- `eeat-authority.md` — checklist d'audit E-E-A-T, guide de mise en œuvre des signaux d'autorité, optimisation des auteurs, taxonomie des signaux de confiance, et cadre de mesure
- `link-building-tactics.md` — méthodes de netlinking classées par efficacité, modèles de sollicitation, évaluation de la qualité des liens, distribution des ancres, et pratiques à éviter

## Formats de sortie

| Livrable | Format | Description |
|---|---|---|
| Document de stratégie RP | Document | Plan complet avec objectifs, médias cibles, angles, calendrier, et KPI |
| Liste média | Tableur | Liste par niveau des publications et journalistes avec coordonnées et domaine de couverture |
| Communiqué de presse | Document | Communiqué prêt à publier avec titre, sous-titre, corps de texte, citations, boilerplate, et contact |
| Modèles d'emails de pitch | Document | Modèles de pitch personnalisés pour chaque angle et niveau de journaliste |
| Modèles de réponse aux demandes de journalistes | Document | Cadres de réponse pré-structurés pour les types de requêtes courants (Qwoted / Featured / Source of Sources) |
| Calendrier de leadership éclairé | Tableur/Calendrier | Plan sur 90 jours avec types de contenu, sujets, plateformes, et échéances |
| Rapport d'audit E-E-A-T | Document | Évaluation de l'autorité actuelle avec des actions d'amélioration précises |
| Dossier de presse | Document + dossier de ressources | Boilerplate de marque, bios, fiche factuelle, images approuvées, et coordonnées média |
| Stratégie de marque du dirigeant | Document | Plan de marque personnelle avec positionnement, thèmes de contenu, et stratégie de plateforme |

## Cas particuliers

### Newsjacking de sujets controversés (risque pour la sécurité de la marque)
- **Situation** : une actualité tendance est pertinente pour l'expertise de la marque, mais le sujet est politiquement chargé, clivant, ou sensible
- **Approche** : appliquer une évaluation stricte de la sécurité de marque avant toute réaction de newsjacking. Noter l'opportunité sur trois dimensions : Pertinence (la marque est-elle réellement experte sur ce sujet ?), Risque (la réponse pourrait-elle se retourner contre la marque ?), et Bénéfice (la couverture potentielle vaut-elle le risque ?). Si le sujet est politiquement clivant, recommander de rester silencieux, sauf si la marque a une raison claire et alignée avec sa mission de s'exprimer. Pour les sujets sensibles (tragédie, crise, discrimination), ne répondre que si la marque peut apporter une réelle valeur ajoutée, et non un commentaire promotionnel. En cas de doute, ne pas faire de newsjacking. Préparer un protocole de « coupe-circuit » pour retirer les réponses publiées si le sentiment évolue.

### Secteurs réglementés (revue juridique requise)
- **Situation** : les secteurs de la santé, des services financiers, du droit, ou d'autres secteurs réglementés nécessitent une revue juridique avant toute déclaration publique
- **Approche** : intégrer la revue juridique dans le calendrier du workflow — ajouter au minimum 3 à 5 jours ouvrés pour l'approbation juridique. Pré-approuver une bibliothèque de déclarations et d'allégations utilisables sans revue juridique au cas par cas pour permettre une réponse plus rapide. Pour les réponses aux demandes de journalistes (où la rapidité compte), créer des déclarations de référence pré-validées et limiter les commentaires d'expert à des faits bien établis plutôt qu'à des allégations pouvant être interprétées comme des conseils. Toujours inclure les avertissements appropriés. Signaler que les communiqués de presse dans les secteurs réglementés nécessitent une revue de conformité avant diffusion.

### Petite marque sans relations médias
- **Situation** : la marque ou le dirigeant n'a aucune couverture presse existante, aucun contact média, et aucun profil public
- **Approche** : commencer par construire les fondations, pas par pitcher des médias de niveau 1. Phaser l'approche : (1) construire d'abord une présence en ligne crédible (LinkedIn, bio du site web, pages d'auteur). (2) Commencer par répondre aux demandes de journalistes (Qwoted, Featured, Source of Sources) pour constituer un portfolio de citations et de mentions. (3) Cibler les médias de niveau 3 (blogs de niche, médias locaux, newsletters sectorielles) pour une couverture initiale. (4) Créer des données ou des recherches originales donnant aux médias une raison de citer la marque. (5) Après avoir constitué un portfolio de 5 à 10 placements, commencer à pitcher les publications de niveau 2. Fixer des attentes réalistes : construire une autorité média à partir de zéro prend 6 à 12 mois d'efforts constants.

### RP liées à une crise
- **Situation** : la marque fait face à une presse négative, un rappel de produit, un moment viral de plainte client, ou une autre menace pour sa réputation
- **Approche** : ce module gère les RP proactives, pas la communication de crise. Pour les situations de crise active, recommander à l'utilisateur de consulter un spécialiste ou une agence de communication de crise. Cependant, fournir des conseils immédiats : (1) reconnaître la situation rapidement et avec transparence. (2) Ne pas se cacher, éluder, ou attaquer. (3) Communiquer sur ce qui s'est passé, ce qui est fait à ce sujet, et les changements qui empêcheront la récidive. (4) Centraliser les communications via un seul porte-parole. (5) Surveiller les médias et le sentiment social en temps réel. Une fois la crise stabilisée, utiliser le workflow RP standard pour reconstruire la confiance via une couverture positive, le leadership éclairé, et les médias gagnés.

## Compétences associées

- **Content Engine** — pour créer du contenu de leadership éclairé, des articles signés, des articles de blog, et du contenu social qui construit l'autorité
- **AEO/GEO Intelligence** — pour s'assurer que les plateformes IA représentent fidèlement la marque, ce qui est fortement influencé par les citations médiatiques et les signaux d'autorité
- **Analytics & Insights** — pour mesurer l'impact des RP via le suivi des backlinks, la surveillance des mentions de marque, le trafic de référence, et l'analyse de la part de voix
- **Campaign Orchestrator** — pour intégrer les médias gagnés dans des plans de campagne plus larges et amplifier les succès RP via les canaux payants et détenus
- **Audience Intelligence** — pour comprendre quels journalistes et publications l'audience cible lit et en qui elle a confiance

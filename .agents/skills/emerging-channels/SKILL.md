---
name: emerging-channels
description: "Évaluez et planifiez les canaux marketing émergents — recherche vocale et visuelle, commerce conversationnel et social, communautés, podcasts, et vidéo — en produisant des rapports d'évaluation de canal avec des plans pilotes sur 90 jours, des checklists de mise en place, et des recommandations go/no-go. Conseille et planifie ; ne configure pas les plateformes à votre place. Se déclenche sur « /digital-marketing-pro:emerging-channels », « devrions-nous ouvrir une TikTok Shop », « la recherche vocale vaut-elle le coup d'être optimisée », « planifie le lancement d'une communauté sur Discord », « évalue la publicité podcast pour nous ». Lit le profil de marque et les benchmarks sectoriels, et valide tout chiffre en dollars via le livre de référence avant qu'il n'entre dans un plan."
---

# Canaux émergents

> **Provenance des benchmarks (au 2026-08) :** les chiffres en dollars présents dans ce document sont des estimations de planification, pas des cotations — les taux de marché et d'enchères évoluent en permanence. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, l'actualiser en direct (les tableaux de bord de plateforme et les rapports publiés récents valent mieux que la mémoire) et l'enregistrer avec `python scripts/benchmark_book.py --action record ... --source <url>` ; le citer ensuite depuis le livre de référence (`--action quote`). Ne jamais présenter un chiffre non validé comme un fait de marché actuel.

## Quand utiliser cette compétence

Activez cette compétence lorsque la demande de l'utilisateur concerne l'un des éléments suivants :

- Optimiser le contenu pour la recherche vocale (Alexa, Google Assistant, Siri, enceintes connectées)
- Se préparer à ou exploiter la recherche visuelle (Google Lens, Pinterest Lens, recherche visuelle Amazon)
- Construire des flux de commerce conversationnel (WhatsApp Business, Facebook Messenger, tunnels de chatbot, marketing SMS)
- Mettre en place ou optimiser le commerce social (Instagram Shopping, TikTok Shop, Pinterest Shopping, YouTube Shopping)
- Construire, développer, ou gérer des communautés en ligne (Discord, Slack, Circle, groupes Facebook, Reddit, forums)
- Planifier une stratégie de marketing podcast (podcasts de marque, publicité podcast, apparitions en invité, SEO podcast)
- Développer une stratégie de marketing vidéo sur différents formats et plateformes (format court, format moyen, format long, en direct)
- Faire du marketing sur des plateformes et canaux plus récents ou sous-exploités
- Évaluer si un canal émergent mérite un investissement pour une entreprise donnée
- Comprendre les fonctionnalités de commerce spécifiques à chaque plateforme et le contenu shoppable
- Concevoir des conversations de chatbot et des tunnels de messagerie automatisés
- Construire des applications vocales (Alexa Skills) ou faire apparaître du contenu de marque dans les expériences actuelles Google Assistant/Gemini
- Explorer les plateformes de messagerie internationales (WeChat, LINE, KakaoTalk, Telegram) pour le commerce

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

Avant l'exécution, rassembler les informations suivantes auprès de l'utilisateur (demander si non fournies) :

- **Type d'entreprise** : B2B, B2C, D2C, entreprise locale, marketplace, SaaS
- **Audience cible** : démographie, comportement numérique, préférences de plateforme, et habitudes d'achat
- **Canaux actuels** : quels canaux marketing sont déjà actifs et performants
- **Objectifs** : notoriété, engagement, génération de leads, ventes directes, construction de communauté, ou distribution de contenu
- **Budget et ressources** : investissement disponible pour l'expérimentation de nouveaux canaux, capacité de production de contenu, et disponibilité de l'équipe
- **Produit/service** : ce qui est vendu et sa complexité d'achat (achat impulsif vs achat réfléchi)
- **Géographie** : marchés cibles, car l'adoption des canaux varie fortement selon les régions
- **Stack technique** : plateforme e-commerce actuelle, CRM, automatisation marketing, et capacités d'intégration
- **Tolérance au risque** : volonté d'investir dans des canaux non éprouvés vs préférence pour des canaux établis avec un ROI plus clair
- **Calendrier** : court terme (test) vs long terme (construction d'une présence durable)

## Capacités

### Optimisation pour la recherche vocale
- **Analyse des schémas de requête** : les requêtes vocales sont plus longues, plus conversationnelles, et davantage basées sur des questions que les requêtes tapées. Optimiser pour des schémas de langage naturel (« quel est le meilleur restaurant italien près de moi » vs « restaurant italien Paris »)
- **Structure du contenu pour la voix** : optimisation des extraits en vedette (featured snippets), balisage schema FAQ, paragraphes de réponse concis (40-60 mots pour les réponses orales de Google), et ciblage de la position zéro
- **Balisage schema « speakable »** : mise en œuvre de données structurées identifiant les sections de contenu adaptées à la lecture texte-vers-parole par les assistants vocaux
- **Recherche vocale locale** : optimisation des requêtes « près de moi », exhaustivité de la fiche Google Business Profile, balisage schema local, et volume/fraîcheur des avis
- **Commerce vocal** : tunnels d'achat initiés par la voix, recommande de commande vocale, promotions exclusives à la voix, et intégration avec les achats Amazon Alexa
- **Développement d'applications vocales** : quand construire des Alexa Skills, cas d'usage (utilitaires de marque, diffusion de contenu, service client), et optimisation de la découvrabilité. Google a mis fin à sa plateforme conversational-actions en juin 2023 — atteindre les utilisateurs de Google Assistant/Gemini via du contenu web bien structuré et du balisage schema plutôt que par une application vocale autonome

### Recherche visuelle
- **Optimisation des images pour la recherche** : noms de fichiers descriptifs, texte alternatif complet, images de haute qualité sous plusieurs angles, et dimensionnement d'image cohérent
- **Optimisation Google Lens** : images produit facilement identifiables par reconnaissance visuelle, éléments de design produit uniques, et balisage schema pour les produits
- **Stratégie Pinterest Lens** : imagerie d'ambiance, épingles shoppables, similarité visuelle avec le contenu Pinterest tendance, et SEO Pinterest
- **Données structurées pour la recherche visuelle** : schema produit, schema image, et schema vidéo qui aident les moteurs de recherche à comprendre le contenu visuel
- **Commerce par recherche visuelle** : activer la « recherche par photo » sur les sites e-commerce, recommandations par similarité visuelle, et fonctionnalités d'essayage en réalité augmentée
- **Recherche visuelle spécifique à chaque plateforme** : recherche visuelle Amazon, ASOS Style Match, et capacités de recherche visuelle propres à chaque enseigne

### Commerce conversationnel
- **WhatsApp Business** : mise en place du catalogue, messages d'accueil automatisés, réponses rapides, listes de diffusion, WhatsApp Business API pour la montée en charge, et publicités click-to-WhatsApp
- **Tunnels de chatbot** : bots de qualification de leads, bots de recommandation produit, bots de support client, bots de prise de rendez-vous, et bots de récupération de panier
- **Conception de conversation** : rédiger des scripts de chatbot naturels, gérer les cas limites avec élégance, savoir quand escalader vers un agent humain, et maintenir la voix de marque dans les interactions automatisées
- **Marketing SMS** : conformité de l'opt-in (TCPA), optimisation de la fréquence des messages, messages promotionnels vs transactionnels, segmentation, et conversations SMS bidirectionnelles
- **Marketing Messenger** : bots Facebook Messenger, messages sponsorisés, notifications récurrentes, et intégration avec les campagnes publicitaires Meta
- **Plateformes de messagerie internationales** : comptes officiels et Mini Programs WeChat (Chine), comptes officiels LINE (Japon/Asie du Sud-Est), canaux KakaoTalk (Corée), bots Telegram (Europe de l'Est/Moyen-Orient)
- **IA conversationnelle** : utiliser des LLM pour des interactions de chat plus naturelles, des modèles de support hybrides IA-humain, et entraîner l'IA conversationnelle sur les bases de connaissances de la marque

### Commerce social
- **Instagram Shopping** : mise en place de la boutique, tag produit dans les posts/Stories/Reels, live shopping, Shopping from Creators, et optimisation du paiement
- **TikTok Shop** : référencement de produits, marketplace d'affiliation, événements de live shopping, vidéos shoppables, et intégration TikTok Shop Ads
- **Pinterest Shopping** : épingles produit, intégration de catalogue, Shopping Ads, et pipeline de découverte visuelle vers l'achat de Pinterest
- **YouTube Shopping** : étagères produit, tags shopping dans les vidéos, live shopping, et intégration shopping dans les Shorts
- **Optimisation de la vitrine sociale** : descriptions de produit adaptées au contexte social (différentes du site web), imagerie social-first, stratégie de prix pour les acheteurs sociaux
- **Live shopping** : sélection de la plateforme, préparation de l'animateur, exigences de production, tactiques d'engagement, et optimisation de la conversion pour la vente en temps réel
- **Stratégie de contenu shoppable** : intégrer le commerce dans le contenu organique sans transformer chaque post en argumentaire de vente ; consignes sur le ratio éditorial/commerce

### Construction de communauté
- **Sélection de la plateforme** : Discord (temps réel, démographie plus jeune, gaming/tech), Slack (professionnel, B2B), Circle (formation/adhésion), groupes Facebook (démographie large, onboarding facile), Reddit (centres d'intérêt de niche, axé sur l'authenticité), forums de marque en propre (contrôle total, avantages SEO)
- **Métriques de santé de la communauté** : membres actifs quotidiens/hebdomadaires/mensuels, fréquence des publications, taux de réponse, interactions membre-à-membre (pas seulement marque-à-membre), taux de rétention, et NPS
- **Volant de croissance (flywheel)** : le contenu attire des membres, les membres créent du contenu, le contenu attire davantage de membres. Concevoir le contenu initial et les boucles d'engagement qui amorcent ce volant
- **Stratégie de modération** : consignes communautaires, structure de l'équipe de modération (modérateurs rémunérés, modérateurs bénévoles, modération IA), procédures d'escalade, et transparence dans l'application des règles
- **Croissance portée par la communauté** : utiliser la communauté comme canal d'acquisition en haut de tunnel, les membres de la communauté comme bêta-testeurs et conseillers produit, et le contenu communautaire comme contenu marketing
- **Monétisation** : quand et comment monétiser (niveaux premium, événements, formations, marketplace), sans détruire la culture communautaire
- **Rôle du community manager** : compétences requises, disponibilité, niveau d'autonomie, et intégration avec les équipes marketing et produit

### Marketing podcast
- **Stratégie de podcast de marque** : quand créer un podcast de marque (leadership éclairé, construction d'audience, éducation client), sélection du format (interview, narratif, commentaire solo, panel), et niveaux de qualité de production
- **Publicité podcast** : publicités lues par l'animateur vs programmatiques, benchmarks CPM (18-50 $ pour un mid-roll lu par l'animateur), planification de fréquence et de portée, et méthodes d'attribution (URL vanity, codes promo, pixel)
- **Stratégie d'apparition en invité** : identifier les podcasts cibles, rédiger des pitchs, préparer des points de discussion, et maximiser chaque apparition avec de la promotion sociale et des backlinks
- **SEO podcast** : titres d'émission, titres d'épisode, optimisation des notes d'épisode, publication de transcriptions, et distribution multi-plateforme (Apple, Spotify, YouTube, Google)
- **Pipeline podcast vers contenu** : recycler les épisodes de podcast en articles de blog, extraits sociaux, contenu email, et extraits vidéo pour maximiser le ROI de chaque enregistrement
- **Mesure et attribution** : téléchargements, écoutes, taux de complétion, croissance des abonnés, et lien entre l'exposition podcast et le trafic web/les conversions

### Marketing vidéo
- **Stratégie format court (moins de 60 secondes)** : TikTok, Instagram Reels, YouTube Shorts. Accroche dans les 1-3 premières secondes, esthétique native à la plateforme, audios/formats tendance, cadence de publication élevée (3-7x par semaine)
- **Stratégie format moyen (1-10 minutes)** : Instagram, Facebook, LinkedIn, TikTok. Contenu éducatif, démos produit, coulisses, et contenu narratif
- **Stratégie format long (10+ minutes)** : YouTube, webinaires, contenu de formation. Tutoriels approfondis, interviews, documentaires, et leadership éclairé. L'algorithme YouTube favorise le temps de visionnage, ce qui avantage le contenu plus long lorsque la rétention est maintenue
- **Niveaux de production** : lo-fi (smartphone, lumière naturelle, montage minimal — sensation authentique), mid-fi (éclairage basique, micro externe, graphismes simples), et hi-fi (production professionnelle, scriptée, studio)
- **SEO vidéo** : optimisation du titre et de la description YouTube, tags, miniatures (optimisation du CTR), chapitres, cartes, écrans de fin, et stratégie d'intégration pour le SEO du site web
- **Vidéo en direct** : sélection de la plateforme (YouTube Live, Instagram Live, TikTok Live, LinkedIn Live, Twitch), checklist de préparation, tactiques d'engagement, et recyclage du contenu en direct
- **Distribution vidéo** : téléversements natifs à la plateforme vs republication croisée, optimisation spécifique à chaque plateforme (formats d'image, sous-titres, durées), et planification de la distribution

## Processus

### Évaluation d'un nouveau canal (cas d'usage le plus courant)

1. **Validation de l'audience** — confirmer que l'audience cible est active sur le canal en question. Vérifier les données démographiques de la plateforme, les données d'usage, et la présence des concurrents. Ne pas investir dans un canal parce qu'il est tendance ; investir parce que l'audience s'y trouve.
2. **Paysage concurrentiel** — analyser ce que font les concurrents et les marques adjacentes sur le canal. Identifier les écarts et les opportunités. Déterminer s'il existe un avantage de premier arrivant ou si le canal est déjà saturé.
3. **Évaluation des ressources** — déterminer l'investissement minimum viable (temps, budget, production de contenu) requis pour tester le canal de façon significative. La plupart des canaux émergents nécessitent un effort constant sur 3 à 6 mois avant de fournir des données fiables.
4. **Conception du pilote** — créer un plan pilote sur 90 jours avec une cadence de contenu précise, une stratégie d'engagement, et des métriques de succès. Définir à quoi ressemble le « succès » à la fin du pilote pour prendre une décision continuer/arrêter/passer à l'échelle.
5. **Stratégie de contenu** — développer du contenu spécifique au canal qui respecte les normes de la plateforme et les attentes des utilisateurs. Recycler le contenu existant lorsque possible, mais toujours l'adapter au format de la plateforme plutôt que de republier le contenu identique.
6. **Cadre de mesure** — mettre en place le suivi des indicateurs avancés (abonnés, engagement, portée) et des indicateurs retardés (trafic web, leads, ventes) attribués au canal.
7. **Exécuter et apprendre** — mener le pilote, documenter ce qui fonctionne et ce qui ne fonctionne pas, ajuster la stratégie selon les données, et prendre la décision continuer/arrêter/passer à l'échelle à la fin de la période pilote.
8. **Passer à l'échelle ou arrêter** — si le pilote réussit, construire une stratégie durable avec des ressources accrues. S'il échoue, documenter les enseignements, arrêter l'effort, et rediriger les ressources.

### Mise en place du commerce social

1. **Sélection de la plateforme** — choisir la ou les plateformes de commerce social en fonction de la présence de l'audience, du type de produit, et des exigences techniques. Les produits visuels prospèrent sur Instagram et Pinterest. Les produits portés par les tendances prospèrent sur TikTok. Les achats réfléchis bénéficient de YouTube.
2. **Mise en place de la vitrine** — configurer les fonctionnalités shopping de la plateforme : téléversement du catalogue produit, organisation des collections, politiques de livraison et de retour, et intégration des paiements.
3. **Optimisation du contenu produit** — créer des fiches produit optimisées pour le contexte social. Les descriptions produit sociales doivent être plus courtes, plus conversationnelles, et axées sur les bénéfices par rapport aux fiches du site web. Les images produit doivent correspondre au style visuel de la plateforme.
4. **Stratégie de contenu shoppable** — planifier le calendrier de contenu avec un mélange de contenu shoppable et non-shoppable. Viser un ratio où pas plus de 30-40 % du contenu est directement shoppable pour éviter la lassitude de l'audience.
5. **Intégration du live shopping** — le cas échéant, planifier des événements de live shopping avec animateurs, produits, et cadence promotionnelle. Programmer pendant les heures de pointe d'activité de l'audience.
6. **Mise en place de la mesure** — configurer les analytics de la plateforme, le suivi UTM pour l'attribution externe, et le suivi du chiffre d'affaires par plateforme et type de contenu.

## Fichiers de référence

- `voice-search.md` — schémas de requête vocale, tactiques d'optimisation de contenu, mise en œuvre du schema speakable, et guides d'intégration du commerce vocal
- `visual-search.md` — checklists d'optimisation d'image, guides des plateformes de recherche visuelle, modèles de données structurées, et mise en œuvre du commerce visuel
- `conversational-commerce.md` — mise en place de WhatsApp Business, cadres de conception de chatbot, guides de conformité SMS, et modèles de flux de conversation
- `social-commerce.md` — guides de mise en place plateforme par plateforme, optimisation des fiches produit, playbooks de live shopping, et bonnes pratiques de vitrine sociale
- `community-building.md` — matrices de sélection de plateforme, playbooks de lancement de communauté, cadres de modération, tableaux de bord de métriques de santé, et stratégies de croissance
- `podcast-marketing.md` — guide de lancement de podcast de marque, benchmarks de tarifs publicitaires, modèles de pitch pour invités, et checklists de SEO podcast
- `video-marketing.md` — guides format par plateforme, spécifications des niveaux de production, checklists de SEO vidéo, et cadres de stratégie de distribution
- `web3-decentralized.md` — marketing basé sur la blockchain, programmes de fidélité tokenisés, campagnes d'utilité NFT, plateformes sociales décentralisées, marketing DAO, et cadres de mesure Web3
- `ai-marketing-tools.md` — paysage des outils marketing IA, sélection de cas d'usage, intégration au workflow, exigences de divulgation, et assurance qualité du contenu IA

## Formats de sortie

- **Rapport d'évaluation de canal** : évaluation de l'adéquation avec l'audience, analyse concurrentielle, besoins en ressources, plan pilote sur 90 jours, métriques de succès, et recommandation go/no-go
- **Plan de commerce social** : justification du choix de plateforme, checklist de mise en place de la vitrine, stratégie de contenu, calendrier de live shopping, et projections de chiffre d'affaires
- **Flux de commerce conversationnel** : carte de conversation du chatbot, modèles de messages, règles d'escalade, et spécifications d'intégration
- **Plan de lancement de communauté** : sélection de plateforme, calendrier de lancement, plan de contenu initial, consignes de modération, jalons de croissance, et tableau de bord des métriques de santé
- **Stratégie podcast** : recommandation de format, calendrier de contenu, spécifications de production, plan de distribution, et cadre de mesure
- **Plan de contenu vidéo** : calendrier de contenu spécifique à chaque plateforme, spécifications de production par format, checklist d'optimisation SEO, et calendrier de distribution
- **Audit recherche vocale/visuelle** : statut d'optimisation actuel, analyse des écarts, feuille de route de mise en œuvre, et impact attendu

## Cas particuliers

### Secteurs restreints sur les plateformes
Le cannabis, le CBD, les armes à feu, les produits pour adultes, et certains produits pharmaceutiques ne peuvent pas faire de publicité sur la plupart des plateformes et font face à des restrictions sur les fonctionnalités de commerce social. Pour ces secteurs, se concentrer sur les canaux détenus (site web, email, SMS en conformité), la construction de communauté sur les plateformes qui autorisent la catégorie, le SEO et le marketing de contenu, et les partenariats d'influenceurs conformes. Toujours vérifier les politiques actuelles des plateformes car elles changent fréquemment.

### Construction de communauté B2B
Les communautés B2B fonctionnent différemment des communautés B2C. Les membres rejoignent pour le développement professionnel, le réseautage, et la résolution de problèmes plutôt que pour l'engouement envers la marque. Slack et les groupes LinkedIn tendent à surperformer Discord pour le B2B. Le contenu doit être orienté praticien, pas promotionnel. La communauté doit apporter une valeur professionnelle indépendante du produit. La modération est généralement plus légère mais les standards de qualité sont plus élevés.

### Limites de la mesure des podcasts
L'attribution des podcasts reste difficile. Les téléchargements n'équivalent pas aux écoutes. La démographie des auditeurs est estimée, pas mesurée. Le suivi cross-device n'est pas fiable. Atténuer cela en utilisant des codes promo uniques, des URL vanity, et des enquêtes post-achat (« Comment avez-vous entendu parler de nous ? »). Accepter que le marketing podcast est souvent un investissement de notoriété/marque avec une attribution indirecte. Ne pas soumettre les podcasts aux mêmes métriques de réponse directe que la recherche payante.

### Recherche vocale pour les langues non anglophones
L'optimisation de la recherche vocale pour les langues non anglophones nécessite des considérations spécifiques à chaque langue. Les schémas de langage naturel, les structures de questions, et les expressions familières varient selon la langue et le dialecte. Le balisage schema doit utiliser des balises hreflang et des données structurées spécifiques à la langue. Les capacités des assistants vocaux et leur pénétration de marché varient selon la langue et la région (la part de marché de Google Assistant vs Alexa vs Siri diffère fortement selon les pays).

### Commerce social dans les marchés hors États-Unis
En Chine, les Mini Programs WeChat et Douyin (le TikTok chinois) dominent le commerce social avec des capacités bien au-delà des plateformes occidentales. En Asie du Sud-Est, LINE et Shopee Live sont des canaux majeurs. En Corée, le commerce KakaoTalk est significatif. Ne pas supposer qu'Instagram et TikTok Shop sont la référence partout. Rechercher les plateformes et comportements spécifiques à chaque marché avant de construire une stratégie de commerce social pour les marchés internationaux.

### Gestion de la toxicité communautaire
Même les communautés bien gérées font face à des défis de toxicité. Construire des consignes communautaires claires avant le lancement, pas après l'apparition de problèmes. Mettre en œuvre une application graduée des règles (avertissement, mise en sourdine temporaire, bannissement temporaire, bannissement permanent). Utiliser la modération IA pour un premier filtrage combiné à une revue humaine pour les décisions dépendant du contexte. Établir un processus d'appel. Documenter et répondre aux schémas récurrents (harcèlement coordonné, discours haineux, désinformation) avec une application transparente des politiques. L'épuisement des community managers est un risque réel ; prévoir un effectif adéquat et une rotation.

## Compétences associées

- **SEO** — la recherche vocale et la recherche visuelle recoupent les stratégies d'optimisation pour la recherche organique
- **Paid Advertising** — intégrations publicitaires de commerce social, TikTok Shop Ads, et formats publicitaires click-to-message
- **Content Engine** — création de contenu pour les canaux vidéo, podcast, et communauté
- **Influencer & Creator Marketing** — partenariats créateurs pour le commerce social, l'invitation en podcast, et l'amorçage de communauté
- **Growth Engineering** — croissance portée par la communauté, boucles virales via les fonctionnalités sociales, et amplification par parrainage
- **CRO** — optimisation de la conversion pour les vitrines sociales, les tunnels de chatbot, et les flux de commerce vocal
- **Analytics & Insights** — mesure et attribution pour les canaux émergents disposant d'analytics natifs limités

## Agents utilisés

- **social-media-manager** — stratégie de commerce social native à la plateforme, gestion de communauté, planification de calendrier de contenu, veille sociale, curation de contenu généré par les utilisateurs, et optimisation de l'engagement cross-plateforme

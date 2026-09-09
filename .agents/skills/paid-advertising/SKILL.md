---
name: paid-advertising
description: "Planifier, structurer et auditer des campagnes média payantes sur Google, Meta, LinkedIn, TikTok, Microsoft, le programmatique, les retail media, le native et l'audio — hiérarchie de campagne, architecture d'audience, stratégie d'enchères, allocation et rythme budgétaire, stratégie créative, et évolutions actuelles des API des plateformes (Google Ads v24/v25, Meta v25). Produit des plans de campagne, des scorecards d'audit de plateforme, des modèles budgétaires, des briefs créatifs et des playbooks d'optimisation. Se déclenche sur \"/digital-marketing-pro:paid-advertising\", \"plan a Google Ads campaign\", \"audit our Meta account\", \"which bid strategy should we use\", \"allocate our paid media budget\". Lit le profil de marque, les guidelines et l'historique de campagne via campaign-tracker.py ; planifie et recommande uniquement — le lancement est géré par /digital-marketing-pro:launch-campaign."
---

# Publicité payante

## Évolutions récentes des API de plateformes (au 7 juillet 2026)

Ciblez **l'API Google Ads v24.2** pour des intégrations stables (la lignée v24 est supportée jusqu'en 2027). **La v25 (juillet 2026) est la nouvelle version majeure comportant des changements incompatibles** : les ressources historiques `CustomerLifecycleGoal`/`CampaignLifecycleGoal` sont supprimées (migrer vers le schéma unifié `Goal` + `CampaignGoalConfig`), avec en plus de nouveaux objectifs d'optimisation de fidélisation, des métriques d'engagement social pour les publicités Shorts, des répartitions au niveau de la durée pour l'inventaire YouTube non-skippable, et l'attribution de conversion tierce YouTube. Adoptez la v25 délibérément, pas par défaut. Le détail complet — y compris AI Max — se trouve dans [`google-ads.md`](google-ads.md), la source unique de référence pour la surface de l'API Google Ads. Sources : [notes de version](https://developers.google.com/google-ads/api/docs/release-notes) · [annonce v25](https://ads-developers.googleblog.com/2026/07/announcing-v25-of-google-ads-api.html).

**Meta (Marketing API v25, en vigueur) :** les campagnes autonomes Advantage+ Shopping / App ne peuvent plus être créées via l'API sur aucune version (depuis le 19 mai 2026) ; la v26 (septembre 2026) met en pause celles restantes — utilisez la configuration Advantage+ unifiée ([détails dans meta-ads.md](meta-ads.md)). La nouvelle **métrique Page Viewer** remplace la portée héritée (Post/Page Reach, Video Impressions et Story Impressions se retirent de l'API Graph) — mettez à jour tout reporting qui lit ces champs. **LinkedIn :** la version `202607` est en production (cadence mensuelle) ; elle ajoute un CTA automatique « Pas intéressé » sur les Message Ads et un identifiant `SHA256_IP_ADDRESS` dans l'API Conversions.

**Points marquants qui affectent la construction de campagnes :**

- **v24.2 (24 juin 2026) :** support de première classe pour les **Local Services Ads** (`AssetGroup.google_local_services_info`), auto-génération de texte de landing page (`AssetAutomationType.GENERATE_LANDING_PAGE_TEXT`), et une ressource beta de revue Multi-Party Auth pour les verticales réglementées (finance, santé, politique).
- **v24.1 (13 mai 2026) — AI Max :** quatre nouveaux types d'expérimentation (`ADOPT_AI_MAX`, `ADOPT_BROAD_MATCH_KEYWORDS`, `OPTIMIZE_ASSETS`, `PMAX_REPLACEMENT_SHOPPING`). **Exécutez une expérimentation `ADOPT_AI_MAX` avant tout déploiement d'AI Max** — elle donne des chiffres de lift statistiquement propres par rapport à la base de référence. Ajoute aussi la segmentation de reporting `mobile_device_platform` (iOS vs Android).
- **v24.0 (22 avril 2026) — changement incompatible :** `videos` + `logo_images` désormais REQUIS sur `DemandGenVideoResponsiveAdInfo`/`VideoResponsiveAdInfo` (et `business_name` sur ce dernier) ; `Campaign.video_brand_safety_suitability` SUPPRIMÉ (déplacé au niveau Customer) ; `CallAd`/`CallAdInfo` totalement supprimés (utiliser les Call Assets).
- **v23.1 (25 février 2026) :** `text_guidelines.term_exclusions` + `text_guidelines.messaging_restrictions` sur les assets générés par IA pour **Performance Max** et **Search** — injectez directement la liste des mots interdits d'une marque (`profile.json → restrictions.md → banned_words`) et les messages approuvés dans les garde-fous de génération d'assets PMax.

## Quand utiliser ce skill

Activer ce skill lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- Créer, auditer ou optimiser des campagnes sur Google Ads, Meta/Facebook Ads, LinkedIn Ads ou TikTok Ads
- Concevoir des structures de campagne, des groupes d'annonces ou des hiérarchies d'ad sets sur n'importe quelle plateforme payante
- Sélectionner ou dépanner des stratégies d'enchères (CPC manuel, CPA cible, ROAS cible, maximiser les conversions, etc.)
- Construire des stratégies d'audience incluant le prospecting, le retargeting, les audiences similaires/lookalike ou les audiences personnalisées
- Allouer ou rythmer des budgets sur des plateformes ou des campagnes
- Configurer ou optimiser Google Shopping, Performance Max, YouTube Ads ou des campagnes Display
- Travailler avec des campagnes Meta Advantage+ ou des structures de campagne manuelles
- Exécuter des LinkedIn Ads avec un ciblage account-based marketing (ABM)
- Lancer des TikTok Ads incluant les Spark Ads ou les intégrations TikTok Shop
- Publicité programmatique incluant la sélection de DSP, la télévision connectée (CTV) ou l'affichage numérique extérieur (DOOH)
- Réseaux de retail media incluant Amazon Ads, Walmart Connect, Target Roundel, Kroger Precision Marketing ou Instacart Ads
- Exécuter des campagnes Microsoft Advertising (Bing Ads), incluant l'import Google Ads et les placements Microsoft Audience Network
- Planifier des campagnes de publicité native sur les réseaux de découverte de contenu (Taboola, Outbrain, Nativo)
- Acheter de la publicité audio ou podcast sur les plateformes de streaming (Spotify, Pandora/SiriusXM, iHeartRadio) ou en audio programmatique
- Toute question sur la stratégie média payant, la stratégie créative pour les publicités, ou les décisions de mix de canaux payants

## Contexte de marque (appliqué automatiquement)

Avant de produire tout livrable marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de marque actif a été affiché en début de session. Utiliser le nom de marque, le secteur, les réglages de voix, les canaux, les objectifs, la conformité et les concurrents indiqués là.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Le niveau de formalité, d'énergie, d'humour et d'autorité doit façonner tout le ton et le choix des mots du contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les target_markets et le secteur de la marque en utilisant `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — Consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique de campagne** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les affirmations restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les dérogations de ton spécifiques au canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les taglines et le langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Si le contenu est produit pour un canal spécifique, les règles de style du canal priment sur les réglages de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant l'exécution, recueillir les éléments suivants auprès de l'utilisateur (demander si non fourni) :

- **Type d'activité** : B2B, B2C, D2C, marketplace, commerce local
- **Plateformes actuelles** : Quelles plateformes publicitaires sont actives (le cas échéant)
- **Budget mensuel** : Dépense média payant totale ou budgets par plateforme
- **Objectifs** : KPI principal (ROAS, CPA, CPL, notoriété de marque, trafic) et valeurs cibles
- **Audience** : Qui l'entreprise cherche à atteindre (démographie, firmographie, centres d'intérêt, comportements)
- **Focus d'étape du tunnel** : Notoriété en haut de tunnel, considération en milieu de tunnel, ou conversion en bas de tunnel
- **Actifs existants** : Landing pages, actifs créatifs, flux de produits, suivi en place
- **Infrastructure de suivi** : Statut du pixel/tag, suivi des conversions, modèle d'attribution utilisé
- **Secteur** : Nécessaire pour signaler les restrictions de catégories réglementées (santé, finance, alcool, cannabis, jeux d'argent)

## Capacités

### Conception de structure de campagne
- Architecture de campagne spécifique à la plateforme (campagnes, groupes d'annonces/ad sets, annonces)
- Conventions de nommage pour une gestion de compte évolutive
- Sélection du type de campagne par objectif (Search, Display, Shopping, Video, App, PMax, Demand Gen)
- Thématisation des groupes d'annonces et stratégies de segmentation par mots-clés/audience

### Stratégie d'audience
- **Prospecting** : Ciblage par centre d'intérêt, comportement, démographie et contexte
- **Retargeting** : Visiteurs du site, spectateurs vidéo, personnes ayant engagé avec un formulaire de lead, listes clients, abandons de panier
- **Audiences similaires/lookalike** : Sélection de l'audience source, pourcentages d'expansion, stratégies de superposition
- **Ciblage ABM** : Listes d'entreprises, ciblage par intitulé de poste, filtrage par ancienneté (spécifique à LinkedIn)
- **Stratégies d'exclusion** : Audiences négatives, suppression de clients, fenêtres d'exclusion des convertisseurs

### Sélection de stratégie d'enchères
- Cadre de décision enchères manuelles vs automatisées
- CPA cible, ROAS cible, maximiser les conversions, maximiser la valeur des conversions
- Stratégies d'enchères de portefeuille pour Google Ads
- Gestion de la phase d'apprentissage et transitions de stratégie d'enchères
- Ajustements de saisonnalité et modificateurs d'enchères

### Stratégie créative
- Sélection du format publicitaire par plateforme et objectif
- Bonnes pratiques et stratégies d'épinglage pour les Responsive Search Ads (RSA)
- Diversification créative Meta (statique, vidéo, carrousel, collection, expérience instantanée)
- Formats créatifs LinkedIn (image unique, carrousel, vidéo, document, conversation ads)
- Principes créatifs au style natif TikTok
- Cadres de test créatif (isolation des variables, test itératif)

### Allocation et rythme budgétaire
- Modèles de répartition budgétaire cross-plateforme
- Optimisation du budget au niveau campagne vs budgets au niveau ad set
- Budgets journaliers vs à vie et quand utiliser chacun
- Stratégies de rythme pour les objectifs mensuels/trimestriels
- Règles de montée en puissance budgétaire (règle des 20 % pour Google, ajustements CBO pour Meta)

### Expertise spécifique à la plateforme
- **Google Ads** : Search, Display, Performance Max, YouTube (in-stream, Shorts, Discovery), Shopping, Demand Gen
- **Meta Ads** : campagnes Advantage+ unifiées (les formats hérités ASC/AAC sont en cours de retrait — voir meta-ads.md), campagnes manuelles, publicités catalogue, formulaires de génération de leads
- **LinkedIn Ads** : Sponsored Content, Message Ads, Lead Gen Forms, Document Ads, ciblage par liste ABM
- **TikTok Ads** : In-Feed, TopView, Spark Ads, publicités produit TikTok Shop, Branded Effects
- **Programmatique** : Sélection de DSP (DV360, The Trade Desk, Amazon DSP), CTV, DOOH, audio
- **Retail Media** : Amazon Sponsored Products/Brands/Display, Walmart Connect, Target Roundel, Kroger Precision Marketing, Instacart Ads

## Processus

### Construction de campagne standard (cas d'usage le plus courant)

1. **Définir les objectifs** — Clarifier le KPI principal et la métrique de succès. Faire correspondre au bon type de campagne par plateforme.
2. **Architecture d'audience** — Concevoir la stratégie d'audience full-funnel : segments de prospecting froid, pools de retargeting tièdes, et listes de remarketing chaudes. Définir les exclusions.
3. **Structure de campagne** — Construire la hiérarchie de campagne avec les conventions de nommage. Déterminer l'allocation budgétaire entre campagnes.
4. **Sélection de stratégie d'enchères** — Choisir la stratégie d'enchères appropriée en fonction de la maturité des données, du volume de conversion et des objectifs. Référencer `bid-strategy.md` pour les arbres de décision.
5. **Stratégie créative** — Définir les formats publicitaires, les angles de messages et les variations créatives. Faire correspondre le créatif à l'étape du tunnel et au segment d'audience.
6. **Validation du suivi** — Confirmer la configuration du pixel/tag, les actions de conversion et le modèle d'attribution avant le lancement.
7. **Plan de lancement** — Fixer les budgets de lancement (souvent inférieurs au régime de croisière), définir les attentes de la phase d'apprentissage, et établir le premier point de contrôle d'optimisation (généralement 7 à 14 jours).
8. **Cadence d'optimisation** — Définir les actions d'optimisation hebdomadaires/bihebdomadaires : ajustements d'enchères, affinements d'audience, rafraîchissements créatifs, réallocation budgétaire.

### Processus d'audit de campagne

1. **Revue de la structure de compte** — Évaluer l'organisation des campagnes, les conventions de nommage et la logique de segmentation.
2. **Analyse de chevauchement d'audience** — Vérifier la fragmentation ou la cannibalisation d'audience entre campagnes.
3. **Évaluation de la stratégie d'enchères** — Évaluer si les stratégies d'enchères actuelles correspondent au volume de conversion et aux objectifs.
4. **Performance créative** — Identifier les meilleurs/pires performeurs, les signaux de fatigue créative et les lacunes de test.
5. **Efficacité budgétaire** — Analyser la répartition des dépenses vs la répartition de la performance. Signaler les gagnants sous-dépensés et les perdants sur-dépensés.
6. **Audit du suivi** — Vérifier la précision du suivi des conversions, la cohérence de l'attribution et la fraîcheur des données.

## Fichiers de référence

- `google-ads.md` — Types de campagnes Google Ads, paramètres, tactiques d'optimisation, et fonctionnalités spécifiques à la plateforme
- `meta-ads.md` — Structures de campagne Meta Ads, configurations Advantage+, spécifications créatives, et stratégies iOS ATT
- `linkedin-ads.md` — Options de ciblage LinkedIn Ads, stratégies ABM, optimisation de la génération de leads, et tactiques spécifiques B2B
- `tiktok-ads.md` — Bonnes pratiques créatives TikTok Ads, configuration Spark Ads, intégration TikTok Shop, et stratégies d'audience
- `programmatic.md` — Critères de sélection de DSP, planification CTV, stratégies DOOH, et types de deals programmatiques
- `bid-strategy.md` — Arbres de décision de stratégie d'enchères, gestion de la phase d'apprentissage, et configurations de stratégie de portefeuille
- `retail-media-networks.md` — Configuration spécifique aux plateformes pour la publicité Amazon, Walmart, Target, Kroger et Instacart
- `microsoft-ads.md` — Guide de campagne Microsoft Advertising : portée du réseau Search (Bing, Yahoo, AOL, DuckDuckGo), Microsoft Audience Network, et opportunités de CPC plus bas vs Google
- `retargeting-audiences.md` — Taxonomie d'audience de retargeting et remarketing : définitions de segments, niveaux d'intention, et fenêtres d'appartenance recommandées
- `media-planning.md` — Fondamentaux de la planification média : portée, fréquence, métriques GRP/TRP, allocation budgétaire cross-canal, et stratégies de calendrier
- `native-advertising.md` — Paysage des réseaux de publicité native (Taboola, Outbrain, Nativo, et plus), campagnes de découverte de contenu, et bonnes pratiques créatives in-feed
- `audio-programmatic.md` — Publicité audio numérique sur les plateformes de streaming (Spotify, Pandora/SiriusXM, iHeartRadio) et les podcasts, modèles publicitaires, et parcours d'achat

## Formats de sortie

- **Plan de campagne** : Document structuré avec hiérarchie de campagne, définitions d'audience, stratégies d'enchères, allocation budgétaire, briefs créatifs, et cibles KPI
- **Audit de plateforme** : Scorecard avec constats, notations de gravité, et actions priorisées
- **Modèle d'allocation budgétaire** : Répartition prête à intégrer dans un tableur par plateforme, campagne et étape du tunnel avec résultats projetés
- **Brief créatif** : Briefs par format publicitaire avec angles de messages, options de CTA, et exigences de spécifications
- **Playbook d'optimisation** : Checklist hebdomadaire/mensuelle d'actions d'optimisation avec critères de décision

## Cas particuliers

### Impact de l'ATT iOS sur le ciblage Meta
Depuis iOS 14.5, la taille des audiences Meta a rétréci et les fenêtres d'attribution se sont raccourcies. En travaillant sur des campagnes Meta, privilégier par défaut un ciblage plus large avec l'expansion d'audience Advantage+, utiliser l'API Conversions (CAPI) en complément du pixel, recommander une attribution au clic sur 7 jours, et fixer les attentes selon lesquelles le ROAS rapporté sous-comptera la performance réelle de 15 à 30 %.

### Cannibalisation de la recherche de marque par Performance Max
Les campagnes PMax captent fréquemment le trafic de recherche de marque, gonflant leur performance rapportée. Toujours recommander l'exécution d'une liste d'exclusion de marque dans PMax, le maintien d'une campagne de recherche de marque séparée, et la comparaison de l'incrémentalité en analysant la performance globale du compte plutôt que PMax isolément.

### Gestion du CPC élevé sur LinkedIn
Les CPC LinkedIn sont typiquement 3 à 10 fois plus élevés que sur les autres plateformes. Compenser en se concentrant sur la qualité des leads plutôt que sur le volume, en utilisant les Lead Gen Forms (taux de conversion supérieur aux landing pages), en resserrant le ciblage d'audience pour réduire le gaspillage, et en évaluant sur la base du coût par lead qualifié plutôt que le CPC.

### Fatigue créative sur TikTok
Le créatif publicitaire TikTok se fatigue typiquement en 3 à 7 jours. Intégrer des cadences de rafraîchissement créatif dans chaque plan de campagne TikTok. Recommander 3 à 5 créatifs actifs par groupe d'annonces avec de nouveaux lots produits chaque semaine. Utiliser les Spark Ads (posts organiques boostés) pour prolonger la durée de vie du créatif car ils sont perçus comme moins publicitaires.

### Incrémentalité du retail media
Les publicités retail media captent souvent des achats qui auraient eu lieu de manière organique. Lors de l'audit du retail media, remettre en question si les ventes sont vraiment incrémentales. Recommander l'exécution de tests d'incrémentalité (groupes témoins), l'analyse des métriques new-to-brand (Amazon les fournit), et la comparaison des évolutions de classement organique pendant les pauses publicitaires.

### Allocation cross-plateforme pour petit budget
Lorsque le budget mensuel total est inférieur à 5 000 $, ne pas répartir sur plusieurs plateformes. Recommander de concentrer les efforts sur une seule plateforme principale qui correspond le mieux à l'audience et à l'objectif. N'étendre à une deuxième plateforme qu'une fois la première optimisée et affichant des rendements décroissants.

### Restrictions des secteurs réglementés
La santé, la finance, l'alcool, le cannabis, les jeux d'argent et la publicité politique font face à des restrictions spécifiques aux plateformes. Toujours vérifier les politiques de plateforme avant de recommander des types de campagne. Certaines plateformes interdisent entièrement certains secteurs (TikTok restreint les publicités de services financiers dans certains marchés). Référencer la documentation spécifique à chaque plateforme pour les listes de restrictions actuelles.

## Skills associés

- **CRO** — Optimisation de landing page et de conversion pour les destinations du trafic publicitaire
- **Analytics & Insights** — Modélisation d'attribution, configuration du suivi des conversions, et analyse de performance
- **Audience Intelligence** — Recherche d'audience approfondie pour éclairer les stratégies de ciblage
- **Content Engine** — Rédaction de créatifs publicitaires et cadres de messages
- **Funnel Architect** — Stratégie full-funnel dans laquelle s'intègre la publicité payante
- **Emerging Channels** — Social commerce et nouvelles plateformes publicitaires (TikTok Shop, CTV)

---
name: growth-engineering
description: "Guidance structurée pour l'ingénierie de systèmes de croissance — mécaniques de product-led growth, conception de programmes de parrainage, mécaniques de boucle virale, playbooks de lancement, boucles de rétention, et programmes d'affiliation — produisant des documents de stratégie, des spécifications de programme, et des modèles de croissance prêts pour tableur. Recommande et conçoit ; ne construit pas de fonctionnalités produit et ne lance rien. Se déclenche sur « /digital-marketing-pro:growth-engineering », « conçois un programme de parrainage », « comment obtenir une boucle virale », « planifie notre lancement Product Hunt », « réduis le churn avec du re-engagement ». Lit le profil de marque, les benchmarks sectoriels, et l'historique des campagnes ; se combine avec /digital-marketing-pro:cro pour l'optimisation de l'activation et de l'onboarding."
---

# Growth Engineering

## Quand utiliser cette compétence

Activer cette compétence lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- Concevoir ou améliorer une mécanique de product-led growth (PLG)
- Construire ou optimiser des programmes de parrainage (parrainage client, parrainage partenaire, programmes ambassadeurs)
- Créer des boucles virales ou augmenter les mécaniques de partage organique
- Planifier le lancement d'un produit ou d'une entreprise (Product Hunt, lancements bêta, listes d'attente)
- Améliorer la rétention utilisateur, réduire le churn, ou concevoir des campagnes de réengagement
- Exécuter des expériences de croissance et bâtir une culture d'expérimentation
- Mettre en place ou optimiser des programmes de marketing d'affiliation
- Concevoir des flux d'activation et réduire le temps de mise en valeur pour les nouveaux utilisateurs
- Construire des modèles de croissance ou prévoir des coefficients de croissance virale
- Résoudre des problèmes de démarrage à froid pour les marketplaces ou plateformes
- Identifier et noter des leads qualifiés par le produit (PQL)
- Toute question sur les leviers de croissance, les boucles de croissance, ou les stratégies d'acquisition durable

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de marque actif a été affiché au
   démarrage de la session. Utiliser le nom de marque, le secteur, les paramètres de
   voix, les canaux, les objectifs, la conformité, et les concurrents affichés là.
2. **Si vous avez besoin du profil complet**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, énergie, humour,
   autorité doivent façonner tout le ton du contenu et les choix de mots
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les
   target_markets et le secteur de la marque en utilisant
   `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — Consulter
   `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer
   `skills/context-engine/platform-specs.md` pour les limites de caractères et les
   exigences de format
7. **Vérifier l'historique de campagne** — Exécuter
   `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns`
   avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez
   /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les
   meilleures pratiques générales. »
9. **Vérifier les guidelines de marque** — Si
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et
   appliquer : `restrictions.md` pour les mots interdits, les revendications
   restreintes, et les avertissements obligatoires ; `channel-styles.md` pour les
   dérogations de ton spécifiques au canal (peuvent différer de la voix de base) ;
   `messaging.md` pour les messages clés approuvés, slogans, et langage de
   positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des
   4 scores numériques. Lors de la production de contenu pour un canal spécifique, les
   règles de style de canal ont priorité sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter, recueillir ce qui suit auprès de l'utilisateur (demander si non fourni) :

- **Type de produit** : SaaS, marketplace, e-commerce, application mobile, plateforme de contenu, entreprise de services
- **Modèle économique** : Abonnement, transactionnel, freemium, essai gratuit, financé par la publicité
- **Étape actuelle** : Pré-lancement, traction précoce (moins de 1 000 utilisateurs), étape de croissance, étape d'échelle
- **Métriques clés** : MRR/ARR actuel, nombre d'utilisateurs, taux d'activation, taux de rétention, taux de churn, NPS
- **Canaux de croissance existants** : Quels canaux d'acquisition sont actifs et leur performance relative
- **Potentiel viral** : Si le produit a des mécaniques de partage inhérentes ou nécessite une viralité artificielle
- **Équipe et ressources** : Capacité d'ingénierie pour les fonctionnalités de croissance, budget marketing, ressources de partenariat
- **Utilisateur cible** : Qui est l'utilisateur idéal et quelle est sa motivation principale à utiliser le produit
- **Paysage concurrentiel** : Principaux concurrents et leurs stratégies de croissance

## Capacités

### Stratégie Product-Led Growth (PLG)
- **Conversion gratuit-vers-payant** : Conception de modèle freemium, optimisation d'essai gratuit, stratégie de limitation de fonctionnalités, déclencheurs de tarification à l'usage
- **Métriques d'activation** : Définir le « moment aha », cartographier les étapes pour l'atteindre, mesurer et optimiser le taux d'activation
- **Optimisation du temps de mise en valeur** : Réduire la friction entre l'inscription et la première expérience de valeur via la conception d'onboarding, les modèles, les données d'exemple, et les visites guidées
- **Notation PQL** : Définir les critères de lead qualifié par le produit basés sur les modèles d'usage, l'adoption de fonctionnalités, la taille d'équipe, et la fréquence d'engagement
- **Expansion en libre-service** : Invites de mise à niveau dans le produit, notifications de limite d'usage, flux d'invitation d'équipe, déclencheurs d'expansion de sièges
- **Essai inversé** : Donner l'accès complet d'abord, puis rétrograder vers gratuit — quand cela fonctionne mieux qu'un freemium traditionnel

### Systèmes de parrainage
- **Programmes give-and-get** : À la fois le parrain et le filleul reçoivent des incitations (par exemple, le modèle de stockage supplémentaire de Dropbox)
- **Récompenses de parrainage à paliers** : Incitations escaladées basées sur le nombre de parrainages réussis
- **Parrainages à jalons** : Récompenses déclenchées à des jalons de nombre de parrainages (1, 5, 10, 25) pour maintenir l'élan
- **Pipeline NPS-vers-parrainage** : Cibler les promoteurs (NPS 9-10) avec des demandes de parrainage au moment de satisfaction maximale
- **Conception d'incitation à double face** : Équilibrer la récompense du parrain (motivation à partager) avec la récompense du filleul (motivation à convertir)
- **Optimisation du canal de parrainage** : E-mail, lien unique, partage social, invitation dans l'app, SMS — quels canaux performent pour quels types de produit
- **Prévention de la fraude** : Détecter l'auto-parrainage, les faux comptes, et le contournement des incitations sans créer de friction pour les parrains légitimes

### Conception de boucle virale
- **Viralité inhérente** : Le produit nécessite naturellement que d'autres l'utilisent (Slack, Zoom, Google Docs)
- **Viralité artificielle** : Partage fabriqué à travers des incitations, fonctionnalités sociales, ou création de contenu (rapports partageables, badges, résultats)
- **Viralité de contenu** : Contenu généré par l'utilisateur qui apparaît sur des plateformes externes et ramène de nouveaux utilisateurs
- **Viralité de preuve sociale** : Signaux d'usage visibles (badges, signatures, liens « propulsé par », profils publics)
- **Calcul du coefficient viral** : K-factor = invitations par utilisateur x taux de conversion des invitations. K > 1 signifie une croissance exponentielle ; K entre 0,5-1,0 augmente significativement l'acquisition payante
- **Temps de cycle viral** : Réduire le temps entre l'arrivée d'un utilisateur et l'arrivée de ses invités. Des cycles plus courts composent plus vite même avec des K-factors plus faibles

### Playbooks de lancement
- **Lancement Tier 1** (produit majeur) : Campagne presse complète, seeding d'influenceurs, Product Hunt, communauté bêta, événement de lancement, amplification payante
- **Lancement Tier 2** (fonctionnalité/mise à jour) : Annonce aux utilisateurs existants, outreach ciblé, publications communautaires, changelog, campagne e-mail
- **Lancement Tier 3** (mise à jour mineure) : Notification dans l'app, mise à jour du changelog, publication sur les réseaux sociaux
- **Liste d'attente pré-lancement** : Mécaniques de liste d'attente virale (partager pour monter dans le classement), incitations d'accès anticipé, contenu au compte-gouttes pour maintenir l'intérêt
- **Lancement Product Hunt** : Calendrier de préparation (2-4 semaines), sélection du hunter, playbook du jour du lancement, engagement post-lancement
- **Conception de programme bêta** : Recrutement de bêta fermée, boucles de feedback, transition bêta-vers-lancement, construction de communauté d'adopteurs précoces

### Boucles de rétention
- **Conception d'engagement** : Boucles d'habitude (déclencheur, action, récompense variable, investissement), stratégie de notification, cadence de contenu
- **Campagnes de réengagement** : Séquences e-mail, notifications push, messages dans l'app, publicités de retargeting déclenchées par des signaux d'inactivité
- **Prédiction du churn** : Signaux comportementaux indiquant un risque de churn (baisse de fréquence de connexion, déclin de l'usage de fonctionnalités, motifs de tickets de support)
- **Séquences de winback** : Outreach chronométré vers les utilisateurs churnés avec des rappels de valeur personnalisés, mises à jour produit, et offres d'incitation
- **Analyse de cohorte** : Suivre la rétention par cohorte d'inscription, canal d'acquisition, statut d'activation, et adoption de fonctionnalités pour identifier ce qui pilote la rétention à long terme
- **Revenu d'expansion** : Déclencheurs d'upsell et de cross-sell basés sur les modèles d'usage, la croissance d'équipe, et l'engagement de fonctionnalités

### Marketing d'affiliation
- **Conception de programme** : Structure de commission (pourcentage, forfait fixe, à paliers, récurrente), durée de cookie, règles d'attribution
- **Sélection de réseau** : Quand utiliser les réseaux d'affiliation (ShareASale, CJ, Impact) vs construire un programme personnalisé
- **Recrutement d'affiliés** : Trouver des affiliés de qualité via l'analyse concurrentielle, les partenariats de contenu, et l'outreach de communauté de niche
- **Optimisation de commission** : Équilibrer les taux de commission pour attirer les affiliés tout en maintenant la rentabilité ; paliers de performance pour récompenser les meilleurs performeurs
- **Détection de fraude** : Fraude au clic, cookie stuffing, violations de brand bidding, usage abusif de marque, abus de coupon
- **Stratégie d'affiliation de contenu** : Travailler avec des blogueurs, sites d'avis, sites de comparaison, et éditeurs de niche
- **Hybrides affiliation-influenceur** : Partenariats créateurs avec des modèles de rémunération basés sur la performance

## Processus

### Mise en œuvre PLG (cas d'usage le plus courant)

1. **Cartographier le parcours utilisateur** — Documenter chaque étape depuis la première notoriété jusqu'à la conversion payante. Identifier où les utilisateurs abandonnent actuellement et où ils expérimentent la valeur.
2. **Définir la métrique d'activation** — Déterminer l'action ou combinaison d'actions spécifique qui corrèle avec la rétention à long terme. C'est le « moment aha » autour duquel toute la mécanique PLG tourne.
3. **Concevoir l'offre gratuite** — Structurer le palier gratuit ou l'essai pour donner aux utilisateurs assez de valeur pour vivre le moment d'activation tout en créant des déclencheurs de mise à niveau naturels. Référencer les modèles courants : freemium à fonctionnalités limitées, freemium à usage limité, essai limité dans le temps, essai inversé.
4. **Optimiser le temps de mise en valeur** — Repenser l'onboarding pour amener les utilisateurs à la métrique d'activation aussi vite que possible. Éliminer les étapes inutiles, ajouter des modèles/données d'exemple, mettre en œuvre des visites guidées, et proposer des parcours de démarrage rapide.
5. **Construire la notation PQL** — Définir les signaux comportementaux indiquant qu'un utilisateur gratuit est prêt pour un contact commercial ou une invite de mise à niveau. Combiner la fréquence d'usage, l'étendue des fonctionnalités, la taille d'équipe, et la profondeur d'engagement en un score composite.
6. **Mettre en œuvre des boucles d'expansion** — Concevoir des mécanismes intégrés au produit pour une croissance organique : invitations d'équipe, espaces de travail partagés, résultats publics, intégrations qui touchent d'autres équipes, et chemins de mise à niveau basés sur l'usage.
7. **Mesurer et itérer** — Suivre le taux d'activation, le taux de conversion gratuit-vers-payant, le temps jusqu'à l'activation, le revenu d'expansion, et le coefficient viral. Exécuter des expériences à chaque étape du tunnel.

### Construction d'un programme de parrainage

1. **Évaluer le potentiel viral** — Déterminer si le produit a des mécaniques de partage inhérentes ou nécessite des parrainages pilotés par incitation. Analyser les données NPS pour identifier la concentration de promoteurs.
2. **Concevoir la structure d'incitation** — Choisir le modèle de parrainage (give-and-get, à paliers, à jalons) basé sur le type de produit, la LTV client, et les benchmarks concurrentiels. Fixer les valeurs d'incitation à 10-25% du coût d'acquisition client.
3. **Construire les mécaniques de parrainage** — Créer des liens de parrainage uniques, des interfaces de partage, une infrastructure de suivi, et des flux d'accomplissement de récompense. Rendre le partage sans friction (un clic, messages pré-rédigés).
4. **Intégrer les points de contact de parrainage** — Intégrer des invites de parrainage aux moments de haute satisfaction : post-achat, après avoir atteint un jalon, après une interaction de support positive, à la fin d'une enquête NPS.
5. **Lancer et promouvoir** — Annoncer le programme aux utilisateurs existants, le mettre en avant dans l'onboarding, l'ajouter aux tableaux de bord de compte, et l'inclure dans les communications e-mail.
6. **Surveiller et optimiser** — Suivre le taux de partage, le taux de conversion des invitations, le revenu de parrainage, et les signaux de fraude. Tester A/B les types d'incitation, le texte de partage, et l'emplacement des invites.

## Fichiers de référence

- `product-led-growth.md` — Cadres PLG, arbres de décision freemium vs essai, identification de métrique d'activation, modèles de notation PQL
- `referral-systems.md` — Modèles de programme de parrainage, principes de conception d'incitation, tactiques de prévention de fraude, et études de cas
- `viral-loops.md` — Calculs de coefficient viral, motifs de conception de boucle, cadres d'évaluation de viralité
- `launch-strategy.md` — Playbooks de lancement Tier 1/2/3, guide Product Hunt, mécaniques de liste d'attente, conception de programme bêta
- `retention-loops.md` — Cadres d'engagement, modèles de prédiction du churn, séquences de winback, méthodes d'analyse de cohorte
- `affiliate-marketing.md` — Guides de mise en place de programme, comparaisons de réseau, optimisation de commission, systèmes de détection de fraude
- `experimentation-frameworks.md` — Priorisation d'expériences (ICE/RICE), formats d'hypothèse, fondements statistiques, catégories d'expérience AARRR, et benchmarks de vélocité d'expérimentation

## Formats de résultat

- **Document de stratégie PLG** : Carte du parcours utilisateur, définition de la métrique d'activation, conception du palier gratuit, critères PQL, mécaniques de boucle d'expansion, et métriques de succès
- **Spécification de programme de parrainage** : Structure d'incitation, description des mécaniques, points d'intégration, plan de lancement, et exigences de tableau de bord de surveillance
- **Playbook de lancement** : Calendrier pré-lancement, checklist du jour du lancement, plan d'activation canal par canal, séquence de suivi post-lancement
- **Analyse de rétention** : Courbes de rétention par cohorte, indicateurs de risque de churn, conceptions de campagne de réengagement, et modèles de séquence de winback
- **Modèle de croissance** : Modèle prêt pour tableur avec coefficient viral, temps de cycle, CAC par canal, courbes de rétention, et trajectoires de croissance projetées
- **Plan de programme d'affiliation** : Structure de commission, recommandation de réseau/plateforme, stratégie de recrutement, guidelines de conformité, et plan de surveillance de fraude

## Cas particuliers

### Produits non viraux
Certains produits n'ont aucune mécanique de partage inhérente (par exemple, outils de
finance personnelle, applications de productivité solo). Pour ceux-ci, créer une
viralité artificielle via des résultats partageables (rapports, réussites,
résultats), des fonctionnalités de preuve sociale (profils publics, classements),
des outils de création de contenu qui font naturellement apparaître la marque, ou
des parrainages pilotés par incitation. Tous les produits n'ont pas besoin d'un
coefficient viral supérieur à 1 — même K=0,3 réduit significativement le CAC.

### Problème de démarrage à froid des marketplaces
Les marketplaces à deux faces font face au problème de l'œuf et de la poule : pas
d'offre sans demande, pas de demande sans offre. Résoudre en commençant par un côté
(généralement l'offre) via recrutement manuel, seeding de contenu, ou en offrant au
côté offre une proposition de valeur autonome. Se concentrer d'abord sur une
géographie ou verticale étroite. Stratégies de référence : Uber a commencé avec les
voitures noires, Airbnb a commencé avec les événements, et Yelp a commencé avec les
avis avant les transactions.

### Dynamiques de rétention B2B vs B2C
La rétention B2B dépend de l'intégration du produit dans les workflows, de
l'adoption multi-utilisateur au sein d'une organisation, et de l'intégration avec
d'autres outils. La rétention B2C dépend de la formation d'habitude, de la fraîcheur
du contenu, et de l'engagement émotionnel. Ne pas appliquer des tactiques
d'engagement B2C (notifications push quotidiennes, gamification) à des produits B2B.
La rétention B2B se mesure mensuellement ou trimestriellement, pas quotidiennement.

### Prévention de la fraude de parrainage
Les motifs courants de fraude de parrainage incluent l'auto-parrainage avec
plusieurs comptes, les cercles de parrainage entre amis qui churnent après avoir
reçu des récompenses, et les faux parrainages générés par bot. Atténuer en exigeant
que l'utilisateur parrainé accomplisse une action significative (achat, seuil
d'usage) avant que les récompenses soient distribuées, en mettant en œuvre le
fingerprinting d'appareil, en fixant des plafonds de récompense raisonnables, et en
surveillant les motifs anormaux.

### Séquencement de lancement international
Lors d'un lancement international, ne pas lancer partout simultanément. Séquencer
par attractivité de marché (TAM, densité concurrentielle, complexité réglementaire),
préparation à la localisation/langue, et signaux de demande existants. Commencer par
un nouveau marché, prouver le playbook, puis étendre. Les méthodes de paiement, les
exigences de conformité, et les normes culturelles varient significativement et
peuvent briser des plans de lancement construits pour le marché domestique.

## Compétences liées

- **Paid Advertising** — Acquisition payante que le PLG et les boucles virales peuvent amplifier ou remplacer avec le temps
- **CRO** — L'optimisation de l'activation et de l'onboarding recoupe fortement les principes de CRO
- **Content Engine** — Marketing de contenu qui alimente les boucles de croissance et l'amplification de lancement
- **Analytics & Insights** — Analyse de cohorte, mesure d'expérience, et modélisation de croissance
- **Influencer & Creator Marketing** — Partenariats créateurs pour l'amplification de lancement et hybrides affiliation-influenceur
- **Funnel Architect** — Les stratégies d'ingénierie de croissance s'intègrent dans le tunnel d'acquisition et de rétention plus large

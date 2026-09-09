---
name: analytics-insights
description: "Marketing measurement module — builds KPI trees per business model, reporting templates (weekly, monthly, QBR, campaign), anomaly root-cause diagnosis, MMM and incrementality guidance, dark-social tracking, and privacy-first cookieless measurement architecture, including the GA4 AI Assistant channel group for attributing AI-referred traffic. Triggers on \"/digital-marketing-pro:analytics-insights\", \"why did traffic drop\", \"define our KPIs\", \"design an executive dashboard\", \"can we do marketing mix modeling\". Reads the brand profile, industry benchmarks, and campaign history; pairs with /digital-marketing-pro:gsc-ai-performance and /digital-marketing-pro:aeo-audit to triangulate AI-surface impressions against actual traffic."
---

# Analytics & Insights

## Groupe de canaux GA4 « AI Assistant » (ajouté le 13 mai 2026)

Google Analytics 4 a ajouté un nouveau **groupe de canaux par défaut appelé « AI Assistant »** le 13 mai 2026 ([documentation des groupes de canaux GA4](https://support.google.com/analytics/answer/9164320?hl=en)). Lorsqu'un référent correspond à un assistant IA reconnu (ChatGPT, Gemini, Claude, etc.), GA4 automatiquement :

- Classe la session dans le **groupe de canaux AI Assistant**
- Définit la **dimension Medium sur `ai-assistant`**

C'est le **pendant côté attribution** du nouveau rapport GSC AI Performance (déployé le 3 juin 2026 — voir `/digital-marketing-pro:gsc-ai-performance`). Étant donné que le rapport IA de GSC exclut volontairement les données de clic, le canal AI Assistant de GA4 est actuellement le chemin le plus fiable pour attribuer le *trafic réel* provenant des surfaces d'IA générative.

**Vérifications de configuration GA4 recommandées** lors de l'onboarding d'une marque :

1. **Confirmer que le groupe de canaux est actif sur la propriété.** Les propriétés GA4 plus récentes l'obtiennent automatiquement ; les plus anciennes peuvent nécessiter que l'affichage se fasse après la fin du rétroremplissage de Google. Si la marque signale que ses rapports de canaux semblent inchangés après le 13 mai, vérifier les rapports d'exploration filtrés par `sessionDefaultChannelGroup = "AI Assistant"`.
2. **Ajouter le canal AI Assistant aux rapports personnalisés et tableaux de bord** — pour toute marque menant un programme AEO (`/digital-marketing-pro:aeo-geo`, `/digital-marketing-pro:aeo-audit`), la tendance du canal AI Assistant est désormais un KPI de premier plan, au même titre que les clics de recherche organique.
3. **Ne pas fusionner AI Assistant dans « Recherche organique » ou « Direct ».** Certains modèles de reporting hérités regroupent le trafic IA dans Direct (car les référents n'étaient pas toujours présents) ou dans Recherche organique (car les moteurs de réponse « ressemblent » à de la recherche). Les deux sont désormais des attributions erronées — le canal AI Assistant est la catégorie faisant autorité.
4. **Réconcilier avec les résultats d'`aeo-audit` et le rapport IA de GSC.** Trois sources de données, trois vues différentes :
   - `aeo-audit` (sondage synthétique) — ce que les moteurs IA *pourraient* dire de la marque
   - Rapport GSC AI Performance — impressions réelles dans Google AI Overviews / AI Mode (pas de clics)
   - Canal AI Assistant de GA4 — *trafic* réel en provenance des assistants IA (clics matérialisés)

   Un programme AEO sain montre une croissance sur les trois ; une divergence entre eux est un signal de diagnostic.

## Quand utiliser cette compétence

Activer ce module lorsque la demande de l'utilisateur porte sur l'un des éléments suivants :

- **Cadres de KPI** : définir les bonnes métriques et mesures de succès pour un modèle économique, une campagne ou un canal
- **Reporting de performance** : construire des modèles de reporting hebdomadaires, mensuels, trimestriels ou spécifiques à une campagne
- **Investigation d'anomalies** : diagnostiquer des baisses ou pics soudains de trafic, de conversions ou d'autres métriques
- **Intelligence concurrentielle** : analyser les stratégies des concurrents, la part de voix, le positionnement et la performance
- **Modélisation d'attribution** : déterminer comment le crédit des conversions est réparti entre les points de contact marketing
- **Marketing Mix Modeling (MMM)** : estimer l'impact de chaque canal marketing sur les résultats globaux de l'entreprise
- **Tests d'incrémentalité** : concevoir des expériences pour mesurer l'impact causal réel des activités marketing
- **Mesure du dark social** : suivre et attribuer le trafic provenant des canaux de partage privé (DM, Slack, transferts d'e-mail)
- **Mesure privacy-first** : adapter les stratégies de mesure à un environnement sans cookies et réglementé en matière de confidentialité
- **Conception de tableau de bord** : structurer des tableaux de bord pour différentes audiences de parties prenantes

**Expressions déclenchantes** : « KPI », « métriques », « reporting », « tableau de bord », « pourquoi le trafic a chuté », « anomalie », « analyse concurrentielle », « intelligence concurrentielle », « attribution », « modèle de mix marketing », « MMM », « incrémentalité », « test de lift », « dark social », « sans cookies », « privacy-first », « ROAS », « ROI », « performance », « qu'est-il arrivé à nos chiffres »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — le résumé de marque actif a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents indiqués.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et le choix des mots de tout le contenu
4. **Vérifier la conformité** — appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Se référer aux benchmarks sectoriels** — consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — exécuter `python campaign-tracker.py --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les allégations restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les adaptations de ton spécifiques à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les slogans et le langage de positionnement ; `voice-and-tone.md` pour des règles de voix détaillées au-delà des 4 scores numériques. Pour produire du contenu destiné à un canal spécifique, les règles de style de ce canal prévalent sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail d'analytics, rassembler :

1. **Modèle économique** : SaaS, e-commerce, génération de leads, marketplace, etc. (détermine le cadre de KPI)
2. **Maturité de l'entreprise** : startup, croissance, scale-up ou entreprise établie (détermine la sophistication de la mesure)
3. **Métriques actuelles** : que suit-on déjà ? quels outils sont utilisés ?
4. **Pile analytique** : Google Analytics (GA4), plateformes publicitaires, CRM, outils BI, CDP, gestionnaires de balises
5. **Disponibilité des données** : combien de données historiques existe-t-il ? à quel niveau de granularité ?
6. **Audience du reporting** : qui reçoit les rapports ? (direction/C-suite, équipe marketing, conseil d'administration, clients)
7. **Problèmes connus** : y a-t-il des problèmes de qualité de données connus, des lacunes de suivi ou des changements récents ?
8. **Portée géographique** : marché unique ou multi-marché (affecte les réglementations de confidentialité)
9. **Contraintes de confidentialité** : RGPD, CCPA, ATT — quels mécanismes de consentement sont en place ?
10. **Question spécifique** : en cas d'investigation d'une anomalie, qu'est-ce qui a exactement changé et quand ?

Pour l'investigation d'anomalies, prioriser la rapidité. Demander la métrique spécifique, la période et tout changement connu. Pour le travail de mesure stratégique, rassembler le contexte complet.

## Capacités

- **Génération d'arbre de KPI par modèle économique** : cadres métriques hiérarchiques reliant les objectifs commerciaux de haut niveau aux métriques marketing actionnables, adaptés au SaaS, à l'e-commerce, à la génération de leads, à la marketplace, à l'abonnement, aux médias, et à d'autres modèles
- **Reporting standardisé** : modèles pour les instantanés de performance hebdomadaires, les revues stratégiques mensuelles, les revues d'activité trimestrielles, et les post-mortems de campagne — chacun conçu pour des audiences de parties prenantes différentes
- **Détection d'anomalies et diagnostic de causes profondes** : cadre diagnostique structuré pour investiguer les changements soudains de métriques — élimination systématique des causes (problèmes de suivi, événements externes, changements d'algorithme, saisonnalité, actions concurrentielles, changements internes)
- **Cadre d'intelligence concurrentielle** : méthodologie pour surveiller l'activité des concurrents sur tous les canaux (SEO, payant, social, contenu, RP), estimer les dépenses des concurrents, et comparer les performances
- **Guidance sur le Marketing Mix Modeling (MMM)** : cadre pour comprendre la contribution de chaque canal aux résultats de l'entreprise, y compris les exigences de données, les considérations de conception de modèle, et l'interprétation des résultats
- **Conception de tests d'incrémentalité** : conception d'expériences pour les tests de lift géographique, les tests de holdout, les études de lift de conversion, et les tests de marchés appariés afin de mesurer l'impact causal réel du marketing
- **Suivi du dark social** : méthodes pour mesurer l'activité de partage privé (raccourcisseurs de liens, boutons de partage équipés d'UTM, landing pages dédiées, attribution basée sur des enquêtes) et estimer la contribution du dark social
- **Attribution sans cookies** : approches d'attribution privacy-first incluant le suivi côté serveur, les stratégies de données first-party, les conversions modélisées, le marketing mix modeling, et les méthodes probabilistes
- **Pile de mesure privacy-first** : architecture de mesure complète conçue pour la conformité RGPD/CCPA, l'iOS ATT, la dépréciation des cookies, et l'évolution des réglementations de confidentialité
- **Architecture de tableau de bord** : conception de tableau de bord adaptée aux parties prenantes, avec hiérarchie des métriques, bonnes pratiques de visualisation, et configuration des alertes

## Processus

**Workflow principal : cadre de mesure et reporting**

1. **Contexte métier et alignement des objectifs**
   - Classifier le modèle économique et le stade de maturité
   - Identifier la métrique nord (la seule métrique la plus étroitement liée à la valeur commerciale)
   - Cartographier les objectifs commerciaux vers les objectifs marketing puis vers les métriques tactiques (arbre de KPI)
   - Déterminer l'audience du reporting et ses besoins de décision

2. **Construction de l'arbre de KPI**
   - Commencer par l'objectif commercial de haut niveau (revenu, croissance, rentabilité)
   - Décomposer en métriques de contribution marketing (revenu généré par le marketing, CAC, LTV)
   - Décomposer en métriques au niveau du canal (CPA par canal, ROAS, taux de conversion)
   - Ajouter des indicateurs avancés (trafic, engagement, pipeline, MQL)
   - Pour chaque KPI, définir :
     - **Définition** : exactement comment il est calculé (sans ambiguïté)
     - **Source** : d'où viennent les données
     - **Référence** : objectif ou benchmark sectoriel
     - **Cadence** : à quelle fréquence il est revu
     - **Propriétaire** : qui est responsable de cette métrique
   - Limiter le cadre à 15-25 KPI au total — davantage provoque une fatigue métrique et une dilution de l'attention

3. **Conception des modèles de reporting**
   - **Instantané hebdomadaire** (pour l'équipe marketing) :
     - Métriques clés vs objectif (trafic, leads, conversions, dépense, CPA)
     - Tendances semaine sur semaine avec indicateurs directionnels
     - Top 3 réussites et top 3 préoccupations
     - Actions à mener la semaine suivante
   - **Revue stratégique mensuelle** (pour la direction marketing) :
     - Performance mois sur mois et année sur année
     - Répartition de la contribution par canal
     - Analyse du taux de conversion du tunnel
     - Utilisation du budget et métriques d'efficacité
     - Insights stratégiques et recommandations
   - **Revue d'activité trimestrielle** (pour la direction/le conseil) :
     - Contribution du marketing aux objectifs de l'entreprise
     - Tendances de CAC, LTV et période de retour sur investissement
     - Mise à jour du positionnement concurrentiel
     - Priorités stratégiques du trimestre suivant
   - **Rapport de campagne** (par campagne) :
     - Performance vs KPI prédéfinis
     - Analyse canal par canal
     - Performance créative et d'audience
     - Enseignements et recommandations

4. **Protocole d'investigation des anomalies**
   Lorsqu'un utilisateur signale un changement métrique soudain, suivre cette séquence diagnostique :

   - **Étape 1 : vérifier les données**
     - Le code de suivi se déclenche-t-il toujours correctement ?
     - Un gestionnaire de balises, un outil de consentement ou un filtre analytique a-t-il changé ?
     - Vérifier les pannes de plateforme ou les retards de reporting
     - Si les données sont corrompues, corriger d'abord le suivi — ne pas analyser des données erronées

   - **Étape 2 : définir l'anomalie précisément**
     - Quelle métrique a changé ? De combien ? Sur quelle période ?
     - S'agit-il de tout le trafic ou d'un segment spécifique (canal, appareil, géographie, page) ?
     - Le changement s'est-il produit soudainement ou progressivement ?

   - **Étape 3 : vérifier les facteurs externes**
     - Mise à jour d'algorithme Google (vérifier SEMrush Sensor, MozCast)
     - Actualité sectorielle ou motifs saisonniers
     - Changements d'activité des concurrents
     - Changements de politique ou de fonctionnalité de plateforme

   - **Étape 4 : vérifier les facteurs internes**
     - Changements sur le site web (déploiements, changements d'URL, redirections)
     - Changements de contenu (publié, retiré ou modifié)
     - Changements de campagne (lancée, mise en pause, budget modifié)
     - Problèmes techniques (vitesse du site, erreurs serveur, rendu mobile)

   - **Étape 5 : isoler et diagnostiquer**
     - Recouper l'anomalie avec les facteurs identifiés
     - Déterminer la cause profonde la plus probable
     - Estimer l'impact et le délai de rétablissement attendu
     - Recommander des actions correctives

5. **Architecture de mesure privacy-first**
   - Auditer la mesure actuelle pour les lacunes de conformité en matière de confidentialité
   - Concevoir une pile de mesure fonctionnant sans cookies tiers :
     - Suivi côté serveur pour les points de contact propres
     - Stratégie d'enrichissement de données first-party
     - Gestion du consentement conforme à la confidentialité
     - API de conversion natives de plateforme (Meta CAPI, Google Enhanced Conversions)
     - Conversions modélisées pour les lacunes d'attribution
     - Marketing mix modeling pour l'efficacité au niveau du canal
     - Tests d'incrémentalité pour la validation causale
   - Créer un plan de transition de l'état actuel vers l'architecture privacy-first
   - Tenir compte de l'impact de l'iOS ATT sur les segments d'audience à forte présence iOS

## Fichiers de référence

- `kpi-frameworks.md` — arbres de KPI spécifiques au modèle économique, définitions des métriques, bases de données de benchmarks, et guide de sélection de la métrique nord
- `reporting-templates.md` — modèles de reporting hebdomadaire, mensuel, trimestriel et de campagne avec formatage et guidance de visualisation adaptés aux parties prenantes
- `anomaly-diagnosis.md` — arbre de décision diagnostique, causes profondes courantes par type de métrique, checklists de vérification, et playbooks de résolution
- `competitive-intelligence.md` — méthodologie de surveillance des concurrents, recommandations d'outils, cadres de benchmarking, et playbooks de réponse concurrentielle
- `mmm-framework.md` — exigences de données pour le marketing mix modeling, guidance de conception de modèle, interprétation des résultats, et recommandations d'optimisation
- `incrementality-testing.md` — modèles de conception d'expérience (lift géographique, holdout, lift de conversion), calculs de puissance statistique, et cadres d'analyse des résultats
- `dark-social-tracking.md` — méthodes de mesure du dark social, guides de mise en œuvre pour suivre les partages privés, et modèles d'estimation
- `privacy-first-measurement.md` — approches d'attribution sans cookies, architecture de gestion du consentement, mise en œuvre du suivi côté serveur, et guide de conformité aux réglementations de confidentialité
- `clv-analysis.md` — modèles de valeur vie client (historique, basé sur les cohortes, prédictif, contractuel), guidance de calcul, et application à la segmentation et aux décisions budgétaires
- `dashboard-design.md` — architecture de tableau de bord à trois niveaux (exécutif, opérationnel, campagne), sélection des métriques par audience, et bonnes pratiques de visualisation

## Formats de livrables

| Livrable | Format | Description |
|---|---|---|
| Cadre de KPI | Document + feuille de calcul | Arbre métrique hiérarchique avec définitions, benchmarks, propriétaires et cadence |
| Rapport de performance hebdomadaire | Document / spécification de tableau de bord | Instantané modélisé des métriques clés, tendances, réussites, préoccupations et actions |
| Rapport stratégique mensuel | Document / spécification de tableau de bord | Analyse approfondie avec répartition par canal, analyse du tunnel, et recommandations |
| Rapport de diagnostic d'anomalie | Document | Analyse de cause profonde avec preuves, estimation d'impact, et actions correctives |
| Brief d'intelligence concurrentielle | Document + feuille de calcul | Vue d'ensemble des concurrents, analyse par canal, part de voix, et implications stratégiques |
| Évaluation de la préparation au MMM | Document | Audit de disponibilité des données, analyse de faisabilité du modèle, et feuille de route de mise en œuvre |
| Plan de test d'incrémentalité | Document | Conception d'expérience, taille d'échantillon, calendrier, hypothèse, et critères de succès |
| Architecture de mesure | Document + diagramme | Conception complète de la pile de mesure avec conformité en matière de confidentialité et plan de mise en œuvre |
| Spécification de tableau de bord | Document + wireframe | Mise en page du tableau de bord, sélection des métriques, types de visualisation, et règles d'alerte |

## Cas particuliers

### Données insuffisantes pour le MMM (<2 ans)
- **Situation** : l'utilisateur souhaite un marketing mix modeling mais dispose de moins de 2 ans de données marketing cohérentes
- **Approche** : être honnête sur la limitation — le MMM nécessite suffisamment de données en série temporelle pour séparer le signal du bruit. Avec moins de 2 ans : (1) commencer dès maintenant à collecter et structurer les données pour une modélisation future. (2) utiliser une attribution plus simple au niveau du canal comme pont. (3) mener des tests d'incrémentalité pour obtenir des données causales sur les canaux clés. (4) envisager des approches plus légères comme l'analyse de régression sur les données disponibles, avec des réserves claires sur les niveaux de confiance. (5) construire vers une préparation au MMM avec une feuille de route de collecte de données. Ne pas tenter de construire un MMM complet sur des données insuffisantes — les résultats seraient trompeurs et potentiellement néfastes pour les décisions budgétaires.

### L'iOS ATT détruit l'attribution
- **Situation** : une portion significative des conversions est impossible à suivre en raison des retraits liés à l'iOS App Tracking Transparency, rendant les données d'attribution peu fiables
- **Approche** : reconnaître explicitement la lacune plutôt que de prétendre que les données d'attribution sont encore complètes. Mettre en œuvre : (1) les API de conversion des plateformes (Meta CAPI, Google Enhanced Conversions) pour récupérer une partie du signal. (2) le suivi côté serveur pour les points de contact propres. (3) les conversions modélisées à l'aide des modèles statistiques des plateformes (avec un scepticisme approprié quant à l'auto-déclaration des plateformes). (4) l'appariement de données first-party là où le consentement existe. (5) le marketing mix modeling en complément de l'attribution basée sur les clics. (6) les tests d'incrémentalité pour les canaux à forte dépense. (7) l'attribution basée sur des enquêtes (« comment avez-vous entendu parler de nous ? ») comme vérification qualitative. L'objectif est la triangulation — aucune méthode seule n'est suffisante ; combiner plusieurs approches.

### Le dark social domine le trafic de référence
- **Situation** : une large part du trafic « direct » provient en réalité de partages privés (Slack, WhatsApp, transferts d'e-mail, Discord) et l'attribution est aveugle
- **Approche** : estimer l'impact du dark social en analysant le trafic « direct » vers des URL autres que la page d'accueil (les personnes tapent rarement des URL profondes directement). Mettre en œuvre des améliorations de mesure : (1) ajouter des boutons de partage social avec des paramètres UTM pour suivre les liens partagés. (2) utiliser des raccourcisseurs de liens avec suivi pour le contenu partageable. (3) créer des landing pages dédiées pour les cas d'usage communautaires/de partage. (4) ajouter des enquêtes « comment avez-vous trouvé cela ? » aux points de conversion clés. (5) surveiller la vélocité de partage de contenu à l'aide d'outils de social listening. (6) accepter qu'une partie du dark social restera non mesurée et intégrer cette incertitude dans le reporting. (7) envisager d'investir davantage dans des canaux propices au dark social (communauté, bouche-à-oreille, recommandation) même sans mesure parfaite.

### Attribution B2B multi-touch sur des cycles de 12 mois et plus
- **Situation** : les transactions B2B en entreprise prennent 12 à 24 mois avec des dizaines de points de contact impliquant plusieurs parties prenantes, rendant les modèles d'attribution traditionnels dénués de sens
- **Approche** : abandonner les modèles purement au dernier ou au premier point de contact — aucun des deux ne reflète la réalité. Mettre en œuvre : (1) une attribution basée sur le compte qui mesure les points de contact au niveau du compte, et non individuel. (2) un reporting basé sur l'influence, montrant quels canaux ont contribué au pipeline, même s'ils n'ont pas « généré » la transaction. (3) pondérer les modèles vers une décroissance temporelle avec des poids plus élevés sur les points de contact récents à forte intention. (4) utiliser l'attribution auto-déclarée de l'équipe commerciale et des enquêtes auprès des acheteurs en complément du suivi digital. (5) mesurer l'efficacité du canal par la vélocité du pipeline (ce canal accélère-t-il les transactions ?) et non uniquement par la génération. (6) accepter qu'une attribution parfaite est impossible pour un B2B complexe et se concentrer sur des insights directionnels plutôt qu'une fausse précision.

### Traitement de données réglementées
- **Situation** : l'utilisateur évolue dans la santé (HIPAA), les services financiers, l'éducation (FERPA), ou d'autres secteurs soumis à des réglementations strictes de traitement des données
- **Approche** : avant toute mise en œuvre analytique, signaler le contexte réglementaire. S'assurer que : (1) les données personnelles identifiables (PII) ne transitent jamais par les plateformes analytiques sans consentement et accords de traitement appropriés. (2) le stockage des données respecte les exigences régionales (résidence des données). (3) la gestion du consentement est explicite et granulaire. (4) les fournisseurs analytiques disposent des certifications de conformité appropriées (SOC 2, BAA pour HIPAA, etc.). (5) le suivi au niveau utilisateur est remplacé par une analyse en cohorte ou agrégée lorsque requis. (6) les politiques de rétention des données sont documentées et appliquées. Recommander l'implication d'un responsable de la conformité ou d'un conseiller juridique pour toute architecture de mesure dans des secteurs réglementés. Ne jamais présumer que les bonnes pratiques analytiques générales sont conformes dans des contextes réglementés.

## Compétences associées

- **Campaign Orchestrator** — pour traduire les insights analytiques en optimisations de campagne, réallocations budgétaires et décisions stratégiques
- **Funnel Architect** — pour relier les métriques par étape du tunnel au cadre de KPI et diagnostiquer les anomalies de taux de conversion
- **Content Engine** — pour mesurer la performance du contenu, identifier la dégradation du contenu, et éclairer la stratégie de contenu avec des données
- **AEO/GEO Intelligence** — pour suivre les métriques de visibilité IA et intégrer les données de citation IA dans le cadre de mesure
- **Audience Intelligence** — pour valider les hypothèses de persona avec des données comportementales et construire des segments basés sur les données
- **Digital PR & Authority** — pour mesurer l'impact des médias gagnés, l'acquisition de backlinks, et la part de voix

## Efficacité contextuelle

Les documents de référence de cette compétence (`skills/<this-skill>/*.md`) totalisent environ 30-50 Ko. Ne les chargez pas de manière anticipée — sélectionnez des sections ciblées :

- **Grep avant Read.** Trouvez d'abord le mot-clé ou le titre de section, puis utilisez Read avec `offset` + `limit` pour ne récupérer que cette plage.
- **Parcourez `${CLAUDE_SKILL_DIR}` une seule fois.** Utilisez un seul listing de répertoire pour voir ce qui s'y trouve, puis lisez uniquement les fichiers correspondant à votre étape actuelle.
- **Une source à la fois.** Si le workflow indique de « consulter trois fichiers de référence », lisez-les séquentiellement après avoir déterminé ce dont vous avez besoin dans chacun. Charger les trois en bloc dépasse le budget de 5 000 tokens par compétence que l'auto-compaction réserve.
- **Éliminez le bruit des entrées CSV.** Si l'entrée est un CSV volumineux, grep d'abord la ligne d'en-tête pour choisir les colonnes, puis traitez ligne par ligne — ne lisez pas le fichier entier dans le contexte.

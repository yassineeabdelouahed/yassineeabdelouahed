---
name: funnel-architect
description: "Concevez ou restructurez un tunnel marketing adapté au modèle économique — architecture d'étapes avec critères d'entrée/sortie et KPI, une carte du parcours client avec émotions et points de friction, une analyse d'écarts, une recommandation de modèle d'attribution, et une feuille de route d'optimisation sur 30/60/90 jours. Planifie et diagnostique ; n'exécute pas de campagnes. Se déclenche sur « /digital-marketing-pro:funnel-architect », « cartographie notre parcours client », « quel modèle d'attribution devrions-nous utiliser », « où perdons-nous des clients », « conçois un tunnel pour notre SaaS ». Lit le profil de marque, les benchmarks sectoriels, et l'historique des campagnes ; se combine avec /digital-marketing-pro:funnel-audit pour un diagnostic basé sur les données."
---

# Funnel Architect

## Quand utiliser cette compétence

Activez ce module lorsque la demande de l'utilisateur concerne l'un des éléments suivants :

- **Conception de tunnel** : construire ou restructurer un tunnel marketing/vente pour un modèle économique spécifique
- **Cartographie du parcours client** : visualiser le chemin de bout en bout depuis la première prise de conscience jusqu'à la défense de marque post-achat
- **Modélisation d'attribution** : déterminer comment le crédit des conversions doit être réparti entre les points de contact
- **Analyse de tunnel** : diagnostiquer où les prospects abandonnent et pourquoi
- **Optimisation du chemin de conversion** : améliorer la séquence d'interactions menant à la conversion
- **Analyse d'écarts** : identifier les étapes, points de contact, ou contenus manquants dans un tunnel existant
- **Stratégie de micro-conversion** : définir et optimiser les petits engagements menant aux macro-conversions

**Expressions déclencheuses** : « tunnel », « parcours client », « attribution », « chemin de conversion », « où perdons-nous des clients », « parcours acheteur », « TOFU/MOFU/BOFU », « flux de nurturing de leads », « analyse d'abandon », « cartographie des points de contact », « pipeline », « taux de conversion par étape »

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

Avant d'exécuter un travail sur le tunnel, rassembler :

1. **Modèle économique** : SaaS, e-commerce, génération de leads, marketplace, abonnement, basé sur le service, hybride, etc.
2. **État actuel du tunnel** : un tunnel documenté existe-t-il ? Quelles étapes sont définies ? Quels outils le suivent ?
3. **Modèle de revenu** : comment l'entreprise gagne de l'argent (abonnement, achat unique, freemium, etc.)
4. **Taille moyenne des deals & durée du cycle de vente** : critique pour déterminer la complexité du tunnel
5. **Actions de conversion clés** : qu'est-ce qui compte comme un lead, un MQL, un SQL, une opportunité, un client ?
6. **Métriques actuelles** : taux de conversion entre les étapes si disponibles
7. **Stack technique** : CRM, automatisation marketing, plateformes analytics utilisées
8. **Structure d'équipe** : y a-t-il une équipe de vente séparée ? Est-ce du product-led growth ? Qui possède chaque étape du tunnel ?

Si l'utilisateur ne peut pas fournir tout le contexte, utiliser le modèle économique pour appliquer des valeurs par défaut raisonnables et noter les hypothèses.

**Contexte minimum viable** : le modèle économique et ce que l'entreprise vend. Tout le reste peut être déduit de ces deux entrées et affiné à mesure que plus d'informations émergent.

## Capacités

- **Conception de tunnel adaptative au modèle économique** : architectures de tunnel personnalisées pour 7 modèles économiques distincts (SaaS B2B, e-commerce/DTC, services/conseil B2B, entreprise locale, marketplace, créateur/marque personnelle, association à but non lucratif)
- **Cartographie du parcours avec émotions & points de friction** : cartes de parcours visuelles capturant non seulement les points de contact mais aussi les états émotionnels, les moments de friction, et les déclencheurs de décision à chaque étape
- **Sélection & conception du modèle d'attribution** : consignes pour choisir le bon modèle d'attribution (dernier clic, premier clic, linéaire, dégressif dans le temps, basé sur la position, data-driven, personnalisé) selon le contexte business
- **Modèles de tunnel** : cadres de tunnel prêts à l'emploi et personnalisables pour 7 modèles économiques avec étapes, KPI, et benchmarks de conversion par défaut
- **Analyse d'écarts** : identification systématique des étapes, contenus, points de contact, ou automatisations manquants dans un tunnel existant
- **Définition de micro-conversion** : identifier et séquencer les petites actions d'engagement qui construisent la macro-conversion
- **Cadre de KPI par étape** : définir les bonnes métriques pour chaque étape du tunnel afin que la performance soit mesurable
- **Analyse de vélocité du tunnel** : mesurer à quelle vitesse les prospects progressent à travers les étapes et identifier les goulots d'étranglement
- **Orchestration de parcours multi-touch** : concevoir des séquences de points de contact coordonnées sur les canaux
- **Extension du tunnel post-achat** : conception des étapes de rétention, d'expansion, et de défense de marque

## Processus

**Workflow principal : Conception & optimisation du tunnel**

1. **Classification du modèle économique**
   - Identifier le modèle économique (ou la combinaison hybride)
   - Déterminer le modèle de revenu et le cycle de vente typique
   - Classer comme mouvement de croissance product-led, sales-led, ou hybride
   - Sélectionner le modèle de tunnel approprié comme cadre de départ

2. **Évaluation de l'état actuel**
   - Si un tunnel existant est documenté, le cartographier étape par étape
   - Identifier quelles métriques sont actuellement suivies à chaque étape
   - Noter où le suivi se rompt ou où les données deviennent aveugles
   - Documenter tous les points de contact actuels (publicités, contenu, emails, appels commerciaux, interactions produit)

3. **Cartographie du parcours**
   - Cartographier le parcours client complet, de l'inconscience à la défense de marque
   - Pour chaque étape, documenter :
     - **Points de contact** : avec quoi le prospect interagit
     - **Actions** : ce qu'il fait (micro-conversions)
     - **Émotions** : ce qu'il ressent (enthousiasme, confusion, hésitation, confiance)
     - **Points de friction** : ce qui le ralentit ou cause l'abandon
     - **Déclencheurs de décision** : ce qui le fait passer à l'étape suivante
     - **Besoins de contenu** : quelle information il lui faut à ce moment
   - Inclure les chemins parallèles (tous les parcours ne sont pas linéaires)

4. **Analyse d'écarts**
   - Comparer l'état actuel au tunnel idéal pour ce modèle économique
   - Identifier les étapes manquantes ou les transitions non définies
   - Signaler les écarts de contenu (étapes sans contenu de support)
   - Mettre en évidence les écarts d'automatisation (transferts manuels qui devraient être automatisés)
   - Détecter les écarts de mesure (étapes sans KPI)
   - Repérer les écarts de canal (étapes servies par un seul canal)

5. **Conception de l'architecture du tunnel**
   - Définir chaque étape avec des critères d'entrée/sortie clairs
   - Assigner des KPI et des benchmarks de conversion à chaque étape
   - Concevoir la séquence de micro-conversion
   - Cartographier le contenu à chaque étape (existant et nécessaire)
   - Préciser les déclencheurs et règles d'automatisation
   - Définir les protocoles de transfert entre marketing et ventes (le cas échéant)

6. **Recommandation de modèle d'attribution**
   - Selon la complexité du tunnel, la durée du cycle de vente, et les données disponibles, recommander un modèle d'attribution
   - Expliquer les arbitrages de la recommandation vs les alternatives
   - Fournir des consignes de mise en œuvre pour leur stack technique

7. **Feuille de route d'optimisation**
   - Prioriser les améliorations par impact et effort
   - Définir un plan de test A/B pour les transitions d'étape à fort impact
   - Mettre en place une cadence de surveillance pour les métriques de santé du tunnel
   - Créer un plan d'optimisation sur 30/60/90 jours

**Workflow secondaire : Diagnostic de tunnel (quand un tunnel existe mais sous-performe)**

1. **Collecte de données**
   - Rassembler les taux de conversion entre chaque étape sur les 3-6 derniers mois
   - Récupérer les données de temps jusqu'à conversion (combien de temps les prospects passent à chaque étape)
   - Identifier le volume à chaque étape pour construire la cascade complète du tunnel

2. **Analyse d'abandon**
   - Calculer l'abandon absolu et relatif à chaque transition d'étape
   - Identifier le point d'abandon le plus important (le « seau percé »)
   - Segmenter l'abandon par source de trafic, appareil, géographie, et segment d'audience
   - Déterminer si l'abandon est un problème de volume (pas assez d'entrées dans l'étape) ou un problème de conversion (ils entrent mais n'avancent pas)

3. **Identification de la cause racine**
   - Pour chaque transition à fort abandon, investiguer :
     - Le contenu à cette étape est-il suffisamment convaincant ?
     - Le CTA est-il clair et la prochaine étape évidente ?
     - Y a-t-il un point de friction (formulaires longs, UX confuse, informations requises que le prospect n'a pas) ?
     - Le timing est-il mauvais (demander trop tôt trop de choses) ?
     - Y a-t-il un écart de confiance (preuve sociale ou crédibilité insuffisante à cette étape) ?
   - Recouper avec des données qualitatives (retours clients, contribution de l'équipe commerciale, enregistrements de session) si disponibles

4. **Priorisation des corrections**
   - Noter chaque problème identifié sur l'impact (combien d'amélioration de conversion est possible) et l'effort (à quel point la correction est difficile)
   - Se concentrer d'abord sur les corrections à fort impact et faible effort
   - Concevoir des expériences précises pour tester chaque correction avant un déploiement complet

## Fichiers de référence

- `journey-mapping.md` — méthodologie de cartographie du parcours client, cadre de cartographie des émotions, catalogage des points de contact, et modèles de visualisation de parcours
- `attribution-models.md` — comparaison détaillée des modèles d'attribution, arbre de décision des critères de sélection, guides de mise en œuvre par plateforme, et conception de modèle personnalisé
- `funnel-templates.md` — architectures de tunnel prêtes à l'emploi pour 7 modèles économiques avec étapes, benchmarks, et guides de personnalisation par défaut
- `gap-analysis.md` — cadre d'analyse d'écarts, questions diagnostiques, schémas d'écarts communs par modèle économique, et notation de priorisation
- `sales-marketing-alignment.md` — cadres d'alignement ventes-marketing, définitions de transfert de lead (MQL/SQL), conception de SLA, et cartographie de la propriété des étapes du tunnel

## Formats de sortie

| Livrable | Format | Description |
|---|---|---|
| Architecture de tunnel | Diagramme visuel + document | Tunnel étape par étape avec critères d'entrée/sortie, KPI, et cartographie du contenu |
| Carte du parcours client | Carte visuelle + récit | Parcours complet de la prise de conscience à la défense de marque avec émotions, friction, et déclencheurs |
| Rapport d'analyse d'écarts | Document avec priorités | Tous les écarts identifiés avec sévérité, score d'impact, et recommandations de correction |
| Spécification de modèle d'attribution | Document | Modèle recommandé avec justification, alternatives, et étapes de mise en œuvre |
| Tableau de bord KPI par étape | Spécification de tableau/tableur | Métriques, benchmarks, et méthodologie de suivi pour chaque étape du tunnel |
| Carte de micro-conversion | Diagramme + document | Actions d'engagement séquencées construisant vers les macro-conversions |
| Feuille de route d'optimisation du tunnel | Plan priorisé | Plan sur 30/60/90 jours avec actions précises, responsables, et impact attendu |

## Cas particuliers

### Modèles économiques hybrides
- **Situation** : l'entreprise combine plusieurs modèles (par ex. SaaS avec une composante marketplace, ou e-commerce avec abonnement)
- **Approche** : construire un tunnel principal basé sur le modèle de revenu dominant, puis superposer des chemins secondaires. Identifier où les tunnels divergent et convergent. Créer des définitions d'étape distinctes pour chaque chemin mais une attribution unifiée. Ne pas forcer un modèle unique — les modèles hybrides ont besoin de tunnels hybrides.

### Marketplaces à deux versants
- **Situation** : l'entreprise sert à la fois le côté offre (vendeurs, prestataires) et le côté demande (acheteurs, consommateurs)
- **Approche** : concevoir des tunnels parallèles pour chaque côté. Cartographier les interdépendances (où l'étape du tunnel d'un côté dépend de l'activité de l'autre côté). Identifier les dynamiques de « l'œuf et la poule » et concevoir le tunnel pour résoudre d'abord le côté contraint. Suivre les métriques de liquidité de marketplace aux côtés des métriques de conversion.

### Parcours de l'hors-ligne vers le en-ligne
- **Situation** : une part importante du parcours se déroule hors ligne (événements, vente au détail, appels téléphoniques, vente sur le terrain)
- **Approche** : créer des étapes explicites de « tunnel obscur » où le suivi est limité. Concevoir des mécanismes de pont (codes QR, URL uniques, numéros de suivi d'appel, saisie manuelle CRM) pour connecter les interactions hors ligne au tunnel numérique. Reconnaître honnêtement les limites de mesure et recommander des métriques de substitution là où le suivi direct est impossible.

### Cycles B2B très longs (12+ mois)
- **Situation** : vente entreprise avec comités d'achat, appels d'offres, revue juridique, et cycles de 12-24 mois
- **Approche** : construire un tunnel basé sur des jalons plutôt que sur le temps. Concevoir pour les dynamiques du comité d'achat (champion, acheteur économique, évaluateur technique, juridique). Inclure des boucles de « réengagement » pour les deals bloqués. Utiliser une notation au niveau du compte plutôt qu'une notation de lead individuel. L'attribution doit être multi-touch avec une pondération dégressive dans le temps forte. Les besoins de contenu sont profonds et spécifiques à chaque étape — synthèses exécutives pour le comité de direction, documents techniques pour les évaluateurs, modèles de ROI pour la finance.

### Tunnels de croissance product-led (PLG)
- **Situation** : l'usage du produit EST le mécanisme principal du tunnel — les utilisateurs s'auto-servent via un niveau gratuit ou un essai avant de convertir
- **Approche** : le tunnel est porté par l'engagement produit, pas par les touches marketing traditionnelles. Concevoir autour des jalons d'activation (les « moments aha » dans le produit). Cartographier la progression de l'inscription à l'activation à l'engagement à la conversion à l'expansion. Définir les leads qualifiés par le produit (PQL) selon des seuils d'usage plutôt que des leads qualifiés par le marketing. Intégrer les analytics produit (Amplitude, Mixpanel, Pendo) comme outil de suivi principal du tunnel. Le rôle du marketing se déplace vers la génération d'inscriptions et le soutien à l'activation via la messagerie in-app, les emails d'onboarding, et le contenu éducatif.

### Tunnel sans données existantes
- **Situation** : nouvelle entreprise ou nouveau marché sans données historiques de tunnel à analyser
- **Approche** : construire un tunnel hypothétique en utilisant des benchmarks sectoriels et des modèles de modèle économique. Définir clairement les hypothèses de taux de conversion par étape et les étiqueter comme des hypothèses. Concevoir le tunnel avec la mesure intégrée dès le premier jour pour que les données s'accumulent rapidement. Recommander une phase « instrumenter et apprendre » de 90 jours où l'objectif est la collecte de données et la validation d'hypothèses, pas l'optimisation. Fixer des seuils minimums de trafic/volume pour chaque étape avant de tirer des conclusions des taux de conversion.

## Compétences associées

- **Campaign Orchestrator** — pour exécuter les campagnes qui génèrent du trafic dans le tunnel et font avancer les prospects à travers les étapes
- **Audience Intelligence** — pour comprendre qui entre dans le tunnel, construire des personas pour chaque étape, et segmenter par comportement de tunnel
- **Analytics & Insights** — pour mesurer la performance du tunnel, l'analyse d'attribution, et la détection d'anomalies dans les taux de conversion
- **Content Engine** — pour créer le contenu spécifique à chaque étape cartographié à chaque point de contact du tunnel
- **AEO/GEO Intelligence** — pour optimiser l'étape de notoriété en haut de tunnel où les réponses générées par IA pilotent la découverte

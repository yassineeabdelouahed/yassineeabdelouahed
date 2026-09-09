---
name: campaign-orchestrator
description: "Module complet de cycle de vie de campagne — produit des briefs de campagne, des allocations budgétaires via trois modèles (70/20/10, classé par efficacité, pondéré par le tunnel), des mix de canaux et des plans média, des taxonomies UTM avec règles de gouvernance, des checklists de lancement, des plans ABM, et des rapports de bilan (post-mortem). Planifie et documente ; ne lance ni ne modifie de campagnes en direct. Se déclenche sur \"/digital-marketing-pro:campaign-orchestrator\", \"build a media plan\", \"how should we split budget across channels\", \"set up UTM naming conventions\", \"run a post-mortem on the campaign\". Lit le profil de marque, les guidelines, et l'historique des campagnes via campaign-tracker.py ; ses documents de référence sont consommés par /digital-marketing-pro:campaign-plan plutôt que dupliqués."
---

# Campaign Orchestrator

## Quand utiliser cette compétence

Activez ce module quand la demande de l'utilisateur implique l'un des éléments suivants :

- **Planification de campagne** : concevoir une nouvelle campagne marketing du brief au plan de lancement
- **Allocation budgétaire** : répartir les dépenses marketing entre canaux, campagnes, ou périodes
- **Optimisation du mix de canaux** : sélectionner et équilibrer les bons canaux marketing pour un objectif
- **Planification média** : construire un plan média avec placements, timing, et dépenses
- **Suivi UTM** : standardiser les paramètres de suivi d'URL pour la mesure de campagne
- **Orchestration cross-canal** : coordonner le message et le timing sur plusieurs canaux
- **Bilan de campagne (post-mortem)** : analyser les campagnes terminées pour en extraire des enseignements
- **Planification de campagne ABM** : concevoir des campagnes marketing basées sur les comptes pour des cibles ciblées
- **Calendrier de campagne** : construire un plan séquencé dans le temps des activités de campagne

**Phrases déclencheuses** : « campaign plan », « marketing budget », « budget allocation », « channel mix », « media plan », « UTM », « tracking parameters », « launch campaign », « campaign review », « post-mortem », « what worked », « ABM », « account-based », « media buy », « ad spend », « 70/20/10 »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Charger le contexte de marque** — lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Utilisez le nom de marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité, et les concurrents du profil.
2. **Appliquer la voix de marque** — la formalité, l'énergie, l'humour, les niveaux d'autorité doivent façonner tout le ton et les choix de mots du contenu
3. **Vérifier la conformité** — appliquez automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
4. **Référencer les référentiels sectoriels** — consultez `skills/context-engine/industry-profiles.md` pour le secteur de la marque
5. **Utiliser les spécifications de plateforme** — référencez `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
6. **Vérifier l'historique des campagnes** — exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
7. **Si aucune marque n'existe**, dites : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux poursuivre avec les meilleures pratiques générales. »
8. **Vérifier les guidelines de marque** — si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, chargez et appliquez : `restrictions.md` pour les mots interdits, les déclarations restreintes, et les mentions légales obligatoires ; `channel-styles.md` pour les dérogations de ton par canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les slogans, et le langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Si vous produisez du contenu pour un canal spécifique, les règles de style de canal priment sur les paramètres de voix de base.

Ne demandez jamais à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter le travail de campagne, rassemblez :

1. **Objectif de la campagne** : quel est l'objectif principal ? (notoriété, génération de leads, chiffre d'affaires, rétention, lancement produit, événement, etc.)
2. **Budget** : dépense totale disponible et toute contrainte sur l'allocation
3. **Chronologie** : date de début, date de fin, et tout jalon clé ou échéance externe
4. **Audience cible** : à qui s'adresse cette campagne ? (relier au module Audience Intelligence si des personas existent)
5. **Canaux actuellement utilisés** : quelles plateformes/canaux l'équipe fait-elle déjà tourner ?
6. **Performance historique** : résultats de campagnes passées, CPA par canal, données de ROAS si disponibles
7. **Actifs créatifs** : qu'est-ce qui existe ? qu'est-ce qui doit être créé ?
8. **Stack technologique** : plateformes publicitaires, outils d'automatisation, CRM, outils analytics utilisés
9. **Capacité d'équipe** : qui va exécuter ? équipe interne, agence, ou hybride ?
10. **Contraintes** : restrictions réglementaires, guidelines de marque, considérations concurrentielles

Si le budget et l'objectif sont connus, avancez et comblez les lacunes avec des hypothèses de bonne pratique. Documentez toujours les hypothèses.

## Capacités

- **Génération de brief de campagne** : briefs structurés couvrant l'objectif, l'audience, le message, les canaux, la chronologie, le budget, les KPI, et les besoins créatifs
- **Modèles d'allocation budgétaire** : trois cadres éprouvés :
  - **70/20/10** : 70 % canaux éprouvés, 20 % canaux prometteurs, 10 % expérimental
  - **Classé par efficacité** : allouer selon les données de performance CPA/ROAS des canaux
  - **Pondéré par le tunnel** : répartir le budget selon où le tunnel a le plus besoin d'investissement
- **Optimisation du mix de canaux** : sélection de canaux pilotée par les données selon l'audience, l'objectif, le budget, et les référentiels sectoriels
- **Standardisation UTM** : taxonomie UTM complète avec conventions de nommage, spécifications de générateur d'URL, et règles de gouvernance
- **Orchestration cross-canal** : séquencement et coordination des points de contact sur les canaux pour une expérience de campagne cohérente
- **Bilan de campagne (post-mortem)** : cadre d'analyse structuré couvrant la performance vs les objectifs, la contribution par canal, la performance créative, les insights d'audience, et les enseignements actionnables
- **Planification de campagne ABM** : sélection de comptes, niveaux de personnalisation, orchestration multicanal pour les comptes cibles, et alignement ventes-marketing
- **Modèles de plan média** : plans détaillés avec placements, formats, ciblage, budgets, calendriers, et performance attendue
- **Évaluation des risques de campagne** : identification des points de défaillance potentiels et des stratégies d'atténuation avant le lancement

## Processus

**Flux de travail principal : planification et exécution de campagne**

1. **Développement du brief de campagne**
   - Définissez l'objectif SMART (Spécifique, Mesurable, Atteignable, Pertinent, Temporellement défini)
   - Documentez l'audience cible (référencez les personas existants ou construisez-en de légers)
   - Élaborez le message central de la campagne et la proposition de valeur
   - Définissez le CTA principal et l'action de conversion souhaitée
   - Fixez les KPI primaires et secondaires avec des objectifs précis
   - Identifiez le thème/concept de campagne si une direction créative est nécessaire

2. **Allocation budgétaire**
   - Sélectionnez le modèle d'allocation selon les données disponibles :
     - **Pas de données historiques** : utilisez le 70/20/10 avec les référentiels sectoriels
     - **Quelques données de performance** : utilisez l'allocation classée par efficacité
     - **Programme mature avec données de tunnel** : utilisez l'allocation pondérée par le tunnel
   - Construisez la répartition budgétaire par canal, par semaine/mois
   - Incluez les coûts de production (créatif, landing pages, outils) dans le budget
   - Réservez 10-15 % de contingence pour l'optimisation en cours de campagne
   - Définissez les déclencheurs de réallocation budgétaire (ex. : « transférer le budget du canal A vers B si le CPA dépasse X $ à la semaine 3 »)

3. **Stratégie de canal et plan média**
   - Sélectionnez les canaux selon la présence de l'audience, l'adéquation à l'objectif, et les contraintes budgétaires
   - Pour chaque canal, définissez :
     - Les paramètres de ciblage
     - Les formats et placements publicitaires
     - La variation de message (adaptez le message central au contexte du canal)
     - Le budget et le calendrier
     - La performance attendue (impressions, clics, conversions, CPA)
   - Séquencez les points de contact entre canaux (les canaux de notoriété se déclenchent en premier, le retargeting suit)
   - Concevez la stratégie de plafond de fréquence cross-canal

4. **Configuration UTM et suivi**
   - Construisez la taxonomie UTM pour cette campagne :
     - `utm_source` : plateforme (google, facebook, linkedin, email, etc.)
     - `utm_medium` : type de canal (cpc, social, email, display, etc.)
     - `utm_campaign` : nom de campagne (convention de nommage standardisée)
     - `utm_term` : mot-clé ou ciblage (pour la recherche payante, segment d'audience)
     - `utm_content` : variante créative (ad-a, ad-b, hero-video, etc.)
   - Générez toutes les URL de campagne avec les UTM appliqués
   - Vérifiez que les pixels de suivi et les événements de conversion sont configurés
   - Testez la chaîne de suivi complète avant le lancement

5. **Checklist de lancement**
   - Actifs créatifs approuvés et téléversés
   - Landing pages en ligne et testées (vitesse de chargement, mobile, formulaires, suivi)
   - Liens UTM vérifiés et testés par clic
   - Suivi de conversion confirmé avec des conversions de test
   - Budgets et calendriers correctement définis sur toutes les plateformes
   - Rôles d'équipe et chemins d'escalade définis
   - Tableau de bord de suivi mis en place avec des KPI en temps réel

6. **Optimisation en cours de campagne**
   - Définissez la cadence de points de contrôle (quotidienne la première semaine, puis hebdomadaire)
   - Fixez les déclencheurs et règles d'optimisation (quand mettre en pause, monter en puissance, ou réallouer)
   - Testez A/B les variations créatives et de message
   - Surveillez la fatigue publicitaire, la saturation d'audience, et l'interférence concurrentielle
   - Exécutez la réallocation budgétaire selon les déclencheurs prédéfinis

7. **Bilan et extraction d'enseignements**
   - Performance vs objectif pour chaque KPI
   - Analyse de contribution canal par canal
   - Classement de la performance créative
   - Performance par segment d'audience
   - Ce qui a fonctionné, ce qui n'a pas fonctionné, et pourquoi
   - Recommandations spécifiques pour la prochaine campagne
   - Référentiels mis à jour pour la future allocation budgétaire

## Fichiers de référence

- `campaign-planning.md` — modèle de brief de campagne, cadre d'objectif SMART, et processus de développement du concept de campagne
- `budget-allocation.md` — modèles d'allocation détaillés (70/20/10, classé par efficacité, pondéré par le tunnel), déclencheurs de réallocation, et modèle de budget
- `channel-strategy.md` — matrice de sélection de canaux, spécifications canal par canal (formats, ciblage, référentiels), et playbook d'orchestration cross-canal
- `utm-tracking.md` — conventions de nommage UTM, spécification de générateur d'URL, règles de gouvernance, et erreurs UTM courantes à éviter
- `post-mortem.md` — cadre de bilan, modèle d'analyse, méthodologie d'extraction d'enseignements, et processus de mise à jour des référentiels
- `abm-strategy.md` — critères de sélection de comptes, cadre de niveaux de personnalisation, playbook de canal ABM, et protocole d'alignement ventes-marketing
- `sales-enablement.md` — taxonomie de contenu d'aide à la vente, anatomie de battle card, mapping de contenu aux étapes de vente, bibliothèque de traitement des objections, et métriques de contenu commercial

## Formats de sortie

| Livrable | Format | Description |
|---|---|---|
| Brief de campagne | Document | Brief complet avec objectif, audience, message, canaux, chronologie, KPI |
| Plan d'allocation budgétaire | Tableur | Budget canal par canal avec répartition hebdomadaire/mensuelle et contingence |
| Plan média | Tableur | Placements détaillés, formats, ciblage, budgets, calendriers, et prévisions |
| Feuille de suivi UTM | Tableur | Toutes les URL de campagne avec paramètres UTM standardisés |
| Checklist de lancement | Document de checklist | Éléments de vérification pré-lancement avec suivi de statut |
| Rapport de bilan | Document | Analyse de performance, enseignements, et recommandations |
| Plan de campagne ABM | Document + tableur | Liste de comptes, plan de personnalisation, séquençage de canaux, et chronologie |
| Calendrier de campagne | Calendrier/chronologie | Chronologie visuelle de toutes les activités et jalons de campagne |

## Cas particuliers

### Budget minimal (<1 000 $/mois)
- **Situation** : budget média payant très limité, souvent une startup ou petite entreprise
- **Approche** : ne diluez PAS sur de nombreux canaux. Recommandez de concentrer 100 % du budget payant sur un seul canal à plus fort potentiel. Complétez avec des tactiques à coût nul (social organique, communauté, contenu, e-mail vers la liste existante). Concevez la campagne pour maximiser l'apprentissage par dollar. Fixez des attentes claires : à ce niveau de budget, l'objectif est l'apprentissage validé, pas l'échelle. Recommandez la campagne comme un test pour identifier le canal qui mérite un investissement plus important.

### Campagnes multi-marchés grand compte
- **Situation** : campagne mondiale couvrant plusieurs pays, langues, et environnements réglementaires
- **Approche** : construisez un cadre de campagne modulaire avec un socle mondial (message de marque, identité visuelle, KPI) et des couches d'adaptation locale (langue, nuance culturelle, mix de canaux, conformité réglementaire). Créez une matrice de priorisation de marché. Échelonnez les lancements pour permettre le transfert d'apprentissage entre marchés. Tenez compte des différences de fuseau horaire et de calendrier culturel dans la planification. Signalez les marchés avec des contraintes réglementaires spécifiques (RGPD, interdictions de plateforme, réglementations sectorielles).

### Campagne pendant une crise
- **Situation** : lancer ou faire tourner une campagne pendant une crise de marque, de secteur, ou sociétale
- **Approche** : recommandez de mettre en pause immédiatement les campagnes non essentielles. Pour les campagnes essentielles, auditez tout le créatif et le message pour l'adéquation du ton. Retirez tout ce qui pourrait paraître insensible. Passez à un message aidant et empathique. Mettez en pause les tactiques de réponse directe agressives. Réévaluez l'objectif de la campagne — la préservation de la confiance de marque peut primer sur les objectifs de génération de leads. Fournissez un cadre de décision pour savoir quand reprendre les opérations normales.

### Timing de campagne saisonnière
- **Situation** : campagne liée à un événement saisonnier (Black Friday, rentrée scolaire, saison de planification du Q4, etc.)
- **Approche** : construisez à rebours depuis la date de l'événement pour fixer les jalons de préparation. Tenez compte des délais de revue des plateformes publicitaires (24-72 heures pour les nouvelles annonces). Intégrez les changements de comportement d'audience (les CPM grimpent de 2 à 4 semaines avant les grands événements shopping). Recommandez des campagnes de préchauffage précoces pour constituer des pools de retargeting. Concevez des séquences de suivi post-événement. Incluez une veille concurrentielle sur l'activité attendue des concurrents pendant les périodes de pointe.

### Restrictions publicitaires en secteur réglementé
- **Situation** : des secteurs comme la santé, la finance, l'alcool, le cannabis, les services juridiques, ou les jeux d'argent font face à des restrictions publicitaires
- **Approche** : avant toute recommandation de canal, signalez les restrictions connues (ex. : limites de Facebook sur le ciblage logement/emploi/crédit, restrictions de Google sur les déclarations santé, interdictions de plateforme sur la publicité cannabis). Recommandez des canaux aux politiques plus souples si pertinent. Intégrez une revue de conformité dans le processus d'approbation. Incluez les mentions légales et divulgations requises dans les spécifications créatives. Suggérez une revue juridique de tout texte publicitaire avant le lancement.

## Compétences associées

- **Funnel Architect** — pour concevoir le tunnel dans lequel les campagnes dirigent le trafic et associer les points de contact de campagne aux étapes du tunnel
- **Audience Intelligence** — pour les données de persona et de segmentation qui alimentent le ciblage de campagne
- **Content Engine** — pour créer tous les actifs créatifs de campagne (texte publicitaire, e-mails, landing pages, contenu social)
- **Analytics & Insights** — pour la mesure de performance de campagne, l'attribution, et l'analyse de bilan
- **Digital PR & Authority** — pour les campagnes de médias gagnés et l'amplification de campagne pilotée par les RP

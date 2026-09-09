---
name: audience-intelligence
description: "Audience research module — builds six-dimension buyer personas (demographic, psychographic, behavioral, need-state, information, decision), Jobs-to-Be-Done maps, RFM/behavioral/lifecycle segmentation models, anti-personas with exclusion criteria, B2B buying-committee maps, and lookalike seed specs. Triggers on \"/digital-marketing-pro:audience-intelligence\", \"who are our customers\", \"build buyer personas\", \"segment our audience\", \"run a JTBD analysis\". Reads the brand profile, industry benchmarks, and campaign history, and works from CRM/survey/analytics data when supplied — or labels hypothesis personas explicitly when data is thin. For a single quick persona document, /digital-marketing-pro:audience-profile is the lighter sibling."
---

# Audience Intelligence

## Quand utiliser cette compétence

Activer ce module lorsque la demande de l'utilisateur porte sur l'un des éléments suivants :

- **Création de buyer persona** : construire des profils détaillés de clients idéaux pour les décisions marketing et produit
- **Recherche d'audience** : comprendre qui sont les clients ou prospects d'une marque au niveau démographique, psychographique, et comportemental
- **Stratégie de segmentation** : diviser une audience en groupes pertinents pour un marketing ciblé
- **Analyse Jobs-to-Be-Done (JTBD)** : identifier les tâches fonctionnelles, sociales, et émotionnelles pour lesquelles les clients « embauchent » un produit
- **Profilage psychographique** : comprendre les valeurs, attitudes, intérêts, styles de vie, et motivations de l'audience
- **Définition d'anti-persona** : définir qui N'EST PAS le client cible pour éviter le gaspillage de dépense
- **Dimensionnement d'audience et estimation du TAM** : estimer la taille des segments d'audience adressables

**Expressions déclenchantes** : « buyer persona », « audience cible », « qui sont nos clients », « profil client », « segmentation », « segments d'audience », « Jobs-to-Be-Done », « JTBD », « psychographique », « profil client idéal », « ICP », « anti-persona », « audience similaire (lookalike) », « recherche d'audience », « comité d'achat », « avatar client »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — le résumé de marque actif a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents indiqués.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et le choix des mots de tout le contenu
4. **Vérifier la conformité** — appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Se référer aux benchmarks sectoriels** — consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les allégations restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les adaptations de ton spécifiques à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les slogans et le langage de positionnement ; `voice-and-tone.md` pour des règles de voix détaillées au-delà des 4 scores numériques. Pour produire du contenu destiné à un canal spécifique, les règles de style de ce canal prévalent sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail d'audience intelligence, rassembler :

1. **Description de l'entreprise** : que vend l'entreprise, à qui, et quel problème résout-elle ?
2. **Données clients existantes** : tout analytics, données CRM, résultats d'enquête, ou entretiens clients disponibles
3. **Détails du produit/service** : fonctionnalités, tarification, positionnement, et différenciateurs clés
4. **Hypothèses d'audience actuelles** : qui l'équipe pense-t-elle être ses clients aujourd'hui ?
5. **Contexte de marché** : secteur, paysage concurrentiel, maturité du marché
6. **Portée géographique** : audience locale, régionale, nationale, ou mondiale
7. **Modèle économique** : B2B, B2C, B2B2C, D2C — cela façonne fondamentalement la structure des personas
8. **Processus de vente** : libre-service, assisté par les ventes, vente entreprise — détermine la cartographie des décideurs

Si l'utilisateur dispose de peu de données, construire des personas basés sur des hypothèses, fondées sur l'analyse du modèle économique, du produit, et du marché. Étiqueter clairement celles-ci comme des hypothèses à valider.

## Capacités

- **Construction de persona multidimensionnelle** : personas construits sur six dimensions :
  - **Démographique** : âge, genre, localisation, revenu, éducation, poste, taille d'entreprise
  - **Psychographique** : valeurs, attitudes, style de vie, traits de personnalité, motivations
  - **Comportemental** : motifs d'achat, préférences de canal, consommation de contenu, style de prise de décision
  - **État de besoin** : points de douleur actuels, besoins non satisfaits, résultats désirés, niveau d'urgence
  - **Information** : où ils font leurs recherches, en qui ils ont confiance, préférences de format de contenu, parcours d'information
  - **Décision** : critères de décision, objections, influenceurs, calendrier, tolérance au risque
- **Cadre JTBD** : cartographier les tâches fonctionnelles (ce qu'ils ont besoin d'accomplir), les tâches sociales (comment ils veulent être perçus), et les tâches émotionnelles (comment ils veulent se sentir) avec des métriques d'innovation orientée résultats
- **Segmentation RFM** : analyse de récence, fréquence, valeur monétaire pour la segmentation de la base clients
- **Segmentation comportementale** : regroupement par motifs d'usage, niveaux d'engagement, et comportement d'achat
- **Segmentation basée sur la valeur** : regroupement par valeur vie client et potentiel de rentabilité
- **Segmentation de cycle de vie** : regroupement par étape de cycle de vie client (prospect, nouveau, actif, à risque, désabonné, reconquête)
- **Guidance d'audience similaire (lookalike)** : définir les caractéristiques d'audience de départ pour le ciblage lookalike sur les plateformes
- **Définition d'anti-persona** : définir explicitement qui devrait être exclu du ciblage pour éviter le gaspillage de dépense et les messages mal alignés
- **Cartographie du comité d'achat** : pour le B2B, cartographier tous les rôles impliqués dans les décisions d'achat avec leurs motivations et objections individuelles

## Processus

**Workflow principal : développement de persona et segmentation**

1. **Découverte et collecte de données**
   - Rassembler toutes les données clients disponibles (analytics, exports CRM, résultats d'enquête, transcriptions d'entretien)
   - Revoir les supports marketing existants, landing pages, et publicités pour les hypothèses d'audience implicites
   - Analyser le ciblage des concurrents (qui visent-ils ? quel message utilisent-ils ?)
   - Si aucune donnée n'existe, mener une analyse de marché pour construire des personas hypothétiques
   - Documenter le niveau de qualité des données : riche en données, limité en données, ou hypothèse uniquement

2. **Analyse JTBD**
   - Identifier la tâche centrale pour laquelle le client « embauche » le produit
   - Cartographier les tâches fonctionnelles : quelle tâche doit être accomplie ?
   - Cartographier les tâches sociales : comment le client veut-il être perçu par les autres ?
   - Cartographier les tâches émotionnelles : comment le client veut-il se sentir ?
   - Identifier le « moment de difficulté » — qu'est-ce qui déclenche la recherche d'une solution ?
   - Documenter les solutions concurrentes (y compris la non-consommation et les contournements manuels)
   - Définir les résultats désirés et comment les clients mesurent le succès

3. **Construction des personas**
   - Construire 3 à 5 personas principaux (éviter la prolifération de personas)
   - Pour chaque persona, compléter les six dimensions :
     - **Profil démographique** : caractéristiques concrètes avec des fourchettes, pas des points uniques
     - **Profil psychographique** : valeurs, croyances, facteurs de style de vie influençant les décisions d'achat
     - **Profil comportemental** : comment ils achètent, où ils passent du temps, quel contenu ils consomment
     - **Profil d'état de besoin** : points de douleur spécifiques, déclencheurs d'urgence, et résultats désirés
     - **Profil d'information** : comportement de recherche, sources de confiance, préférences de contenu
     - **Profil de décision** : critères, objections, influenceurs, et calendrier
   - Donner à chaque persona un nom mémorable et un récit (mais éviter les stéréotypes)
   - Assigner une taille de segment estimée et un potentiel de revenu
   - Prioriser les personas par impact commercial

4. **Développement des anti-personas**
   - Définir 1 à 3 anti-personas : des personnes qui peuvent sembler des cibles mais qui correspondent mal
   - Types courants d'anti-persona : chasseurs de bonnes affaires sensibles au prix (pour les marques premium), curieux qui n'achèteront jamais (tire-kickers), mauvaise taille d'entreprise ou mauvais secteur
   - Documenter les signaux spécifiques qui identifient les anti-personas dans vos données
   - Créer des critères d'exclusion pour le ciblage publicitaire et la qualification de leads

5. **Stratégie de segmentation**
   - Sélectionner l'approche de segmentation selon les données disponibles et les besoins métier :
     - **RFM** : lorsque des données de transaction sont disponibles — noter par récence, fréquence, valeur monétaire
     - **Comportementale** : lorsque des données d'usage/engagement existent — regrouper par motifs de comportement
     - **Basée sur la valeur** : lorsque des données de LTV sont disponibles — prioriser les segments à forte valeur
     - **Cycle de vie** : lorsque des données d'étape de parcours client existent — personnaliser par étape
     - **Basée sur les besoins** : lorsque de la recherche qualitative est disponible — regrouper par point de douleur
   - Définir les frontières de segment et les conventions de nommage
   - Cartographier les segments vers les personas (les segments sont des groupes fondés sur les données ; les personas sont les récits humains qui s'y trouvent)
   - Assigner des stratégies de canal et de message par segment

6. **Planification de l'activation**
   - Pour chaque persona/segment, définir :
     - Les canaux prioritaires pour les atteindre
     - Les thèmes de message et les propositions de valeur qui résonnent
     - Les types et formats de contenu qu'ils préfèrent
     - Les critères d'audience de départ lookalike pour les plateformes payantes
     - Les règles de notation de lead basées sur l'adéquation au persona
   - Créer un guide de correspondance persona-vers-campagne
   - Construire un plan de validation pour tester les hypothèses de persona avec des données de campagne réelles

## Fichiers de référence

- `persona-builder.md` — modèle de persona à six dimensions, guide d'entretien de persona, méthodologie données-vers-persona, et cadre de validation de persona
- `jtbd-framework.md` — méthodologie d'analyse Jobs-to-Be-Done, canevas de cartographie des tâches, notation d'innovation orientée résultats, et analyse des solutions concurrentes
- `segmentation.md` — modèle de notation RFM, cadre de segmentation comportementale, définitions de segmentation de cycle de vie, et cartographie segment-vers-action
- `psychographic-profiling.md` — cadre des valeurs et attitudes, analyse de style de vie, cartographie des motivations, et méthodes de collecte de données psychographiques
- `customer-research-methods.md` — méthodes de recherche quantitative et qualitative : conception d'enquête, techniques d'entretien, programmes voix du client, et méthodes de synthèse avec guidance budgétaire

## Formats de livrables

| Livrable | Format | Description |
|---|---|---|
| Document de buyer persona | Document (par persona) | Persona complet à six dimensions avec récit, points de données, et guidance d'activation |
| Fiche récapitulative de persona | Visuel d'une page | Fiche de référence rapide pour l'alignement de l'équipe |
| Analyse JTBD | Document | Carte des tâches, moments de difficulté, résultats désirés, et solutions concurrentes |
| Modèle de segmentation | Feuille de calcul + document | Définitions de segment, critères, tailles, et stratégie par segment |
| Profils d'anti-persona | Document | Qui exclure, pourquoi, et signaux d'identification |
| Carte du comité d'achat | Diagramme visuel + document | Carte des décideurs B2B avec rôles, motivations, et chemins d'influence |
| Guide d'activation d'audience | Document | Recommandations de canal, message, et contenu par persona/segment |
| Spécification d'audience lookalike | Document | Critères d'audience de départ et instructions de configuration spécifiques par plateforme |

## Cas particuliers

### Comités d'achat B2B (plusieurs personas par transaction)
- **Situation** : les achats B2B en entreprise impliquent 6 à 10 décideurs avec des rôles, motivations, et objections différents
- **Approche** : construire des personas individuels pour chaque rôle du comité d'achat : le Champion (avocat interne), l'Acheteur économique (contrôle le budget), l'Évaluateur technique (évalue les capacités), l'Utilisateur final (usage quotidien), le Juridique/Achats (risque et conformité), le Sponsor exécutif (alignement stratégique). Cartographier les relations d'influence entre les rôles. Concevoir un contenu et un message spécifiques aux préoccupations de chaque rôle. Créer un « parcours du comité d'achat » montrant comment les rôles s'engagent à différentes étapes. Noter que le persona Champion est généralement le plus critique — il vend en interne en votre nom.

### Audiences de marketplace bilatérale
- **Situation** : la plateforme sert à la fois le côté offre (vendeurs, créateurs, fournisseurs) et le côté demande (acheteurs, consommateurs)
- **Approche** : construire des ensembles de personas complètement séparés pour chaque côté. Cartographier les interdépendances — comment l'expérience côté offre affecte-t-elle les personas côté demande, et vice versa ? Identifier la contrainte de « l'œuf et la poule » : quel côté doit être construit en premier ? Créer des personas cross-side qui existent des deux côtés (par ex. un vendeur qui achète aussi). Concevoir des messages, canaux, et propositions de valeur distincts pour chaque côté.

### Environnements à données limitées
- **Situation** : startup ou entrée sur un nouveau marché sans données clients, sans CRM, sans historique analytique
- **Approche** : construire des personas hypothétiques à l'aide de la recherche de marché, de l'analyse concurrentielle, des rapports sectoriels, et de la connaissance du domaine des fondateurs/de l'équipe. Étiqueter explicitement tous les personas comme « Hypothèse — Version 1 » pour cadrer les attentes. Concevoir un plan de validation rapide : lancer de petites campagnes ciblées pour tester les hypothèses de persona. Définir des signaux spécifiques qui confirmeraient ou invalideraient chaque persona. Prévoir d'itérer les personas après 30-60 jours de données de marché. Utiliser l'analyse JTBD (qui peut se faire par observation de marché) comme cadre principal lorsque les données démographiques ne sont pas disponibles.

### Audiences mondiales avec différences culturelles
- **Situation** : l'audience s'étend sur plusieurs pays, cultures, et langues avec des valeurs et comportements fondamentalement différents
- **Approche** : NE PAS créer un seul persona mondial. Construire des variantes de persona régionales qui partagent une structure centrale mais divergent sur les dimensions culturelles : style de communication, processus de prise de décision, signaux de confiance, préférences de canal, et hiérarchie de valeurs. Rechercher les dimensions culturelles (le cadre de Hofstede comme point de départ) pour les marchés clés. Signaler les marchés où le positionnement produit pourrait nécessiter un recadrage fondamental, pas seulement une traduction. Recommander une validation locale du marché avant de faire évoluer les campagnes à l'international. Être explicite sur les limites de la généralisation culturelle — les personas sont des points de départ, pas des stéréotypes.

## Compétences associées

- **Funnel Architect** — pour cartographier les personas vers les étapes du tunnel et concevoir des points de contact adaptés à chaque étape pour chaque segment d'audience
- **Content Engine** — pour créer du contenu, des messages, et des assets créatifs spécifiques à chaque persona
- **Campaign Orchestrator** — pour cibler les personas à travers les campagnes et allouer le budget selon la priorité des segments
- **Analytics & Insights** — pour valider les hypothèses de persona avec des données comportementales et affiner les segments dans le temps
- **AEO/GEO Intelligence** — pour comprendre ce que les plateformes IA disent de votre marque à votre audience et optimiser pour leur comportement de recherche assisté par IA

# Guide d'exécution GEO — Optimisation pour les moteurs génératifs

Connaissances de référence pour la surveillance de la visibilité IA, l'exécution de l'optimisation, la gestion des entités, la construction de citations, et le contrôle narratif. Utilisez ce guide lors de l'évaluation ou de l'amélioration de la visibilité de la marque à travers les interfaces de recherche et de chat alimentées par l'IA.

---

## 1. Méthodologie de requête aux moteurs IA

### Test de visibilité systématique

**Étape 1 — Formulation de requête** : Construire une matrice de requêtes à partir des clusters de mots-clés cibles :

| Type d'intention | Exemples de schémas de requête | Objectif |
|---|---|---|
| **Informationnel** | « Qu'est-ce que [sujet] ? », « Comment fonctionne [catégorie de produit] ? », « Bonnes pratiques pour [activité] » | Teste si les moteurs IA référencent votre contenu comme une source faisant autorité |
| **Navigationnel** | « [Nom de marque] », « avis [nom de marque] », « [nom de marque] vs [concurrent] » | Teste la reconnaissance de marque et l'exactitude des informations de marque |
| **Transactionnel** | « Meilleur [catégorie de produit] pour [cas d'usage] », « Top [catégorie de produit] [année] », « Comparaison de tarification [catégorie de produit] » | Teste si les moteurs IA recommandent votre produit dans les requêtes à intention d'achat |
| **Comparaison** | « [Marque] vs [Concurrent] », « Alternative à [Concurrent] », « Comparaison [catégorie de produit] » | Teste le positionnement concurrentiel dans les réponses IA tête-à-tête |
| **Problème-solution** | « Comment résoudre [point de douleur] », « Solutions [point de douleur] pour [segment] » | Teste si l'IA connecte votre marque aux problèmes que vous résolvez |

**Étape 2 — Test multiplateforme** : Exécuter chaque requête à travers tous les principaux moteurs IA :

| Plateforme | Méthode d'accès | Remarques |
|---|---|---|
| **ChatGPT** (OpenAI) | Interface web ou API (`/v1/chat/completions`) | Tester à la fois le modèle par défaut actuel et son palier plus léger (famille GPT-5.6 en date de juillet 2026 — résoudre les ids actuels via `scripts/model_registry.json`). Le mode navigation web vs le mode données d'entraînement donnent des résultats différents |
| **Perplexity** | Interface web ou API | Cite toujours les sources avec des liens. Le mode Pro utilise plusieurs passes de recherche. Tester le mode par défaut et le mode Pro |
| **Google AI Mode** | Google Search → onglet AI Mode (ou par défaut pour les utilisateurs opt-in depuis I/O, le 19 mai 2026) | Surface conversationnelle distincte sur une base Gemini 3.5 Flash. Cite fréquemment des sources **différentes** des AI Overviews pour la même requête — tester séparément, ne pas l'intégrer dans « AI Overviews ». Prend en charge les suivis multi-tours |
| **Google AI Overviews** | Google Search (requête standard) | Apparaît au-dessus des résultats organiques pour les requêtes éligibles. Non déclenché pour toutes les requêtes. Tester en navigation privée/déconnecté |
| **Gemini** (Google) | Interface web ou API | Intègre les données du Google Knowledge Graph. Tester avec et sans ancrage Google Search |
| **Microsoft Copilot** | Interface web ou Bing Chat | Ancrage de recherche alimenté par Bing. Teste la visibilité dans l'index Bing. Cite les sources |
| **Claude** (Anthropic) | Interface web ou API | Basé sur les données d'entraînement (pas de navigation web par défaut). Teste si la marque est dans le corpus d'entraînement |
| **Meta AI** | WhatsApp, Instagram, Facebook, web | Basé sur Llama avec intégration de recherche en temps réel sur certaines plateformes |

**Étape 3 — Enregistrement des réponses** : Pour chaque combinaison requête x plateforme, capturer :
- Le texte complet de la réponse IA
- Les sources citées (URL, noms de marque)
- La position de la mention de votre marque (première mention, milieu, fin, absente)
- Le sentiment de la mention (positif, neutre, négatif, inexact)
- Les concurrents mentionnés en parallèle
- L'horodatage (les réponses IA peuvent changer d'un jour à l'autre)

---

## 2. Grille de notation

> **Ceci est la norme unique de notation de visibilité IA du plugin.** Le score par requête par plateforme ci-dessous est la même grille que `/digital-marketing-pro:aeo-audit` et `/digital-marketing-pro:geo-monitor` appliquent, persistée par `scripts/geo-tracker.py`. Les 6 surfaces canoniques sont la constante `PLATFORMS` de ce script. Le score GEO agrégé sur 0-100 est la **vue de tendance** de ces mêmes données par plateforme — un cumul longitudinal, pas un second modèle de notation. Notez chaque plateforme séparément ; ne faites jamais de moyenne entre plateformes.

### Score de visibilité par requête par plateforme

| Résultat | Score | Définition |
|---|---|---|
| **Cité avec lien** | 10 | La marque est mentionnée par son nom ET un lien vers votre domaine est fourni comme source |
| **Cité sans lien** | 8 | La marque est mentionnée par son nom avec attribution mais sans lien cliquable vers votre domaine |
| **Mentionné par nom de marque** | 7 | La marque est explicitement nommée dans la réponse mais pas comme source citée |
| **Produit/fonctionnalité référencé** | 5 | Votre produit ou fonctionnalité unique spécifique décrit sans attribution de nom de marque |
| **Concept référencé** | 3 | Les concepts ou données de votre contenu utilisés dans la réponse sans aucune attribution |
| **Absent** | 0 | La marque, le produit, et le contenu ne sont référencés d'aucune manière |
| **Mal représenté** | -5 | La marque est mentionnée avec des informations factuellement incorrectes, des données obsolètes, ou un cadrage négatif qui dénature votre offre |

### Notation agrégée

- **Score de requête** = Score moyen à travers toutes les plateformes pour une seule requête
- **Score de plateforme** = Score moyen à travers toutes les requêtes pour une seule plateforme
- **Score GEO global** = Moyenne pondérée à travers toutes les requêtes et plateformes (pondérer les plateformes selon leur part de trafic vers votre site ou données d'usage sectoriel)
- **Score GEO concurrentiel** = Votre score global / (votre score + somme des scores concurrents) x 100 = pourcentage de part de voix GEO

### Interprétation du score

| Plage de score | Évaluation | Action requise |
|---|---|---|
| 8,0-10,0 | Forte visibilité IA — cité systématiquement comme source faisant autorité | Maintenir. Surveiller la dégradation. Étendre la couverture de requêtes |
| 5,0-7,9 | Visibilité modérée — reconnu mais pas cité systématiquement | Renforcer les signaux d'entité, augmenter le contenu digne de citation |
| 2,0-4,9 | Visibilité faible — concepts utilisés mais marque non attribuée | Optimisation d'entité majeure nécessaire. Se concentrer sur les données structurées et les backlinks faisant autorité |
| 0,0-1,9 | Visibilité minimale — largement absent des réponses IA | Travail fondamental requis. Construire l'autorité de domaine, créer du contenu définitif, établir une présence d'entité |
| En dessous de 0 | Visibilité négative — mal représenté dans les réponses IA | Niveau de crise. Prioriser la correction des informations inexactes à la source |

---

## 3. Stratégies d'optimisation par plateforme

### Optimisation ChatGPT

- **Biais des données d'entraînement** : Favorise Wikipedia, Reddit, Stack Overflow, les domaines à forte autorité (DA 70+), les sources académiques, les sites gouvernementaux
- **Mode navigation web** : Une fois activé, fonctionne comme un moteur de recherche. Optimiser pour les bonnes pratiques SEO standard — le contenu le mieux classé est cité
- **Priorités d'optimisation** :
  1. Assurer une présence Wikipedia exacte (page de marque ou mention dans les pages de catégorie)
  2. Maintenir une présence Reddit active et utile dans les subreddits pertinents (participation authentique, pas d'auto-promotion)
  3. Renforcer les signaux E-E-A-T : bios d'auteurs avec identifiants, citations d'experts, citations de recherche originale
  4. Structurer le contenu avec des définitions claires, des instructions étape par étape, et des tableaux de données que l'IA peut extraire

### Optimisation Perplexity

- **Sélection de source** : Liste et lie explicitement les sources. Favorise fortement le contenu qui se classe dans le top 10 des résultats de recherche
- **Déclencheurs de citation** : Réponses claires et extractibles dans le contenu. Données structurées (tableaux, listes, définitions). Format FAQ. Statistiques avec attribution de source
- **Priorités d'optimisation** :
  1. Se classer dans le top 10 pour les requêtes cibles (le SEO traditionnel est la fondation)
  2. Formater le contenu pour l'extractibilité : paragraphes de réponse concis, ouvertures de style définition, tableaux de données
  3. Inclure des données uniques, des statistiques, et de la recherche que Perplexity ne peut trouver ailleurs
  4. Maintenir un contenu exact et à jour (Perplexity utilise la recherche en direct ; le contenu obsolète perd les citations)

### Optimisation Google AI Mode

- **Surface** : Onglet de recherche conversationnelle sur une base Gemini 3.5 Flash ; par défaut pour les utilisateurs opt-in depuis I/O (19 mai 2026). Multi-tours, raisonnement plus profond, et un schéma de citation qui diverge des AI Overviews pour la même requête
- **Sélection de source** : Comme les AI Overviews, il s'ancre sur les pages indexées et éligibles aux extraits, mais son flux de suivi récompense le fait d'être la citation *fondamentale* dans laquelle un utilisateur peut approfondir, pas juste une source d'extrait d'une ligne
- **Priorités d'optimisation** :
  1. Tout ce qui gagne dans les AI Overviews (classement organique, formatage de réponse directe, données structurées) est le plancher — l'AI Mode n'est pas une porte d'éligibilité séparée
  2. Structurer le contenu pour survivre aux suivis : définitions d'entité claires, tableaux de comparaison, et profondeur « pourquoi/comment » sous la réponse titre
  3. Garder les signaux d'entité complets et cohérents (NAP, services, horaires) — l'Intelligence Personnelle dans l'AI Mode personnalise les réponses selon le propre contexte de l'utilisateur, donc l'exhaustivité d'entité compte davantage
  4. Auditer l'AI Mode **indépendamment** des AI Overviews ; réconcilier avec les impressions réelles via `/digital-marketing-pro:gsc-ai-performance`

### Optimisation Google AI Overviews

- **Sélection de source** : Puise principalement dans le contenu organique le mieux classé. Recoupe plusieurs sources pour la synthèse
- **Priorités d'optimisation** :
  1. Alignement SEO traditionnel — les AI Overviews puisent dans les pages qui se classent organiquement
  2. Les données structurées (schéma FAQ, HowTo, Product) augmentent les chances d'inclusion
  3. Contenu qui répond directement à la requête dans les 1-2 premiers paragraphes
  4. Un profil de backlinks faisant autorité signale la fiabilité pour l'inclusion
  5. La fraîcheur du contenu compte — les pages régulièrement mises à jour sont préférées pour les sujets à pertinence temporelle

### Optimisation Gemini

- **Sources de données** : Google Knowledge Graph, Google Search, Google Business Profile, données structurées à travers le web
- **Priorités d'optimisation** :
  1. Bloc de connaissances Google : Revendiquer et optimiser. S'assurer que tous les faits sont corrects
  2. Google Business Profile : Compléter tous les champs. Publications régulières. Note d'avis élevée
  3. Données structurées : schéma Organization, Product, FAQ — alimente directement le Knowledge Graph
  4. Présence YouTube : Gemini peut référencer le contenu YouTube. Optimiser les titres, descriptions, et transcriptions vidéo

### Optimisation Microsoft Copilot / Bing Chat

- **Alimenté par** : L'index de recherche Bing. Le contenu doit être indexé dans Bing (pas seulement Google)
- **Priorités d'optimisation** :
  1. Soumettre le site à Bing Webmaster Tools. Vérifier l'indexation
  2. Balisage de schéma (Bing est agressif sur l'utilisation des données structurées)
  3. Backlinks faisant autorité depuis des domaines auxquels Bing fait confiance (propriétés Microsoft, LinkedIn, institutions éducatives)
  4. Signaux sociaux : Bing intégrerait l'engagement social dans le classement plus que Google

---

## 4. Flux d'optimisation d'entité

### Bloc de connaissances Google

1. **Revendiquer le bloc** : Rechercher le nom de marque. Si le bloc apparaît, cliquer sur « Revendiquer ce bloc de connaissances ». Vérifier via Google Search Console, YouTube, ou d'autres profils officiels
2. **Éditer le bloc** : Une fois revendiqué, suggérer des modifications à : titre, sous-titre, description, profils sociaux, logo, site web, date de fondation. Les modifications sont revues par Google (24-72h)
3. **Si aucun bloc n'existe** : Construire des signaux d'entité — NAP cohérent à travers les annuaires, schéma Organization structuré sur le site web, entrée Wikidata, Google Business Profile actif, mention Wikipedia

### Entrée Wikidata

- **Créer ou éditer** : `https://www.wikidata.org/`
- **Propriétés clés à définir** :
  - `P31` (instance de) : entreprise, logiciel, produit — type d'entité approprié
  - `P856` (site web officiel) : URL du domaine principal
  - `P553`/`P554` (réseaux sociaux) : identifiants pour chaque plateforme
  - `P571` (fondation) : date de fondation
  - `P452` (secteur) : classification sectorielle pertinente
  - `P159` (siège social) : ville, pays
  - `P169` (PDG) : lien vers l'entité personne
  - `P1056` (produit/service) : ce que l'entité propose
- **Impact** : Wikidata alimente le Google Knowledge Graph, Alexa, Siri, et plusieurs jeux de données d'entraînement IA. Action à fort effet de levier pour la reconnaissance d'entité

### Présence Wikipedia

- **Évaluation de notoriété** : La marque répond-elle aux critères de notoriété de Wikipedia pour les organisations ? Nécessite une couverture significative dans des sources fiables et indépendantes (pas des communiqués de presse ou du contenu auto-publié)
- **Si notable** : NE PAS créer ou éditer la page vous-même (conflit d'intérêt). À la place :
  1. Rassembler 5 sources fiables indépendantes ou plus (publications majeures, rapports sectoriels, citations académiques)
  2. Utiliser le processus « Demander un article » de Wikipedia ou embaucher un éditeur conforme à Wikipedia
  3. S'assurer que l'article est neutre, bien sourcé, et factuel
- **Si pas encore notable** : Se concentrer d'abord sur l'obtention de couverture dans des sources fiables indépendantes. Chaque mention médiatique majeure, prix sectoriel, ou citation de recherche construit vers la notoriété
- **Surveillance** : Surveiller la page Wikipedia pour le vandalisme ou les modifications inexactes. Configurer des alertes de liste de suivi Wikipedia

### Audit de cohérence des annuaires

- **Périmètre d'audit** : Vérifier les informations de marque à travers les 50 principaux annuaires, agrégateurs de données, et listings spécifiques au secteur
- **Points de données à vérifier** : Nom d'entreprise (correspondance exacte), adresse, téléphone, URL du site web, description, catégorie, logo, liens sociaux
- **Problèmes courants** : Adresses obsolètes, anciens numéros de téléphone, formatage incohérent du nom de marque (Inc. vs LLC vs sans suffixe), URL HTTP vs HTTPS
- **Résolution** : Mettre à jour chaque listing manuellement ou via des services d'agrégation de données (Data Axle, Neustar Localeze, Foursquare). Priorité : Google Business Profile > Apple Maps > Bing Places > Yelp > annuaires spécifiques au secteur

---

## 5. Stratégies de contrôle narratif

### Création de contenu faisant autorité

- **Recherche originale** : Mener des enquêtes, analyser des données propriétaires, publier des constats avec méthodologie. Les moteurs IA favorisent fortement les données uniques qu'ils ne peuvent trouver ailleurs
- **Panels d'experts** : Agréger les opinions d'experts sur des sujets sectoriels. Plusieurs noms d'experts + identifiants renforcent les signaux E-E-A-T
- **Guides définitifs** : Guides complets de 3 000 mots ou plus qui deviennent la ressource de référence pour un sujet. Mettre à jour trimestriellement pour maintenir la fraîcheur
- **Études de données** : Analyser des données publiquement disponibles avec une méthodologie unique. Présenter les constats avec des graphiques, tableaux, et jeux de données téléchargeables
- **Contenu statistique** : « X % des [professionnels] rapportent [constat] » — les moteurs IA adorent citer des statistiques spécifiques avec attribution de source

### Formatage de contenu digne de citation

| Format | Pourquoi l'IA le cite | Exemple |
|---|---|---|
| **Paragraphe de définition** | Les moteurs IA extraient les définitions pour les requêtes « qu'est-ce que » | « Le marketing de contenu est une approche stratégique axée sur la création de contenu précieux et pertinent pour attirer une audience clairement définie. » |
| **Listes numérotées** | Extractibles pour les requêtes « comment faire » et « étapes pour » | « Étape 1 : Auditer le contenu existant. Étape 2 : Identifier les lacunes... » |
| **Tableaux de données** | Les données structurées sont faciles à analyser et à citer pour l'IA | Tableaux de comparaison, tableaux de tarification, tableaux de données de référence |
| **Statistiques avec attribution** | L'IA a besoin de données sourcées pour les affirmations factuelles | « Selon le rapport État du Marketing 2026 de [Marque], 73 % des marketeurs... » |
| **Paires FAQ** | Le format question-réponse direct correspond aux requêtes des utilisateurs | « Q : Combien de temps prend le SEO ? R : La plupart des campagnes SEO montrent des résultats mesurables sous 3-6 mois... » |

### Construction de signaux de citation

- **Être référencé par des sites faisant autorité** : Contributions invitées, commentaires d'experts dans des publications sectorielles, licence de données, interventions citées dans des récapitulatifs d'événements
- **Maintenir des données d'entité exactes** : Wikidata, Bloc de connaissances, listings d'annuaires — l'incohérence réduit la confiance de l'IA à citer votre marque
- **Lier le contenu de manière stratégique** : Un maillage interne fort entre les pages de contenu liées thématiquement aide l'IA à comprendre votre autorité thématique
- **Publier sur les plateformes que les moteurs IA favorisent** : Medium (forte autorité de domaine), articles LinkedIn (autorité professionnelle), publications sectorielles (autorité verticale)

---

## 6. Rythme de surveillance et référence concurrentielle

### Surveillance prioritaire hebdomadaire

- **Requêtes** : Requêtes de nom de marque, 5 principales requêtes produit/service, 3 principales requêtes de comparaison
- **Plateformes** : ChatGPT, Perplexity, Google AI Mode, Google AI Overviews (surfaces IA à plus fort trafic ; l'AI Mode et les AI Overviews sont distincts — tester les deux)
- **Action** : Enregistrer les scores. Comparer à la semaine précédente. Signaler toute baisse de score >2 points ou nouvelle représentation erronée

### Audit mensuel complet

- **Requêtes** : Toutes les requêtes cibles de la matrice de requêtes (50-200 requêtes selon le périmètre de la marque)
- **Plateformes** : Les 6 moteurs IA ou plus
- **Livrable** : Tableau de bord GEO mensuel avec scores par plateforme, flèches de tendance, comparaison concurrentielle, et actions recommandées
- **Investissement temps** : 4-8 heures par audit (automatiser l'exécution des requêtes lorsque possible ; revue manuelle des réponses)

### Référence concurrentielle trimestrielle

- **Périmètre** : Exécuter la matrice de requêtes complète pour votre marque ET les 3-5 principaux concurrents à travers toutes les plateformes
- **Livrable** : Rapport GEO concurrentiel avec part de voix, comparaison plateforme par plateforme, analyse de tendance, et recommandations stratégiques
- **Questions clés répondues** : Qui gagne en visibilité IA ? Quelles plateformes favorisent quels concurrents ? Où perdez-vous des citations au profit de concurrents ?

---

## 7. Détection et correction de la dérive narrative

### Processus de détection

1. **Capturer les réponses IA** sur votre marque pour les requêtes navigationnelles (« Qu'est-ce que [Marque] ? », « avis [Marque] », « Parlez-moi de [Marque] »)
2. **Comparer au positionnement souhaité** : La réponse IA correspond-elle à la déclaration de positionnement de votre marque, aux propositions de valeur clés, et à l'audience cible ?
3. **Signaler les écarts** :
   - **Informations obsolètes** : Ancienne tarification, produits discontinués, ancienne direction, ancien nom d'entreprise
   - **Affirmations inexactes** : Descriptions de fonctionnalités erronées, position de marché incorrecte, statistiques fabriquées
   - **Cadrage négatif** : Emphase disproportionnée sur les avis négatifs, anciennes controverses, avantages des concurrents
   - **Informations clés manquantes** : Propositions de valeur centrales absentes, produits clés non mentionnés, marché cible mal identifié

### Stratégies de correction

| Type de problème | Approche de correction | Calendrier |
|---|---|---|
| **Informations obsolètes** | Mettre à jour le contenu source (site web, Wikipedia, annuaires). S'assurer que les données structurées reflètent les informations actuelles | 1-2 semaines pour que les moteurs IA ré-indexent |
| **Affirmations inexactes** | Identifier la source de l'inexactitude. Mettre à jour ou demander une correction. Créer un contre-contenu faisant autorité avec les informations correctes | 2-4 semaines pour la propagation |
| **Cadrage négatif** | Publier du contenu positif faisant autorité à grande échelle. Gagner une couverture positive de sources indépendantes. Ne pas tenter de supprimer — submerger avec un signal positif | 1-3 mois pour un changement de sentiment |
| **Informations manquantes** | Créer des pages dédiées pour les sujets manquants. Ajouter des données structurées. Construire une autorité thématique via des clusters de contenu | 2-4 semaines pour la première prise en compte |

---

## 8. Dark funnel et attribution IA

### La visibilité IA comme étape cachée du parcours acheteur

- **Réalité** : Les acheteurs interrogent de plus en plus les chatbots IA pendant leur recherche. Une grande partie reste difficile à voir dans les analytics, mais l'angle mort se réduit : **le groupe de canal `Assistant IA` de GA4 (13 mai 2026)** capture désormais les référencements `Medium=ai-assistant` depuis ChatGPT / Gemini / Claude, et le **Rapport de performance IA de GSC (3 juin 2026)** rapporte les impressions des AI Overviews + AI Mode (pas de données de clic). Utilisez les deux avant de supposer qu'une requête est invisible
- **Impact** : Le résidu — réponses IA sans clic, ou trafic de l'AI Mode de Google propre que GA4 pourrait ne pas étiqueter de la même manière — apparaît toujours comme « direct », recherche de marque, ou « sans référent ». Traiter les sections ci-dessous comme le repli pour ce que GSC/GA4 ne capturent pas encore, pas la méthode principale
- **Signaux de mesure proxy** :
  - Augmentation du volume de recherche de marque après des améliorations GEO (corrélation, pas causalité — mais directionnellement utile)
  - Données d'enquête : « Comment avez-vous entendu parler de nous pour la première fois ? » avec chatbot IA comme option
  - Schémas de recherche de marque de nouveaux visiteurs : utilisateurs arrivant via une recherche de marque mais sans historique de cookie préalable (parcours possible IA-vers-recherche)
  - Analyse de corrélation : cartographier les améliorations de score GEO avec les changements de volume de recherche de marque et de trafic direct avec un décalage de 2-4 semaines

### Cadre d'attribution pour la visibilité IA

Puisque l'attribution directe n'est pas possible, utiliser un modèle de contribution :

1. **Suivre les scores GEO dans le temps** (variable indépendante)
2. **Suivre le volume de recherche de marque, le trafic direct, et les demandes de démo/essai** (variables dépendantes)
3. **Contrôler pour l'autre activité marketing** (dépense publicitaire, RP, événements, publication de contenu)
4. **Calculer la corrélation** entre les changements de score GEO et les métriques en aval avec un décalage approprié (2-4 semaines)
5. **Rapporter comme « contribution de visibilité IA »** — directionnelle, pas précise, mais établit la valeur de l'investissement GEO

---
name: aeo-geo
description: "Strategy module for Answer Engine / Generative Engine Optimization — audits AI visibility, restructures content for citation, runs entity-consistency checks across Knowledge Graph, Wikidata, Wikipedia, Crunchbase, and LinkedIn, and produces JSON-LD schema specs, monitoring frameworks, and a 90-day LLM content strategy. Triggers on \"/digital-marketing-pro:aeo-geo\", \"how do we get cited by AI\", \"optimize for AI Overviews\", \"fix our entity consistency\", \"do we need llms.txt\". Reads the brand profile, compliance rules, and industry benchmarks; its measurement counterpart is /digital-marketing-pro:aeo-audit, with GSC actuals via /digital-marketing-pro:gsc-ai-performance."
---

# Intelligence AEO/GEO

## Quand utiliser cette compétence

Activer ce module lorsque la demande de l'utilisateur porte sur l'un des éléments suivants :

- **Visibilité IA** : questions sur la manière dont une marque, un produit ou une personne apparaît dans les réponses générées par IA (ChatGPT, Perplexity, **Google AI Mode**, Google AI Overviews, Copilot, Gemini, Claude)
- **Answer Engine Optimization (AEO)** : optimiser le contenu pour qu'il soit sélectionné comme source dans les réponses générées par IA
- **Generative Engine Optimization (GEO)** : structurer le contenu et les entités pour que les plateformes d'IA générative représentent fidèlement une marque
- **Suivi des citations** : surveiller les sources que les modèles d'IA citent en répondant à des requêtes liées à une marque ou à un secteur
- **Cohérence des entités** : garantir que les informations de marque sont uniformes sur toutes les sources de connaissances sur lesquelles les modèles d'IA s'entraînent ou qu'ils exploitent
- **Optimisation du Knowledge Graph** : améliorer la façon dont une marque est représentée dans le Google Knowledge Graph, Wikidata et d'autres bases de connaissances structurées
- **Données structurées pour l'IA** : mettre en place un balisage schema et des données structurées spécifiquement pour améliorer la compréhension par l'IA et la probabilité de citation

**Expressions déclenchantes** : « visibilité IA », « comment ChatGPT décrit ma marque », « résultats Perplexity », « optimisation AI Mode », « optimisation AI Overview », « moteur de réponse », « moteur génératif », « optimisation LLM », « citations IA », « cohérence des entités », « Knowledge Graph »

**Google AI Mode (mai 2026 — à traiter comme une surface distincte)** : lors du Google I/O du 19 mai 2026, AI Mode est devenu l'expérience de recherche par défaut pour les utilisateurs ayant opté pour cette fonctionnalité, a franchi le milliard d'utilisateurs actifs mensuels, et a basculé vers Gemini 3.5 Flash comme modèle de base. AI Mode **n'est pas** la même chose que AI Overviews — c'est un onglet conversationnel distinct avec un raisonnement plus poussé, des questions de suivi multi-tours, et un schéma de citation qui diverge fréquemment de celui d'AI Overviews pour une même requête. Les marques doivent auditer AI Mode indépendamment. Implication pratique : un programme AEO qui ne teste que AI Overviews + ChatGPT + Perplexity présente désormais un angle mort mesurable.

**Autres annonces de l'I/O 2026 qui modifient le périmètre de l'AEO** ([source : blog.google/products-and-platforms/products/search/search-io-2026](https://blog.google/products-and-platforms/products/search/search-io-2026/)) :

- Le **flux de suivi AI Overview → AI Mode** est désormais actif dans le monde entier (ordinateur + mobile) — les utilisateurs peuvent poser une question de suivi directement depuis une AI Overview et enchaîner sur une session conversationnelle AI Mode. Implication AEO : la *première* impression dans une AI Overview est désormais aussi une porte d'entrée vers une citation multi-tours. Optimisez pour être la citation fondatrice, pas seulement l'extrait bref.
- **Personal Intelligence dans AI Mode** s'étend à environ 200 pays et 98 langues, sans abonnement requis, avec des connexions Gmail / Photos / Calendar. Implication AEO : les réponses IA sont de plus en plus personnalisées — les résultats de recherche de marque génériques seront repondérés en fonction du contexte propre à chaque utilisateur. L'exhaustivité du schéma de marque et la cohérence des entités (NAP, services, horaires) comptent encore davantage.
- Les **AI Information Agents** (créés par l'utilisateur, surveillant blogs/actualités/réseaux sociaux 24 h/24) seront lancés pour les abonnés AI Pro et Ultra à l'été 2026. Implication AEO : les marques qui publient des mises à jour structurées et datées sur leurs canaux propres seront plus lisibles pour ces agents configurés par l'utilisateur que celles qui dépendent d'une reprise par des relations presse tierces.

**Directives officielles de Google sur l'optimisation pour la recherche IA** (mises à jour le 15 mai 2026 — [Google AI Optimization Guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)) :

- **Aucun fichier `llms.txt` n'est nécessaire.** Position officielle de Google : « Vous n'avez pas besoin de créer de nouveaux fichiers lisibles par machine, de fichiers texte IA, de balisage ou de Markdown pour apparaître dans la recherche IA générative. » Ne perdez pas de temps à générer un `llms.txt` pour les fonctionnalités IA de Google. (Les autres moteurs de recherche IA peuvent ou non l'exploiter ; les positions publiques actuelles d'Anthropic / OpenAI / Perplexity sont également qu'ils ne l'exigent pas. Documentez toute pression client visant à livrer un `llms.txt` comme un livrable de faible priorité, sans gain mesurable.)
- **Aucun schéma spécifique à l'IA n'est nécessaire.** « Les données structurées ne sont pas requises pour la recherche IA générative, et il n'existe pas de balisage schema.org spécial à ajouter. » Le schema continue de compter pour le SEO classique et les résultats enrichis.
- **L'éligibilité suit les règles standard de la recherche.** « Pour être éligible à l'affichage dans les fonctionnalités IA génératives de la recherche Google, une page doit être indexée et éligible à l'affichage dans la recherche Google avec un extrait, en respectant les exigences techniques de la recherche. »

**Options de retrait et contrôles d'entraînement IA** ([document Google AI Features](https://developers.google.com/search/docs/appearance/ai-features)) :

- Pour AI Overviews et AI Mode (au sein de la recherche Google) : utiliser les directives d'extrait existantes — `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`. Le robots.txt pour Googlebot reste le contrôle canonique. **Il n'existe pas de directive robots/meta spécifique à l'IA.**
- Pour les *autres* systèmes IA de Google (entraînement de l'application Gemini, grounding Vertex AI en dehors de la recherche) : utiliser le user-agent **Google-Extended** dans le robots.txt. C'est un contrôle distinct de celui de Googlebot.
- **NOUVEAU (3 juin 2026)** : Search Console propose désormais une **bascule de retrait** au niveau de la propriété — l'activer exclut le site du grounding des réponses AI Overviews / AI Mode sans modifier le robots.txt. Voir `/digital-marketing-pro:gsc-ai-performance` pour le cadre de décision sur quand l'utiliser.

**Article 50 de l'AI Act européen (applicable au 2 août 2026)** — pour le contenu marketing généré par IA diffusé sur les marchés de l'UE, voir `skills/context-engine/eu-code-of-practice.md` pour le code de conduite volontaire (fournisseurs WG1 / déployeurs WG2) et le chemin d'attestation C2PA `c2pa.ai-disclosure`. La conformité s'applique au niveau du plugin et concerne les sorties de `c2pa-metadata`.

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

Avant d'exécuter un travail AEO/GEO, rassembler :

1. **Identité de marque** : nom officiel de la marque, principaux produits/services, propositions de valeur uniques et positionnement de marque
2. **Empreinte IA actuelle** : demander à l'utilisateur s'il a déjà testé la manière dont les plateformes IA décrivent actuellement sa marque (ou proposer un audit)
3. **Requêtes cibles** : les questions et sujets pour lesquels la marque souhaite être citée dans les réponses générées par IA
4. **Actifs de contenu existants** : URL du site web, blog, base de connaissances, présence Wikipédia, statut du balisage schema
5. **Paysage concurrentiel** : les principaux concurrents ayant potentiellement déjà une forte visibilité IA
6. **Secteur d'activité** : nécessaire pour évaluer la sensibilité YMYL (Your Money Your Life) et les exigences de signaux de confiance

Si l'utilisateur ne peut pas fournir tout le contexte, poursuivre avec ce qui est disponible et signaler les lacunes comme des recommandations.

**Contexte minimal viable** : nom de la marque et URL du site web. Tout le reste peut être déduit ou découvert pendant le processus d'audit.

## Capacités

- **Audit de visibilité IA** : test systématique de l'apparition d'une marque sur les 6 surfaces canoniques — Google AI Mode, Google AI Overviews, ChatGPT, Perplexity, Gemini et Copilot — pour des requêtes cibles (noté selon le standard défini dans `/digital-marketing-pro:aeo-audit`)
- **Optimisation des citations** : restructuration du contenu pour maximiser la probabilité d'être cité comme source dans les réponses générées par IA
- **Audit de cohérence des entités** : recoupement des informations de marque entre Google Knowledge Graph, Wikidata, Wikipédia, Crunchbase, LinkedIn et les bases de données sectorielles pour identifier les incohérences
- **Stratégie de contenu pour LLM** : création de contenu spécifiquement conçu pour être ingéré et représenté fidèlement par les modèles de langage
- **Cadre de suivi des réponses IA** : mise en place d'un suivi systématique des mentions et citations IA dans le temps
- **Données structurées pour la citation IA** : mise en place de schémas Organization, Product, FAQ, HowTo et autres qui améliorent la compréhension par l'IA
- **Optimisation du Knowledge Graph** : amélioration de la représentation des entités dans les bases de connaissances structurées
- **Cartographie de l'autorité thématique** : identification des lacunes de contenu qui empêchent une marque d'être reconnue comme une autorité par les modèles d'IA
- **Formatage de contenu AI-first** : restructuration du contenu existant avec des définitions claires, des affirmations factuelles et des extraits dignes de citation
- **Benchmarking concurrentiel de visibilité IA** : comparaison de la présence IA de la marque face aux concurrents sur toutes les plateformes

## Processus

**Workflow principal : audit de visibilité IA et optimisation**

1. **Découverte et référence**
   - Recueillir les informations de marque, les requêtes cibles (10-25 requêtes) et la liste des concurrents
   - Documenter le balisage schema actuel, la présence dans le Knowledge Graph et le statut Wikipédia/Wikidata
   - Identifier le modèle économique pour déterminer les plateformes IA les plus pertinentes
   - Cataloguer les actifs de contenu faisant déjà autorité (livres blancs, recherches, données, biographies d'experts)
   - Évaluer la classification YMYL — les marques dans la santé, la finance ou le juridique font face à des seuils d'autorité plus élevés

2. **Tests sur les plateformes IA**
   - Pour chaque requête cible, documenter comment la marque apparaît (ou n'apparaît pas) sur :
     - **Google AI Mode** (surface conversationnelle par défaut, architecture Gemini 3.5 Flash — mai 2026)
     - Google AI Overviews (bloc de synthèse de la SERP classique)
     - ChatGPT (dernier modèle, mode recherche web activé)
     - Perplexity
     - Gemini (gemini.google.com)
     - Microsoft Copilot
   - Noter chaque résultat : Cité (mention directe avec lien), Référencé (mentionné sans lien), Absent, Mal représenté
   - Capturer le texte exact généré par l'IA pour chaque requête comme référence de départ

3. **Vérification de la cohérence des entités**
   - Auditer le nom de la marque, la date de fondation, la direction, les descriptions de produits et les affirmations clés sur toutes les sources de connaissances
   - Signaler les incohérences entre les sources (par ex. années de fondation différentes sur Crunchbase vs Wikipédia)
   - Prioriser les corrections selon le poids d'autorité de la source

4. **Analyse des écarts et stratégie**
   - Identifier les motifs récurrents : quels types de requêtes génèrent des citations ? Lesquels n'en génèrent pas ?
   - Cartographier les lacunes de contenu : quel contenu faisant autorité manque-t-il et dont les modèles d'IA ont besoin ?
   - Évaluer les lacunes de données structurées : quel balisage schema manque ou est incorrect ?
   - Comparer avec les concurrents qui SONT cités

5. **Plan d'exécution de l'optimisation**
   - Liste priorisée du contenu à créer ou restructurer
   - Plan de mise en œuvre du balisage schema
   - Étapes de correction/amélioration du Knowledge Graph
   - Liste de contrôle de correction de la cohérence des entités
   - Directives de formatage de contenu pour l'optimisation AI-first

6. **Suivi et itération**
   - Définir la cadence de suivi (hebdomadaire pour les requêtes prioritaires, mensuelle pour l'audit complet)
   - Mettre en place un cadre de suivi pour détecter les changements de citation
   - Établir des KPI : taux de citation, score de précision, pourcentage de couverture des requêtes
   - Suivre les changements de citation des concurrents dans le cadre du suivi continu
   - Retester après les mises à jour majeures de contenu ou les mises en œuvre de schéma pour mesurer l'impact
   - Consigner toutes les mises à jour de modèles des plateformes IA susceptibles d'affecter la visibilité (nouvelles versions de modèles, changements de récupération)

**Workflow secondaire : création de contenu optimisé pour la citation**

1. Identifier un groupe de requêtes cibles où la marque devrait être citée mais ne l'est actuellement pas
2. Analyser quelles sources SONT citées pour ces requêtes — étudier leur structure de contenu, leurs signaux d'autorité et leur formatage
3. Créer ou restructurer un contenu qui surpasse les sources citées sur :
   - La précision factuelle et la spécificité (inclure des données, dates et chiffres précis)
   - Des affirmations définitionnelles claires (les modèles d'IA privilégient un contenu aux définitions non ambiguës)
   - Un formatage structuré (titres clairs, puces, tableaux que l'IA peut analyser)
   - Des signaux de crédibilité des sources (diplômes de l'auteur, citations de recherches primaires, autorité organisationnelle)
4. Mettre en place le balisage schema approprié (FAQ, HowTo, Article, Organization selon le cas)
5. Construire des signaux d'autorité entrants (liens internes depuis des pages à forte autorité, citations externes)
6. Retester les réponses des plateformes IA 2 à 4 semaines après la publication pour mesurer la reprise en citation

## Fichiers de référence

- `ai-visibility-audit.md` — méthodologie d'audit étape par étape, grille de notation et protocoles de test spécifiques à chaque plateforme
- `citation-optimization.md` — techniques de restructuration de contenu, schémas de formatage dignes de citation et construction d'autorité des sources
- `entity-consistency.md` — liste de contrôle d'audit des entités multiplateforme, optimisation du Knowledge Graph, directives d'édition Wikidata
- `llm-content-strategy.md` — cadre de création de contenu AI-first, cartographie de l'autorité thématique et guide de mise en œuvre des données structurées

## Formats de livrables

| Livrable | Format | Description |
|---|---|---|
| Tableau de bord de visibilité IA | Tableau/Feuille de calcul | Scores de visibilité requête par requête sur toutes les plateformes IA |
| Rapport de cohérence des entités | Document | Toutes les incohérences trouvées avec instructions de correction |
| Brief de contenu AEO | Document | Briefs de création/restructuration de contenu optimisés pour la citation IA |
| Spécification de balisage schema | Extraits de code (JSON-LD) | Balisage de données structurées prêt à implémenter |
| Spécification du tableau de bord de suivi | Document | KPI, méthodologie de suivi et cadence de reporting |
| Matrice de visibilité IA concurrentielle | Tableau | Comparaison côte à côte de la visibilité IA de la marque vs des concurrents |
| Stratégie de contenu LLM | Document | Plan de contenu sur 90 jours axé sur la construction de l'autorité IA |

## Cas particuliers

### Marque avec une perception IA négative
- **Situation** : les plateformes IA génèrent des informations inexactes ou négatives sur la marque
- **Approche** : prioriser les corrections de cohérence des entités et la correction des sources faisant autorité avant toute optimisation de contenu. Créer un contenu de correction factuelle sur des propriétés propres à forte autorité. NE PAS tenter de manipuler directement les résultats de l'IA — se concentrer sur la correction du matériel source sous-jacent. Signaler à l'utilisateur les besoins potentiels de gestion de réputation.

### Nouvelle marque sans aucune visibilité IA
- **Situation** : la marque n'apparaît dans aucune réponse générée par IA
- **Approche** : commencer par construire des fondations — créer une présence web digne de Wikipédia (pas nécessairement Wikipédia elle-même), établir une entrée Wikidata, mettre en place un balisage schema complet, et construire un contenu d'autorité thématique. Fixer des délais réalistes : la connaissance des modèles d'IA comporte des délais de latence (de quelques semaines à plusieurs mois selon la plateforme).

### Noms de marque composés de mots courants
- **Situation** : le nom de la marque est un mot courant (par ex. « Apple », « Slack », « Monday »)
- **Approche** : la désambiguïsation des entités est essentielle. Mettre l'accent sur les termes co-occurrents, utiliser les noms officiels complets dans les données structurées, s'assurer que le Knowledge Graph désambiguïse correctement, et optimiser le contenu avec un contexte clarifiant l'entité. Toujours inclure des qualificatifs de secteur/produit dans les requêtes cibles.

### Entreprises multi-marques
- **Situation** : une société mère avec plusieurs sous-marques nécessitant des identités IA distinctes
- **Approche** : auditer chaque entité de marque séparément. S'assurer de relations parent-enfant claires dans les données structurées. Éviter la cannibalisation où les sous-marques se concurrencent entre elles dans les réponses IA. Créer une autorité thématique distincte pour chaque marque.

### Moteurs IA régionaux (Baidu, Yandex)
- **Situation** : l'utilisateur a besoin de visibilité sur des plateformes IA non occidentales
- **Approche** : reconnaître que les stratégies d'optimisation diffèrent considérablement pour Baidu (Chine) et Yandex (Russie). Celles-ci nécessitent un contenu localisé, des standards de données structurées spécifiques à la plateforme, et des bases de connaissances différentes. Recommander une expertise régionale spécialisée si la demande va en profondeur. Fournir un cadre général tout en signalant les limites de connaissance sur ces plateformes spécifiques.

### Marques YMYL (santé, finance, juridique)
- **Situation** : les marques dans les catégories Your Money Your Life font face à des exigences de confiance élevées de la part des plateformes IA
- **Approche** : les plateformes IA appliquent des seuils de qualité de source plus stricts pour les sujets YMYL. Prioriser : (1) une paternité experte avec des diplômes vérifiables sur tout le contenu. (2) des citations vers des recherches primaires, des sources gouvernementales et des études évaluées par des pairs. (3) des mentions de relecture médicale/juridique/financière. (4) des signaux E-E-A-T complets (lien vers le module Digital PR pour la construction d'autorité). (5) un balisage schema déclarant explicitement les qualifications de l'auteur et les diplômes organisationnels. Tester soigneusement les résultats IA pour la précision — une mauvaise représentation dans les catégories YMYL comporte un risque réputationnel plus élevé.

### Paysage IA en évolution rapide
- **Situation** : les plateformes IA mettent fréquemment à jour leurs modèles, méthodes de récupération et comportement de citation
- **Approche** : traiter toutes les stratégies AEO/GEO comme des processus vivants, pas des optimisations ponctuelles. Intégrer le suivi dans chaque mission. Lorsqu'une mise à jour majeure de plateforme survient (nouvelle version de modèle, changement de système de récupération, changement de format AI Overview), relancer l'audit de visibilité pour les requêtes prioritaires. Documenter les changements de comportement observés et mettre à jour le workflow en conséquence. Tenir un journal des mises à jour de plateformes et de leur impact observé sur la visibilité de la marque.

## Conseils et mises en garde

- **Position officielle de Google (15 mai 2026) :** pas de `llms.txt`, pas de schéma spécifique à l'IA, pas de porte d'éligibilité IA séparée. Ne fabriquez pas de travail autour de facteurs de classement fictifs — le schema + la cohérence des entités + un formatage digne de citation sont ce qui fonctionne.
- **Les schémas de citation d'AI Mode diffèrent fréquemment de ceux d'AI Overviews** pour une même requête (observation interne, 05/2026 — le chiffre « 40-60 % » est une estimation approximative, à revérifier avec votre propre ensemble de sondages). Auditez et optimisez pour les deux, en les traitant comme des surfaces distinctes.
- **La cohérence des entités sur le Knowledge Graph, Wikidata, Wikipédia, LinkedIn, Crunchbase est l'investissement AEO au plus fort effet de levier** — plus impactant que les ajustements de schéma.
- **Les citations IA sont plus durables que les classements dans les liens bleus**, mais plus lentes à obtenir. Attendez-vous à 3-6 mois de travail constant avant un changement mesurable.
- **N'essayez pas de « tromper » l'IA pour qu'elle vous cite** avec du contenu bourré de mots-clés ou de faux signaux d'autorité. Les plateformes IA détectent et rétrogradent cela plus vite que la recherche traditionnelle.
- **`Google-Extended` (robots.txt) permet de se retirer des *autres* systèmes IA de Google** (entraînement Gemini, grounding Vertex) — distinct de la bascule dans Search Console pour AI Overviews/AI Mode (déployée le 3 juin 2026 via `/digital-marketing-pro:gsc-ai-performance`).
- **Les marchés de l'UE** exigent une divulgation au titre de l'article 50 sur le contenu généré par IA (applicable au 2 août 2026) — voir `skills/context-engine/eu-code-of-practice.md`.

## Compétences associées

- **Content Engine** — pour créer et optimiser le contenu réel qui génère les citations IA
- **Analytics & Insights** — pour mesurer la performance de visibilité IA et suivre l'évolution des citations dans le temps
- **Digital PR & Authority** — pour construire les signaux E-E-A-T et les médias gagnés qui renforcent la confiance de l'IA envers une marque
- **Audience Intelligence** — pour comprendre quelles requêtes votre audience cible pose aux plateformes IA

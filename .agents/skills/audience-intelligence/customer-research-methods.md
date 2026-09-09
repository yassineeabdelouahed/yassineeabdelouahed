# Méthodes de recherche client — Méthodologie et cadres

Un guide pratique pour comprendre les clients grâce à la recherche quantitative et qualitative. Couvre la conception d'enquête, les techniques d'entretien, la méthodologie Jobs-to-Be-Done, les programmes voix du client, et les méthodes de synthèse — avec une guidance budgétaire pour chaque étape.

---

## Méthodes de recherche quantitative

### Enquêtes

| Type d'enquête | Ce qu'elle mesure | Quand l'utiliser | Benchmark |
|-------------|-----------------|-------------|-----------|
| **NPS (Net Promoter Score)** | Probabilité de recommander (échelle 0-10) | Santé de la relation continue | SaaS : 30-50, E-commerce : 40-60 |
| **CSAT (satisfaction client)** | Satisfaction envers une interaction spécifique (échelle 1-5) | Post-achat, post-support, post-onboarding | 75-85 % positif |
| **CES (score d'effort client)** | Facilité à accomplir une tâche (échelle 1-7) | Post-interaction (support, paiement, configuration) | 5,0+ sur 7 |
| **Adéquation produit-marché (Sean Ellis)** | « À quel point seriez-vous déçu si vous ne pouviez plus utiliser ce produit ? » | Après 2+ semaines d'usage, minimum 40 réponses | 40 %+ « très déçu » = PMF |
| **Analyse conjointe** | Valeur relative des fonctionnalités produit / arbitrages de prix | Avant des changements de tarification ou le développement d'un nouveau produit | Nécessite 200+ répondants |

### Recherche basée sur les analytics

| Méthode | Ce qu'elle révèle | Outils |
|--------|----------------|-------|
| **Analytics comportemental** | Ce que les utilisateurs font réellement (pas ce qu'ils disent) | GA4, Mixpanel, Amplitude, Heap |
| **Analyse de cohorte** | Comment le comportement évolue dans le temps par groupe d'acquisition | GA4, Mixpanel, SQL personnalisé |
| **Analyse de tunnel** | Où les utilisateurs abandonnent dans les flux multi-étapes | Tunnels GA4, tunnels Mixpanel, Hotjar |
| **Enregistrements de session** | Parcours individuels des utilisateurs, points de friction, confusion | Hotjar, FullStory, Microsoft Clarity |
| **Cartes de chaleur** | Motifs agrégés de clic, de défilement, et d'attention | Hotjar, Crazy Egg, Microsoft Clarity |
| **Suivi de l'usage des fonctionnalités** | Quelles fonctionnalités pilotent la rétention vs restent inutilisées | Mixpanel, Amplitude, Pendo |

---

## Méthodes de recherche qualitative

### Guide de sélection de méthode

| Méthode | Idéal pour | Taille d'échantillon | Temps par session | Coût |
|--------|----------|-------------|-----------------|------|
| **Entretiens clients 1:1** | Compréhension approfondie des motivations, problèmes, et processus de décision | 8-15 entretiens par segment | 30-60 min | Faible (juste votre temps) |
| **Focus groups** | Explorer les réactions, le langage, et la dynamique de groupe autour de concepts | 6-10 participants par groupe, 2-3 groupes minimum | 60-90 min | Moyen (1 000-5 000 $ par groupe avec recrutement) |
| **Tests d'utilisabilité** | Identifier la friction dans les interactions produit ou site web | 5-8 participants par cycle | 30-45 min | Faible-moyen |
| **Observation ethnographique** | Comprendre le comportement dans un contexte naturel (pas auto-déclaré) | 5-10 participants | 2-4 heures | Moyen-élevé |
| **Études de journal** | Capturer le comportement et le contexte sur des jours ou des semaines | 10-20 participants | 1-4 semaines | Moyen |
| **Enquête contextuelle** | Observer les utilisateurs accomplir des tâches dans leur environnement en posant des questions | 6-12 participants | 60-120 min | Moyen |
| **Tri de cartes** | Comprendre comment les utilisateurs catégorisent et étiquettent l'information | 15-30 participants (tri ouvert), 30+ (tri fermé) | 15-30 min | Faible |

---

## Bonnes pratiques de conception d'enquête

### Types de questions et quand utiliser chacun

| Type | Exemple | Idéal pour | À surveiller |
|------|---------|----------|---------------|
| **Échelle de Likert (1-5 ou 1-7)** | « Dans quelle mesure êtes-vous satisfait de... ? » | Mesurer les attitudes et perceptions | Biais d'acquiescement (tendance à être d'accord) |
| **Choix multiple** | « Quelle fonctionnalité utilisez-vous le plus souvent ? » | Identifier les préférences parmi des options connues | Options orientées, liste exhaustive nécessaire |
| **Ouverte** | « Quel est votre plus grand défi avec... ? » | Découverte, mise au jour de problèmes inconnus | Faible taux de complétion, analyse intensive |
| **Matrice / grille** | Noter 5 fonctionnalités sur la satisfaction et l'importance | Comparer plusieurs éléments sur les mêmes dimensions | Fatigue du répondant, réponses en ligne droite |
| **Classement** | « Classez ces 5 fonctionnalités de la plus à la moins importante » | Forcer des arbitrages (plus informatif que « noter chacune ») | Maximum 7 éléments avant surcharge cognitive |
| **Max-Diff** | « Lequel est le plus/moins important parmi cet ensemble de 4 ? » | Discriminer entre les éléments mieux qu'un classement | Nécessite des outils d'analyse spécialisés |

### Exigences de taille d'échantillon

| Niveau de confiance | Marge d'erreur | Population 1K | Population 10K | Population 100K+ |
|-----------------|----------------|---------------|----------------|-------------------|
| 95 % | +/- 5 % | 278 | 370 | 384 |
| 95 % | +/- 3 % | 516 | 964 | 1 067 |
| 99 % | +/- 5 % | 399 | 622 | 663 |

### Liste de contrôle d'évitement des biais

- [ ] **Pas de questions orientées** — « À quel point votre expérience était-elle formidable ? » devient « Comment décririez-vous votre expérience ? »
- [ ] **Pas de questions à double détente** — « Dans quelle mesure êtes-vous satisfait de nos prix et fonctionnalités ? » devrait être deux questions distinctes
- [ ] **Échelles de réponse équilibrées** — nombre égal d'options positives et négatives
- [ ] **Pas de langage chargé** — cadrage neutre tout au long
- [ ] **Randomiser l'ordre des options** — évite le biais de primauté/récence dans les choix multiples
- [ ] **Inclure « Non applicable » et « Préfère ne pas répondre »** — évite les fausses réponses forcées
- [ ] **Tester en pilote avec 5-10 personnes** — détecter les questions confuses avant le lancement
- [ ] **Rester sous 5 minutes** — les taux de complétion chutent de 15-20 % pour chaque minute additionnelle au-delà de 5

### Ordre des questions

1. Questions de sélection en premier (disqualifier les répondants hors cible tôt)
2. Questions larges/faciles ensuite (créer l'engagement)
3. Questions de recherche centrales au milieu (le répondant est concentré)
4. Questions sensibles ou démographiques en dernier (la confiance est établie)
5. Questions ouvertes tout à la fin (effort le plus élevé, énergie la plus basse)

### Stratégie d'incitation

| Audience | Incitation appropriée | Montant |
|----------|----------------------|--------|
| Clients B2C | Carte cadeau, code de remise, participation à un tirage au sort | 5-25 $ par réponse |
| Utilisateurs B2B | Carte cadeau Amazon, don caritatif en leur nom | 25-100 $ par réponse |
| Décideurs d'entreprise | Accès à un rapport de recherche, résumé exécutif | 50-200 $ ou valeur équivalente |
| Non-clients | Équivalent en espèces ou carte cadeau universelle | 10-50 $ par réponse |

---

## Modèle de guide d'entretien

### Échauffement (5 minutes)
- Parlez-moi de votre rôle et de vos responsabilités au quotidien.
- Depuis combien de temps occupez-vous ce rôle / utilisez-vous des produits comme le nôtre ?
- À quoi ressemble un [flux de travail pertinent] typique pour vous ?

### Exploration Jobs-to-Be-Done (15 minutes)
- Quand avez-vous commencé à chercher une solution comme [catégorie de produit] ?
- Que se passait-il qui vous a poussé à commencer à chercher ? (forces de poussée)
- Qu'espériez-vous que la solution ferait pour vous ? (forces d'attraction)
- Qu'utilisiez-vous avant ? Qu'est-ce qui a failli vous empêcher de changer ? (habitude + anxiété)
- Décrivez-moi le processus de décision — qui était impliqué, qu'avez-vous comparé ?

### Exploration du problème (10 minutes)
- Quelle est la partie la plus difficile de [flux de travail/tâche] ?
- Quelle est la dernière fois où vous avez été frustré par [domaine de problème] ? Décrivez-moi ce qui s'est passé.
- Comment contournez-vous ce problème aujourd'hui ?
- À quoi cela ressemblerait-il si ce problème n'existait pas ?

### Évaluation de la solution (10 minutes)
- Montrez-moi comment vous utilisez actuellement [produit/fonctionnalité] pour [tâche].
- Qu'aimeriez-vous qu'il fasse différemment ?
- Si vous pouviez agiter une baguette magique et changer une chose, laquelle serait-ce ?
- Qu'est-ce qui vous ferait recommander cela à un collègue ?

### Consentement à payer (5 minutes)
- À quel prix cela deviendrait-il trop cher pour être envisagé ? (trop cher)
- À quel prix serait-ce si bon marché que vous questionneriez la qualité ? (trop bon marché)
- À quel prix cela semblerait-il cher mais toujours en valoir la peine ? (cher/acceptable)
- À quel prix cela semblerait-il une excellente affaire ? (bon marché/acceptable)

### Clôture (5 minutes)
- Y a-t-il quelque chose que j'aurais dû demander mais que je n'ai pas demandé ?
- Seriez-vous ouvert à un entretien de suivi à l'avenir ?
- Pensez-vous à quelqu'un d'autre qu'il serait bon de contacter à ce sujet ?

---

## Recherche Jobs-to-Be-Done (JTBD)

### Cadre de l'entretien de changement (switch interview)

L'entretien de changement reconstitue la chronologie de la façon dont un client est passé de son ancienne solution à votre produit. Il révèle les quatre forces qui pilotent chaque décision de changement.

### Les quatre forces du progrès

| Force | Direction | Questions d'entretien |
|-------|-----------|-------------------|
| **Poussée** (problèmes avec la solution actuelle) | Éloigne du statu quo | « Qu'est-ce qui n'allait pas avec votre ancienne approche ? » « Quand cela est-il devenu inacceptable ? » |
| **Attraction** (attrait de la nouvelle solution) | Attire vers la nouvelle solution | « Qu'est-ce qui, dans [produit], vous a fait penser qu'il pourrait résoudre cela ? » « Quel résultat espériez-vous ? » |
| **Habitude** (confort avec la solution actuelle) | Résiste au changement | « Qu'aimiez-vous dans l'ancienne façon de faire ? » « Qu'est-ce qui était difficile à quitter ? » |
| **Anxiété** (incertitude sur la nouvelle solution) | Résiste au changement | « Qu'est-ce qui vous inquiétait à propos du changement ? » « Qu'est-ce qui a failli vous arrêter ? » |

### Cartographie de la chronologie

Cartographier le parcours de changement à travers ces moments clés :

1. **Première pensée** — quand avez-vous réalisé pour la première fois que l'ancienne solution ne suffisait plus ?
2. **Recherche passive** — quand avez-vous commencé à remarquer des alternatives sans chercher activement ?
3. **Recherche active** — qu'est-ce qui vous a déclenché à commencer à rechercher et comparer des options ?
4. **Décision** — quel a été le déclencheur final qui vous a fait vous engager ?
5. **Achat** — décrivez-moi l'expérience réelle d'achat/d'inscription.
6. **Premier usage** — que s'est-il passé lors de votre première utilisation du produit ?
7. **Usage continu** — comment votre usage a-t-il évolué depuis ?

---

## Analyse win/loss

### Cadre d'entretien — Transactions gagnées

| Domaine | Questions |
|------|-----------|
| **Déclencheur** | Que se passait-il qui a initié cet achat ? |
| **Évaluation** | Qui d'autre avez-vous évalué ? Jusqu'où sont-ils allés ? |
| **Critères de décision** | Quels étaient les 3 principaux facteurs de votre décision ? |
| **Différenciateur** | Qu'est-ce qui vous a fait nous choisir spécifiquement ? |
| **Objections** | Quelles préoccupations aviez-vous ? Qu'est-ce qui a failli vous arrêter ? |
| **Influence du contenu** | Quels contenus, démos, ou conversations ont été les plus utiles ? |
| **Amélioration** | Qu'est-ce qui aurait facilité le processus d'achat ? |

### Cadre d'entretien — Transactions perdues

| Domaine | Questions |
|------|-----------|
| **Déclencheur** | Quel problème essayiez-vous de résoudre ? |
| **Évaluation** | Décrivez-moi votre processus d'évaluation. |
| **Élimination** | À quel moment nous avez-vous retirés de la considération ? |
| **Facteur décisif** | Qu'est-ce qui vous a spécifiquement fait choisir [concurrent] ? |
| **Perception** | Quelle était votre impression de notre produit ? De notre équipe ? De notre tarification ? |
| **Reconsidération** | Qu'est-ce qui aurait changé votre avis ? Y a-t-il un scénario où vous reconsidéreriez ? |

### Modèle d'identification de motifs

```
WIN/LOSS ANALYSIS — [Quarter/Period]

DEALS ANALYZED: [Won: N, Lost: N]

TOP WIN THEMES:
1. [Theme] — mentioned in X of Y winning interviews
2. [Theme] — mentioned in X of Y
3. [Theme] — mentioned in X of Y

TOP LOSS THEMES:
1. [Theme] — mentioned in X of Y losing interviews
2. [Theme] — mentioned in X of Y
3. [Theme] — mentioned in X of Y

COMPETITIVE PATTERNS:
- Lost to [Competitor A]: X times — primary reason: [reason]
- Lost to [Competitor B]: X times — primary reason: [reason]
- Lost to "no decision": X times — primary reason: [reason]

RECOMMENDED ACTIONS:
1. [Action] — addresses [loss theme]
2. [Action] — reinforces [win theme]
3. [Action] — competitive response to [competitor pattern]
```

---

## Programmes voix du client (VoC)

### Sources de collecte de retours continus

| Source | Type | Méthode d'exploitation | Qualité de l'insight |
|--------|------|---------------|-----------------|
| **Tickets de support** | Plaintes réactives | Tagger par catégorie, suivre les tendances de volume | Élevée — friction réelle |
| **Transcriptions de chat** | Questions en direct | Regroupement de sujets par NLP, échantillonnage manuel | Élevée — capture la confusion |
| **Avis en ligne** | Opinion publique | Analyse de sentiment, extraction de mots-clés | Moyenne-élevée — échantillon auto-sélectionné |
| **Mentions sociales** | Retour non sollicité | Outils de social listening (Brandwatch, Sprout) | Moyenne — bruyant mais authentique |
| **Enregistrements d'appels de vente** | Objections des prospects | Suivi de mots-clés par intelligence d'appel (Gong, Chorus) | Élevée — révèle les freins à l'achat |
| **Réponses de suivi NPS** | Raisons promoteur/détracteur | Analyse textuelle des réponses ouvertes | Élevée — liée au score quantitatif |
| **Forums communautaires** | Demandes de fonctionnalités, contournements | Tagging de sujets, comptage de votes positifs | Moyenne-élevée — biais des utilisateurs assidus |
| **Avis sur les stores d'applications** | Retour spécifique au mobile | Tendances de notation, extraction de mots-clés | Moyenne — biaisé vers le négatif |

---

## Synthèse de la recherche

### Processus de cartographie par affinité

1. **Capturer** — écrire chaque observation, citation, ou constat sur une note autocollante distincte (numérique : Miro, FigJam)
2. **Regrouper** — grouper des observations similaires sans catégories prédéfinies
3. **Étiqueter** — nommer chaque groupe avec un thème descriptif (utiliser le langage des participants, pas le jargon interne)
4. **Prioriser** — classer les groupes par fréquence (combien de participants l'ont mentionné) et sévérité (combien cela impacte le comportement)
5. **Synthétiser** — rédiger 3 à 5 énoncés d'insight clés au format : « [Type d'utilisateur] a besoin de [besoin] parce que [motivation/preuve sous-jacente] »

### De la recherche aux personas

| Donnée de recherche | Élément de persona |
|---------------|-----------------|
| Données d'enquête démographique | Âge, rôle, taille d'entreprise, géographie |
| Entretiens JTBD | Objectifs, motivations, jobs-to-be-done |
| Regroupement de points de douleur | Frustrations et défis |
| Analytics comportemental | Motifs d'usage, préférences de fonctionnalités |
| Analyse win/loss | Critères de décision, processus d'évaluation |
| Thèmes de tickets de support | Questions courantes et points de friction |

### Matrice de priorisation des insights

| Dimension | Pondération | Notation |
|-----------|--------|---------|
| **Fréquence** | 30 % | Combien de clients ont mentionné ou démontré cela ? |
| **Sévérité** | 30 % | À quel point cela impacte-t-il significativement la capacité du client à réussir ? |
| **Actionnabilité** | 20 % | Dans quelle mesure est-il faisable pour nous d'agir sur cet insight ? |
| **Impact sur le revenu** | 20 % | Cela affecte-t-il le consentement à payer, la rétention, ou l'expansion ? |

---

## Bonnes pratiques du référentiel de recherche

### Système de tagging

Chaque insight devrait être tagué sur trois dimensions :

1. **Sujet** — domaine de fonctionnalité, flux de travail, ou domaine produit
2. **Persona** — à quel segment client cet insight s'applique-t-il
3. **Source** — entretien, enquête, analytics, support, avis

### Vieillissement des insights

| Âge | Statut | Action |
|-----|--------|--------|
| < 6 mois | Frais | Utiliser avec confiance dans les décisions actuelles |
| 6-12 mois | Actuel | Valide pour la stratégie, vérifier les détails pour les décisions tactiques |
| 12-24 mois | Vieillissant | Recouper avec des données plus récentes avant de s'y fier |
| > 24 mois | Périmé | Rerechercher avant utilisation ; les conditions de marché ont probablement changé |

---

## Guide budgétaire

### Gratuit (0 $)

- Google Forms ou le niveau gratuit de Typeform pour les enquêtes
- Entretiens clients manuels (utiliser le niveau gratuit de Zoom)
- Google Analytics / Microsoft Clarity pour les données comportementales
- Exploitation d'avis (lire manuellement G2, Capterra, les avis de store d'applications)
- Analyse de tickets de support (exporter et tagger manuellement)

### Démarrage (500 $)

- Outil d'enquête avec logique et transfert de champs (Typeform Pro, SurveyMonkey)
- 200 $ en incitations par carte cadeau pour 10-15 répondants d'enquête
- 300 $ en incitations par carte cadeau pour 5-6 entretiens clients
- Otter.ai ou similaire pour la transcription d'entretien

### Croissance (5 000 $)

- Tout ce qui précède, plus :
- Outil de recherche utilisateur dédié (Maze, UserTesting)
- 20-30 entretiens modérés avec transcription professionnelle
- Recrutement de panel pour la recherche non-client (Respondent.io, User Interviews)
- Outil de social listening basique (Mention, Brand24)
- Hotjar ou similaire pour les enregistrements de session et cartes de chaleur

### Entreprise (50 000 $)

- Tout ce qui précède, plus :
- Plateforme de recherche full-service (Qualtrics, Medallia)
- Programme VoC continu avec déclencheurs d'enquête automatisés
- Plateforme d'intelligence d'appel (Gong, Chorus)
- Agence de recherche professionnelle pour les études complexes (conjointe, ethnographique)
- Outil de référentiel de recherche dédié (Dovetail, EnjoyHQ)
- Programme trimestriel d'analyse win/loss concurrentielle

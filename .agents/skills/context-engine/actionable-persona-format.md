# Format de persona actionnable

La plupart des personas en marketing sont des récits biographiques qui ne produisent aucune guidance utile. « Voici Priya, 28 ans, vit à Bangalore, aime le yoga et le shopping en ligne, gagne 12 LPA » vous dit à quoi elle ressemble — pas ce qu'elle veut, pas où la trouver, pas comment la convertir.

Le format de persona actionnable remplace les récits biographiques par six questions dont les réponses éclairent directement les décisions marketing.

## Les six questions

### 1. Quelle est la tâche principale qu'ils essaient d'accomplir ?

Pas « ils veulent notre produit ». C'est ce que nous voulons qu'ils veuillent. La tâche réelle est ce qu'ils veulent pour eux-mêmes.

**Exemple faible :** « Elle veut utiliser notre outil de gestion de projet. »

**Exemple fort :** « Elle veut arrêter de manquer des délais parce que son équipe utilise trois outils différents que personne ne synchronise. »

La tâche est le résultat dont la personne a besoin dans sa vie. Utilisez le cadrage Jobs-to-Be-Done : « Quand [situation], ils veulent [tâche], afin de [résultat ultime]. »

### 2. Qu'est-ce qui les déclenche à chercher une solution ?

Un persona qui ne cherche pas activement n'est pas un persona commercialisable — c'est une cible de notoriété out-market. Le déclencheur est le moment où la personne entre dans l'état in-market.

**Exemple faible :** « Elle cherche toujours des outils de productivité. »

**Exemple fort :** « Elle entre sur le marché la semaine suivant un projet ayant explosé son délai et après avoir reçu un e-mail difficile d'un client. Le déclencheur est la pression interne pour résoudre le problème systémique avant qu'un autre délai n'explose. »

Connaître le déclencheur vous dit quand et où être présent.

### 3. Où recherchent-ils des solutions ?

Plateformes précises, comportement de recherche précis, sources d'information précises.

**Exemple faible :** « Elle cherche en ligne. »

**Exemple fort :** « Elle commence par une recherche Google pour « meilleur outil de gestion de projet pour agences de design ». Puis elle demande à son réseau sur LinkedIn. Puis elle regarde 2 à 3 avis YouTube de créateurs en qui elle a confiance. Puis elle revient sur Google pour des comparaisons « X vs Y ». Puis elle vérifie les avis G2 et Capterra. »

Cela vous dit directement quels canaux comptent (Google Search, LinkedIn, YouTube, sites d'avis) et quel contenu créer (contenu comparatif, avis, tutoriels).

### 4. Quels critères utilisent-ils pour évaluer les options ?

Les critères de décision. Ce qui rend une option meilleure qu'une autre à leurs yeux.

**Exemple faible :** « Elle veut quelque chose qui fonctionne bien. »

**Exemple fort :** « Trois critères, dans l'ordre : (1) s'intègre aux outils de design que son équipe utilise déjà (Figma, Notion, Slack) ; (2) temps de mise en œuvre inférieur à une semaine (pas de temps pour une longue intégration) ; (3) tarification par utilisateur inférieure à 1 000 INR/mois par poste. »

Cela vous dit exactement par quoi votre message doit commencer — intégrations, mise en œuvre rapide, tarification transparente.

### 5. Qu'est-ce qui les ferait nous choisir plutôt que les alternatives ?

La raison d'y croire spécifique à votre marque par rapport aux alternatives qu'ils envisagent.

**Exemple faible :** « Notre qualité. »

**Exemple fort :** « Étude de cas précise d'une agence de design de taille similaire qui est passée de 30 % de délais manqués à moins de 5 % en 60 jours grâce à notre outil. Avec un client nommé et un résultat chiffré. »

Cela dit exactement à vos équipes de vente et de contenu quels arguments de preuve développer.

### 6. Qu'est-ce qui les ferait NE PAS nous choisir ?

Les facteurs disqualifiants. Ce qu'ils pourraient découvrir et qui les pousserait vers un concurrent.

**Exemple faible :** « De mauvais avis. »

**Exemple fort :** « Trois choses la feraient perdre : (1) aucune intégration Figma native (contre le support Figma approfondi de Notion) ; (2) toute tarification au-dessus de 1 200 INR/poste/mois (nous dépassons sa tolérance budgétaire) ; (3) toute exigence d'intégration au-dessus de 5 jours (elle n'a pas de temps pour une longue mise en œuvre). »

Cela dit exactement à vos équipes produit, ventes, et tarification quelles objections traiter — et ce qu'il ne faut jamais aggraver.

## Produire des personas avec ce format

Les personas dans ce format vivent dans le document central 3.2 (cadre de segmentation), étape 5.

La compétence qui génère les personas (`audience-intelligence/persona-builder` et la compétence des quatre documents centraux de la partie 3) produit chaque persona sous forme de bloc markdown structuré :

```markdown
## Persona : {Nom du persona}

**ID du persona :** {identifiant unique}
**Groupe cible :** {à quel TG appartient ce persona}
**Sous-segment :** {sous-segment précis}
**Priorité :** {Principal / Secondaire / Tertiaire}

### 1. Tâche principale à accomplir
{1-3 phrases utilisant le cadrage JTBD}

### 2. Déclencheur
{1-3 phrases décrivant le moment qui met ce persona en état in-market}

### 3. Comportement de recherche
{Plateformes précises, requêtes de recherche, sources d'information, en séquence}

### 4. Critères d'évaluation
{Liste ordonnée de 3 à 5 critères précis, avec pondérations si connues}

### 5. Raisons de nous choisir
{Arguments de preuve précis liés aux alternatives envisagées}

### 6. Raisons de NE PAS nous choisir
{Facteurs disqualifiants précis — ce qui pourrait les pousser vers un concurrent}

### Démographie et contexte (référence uniquement)
{Bref — utilisé uniquement pour le ciblage de planification média, pas pour l'orientation du message}

- Tranche d'âge : {si pertinent}
- Géographie : {niveau de ville, région}
- Fourchette de revenus : {si pertinent}
- Profession / rôle : {particulièrement pour le B2B}
- Sophistication technologique : {si pertinent}
```

Notez que la démographie vient **en dernier et brièvement**. Elle constitue un intrant pour le ciblage média (ciblage par centres d'intérêt Meta, ciblage par intitulé de poste LinkedIn), pas pour l'orientation du message. Les six questions pilotent le message.

## Comment les compétences consomment les personas

Chaque compétence de canal (partie 9), chaque compétence créative (partie 10, partie 11), chaque compétence de contenu lit le persona pertinent avant de produire un résultat.

Un article de blog pour le persona X s'ouvre avec le déclencheur (« Si vous êtes un [rôle] qui vient de vivre [situation correspondant au déclencheur]... »), traite les critères d'évaluation dans le corps, et se conclut avec des arguments de preuve correspondant à la raison n° 5.

Une publicité pour le persona X utilise le langage de recherche de la question 3, commence par le critère n° 1, et traite la principale objection de la question 6.

Une landing page pour le persona X reflète la requête de recherche, démontre que les critères d'évaluation peuvent être satisfaits, et anticipe les facteurs disqualifiants.

C'est ce que signifie « actionnable ». Le document de persona n'est pas une histoire — c'est un brief.

## Personas vs anti-personas

L'étape 14 du document central 3.2 documente les anti-personas — qui la marque ne cible explicitement pas.

Pour chaque anti-persona :

- **Description :** qui ils sont
- **Pourquoi ce N'EST PAS une cible :** inadéquation du besoin, attentes non concordantes, non rentable à servir, inadéquation de marque, etc.
- **Implication :** ce que nous ne faisons PAS (par exemple, « ne pas enchérir sur les mots-clés d'achat entreprise ; ne pas montrer de publicités LinkedIn à quiconque a « Achats » dans son intitulé de poste ; ne pas utiliser un langage « de niveau entreprise » qui attirerait des anti-personas »)

Les anti-personas sont aussi stratégiquement précieux que les personas. Ils évitent le gaspillage budgétaire et la dérive d'adéquation à la marque.

## Références liées

- [four-core-documents-spec.md](four-core-documents-spec.md) — document central 3.2, étape 5
- [b2b-decision-making-unit.md](b2b-decision-making-unit.md) — superposition B2B (Utilisateur / Influenceur / Décideur / Gardien)
- [engagement-flow-methodology.md](engagement-flow-methodology.md) — où les personas s'inscrivent dans la méthodologie
</content>

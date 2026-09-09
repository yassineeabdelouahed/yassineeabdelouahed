---
name: video-packaging
description: "Générer ou critiquer un packaging vidéo — des paires titre + texte de miniature où le titre porte le contexte et les mots-clés, le texte de miniature porte la tension, et tout mot répété entre les deux est rejeté comme un espace gaspillé. Le mode génération livre 3 paires étiquetées par intention de découverte (recherche vs navigation) avec une recommandation et une note de test A/B ; le mode critique renvoie un verdict PASS/FIX/FAIL avec 3 paires corrigées. Se déclenche sur \"/digital-marketing-pro:video-packaging\", \"title for this video\", \"thumbnail text ideas\", \"why is no one clicking this video\", \"critique this title\", \"package this video\". Se combine avec /digital-marketing-pro:video-script, récupère la formulation réelle des requêtes depuis /digital-marketing-pro:keyword-research pour les titres à intention de recherche, et soumet les affirmations de titre à /digital-marketing-pro:check avant toute publication."
argument-hint: "[brand-name] [--topic <video topic>] [--critique \"<existing title> / <thumb text>\"]"
user-invocable: true
---

# /digital-marketing-pro:video-packaging

Le packaging détermine si une vidéo est regardée ; le contenu ne détermine que
si elle méritait de l'être. Sur toute surface vidéo, le spectateur voit deux
éléments à la fois — le titre et le texte de miniature — et l'art consiste
à faire en sorte qu'**ils remplissent des rôles différents** :

- **Le titre porte le contexte et les mots-clés** — ce qu'est la vidéo,
  formulé comme les gens le recherchent et comme les systèmes de la
  plateforme le lisent.
- **Le texte de miniature porte la tension** — le chiffre, la contradiction,
  le « attends, quoi ? » auquel un humain réagit en une demi-seconde.
- **Le chevauchement est un gaspillage d'espace.** Un mot de miniature qui
  apparaît déjà dans le titre n'a rien acheté avec les pixels les plus rares
  que possède la marque.

## Intention de découverte — étiqueter chaque package

Une idée de vidéo gagne sa découverte de l'une de ces deux façons, et le
packaging diffère :

| Intention | Comment elle est trouvée | Conséquence sur le packaging |
|---|---|---|
| **Recherche** | Requêtes tapées ; se classe sur des mois | Le titre commence par la formulation de la requête (mettre le mot-clé en tête) ; la miniature ajoute le différenciateur face aux autres résultats |
| **Navigation** | Fils suggérés/d'accueil ; pics au clic | Le titre peut consacrer plus de sa longueur à l'intrigue ; la miniature porte la rupture de motif |
| **Les deux** | Rare ; généralement un sujet de recherche avec un angle propice à la navigation | Packager pour la recherche, laisser la miniature faire le travail de navigation |

**Aucune logique de recherche ou de navigation → ce n'est pas encore une
idée de vidéo.** La renvoyer vers le développement de sujet avant de dépenser
un effort de packaging dessus. Pour les vidéos à intention de recherche,
récupérer la formulation réelle des requêtes depuis
/digital-marketing-pro:keyword-research plutôt que de la deviner.

## Mode génération

Entrée : le sujet ou concept, la marque, la plateforme cible, l'intention si connue.

```
# Packaging vidéo — [sujet]

**Intention de découverte :** Recherche / Navigation / Les deux — [le raisonnement en une ligne]

## Paire 1 — [angle : curiosité / bénéfice / identité]
**Titre :** [≤60 caractères si possible — ce qui survit à la troncature vient en premier]
**Texte de miniature :** [1-3 mots]
**Pourquoi ils se combinent :** [les rôles différents, et comment ils se combinent en une seule décision de clic]

## Paire 2 — [angle différent]
## Paire 3 — [angle différent]

## Recommandation
[Quelle paire mener et pourquoi — ancrée dans l'étiquette d'intention, pas dans le goût]

## Note de test A/B
[Quel élément unique faire varier en cas de test — jamais les deux à la fois]
```

## Mode critique

Entrée : un titre existant et/ou un texte de miniature existant (fonctionne
aussi à partir d'une description de capture d'écran).

```
# Critique de packaging — [le brouillon]

## Verdict : PASS / FIX / FAIL

## Le contrôle d'appariement
[Le titre et la miniature remplissent-ils des rôles différents ? Citer tout mot répété — chacun est le constat, verbatim.]

## Ce qui fonctionne
[Ce qui mérite sa place]

## Ce qui ne fonctionne pas
[Problèmes précis, citables — titres vagues, mots-clés enterrés, texte de miniature répétant le titre, curiosité sans clarté]

## 3 paires corrigées
[Packages révisés, même contenu, mêmes affirmations — le packaging ne promet jamais ce que la vidéo ne livre pas]
```

## Règles critiques

- **Rejeter toute paire où un mot de la miniature apparaît dans le titre.**
  C'est la règle centrale et quantifiable — la vérifier mot par mot, pas à
  l'impression.
- **Titres ≤60 caractères si possible** ; s'ils sont plus longs, tout ce qui
  compte se trouve avant le point de troncature.
- **Texte de miniature : 1 à 3 mots.** Quatre, c'est une légende, pas une
  miniature.
- **La clarté l'emporte sur la curiosité.** Une paire qui intrigue mais ne dit
  pas ce que le spectateur obtient échoue — un packaging à écart de
  curiosité que le contenu ne peut pas honorer entraîne de l'abandon, et sur
  des marques réglementées c'est un constat de conformité.
- **Le packaging ne promet jamais plus que la vidéo.** Les affirmations dans
  un titre passent les mêmes garde-fous de marque que tout autre texte ;
  exécuter /digital-marketing-pro:check avant toute publication.
- **Trois paires minimum en Génération ; trois corrections minimum en
  Critique.** Une seule option est une décision déjà prise ; le client
  obtient des choix avec un raisonnement.
- **Étiqueter l'intention à chaque fois.** Un package non étiqueté est une
  supposition sur la façon dont la vidéo sera trouvée — et la recherche et la
  navigation récompensent des structures différentes.

## Se combine avec

- /digital-marketing-pro:video-script — le script que ce packaging présente ;
  son étape de concept de miniature suit la même règle d'appariement
- /digital-marketing-pro:keyword-research — formulation réelle des requêtes
  pour les titres à intention de recherche
- /digital-marketing-pro:check — porte d'affirmations et de conformité avant
  publication
</content>

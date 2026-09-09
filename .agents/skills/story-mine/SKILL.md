---
name: story-mine
description: "Transforme une expérience réelle — un succès client, un lancement raté, un ticket de support, un moment fondateur — en 3 à 5 angles de contenu distincts issus d'une taxonomie à cinq types (leçon, prise de position à contre-courant, cadre méthodologique, preuve, moment relatable), chacun avec un format, un pilier, et une ouverture rédigée en voix de marque, ainsi qu'une liste honnête des angles que l'histoire ne permet pas. Se déclenche sur \"/digital-marketing-pro:story-mine\", \"mine this story\", \"we just had a client win\", \"is there a post in this\", \"turn this experience into content\". Les histoires clients sont anonymisées par défaut (--client-safe) ; lit le profil de marque pour la voix, les piliers, et la conformité ; les angles sont orientés vers /digital-marketing-pro:content-engine pour la rédaction et les angles de preuve solides vers /digital-marketing-pro:case-study-plan."
argument-hint: "[brand-name] [--story <what happened>] [--client-safe]"
user-invocable: true
---

# /digital-marketing-pro:story-mine

L'expérience vécue est la seule source de contenu que les concurrents ne
peuvent pas copier, et la plupart d'entre elle s'évapore dans Slack. Cette
compétence prend un « voici ce qui s'est passé » et en extrait les angles
publiables distincts qui s'y cachent — car une histoire réelle contient
rarement un seul contenu ; elle en contient généralement quatre.

## Entrées

- **L'histoire** — racontée naturellement, comme l'utilisateur la raconterait à
  un collègue. N'exigez pas de structure ; extraire la structure est le
  travail de cette compétence.
- **Le profil de marque** (`~/.claude-marketing/brands/{slug}/`) — voix,
  audience, piliers, et règles de conformité que les angles doivent respecter.
- `--client-safe` — anonymiser avant de définir les angles : aucun nom de
  client, aucun détail identifiant, chiffres arrondis ou exprimés en ratios.
  **Activé par défaut dès que l'histoire implique un client** — c'est
  l'utilisateur qui choisit de nommer, jamais l'inverse.

## La taxonomie des angles

Passez en revue les cinq ; renvoyez les 3 à 5 qui tiennent réellement :

| Angle | La question à laquelle il répond | Format typique |
|---|---|---|
| **La leçon** | Que savons-nous maintenant que nous ne savions pas avant ? | Post LinkedIn, section de newsletter |
| **La prise de position à contre-courant** | Quelle croyance commune cela a-t-il contredite ? | Post court, fil |
| **Le cadre méthodologique** | Quelle méthode reproductible en est ressortie ? | Carrousel, section longue |
| **La preuve** | Quel chiffre ou avant/après cela démontre-t-il ? | Amorce d'étude de cas, post statistique |
| **Le moment relatable** | Où l'audience se reconnaîtra-t-elle ? | Post au format récit |

## Structure de sortie

```
# Story mine — [one-line story summary]

## Angle 1: [name] — [taxonomy type]
**The angle:** [2-3 sentences — what this piece argues]
**Format + channel:** [e.g. LinkedIn text post / newsletter lead / carousel]
**Pillar:** [which brand pillar it serves]
**Draft opening:** [2-3 sentences, in brand voice, leading with the most
interesting part — not "We recently worked with a client..."]

[... angles 2-N ...]

## Not worth angling
[What the story does NOT support — e.g. "no proof angle: the numbers aren't
final yet". Naming the missing angle stops it being invented later.]

## Case-study check
[If the proof angle is strong: flag it for /digital-marketing-pro:case-study-plan
— this story may be a full case study, and these angles become its promotion.]
```

## Règles critiques

- **Les angles doivent être distincts, pas le même insight sous cinq
  habillages différents.** Si l'histoire ne tient que deux angles authentiques,
  renvoyez-en deux et dites-le.
- **Ne jamais fabriquer de détails d'histoire.** Les angles dramatisent ce qui
  s'est passé ; ils ne l'améliorent pas. Les détails manquants sont demandés ou
  contournés — un détail inventé dans une histoire vraie empoisonne l'ensemble
  du contenu. Les règles de provenance des données clients issues du travail
  d'étude de cas s'appliquent ici intégralement.
- **Chaque ouverture de brouillon commence par la partie intéressante** — la
  surprise, le chiffre, le retournement — jamais par la chronologie
  (« Tout a commencé quand... »).
- **Respecter la conformité.** Les angles d'une marque réglementée passent par
  les mêmes garde-fous que tout autre contenu ; une anecdote client proche du
  HIPAA peut n'avoir aucun angle publiable, et le dire est alors le résultat
  correct.
- **Orienter vers la suite, ne pas dupliquer.** Les angles alimentent
  /digital-marketing-pro:content-engine pour la rédaction ; un angle de preuve
  solide alimente case-study-plan. Cette compétence trouve les angles ; elle
  ne rédige pas les contenus.

---
name: lead-magnet-ideas
description: "Transformer un sujet de contenu, une campagne, ou une pièce existante en 3-5 idées de lead magnets nommées et briefables, découpées dans les actifs réels et l'expertise de la marque, chacune notée sur puissance de génération de leads × effort de construction, avec adéquation au tunnel et notes de livraison plus une liste de non-recommandés qui anticipe les options évidentes mais faibles. Se déclenche sur \"/digital-marketing-pro:lead-magnet-ideas\", \"lead magnet for this\", \"what should we give away\", \"opt-in ideas\", \"freebie for this campaign\", \"turn this into a lead magnet\". Lit le profil de marque pour l'audience, l'expertise, et la PI existante ; renvoie vers /digital-marketing-pro:email-sequence pour le nurturing post-capture ou /digital-marketing-pro:funnel-architect lorsqu'il n'y a nulle part où envoyer le lead pour l'instant."
argument-hint: "[brand-name] [--topic <topic or piece>] [--max-effort low|medium|high]"
user-invocable: true
---

# /digital-marketing-pro:lead-magnet-ideas

Le pont entre un contenu qui capte l'attention et un tunnel qui la capture.
Un bon lead magnet n'est pas « un ebook » — c'est l'artefact précis que cette
audience échangerait contre un email, sur ce sujet, de cette marque, réalisable
avec ce que la marque possède déjà.

## Entrées

- **Le sujet** — un thème, une campagne, ou une pièce existante que le magnet
  doit prolonger.
- **Le profil de marque** — audience, expertise, actifs existants, étape du
  tunnel depuis `~/.claude-marketing/brands/{slug}/`. Les meilleurs magnets sont
  découpés dans une PI que la marque possède déjà : la checklist interne, le
  modèle utilisé à chaque mission, le jeu de données que personne d'autre n'a.
- `--max-effort` — plafonner les suggestions à ce que l'équipe peut réellement
  construire.

## La matrice de notation

Chaque idée est notée sur deux axes, avec justification à l'appui — des listes
d'idées non notées revoient la vraie décision à l'utilisateur :

| Note | Puissance de génération de leads | Effort de construction |
|---|---|---|
| **A** | L'audience recherche activement cela ; prochaine étape claire vers l'offre | Assemblé à partir d'actifs existants en quelques heures |
| **B** | Voulu une fois vu ; adjacent à la décision d'achat | Quelques jours ; du matériel nouveau |
| **C** | Sympathique à avoir ; capte la curiosité, pas l'intention | Un vrai projet |

Le point idéal est puissance-A × effort-A : l'artefact que la marque utilise
déjà en interne, mis en forme. Signaler toute idée puissance-C × effort-C comme
ne valant pas la peine d'être construite.

## Structure de sortie

```
# Lead magnets — [sujet], {marque}

## 1. [Nom précis — « La checklist QA pré-lancement en 23 points », jamais « une checklist »]
**Ce que c'est :** [2-3 phrases — contenu, format, longueur]
**Découpé dans :** [l'actif de marque ou l'expertise existant sur lequel c'est construit]
**Puissance : A/B/C** — [pourquoi : demande de recherche, proximité d'intention, adéquation à l'offre]
**Effort : A/B/C** — [pourquoi : ce qui existe vs ce qui doit être créé]
**Adéquation au tunnel :** [pour quoi cela qualifie le lead — la prochaine étape que cela met en place]
**Livraison :** [landing page + email / déblocage dans le contenu / suivi de webinaire]

[... 3-5 idées, meilleur ratio puissance/effort en premier ...]

## Non recommandé
[Idées qui semblent évidentes pour ce sujet mais notées mal ici, avec la note —
anticipant la conversation « et un ebook ? »]

## Prochaines étapes
[Transmission : /digital-marketing-pro:email-sequence pour le nurturing qui
suit la capture ; /digital-marketing-pro:funnel-architect s'il n'y a nulle part
où envoyer le lead pour l'instant]
```

## Règles critiques

- **Précis, sinon ça ne part pas.** Chaque idée porte un nom qu'un designer
  pourrait briefer. « Un modèle » est une catégorie ; « le modèle de séquence
  email d'onboarding client avec les 6 règles de jour d'envoi annotées » est
  une idée.
- **Lié à la PI existante en premier.** Une idée nécessitant une expertise que
  la marque ne démontre pas de façon crédible est notée effort-C et signalée —
  un magnet que la marque ne peut pas livrer de façon crédible endommage
  exactement la confiance qu'il est censé construire.
- **Noter honnêtement, les deux axes, avec justification.** Les notes sont le
  livrable ; les idées sont une commodité.
- **Un magnet doit mener quelque part.** Chaque idée nomme ce pour quoi elle
  qualifie le lead. Une capture sans étape suivante est une liste que personne
  n'emaile.
- **La conformité s'applique.** Le contenu verrouillé dans les secteurs
  réglementés porte les mêmes règles de mentions légales et d'allégations que
  le contenu publié — un magnet n'est pas une porte dérobée de conformité.

---
name: signal-mine
description: "Trie un vrac brut de matériel externe — actualités, fils sociaux, discussions de communauté, mouvements de concurrents, notes d'appels commerciaux — en angles de contenu que la marque a la légitimité de traiter, chacun associé à un pilier avec un format et une fenêtre de pertinence temporelle, ainsi qu'une liste explicite des signaux écartés indiquant pourquoi le reste a été rejeté. Se déclenche sur \"/digital-marketing-pro:signal-mine\", \"mine this\", \"what content is in here\", \"turn this industry news into ideas\", \"any angles for us in this thread\". Nécessite le profil de marque (piliers, audience, concurrents) et s'arrête sans lui ; les affirmations non vérifiées sont orientées vers /digital-marketing-pro:verify-claims avant que quoi que ce soit ne les cite ; les angles retenus alimentent /digital-marketing-pro:content-engine."
argument-hint: "[brand-name] [--signals <pasted material>]"
user-invocable: true
---

# /digital-marketing-pro:signal-mine

La couche d'intelligence entre « intéressant » et « qui nous appartient de dire ». L'entrée
brute vient de n'importe où — une newsletter, un fil Reddit, trois posts de
concurrents, des notes des appels commerciaux d'hier. Le résultat ne contient
que les angles que cette marque a la légitimité de traiter, chacun associé à un
pilier, tout le reste étant explicitement écarté.

L'association est ce qui fait la valeur. N'importe quel modèle peut transformer
une actualité en idées de contenu génériques ; la discipline consiste à
refuser les idées qui ne servent pas l'autorité de cette marque.

## Entrées

- **Le vrac** — matériel collé, sous n'importe quelle forme. Plus il y en a,
  mieux c'est ; le travail de cette compétence est le triage.
- **Le profil de marque** — piliers, audience, positionnement, concurrents
  issus de `~/.claude-marketing/brands/{slug}/`. **Pas de profil → arrêt** :
  miner des signaux sans piliers produit une course aux tendances, exactement
  le mode d'échec que cette compétence existe pour empêcher. Exécutez d'abord
  /digital-marketing-pro:brand-setup.

## Processus

1. Décomposer le vrac en signaux discrets (une affirmation, un événement, un
   sentiment, un chiffre, un mouvement de concurrent).
2. Pour chaque signal, poser la question de légitimité : *cette marque a-t-elle
   quelque chose à dire ici que son audience préférerait entendre d'elle plutôt
   que de n'importe qui d'autre ?* La correspondance au pilier est nécessaire
   mais pas suffisante — c'est la légitimité qui décide.
3. Pour les signaux retenus : nommer l'angle (la prise de position spécifique
   de la marque, pas un résumé du signal), le pilier, un format, et une
   fenêtre de pertinence temporelle.
4. Pour les signaux rejetés : les lister comme écartés, avec la raison. Cette
   liste représente la moitié du livrable — c'est la trace de la discipline
   appliquée, et l'utilisateur peut la contredire avec un contexte que vous
   n'avez pas.

## Structure de sortie

```
# Signal mine — {brand}, {date}

## Angles ({n})
### A1. [The angle — the take, not the topic]
**From signal:** [one-line source reference]
**Pillar:** [brand pillar]  **Timeliness:** [act this week / evergreen / expires ~date]
**Format:** [post / article / newsletter section / campaign hook]
**Why this brand:** [one sentence of standing — why this take is credibly ours]

## Dropped ({n})
- [signal] — [why: off-pillar / no standing / competitor's story to tell /
  stale by the time we publish / compliance risk]

## Sourcing note
[Which signals carry claims that need verification before anything cites them —
route those through /digital-marketing-pro:verify-claims before drafting]
```

## Règles critiques

- **Un angle est une prise de position, pas un sujet.** « La réglementation IA
  évolue » est un sujet. « Les nouvelles règles récompensent exactement le
  travail de transparence que nos clients font déjà » est un angle. Renvoyez
  des angles.
- **L'autorité l'emporte sur la pertinence.** Un signal peut correspondre
  parfaitement à un pilier et être malgré tout écarté parce que la marque n'a
  rien de distinctif à y ajouter. Dites-le clairement.
- **La pertinence temporelle est honnête.** Une étiquette « réagir cette
  semaine » sur quelque chose qui prend trois semaines à produire est un plan
  pour être en retard. Faites correspondre la fenêtre à la vitesse de
  production réelle de la marque.
- **Les affirmations issues du matériel collé sont non vérifiées par
  définition.** Rien ne cite un chiffre collé avant qu'il soit passé par la
  vérification — un texte collé ne porte aucune provenance, et la provenance
  est la règle de la maison.
- **La liste des écartés est toujours livrée.** Un résultat avec dix angles et
  aucun rejet signifie que le triage n'a pas eu lieu.

---
name: goal-filter
description: "Verrouiller UN seul objectif marketing principal par marque, puis juger toute idée, brouillon, campagne ou plan par rapport à celui-ci — ON GOAL, PARTIAL, ou OFF — en renvoyant toujours la correction ou une version plus percutante qui tire davantage vers la métrique, et en nommant les motifs de dérive à travers l'historique des verdicts. Se déclenche sur « /digital-marketing-pro:goal-filter », « is this on goal », « verrouille l'objectif pour ce trimestre », « est-ce que ça sert l'objectif », « garde-moi concentré », « quelle est notre priorité ». Stocke le verrouillage dans l'espace de travail de la marque (goal-lock.json) afin que chaque session lise le même objectif ; à l'intérieur d'un engagement en 12 parties, propose de verrouiller l'objectif principal de la Partie 1 plutôt que d'en inventer un parallèle."
argument-hint: "[brand-name] [--set \"goal, metric, deadline\"] [--check <idea/draft/plan>] [--status]"
user-invocable: true
---

# /digital-marketing-pro:goal-filter

Le filtre stratégique. Un seul objectif est verrouillé par marque, et tout est mesuré
par rapport à lui avant que du temps ou du budget ne soit engagé. Le marketing échoue
silencieusement en produisant du bon travail au service de rien de précis — chaque
élément défendable, le chiffre du trimestre manqué quand même.

## État

L'objectif verrouillé vit dans l'espace de travail de la marque, afin que chaque session
lise le même :

```
~/.claude-marketing/brands/{brand-slug}/goal-lock.json
```

```json
{
  "goal": "40 qualified demo bookings per month from organic + email",
  "metric": "demo bookings attributed to owned channels",
  "target": 40,
  "deadline": "2026-12-31",
  "locked_at": "2026-08-12",
  "history": [
    {"checked": "2026-08-14", "item": "podcast idea", "verdict": "OFF"}
  ]
}
```

Aucun fichier → c'est la première exécution : demander l'objectif, le forcer en une seule
phrase avec une métrique et une échéance, confirmer, écrire le fichier. Si l'utilisateur
nomme trois objectifs, le faire les classer — le filtre est inutile avec plus d'un objectif.

## Juger un élément

Lire l'objectif verrouillé, lire ce que l'utilisateur apporte, et trancher honnêtement :

```
# Goal check — {the locked goal}

## What you brought
[One line]

## Verdict: ON GOAL / PARTIAL / OFF GOAL

## Why (2-3 sentences)
[Does this move the goal's metric? How directly? What is the opportunity cost —
what on-goal work does this displace?]

## The fix (if PARTIAL or OFF)
[The specific change that would make it serve the goal — or "park it", with
what to do instead]

## The sharper version (always)
[The same idea, rewritten to pull harder toward the metric]
```

Ajouter le verdict à `history` dans le fichier d'état.

## Règles critiques

- **UN SEUL objectif à la fois.** Plusieurs objectifs sont un débat de priorités que
  l'utilisateur n'a pas encore eu. Forcer le classement avant de verrouiller quoi que ce soit.
- **Trancher honnêtement.** OFF GOAL est un verdict légitime, et le filtre ne vaut rien
  s'il approuve tout systématiquement. Une agence qui ne dit jamais « ceci ne sert pas
  votre objectif » est un prestataire, pas un partenaire.
- **Ne jamais se contenter de juger — toujours renvoyer une action.** La correction ou la
  version plus percutante, à chaque fois. L'utilisateur repart avec quelque chose à faire,
  pas seulement une note.
- **Nommer les motifs récurrents dans les vérifications.** L'historique existe pour être
  lu : trois verdicts OFF en une semaine ne sont pas trois idées isolées, c'est une
  dérive — le dire, et demander ce qui détourne l'attention de l'objectif. C'est le
  deuxième rôle du filtre : les verdicts individuels protègent le trimestre, le motif
  protège la stratégie.
- **Les objectifs sont des résultats marketing** — chiffre d'affaires, leads qualifiés,
  qualité d'audience, autorité sur une niche, rétention. « Plus d'abonnés » n'est accepté
  qu'avec une clause de justification qui survit à un tour de « et qu'est-ce que ça
  apporte ? ».
- **Changer l'objectif est autorisé, dériver silencieusement ne l'est pas.** `--set` sur
  un verrouillage existant archive l'ancien objectif dans l'historique avec sa date de
  fin, afin que le registre du trimestre montre un changement délibéré plutôt qu'un flou.
- **Intégration à l'engagement :** à l'intérieur d'un engagement en 12 parties, les
  objectifs de l'engagement sont la source de l'objectif — proposer de verrouiller
  l'objectif principal de la Partie 1 plutôt que d'en inventer un parallèle.

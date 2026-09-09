---
name: serp-tracker
description: "Compétence de redirection dépréciée — le suivi des fonctionnalités SERP a été fusionné dans rank-monitor, et cette compétence se contente d'expliquer ce changement et de vous rediriger vers l'exécution de /digital-marketing-pro:rank-monitor --features (AI Overviews, Featured Snippets, People Also Ask, Knowledge Panels, Local Pack, et plus, ainsi que la propriété des fonctionnalités face aux concurrents). Se déclenche sur \"/digital-marketing-pro:serp-tracker\", \"track SERP features\", \"are we showing in AI Overviews\", \"who owns the featured snippet\", \"monitor the local pack\". N'effectue aucun suivi elle-même ; se combine avec /digital-marketing-pro:rank-monitor pour les positions et fonctionnalités, /digital-marketing-pro:geo-monitor et /digital-marketing-pro:aeo-audit pour la visibilité IA notée, et /digital-marketing-pro:gsc-ai-performance pour les impressions IA réelles."
---

# /digital-marketing-pro:serp-tracker (déprécié → rank-monitor)

**Cette compétence a été fusionnée dans `/digital-marketing-pro:rank-monitor`.** Le suivi des fonctionnalités SERP est désormais le mode `--features` de cette compétence unique, de sorte que les positions de classement et les fonctionnalités SERP sont capturées en une seule exécution sur une seule configuration.

## Que faut-il exécuter à la place

```
/digital-marketing-pro:rank-monitor --features
```

Ce mode suit les mêmes fonctionnalités que celles suivies auparavant par cette compétence — AI Overviews, Featured Snippets, People Also Ask, Knowledge Panels, Local Pack, Image Pack, Video Carousel, Shopping, Sitelinks — ainsi que la propriété des fonctionnalités face aux concurrents, et la matrice requête par fonctionnalité.

## Notes sur ce qui a changé

- **Une seule compétence, une seule configuration.** Plus besoin de maintenir une liste de mots-clés distincte pour les fonctionnalités SERP — `rank-monitor` lit le même ensemble de mots-clés à la fois pour les positions et les fonctionnalités.
- **Le suivi des AI Overviews est un signal binaire de présence** (un AI Overview est-il apparu, la marque est-elle citée). Ce n'est **pas** un score de visibilité IA. Pour une visibilité IA notée sur les 6 surfaces canoniques, utilisez `/digital-marketing-pro:geo-monitor` / `/digital-marketing-pro:aeo-audit` ; pour les impressions IA réelles, utilisez `/digital-marketing-pro:gsc-ai-performance`.
- **GSC n'exporte pas la disposition des fonctionnalités SERP par requête ni les listes de citations en AI Overview** — la présence des fonctionnalités provient d'un MCP de suivi de positionnement connecté ou d'une observation manuelle. (Une version antérieure de cette compétence surestimait la couverture de GSC sur ce point.)

Voir `/digital-marketing-pro:rank-monitor` pour la méthodologie complète, les notes sur les sources de données, et le format de sortie.

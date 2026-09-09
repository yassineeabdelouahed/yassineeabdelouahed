# Le modèle à deux vues

Après la partie 5 (validation client), chaque engagement porte deux vues du monde. Les deux restent faisant autorité pour des questions différentes. Aucune n'est supprimée.

## Pourquoi deux vues

L'étude de marché non biaisée des parties 2 à 4 produit une vue de la marque indépendante de ce que le client pense de lui-même. La validation client de la partie 5 superpose ensuite la connaissance client, les priorités client, et les contraintes client — ce qui corrige souvent la vue non biaisée à certains endroits et la sur-corrige à d'autres.

Conserver les deux vues disponibles permet à l'engagement de :

1. Exécuter les opérations sur ce que l'entreprise a choisi (v2)
2. Éprouver les hypothèses lorsque quelque chose ne fonctionne pas (comparer v1 vs v2)
3. Générer de l'idéation à partir du territoire que v2 a déprioritisé mais que v1 a identifié (v1 est une mine d'or pour des angles nouveaux)
4. Avoir des conversations client honnêtes sur les raisons de la sous-performance (citer les deux vues)

Si seule la v2 existait, l'engagement hériterait silencieusement de chaque biais client comme s'il s'agissait de la vérité terrain. Maintenir la v1 garde la stratégie marketing intellectuellement honnête.

## Ce que contient chaque vue

### v1 — La vue de marché non biaisée

Produite dans les parties 2 à 4, avant que tout document client ne soit consulté.

- Les quatre documents centraux (3.1 Business et SBU, 3.2 Segmentation, 3.3 Positionnement de marque, 3.4 DMFlow)
- Les quatre documents de la partie 4 (4.1 Analyse publicitaire concurrentielle, 4.2 Positionnement concurrentiel, 4.3 Analyse client, 4.4 Analyse de marché)
- Les résultats de recherche externe de la partie 2 (analyse sectorielle, signaux de demande client, balayage de l'écosystème)

Stockée à : `engagements/{engagement-id}/part-03-four-core-documents/v1/` et `engagements/{engagement-id}/part-04-competitive-customer-market/v1/`

### v2 — La vue validée par le client

Produite sélectivement dans la partie 6 en fonction de ce qui a changé dans la partie 5.

Seuls les documents signalés pour relance par la matrice de décision reçoivent une v2. Les documents non relancés héritent de la v1 comme version canonique (aucun fichier v2 n'existe).

Stockée à : `engagements/{engagement-id}/part-03-four-core-documents/v2/` et `engagements/{engagement-id}/part-04-competitive-customer-market/v2/`

## Règle de décision : quelle vue consulter

Les compétences, agents, et conversations devraient sélectionner la vue selon le type de décision :

| Type de décision | Vue principale | Utiliser les deux ? |
|---|---|---|
| Décisions opérationnelles (exécution de canal, direction du texte publicitaire, plan de contenu, allocation budgétaire par campagne) | v2 | Non — v2 uniquement |
| Éprouver les hypothèses ou conversations de pivot (une campagne ne fonctionne pas ; un segment ne convertit pas comme attendu) | Les deux | Oui — comparer pour identifier si v2 a sur-corrigé |
| Idéation et suggestions (nouveaux concepts de campagne, segments non testés, angles de positionnement alternatifs) | Les deux | Oui — v1 contient souvent le territoire le plus créatif |
| Conversations client sur la sous-performance | Les deux | Oui — articuler ce que le marché non biaisé a dit, ce que le client a choisi, ce que les données suggèrent désormais |
| Décisions de réponse concurrentielle | Les deux | Oui — v1 contient le positionnement concurrentiel non filtré ; v2 contient la façon dont le client veut se positionner face à eux |
| Actualisation stratégique trimestrielle | Les deux | Oui — réévaluer la transition v1→v2 avec 3 mois de données |

## Comment les compétences déclarent la vue dont elles ont besoin

Les compétences ajoutent un champ `view-preference` dans le frontmatter :

```yaml
---
name: skill-name
view-preference: v2-primary   # ou "v1-primary", "both", "v1-only", "v2-only"
---
```

Lorsqu'une compétence charge le contexte d'engagement :

- `v2-primary` : Charger les documents v2 ; se replier sur la v1 uniquement si un document précis n'a pas de v2 (c'est-à-dire n'a pas été relancé)
- `v1-primary` : Toujours charger les documents v1
- `both` : Charger les versions v1 et v2 de chaque document ; le contenu de la compétence les compare
- `v1-only` : Charger uniquement la v1 (utilisé par les compétences d'idéation)
- `v2-only` : Charger uniquement la v2 (utilisé par les compétences d'exécution)

## L'« écart entre les vues » comme information stratégique

Lorsque v1 et v2 divergent significativement sur un élément précis (par exemple, la recherche non biaisée a identifié le segment X comme le plus prioritaire, mais le client l'a relégué en tertiaire), cet écart lui-même est une information stratégique.

Raisons pour lesquelles l'écart existe :

1. **Le client dispose d'informations privées inaccessibles à la recherche non biaisée** (par exemple, des contraintes d'approvisionnement rendant un segment à fort volume impossible à servir)
2. **Le client a surpondéré des préférences internes** (par exemple, le segment de prédilection du fondateur que les données ne soutiennent pas)
3. **Le client a sous-pondéré le risque concurrentiel** (par exemple, a écarté un segment parce que l'offre actuelle « n'est pas encore prête »)
4. **Les deux vues ont partiellement raison** (par exemple, le client sait que le segment est difficile, mais la recherche non biaisée identifie l'opportunité à long terme)

Lors de l'épreuve des hypothèses ou de la génération d'idées, la conversation sur l'écart se déroule ainsi :

> « v1 a identifié [X] comme [caractérisation]. v2 l'a déprioritisé parce que [raison client]. Les données de la [période] passée suggèrent [observation]. Devrions-nous revoir cela ? »

C'est l'usage le plus stratégiquement précieux du modèle à deux vues.

## Opérations sur les fichiers

Lorsque les documents v1 changent après la partie 5 (par exemple, corrections mineures v1.1 selon la matrice de décision), le fichier est renommé `3.1-business-and-sbu-analysis.v1.1.md` (et ainsi de suite). Le journal des modifications au sein du document consigne ce qui a changé et pourquoi.

Lorsqu'une relance v2 produit un nouveau document, il va dans `v2/` avec le même schéma de nommage de fichier. Le document v2 inclut une section d'en-tête : « changements v1 → v2 » listant ce qui a été modifié par rapport à la version v1, avec justification.

## Références liées

- [decision-matrix-rerun.md](decision-matrix-rerun.md) — la matrice qui détermine quels documents reçoivent une v2
- [update-back-rule.md](update-back-rule.md) — protocole de versionnage pour les corrections en cours de vie
- [living-instruction-file-spec.md](living-instruction-file-spec.md) — où se trouve l'état « actuellement vrai » de l'équipe
</content>

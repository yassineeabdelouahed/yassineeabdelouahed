# Matrice de décision pour les relances v2

Après la partie 5 (validation client), la matrice de décision détermine précisément quels documents des parties 3 et 4 doivent être relancés en versions v2. La matrice évite la relance excessive (qui gaspille du calcul) et la relance insuffisante (qui laisse des hypothèses obsolètes dans la couche v2).

## Comment cela fonctionne

Dans la partie 5, le client examine le document de validation client et prend l'une de quatre décisions sur chaque constat :

- **ACCEPTER** — le constat est correct tel qu'énoncé
- **REJETER** — le constat est faux ; le client fournit une correction
- **MODIFIER** — le constat est partiellement correct ; le client fournit une version amendée
- **DIFFÉRER** — nécessite une investigation plus approfondie ; à signaler pour suivi

La matrice de décision déclenche ensuite des relances v2 selon les catégories de constats rejetés ou modifiés.

## La matrice

| Catégorie de changement en partie 5 | Documents v2 à relancer |
|---|---|
| **Concurrents modifiés** (nouveaux concurrents ajoutés, concurrents retirés, classements de niveau concurrentiel modifiés) | Les quatre documents centraux (3.1, 3.2, 3.3, 3.4) ET le 4.1 Analyse publicitaire concurrentielle ET le 4.2 Positionnement concurrentiel |
| **Données de marché cible modifiées** (géographie, dimensionnement du marché, segments adressables) | 4.3 Analyse client ET 4.4 Analyse de marché |
| **Audiences modifiées** (priorités de groupes cibles réorganisées, nouveau persona ajouté, attributs de persona corrigés) | Document central 3.2 (segmentation) + document central 3.3 (positionnement de marque) + document central 3.4 (DMFlow) |
| **Positionnement modifié** (déclaration de positionnement amendée, piliers de message révisés) | Document central 3.3 (positionnement de marque) uniquement |
| **Budget / périmètre modifié** (enveloppe budgétaire modifiée, périmètre de canal modifié) | Document central 3.4 (DMFlow) uniquement |
| **Tarification ou offre modifiée** (modèle de tarification amendé, périmètre de l'offre corrigé) | Document central 3.1 (analyse business et SBU) — section 4 (unité économique) et section 7 (architecture tarifaire) |
| **Unité économique modifiée** (fourchette de CAC corrigée, fourchette de LTV corrigée, marge corrigée) | Document central 3.1 — section 4 uniquement (ne pas relancer le document complet sauf si d'autres changements le justifient) |
| **Corrections mineures uniquement** (fautes de frappe, corrections factuelles, mises à jour de source qui ne changent pas la conclusion) | AUCUNE relance complète. Mettre à jour en ligne dans v1, taguer le fichier comme v1.1, consigner le changement dans le journal des modifications du document |

## Détection du déclencheur

La commande `/digital-marketing-pro:engagement re-run-decision` :

1. Lit les réponses du document de validation client
2. Catégorise chaque constat REJETÉ ou MODIFIÉ par type (concurrent / marché / audience / positionnement / budget / tarification / unité économique / mineur)
3. Calcule l'union des relances déclenchées
4. Produit le plan de relance : quels documents nécessitent une v2, lesquels peuvent rester en v1
5. Renvoie le coût de calcul estimé (estimation approximative de tokens pour chaque relance)
6. Attend l'approbation de l'utilisateur avant d'exécuter

## Règles

1. **Ne jamais exécuter automatiquement les relances sans montrer le plan.** L'utilisateur voit et approuve toujours ce qui sera exécuté.
2. **Les relances produisent toujours un en-tête « changements v1 → v2 »** dans le nouveau document, listant ce qui a été modifié et pourquoi.
3. **Si une relance produit une v2 structurellement identique à la v1**, ne pas enregistrer une v2 redondante — noter cela dans le journal des modifications à la place.
4. **Les relances respectent la discipline de preuve du document original** — chaque changement en v2 doit citer une source (la validation client, dans ce cas, avec l'identifiant de constat précis).
5. **Les relances ne suppriment jamais la v1.** Toujours deux vues.

## Quand la matrice dit « pas de relance » mais que l'utilisateur en veut une

La matrice est une ligne directrice, pas une règle absolue. L'utilisateur peut passer outre :

```
/digital-marketing-pro:engagement re-run-decision --override "rerun 3.3"
```

Cela force une relance même si la matrice ne l'a pas déclenchée. Utile lorsque l'utilisateur dispose d'un contexte externe justifiant une actualisation (par exemple, un événement sectoriel majeur survenu depuis la production de la v1).

## Quand la matrice déclenche des relances mais que l'utilisateur veut les ignorer

```
/digital-marketing-pro:engagement re-run-decision --skip "rerun 4.4"
```

Cela ignore une relance déclenchée. Utile lorsque l'information modifiée est mineure et que l'utilisateur juge que la v1 est encore suffisamment bonne. La relance ignorée est journalisée afin que de futurs audits puissent comprendre pourquoi la v1 n'a pas été actualisée.

## Piste d'audit

Chaque décision de relance (déclenchée automatiquement, forcée, ignorée) est journalisée dans `_engagement.json` sous le tableau `rerun_decisions` :

```json
{
  "rerun_decisions": [
    {
      "timestamp": "2026-05-03T12:00:00Z",
      "trigger": "competitors changed",
      "triggered_reruns": ["3.1", "3.2", "3.3", "3.4", "4.1", "4.2"],
      "user_decision": "approved",
      "executed_reruns": ["3.1", "3.2", "3.3", "3.4", "4.1", "4.2"],
      "skipped_reruns": [],
      "notes": "client added 2 new competitors and removed 1"
    }
  ]
}
```

Cette piste d'audit permet aux futures revues d'engagement de comprendre ce qui a été relancé, quand, et pourquoi.

## Références liées

- [two-views-model.md](two-views-model.md) — l'architecture v1/v2
- [engagement-flow-methodology.md](engagement-flow-methodology.md) — le contexte du flux en 12 parties
- [update-back-rule.md](update-back-rule.md) — ce qui se passe pour les corrections APRÈS la partie 7
</content>

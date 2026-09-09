# La règle de mise à jour rétroactive (Update-Back)

Après le début de la partie 7, l'engagement opère sur la v2. Mais des corrections continuent de surgir pendant l'exécution — une définition de groupe cible s'avère erronée sur le terrain, un concurrent est mal classifié, une revendication de positionnement ne résiste pas à l'examen, une hypothèse budgétaire s'avère irréaliste.

Lorsque cela arrive, la correction est apportée dans le **document source**, pas seulement dans le livrable qui a détecté l'erreur.

## Pourquoi cela compte

Sans la règle de mise à jour rétroactive, les corrections s'accumulent en des endroits dispersés :

- Une note dans un rapport de campagne dit « en réalité notre CAC pour le segment X est 40 % plus élevé que ce que la v2 estimait »
- Un brief créatif est amendé pour retirer une revendication de positionnement qui n'a pas fonctionné
- Un acheteur média ajuste le mix de canaux parce que LinkedIn ne livre pas

Si ces corrections ne remontent jamais aux documents source (documents centraux 3.1, 3.3, 3.4), la prochaine campagne, le prochain brief créatif, le prochain plan média partent tous d'hypothèses obsolètes. La stratégie dérive silencieusement.

La règle de mise à jour rétroactive maintient les documents source comme une vérité vivante plutôt que des artefacts figés à la partie 5.

## Le processus

Lorsqu'une correction est identifiée pendant l'exécution (à partir de la partie 9) :

### Étape 1 : Capturer la correction

Enregistrer ce qui a été découvert, où cela a été découvert, et quelle preuve le soutient :

```
Découverte : le CAC réel du segment X est de 4 800 INR, pas les 3 000 INR estimés en v2
Source : performance mixte Google Ads + Meta Ads du T2, fenêtre de 60 jours
Preuve : instantané de tableau de bord joint, données de performance dans part-09-channel-strategy/9.3-google-ads/performance-q2.json
Matériel ? Oui — change le ratio LTV:CAC du segment X de 4,0 à 2,5 (sous le seuil de santé)
```

### Étape 2 : Valider la correction

Une correction n'est pas encore un fait — elle doit être validée :

- Les données sous-jacentes sont-elles propres ? (Le suivi fonctionne-t-il correctement ? Le modèle d'attribution est-il approprié ?)
- La fenêtre temporelle est-elle suffisante ? (60+ jours pour le payant, 90+ pour le SEO/contenu)
- La taille d'échantillon est-elle statistiquement significative ?
- Existe-t-il une explication alternative ? (Saisonnalité, fatigue publicitaire, pression concurrentielle, problème de landing page)
- Le responsable senior de projet / responsable stratégie a-t-il examiné ?

Si validé → passer à l'étape 3. Si non validé → enregistrer comme « correction candidate » en attente de plus de données.

### Étape 3 : Mettre à jour le document source comme une nouvelle version

Faire monter la version du document. Exemples :

- `3.1-business-and-sbu-analysis.v2.md` → `3.1-business-and-sbu-analysis.v2.1.md`
- La version précédente (`v2.md`) est préservée (renommée `v2.0.md` par clarté si ce n'était pas déjà le cas)

Le frontmatter de la nouvelle version inclut :

```yaml
---
document: 3.1-business-and-sbu-analysis
version: 2.1
previous-version: 2.0
updated: 2026-05-03
update-reason: Segment X CAC correction
update-source: Q2 channel performance data
---
```

Le changement est apporté dans la section pertinente du document (dans cet exemple, étape 4 : unité économique). Le changement est **explicite** — ancienne valeur conservée dans un format barré ou une note de changement, nouvelle valeur ajoutée avec citation :

> CAC du segment X : ~~3 000 INR (estimé, v2.0)~~ → 4 800 INR (validé à partir de la performance payante du T2, fenêtre de 60 jours). Le ratio LTV:CAC chute de 4,0 à 2,5 — sous le seuil de santé de 3,0. Implication stratégique : revoir le mix de canaux du segment X ou revoir la tarification.

### Étape 4 : Enregistrer dans le journal des modifications du document

Chaque document porte une section de journal des modifications en bas :

```markdown
## Journal des modifications

### v2.1 — 2026-05-03
- **Section 4 (unité économique) :** CAC du segment X corrigé de 3 000 INR (estimé) à 4 800 INR (validé à partir des données de canal du T2). A déclenché une revue en aval du mix de canaux pour le segment X.
- **Validé par :** [nom ou rôle du responsable de projet]

### v2.0 — 2026-04-15
- v2 initiale produite à partir de la v1 + réponses de validation client.
- Changements v1 → v2 : positionnement rejeté, réécrit ; liste de concurrents élargie.

### v1.1 — 2026-04-08
- Mineur : citation de source corrigée pour l'estimation de taille de marché (sous-étape 1.4).

### v1.0 — 2026-04-01
- Version initiale de recherche non biaisée.
```

### Étape 5 : Journaliser la mise à jour dans le fichier d'instructions vivant du projet

Le fichier d'instructions vivant du projet (`living-instruction-file.md`) est le registre unique de « ce qui est actuellement vrai » pour l'engagement. Lorsqu'un document source est mis à jour, le LIF reçoit une entrée correspondante :

```markdown
## Actuellement vrai (au 2026-05-03)

### Segment X
- **CAC :** 4 800 INR (corrigé le 2026-05-03 — était de 3 000 INR en v2.0 ; voir [3.1 v2.1](../part-03-four-core-documents/v2/3.1-business-and-sbu-analysis.v2.1.md))
- **Ratio LTV:CAC :** 2,5 (sous le seuil de santé de 3,0 — en cours de revue)
- **Implication stratégique :** mix de canaux ou tarification en cours de revue (voir la file d'attente de revue de canal)
```

Toutes les compétences en aval lisent le LIF avant de produire un résultat. Ainsi, une compétence campaign-plan exécutée après la mise à jour verra le CAC corrigé et ajustera ses recommandations budgétaires en conséquence.

### Étape 6 : Déclencher une revue en aval

Certaines corrections ont des implications en aval qui nécessitent une revue explicite :

- Une correction de CAC peut invalider le plan budgétaire du document 3.4 → déclenche une revue DMFlow
- Une correction de positionnement peut invalider des briefs créatifs déjà en production → déclenche une revue créative
- Une correction d'attribut de persona peut invalider le ciblage d'audience → déclenche une revue d'audience de la partie 9

La commande `/digital-marketing-pro:engagement update-back` gère cela :

1. Capture la correction
2. Valide avec l'utilisateur
3. Met à jour le document source
4. Met à jour le fichier d'instructions vivant
5. Identifie les documents en aval qui pourraient nécessiter une revue
6. Ajoute des tâches de revue à l'état de l'engagement

## Ce qui ne déclenche PAS une mise à jour rétroactive

Toutes les observations ne méritent pas une mise à jour de document source :

- **La spéculation** — « je pense que le CAC augmente » sans données n'est pas une correction.
- **Les anomalies de point de données unique** — une mauvaise semaine de performance n'est pas un changement de CAC. Attendre 60+ jours.
- **Les préférences stylistiques** — un texte publicitaire que l'équipe pense pouvoir rendre plus percutant n'est pas un déclencheur de mise à jour rétroactive.
- **Les optimisations tactiques** — un ajustement d'enchère, un ajustement de rythme budgétaire, un rafraîchissement créatif — cela appartient aux journaux d'exécution, pas aux documents de stratégie.

La règle de mise à jour rétroactive est réservée aux **changements validés des hypothèses stratégiques** dans les documents source.

## Conventions de versionnage

| Schéma | Signification |
|---|---|
| `v1.0` | Version initiale de recherche non biaisée (parties 2-4) |
| `v1.1`, `v1.2` | Corrections mineures de la v1 avant validation client |
| `v2.0` | Version initiale validée par le client (après relance de la partie 6) |
| `v2.1`, `v2.2` | Corrections de mise à jour rétroactive à partir de la partie 7 |
| Pas de suffixe de version | Le document n'a jamais été relancé — la v1 est la version canonique |

## Piste d'audit

L'historique complet de versionnage (chaque v1.1, v2.1, v2.2, etc.) est préservé sous forme de fichiers séparés dans le répertoire du document. Rien n'est écrasé. Les auditeurs peuvent toujours reconstruire ce qui était vrai à tout moment.

## Références liées

- [two-views-model.md](two-views-model.md) — architecture v1/v2
- [decision-matrix-rerun.md](decision-matrix-rerun.md) — quand les relances v2 se produisent
- [living-instruction-file-spec.md](living-instruction-file-spec.md) — schéma du LIF
- [engagement-flow-methodology.md](engagement-flow-methodology.md) — le flux en 12 parties
</content>

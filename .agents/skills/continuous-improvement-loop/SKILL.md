---
name: continuous-improvement-loop
description: "Exécute la partie 12 de la méthodologie d'engagement — la boucle d'amélioration continue qui agrège les signaux de revue trimestrielle, de retours clients, de veille concurrentielle et d'exploitation en un Brief trimestriel d'amélioration produit et offre destiné à la direction de l'entreprise, ainsi que des briefs ponctuels rapides de 1 à 3 pages lorsqu'un signal significatif survient en cours de trimestre. Se déclenche sur « /digital-marketing-pro:continuous-improvement-loop », « run part 12 », « produce the quarterly improvement brief », « aggregate this quarter's signals », « we need a fast read on this competitor move ». Signale les déclencheurs de mise à jour v2.x mais ne les exécute jamais automatiquement. Lit les rapports mensuels, signals.jsonl, les sorties de /digital-marketing-pro:competitor-monitor et le fichier d'instructions vivant du projet."
user-invocable: true
triggers:
  - run the continuous improvement loop
  - run part 12
  - aggregate market and operating signals
  - feed back into product offering decisions
  - quarterly business review feed-back
  - product offering improvement recommendations
allowed-tools: Read Write Edit Bash Glob Grep
engagement-part: "12"
view-preference: both
---

# /digital-marketing-pro:continuous-improvement-loop — Partie 12 : Boucle continue

La partie 12 est la boucle d'amélioration continue qui s'exécute en parallèle des opérations en cours à partir de la mise en production. Elle agrège les signaux de marché et les signaux d'exploitation en recommandations qui nourrissent en retour les décisions de produit, d'offre et de service de la marque.

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** pour tout fichier référencé, puis `Read` uniquement les plages correspondantes avec `offset` + `limit`. Lister l'espace de travail de la marque à `~/.claude-marketing/brands/{slug}/` (ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` lorsque cette variable d'environnement est définie) avant d'ouvrir des fichiers. En cas de réinvocation en cours de session, ignorer les fichiers déjà en contexte.

Ce n'est **pas une activité ponctuelle**. Elle s'exécute en permanence une fois la partie 11 terminée, avec un livrable formel à chaque revue trimestrielle d'activité (QBR) et un livrable ponctuel lorsque des signaux significatifs le justifient.

## Pourquoi cela existe

Sans boucle de rétroaction explicite, le marketing fonctionne sur des hypothèses établies des mois auparavant. Les marchés évoluent, les clients changent, les concurrents bougent, les produits sont affinés — mais si ces évolutions ne remontent pas dans la stratégie, l'engagement s'enlise silencieusement.

La partie 12 referme la boucle :

- Signaux de marché → actualisation de la stratégie
- Signaux d'exploitation → optimisation tactique
- Signaux produit / offre → recommandations aux équipes produit / business

## Les 4 sources de signaux

### Source 1 : Revues trimestrielles d'activité

Chaque revue trimestrielle (selon [reporting-cadence.md](../context-engine/reporting-cadence.md)) génère des signaux structurés :

- KPI vs objectifs (quels objectifs ont été manqués ; lesquels ont été dépassés ; y a-t-il un schéma sur plusieurs trimestres ?)
- Performance du mix de canaux (un canal surperforme-t-il ou sous-performe-t-il systématiquement par rapport au plan v2 ?)
- Performance des segments d'audience (un segment se comporte-t-il différemment de ce que prédisaient les personas ?)
- Évolutions concurrentielles (des mouvements de concurrents modifient-ils significativement le paysage ?)
- Audit d'alignement stratégique (ce que nous exécutons correspond-il toujours à ce que la stratégie v2 préconise ?)

### Source 2 : Thèmes des retours clients

Retours provenant de l'ensemble des points de contact clients :

- Tickets du service client (volume par sujet, tendance de sentiment)
- ORM (gestion de la réputation en ligne) — sites d'avis, mentions sociales
- Conversations de l'équipe commerciale (objections entendues à répétition, demandes non encore satisfaites)
- Observations de friction dans le parcours client (où les clients décrochent, où ils demandent de l'aide)
- Réponses aux enquêtes / au NPS
- Entretiens clients

### Source 3 : Veille concurrentielle

Issue de la surveillance concurrentielle continue (compétence existante `/digital-marketing-pro:competitor-monitor`) :

- Évolutions de produit / d'offre chez les concurrents
- Changements de prix
- Repositionnements (message, audience cible)
- Apparition de nouveaux entrants
- Acquisitions / partenariats modifiant le paysage concurrentiel

### Source 4 : Schémas découverts par l'équipe

Éclairages issus de l'exécution que l'équipe fait remonter :

- Campagnes qui sous-performent systématiquement — peut indiquer une inadéquation produit-marché
- Audiences demandant des fonctionnalités que le produit n'offre pas encore
- Points de friction de conversion qui reviennent dans de nombreuses campagnes
- Schémas de performance par canal suggérant une évolution du parcours acheteur

## Cadence

La partie 12 est active en continu, avec des livrables structurés :

| Cadence | Déclencheur | Résultat |
|---------|---------|--------|
| **Quotidienne / hebdomadaire** | Capture automatisée des signaux dans le cadre des opérations normales | Signaux consignés dans `part-12-continuous-improvement/signals.jsonl` |
| **Mensuelle** | Rapport de performance mensuel | Section « Signaux du mois » dans le rapport ; consignée dans signals.jsonl |
| **Trimestrielle** | QBR | Livrable structuré de la partie 12 — voir ci-dessous |
| **Ponctuelle** | Signal significatif (par exemple, évolution produit d'un concurrent, objection récurrente signalée par l'équipe commerciale, chute soudaine d'un KPI) | Brief ponctuel de la partie 12 produit sous 1 semaine |

## Le livrable trimestriel de la partie 12

Chaque trimestre, la boucle continue produit un livrable structuré destiné aux dirigeants de l'entreprise de la marque — pas uniquement à la direction marketing.

### Structure

```markdown
---
document: part-12-quarterly-improvement-brief
engagement: {engagement-id}
quarter: {YYYY-Qn}
produced: {iso-timestamp}
audience: brand business leadership
---

# Brief trimestriel d'amélioration produit et offre — {Trimestre}

## Résumé exécutif

(3-5 phrases. Les signaux les plus importants. Les recommandations qui en découlent.)

## Agrégation des signaux

### Signaux de marché
{Évolutions macro du marché observées au cours du trimestre}

### Signaux clients
{Thèmes agrégés issus des retours clients, de l'ORM, des conversations commerciales}

### Signaux concurrentiels
{Mouvements de concurrents justifiant une réponse ou une réflexion}

### Signaux d'exploitation
{Schémas issus de l'exécution — campagnes sur/sous-performantes ; surprises d'audience ; évolutions de canaux}

## Implications

### Pour la stratégie de marque
{Qu'est-ce qui, dans la stratégie v2, semble confirmé par le trimestre ? Qu'est-ce qui semble affaibli ? Y a-t-il matière à une mise à jour v2.x ?}

### Pour le mix de canaux
{Une rééquilibration de canaux est-elle recommandée ?}

### Pour le produit / l'offre
{C'est la contribution propre à la partie 12. Quels signaux suggèrent que le produit ou l'offre lui-même devrait changer ?}

## Recommandations

### À l'équipe marketing
{Ajustements tactiques — généralement déjà en cours depuis l'optimisation mensuelle, mais formalisés ici}

### À l'équipe produit / business
{Le livrable substantiel de la partie 12 — recommandations sur le produit, l'offre, le prix, la distribution, issues du point de vue du marketing}

### À la direction
{Considérations stratégiques transversales}

## Déclencheurs de mise à jour v2.x

(Si l'un des signaux justifie une montée de version du document source selon [update-back-rule.md](../context-engine/update-back-rule.md), le lister ici. La mise à jour effective se fait via /digital-marketing-pro:engagement update-back.)

## Questions ouvertes soulevées ce trimestre

(Éléments que les données soulèvent mais auxquels on ne peut répondre sans investigation complémentaire.)
```

### Emplacement du résultat

```
engagements/{id}/part-12-continuous-improvement/quarterly-briefs/{YYYY-Qn}-quarterly-improvement-brief.md
```

Plus un export PDF pour diffusion à la direction.

## Le brief ponctuel de la partie 12

Lorsqu'un signal significatif survient entre deux QBR, la boucle produit un brief ponctuel :

- Un concurrent lance un produit qui menace significativement le positionnement de la marque
- Un changement réglementaire affecte le marché adressable
- Un KPI chute soudainement en dessous du plancher du scénario conservateur
- L'équipe commerciale signale une objection apparue dans 5 deals ou plus en 2 semaines
- Un contenu devient viral de manière inattendue, créant un moment unique

Les briefs ponctuels sont courts (1 à 3 pages), rapides (dans la semaine suivant le signal) et orientés action (recommandent une réponse précise).

Emplacement du résultat :
```
engagements/{id}/part-12-continuous-improvement/ad-hoc-briefs/{YYYY-MM-DD}-{slug}.md
```

## Processus de production

### Pour le livrable trimestriel de la partie 12

1. **Déclencheur :** le trimestre se termine ; la QBR est en préparation
2. **Lire les entrées :**
   - Tous les rapports de performance mensuels du trimestre
   - Signaux consignés dans `signals.jsonl` pour le trimestre
   - Résultats de la veille concurrentielle du trimestre
   - Agrégations de retours clients
   - Fichier d'instructions vivant du projet (vérité actuelle)
3. **Agréger les signaux** dans les quatre catégories
4. **Synthétiser les implications** pour la stratégie, les canaux et le produit/l'offre
5. **Rédiger les recommandations** pour le marketing, le produit/business, la direction
6. **Identifier les déclencheurs de mise à jour v2.x**, le cas échéant
7. **Enregistrer** dans `quarterly-briefs/`
8. **Mettre à jour le LIF** avec le verdict et les recommandations du trimestre
9. **Résumer :** « Brief trimestriel d'amélioration produit. {N} signaux agrégés. {N} recommandations. {N} déclencheurs de mise à jour identifiés — vérifier et exécuter /digital-marketing-pro:engagement update-back si approuvé. »

### Pour le brief ponctuel de la partie 12

1. **Déclencheur :** signal significatif observé (consigné avec horodatage + source)
2. **Confirmer l'importance** auprès du responsable de l'engagement avant de produire le brief (éviter les briefs ponctuels déclenchés par du bruit)
3. **Lire les entrées ciblées** pertinentes pour le signal spécifique
4. **Rédiger un brief de 1 à 3 pages** avec : signal, preuves, implications, réponse recommandée, échéance de décision
5. **Enregistrer** dans `ad-hoc-briefs/`
6. **Diffuser** selon la chaîne d'approbation de l'engagement — généralement la direction marketing et la ou les parties prenantes produit/business concernées

## Mécanisme de capture des signaux

Le plugin capture les signaux en continu via :

- **Extractions de performance quotidiennes** (si configurées) signalant les anomalies
- **Production des rapports mensuels** capturant les entrées « Éclairages et enseignements »
- **Le suivi concurrentiel** signalant les changements significatifs
- **La capture manuelle** — ajouter le signal à `signals.jsonl` et l'enregistrer dans le fichier d'instructions vivant du projet via `engagement-state.py lif-log-change` (il n'existe pas de sous-commande `engagement signal` ; consigner l'observation via `lif-log-change` afin qu'elle entre dans le registre de vérité actuelle de l'engagement)

Tous les signaux sont ajoutés à `signals.jsonl` :

```json
{"timestamp":"...","source":"customer_feedback","signal":"3 sales reps reported customers asking for X integration","severity":"medium"}
{"timestamp":"...","source":"competitor_monitor","signal":"Competitor Y launched freemium tier","severity":"high"}
{"timestamp":"...","source":"performance_anomaly","signal":"LinkedIn CPL dropped 35% week over week","severity":"high","investigate":true}
```

## Discipline qualité

1. **Les signaux sont étayés.** Pas de vague « l'équipe ressent que » — citer la source (quel commercial, quelle plateforme d'avis, quelle exécution de suivi, quel indicateur de performance).
2. **Les recommandations sont précises.** « Le marketing devrait optimiser » ne sert à rien. « Réduire de 20 % le budget de notoriété de marque sur LinkedIn, réaffecter au retargeting + cycle de vie e-mail » est exploitable.
3. **Les recommandations produit / offre sont formulées comme des suggestions, pas des exigences.** Le point de vue du marketing n'est qu'une des entrées des décisions produit.
4. **Les déclencheurs de mise à jour sont signalés mais jamais exécutés automatiquement.** La commande `/digital-marketing-pro:engagement update-back` est invoquée séparément après approbation explicite.
5. **Le public des briefs trimestriels est la direction, pas seulement le marketing.** Écrire pour ce public.

## Exemples

### Exemple 1 : Brief trimestriel de la partie 12

```
Utilisateur : Le T2 s'est terminé la semaine dernière. Produis le brief trimestriel d'amélioration.

Réponse de la compétence :
1. Grep d'abord sur les rapports mensuels du T2 (avril, mai, juin) pour les métriques nécessaires ; Read ciblé avec offset+limit sur les lignes correspondantes — ne pas faire de Read en bloc des trois rapports
2. Parcourir signals.jsonl ligne par ligne pour le T2 (87 signaux) — utiliser head/tail/grep, pas un Read complet
3. Grep sur les résultats du suivi concurrentiel (3 changements significatifs) ; Read ciblé sur les constats correspondants
4. Grep sur l'agrégation des retours clients (47 avis + 12 notes de commerciaux) pour les thèmes nécessaires ; Read ciblé sur les correspondances
5. Agréger dans les 4 catégories de signaux
6. Identifier les implications :
   - Stratégie : le positionnement v2 a tenu — confirmé par 12 témoignages clients reprenant le langage de positionnement
   - Canaux : LinkedIn a surperformé (CPL 30 % en dessous du scénario modéré) ; Meta a sous-performé (CPL 40 % au-dessus)
   - Produit : 8 signaux clients + 4 notes de commerciaux suggèrent une demande constante pour la fonctionnalité X
7. Recommandations :
   - Marketing : transférer 25 % du budget Meta vers LinkedIn le trimestre prochain
   - Produit : prioriser la fonctionnalité X pour la feuille de route du T3 (8 demandes clients nommées)
   - Direction : envisager une offre freemium (un concurrent s'est positionné ainsi ; 5 notes de commerciaux sur des prospects sensibles au prix)
8. Identifier les déclencheurs de mise à jour : le document central 3.4 (mix de canaux) nécessite une v2.1 pour refléter l'allocation plus élevée de LinkedIn
9. Enregistrer quarterly-briefs/2026-Q2-quarterly-improvement-brief.md (~8 pages)
10. Résumer : « Brief d'amélioration T2 produit. 1 déclencheur de mise à jour signalé. Exécuter /digital-marketing-pro:engagement update-back --doc 3.4 --reason 'Preuves T2 : LinkedIn a surperformé ; Meta a sous-performé ; rééquilibrage de canal recommandé' après approbation de la direction. »
```

### Exemple 2 : Brief ponctuel

```
Utilisateur : Trois clients ont basculé au cours des deux dernières semaines vers un concurrent qui vient de lancer une offre freemium. Nous avons besoin d'une lecture rapide de la situation.

Réponse de la compétence :
1. Confirmer l'importance auprès du responsable de l'engagement ✓
2. Lire les entrées : les 3 cas de churn, le suivi concurrentiel sur le lancement freemium du concurrent, les 90 derniers jours de données de churn pour vérifier un schéma
3. Rédiger le brief :
   - Signal : 3 pertes de clients vers le concurrent Y en 14 jours ; la vérification du schéma montre un taux de churn vers Y multiplié par 4 par rapport aux 90 jours précédents
   - Preuves : notes des entretiens de départ (2 cas sur 3 citent le prix) ; le concurrent Y a lancé son offre freemium le 15/04/2026
   - Implications : à court terme — offre défensive pour le segment à risque ; à long terme — une revue de la stratégie tarifaire est justifiée
   - Réponse recommandée : (1) marketing — offre défensive aux clients actuellement à risque sous 7 jours ; (2) produit/direction — évaluer une réponse freemium sous 30 jours
   - Échéance de décision : plan de réponse d'ici le 12/05/2026
4. Enregistrer ad-hoc-briefs/2026-05-05-competitor-y-freemium-response.md (2 pages)
5. Diffuser selon la chaîne d'approbation
```

## Compétences et agents liés

- `engagement-workflow` — orchestration de l'engagement
- Compétences et agents existants : `competitor-monitor`, `performance-monitor-agent`, `intelligence-curator`, `quality-assurance`

## Références liées

- [reporting-cadence.md](../context-engine/reporting-cadence.md) — contexte de cadence trimestrielle
- [update-back-rule.md](../context-engine/update-back-rule.md) — quand les signaux de la partie 12 justifient une mise à jour des documents source
- [engagement-flow-methodology.md](../context-engine/engagement-flow-methodology.md) — la partie 12 dans le flux en 12 parties
- [living-instruction-file-spec.md](../context-engine/living-instruction-file-spec.md) — où se trouve la vérité actuelle
</content>

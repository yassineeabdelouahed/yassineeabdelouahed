---
name: engagement-workflow
description: "Orchestrez un engagement marketing complet à travers la méthodologie en 12 parties — intake Stone vs Opinion, recherche externe, Four Core Documents, validation client, relances de la Decision Matrix v2, planification de croissance, déclinaison par canal, et la boucle d'amélioration continue — avec un état persisté et reprenable à chaque étape. Se déclenche sur « /digital-marketing-pro:engagement-workflow », « start a new engagement », « what part of the engagement are we on », « apply the decision matrix », « advance to the next part ». Lit et écrit l'état d'engagement uniquement via engagement-state.py, et route vers /digital-marketing-pro:four-core-documents, growth-plan, yearly-planner, et continuous-improvement-loop."
user-invocable: true
triggers:
  - start a new engagement
  - run the 12-part methodology
  - advance engagement to next part
  - show engagement status
  - apply the decision matrix
  - re-run v2 documents
  - mark engagement part complete
  - what part of the engagement are we on
allowed-tools: Read Write Edit Bash Glob Grep Task
engagement-part: orchestrator
view-preference: both
---

# /digital-marketing-pro:engagement-workflow — Orchestrateur d'engagement en 12 parties

Cette compétence orchestre l'engagement marketing complet selon la méthodologie séquentielle en 12 parties. Chaque engagement de marque traverse les mêmes 12 parties dans l'ordre, produisant un ensemble canonique de fichiers à chaque étape.

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement les plages correspondantes avec `offset` + `limit`. Lister l'espace de travail de la marque sous `~/.claude-marketing/brands/{slug}/` (ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` quand cette variable d'environnement est définie) avant d'ouvrir des fichiers. En cas de réinvocation en cours de session, ignorer les fichiers déjà en contexte.

Lire ces références avant de produire un résultat :
- [engagement-flow-methodology.md](../context-engine/engagement-flow-methodology.md) — le flux complet en 12 parties
- [two-views-model.md](../context-engine/two-views-model.md) — architecture v1 / v2
- [stone-vs-opinion.md](../context-engine/stone-vs-opinion.md) — marquage de confiance
- [decision-matrix-rerun.md](../context-engine/decision-matrix-rerun.md) — quand relancer quoi
- [update-back-rule.md](../context-engine/update-back-rule.md) — protocole de versioning
- [living-instruction-file-spec.md](../context-engine/living-instruction-file-spec.md) — schéma du LIF

## Mode de fonctionnement

Cette compétence est invoquée via la famille de commandes `/digital-marketing-pro:engagement`. La commande est un simple routeur — **cette compétence est la source de vérité unique** pour le cycle de vie de l'engagement, le protocole de point de contrôle, et le contrat de production par partie. Chaque sous-commande correspond à une action précise du cycle de vie. La compétence appelle `engagement-state.py` pour la persistance via :

```
python "${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py" <subcommand> ...
```

Vous ne devez jamais éditer `_engagement.json` à la main — toujours passer par `engagement-state.py`.

## Points de contrôle & reprise (source de vérité unique)

Chaque exécution longue d'engagement est reprenable. Le protocole de point de contrôle est : **initialiser une exécution → enregistrer chaque partie au fur et à mesure → finaliser → publier dans le dossier de sortie visible.** Cela permet à une exécution interrompue (épuisement du contexte, annulation utilisateur, mise en veille de la machine) de reprendre à partir de la prochaine partie non enregistrée plutôt que de repartir de la Partie 1.

**1. Au `start`, une fois la précondition de marque validée, ouvrir une exécution de point de contrôle et la lier à l'état d'engagement :**

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/checkpoint-manager.py" init \
    --brand "{brand_slug}" --workflow engagement --topic "{engagement_id}"

# Enregistrer le run_id retourné dans _engagement.json pour que la reprise puisse le retrouver :
python "${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py" set-checkpoint-run \
    --brand "{brand_slug}" --id "{engagement_id}" --run-id "{run_id}"
```

`set-checkpoint-run` stocke le run_id dans `_engagement.json`, rendant le lien de reprise réel (auparavant le run_id n'était jamais persisté).

**2. Une fois chaque partie terminée et sa porte qualité franchie, l'orchestrateur enregistre le résultat de cette partie :**

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/checkpoint-manager.py" save \
    --brand "{brand}" --run-id "{run_id}" \
    --step {part_number} --content-file "{path_to_that_part_deliverable}" --extension md
```

Passer le **chemin réel du livrable de cette partie** (par ex. la Partie 3 enregistre le chemin des Four Core Documents ; la Partie 8 enregistre le chemin du Growth Plan) — jamais un placeholder pour une partie différente.

**3. Avant d'enregistrer les livrables de la Partie 5 (Validation client) et de la Partie 8 (Growth Plan), exécuter la porte qualité complète :**

```bash
# Porte BLOQUANTE — les livrables de la Partie 5 et de la Partie 8 ne peuvent pas être enregistrés en point de contrôle tant que ceci ne réussit pas
/digital-marketing-pro:check "{path_to_deliverable}" --full --brand {brand}
```

Si `/digital-marketing-pro:check --full` retourne BLOCKED, corriger les problèmes CRITIQUES avant d'enregistrer la partie en point de contrôle.

**4. Après la dernière partie, publier tous les artefacts dans le dossier visible par l'utilisateur et finaliser :**

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/output-publisher.py" publish-run \
    --brand "{brand}" --run-id "{run_id}"

python "${CLAUDE_PLUGIN_ROOT}/scripts/checkpoint-manager.py" finalize \
    --brand "{brand}" --run-id "{run_id}" --status completed
```

Puis orienter l'utilisateur vers le dossier de sortie visible via `/digital-marketing-pro:output-folder {brand}`.

Pour reprendre une exécution interrompue, utiliser `/digital-marketing-pro:resume` — il recharge chaque partie enregistrée et continue à partir de la prochaine partie non enregistrée en point de contrôle.

## Validation d'état & plafonds de reprise

- **Valider les résultats d'une partie par rapport au manifeste** avant de la marquer comme terminée :
  ```bash
  python "${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py" validate-part \
      --brand "{brand}" --id "{id}" --part {N}
  ```
  Ceci compare les fichiers réels présents sur le disque au manifeste `PART_DEFINITIONS` et signale les livrables manquants. À utiliser dans `file-tree` et avant `next`.

- **Réparer un répertoire d'engagement partiellement initialisé** (plutôt que de planter sur un répertoire non vide) :
  ```bash
  python "${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py" init --repair \
      --brand "{brand}" --id "{id}"
  ```
  `--repair` complète l'arborescence de répertoires canonique et le fichier d'état sur un répertoire ne contenant qu'un état partiel.

- **Plafond de relance v2 :** un maximum de **2 cycles de relance v2 par partie** est autorisé sans dérogation explicite de l'utilisateur. Le nombre de cycles est stocké dans `_engagement.json`. Si une partie dépasserait 2 cycles, s'arrêter et demander à l'utilisateur d'approuver explicitement des relances supplémentaires (la dérogation est enregistrée dans l'état). Cela évite les boucles de relance illimitées.

## Sous-commandes

### `/digital-marketing-pro:engagement start <brand-slug> <engagement-id>`

**Objectif :** initialiser un nouvel engagement.

**Étapes :**

1. Valider que le profil de marque existe à `~/.claude-marketing/brands/{brand-slug}/profile.json`. Si non, indiquer à l'utilisateur d'exécuter d'abord `/digital-marketing-pro:brand-setup`.
2. Exécuter `python ${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py init --brand {brand-slug} --id {engagement-id}`.
3. Confirmer que l'arborescence de répertoires a été créée et rapporter la prochaine action requise (intake de la Partie 1).
4. Guider l'utilisateur à travers l'intake Stone vs Opinion de la Partie 1 en posant les questions un lot à la fois.

**Questions d'intake de la Partie 1 (poser dans cet ordre) :**

**Stone — ce que le client sait avec certitude :**

1. Bases de l'entreprise : année de fondation, effectif, localisation du siège, zones d'opération géographiques
2. Modèle économique : sources de revenu, niveaux de tarification, catégories de produit/service principales
3. Marketing actuel : canaux actuellement actifs, dépense marketing mensuelle, KPI mesurables actuels
4. Stack technique : CRM, fournisseur de service email, configuration analytics, comptes publicitaires
5. Échelle de la base client : nombre de clients, plus gros client nommé, valeur de commande moyenne si connue

Pour chaque fait Stone, capturer :
- Le fait lui-même
- La source (comment l'utilisateur le sait / quel document l'a confirmé)

Enregistrer chacun via :
```
python ${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py add-stone-fact --brand {slug} --id {id} --fact-json '{"category":"...","fact":"...","source":"..."}'
```

**Opinion — ce que le client croit :**

1. Positionnement de marque : comment le client décrit-il sa position sur le marché ?
2. Base client : qui pensent-ils que sont leurs clients ? Pourquoi achètent-ils ?
3. Concurrents : qui considèrent-ils comme leurs principaux concurrents ?
4. Opportunités de croissance : où pensent-ils que se trouve la plus grande opportunité ?
5. Ce qui fonctionne : quelle activité marketing le client croit-il fonctionner ?
6. Ce qui ne fonctionne pas : que croit le client ne pas fonctionner ?

Pour chaque Opinion, capturer :
- L'hypothèse
- Les preuves du client à son sujet (peut être une intuition, une anecdote, des données partielles)
- Question de recherche — que devrait vérifier ou réfuter la recherche non biaisée ?

Enregistrer chacune via :
```
python ${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py add-opinion --brand {slug} --id {id} --hypothesis-json '{"category":"...","hypothesis":"...","client_evidence":"...","research_question":"..."}'
```

**À l'issue de la Partie 1 :** marquer la Partie 1 comme terminée via `mark-part-completed --part 1`, conseiller à l'utilisateur de passer à la Partie 2 (Recherche externe).

### `/digital-marketing-pro:engagement next [brand] [id]`

**Objectif :** avancer à la partie suivante.

**Étapes :**

1. Lire le statut d'engagement via `engagement-state.py status`
2. Identifier la partie actuelle et la prochaine partie non encore terminée
3. Confirmer avec l'utilisateur que la partie actuelle est réellement terminée (ne jamais avancer automatiquement — demander)
4. Sur confirmation, marquer l'actuelle comme terminée, avancer le pointeur current_part
5. Informer l'utilisateur de ce que requiert la nouvelle partie

### `/digital-marketing-pro:engagement status [brand] [id]`

**Objectif :** afficher le statut de l'engagement.

**Étapes :**

1. Exécuter `engagement-state.py status` — obtenir l'état complet
2. Lire l'en-tête du Living Project Instruction File
3. Formater un résumé lisible par un humain :
   - Engagement : marque + id + date de début
   - Partie actuelle : nom de la partie + jours écoulés
   - Parties terminées : liste
   - Parties en attente : liste
   - Décisions de relance ouvertes : nombre
   - Dernière mise à jour du LIF : date
4. Si l'engagement a des éléments ouverts nécessitant une résolution, les lister

### `/digital-marketing-pro:engagement file-tree [brand] [id]`

**Objectif :** afficher l'arborescence de fichiers du répertoire d'engagement.

**Étapes :**

1. Exécuter `engagement-state.py file-tree`
2. Formater sous forme d'arbre indenté
3. Mettre en évidence les fichiers manquants par rapport à la structure canonique. Utiliser `engagement-state.py validate-part --part {N}` pour comparer les fichiers réels de chaque partie terminée au manifeste `PART_DEFINITIONS` (par ex. si la Partie 3 est marquée terminée mais que `3.1-business-and-sbu-analysis.md` est manquant, `validate-part` le signale de façon déterministe plutôt qu'à l'œil).

### `/digital-marketing-pro:engagement validate [brand] [id]`

**Objectif :** exécuter le flux de Validation client de la Partie 5.

**Précondition :** les Parties 2, 3, 4 doivent être terminées.

**Étapes :**

1. Vérifier les préconditions (Parties 2, 3, 4 terminées)
2. Invoquer la compétence `client-validation-document` — elle produit le livrable de la Partie 5 : un document structuré présentant chaque constat de la v1 avec des options ACCEPTER/REJETER/MODIFIER/DIFFÉRER
3. **Exécuter la porte qualité complète sur le livrable de la Partie 5 avant qu'il ne parte au client :** `/digital-marketing-pro:check "{part5_path}" --full --brand {brand}`. S'il retourne BLOCKED, corriger d'abord les problèmes CRITIQUES (cette porte est obligatoire avant les livrables de la Partie 5 et de la Partie 8).
4. Après que l'utilisateur a revu et fourni ses décisions, les analyser sous forme de liste de déclencheurs selon les catégories de la Decision Matrix
5. Exécuter `engagement-state.py decision-matrix --triggers "{comma-separated}"` pour calculer le plan de relance v2
6. Présenter le plan de relance à l'utilisateur
7. Marquer la Partie 5 comme terminée ; sur approbation du plan de relance par l'utilisateur, avancer à la Partie 6

### `/digital-marketing-pro:engagement re-run-decision [brand] [id]`

**Objectif :** appliquer la Decision Matrix pour calculer les relances v2.

**Étapes :**

1. Lire le Document de validation client de la Partie 5
2. Catégoriser les constats rejetés/modifiés en déclencheurs de la Decision Matrix
3. Afficher les déclencheurs et les relances calculées
4. Estimer le coût (nombre de tokens approximatif) de chaque relance
5. Attendre l'approbation de l'utilisateur — il peut accepter, modifier (ignorer certaines, en ajouter d'autres), ou rejeter
6. Enregistrer le plan exécuté via `engagement-state.py record-rerun-execution`

### `/digital-marketing-pro:engagement update-back [brand] [id] --doc <doc-id> --reason <reason>`

**Objectif :** appliquer la règle Update-Back pour incrémenter la version d'un document source après la Partie 7+.

**Précondition :** l'utilisateur a déjà rédigé le contenu du document corrigé.

**Étapes :**

1. Lire la version actuelle du document
2. Confirmer la correction avec l'utilisateur (étape de validation selon la règle Update-Back)
3. Incrémenter la version via `engagement-state.py bump-version --doc {id} --reason "{reason}"`
4. Enregistrer le nouveau fichier de version avec un en-tête notant les changements v(préc) → v(nouv)
5. Mettre à jour le Living Project Instruction File via `lif-log-change` — il ajoute désormais le changement à `living-instruction-file.md` et actualise la date d'en-tête, de sorte que le LIF reflète la correction immédiatement
6. Identifier les documents en aval pouvant nécessiter une revue et les ajouter à la file de revue de l'engagement

### `/digital-marketing-pro:engagement lif-show [brand] [id]`

**Objectif :** afficher le Living Project Instruction File.

**Étapes :** exécuter `engagement-state.py lif-show` et formater la sortie markdown pour la lisibilité.

### `/digital-marketing-pro:engagement list-engagements [brand]`

**Objectif :** lister tous les engagements (optionnellement filtrés par marque).

**Étapes :** exécuter `engagement-state.py list-engagements --brand {slug}` et formater sous forme de tableau.

### Raccourcis de production

La famille de commandes expose également quatre raccourcis de production qui routent directement vers les compétences productrices de partie (documentées dans *Cibles de production par partie* ci-dessous). Ils correspondent un à un à la surface de commande :

- `/digital-marketing-pro:engagement four-core <brand> <id> [--doc 3.X] [--view v2] [--combined]` — Partie 3, invoque la compétence `four-core-documents`
- `/digital-marketing-pro:engagement growth-plan <brand> <id>` — Partie 8, invoque la compétence `growth-plan`
- `/digital-marketing-pro:engagement yearly-planner <brand> <id>` — complément de la Partie 8, invoque la compétence `yearly-planner`
- `/digital-marketing-pro:engagement loop <brand> <id>` — Partie 12, invoque la compétence `continuous-improvement-loop`

## Cibles de production par partie

Chaque partie est produite par des agents et compétences réels et existants. Cet orchestrateur route vers les cibles ci-dessous — il n'existe **aucune** compétence enveloppe nommée `external-research` / `preparation-documents` / `channel-strategy-fanout` / `execution-artefacts` / `ai-creative-instructions` ; celles-ci n'ont jamais existé. Utiliser exactement les cibles nommées ici :

| Partie | Cible(s) réelle(s) |
|------|----------------|
| 1 | (cette compétence — l'intake est guidé directement ici) |
| 2 | agents `market-intelligence` + `competitive-intel` ; compétence `audience-intelligence` (invoquer comme une compétence) ; référence `compliance-rules.md` (charger comme contexte) |
| 3 | compétence `four-core-documents` (produit 3.1, 3.2, 3.3, 3.4) |
| 4 | commande `competitor-analysis` + compétences `audience-intelligence` + agent `market-intelligence` |
| 5 | compétence `client-validation-document` |
| 6 | les relances invoquent la compétence `four-core-documents` avec `--view v2` |
| 7 | compétences `content-engine` + `campaign-orchestrator` + `analytics-insights` |
| 8 | compétences `growth-plan` + `yearly-planner` |
| 9 | compétences par canal — `paid-advertising`, `aeo-geo`, `social-strategy`, `seo-plan`, `email-sequence` (une par famille de canal) |
| 10 | compétence `content-engine` (mode exécution / production) |
| 11 | compétences `content-engine` + `ad-creative` + `video-script` (briefs créatifs) ; le rendu des actifs se fait dans votre propre outillage créatif (équipe design, outils IA image/vidéo, ou une plateforme de design connectée), puis les actifs finalisés sont signés via `c2pa-metadata` |
| 12 | compétence `continuous-improvement-loop` |

## Dispatch parallèle

Plusieurs parties de l'engagement contiennent des **sous-tâches indépendantes** qui doivent être dispatchées **en parallèle via plusieurs appels d'outil `Task` dans un seul message** — pas séquentiellement. Dispatcher des sous-tâches indépendantes de façon concurrente est nettement plus rapide que de les exécuter les unes après les autres ; le temps réel varie selon la profondeur de l'engagement, le modèle, et les limites de débit. Garder les sous-agents concurrents à une poignée (environ 3 à 8) — au-delà, on se met en file d'attente contre les limites de débit de l'API et le gain diminue ; en dessous de 3, il n'y a rien à paralléliser.

**Note de coût :** l'usage total de tokens est globalement similaire (le même travail est effectué), mais les coûts d'entrée facturés par tour tendent légèrement à la hausse car chaque sous-agent parallèle recharge son propre contexte.

**Parties bénéficiant du dispatch parallèle :**

| Partie | Travail éligible au parallélisme | Comment dispatcher |
|---|---|---|
| **Partie 2 — Recherche externe** | Dimensionnement du marché, paysage concurrentiel, signaux clients, paysage réglementaire — aucun ne dépend des autres | Dispatcher l'agent `market-intelligence` et l'agent `competitive-intel` en appels `Task` parallèles ; invoquer `audience-intelligence` comme une compétence ; charger `compliance-rules.md` (un fichier de référence) comme contexte — pas comme un sous-agent |
| **Partie 4 — Concurrentiel + Client + Marché** | Les quatre documents (4.1, 4.2, 4.3, 4.4) sont indépendants — ils référencent uniquement la Partie 2 | Dispatcher les quatre en un seul message avec les quatre sous-agents respectifs |
| **Partie 9 — Déclinaison de la stratégie par canal** | Jusqu'à 17 documents de canal en 7 familles. Les familles 2 (Plateformes payantes), 3 (Organique & Influence), 4 (Marketplace & CRM), 5 (Contenu/ATL/BTL/RP) sont indépendantes une fois les familles 1 (Recherche & Campagne) et 6 (Web + Mesure) terminées | Séquence : F1 → (F2 ∥ F3 ∥ F4 ∥ F5 en parallèle) → F6 → F7. Le lot du milieu correspond à quatre appels `Task` parallèles en un seul message. |
| **Partie 10 — Artefacts d'exécution** | Texte publicitaire, texte de post, titres, CTA sur les canaux — indépendants par canal | Dispatcher un sous-agent par canal en parallèle |
| **Partie 11 — Instructions créatives IA** | Briefs d'actifs visuels — indépendants par actif | Dispatcher en parallèle par actif |

**Parties devant rester séquentielles** (dépendances de données strictes) :

- Partie 1 → Partie 2 (l'intake alimente le périmètre de la recherche)
- Partie 3 → Partie 4 (les Four Core Documents alimentent l'analyse concurrentielle/client/marché)
- Partie 5 → Partie 6 (la Validation client détermine quels documents nécessitent une relance v2)
- Partie 7 → Partie 8 (les documents de préparation alimentent le Growth Plan)
- Partie 8 → Partie 9 (le Growth Plan pilote la déclinaison par canal)

**Règles transversales :**

1. Ne jamais dispatcher des agents parallèles devant écrire simultanément dans le même fichier — découper par fichier de sortie.
2. Chaque sous-agent parallèle reçoit le slug de l'engagement et le chemin du LIF pour pouvoir lire le contexte partagé, mais n'écrit QUE dans son propre sous-répertoire numéroté par partie (01-… 12-…).
3. **Les sous-agents ne modifient jamais l'état de l'engagement.** Un sous-agent ne doit PAS appeler `lif-log-change`, `mark-part-completed`, `bump-version`, ni aucune autre écriture `engagement-state.py`, et ne doit PAS toucher à `_engagement.json` ou `living-instruction-file.md`. Ce sont des fichiers de lecture-modification-écriture non verrouillés ; des écrivains concurrents perdent des mises à jour. Chaque sous-agent ne renvoie ses résultats que sous forme de fichiers par partie. Une fois un lot parallèle terminé, **seul l'orchestrateur** applique les mutations d'état — un `lif-log-change` par lot, plus `mark-part-completed` / `bump-version` selon les besoins — puis relit le LIF avant l'étape suivante.
4. Si un lot parallèle échoue en cours de route, les résultats du sous-agent en échec ne sont PAS automatiquement annulés — ne redispatcher que ceux en échec ; les pairs ayant réussi restent valides.

Pour les commandes multidimensionnelles en dehors du flux en 12 parties (par ex. `/digital-marketing-pro:competitor-analysis`, `/digital-marketing-pro:seo-audit`, `/digital-marketing-pro:content-engine`), le même schéma s'applique — dispatcher les dimensions indépendantes en parallèle via plusieurs appels `Task` dans un seul message.

## Mener un engagement dans une seule conversation

Un modèle à grand contexte peut contenir une grande partie d'un engagement — intake, recherche externe, les Four Core Documents (61 étapes), analyse concurrentielle/client/marché, Validation client, relances v2 sélectives, documents de préparation, Growth Plan + Yearly Planner, déclinaison par canal, artefacts d'exécution, briefs créatifs, et la boucle d'amélioration continue — au sein d'une seule session de travail (un engagement complet produit typiquement 50 à 60 documents canoniques).

**Le schéma de point de contrôle + persistance reste la valeur par défaut — toujours.** Même quand tout tient dans une seule conversation :

- `engagement-state.py` + `checkpoint-manager.py` restent le système de référence : la piste d'audit, la reprise inter-conversation, et la continuité multi-utilisateur/multi-jour en dépendent toutes.
- Ne PAS sauter les mises à jour du LIF ou les écritures d'état en supposant que « tout est dans le contexte ». Une interruption perd quand même le travail en mémoire, et un coéquipier reprenant l'engagement lit l'état persisté — pas votre conversation.
- La seule commodité d'une conversation unique est de relire moins de fichiers en cours de session car ils sont déjà en contexte. Cela ne supprime pas le besoin de persister, de créer des points de contrôle, et de mettre à jour le LIF.

## Discipline qualité

1. **Ne jamais éditer `_engagement.json` à la main.** Toujours passer par `engagement-state.py`.
2. **Ne jamais supprimer la v1.** Quand la v2 est produite, les deux restent.
3. **Toujours mettre à jour le LIF quand les documents source changent.** Utiliser `lif-log-change` — il ajoute au journal des changements de `living-instruction-file.md` et actualise la date d'en-tête, de sorte que le LIF ne devienne jamais obsolète.
4. **Toujours citer la source de chaque fait.** Les faits Stone citent la source de validation ; les hypothèses Opinion citent les preuves du client.
5. **Ne jamais avancer automatiquement les parties.** L'utilisateur confirme explicitement l'achèvement d'une partie.
6. **Toujours paralléliser le travail indépendant.** Quand une Partie a 2+ sous-tâches indépendantes (voir Dispatch parallèle ci-dessus), les dispatcher en un seul message avec plusieurs appels Task. Le dispatch séquentiel de travail indépendant gaspille du temps réel et des tours d'API.
7. **Ne jamais exécuter automatiquement les relances v2 sans approbation de l'utilisateur.** Montrer le plan, obtenir l'approbation, puis exécuter. Plafond : 2 cycles de relance v2 par partie sans dérogation explicite de l'utilisateur.

## Exemples

### Exemple : démarrer un nouvel engagement

```
User: I want to start a new engagement for Acme Corp this quarter.

Skill response:
1. Verify Acme has a brand profile (slug: acme-corp). Found.
2. Initialise engagement: engagement-state.py init --brand acme-corp --id 2026-q2
3. Engagement directory created at ~/.claude-marketing/brands/acme-corp/engagements/2026-q2/
4. Walk Part 1 intake. Begin with Stone questions:
   "Let's start with what we know for certain. What year was Acme founded? Where is it headquartered? How many employees today?"
5. (User answers; each fact captured via add-stone-fact)
6. Move to Opinion questions:
   "Now let's capture what you believe but haven't formally validated. How would you describe Acme's positioning in the market today?"
7. (User answers; each hypothesis captured via add-opinion)
8. Mark Part 1 completed. Advise: "Part 1 is complete. The unbiased External Research (Part 2) is next — recommend running it now or scheduling it for the next session."
```

### Exemple : vérification de statut en cours d'engagement

```
User: Where are we on the Beta Industries engagement?

Skill response:
- Reads engagement-state.py status --brand beta-industries --id 2026-h1
- Shows:
  Engagement: beta-industries / 2026-h1
  Started: 2026-04-01 (32 days in)
  Current part: Part 9 — Channel Strategy Fan-out (in progress)
  Completed parts: 1, 2, 3, 4, 5, 6, 7, 8
  Pending parts: 9 (in progress), 10, 11, 12
  Open re-run decisions: 1 (Part 6 v2 re-runs in progress)
  Open items requiring resolution: 2 (LinkedIn Ads CPL forecast pending; Q3 budget envelope pending)
  LIF last updated: 2 days ago
  Next required action: complete remaining Part 9 channel docs (5 of 9 complete)
```

### Exemple : application de la Decision Matrix

```
User: We just finished Part 5 client validation. The client rejected our positioning recommendation and added two new competitors. What re-runs do we need?

Skill response:
1. Categorise the changes:
   - Two new competitors → trigger "competitors_changed"
   - Positioning rejected → trigger "positioning_changed"
2. Run engagement-state.py decision-matrix --triggers "competitors_changed,positioning_changed"
3. Output the triggered re-runs:
   Triggered re-runs: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2
   (competitors_changed triggers all four Core Docs + 4.1 + 4.2; positioning_changed adds 3.3 which is already in scope)
4. Estimate token cost: ~85K tokens for the full re-run set
5. Ask: "Approve all? Modify? Skip any?"
6. On user approval, mark Part 6 started and invoke four-core-documents skill with view=v2 for each triggered doc
```

### Exemple : correction Update-Back en cours de route

```
User: We've been live for two months. Q1 channel data shows our actual CAC for Segment X is INR 4,800 — but Core Doc 3.1 v2.0 had it estimated at INR 3,000. Need to update.

Skill response:
1. Validate the correction: 60+ days of data, statistically meaningful sample. ✓
2. Read current 3.1 v2.0
3. Bump version: engagement-state.py bump-version --doc 3.1 --reason "Segment X CAC corrected from INR 3,000 to INR 4,800 based on Q1 channel data"
4. Save 3.1 v2.1 with header note: "v2.0 → v2.1 changes: Section 4 (Unit Economics) — Segment X CAC corrected. LTV:CAC drops from 4.0 to 2.5; below 3.0 health threshold."
5. lif-log-change --section "Recent Corrections" --summary "Segment X CAC corrected to INR 4,800. Channel mix for Segment X under review."
6. Identify downstream review needed: Core Doc 3.4 (DMFlow) channel allocation for Segment X may need revision
7. Add to engagement review queue
```

## Compétences associées

- `four-core-documents` — produit les livrables de la Partie 3
- `client-validation-document` — produit le livrable de la Partie 5
- `growth-plan` + `yearly-planner` — produisent les livrables de la Partie 8
- `continuous-improvement-loop` — gère la Partie 12

## Références associées

- [engagement-flow-methodology.md](../context-engine/engagement-flow-methodology.md)
- [four-core-documents-spec.md](../context-engine/four-core-documents-spec.md)
- [decision-matrix-rerun.md](../context-engine/decision-matrix-rerun.md)
- [update-back-rule.md](../context-engine/update-back-rule.md)
- [living-instruction-file-spec.md](../context-engine/living-instruction-file-spec.md)
- [stone-vs-opinion.md](../context-engine/stone-vs-opinion.md)
- [two-views-model.md](../context-engine/two-views-model.md)

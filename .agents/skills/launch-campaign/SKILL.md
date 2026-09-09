---
name: launch-campaign
description: "Orchestrer le lancement multicanal complet d'un plan de campagne approuvé — des portes BLOQUANTES de pré-lancement (plan approuvé, actifs présents, connecteurs sondés, suivi de conversion vérifié, actifs IA signés C2PA pour les marchés UE), puis une activation ordonnée par dépendance sur le CRM, la landing page, l'email, la publicité payante, le social organique, les influenceurs, et les RP, avec un point de contrôle après chaque étape et un enregistrement de lancement en double copie. Rien ne s'exécute avant que l'aperçu à blanc ne soit affiché et que l'utilisateur ne tape un oui explicite. Se déclenche sur \"/digital-marketing-pro:launch-campaign\", \"go live with the campaign\", \"kick off the launch\", \"activate every channel for this campaign\", \"flip the switch on the launch\". Consomme le plan issu de /digital-marketing-pro:campaign-plan, délègue la publicité payante à /digital-marketing-pro:launch-ad-campaign, et reprend les lancements interrompus via /digital-marketing-pro:resume."
user-invocable: true
triggers:
  - launch this campaign
  - go live with the campaign
  - launch campaign
  - kick off the campaign
  - flip the switch on the launch
  - activate the multi-channel campaign
allowed-tools: Read Bash Glob Grep
---

# /digital-marketing-pro:launch-campaign — Orchestrateur de lancement de campagne multicanal

Ce skill prend un plan de campagne **approuvé** (issu de `/digital-marketing-pro:campaign-plan`) et le fait passer par toutes les étapes nécessaires pour aller en production : portes de pré-lancement, activation canal par canal, création de l'enregistrement CRM, communication de lancement à l'équipe, et mise en place du suivi jour 1. Il complète — et est plus large que — `/digital-marketing-pro:launch-ad-campaign`, qui ne gère que l'activation des publicités payantes sur Google / Meta / LinkedIn / TikTok.

Utilisez ce skill **une fois** par campagne, après approbation du plan de campagne et validation de toutes les créations + landing pages + séquences email. Pas pour les publicités payantes seules — pour le lancement multicanal complet (payant + organique + email + contenu + CRM + RP).

## Pourquoi ce skill existe

Un plan de campagne est un document. Un lancement de campagne, ce sont vingt actions distinctes sur des plateformes, dans le bon ordre, avec les bonnes dépendances. Sans orchestrateur, les agences ratent des étapes — la landing page passe en ligne sans que le tag analytics soit câblé, l'automatisation email est activée avant que la liste source ne soit propre au regard du RGPD, les publicités payantes s'activent avant que la LP ne soit indexée, l'équipe découvre que la campagne a été lancée en voyant la première notification de conversion sur Slack.

Ce skill fait la différence entre « on a lancé » et « on a lancé proprement ». Il vérifie chaque prérequis avant de toucher à un système en production, exécute les étapes d'activation dans l'ordre des dépendances, et enregistre le lancement comme un objet Campagne CRM afin que l'attribution soit correcte en aval dès le premier jour.

## Ce que ce skill ne fait PAS

- Il ne crée PAS le plan de campagne — c'est `/digital-marketing-pro:campaign-plan`.
- Il ne génère PAS la création — c'est `/digital-marketing-pro:ad-creative`, `/digital-marketing-pro:content-engine`, `/digital-marketing-pro:email-sequence`, etc.
- Il n'enchérit ni n'optimise PAS le jour 2 et suivants — c'est `/digital-marketing-pro:performance-report`, `/digital-marketing-pro:budget-optimizer`, etc.

C'est l'**événement de lancement en une seule fois**, pas la planification ni l'optimisation.

## Processus

### Étape 0 — Prérequis (portes BLOQUANTES)

Ce skill REFUSE de continuer tant que TOUS ces éléments ne sont pas validés. Afficher les éléments en échec, ne pas démarrer le lancement.

1. `/digital-marketing-pro:validate-profile --brand {brand}` renvoie `passed` ou `passed_with_warnings`.
2. Un plan de campagne existe à `~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json` (ou l'utilisateur fournit `--plan-path`).
3. Le champ `status` du plan est `approved` (pas `draft` / `in_review` / `rejected`).
4. Chaque actif référencé dans le plan existe à l'emplacement que le plan revendique (fichiers de création, les URL de landing page répondent 200, les modèles email existent sur la plateforme email).
5. Chaque connecteur requis par les canaux dans le périmètre est joignable — relancer un sondage rapide : `python "${CLAUDE_PLUGIN_ROOT}/scripts/connector-status.py" --brand {slug} --action status --probe-only --connectors {connecteurs de canal séparés par des virgules}`.
6. Le suivi de conversion est vérifié pour chaque canal dans le périmètre — événements GA4 configurés ET testés au cours des 7 derniers jours : `python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand {slug} --action diagnostic --channel ga4_health`.
7. Si un visuel / vidéo / audio généré par IA figure dans la liste des actifs ET que la campagne cible des marchés UE, chacun de ces actifs a été signé via C2PA (flux `/digital-marketing-pro:c2pa-metadata` — `embed-c2pa.py --ai-disclosure` en coulisses). La conformité à l'article 50 n'est pas négociable pour les lancements UE à partir du 2 août 2026.

Si l'un de ces éléments échoue, afficher la liste des points à traiter avec la commande littérale suivante pour chaque élément, et sortir.

### Étape 1 — Charger le plan de campagne

Lire `plan.json`. Extraire : `campaign_id`, `campaign_name`, `objective`, `start_date`, `end_date`, `channels` (avec par canal `budget`, `audience`, `creative_ids`, `landing_url`, `kpi_targets`), `team_assignments`, `kickoff_comms`, `attribution_model`.

### Étape 2 — Aperçu à blanc (dry-run)

Avant de toucher à tout système en production, afficher un aperçu à blanc de chaque action sur le point de se produire. L'utilisateur doit confirmer `yes` pour continuer. L'aperçu à blanc montre :

```
🚀 Aperçu de lancement de campagne — {campaign_name}
   ID de campagne : {campaign_id}
   Marque :         {brand}
   Fenêtre :        {start_date} → {end_date}
   Objectif :       {objective}
   Attribution :    {model}

   Les 14 actions suivantes s'exécuteront dans l'ordre :

    1. CRM — Créer l'objet Campagne {campaign_name} dans {HubSpot|Salesforce|...}
    2. Landing page — Vérifier que {url} renvoie 200, présence du schema markup, tag GA4 se déclenchant
    3. Email — Activer l'automatisation {automation_id} dans {Klaviyo|HubSpot|...} (domaine d'envoi authentifié)
    4. Recherche payante — Activer {N} campagnes Google Ads ({budget} journalier total)
    5. Social payant — Activer {N} campagnes Meta + {M} campagnes LinkedIn ({budget} journalier total)
    6. Retail media — Activer {N} campagnes Amazon Sponsored Products
    7. Social organique — Planifier {N} publications sur {platforms} via {scheduler}
    8. Influenceurs — Notifier {N} créateurs sous contrat (briefs déjà approuvés selon le plan)
    9. RP — Envoyer l'annonce de lancement à {N} contacts presse via {tool}
   10. Kickoff interne — Message Slack à {channel}, email à {distribution_list}
   11. Suivi — Câbler les paramètres UTM sur chaque lien (croisement avec le plan)
   12. Attribution — Confirmer {attribution_model} actif dans GA4 + CRM
   13. Suivi — Activer le chien de garde jour 1 sur {KPIs} via /digital-marketing-pro:performance-check
   14. Documentation — Écrire l'enregistrement de lancement dans ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/launch-record.json
       et publier une copie visible pour l'utilisateur dans ~/Documents/DigitalMarketingPro/{brand}/campaigns/

   Temps d'exécution estimé total : ~{N} minutes.
   Canaux qui commenceront à dépenser immédiatement : {liste avec totaux journaliers}.

   Tapez `yes` pour continuer, `dry-run-only` pour enregistrer l'aperçu sans lancer,
   ou toute autre saisie pour annuler.
```

### Étape 3 — Exécuter dans l'ordre des dépendances

Exécuter les actions séquentiellement. **Après chaque action, écrire un point de contrôle d'état** dans `~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/launch-state.json` afin qu'une interruption puisse être reprise via `/digital-marketing-pro:resume`.

Règles de dépendance clés :

- L'objet Campagne CRM DOIT être créé **avant** toute campagne publicitaire payante — les plateformes de publicité payante doivent référencer l'ID CRM pour l'attribution.
- L'automatisation email DOIT être activée **avant** l'activation des publicités payantes — sinon les leads capturés par les publicités dans les premières minutes n'ont aucun nurturing.
- La vérification de la landing page DOIT réussir **avant** l'activation des publicités payantes — envoyer du trafic vers une 404 est l'échec de jour 1 le plus courant.
- La signature C2PA des actifs IA DOIT être confirmée **avant** que tout canal social organique ou social payant ne publie du contenu IA pour les marchés UE.
- Le suivi + l'attribution DOIVENT être confirmés **avant** le kickoff interne — une fois la communication interne envoyée, « on corrigera le suivi plus tard » n'arrive jamais.

Chaque action de plateforme est déclenchée via le script correspondant :

```bash
# Objet Campagne CRM
python "${CLAUDE_PLUGIN_ROOT}/scripts/crm-sync.py" --brand "{brand}" \
    --action create-campaign --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json

# Vérification de la landing page
curl -sS -o /dev/null -w "%{http_code}" "{landing_url}"

# Activation de l'automatisation email (idempotent — ignore si déjà activée)
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action enable-automation --automation-id "{id}" --platform "{klaviyo|hubspot|...}"

# Activation des publicités payantes (délègue au sous-ensemble launch-ad-campaign)
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action launch-ads --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json
# (ceci appelle en interne le flux launch-ad-campaign pour Google/Meta/LinkedIn/TikTok)

# Planification du social organique
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action schedule-posts --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json

# Notification des influenceurs
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action notify-influencers --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json

# Envoi RP
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action pr-send --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json

# Kickoff interne
python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" \
    --action internal-kickoff --plan ~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/plan.json

# Suivi jour 1
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --action arm-watchdog --campaign-id "{campaign_id}" --kpis "{liste de KPI}"
```

En cas d'échec d'une action :

1. Mettre à jour `launch-state.json` avec `status: paused_at_step_{N}` et l'erreur.
2. Ne PAS passer aux étapes suivantes. Les étapes suivantes dépendent de celle-ci.
3. Afficher l'échec avec une commande de remédiation littérale et la commande de reprise exacte :
   `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand "{brand}" --action resume-launch --data '{"campaign_id":"{campaign_id}","from_step":{N}}'`
4. Ne PAS relancer automatiquement. Les échecs de jour 1 signifient souvent une mauvaise configuration que des relances ne feraient qu'amplifier (campagnes en double, emails en double, etc.). Une décision humaine est requise.

### Étape 4 — Écrire l'enregistrement de lancement

Une fois chaque action réussie, écrire l'enregistrement de lancement final à deux emplacements :

```bash
# Interne (système de référence)
~/.claude-marketing/brands/{slug}/campaigns/{campaign_id}/launch-record.json

# Visible pour l'utilisateur
~/Documents/DigitalMarketingPro/{brand}/campaigns/{YYYY-MM-DD}-{campaign_name_slug}-launch.json
```

(Ou `$DIGITAL_MARKETING_PRO_PUBLISH_DIR/{slug}/campaigns/{...}` si défini — le motif de répertoire de publication en double copie.)

L'enregistrement contient : l'horodatage launched_at, chaque action avec sa valeur de retour, le statut d'activation canal par canal, l'ID de l'objet Campagne CRM, l'URL du kickoff interne Slack/email, l'ID du chien de garde pour le suivi jour 1, et le chemin absolu du plan de campagne ayant produit ce lancement.

### Étape 5 — Confirmer à l'utilisateur

Afficher le résumé de lancement dans la conversation :

```
🚀 Campagne lancée — {campaign_name}

   ID de campagne : {campaign_id}
   Enregistrement CRM : {hubspot|salesforce|...} Campagne n°{id}
   Fenêtre :        {start_date} → {end_date}
   Canaux en direct : {liste avec totaux journaliers}
   Chien de garde jour 1 : /digital-marketing-pro:performance-check --watchdog {watchdog_id}

   📂 Enregistrement de lancement :
      {published_path}

   Premier point de contrôle : demain matin. Lancez /digital-marketing-pro:performance-check
   pour voir les chiffres du jour 1.
```

## Règles de comportement

1. **Refuser sans les prérequis.** Chaque BLOQUANT de l'étape 0 doit être validé avant le début du lancement. Pas de « avertir et continuer » — ce sont des désastres de jour de lancement qui attendent de se produire.
2. **Toujours prévisualiser d'abord.** L'aperçu à blanc n'est pas facultatif. L'utilisateur tape `yes`, ou rien ne se lance.
3. **L'ordre des dépendances est fixe.** CRM → vérification landing page → email → payant → organique → influenceur → RP → interne → suivi → monitoring → enregistrement. Ne pas réordonner. Si un canal doit être ignoré, le plan doit l'indiquer avant l'exécution de ce skill.
4. **Point de contrôle après chaque action.** Traiter le lancement comme un pipeline en 14 phases. Tout échec laisse un état reprenable dans `launch-state.json` — jamais de travail « perdu ».
5. **Pas de relance automatique en cas d'échec.** Une étape de lancement échouée nécessite un regard humain — relancer aveuglément crée des campagnes en double, des emails doublés, et des enregistrements CRM introuvables.
6. **Enregistrement de lancement en double copie.** Interne + visible pour l'utilisateur. Les agences veulent pouvoir envoyer l'enregistrement de lancement aux clients sans avoir à expliquer où se trouvent les dotfolders.

## Arguments

```
/digital-marketing-pro:launch-campaign [--brand <slug>] [--campaign-id <id>]
    [--plan-path <path>] [--dry-run] [--resume-from-step <N>] [--skip-internal-kickoff]
```

- `--brand <slug>` — marque pour laquelle lancer (sinon utilise la marque active)
- `--campaign-id <id>` — campagne à lancer (sinon, si un seul plan approuvé existe pour la marque, l'utiliser ; sinon, demander)
- `--plan-path <path>` — chemin explicite vers le plan JSON (remplace l'emplacement par défaut `~/.claude-marketing/brands/{slug}/campaigns/{id}/plan.json`)
- `--dry-run` — afficher l'aperçu et sortir sans lancer (alias pour taper `dry-run-only` à l'invite de confirmation)
- `--resume-from-step <N>` — reprendre un lancement en pause à partir de l'étape N (consulte `launch-state.json`)
- `--skip-internal-kickoff` — ignorer le kickoff Slack/email (à utiliser lorsque le lancement a lieu en dehors des heures ouvrées et que la communication vient plus tard)

## Skills et commandes associés

- [`validate-profile`](../validate-profile/SKILL.md) — vérification BLOQUANTE des prérequis
- [`campaign-audit`](../campaign-audit/SKILL.md) — produit la référence d'état actuel dont ce lancement se démarque
- [`campaign-plan`](../campaign-plan/SKILL.md) — produit le plan que ce skill consomme
- [`launch-ad-campaign`](../launch-ad-campaign/SKILL.md) — le sous-ensemble publicités payantes uniquement vers lequel ce skill délègue à l'étape 3 (activation des publicités payantes)
- [`performance-check`](../performance-check/SKILL.md) — skill de point de contrôle jour 1 mentionné dans le message de succès
- `performance-monitor.py` (`${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py`) — arme le chien de garde jour 1
- [`crm-sync`](../crm-sync/SKILL.md) — crée l'objet Campagne CRM
- [`c2pa-metadata`](../c2pa-metadata/SKILL.md) — signe les actifs IA pour les lancements UE (obligatoire selon l'étape 0)

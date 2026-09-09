---
name: cowork-setup
description: "Configuration en une fois qui prépare Digital Marketing Pro pour un usage en équipe dans Anthropic Cowork — vérifie le bac à sable via plugin-metadata.py, contrôle qu'un MCP Google Drive est connecté, crée le squelette de dossiers Drive canonique (_brands/, _runs/, _plans/), et écrit la configuration de routage via drive-sync-state.py afin que les profils de marque, les plans et les points de contrôle d'exécution persistent d'une session à l'autre. Se déclenche sur « /digital-marketing-pro:cowork-setup », « configurer DMP pour mon équipe dans Cowork », « les profils de marque ne persistent pas entre les sessions », « router les résultats vers notre Drive partagé », « première installation dans Cowork ». À exécuter une fois par équipe ; dans Claude Code en local, elle ne propose qu'une mise en miroir Drive optionnelle. Se combine avec /digital-marketing-pro:brand-setup ensuite et /digital-marketing-pro:doctor pour vérifier le routage."
argument-hint: "[--brand <name>] [--drive-root <folder-name>]"
effort: low
---

# /digital-marketing-pro:cowork-setup

La configuration ponctuelle qui rend Digital Marketing Pro persistant dans Cowork pour une équipe. Met en place le routage Cowork → Drive afin que les profils de marque, les plans de campagne, les rapports d'audit et les journaux d'exécution survivent à la fin de la session Cowork en cours.

## Pourquoi cette compétence existe

Cowork est la surface Anthropic la plus accueillante pour les marketeurs — équipes d'agence, marketeurs internes, growth ops — qui ne vivent pas dans un terminal. Le flux de travail naturel en équipe est « tout le monde utilise Cowork ; l'état des marques et les résultats vivent dans notre Drive partagé ». Mais la couche de système de fichiers de DMP a été conçue pour Claude Code en local (écritures dans `~/.claude-marketing/` sur la machine hôte). Dans Cowork, ce chemin correspond au bac à sable Linux propre à la session — il disparaît à la fin de la session et reste invisible pour l'équipe.

**`${CLAUDE_PLUGIN_DATA}` n'aide pas non plus ici.** La documentation des plugins Anthropic la décrit comme le chemin de stockage persistant propre à chaque plugin. Dans Cowork, elle correspond à un montage de VM propre à la session qui disparaît de la même façon (ouvert : [claude-code#51398](https://github.com/anthropics/claude-code/issues/51398)). Chaque plugin MCP reposant sur OAuth se heurte au même mur.

La v3.12.0 a corrigé ce problème avec un routage sensible à l'environnement : lorsque Cowork est détecté ET qu'un MCP Drive est configuré, les profils de marque et les rapports transitent par Drive au lieu du bac à sable éphémère. Cette compétence est la configuration en une fois qui garantit que les deux conditions sont réunies avant de commencer un travail réel.

## Comportement

### Étape 1 — Vérifier l'environnement Cowork

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/plugin-metadata.py" --section environment
```

Analyser le JSON. Trois branches :

**`environment == "cowork-sandbox"`** — Passer à l'étape 2.

**`environment == "claude-code-windows"` / `"-mac"` / `"-linux"`** — Indiquer à l'utilisateur :

> « Vous exécutez Claude Code en local, pas Cowork. Le routage Drive spécifique à Cowork n'est pas nécessaire ici — l'état de la marque à `~/.claude-marketing/` persiste sur votre hôte comme prévu. Si vous voulez QUAND MÊME des sauvegardes Drive pour le partage en équipe, vous pouvez exécuter cette compétence quand même et elle mettra l'état en miroir sur Drive en tant que sauvegarde. Voulez-vous continuer ? »

Ne continuer que si l'utilisateur confirme.

**`environment == "unknown"`** — Afficher les indicateurs du JSON et demander à l'utilisateur où il s'exécute, puis continuer en supposant Cowork (puisque « inconnu depuis Cowork » est le cas le plus probable).

### Étape 2 — Vérifier qu'un MCP Drive est connecté

Parcourir les outils disponibles à la recherche d'un MCP Google Drive. Signatures courantes :

- `mcp__<id>__create_file`, `mcp__<id>__read_file_content`, `mcp__<id>__search_files`, `mcp__<id>__list_folder_items` — intégration Drive de la plateforme Anthropic (Paramètres → Intégrations → Google Drive dans Cowork)
- `mcp__pipedream-google-drive__*` — agrégateur Pipedream
- `mcp__composio-google-drive__*` — Composio
- `mcp__zapier-google-drive__*` — Zapier
- Tout outil dont le nom combine « drive » avec « create » / « upload » / « search »

**Si un MCP Drive est trouvé :** confirmer à l'utilisateur lequel (« Trouvé : intégration Google Drive de la plateforme Anthropic. Je vais l'utiliser. ») et passer à l'étape 3.

**Si AUCUN MCP Drive n'est trouvé :** arrêter l'assistant avec un message clair :

> « DMP en mode Cowork a besoin d'une intégration Google Drive avant de pouvoir faire persister l'état de marque pour votre équipe. Configuration la plus simple (60 secondes) :
>
> 1. Dans Cowork, cliquez sur votre menu profil → **Paramètres** → **Intégrations**
> 2. Trouvez **Google Drive** dans la liste → cliquez sur **Connecter**
> 3. Connectez-vous avec le compte Google propriétaire du Drive partagé de votre équipe
> 4. Revenez ici et relancez `/digital-marketing-pro:cowork-setup`
>
> Alternative : un MCP Notion fonctionne aussi comme cible de persistance — DMP traitera chaque marque comme une page Notion. Si vous préférez cette voie, ajoutez Notion à votre panneau d'intégrations Cowork et relancez cette compétence. »

### Étape 3 — Vérifier ou créer le dossier Drive canonique

Nom de dossier par défaut : `DigitalMarketingPro` (sous « Mon Drive » ou où l'utilisateur préfère). Si `--drive-root <name>` a été passé, utiliser ce nom à la place.

Utiliser le MCP Drive pour :

1. Rechercher un dossier de premier niveau nommé `DigitalMarketingPro` (ou le `--drive-root` de l'utilisateur)
2. S'il existe, confirmer que l'utilisateur souhaite l'utiliser. Afficher son URL.
3. S'il n'existe pas, le créer. Afficher l'URL du nouveau dossier.

Créer ensuite le squelette de sous-dossiers :

```
DigitalMarketingPro/
├── _brands/                  <- les JSON de profil de marque persistent ici par marque
├── _runs/                    <- points de contrôle par exécution (reprise entre sessions)
├── _plans/                   <- plans annuels + trimestriels + de campagne
└── (dossiers de marque créés à la première exécution de contenu/audit/campagne)
    └── <nom de la marque>/
        ├── strategy/
        ├── seo/
        ├── campaigns/
        ├── audits/
        └── reports/
```

Ne pas créer de sous-dossiers de marque vides pour l'instant — ceux-ci se créent automatiquement lors de la première exécution pour cette marque. Seuls `_brands/`, `_runs/` et `_plans/` doivent exister.

### Étape 4 — Enregistrer la référence du dossier racine Drive + l'espace de noms d'équipe

**Isolation multi-équipe** : demander à l'utilisateur « quel est le nom du dossier racine Drive de votre équipe ? » (par défaut : `DigitalMarketingPro`). Des équipes différentes utilisent des noms de dossier différents → isolation automatique des espaces de noms. Exemples :
- Solo / petite équipe : `DigitalMarketingPro` (par défaut)
- Agence nommée « ACME » : `ACME DigitalMarketingPro`
- Deux équipes distinctes partageant un seul Drive : chacune choisit son propre nom

Écrire ensuite la configuration via le script canonique (PAS un fichier JSON écrit à la main — utiliser le script pour que le format reste synchronisé avec le reste de la chaîne d'outils) :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/drive-sync-state.py" --action write-config --data '{
  "environment": "cowork-sandbox",
  "drive_root_folder_name": "<team folder name chosen>",
  "drive_root_folder_id": "<id from Step 3>",
  "drive_root_folder_url": "<webViewLink from Step 3>",
  "drive_mcp_tool_prefix": "<prefix detected in Step 2, e.g. mcp__abc123__>"
}'
```

Le script écrit dans `~/.claude-marketing/_cowork-config.json` et ajoute automatiquement un horodatage `configured_at`.

Sessions Cowork futures : chaque opération DMP (`brand-setup`, `status`, `seo-audit`, `campaign-plan`, etc.) lit d'abord cette configuration. Si elle existe ET que le dossier Drive existe toujours, toutes les entrées/sorties sont routées vers cette racine. Si une équipe différente a choisi un nom de dossier différent, sa configuration se trouve au même chemin mais pointe ailleurs — pas de collision.

Pour vérifier qu'elle a été écrite correctement :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/drive-sync-state.py" --action read-config
```

### Étape 5 — Fixer les attentes de l'utilisateur

Afficher un résumé clair :

```
Digital Marketing Pro est maintenant configuré pour un usage en équipe dans Cowork :

Environnement :           Bac à sable Cowork (Linux)
Intégration Drive :       <nom>
Racine des résultats dans Drive : Mon Drive/<nom du dossier> (lien)
Configuration enregistrée à :  ~/.claude-marketing/_cowork-config.json

Ce que cela signifie en pratique :

- /digital-marketing-pro:brand-setup -> le profil atterrit dans
  Drive/<folder>/_brands/<brand-slug>/profile.json (persiste entre les sessions)
- /digital-marketing-pro:campaign-plan -> le plan atterrit dans
  Drive/<folder>/<brand>/campaigns/<YYYY-MM>/<slug>/PLAN.md
- /digital-marketing-pro:seo-audit -> l'audit et les intermédiaires atterrissent dans
  Drive/<folder>/<brand>/audits/<date>/
- /digital-marketing-pro:status -> lit l'état de la marque depuis Drive en premier,
  se replie sur le bac à sable local si l'appel Drive échoue
- /digital-marketing-pro:resume -> reprend une exécution interrompue en
  récupérant ses fichiers de point de contrôle depuis Drive/<folder>/_runs/

Votre équipe accède à tout directement via Google Drive. Aucun
chemin spécifique à Cowork à retenir.

Étape suivante :
  /digital-marketing-pro:brand-setup "Nom de votre marque"
```

### Étape 6 — Optionnel : lancer une configuration de marque

Si `--brand <name>` a été passé, lancer automatiquement `/digital-marketing-pro:brand-setup "<name>"` après le résumé. Cela rend la toute première exécution « une commande, entièrement configurée ».

## Comment les compétences sensibles à Cowork utilisent cette configuration

Lorsque le routage est configuré, brand-setup écrit localement dans `~/.claude-marketing/brands/{brand-slug}/profile.json` ET enregistre un envoi Drive en attente via `drive-sync-state.py --action add-pending-upload`. L'agent lit ensuite la liste en attente et utilise son MCP Drive pour transférer le fichier vers `<root>/_brands/{brand}/profile.json`. Lors d'une future session Cowork, l'agent fait l'inverse : il lit `_cowork-config.json`, voit la racine Drive de l'équipe, télécharge `<root>/_brands/{brand}/profile.json` vers le bac à sable local, et le marque `profile-mark-downloaded` afin que le hash local corresponde à la copie Drive.

Concrètement : après chaque opération DMP modifiant l'état, l'agent exécute :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/drive-sync-state.py" --action profile-needs-upload --brand <brand>
```

Si `needs_upload: true`, l'agent utilise son MCP Drive pour téléverser le fichier puis exécute `--action profile-mark-uploaded` avec l'ID de fichier Drive renvoyé par le MCP.

## Ce que cette compétence NE fait PAS

- Elle ne modifie pas le comportement de DMP dans Claude Code local (où le système de fichiers hôte convient).
- Elle ne migre pas les marques existantes en mode local vers Drive. Pour le faire après coup : relancer `/digital-marketing-pro:brand-setup "<brand>"` dans Cowork après la fin de cette compétence — la compétence brand-setup téléversera le profil local vers Drive.
- Elle ne crée pas de JSON de compte de service. Le mode Cowork utilise exclusivement la voie MCP (aucune configuration Google Cloud nécessaire).
- Elle ne vérifie pas si votre Drive dispose de suffisamment d'espace. Les profils de marque + plans sont minuscules (<100 Ko en général), donc c'est rarement un problème, mais signalez-le si vous rencontrez une erreur de quota lors d'une exécution réelle.
- Elle ne remplace pas le repli local — si un appel Drive échoue pour une raison quelconque, DMP écrit quand même localement et remet le téléversement en file d'attente.

## Voir aussi

- `/digital-marketing-pro:status` — confirmer que Cowork+Drive est détecté après la configuration
- `/digital-marketing-pro:brand-setup` — configuration de marque réelle (désormais Drive par défaut dans Cowork)
- `/digital-marketing-pro:doctor` — vérification de disponibilité par action (signale désormais aussi le routage Cowork+Drive)
- `scripts/plugin-metadata.py --section environment` — la sonde sous-jacente
- Section README « Usage en équipe Cowork » — documentation canonique pour savoir quelle surface utiliser
</content>

# Guide d'intégration MCP personnalisée — Ajouter et construire des serveurs MCP

## Ce que sont les MCP

Les serveurs Model Context Protocol (MCP) connectent Claude à des services externes. Chaque MCP fournit des **outils** (fonctions que Claude peut appeler), des **ressources** (données que Claude peut lire), et des **prompts** (modèles d'interaction prédéfinis). Les serveurs MCP s'exécutent comme des processus séparés qui communiquent avec Claude via JSON-RPC sur stdin/stdout.

Dans ce plugin, les MCP sont le pont d'exécution entre la couche agent (Claude raisonnant sur la stratégie marketing) et les plateformes externes (publier un article de blog, envoyer une campagne e-mail, interroger un CRM). **`.mcp.json` est distribué vide par conception** (`{"mcpServers":{}}` — rien ne se connecte automatiquement, ce qui garde les installations Cowork et d'équipe sûres). Le catalogue opt-in de plus de 60 configurations de connecteurs couvrant la publication sociale, l'e-mail, le CRM, les analytics, la mémoire, la connaissance, le CMS, la communication, la gestion de projet, les tests, et les bases de données vit dans `.mcp.json.connectors-reference` et `.mcp.json.example` — copiez les entrées dont vous avez besoin dans votre propre `.mcp.json`, et ce guide montre comment ajouter ou construire des serveurs au-delà du catalogue.

---

## Comment les MCP fonctionnent dans ce plugin

### Configuration

Votre `.mcp.json` (portée projet ou utilisateur) définit les configurations de serveur MCP auxquelles vous avez souscrit (opt-in). Claude découvre les MCP disponibles au démarrage de session et peut appeler leurs outils pendant une session. (Le propre `.mcp.json` du plugin est distribué vide — partez de `.mcp.json.example`.)

**Schéma `.mcp.json` :**
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "${ENV_VAR_NAME}"
      },
      "description": "What this server provides"
    }
  }
}
```

### Mécaniques clés

- **`command`** : L'exécutable à lancer — typiquement `npx` (pour les packages npm), `node` (pour les scripts locaux), ou `python` (pour les MCP basés sur Python)
- **`args`** : Arguments passés à la commande — nom de package pour npx, chemin de fichier pour node/python
- **`env`** : Variables d'environnement injectées dans le processus MCP — utiliser la syntaxe `${VAR_NAME}` pour référencer les variables depuis `.env` ou l'environnement shell
- **`description`** : Explication lisible par un humain qui aide Claude à comprendre quand utiliser ce MCP

### Comment Claude utilise les MCP à l'exécution

1. **Démarrage de session :** Claude lit `.mcp.json` et démarre les serveurs MCP configurés
2. **Découverte d'outils :** Claude appelle `tools/list` sur chaque serveur pour connaître les outils disponibles
3. **Invocation d'outil :** Pendant la conversation, Claude appelle les outils MCP par nom avec des paramètres JSON
4. **Porte de sécurité :** Le propre système de permission de Claude Code invite avant les appels d'outil selon vos réglages. Ce plugin ne fournit **aucun hook** (`hooks/hooks.json` est `{"hooks":{}}` par conception — les hooks de plugin se déclenchent globalement) ; suivez la convention de nommage lecture/écriture ci-dessous afin que les opérations d'écriture soient reconnaissables, et comptez sur les invites de permission intégrées pour l'approbation
5. **Réponse :** Le serveur MCP exécute l'opération et renvoie les résultats à Claude

---

## Ajouter un package MCP existant

### Étape par étape

1. **Identifier le service** que vous voulez connecter (par ex., Mailchimp, HubSpot, Airtable)

2. **Rechercher des packages MCP existants :** vérifier https://github.com/modelcontextprotocol/servers (le répertoire officiel de serveurs), rechercher sur npm les packages `mcp-server-*` ou `@*/mcp`, et vérifier si le fournisseur propose un point de terminaison MCP HTTP hébergé (voir `.mcp.json.connectors-reference` pour ceux qui sont vérifiés)

3. **Tester le package localement :**
   ```bash
   npx -y <package-name> --help
   ```

4. **Ajouter à `.mcp.json` :**
   ```json
   {
     "mcpServers": {
       "mailchimp": {
         "command": "npx",
         "args": ["-y", "mcp-server-mailchimp"],
         "env": {
           "MAILCHIMP_API_KEY": "${MAILCHIMP_API_KEY}",
           "MAILCHIMP_SERVER_PREFIX": "${MAILCHIMP_SERVER_PREFIX}"
         },
         "description": "Mailchimp email marketing — list management, campaign creation, audience segmentation"
       }
     }
   }
   ```

5. **Ajouter les identifiants à `.env` :**
   ```
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_SERVER_PREFIX=us14
   ```

6. **Vérifier la connectivité :** Démarrer une nouvelle session Claude et demander à Claude de lister les outils disponibles depuis le nouveau MCP

7. **Documenter :** Mettre à jour `docs/integrations-guide.md` avec la nouvelle intégration

### Checklist pré-vol

- [ ] Le package MCP existe et est activement maintenu (vérifier les téléchargements npm + la date de dernière publication)
- [ ] La version du package est stable (éviter les 0.x.x en production sauf absence d'alternative)
- [ ] Les identifiants requis sont disponibles (clé API, jetons OAuth, etc.)
- [ ] Les identifiants sont ajoutés à `.env` avec les noms de variable corrects
- [ ] L'entrée `.mcp.json` utilise la syntaxe `${VAR}` pour tous les secrets (ne jamais coder en dur les identifiants)
- [ ] Le serveur démarre sans erreur dans une nouvelle session
- [ ] `tools/list` renvoie les outils attendus
- [ ] Les opérations de lecture renvoient des données valides
- [ ] Les opérations d'écriture déclenchent correctement le hook d'approbation

---

## Conventions de variables d'environnement

### Normes de nommage

| Type | Schéma | Exemple |
|---|---|---|
| **Clé API** | `{SERVICE}_API_KEY` | `MAILCHIMP_API_KEY`, `HUBSPOT_API_KEY` |
| **URL de base** | `{SERVICE}_URL` | `ODOO_URL`, `CUSTOM_API_URL` |
| **ID client OAuth** | `{SERVICE}_CLIENT_ID` | `GOOGLE_CLIENT_ID`, `META_CLIENT_ID` |
| **Secret client OAuth** | `{SERVICE}_CLIENT_SECRET` | `GOOGLE_CLIENT_SECRET` |
| **Jeton d'accès** | `{SERVICE}_ACCESS_TOKEN` | `SLACK_ACCESS_TOKEN`, `NOTION_ACCESS_TOKEN` |
| **Serveur/Région** | `{SERVICE}_SERVER_PREFIX` | `MAILCHIMP_SERVER_PREFIX`, `AWS_REGION` |
| **Base de données** | `{SERVICE}_DB_NAME` | `POSTGRES_DB_NAME`, `MONGO_DB_NAME` |

### Règles de stockage

- **Tous les identifiants** vont dans `.env` à la racine du projet — jamais dans `.mcp.json`, jamais dans les scripts, jamais commités dans git
- **`.env` est dans le gitignore** — vérifier ceci avant tout commit
- **Mode agence :** Les identifiants par client sont stockés à `~/.claude-marketing/credentials/{profile-name}.json` (voir la section Profils d'identifiants ci-dessous)
- **Rotation :** Faire tourner les clés API trimestriellement. Utiliser des jetons de courte durée (OAuth) lorsque possible.

---

## Construire un serveur MCP personnalisé

Lorsqu'aucun package existant ne couvre votre service, construisez un serveur MCP personnalisé.

### Configuration du projet

```bash
mkdir mcp-server-yourservice
cd mcp-server-yourservice
npm init -y
npm install @modelcontextprotocol/sdk zod
```

### Modèle de serveur minimal

```javascript
#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "yourservice",
  version: "1.0.0",
  description: "MCP server for YourService — describe what it provides",
});

// --- Read Tool (auto-approved by hooks.json) ---
server.tool(
  "list_items",
  "List all items from YourService",
  { status: z.enum(["active", "archived", "all"]).optional() },
  async ({ status }) => {
    const response = await fetch(`${process.env.YOURSERVICE_URL}/api/items?status=${status || "active"}`, {
      headers: { "Authorization": `Bearer ${process.env.YOURSERVICE_API_KEY}` },
    });
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// --- Write Tool (requires approval via hooks.json) ---
server.tool(
  "create_item",
  "Create a new item in YourService",
  { name: z.string(), description: z.string().optional() },
  async ({ name, description }) => {
    const response = await fetch(`${process.env.YOURSERVICE_URL}/api/items`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.YOURSERVICE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// --- Start Server ---
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Ajout à `.mcp.json` (serveur local)

```json
{
  "mcpServers": {
    "yourservice": {
      "command": "node",
      "args": ["path/to/mcp-server-yourservice/index.js"],
      "env": {
        "YOURSERVICE_URL": "${YOURSERVICE_URL}",
        "YOURSERVICE_API_KEY": "${YOURSERVICE_API_KEY}"
      },
      "description": "YourService integration — item management, data queries"
    }
  }
}
```

---

## Conventions de nommage

### Nommage des serveurs

| Élément | Convention | Exemple |
|---|---|---|
| **Clé `.mcp.json`** | kebab-case minuscule, correspondant au service | `"mailchimp"`, `"google-sheets"`, `"hubspot-crm"` |
| **Package npm** | `mcp-server-{service}` ou `@scope/mcp-server-{service}` | `mcp-server-mailchimp`, `@company/mcp-server-crm` |
| **Noms d'outils** | `{action}_{noun}` — schéma verbe_objet | `list_campaigns`, `create_contact`, `send_email`, `get_report` |
| **URI de ressource** | `{service}://{resource-type}/{id}` | `mailchimp://lists/abc123`, `hubspot://contacts/456` |

### Nommage des outils pour la classification lecture vs écriture

Nommez les outils de sorte que leurs effets de bord soient évidents à partir du préfixe — les invites de permission de Claude Code (et tout hook de portée utilisateur que vous ajoutez vous-même) peuvent alors traiter les lectures et les écritures différemment :

| Préfixe | Classification | Traitement recommandé |
|---|---|---|
| `list_`, `get_`, `query_`, `search_`, `fetch_`, `count_` | **Lecture** | Sûr à autoriser |
| `create_`, `update_`, `delete_`, `send_`, `publish_`, `schedule_`, `import_`, `sync_` | **Écriture** | Nécessite une approbation explicite |

**Nommez toujours vos outils en utilisant ces préfixes** afin que l'intention de lecture/écriture soit reconnaissable par une machine. Si un outil a des effets de bord, utilisez un préfixe d'écriture même s'il lit aussi des données. (Ce plugin ne fournit aucun hook par conception — le contrôle d'approbation vient du propre système de permission de Claude Code.)

---

## Schémas d'intégration courants

### Schéma 1 : Enveloppe d'API REST (le plus courant)

Cartographier les points de terminaison REST directement vers des outils MCP :

| Point de terminaison REST | Outil MCP | Type |
|---|---|---|
| `GET /api/contacts` | `list_contacts` | Lecture |
| `GET /api/contacts/:id` | `get_contact` | Lecture |
| `POST /api/contacts` | `create_contact` | Écriture |
| `PUT /api/contacts/:id` | `update_contact` | Écriture |
| `DELETE /api/contacts/:id` | `delete_contact` | Écriture |
| `GET /api/contacts/search?q=` | `search_contacts` | Lecture |

**Pagination :** Implémenter la pagination basée sur curseur au sein de l'outil. Accepter un paramètre `page` ou `cursor`, renvoyer les résultats + le curseur suivant.

### Schéma 2 : Enveloppe GraphQL

Pour les API GraphQL, créer un seul outil de requête flexible plus des outils de mutation spécifiques :

- `query_data` — accepte une chaîne de requête GraphQL, renvoie les résultats (lecture)
- `create_record` — mutation spécifique avec des entrées typées (écriture)
- `update_record` — mutation spécifique avec des entrées typées (écriture)

### Schéma 3 : Récepteur de webhook

Pour les intégrations pilotées par événement :
- Enregistrer les webhooks via un outil `register_webhook` (écriture, configuration unique)
- Le serveur MCP écoute les événements entrants et les fait remonter comme ressources
- Claude lit les événements via l'outil `get_recent_events` (lecture)

### Schéma 4 : Connecteur de base de données

- `query_database` — requête SQL/NoSQL paramétrée (lecture)
- `insert_record` / `update_record` — mutations de données typées (écriture)
- **Toujours par défaut en lecture seule.** L'accès en écriture devrait nécessiter une configuration explicite.

---

## Profils d'identifiants pour le mode agence

En mode agence, différents clients utilisent différents identifiants pour les mêmes services (par ex., chaque client a son propre compte Mailchimp).

### Structure du profil

Stocké à `~/.claude-marketing/credentials/{profile-name}.json` :

```json
{
  "profile_name": "acme-corp",
  "created_at": "2026-01-15T10:00:00Z",
  "credentials": {
    "mailchimp": {
      "MAILCHIMP_API_KEY": "key-us14-abc123",
      "MAILCHIMP_SERVER_PREFIX": "us14"
    },
    "hubspot": {
      "HUBSPOT_API_KEY": "pat-na1-xyz789"
    },
    "google-analytics": {
      "GA_PROPERTY_ID": "123456789"
    }
  }
}
```

### Comment fonctionne le changement de profil

1. L'utilisateur exécute `/digital-marketing-pro:credential-switch --profile acme-corp`
2. `credential-manager.py` charge le JSON du profil
3. Les variables d'environnement sont injectées pour la session
4. Les serveurs MCP redémarrent avec les nouveaux identifiants
5. Tous les appels MCP suivants utilisent les comptes du client

### Règles de sécurité pour les profils

- [ ] Les fichiers de profil sont stockés en dehors du répertoire du plugin (dans `~/.claude-marketing/`)
- [ ] Les fichiers de profil ne sont jamais commités dans git
- [ ] Chaque profil ne contient que les identifiants des services que ce client utilise
- [ ] Les clés API dans les profils sont chiffrées au repos (si la fonctionnalité de chiffrement de `credential-manager.py` est utilisée)
- [ ] L'accès aux profils est journalisé — `credential-manager.py` enregistre quel profil a été chargé et quand

---

## Tester une nouvelle intégration MCP

### Checklist de test

| Test | Comment vérifier | Critère de réussite |
|---|---|---|
| **Le serveur démarre** | Démarrer une nouvelle session Claude, vérifier les erreurs | Aucune erreur de démarrage dans la console |
| **Découverte d'outils** | Demander à Claude « Quels outils sont disponibles depuis [serveur] ? » | Les outils attendus apparaissent dans la liste |
| **Opérations de lecture** | Appeler un outil list/get avec des données connues | Renvoie des données valides et formatées |
| **Opérations d'écriture** | Tenter un outil create/update | Le hook d'approbation se déclenche, puis l'opération réussit |
| **Identifiants manquants** | Retirer la clé API de `.env`, redémarrer | Message d'erreur clair, pas un crash |
| **Identifiants invalides** | Utiliser une mauvaise clé API | Réponse d'erreur structurée, pas un crash |
| **Limitation de débit** | Appels successifs rapides (si sûr à tester) | Erreur gracieuse avec conseil de nouvelle tentative |
| **Réponses volumineuses** | Requête qui renvoie 100+ éléments | Paginé ou tronqué proprement |
| **Gestion d'erreur** | Paramètres d'entrée invalides | Erreur structurée avec détail au niveau du champ |

### Débogage

- **Journaux du serveur MCP :** Vérifier la sortie stderr du processus MCP pour les traces d'erreur
- **Problèmes réseau :** Vérifier l'URL de base de l'API et que les requêtes sortantes ne sont pas bloquées
- **Échecs d'authentification :** Confirmer que le nom de la variable d'environnement dans `.mcp.json` correspond exactement au nom de la variable dans `.env`
- **Outil qui n'apparaît pas :** Vérifier que la clé du serveur dans `.mcp.json` est un JSON valide et que l'outil est enregistré avant `server.connect()`

---

## Considérations de sécurité

### Sécurité des identifiants

- **Ne jamais** stocker les identifiants directement dans `.mcp.json` — toujours utiliser des références `${VAR}`
- **Ne jamais** journaliser les clés API ou jetons dans la sortie du serveur MCP
- **Faire tourner** les clés API trimestriellement au minimum, immédiatement en cas de compromission
- **Limiter la portée** des clés API aux permissions minimales requises (lecture seule lorsque possible)
- **Auditer** les appels d'outil MCP via les journaux d'exécution (`execution-tracker.py` journalise toutes les invocations d'outil)

### Contrôle d'accès

- Le système de permission de Claude Code est la porte de sécurité principale — configurer les règles d'autorisation/refus pour les outils MCP dans vos réglages (ce plugin ne fournit aucun hook par conception ; ajoutez vous-même des hooks de portée utilisateur si vous voulez un contrôle automatisé)
- Traiter les outils de lecture (list, get, query, search, fetch) comme sûrs à autoriser
- Exiger une approbation utilisateur explicite pour les outils d'écriture (create, update, delete, send, publish, schedule)
- Les MCP personnalisés **doivent** suivre la convention de nommage afin que l'intention de lecture/écriture soit reconnaissable
- Si un outil effectue à la fois des opérations de lecture et d'écriture, le classer comme écriture (utiliser un préfixe d'écriture)

### Chaîne d'approvisionnement

- Préférer les packages MCP bien maintenus avec 1 000+ téléchargements hebdomadaires npm
- Épingler les versions de package en production (éviter le tag `latest`)
- Revoir le code source du package avant déploiement, particulièrement pour les packages avec moins de 100 téléchargements
- Pour les intégrations sensibles (CRM, paiement, authentification), construire des MCP personnalisés plutôt que d'utiliser des packages tiers

---

## Exemples de configurations

### Odoo ERP (REST/JSON-RPC)

```json
{
  "odoo": {
    "command": "node",
    "args": ["path/to/mcp-server-odoo/index.js"],
    "env": {
      "ODOO_URL": "${ODOO_URL}",
      "ODOO_DB": "${ODOO_DB}",
      "ODOO_USERNAME": "${ODOO_USERNAME}",
      "ODOO_API_KEY": "${ODOO_API_KEY}"
    },
    "description": "Odoo ERP — contacts, invoices, products, sales orders"
  }
}
```

### API REST générique

```json
{
  "custom-api": {
    "command": "node",
    "args": ["path/to/mcp-server-rest/index.js"],
    "env": {
      "REST_BASE_URL": "${CUSTOM_API_URL}",
      "REST_API_KEY": "${CUSTOM_API_KEY}",
      "REST_AUTH_TYPE": "bearer"
    },
    "description": "Custom REST API — generic CRUD operations against your API"
  }
}
```

### Zapier MCP (hébergé)

L'intégration d'agent actuelle de Zapier est **Zapier MCP** (le successeur du produit Natural Language Actions retiré). Générez votre URL de point de terminaison MCP personnelle sur https://mcp.zapier.com et ajoutez-la comme serveur HTTP :

```json
{
  "zapier": {
    "type": "http",
    "url": "https://mcp.zapier.com/api/mcp/mcp",
    "headers": {
      "Authorization": "Bearer ${ZAPIER_MCP_TOKEN}"
    },
    "description": "Zapier MCP — trigger Zaps and AI Actions, connect 5000+ apps"
  }
}
```

> **Principe clé :** Chaque intégration MCP devrait être testée avec des identifiants valides et invalides, devrait gérer les erreurs de manière élégante avec des réponses structurées, et devrait suivre la convention de nommage lecture/écriture pour que le contrôle de permission reste fiable. En cas de doute, classez un outil comme écriture — il est toujours plus sûr d'exiger une approbation que de permettre des effets de bord non intentionnels.

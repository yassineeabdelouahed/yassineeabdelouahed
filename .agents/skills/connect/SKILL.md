---
name: connect
description: "Guider la connexion d'une intégration MCP connue au plugin — consulte le registre des connecteurs via connector-status.py, vérifie le statut actuel, et renvoie les étapes de configuration spécifiques au transport (OAuth pour les connecteurs HTTP, identifiants par variables d'environnement plus le bloc .mcp.json exact pour les connecteurs npx), les étapes de vérification, et les compétences que chaque connecteur débloque. Se déclenche sur \"/digital-marketing-pro:connect\", \"connect Google Ads\", \"hook up Slack to the plugin\", \"set up the HubSpot integration\", \"how do I add Mailchimp\". Guidance et vérifications de statut uniquement — l'utilisateur ajoute lui-même les identifiants ; les serveurs inconnus ou personnalisés sont orientés vers /digital-marketing-pro:add-integration."
argument-hint: "[connector-name]"
---

# /digital-marketing-pro:connect

## Objectif

Guider les utilisateurs dans la connexion d'une intégration MCP spécifique au plugin Digital Marketing Pro. Fournit des instructions de configuration spécifiques à la plateforme, les exigences d'identifiants, les étapes de configuration, et la vérification. C'est le point d'entrée convivial pour ajouter des intégrations — il gère les cas courants (connecteurs connus avec des parcours de configuration établis) tandis que `/digital-marketing-pro:add-integration` gère les serveurs MCP personnalisés ou inconnus.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom du connecteur** : Le service à connecter — par exemple, « google-ads », « salesforce », « mailchimp », « twilio », « deepl ». Si l'utilisateur fournit un nom partiel ou informel (par exemple, « google analytics », « fb ads », « linkedin »), le faire correspondre au connecteur le plus proche dans le registre
- **Environnement (optionnel)** : Si l'utilisateur utilise Claude Code (prend en charge HTTP + npx) ou Cowork (HTTP uniquement). Par défaut, détection automatique basée sur le contexte disponible. Si le connecteur demandé est uniquement npx et que l'utilisateur est sur Cowork, expliquer la limitation et suggérer des alternatives HTTP dans la même catégorie

## Processus

1. **Consulter le connecteur** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/connector-status.py" --action setup-guide --name <connector>` pour obtenir le guide de configuration détaillé pour le connecteur demandé. Si le nom ne correspond pas exactement, rechercher des correspondances proches dans le registre et suggérer le nom correct.

2. **Vérifier le statut actuel** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/connector-status.py" --action check --name <connector>` pour déterminer si le connecteur est déjà configuré. Si déjà connecté, signaler cela et montrer quelles compétences il alimente — demander si l'utilisateur souhaite vérifier la connectivité ou reconfigurer.

3. **Présenter les instructions de configuration selon le type de transport** :

   **Pour les connecteurs HTTP** (les 10 supportés par le registre : Slack, Canva, Figma, HubSpot, Ahrefs, Similarweb, Klaviyo, Amplitude, Google Calendar, Gmail) :
   - **Rien n'est pré-connecté.** Le `.mcp.json` fourni est vide (`{"mcpServers":{}}`) afin qu'une installation fraîche ait zéro serveur MCP à connexion automatique — c'est délibéré (cela sécurise Cowork et les installations multi-locataires). Ces connecteurs HTTP sont un **catalogue à activation volontaire**, documenté dans `.mcp.json.connectors-reference`.
   - Pour en activer un, l'utilisateur copie son bloc depuis `.mcp.json.connectors-reference` dans son propre `.mcp.json` (ou l'ajoute via `/digital-marketing-pro:add-integration`), puis redémarre le client. Les connecteurs HTTP n'ont besoin d'aucune clé API dans le fichier — une fois le serveur ajouté, Claude invite à l'OAuth lors de la première utilisation.
   - Exemple : « Slack n'est pas encore connecté. Copiez le bloc Slack depuis `.mcp.json.connectors-reference` dans votre `.mcp.json` (ou exécutez `/digital-marketing-pro:add-integration slack`), redémarrez, puis exécutez `/digital-marketing-pro:send-notification` — vous serez invité à autoriser Slack via OAuth. »
   - Notion, Stripe, Asana, et Webflow sont des serveurs HTTP **catalogue uniquement** : configurez-les directement depuis `.mcp.json.connectors-reference` de la même manière, mais ils ne sont pas dans le registre des connecteurs, donc `/digital-marketing-pro:doctor` et `connector-status.py` ne rendront pas compte à leur sujet.
   - Lister les compétences que ce connecteur activerait une fois ajouté

   **Pour les connecteurs npx** (Google Ads, Meta, Salesforce, Twilio, etc.) :
   - Lister les variables d'environnement spécifiques nécessaires avec des descriptions claires
   - Fournir des instructions spécifiques à la plateforme pour obtenir les identifiants :
     - Où aller dans le tableau de bord de la plateforme pour créer des clés API
     - Quelles permissions/scopes sont nécessaires
     - Tout prérequis (comptes développeur, création d'application, etc.)
   - Montrer l'entrée `.mcp.json` exacte à ajouter (issue du guide de configuration)
   - Proposer deux parcours de configuration :
     1. **Rapide** : « Définissez les variables d'environnement et exécutez `/digital-marketing-pro:add-integration <name>` pour configurer automatiquement »
     2. **Manuel** : Montrer le bloc JSON à ajouter directement à `.mcp.json`
   - Noter que les connecteurs npx fonctionnent uniquement dans Claude Code, pas dans Cowork

4. **Gérer les connecteurs inconnus** : Si le nom du connecteur n'est pas dans le registre :
   - Rechercher des correspondances proches et les suggérer
   - Si aucune correspondance n'est trouvée, expliquer qu'il s'agit d'une intégration personnalisée et guider vers `/digital-marketing-pro:add-integration` qui gère la découverte de packages npm et la configuration de serveur MCP personnalisé
   - Lister les catégories de connecteurs disponibles afin qu'ils puissent explorer des alternatives

5. **Vérifier après configuration** (pour les connecteurs npx) : Après que l'utilisateur confirme avoir configuré les identifiants, proposer de vérifier la connectivité :
   - Vérifier que toutes les variables d'environnement requises sont définies et non vides
   - Suggérer d'exécuter un test en lecture seule via le connecteur pour confirmer qu'il fonctionne
   - Signaler le succès ou diagnostiquer l'échec avec des conseils spécifiques

## Résultat

Un guide de configuration de connecteur contenant :

- **Infos sur le connecteur** : Nom, catégorie, description, type de transport (HTTP/npx), et statut actuel (connecté/non connecté)
- **Compétences débloquées** : Liste de toutes les compétences que ce connecteur active, avec de brèves descriptions de ce que chacune fait
- **Instructions de configuration** : Guide étape par étape adapté au type de transport — flux OAuth pour HTTP, configuration d'identifiants pour npx
- **Exigences d'identifiants** (npx uniquement) : Noms exacts des variables d'environnement, où les obtenir, et permissions requises
- **Entrée de configuration** (npx uniquement) : Le bloc JSON exact à ajouter à `.mcp.json`, prêt à copier
- **Étapes de vérification** : Comment confirmer que le connecteur fonctionne après la configuration
- **Connecteurs alternatifs** : Autres connecteurs dans la même catégorie que l'utilisateur pourrait envisager (par exemple, « Si vous préférez Salesforce à HubSpot pour le CRM, exécutez `/digital-marketing-pro:connect salesforce` »)
- **Prochaines étapes** : « Exécutez `/digital-marketing-pro:integrations` pour voir votre tableau de bord d'intégrations mis à jour » et les compétences pertinentes à essayer

## Agents utilisés

- Aucun agent spécialisé nécessaire — cette compétence utilise directement le script `connector-status.py` et fournit des conseils spécifiques à la plateforme basés sur le registre des connecteurs

---
name: add-integration
description: "Accompagner l'ajout d'une intégration MCP personnalisée au plugin — recherche sur npm un package MCP existant (ou échafaude un serveur personnalisé à partir du guide du plugin), génère l'entrée .mcp.json exacte, configure les identifiants via variables d'environnement, teste la connectivité et documente les outils exposés par le nouveau serveur. Se déclenche sur \"/digital-marketing-pro:add-integration\", \"connect Ahrefs to the plugin\", \"add a new MCP server\", \"integrate our internal API\", \"hook up Stripe data\". Lit le profil de marque et les profils d'identifiants d'agence dans ~/.claude-marketing/credentials/ pour associer les clés propres à chaque client ; les constructions personnalisées suivent skills/context-engine/custom-mcp-guide.md."
argument-hint: "[service-name]"
---

# /digital-marketing-pro:add-integration

## Objectif

Accompagner les utilisateurs dans l'ajout d'une intégration MCP personnalisée au plugin Digital Marketing Pro. Rechercher les packages MCP existants qui fournissent la connexion de service souhaitée, configurer l'entrée du serveur dans `.mcp.json` avec la commande, les arguments et les variables d'environnement appropriés, tester la connectivité pour vérifier que l'intégration fonctionne, et documenter les outils disponibles. Prend en charge à la fois les serveurs MCP préconstruits issus de npm et les implémentations personnalisées pour des API propriétaires ou des outils internes.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Service à intégrer** : le nom et l'objectif du service à connecter — par ex. « Ahrefs pour l'analyse de backlinks », « Stripe pour les données de paiement », « notre API analytique interne pour des tableaux de bord personnalisés ». Cela détermine les termes de recherche de package MCP et l'approche de configuration
- **Type d'intégration** : utiliser un package MCP npm préconstruit (préféré — configuration plus rapide, maintenu par la communauté) ou construire un serveur MCP personnalisé (nécessaire pour les API propriétaires, les outils internes ou les services sans package MCP existant). En cas de doute, le système recherche d'abord des options préconstruites
- **Identifiants disponibles** : clés API, jetons d'accès, identifiants client OAuth ou autres identifiants d'authentification requis par le service. L'utilisateur doit les avoir sous la main — le système précisera quels noms de variables d'environnement utiliser et où les stocker, mais ne demandera jamais à l'utilisateur de coller des secrets dans la conversation

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Vérifier l'existence de profils d'identifiants d'agence dans `~/.claude-marketing/credentials/` — si le mode agence est actif, la nouvelle intégration devra peut-être être associée à des ensembles d'identifiants clients spécifiques. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Rechercher un package MCP existant** : interroger le registre npm et les répertoires connus de serveurs MCP pour trouver des packages correspondant au service demandé — rechercher par nom de service, nom d'API et variantes courantes. Évaluer les candidats selon le nombre de téléchargements, la date de dernière mise à jour, les étoiles GitHub et la compatibilité avec le format de configuration MCP du plugin. Présenter la meilleure correspondance (ou les 3 meilleures s'il y a plusieurs options viables) avec le nom du package, sa description, les outils pris en charge et toute limitation connue.
3. **Générer la configuration pour un package préconstruit** : si un package adapté est trouvé, générer l'entrée `.mcp.json` complète — nom du serveur (selon la convention de nommage du plugin : minuscules avec tirets), commande (`npx` pour les packages npm), tableau d'arguments avec le nom du package et les flags requis, objet env associant les noms de variables d'environnement aux références d'identifiants, et un champ description résumant ce que fournit l'intégration. Montrer à l'utilisateur le bloc JSON exact à ajouter.
4. **Fournir des indications MCP personnalisées si nécessaire** : si aucun package préconstruit adapté n'existe, fournir un modèle de développement de serveur MCP personnalisé basé sur `skills/context-engine/custom-mcp-guide.md` — structure du projet, définitions d'outils requises, schémas d'entrée/sortie, gestion de l'authentification et modèles de réponse d'erreur. Inclure un squelette d'implémentation de départ pour l'API spécifique que l'utilisateur souhaite connecter, avec des points d'entrée factices et un flux d'authentification.
5. **Configurer les variables d'environnement** : guider l'utilisateur sur la configuration des variables d'environnement — préciser les noms de variables exacts à utiliser (selon la convention `SERVICE_API_KEY`), où les ajouter (fichier `.env` à la racine du projet ou variables d'environnement système pour CI/CD), et comment les référencer dans la configuration `.mcp.json`. Pour les configurations d'agence, expliquer comment ajouter les identifiants au profil d'identifiants approprié dans `~/.claude-marketing/credentials/`.
6. **Tester la connectivité MCP** : une fois que l'utilisateur confirme que la configuration est en place, vérifier que l'intégration fonctionne — s'assurer que le serveur MCP démarre sans erreur, lister les outils disponibles qu'il expose, exécuter une opération de lecture basique (par ex. récupérer les informations de compte, lister des ressources, ou un point de contrôle de santé) pour confirmer l'authentification et la connectivité. Signaler le succès ou diagnostiquer l'échec avec des détails d'erreur précis et des étapes de remédiation.
7. **Associer au profil d'identifiants d'agence (le cas échéant)** : pour les configurations d'agence avec plusieurs marques clientes, ajouter l'association d'identifiants de la nouvelle intégration au profil approprié — quelles variables d'environnement sont spécifiques au client vs partagées, comment changer d'identifiants en changeant de marque, et comment vérifier que les bons identifiants sont actifs.
8. **Documenter l'intégration** : consigner la nouvelle intégration dans la configuration de la marque — nom du service, nom du serveur MCP, outils disponibles, exigences d'identifiants, toute limite de débit ou contrainte d'usage découverte pendant les tests, et des exemples de schémas d'utilisation pour référence de l'équipe.

## Résultat

Un rapport de configuration d'intégration complet contenant :

- **Entrée de configuration MCP** : le bloc JSON exact prêt à être ajouté à `.mcp.json` — nom du serveur, commande, arguments, env et description — formaté et validé selon le schéma de configuration du plugin
- **Instructions de configuration des variables d'environnement** : guide étape par étape pour configurer les identifiants requis — noms de variables, où les définir, exigences de format et commande de vérification pour confirmer qu'ils sont chargés
- **Résultats du test de connectivité** : statut de démarrage du serveur, liste des outils disponibles avec leurs descriptions, et résultat de l'opération de test de lecture basique — confirmant que l'intégration fonctionne ou fournissant des diagnostics d'erreur précis
- **Association du profil d'identifiants (si mode agence)** : comment les identifiants de la nouvelle intégration correspondent aux profils clients, instructions de changement, et étapes de vérification pour les configurations multi-marques
- **Documentation des outils disponibles** : liste complète des outils exposés par le nouveau serveur MCP — noms des outils, descriptions, paramètres requis et exemples d'invocation pour les opérations les plus courantes
- **Prochaines étapes** : comment utiliser la nouvelle intégration — quelles commandes existantes peuvent en tirer parti, des exemples de prompts qui déclencheront son utilisation, et les workflows à mettre à jour pour intégrer la nouvelle capacité

## Agents utilisés

- **execution-coordinator** — Découverte et évaluation de packages MCP, génération de configuration avec validation de schéma, test de connectivité avec gestion diagnostique des erreurs, association de profils d'identifiants pour les configurations d'agence, et documentation d'intégration avec inventaire des outils et guide d'utilisation

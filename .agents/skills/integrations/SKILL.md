---
name: integrations
description: "Afficher le tableau de bord de statut des intégrations MCP — quels connecteurs sont connectés, lesquels sont disponibles mais pas encore configurés, les skills que chacun débloque, la couverture par catégorie, et les trois connecteurs à ajouter en priorité pour un gain rapide. Simple vérification de statut en lecture seule via connector-status.py ; cela ne modifie rien. Se déclenche sur \"/digital-marketing-pro:integrations\", \"quelles intégrations sont connectées\", \"quels connecteurs ai-je\", \"que débloquerait la connexion d'un CRM\", \"montre-moi la couverture de mes intégrations\". Complémentaire à /digital-marketing-pro:connect pour les instructions de configuration des connecteurs et à /digital-marketing-pro:add-integration pour les serveurs MCP personnalisés."
---

# /digital-marketing-pro:integrations

## Objectif

Afficher un tableau de bord complet du statut des intégrations — quels connecteurs MCP sont actuellement connectés, lesquels sont disponibles mais pas encore configurés, et quels skills chaque connecteur débloque. C'est la première chose que les utilisateurs devraient vérifier après avoir installé le plugin pour comprendre quelles capacités sont actives et quelles connexions supplémentaires ils peuvent mettre en place.

## Entrée requise

L'utilisateur peut éventuellement fournir :

- **Filtre** (facultatif) : une catégorie spécifique sur laquelle se concentrer — par exemple « crm », « seo », « advertising », « email-marketing », « social-media ». Si omis, affiche toutes les catégories
- **Affichage** (facultatif) : `connected` (uniquement les connecteurs actifs), `available` (uniquement ceux non encore connectés), ou `all` (par défaut)

## Processus

1. **Exécuter la vérification de statut des connecteurs** : lancer `python "${CLAUDE_PLUGIN_ROOT}/scripts/connector-status.py" --action status` pour obtenir le tableau de bord complet. Ce script lit la configuration `.mcp.json` active et vérifie les variables d'environnement pour les connecteurs npx afin de déterminer lesquels sont connectés.

2. **Mettre en forme le tableau de bord** : présenter les résultats organisés par catégorie, avec une distinction visuelle claire entre connecteurs connectés et disponibles :

   Pour chaque catégorie (Chat, Design, CRM, SEO, Email Marketing, Advertising, Analytics, Social Media, etc.) :
   - Afficher les connecteurs connectés avec un indicateur de coche et les skills qu'ils alimentent
   - Afficher les connecteurs disponibles mais non connectés avec ce qu'ils débloqueraient
   - Pour les connecteurs disponibles, indiquer s'ils sont HTTP (fonctionne partout, configuration OAuth facile) ou npx (Claude Code uniquement, nécessite des clés API)

3. **Mettre en avant les gains rapides** : identifier les 3 principaux connecteurs que l'utilisateur devrait envisager de connecter en fonction de ceux qui débloqueraient le plus de capacités de skills supplémentaires. Prioriser les connecteurs HTTP (plus faciles à configurer) par rapport aux connecteurs npx.

4. **Afficher un résumé de couverture** : présenter la couverture globale des intégrations — X connecteurs actifs sur Y, avec une ventilation par catégorie montrant quelles zones ont une couverture complète et lesquelles présentent des lacunes.

5. **Fournir les prochaines étapes** : pour chaque connecteur disponible, expliquer brièvement comment le connecter :
   - Connecteurs HTTP : « Utilisez simplement n'importe quel skill qui en a besoin — vous serez invité à autoriser via OAuth »
   - Connecteurs npx : « Lancez `/digital-marketing-pro:connect <nom>` pour les instructions de configuration, ou `/digital-marketing-pro:add-integration <nom>` pour une configuration guidée »

## Sortie

Un tableau de bord d'intégration structuré contenant :

- **Résumé de couverture** : total connecté vs total disponible, pourcentage de couverture, et ventilation par catégorie
- **Intégrations connectées** : liste de tous les connecteurs actifs regroupés par catégorie, avec les skills que chacun alimente et son type de transport (HTTP/npx)
- **Intégrations disponibles** : liste de tous les connecteurs non encore connectés regroupés par catégorie, avec les skills qu'ils débloqueraient, le type de transport, et la complexité de configuration (HTTP = facile/OAuth, npx = nécessite des clés API)
- **Gains rapides** : les 3 connecteurs recommandés à ajouter en priorité, en fonction de l'impact sur la couverture des skills et de la facilité de mise en place
- **Lacunes par catégorie** : catégories sans aucun connecteur connecté mises en évidence, avec le connecteur le plus impactant à ajouter dans chaque catégorie manquante
- **Prochaines étapes** : indications claires — « Lancez `/digital-marketing-pro:connect <nom>` pour configurer n'importe quel connecteur » et « Lancez `/digital-marketing-pro:add-integration` pour les serveurs MCP personnalisés absents du registre »

## Agents utilisés

- Aucun agent spécialisé requis — ce skill utilise directement le script `connector-status.py` et met en forme la sortie

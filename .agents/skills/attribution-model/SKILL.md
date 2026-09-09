---
name: attribution-model
description: "Design a multi-touch attribution strategy — recommends the best-fit model for the business's sales cycle and data maturity, defines credit-distribution rules and lookback windows, maps platform-specific setup (GA4, HubSpot, Salesforce, warehouse), and documents tracking gaps and known blind spots. Triggers on \"/digital-marketing-pro:attribution-model\", \"set up multi-touch attribution\", \"which attribution model should we use\", \"configure GA4 attribution\", \"how should we credit channels for conversions\". Reads the brand profile and consumes the canonical model taxonomy in skills/funnel-architect/attribution-models.md; to run the models against real conversion data, pair with /digital-marketing-pro:attribution-report."
---

# /digital-marketing-pro:attribution-model

## Objectif

Concevoir et recommander un modèle d'attribution multi-touch avec des indications de mise en œuvre, des règles de répartition du crédit, et une configuration spécifique par plateforme. Produit une stratégie d'attribution complète adaptée à la maturité des données de l'entreprise, à son cycle de vente, et à son infrastructure analytique.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Durée du cycle de vente** : nombre moyen de jours entre le premier point de contact et la conversion (par ex. 7 jours pour l'e-commerce, 90+ jours pour le B2B entreprise)
- **Canaux marketing actifs** : tous les canaux actuellement en activité — recherche payante, social payant, recherche organique, e-mail, display, vidéo, affiliation, publipostage, événements, recommandation, marketing de contenu, etc.
- **Types de conversion** : les événements de conversion clés suivis — formulaire de lead, MQL, SQL, opportunité, client, revenu, ou achat e-commerce
- **Niveau de maturité des données** : sophistication analytique actuelle — débutant (GA4 basique, taggage limité), intermédiaire (suivi UTM, intégration CRM, multi-plateforme), ou avancé (entrepôt de données, CDI, ID utilisateur unifiés)
- **Outils analytiques actuels** : plateformes utilisées — GA4, HubSpot, Salesforce, Adobe Analytics, Mixpanel, entrepôt de données personnalisé, ou outils d'attribution tiers
- **Volume de points de contact** : interactions mensuelles approximatives sur tous les canaux (milliers, dizaines de milliers, centaines de milliers)
- **Points de contact hors ligne** : si des canaux hors ligne (salons professionnels, appels téléphoniques, publipostage, visites en magasin, réunions commerciales) jouent un rôle dans le parcours client
- **Philosophie d'allocation budgétaire** : comment les décisions budgétaires sont actuellement prises — intuition, données au dernier clic, ROAS mixte, directive de la direction, ou données d'attribution existantes
- **Approche d'attribution précédente** : tout modèle d'attribution existant en usage et ses lacunes ou limites connues
- **Questions métier clés** : quelles décisions spécifiques les données d'attribution doivent éclairer — allocation budgétaire, investissement de canal, optimisation de campagne, reporting exécutif, ou évaluation de fournisseur

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également l'existence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Évaluer la maturité des données et le paysage des points de contact** : cartographier tous les points de contact actifs sur tous les canaux, évaluer la couverture de suivi (quel pourcentage des interactions est capturé), identifier les capacités de résolution d'identité utilisateur (connecté vs anonyme, réconciliation cross-device), et noter la préparation globale des données sur une échelle de 1 à 5.
3. **Évaluer les options de modèle d'attribution** : noter chaque modèle de la taxonomie canonique — voir `skills/funnel-architect/attribution-models.md` (la source unique pour les définitions des modèles, l'arbre de décision de sélection, et les notes de mise en œuvre par plateforme) — par rapport au contexte métier sur les exigences de données, la précision, l'actionnabilité, et la complexité de mise en œuvre. Ne pas rederiver la liste des modèles ici ; la consommer depuis cette référence.
4. **Recommander le modèle principal avec justification** : sélectionner le modèle le mieux adapté selon la durée du cycle de vente, la maturité des données, le volume de points de contact, et les questions métier. Fournir une explication claire de pourquoi ce modèle convient et où il aura encore des angles morts. Si la maturité des données est faible, recommander une approche progressive commençant par un modèle plus simple et évoluant vers le data-driven à mesure que le suivi mûrit.
5. **Définir les règles de répartition du crédit** : préciser exactement comment le crédit de conversion est alloué — pourcentage par position de point de contact, fenêtre de demi-vie de décroissance temporelle, répartitions de poids basées sur la position (par ex. 40 % au premier, 40 % au dernier, 20 % réparti au milieu), et règles pour les conversions à touche unique vs les parcours multi-touch.
6. **Concevoir la fenêtre de rétrospection** : fixer la fenêtre de rétrospection d'attribution en fonction des données du cycle de vente — généralement 1,5 à 2x la durée moyenne du cycle de vente. Définir des fenêtres séparées pour l'attribution au clic et à la vue. Justifier la longueur de la fenêtre avec une analyse du cycle de vente et expliquer les compromis entre fenêtres plus courtes ou plus longues.
7. **Cartographier les étapes de mise en œuvre par plateforme analytique** : créer des guides de configuration spécifiques par plateforme — paramètres d'attribution GA4 et rapports de parcours de conversion, configuration de l'attribution de revenu multi-touch HubSpot, configuration de l'influence de campagne Salesforce, et logique de requête d'entrepôt de données personnalisé. Inclure des instructions de configuration étape par étape pour chaque outil de la pile. **Réalité de GA4 (à indiquer à l'utilisateur) :** GA4 n'expose que **data-driven** et **dernier clic** comme modèles configurables (le menu linéaire / décroissance temporelle / basé sur la position / premier clic a été retiré en 2023) — toute autre règle de crédit doit être modélisée dans la couche entrepôt/BI, pas dans GA4. Tenir compte également du nouveau canal par défaut **« AI Assistant »** de GA4 (référents en provenance de ChatGPT, Gemini, Copilot, Perplexity, etc.) dans la répartition par canal, afin que les conversions issues de l'IA ne soient pas mal classées sous Référence/Direct.
8. **Identifier les lacunes de données et les exigences de suivi** : auditer le suivi actuel par rapport aux exigences du modèle recommandé — paramètres UTM manquants, campagnes non taguées, suivi cross-domain cassé, capture de points de contact hors ligne absente, intégration CRM incomplète, et lacunes de gestion du consentement. Prioriser les corrections selon leur impact sur la précision de l'attribution.
9. **Créer un cadre de reporting d'attribution** : concevoir la structure de reporting — mise en page du tableau de bord d'attribution, métriques clés (revenu attribué par canal, coût par conversion attribuée, ROAS par modèle), vues de comparaison (modèle A vs modèle B côte à côte), analyse de tendance dans le temps, et format de résumé exécutif.
10. **Définir les critères d'évaluation du modèle** : fixer la cadence de revue (trimestrielle) et les critères de réévaluation du modèle — changements dans le mix de canaux, évolutions du cycle de vente, nouveaux types de points de contact, améliorations de la maturité des données, ou écarts significatifs entre la performance attribuée et les résultats commerciaux réels.
11. **Documenter les limites et les angles morts connus** : indiquer explicitement ce que le modèle ne peut pas capturer — lacunes cross-device, limites des jardins clos (auto-déclaration de Meta, Google), imprécisions de l'estimation de l'attribution à la vue, échecs de réconciliation hors ligne-vers-en ligne, impacts des réglementations de confidentialité sur le suivi, et l'impossibilité inhérente d'une attribution parfaite. Cadrer les attentes des parties prenantes.

## Résultat

Une recommandation de modèle d'attribution structurée contenant :

- **Recommandation de modèle d'attribution** avec une justification détaillée reliant le choix du modèle au cycle de vente, à la maturité des données, et aux questions métier
- **Règles de répartition du crédit** — allocation en pourcentage par position de point de contact avec des exemples montrant comment un exemple de parcours multi-touch serait crédité
- **Recommandation de fenêtre de rétrospection** avec justification par le cycle de vente, fenêtres d'attribution au clic vs à la vue, et analyse des compromis
- **Guide de mise en œuvre par plateforme** — configuration d'attribution GA4 étape par étape, configuration multi-touch HubSpot, paramètres d'influence de campagne Salesforce, et modèles de requêtes d'entrepôt personnalisé
- **Taxonomie des points de contact** — hiérarchie standardisée de canal, source, medium, et campagne avec des conventions de nommage pour un suivi cohérent
- **Liste de contrôle des exigences de données** — ce qui doit être suivi, tagué, et intégré pour que le modèle fonctionne avec précision
- **Analyse des lacunes de suivi** — lacunes identifiées classées par impact sur la précision de l'attribution, avec des recommandations de correction et des estimations d'effort
- **Spécification du tableau de bord de reporting d'attribution** — métriques, dimensions, filtres, visualisations, vues de comparaison, et format de résumé exécutif
- **Tableau de comparaison des modèles** — 6 à 7 modèles comparés côte à côte sur les avantages, inconvénients, exigences de données, scénarios les mieux adaptés, et complexité de mise en œuvre
- **Cadre d'évaluation** — critères de revue trimestrielle, déclencheurs de réévaluation du modèle, et chemin de progression de maturité des modèles simples vers les modèles avancés
- **Limites et angles morts connus** — documentation explicite de ce que le modèle ne peut pas mesurer, avec des indications de cadrage des attentes des parties prenantes
- **Considérations cross-device et cross-plateforme** — approches de résolution d'identité utilisateur, appariement déterministe vs probabiliste, et limites spécifiques par plateforme
- **Recommandations de réconciliation hors ligne-vers-en ligne** — méthodes pour intégrer les salons professionnels, appels téléphoniques, publipostage, et interactions en personne dans le modèle d'attribution digital

## Agents utilisés

- **analytics-analyst** — Évaluation de la maturité des données, évaluation du modèle d'attribution, conception de la répartition du crédit, analyse de la fenêtre de rétrospection, guidance de mise en œuvre par plateforme, identification des lacunes de suivi, conception du cadre de reporting, et documentation des limites

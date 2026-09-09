---
name: audience-profile
description: "Build a named, narrative buyer persona document — demographic snapshot, psychographic drivers, jobs-to-be-done, day-in-the-life scenario, buyer journey map, objections with counter-messaging, and content/channel preferences — for the 2-4 personas a brand actually needs. Triggers on \"/digital-marketing-pro:audience-profile\", \"create a buyer persona\", \"profile our target customer\", \"who is our ideal customer\", \"map the buyer journey for this segment\". Reads the brand profile, guidelines, and any customer data supplied (surveys, CRM exports, analytics demographics); run by the marketing-strategist agent. For the deeper research module — segmentation, anti-personas, buying committees — see /digital-marketing-pro:audience-intelligence."
argument-hint: "[audience-segment]"
---

# /digital-marketing-pro:audience-profile

## Objectif

Construire un buyer persona riche et actionnable qui va au-delà des données démographiques de base. Capture les moteurs psychographiques, les motifs comportementaux, les jobs-to-be-done, les objections, et les préférences de consommation de contenu pour éclairer toutes les activités marketing.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Produit/service** : ce que propose la marque
- **Type de client** : acheteur B2B, consommateur B2C, ou les deux
- **Données existantes** : toute recherche client, données d'enquête, données démographiques analytiques, données CRM, ou insights d'entretien
- **Nombre de personas** : combien de personas distincts créer (2-4 recommandé)
- **Hypothèse** : qui l'utilisateur pense être son client idéal (point de départ)

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également l'existence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Rassembler les informations via des questions structurées si les données sont limitées
3. Construire le profil démographique : tranche d'âge, rôle/titre, taille d'entreprise (B2B), tranche de revenu, géographie, éducation
4. Développer le profil psychographique : valeurs, motivations, peurs, aspirations, marqueurs identitaires
5. Cartographier les motifs comportementaux : où ils passent du temps en ligne, formats de contenu préférés, comportement d'achat, processus de décision
6. Définir les jobs-to-be-done : tâches fonctionnelles, émotionnelles, et sociales que le produit aide à accomplir
7. Identifier les objections et les freins à l'achat avec un contre-message
8. Documenter le parcours d'achat : événements déclencheurs, processus de recherche, critères d'évaluation, influenceurs de décision
9. Préciser les préférences de contenu : plateformes, formats, ton, sujets qui les engagent
10. Donner au persona un nom et un résumé narratif pour l'alignement de l'équipe

## Résultat

Un document de buyer persona structuré contenant :

- Nom du persona et récit d'un paragraphe
- Instantané démographique
- Profil psychographique avec motivations et valeurs
- Cadre jobs-to-be-done (fonctionnel, émotionnel, social)
- Scénario d'une journée dans la vie du persona
- Carte du parcours d'achat avec points de contact et critères de décision
- Guide des objections et contre-messages
- Préférences de contenu et de canal
- À faire et à ne pas faire en matière de message pour ce persona

## Agents utilisés

- **marketing-strategist** — Développement de persona, cadre JTBD, cartographie du parcours d'achat, segmentation d'audience

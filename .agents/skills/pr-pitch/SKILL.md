---
name: pr-pitch
description: "Construire un package de pitch média complet : un pitch central prêt pour l'email avec des options d'objet, 3-5 variations spécifiques par média, une liste média cible avec les domaines des journalistes et des notes d'approche, un calendrier de suivi, plus un brouillon de communiqué de presse, une fiche factuelle, et une banque de citations. Rédige aussi des réponses pour les plateformes de demandes de journalistes (Qwoted, Featured, Source of Sources). Se déclenche sur \"/digital-marketing-pro:pr-pitch\", \"pitch this story to journalists\", \"build a media list for our launch\", \"respond to this journalist request\", \"write a press release and pitch\". Lit le profil de marque, les guidelines, et les modèles personnalisés pour la voix et la conformité ; produit uniquement les documents — il n'envoie aucune sollicitation."
argument-hint: "[topic or news-hook]"
---

# /digital-marketing-pro:pr-pitch

## Objectif

Créer des packages de pitch média convaincants conçus pour obtenir de la couverture. Inclut des modèles de pitch personnalisés par type de média, l'identification des médias cibles, le séquençage des sollicitations, et des documents prêts pour les journalistes.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Angle de l'histoire** : Ce qui est digne d'intérêt (lancement, données, tendance, commentaire d'expert, jalon)
- **Type de pitch** : Pitch proactif, réactif (newsjacking), réponse sur plateforme de demande de journaliste (par exemple, Qwoted, Featured, Source of Sources), ou placement de leadership éclairé
- **Médias cibles** : Publications souhaitées ou niveau de palier (Tier 1 national, professionnel, local, podcasts)
- **Porte-parole** : Qui parle pour la marque, leurs qualifications et disponibilité
- **Actifs à l'appui** : Données, citations, images, communiqués de presse, études de cas disponibles
- **Timing** : Dates d'embargo, associations à des événements, ou niveau d'urgence

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les guidelines** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Identifier l'accroche d'actualité centrale et affiner l'angle pour un attrait éditorial maximal
3. Élaborer des modèles de pitch adaptés au type de média (national, professionnel, diffusion, podcast, newsletter)
4. Construire une liste média cible avec les noms de journalistes, leurs domaines, les médias, et l'approche de contact
5. Concevoir une séquence de sollicitation : pitch initial, timing de relance, angles alternatifs
6. Préparer les documents à l'appui : brouillon de communiqué de presse, fiche factuelle, banque de citations, boilerplate
7. En cas de réponse à une plateforme de demande de journaliste (par exemple, Qwoted, Featured, Source of Sources) : rédiger une réponse de source optimisée pour les critères de sélection des journalistes
8. Relire tous les documents pour la cohérence de la voix de marque et l'exactitude factuelle

## Résultat

Un package de pitch RP complet contenant :

- Modèle de pitch central (prêt pour l'email) avec des options d'objet
- Variations de pitch spécifiques par média (3-5 versions)
- Liste média cible avec les détails des journalistes et des notes d'approche de pitch
- Calendrier de sollicitation avec cadence de relance
- Brouillon de communiqué de presse ou d'avis média
- Fiche factuelle et banque de citations
- Modèle de réponse pour plateforme de demande de journaliste (Qwoted, Featured, Source of Sources — le cas échéant)
- Cadre de mesure : suivi de la couverture, part de voix, valeur des backlinks

## Agents utilisés

- **pr-outreach** — Élaboration de pitch, ciblage média, stratégie de sollicitation, relations avec les journalistes

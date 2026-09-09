---
name: influencer-brief
description: "Créer un brief complet de campagne d'influence — critères de découverte de créateurs, un document de brief créateur partageable, cadre de rémunération, workflow d'approbation de contenu, checklist de conformité FTC/ASA, droits d'usage, et un cadre de mesure, incluant les clauses d'outils IA et la clause de divulgation deepfake de l'UE pour les placements dans l'UE. Se déclenche sur « /digital-marketing-pro:influencer-brief », « rédige un brief pour notre campagne d'influence », « que doit inclure notre brief créateur », « fixe les critères de sélection des créateurs », « rédige les exigences de divulgation pour les influenceurs ». Lit le profil de marque, les guidelines, et les SOP d'agence ; référence le workflow /digital-marketing-pro:c2pa-metadata pour les actifs IA livrés en amplification payante."
argument-hint: "[campaign-objective]"
---

# /digital-marketing-pro:influencer-brief

## Objectif

Créer un brief complet de campagne d'influence couvrant les critères de découverte de
créateurs, les guidelines de contenu, les exigences de conformité, le cadre de
rémunération, et la mesure de performance.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Objectif de la campagne** : Notoriété, engagement, conversions, génération de contenu, ou promotion d'événement
- **Produit/service** : Ce que l'influenceur va promouvoir
- **Audience cible** : Qui la campagne doit atteindre
- **Plateforme(s)** : Instagram, TikTok, YouTube, X, LinkedIn, podcasts
- **Budget** : Budget total influenceurs ou fourchette par créateur
- **Palier de créateur** : Nano (1-10K), Micro (10-100K), Mid (100K-500K), Macro (500K-1M), Mega (1M+)
- **Calendrier** : Dates de campagne et délais de livraison du contenu
- **Type de contenu** : Publications, stories, reels, vidéos, avis, unboxing, tutoriels, live streams

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json`
   pour obtenir le slug actif, puis charger
   `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les
   règles de conformité pour les marchés ciblés
   (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel.
   **Vérifier aussi les guidelines** dans
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes,
   charger les restrictions et les fichiers de catégorie pertinents. Vérifier les
   templates personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`.
   Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque
   n'existe, demander : « Configurer une marque d'abord
   (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Définir les critères de découverte de créateurs : niche, démographie de l'audience, minimums de taux d'engagement, filtres de sécurité de marque, alignement esthétique
3. Construire le brief créateur : aperçu de la campagne, messages clés, limites de liberté créative, éléments obligatoires et interdits, hashtags, divulgations
4. Rédiger le cadre de rémunération : forfait fixe, bonus de performance, commission d'affiliation, don de produit, ou hybride
5. Créer le workflow d'approbation de contenu : revue de brouillon, tours de révision, calendrier de publication
6. Construire la checklist de conformité FTC/ASA : exigences de divulgation, restrictions de revendication, règles spécifiques à la plateforme
7. Définir les droits d'usage : organique uniquement, amplification payante, réutilisation, durée
8. Fixer le cadre de mesure : portée, engagement, clics, conversions, CPE, EMV

## Résultat

Un brief structuré de campagne d'influence contenant :

- Aperçu de la campagne avec objectifs et métriques de succès
- Critères de découverte de créateurs et description du profil idéal
- Document de brief créateur (partageable avec les influenceurs)
- Cadre de messagerie clé avec garde-fous créatifs (incluant toute restriction d'outil IA — voir ci-dessous)
- Structure de rémunération et guidelines de négociation
- Processus d'approbation et de révision de contenu
- Checklist de conformité FTC/ASA avec les divulgations requises
- Droits d'usage et conditions de licence
- Tableau de bord de mesure avec KPI et cadence de reporting

### Clauses d'outils IA pour les briefs créateurs (mai 2026)

Les créateurs utilisent de plus en plus des outils IA image/vidéo (Nano Banana Pro,
Gemini Omni, Veo 3.1, Kling v3.0 Pro, Runway Gen-4, Midjourney ; **remarque :**
l'application grand public Sora d'OpenAI a été abandonnée le 26 avr. 2026 et l'API Sora
prend fin le 24 sept. 2026 — ne pas spécifier Sora dans les nouveaux briefs) dans le
contenu sponsorisé. Le brief doit préciser trois choses pour protéger la marque :

1. **Usage IA autorisé** : Autorisé pour les plans B-roll, l'ambiance, et les visuels
   stylisés. **Non autorisé pour** les représentations synthétiques de personnes
   réelles (y compris le créateur lui-même sous forme altérée), l'imagerie produit
   synthétique qui déforme le produit réel de la marque, ou la voix off générée par IA
   imitant une personne réelle sans autorisation explicite.
2. **Divulgations requises** : Tout visuel ou audio généré par IA dans le contenu
   sponsorisé doit (a) être signalé dans la divulgation IA native de la plateforme du
   créateur (label IA de TikTok, label Meta AI Content, bascule « contenu altéré ou
   synthétique » de YouTube) ET (b) porter des Content Credentials C2PA si le créateur
   livre le fichier à la marque pour amplification payante — fournir le lien du
   workflow `/digital-marketing-pro:c2pa-metadata` dans le brief.
3. **Clause deepfake UE** (obligatoire pour les campagnes diffusées dans l'UE) : Le
   contenu à humain synthétique (échanges de visage, voix IA ressemblant à des
   personnes réelles, image clonée par IA) doit porter une divulgation deepfake
   visible perceptible à distance de visionnage normale. Voir
   `skills/context-engine/compliance-rules.md` §1.1b.i (lignes directrices de mise en
   œuvre de l'Article 50 — FINALES 2026 ; l'Article 50 s'applique le 2 août 2026). Les
   créateurs qui refusent cette clause ne devraient pas être validés pour des
   placements dans l'UE.

## Agents utilisés

- **influencer-manager** — Stratégie créateur, développement de brief, conformité, mesure, architecture de campagne

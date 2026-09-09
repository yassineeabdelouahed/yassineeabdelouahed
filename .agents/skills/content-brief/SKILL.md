---
name: content-brief
description: "Créer un brief de contenu prêt pour la production qu'un rédacteur peut exécuter sans contexte supplémentaire — carte de mots-clés (primaire, secondaires, questions connexes), plan H2/H3 avec points clés et objectifs de nombre de mots, guidance de voix de marque, checklist SEO on-page, spécification visuelle/média avec notes de génération IA et de provenance C2PA, et indicateurs de succès. Se déclenche sur \"/digital-marketing-pro:content-brief\", \"write a brief for this topic\", \"brief a blog post on X\", \"what should this article cover\", \"outline and SEO requirements for a pillar page\". En amont privilégié de /digital-marketing-pro:content-engine. Lit le profil de marque, les guidelines, et les règles de conformité."
argument-hint: "[topic]"
---

# /digital-marketing-pro:content-brief

## Objectif

Créer un brief de contenu prêt pour la production qu'un rédacteur peut exécuter sans contexte supplémentaire. Inclut la stratégie de mots-clés, le plan de contenu, les exigences structurelles, les guidelines de voix de marque, et les spécifications SEO on-page.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Sujet ou titre de travail** : De quoi parle le contenu
- **Type de contenu** : Article de blog, landing page, page pilier, guide, livre blanc, etc.
- **Mot(s)-clé(s) cible(s)** : Mot-clé primaire ou cluster thématique (ou demander une recherche)
- **Audience cible** : Pour qui ce contenu est destiné
- **Étape du tunnel** : Notoriété, considération, ou décision
- **URL concurrentes** : Optionnel — contenu existant à surpasser

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également l'existence de directives** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Rechercher le paysage de mots-clés : mot-clé primaire, mots-clés secondaires, questions connexes
3. Analyser le contenu le mieux classé pour le mot-clé cible afin d'identifier les écarts et les opportunités
4. Définir l'angle de contenu et la proposition de valeur unique par rapport aux résultats existants
5. Construire un plan détaillé avec structure H2/H3, points clés par section, et objectifs de nombre de mots
6. Spécifier les exigences SEO on-page : balise title, meta description, slug d'URL, liens internes, balisage de schéma
7. Documenter les guidelines de voix et de ton spécifiques à cette pièce
8. Définir les indicateurs de succès : classement cible, trafic, engagement, conversions

## Résultat

Un brief de contenu structuré contenant :

- Carte de mots-clés cible (primaire, secondaires, termes connexes/co-occurrents, questions à répondre) — noter le placement des mots-clés (title, intro, ≥2 H2, conclusion, meta), pas un objectif de densité
- Plan de contenu avec hiérarchie de titres et points clés par section
- Objectif de nombre de mots et spécifications de format de contenu
- Guidance de voix et de ton spécifique à cette pièce
- Checklist SEO on-page (title, meta, titres, liens, schéma)
- Exigences visuelles/média — préciser si les visuels sont générés par IA et avec quel modèle (voir la guidance ci-dessous)
- Stratégie de maillage interne et externe
- Indicateurs de succès et plan de mesure

### Spécification visuelle/média — guidance de génération IA (mai 2026)

Si la pièce inclut des images, infographies, ou vidéos courtes générées par IA, le brief doit préciser :

- **Modèle** : `Nano Banana Pro` pour des images fixes haute fidélité avec du texte intégré à l'image (meilleur rendu de texte parmi tous les modèles d'image en date de mai 2026), `Gemini Omni` pour des packages connectés image héroïque + vidéo découpée + audio, ou des alternatives (Midjourney, Firefly, gpt-image-1) pour le travail de concept.
- **Marquage de provenance** : Tous les actifs IA livrés à des lecteurs de l'UE doivent porter des Content Credentials C2PA. Par défaut, « signer tous les visuels IA » — le coût d'exécuter `/digital-marketing-pro:c2pa-metadata` en post-production est négligeable comparé à l'exposition aux sanctions de l'article 50.
- **Signal deepfake / humain synthétique** : Si le visuel inclut un humain photoréaliste (réel ou synthétique), le signaler — les humains synthétiques nécessitent généralement une divulgation visible selon les Lignes directrices finales de l'article 50 de l'UE (applicables au 2 août 2026).
- **Responsable éditorial** : Pour les contenus longs sur la santé, la finance, les élections, ou la sécurité publique, nommer l'éditeur humain qui donnera son aval. Le texte rédigé par IA sur ces sujets nécessite l'exception de responsabilité éditoriale pour se dispenser d'une divulgation de mention « assisté par IA » — voir `skills/context-engine/compliance-rules.md` §1.1b.i.

## Agents utilisés

- **content-creator** — Structure du plan, angle, guidelines de voix, stratégie de contenu
- **seo-specialist** — Recherche de mots-clés, exigences SEO on-page, analyse de contenu concurrentiel

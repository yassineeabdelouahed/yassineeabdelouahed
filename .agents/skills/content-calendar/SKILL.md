---
name: content-calendar
description: "Générer un calendrier de contenu structuré pour un mois, un trimestre, ou une plage personnalisée — sujets associés aux plateformes et dates de publication, tags de pilier de contenu et d'étape de tunnel, chaînes de recyclage à partir de chaque pièce centrale, cibles de mots-clés SEO, et assignations de responsables lorsque la capacité d'équipe est fournie. Se déclenche sur \"/digital-marketing-pro:content-calendar\", \"plan next month's content\", \"build a quarterly editorial calendar\", \"what should we publish in March\", \"map our content pillars to a schedule\". Résultat de planification uniquement — ne planifie ni ne publie aucun post. Lit le profil de marque, les guidelines, et les règles de conformité pour les piliers et la voix."
argument-hint: "[month or quarter]"
---

# /digital-marketing-pro:content-calendar

## Objectif

Générer un calendrier de contenu structuré qui associe les sujets aux plateformes, s'aligne sur les piliers de contenu, et inclut un workflow de recyclage pour maximiser le rendement de chaque pièce centrale.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Période** : Mois, trimestre, ou plage de dates personnalisée
- **Plateformes** : Pour quels canaux planifier (blog, social, e-mail, vidéo, podcast)
- **Piliers de contenu** : Thèmes ou sujets centraux (ou laisser le système recommander en fonction du profil de marque)
- **Cadence de publication** : Fréquence par plateforme (par exemple, 3 blogs/mois, social quotidien)
- **Dates clés** : Lancements de produits, jours fériés, événements sectoriels, promotions
- **Capacité d'équipe** : Qui crée le contenu et quelle bande passante existe

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également l'existence de directives** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Définir ou valider les piliers de contenu en fonction de l'expertise de la marque et des besoins de l'audience
3. Cartographier les dates clés, les tendances saisonnières, et les événements sectoriels sur le calendrier
4. Générer des idées de sujets pour chaque pilier, réparties sur la période
5. Assigner chaque sujet à une plateforme principale et un format de contenu
6. Construire des chaînes de recyclage : blog vers extraits sociaux, vidéo vers clips courts, e-mail vers blog, etc.
7. Équilibrer les types de contenu : éducatif, promotionnel, engagement, leadership éclairé
8. Ajouter des cibles de mots-clés SEO aux pièces de contenu pertinentes
9. Produire le calendrier dans un format structuré et triable

## Résultat

Un calendrier de contenu structuré contenant :

- Vue mensuelle/hebdomadaire avec dates de publication et plateformes
- Sujet et titre pour chaque pièce de contenu
- Tags de pilier de contenu et d'étape de tunnel
- Format principal et déclinaisons de recyclage
- Cibles de mots-clés pour le contenu orienté SEO
- Colonne responsable/assigné (si les informations d'équipe sont fournies)
- Diagramme de workflow de recyclage montrant les chemins d'atomisation du contenu

## Agents utilisés

- **content-creator** — Idéation de sujets, stratégie de piliers, workflows de recyclage, planification éditoriale
- **seo-specialist** — Alignement des mots-clés, timing des tendances de recherche, identification des écarts thématiques
- **social-media-manager** — Cadence de publication spécifique à la plateforme, recommandations de format de contenu, stratégie de hashtags, validation du calendrier

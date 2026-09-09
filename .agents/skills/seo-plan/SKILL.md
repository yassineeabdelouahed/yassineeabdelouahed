---
name: seo-plan
description: "Construit une stratégie SEO sur 12 mois et une feuille de route en phases avec des modèles sectoriels (SaaS, e-commerce, local, éditeur, agence). Avec des sorties de spécialistes récentes, elle fonctionne comme un répartiteur : note quatre piliers — technique, contenu, thématique, recherche IA — et fait du pilier le plus faible le thème directeur du plan ; les spécialistes manquants ne sont relancés qu'après confirmation explicite. Planifie et priorise uniquement — n'effectue aucun changement en production. Se déclenche sur \"/digital-marketing-pro:seo-plan\", \"build an SEO strategy\", \"what should our SEO roadmap be\", \"plan SEO for a new site\", \"which SEO pillar is weakest\". Lit les sorties PLAN.md des spécialistes (tech-seo-audit, content-decay-scan, aeo-audit, backlink-gap, keyword-cluster, seo-drift) ; alimente /digital-marketing-pro:content-engine et /digital-marketing-pro:campaign-plan."
argument-hint: "[business-type]"
user-invocable: true
---

# /digital-marketing-pro:seo-plan

## Objectif

Générer une stratégie SEO complète avec des modèles sectoriels, une analyse concurrentielle, une feuille de route de contenu, et un plan de mise en œuvre en phases. Couvre à la fois le SEO traditionnel et la préparation à la recherche IA.

## Mode répartiteur (Confirmer-Puis-Répartir)

Lorsqu'elle est invoquée sur une marque qui a déjà des sorties de spécialistes récentes dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/`, cette compétence fonctionne comme un **orchestrateur** — elle lit ces sorties comme des entrées, note la marque selon quatre piliers, et utilise le **pilier le plus faible pour piloter le thème directeur** du plan.

### Étape D0 — détecter les sorties récentes (≤ 30 jours)

Rechercher dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/` le dernier sous-dossier daté de chacun de ces éléments :

| Compétence spécialiste | Dossier de sortie |
|---|---|
| `/digital-marketing-pro:tech-seo-audit` | `seo/tech-seo-audit/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:content-decay-scan` | `seo/content-decay-scan/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:aeo-audit` | `seo/aeo-audit/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:backlink-gap` | `seo/backlink-gap/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:gsc-ai-performance` | `seo/gsc-ai-performance/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:keyword-cluster` | `seo/keyword-cluster/{YYYY-MM-DD}/PLAN.md` |
| `/digital-marketing-pro:seo-drift` | `seo/seo-drift/{YYYY-MM-DD}/PLAN.md` |

Tout dossier daté des **30 derniers jours** est considéré comme récent — son `PLAN.md` devient une entrée principale.

### Étape D1 — confirmer avant de relancer les spécialistes manquants

Si certains spécialistes n'ont pas de sortie récente, **ne les relancez pas silencieusement.** Affichez exactement :

```
The following specialist outputs are missing or stale (>30 days old):
  - tech-seo-audit (last: 2026-05-12 — 23 days old)
  - backlink-gap (no run found)
  - gsc-ai-performance (no run found)

Running these now will use approximately N MCP credits / API calls.

Run them now in this session? (y / N — default N)
```

- **Si `y`** — répartir dans cet ordre :
  - **Lot parallèle 1** : `tech-seo-audit`, `backlink-gap`, `aeo-audit`, `gsc-ai-performance` (indépendants)
  - **Séquentiel ensuite** : `content-decay-scan` (dépend de l'inventaire d'URL de `tech-seo-audit`), `keyword-cluster` (dépend de l'ensemble de requêtes de `aeo-audit`)
  - Chaque spécialiste applique son propre garde-fou budgétaire ; remonter les abandons à l'utilisateur
- **Si `N` ou par défaut** — poursuivre ; traiter les éléments manquants comme du travail de Phase 0 (« Découverte ») dans le plan final

### Étape D2 — notation des piliers (le cœur du répartiteur)

Noter chacun des quatre piliers de 1 à 10 sur la base des sorties de spécialistes disponibles :

| Pilier | Sources | À quoi ressemble un 10 |
|---|---|---|
| **Technique** | tech-seo-audit / gsc-ai-performance / données Core Web Vitals | Crawlabilité propre, tous les CWV réussis, schema valide, sitemap exact |
| **Contenu** | content-decay-scan / seo-audit / sorties content-engine | La couverture thématique correspond à la demande de recherche, pas de cannibalisation, fraîcheur ≥ 80 % |
| **Thématique** | keyword-cluster / aeo-geo / entity-audit | Structure pilier+déclinaisons claire, cohérence des entités sur le Knowledge Graph |
| **Recherche IA** | aeo-audit / gsc-ai-performance / aeo-geo | Cité en AI Mode + AI Overviews + ChatGPT + Perplexity pour les requêtes cibles |

**Le pilier au score le plus bas devient le THÈME DIRECTEUR** du plan du prochain trimestre. Tout le reste est du travail de soutien. Cela impose de la concentration.

### Étape D3 — sortie du répartiteur

Produire `${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-plan/{YYYY-MM-DD}/00-pillar-scorecard.md` :

```
Pillar scorecard for {brand} ({date})
=====================================
Technical    : 8 / 10   ✓ healthy
Content      : 6 / 10   ⚠ moderate gaps
Topical      : 4 / 10   ⚠ LEAD THEME — weakest pillar
AI Search    : 7 / 10   ✓ trending up

Lead theme this quarter: Topical authority build-out
(keyword cluster expansion + entity consistency + Knowledge Graph optimisation)
```

Le reste du plan (sections 1 à 6 ci-dessous) est ensuite **construit autour du thème directeur** — le travail de soutien pour les 3 autres piliers reste dans le plan mais ne pilote pas le calendrier / budget.

## Convention de sortie numérotée

L'exécution complète du répartiteur produit, dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-plan/{YYYY-MM-DD}/` :

```
00-pillar-scorecard.md      (issu de l'étape D2)
01-discovery.md             (type d'activité, audience, concurrents — issu du §1 ci-dessous)
02-competitive-analysis.md  (concurrents + synthèse des écarts — issu du §2 + backlink-gap si récent)
03-architecture.md          (hiérarchie d'URL, stratégie de maillage interne — issu du §3 + keyword-cluster si récent)
04-content-strategy.md      (lacunes de contenu, calendrier, E-E-A-T — issu du §4 + content-decay-scan si récent)
05-technical-foundation.md  (hébergement, schema, CWV — issu du §5 + tech-seo-audit si récent)
06-roadmap.md               (feuille de route en phases sur 12 mois — issu du §6, construite autour du thème directeur)
07-industry-template.md     (le modèle appliqué — issu du §Modèles sectoriels)
08-kpi-dashboard.md         (métriques + cadence — ce qui sera remesuré à la prochaine dérive)
PLAN.md                     (le livrable)
```

## Informations requises

- **Type d'activité** : SaaS, e-commerce, service local, éditeur/média, agence, ou général
- **URL du site web** : Site existant (le cas échéant) à évaluer
- **Audience et marchés cibles** : Profils géographiques, démographiques et d'intention
- **Concurrents** : 3 à 5 URL de concurrents pour l'analyse d'écart
- **Budget et calendrier** : Contraintes de ressources
- **KPI** : À quoi ressemble le succès (trafic, classements, conversions, visibilité IA)

## Processus

### 1. Découverte
- Type d'activité, audience cible, concurrents, objectifs
- Évaluation du site actuel (le cas échéant) — santé de crawl, inventaire de contenu, signaux d'autorité
- Contraintes de budget et de calendrier
- Indicateurs clés de performance (KPI) alignés sur les objectifs d'activité

### 2. Analyse concurrentielle
- Identifier les 5 principaux concurrents
- Analyser leur stratégie de contenu, l'usage du schema, la configuration technique
- Identifier les écarts de mots-clés et les opportunités de contenu
- Évaluer leurs signaux E-E-A-T
- Estimer l'autorité de domaine et les profils de liens
- Comparaison de visibilité IA — quels concurrents apparaissent dans les AI Overviews

### 3. Conception de l'architecture
- Concevoir la hiérarchie d'URL et les piliers de contenu selon le modèle économique
- Planifier la stratégie de maillage interne (hub/déclinaisons, clusters thématiques)
- Structure de sitemap avec application des portes qualité
- Architecture de l'information pour les parcours utilisateurs
- Planification de la navigation et du fil d'Ariane

### 4. Stratégie de contenu
- Lacunes de contenu par rapport aux concurrents
- Types de pages et nombres estimés
- Sujets de blog/ressources et cadence de publication
- Plan de renforcement E-E-A-T (bios d'auteur, qualifications, signaux d'expérience)
- Calendrier de contenu avec priorités
- Structure de contenu optimisée pour l'IA (cohérence des entités, formatage propice à la citation)

### 5. Fondations techniques
- Exigences d'hébergement et de performance
- Plan de balisage schema par type de page
- Cibles de référence Core Web Vitals (LCP <2,5 s, INP <200 ms, CLS <0,1)
- Exigences de préparation à la recherche IA
- Considérations mobile-first
- Configuration SEO international (le cas échéant)

### 6. Feuille de route de mise en œuvre (4 phases)

**Phase 1 : Fondations (semaines 1-4)**
- Configuration technique et infrastructure
- Pages principales (accueil, à propos, contact, principaux services/produits)
- Implémentation du schema essentiel (Organization, LocalBusiness, BreadcrumbList)
- Configuration de l'analytics et du suivi (GA4, GSC, suivi de classement)

**Phase 2 : Expansion (semaines 5-12)**
- Création de contenu pour les pages principales
- Lancement du blog avec les premiers articles
- Construction de la structure de maillage interne
- Configuration SEO local (le cas échéant)
- Premières améliorations E-E-A-T (pages auteur, qualifications)

**Phase 3 : Montée en puissance (semaines 13-24)**
- Développement de contenu avancé (pages piliers, clusters thématiques)
- Netlinking et prospection de relations presse digitales
- Optimisation GEO/AEO pour la visibilité en recherche IA
- Optimisation de la performance (CWV, vitesse de page)
- Extension du schema (FAQ, Product, VideoObject selon les cas)

**Phase 4 : Autorité (mois 7-12)**
- Contenu de leadership éclairé
- Relations presse et mentions médiatiques
- Implémentation de schema avancée
- Optimisation continue basée sur les données
- Veille des écarts concurrentiels

## Modèles sectoriels

### SaaS
- Pages principales : fonctionnalités, tarifs, intégrations, cas d'usage, solutions par rôle
- Piliers de contenu : pédagogie produit, tendances sectorielles, contenu comparatif, guides techniques
- Focus schema : SoftwareApplication, Product, FAQPage (si éligible), HowTo (déprécié — utiliser plutôt un format d'article)
- Stratégie de liens : pages de partenaires d'intégration, articles invités sur des blogs tech, annuaires de produits

### Service local
- Pages principales : services, zones de service, à propos, contact, témoignages
- Piliers de contenu : guides de service, contenu de zone locale, contenu FAQ, études de cas
- Focus schema : LocalBusiness, Service, Review, BreadcrumbList, GeoCircle
- Stratégie de liens : annuaires locaux, chambre de commerce, presse locale, implication communautaire

### E-commerce
- Pages principales : catégories, produits, marques, collections, guides d'achat
- Piliers de contenu : pédagogie produit, contenu comparatif, guides d'achat, contenu de tendance
- Focus schema : Product, ProductGroup, Offer, AggregateRating, BreadcrumbList, ItemList
- Stratégie de liens : avis produits, partenariats affiliés, relations avec les fabricants

### Éditeur/Média
- Pages principales : rubriques, pages thématiques, pages auteur, à propos, charte éditoriale
- Piliers de contenu : couverture d'actualité, analyse, opinion, investigation, journalisme de données
- Focus schema : Article, NewsArticle, Person (auteurs), Organization, VideoObject
- Stratégie de liens : citations de recherche originale, sourcing d'experts, exclusivités de données

### Agence
- Pages principales : services, secteurs, études de cas, équipe, méthodologie
- Piliers de contenu : expertise sectorielle, contenu de méthodologie, études de cas, leadership éclairé
- Focus schema : Organization, Service, Person (équipe), Article
- Stratégie de liens : mises en avant d'études de cas, interventions publiques, publications sectorielles, co-marketing client

## Résultat

### Livrables
- **Document de stratégie SEO** : Plan stratégique complet avec contexte d'activité, paysage concurrentiel, et direction stratégique
- **Analyse concurrentielle** : Écarts de mots-clés, écarts de contenu, comparaison d'autorité, comparaison de visibilité IA
- **Calendrier de contenu** : Feuille de route de contenu sur 12 semaines avec sujets, formats, mots-clés, et calendrier de publication
- **Feuille de route de mise en œuvre** : Plan d'action en phases avec jalons, responsabilités, et points de mesure
- **Plan d'architecture du site** : Hiérarchie d'URL, structure de piliers de contenu, stratégie de maillage interne
- **Plan de balisage schema** : Recommandations de schema par type de page avec modèles JSON-LD
- **Spécification du tableau de bord KPI** : Métriques à suivre, outils nécessaires, cadence de reporting

## Agents utilisés

- **seo-specialist** — Stratégie, analyse concurrentielle, planification technique
- **content-creator** — Stratégie de contenu et planification de calendrier
- **competitive-intel** — Analyse concurrentielle et identification des écarts
- **marketing-strategist** — Alignement d'activité et cadre de KPI

## Scripts utilisés

- **competitor-scraper.py** — Analyse du site des concurrents
- **tech-seo-auditor.py** — Évaluation technique du site actuel
- **keyword_cluster.py** — Clustering de mots-clés avec chevauchement SERP + tableau de bord qualité (à utiliser via `/digital-marketing-pro:keyword-cluster`)
- **content-scorer.py** — Référence de qualité du contenu actuel

## Tableau de bord qualité

Chaque `PLAN.md` produit par cette compétence doit franchir ces portes avant d'être déclaré prêt :

| Porte | Ce qu'elle vérifie |
|---|---|
| **lead_theme_named** | `00-pillar-scorecard.md` existe et nomme exactement un pilier le plus faible comme thème directeur |
| **specialist_coverage** | Au moins 3 des 7 sources spécialistes ont des sorties récentes (≤30 jours) |
| **roadmap_phased** | La feuille de route a des dates explicites de Phase 1/2/3/4 avec des responsables |
| **kpi_attached** | `08-kpi-dashboard.md` liste ≥3 métriques retardées + ≥3 métriques avancées |
| **drift_re-measure_scheduled** | Le tableau de bord KPI inclut une cadence récurrente de `seo-drift` (par défaut : trimestrielle) |

Si une porte échoue, faites apparaître l'échec de façon visible dans `PLAN.md` plutôt que de livrer silencieusement. (Le répartiteur est piloté par la compétence — il n'y a pas de script orchestrateur séparé ; la vérification des portes fait partie de l'assemblage de `PLAN.md`.)

## Transmissions de la chaîne

Cette compétence est à la fois un consommateur (des spécialistes) et un producteur (du plan maître) :

**En amont (spécialistes que cette compétence consulte) :**
- `/digital-marketing-pro:tech-seo-audit`
- `/digital-marketing-pro:content-decay-scan`
- `/digital-marketing-pro:aeo-audit`
- `/digital-marketing-pro:backlink-gap`
- `/digital-marketing-pro:gsc-ai-performance`
- `/digital-marketing-pro:keyword-cluster`
- `/digital-marketing-pro:seo-drift`

**En aval (compétences qui consomment ce plan) :**
- `/digital-marketing-pro:content-engine` — rédige le contenu planifié dans `04-content-strategy.md`
- `/digital-marketing-pro:campaign-plan` — transforme la feuille de route en plan de sprint avec des responsables
- `/digital-marketing-pro:performance-report` — remesure selon la cadence de `08-kpi-dashboard.md`

## Astuces et mises en garde

- **Le comportement par défaut du répartiteur est de ne pas répartir.** Si des spécialistes manquent, la réponse par défaut est `N` — les lister comme travail de Phase 0. Ne relancer automatiquement que sur un `y` explicite. Cela évite une dépense accidentelle de crédits/appels API.
- **La notation des piliers relève du jugement, pas de la mesure.** Un pilier Thématique à `4/10` signifie « nous n'avons pas de structure d'autorité claire », pas « Google l'a dit ». Les chiffres sont heuristiques. Utilisez-les pour concentrer le thème directeur, pas comme des KPI.
- **Le thème directeur devrait changer chaque trimestre.** Si le même pilier reste thème directeur deux trimestres de suite, soit le travail ne fait pas bouger l'aiguille (à escalader), soit la notation est erronée (à recalibrer avec des données actuelles).
- **N'exécutez pas ceci au jour 1 d'un engagement.** Exécutez d'abord les spécialistes afin que le répartiteur dispose d'entrées récentes. La première exécution de `seo-plan` sur une nouvelle marque sera surtout du travail de Phase 0 (Découverte).
- **Pour les clients YMYL,** ajoutez manuellement l'E-E-A-T comme 5e pilier (la notation standard à 4 piliers ne pondère pas séparément les signaux d'autorité).
- **La fenêtre de fraîcheur de 30 jours est une valeur par défaut,** pas une règle. Pour les secteurs à forte vélocité (actualité, lancements SaaS), raccourcissez à 14 jours. Pour les catégories à évolution lente (industrie manufacturière, services B2B), 60 jours conviennent.

## Efficacité de contexte

Les entrées principales de cette compétence sont les sorties `PLAN.md` des spécialistes dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/` (voir le tableau d'entrées ci-dessus) — celles-ci peuvent totaliser ~30-50 Ko. Ne les chargez pas de façon anticipée — sélectionnez des sections ciblées :

- **Grep avant Read.** Trouvez d'abord le mot-clé ou le titre de section, puis lisez (`Read`) avec `offset` + `limit` pour ne récupérer que cette plage.
- **Parcourez `${CLAUDE_SKILL_DIR}` une seule fois.** Utilisez un seul listing de répertoire pour voir ce qui s'y trouve, puis ne lisez que les fichiers correspondant à votre étape actuelle.
- **Une source à la fois.** Si le flux de travail dit « consultez trois fichiers de référence », lisez-les séquentiellement après avoir décidé ce dont vous avez besoin dans chacun. Charger les trois en masse dépasse le budget de 5K tokens par compétence que réserve la compaction automatique.
- **Éliminez le bruit des entrées CSV.** Si l'entrée est un CSV volumineux, faites d'abord un grep de la ligne d'en-tête pour sélectionner les colonnes, puis traitez ligne par ligne — ne lisez pas (`Read`) le fichier entier dans le contexte.

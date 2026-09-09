---
name: programmatic-seo
description: "Planifier ou auditer des pages SEO générées à l'échelle à partir de données structurées — qualité de la source de données, unicité des modèles, motifs d'URL, maillage interne, canoniques, sitemaps, et prévention du gonflement de l'index — en appliquant des garde-fous qualité stricts contre le contenu léger et la politique de Google sur l'abus de contenu à l'échelle (seuils d'unicité, limites de déploiement par lot, test de valeur autonome). Produit une scorecard sur /100 avec des correctifs priorisés et un plan de déploiement progressif. Se déclenche sur \"/digital-marketing-pro:programmatic-seo\", \"plan programmatic landing pages\", \"audit our location pages\", \"will 5000 generated pages get us penalized\", \"design a template engine for pSEO\". Lit le profil de marque et les guidelines ; planifie et audite uniquement — il ne génère ni ne publie les pages."
argument-hint: "[URL or plan]"
user-invocable: true
---

# /digital-marketing-pro:programmatic-seo

## Objectif

Planifier et auditer des pages SEO générées à l'échelle à partir de sources de données structurées (bases de données, API, fichiers CSV/JSON). Applique des garde-fous qualité pour prévenir les pénalités de contenu léger, le gonflement de l'index, et la politique de Google sur l'abus de contenu à l'échelle.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **URL ou source de données** : Pages programmatiques existantes à auditer, ou détails de source de données pour la planification
- **Type de page** : Quel type de pages est généré (localisation, produit, intégration, glossaire, modèle, outil)
- **Source de données** : Fichiers CSV/JSON, points de terminaison API, requêtes de base de données — ou pages existantes à analyser
- **Échelle cible** : Combien de pages seront générées
- **Statut actuel** : Nouvelle construction ou audit de pages programmatiques existantes

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer le contexte sectoriel et les règles de conformité. Vérifier les guidelines de marque à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json`.
2. **Évaluation de la source de données** : Évaluer les données alimentant les pages programmatiques — nombre de lignes, unicité des colonnes, valeurs manquantes, détection de doublons (>80 % de chevauchement de champs), fraîcheur des données
3. **Planification du moteur de modèles** : Concevoir des modèles produisant des pages véritablement uniques — points d'injection de variables, blocs de contenu (statique vs dynamique), logique conditionnelle, contenu supplémentaire. Valider que chaque page passe le « test de valeur autonome »
4. **Stratégie de motifs d'URL** : Concevoir la hiérarchie d'URL — slugs en minuscules avec traits d'union, structure logique, application de l'unicité, moins de 100 caractères, usage cohérent du slash final
5. **Automatisation du maillage interne** : Modèle hub/rayon, éléments associés (3-5 par page), fils d'Ariane avec schema BreadcrumbList, maillage croisé par attributs partagés, texte d'ancre varié
6. **Contrôle de garde-fou de contenu léger** : Appliquer les garde-fous qualité (voir ci-dessous)
7. **Stratégie canonique** : Canoniques auto-référencés, gestion des paramètres, stratégie de pagination, priorité des pages manuelles
8. **Intégration du sitemap** : Générer automatiquement les entrées, découper à 50K URL, `<lastmod>` depuis les horodatages réels des données, exclure les pages en noindex
9. **Prévention du gonflement de l'index** : Noindex des pages à faible valeur, gestion de la pagination, canonicalisation de la navigation à facettes, surveillance du budget de crawl pour 10K+ pages
10. **Noter et rapporter** : Noter chaque dimension, produire un plan d'action priorisé

## Garde-fous qualité

### Seuils d'échelle

| Métrique | Seuil | Action |
|--------|-----------|--------|
| Pages sans revue de contenu | 100+ | AVERTISSEMENT : exiger un audit de contenu avant publication |
| Pages sans justification | 500+ | ARRÊT STRICT : exiger l'approbation explicite de l'utilisateur et un audit de contenu léger |
| Contenu unique par page | <40 % | Signaler comme contenu léger (risque de pénalité) |
| Contenu unique par page | <30 % | ARRÊT STRICT : risque d'abus de contenu à l'échelle |
| Nombre de mots par page | <300 | Signaler pour revue (peut manquer de valeur suffisante) |

### Contexte de l'abus de contenu à l'échelle (2025-2026)

La politique de Google sur l'abus de contenu à l'échelle (introduite en mars 2024) a connu une escalade majeure d'application :

- **Juin 2025** : Vague d'actions manuelles ciblant le contenu généré par IA à l'échelle
- **Août 2025** : La mise à jour SpamBrain a amélioré la détection de motifs pour les schémas de liens et les fermes de contenu générés par IA
- **Résultat** : Réduction de 45 % du contenu de faible qualité et non original dans les résultats de recherche

**Garde-fous qualité renforcés pour les pages programmatiques :**

- **Différenciation du contenu** : 30-40 %+ du contenu doit être véritablement unique entre deux pages programmatiques (pas seulement le remplacement d'une chaîne ville/mot-clé)
- **Revue humaine** : Échantillon minimum de 5-10 % de pages générées revues avant publication
- **Déploiement progressif** : Publier par lots de 50-100 pages. Surveiller l'indexation et le classement pendant 2-4 semaines avant d'étendre. Ne jamais publier 500+ pages simultanément sans revue qualité.
- **Test de valeur autonome** : Chaque page devrait passer ce test : « Cette page vaudrait-elle la peine d'être publiée même si aucune autre page similaire n'existait ? »
- **Abus de réputation de site** : Publier du contenu programmatique sous un domaine à forte autorité (qui n'est pas le vôtre) peut déclencher des pénalités d'abus de réputation de site (appliquées de manière agressive depuis novembre 2024)

### Pages programmatiques sûres vs risquées

**Sûres à l'échelle :**
- Pages d'intégration (avec de vrais documents de configuration, détails API, captures d'écran)
- Pages de modèle/outil (avec du contenu téléchargeable, instructions d'utilisation)
- Pages de glossaire (définitions de 200+ mots avec exemples, termes associés)
- Pages produit (spécifications uniques, avis, données comparatives)
- Pages pilotées par les données (statistiques uniques, graphiques, analyse par enregistrement)

**Risque de pénalité à l'échelle :**
- Pages de localisation avec seulement le nom de la ville remplacé dans un texte identique
- « Meilleur [outil] pour [secteur] » sans valeur spécifique au secteur
- « Alternative à [concurrent] » sans véritables données comparatives
- Pages générées par IA sans revue humaine ni valeur ajoutée unique
- Pages où >60 % du contenu est du boilerplate de modèle partagé

### Calcul de l'unicité

% de contenu unique = (mots uniques à cette page) / (total des mots sur la page) x 100

Mesuré par rapport à toutes les autres pages de l'ensemble programmatique. Les en-têtes, pieds de page, et navigation partagés sont exclus. Le boilerplate de modèle EST inclus.

## Bibliothèque de motifs d'URL

### Motifs courants
- `/tools/[tool-name]` : Pages de répertoire d'outil/produit
- `/[city]/[service]` : Pages localisation + service
- `/integrations/[platform]` : Pages de landing d'intégration
- `/glossary/[term]` : Pages de définition/référence
- `/templates/[template-name]` : Pages de modèle téléchargeable
- `/compare/[product-a]-vs-[product-b]` : Pages de comparaison

### Règles d'URL
- Slugs en minuscules avec traits d'union dérivés des données
- Hiérarchie logique reflétant l'architecture du site
- Pas de slugs dupliqués — appliquer l'unicité au moment de la génération
- Garder les URL sous 100 caractères
- Pas de paramètres de requête pour les URL de contenu principal
- Usage cohérent du slash final (correspondre au motif existant du site)

## Résultat

Une évaluation SEO programmatique structurée contenant :

### Score SEO programmatique : XX/100

| Catégorie | Statut | Score |
|----------|--------|-------|
| Qualité des données | score | /100 |
| Unicité des modèles | score | /100 |
| Structure d'URL | score | /100 |
| Maillage interne | score | /100 |
| Risque de contenu léger | score | /100 |
| Gestion de l'index | score | /100 |

- Problèmes critiques (à corriger immédiatement)
- Priorité élevée (à corriger sous 1 semaine)
- Priorité moyenne (à corriger sous 1 mois)
- Recommandations : améliorations de la source de données, modifications de modèle, ajustements de motifs d'URL, actions de conformité aux garde-fous qualité
- Plan de déploiement progressif avec tailles de lot et points de contrôle de surveillance

## Agents utilisés

- **seo-specialist** — Analyse de page programmatique, application des garde-fous qualité, stratégie d'URL, évaluation de modèle
- **content-creator** — Conception de contenu de modèle, optimisation de l'unicité

## Scripts utilisés

- **tech-seo-auditor.py** — Vérifier les problèmes SEO techniques sur des échantillons de pages programmatiques
- **content-scorer.py** — Noter la qualité et l'unicité du contenu par modèle
- **competitor-scraper.py** — Analyser les motifs de pages programmatiques des concurrents

---
name: tech-seo-audit
description: "Réaliser un audit SEO technique d'un site — crawlabilité, indexation, Core Web Vitals, redirections, données structurées, mobile, sécurité — et produire un rapport classé par sévérité avec des correctifs précis, des estimations d'effort et des gains rapides. Se déclenche sur \"/digital-marketing-pro:tech-seo-audit\", \"audit my site's technical SEO\", \"why isn't Google indexing my pages\", \"check Core Web Vitals\", \"find crawl errors on my site\". Lit le profil de marque et les fichiers de référence de /digital-marketing-pro:technical-seo ; le travail sur le profil de liens est hors périmètre — se combine avec /digital-marketing-pro:seo-audit pour le volet contenu et E-E-A-T et /digital-marketing-pro:backlink-gap pour les lacunes de liens concurrentiels."
argument-hint: "[URL]"
---

# /digital-marketing-pro:tech-seo-audit

## Objectif

Réaliser un audit SEO technique complet couvrant les facteurs d'infrastructure et de niveau code qui affectent le crawl, l'indexation et le classement par les moteurs de recherche. Cet audit se concentre sur les fondations techniques plutôt que sur le contenu ou les backlinks. Produit un rapport priorisé avec des correctifs précis, l'impact attendu et des instructions de mise en œuvre.

### Important — SEO technique pendant la Core Update de mai 2026

> **Consigne limitée dans le temps — valable jusqu'à ~2026-08.** Ce bloc est spécifique à la fenêtre de la Core Update de mai 2026. Après ~août 2026, il est obsolète : revérifier le [Tableau de bord de statut Google Search](https://status.search.google.com/) pour connaître la Core Update actuelle/la plus récente et ses dates avant d'appliquer les conseils de timing ci-dessous.

La **Core Update large de Google débutée le 21 mai 2026** est principalement une repondération de la qualité/pertinence, et non un changement de signal technique. Si une marque vous contacte au sujet d'une volatilité de classement en mai/juin 2026 :

- **Réalisez cet audit malgré tout** — les Core Updates font fréquemment remonter une dette technique préexistante, car la qualité relative compte davantage pendant une repondération. Le gaspillage de budget de crawl sur des pages de faible qualité, les chaînes de canonicalisation cassées, les soft-404, et les routes rendues en JS orphelines amplifient tous les dommages d'une Core Update.
- **Résistez aux « correctifs » de crawler/rendu présentés comme des remèdes à la Core Update.** Aucun changement technique n'annulera l'impact d'une Core Update si le problème de qualité de contenu sous-jacent n'est pas traité. Associez cet audit à `/digital-marketing-pro:seo-audit` (volet contenu/E-E-A-T) — les deux sont nécessaires.
- **Hreflang, données structurées et Core Web Vitals conservent leur poids habituel** — la mise à jour n'a pas changé les priorités techniques, seulement l'ampleur avec laquelle les déficits E-E-A-T nuisent au classement.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **URL du site** (obligatoire) : le domaine ou la section spécifique à auditer
- **CMS/Plateforme** (utile) : WordPress, Shopify, Next.js, sur mesure, etc.
- **Problèmes connus** (optionnel) : toute préoccupation technique spécifique
- **Taille du site** (utile) : nombre approximatif de pages
- **Présence internationale** (optionnel) : si le site sert plusieurs pays/langues
- **Accès aux données de Google Search Console** (optionnel) : permet d'utiliser des données réelles plutôt que des estimations

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifier aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Charger les fichiers de référence** : lire `skills/technical-seo/core-web-vitals.md`, `skills/technical-seo/crawlability.md`, `skills/technical-seo/site-architecture.md`, `skills/technical-seo/indexation.md`, et `skills/technical-seo/international-seo.md` pour les cadres SEO techniques détaillés
3. **Exécuter le script tech-seo-auditor** (si Python est disponible) : `python "${CLAUDE_PLUGIN_ROOT}/scripts/tech-seo-auditor.py" --url {url}` pour obtenir des vérifications automatisées sur les codes de statut, les redirections, les balises meta et la structure des pages
4. **Évaluation des Core Web Vitals** : évaluer LCP, INP et CLS à l'aide des seuils connus. Si le MCP GSC est connecté, récupérer les données CrUX réelles. Sinon, fournir une checklist d'optimisation basée sur le CMS/la plateforme
5. **Audit de crawlabilité** : vérifier la configuration de robots.txt, la présence et la structure du sitemap XML, les considérations de budget de crawl, l'impact du rendu JavaScript
6. **Revue de l'indexation** : utilisation des balises canoniques, directives meta robots, risques de contenu dupliqué, potentiel de gonflement de l'index, gestion de la pagination
7. **Analyse de l'architecture du site** : structure des URL, schémas de maillage interne, profondeur du site, efficacité de la navigation, fil d'Ariane
8. **Optimisation de la vitesse de page** : optimisation des images, ressources bloquant le rendu, compression, mise en cache, utilisation d'un CDN
9. **Conformité mobile-first** : configuration du viewport, design responsive, utilisabilité mobile, zones tactiles
10. **Bilan de santé des redirections** : détection des chaînes de redirection, mélange HTTP/HTTPS, cohérence des barres obliques finales
11. **Revue des données structurées** : présence du balisage schema, validation, exhaustivité, identification des opportunités
12. **SEO international** (si applicable) : implémentation du hreflang, ciblage linguistique, structure des URL
13. **Vérification de sécurité** : application de HTTPS, HSTS, contenu mixte
14. Compiler un rapport priorisé : regrouper les constats par sévérité (Critique / Élevée / Moyenne / Faible), inclure des instructions de correctif précises, l'effort estimé, et l'impact attendu pour chaque problème

## Sortie

Un rapport d'audit SEO technique structuré contenant :

- **En-tête de l'audit** : nom de la marque, URL, date, CMS/plateforme, score de santé global (0-100)
- **Résumé exécutif** : aperçu de 3 à 5 phrases de la santé technique
- **Problèmes critiques** (à corriger immédiatement) : problèmes bloquant le crawl, l'indexation, ou causant un impact significatif sur le classement
- **Priorité élevée** (à corriger cette semaine) : problèmes ayant un impact mesurable sur le classement ou l'UX
- **Priorité moyenne** (à corriger ce mois-ci) : opportunités d'optimisation à impact modéré
- **Priorité faible** (backlog) : améliorations mineures et alignement sur les bonnes pratiques
- **Chaque constat inclut** : description, URL/pages concernées, correctif précis avec exemples de code/configuration, effort estimé (heures), impact attendu (trafic/classement)
- **Tableau de bord Core Web Vitals** : LCP, INP, CLS avec estimations actuelles et valeurs cibles
- **Liste des gains rapides** : top 5 des correctifs à plus fort impact et moindre effort
- **Feuille de route de mise en œuvre** : calendrier suggéré pour traiter tous les constats

## Conseils et mises en garde

- **Les Core Web Vitals issus de tests synthétiques (Lighthouse, PageSpeed Insights) divergent souvent des données terrain (CrUX, GSC).** Les données terrain sont celles sur lesquelles Google classe. Si le labo indique PASS mais le terrain indique FAIL, faites confiance au terrain.
- **Le rendu JavaScript est le tueur silencieux n°1** de l'indexation sur les sites modernes. Vérifiez toujours si le HTML rendu (post-JS) correspond au HTML source sur le contenu critique. Utilisez `view-source:` en comparaison avec DevTools.
- **Ne réparez pas ce qui n'est pas cassé.** Un site au 95e percentile de CWV n'a pas besoin d'être réingénieré — cet effort est mieux investi dans le contenu. Le SEO technique est nécessaire, mais pas suffisant.
- **Les conflits entre robots.txt et meta robots** sont fréquents. Si les deux se déclenchent, Google obéit à la directive la plus restrictive. Toujours vérifier les deux.
- **Pour une fenêtre de Core Update,** réalisez cet audit malgré tout — les Core Updates font souvent remonter une dette technique préexistante, mais les correctifs relèvent du travail de fond, pas de remèdes à la Core Update.
- **Le travail sur le profil de liens est hors périmètre pour cet audit technique.** Cet audit couvre la santé *technique* du domaine propre (crawlabilité, indexation, redirections, canoniques, CWV, schema) — pas les backlinks. Pour la santé des liens du domaine propre, voir `/digital-marketing-pro:seo-audit` ; pour l'analyse des écarts de liens concurrentiels, orienter vers `/digital-marketing-pro:backlink-gap`.

## Agents utilisés

- **seo-specialist** — Exécute l'audit technique sur toutes les dimensions, génère des recommandations de données structurées, fournit des conseils de correctif spécifiques au CMS, priorise les constats par impact/effort
</content>

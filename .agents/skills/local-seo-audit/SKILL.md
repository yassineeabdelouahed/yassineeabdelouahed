---
name: local-seo-audit
description: "Réaliser un audit SEO local complet — exhaustivité de la fiche Google Business Profile, cohérence NAP, citations, avis, pages de localisation, schema local, opportunités de netlinking local, et benchmark concurrentiel — noté de 0 à 100 et compilé en un rapport priorisé avec les 5 principaux gains rapides et un plan d'action semaine par semaine sur 90 jours. Se déclenche sur \"/digital-marketing-pro:local-seo-audit\", \"audit our local SEO\", \"how healthy is our Google Business Profile\", \"check our citations and NAP\", \"why did we drop out of the local pack\". Exécute le script local-seo-checker lorsque Python est disponible, lit le profil de marque et les règles de conformité, et s'appuie sur les cadres de référence de /digital-marketing-pro:local-seo pour la fiche GBP, les citations, le contenu local et le multi-établissements."
---

# /digital-marketing-pro:local-seo-audit

## Objectif

Réaliser un audit SEO local complet qui évalue tous les facteurs affectant la visibilité en recherche locale : exhaustivité de la fiche Google Business Profile, cohérence NAP, présence de citations, contenu local, avis et schema local. Produit un plan d'action priorisé pour améliorer les classements dans le pack local et générer du trafic en magasin ou des demandes de service.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom et adresse de l'entreprise** (obligatoire) : NAP complet (Nom, Adresse, Téléphone)
- **URL de la fiche Google Business Profile** (utile) : Lien direct vers la fiche GBP
- **Nombre d'établissements** (obligatoire) : Établissement unique, ou nombre d'établissements
- **Zone de service** (utile) : Zone géographique desservie
- **Secteur d'activité** (utile) : Pour les sources de citations sectorielles et les benchmarks
- **Nombre d'avis et note actuels** (optionnel) : Métriques de référence
- **Concurrents** (optionnel) : Concurrents locaux à comparer
- **URL du site web** (obligatoire) : Pour l'audit des pages de localisation et du schema

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier aussi les guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier l'existence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Charger les fichiers de référence** : Lire `skills/local-seo/gbp-optimization.md`, `skills/local-seo/citation-management.md`, `skills/local-seo/local-content.md`, et `skills/local-seo/multi-location.md` pour les cadres de SEO local
3. **Exécuter le script local-seo-checker** (si Python est disponible) : `python "${CLAUDE_PLUGIN_ROOT}/scripts/local-seo-checker.py" --nap '{"name":"...","address":"...","phone":"..."}' --industry {industry}` pour la notation de la cohérence NAP et de l'exhaustivité GBP
4. **Audit de la fiche GBP** : Évaluer l'exhaustivité, la sélection de catégorie, les attributs, les photos, les publications, les questions-réponses, les services/produits, la description de l'entreprise, l'exactitude des horaires
5. **Vérification de la cohérence NAP** : Évaluer la cohérence du nom, de l'adresse et du téléphone sur les sources de citations connues du secteur
6. **Audit de citations** : Évaluer la présence de citations sur les principaux annuaires généraux et sectoriels. Identifier les fiches manquantes, incohérentes ou en double
7. **Analyse de mots-clés locaux** : Identifier les opportunités de mots-clés géo-modifiés, le potentiel d'optimisation « near me », les termes service+localisation
8. **Revue des pages de localisation** : Évaluer les pages de localisation sur site pour le contenu unique, le balisage schema, le maillage interne et les éléments de conversion
9. **Analyse du profil d'avis** : Volume d'avis, note moyenne, taux de réponse, qualité des réponses, tendances de sentiment, comparaison concurrentielle
10. **Audit du schema local** : Vérifier la mise en œuvre du schema LocalBusiness, GeoCoordinates, OpeningHours, AggregateRating, Review
11. **Profil de netlinking local** : Évaluer les opportunités de liens locaux (chambres de commerce, sponsorings, organisations communautaires, médias locaux)
12. **Benchmark concurrentiel local** : Comparer l'exhaustivité GBP, le volume d'avis, le nombre de citations et le contenu local par rapport à 2-3 concurrents locaux
13. Compiler un rapport priorisé : Regrouper par impact, inclure des actions spécifiques, des benchmarks, et l'amélioration attendue du classement local

## Résultat

Un rapport d'audit SEO local structuré contenant :

- **En-tête de l'audit** : Nom de la marque, établissement(s), date, score global de visibilité locale (0-100)
- **Scorecard GBP** : Score d'exhaustivité avec actions d'optimisation spécifiques par section
- **Rapport de cohérence NAP** : Statut sur les principales sources de citations, incohérences signalées
- **Rapport de citations** : Citations présentes, manquantes, incorrectes, en double, avec actions à mener
- **Analyse des avis** : Volume, note, taux de réponse, sentiment, avec objectifs cibles
- **Évaluation des pages de localisation** : Qualité du contenu, schema, recommandations d'optimisation
- **Opportunités de mots-clés locaux** : Termes géo-modifiés avec volume et concurrence estimés
- **Benchmarks concurrentiels** : Comparaison côte à côte sur les principaux signaux locaux
- **Gains rapides** : Les 5 actions les plus impactantes et les plus rapides
- **Plan d'action SEO local sur 90 jours** : Feuille de route de mise en œuvre semaine par semaine

## Agents utilisés

- **seo-specialist** — Exécute l'audit SEO local, évalue les opportunités d'optimisation GBP, revoit le schema local, effectue le benchmark concurrentiel, génère le plan d'action priorisé

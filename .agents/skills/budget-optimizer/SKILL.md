---
name: budget-optimizer
description: "Réallouer les dépenses marketing entre canaux à l'aide de données de performance et d'une modélisation des rendements décroissants — produit un tableau d'allocation actuelle vs optimisée, des fourchettes de ROI projeté avec intervalles de confiance, un calendrier de réallocation progressif sur 4 à 8 semaines et une réserve de test de 10 à 15 %. Ne fait que recommander des ajustements ; ne modifie jamais les dépenses sur aucune plateforme. Se déclenche sur \"/digital-marketing-pro:budget-optimizer\", \"optimize my marketing budget\", \"which channels should get more spend\", \"reallocate budget based on ROAS\", \"is our channel split right\". Lit le profil de marque et les guidelines, exécute scripts/budget-optimizer.py, et se combine avec /digital-marketing-pro:budget-tracker pour le suivi en temps réel."
argument-hint: "[total-budget]"
---

# /digital-marketing-pro:budget-optimizer

## Objectif

Optimisation du budget marketing multi-canaux pilotée par les données, en s'appuyant sur les données de performance et les référentiels sectoriels. Analyse l'efficacité des dépenses actuelles, modélise les rendements décroissants par canal, et produit une allocation optimisée avec une amélioration de ROI projetée et un calendrier de réallocation progressif.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Budget actuel par canal** : comment les dépenses sont réparties aujourd'hui (ex. : recherche payante, réseaux sociaux payants, SEO, e-mail, contenu, display, affiliation, événements, etc.)
- **Données de performance par canal** : indicateurs clés par canal — dépenses, chiffre d'affaires ou conversions, CPA, ROAS et volume de conversions sur la période de mesure
- **Budget total disponible** : budget marketing global pour la période d'optimisation (mensuel, trimestriel ou annuel)
- **Objectifs business** : objectif principal — maximiser le chiffre d'affaires, minimiser le CPA, atteindre un objectif précis de leads ou de revenus, équilibrer croissance et efficacité
- **Contraintes** : exigences de dépense minimale, canaux imposés par la direction, considérations saisonnières, engagements contractuels ou minimums de plateforme
- **Période de mesure** : plage temporelle couverte par les données de performance (30, 60, 90 derniers jours, ou plage personnalisée)
- **Modèle d'attribution** : comment les conversions sont actuellement attribuées (dernier clic, premier clic, linéaire, data-driven, ou inconnu)
- **Facteurs de saisonnalité** : pics saisonniers à venir, périodes promotionnelles ou événements sectoriels affectant la performance des canaux
- **Contexte historique** : les données de performance reflètent-elles une période typique ou ont-elles été influencées par un événement ponctuel (lancement produit, moment viral, panne)

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifiez aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions et les fichiers de catégorie pertinents. Vérifiez les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Exécuter le script budget-optimizer.py** : lancez `python "${CLAUDE_PLUGIN_ROOT}/scripts/budget-optimizer.py" --channels '[{"name":"google_ads","spend":10000,"roas":4.2}]' --total-budget {amount}` (`--total-budget` est requis ; transmettez les données par canal via `--channels` en JSON ou via `--file`) pour calculer les indicateurs d'efficacité de référence et générer des scénarios d'optimisation
3. **Calculer les indicateurs d'efficacité par canal** : calculez le ROAS, le CPA, le coût par lead, le chiffre d'affaires par dollar dépensé, la marge de contribution et le coût marginal d'acquisition pour chaque canal
4. **Classer les canaux par efficacité marginale** : ordonnez les canaux selon le rendement incrémental par dollar supplémentaire dépensé, en tenant compte des niveaux de saturation actuels et des tendances de performance historiques
5. **Appliquer un modèle de rendements décroissants** : modélisez la façon dont l'efficacité de chaque canal se dégrade quand les dépenses augmentent — identifiez le point d'inflexion et le plafond de saturation de chaque canal
6. **Générer l'allocation optimisée** : redistribuez le budget pour maximiser l'objectif fixé, tout en respectant toutes les contraintes et les seuils de dépense minimale viable
7. **Comparer allocation actuelle vs optimisée** : construisez une comparaison côte à côte montrant les transferts de dépenses, les évolutions projetées des indicateurs et l'amélioration nette sur tous les KPI
8. **Projeter l'amélioration du ROI** : estimez les gains totaux en chiffre d'affaires, volume de conversions, ROAS et CPA issus de la réallocation, avec intervalles de confiance
9. **Tenir compte des seuils de dépense minimale viable** : veillez à ce qu'aucun canal ne descende sous le minimum nécessaire pour générer des données significatives, maintenir une compétitivité en enchères ou remplir des obligations contractuelles
10. **Inclure un budget de test** : réservez 10 à 15 % du budget total pour l'expérimentation — nouveaux canaux, tests créatifs, extension d'audience ou plateformes émergentes
11. **Signaler les réserves liées à l'attribution** : notez où les limites du modèle d'attribution peuvent fausser les calculs d'efficacité et recommandez des ajustements
12. **Créer un calendrier de réallocation** : échelonnez les transferts de budget sur 4 à 8 semaines pour éviter toute perturbation de la performance — montée et descente en puissance progressives, avec points de contrôle hebdomadaires et déclencheurs de retour en arrière

## Résultat

Un plan d'optimisation budgétaire structuré contenant :

- **Tableau d'allocation actuelle vs optimisée** : budgets par canal côte à côte, avec montants en dollars, pourcentage du total et évolution par rapport à l'existant
- **Amélioration de ROI projetée** : gains attendus en chiffre d'affaires, conversions, ROAS et CPA, avec fourchettes de confiance
- **Classement de l'efficacité par canal** : canaux classés par rendement marginal, avec courbes de rendements décroissants et indicateurs de saturation
- **Recommandations de réallocation** : transferts précis en dollars, avec une justification claire pour chaque hausse, baisse ou maintien
- **Comparaison de scénarios** : projections optimiste, attendue et conservatrice pour l'allocation optimisée
- **Calendrier de mise en œuvre** : planning de réallocation échelonné, avec points de contrôle hebdomadaires, déclencheurs de performance et critères de retour en arrière
- **Évaluation des risques** : inconvénients potentiels de chaque transfert, alertes sur les dépenses minimales viables, angles morts d'attribution et stratégies d'atténuation
- **Plan de budget de test** : expérimentations recommandées avec budget alloué, hypothèses, critères de succès et méthode de mesure
- **Notes sur l'attribution** : réserves sur la façon dont le modèle d'attribution actuel peut sur- ou sous-créditer certains canaux
- **Synthèse exécutive** : aperçu d'une page des principaux constats et actions recommandées pour la présentation aux parties prenantes

## Agents utilisés

- **analytics-analyst** — Analyse des données de performance, calculs d'efficacité, modélisation des rendements décroissants, projections de ROI, évaluation de l'attribution
- **media-buyer** — Stratégie budgétaire au niveau des canaux, expertise des seuils de dépense, séquençage de la réallocation, référentiels spécifiques aux plateformes, dynamique des enchères

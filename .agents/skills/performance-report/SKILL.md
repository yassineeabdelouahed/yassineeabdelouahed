---
name: performance-report
description: "Transformer les données marketing en un rapport de performance prêt pour les parties prenantes : synthèse exécutive, tableau de bord KPI canal par canal, analyse de tendance, alertes d'anomalie avec hypothèses de cause racine, et recommandations classées par impact attendu — formaté pour une audience exécutive ou tactique. Se déclenche sur \"/digital-marketing-pro:performance-report\", \"write the monthly performance report\", \"summarize campaign results for stakeholders\", \"why did performance change last quarter\", \"turn these metrics into a report\". Consomme les instantanés persistés par /digital-marketing-pro:performance-check plutôt que de les récupérer lui-même depuis les plateformes ; lit le profil de marque, les modèles personnalisés, et les SOP d'agence. Transmet le diagnostic d'anomalie plus approfondi à /digital-marketing-pro:anomaly-scan."
argument-hint: "[time-period]"
---

# /digital-marketing-pro:performance-report

## Objectif

Générer un rapport de performance marketing structuré qui transforme les données brutes en insights. Couvre le suivi des KPI, l'analyse de tendance, la détection d'anomalie, et des recommandations priorisées pour l'optimisation.

**Périmètre (vs `/digital-marketing-pro:performance-check`) :** ce skill est la **couche de formatage narratif** — il transforme les métriques en un livrable prêt pour les parties prenantes (synthèse exécutive, commentaire par canal, récit de tendance, recommandations priorisées, formatage adapté à l'audience). Il consomme les récupérations en direct et les instantanés persistés que produit `/digital-marketing-pro:performance-check` plutôt que de récupérer à nouveau les données depuis les plateformes lui-même. Utiliser `performance-check` pour *voir les chiffres maintenant* ; utiliser `performance-report` pour *raconter l'histoire*. Pour un diagnostic d'anomalie plus approfondi, transmettre à `/digital-marketing-pro:anomaly-scan`.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Période de reporting** : Plage de dates pour le rapport
- **Canaux à couvrir** : Quels canaux marketing inclure (tous, ou spécifiques)
- **Source de données** : Données brutes (collées, CSV, ou plateforme connectée)
- **KPI d'intérêt** : Métriques spécifiques sur lesquelles se concentrer (ou utiliser les valeurs par défaut pour le canal)
- **Période de comparaison** : Période précédente, année sur année, ou benchmark personnalisé
- **Audience** : Qui va lire le rapport (synthèse exécutive vs détail tactique)

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les guidelines** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Ingérer et valider les données de performance fournies
3. Calculer les KPI centraux par canal : trafic, conversions, revenu, ROAS, CPA, engagement, croissance. Isoler le canal par défaut GA4 **« AI Assistant »** (référencements depuis ChatGPT, Gemini, Copilot, Perplexity, etc.) comme ligne à part afin que le trafic et les conversions issus de l'IA soient visibles plutôt que noyés dans Référent/Direct
4. Exécuter une analyse de tendance : changements période sur période, trajectoire, ajustements de saisonnalité
5. Détecter les anomalies : pics ou baisses significatifs avec causes racines probables
6. Benchmarker par rapport aux moyennes sectorielles et aux objectifs de marque
7. Générer des insights : ce qui a fonctionné, ce qui a sous-performé, et pourquoi
8. Produire des recommandations priorisées pour la prochaine période
9. Formater le rapport pour l'audience spécifiée (exécutive vs tactique)

## Résultat

Un rapport de performance structuré contenant :

- Synthèse exécutive avec les métriques phares et une évaluation globale
- Tableau de bord KPI canal par canal avec comparaison période sur période
- Analyse de tendance avec des points de données visualisables
- Alertes d'anomalie avec hypothèses de cause racine
- Principales réussites et sous-performances avec contexte
- Recommandations actionnables classées par impact attendu
- Objectifs et axes de focus pour la prochaine période

## Agents utilisés

- **analytics-analyst** — Analyse des données, calcul des KPI, détection de tendance, identification d'anomalie, recommandations

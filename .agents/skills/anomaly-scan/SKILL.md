---
name: anomaly-scan
description: "Scanner toutes les plateformes marketing connectées à la recherche de déviations statistiquement significatives par rapport aux références stockées — baisses de trafic, pics de CPA, effondrement de la délivrabilité, dépassements budgétaires, ou gains inattendus — classées critique/avertissement/info avec causes probables, corrélation avec les changements récents, et actions recommandées. Se déclenche sur \"/digital-marketing-pro:anomaly-scan\", \"why did our CPA spike\", \"did anything weird happen this week\", \"check for anomalies\", \"our conversions suddenly dropped\". Exécute performance-monitor.py pour les références et la détection, recoupe les signalements avec l'historique execution-tracker.py et le cadre diagnostique dans skills/analytics-insights/anomaly-diagnosis.md, et persiste les constats critiques comme insights via campaign-tracker.py. Lit le profil de marque."
---

# /digital-marketing-pro:anomaly-scan

## Objectif

Scanner toutes les plateformes marketing connectées à la recherche d'anomalies — déviations statistiquement significatives par rapport à des références établies, pouvant indiquer des problèmes (baisses de trafic, pics de CPA, effondrement de la délivrabilité, dépassements budgétaires) ou des opportunités (contenu viral, améliorations du taux de conversion, croissance inattendue d'un canal). Conçu pour détecter les problèmes tôt, avant qu'ils ne s'aggravent en problèmes coûteux, et pour faire ressortir les réussites qui méritent d'être amplifiées.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Niveau de sensibilité** : strict (signale les déviations >1,5 écart-type par rapport à la référence), normal (>2 écarts-types),
  ou relâché (>3 écarts-types). Par défaut : normal
- **Période** : la fenêtre à scanner pour les anomalies — aujourd'hui, les 3 derniers jours, les 7 derniers jours, les 30 derniers jours, ou une plage personnalisée.
  Par défaut : les 7 derniers jours
- **Plateformes** (facultatif) : plateformes spécifiques sur lesquelles concentrer le scan (par ex. « Google Ads et Meta uniquement »).
  Si omis, toutes les plateformes connectées sont scannées
- **Focus sur les métriques** (facultatif) : métriques spécifiques à prioriser (par ex. « CPA et taux de conversion uniquement »).
  Si omis, toutes les métriques disponibles sont évaluées
- **Période de référence** (facultatif) : référence personnalisée pour la comparaison au lieu de la valeur par défaut.
  Par défaut : la moyenne glissante sur 30 jours maintenue par performance-monitor.py
- **Exclure les événements connus** (facultatif) : liste d'événements connus à filtrer (par ex. « soldes du Black Friday »,
  « migration du site le 15 janvier ») afin que les déviations attendues ne soient pas signalées comme anomalies

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également l'existence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Récupérer les métriques actuelles depuis tous les MCP connectés** : interroger chaque plateforme analytique connectée
   (google-analytics, google-ads, meta-marketing, linkedin-marketing, tiktok-ads, mailchimp, stripe, mixpanel,
   amplitude, shopify, etc.) pour toutes les métriques disponibles sur la période de scan spécifiée. Inclure le trafic, la dépense,
   les conversions, le CPA, le ROAS, les taux d'engagement, la délivrabilité, et les métriques de revenu.
3. **Charger les références historiques** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand {slug} --action get-baseline`
   pour récupérer les moyennes glissantes, les écarts-types, et les plages attendues pour chaque métrique. Si aucune référence n'existe encore,
   utiliser les données de la période de comparaison pour établir une référence temporaire et le noter dans le résultat.
4. **Exécuter la détection d'anomalies** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand {slug} --action detect-anomalies --data '{...current-period metrics...}'`
   pour signaler les métriques qui sortent des plages attendues calculées à partir de la référence stockée (moyenne ± écarts-types).
   Appliquer des ajustements de jour de la semaine et de saisonnalité là où les données historiques le permettent.
5. **Recouper avec les exécutions récentes** : vérifier l'historique d'exécution via
   `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history --limit 14`
   pour corréler les anomalies avec les changements récents — un lancement de campagne, une mise en pause, un changement de budget, un remplacement de création,
   un changement de landing page, ou une expansion d'audience a-t-il précédé l'anomalie ?
6. **Recouper avec les facteurs connus** : vérifier les pannes de plateforme connues, les mises à jour d'algorithme
   (mises à jour core de Google, changements de politique Meta), les événements sectoriels, les motifs saisonniers, et tout événement connu
   fourni par l'utilisateur qui pourrait expliquer la déviation.
7. **Classifier les anomalies par sévérité** : Critique (impacte le revenu, nécessite une action immédiate — suivi cassé,
   CPA à 3x ou plus de la référence, dépassement budgétaire >20 %, délivrabilité sous 80 %), Avertissement (déviations significatives méritant
   une investigation sous 24 heures — trafic en baisse de 30 % ou plus, engagement divisé par deux, CTR en baisse de 40 % ou plus), ou Info (notable
   mais non urgent — changements de tendance progressifs, hausses mineures du CPA, motifs saisonniers émergents).
8. **Déterminer les causes probables** : pour chaque anomalie, analyser les causes profondes à l'aide du cadre diagnostique de
   `skills/analytics-insights/anomaly-diagnosis.md`. Catégoriser comme problème de données/suivi, facteur externe
   (mise à jour d'algorithme, action concurrentielle, changement saisonnier), changement interne (modification de campagne, mise à jour de
   landing page), ou changement de plateforme (mise à jour de politique, dépréciation de fonctionnalité, changement de dynamique d'enchère).
9. **Enregistrer les anomalies critiques comme insights** : pour les anomalies de niveau critique et avertissement, persister via
   `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action save-insight --data '{"type":"anomaly","insight":"...","context":"..."}'`
   afin qu'elles soient suivies, apparaissent dans les futurs rapports, et puissent être référencées dans les post-mortems.

## Résultat

Un rapport d'anomalie structuré contenant :

- **Résumé du scan** : plateformes scannées, période analysée, niveau de sensibilité utilisé, période de référence,
  nombre total d'anomalies détectées (par sévérité), et évaluation globale de la santé marketing (saine, prudence, ou critique)
- **Anomalies critiques** (le cas échéant) : nom de la métrique, plateforme, plage attendue (moyenne +/- seuil), valeur réelle,
  ampleur de la déviation (en écarts-types et en pourcentage), cause probable, impact estimé sur le revenu, et action
  immédiate recommandée
- **Anomalies d'avertissement** : même structure que les critiques, avec des étapes d'investigation recommandées et un plan
  d'action sur 24 heures pour chacune
- **Anomalies d'information** : déviations notables méritant une surveillance, avec des critères d'observation — ce qu'il faut
  surveiller pour déterminer si la tendance se poursuit ou s'inverse
- **Analyse de corrélation** : liens entre les anomalies et l'historique d'exécution récent — quels changements pourraient avoir
  causé quelles déviations, avec des niveaux de confiance (forte, possible, improbable)
- **Résumé de santé par plateforme** : indicateur de santé par plateforme (vert/jaune/rouge) selon le nombre et la sévérité
  des anomalies détectées, plus une tendance par rapport au dernier scan si des données de scan précédent existent
- **Actions recommandées** : liste ordonnée par priorité de réponses — corrections immédiates pour les problèmes critiques, investigations
  pour les avertissements, ajustements de surveillance pour les éléments informationnels, et toute recalibration de référence nécessaire
- **Notes de mise à jour de la référence** : si des références nécessitent une recalibration en raison de changements structurels (par ex. nouvelle campagne
  lancée, canal ajouté, changement saisonnier, ou changement de tarification altérant durablement les plages attendues)

## Agents utilisés

- **performance-monitor-agent** — Moteur de détection d'anomalies, gestion des références, évaluation des seuils statistiques, analyse de tendance historique, classification de sévérité, et ajustement de saisonnalité
- **analytics-analyst** — Interprétation des causes profondes, corrélation cross-plateforme, analyse contextuelle (saisonnalité, mises à jour d'algorithme, changements concurrentiels), estimation d'impact, et génération de recommandations actionnables

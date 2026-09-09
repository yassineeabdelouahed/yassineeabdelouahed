---
name: funnel-audit
description: "Auditer les données de conversion étape par étape d'un tunnel existant pour identifier où les prospects abandonnent et pourquoi — comparé aux moyennes du secteur, avec les 3 principaux points de blocage classés par impact sur le chiffre d'affaires, les causes profondes, des scénarios d'amélioration et un plan d'action priorisé. Se déclenche sur « /digital-marketing-pro:funnel-audit », « pourquoi notre tunnel fuit-il », « trouve notre plus gros point d'abandon », « audite la conversion par étape », « notre taux démo-vers-signature s'est effondré ». Dimensionne l'expérience de validation avec sample-size-calculator.py et confirme les gains avec significance-tester.py ; lit le profil de marque et se combine avec /digital-marketing-pro:funnel-architect pour la refonte."
argument-hint: "[funnel-stage or URL]"
---

# /digital-marketing-pro:funnel-audit

## Objectif

Analyser l'intégralité du tunnel d'acquisition et de conversion client pour identifier où les prospects abandonnent, pourquoi ils se désengagent, et quels changements auront l'impact le plus élevé sur le taux de conversion global.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Étapes du tunnel** : Les étapes à analyser (ou utiliser le standard : Notoriété > Intérêt > Considération > Intention > Achat > Fidélisation)
- **Données du tunnel** : Métriques par étape (trafic, leads, MQL, SQL, opportunités, clients) ou description qualitative
- **Sources de trafic** : D'où proviennent les visiteurs/leads
- **Points de conversion** : Actions clés à chaque étape (remplissage de formulaire, demande de démo, démarrage d'essai, achat)
- **Points de douleur connus** : Toute étape déjà suspectée de sous-performer par l'utilisateur
- **Stack technique** : CRM, analytics et outils de marketing automation utilisés

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés ciblés (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifier aussi les guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les templates personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer une marque d'abord (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Cartographier le tunnel actuel avec les taux de conversion entre chaque étape
3. Comparer les taux de conversion étape par étape aux moyennes du secteur
4. Identifier les plus gros points d'abandon et calculer l'impact sur le chiffre d'affaires de chaque écart
5. Analyser les causes potentielles par point de blocage : messaging, ciblage, UX, timing, offre, suivi
6. Évaluer les signaux de qualité des leads — les bonnes personnes entrent-elles dans le tunnel ?
7. Évaluer l'efficacité du nurturing à chaque étape
8. Modéliser des scénarios d'amélioration : « Si l'étape X s'améliore de Y%, le chiffre d'affaires global augmente de Z% »
9. Prioriser les recommandations par impact sur le chiffre d'affaires et effort de mise en œuvre
10. **Dimensionner et valider la correction** : Pour la recommandation principale, dimensionner l'expérience de validation avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/sample-size-calculator.py" --baseline-rate {stage-rate} --mde {mde} --mde-type absolute --significance 0.95 --power 0.80` (passer `--mde-type relative` si la cible est un gain relatif — les deux diffèrent d'environ 40× à un taux de base de 5%). Une fois la correction déployée, confirmer que l'amélioration est statistiquement réelle avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/significance-tester.py" --control-visitors {n} --control-conversions {n} --variant-visitors {n} --variant-conversions {n} --confidence 0.95` plutôt que de déclarer un gagnant sur la base de simples écarts de taux bruts.

## Résultat

Un audit de tunnel structuré contenant :

- Visualisation du tunnel avec les taux de conversion par étape
- Comparaison aux benchmarks sectoriels par étape
- Les 3 principaux points de blocage classés par impact sur le chiffre d'affaires
- Analyse des causes profondes par point de blocage avec preuves à l'appui
- Scénarios d'amélioration avec impact projeté sur le chiffre d'affaires
- Plan d'action priorisé avec victoires rapides et projets stratégiques
- Cadre de mesure pour suivre les améliorations

## Agents utilisés

- **marketing-strategist** — Architecture du tunnel, analyse de la qualité des leads, recommandations stratégiques
- **analytics-analyst** — Analyse des données de conversion, benchmarking, modélisation d'impact
- **cro-specialist** — Diagnostic des points de blocage de conversion, recommandations de tests A/B, optimisation des formulaires et du checkout, tests de significativité statistique

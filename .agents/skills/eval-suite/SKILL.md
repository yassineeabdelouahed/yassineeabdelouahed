---
name: eval-suite
description: "Évaluez en lot tout un ensemble de contenus — fichiers, un répertoire, ou des blocs collés — en une seule exécution, produisant un rapport de qualité de portfolio classé : distribution des notes, moyennes par dimension, problèmes systémiques, une liste de révision priorisée, et les rejets automatiques en dessous du seuil. Se déclenche sur « /digital-marketing-pro:eval-suite », « note toute notre bibliothèque de contenu », « vérifie la qualité de tous les actifs de campagne avant le lancement », « évalue ces 5 brouillons ensemble », « quels livrables sont les plus faibles ». Exécute eval-runner.py par élément, journalise chaque score dans le tracker de qualité pour l'analyse de tendance, et lit le profil de marque et les guidelines pour le contexte de notation."
---

# /digital-marketing-pro:eval-suite

## Objectif

Évaluation en lot sur plusieurs contenus pour produire une évaluation de qualité au niveau du portfolio. Évaluer une bibliothèque de contenu entière, tous les actifs d'une campagne, ou un ensemble de livrables en une seule exécution. Plutôt que d'évaluer le contenu pièce par pièce, cette commande traite tout ensemble et livre une vue holistique de la qualité du contenu.

Le résultat inclut le classement du contenu, une analyse par dimension, la distribution globale de la qualité, les problèmes communs sur l'ensemble, et une liste de révision priorisée. C'est la commande à utiliser avant un lancement de campagne (pour repérer les actifs faibles avant leur mise en ligne), lors d'un audit de contenu (pour évaluer la santé de la bibliothèque), ou après un sprint de production (pour vérifier la qualité de tous les livrables en une fois). Chaque évaluation est journalisée dans le tracker de qualité pour une analyse de tendance longitudinale.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Sources de contenu** : une ou plusieurs des options suivantes :
  - Une liste de chemins de fichiers (par ex. « évalue ces 5 fichiers : email-v1.txt, email-v2.txt, landing-page.html, ad-copy-fb.txt, ad-copy-google.txt »)
  - Un chemin de répertoire (par ex. « évalue tout dans /campaign-q1-assets/ ») — tous les fichiers texte du répertoire seront inclus
  - Plusieurs blocs de contenu en ligne avec des étiquettes (par ex. « Évalue ceci : [Étiquette : Hero de la page d'accueil] contenu... [Étiquette : Objet email] contenu... »)
- **Type de contenu** : optionnel — appliqué globalement (par ex. « ce sont tous des objets d'email ») ou spécifié par élément. Si omis, l'évaluateur déduira le type à partir des caractéristiques du contenu
- **Fichier de preuves** : optionnel — document de contexte partagé (brief, document de stratégie, recherche d'audience) appliqué à toutes les évaluations pour une notation plus pertinente
- **Profondeur d'évaluation** : optionnel — `quick` (par défaut, évaluation par élément plus rapide) ou `full` (évaluation complète avec commentaire détaillé par dimension et par élément). Quick est recommandé pour les ensembles de plus de 10 éléments ; full pour les actifs de campagne critiques
- **Seuil de rejet automatique** : optionnel — score composite en dessous duquel le contenu est signalé comme nécessitant une révision obligatoire (par défaut : 60)
- **Référence de comparaison** : optionnel — un ID d'exécution eval-suite précédent auquel se comparer, montrant l'amélioration ou la régression par pièce

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents (voice-and-tone, messaging, styles par canal). Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs par défaut.
2. **Recenser tous les éléments de contenu** : résoudre les sources fournies en une liste plate d'éléments de contenu. Pour les chemins de répertoire, scanner les fichiers texte (.txt, .md, .html, lignes .csv). Pour le contenu en ligne, analyser les étiquettes et les blocs de contenu. Assigner une étiquette à chaque élément (nom de fichier, étiquette fournie, ou index auto-généré). Rapporter le nombre total d'éléments à l'utilisateur avant de continuer et confirmer si l'ensemble dépasse 25 éléments (pour fixer les attentes sur le temps de traitement).
3. **Évaluer chaque élément de contenu** : pour chaque élément de l'ensemble, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --brand {slug} --action run-quick --file "{path}" --content-type "{type}"` pour les éléments fichier (utiliser `--text "{content}"` plutôt que `--file` pour les blocs de contenu en ligne ; utiliser `--action run-full` si l'utilisateur a demandé une profondeur complète). Passer `--evidence "{evidence_path}"` si un fichier de preuves a été fourni. Collecter les scores par dimension (content_quality, brand_voice, hallucination_risk, claim_verification, output_structure, readability) et le score composite pour chaque élément.
4. **Journaliser chaque évaluation** : pour chaque élément évalué, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/quality-tracker.py" --brand {slug} --action log-eval --content-type "{type}" --data '{"label": "{label}", "scores": {scores_json}, "suite_id": "{suite_run_id}"}'` pour persister les résultats pour le suivi longitudinal. Le suite-id regroupe tous les éléments de ce lot ensemble.
5. **Agréger les résultats** : calculer les statistiques au niveau du portfolio :
   - score composite moyen sur tous les éléments
   - distribution des scores — nombre d'éléments dans chaque tranche de note (90+ : Excellent, 80-89 : Solide, 70-79 : Bon, 60-69 : À travailler, <60 : Rejet automatique)
   - moyennes de portfolio par dimension — identifier quelles dimensions de qualité sont constamment fortes ou faibles sur l'ensemble
   - écart type pour évaluer la cohérence (un écart élevé signifie une qualité inégale)
6. **Classer tous les contenus** : trier les éléments du score composite le plus élevé au plus faible. Présenter la liste classée complète avec scores, notes, et étiquettes de type de contenu.
7. **Identifier les problèmes communs** : analyser les scores par dimension sur tous les éléments pour trouver des schémas — par ex. « 7 des 12 éléments notent en dessous de 70 sur claim_verification » ou « les scores hallucination_risk sont systématiquement 15+ points en dessous des scores content_quality ». Ces schémas systémiques indiquent des problèmes de processus ou de modèle plutôt que des problèmes de contenu individuels.
8. **Générer une liste de révision priorisée** : trier les éléments nécessitant une révision par impact potentiel. Prioriser les éléments qui sont (a) en dessous du seuil de rejet automatique, (b) des types de contenu à forte visibilité (landing pages, publicités) avec des scores en dessous de la moyenne, ou (c) des éléments où une seule dimension tire vers le bas un composite par ailleurs solide. Pour chaque élément de la liste de révision, préciser sur quelle(s) dimension(s) se concentrer et quel type d'amélioration est nécessaire.
9. **Comparer à la référence** (si fournie) : si l'utilisateur a fourni un ID d'exécution suite précédent, récupérer les scores de suite actuels et de référence depuis le tracker de qualité en utilisant `python "${CLAUDE_PLUGIN_ROOT}/scripts/quality-tracker.py" --brand {slug} --action get-summary` pour chaque période de suite. Puis calculer vous-même les écarts par élément et au niveau du portfolio en faisant correspondre les éléments entre les deux exécutions par étiquette/type de contenu et en calculant les différences de score. Présenter les résultats comme amélioré, régressé, ou inchangé par élément et globalement.

## Sortie

Une évaluation de qualité de portfolio structurée contenant :

- **Résumé du portfolio** : nombre total de pièces, score composite moyen, distribution des notes (nombre Excellent/Solide/Bon/À travailler/Rejet automatique), note globale du portfolio, score de cohérence (basé sur l'écart type)
- **Liste de contenu classée** : tous les éléments triés du meilleur au pire — chacun avec étiquette, type de contenu, score composite, note, et un résumé de qualité d'une ligne
- **Meilleures performances** : les 3 éléments les mieux notés avec des notes précises sur ce qui les rend forts — utile comme référence interne ou modèles
- **Analyse de portfolio par dimension** : score moyen par dimension sur l'ensemble complet (content_quality, brand_voice, hallucination_risk, claim_verification, output_structure, readability), identifiant les dimensions les plus fortes et les plus faibles avec des observations précises (par ex. « brand_voice moyenne 88 sur l'ensemble — les guidelines de voix sont bien suivies. claim_verification moyenne 62 — les sources et preuves à l'appui manquent fréquemment. »)
- **Rapport des problèmes communs** : schémas systémiques trouvés sur plusieurs éléments — ceux-ci indiquent des problèmes au niveau du processus valant la peine d'être corrigés au stade du modèle ou du brief plutôt que par révision élément par élément
- **Liste de révision priorisée** : éléments les plus nécessitant une révision, triés par impact, avec des consignes précises sur quelles dimensions améliorer et quel type de changements est nécessaire
- **Liste de rejet automatique** : éléments notant en dessous du seuil avec des raisons précises et des signaux de révision obligatoire
- **Comparaison à la référence** (le cas échéant) : écarts par élément et métriques d'amélioration/régression au niveau du portfolio
- **Recommandations** : prochaines étapes actionnables — quels éléments réviser en premier, quelles améliorations de processus élèveraient l'ensemble du portfolio, et si certains types de contenu sous-performent systématiquement (suggérant des problèmes de brief ou de modèle)

## Agents utilisés

- **quality-assurance** — évalue chaque pièce de contenu sur toutes les dimensions de qualité, maintient la cohérence de notation sur l'ensemble du lot, identifie les schémas de qualité systémiques, génère des insights au niveau du portfolio, et produit les recommandations de révision priorisées

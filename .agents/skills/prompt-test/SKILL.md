---
name: prompt-test
description: "Tester A/B des variations de contenu par score de qualité : créer un test nommé, journaliser chaque variante (notée via eval-runner.py sur l'hallucination, la qualité de contenu, et la lisibilité), et obtenir une déclaration de gagnant avec marge de victoire, niveau de confiance, arbitrages par dimension, et signaux de rejet automatique. Produit une recommandation prête pour la décision plus des insights réutilisables sur l'approche qui gagne pour cette marque. Se déclenche sur \"/digital-marketing-pro:prompt-test\", \"which headline style works better\", \"A/B test these subject lines\", \"compare two versions of this copy\", \"show the results of my content test\". Lit le profil de marque et les guidelines pour le contexte d'évaluation ; compare des scores d'évaluation, pas la performance en direct auprès de l'audience — se combine avec /digital-marketing-pro:ab-test-plan pour les expériences en trafic réel."
---

# /digital-marketing-pro:prompt-test

## Objectif

Tester A/B des variations de sortie de contenu en comparant les scores de qualité entre différentes approches de prompt, styles de titre, formulations de CTA, ou variations complètes de stratégie de contenu. Créer des tests nommés, journaliser des variantes avec leurs scores d'évaluation, et déterminer quelle approche produit les meilleurs résultats de qualité.

Cette commande apporte de la rigueur expérimentale à la création de contenu. Plutôt que de deviner quel style de titre, approche d'objet, ou structure de contenu fonctionne le mieux, vous exécutez un test structuré : définir l'expérience, journaliser chaque variante avec ses scores de qualité, et obtenir une recommandation statistiquement fondée sur l'approche à adopter. Utile pour tester les styles d'objet (curiosité vs axé bénéfice), les approches de titre (question vs affirmation vs comment faire), la formulation de CTA (urgence vs valeur vs preuve sociale), les variations de ton (formel vs conversationnel), ou les comparaisons A/B complètes de stratégie de contenu.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Action** : Que faire — `create` (configurer un nouveau test), `log` (ajouter une variante à un test existant), `results` (obtenir la comparaison et le gagnant), ou `list` (afficher tous les tests)
- **Nom du test** : Un nom descriptif pour l'expérience (par exemple, « Style d'objet email Q1 », « approche de titre page d'accueil ») — requis pour `create`, `log`, et `results`
- **Étiquette de variante** : Identifiant pour cette variante (par exemple, « A », « B », « C », « contrôle », « axé curiosité », « axé bénéfice ») — requis pour `log`
- **Contenu de la variante** : Le contenu réel à évaluer — texte en ligne, chemin de fichier, ou bloc de contenu collé — requis pour `log`
- **Description de la variante** : Brève explication de l'approche ou stratégie que représente cette variante (par exemple, « Utilise un écart de curiosité sans mention de produit », « Ouvre avec un bénéfice quantifié ») — requis pour `log`
- **Type de contenu** : Le type de contenu testé (objet d'email, titre, texte publicitaire, CTA, article complet, etc.) — optionnel, appliqué pendant l'évaluation pour la pondération des dimensions
- **Fichier de preuves** : Données ou recherche à l'appui informant l'hypothèse du test — optionnel, transmis à l'évaluation pour le contexte

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et fichiers de catégorie pertinents (règles de voix et de ton, hiérarchie des messages, guides de style par canal). Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Pour l'action `create`** : Configurer un nouveau test en exécutant `python "${CLAUDE_PLUGIN_ROOT}/scripts/prompt-ab-tester.py" --brand {slug} --action create-test --test-name "{name}"`. Cela initialise l'enregistrement du test avec les métadonnées (date de création, marque, type de contenu) et le prépare pour la journalisation de variantes. Confirmer que le test a été créé et rappeler à l'utilisateur de journaliser les variantes avec `/digital-marketing-pro:prompt-test` en utilisant l'action `log`.
3. **Pour l'action `log`** : D'abord, évaluer la qualité du contenu de la variante en exécutant `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --brand {slug} --action run-quick --text "{content}" --content-type "{type}"` (utiliser `--file "{path}"` au lieu de `--text` si la variante est un fichier). Cela produit des scores par dimension pour les trois dimensions rapides (hallucination, content_quality, readability) et un score composite. Remarque : `run-quick` ignore les fichiers de preuves — si un fichier de preuves a été fourni et que la vérification des allégations compte pour ce test, utiliser plutôt `--action run-full --evidence "{evidence_path}"`. Ensuite, journaliser la variante avec ses scores en exécutant `python "${CLAUDE_PLUGIN_ROOT}/scripts/prompt-ab-tester.py" --brand {slug} --action log-variant --test-name "{name}" --variant "{label}" --data '{"description":"{description}","scores":{scores_json}}'`. Présenter les scores individuels de la variante à l'utilisateur immédiatement afin qu'il puisse voir la performance de cette variante avant de journaliser des variantes supplémentaires.
4. **Pour l'action `results`** : Extraire la comparaison complète en exécutant `python "${CLAUDE_PLUGIN_ROOT}/scripts/prompt-ab-tester.py" --brand {slug} --action get-results --test-name "{name}"`. Analyser les résultats :
   - Identifier la variante gagnante par le score composite le plus élevé
   - Calculer la marge de victoire (différence en pourcentage entre le gagnant et le finaliste)
   - Évaluer la significativité statistique — si les variantes sont dans un écart de 5 % l'une de l'autre, signaler comme « trop serré pour trancher » et recommander un test supplémentaire ou des critères de départage
   - Détailler la performance par dimension pour montrer où chaque variante excelle ou faiblit (par exemple, la variante A gagne sur brand_voice mais la variante B gagne sur readability)
   - Identifier les forces spécifiques de l'approche gagnante qui peuvent être appliquées au contenu futur
   - Signaler toute variante tombée en dessous du seuil de rejet automatique configuré (par défaut 40, via eval-config-manager.py) comme inadaptée
5. **Pour l'action `list`** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/prompt-ab-tester.py" --brand {slug} --action list-tests` pour afficher tous les tests de cette marque, leur statut (en cours, terminé), le nombre de variantes, et la date de création.
6. **Présenter les résultats avec une recommandation claire** : Résumer les constats dans un format prêt pour la décision — indiquer le gagnant, expliquer pourquoi il a gagné, quantifier l'avantage, noter toute réserve, et fournir une recommandation spécifique sur l'approche à adopter à l'avenir. Si l'approche gagnante révèle un motif (par exemple, les titres axés bénéfice surpassent systématiquement ceux axés curiosité pour cette marque), le noter comme un insight réutilisable.

## Résultat

Un rapport de test structuré contenant :

- **Résumé du test** : Nom du test, type de contenu, nombre de variantes, plage de dates
- **Scorecard par variante** : L'étiquette, la description, le score composite, et la répartition par dimension de chaque variante (content_quality, brand_voice, hallucination_risk, claim_verification, output_structure, readability)
- **Déclaration du gagnant** : Quelle variante a gagné, avec quelle marge, et si la marge est statistiquement significative
- **Analyse par dimension** : Quelle variante mène sur chaque dimension individuelle — révèle les arbitrages (par exemple, « La variante B note plus haut sur content_quality mais la variante A a une meilleure brand_voice »)
- **Niveau de confiance** : Confiance élevée (marge >15 %), confiance modérée (marge 5-15 %), ou confiance faible (marge <5 %, recommander des tests supplémentaires)
- **Recommandation spécifique** : Déclaration claire sur l'approche à adopter et pourquoi, avec des indications sur comment appliquer l'approche gagnante au contenu futur
- **Insight réutilisable** : Tout motif ou principe qui a émergé de ce test et peut informer la stratégie de contenu plus large
- **Signaux de rejet automatique** : Toute variante ayant noté en dessous du seuil de qualité avec des raisons spécifiques

## Agents utilisés

- **quality-assurance** -- Évalue la qualité de contenu de chaque variante à travers plusieurs dimensions, fournit une cohérence de notation, identifie les problèmes de qualité, et s'assure que les critères d'évaluation s'alignent avec les standards de marque
- **content-creator** -- Génère du contenu de variante additionnel si l'utilisateur demande des alternatives produites par IA à tester face à ses propres versions, applique la voix de marque aux variantes générées

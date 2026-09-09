---
name: eval-config
description: "Consultez et ajustez les paramètres d'évaluation de contenu de la marque — seuils de score minimum par dimension, répartition des poids composites, planchers de rejet automatique, et dérogations par type de contenu — avec validation, comparaisons de notation avant/après, et recommandations basées sur le secteur. Produit une configuration d'évaluation mise à jour et cohérente en interne. Se déclenche sur « /digital-marketing-pro:eval-config », « augmente le seuil d'hallucination », « pourquoi ce brouillon a-t-il été rejeté automatiquement », « recommande des paramètres d'évaluation pour la santé », « réinitialise la notation d'évaluation aux valeurs par défaut ». Lit le profil de marque et les guidelines, écrit via eval-config-manager.py, et se combine avec /digital-marketing-pro:eval-content pour voir la nouvelle barre en action."
---

# /digital-marketing-pro:eval-config

## Objectif

Configurer le système d'évaluation pour une marque. Fixer des seuils de qualité minimum par dimension, ajuster les poids de notation selon les priorités sectorielles et la stratégie de contenu, configurer des seuils de rejet automatique empêchant le contenu de qualité insuffisante de passer l'évaluation, et définir des standards de qualité spécifiques par type de contenu appliquant des barres différentes selon les formats.

La configuration d'évaluation détermine avec quelle rigueur le contenu est noté et à quoi ressemble la barre de qualité pour la marque. Une entreprise du secteur santé peut fortement pondérer le risque d'hallucination et la vérification des allégations tout en assouplissant les seuils de lisibilité pour des audiences techniques. Une marque grand public peut prioriser la voix de marque et la lisibilité tout en acceptant une vérification des allégations plus légère pour le contenu de notoriété. Une agence gérant plusieurs marques peut définir des configurations différentes par marque. Cette commande rend ces arbitrages explicites et ajustables plutôt qu'enfouis dans des valeurs par défaut.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Action de configuration** : que faire — `view` (afficher les paramètres actuels via `get-config`), `set-threshold` (modifier un score minimum pour une dimension ; ajouter `--content-type` pour restreindre la dérogation à un type de contenu), `set-weights` (modifier la répartition des poids de dimension ; ajouter `--content-type` pour une dérogation par type), `set-auto-reject` (modifier le score composite en dessous duquel le contenu échoue automatiquement), `recommend` (analyse uniquement — obtenir des suggestions de paramètres adaptés au secteur), ou `reset` (restaurer tous les paramètres aux valeurs par défaut). Il n'existe pas d'action `set-content-type` distincte — les dérogations par type de contenu s'appliquent en passant `--content-type` à `set-threshold` / `set-weights`.
- **Nom de dimension** (pour set-threshold) : la dimension à configurer — `content_quality`, `brand_voice`, `hallucination_risk`, `claim_verification`, `output_structure`, `readability`, ou `composite`
- **Valeur de seuil** (pour set-threshold) : le score minimum acceptable (0-100) pour la dimension spécifiée. Le contenu ayant un score inférieur à ce seuil sur une dimension quelconque est signalé comme un échec sur cette dimension
- **Poids** (pour set-weights) : un objet JSON associant les noms de dimension à leurs poids — par ex. `{"content_quality": 0.25, "brand_voice": 0.20, "hallucination_risk": 0.20, "claim_verification": 0.15, "output_structure": 0.10, "readability": 0.10}`. Les poids doivent totaliser approximativement 1,0 (tolérance de +/- 0,02 pour l'arrondi)
- **Score de rejet automatique** (pour set-auto-reject) : le score composite en dessous duquel le contenu échoue automatiquement quels que soient les scores individuels par dimension — typiquement 40-60 selon les standards de la marque
- **Type de contenu** (optionnel, pour set-threshold / set-weights via `--content-type`) : le type de contenu pour lequel configurer des dérogations, ainsi que les dérogations elles-mêmes — seuils ou poids personnalisés s'appliquant uniquement à ce type de contenu

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer le contexte sectoriel pour la génération de recommandations — différents secteurs ont différentes priorités de qualité. Vérifier également la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, noter toute exigence de qualité définie dans les guidelines devant orienter les recommandations de seuil. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs par défaut.
2. **Obtenir la configuration actuelle** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action get-config` pour récupérer tous les paramètres actuels — seuils globaux, poids des dimensions, seuil de rejet automatique, et toute dérogation spécifique par type de contenu. Identifier quels paramètres sont personnalisés (définis par l'utilisateur) et lesquels sont des valeurs par défaut.
3. **Présenter les paramètres actuels** : afficher toute la configuration dans un format clair et lisible :
   - **Seuils globaux** : le score minimum de chaque dimension avec sa valeur actuelle et si elle est personnalisée ou par défaut
   - **Poids des dimensions** : le poids de chaque dimension dans le calcul du score composite, affiché en décimal et en pourcentage, avec un indicateur visuel de l'importance relative
   - **Seuil de rejet automatique** : le plancher du score composite avec sa valeur actuelle
   - **Dérogations par type de contenu** : tout type de contenu avec des paramètres personnalisés, montrant en quoi ils diffèrent de la configuration globale
   - **Exemple de notation effective** : montrer à quoi ressemblerait une évaluation hypothétique sous la configuration actuelle — par ex. « Avec ces poids, un contenu notant 90 en qualité de contenu mais 50 en risque d'hallucination obtiendrait un composite de X »
4. **Traiter les changements de configuration** : selon l'action demandée :
   - **set-threshold** : valider que la valeur de seuil est comprise entre 0 et 100. Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action set-threshold --dimension {dimension} --threshold {value}` (ajouter `--content-type {type}` pour la restreindre à un type de contenu). Montrer une comparaison avant/après avec l'impact sur la rigueur de notation
   - **set-weights** : valider que tous les poids sont compris entre 0 et 1 et totalisent approximativement 1,0. S'ils ne totalisent pas correctement, montrer l'écart et proposer de normaliser. Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action set-weights --weights '{weights_json}'`. Montrer une comparaison avant/après avec un exemple de la façon dont le même contenu noterait différemment sous les anciens vs les nouveaux poids
   - **set-auto-reject** : valider que le score est compris entre 0 et 100. Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action set-auto-reject --threshold {score}`. Montrer l'impact — combien des évaluations récentes de la marque auraient été rejetées automatiquement sous le nouveau seuil vs l'ancien
   - **dérogation par type de contenu** (pas d'action autonome) : appliquer un seuil ou un poids par type en ajoutant `--content-type {content_type}` à `set-threshold` ou `set-weights` — par ex. `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action set-threshold --dimension hallucination_risk --threshold 80 --content-type ad_copy`. Montrer en quoi la configuration effective de ce type de contenu diffère désormais de la configuration globale
   - **recommend** : analyser le secteur, l'audience, la stratégie de contenu, et les exigences de conformité de la marque pour suggérer des paramètres appropriés. Se référer à `skills/context-engine/eval-framework-guide.md` pour des recommandations spécifiques au secteur. Présenter les suggestions avec leur justification — par ex. « Les marques de santé devraient pondérer le risque d'hallucination à 0,25+ car les allégations santé non vérifiées comportent un risque réglementaire »
   - **reset** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-config-manager.py" --brand {slug} --action reset`. Montrer ce qui change de la configuration personnalisée actuelle vers les valeurs par défaut et confirmer avant d'exécuter
5. **Valider l'intégrité de la configuration** : après tout changement, vérifier que la configuration est cohérente en interne :
   - les poids totalisent approximativement 1,0
   - aucun seuil n'est fixé au-dessus de 100 ou en dessous de 0
   - le seuil de rejet automatique est inférieur à la moyenne des seuils de dimension (sinon presque tout serait rejeté automatiquement)
   - les dérogations par type de contenu ne créent pas de scénarios de notation impossibles
   - si une validation échoue, expliquer le problème et suggérer une correction
6. **Montrer une comparaison avant/après** : pour chaque changement de configuration, afficher une comparaison côte à côte claire des anciens et nouveaux paramètres, avec un exemple concret montrant comment le comportement de notation change — « Sous l'ancienne configuration, [exemple de contenu] notait 72 (C). Sous la nouvelle configuration, il noterait 68 (D+) car le risque d'hallucination est désormais plus fortement pondéré. »
7. **Recommander des ajustements associés** : si l'utilisateur change un paramètre, suggérer des changements associés qui pourraient avoir du sens — par ex. s'il augmente le seuil d'hallucination, suggérer aussi d'augmenter le seuil de vérification des allégations puisque les deux dimensions sont liées. Ce ne sont que des suggestions, pas des changements automatiques.

## Sortie

Un rapport de configuration structuré contenant :

- **Affichage de la configuration actuelle** : tous les seuils, poids, seuil de rejet automatique, et dérogations par type de contenu dans un format de tableau clair — avec des étiquettes personnalisé vs par défaut et la date de dernière modification pour chaque paramètre personnalisé
- **Comparaison avant/après** (si un changement a été effectué) : tableau côte à côte montrant les anciennes et nouvelles valeurs, avec les changements précis mis en évidence. Inclut un exemple d'impact sur la notation montrant comment le même contenu noterait différemment
- **Analyse d'impact historique** (si un changement a été effectué) : combien des évaluations récentes de la marque (30 derniers jours) auraient eu un résultat différent (réussite/échec/revue) sous la nouvelle configuration — quantifiant l'impact pratique du changement
- **Recommandation sectorielle** (si demandée ou pertinente) : paramètres suggérés pour le secteur de la marque avec justification de chaque recommandation, référençant des risques et priorités de qualité précis. Inclut une comparaison des paramètres actuels vs recommandés
- **Validation de la configuration** : confirmation que la configuration est cohérente en interne — les poids totalisent correctement, les seuils sont dans des plages valides, aucune règle contradictoire. Si des problèmes sont détectés, ils sont signalés avec des corrections suggérées
- **Référence de notation effective** : un tableau de référence rapide montrant la configuration effective pour chaque type de contenu — paramètres globaux plus toute dérogation par type de contenu — pour que l'utilisateur puisse voir en un coup d'œil quelle barre de qualité s'applique où
- **Prochaines étapes** : suggestions sur quoi faire après la configuration — exécuter /digital-marketing-pro:eval-content sur un exemple pour voir la nouvelle configuration en action, exécuter /digital-marketing-pro:quality-report pour voir comment les évaluations historiques se rapportent aux nouveaux standards, ou configurer des dérogations supplémentaires par type de contenu

## Agents utilisés

- **quality-assurance** — récupération et modification de la configuration d'évaluation via eval-config-manager.py, validation de la configuration (normalisation des poids, vérifications de plage de seuil, vérification de cohérence), analyse d'impact avant/après par rapport aux données d'évaluation historiques, recommandations de paramètres adaptées au secteur référençant eval-framework-guide.md, et gestion des dérogations spécifiques par type de contenu

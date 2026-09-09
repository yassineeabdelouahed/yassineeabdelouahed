---
name: eval-content
description: "Notez le contenu marketing sur six dimensions — qualité de contenu, voix de marque, risque d'hallucination, vérification des allégations, structure, lisibilité — en un score composite avec note lettre, une liste de problèmes classés par sévérité avec suggestions de correction, et une recommandation réussite/échec/revue. Chaque exécution est journalisée pour le suivi de tendance. Se déclenche sur « /digital-marketing-pro:eval-content », « note ce brouillon avant qu'il ne parte », « vérifie ce post pour des hallucinations », « est-ce que ça correspond à notre voix de marque », « ce texte de landing page est-il prêt à publier ». Lit le profil de marque, les guidelines, et les règles de conformité, et applique les seuils personnalisés définis via /digital-marketing-pro:eval-config."
argument-hint: "[content-path]"
---

# /digital-marketing-pro:eval-content

## Objectif

Évaluation complète de contenu utilisant l'ensemble du pipeline d'évaluation. Fait passer le contenu par six dimensions de notation — qualité de contenu, voix de marque, risque d'hallucination, vérification des allégations, structure de sortie, et lisibilité — pour produire un score composite avec note lettre, signaler des problèmes précis avec suggestions de correction, et comparer aux références de qualité de la marque. C'est la commande de référence avant que tout contenu ne parte en publication, en revue client, ou en lancement de campagne.

Chaque évaluation est journalisée dans le tracker de qualité pour que la détection de régression, l'analyse de tendance, et le reporting qualité au niveau de la marque fonctionnent en continu. Si la marque a des seuils personnalisés ou des poids de dimension configurés via /digital-marketing-pro:eval-config, ceux-ci sont appliqués automatiquement — sinon les valeurs par défaut standard du secteur sont utilisées.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu à évaluer** : le texte à noter — fourni en ligne, sous forme de bloc collé, ou de chemin de fichier. Prend en charge tout format de contenu marketing : article de blog, email, texte publicitaire, post social, landing page, communiqué de presse, brief de contenu, plan de campagne, ou personnalisé
- **Type de contenu** (optionnel) : l'un de `blog_post`, `email`, `ad_copy`, `social_post`, `landing_page`, `press_release`, `content_brief`, `campaign_plan`, ou `custom`. Si omis, l'exécuteur d'évaluation détecte automatiquement selon la structure et la longueur du contenu. Le type de contenu détermine quel schéma intégré est utilisé pour la validation de structure et quels benchmarks de lisibilité s'appliquent
- **Fichier de preuves** (optionnel) : un fichier JSON contenant des allégations vérifiables avec des données source — requis pour une notation complète de la vérification des allégations. Format : `[{"claim": "...", "source": "...", "date": "...", "verified": true}]`. Si non fourni, la vérification des allégations s'exécute en mode extraction uniquement et signale toutes les allégations précises comme « non vérifiées — preuve recommandée »
- **Schéma** (optionnel) : un fichier de schéma JSON personnalisé pour la validation de structure — utilisé quand le type de contenu ne correspond à aucun des 8 schémas intégrés, ou quand la marque a un modèle personnalisé définissant les sections requises, le nombre de mots, et les règles de mise en forme

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents (en particulier `messaging.md` pour la notation de la voix et `visual-identity.md` pour les standards de format). Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs par défaut.
2. **Charger la configuration d'évaluation** : exécuter `scripts/eval-config-manager.py --brand {slug} --action get-config` pour récupérer les seuils spécifiques à la marque, les poids de dimension, et les règles de rejet automatique. Si aucune configuration personnalisée n'existe, utiliser les valeurs par défaut de `skills/context-engine/eval-framework-guide.md`. Noter dans le résultat quels paramètres sont personnalisés vs par défaut.
3. **Exécuter l'évaluation complète** : exécuter `scripts/eval-runner.py --brand {slug} --action run-full --text "{content}" --content-type {content_type}` avec les indicateurs optionnels `--evidence {evidence_file}` et `--schema {schema_file}`. Ceci exécute les six dimensions :
   - **Qualité de contenu** (via content-scorer.py) : profondeur, originalité, exactitude, valeur pour le lecteur, alignement stratégique
   - **Voix de marque** (via brand-voice-scorer.py) : correspondance de ton, cohérence terminologique, alignement de personnalité, conformité aux guidelines
   - **Risque d'hallucination** (via hallucination-detector.py) : statistiques non vérifiées, citations fabriquées, fausse précision, citations inventées, superlatifs non étayés
   - **Vérification des allégations** (via claim-verifier.py) : recoupement des allégations extraites avec les données de preuve — vérifiée, partiellement vérifiée, non vérifiée, ou contredite
   - **Structure de sortie** (via output-validator.py) : présence des sections requises, nombre de mots dans la plage, mise en forme markdown correcte, absence de texte de remplissage, cohérence du CTA
   - **Lisibilité** (via readability-analyzer.py) : niveau Flesch-Kincaid, complexité des phrases, densité de jargon, niveau de langage adapté à l'audience
4. **Analyser les résultats — classer les problèmes par sévérité** : revoir tous les scores de dimension et les constats individuels. Classer chaque problème comme :
   - **Critique** (doit être corrigé avant publication) : signaux d'hallucination à haute confiance, allégations contredites avec écart de preuve, échecs de seuil de rejet automatique, violations de conformité
   - **Modéré** (devrait être corrigé, impacte significativement la qualité) : scores de dimension en dessous du seuil, sections requises manquantes, écarts de voix de marque, lisibilité hors de la plage cible
   - **Mineur** (améliorations recommandées) : suggestions de style, ajouts de sections optionnelles, ajustement fin de la lisibilité, polissage de mise en forme
5. **Générer des recommandations de correction** : pour chaque problème signalé, fournir le texte ou la section précise concernée, l'emplacement exact dans le contenu, le niveau de sévérité, une suggestion de correction concrète avec un exemple de texte de remplacement, et l'amélioration de score attendue si corrigé. Se référer à `skills/context-engine/eval-rubrics.md` pour des consignes de correction spécifiques à chaque dimension.
6. **Comparer à la référence** : exécuter `scripts/quality-tracker.py --brand {slug} --action get-trends --days 30` pour récupérer l'historique de qualité récent de la marque. Si des données historiques existent, montrer comment le score composite de ce contenu et les scores par dimension se comparent à la moyenne mobile sur 30 jours — au-dessus de la moyenne, dans la moyenne, ou en dessous de la moyenne, avec l'écart. Signaler si ce contenu abaisserait la moyenne de la marque.
7. **Journaliser l'évaluation** : exécuter `scripts/quality-tracker.py --brand {slug} --action log-eval --data '{"content_type":"{type}","scores":{"composite":{score},...per-dimension scores...},"grade":"{grade}"}'` pour persister l'évaluation pour le suivi de tendance et la détection de régression (`scores.composite` est requis ; `--content-type` est un indicateur de filtre pour les actions de lecture uniquement, pas pour log-eval). Cette étape est obligatoire — chaque évaluation doit être journalisée.
8. **Présenter les résultats avec une recommandation** : synthétiser tous les constats en une recommandation claire réussite/échec/revue :
   - **Réussite** : le score composite atteint le seuil, aucun problème critique, toutes les dimensions au-dessus des minimums — le contenu est prêt à publier
   - **Revue** : le score composite est à la limite ou des problèmes modérés existent — le contenu a besoin de corrections ciblées avant publication
   - **Échec** : le score composite est en dessous du seuil de rejet automatique, des problèmes critiques sont présents, ou une dimension est en dessous de son minimum — le contenu nécessite une révision significative

## Sortie

Un rapport d'évaluation structuré contenant :

- **Score composite et note lettre** : score global (0-100) avec note lettre (A+ à F), plus la recommandation réussite/échec/revue avec une justification claire
- **Détail par dimension** : scores individuels pour les six dimensions — qualité de contenu, voix de marque, risque d'hallucination, vérification des allégations, structure de sortie, lisibilité — chacun avec le score, le seuil, le statut réussite/échec, et un résumé d'une ligne des constats clés
- **Liste des problèmes critiques** : chacun avec le texte signalé, l'emplacement, la justification de sévérité, et une suggestion de correction précise avec un exemple de texte de remplacement
- **Liste des problèmes modérés** : même structure que critique — scores en dessous du seuil, sections manquantes, écarts de voix, préoccupations de lisibilité
- **Liste des problèmes mineurs** : recommandations de style et de polissage avec des améliorations suggérées
- **Estimation d'impact des corrections** : pour les 5 corrections à plus fort impact, l'amélioration de score estimée si chacune est appliquée — aidant l'utilisateur à prioriser les corrections qui comptent le plus
- **Comparaison à la référence** : comment ce contenu se compare à la moyenne composite sur 30 jours de la marque et aux scores par dimension — avec l'écart et la direction de tendance (en amélioration, stable, en déclin)
- **Vérification du rejet automatique** : si des règles de rejet automatique ont été déclenchées et quels seuils précis ont été violés
- **Prochaines étapes** : si le contenu a échoué ou nécessite une revue, une checklist de correction priorisée classée par impact ; s'il a réussi, confirmation qu'il est prêt à publier avec toute suggestion de polissage optionnelle

## Agents utilisés

- **quality-assurance** — orchestration complète du pipeline d'évaluation, notation composite avec calcul de note lettre, classification de sévérité des problèmes (critique/modéré/mineur), génération de recommandations de correction avec texte de remplacement précis, comparaison à la référence par rapport aux données de qualité historiques de la marque, application du seuil de rejet automatique, et journalisation de l'évaluation pour le suivi continu de la qualité

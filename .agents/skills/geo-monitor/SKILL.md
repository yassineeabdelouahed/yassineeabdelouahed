---
name: geo-monitor
description: "Suivre la visibilité de marque dans les réponses IA de façon récurrente sur les 6 surfaces canoniques — ChatGPT, Perplexity, Gemini, Google AI Mode, AI Overviews, Copilot — en notant chaque requête selon le référentiel partagé d'aeo-audit et en agrégeant les résultats dans une tendance de santé GEO de 0 à 100 avec des signaux de dérive narrative et des benchmarks concurrentiels. Se déclenche sur « /digital-marketing-pro:geo-monitor », « ChatGPT nous mentionne-t-il », « suis notre visibilité IA dans le temps », « surveille les mentions de marque dans Perplexity », « notre présence dans AI Overviews a-t-elle changé ». Enregistre et compare les exécutions via geo-tracker.py, lit le profil de marque pour le positionnement, et constitue le mode récurrent de /digital-marketing-pro:aeo-audit."
---

# /digital-marketing-pro:geo-monitor

## Objectif

Surveiller et suivre la visibilité de la marque à travers les moteurs d'IA générative. Tester systématiquement la façon dont les plateformes IA répondent aux requêtes pertinentes pour la marque, noter la visibilité à l'aide d'un référentiel structuré, suivre les évolutions dans le temps et identifier les opportunités d'améliorer la présence IA. Cette commande fournit un cadre reproductible et quantitatif pour comprendre où et comment la marque apparaît (ou n'apparaît pas) dans les réponses générées par l'IA — donnant aux marketeurs les données nécessaires pour optimiser ce canal émergent qu'est la generative engine optimization (GEO). Prend en charge l'établissement de référence, le suivi de tendance, le benchmarking concurrentiel et les vérifications d'alignement narratif sur toutes les principales plateformes IA.

**Cette compétence constitue le mode RÉCURRENT du référentiel canonique de notation de la visibilité IA défini dans `/digital-marketing-pro:aeo-audit`.** Elle n'introduit pas un second modèle de notation : elle applique le même référentiel 1-10 par plateforme + les mêmes portes qualité, sur un rythme planifié, et en suit l'évolution dans le temps. Le score de santé GEO sur 0-100 + la note de lettre A-F produits ci-dessous constituent la **vue de tendance** de ces mêmes données — une agrégation longitudinale pour repérer la dynamique, pas un tableau de bord concurrent. Les 6 surfaces canoniques (Google AI Mode, Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot) sont définies une seule fois, en tant que constante `PLATFORMS` dans `scripts/geo-tracker.py`.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Requêtes cibles à tester** : Organisées par type d'intention — requêtes de marque (« Qu'est-ce que [marque] ? »), requêtes produit (« fonctionnalités [produit] de [marque] »), requêtes de comparaison (« [marque] vs [concurrent] »), et requêtes de catégorie (« meilleurs outils [catégorie] »). Minimum 5 requêtes recommandé pour une notation significative. Si non fournies, la commande générera un portefeuille de requêtes par défaut basé sur le profil de marque
- **Plateformes IA à surveiller** : ChatGPT, Perplexity, Gemini, **Google AI Mode**, AI Overviews et Copilot — la valeur par défaut est les six (AI Mode ajouté en mai 2026 — c'est une surface distincte d'AI Overviews qui sélectionne fréquemment des citations différentes pour la même requête). L'utilisateur peut restreindre à des plateformes spécifiques s'il ne s'intéresse qu'à certains moteurs ou a une capacité de test limitée
- **Fréquence de surveillance** : `weekly` (hebdomadaire) ou `monthly` (mensuelle) — détermine à quelle fréquence la marque doit être retestée et comment les données de tendance sont regroupées. Hebdomadaire est recommandé pour les campagnes d'optimisation actives, mensuelle pour un suivi en régime stable
- **Marques concurrentes pour le benchmarking (optionnel)** : Une ou plusieurs marques concurrentes à tester avec le même portefeuille de requêtes — permet une notation de visibilité côte à côte pour comprendre la présence IA relative. Si omis, le rapport se concentre uniquement sur la marque de l'utilisateur sans contexte concurrentiel

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Extraire le nom de marque, les noms de produit, la catégorie, les différenciateurs clés et le positionnement souhaité pour alimenter le portefeuille de requêtes et la notation d'alignement narratif. Vérifier aussi les guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger la voix de marque et les contraintes de messaging. Si aucune marque n'existe, demander : « Configurer une marque d'abord (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Définir le portefeuille de requêtes** : Organiser les requêtes cibles par type d'intention — informationnelle (qu'est-ce que, comment), navigationnelle (spécifique à la marque), transactionnelle (acheter, tarifs, s'inscrire), et comparaison (vs, alternatives, meilleur). Si l'utilisateur a fourni des requêtes, les classer dans ces catégories. Sinon, générer un portefeuille équilibré de 10 à 20 requêtes à partir du profil de marque couvrant les quatre types d'intention. Chaque requête est étiquetée par son type pour une notation segmentée.
3. **Tester chaque requête sur chaque plateforme** : Pour chaque combinaison requête-plateforme, enregistrer la réponse de l'IA et noter la visibilité de la marque à l'aide du référentiel — citée avec lien (10 points : la marque est mentionnée nommément et un lien direct vers le site web ou le contenu de la marque est fourni), mentionnée par son nom (7 points : la marque est explicitement nommée dans la réponse mais sans lien), concept référencé sans attribution (3 points : le produit, la fonctionnalité ou l'approche de la marque est décrit mais la marque elle-même n'est pas nommée), absente (0 point : la marque n'apparaît sous aucune forme), mal représentée (-5 points : la marque est mentionnée mais avec des informations incorrectes, obsolètes ou dommageables). Enregistrer le texte complet de la réponse pour l'analyse narrative.
4. **Enregistrer les résultats** : Stocker chaque résultat requête-plateforme via geo-tracker (`--result` prend la valeur du référentiel : `cited` = citée avec lien, `mentioned` = nommée sans lien, `concept-only` = concept référencé sans attribution, `absent`, `misrepresented`) :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/geo-tracker.py" \
       --brand {slug} --action audit-visibility \
       --query "best project management tool for agencies" \
       --platform ai-mode \
       --result cited \
       --context "AI Mode named the brand and linked its comparison page" \
       --url "https://brand.example/compare"
   ```
   Les valeurs valides pour `--platform` sont les 6 surfaces canoniques : `ai-mode`, `ai-overviews`, `chatgpt`, `perplexity`, `gemini`, `copilot`.
5. **Comparer à la référence** : Si des données de surveillance précédentes existent, comparer les scores actuels au dernier contrôle et à la référence d'origine :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/geo-tracker.py" --brand {slug} --action diff
   ```
   Identifier les améliorations par requête et par plateforme (hausses de score), les baisses (baisses de score), les nouvelles apparitions (passage d'absent à visible), les apparitions perdues (passage de visible à absent), et les nouvelles opportunités (requêtes où les concurrents apparaissent mais pas la marque).
6. **Calculer les scores de visibilité** : Calculer les scores de visibilité par plateforme (moyenne de tous les scores de requêtes sur cette plateforme, échelle 0-100), les scores par type d'intention (quelle est la visibilité de la marque pour les requêtes informationnelles vs transactionnelles), et un score de santé GEO global (moyenne pondérée sur toutes les plateformes et types de requêtes). Si des concurrents ont été fournis, calculer les mêmes scores pour chaque concurrent afin de permettre un classement.
7. **Évaluer l'alignement narratif** : Pour les requêtes où la marque apparaît, comparer ce que dit l'IA au positionnement de marque souhaité issu du profil de marque. Signaler la dérive narrative (l'IA décrit la marque différemment du positionnement voulu), les informations obsolètes (l'IA cite d'anciennes fonctionnalités, tarifs ou dirigeants), les attributs clés manquants (l'IA omet des différenciateurs essentiels), et la mauvaise représentation (l'IA affirme quelque chose de factuellement incorrect sur la marque).
8. **Générer des recommandations** : Sur la base des points faibles, produire une liste priorisée d'actions pour améliorer la visibilité IA — contenu à créer ou mettre à jour pour une meilleure citation, données structurées à ajouter, cohérence d'entité à corriger (recouper avec `/digital-marketing-pro:entity-audit`), corrections narratives nécessaires, et plateformes où un investissement en visibilité aurait l'impact le plus élevé.

## Résultat

Un rapport complet de surveillance de la visibilité IA contenant :

- **Tableau de bord de visibilité IA** : Scores par plateforme (ChatGPT, Perplexity, Gemini, **Google AI Mode**, AI Overviews, Copilot — les 6 surfaces canoniques) sur le référentiel partagé 1-10, plus le score de santé GEO global sur une échelle 0-100 avec note de lettre (A-F) comme **vue de tendance**, et un indicateur de tendance par rapport au contrôle précédent. Les scores 1-10 par plateforme constituent l'évaluation faisant autorité ; la note sur 0-100 n'existe que pour rendre lisible l'évolution longitudinale.
- **Matrice de résultats au niveau requête** : Chaque combinaison requête-plateforme avec score, extrait de réponse et signaux — triable par plateforme, type d'intention ou score
- **Rapport de tendance** : Évolutions de score par rapport à la référence et au dernier contrôle — par plateforme et au global, avec des indicateurs en sparkline pour les tendances directionnelles et les requêtes spécifiques qui se sont améliorées ou détériorées
- **Évaluation de l'alignement narratif** : Résumé par plateforme de la façon dont les réponses IA correspondent au positionnement de marque souhaité, avec signaux de dérive spécifiques, alertes d'informations obsolètes et écarts d'attributs manquants
- **Benchmark concurrentiel** : Si des concurrents ont été fournis — scores de visibilité côte à côte, requêtes où les concurrents surperforment la marque, et territoire narratif occupé par chaque marque dans les réponses IA
- **Principales opportunités d'amélioration** : Requêtes et plateformes où la marque est absente ou sous-représentée alors que les concurrents sont visibles, ou où des requêtes à forte intention ne renvoient aucune présence de marque
- **Actions recommandées classées par impact** : Liste priorisée d'actions spécifiques — création de contenu, mises à jour de données structurées, corrections d'entité, construction de citations — avec impact estimé sur les scores de visibilité et niveau d'effort
- **Entrée de journal d'exécution** : Enregistrement horodaté avec nombre de requêtes, nombre de plateformes, score global, direction de tendance et signaux clés pour la piste d'audit

## Agents utilisés

- **seo-specialist** — Analyse de la visibilité IA à travers les moteurs génératifs, conception du portefeuille de requêtes par type d'intention, notation de la visibilité avec le référentiel citation-mention-absence-mauvaise représentation, évaluation de l'alignement narratif par rapport au positionnement de marque, recommandations de construction de citations, optimisation des données structurées pour la découvrabilité IA, et plans d'action priorisés pour améliorer les scores de santé GEO
- **performance-monitor-agent** — Suivi de tendance entre les périodes de surveillance avec comparaison de référence, détection de changement de score par plateforme et par requête, alertes de seuil pour les baisses ou hausses de visibilité significatives, suivi du score concurrentiel dans le temps, et maintien de l'historique du score de santé GEO pour l'analyse de tendance à long terme

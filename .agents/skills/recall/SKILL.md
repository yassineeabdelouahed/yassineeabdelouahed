---
name: recall
description: "Récupérer des apprentissages marketing validés depuis le graphe d'intelligence composée de la marque pour un canal, une audience, un objectif ou une situation libre — restitués sous forme de playbook thématique prêt à la décision, classé par confiance et récence, avec les insights contradictoires signalés et les gains rapides mis en avant. Se déclenche sur \"/digital-marketing-pro:recall\", \"what do we know about email for this audience\", \"what worked last time we ran a launch campaign\", \"pull past learnings before I plan this\", \"recall insights about paid social\". Lit le profil de marque pour renforcer le contexte et interroge le graphe via intelligence-graph.py ; il récupère et synthétise les apprentissages existants — il n'en enregistre pas de nouveaux."
---

# /digital-marketing-pro:recall

## Objectif

Récupérer les apprentissages pertinents depuis le graphe d'intelligence composée de la marque. Étant donné un contexte — canal, audience, objectif ou situation — restituer les insights validés les plus pertinents, classés par confiance et récence. Transforme la connaissance marketing accumulée en un playbook actionnable pour tout scénario, afin que les apprentissages passés éclairent directement les décisions actuelles sans dépendre de la mémoire ou de recherches dans d'anciens rapports.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Contexte de la requête** : La situation pour laquelle récupérer des apprentissages — spécifiée sous une ou plusieurs des dimensions suivantes : canal (email, réseaux sociaux, recherche payante, SEO, contenu, SMS, etc.), segment d'audience (développeurs, marketeurs, dirigeants, propriétaires de PME, acheteurs entreprise, etc.), objectif (notoriété, conversion, rétention, upsell, reconquête, etc.), type de campagne (lancement produit, saisonnière, evergreen, nurture, événement, etc.), ou une description libre de la situation qui capture le scénario en langage naturel (par ex. « planifier une campagne email Black Friday ciblant les clients inactifs » ou « lancer un nouveau produit auprès d'une audience de développeurs via le content marketing »)
- **Seuil de confiance (optionnel)** : Score de confiance minimum à inclure — la valeur par défaut est 0,3 (inclut les hypothèses et au-delà). Fixer à 0,7+ pour uniquement les insights validés, ou à 0,0 pour tout voir, y compris les observations à un stade précoce
- **Plage temporelle (optionnel)** : Filtrer les apprentissages selon leur date d'enregistrement — « 30 derniers jours », « ce trimestre », « depuis toujours » (par défaut). Les apprentissages récents peuvent être plus pertinents pour les canaux à évolution rapide comme le social payant, tandis que les apprentissages evergreen sur la psychologie de l'audience peuvent avoir de la valeur quel que soit leur âge
- **Nombre maximum de résultats (optionnel)** : Nombre d'apprentissages à retourner — la valeur par défaut est 10. Augmenter pour une recherche exhaustive ou diminuer pour une aide à la décision rapide

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer le secteur de la marque, les segments d'audience et les canaux actifs pour contextualiser la requête et renforcer la pertinence des apprentissages correspondants. Vérifier les SOP d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Interroger le graphe d'intelligence** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/intelligence-graph.py" --brand {slug} --action query-relevant --context '{context_json}' --min-confidence {threshold}`. La requête compare avec toutes les conditions indexées — canal, audience, objectif, type de campagne — et effectue également une correspondance sémantique pour les descriptions libres de situation. `--min-confidence` applique le filtre de seuil de confiance ; appliquer la préférence de plage temporelle lors du classement (étape 3), pas comme un indicateur de requête.
3. **Classer les résultats** : Noter chaque apprentissage retourné selon un composite de pertinence (à quel point les conditions de l'apprentissage correspondent au contexte de la requête), de confiance (à quel point l'insight est validé sur la base des preuves accumulées) et de récence (depuis combien de temps l'apprentissage a été enregistré ou mis à jour pour la dernière fois, avec une courbe de décroissance qui pondère davantage les apprentissages récents pour les canaux volatils). Retourner les meilleurs résultats selon le score composite.
4. **Regrouper en thèmes actionnables** : Regrouper les apprentissages classés en thèmes cohérents — par ex. « Contenu et messages » (quoi dire), « Timing et fréquence » (quand le dire), « Comportement de l'audience » (comment elle réagit), « Tactiques par canal » (techniques spécifiques à la plateforme), et « À éviter » (anti-patterns validés). Chaque thème reçoit une phrase de synthèse résumant les insights regroupés.
5. **Mettre en évidence les insights contradictoires** : Identifier tout apprentissage au sein des résultats qui se contredit — signaler explicitement les deux côtés de la contradiction, leurs scores de confiance respectifs, et les conditions pouvant expliquer la différence (par ex. « vrai pour les PME mais pas pour les grandes entreprises »). Recommander lequel suivre en fonction de la confiance et de la récence, ou suggérer un test A/B pour résoudre la contradiction.
6. **Présenter sous forme de playbook actionnable** : Formater le résultat comme un playbook prêt à la décision — sections thématiques avec apprentissages classés, un encart « gains rapides » pour les insights actionnables à forte confiance, un encart « à tester » pour les hypothèses moins confirmées valant la peine d'être validées, et un encart « à surveiller » pour les anti-patterns validés et les contradictions.

## Résultat

- **Apprentissages pertinents classés par confiance** : Chaque apprentissage affiché avec son texte d'insight, son score de confiance, sa source, sa date d'enregistrement et les conditions de contexte correspondantes — triés par score composite de pertinence-confiance-récence
- **Regroupés par thème** : Apprentissages organisés en clusters thématiques actionnables (contenu, timing, audience, tactiques par canal, anti-patterns) avec une phrase de synthèse par thème résumant l'insight collectif
- **Insights contradictoires signalés** : Toute contradiction au sein des résultats mise en évidence avec les deux perspectives, leurs scores de confiance, les conditions qualifiantes, et une recommandation sur laquelle suivre ou comment la tester
- **Recommandations actionnables** : Une section playbook synthétisée traduisant les apprentissages bruts en recommandations spécifiques pour la situation interrogée — quoi faire, quoi éviter, et quoi tester
- **Statistiques de la base d'intelligence** : Total des apprentissages dans le graphe de la marque, nombre correspondant à cette requête, confiance moyenne des résultats correspondants, et distribution d'âge des résultats correspondants

## Agents utilisés

- **intelligence-curator** — Exécution de requêtes sur le graphe d'intelligence avec correspondance de contexte multidimensionnelle et recherche sémantique pour les requêtes libres, classement composite pertinence-confiance-récence, regroupement thématique des résultats en groupes actionnables, détection de contradictions sur les résultats retournés avec recommandations de résolution, et mise en forme de playbook traduisant l'intelligence brute en recommandations prêtes à la décision
</content>

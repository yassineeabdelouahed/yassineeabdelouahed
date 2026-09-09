---
name: dark-funnel
description: "Cartographier l'activité du parcours acheteur que votre attribution ne peut pas voir — mentions Reddit et communautés, citations de chatbots IA, effet des podcasts, dark social, et bouche-à-oreille — en un rapport d'intelligence de tunnel obscur avec des scores de santé par canal, des corrélations avec l'activité marketing, et des recommandations d'investissement priorisées. Se déclenche sur « /digital-marketing-pro:dark-funnel », « d'où vient notre trafic non suivi », « la recherche de marque a explosé et on ne sait pas pourquoi », « cartographie notre tunnel obscur », « des gens disent avoir entendu parler de nous dans un podcast ». Lit le profil de marque et se combine avec /digital-marketing-pro:geo-monitor pour l'apport de signal de visibilité IA."
---

# /digital-marketing-pro:dark-funnel

## Objectif

Cartographier et éclairer le tunnel obscur — les activités du parcours acheteur invisibles pour l'attribution traditionnelle. Identifier où les prospects rencontrent la marque en dehors des canaux traçables (discussions Reddit, requêtes de chatbots IA, mentions de podcasts, forums communautaires, bouche-à-oreille, partage en dark social) et faire ressortir les signaux d'intention qui révèlent l'ampleur réelle de la notoriété et de la considération de marque se produisant au-delà de ce que les plateformes analytiques peuvent mesurer.

## Éléments à fournir

L'utilisateur doit fournir (ou se verra demander) :

- **Nom de la marque et noms de produits** : La marque et les produits ou services spécifiques à suivre sur les canaux de tunnel obscur — utilisés pour définir les termes de recherche, les schémas de mention, et les requêtes de signal
- **Présence communautaire connue** : Subreddits, communautés Slack, serveurs Discord, forums sectoriels, ou plateformes de niche où la marque a une présence officielle ou organique — ce sont les principaux postes d'écoute du tunnel obscur
- **Apparitions dans des podcasts** : Épisodes, émissions, ou parrainages auxquels la marque a participé — utilisés pour corréler les visites d'URL vanity, les utilisations de codes promo, et les pics de recherche de marque avec des dates de diffusion précises
- **Données de visibilité IA (optionnel)** : Résultat de `/digital-marketing-pro:geo-monitor` montrant comment les chatbots IA (ChatGPT, Perplexity, Gemini) référencent ou recommandent la marque — un canal de tunnel obscur en pleine croissance
- **Tendances de volume de recherche de marque** : Données de Google Search Console ou de mots-clés tiers montrant le volume de recherche de marque dans le temps — le signal proxy le plus fort pour l'exposition de marque hors ligne et non suivie
- **Données d'enquête « comment avez-vous entendu parler de nous » (optionnel)** : Attribution auto-déclarée provenant des formulaires de leads, des flux d'intégration, ou des enquêtes post-achat — preuve directe des points de contact du tunnel obscur que les clients identifient eux-mêmes

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour connaître le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, le contexte sectoriel, et le paysage concurrentiel connu. Vérifier également les directives à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Agréger les signaux de tunnel obscur** : Collecter et normaliser les données de toutes les sources de tunnel obscur disponibles — tendances de volume de recherche de marque dans le temps (le principal proxy pour l'exposition non suivie), fréquence et sentiment des mentions Reddit et communautaires, données de citation de chatbots IA issues du geo-tracker, anomalies de trafic direct corrélées à des activités hors ligne, données d'attribution de podcast (visites d'URL vanity, utilisation de codes promo, pics de trafic post-épisode), et données de réponse d'enquête auto-déclarées catégorisées par source.
3. **Corréler les signaux avec les activités marketing** : Croiser les pics de signal de tunnel obscur avec une chronologie des activités marketing connues — les pics de recherche de marque suivent-ils les épisodes de podcast ? Les mentions communautaires augmentent-elles après les lancements de produits ou la couverture presse ? Le trafic direct augmente-t-il après les participations à des conférences ? Identifier quelles activités génèrent la réponse de tunnel obscur la plus forte et lesquelles n'ont aucun signal obscur mesurable. **Remarque :** le nouveau canal par défaut GA4 **« Assistant IA »** rend désormais directement mesurable une partie du trafic de référence d'assistants IA (ChatGPT, Gemini, Copilot, Perplexity, etc.) auparavant obscur — extrayez-le de GA4 et traitez-le comme *éclairé*, en le soustrayant de votre influence IA « obscure » estimée afin que les deux ne soient pas comptés en double.
4. **Cartographier le parcours acheteur invisible** : Construire une carte du tunnel obscur identifiant chaque point de contact non suivi, sa position dans le parcours acheteur (notoriété, considération, décision), la taille d'audience estimée, et la trajectoire de croissance. Classer les points de contact par type de canal — communauté (Reddit, forums, Discord), média (podcasts, mentions YouTube), IA (citations de chatbots), social (partage en dark social via DM et groupes privés), et bouche-à-oreille (déclaré par enquête).
5. **Évaluer la santé du tunnel obscur par canal** : Noter chaque canal de tunnel obscur selon la force du signal (volume et fiabilité des données), la tendance de croissance (en expansion, stable, ou en déclin), le sentiment de marque au sein du canal, et la proximité de conversion (à quel point le canal est proche de l'intention d'achat). Produire un score composite de santé du tunnel obscur.
6. **Recommander des opportunités d'investissement dans le tunnel obscur** : Sur la base de la notation et de l'analyse de corrélation, identifier les opportunités d'investissement à plus fort retour dans le tunnel obscur — canaux à signal fort mais sans investissement de marque intentionnel, canaux émergents montrant une croissance, et canaux sous-performants qui pourraient être amplifiés avec un effort ciblé.

## Résultat

Un rapport d'intelligence de tunnel obscur complet contenant :

- **Carte du tunnel obscur** : Représentation visuelle de tous les points de contact invisibles identifiés, organisés par type de canal et étape du parcours acheteur, avec la portée d'audience estimée par point de contact
- **Force du signal par canal obscur** : Volume et fiabilité de signal quantifiés pour chaque source de tunnel obscur — tendances de volume de recherche de marque, fréquence des mentions communautaires, taux de citation IA, indicateurs d'attribution de podcast, indicateurs de dark social, et sources déclarées par enquête
- **Analyse de corrélation** : Superposition chronologique montrant quelles activités marketing génèrent quels signaux de tunnel obscur, avec des scores de force de corrélation et le temps de latence entre l'activité et la réponse du signal
- **Score de santé du tunnel obscur** : Score composite sur tous les canaux avec répartition par canal — force du signal, tendance de croissance, sentiment, et évaluations de proximité de conversion
- **Estimation d'influence** : Contribution estimée des canaux de tunnel obscur au pipeline et au chiffre d'affaires global, basée sur la corrélation de signal et la triangulation des données d'enquête
- **Recommandations d'investissement** : Liste priorisée des opportunités d'investissement dans le tunnel obscur avec l'impact attendu, l'effort requis, et les tactiques recommandées pour chaque canal
- **Plan de surveillance** : Cadence de suivi continu du tunnel obscur — quels signaux surveiller chaque semaine, chaque mois, et chaque trimestre, avec des seuils d'alerte pour les changements significatifs

## Agents utilisés

- **market-intelligence** — Agrégation de signaux de tunnel obscur sur les plateformes communautaires, podcasts, chatbots IA, et canaux de dark social, croisement des pics de signal avec les chronologies d'activité marketing pour identifier les schémas de corrélation, détection de tendances sur les sources de tunnel obscur pour faire émerger les canaux émergents et déclinants, et benchmarking concurrentiel de tunnel obscur lorsque les données sont disponibles
- **analytics-analyst** — Analyse du volume de recherche de marque et décomposition des tendances, détection d'anomalies de trafic direct et identification des lacunes d'attribution, notation de corrélation entre les activités marketing et les réponses de signal de tunnel obscur avec calcul du temps de latence, et notation composite de santé du tunnel obscur sur les dimensions force du signal, croissance, sentiment, et proximité de conversion
</content>

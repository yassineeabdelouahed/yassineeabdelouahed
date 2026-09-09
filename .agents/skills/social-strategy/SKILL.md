---
name: social-strategy
description: "Construit une stratégie de réseaux sociaux spécifique par plateforme : 3 à 5 piliers de contenu, cadence de publication, ratios de mix de contenu, un guide d'engagement avec des modèles de réponse, des tactiques de croissance, des objectifs de KPI, et un plan de démarrage rapide sur 30 jours pour Instagram, TikTok, LinkedIn, X, YouTube, Facebook, Pinterest, et Threads. Stratégie uniquement — ne planifie ni ne publie rien. Se déclenche sur \"/digital-marketing-pro:social-strategy\", \"build our social media strategy\", \"how often should we post on LinkedIn\", \"define our content pillars\", \"our engagement is flat, what's the plan\". Lit le profil de marque, les guidelines, et les procédures d'agence afin que les piliers, la cadence, et les guides correspondent à la voix de marque et aux règles de conformité."
argument-hint: "[platform or objective]"
---

# /digital-marketing-pro:social-strategy

## Objectif

Construire une stratégie de réseaux sociaux complète et spécifique par plateforme qui définit les piliers de contenu, la cadence de publication, le guide d'engagement, l'approche de gestion de communauté, et les tactiques de croissance adaptées à l'algorithme et au comportement d'audience de chaque plateforme.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Plateformes** : Pour quelles plateformes sociales élaborer une stratégie (Instagram, TikTok, LinkedIn, X, YouTube, Facebook, Pinterest, Threads)
- **État actuel** : Nombre d'abonnés existants, taux d'engagement, performance de contenu (si disponible)
- **Objectifs** : Croissance, engagement, trafic, leads, construction de communauté, leadership éclairé
- **Ressources** : Taille de l'équipe, capacité de création de contenu, outils utilisés
- **Audience** : Audience cible par plateforme (ou utiliser les personas de la marque)
- **Concurrents** : Comptes sociaux à utiliser comme référence (optionnel)

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de directives** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : "Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ?" — ou procéder avec les valeurs par défaut.
2. Auditer la présence sociale actuelle : mix de contenu, fréquence de publication, motifs d'engagement, qualité des abonnés
3. Définir 3 à 5 piliers de contenu alignés sur l'expertise de la marque et les centres d'intérêt de l'audience
4. Définir une cadence de publication spécifique par plateforme selon les meilleures pratiques d'algorithme et la capacité de l'équipe
5. Concevoir les ratios de mix de contenu par plateforme : éducatif, divertissant, promotionnel, communautaire, tendance
6. Construire un guide d'engagement : stratégie de commentaires, flux de messages directs, encouragement de l'UGC, rituels de communauté
7. Définir des tactiques de croissance par plateforme : stratégie de hashtags, collaboration, critères de boost payant, promotion croisée
8. Créer des recommandations de format de contenu par plateforme (carrousels, reels, stories, fils, lives)
9. Définir des KPI par plateforme avec des références de croissance réalistes
10. Construire un plan d'action de démarrage rapide sur 30 jours

## Résultat

Une stratégie de réseaux sociaux structurée contenant :

- Une stratégie plateforme par plateforme avec justification de la priorisation
- Un cadre de piliers de contenu avec des exemples de sujets par pilier
- Un calendrier de cadence de publication avec les horaires optimaux par plateforme
- Des recommandations de format de contenu avec des références de performance
- Un guide d'engagement avec des modèles de réponse et des règles d'escalade
- Une feuille de route de tactiques de croissance par plateforme
- Des directives de gestion de communauté
- Des objectifs de KPI et un cadre de mesure par plateforme
- Un plan d'action de démarrage rapide sur 30 jours avec des tâches quotidiennes/hebdomadaires spécifiques

## Agents utilisés

- **content-creator** — Stratégie de contenu, développement des piliers, recommandations de format, tactiques d'engagement
- **social-media-manager** — Stratégie native par plateforme, optimisation d'algorithme, stratégie de hashtags, optimisation des horaires de publication, gestion de communauté

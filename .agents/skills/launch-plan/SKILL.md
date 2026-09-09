---
name: launch-plan
description: "Construire un playbook de lancement en trois phases — pré-lancement (J-30), un guide opérationnel de jour de lancement heure par heure, et une optimisation post-lancement (J+30) — avec des responsables et des échéances par tâche, des plans d'activation par canal, un registre des risques, et des KPI par phase. Se déclenche sur \"/digital-marketing-pro:launch-plan\", \"plan our product launch\", \"launch playbook for the new feature\", \"what should launch week look like\", \"coordinate the rebrand rollout\". Planification uniquement : il n'effectue lui-même aucune action externe ; toute étape du playbook confiée à un skill d'exécution comme /digital-marketing-pro:launch-campaign ou /digital-marketing-pro:send-email-campaign doit d'abord franchir la propre porte d'approbation par oui explicite de ce skill. Lit le profil de marque, les guidelines, les modèles, et les SOP d'agence."
argument-hint: "[product-name]"
disable-model-invocation: false
---

# /digital-marketing-pro:launch-plan

## Objectif

Construire un playbook de lancement complet qui coordonne toutes les activités marketing sur trois phases — pré-lancement, lancement, et post-lancement — afin de maximiser l'impact et de maintenir l'élan.

## Porte d'exécution (OBLIGATOIRE — ne peut pas être contournée)

Ce skill produit un **playbook** de lancement — il n'effectue lui-même aucune action externe, donc il s'exécute librement. La porte régit la *transmission* : avant que TOUTE étape de ce playbook ne soit exécutée par un skill d'exécution en aval (`/digital-marketing-pro:launch-campaign`, `/digital-marketing-pro:launch-ad-campaign`, `/digital-marketing-pro:send-email-campaign`, etc.), ce skill présente son propre résumé d'exécution et l'utilisateur doit taper `yes`. Ne jamais continuer sur une saisie ambiguë, ne jamais exécuter automatiquement une étape du playbook, et ne jamais relancer automatiquement une étape échouée.

## Entrée requise

L'utilisateur doit fournir (ou se verra demander) :

- **Ce qui est lancé** : produit, fonctionnalité, service, rebranding, ou événement
- **Date de lancement** : date cible ou plage de dates
- **Objectifs de lancement** : inscriptions, revenu, couverture presse, objectifs de notoriété
- **Audience cible** : audiences primaire et secondaire du lancement
- **Canaux disponibles** : quels canaux sont actifs et disposent de ressources
- **Budget** : budget de lancement dédié (le cas échéant)
- **Actifs disponibles** : ce qui existe déjà (pages produit, démos, dossiers de presse, création)
- **Équipe** : qui est impliqué et quels sont leurs rôles

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Définir le niveau de lancement (Niveau 1 majeur, Niveau 2 modéré, Niveau 3 mineur) pour calibrer l'effort
3. **Phase de pré-lancement** (J-30 à J-1) : contenu teaser, construction d'audience, préparation presse, sollicitation d'influenceurs, réchauffement de la liste email, landing page, liste d'attente
4. **Phase de lancement** (J-0 à J+3) : annonce coordonnée sur tous les canaux, communiqué de presse, envoi email massif, blitz social, activation des médias payants, engagement communautaire
5. **Phase de post-lancement** (J+4 à J+30) : suivi de performance, collecte de retours utilisateurs, contenu de suivi, retargeting, optimisation, études de cas
6. Construire un calendrier détaillé avec responsables, livrables, et échéances par tâche
7. Définir les métriques de succès par phase et les KPI globaux de lancement
8. Identifier les risques et construire des plans de contingence

## Sortie

Un playbook de lancement structuré contenant :

- Vue d'ensemble du lancement avec classification de niveau et critères de succès
- Checklist de pré-lancement avec calendrier, livrables, et responsables
- Guide opérationnel du jour de lancement avec plan de coordination heure par heure
- Plan d'optimisation post-lancement avec boucles de retour
- Plan d'activation canal par canal avec tactiques précises
- Liste des besoins en contenu et actifs
- Registre des risques avec actions de contingence
- Tableau de bord KPI avec objectifs par phase

## Agents utilisés

- **marketing-strategist** — Architecture de lancement, phasage, définition des objectifs, coordination des canaux
- **content-creator** — Messages de lancement, actifs de contenu, texte d'annonce
- **pr-outreach** — Stratégie médiatique, dossiers de presse, sollicitation d'influenceurs

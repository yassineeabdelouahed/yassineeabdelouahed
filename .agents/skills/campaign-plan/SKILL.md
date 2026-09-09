---
name: campaign-plan
description: "Générer un plan de campagne multicanal complet — objectifs SMART, segments d'audience avec critères de ciblage, mix de canaux avec justification, un tableau d'allocation budgétaire avec estimations de portée/coût, une chronologie en phases de la pré-campagne au bilan, un cadre de KPI, et un registre des risques. Se contente de planifier ; ne lance ni ne modifie de campagnes. Se déclenche sur \"/digital-marketing-pro:campaign-plan\", \"plan a campaign for our product launch\", \"build the Q3 campaign plan\", \"what channels and budget for lead gen\", \"draft a campaign timeline with KPIs\". Lit le profil de marque, les guidelines et les procédures d'agence, et réutilise les documents de référence de /digital-marketing-pro:campaign-orchestrator pour les cadres de planification plutôt que de les redériver."
argument-hint: "[campaign-objective]"
---

# /digital-marketing-pro:campaign-plan

## Objectif

Générer un plan de campagne multicanal complet, prêt pour l'exécution. Couvre les objectifs stratégiques, la segmentation d'audience, la sélection de canaux, la répartition budgétaire, la chronologie en phases, et des KPI mesurables.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Objectif de la campagne** : ce que la campagne doit accomplir (notoriété, leads, ventes, rétention, etc.)
- **Produit/service** : ce qui est promu
- **Audience cible** : à qui s'adresse la campagne (ou utiliser les personas de marque existants)
- **Budget** : budget total disponible ou fourchette budgétaire
- **Chronologie** : durée de la campagne ou dates clés (lancement, événement, saison)
- **Contraintes** : toute restriction de canal, exigence de conformité, ou limitation créative

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifiez aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions et les fichiers de catégorie pertinents. Vérifiez les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Charger les références de planification partagées (sans les redériver)** : consommez les documents de référence de campaign-orchestrator plutôt que de dupliquer leurs cadres — `skills/campaign-orchestrator/campaign-planning.md` (cadre de planification), `skills/campaign-orchestrator/channel-strategy.md` (sélection de canaux), `skills/campaign-orchestrator/budget-allocation.md` (heuristiques de répartition budgétaire), `skills/campaign-orchestrator/utm-tracking.md` (conventions de nommage UTM), et `skills/campaign-orchestrator/abm-strategy.md` (ABM). Cette compétence produit le document de plan ; `/digital-marketing-pro:campaign-orchestrator` exécute l'orchestration multi-agents plus large sur la base des mêmes références.
3. Clarifiez l'objectif de la campagne et classez-le comme notoriété, considération, ou conversion
4. Définissez les segments d'audience primaires et secondaires avec les paramètres de ciblage
5. Recommandez un mix de canaux basé sur le comportement de l'audience, le budget, et l'objectif
6. Allouez le budget entre les canaux en utilisant les référentiels de CPM/CPC attendus pour le secteur
7. Construisez une chronologie en phases : pré-lancement, lancement, maintien, optimisation, bilan
8. Définissez les KPI par canal et les métriques de succès globales de la campagne
9. Identifiez les dépendances, les risques, et les actions de contingence
10. Produisez le plan complet dans un format structuré et actionnable

## Résultat

Un document de plan de campagne structuré contenant :

- Aperçu de la campagne et objectifs SMART
- Segments d'audience avec critères de ciblage
- Stratégie de canaux avec justification pour chaque canal
- Tableau d'allocation budgétaire avec estimations de portée/coût attendues
- Chronologie en phases avec jalons et livrables
- Cadre de tableau de bord KPI avec objectifs et méthode de mesure
- Registre des risques avec stratégies d'atténuation

## Agents utilisés

- **marketing-strategist** — Architecture de campagne, stratégie d'audience, définition des objectifs
- **media-buyer** — Sélection de canaux, allocation budgétaire, référentiels de performance

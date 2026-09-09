---
name: agency-dashboard
description: "Générer un tableau de bord au niveau du portefeuille couvrant TOUTES les marques clientes — scores de santé RAG par client, activité de campagne, rythme budgétaire, KPI agrégés, utilisation de l'équipe, approbations en attente et un panneau d'alertes — conçu pour les réunions d'équipe et les revues hebdomadaires d'agence. Se déclenche sur \"/digital-marketing-pro:agency-dashboard\", \"how are all our clients doing\", \"portfolio health check\", \"budget pacing across accounts\", \"which accounts are at risk\". Recense chaque marque sous ~/.claude-marketing/brands/ et récupère les données via campaign-tracker.py, execution-tracker.py et team-manager.py ; approfondissez un client unique avec /digital-marketing-pro:performance-report ou /digital-marketing-pro:client-report."
user-invocable: true
triggers:
  - agency portfolio dashboard
  - cross-brand campaign status
  - budget pacing all clients
  - agency KPI overview
  - portfolio health check
  - multi-client dashboard
  - agency team utilization
  - overview of all client accounts
---

# /digital-marketing-pro:agency-dashboard

## Objectif

Générer un tableau de bord au niveau du portefeuille agrégeant les indicateurs de santé de TOUTES les marques clientes. Affiche en un coup d'œil l'activité de campagne, le rythme budgétaire, l'atteinte des KPI, le pipeline de contenu et l'utilisation de l'équipe — offrant à la direction d'agence une vue unique de la santé opérationnelle sans avoir à ouvrir chaque compte individuellement. Conçu pour les réunions quotidiennes, les revues d'agence hebdomadaires, ou les contrôles de santé à la demande.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Portée du tableau de bord** : toutes les marques ou une liste spécifique de slugs de marque à inclure dans la vue du portefeuille
- **Période** : semaine, mois ou trimestre en cours — détermine les calculs de rythme et les fenêtres de comparaison
- **Niveau de détail** : synthétique (scores de santé de haut niveau par client) ou détaillé (répartitions au niveau des campagnes par client avec les métriques de chaque campagne)
- **Préférences de tri/filtrage** : trier les clients par score de santé, dépense, revenu ou ordre alphabétique — et éventuellement filtrer uniquement sur les comptes à risque (orange/rouge)
- **Filtre d'équipe (facultatif)** : filtrer par responsable de compte ou pôle d'équipe si l'agence a plusieurs pôles gérant différents ensembles de clients
- **Référence de comparaison (facultative)** : comparer la période actuelle à la période précédente, à la même période l'année dernière, ou au plan/objectif — par défaut, la période précédente
- **Surcharges de seuil d'alerte (facultatives)** : seuils personnalisés pour les alertes de baisse de performance ou la tolérance de rythme budgétaire — par défaut, baisse de performance de 20 % et écart de rythme de 10 %
- **Format d'export (facultatif)** : sortie en markdown, Google Sheets ou message Slack — par défaut, markdown

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. Vérifier également l'existence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Recenser toutes les marques** : parcourir `~/.claude-marketing/brands/` pour identifier tous les répertoires de marques configurées (à l'exclusion de `_active-brand.json`). Pour chaque marque, charger `profile.json` afin d'obtenir le nom du client, le secteur, le type d'engagement, les dates de contrat, les membres d'équipe assignés et les objectifs de KPI
3. **Récupérer les données de campagne par marque** : pour chaque marque dans la portée, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` pour récupérer les campagnes actives, leurs statuts, budgets et objectifs (utiliser `--action get-campaign --id {id}` pour le détail d'une campagne unique)
4. **Récupérer le statut d'exécution par marque** : pour chaque marque, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history` pour obtenir les exécutions enregistrées — livrables terminés, lancements et tâches — puis déduire le statut en attente/en retard dans l'analyse
5. **Vérifier le rythme budgétaire par marque** : pour chaque marque, comparer la dépense réelle à date par rapport à la dépense planifiée pour la période en cours — calculer le pourcentage de rythme et projeter la dépense de fin de période au rythme actuel
6. **Calculer le score de santé par client** : appliquer la formule de notation RAG issue de `skills/context-engine/agency-operations-guide.md` :
   - Vert : dans les temps sur tous les KPI, budget dans le rythme (à moins de 10 %), aucun élément en retard, pipeline de contenu fluide
   - Orange : 1 à 2 KPI à risque, léger écart de rythme (10-20 %), éléments approchant leur échéance, ou approbations en attente qui vieillissent
   - Rouge : écarts significatifs sur les KPI, dépassement budgétaire (>20 %), échéances manquées, campagnes bloquées, ou déconnexions de MCP
7. **Agréger les KPI du portefeuille** : additionner le nombre total de campagnes actives, la dépense mensuelle totale, le ROAS moyen tous clients confondus, le total de leads/conversions, le total des livrables en attente, et la répartition globale de la santé du portefeuille (nombre et pourcentage de vert/orange/rouge)
8. **Vérifier l'utilisation de l'équipe** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/team-manager.py" --action check-capacity --brand {slug}` pour évaluer la charge de travail actuelle de l'équipe — capacité disponible par membre de l'équipe, personnel surchargé signalé, comptes à risque de sous-service, et suivi des heures facturables. **Ajouter éventuellement une ligne de coût Claude Code — uniquement si l'utilisateur fournit les données.** Le plugin ne peut pas lire lui-même l'usage de Claude Code. Si l'utilisateur colle la sortie de sa propre commande `/usage` (une commande slash de la CLI Claude Code qu'il exécute de manière interactive), agréger les chiffres de tokens/coûts par modèle qu'elle rapporte dans une ligne « Consommation Claude Code » afin que la direction voie le coût de l'IA avant la facture mensuelle. Étiqueter les modèles selon les noms indiqués dans la sortie `/usage` de l'utilisateur — ne pas présumer d'identifiants de modèle spécifiques. Les espaces de travail organisés par répertoire et par marque (`~/work/clients/{slug}`) permettent d'attribuer les chiffres à la marque.
9. **Identifier les approbations en attente** : parcourir les journaux d'exécution de toutes les marques pour les éléments en attente d'approbation client ou interne — signaler tout élément de plus de 48 heures comme en retard, regrouper par marque et par niveau d'urgence (routine, sensible au temps, bloquant)
10. **Faire remonter les échéances à venir** : compiler les échéances de toutes les marques pour les 7 et 14 prochains jours — lancements de campagne, dates de livraison de contenu, échéances de reporting, jalons de contrat, dates de renouvellement, et calendriers de QBR
11. **Détecter les alertes et anomalies** : signaler toute marque présentant des baisses de performance soudaines (>20 % semaine sur semaine sur le KPI principal), des problèmes de rythme budgétaire (>10 % en avance ou en retard sur le plan), des campagnes bloquées (aucune activité depuis 5 jours ou plus), des échecs de connexion MCP, ou des identifiants expirant
12. **Vérifier le pipeline de contenu** : agréger le statut du contenu sur toutes les marques — éléments en brouillon, en revue, approuvés, planifiés et publiés — identifier les goulots d'étranglement là où le contenu stagne à une étape particulière
13. **Générer une comparaison de tendance** : comparer la santé actuelle du portefeuille à la période de référence sélectionnée — montrer une trajectoire en amélioration, stable ou en déclin pour chaque client et pour le portefeuille global, avec des flèches directionnelles
14. **Compiler le tableau de bord du portefeuille** : assembler toutes les données dans un tableau de bord structuré, trié selon la préférence de l'utilisateur, avec un détail exploitable pour tout client individuel

## Résultat

Un tableau de bord de portefeuille structuré contenant :

- **Résumé de la santé du portefeuille** : nombre total de clients dans la portée, répartition de la santé (nombre et pourcentage de vert/orange/rouge), score de santé global du portefeuille (pondéré par la dépense client), et direction de la tendance d'une période à l'autre
- **Fiches de santé par client** : pour chaque marque — nom du client, score de santé (RAG), nombre de campagnes actives, dépense mensuelle avec statut de rythme, KPI principal vs objectif avec écart, prochaine échéance, alerte principale le cas échéant, et responsable de compte assigné
- **Tableau des KPI agrégés** : dépense totale du portefeuille, ROAS moyen, total des campagnes actives, total de leads/conversions générés, tendances d'efficacité des coûts, et comparaison d'une période à l'autre avec flèches directionnelles
- **Résumé du rythme budgétaire** : statut de rythme par marque (dans le rythme, sous-dépense, sur-dépense) avec projection de dépense de fin de période, écart par rapport au plan en montant et en pourcentage, et agrégat de rythme au niveau du portefeuille
- **Matrice d'utilisation de l'équipe** : charge de travail par membre de l'équipe (comptes gérés, heures allouées, pourcentage de capacité, ratio facturable), alertes de surcharge, capacité disponible pour de nouveaux travaux, et recommandations de dotation
- **Consommation Claude Code (par marque)** — *uniquement si l'utilisateur a fourni des données `/usage`* : agrégée par répertoire de travail associé à la marque, selon les niveaux de modèle rapportés par la sortie `/usage` de l'utilisateur, avec les totaux de tokens et le coût en dollars pour la fenêtre de reporting. Signaler toute marque dont la dépense Claude Code est >2× la médiane du portefeuille pour le même niveau de forfait, comme candidate à une revue du schéma d'engagement ou à une renégociation tarifaire. Omettre entièrement ce panneau si aucune donnée d'usage n'a été fournie.
- **File d'approbations en attente** : tous les éléments en attente d'approbation sur toutes les marques, avec description de l'élément, ancienneté en heures, propriétaire responsable, marque, niveau d'urgence, et impact estimé du retard
- **Échéances à venir (7/14 jours)** : liste chronologique des échéances à venir avec marque, type de livrable, propriétaire responsable, jours restants, statut de dépendance, et évaluation du risque en cas de non-respect
- **Statut du pipeline de contenu** : vue agrégée du contenu en brouillon, en revue, approuvé et planifié sur toutes les marques, avec des comptages étape par étape et l'identification des goulots d'étranglement
- **Panneau d'alertes et d'anomalies** : baisses de performance, problèmes de rythme, campagnes bloquées, échecs de connexion MCP, identifiants expirants, ou éléments en retard nécessitant une attention immédiate — triés par sévérité
- **Suivi des contrats et renouvellements** : renouvellements de contrat à venir, jalons d'engagement, et indicateurs de risque de rétention pour les clients approchant de leur fenêtre de renouvellement
- **Guide d'approfondissement** : instructions pour examiner en détail un client individuel via `/digital-marketing-pro:performance-report`, `/digital-marketing-pro:client-report`, ou `/digital-marketing-pro:credential-switch` pour activer le contexte de cette marque

## Agents utilisés

- **agency-operations** — Agrégation de portefeuille, notation de santé par client, analyse de l'utilisation de l'équipe, suivi des approbations, compilation des échéances, calculs de rythme budgétaire, agrégation du pipeline de contenu et détection d'alertes
- **analytics-analyst** — Analyse des métriques, agrégation des KPI, calculs de tendance, détection d'anomalies, benchmarking de performance sur le portefeuille, et calculs de la référence de comparaison

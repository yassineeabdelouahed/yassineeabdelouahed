---
name: budget-tracker
description: "Suivre en temps réel le rythme des dépenses publicitaires sur les plateformes publicitaires connectées (Google Ads, Meta, LinkedIn, TikTok) — produit un tableau de bord budgétaire avec taux de consommation journalier, projections de fin de période, alertes de sur/sous-dépense et recommandations de réallocation chiffrées, étayées par le contexte CPA/ROAS. Se contente de surveiller et de recommander ; ne modifie jamais les budgets des plateformes. Se déclenche sur \"/digital-marketing-pro:budget-tracker\", \"are we overspending this month\", \"how is our ad budget pacing\", \"track spend across platforms\", \"will we blow through the budget cap\". Lit les objectifs budgétaires du profil de marque, exécute scripts/ad-budget-pacer.py, et enregistre des instantanés pour l'historique de tendance ; se combine avec /digital-marketing-pro:budget-optimizer."
---

# /digital-marketing-pro:budget-tracker

## Objectif

Suivre le budget publicitaire en temps réel sur toutes les plateformes publicitaires connectées. Analyser le rythme des dépenses par rapport aux objectifs, projeter les totaux de fin de période, signaler les risques de sur-dépense et les inefficacités de sous-dépense, calculer les taux de consommation journaliers, et recommander des réallocations budgétaires pour maximiser le ROI sur le budget restant. Conçu pour les media buyers et responsables marketing qui ont besoin d'une vue unique de l'endroit où va l'argent et de son efficacité réelle.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Période budgétaire** : ce mois, ce trimestre, ou une plage de dates personnalisée (ex. : « 1er février - 31 mars »).
  Détermine le dénominateur de rythme et l'horizon de projection
- **Plateformes publicitaires à inclure** : toutes les plateformes connectées ou des plateformes spécifiques (ex. : « Google Ads et Meta uniquement »).
  Par défaut, tous les MCP publicitaires connectés
- **Objectifs budgétaires par plateforme** (facultatif) : objectifs de dépense spécifiques par plateforme pour la période.
  Si omis, les objectifs sont tirés du budget_range de `profile.json` et de toute allocation par plateforme précédemment enregistrée
- **Budget total** (facultatif) : plafond budgétaire global pour la période.
  Si omis, tiré du budget_range de `profile.json`
- **Seuils d'alerte** (facultatif) : seuils personnalisés pour les alertes de sur-rythme (par défaut : >110 % du rythme attendu) et
  de sous-dépense (par défaut : <70 % du rythme attendu)
- **Inclure les indicateurs d'efficacité** (facultatif) : indique si le CPA, le ROAS et les données de conversion doivent être récupérés en plus des dépenses.
  Par défaut, oui

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. Vérifiez aussi la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Extraire les objectifs budgétaires** : récupérez le `budget_range` de `profile.json` et toute allocation par plateforme
   enregistrée lors d'exécutions précédentes de budget-optimizer ou media-plan. Si l'utilisateur a fourni des objectifs explicites, utilisez-les en priorité.
   Calculez le taux de dépense journalier cible pour chaque plateforme (budget / jours de la période).
3. **Récupérer les données de dépense depuis les MCP publicitaires connectés** : interrogez chaque plateforme publicitaire connectée
   (google-ads, meta-marketing, linkedin-marketing, tiktok-ads) pour la dépense de la période en cours — dépense totale à ce jour,
   répartition quotidienne des dépenses, distribution des dépenses par campagne et indicateurs de coût (CPC, CPM, CPA par campagne).
4. **Calculer le rythme par plateforme** : exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/ad-budget-pacer.py" --budget {total} --period-days {N} --days-elapsed {N} --spend-to-date {amount}` avec les données de dépense
   et les objectifs budgétaires pour calculer les jours écoulés/restants, le budget consommé vs le pourcentage de rythme attendu, le ratio de
   rythme (réel / attendu), le taux de consommation journalier (moyenne sur 7 jours) et la tendance du taux de consommation (accélération/stable/décélération).
5. **Projeter la dépense de fin de période** : extrapolez le taux de consommation journalier actuel jusqu'à la fin de la période pour chaque plateforme —
   produisez des projections optimiste (dépense journalière récente la plus basse), attendue (moyenne sur 7 jours) et pessimiste (dépense journalière récente la plus élevée).
6. **Comparer aux objectifs budgétaires** : pour chaque plateforme, calculez l'écart entre la dépense projetée de fin de période et
   l'objectif budgétaire — exprimé à la fois en montant et en pourcentage d'écart.
7. **Signaler les problèmes de rythme** : générez des alertes — sur-rythme critique (>120 %, action immédiate : réduire les enchères, mettre en pause
   les moins performants, fixer des plafonds journaliers), sur-rythme avertissement (110-120 %, ajustements proactifs cette semaine), sous-dépense
   avertissement (<70 %, augmenter les enchères ou élargir le ciblage ou réallouer), sous-dépense information (70-85 %, surveiller).
8. **Récupérer les indicateurs d'efficacité** : pour chaque plateforme, récupérez le CPA, le ROAS, le volume de conversions et le coût par conversion
   afin que les décisions de réallocation s'appuient sur la performance, pas seulement sur le rythme.
9. **Recommander des réallocations** : exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/budget-optimizer.py"` avec les données d'efficacité de dépense
   actuelles pour suggérer des transferts précis en dollars des plateformes sous-dépensées ou peu efficaces vers les
   plus performantes ayant une marge de progression. Incluez une justification pour chaque mouvement recommandé.
10. **Enregistrer un instantané budgétaire** : conservez l'instantané de rythme actuel via
    `python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand {slug} --action save-snapshot --data '{...pacing metrics...}'`
    pour le suivi historique, l'analyse de tendance et la comparaison lors des futures exécutions de budget-tracker.

## Résultat

Un tableau de bord budgétaire structuré contenant :

- **Résumé du budget** : budget total de la période, total dépensé à ce jour, total restant, pourcentage
  de rythme global, jours écoulés, jours restants, total projeté de fin de période, et statut de santé global
  (dans les temps, en sur-rythme, en sous-rythme)
- **Tableau des dépenses par plateforme** : nom de la plateforme, objectif budgétaire, dépense réelle à ce jour, pourcentage de rythme,
  taux de consommation journalier (moyenne sur 7 jours), dépense projetée en fin de période, écart par rapport à l'objectif ($ et %),
  et indicateur de statut (vert/jaune/rouge)
- **Données de visualisation du rythme** : trajectoire de dépense quotidienne vs rythme linéaire idéal pour chaque plateforme —
  met en évidence où la dépense accélère, décélère ou suit un rythme régulier sur la période
- **Alertes de sur/sous-dépense** : liste priorisée des problèmes de rythme avec sévérité, plateforme,
  % de rythme actuel, écart projeté, et action corrective spécifique recommandée
- **Recommandations de réallocation** : transferts précis en dollars entre plateformes avec justification — par ex.,
  « Transférer 2 000 $ de LinkedIn (62 % de rythme, 85 $ de CPA) vers Google Ads (98 % de rythme, 22 $ de CPA, marge de progression) »
- **Contexte d'efficacité** : CPA, ROAS, volume de conversions et tendance de coût par plateforme en parallèle des données de dépense,
  afin que les décisions budgétaires tiennent compte de la qualité de la performance, pas seulement du rythme
- **Répartition du taux de consommation journalier** : dépense journalière actuelle par plateforme vs dépense journalière cible, avec direction de tendance
  sur 7 jours et indicateur d'accélération/décélération
- **Scénarios de projection** : projections optimiste, attendue et pessimiste de la dépense de fin de période par plateforme
  et au global, avec fourchettes de confiance
- **Synthèse exécutive** : aperçu de 2-3 phrases — santé globale du budget, principal risque ou opportunité, et
  action la plus importante à entreprendre maintenant

## Agents utilisés

- **performance-monitor-agent** — Agrégation des données de dépense depuis les MCP publicitaires connectés, calculs de rythme, modélisation des projections, persistance des instantanés, et analyse historique des tendances de dépense
- **media-buyer** — Stratégie d'optimisation budgétaire, recommandations de réallocation, tactiques de dépense spécifiques aux plateformes (stratégies d'enchères, plafonds journaliers, extension d'audience), et expertise de la dynamique des enchères

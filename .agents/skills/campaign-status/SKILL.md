---
name: campaign-status
description: "Tableau de bord de statut unifié pour chaque campagne suivie sur toutes les plateformes connectées — produit un tableau récapitulatif avec indicateurs de santé, dépenses et indicateurs de performance en direct, un historique d'exécution sur 7 jours, les approbations en attente avec leur ancienneté, une classification de l'écart aux KPI (dans les temps / à risque / en retard), les problèmes signalés et les prochaines actions planifiées. Se contente de rendre compte ; ne modifie rien sur aucune plateforme. Se déclenche sur \"/digital-marketing-pro:campaign-status\", \"what campaigns are running right now\", \"any failed executions or stuck approvals\", \"status of the Q1-Launch campaign\", \"which campaigns are behind target\". Lit le registre de campagnes de la marque, le journal d'exécution et la file d'approbation via campaign-tracker.py, execution-tracker.py et approval-manager.py, ainsi que les indicateurs en direct depuis les MCP de plateformes connectés."
---

# /digital-marketing-pro:campaign-status

## Objectif

Fournir une vue unifiée de toutes les campagnes actives sur chaque plateforme connectée — publicité, e-mail, réseaux sociaux, blog — avec leur statut actuel, leurs indicateurs de performance en direct, leur historique d'exécution, et toute approbation ou action planifiée en attente. Élimine le besoin de vérifier chaque plateforme individuellement et met au jour les problèmes (campagnes en pause, exécutions échouées, contenu obsolète) avant qu'ils ne deviennent des incidents.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Périmètre** : toutes les campagnes actives, une campagne spécifique par nom ou ID, ou une plateforme spécifique
  (ex. : « campagnes Google Ads uniquement », « campagnes e-mail », « campagne nommée Q1-Launch »)
- **Niveau de détail** : résumé (un statut par ligne et par campagne) ou détaillé (indicateurs complets, historique d'exécution
  et prochaines actions par campagne)
- **Fenêtre temporelle** (facultatif) : jusqu'où remonter dans l'historique d'exécution. Par défaut, les 7 derniers jours
- **Filtre de statut** (facultatif) : filtrer par statut de campagne — active, en pause, planifiée, terminée, échouée.
  Par défaut, active + en pause + planifiée
- **Ordre de tri** (facultatif) : trier les campagnes par dépense, performance, récence ou statut.
  Par défaut, regroupement par plateforme

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. Vérifiez aussi la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Lister toutes les campagnes suivies** : exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns`
   pour obtenir le registre de campagnes avec noms, plateformes, statuts, dates de création et objectifs de KPI assignés.
3. **Récupérer l'historique d'exécution** : exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history --limit {N}`
   pour récupérer les journaux d'exécution récents — ce qui a tourné, quand, le résultat (succès/échec/ignoré), les messages d'erreur le cas échéant,
   et l'utilisateur ou l'automatisation qui l'a déclenché.
4. **Vérifier les approbations en attente** : exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action list-pending`
   pour faire remonter toute campagne, création ou contenu en attente de relecture avant sa mise en ligne.
   Incluez la date de soumission et l'ancienneté en heures pour chaque élément en attente.
5. **Récupérer les indicateurs en direct depuis les MCP connectés** : pour chaque campagne active, interrogez le MCP de la plateforme concernée
   (google-ads, meta-marketing, linkedin-marketing, tiktok-ads, mailchimp, etc.) pour la performance actuelle :
   - Dépense : dépense totale, dépense journalière, budget consommé
   - Performance : impressions, clics, CTR, conversions, CPA, ROAS
   - Engagement : taux d'ouverture, taux de clics, taux de rebond, vues vidéo
   - Spécifique à la plateforme : quality score, score de pertinence, taux de délivrabilité
6. **Agréger par plateforme et par statut** : regroupez les campagnes par plateforme et par statut, calculez les totaux au niveau plateforme
   (nombre total de campagnes, dépense totale, conversions totales, CPA/ROAS moyens), et signalez tout écart entre
   les campagnes suivies et ce que rapporte réellement la plateforme.
7. **Calculer la performance vs les KPI** : pour chaque campagne active avec des objectifs définis, calculez le réel vs la cible
   pour les KPI principaux. Classez comme :
   - **Dans les temps** (vert) : atteint ou dépasse les objectifs
   - **À risque** (jaune) : à moins de 15 % de l'objectif avec une tendance négative
   - **En retard** (rouge) : rate l'objectif de plus de 15 %
8. **Signaler les problèmes nécessitant une attention** : identifiez les problèmes qui appellent une action :
   - Campagnes mises en pause de façon inattendue ou par la plateforme (violation de politique, problème de facturation)
   - Exécutions ayant échoué avec des erreurs
   - Campagnes dépassant leur date de fin prévue
   - Campagnes obsolètes sans activité depuis 7 jours ou plus
   - Campagnes dépassant le rythme budgétaire de plus de 20 %
   - Goulots d'approbation vieux de plus de 48 heures
9. **Compiler les prochaines actions planifiées** : listez les lancements planifiés à venir, les changements de budget, les rotations de créations,
   les fins de tests A/B, ou les optimisations automatisées issues du journal d'exécution, avec dates et dépendances.

## Résultat

Un tableau de bord de statut de campagne structuré contenant :

- **Tableau récapitulatif des campagnes** : nom de campagne, plateforme, statut (active/en pause/planifiée/terminée/échouée),
  jours d'exécution, dépense totale, indicateur clé (conversions ou leads), CPA ou ROAS, et indicateur de santé (vert/jaune/rouge)
- **Campagnes actives par plateforme** : vue regroupée avec totaux au niveau plateforme — nombre de campagnes, dépense totale,
  conversions totales, CPA moyen, ROAS moyen, et statut de santé de la plateforme
- **Historique d'exécution** (7 derniers jours) : journal chronologique des actions menées — lancements de campagne, mises en pause, changements
  de budget, changements de créations, ajustements d'enchères, envois d'e-mail — avec horodatages, résultats, et acteur (manuel ou automatisé)
- **Approbations en attente** : liste des éléments en attente de relecture avec nom du demandeur, date de soumission, type (création,
  lancement de campagne, changement de budget, contenu), ancienneté en heures, et référence directe à l'élément
- **Performance vs KPI** : pour chaque campagne active, performance réelle vs les objectifs de KPI définis à la création de la campagne —
  dans les temps, à risque, ou en retard, avec pourcentage d'écart et direction de la tendance
- **Problèmes signalés** : liste priorisée des problèmes nécessitant une attention avec sévérité (critique/avertissement/information),
  description, campagne concernée, et résolution recommandée
- **Prochaines actions planifiées** : actions automatisées ou planifiées à venir avec dates, descriptions, dépendances,
  et partie responsable
- **Actions rapides** : prochaines étapes immédiates suggérées selon le statut actuel — approuver les éléments en attente, investiguer
  les échecs, mettre en pause les moins performants, monter en puissance les gagnants, prolonger les campagnes réussies

## Agents utilisés

- **execution-coordinator** — Récupération de l'historique d'exécution, gestion de la file d'approbation, suivi des actions planifiées, agrégation transversale du statut, et signalement des problèmes
- **analytics-analyst** — Interprétation des indicateurs de performance en direct, comparaison aux KPI, évaluation de la santé des campagnes, et recommandations fondées sur la performance

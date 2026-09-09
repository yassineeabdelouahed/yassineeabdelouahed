---
name: sop-library
description: "Gère la bibliothèque de procédures opérationnelles standardisées de l'agence — crée des SOP à partir de modèles par catégorie, liste la bibliothèque, assigne des SOP à des marques avec des dérogations par marque, vérifie la conformité par rapport aux exécutions journalisées, met à jour les versions avec des sauvegardes archivées, et affiche les historiques complets. Se déclenche sur \"/digital-marketing-pro:sop-library\", \"create an SOP for blog publishing\", \"assign the reporting SOP to this brand\", \"are we following our SOPs\", \"update the campaign launch checklist\". Stocke les SOP dans ~/.claude-marketing/sops/, lit l'historique d'exécution via execution-tracker.py pour la notation de conformité, signale l'adhérence en baisse, et se combine avec les profils de marque dans les flux de travail d'agence multi-clients."
---

# /digital-marketing-pro:sop-library

## Objectif

Gérer la bibliothèque de procédures opérationnelles standardisées de l'agence. Créer des SOP à partir de modèles, les assigner à des marques spécifiques, suivre la conformité par rapport aux exécutions récentes, et maintenir le contrôle de version. Les SOP définissent les étapes obligatoires pour les opérations marketing courantes — garantissant cohérence, qualité, et responsabilisation sur l'ensemble des engagements clients, quel que soit le membre de l'équipe qui exécute le travail.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Action** : L'une des suivantes : `create`, `list`, `assign`, `check-compliance`, `update`, ou `view`
- **Catégorie de SOP** : Le domaine opérationnel — content-production, paid-media, reporting, crm, seo, social-media, email-marketing, client-management, onboarding, ou general
- **Slug de marque** (pour assign/check-compliance) : À quelle marque assigner la SOP ou vérifier la conformité — doit correspondre à une marque configurée dans `~/.claude-marketing/brands/`
- **Nom de la SOP** (pour create/update/view) : Un nom descriptif pour la procédure (par ex. « Checklist de publication d'article de blog », « Flux de reporting mensuel », « Protocole de lancement de campagne de recherche payante »)
- **Contenu de la SOP** (pour create/update) : Les étapes de la procédure, checklists, rôles responsables, exigences d'approbation, et portes qualité — ou indiquer « à partir du modèle » pour utiliser le modèle par défaut de la catégorie
- **Notes de version** (pour update) : Ce qui a changé et pourquoi — enregistré dans le journal d'historique de version pour la piste d'audit et la communication d'équipe
- **Niveau de priorité** (pour create) : L'un des suivants :
  - Critique : Doit être suivi à chaque exécution — les manquements à la conformité déclenchent des alertes à la direction
  - Standard : Recommandé pour la cohérence entre membres d'équipe
  - Consultatif : Guidance de bonne pratique, non obligatoire — pour référence et formation
- **Dérogations spécifiques à la marque** (pour assign) : Toute étape devant être modifiée, ignorée, ou ajoutée selon les exigences spécifiques de cette marque, les réglementations sectorielles, ou les préférences du client
- **Plage de dates de conformité** (pour check-compliance) : Jusqu'à quand remonter pour vérifier les exécutions par rapport à la SOP — par défaut les 30 derniers jours

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également la présence de directives dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier la présence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : "Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ?" — ou procéder avec les valeurs par défaut.
2. **Vérifier le stockage des SOP** : Lire la bibliothèque de SOP dans `~/.claude-marketing/sops/`. Chaque SOP est stockée sous forme de fichier JSON avec des métadonnées (nom, catégorie, version, priorité, date de création, dernière mise à jour, auteur, marques assignées, tableau d'étapes, checklists, et historique de version)
3. **Pour l'action CREATE** : Générer une nouvelle SOP à partir du modèle de catégorie spécifié. Inclure :
   - Un énoncé d'objectif et une définition du périmètre
   - Les prérequis et les accès de plateforme nécessaires
   - Des étapes de procédure numérotées avec les rôles responsables et des estimations de temps par étape
   - Des points de contrôle qualité aux portes clés avec des critères de réussite/échec
   - Des exigences d'approbation avec des chemins d'escalade
   - Des critères d'achèvement et une procédure de restauration le cas échéant
   - Enregistrer dans `~/.claude-marketing/sops/{category}/{sop-slug}.json` avec la version 1.0
4. **Pour l'action LIST** : Recenser toutes les SOP de la bibliothèque organisées par catégorie. Afficher le nom, la version, le niveau de priorité, la date de dernière mise à jour, le nombre d'étapes, la durée totale estimée, et le nombre d'assignations (combien de marques utilisent cette SOP). Mettre en évidence toute SOP non assignée et toute SOP avec un taux de conformité inférieur à 80 %
5. **Pour l'action ASSIGN** : Lier la SOP spécifiée à une marque en créant une référence dans `~/.claude-marketing/brands/{slug}/sops/{sop-slug}.json` contenant la référence de la SOP, la date d'assignation, l'assignateur, et toute dérogation ou ajout spécifique à la marque par rapport aux étapes standard
6. **Pour l'action CHECK-COMPLIANCE** : Comparer les exécutions récentes de la marque (depuis `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history`) aux exigences de la SOP assignée. Pour chaque étape de la SOP, déterminer réussite/échec/non-applicable/ignorée sur la base des preuves d'exécution. Calculer le pourcentage de conformité global et identifier les motifs dans les échecs récurrents
7. **Pour l'action UPDATE** : Charger la SOP existante, créer une sauvegarde versionnée (ajouter le numéro de version au nom de fichier dans `~/.claude-marketing/sops/_archive/`), appliquer les mises à jour, incrémenter le numéro de version, enregistrer les notes de changement avec l'auteur dans le tableau d'historique de version, et signaler toutes les marques concernées pour une nouvelle revue
8. **Pour l'action VIEW** : Afficher la SOP complète avec toutes les étapes, checklists, métadonnées, liste des marques assignées, historique de version complet, et résumé agrégé du statut de conformité sur toutes les marques assignées
9. **Valider l'exhaustivité de la SOP** : Pour les actions create et update, vérifier que la SOP comporte toutes les sections requises — objectif, périmètre, au moins 5 étapes de procédure, rôles responsables pour chaque étape, au moins une porte d'approbation, critères d'achèvement, et durée totale estimée. Signaler toute lacune avant l'enregistrement
10. **Vérifier les conflits** : Lors de l'assignation ou de la mise à jour, vérifier que la SOP n'entre pas en conflit avec des SOP déjà assignées pour la même marque et catégorie — signaler les étapes qui se chevauchent, les exigences contradictoires, ou les procédures redondantes
11. **Générer les tendances de conformité** : Pour check-compliance, comparer le taux de conformité actuel aux vérifications précédentes pour identifier des motifs d'adhérence en amélioration ou en déclin — signaler les marques avec une conformité en déclin pour l'attention de la direction
12. **Rapporter les résultats** : Présenter le résultat de l'action avec confirmation, tout avertissement (SOP non assignées, manquements à la conformité, conflits détectés, sections incomplètes), et les prochaines étapes suggérées

## Résultat

Résultat spécifique à l'action :

- **Pour CREATE** : Document de SOP complet avec toutes les sections (objectif, périmètre, prérequis, étapes numérotées avec rôles et estimations de temps, portes qualité, exigences d'approbation, critères d'achèvement, procédure de restauration), confirmation d'enregistrement avec chemin de fichier et numéro de version, temps d'exécution total estimé, et invite à assigner à des marques
- **Pour LIST** : Tableau de la bibliothèque de SOP par catégorie — nom, catégorie, version, priorité, nombre d'étapes, durée estimée, dernière mise à jour, nombre de marques assignées, et taux de conformité agrégé lorsque vérifié. Totaux récapitulatifs par catégorie et statistiques globales de la bibliothèque
- **Pour ASSIGN** : Confirmation d'assignation avec nom de marque, nom de la SOP, date d'effet, toute dérogation spécifique à la marque appliquée, total des étapes incluant les dérogations, et rappel d'exécuter une vérification de conformité après le prochain cycle d'exécution
- **Pour CHECK-COMPLIANCE** : Rapport de conformité avec statut réussite/échec/ignoré par étape, pourcentage de conformité global, détails spécifiques d'échec avec preuves d'exécution et guidance de correction, tendance par rapport à la vérification précédente (en amélioration/stable/en déclin), analyse de motifs pour les échecs récurrents, et actions correctives priorisées
- **Pour UPDATE** : SOP mise à jour avec résumé de diff (ce qui a changé avant/après), nouveau numéro de version, entrée d'historique de version avec auteur et notes, liste des marques concernées signalées pour une nouvelle revue, et recommandation de relancer les vérifications de conformité
- **Pour VIEW** : Affichage complet de la SOP avec toutes les étapes et métadonnées, liste des marques assignées avec le statut de conformité par marque, historique de version complet avec notes de changement, métriques de conformité agrégées, et date de dernière vérification de conformité par marque

## Agents utilisés

- **agency-operations** — Création de SOP à partir de modèles par catégorie, logique de suivi de conformité, contrôle de version et gestion des archives, flux d'assignation, détection de conflits, analyse de tendance, et organisation de la bibliothèque
- **memory-manager** — Stockage et récupération de fichiers de SOP, persistance de l'historique de version, gestion du lien marque-SOP, maintenance des archives, et archivage des données de conformité

---
name: pipeline-update
description: "Mettre à jour les deals CRM — changer d'étape, modifier les valeurs et dates de clôture, associer des notes et activités, créer des tâches de suivi — avec validation par rapport aux règles de pipeline, une comparaison avant/après, et un impact calculé sur la vélocité, la prévision, et la santé du pipeline. Écrit dans Salesforce, HubSpot, Zoho, ou Pipedrive via le MCP CRM connecté uniquement après une porte d'exécution obligatoire : un aperçu de Résumé d'exécution plus une approbation tapée explicite, journalisée via approval-manager.py. Se déclenche sur \"/digital-marketing-pro:pipeline-update\", \"move this deal to negotiation\", \"update the deal value\", \"mark this deal closed-won\", \"which deals are stalled\". Lit le profil de marque ; se combine avec /digital-marketing-pro:lead-import pour la création de deals et /digital-marketing-pro:executive-dashboard pour le reporting en masse."
disable-model-invocation: false
argument-hint: "[deal-name or stage]"
---

# /digital-marketing-pro:pipeline-update

## Objectif

Mettre à jour les enregistrements de deals et d'opportunités dans le pipeline CRM — déplacer les deals entre étapes, mettre à jour les valeurs, ajouter des notes, et suivre la vélocité du pipeline. Fournit une vue claire avant/après de chaque changement et calcule l'impact en aval sur les métriques de pipeline, donnant aux équipes marketing et commerciales une visibilité sur la progression des deals, la précision des prévisions, et le rythme du revenu par rapport aux objectifs. Conçu à la fois pour les mises à jour de deal individuelles et les transitions d'étape par lot, avec une validation intégrée pour empêcher les sauts d'étape invalides et les lacunes de champs obligatoires.

Utiliser cette commande pour les changements de pipeline affectant l'étape, la valeur, ou la prévision d'un deal. Pour créer de nouveaux deals à partir de leads, utiliser d'abord `/digital-marketing-pro:lead-import` pour faire entrer les leads dans le CRM, puis utiliser cette commande pour gérer leur progression dans le pipeline.
Pour un reporting de pipeline en masse sans mises à jour individuelles, utiliser plutôt `/digital-marketing-pro:executive-dashboard`.

## Porte d'exécution (OBLIGATOIRE — ne peut pas être contournée)

1. Présenter l'aperçu complet — destinataires / dépense / changements / conformité — sous forme de **Résumé d'exécution** avant de toucher un quelconque système en production.
2. L'utilisateur doit taper `yes` (ou une approbation explicite équivalente). TOUTE autre saisie — ambiguë, implicite, partielle, ou absente — annule l'exécution.
3. Ne jamais procéder sur une saisie ambiguë. Ne jamais relancer automatiquement une exécution échouée ; un échec nécessite une revue humaine avant toute relance.
4. Enregistrer l'approbation avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action create-approval --data '{"risk_level":"<tier>","summary":"..."}'` **avant** l'exécution, puis `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action mark-executed --id {approval_id}` une fois que la plateforme confirme le succès.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Identifiant du deal** : Comment localiser le deal — nom du deal, email du contact associé, nom de l'entreprise, ou ID d'enregistrement CRM. En cas d'ambiguïté, le système présentera les candidats correspondants pour sélection.
- **Mises à jour à appliquer** : Un ou plusieurs changements — changement d'étape (par exemple, « Proposition envoyée » vers « Négociation »), mise à jour de la valeur du deal (augmentation, diminution, ou scission), ajustement de la date de clôture, dérogation à la probabilité, motif de perte (si passage en closed-lost), ou modification de champ personnalisé
- **Notes ou contexte** : Raison de la mise à jour, résumé de réunion, détails d'objection, intelligence concurrentielle, prochaines étapes, ou tout contexte qualitatif à associer à l'enregistrement du deal sous forme de note horodatée
- **Nom du pipeline (si plusieurs)** : À quel pipeline le deal appartient — pertinent pour les entreprises avec des pipelines séparés pour le nouveau business, les renouvellements, les upsells, les partenariats, ou différentes lignes de produit
- **Plateforme CRM** : Salesforce, HubSpot, Zoho, ou Pipedrive — et l'objet pipeline/opportunité spécifique si la plateforme prend en charge plusieurs types de pipeline
- **Association d'activité (optionnel)** : Si la mise à jour doit être journalisée comme un type d'activité spécifique — appel, réunion, email, tâche, démo, ou activité personnalisée — avec horodatage, durée, et participants
- **Actions de suivi (optionnel)** : Tâches à créer suite à cette mise à jour — planifier le prochain appel, envoyer une proposition, impliquer une ressource technique, créer un SOW, ou fixer un rappel pour une date de suivi avec responsable et échéance
- **Préférences de notification (optionnel)** : Si le propriétaire du deal, le chargé de compte, ou le manager doit être notifié de ce changement de pipeline — et via quel canal (notification CRM, email, Slack)
- **Périmètre de mise à jour par lot (optionnel)** : Si plusieurs deals doivent être mis à jour en une fois — une liste d'identifiants de deal avec la même mise à jour à appliquer, ou des critères de filtre pour sélectionner les deals (par exemple, « tous les deals en étape Découverte avec une date de clôture avant le 1er mars »)
- **Champs d'analyse gagné/perdu (optionnel)** : Si un deal est clôturé — motif gagné/perdu, concurrent impliqué, facteur décisif, leçons apprises, et si le contact doit entrer dans une séquence de reconquête ou de parrainage
- **Détails de reconnaissance du revenu (optionnel)** : Pour les deals closed-won — conditions contractuelles (mensuel/annuel), date de début, date de renouvellement, répartition revenu ponctuel vs récurrent, et toute remise ou tarification promotionnelle appliquée
- **Deals liés (optionnel)** : Si cette mise à jour affecte des deals liés — opportunités d'upsell, deals de cross-sell, ou pipeline de renouvellement qui devrait être créé ou mis à jour en fonction du changement d'étape de ce deal

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les guidelines** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et fichiers de catégorie pertinents. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Vérifier le CRM connecté et la configuration du pipeline** : Vérifier le statut de connexion CRM, récupérer les pipelines disponibles et leurs définitions d'étape (incluant les champs requis par étape, l'ordre des étapes, et les probabilités par défaut), et confirmer que l'utilisateur dispose d'un accès en écriture au pipeline cible. Si plusieurs pipelines existent, présenter les options pour sélection.
3. **Rechercher l'enregistrement de deal existant** : Rechercher le deal dans le CRM en utilisant l'identifiant fourni — par nom, email, entreprise, ou ID. En cas de correspondances multiples, présenter les candidats avec les détails clés (nom du deal, étape, valeur, propriétaire, date de dernière activité, jours dans l'étape actuelle) pour que l'utilisateur sélectionne le bon enregistrement.
4. **Présenter l'état actuel du deal** : Afficher l'enregistrement complet actuel — nom du deal, pipeline, étape actuelle, valeur, probabilité, date de clôture, propriétaire, contacts et entreprise associés, chronologie d'activité récente (5 dernières activités), valeurs de champs personnalisés, et jours dans l'étape actuelle. Sert d'instantané « avant » pour l'audit du changement.
5. **Valider les mises à jour proposées par rapport aux règles de pipeline** : Vérifier que la transition d'étape est valide (aucun saut d'étape requise sauf si le pipeline l'autorise), que la valeur du deal est dans la plage acceptable pour l'étape cible, que la date de clôture est réaliste compte tenu de la position dans l'étape, et que tous les champs obligatoires pour l'étape cible sont renseignés. Signaler les violations avec les corrections spécifiques nécessaires.
6. **Calculer un aperçu de l'impact sur le pipeline** : Avant l'exécution, calculer comment ce changement affectera les métriques de pipeline — changement de valeur pondérée du pipeline, impact sur la prévision pour la période en cours, ajustement du taux de conversion d'étape, et si ce mouvement de deal crée des lacunes ou des concentrations de couverture de pipeline.
7. **Préparer la charge utile de mise à jour** : Construire la charge utile de mise à jour prête pour le CRM avec tous les changements — étape, valeur, date de clôture, probabilité, champs personnalisés, notes, entrée de journal d'activité, tâches de suivi, et toute mise à jour d'enregistrement associée (par exemple, mettre à jour le rollup de valeur de pipeline du compte parent).
8. **Créer la porte d'approbation** : Évaluer le risque comme moyen pour toutes les mises à jour de pipeline (les deals affectent directement la prévision de revenu). Présenter le résumé de mise à jour sous forme de comparaison avant/après — état actuel vs état proposé — avec l'impact sur la vélocité du pipeline, les changements de prévision, et tout avertissement de validation.
9. **Sur approbation, mettre à jour via le MCP CRM** : Pousser la charge utile de mise à jour vers le CRM à travers le MCP de la plateforme. Créer l'entrée de journal d'activité, associer les notes, générer les tâches de suivi avec les bons responsables et échéances, et envoyer les notifications si configuré. Confirmer que la mise à jour a réussi en relisant l'enregistrement mis à jour depuis le CRM.
10. **Calculer l'impact sur la vélocité du pipeline** : Calculer comment cette mise à jour affecte les métriques de vélocité du pipeline — taux de conversion d'étape, durée moyenne du cycle de deal pour cette étape, valeur pondérée du pipeline, précision de la prévision vs objectif, et comparaison aux moyennes historiques pour des deals de taille et d'étape similaires.
11. **Traiter les données gagné/perdu (si clôture)** : Si le deal est clôturé gagné ou perdu, enregistrer le motif gagné/perdu, les données concurrentielles, et les facteurs décisifs. Pour les deals closed-lost, déterminer si le contact doit entrer dans une séquence de nurturing de reconquête. Pour les deals closed-won, déclencher tout workflow post-vente (onboarding client, signalement candidat pour étude de cas, planification de demande de parrainage).
12. **Générer une évaluation de santé du pipeline** : Après la mise à jour, évaluer la santé globale du pipeline — ratio de couverture de pipeline vs quota, âge moyen des deals par étape, deals à risque de glissement (date de clôture dépassée ou stagnant au-delà de la moyenne historique), et identification des goulots d'étranglement étape par étape.
13. **Journaliser la mise à jour** : Enregistrer la mise à jour complète — horodatage, ID du deal, état avant, état après, utilisateur ayant initié, impact sur la vélocité, tâches de suivi créées, données gagné/perdu, et notifications envoyées — vers `~/.claude-marketing/brands/{slug}/logs/pipeline-update-log.json`.

## Résultat

Un rapport de mise à jour de pipeline structuré contenant :

- **Enregistrement de deal mis à jour** : L'enregistrement de deal complet après application de tous les changements — étape, valeur, probabilité, date de clôture, propriétaire, champs personnalisés, contacts associés, et prochaine activité planifiée
- **Comparaison avant/après** : Vue côte à côte de chaque champ modifié montrant la valeur précédente, la nouvelle valeur, le delta de changement (pour les champs numériques), et la raison ou le contexte fourni pour le changement
- **Métriques de vélocité du pipeline** : Taux de conversion d'étape mis à jour, jours moyens dans l'étape actuelle vs moyenne historique, changement de valeur pondérée du pipeline, et confiance de date de clôture projetée basée sur les données historiques de durée d'étape pour des deals de taille similaire
- **Entrée de journal d'activité** : L'activité enregistrée — type (appel, réunion, email, note), horodatage, durée, participants, résumé, et prochaines étapes — telle qu'elle apparaît dans la chronologie d'activité du CRM
- **Tâches de suivi créées** : Toute tâche générée à partir de cette mise à jour — description, échéance, responsable, priorité, référence de deal associée, et paramètres de rappel
- **Instantané de pipeline** : État actuel du pipeline complet après cette mise à jour — total de deals par étape, valeur pondérée totale, répartition étape par étape avec taux de conversion, deals à risque (dates de clôture dépassées ou stagnants dans l'étape au-delà de la moyenne), et ratio de couverture de pipeline vs quota
- **Impact sur la prévision** : Comment cette mise à jour de deal unique affecte la prévision de pipeline globale — changement de valeur pondérée de pipeline, mouvement du ratio de couverture de pipeline, ajustement du niveau de confiance, et impact sur la projection de revenu de la période en cours
- **Analyse gagné/perdu (si clôture)** : Motif gagné/perdu enregistré, concurrent impliqué, facteurs décisifs, et actions post-clôture déclenchées (onboarding client, séquence de reconquête, candidature étude de cas, ou demande de parrainage)
- **Évaluation de santé du pipeline** : Santé globale du pipeline après cette mise à jour — ratio de couverture vs quota, âge moyen des deals par étape, étapes goulot d'étranglement, deals à risque de glissement, et comparaison à l'instantané de pipeline précédent
- **Alertes de deals stagnants** : Deals identifiés comme stagnants lors du contrôle de santé du pipeline — nom du deal, étape, jours dans l'étape, durée d'étape attendue, et action recommandée (réengager, escalader, ou closed-lost)
- **Comparaison historique de durée d'étape** : Combien de temps ce deal a passé dans son étape précédente comparé à des deals moyens de taille similaire — plus rapide ou plus lent que prévu, avec des implications pour la probabilité de clôture
- **Attribution marketing sur le deal** : Points de contact marketing ayant contribué à ce deal — campagne source, interactions avec le contenu, engagements email, et clics publicitaires associés aux contacts du deal, offrant une visibilité marketing-vers-revenu
- **Confirmation de livraison de notification** : Notifications envoyées au propriétaire du deal, au manager, ou à l'équipe — canal utilisé, statut de livraison, et résumé du contenu de la notification
- **Journal d'exécution** : Enregistrement horodaté de la mise à jour — appels API effectués, statut de réponse, notifications livrées, tâches créées, durée de traitement, et confirmation CRM

## Agents utilisés

- **crm-manager** — Recherche de deal, validation d'étape de pipeline, préparation de mise à jour, résolution de schéma CRM, calcul de vélocité, journalisation d'activité, analyse d'impact sur la prévision, et analytique de pipeline
- **marketing-strategist** — Attribution marketing sur le deal, analyse de connexion campagne-vers-revenu, identification de motifs gagné/perdu pour l'optimisation marketing stratégique, et interprétation de l'évaluation de santé du pipeline

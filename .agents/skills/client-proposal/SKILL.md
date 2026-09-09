---
name: client-proposal
description: "Rédiger une proposition d'agence ou un document de pitch professionnel pour un client potentiel — synthèse exécutive, analyse de situation, périmètre de services avec matrice de livrables, objectifs de KPI avec lignes de base et objectifs ambitieux, 2-3 options tarifaires, structure de biographies d'équipe, emplacements réservés aux études de cas, aperçu des conditions, et prochaines étapes, rédigé du point de vue de l'agence. Se déclenche sur \"/digital-marketing-pro:client-proposal\", \"write a proposal for this prospect\", \"scope of work for a 6-month retainer\", \"respond to this RFP\", \"pitch deck outline with pricing tiers\". Charge le profil de marque de l'agence elle-même (pas celui du client), ainsi que les modèles personnalisés et les procédures d'agence ; les référentiels sectoriels alimentent les sections KPI et tarification."
---

# /digital-marketing-pro:client-proposal

## Objectif

Générer une proposition ou un document de pitch professionnel d'agence marketing pour un client potentiel. Couvre l'analyse stratégique, le périmètre de services, les livrables, la tarification, et le positionnement de l'équipe pour remporter de nouveaux contrats ou formaliser un engagement existant avec un document soigné et prêt à personnaliser.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom et secteur de l'entreprise cliente** : pour qui est la proposition et son segment de marché/secteur
- **Services demandés** : quels services marketing sont dans le périmètre (SEO, PPC, social, contenu, e-mail, stratégie, créatif, analytics, etc.)
- **Fourchette de budget estimée** : le budget déclaré ou attendu du client pour les services marketing (mensuel ou annuel)
- **Chronologie** : durée de l'engagement — pilote de 3 mois, contrat de 6 mois, forfait de gestion de 12 mois, ou projet avec jalons définis
- **Défis/objectifs clés** : ce que le client essaie d'atteindre, les problèmes qu'il doit résoudre, ou les opportunités qu'il veut saisir
- **Contexte concurrentiel** : concurrents clés, pressions du marché, ou défis de différenciation auxquels le client fait face
- **Critères de décision** : ce qui compte le plus pour le client — prix, expertise, rapidité, expérience sectorielle, taille de l'équipe, ou technologie
- **Format de la proposition** : proposition écrite complète, plan de pitch deck, ou document de périmètre de travail
- **Relation existante** : nouveau prospect, recommandation, extension de client existant, ou réponse à appel d'offres
- **Équipe interne disponible** : membres de l'équipe agence qui staffieraient le compte (pour la section biographies d'équipe)

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. La marque chargée doit être la **marque de l'agence** — la proposition sera rédigée du point de vue de l'agence. **Vérifiez aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions et les fichiers de catégorie pertinents. Vérifiez les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Rechercher les référentiels sectoriels du client** : récupérez les données de performance sectorielle pertinentes, les ratios de dépense marketing typiques, les schémas du paysage concurrentiel, et les points de douleur courants pour le secteur du client
3. **Définir le périmètre de services proposé** : associez les services demandés à des livrables spécifiques, une répartition de propriété (agence vs. client), une fréquence, et les dépendances entre lignes de service
4. **Construire la matrice de livrables avec chronologie** : créez une décomposition détaillée de chaque livrable, sa cadence (hebdomadaire, mensuelle, trimestrielle), la partie responsable, et le flux d'approbation
5. **Créer le cadre de KPI avec objectifs réalistes** : fixez des objectifs mesurables pour chaque ligne de service — hypothèses de ligne de base, objectifs à 90 jours, objectifs à 6 mois, et objectifs ambitieux liés aux résultats business
6. **Concevoir la structure tarifaire** : développez 2-3 options tarifaires — modèles basés sur un forfait de gestion, sur projet, ou sur performance, avec des limites de périmètre claires, des conditions de dépassement, et des parcours de montée en gamme
7. **Inclure des références d'études de cas** : préparez des emplacements réservés pour des études de cas pertinentes ou des résultats passés démontrant la capacité dans le secteur, le domaine de service, ou le type de défi du client
8. **Rédiger la synthèse exécutive** : écrivez un aperçu convaincant d'une page qui relie les défis spécifiques du client à la solution proposée et aux résultats attendus
9. **Construire l'aperçu de l'équipe et du processus** : décrivez la structure de l'équipe de compte, la cadence de communication (appels hebdomadaires, rapports mensuels, revues trimestrielles), le rythme de reporting, et le processus d'escalade
10. **Inclure un cadre de conditions générales** : rédigez les conditions d'engagement standard couvrant le processus de changement de périmètre, les conditions de paiement, la propriété intellectuelle, la confidentialité, le traitement des données, les garanties de performance, et les clauses de résiliation
11. **Ajouter la différenciation concurrentielle** : formulez pourquoi l'agence est le bon choix selon les critères de décision énoncés par le client — sans nommer directement les concurrents

## Résultat

Un document de proposition client structuré contenant :

- **Synthèse exécutive** : défis du client, approche proposée, et résultats attendus dans un aperçu convaincant d'une page
- **Analyse de situation** : état actuel du client, paysage concurrentiel, opportunité de marché, et hypothèses clés
- **Stratégie proposée** : approche stratégique de haut niveau reliant les services aux objectifs business avec une théorie du changement claire
- **Périmètre de services** : descriptions détaillées des services avec livrables, fréquence, matrice de propriété, et exclusions
- **Chronologie des livrables** : calendrier de livrables mois par mois ou phase par phase avec jalons et portes de revue
- **Objectifs de KPI** : métriques de succès mesurables par ligne de service avec ligne de base, objectif, et objectifs ambitieux
- **Options tarifaires** : 2-3 paliers ou modèles tarifaires avec définitions de périmètre claires, options d'add-on, et échéancier de paiement
- **Section biographies d'équipe** : structure de l'équipe de compte avec descriptions de rôles et biographies à remplacer par les membres d'équipe réels
- **Cadre d'études de cas** : emplacements réservés structurés pour 2-3 engagements passés pertinents montrant le défi, l'approche, et les résultats
- **Aperçu des conditions** : conditions d'engagement standard couvrant le périmètre, le paiement, la PI, la confidentialité, les données, et la résiliation
- **Prochaines étapes** : actions claires avec dates pour passer de la proposition à l'engagement signé
- **Justification de l'investissement** : cadre de ROI montrant comment les services proposés se relient à des résultats business mesurables
- **Risques et hypothèses** : hypothèses clés sous-tendant les projections et risques pouvant affecter la livraison ou les résultats

## Agents utilisés

- **marketing-strategist** — Positionnement stratégique, définition du périmètre de service, cadre de KPI, analyse concurrentielle, narration de la proposition, benchmarking sectoriel

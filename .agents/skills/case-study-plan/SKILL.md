---
name: case-study-plan
description: "Construire un plan complet de création d'étude de cas — un cadre narratif Défi-Solution-Résultats, 15 à 20 questions d'entretien client plus 10 questions internes, un plan de visualisation des données, des spécifications de format (PDF, page web, diaporama, plan de script vidéo, extraits pour les réseaux sociaux, one-pager commercial), une stratégie de diffusion, une checklist de permission/approbation, et un brouillon de synthèse exécutive. Planifie l'étude de cas ; ne produit pas l'actif final mis en forme. Se déclenche sur \"/digital-marketing-pro:case-study-plan\", \"turn this client win into a case study\", \"what should we ask the client in the interview\", \"plan a success story for sales enablement\", \"case study formats and distribution plan\". Lit le profil de marque, les guidelines, les modèles personnalisés et les procédures d'agence."
argument-hint: "[client-name]"
---

# /digital-marketing-pro:case-study-plan

## Objectif

Générer un plan structuré de création d'étude de cas avec cadre d'entretien, approche de visualisation des données, déclinaisons de format, et stratégie de diffusion. Produit un plan complet pour construire un contenu de preuve de résultats convaincant qui alimente l'aide à la vente et renforce la crédibilité.

## Données requises

L'utilisateur doit fournir (ou se verra demander) :

- **Client ou projet à mettre en avant** : l'engagement client, la campagne ou le projet spécifique qui sera mis en valeur
- **Défi ou problème traité** : le problème business, la pression du marché ou l'obstacle de croissance auquel le client faisait face avant l'engagement
- **Solution mise en œuvre** : les services, campagnes, stratégies ou outils déployés pour traiter le défi
- **Résultats obtenus** : résultats quantitatifs (hausse du chiffre d'affaires, croissance du trafic, amélioration de la conversion, réduction des coûts) et résultats qualitatifs (perception de marque, montée en compétence de l'équipe, amélioration des processus)
- **Chronologie de l'engagement** : durée du projet ou de la campagne — date de début, jalons clés, statut actuel
- **Statut de la permission** : le client a-t-il approuvé l'usage public de son nom, de ses données et de son histoire — ou une anonymisation est-elle requise
- **Audience cible de l'étude de cas** : qui la lira ou la regardera — des prospects du même secteur, des décideurs du comité de direction, des responsables marketing, des équipes achats, ou un public général
- **Formats souhaités** : quels formats de sortie sont nécessaires — livre blanc PDF, page de site web, diaporama de présentation, témoignage vidéo, extraits pour les réseaux sociaux, ou one-pager commercial
- **Secteur d'activité** : le secteur du client pour la mise en contexte concurrentielle et le ciblage de pertinence
- **Contexte concurrentiel** : quelles alternatives le client a envisagées et pourquoi il a choisi cette approche

## Processus

1. **Charger le contexte de marque** : lisez `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis chargez `~/.claude-marketing/brands/{slug}/profile.json`. Appliquez la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifiez aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, chargez les restrictions et les fichiers de catégorie pertinents. Vérifiez les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifiez les procédures d'agence (SOP) dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demandez : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou poursuivez avec les valeurs par défaut.
2. **Structurer le récit CSR** : construisez le cadre Défi-Solution-Résultats avec ses sous-sections — aperçu de la situation, points de douleur spécifiques, objectifs en début de projet, approche stratégique, exécution tactique, calendrier de mise en œuvre, résultats quantitatifs, impact qualitatif, et perspectives d'avenir. Identifiez l'arc émotionnel qui rend l'histoire captivante, pas seulement informative.
3. **Élaborer les questions d'entretien client** : créez 15 à 20 questions d'entretien organisées par section — contexte et environnement (taille de l'entreprise, pressions sectorielles, tentatives précédentes), plongée dans le défi (symptômes, causes profondes, impact business de l'inaction), expérience de la solution (critères de sélection, intégration, qualité de la collaboration), résultats et impact (résultats mesurables, bénéfices inattendus, réaction de l'équipe), et perspectives (plans en cours, ce qu'ils diraient à leurs pairs).
4. **Planifier les questions d'entretien interne** : rédigez 10 questions pour les membres de l'équipe interne ayant travaillé sur l'engagement — logique stratégique, approche technique, difficultés rencontrées pendant la livraison, moments clés, et enseignements pouvant nourrir les futurs engagements.
5. **Identifier les données et visualisations nécessaires** : associez chaque résultat quantitatif à un type de visualisation — graphiques en barres avant/après, courbes de croissance chronologiques, diagrammes d'amélioration de tunnel, graphiques en cascade de ROI, et tableaux comparatifs. Précisez quelles données doivent être collectées, vérifiées et approuvées par le client avant publication.
6. **Concevoir les déclinaisons de format** : créez des spécifications pour chaque format de sortie demandé — livre blanc PDF (4-6 pages, mise en page soignée avec citations phares et graphiques), page web (optimisée SEO avec balisage de données structurées), diaporama de présentation (8-12 diapositives pour les réunions commerciales), script de témoignage vidéo (plan de script d'entretien de 2-3 minutes), extraits pour les réseaux sociaux (citations phares, cartes de statistiques, posts carrousel), et one-pager commercial (résumé recto-verso pour les documents à laisser).
7. **Créer la stratégie de diffusion** : planifiez où et comment l'étude de cas sera publiée et promue — bibliothèque d'études de cas du site web, supports d'aide à la vente, séquences de nurturing e-mail, campagnes sur les réseaux sociaux, actions de relations presse, promotion payante, présentations en conférence, et opportunités de co-marketing partenaire.
8. **Construire le flux d'approbation et la checklist de permissions** : définissez le processus d'approbation complet — relecture interne (juridique, marketing, équipe de compte), relecture client (point de contact, juridique, validation exécutive), vérification de l'exactitude des données, approbation des citations, permission d'usage du logo et de la marque, et calendrier pour chaque étape de relecture.
9. **Rédiger un brouillon de synthèse exécutive** : composez une synthèse exécutive de 150 à 200 mots qui capture l'ensemble de l'arc narratif — qui est le client, ce à quoi il faisait face, ce qui a été fait, et ce qui en a résulté. Cette synthèse sert de base à toutes les déclinaisons de format et aux textes de diffusion.
10. **Planifier les actifs visuels nécessaires** : précisez tous les éléments visuels requis — logo du client (avec permissions d'usage), graphiques de visualisation de données, photographie (photos d'équipe, prises de vue de bureau, images produit), modèles de design de marque, éléments d'infographie, cartes de citations phares, et rushes vidéo le cas échéant.

## Résultat

Un plan de création d'étude de cas structuré contenant :

- **Cadre narratif CSR** — structure Défi-Solution-Résultats avec sous-sections détaillées, cartographie de l'arc émotionnel, et plan de déroulement de l'histoire
- **Jeu de questions d'entretien client** — 15 à 20 questions organisées par section narrative (contexte, défi, solution, résultats, perspectives) avec relances associées
- **Questions d'entretien interne** — 10 questions couvrant la logique stratégique, l'expérience de livraison, les moments clés, et les enseignements rétrospectifs
- **Plan de visualisation des données** — quels indicateurs mettre en avant, types de graphiques pour chaque donnée, designs de comparaison avant/après, et exigences de collecte de données
- **Spécifications des déclinaisons de format** — PDF (4-6 pages avec notes de mise en page), page web (optimisée SEO avec balisage schema), diaporama (8-12 diapositives avec notes de présentateur), vidéo (plan de script de 2-3 min), réseaux sociaux (citations phares et cartes de statistiques), et one-pager (mise en page recto-verso)
- **Stratégie de diffusion** — canaux de publication (site web, outils commerciaux, réseaux sociaux, e-mail, RP), plan de promotion, et ciblage d'audience par canal
- **Checklist de permission et d'approbation** — relecture juridique, étapes de validation client, étapes de vérification des données, approbation des citations, usage du logo, et calendrier de relecture
- **Brouillon de synthèse exécutive** — aperçu de 150 à 200 mots capturant l'arc narratif complet pour un usage dans tous les formats
- **Liste des actifs visuels** — besoins photographiques, spécifications de graphiques, éléments d'infographie, designs de cartes de citations phares, et besoins en rushes vidéo
- **Métadonnées SEO** — balise title optimisée, meta description, mots-clés cibles, et recommandations de données structurées pour la version web
- **Notes d'aide à la vente** — où l'étude de cas s'inscrit dans le tunnel de vente, quelles objections d'acheteurs elle adresse, et comment les équipes commerciales doivent utiliser chaque format
- **Plan de recyclage de contenu** — comment extraire des contenus dérivés (articles de blog, extraits de preuve sociale, témoignages e-mail, diapositives de présentation) de l'étude de cas principale

## Agents utilisés

- **content-creator** — Structure narrative, développement des questions d'entretien, rédaction de la synthèse exécutive, planification des déclinaisons de format, spécification des actifs visuels, et stratégie de recyclage de contenu
- **pr-outreach** — Stratégie de diffusion, identification d'angles RP, cadre de sollicitation média, opportunités de co-marketing partenaire, et ciblage de publication externe

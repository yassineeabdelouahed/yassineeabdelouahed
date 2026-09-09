---
name: webinar-plan
description: "Planifier un webinaire ou un événement virtuel de bout en bout — sélection du format, déroulé minute par minute, texte de la page d'inscription, un calendrier de promotion multicanal sur 3 semaines, des séquences e-mail, un guide de présentateur, un plan d'engagement, un tunnel de suivi post-événement, et une checklist du jour J avec des indicateurs de succès. Se déclenche sur \"/digital-marketing-pro:webinar-plan\", \"plan a webinar on X\", \"how do we get more webinar registrations\", \"build the follow-up sequence for our virtual event\", \"run of show for next month's demo day\". Lit le profil de marque, les guidelines, et les SOP d'agence ; produit le plan et le texte pour qu'une équipe les exécute — cela n'envoie pas d'e-mails et ne configure pas la plateforme de webinaire elle-même."
argument-hint: "[topic]"
---

# /digital-marketing-pro:webinar-plan

## Objectif

Planifier un webinaire ou un événement virtuel du concept au suivi post-événement, y compris la structure de contenu, la stratégie de promotion, l'optimisation de l'inscription, les tactiques d'engagement, et le cadre de mesure. Produit un package d'exécution complet qu'une équipe peut mettre en œuvre sans planification stratégique supplémentaire.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Sujet/thème** : le sujet et l'angle du webinaire — quel problème ou opportunité spécifique sera traité
- **Audience cible** : qui devrait y assister — rôle, ancienneté, secteur, taille d'entreprise, niveau d'expérience, et points de douleur
- **Objectifs** : objectif principal — génération de leads, éducation, démo produit, leadership éclairé, rétention client, ou activation de partenaires
- **Plateforme préférée** : outil de webinaire utilisé ou envisagé (Zoom, Teams, Webex, GoToWebinar, Livestorm, StreamYard, etc.)
- **Date/heure** : date et heure proposées avec le fuseau horaire (ou demander une recommandation de planification optimale selon l'audience)
- **Intervenants** : présentateurs, panélistes, ou hôtes — membres d'équipe interne et/ou invités externes avec leurs domaines d'expertise
- **Budget de promotion** : dépenses disponibles pour générer des inscriptions — publicités payantes, sponsorings, partenariats d'influenceurs, etc.
- **Participation attendue** : objectifs d'inscription et de participation cibles pour la définition des objectifs et la planification de la promotion
- **Actifs de contenu disponibles** : présentations, rapports de recherche, démos, ou contenu existants pouvant être recyclés pour le webinaire
- **Objectifs de suivi** : ce qui devrait se produire après le webinaire — rendez-vous commerciaux pris, inscriptions à un essai gratuit, téléchargements de contenu, adhésions à une communauté

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier aussi la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Définir le format du webinaire** : sélectionner le meilleur format selon les objectifs, les préférences de l'audience, et les forces des intervenants — présentation, table ronde, atelier interactif, démo produit, AMA, discussion informelle, ou format hybride avec plusieurs segments
3. **Créer un plan de contenu chronométré** : construire un déroulé minute par minute — accroche d'ouverture, présentations des intervenants, segments de contenu avec transitions, points d'interaction avec l'audience (sondages, pauses questions-réponses), et CTA de clôture avec l'allocation de temps pour chaque bloc
4. **Concevoir le texte de la page d'inscription** : rédiger le titre, le sous-titre, 3-5 puces de points clés à retenir, les biographies des intervenants avec des marqueurs de crédibilité, des éléments d'urgence (places limitées, compte à rebours), et une preuve sociale (citations d'anciens participants, logos d'entreprises) optimisés pour la conversion
5. **Construire un plan de promotion multicanal** : créer une stratégie de promotion coordonnée à travers les séquences e-mail, les publications sociales organiques, les publicités payantes (LinkedIn, Meta, Google), la promotion croisée avec des partenaires/intervenants, les bannières de blog/site web, l'engagement communautaire, et le plaidoyer interne des employés
6. **Créer des supports de préparation pour les présentateurs** : élaborer un brief pour les intervenants avec les points de discussion clés, des recommandations de structure de présentation, le contexte du profil d'audience, des rappels de voix de marque, une préparation aux questions-réponses, et une checklist de configuration technique/répétition
7. **Concevoir la stratégie d'engagement des participants** : planifier les éléments interactifs — questions de sondage précises liées au contenu, approche de facilitation des questions-réponses, invites de chat pour susciter la discussion, activités en salles de sous-groupes (le cas échéant), partage de ressources en direct, et mécanismes de retour en temps réel
8. **Planifier la séquence post-événement** : concevoir le tunnel de suivi complet — calendrier de disponibilité de l'enregistrement, séquences e-mail segmentées pour les participants vs les absents, critères de notation des leads selon l'engagement, processus de transmission aux commerciaux pour les leads à forte intention, et plan de recyclage de contenu (article de blog, extraits sociaux, épisode de podcast, infographie)
9. **Définir les indicateurs de succès** : fixer des objectifs pour les inscriptions, le taux de présence, le taux d'engagement (participation aux sondages, questions posées, activité du chat), les leads générés, le pipeline influencé, et la satisfaction des participants — avec des comparaisons aux benchmarks sectoriels
10. **Créer la checklist du jour J** : construire un calendrier opérationnel complet du jour couvrant la configuration et les tests techniques, le calendrier de répétition, les plans de secours en cas de défaillance d'intervenant ou technique, les tâches du modérateur minute par minute, la confirmation d'enregistrement, et les actions immédiates post-événement

## Sortie

Un package d'exécution de webinaire structuré contenant :

- **Brief du webinaire** : format, objectifs, profil d'audience, intervenants, plateforme, date/heure, et résumé des indicateurs cibles
- **Plan de contenu chronométré** : déroulé minute par minute avec assignations d'intervenants, notes de transition, et points d'engagement
- **Texte de la page d'inscription** : titre, description, puces de points clés, biographies des intervenants, éléments de preuve sociale, et CTA — prêt à la mise en œuvre
- **Calendrier de promotion sur 3 semaines** : activités de promotion jour par jour sur tous les canaux avec le contenu, les responsables assignés, et l'allocation des dépenses
- **Séquences e-mail** : série d'invitation (2-3 e-mails avec urgence croissante), séquence de rappel (1 semaine, 1 jour, 1 heure avant), et suivi post-événement (parcours séparés pour les participants et les absents)
- **Publications de promotion sociale** : publications spécifiques à la plateforme pour LinkedIn, X/Twitter, Facebook, et Instagram — couvrant les phases teaser, annonce, compte à rebours, jour J, et post-événement
- **Guide du présentateur** : brief de l'intervenant avec les points de discussion, les notes de voix de marque, le contexte d'audience, la checklist technique, et le calendrier de répétition
- **Plan d'engagement** : questions de sondage précises, invites de chat chronométrées, guide de facilitation des questions-réponses, et éléments interactifs cartographiés sur la chronologie du contenu
- **Séquence de suivi post-événement** : plan de livraison de l'enregistrement, matrice de notation des leads, critères de transmission aux commerciaux, conception du parcours de nurturing, et feuille de route de recyclage de contenu
- **Checklist du jour J** : checklist opérationnelle heure par heure de la configuration jusqu'au bilan post-événement avec des plans de secours
- **Spécification de tableau de bord d'indicateurs de succès** : définitions des KPI, objectifs, méthodes de mesure, sources de données, et comparaisons aux benchmarks sectoriels
- **Plan de recyclage de contenu** : actifs dérivés spécifiques à créer à partir du webinaire — article de blog, extraits sociaux, épisode de podcast, infographie, contenu e-mail
- **Répartition budgétaire** : allocation des dépenses de promotion par canal avec des estimations de coût par inscription attendues

## Agents utilisés

- **content-creator** — plan de contenu du webinaire, texte d'inscription, séquences e-mail, publications de promotion sociale, points de discussion des présentateurs, invites d'engagement
- **email-specialist** — stratégie d'e-mail d'invitation et de suivi, optimisation du chronométrage d'envoi, test d'objets, logique de segmentation, vérifications de délivrabilité
- **marketing-strategist** — stratégie de promotion, ciblage d'audience, cadre d'indicateurs de succès, sélection du format, stratégie de leads post-événement, projection de ROI
</content>

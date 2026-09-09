---
name: retargeting-strategy
description: "Concevoir un playbook de retargeting cross-plateforme — segments d'audience par étape de tunnel avec fenêtres de récence, séquencement créatif par segment, plafonds de fréquence, listes d'exclusion, allocation budgétaire, configuration de flux produit dynamique, déclencheurs d'optimisation basés sur les KPI, et une feuille de route à 30/60/90 jours. Se déclenche sur \"/digital-marketing-pro:retargeting-strategy\", \"plan our remarketing campaigns\", \"cart abandoners aren't converting\", \"how should we sequence retargeting ads\", \"set frequency caps across Meta and Google\". Lit le profil de marque et les performances de campagnes passées via campaign-tracker.py ; produit le document de stratégie et la checklist de suivi — il ne lance ni ne modifie de campagnes en direct."
---

# /digital-marketing-pro:retargeting-strategy

## Objectif

Concevoir une stratégie de retargeting cross-plateforme avec une segmentation d'audience par étape de tunnel et comportement, un séquencement créatif, une gestion de la fréquence, et une allocation budgétaire. Produit un playbook de retargeting complet, prêt à être mis en œuvre sur les plateformes publicitaires.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Volume de trafic du site web** : Visiteurs uniques mensuels et pages vues (une approximation suffit)
- **Étapes du tunnel de conversion** : Les étapes clés du parcours utilisateur (visite, vue produit, ajout au panier, checkout, achat -- ou équivalent pour les tunnels de génération de leads)
- **Plateformes utilisées** : Quelles plateformes publicitaires sont actives ou disponibles (Google Ads, Meta, LinkedIn, TikTok, DSP programmatiques, etc.)
- **Budget de retargeting** : Budget mensuel alloué ou disponible pour les campagnes de retargeting
- **Catalogue produit** : Pour le retargeting dynamique -- si un flux produit existe et sur quelles plateformes il est configuré
- **Cycle d'achat moyen** : Temps typique entre la première visite et la conversion (jours, semaines, mois)
- **Configuration de retargeting actuelle** : Toute campagne de retargeting existante, statut du pixel/tag, définitions d'audience déjà en place, et performance actuelle
- **Statut du pixel et du suivi** : Quels pixels/tags sont installés et se déclenchent correctement (Meta Pixel, Google Tag, LinkedIn Insight Tag, TikTok Pixel, etc.)

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix, la conformité, le contexte sectoriel. Vérifier `guidelines/_manifest.json` pour les restrictions, les messages clés, les styles par canal, les règles de voix et de ton, et les modèles. Si un modèle correspondant à cette commande existe dans `~/.claude-marketing/brands/{slug}/templates/`, appliquer son format. Si aucune marque n'existe, inviter à `/digital-marketing-pro:brand-setup` ou continuer avec les valeurs par défaut.
2. **Vérifier l'historique des campagnes** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` pour revoir la performance des campagnes de retargeting existantes et identifier ce qui a déjà été testé.
3. **Auditer l'infrastructure de suivi** : Vérifier le statut d'installation du pixel et du tag sur les plateformes. Identifier les lacunes de suivi qui empêcheraient la construction d'audiences ou l'attribution de conversion avant de concevoir la stratégie.
4. **Définir les segments d'audience de retargeting** : Créer des segments basés sur l'étape de tunnel (visiteurs de notoriété, consultateurs de produits, abandonneurs de panier, acheteurs passés, clients inactifs), les signaux comportementaux (pages visitées, temps sur le site, fréquence de visite, contenu consommé), et les fenêtres de récence (1-3 jours, 4-7 jours, 8-14 jours, 15-30 jours, 31-90 jours). Dimensionner chaque segment en fonction du volume de trafic.
5. **Concevoir la séquence créative par segment** : Cartographier une séquence de messages pour chaque segment d'audience qui fait progresser l'utilisateur vers la conversion -- les segments de notoriété reçoivent des messages éducatifs et de proposition de valeur, les segments de considération reçoivent des preuves sociales et de différenciation, les abandonneurs de panier reçoivent de l'urgence et des incitations, les acheteurs passés reçoivent de l'upsell et du cross-sell, et les clients inactifs reçoivent des offres de réengagement.
6. **Définir les plafonds de fréquence par plateforme** : Définir des limites d'impression par utilisateur et par jour et par semaine pour chaque plateforme. Équilibrer la visibilité contre la lassitude publicitaire -- typiquement 3-5 impressions par jour pour le display, 1-2 par jour pour les emplacements de fil d'actualité social, et 15-20 par semaine maximum sur l'ensemble des emplacements combinés.
7. **Planifier la coordination cross-plateforme** : Orchestrer le retargeting sur les plateformes afin que les utilisateurs voient un parcours cohérent plutôt que des messages redondants. Attribuer des rôles primaires et secondaires par plateforme (par ex. Meta pour le retargeting de notoriété, Google Display pour le milieu de tunnel, le remarketing recherche pour l'intention élevée, LinkedIn pour les décideurs B2B).
8. **Concevoir les listes d'exclusion** : Définir les fenêtres d'exclusion des convertisseurs (exclure les acheteurs pendant 7-30 jours après conversion), les exclusions inter-segments (empêcher les utilisateurs de voir à la fois des publicités de notoriété et d'abandon de panier simultanément), et des règles d'audience négative pour éviter le gaspillage et la lassitude de marque.
9. **Définir l'allocation budgétaire par segment** : Répartir le budget de retargeting entre les segments en fonction de la taille d'audience, de la proximité de la conversion, et du ROAS attendu. Les segments bas de tunnel (abandonneurs de panier) reçoivent généralement la dépense par utilisateur la plus élevée malgré des tailles d'audience plus petites.
10. **Configurer le retargeting dynamique** : Si un catalogue produit est disponible, spécifier la configuration de publicité dynamique -- exigences de flux, conception de template, logique de recommandation produit (articles consultés, produits complémentaires, meilleures ventes), et créations de repli pour les utilisateurs sans données au niveau produit.
11. **Définir les KPI et déclencheurs d'optimisation** : Définir les indicateurs de succès par segment et par plateforme (ROAS, CPA, conversions vue-passée, fréquence, CTR). Définir des déclencheurs d'optimisation -- quand rafraîchir la création, ajuster les enchères, réallouer le budget, ou étendre/contracter les fenêtres d'audience.
12. **Créer la structure UTM pour le suivi** : Construire une convention de nommage UTM permettant un suivi granulaire de la performance du retargeting par segment, plateforme, variante créative, et étape de tunnel dans l'analytics.

## Résultat

Un document de stratégie de retargeting structuré contenant :

- Définitions des segments d'audience avec estimations de taille, fenêtres de récence, et critères comportementaux
- Brief créatif par segment avec thèmes de messages, formats publicitaires, et logique de séquencement
- Recommandations de plafond de fréquence par plateforme avec justification pour chaque limite
- Plan de coordination cross-plateforme montrant quelle plateforme sert quel rôle de tunnel
- Définitions de listes d'exclusion avec fenêtres de suppression des convertisseurs et règles inter-segments
- Tableau d'allocation budgétaire par segment et plateforme avec objectifs de ROAS attendus
- Guide de configuration de retargeting dynamique avec exigences de flux et logique de recommandation produit
- Cadre de KPI avec objectifs par segment, déclencheurs d'optimisation, et cadence de revue
- Structure UTM et conventions de nommage pour le suivi des campagnes de retargeting
- Feuille de route d'optimisation à 30/60/90 jours avec points de contrôle des jalons et critères de mise à l'échelle
- Considérations de confidentialité et de conformité (consentement aux cookies, restrictions d'audience RGPD/CCPA, limitations de confidentialité spécifiques aux plateformes)
- Checklist d'infrastructure de suivi avec exigences de vérification du pixel/tag par plateforme

## Agents utilisés

- **media-buyer** -- Segmentation d'audience, configuration de retargeting spécifique à la plateforme, gestion de la fréquence, allocation budgétaire, stratégie d'enchères, configuration du retargeting dynamique, et conception de la structure de campagne
- **marketing-strategist** -- Stratégie de séquencement créatif, coordination cross-plateforme, architecture de messages par étape de tunnel, et planification de la feuille de route d'optimisation
</content>

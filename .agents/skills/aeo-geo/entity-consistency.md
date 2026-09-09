# Cohérence des entités — Audit et optimisation multiplateforme

## Vue d'ensemble

Garantir que les informations de marque sont cohérentes sur toutes les sources de connaissances que les modèles d'IA consultent. Les incohérences déroutent les plateformes IA et réduisent la confiance dans la citation.

**Pourquoi cela compte davantage pour Google AI Mode (mi-2026) :** AI Mode — la surface de recherche conversationnelle de Google, par défaut pour les utilisateurs ayant opté depuis l'I/O du 19 mai 2026 — ajoute « Personal Intelligence », qui repondère les réponses en fonction du contexte propre de chaque utilisateur (connexions Gmail / Calendar / Photos). Cette personnalisation s'appuie sur le même graphe d'entités, donc les lacunes ou contradictions dans votre NAP, vos services, vos horaires, votre date de fondation et votre direction dégradent les réponses d'AI Mode encore plus fortement que celles d'AI Overviews. L'exhaustivité et la cohérence des entités constituent l'investissement AI Mode au plus fort effet de levier. AI Mode est une **surface distincte** d'AI Overviews — vérifiez la représentation de l'entité sur les deux.

---

## Liste de contrôle d'audit des entités

Vérifier les points de données suivants sur toutes les plateformes :

| Point de donnée | Google KG | Wikidata | Wikipédia | Crunchbase | LinkedIn | Site web | Bases sectorielles |
|-----------|-----------|----------|-----------|------------|----------|---------|--------------|
| Nom de marque (exact) | | | | | | | |
| Date de fondation | | | | | | | |
| Fondateurs/PDG | | | | | | | |
| Siège social | | | | | | | |
| Catégorie de secteur | | | | | | | |
| Fourchette d'effectifs | | | | | | | |
| Descriptions de produits | | | | | | | |
| Fourchette de revenus | | | | | | | |
| Différenciateurs clés | | | | | | | |
| URL du site web | | | | | | | |
| Profils sociaux | | | | | | | |

**Marquer chaque cellule** : Correct / Incorrect / Manquant / Obsolète

---

## Types d'incohérences courants

| Type | Exemple | Impact | Priorité de correction |
|------|---------|--------|-------------|
| **Variation du nom** | « Marque SA » vs « Marque » vs « Marque Corp » | Élevé — perturbe la résolution d'entité | Critique |
| **Décalage de date** | Fondée en 2019 sur Crunchbase, 2020 sur LinkedIn | Moyen — nuit à la confiance | Élevée |
| **Conflit de description** | « Plateforme IA » sur une source, « outil SaaS » sur une autre | Élevé — confusion de catégorie | Élevée |
| **Direction obsolète** | Ancien PDG listé comme actuel | Moyen — signale des données périmées | Moyenne |
| **Écart d'adresse** | Villes différentes selon les sources | Moyen — affecte l'IA locale/géo | Moyenne |
| **Entité manquante** | Aucune entrée Wikidata du tout | Élevé — réduit la découvrabilité par l'IA | Critique |

---

## Optimisation du Knowledge Graph

### Google Knowledge Graph

1. **Revendiquer son panneau de connaissances (Knowledge Panel)** via la vérification d'entité de Google Search Console
2. **Suggérer des modifications** pour les informations incorrectes via le flux « Revendiquer ce panneau de connaissances »
3. **Renforcer les signaux** : s'assurer que le site web, Wikipédia, Wikidata et les sources d'autorité concordent tous
4. **Utiliser le schema Organization** sur la page d'accueil avec des liens `sameAs` vers tous les profils officiels
5. **Surveiller les changements** : mettre en place des alertes pour les modifications du panneau de connaissances

### Déclencheurs du Knowledge Graph

Google construit les entrées du Knowledge Graph à partir de :
- Wikipédia/Wikidata (poids le plus élevé)
- Balisage schema sur le site officiel
- Crunchbase, LinkedIn et autres bases de données d'autorité
- Mentions et citations dans l'actualité
- Google My Business (pour les entités locales)

---

## Directives d'édition Wikidata

### Exigences de notoriété

Wikidata est plus permissif que Wikipédia. Une entité peut avoir une entrée Wikidata si :
- Elle a été couverte par au moins une source fiable indépendante
- Elle possède un identifiant unique dans au moins une base de données externe
- Elle représente une organisation, une personne, un produit ou un concept notable

### Créer une entrée Wikidata

1. Aller sur wikidata.org → Créer un nouvel élément
2. Définir le libellé (nom de marque), la description (identifiant concis) et les alias
3. Ajouter des propriétés :
   - P31 (nature de l'élément) : Q4830453 (entreprise commerciale) ou le type approprié
   - P856 (site web officiel)
   - P571 (date de création)
   - P112 (fondé par)
   - P159 (lieu du siège)
   - P452 (secteur d'activité)
   - Ajouter les identifiants de réseaux sociaux (P2002 Twitter, P4003 Facebook, P4264 LinkedIn)
4. Ajouter une référence pour chaque affirmation (lien vers la source)
5. Ajouter les propriétés équivalentes `sameAs` liant vers d'autres bases de données

### Règles d'édition

- Chaque affirmation DOIT avoir une référence (URL vers une source fiable)
- NE PAS ajouter de contenu promotionnel ou d'affirmations subjectives
- Utiliser la page de discussion pour les modifications contestées
- Déclarer les conflits d'intérêts (si l'on modifie l'entrée de sa propre entreprise)
- Se concentrer uniquement sur des propriétés factuelles et vérifiables

---

## Désambiguïsation du nom de marque

Pour les marques dont le nom est un mot courant :

1. **Utiliser le nom officiel complet** dans toutes les données structurées : « Monday.com » et non « Monday »
2. **Ajouter des qualificatifs de type d'entité** : modèle « Slack (logiciel) » dans les descriptions
3. **Construire des signaux de co-occurrence** : toujours mentionner marque + catégorie de produit ensemble
4. **Désambiguïsation Wikidata** : ajouter la propriété P1889 (différent de) liant vers d'autres entités au nom similaire
5. **Balisage schema** : utiliser la propriété `disambiguatingDescription`
6. **Optimisation de contenu** : inclure « [Marque] [catégorie] [description] » dans les balises title et les titres

---

## Calendrier de suivi des entités

| Tâche | Fréquence | Action |
|------|-----------|--------|
| Vérification du panneau de connaissances Google | Hebdomadaire | Capture d'écran et comparaison avec la précédente |
| Contrôle ponctuel des faits de marque sur AI Mode + AI Overviews | Hebdomadaire | Poser « Qu'est-ce que [Marque] ? » sur les deux surfaces ; confirmer que le NAP/la direction/la description correspondent au profil. Réconcilier les impressions via `/digital-marketing-pro:gsc-ai-performance` |
| Revue Wikidata | Mensuelle | Vérifier l'absence de modifications non autorisées |
| Analyse de cohérence multiplateforme | Trimestrielle | Liste de contrôle d'audit complète sur toutes les plateformes |
| Mise à jour Crunchbase/LinkedIn | Après tout changement | Mettre à jour immédiatement dès qu'une information change |
| Surveillance Wikipédia | Configurer des alertes | Surveiller les modifications d'article via une liste de suivi |
| Validation du balisage schema | Mensuelle | Tester via l'outil de test des résultats enrichis de Google |

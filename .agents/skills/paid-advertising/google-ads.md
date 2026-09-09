# Google Ads — Guide de référence des campagnes

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Notes de version de l'API (juillet 2026)

Si vous écrivez du code ou construisez des requêtes API contre l'API Google Ads, ciblez la **v24.2** (publiée le 24 juin 2026) — la cible stable délibérée de DMP. Les v24.1 et v24.2 sont des versions additives non incompatibles de la lignée v24 ; **la v25 (juillet 2026)** est la nouvelle version majeure et contient des changements incompatibles — adoptez-la délibérément, pas par défaut.

### Google Ads API v25 (juillet 2026)

Version majeure avec des changements incompatibles :

| Élément | Changement | Pourquoi c'est important pour les opérations publicitaires |
|---|---|---|
| `CustomerLifecycleGoal` / `CampaignLifecycleGoal` | SUPPRIMÉ — les ressources historiques de lifecycle-goal ont disparu | Migrez vers le schéma unifié `Goal` + `CampaignGoalConfig` avant de faire passer une intégration à la v25 |
| Objectif d'optimisation de fidélisation | Nouveau type d'objectif | Les campagnes axées sur la fidélisation peuvent optimiser directement pour des résultats de loyauté |
| Métriques d'engagement social pour les publicités Shorts | Nouvelles métriques de reporting | Reporting d'engagement de première classe pour l'inventaire YouTube Shorts |

**La v24.2 reste la cible stable délibérée de DMP** (la lignée v24 est supportée jusqu'en 2027) — ne passez à la v25 qu'avec un plan de migration pour la suppression du lifecycle-goal.

### v24.2 (24 juin 2026 — cible stable)

Ajouts non incompatibles :

| Élément | Où | Pourquoi c'est important pour les opérations publicitaires |
|---|---|---|
| `AssetAutomationType.GENERATE_LANDING_PAGE_TEXT` | Nouvelle valeur d'énumération sur l'API d'automatisation d'assets pour les publicités vidéo Demand Gen | Permet à PMax/Demand Gen de générer automatiquement les variantes de texte de landing page dont la génération d'assets de Google a besoin — moins d'écritures manuelles par campagne |
| `AssetGroup.google_local_services_info` | Nouveau champ sur `AssetGroup` | Support de première classe pour les Local Services Ads (LSA) au sein de l'API standard. Plombiers / électriciens / entreprises de nettoyage / serruriers / avocats etc. peuvent désormais gérer les LSA depuis la même surface API que PMax |
| Ressource `MultiPartyAuthReview` + `MultiPartyAuthReviewService` (bêta) | Nouvelle ressource API | Permet aux annonceurs et à leurs agences de coordonner les revues d'autorisation multi-parties via API — pertinent pour les verticales réglementées (finance, santé, publicités politiques) |

### v24.1 (13 mai 2026)

Ajouts non incompatibles :

| Élément | Où | Pourquoi c'est important pour les opérations publicitaires |
|---|---|---|
| 4 nouveaux types d'expérimentation : `ADOPT_AI_MAX`, `ADOPT_BROAD_MATCH_KEYWORDS`, `OPTIMIZE_ASSETS`, `PMAX_REPLACEMENT_SHOPPING` | Énumération `ExperimentType` | Cadre officiel de test A/B recommandé par Google pour migrer vers AI Max + la requête large + Performance Max remplaçant le Shopping standard. **Exécutez `ADOPT_AI_MAX` avant tout déploiement d'AI Max** — donne des chiffres de lift statistiquement propres par rapport à la référence |
| Segment `mobile_device_platform` | Segments de reporting | Diviser la performance au niveau campagne/annonce/mot-clé entre iOS et Android. Première fois que la division par OS est de première classe dans l'API |

### v24 (22 avril 2026) — changements incompatibles

| Objet | Changement | Effet |
|---|---|---|
| `DemandGenVideoResponsiveAdInfo` | `videos` et `logo_images` désormais REQUIS | Les requêtes sans les deux champs échouent |
| `VideoResponsiveAdInfo` | `videos`, `logo_images` et `business_name` désormais REQUIS | Les requêtes sans les trois champs échouent |
| `Campaign.video_brand_safety_suitability` | SUPPRIMÉ — déplacé au niveau Customer | Définir le contrôle une fois sur l'objet Customer, pas par campagne |
| `CallAd` / `CallAdInfo` | SUPPRIMÉ (dépréciation terminée) | Utiliser les Call Assets à la place |

### v23.1 (25 février 2026)

Ajout de `text_guidelines.term_exclusions` et `text_guidelines.messaging_restrictions` aux assets générés par IA dans **Performance Max** et **Search** — utilisez-les pour injecter directement la liste des mots interdits d'une marque et les messages approuvés dans les garde-fous de génération d'assets de PMax.

Source : [notes de version de l'API Google Ads](https://developers.google.com/google-ads/api/docs/release-notes).

### Recommandation d'adoption

Si vous avez du temps avant votre prochain déploiement :
- **Faites passer les clients à la v24.2** pour débloquer les Local Services Ads + la génération de texte de landing page
- **Câblez les expérimentations `ADOPT_AI_MAX`** (v24.1) dans tout plan de migration AI Max — le chemin de mesure de lift privilégié par Google
- **Ajoutez la segmentation `mobile_device_platform`** à tout rapport de performance iOS vs Android (v24.1)

## Vue d'ensemble des types de campagnes

| Type de campagne | Idéal pour | Ciblage | Format créatif | Fourchette de ROAS typique |
|---|---|---|---|---|
| Search | Capture de forte intention | Mots-clés | Annonces texte (RSA) | 3x–10x |
| Performance Max | Automatisation full-funnel | Signaux + IA Google | Tous formats | 2x–8x |
| Display | Notoriété, retargeting | Audiences, emplacements | Image, responsive | 1x–4x |
| YouTube (vidéo) | Brand lift, considération | Démographie, intention | Vidéo (6s–3min) | 1x–5x |
| Shopping (standard) | Contrôle au niveau produit | Flux produit | Annonces liste de produits | 3x–12x |
| Demand Gen | Découverte en milieu de tunnel | Lookalikes, audiences | Image + vidéo | 2x–6x |

## Bonnes pratiques de structure de compte

### Structure simplifiée moderne (recommandée)
```
Compte
├── Campagne Search de marque
│   └── 1–3 groupes d'annonces (marque, marque + produit, marque + concurrent)
├── Campagne(s) Search hors marque
│   └── Groupes d'annonces thématisés par catégorie de service/produit
├── Campagne(s) Performance Max
│   └── Groupes d'assets segmentés par ligne de produit/service
├── Campagne de retargeting
│   └── Remarketing Display/YouTube
└── Campagne Vidéo/Demand Gen
    └── Notoriété haut/milieu de tunnel
```

### Principes de structure
- [ ] Consolider les campagnes pour donner plus de données à l'algorithme par campagne
- [ ] Minimum 30 conversions par campagne et par mois pour les enchères automatisées
- [ ] Éviter les groupes d'annonces à mot-clé unique (SKAG) — obsolète avec la requête large + les enchères intelligentes
- [ ] Segmenter par priorité budgétaire, pas par thèmes de mots-clés granulaires
- [ ] Utiliser des libellés et des conventions de nommage pour la clarté du reporting

## Arbre de décision de stratégie d'enchères

```
DÉBUT : Quel est votre objectif principal ?
│
├── Maximiser les conversions (volume)
│   ├── Avez-vous un CPA cible ? → CPA cible (tCPA)
│   └── Pas de cible de CPA ? → Maximiser les conversions
│
├── Maximiser le revenu (valeur)
│   ├── Avez-vous un ROAS cible ? → ROAS cible (tROAS)
│   └── Pas de cible de ROAS ? → Maximiser la valeur de conversion
│
├── Trafic / Clics
│   └── Maximiser les clics (fixer un plafond de CPC max)
│
├── Notoriété / Impressions
│   └── Part d'impressions cible
│
└── Contrôle total (faible volume)
    └── CPC manuel (Amélioré optionnel)
```

### Critères de sélection de la stratégie d'enchères

| Stratégie | Conversions mensuelles min. | Quand l'utiliser | À surveiller |
|---|---|---|---|
| tCPA | 30+ | Objectif de CPA stable, génération de leads | Fixer des cibles réalistes (commencer à 2x le réel) |
| tROAS | 50+ | E-commerce, valeurs variables | Nécessite des valeurs de conversion précises |
| Max de conversions | 15+ | Nouvelles campagnes, budget contraint | Peut surdépenser sur des conversions de faible qualité |
| Max de valeur de conv. | 15+ | Focus revenu, pas de cible de ROAS | Peut poursuivre des valeurs aberrantes élevées |
| CPC manuel | Tout | Faible volume, test | Chronophage, rate des signaux |

## Stratégie de types de correspondance de mots-clés

| Type de correspondance | Syntaxe | Comportement (2024+) | Cas d'usage |
|---|---|---|---|
| Requête large | `mot-clé` | Portée la plus large ; signification + intention | Associer aux enchères intelligentes ; moteur principal |
| Expression | `"mot-clé"` | Contient le sens dans l'ordre | Contrôle moyen ; séquences d'intention spécifiques |
| Exact | `[mot-clé]` | Correspondance de sens la plus proche | Convertisseurs à forte valeur, éprouvés |

### Stratégie de mots-clés moderne
1. **Commencer avec la requête large + tCPA/tROAS** — laisser les enchères intelligentes optimiser
2. **Utiliser la correspondance exacte pour les meilleurs performeurs** — protéger le budget sur les termes éprouvés
3. **Correspondance expression pour la spécificité** — quand la requête large ramène du trafic non pertinent
4. **Analyse des termes de recherche chaque semaine** — extraire des négatifs et de nouveaux mots-clés
5. **Éviter le chevauchement de mots-clés** — dédupliquer entre les groupes d'annonces pour éviter l'auto-concurrence

## Optimisation du Quality Score

### Composantes du Quality Score

| Composante | Poids | Comment améliorer |
|---|---|---|
| CTR attendu | ~35 % | Texte publicitaire convaincant, CTA forts, extensions d'annonce |
| Pertinence de l'annonce | ~25 % | Faire correspondre le texte de l'annonce à l'intention du mot-clé, utiliser le mot-clé dans les titres |
| Expérience de la landing page | ~40 % | Vitesse de la page, adaptée au mobile, contenu pertinent, CTA clair |

### Checklist d'amélioration du Quality Score
- [ ] Le mot-clé apparaît dans au moins 2 des 15 titres RSA
- [ ] Le titre de la landing page correspond à l'intention de recherche
- [ ] La page se charge en moins de 3 secondes (mobile)
- [ ] Design responsive mobile vérifié
- [ ] CTA clair au-dessus de la ligne de flottaison
- [ ] Le contenu répond directement à la requête du chercheur
- [ ] Pop-ups et interstitiels minimaux
- [ ] HTTPS activé
- [ ] Balisage de données structurées présent

## Stratégie de rédaction RSA (Responsive Search Ad)

### Cadre des titres (15 titres)

| Emplacement | Objectif | Exemple |
|---|---|---|
| H1–H3 | Proposition de valeur principale (épingler H1 en position 1) | « Logiciel de gestion de projet primé » |
| H4–H6 | Fonctionnalités / différenciateurs | « Outils de collaboration en temps réel » |
| H7–H9 | Preuve sociale / signaux de confiance | « Approuvé par plus de 10 000 équipes dans le monde » |
| H10–H12 | CTA et offres | « Commencez votre essai gratuit de 14 jours » |
| H13–H14 | Insertion de mot-clé / localisation | « Meilleur {KeyWord:Outil PM} pour les équipes » |
| H15 | Variante saisonnière ou de test | « Nouvelles fonctionnalités 2026 désormais disponibles » |

### Cadre des descriptions (4 descriptions)
1. **Proposition de valeur principale + CTA** — énoncé de bénéfice complet avec action
2. **Fonctionnalités et points de preuve** — capacités spécifiques, statistiques, récompenses
3. **Traitement des objections** — sans carte bancaire, essai gratuit, garantie de remboursement
4. **Urgence / offre** — durée limitée, accroche saisonnière, remise

### Stratégie d'épinglage
- Épingler votre titre de marque le plus fort en position 1
- Épingler votre CTA le plus fort en position 2 (optionnel)
- Ne jamais épingler plus de 2 titres — laisser Google optimiser
- N'épingler qu'une seule description si la conformité exige un langage spécifique

## Checklist de configuration Performance Max

### Avant le lancement
- [ ] Suivi de conversion vérifié (hors ligne + en ligne, avec valeurs si possible)
- [ ] Conversions améliorées activées
- [ ] Google Merchant Center connecté (e-commerce)
- [ ] Google Business Profile lié (local)
- [ ] Chaîne YouTube liée
- [ ] Signaux d'audience configurés (segments personnalisés, listes de clients, visiteurs du site)
- [ ] Exclusions de marque appliquées (si disponible)

### Configuration du groupe d'assets
- [ ] 20 assets texte (5 titres, 5 titres longs, 5 descriptions, 1 nom d'entreprise, 4 liens annexes minimum)
- [ ] 20 assets image (divers ratios d'aspect : 1,91:1, 1:1, 4:5)
- [ ] 5 assets vidéo (paysage, portrait, carré — au moins 10 secondes)
- [ ] Expansion d'URL finale activée ou désactivée selon la stratégie
- [ ] Exclusions d'URL définies pour éviter les landing pages non pertinentes

### Surveillance après le lancement
- [ ] Laisser 2 à 4 semaines de phase d'apprentissage avant des changements majeurs
- [ ] Revoir les notations de performance des assets chaque semaine (remplacer les assets « Faible »)
- [ ] Consulter l'onglet Insights pour les données d'audience et de catégorie de recherche
- [ ] Surveiller les rapports d'emplacement pour la sécurité de marque
- [ ] Comparer la performance PMax à la recherche de marque (vérification de cannibalisation)

## Gestion des mots-clés négatifs

### Types de correspondance négative

| Type | Syntaxe | Bloque |
|---|---|---|
| Négatif large | `mot-clé` | Toute requête contenant tous les termes négatifs (dans n'importe quel ordre) |
| Négatif expression | `"mot-clé"` | Requêtes contenant l'expression exacte dans l'ordre |
| Négatif exact | `[mot-clé]` | Seulement la requête exacte |

### Bonnes pratiques des mots-clés négatifs
- [ ] Créer des listes de mots-clés négatifs partagées au niveau du compte
- [ ] Revoir le rapport de termes de recherche chaque semaine (quotidien pendant le lancement)
- [ ] Maintenir des listes d'exclusion standard : emplois, gratuit, DIY, avis, concurrents (si souhaité)
- [ ] Ajouter des négatifs au niveau campagne pour la spécificité, au niveau compte pour l'universel
- [ ] Exporter et auditer les listes négatives trimestriellement — trop négativer tue le volume
- [ ] Croiser les négatifs avec les mots-clés actifs pour éviter les conflits

### Listes négatives standard à maintenir
1. **Protection de marque** : noms de concurrents (si non ciblés)
2. **Exclusion d'intention** : « gratuit », « emploi », « salaire », « comment faire », « DIY »
3. **Modificateurs non pertinents** : « pas cher », « occasion » (termes spécifiques au secteur)
4. **Conformité** : termes restreints pour votre verticale

## Optimisation du flux Shopping

### Attributs de flux requis (à optimiser)

| Attribut | Conseil d'optimisation |
|---|---|
| `title` | Commencer par marque + type de produit + attribut clé (couleur, taille). Max 150 caractères. |
| `description` | Inclure des mots-clés pertinents naturellement. Les 160 premiers caractères comptent le plus. |
| `product_type` | Utiliser le chemin de catégorie complet : Maison > Meubles > Canapés > Canapés d'angle |
| `google_product_category` | Faire correspondre à l'ID de taxonomie Google le plus spécifique |
| `image_link` | Fond blanc, haute résolution, sans filigrane, sans superposition promotionnelle |
| `price` | Doit correspondre exactement à la landing page ; utiliser `sale_price` pour les promos |
| `availability` | Garder synchronisé — les désapprobations pour incohérences nuisent à la santé du compte |
| `gtin` / `mpn` | Toujours fournir quand disponible ; permet des placements plus riches |
| `custom_labels` | Étiqueter par marge, meilleure vente, saisonnier, liquidation pour la segmentation d'enchères |

### Checklist de santé du flux
- [ ] Zéro désapprobation (vérifier les Diagnostics chaque jour)
- [ ] Flux supplémentaire pour les remplacements sans toucher au flux principal
- [ ] Fréquence de rafraîchissement du flux : quotidienne minimum, idéalement toutes les 6 heures
- [ ] Toutes les variantes (taille, couleur) listées comme articles séparés
- [ ] Flux promotionnel connecté pour les promotions marchand
- [ ] Règles de flux configurées pour les correctifs automatisés d'attributs
- [ ] Données de tarification concurrentielle revues via le rapport de compétitivité des prix

## Métriques clés et benchmarks (moyennes cross-secteurs)

| Métrique | Search | Shopping | Display | YouTube |
|---|---|---|---|---|
| CTR | 3–6 % | 0,8–1,5 % | 0,3–0,6 % | 0,5–2 % (TrueView) |
| CPC | 1–5 $ | 0,30–1,50 $ | 0,20–0,80 $ | 0,02–0,10 $ (CPV) |
| Taux de conv. | 3–7 % | 1,5–3,5 % | 0,5–1,5 % | 0,5–2 % |
| Quality Score | 7+ cible | N/A | N/A | N/A |

> **Remarque :** Les benchmarks varient considérablement selon le secteur, la géographie et la saison. Utilisez-les comme points de départ directionnels et calibrez-les avec vos propres données historiques sur 30 à 60 jours.

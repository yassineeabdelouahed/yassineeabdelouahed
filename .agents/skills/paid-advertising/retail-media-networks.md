# Réseaux de retail media — Amazon, Walmart et plus

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Vue d'ensemble du paysage du retail media

### Que sont les réseaux de retail media (RMN) ?
Les réseaux de retail media sont des plateformes publicitaires construites sur les écosystèmes des enseignes. Ils exploitent les données propriétaires des acheteurs (historique d'achat, comportement de recherche, motifs de navigation) pour diffuser des publicités au moment ou à proximité de l'acte d'achat. C'est le segment de la publicité numérique à la croissance la plus rapide, dépassant désormais ~150 Md$ dans le monde.

### Pourquoi le retail media compte
- **Données propriétaires** : Basées sur le comportement d'achat réel, pas des centres d'intérêt inférés
- **Mesure en boucle fermée** : Voir l'exposition publicitaire jusqu'à l'achat sans lacunes d'attribution
- **Forte intention d'achat** : Les acheteurs sont déjà en mode achat sur les plateformes de retail
- **Résistant aux cookies** : Aucune dépendance aux cookies tiers ou identifiants mobiles
- **Influence sur le rayon numérique** : Les publicités impactent directement la visibilité produit et le classement organique

### Comparaison des réseaux de retail media

| Réseau | Visiteurs mensuels (US) | Revenu publicitaire | Self-Serve | Hors site (DSP) | Forces |
|---|---|---|---|---|---|
| **Amazon Ads** | 200 M+ | 50 Md$+ | Oui | Oui (Amazon DSP) | Données d'acheteur les plus profondes, plus grande échelle |
| **Walmart Connect** | 120 M+ | 3 Md$+ | Oui | Oui (partenariat TTD) | Omnicanal (en magasin + en ligne) |
| **Target Roundel** | 50 M+ | 1,5 Md$+ | Limité | Oui | Base de clients fidèles, données de foyer |
| **Kroger Precision Mktg** | 60 M+ | 1 Md$+ | Limité | Oui (via 84.51°) | Données d'achat en épicerie, focus CPG |
| **Instacart Ads** | 30 M+ | 1 Md$+ | Oui | Limité | Livraison d'épicerie, impulsion au panier |
| **Albertsons Media Collective** | 30 M+ | En croissance | Limité | Oui | Données de fidélité en épicerie |
| **Best Buy Ads** | 50 M+ | En croissance | Limité | Oui | Données d'achat électronique, électroménager |
| **Ulta Beauty** | 30 M+ | En croissance | Limité | Oui | Autorité dans la catégorie beauté |
| **Dollar General** | 20 M+ | En croissance | Limité | Oui | Données d'acheteurs ruraux, orientés valeur |
| **Wayfair** | 40 M+ | En croissance | Oui | Limité | Catégorie maison et mobilier |

## Approfondissement Amazon Ads

### Vue d'ensemble des types de publicité

| Type de publicité | Emplacement | Ciblage | Facturation | CPC/CPM moyen | Idéal pour |
|---|---|---|---|---|---|
| **Sponsored Products** | Résultats de recherche, pages produit | Mots-clés, produit/catégorie | CPC | 0,50–2,00 $ | Ventes directes, conquête de mots-clés |
| **Sponsored Brands** | Haut de la recherche, vidéo | Mots-clés, catégories | CPC | 0,75–3,00 $ | Notoriété de marque au point de recherche |
| **Sponsored Display** | Pages produit, hors Amazon | Audience, ciblage produit | CPC/vCPM | 0,30–1,50 $ | Retargeting, ciblage concurrentiel |
| **Amazon DSP** | Amazon + web ouvert | Segments d'audience, AMC | CPM | 3–15 $ (CPM) | Full-funnel, notoriété, hors site |

### Stratégie Sponsored Products

#### Stratégie de type de correspondance (spécifique à Amazon)

| Type de correspondance | Comportement | Stratégie |
|---|---|---|
| **Large** | Correspondance la plus large, inclut les synonymes | Découverte, recherche de mots-clés |
| **Expression** | Contient l'expression dans l'ordre | Milieu de tunnel, termes de catégorie |
| **Exact** | Correspondance précise du terme | Convertisseurs éprouvés, défense de marque |
| **Auto (correspondance proche)** | Amazon fait correspondre à la fiche produit | Découverte et indexation |
| **Auto (correspondance large)** | Correspondance automatisée plus large | Exploration de catégorie |
| **Auto (substituts)** | Pages produit concurrentes | Conquête concurrentielle |
| **Auto (compléments)** | Pages produit associées | Cross-sell, adjacence |

#### Architecture de campagne Sponsored Products
```
Compte
├── Campagne de défense de marque (correspondance exacte, termes de marque)
│   └── Objectif : Protéger les recherches de marque à faible ACoS
├── Campagne de catégorie (correspondance expression + large)
│   └── Objectif : Capturer la demande de catégorie
├── Campagne de conquête concurrentielle (correspondance exacte, marques concurrentes)
│   └── Objectif : Gagner les acheteurs des concurrents
├── Campagne auto (tous types de correspondance)
│   └── Objectif : Découverte, alimenter la recherche de mots-clés vers les campagnes manuelles
└── Campagne de ciblage produit
    └── Objectif : Apparaître sur des ASIN concurrents/complémentaires spécifiques
```

#### Workflow de recherche de mots-clés
1. Lancer une campagne auto → récolter les termes de recherche convertissant (7–14 jours)
2. Déplacer les gagnants vers des campagnes manuelles en correspondance exacte
3. Ajouter en négatif les termes récoltés depuis la campagne auto pour éviter le chevauchement
4. Utiliser Brand Analytics (top termes de recherche) pour l'intelligence de catégorie
5. Exécuter des campagnes en correspondance large pour la découverte continue avec des cibles d'ACoS strictes
6. Revoir les rapports de termes de recherche chaque semaine ; ajouter en négatif les termes non pertinents

### Stratégie Sponsored Brands

| Format | Description | Idéal pour |
|---|---|---|
| **Collection de produits** | Logo de marque + titre + 3 produits | Notoriété de marque + catégorie |
| **Store Spotlight** | Logo de marque + 3 pages de store | Générer du trafic vers le Brand Store |
| **Vidéo** | Vidéo en lecture automatique dans les résultats de recherche | Démonstration produit, différenciation |

### Bonnes pratiques Sponsored Brands
- [ ] Titre personnalisé de moins de 50 caractères, axé bénéfice
- [ ] Mettre en avant les produits les plus vendus (nombre d'avis et notation les plus élevés)
- [ ] Lier vers le Brand Store (pas la page produit) pour la collection et le spotlight
- [ ] Vidéo : 15–30 secondes, adaptée à la boucle, superpositions de texte pour le visionnage silencieux
- [ ] Tester les variantes de titre mensuellement (bénéfice vs fonctionnalité vs promotion)

### Stratégie Sponsored Display

| Ciblage | Description | Cas d'usage |
|---|---|---|
| **Ciblage produit** | Cibler des ASIN ou catégories spécifiques | Conquête concurrentielle, cross-sell |
| **Audience : remarketing de vues** | Recibler les personnes ayant vu le produit/la catégorie | Réengager les acheteurs qui n'ont pas converti |
| **Audience : remarketing d'achat** | Recibler les acheteurs passés | Réapprovisionnement, cross-sell |
| **Audience : in-market** | Segments in-market Amazon | Prospecting d'acheteurs à forte intention |
| **Audience : lifestyle** | Segments basés sur les centres d'intérêt | Notoriété plus large au sein d'Amazon |

### Amazon DSP

#### Segments d'audience disponibles

| Type de segment | Exemples | Source |
|---|---|---|
| In-market | « In-market pour des chaussures de running » | Signaux de navigation + achat Amazon |
| Lifestyle | « Passionnés de santé », « Adopteurs tech précoces » | Motifs comportementaux à long terme |
| Remarketing | Personnes ayant vu le produit, abandons de panier, acheteurs passés | Vos données d'interaction produit |
| Lookalike | Modélisé à partir de vos acheteurs ou seeds de remarketing | Modélisation ML Amazon |
| Audiences annonceur | Import CRM, pixel de site (tag AAP) | Vos données propriétaires |
| Audiences personnalisées AMC | Requêtes personnalisées sur Amazon Marketing Cloud | Analyse cross-signal |

#### Checklist Amazon DSP
- [ ] Définir la stratégie d'audience : prospecting vs retargeting vs loyauté
- [ ] Configurer Amazon Attribution pour la mesure du trafic hors Amazon
- [ ] Créer des segments d'audience dans la console DSP ou via AMC
- [ ] Préparer le créatif : display (300x250, 728x90, 160x600, 970x250) et vidéo (15s/30s)
- [ ] Fixer les plafonds de fréquence : 3–5/jour (display), 2–3/jour (vidéo)
- [ ] Activer Amazon Audiences pour les campagnes de prospecting
- [ ] Configurer les sources d'offre : propriétés Amazon (IMDb, Twitch, Fire TV) + échange ouvert
- [ ] Configurer AMC (Amazon Marketing Cloud) pour l'attribution avancée et l'analyse de chevauchement

## Walmart Connect

### Types de publicité

| Type de publicité | Emplacement | Ciblage | Facturation |
|---|---|---|---|
| **Sponsored Products** | Résultats de recherche, pages de navigation, pages produit | Mots-clés (auto + manuel), produit | CPC |
| **Sponsored Brands** | Bannière de recherche, étagère de marque | Mots-clés, catégorie | CPC |
| **Display (sur site)** | Walmart.com + app | Audience, catégorie, mot-clé | CPM |
| **Display (hors site)** | Walmart DSP (via TTD) | Données d'achat Walmart | CPM |

### Avantages uniques de Walmart Connect
- **Boucle fermée omnicanal** : Suivre l'exposition publicitaire en ligne jusqu'à l'achat en magasin (via Walmart+, données de fidélité)
- **Connexion en magasin** : 4 700+ magasins fournissent des données de point de contact physique
- **Partenariat TTD** : Utiliser les données propriétaires Walmart pour le ciblage programmatique hors site
- **Concurrence plus faible** : Moins saturé qu'Amazon (CPC plus bas pour de nombreuses catégories)

### Checklist Walmart Connect
- [ ] S'assurer que les fiches produit sont optimisées (contenu, images, avis)
- [ ] Commencer avec des campagnes auto pour la découverte de mots-clés
- [ ] Segmenter par marque, catégorie, et cibles concurrentes
- [ ] Fixer des budgets journaliers minimums (50 $/jour recommandé pour Sponsored Products)
- [ ] Surveiller les rapports de termes de recherche chaque semaine (disponible dans Walmart Ad Center)
- [ ] Tirer parti du Walmart DSP pour le haut de tunnel avec une portée hors site
- [ ] Suivre l'attribution en magasin via le reporting en boucle fermée de Walmart

## Target Roundel

### Capacités

| Fonctionnalité | Description |
|---|---|
| **Display sur site** | Publicités sur Target.com et l'app Target |
| **Programmatique hors site** | Atteindre les acheteurs Target à travers le web ouvert |
| **CTV** | Publicités télévision connectée utilisant les données acheteurs de Target |
| **En magasin (Roundel Media Studio)** | Écrans numériques, échantillonnage, médias en magasin |
| **Mesure** | ROAS en boucle fermée avec les données de fidélité Target Circle |

### Bonnes pratiques Target Roundel
- [ ] Tirer parti des données Target Circle pour la création d'audience (120 M+ membres)
- [ ] Combiner sur site + hors site pour une couverture full-funnel
- [ ] Se concentrer sur les activations saisonnières alignées avec le calendrier promotionnel Target
- [ ] Utiliser la CTV pour atteindre les foyers Target pendant le streaming
- [ ] Investissement de campagne minimum typiquement 25K$–50K$

## Kroger Precision Marketing (via 84.51°)

### Fonctionnalités clés
- Construit sur les données de carte de fidélité Kroger (60 M+ foyers)
- Ciblage basé sur l'achat : acheteurs de catégorie, switchers de marque, acheteurs perdus
- Publicités sur site sur l'écosystème Kroger.com (Kroger, Ralphs, Fred Meyer, etc.)
- Programmatique hors site via des partenariats (TTD, Roku, Pinterest)
- Mesure des ventes en boucle fermée au niveau du foyer

### Segments de ciblage Kroger

| Segment | Description | Cas d'usage |
|---|---|---|
| Acheteurs de la marque | Acheteurs actuels de votre marque | Fidélisation, rétention |
| Acheteurs de concurrents | Achètent des produits concurrents | Conquête, essai |
| Acheteurs de catégorie | Actifs dans la catégorie, pas votre marque | Pénétration de catégorie |
| Acheteurs perdus | Ayant acheté précédemment, ayant arrêté | Reconquête |
| Nouveaux emménagés | Foyers récemment déménagés | Essai, présentation |

## Instacart Ads

### Types de publicité

| Type de publicité | Description | Emplacement |
|---|---|---|
| **Sponsored Products** | Articles promus dans la recherche et la navigation | Résultats de recherche, pages de catégorie, post-paiement |
| **Display** | Publicités bannière sur les surfaces Instacart | Page d'accueil, pages de département, panier |
| **Shoppable Display** | Média riche avec fonctionnalité ajout au panier | Page d'accueil, interstitiels |
| **Shoppable Video** | Publicités vidéo avec capacité d'achat direct | Emplacements dans l'app |

### Notes de stratégie Instacart
- Instacart capture le moment d'impulsion — les acheteurs construisent activement leurs paniers
- Les Sponsored Products au paiement influencent les ajouts de dernière minute
- Cibler la conquête concurrentielle lorsque les acheteurs recherchent des termes de catégorie
- Surveiller l'incrémentalité : les rapports Instacart incluent des métriques new-to-brand
- La dépense minimum varie mais typiquement 5K$/mois pour un test significatif

## Optimisation des fiches produit (cross-plateforme)

### Checklist d'optimisation universelle des fiches

| Élément | Amazon | Walmart | Instacart | Priorité |
|---|---|---|---|---|
| **Titre** | Marque + produit + attributs clés (200 caractères) | Marque + produit + attributs (75 caractères) | Marque + produit (miroir de l'enseigne) | Critique |
| **Images** | 7+ images, infographies, lifestyle, fond blanc principal | 4+ images, fond blanc principal | Miroir des images de l'enseigne | Critique |
| **Points bullets** | 5 puces, axées bénéfice, riches en mots-clés | Section fonctionnalités clés | N/A (limité) | Élevée |
| **Description / Contenu A+** | Enhanced Brand Content (pages A+) | Modules de média riche | N/A | Élevée |
| **Avis** | 50+ avis, cible de notation 4,0+ | 20+ avis minimum | Lié aux avis de l'enseigne | Critique |
| **Mots-clés (backend)** | Champ termes de recherche (250 octets) | Mots-clés cachés | N/A | Élevée |
| **Prix** | Compétitif ; éviter la suppression | Parité de prix avec Amazon | Fixé par l'enseigne | Élevée |
| **Disponibilité** | Taux de stock >95 % | Taux de stock >95 % | Taux de stock >95 % | Critique |

### Impact de la qualité du contenu sur la performance publicitaire
- Les produits avec du contenu A+ voient un lift de taux de conversion de 5–10 % sur Amazon
- Les produits avec une notation de 4,0+ étoiles ont 2x le taux de conversion des produits à 3,5 étoiles
- Des titres riches et optimisés en mots-clés améliorent la pertinence de l'annonce et réduisent le CPC
- La cohérence des stocks évite le gaspillage de dépense publicitaire sur des produits indisponibles

## Allocation budgétaire à travers le retail media

### Cadre budgétaire par objectif

| Objectif | Sponsored Products | Sponsored Brands | Display / DSP | Hors site |
|---|---|---|---|---|
| Lancement d'un nouveau produit | 60 % | 20 % | 15 % | 5 % |
| Croître la part de marché | 40 % | 25 % | 20 % | 15 % |
| Défendre le leadership de catégorie | 50 % | 20 % | 15 % | 15 % |
| Notoriété de marque | 15 % | 25 % | 30 % | 30 % |
| Poussée saisonnière | 50 % | 25 % | 15 % | 10 % |

### Allocation budgétaire par plateforme (multi-enseignes)

| Facteur | Considération |
|---|---|
| Part de revenu par enseigne | Allouer proportionnellement là où vos ventes ont déjà lieu |
| Concurrence de catégorie | Investissement plus élevé là où la concurrence est féroce |
| Disponibilité des données | Investir davantage là où la mesure est la plus complète |
| Opportunité de croissance | Surpondérer les RMN émergents avec moins de concurrence et des CPC plus bas |
| Incrémentalité | Déplacer le budget vers les plateformes prouvant un lift incrémental |

### Budgets minimums viables

| Plateforme | Minimum mensuel (test) | Mensuel recommandé |
|---|---|---|
| Amazon Ads (Sponsored) | 5 000 $ | 15 000–50 000 $+ |
| Amazon DSP | 10 000 $ (géré) | 35 000 $+ |
| Walmart Connect | 3 000 $ | 10 000–30 000 $ |
| Target Roundel | 25 000 $ (minimum de campagne) | 50 000 $+ |
| Instacart Ads | 5 000 $ | 10 000–25 000 $ |
| Kroger (84.51°) | 25 000 $ (minimum de campagne) | 50 000 $+ |

## Cadre de mesure

### Métriques clés du retail media

| Métrique | Définition | Plage cible | Pourquoi c'est important |
|---|---|---|---|
| **ACoS** (coût publicitaire des ventes) | Dépense publicitaire / revenu attribué | 15–30 % (varie selon la catégorie) | Métrique d'efficacité centrale sur Amazon |
| **ROAS** | Revenu / dépense publicitaire (inverse de l'ACoS) | 3x–7x | Métrique d'efficacité universelle |
| **TACoS** (ACoS total) | Dépense publicitaire / revenu total (organique + payant) | 5–15 % | Montre la dépendance publicitaire globale |
| **% new-to-brand** | % de conversions issues d'acheteurs de la marque pour la première fois | 40–70 % (prospecting) | Mesure la véritable acquisition |
| **Part de voix (SOV)** | % des meilleurs résultats de recherche que vous possédez (payant + organique) | Varie selon l'objectif | Métrique de position concurrentielle |
| **Taux de conversion** | Commandes / clics | 8–15 % (moyenne SP Amazon) | Signal de qualité de la fiche et de l'offre |
| **Part d'impressions** | Vos impressions / total disponible | 15–40 % (selon la catégorie) | Couverture de marché |

### Checklist de mesure
- [ ] Configurer Amazon Attribution pour les sources de trafic externes
- [ ] Configurer AMC (Amazon Marketing Cloud) pour l'analyse cross-canal
- [ ] Suivre le TACoS en parallèle de l'ACoS pour surveiller la santé organique
- [ ] Mesurer le % new-to-brand pour toutes les campagnes de prospecting
- [ ] Surveiller la SOV chaque semaine en utilisant Brand Analytics ou des outils tiers (Helium 10, Jungle Scout)
- [ ] Comparer le ROAS à travers les RMN en utilisant des fenêtres d'attribution cohérentes
- [ ] Exécuter des tests d'incrémentalité (marchés ou audiences témoins) trimestriellement
- [ ] Rapporter le ROI total du retail media à la direction chaque mois avec un ROAS consolidé

### Considérations d'attribution
- Chaque RMN utilise son propre modèle d'attribution — ils ne sont pas directement comparables
- Amazon : attribution au clic de 14 jours (Sponsored), clic 14 jours + vue 14 jours (DSP)
- Walmart : attribution au clic de 14 jours
- Mise en garde standard : toutes les plateformes surattribuent ; recouper avec les données de vente
- Utiliser AMC ou des outils tiers (Pacvue, Skai, CommerceIQ) pour un reporting unifié
- La métrique la plus honnête est le TACoS : dépense publicitaire totale relative aux ventes totales sur la plateforme

## Dépannage des problèmes courants

| Problème | Cause | Correctif |
|---|---|---|
| ACoS élevé sur Sponsored Products | Ciblage large, fiche faible | Resserrer les types de correspondance, optimiser le contenu de la fiche, ajouter des négatifs sur les termes non pertinents |
| Faibles impressions | Enchères basses, pertinence faible, rupture de stock | Augmenter les enchères, s'assurer que la fiche est indexée pour les mots-clés cibles, vérifier les stocks |
| Forte dépense, faibles ventes | Faible taux de conversion | Optimiser les images, la tarification, les avis ; vérifier la tarification des concurrents |
| % new-to-brand en déclin | Retargeting de clients existants | Déplacer le budget vers les audiences de prospecting, campagnes de conquête |
| Le budget ne se dépense pas (Walmart/Instacart) | Faible volume de recherche, ciblage étroit | Élargir le ciblage, ajouter plus de mots-clés, augmenter les enchères |
| Part de voix en déclin | Investissement concurrentiel en hausse | Augmenter l'investissement sur les termes clés, défendre les recherches de marque |

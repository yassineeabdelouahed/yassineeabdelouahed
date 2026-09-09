# Publicité programmatique — DSP, CTV et DOOH

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Vue d'ensemble de l'écosystème programmatique

### Fonctionnement du programmatique
```
Annonceur → DSP → Ad Exchange → SSP → Éditeur
     ↑                  ↑
     └── DMP ──────────┘ (données d'audience)
```

### Composantes clés

| Composante | Rôle | Exemples |
|---|---|---|
| **DSP** (plateforme côté demande) | Achète l'inventaire publicitaire pour le compte des annonceurs | DV360, The Trade Desk, Amazon DSP, Xandr |
| **SSP** (plateforme côté offre) | Vend l'inventaire publicitaire pour le compte des éditeurs | Google Ad Manager, Magnite, PubMatic, Index Exchange |
| **Ad Exchange** | Marketplace connectant les DSP et les SSP | Google AdX, OpenX, Xandr Marketplace |
| **DMP** (plateforme de gestion de données) | Agrège et segmente les données d'audience | Lotame, LiveRamp, Adobe Real-Time CDP |
| **CDP** (plateforme de données client) | Unifie les données clients propriétaires | Segment, mParticle, Tealium |
| **Ad Server** | Diffuse les publicités et suit la livraison/performance | Campaign Manager 360 (CM360), Innovid, Flashtalking |
| **Vérification** | Sécurité de marque, visibilité, détection de fraude | IAS, DoubleVerify, MOAT, Pixalate |

### Flux de transaction (RTB)
1. Un utilisateur visite une page web ou ouvre une app
2. Le SSP de l'éditeur envoie une demande d'enchère avec les données utilisateur/contexte à l'exchange
3. L'exchange transmet la demande d'enchère aux DSP connectés
4. Les DSP évaluent les données utilisateur, les critères de campagne, et enchérissent en temps réel (<100ms)
5. Le plus offrant remporte l'impression
6. La publicité gagnante est diffusée à l'utilisateur
7. Les données d'impression, de clic, et de conversion remontent pour l'optimisation

## Critères de sélection du DSP

| Critère | DV360 (Google) | The Trade Desk (TTD) | Amazon DSP | Xandr (Microsoft) |
|---|---|---|---|---|
| **Accès à l'inventaire** | Google + échange ouvert | Échange ouvert (le plus large) | Amazon + échange ouvert | Microsoft + échange ouvert |
| **Avantage unique** | Intégration YouTube, écosystème Google | Indépendant, transparent, Unified ID 2.0 | Données d'acheteur Amazon, signaux retail | Données LinkedIn, Netflix CTV |
| **Force CTV** | Forte (YouTube CTV) | La plus forte (offre CTV la plus large) | Modérée (Fire TV, Freevee) | Croissante (partenariat Netflix) |
| **Données/Ciblage** | Audiences Google, données propriétaires | Marketplace de données tierces, UID2 | Intention d'achat, in-market | LinkedIn B2B, graphe Microsoft |
| **Self-serve** | Oui (via DV360) | Oui | Limité (géré + self-serve) | Oui (via Invest) |
| **Dépense minimum** | Aucun minimum (self-serve) | 25K $/mois (typique) | 35K $+ (géré) ; plus bas en self-serve | Varie selon le contrat |
| **Idéal pour** | Piles centrées sur Google, YouTube | Achat indépendant, transparent | E-commerce, CPG, retail | B2B, écosystème Microsoft |
| **Reporting** | Bon (intégration CM360) | Excellent (insights Koa AI) | Bon (Amazon Attribution) | Bon |

### Arbre de décision de sélection du DSP
```
DÉBUT : Quel est votre objectif principal ?
│
├── E-commerce / Retail → Amazon DSP (avantage des données d'acheteur)
├── B2B / Entreprise → Xandr (ciblage LinkedIn)
├── Focus vidéo / YouTube → DV360 (inventaire YouTube exclusif)
├── Priorité CTV / streaming → The Trade Desk (CTV le plus large)
├── Transparence / indépendance → The Trade Desk (pas de walled garden)
└── Déjà dans la pile Google → DV360 (intégration écosystème)
```

## Types de deals

| Type de deal | Fonctionnement | Tarification | Garantie d'inventaire | Idéal pour |
|---|---|---|---|---|
| **Échange ouvert (RTB)** | Enchère en temps réel ; tout le monde peut enchérir | Taux de marché (CPM variable) | Aucune | Échelle, prospecting, test |
| **Private Marketplace (PMP)** | Enchère sur invitation avec des acheteurs sélectionnés | CPM plancher | Aucune (accès privilégié) | Inventaire premium à des tarifs compétitifs |
| **Preferred Deal** | CPM fixe ; l'acheteur a un premier regard avant PMP/RTB | CPM fixe négocié | Aucune (droit de premier refus) | Tarification cohérente, accès prioritaire |
| **Programmatic Guaranteed (PG)** | CPM fixe, impressions fixes ; réservé | CPM fixe négocié | Oui (volume garanti) | Événements phares, emplacements incontournables |

### Guide de sélection du type de deal

| Scénario | Type de deal recommandé |
|---|---|
| Tester de nouveaux éditeurs ou de l'inventaire | Échange ouvert |
| Accéder à de l'inventaire premium à l'échelle | PMP |
| CPM cohérents avec accès prioritaire | Preferred Deal |
| Livraison garantie pour un lancement de produit ou un événement | Programmatic Guaranteed |
| Environnements sûrs pour la marque requis | PMP ou PG (offre curatée) |

## Guide de planification CTV (télévision connectée)

### Paysage de la CTV

| Plateforme / Service | Palier soutenu par la publicité | Accès à l'inventaire via |
|---|---|---|
| Hulu | Oui | Disney DSP, TTD, DV360 |
| Peacock (NBC) | Oui | TTD, DV360, Xandr |
| Max (HBO) | Oui (avec le palier avec publicité) | TTD, DV360 |
| Paramount+ | Oui | TTD, DV360 |
| Netflix | Oui (avec le palier avec publicité) | Netflix Ads Suite (propriétaire) + The Trade Desk, DV360, Magnite |
| Disney+ | Oui (avec le palier avec publicité) | Disney DSP, TTD |
| Amazon Prime Video (palier avec publicité) | Oui | Amazon DSP |
| YouTube CTV | Oui | DV360 |
| Roku | Oui | TTD, DV360, Roku OneView |
| Samsung TV+ | Oui | TTD, DV360 |
| Tubi (Fox) | Oui (FAST) | TTD, DV360 |
| Pluto TV (Paramount) | Oui (FAST) | TTD, DV360 |

### Checklist de planification de campagne CTV
- [ ] Définir l'audience cible et le focus géographique
- [ ] Sélectionner le(s) DSP selon l'inventaire et les besoins de données
- [ ] Choisir le type de deal : PMP pour le premium, échange ouvert pour l'échelle
- [ ] Fixer le plafond de fréquence : 3–5 impressions par foyer et par semaine
- [ ] Préparer les actifs vidéo : spots de 15 et 30 secondes (1920x1080 minimum)
- [ ] Mettre en œuvre le suivi cross-appareil (graphe de foyer)
- [ ] Configurer le suivi de conversion : visites de site, installations d'app, ou attribution hors ligne
- [ ] Appliquer des filtres de sécurité de marque et de ciblage de contenu
- [ ] Planifier la mesure : portée/fréquence, brand lift, tune-in, trafic en magasin

### Spécifications créatives CTV

| Spécification | Exigence |
|---|---|
| Résolution | 1920x1080 (Full HD) minimum ; 3840x2160 (4K) préféré |
| Ratio d'aspect | 16:9 |
| Durée | 15s ou 30s (bumpers de 6s disponibles sur certaines plateformes) |
| Format de fichier | MP4 (codec H.264) |
| Taille de fichier | Moins de 1 Go (varie selon la plateforme) |
| Audio | Requis — la CTV est un environnement passif, son activé |
| Bannière compagnon | 300x250 ou 728x90 (optionnel, augmente l'engagement) |

### Benchmarks CTV

| Métrique | Moyenne | Bon | Excellent |
|---|---|---|---|
| VCR (taux d'achèvement vidéo) | 90–95 % | 95 %+ | 97 %+ |
| CPM | 25–45 $ | 20–30 $ | < 20 $ |
| Portée (par 10K $) | 50K–150K foyers | 150K+ foyers | 250K+ foyers |
| Brand Lift | 3–8 % | 8–15 % | 15 %+ |

## Stratégie DOOH (affichage numérique extérieur)

### Types d'emplacements DOOH

| Catégorie d'emplacement | Exemples | Contexte de l'audience | Idéal pour |
|---|---|---|---|
| Bord de route / Panneaux | Panneaux numériques, autoroutes | Navetteurs, portée de masse | Notoriété de marque, directionnel |
| Transport | Abris bus, métro, aéroports | Navetteurs urbains, voyageurs | Campagnes locales, orientées fréquence |
| Retail / Point de vente | Écrans en magasin, kiosques de centre commercial | Acheteurs proches du moment d'achat | Retail, CPG, restauration rapide |
| Basé sur le lieu | Salles de sport, cabinets médicaux, ascenseurs | Audience captive, riche en contexte | Santé, fitness, services professionnels |
| Spectaculaires | Times Square, emplacements iconiques | Touristes, audiences d'événement | Moments phares, déclarations de marque médiatiques |

### Plateformes DOOH programmatiques

| Plateforme | Force | Inventaire |
|---|---|---|
| Vistar Media | Plus grand marketplace pDOOH | 500K+ écrans dans le monde |
| Hivestack | Infrastructure programmatique | Partenariats SSP mondiaux |
| Place Exchange | SSP pour l'OOH | Clear Channel, Lamar, JCDecaux |
| The Trade Desk | DSP avec accès DOOH | Via intégrations SSP |
| DV360 | DSP avec accès DOOH | Via intégrations SSP |

### Checklist de planification DOOH
- [ ] Définir le ciblage géographique (DMA, code postal, rayon POI)
- [ ] Sélectionner les types d'emplacement alignés avec le comportement de l'audience
- [ ] Choisir le type d'achat : programmatic guaranteed pour le premium, échange ouvert pour la flexibilité
- [ ] Fixer le dayparting aligné avec la présence de l'audience (heures de trajet, déjeuner, soirée)
- [ ] Préparer le créatif : simple, audacieux, max 5–7 mots, contraste élevé
- [ ] Planifier la mesure : lift de trafic en magasin, brand lift, scans de code QR, utilisation de code promo
- [ ] Fixer la fréquence : 3–5 expositions par membre de l'audience sur la durée de la campagne
- [ ] Envisager des déclencheurs météo et événementiels pour le créatif dynamique

## Méthodes de ciblage d'audience

| Méthode | Description | Source de données | Conformité vie privée |
|---|---|---|---|
| **Données propriétaires (first-party)** | Vos propres données CRM, site, app | CDP, CRM | La plus élevée (basée sur le consentement) |
| **Ciblage contextuel** | Cibler selon le contenu de la page, pas l'utilisateur | Analyse de contenu en temps réel | Sans cookie, entièrement conforme |
| **Comportemental / Intérêt** | Signaux de navigation et d'achat de l'utilisateur | DMP, marketplace de données DSP | Nécessite le consentement ; adressabilité réduite par le blocage Safari/Firefox, l'ATT iOS, et les régimes de consentement (Chrome conserve les cookies tiers — la dépréciation est annulée) |
| **Lookalike / Modélisé** | Étendre depuis une audience seed via ML | Modélisation DSP, LiveRamp | Modérée ; dépend des données seed |
| **Géofencing / Localisation** | Cibler les utilisateurs dans/près de lieux physiques | Données de localisation mobile (Foursquare, etc.) | Nécessite l'opt-in des services de localisation |
| **Audiences définies par le vendeur** | Segments d'audience créés par l'éditeur | Données propriétaires de l'éditeur | Élevée (flux de consentement éditeur) |
| **Universal ID** | Identité cross-site sans cookies | UID2, RampID, ID5, SharedID | Basé sur le consentement, soutenu par l'industrie |

### Checklist de stratégie post-cookie
- [ ] Prioriser la collecte de données propriétaires (email, connexion, programmes de fidélité)
- [ ] Mettre en œuvre le ciblage contextuel comme moteur d'échelle principal
- [ ] Tester les solutions Universal ID (UID2 via TTD, RampID via LiveRamp)
- [ ] Évaluer les audiences définies par le vendeur des éditeurs premium
- [ ] Investir dans les API Google Privacy Sandbox (Topics, Attribution Reporting)
- [ ] Faire passer la mesure du dernier clic vers l'incrémentalité et la modélisation du mix média

## Sécurité de marque et prévention de la fraude

### Cadre de sécurité de marque

| Couche | Solution | Ce qu'elle fait |
|---|---|---|
| Avant l'enchère | IAS, DoubleVerify, Oracle Contextual | Bloque l'inventaire non sûr avant l'enchère |
| Listes d'inclusion | Listes d'éditeurs curées | N'acheter qu'auprès de sources approuvées |
| Listes d'exclusion | Listes de blocage par domaine, app, catégorie | Empêcher les publicités sur du contenu spécifique |
| Catégories de contenu | Alignement au cadre GARM | Bloquer par catégorie de risque (désinformation, discours de haine, etc.) |
| Blocage de mots-clés | Listes de mots-clés personnalisées | Éviter les pages avec des termes spécifiques |
| Surveillance après l'enchère | IAS, DV, MOAT | Vérifier où les publicités ont réellement été diffusées |

### Prévention de la fraude publicitaire

| Type de fraude | Description | Prévention |
|---|---|---|
| Trafic bot | Impressions et clics non humains | Filtrage de fraude avant enchère (IAS, DV) |
| Usurpation de domaine | Faux sites imitant des éditeurs premium | Vérification ads.txt / app-ads.txt |
| Empilement d'annonces | Plusieurs publicités superposées dans un seul emplacement | Vérification de visibilité |
| Pixel stuffing | Publicité diffusée dans un pixel 1x1 | Standards de visibilité (MRC) |
| Injection de clic | Apps mobiles générant de faux clics | App-ads.txt, validation au niveau du SDK |

### Checklist de prévention de la fraude
- [ ] Activer le filtrage de fraude avant enchère sur toutes les campagnes
- [ ] Vérifier ads.txt / app-ads.txt pour tous les éditeurs
- [ ] Fixer des cibles de visibilité : 70 %+ (display), 70 %+ VCR (vidéo)
- [ ] Surveiller les taux de trafic invalide (IVT) — signaler si > 5 %
- [ ] Revoir les rapports d'emplacement chaque semaine pour les domaines/apps suspects
- [ ] Utiliser des deals PMP ou PG pour les campagnes à plus haute valeur

## Standards de visibilité

| Standard | Display | Vidéo |
|---|---|---|
| **Standard MRC** | 50 % des pixels visibles pendant 1 seconde continue | 50 % des pixels visibles pendant 2 secondes continues |
| **Standard GroupM** | 100 % des pixels visibles pendant 1 seconde | 100 % des pixels visibles, 50 % de la durée |
| **Cible sectorielle** | 70 %+ de visibilité | 70 %+ VCR |

### Conseils d'optimisation de la visibilité
- [ ] Prioriser les emplacements au-dessus de la ligne de flottaison
- [ ] Utiliser des formats à fort impact (interstitiel, adhésion, vidéo in-read)
- [ ] Éviter les pages à défilement infini et le display standard sous la ligne de flottaison
- [ ] Fixer des cibles de visibilité dans le DSP (minimum 60 %, cible 70 %+)
- [ ] Utiliser des fournisseurs de visibilité vérifiée pour la mesure tierce
- [ ] Envisager des métriques d'attention au-delà de la visibilité (eye-tracking, temps de séjour)

## Benchmarks programmatiques clés

| Métrique | Display (échange ouvert) | Display (PMP) | Vidéo (pre-roll) | CTV | DOOH |
|---|---|---|---|---|---|
| CPM | 1–5 $ | 5–15 $ | 10–25 $ | 25–45 $ | 5–15 $ |
| CTR | 0,05–0,15 % | 0,10–0,30 % | 0,3–0,8 % | N/A | N/A |
| Visibilité | 50–65 % | 65–80 % | 70–85 % | 95 %+ | 90 %+ (par conception) |
| VCR | N/A | N/A | 65–80 % | 90–97 % | N/A |
| Taux de fraude | 5–15 % | 2–5 % | 3–8 % | 1–3 % | < 1 % |

> **Remarque :** Les benchmarks programmatiques varient énormément selon la source d'inventaire, le type de deal, la précision du ciblage, et la verticale. L'échange ouvert présente la plus grande variabilité. Les deals PMP et PG offrent une performance plus prévisible. Toujours superposer des fournisseurs de vérification pour garantir la précision.

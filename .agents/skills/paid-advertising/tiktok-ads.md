# TikTok Ads — Référence créatif et campagne

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Vue d'ensemble des types de campagnes

| Objectif de campagne | Cas d'usage | Événement d'optimisation | Modèle de facturation |
|---|---|---|---|
| Reach (portée) | Exposition de marque maximale | Impressions | CPM |
| Traffic (trafic) | Générer des visites de site/app | Clics ou vues de landing page | CPC / oCPM |
| Video Views (vues vidéo) | Engagement vidéo à l'échelle | Vue 2s, 6s, ou complète | CPV |
| Community Interaction | Croissance d'abonnés, visites de profil | Visites de profil, abonnements | oCPM |
| Lead Generation | Capture de leads in-app | Soumission de formulaire | oCPM |
| App Promotion | Installations d'app et événements | Installation, achat, abonnement | oCPM / CPI |
| Website Conversions | Actions sur le site | Ajout au panier, achat, inscription | oCPM |
| Product Sales (TikTok Shop) | Commerce direct | Achat | oCPM |

### Structure de campagne
```
Campagne (Objectif + Budget)
├── Groupe d'annonces 1 (Ciblage + Emplacement + Calendrier + Enchère)
│   ├── Annonce 1 (Créatif + CTA)
│   ├── Annonce 2
│   └── Annonce 3
├── Groupe d'annonces 2
│   ├── Annonce 1
│   └── Annonce 2
└── Groupe d'annonces 3
    └── ...
```

### Bonnes pratiques de structure
- [ ] 3–5 groupes d'annonces par campagne pour permettre le test
- [ ] 3–6 créatifs par groupe d'annonces — TikTok consomme le créatif rapidement
- [ ] Budget journalier minimum : 20 $/groupe d'annonces pour les campagnes de conversion
- [ ] Éviter le chevauchement d'audience entre les groupes d'annonces (utiliser des exclusions)
- [ ] Consolider quand possible — donner à l'algorithme suffisamment de données par groupe d'annonces

## Bonnes pratiques créatives natives TikTok

### La règle des 3 secondes
La durée d'attention moyenne sur TikTok exige une accroche instantanée. Si vous ne captez pas l'attention dans la première image, vous perdez le spectateur.

### Cadre créatif : Accroche → Corps → CTA

| Phase | Timing | Objectif | Techniques |
|---|---|---|---|
| **Accroche** | 0–3 secondes | Arrêter le défilement | Superposition de texte en gras, visuel surprenant, question directe, controverse, « Attendez la suite » |
| **Corps** | 3–15 secondes | Délivrer la valeur ou l'histoire | Démo, transformation, problème/solution, témoignage, tutoriel |
| **CTA** | Dernières 2–5 secondes | Générer l'action | Superposition de texte + CTA verbal, urgence, code promo, « Lien dans la bio » |

### À faire et à ne pas faire créatif

| À faire | À ne pas faire |
|---|---|
| Filmer en vertical (9:16) nativement sur téléphone | Réadapter des spots TV/YouTube horizontaux |
| Utiliser des sons et musiques tendance | Utiliser de la musique protégée sans licence |
| Mettre en avant de vraies personnes et des voix authentiques | Utiliser une production trop léchée, corporate |
| Ajouter des superpositions de texte pour le visionnage silencieux | S'appuyer uniquement sur l'audio pour transmettre le message |
| Correspondre à l'esthétique organique de TikTok | Utiliser des images statiques ou des banques d'images |
| Tester de nouvelles accroches tous les 3–5 jours | Diffuser le même créatif plus de 7–14 jours |
| Montrer le produit en utilisation dans les 3 premières secondes | Enterrer la révélation du produit à la fin |
| Utiliser des transitions natives (jump cuts, zooms) | Utiliser des transitions graphiques lourdes |

### Formats créatifs les plus performants

| Format | Description | Idéal pour |
|---|---|---|
| Témoignage UGC | Vraie personne s'adressant à la caméra sur son expérience | D2C, promotion d'app |
| Démo produit | Montrer le produit en action, style ASMR ou déballage | E-commerce, CPG |
| Avant/Après | Transformation ou comparaison | Beauté, fitness, maison |
| Journée dans la vie | Intégration lifestyle du produit | Habillement, alimentaire, bien-être |
| Remix de son tendance | Message de marque superposé sur un audio tendance | Notoriété, engagement |
| Explicateur écran vert | Personne devant une capture d'écran/image | SaaS, éducation, finance |
| Style stitch/duet | Réagir ou construire sur du contenu existant | Communauté, engagement |
| Liste/compte à rebours | « 3 raisons pour lesquelles... » ou « Top 5... » | Éducation, considération |

### Spécifications créatives

| Élément | Spécification |
|---|---|
| Ratio d'aspect | 9:16 (requis pour la meilleure performance) |
| Résolution | 1080x1920 minimum |
| Durée de la vidéo | 15–60 secondes (zone idéale : 21–34 secondes) |
| Taille de fichier | 500 Mo max |
| Type de fichier | MP4, MOV, MPEG, AVI |
| Superposition de texte | Rester dans la zone sûre (laisser une marge de 150px en haut/bas) |
| Texte de l'annonce | 100 caractères max (rester sous 80 pour une visibilité complète) |
| Bouton CTA | Sélectionner parmi les options prédéfinies (Achetez maintenant, En savoir plus, S'inscrire, etc.) |

## Configuration des Spark Ads

### Que sont les Spark Ads ?
Les Spark Ads permettent de booster des publications TikTok organiques (les vôtres ou celles d'un créateur) en tant que publicités payantes. Elles conservent la preuve sociale (likes, commentaires, partages) et génèrent du trafic vers le profil TikTok ou une URL externe.

### Checklist des Spark Ads
- [ ] Identifier une publication organique performante (ou une publication de partenariat créateur)
- [ ] Le créateur active l'autorisation publicitaire dans les paramètres TikTok
- [ ] Le créateur génère un code d'autorisation (valide 7, 30, ou 60 jours)
- [ ] Saisir le code d'autorisation dans TikTok Ads Manager sous Spark Ads
- [ ] Lier la publication à la campagne avec l'objectif approprié
- [ ] Sélectionner la landing page : profil TikTok (Instant Page) ou URL externe
- [ ] Vérifier que la preuve sociale (engagement) se reporte bien
- [ ] Surveiller les métriques organiques + payantes dans une vue unifiée

### Spark Ads vs publicités standard

| Fonctionnalité | Spark Ads | Publicités in-feed standard |
|---|---|---|
| Preuve sociale | Conservée (engagement organique) | Démarre de zéro |
| Lien vers le profil | Profil du créateur | Page de marque ou aucun profil |
| Authenticité | Authenticité perçue plus élevée | Plus « publicitaire » |
| Contrôle créatif | Limité à la publication existante | Flexibilité créative totale |
| Performance | Typiquement 30–50 % d'engagement supérieur | Cohérent mais engagement plus faible |
| Landing page | Profil ou URL externe | URL externe uniquement |

## Intégration TikTok Shop

### Formats publicitaires TikTok Shop

| Format | Description | Configuration requise |
|---|---|---|
| Product Shopping Ads | Cartes produit dans le fil Pour Toi | Catalogue produit synchronisé |
| LIVE Shopping Ads | Booster un live avec des produits achetables | TikTok Shop + LIVE activé |
| Video Shopping Ads | Tags achetables sur le contenu vidéo | Lien produit dans la vidéo |

### Checklist de configuration TikTok Shop
- [ ] Postuler pour l'accès TikTok Shop (compte business requis)
- [ ] Charger le catalogue produit (synchronisation depuis Shopify, BigCommerce, ou CSV)
- [ ] Configurer les modèles d'expédition et les politiques de retour
- [ ] Lier TikTok Shop à Ads Manager
- [ ] Taguer les produits dans les vidéos organiques
- [ ] Configurer un programme d'affiliation pour les ventes générées par les créateurs
- [ ] Activer Fulfilled by TikTok (optionnel ; expédition plus rapide)

## Ciblage d'audience

### Options de ciblage

| Catégorie | Options | Précision |
|---|---|---|
| Démographie | Âge, genre, localisation, langue | Élevée |
| Centres d'intérêt | 15 catégories, 97 sous-catégories | Moyenne |
| Comportements | Interactions vidéo, interactions créateur, interactions hashtag | Moyenne-élevée |
| Appareil | OS, modèle, opérateur, type de connexion, gamme de prix | Élevée |
| Audiences personnalisées | Trafic site, activité app, liste client, engagement, formulaire de lead, activité shop | La plus élevée |
| Audiences lookalike | Basées sur n'importe quelle audience personnalisée (étroite, équilibrée, large) | Élevée |
| Ciblage automatique | Piloté par ML TikTok (similaire à Meta Advantage+) | Variable |

### Stratégie de ciblage par étape du tunnel

| Étape | Approche de ciblage | Taille d'audience |
|---|---|---|
| Haut de tunnel (notoriété) | Démographie large + centres d'intérêt, ou ciblage automatique | 10M+ |
| Milieu de tunnel (considération) | Superposition centre d'intérêt + comportement, ou lookalike de spectateurs vidéo | 2M–10M |
| Bas de tunnel (conversion) | Audiences personnalisées (visiteurs du site, abandons de panier), lookalikes étroits | 500K–5M |
| Fidélisation | Liste client, audiences personnalisées d'acheteurs | Varie |

## Creator Marketplace (TTCM)

### Vue d'ensemble
Le TikTok Creator Marketplace connecte les marques avec des créateurs pour du contenu sponsorisé qui peut être amplifié via les Spark Ads.

### Critères de sélection des créateurs

| Facteur | Ce qu'il faut évaluer |
|---|---|
| Alignement de niche | Leur contenu se rapporte-t-il naturellement à votre produit ? |
| Taux d'engagement | Viser 3 %+ (plus élevé pour les créateurs plus petits) |
| Démographie de l'audience | Âge, localisation, genre correspondant à votre ICP |
| Qualité du contenu | Cohérence, valeur de production, capacité de storytelling |
| Authenticité | Le contenu sponsorisé donne-t-il une impression naturelle ? |
| Nombre d'abonnés | Nano (1K–10K), Micro (10K–100K), Mid (100K–1M), Macro (1M+) |

### Stratégie par niveau de créateur

| Niveau | Abonnés | Fourchette de coût | Idéal pour |
|---|---|---|---|
| Nano | 1K–10K | 50–200 $ | UGC authentique, communautés de niche |
| Micro | 10K–100K | 200–2 500 $ | Portée ciblée, fort engagement |
| Mid | 100K–1M | 800–5 000 $ | Portée + crédibilité équilibrées |
| Macro | 1M+ | 5 000–50 000 $+ | Notoriété de masse, création de tendance |

## Configuration du Pixel et de l'Events API

### Checklist de configuration du TikTok Pixel
- [ ] Installer le code du pixel de base dans la section `<head>` du site
- [ ] Configurer les événements standard : ViewContent, AddToCart, InitiateCheckout, CompletePayment, SubmitForm
- [ ] Vérifier que les événements se déclenchent dans Events Manager
- [ ] Activer la correspondance avancée (email, téléphone) pour une meilleure attribution
- [ ] Fixer la fenêtre d'attribution (par défaut : clic 7 jours, vue 1 jour)

### Events API (côté serveur)
- [ ] Générer un jeton d'accès dans TikTok Events Manager
- [ ] Configurer un point de terminaison serveur pour transmettre les événements
- [ ] Inclure les paramètres : event, event_time, données utilisateur (hash email, hash téléphone, IP, user agent)
- [ ] Envoyer event_id pour la déduplication avec le pixel navigateur
- [ ] Vérifier via Test Events dans Events Manager
- [ ] Viser un Event Match Quality > 4,0

### Priorité des événements pour l'optimisation

| Priorité | Événement | À utiliser pour |
|---|---|---|
| 1 | CompletePayment / Purchase | Conversion e-commerce |
| 2 | SubmitForm / CompleteRegistration | Génération de leads |
| 3 | AddToCart | Signal de milieu de tunnel |
| 4 | ViewContent | Signal large, phase d'apprentissage |

## Tendances de contenu et modèles

### Modèles TikTok evergreen
1. **Format « POV »** — Scénario à la première personne auquel l'audience s'identifie
2. **« Ce que j'aurais aimé savoir »** — Conseils/astuces présentés comme une révélation relatable
3. **« Get Ready With Me » (GRWM)** — Routine montrant l'intégration du produit
4. **Esthétique « that girl/guy »** — Style de vie aspirationnel mettant en scène le produit
5. **« Storytime »** — Accroche narrative qui construit la curiosité
6. **« Attente vs réalité »** — Comparaison motivée par l'humour
7. **« Avis silencieux/déballage »** — Vitrine produit style ASMR
8. **« Classement/liste »** — Comparaison produit avec un point de vue tranché

### Suivi des tendances
- [ ] Vérifier l'onglet tendances de TikTok Creative Center chaque semaine
- [ ] Surveiller les sons tendance dans l'app (trier par « Nouveau »)
- [ ] Suivre le compte officiel @tiktokforbusiness pour les mises à jour de plateforme
- [ ] Suivre l'activité des concurrents via TikTok Ad Library
- [ ] Configurer des alertes Google pour « tendance TikTok » dans votre secteur

## Mesure et attribution

### Métriques clés par objectif

| Objectif | KPI principal | KPI secondaires |
|---|---|---|
| Notoriété | CPM, portée, fréquence | Taux de vue vidéo (2s, 6s), brand lift |
| Considération | CPC, CTR, achèvement vidéo | Taux d'engagement, visites de profil |
| Conversion | CPA, ROAS, taux de conv. | Taux d'ajout au panier, taux de checkout |
| Commerce (Shop) | ROAS, GMV, unités vendues | Volume de commandes, panier moyen, taux de retour |

### Considérations d'attribution
- Fenêtre d'attribution par défaut : clic 7 jours, vue 1 jour
- TikTok a tendance à surcompter les conversions à la vue — recouper avec GA4
- Utiliser des paramètres UTM sur toutes les URL de destination pour une mesure indépendante de la plateforme
- Envisager un test d'incrémentalité (études avec groupe témoin) pour la mesure d'impact réel
- TikTok Attribution Analytics fournit des données de conversion assistée cross-canal

### Benchmarks (moyennes cross-secteurs)

| Métrique | Publicités in-feed | Spark Ads | TopView |
|---|---|---|---|
| CTR | 0,8–1,5 % | 1,5–3,0 % | 12–16 % |
| CPC | 0,50–2,00 $ | 0,30–1,50 $ | N/A (achat CPM) |
| CPM | 6–15 $ | 5–12 $ | 11–19 $ |
| Taux de vue vidéo (6s) | 15–25 % | 20–35 % | 40–60 % |
| Taux de conv. (landing page) | 1–3 % | 1,5–4 % | 2–5 % |

> **Remarque :** La performance TikTok dépend fortement du créatif. Le créatif le plus performant peut surpasser les moyennes de 3 à 5 fois. Rafraîchir le créatif tous les 7 à 14 jours pour maintenir la performance et combattre la fatigue.

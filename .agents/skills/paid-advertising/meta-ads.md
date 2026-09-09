# Meta Ads — Référence Facebook & Instagram

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Vue d'ensemble de la structure de campagne

### Optimisation du budget de campagne (CBO) vs optimisation du budget d'ad set (ABO)

| Facteur | CBO | ABO |
|---|---|---|
| Contrôle du budget | Niveau campagne — Meta distribue | Niveau ad set — vous contrôlez chacun |
| Idéal pour | Tester de nombreuses audiences, mettre à l'échelle les gagnants | Tests contrôlés, budgets d'audience fixes |
| Avantage algorithmique | Meta optimise la dépense vers les meilleurs performeurs | Vous maintenez une allocation de dépense précise |
| Quand l'utiliser | 3+ ad sets, phase de mise à l'échelle | Test de lancement, exigences budgétaires strictes |
| Budget minimum | 30-50 $/jour par campagne (recommandé) | 10-20 $/jour par ad set (recommandé) |

### Campagnes Advantage+

> ⚠️ **Dépréciation de la Marketing API v25 (en vigueur) :** les campagnes autonomes **Advantage+ Shopping (ASC)** et **Advantage+ App (AAC)** ne peuvent plus être créées ni mises à jour via la Marketing API — le blocage a commencé avec la v25.0 (février 2026) et s'est étendu à **toutes les versions d'API le 19 mai 2026**. Meta **mettra en pause les campagnes ASC/AAC restantes avec la v26 (septembre 2026)**. Construisez les nouvelles campagnes avec la **configuration Advantage+ unifiée** (fonctionnalités Advantage+ sur les types de campagne standard) à la place. Source : [changelog de la Marketing API Meta](https://developers.facebook.com/blog/post/2026/02/18/introducing-graph-api-v25-and-marketing-api-v25/).

| Type | Cas d'usage | Différence clé |
|---|---|---|
| Advantage+ Shopping *(hérité — voir bandeau)* | E-commerce, catalogue produit | Ciblage + créatif entièrement automatisés ; en cours de retrait au profit d'Advantage+ unifié |
| Advantage+ App *(hérité — voir bandeau)* | Installations d'app | Audience, emplacement, créatif automatisés ; en cours de retrait au profit d'Advantage+ unifié |
| Standard avec fonctionnalités Advantage+ **(chemin actuel)** | Tous objectifs y compris e-commerce | Automatisation sélective sur des composants spécifiques — c'est la structure d'avenir de Meta |

### Structure de compte recommandée
```
Compte
├── Prospecting (CBO)
│   ├── Audience Advantage+ — ciblage large
│   ├── Pile lookalike — 1 %, 3 %, 5 %
│   └── Basé sur les centres d'intérêt — intérêts superposés
├── Retargeting (ABO)
│   ├── Visiteurs du site 1–7 jours
│   ├── Visiteurs du site 8–30 jours
│   ├── Audience sociale engagée
│   └── Abandons de panier/checkout
├── Fidélisation / Upsell (ABO)
│   ├── Clients existants — cross-sell
│   └── Clients inactifs — reconquête
└── Campagne de vente Advantage+ unifiée (si e-commerce ; l'ASC autonome est hérité — voir bandeau)
    └── Plafond de budget client existant fixé à 20-30 %
```

## Stratégie d'audience

### Audiences personnalisées

| Source | Fenêtre de rétention | Notation de qualité | Notes |
|---|---|---|---|
| Liste clients (email/téléphone) | Rafraîchie mensuellement | Élevée | Min 1 000 enregistrements ; hacher avant le chargement |
| Visiteurs du site (tous) | 180 jours max | Moyenne-élevée | Utiliser Pixel + CAPI pour l'exhaustivité |
| Site — pages spécifiques | 30–90 jours | Élevée | Pages produit, tarification, panier |
| Spectateurs vidéo (25 %, 50 %, 75 %, 95 %) | 365 jours | Moyenne | Superposer par profondeur d'engagement |
| Personnes ayant ouvert/soumis un formulaire de lead | 90 jours | Élevée | Excellent pour recibler les non-convertisseurs |
| Personnes engagées avec Instagram/Facebook | 365 jours | Moyenne | Large mais pertinent |
| Activité dans l'app | 180 jours | Élevée | Les événements in-app apportent la précision |

### Audiences similaires (lookalike)

| Audience source | % recommandé | Qualité attendue |
|---|---|---|
| Acheteurs / clients à forte LTV | 1 % | La plus élevée |
| Tous les convertisseurs (leads + achats) | 1–3 % | Élevée |
| Visiteurs ayant ajouté au panier | 1–3 % | Moyenne-élevée |
| Visiteurs du site (tous) | 3–5 % | Moyenne |
| Spectateurs vidéo engagés | 3–5 % | Moyenne |
| Personnes engagées avec la page | 5–10 % | Plus faible |

### Audience Advantage+ (par défaut recommandé)
- Remplace le ciblage manuel par la découverte d'audience pilotée par ML de Meta
- Fournir les **suggestions d'audience** (anciens centres d'intérêt/lookalikes) comme signaux, pas comme restrictions
- Surpasse le ciblage manuel dans 60 à 70 % des tests A/B (données internes Meta)
- Bonne pratique : exécuter l'Audience Advantage+ contre votre meilleure audience manuelle dans un split test

## Spécifications créatives par emplacement

| Emplacement | Format | Ratio d'aspect | Résolution (min) | Taille de fichier max |
|---|---|---|---|---|
| Fil d'actualité (FB + IG) | Image | 1:1 ou 4:5 | 1080x1080 / 1080x1350 | 30 Mo |
| Fil d'actualité (FB + IG) | Vidéo | 1:1 ou 4:5 | 1080x1080 / 1080x1350 | 4 Go |
| Stories / Reels | Image | 9:16 | 1080x1920 | 30 Mo |
| Stories / Reels | Vidéo | 9:16 | 1080x1920 | 4 Go |
| Colonne de droite (FB) | Image | 1:1 | 1080x1080 | 30 Mo |
| Vidéo in-stream | Vidéo | 16:9 | 1920x1080 | 4 Go |
| Audience Network | Image/Vidéo | Varie | 1080 largeur min | 30 Mo / 4 Go |
| Messenger | Image | 1:1 | 1080x1080 | 30 Mo |

### Bonnes pratiques vidéo
- Les 3 premières secondes doivent accrocher — supposer le son coupé
- Ajouter des sous-titres/superpositions de texte (85 % regardent sans le son)
- Durée optimale : 15–30 secondes pour la conversion ; 6–15 secondes pour la notoriété
- Le format vertical (9:16) surpasse l'horizontal dans les emplacements mobile-first

## Stratégie d'atténuation de l'ATT iOS

### Résumé de l'impact
L'App Tracking Transparency d'iOS 14.5+ a réduit significativement la fidélité des signaux de Meta. Voici les contre-mesures actuelles.

### Mise en œuvre de l'API Conversions (CAPI)
- [ ] Suivi d'événements côté serveur configuré (Purchase, Lead, AddToCart, ViewContent minimum)
- [ ] Score de qualité de correspondance d'événements au-dessus de 6,0 (cible 8,0+)
- [ ] Dédupliquer les événements — envoyer à la fois le Pixel et le CAPI avec un `event_id` correspondant
- [ ] Inclure le maximum de paramètres utilisateur : email, téléphone, IP, user agent, fbc, fbp
- [ ] Hacher les données personnelles avant l'envoi (SHA-256)
- [ ] Vérifier les événements dans Events Manager > Test Events

### Mesure d'événements agrégés (AEM)
- [ ] Domaine vérifié dans Business Manager
- [ ] 8 événements de conversion configurés et priorisés
- [ ] Priorité des événements classée (Purchase > Lead > AddToCart > ViewContent)
- [ ] Optimisation de la valeur activée pour l'événement de plus haute priorité
- [ ] Délai de 72 heures attendu après les changements de configuration

### Récupération de signal supplémentaire
- [ ] Conversions améliorées activées
- [ ] Correspondance avancée activée (automatique + manuelle)
- [ ] Ciblage large pour compenser la perte de signal d'audience
- [ ] Optimisation des leads de conversion (import de conversions hors ligne) pour la génération de leads
- [ ] Paramètres UTM sur toutes les URL publicitaires pour recoupement avec GA4

## Bonnes pratiques créatives

### Cadre de créatif publicitaire : la méthode des 4C

| Élément | Description | Exemple |
|---|---|---|
| **Catch (Accrocher)** | Rupture de motif dans les 1 à 3 premières secondes | Superposition de texte en gras, visuel inattendu, question directe |
| **Connect (Connecter)** | Se relier au point de douleur de l'audience | « Fatigué de passer des heures sur les rapports ? » |
| **Convince (Convaincre)** | Preuve, fonctionnalités, preuve sociale | Témoignage, démo, statistiques, avant/après |
| **Close (Conclure)** | CTA clair aligné avec l'étape du tunnel | « Achetez maintenant », « Obtenez un essai gratuit », « En savoir plus » |

### Volume créatif et test
- Lancer avec 3 à 6 variations créatives minimum par ad set
- Tester sur ces dimensions (une variable à la fois) :
  - Accroche / ouverture (impact le plus fort)
  - Format (statique vs vidéo vs carrousel)
  - Angle de texte (bénéfice vs fonctionnalité vs témoignage vs UGC)
  - CTA (direct vs doux)
- Éliminer les sous-performeurs après 2x la dépense de CPA cible avec zéro conversion ou de mauvaises conversions
- Rafraîchir le créatif toutes les 2 à 4 semaines pour combattre la fatigue

### Types de créatif performants

| Format | Idéal pour | Conseils |
|---|---|---|
| Vidéo style UGC | Conversion, considération | Sensation authentique, vraies personnes, pas trop poli |
| Statique avec texte en gras | Retargeting, offres | Proposition de valeur claire, design minimal, contraste élevé |
| Carrousel | Multi-produits, storytelling | La première carte doit accrocher ; utiliser les 10 cartes |
| Collection / Expérience instantanée | E-commerce, catalogue | Expérience mobile plein écran |
| Vidéo native Reels | Prospecting, notoriété | Audio tendance, coupes rapides, vertical uniquement |

## Configuration de campagne Advantage+ Shopping (héritée — campagnes existantes uniquement)

> Cette section s'applique aux campagnes ASC **existantes**. Les nouvelles campagnes ASC ne peuvent plus être créées via la Marketing API (toutes versions, depuis le 19 mai 2026), et Meta met en pause les campagnes ASC/AAC restantes avec la v26 (sept. 2026). Pour les nouvelles constructions, appliquer les mêmes principes de checklist à la **configuration Advantage+ unifiée** sur une campagne de vente standard.

### Checklist avant lancement
- [ ] Catalogue produit connecté et sain (aucune désapprobation)
- [ ] Pixel + CAPI se déclenchant correctement avec les événements et valeurs d'achat
- [ ] Liste clients chargée (pour le plafond client existant)
- [ ] Actifs créatifs prêts : 5–10 images/vidéos minimum
- [ ] Plafond de budget client existant défini (recommandé : 20–30 %)

### Configuration
- [ ] Sélectionner le type de campagne Advantage+ Shopping
- [ ] Fixer le budget journalier (minimum 50 $/jour recommandé, idéalement 10x le CPA cible)
- [ ] Fenêtre d'attribution : clic 7 jours, vue 1 jour (par défaut et recommandé)
- [ ] Ciblage pays défini
- [ ] Définition du client existant configurée
- [ ] Charger 5–10+ actifs créatifs à travers les formats
- [ ] Texte principal : 3–5 variations
- [ ] Titres : 3–5 variations

### Calendrier d'optimisation
| Semaine | Action |
|---|---|
| Semaine 1 | Lancement — ne rien toucher. Laisser la phase d'apprentissage se compléter. |
| Semaine 2 | Revoir la performance. Remplacer le pire créatif si le CPA > 2x la cible. |
| Semaine 3 | Ajouter 2 à 3 nouveaux actifs créatifs. Ajuster le budget si le ROAS est sur les rails. |
| Semaine 4+ | Mettre à l'échelle le budget par paliers de 20 % tous les 3 à 5 jours si rentable. |

## Checklist de mise en œuvre du CAPI

### Intégration directe
- [ ] Choisir la méthode d'intégration : Partenaire (Shopify, WordPress), Gateway, ou Direct
- [ ] Configurer le point de terminaison serveur pour recevoir et transmettre les événements
- [ ] Mapper les paramètres requis : event_name, event_time, event_source_url, action_source
- [ ] Mapper les paramètres de données utilisateur : em, ph, fn, ln, ct, st, zp, country, external_id
- [ ] Inclure les valeurs de cookie fbc et fbp
- [ ] Définir event_id pour la déduplication avec le Pixel navigateur
- [ ] Tester avec l'outil Events Manager > Test Events
- [ ] Vérifier que l'Event Match Quality > 6,0
- [ ] Surveiller dans Diagnostics les erreurs ou événements abandonnés
- [ ] Documenter l'intégration pour la maintenance et la connaissance de l'équipe

### Priorité des événements (ordre recommandé)
1. Purchase (avec valeur et devise)
2. Lead / CompleteRegistration
3. AddToCart
4. InitiateCheckout
5. ViewContent
6. AddPaymentInfo
7. Search
8. PageView (priorité la plus basse, généralement Pixel uniquement)

## Méthodologie de montée en puissance du budget

### La règle des 20 %
Ne jamais augmenter le budget de plus de **20 % tous les 3 à 5 jours**. Des sauts plus importants réinitialisent la phase d'apprentissage et déstabilisent la performance.

### Cadre de décision de montée en puissance

| Signal | Action |
|---|---|
| CPA sous la cible pendant 5+ jours | Augmenter le budget de 20 % |
| CPA à la cible, stable | Maintenir, tester un nouveau créatif |
| CPA 10–30 % au-dessus de la cible | Rafraîchir le créatif, vérifier la fréquence |
| CPA 30 %+ au-dessus de la cible | Réduire le budget, diagnostiquer l'audience ou la fatigue créative |
| Fréquence > 3,0 (prospecting) | Élargir l'audience ou mettre en pause/rafraîchir le créatif |
| Fréquence > 6,0 (retargeting) | Réduire le budget ou élargir la fenêtre |

### Montée en puissance horizontale vs verticale

| Méthode | Description | Quand l'utiliser |
|---|---|---|
| **Verticale** | Augmenter le budget sur les campagnes gagnantes | CPA stable, marge de manœuvre dans l'audience |
| **Horizontale** | Dupliquer les publicités gagnantes vers de nouvelles audiences ou campagnes | Saturation de l'audience, test d'expansion |

### Cadre d'allocation budgétaire (point de départ)

| Étape du tunnel | % du budget total | Objectif |
|---|---|---|
| Prospecting (haut de tunnel) | 60–70 % | Acquisition de nouvelle audience |
| Retargeting (milieu de tunnel) | 15–25 % | Conversion d'audience tiède |
| Fidélisation (bas de tunnel) | 10–15 % | LTV client et rachat |

## Benchmarks clés (moyennes cross-secteurs)

| Métrique | Prospecting | Retargeting | Advantage+ Shopping |
|---|---|---|---|
| CTR | 0,8–1,5 % | 1,5–3,0 % | 1,0–2,0 % |
| CPC | 0,60–2,00 $ | 0,30–1,00 $ | 0,40–1,50 $ |
| CPM | 8–18 $ | 10–25 $ | 8–15 $ |
| Taux de conv. | 1–3 % | 4–10 % | 2–5 % |
| Fréquence (saine) | < 3,0 | < 6,0 | < 4,0 |

> **Remarque :** Ces chiffres sont directionnels. Les benchmarks varient largement selon la verticale, la géographie, la saison, et la qualité créative. Calibrez avec vos propres données dans les 30 jours suivant le lancement.

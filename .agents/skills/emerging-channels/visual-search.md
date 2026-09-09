# Recherche visuelle — Guide d'optimisation d'image

> La recherche visuelle permet aux utilisateurs de rechercher à l'aide d'images plutôt que de texte. Avec Google Lens traitant des milliards de requêtes et Pinterest Lens propulsant la découverte de produits, la recherche visuelle est un canal critique et en pleine croissance. Ce guide couvre l'optimisation pour toutes les grandes plateformes de recherche visuelle.

---

## Paysage des plateformes de recherche visuelle

| Plateforme | Utilisateurs actifs mensuels | Cas d'usage principal | Fonctionnement |
|----------|---------------------|-----------------|-------------|
| **Google Lens** | ~20 Mds de recherches visuelles/mois (Google, fin 2024) | Identification produit, extraction de texte, reconnaissance de monuments | Caméra/photo → index Google → résultats |
| **Pinterest Lens** | 450 M+ MAU (Pinterest total) | Découverte de produits, inspiration de style, décoration intérieure | Caméra/photo → catalogue Pinterest → épingles shoppables |
| **Recherche visuelle Amazon** | Intégrée à l'application Amazon | Correspondance produit dans le catalogue Amazon | Caméra/photo → catalogue produit Amazon → achat |
| **Recherche visuelle Bing** | Intégrée à Bing/Edge | Recherche visuelle générale, recherche de produit | Téléversement d'image → index Bing → résultats |
| **Snapchat Scan** | 750 M+ MAU | Identification produit (via Amazon), expériences en réalité augmentée | Caméra → reconnaissance marque/produit → shopping |

---

## Checklist d'optimisation d'image pour la recherche visuelle

### Exigences techniques d'image

| Facteur | Exigence | Pourquoi c'est important |
|--------|------------|----------------|
| Format de fichier | WebP (préféré), JPEG, PNG | WebP offre le meilleur équilibre compression + qualité |
| Résolution | Minimum 800x800px pour les produits ; 1200px+ pour les images hero | Une résolution plus élevée = meilleure reconnaissance d'objet |
| Taille de fichier | < 200 Ko (compressé) | La vitesse de page affecte le classement ; charger en différé les images sous la ligne de flottaison |
| Ratio d'aspect | Cohérent par type de contenu (1:1 pour les produits, 16:9 pour l'ambiance) | Cohérence d'affichage sur la plateforme |
| Arrière-plan | Fond blanc ou clair pour les images produit | Améliore l'isolation d'objet pour les algorithmes de recherche visuelle |
| Angles multiples | 4-8 images par produit (avant, arrière, côté, détail, en usage) | Plus de données visuelles = probabilité de correspondance plus élevée |
| Texte alternatif | Descriptif, riche en mots-clés, langage naturel | Signal texte principal pour l'indexation en recherche visuelle |
| Nom de fichier | Descriptif (blue-leather-crossbody-bag.webp, pas IMG_4521.webp) | Signal texte secondaire pour l'indexation |
| Données EXIF | Inclure les métadonnées pertinentes (supprimer les données GPS personnelles) | Certaines plateformes utilisent l'EXIF pour le contexte |
| Chargement différé | Utiliser `loading="lazy"` pour les images sous la ligne de flottaison | Performance sans sacrifier l'indexation |

### Bonnes pratiques SEO d'image

| Élément | Bonne pratique | Exemple |
|---------|--------------|---------|
| Texte alternatif | Décrire l'image comme si vous l'expliquiez à quelqu'un qui ne peut pas la voir | `alt="Sac bandoulière en cuir bleu pour femme avec chaîne dorée"` |
| Nom de fichier | Utiliser des tirets, des mots-clés descriptifs, pas de underscores | `sac-bandouliere-cuir-bleu-femme.webp` |
| Attribut title | Ajouter un contexte complémentaire (pas un doublon du alt) | `title="Disponible en 6 couleurs — Livraison gratuite"` |
| Légende | Lorsque des légendes visibles sont appropriées, inclure des descriptions riches en mots-clés | Affichée sous l'image sur la page |
| Texte environnant | S'assurer que le texte à proximité est pertinent par rapport à l'image | Paragraphe de description produit adjacent aux images produit |
| Sitemap d'images | Inclure toutes les images clés dans votre sitemap XML | Balises `<image:image>` dans sitemap.xml |
| Diffusion CDN | Servir les images depuis un CDN pour la performance mondiale | Cloudflare, CloudFront, Fastly |

---

## Données structurées pour les images

### Schema produit avec image

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Women's Blue Leather Crossbody Bag",
  "image": [
    "https://example.com/images/blue-crossbody-front.webp",
    "https://example.com/images/blue-crossbody-side.webp",
    "https://example.com/images/blue-crossbody-detail.webp",
    "https://example.com/images/blue-crossbody-lifestyle.webp"
  ],
  "description": "Handcrafted genuine leather crossbody bag in navy blue with adjustable gold chain strap.",
  "brand": {
    "@type": "Brand",
    "name": "ExampleBrand"
  },
  "offers": {
    "@type": "Offer",
    "price": "129.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "234"
  }
}
```

### Schema ImageObject

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://example.com/images/blue-crossbody-front.webp",
  "name": "Women's Blue Leather Crossbody Bag — Front View",
  "description": "Front view of navy blue genuine leather crossbody bag with gold chain strap",
  "width": "1200",
  "height": "1200",
  "thumbnailUrl": "https://example.com/images/thumbs/blue-crossbody-front-thumb.webp"
}
```

---

## Guides d'optimisation spécifiques à chaque plateforme

### Google Lens

| Optimisation | Détails |
|-------------|---------|
| Images produit de haute qualité | Angles multiples, arrière-plans propres, éclairage cohérent |
| Balisage schema produit | Schema Product complet avec images, prix, disponibilité, avis |
| Google Merchant Center | Soumettre le flux produit avec des images de haute qualité et des données exactes |
| Photos de la fiche Google Business Profile | Téléverser régulièrement des photos d'entreprise, de produit, et d'intérieur |
| Balises Open Graph | S'assurer que le `og:image` est correct pour toutes les pages produit |
| Sitemap d'images | Inclure toutes les images produit dans le sitemap XML |
| Texte dans les images | Google Lens peut lire le texte — s'assurer que tout texte dans les images est pertinent et exact |

### Pinterest Lens

| Optimisation | Détails |
|-------------|---------|
| Rich Pins | Revendiquer votre site web et activer les Rich Pins Produit |
| Catalogue Pinterest | Téléverser le catalogue produit complet via Pinterest Business |
| Qualité de l'image d'épingle | Ratio vertical 2:3 (1000x1500px), overlay de texte minimal |
| Descriptions d'épingle | Riches en mots-clés, langage naturel, incluant les détails du produit |
| Organisation des tableaux | Organiser les tableaux par catégorie pour une meilleure correspondance catalogue |
| Onglet Boutique | Activer l'onglet Boutique sur votre profil Pinterest business |
| Tag Pinterest | Installer pour le suivi des conversions et la construction d'audience |
| Images d'ambiance + produit | Mélanger des photos stylisées avec des photos produit propres pour une correspondance plus large |

### Recherche visuelle Amazon

| Optimisation | Détails |
|-------------|---------|
| Image principale | Fond blanc, le produit remplit 85 %+ du cadre, 1000x1000px+ |
| Images secondaires | Ambiance, infographie, référence de taille, gros plans de détail (jusqu'à 9) |
| Images de contenu A+ | Contenu de marque enrichi avec tableaux comparatifs et imagerie d'ambiance |
| Conformité des images | Suivre exactement les exigences d'image d'Amazon (pas de filigrane, pas de texte sur l'image principale) |
| Titre du produit | Descriptif, avec les attributs clés en premier (marque, type de produit, caractéristique clé, taille, couleur) |
| Mots-clés backend | Inclure les descripteurs visuels que les acheteurs pourraient utiliser (couleur, forme, style, matériau) |

---

## Commerce visuel

### Images shoppables

| Plateforme | Fonctionnalité shoppable | Mise en place |
|----------|--------------------|-------|
| Instagram | Tags produit dans les posts et Stories | Instagram Shopping + catalogue produit |
| Pinterest | Épingles produit avec prix et disponibilité | Catalogue Pinterest + marchand vérifié |
| Google | Tags produit dans Google Images | Flux produit Google Merchant Center |
| Votre site web | Overlays de points chauds/tags sur les images d'ambiance | Outils d'image shoppable (Tagshop, Foursixty, Bazaarvoice Galleries) |

### Essayage en réalité augmentée (AR)

| Catégorie | Capacité AR | Plateformes |
|----------|--------------|-----------|
| Lunetterie | Essayage virtuel de montures | Warby Parker, Zenni (applications personnalisées) ; Google AR dans la recherche |
| Beauté/Cosmétiques | Application virtuelle de maquillage | L'Oréal ModiFace, Sephora, publicités YouTube AR |
| Meubles/Maison | Visualisation de placement dans une pièce | IKEA Place, Amazon AR View, Google 3D dans la recherche |
| Habillement | Essayage virtuel de vêtements | Zeekit (Walmart), Amazon Virtual Try-On |
| Chaussures | Essayage virtuel de chaussures | Nike, Gucci (Snapchat AR), Amazon |

### Checklist de mise en œuvre AR

- [ ] Créer des modèles 3D des produits les plus vendus (USDZ pour Apple, GLB pour Android)
- [ ] Mettre en œuvre le balisage schema 3D/AR pour les produits éligibles
- [ ] Téléverser les modèles 3D vers Google Merchant Center pour Google AR
- [ ] Évaluer les partenariats de filtres AR Snapchat/Instagram pour les campagnes de marque
- [ ] Tester l'expérience AR sur plusieurs appareils avant le lancement
- [ ] Suivre les métriques d'engagement AR : taux d'essayage, temps passé, hausse de conversion

---

## Consignes de photographie produit

### Photographie produit en studio

| Élément | Spécification |
|---------|-------------- |
| Arrière-plan | Blanc pur (#FFFFFF) pour l'e-commerce ; contextuel pour l'ambiance |
| Éclairage | Cohérent, uniforme, sans ombre (boîte à lumière ou tente lumineuse) |
| Résolution | Minimum 2000x2000px pour la capacité de zoom |
| Angles | Avant, arrière, côté gauche, côté droit, 45 degrés, vue de dessus, gros plans de détail |
| Cohérence | Même système d'éclairage, d'arrière-plan, et d'angle sur tous les produits |
| Précision des couleurs | Utiliser une charte de couleurs ; calibrer le moniteur |
| Post-traitement | Minimal — correction des couleurs, suppression d'arrière-plan, recadrage cohérent |

### Photographie d'ambiance

| Élément | Spécification |
|---------|-------------- |
| Contexte | Montrer le produit dans un scénario d'usage réaliste |
| Modèles | Représentation diverse correspondant à l'audience cible |
| Décor | Environnements pertinents (cuisine pour les ustensiles de cuisine, bureau pour la tech) |
| Stylisme | Accessoires minimaux qui complètent sans concurrencer le produit |
| Composition | Produit clairement visible et identifiable, non obscurci |

---

## Stratégie de recherche visuelle Pinterest

### Optimisation des épingles pour la découverte visuelle

| Facteur | Bonne pratique |
|--------|--------------|
| Qualité de l'image | Haute résolution, lumineuse, visuellement attrayante |
| Ratio de l'image | Vertical 2:3 (1000x1500px) — occupe plus d'espace dans le fil |
| Overlay de texte | Minimal ou absent — laisser l'image parler ; si texte, rester sous 20 % de l'image |
| Descriptions | 100-500 caractères, riches en mots-clés, langage naturel |
| Hashtags | 2-5 hashtags pertinents (Pinterest les utilise pour la catégorisation) |
| Texte alternatif | Renseigner le champ de texte alternatif pour chaque épingle |
| Tableaux | Organiser en noms de tableaux spécifiques et riches en mots-clés |
| Cohérence | Épingler 5-15 fois par jour, réparti sur les tableaux |
| Contenu frais | Prioriser les nouvelles images ; Pinterest favorise les épingles fraîches |

### Mise en place du shopping Pinterest

1. Revendiquer votre site web sur Pinterest Business
2. Téléverser le catalogue produit (Shopify, WooCommerce, ou CSV manuel)
3. Activer les Rich Pins Produit (récupère automatiquement prix, disponibilité)
4. Se faire vérifier en tant que marchand Pinterest vérifié
5. Organiser le catalogue en groupes de produits
6. Activer l'onglet Boutique sur votre profil
7. Créer des Shopping Ads pour amplifier les produits phares

---

## Mesure & Analytics

### KPI de la recherche visuelle

| KPI | Définition | Méthode de mesure |
|-----|-----------|-------------------|
| Trafic de recherche d'image | Visites depuis Google Images, renvois Lens | Google Search Console → Apparence dans les résultats de recherche → Image |
| Impressions Pinterest | Nombre de fois où vos épingles apparaissent dans les résultats de recherche visuelle | Pinterest Analytics |
| Taux de clic sur épingle | Clics / impressions sur les épingles produit | Pinterest Analytics |
| Taux de conversion des images produit | Achats depuis les pages d'atterrissage d'images produit | GA4 avec suivi de page d'atterrissage spécifique à l'image |
| Engagement d'essayage AR | Utilisateurs activant les fonctionnalités AR | Analytics intégrés à l'application, Google Merchant Center |
| Hausse de conversion de la recherche visuelle | Chiffre d'affaires issu de sessions attribuées à la recherche visuelle | Modélisation d'attribution |
| Couverture du sitemap d'images | % d'images produit indexées | Google Search Console |

### Google Search Console — Performance des images

Naviguer vers : Performance → Apparence dans les résultats de recherche → filtrer par « Image » pour voir :
- Total des impressions et clics d'image
- Principales requêtes générant du trafic d'image
- Principales pages avec des résultats d'image
- Taux de clic des résultats d'image vs résultats web

---

## Checklist d'optimisation de la recherche visuelle — Résumé

- [ ] Toutes les images produit atteignent une résolution minimale de 800x800px
- [ ] Arrière-plans blancs propres pour les images produit principales
- [ ] 4-8 images par produit couvrant tous les angles
- [ ] Texte alternatif descriptif sur chaque image
- [ ] Noms de fichiers descriptifs et à tirets sur chaque image
- [ ] Schema produit avec tableau d'images mis en œuvre sur toutes les pages produit
- [ ] Images incluses dans le sitemap XML
- [ ] Flux produit Google Merchant Center actif et à jour
- [ ] Catalogue Pinterest téléversé, Rich Pins activés, marchand vérifié
- [ ] Images shoppables mises en œuvre sur le contenu d'ambiance
- [ ] Actifs 3D/AR créés pour les produits phares (le cas échéant)
- [ ] Performance des images suivie dans Google Search Console et Pinterest Analytics

---

> **La recherche visuelle comble l'écart entre voir et acheter.** Lorsque quelqu'un pointe sa caméra vers un produit, vous avez quelques secondes pour être la réponse. Les marques qui investissent dans la qualité d'image, les données structurées, et l'optimisation spécifique à chaque plateforme capteront ce canal en pleine croissance.

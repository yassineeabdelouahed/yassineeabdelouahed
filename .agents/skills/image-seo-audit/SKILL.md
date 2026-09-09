---
name: image-seo-audit
description: "Auditer chaque image d'une page pour le SEO, la performance et l'accessibilité — qualité du texte alt, seuils de taille de fichier par palier, adoption des formats WebP/AVIF, réactivité srcset/sizes, chargement différé, fetchpriority sur l'image LCP, et largeur/hauteur pour le CLS — produisant une liste d'optimisation triée par économies de taille de fichier. Se déclenche sur « /digital-marketing-pro:image-seo-audit », « audite le SEO de nos images », « vérifie le texte alt sur la page », « pourquoi nos images sont-elles si lourdes », « devrions-nous passer au WebP ». Récupère et analyse la page via tech-seo-auditor.py et lit le profil de marque pour le contexte sectoriel."
argument-hint: "[URL]"
user-invocable: true
---

# /digital-marketing-pro:image-seo-audit

## Objectif

Réaliser un audit dédié à l'optimisation des images qui évalue toutes les images
d'une page ou d'un site pour le SEO, la performance et l'accessibilité. Produit une
liste d'optimisation priorisée triée par impact sur la taille de fichier.

## Informations requises

- **URL** : Page ou site à auditer
- **Périmètre** : Page unique ou crawl à l'échelle du site (par défaut : page unique)

## Processus

1. **Charger le contexte de marque** : Lire le profil de marque actif pour le contexte sectoriel.
2. **Découvrir les images** : Trouver tous les éléments `<img>`, `<picture>`, `background-image` CSS, et `<source>`.
3. **Audit du texte alt** : Vérifier la présence, la qualité, l'inclusion de mots-clés, la longueur (10-125 caractères). Signaler : manquant, nom de fichier uniquement (« image.jpg »), bourré de mots-clés, non descriptif (« cliquez ici »).
4. **Audit de la taille de fichier** : Appliquer des seuils par palier selon la catégorie d'image — miniatures (cible <50 Ko, critique >200 Ko), images de contenu (cible <100 Ko, critique >500 Ko), héros/bannière (cible <200 Ko, critique >700 Ko).
5. **Audit des formats** : Vérifier les formats modernes. Recommander WebP (support 97%+) ou AVIF (support 92%+) plutôt que JPEG/PNG. Vérifier la présence de l'élément `<picture>` avec des repli de format. Note : JPEG XL restauré dans Chromium (nov. 2025) mais pas encore dans Chrome stable — surveiller, ne pas encore recommander.
6. **Images réactives** : Vérifier la présence de `srcset` et `sizes`, la résolution appropriée pour les rapports de pixels d'appareil.
7. **Chargement différé** : Vérifier `loading="lazy"` sur les images sous la ligne de flottaison. Signaler `loading="lazy"` sur les images au-dessus de la ligne de flottaison/héros (nuit directement au LCP).
8. **fetchpriority** : Vérifier `fetchpriority="high"` sur les images LCP/héros. Vérifier `decoding="async"` sur les images non-LCP.
9. **Prévention du CLS** : Vérifier les attributs `width` et `height` ou le CSS `aspect-ratio` sur tous les éléments `<img>`. Signaler les images sans dimensions.
10. **Nommage des fichiers** : Vérifier les noms de fichiers descriptifs, en minuscules avec tirets, vs les noms génériques (IMG_1234.jpg).
11. **Utilisation d'un CDN** : Vérifier si les images sont servies depuis un CDN (domaine différent, en-têtes CDN, mise en cache en périphérie).
12. **Noter et prioriser** : Trier par impact d'économies de taille de fichier (le plus important en premier).

## Motif d'élément Picture recommandé

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descriptive alt text" width="800" height="600" loading="lazy" decoding="async">
</picture>
```

## Motif d'image héros/LCP

```html
<img src="hero.webp" fetchpriority="high" alt="Hero image description" width="1200" height="630">
```

Ne PAS charger en différé les images au-dessus de la ligne de flottaison/LCP. Ne PAS ajouter `decoding="async"` aux images LCP.

## Résultat

### Résumé d'audit d'image

| Métrique | Statut | Nombre |
|--------|--------|-------|
| Total d'images | — | XX |
| Texte alt manquant | problèmes | XX |
| Surdimensionnées (>200 Ko) | problèmes | XX |
| Mauvais format (pas WebP/AVIF) | problèmes | XX |
| Sans dimensions (risque CLS) | problèmes | XX |
| Non chargées en différé (sous la ligne de flottaison) | problèmes | XX |
| Pas de fetchpriority sur le LCP | problèmes | XX |

### Liste d'optimisation priorisée

Triée par économies de taille de fichier estimées (les plus importantes en premier) :

| Image | Taille actuelle | Format | Problèmes | Économie est. |
|-------|-------------|--------|--------|-------------|
| hero.jpg | 450KB | JPEG | No WebP, no fetchpriority | ~300KB |
| ... | ... | ... | ... | ... |

### Recommandations (priorisées)
1. Convertir X images au format WebP (économie totale estimée de XX Ko)
2. Ajouter un texte alt à X images
3. Ajouter des dimensions width/height à X images
4. Activer le chargement différé sur X images sous la ligne de flottaison
5. Ajouter fetchpriority="high" à l'image LCP
6. Compresser X images surdimensionnées
7. Mettre en œuvre l'élément `<picture>` avec des replis AVIF/WebP

## Agents utilisés

- **seo-specialist** — Analyse d'optimisation d'image, évaluation de l'impact sur les CWV

## Scripts utilisés

- **tech-seo-auditor.py** — Récupérer la page et analyser les éléments d'image

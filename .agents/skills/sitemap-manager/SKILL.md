---
name: sitemap-manager
description: "Audite un sitemap XML existant — nombre d'URL par rapport aux limites du protocole, validité de lastmod, codes de statut échantillonnés des URL, conflits robots.txt et noindex, pages manquantes, compression — ou génère un nouveau sitemap (plan ou XML valide avec découpage en index) à partir de modèles sectoriels pour les sites SaaS, e-commerce, local, éditeur, ou agence. Se déclenche sur \"/digital-marketing-pro:sitemap-manager\", \"audit our sitemap\", \"why are there 404s in the sitemap\", \"generate a sitemap for the new site\", \"is our sitemap declared in robots.txt\". Produit un rapport de problèmes classé par sévérité ou un XML prêt à soumettre avec la ligne robots.txt et les instructions de soumission GSC ; utilise tech-seo-auditor.py pour les vérifications de santé des URL."
argument-hint: "[URL or generate]"
user-invocable: true
---

# /digital-marketing-pro:sitemap-manager

## Objectif

Analyser les sitemaps XML existants pour en identifier les problèmes et opportunités, ou générer de nouveaux sitemaps avec des modèles sectoriels et des meilleures pratiques.

## Modes

### Mode 1 : Analyser un sitemap existant (`/digital-marketing-pro:sitemap-manager [URL]`)

Fournissez une URL de sitemap (par ex. `https://example.com/sitemap.xml`) à auditer :

1. **Récupération et analyse** : Télécharger le XML du sitemap, détecter s'il s'agit d'un index de sitemaps ou d'un sitemap unique
2. **Nombre d'URL** : Total d'URL, URL par fichier de sitemap (signaler en cas d'approche de la limite de protocole de 50 000)
3. **Audit de lastmod** : Vérifier la présence, le format (datetime W3C), l'obsolescence (>6 mois sans mise à jour), les faux lastmod (toutes la même date)
4. **Priority et changefreq** : Vérifier la présence de signaux dépréciés/ignorés (Google ignore les deux — signaler leur présence, recommander leur suppression pour réduire la taille du fichier)
5. **Santé des URL** : Échantillonner 20 à 50 URL et vérifier les codes de statut HTTP — signaler les 404, 301, 302, erreurs 5xx
6. **Alignement d'indexation** : Recouper avec robots.txt et meta robots — signaler les URL noindex présentes dans le sitemap, signaler les URL du sitemap bloquées par robots.txt
7. **URL manquantes** : Comparer le sitemap au crawl du site ou à une liste d'URL fournie — identifier les pages manquantes dans le sitemap
8. **Sitemaps image/vidéo/actualité** : Vérifier la présence d'extensions de sitemap spécialisées
9. **Compression** : Vérifier si le sitemap est compressé en gzip (recommandé pour les grands sitemaps)
10. **Enregistrement dans robots.txt** : Vérifier que le sitemap est déclaré dans robots.txt

### Mode 2 : Générer un nouveau sitemap (`/digital-marketing-pro:sitemap-manager generate`)

Générer un plan de sitemap ou un XML réel :

1. **Découvrir la structure du site** : Crawler depuis la page d'accueil ou utiliser une liste d'URL fournie
2. **Catégoriser les pages** : Regrouper par type (accueil, catégorie, produit, blog, landing, mentions légales)
3. **Appliquer un modèle sectoriel** : Utiliser la structure appropriée selon le modèle économique (SaaS, e-commerce, local, éditeur, agence)
4. **Définir lastmod** : Utiliser les dates de modification réelles des pages, pas la date de génération
5. **Stratégie de découpage** : Planifier la structure d'index de sitemap si plus de 50 000 URL ou plus de 50 Mo non compressés
6. **Règles d'exclusion** : Pages noindex, résultats paginés, URL à facettes, pages utilitaires (connexion, panier, résultats de recherche)
7. **Générer le XML** : Produire un sitemap XML valide suivant le protocole de sitemap (sitemaps.org)

## Modèles sectoriels

### SaaS
- Accueil, fonctionnalités, tarifs, intégrations, documentation, blog, journal des modifications, à propos, mentions légales
- Pages d'intégration en tant que sitemap séparé (si 50+)
- Blog avec fréquence de mise à jour élevée

### E-commerce
- Accueil, catégories, produits, marques, collections, blog, à propos, mentions légales
- Sitemap produits (le plus volumineux — à découper si nécessaire)
- Sitemap image pour les photos de produits
- Pages de catégorie avec gestion canonique pour les vues filtrées

### Entreprise locale
- Accueil, services, emplacements, à propos, contact, blog, avis, mentions légales
- Pages d'emplacement en tant que sitemap séparé (si multi-établissements)
- Pages de zone de service

### Éditeur/Média
- Accueil, rubriques, articles, auteurs, thématiques, à propos, mentions légales
- Sitemap actualité (pour l'inclusion dans Google News)
- Sitemap vidéo (si contenu vidéo)
- Mises à jour fréquentes du sitemap d'articles

### Agence
- Accueil, services, études de cas, blog, équipe, à propos, contact, mentions légales
- Sitemap d'études de cas
- Pages de destination par secteur/vertical

## Référence du protocole de sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
    <lastmod>2026-03-15</lastmod>
  </url>
</urlset>
```

### Index de sitemap (pour plusieurs sitemaps)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2026-03-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
    <lastmod>2026-03-28</lastmod>
  </sitemap>
</sitemapindex>
```

### Limites du protocole
- 50 000 URL par fichier de sitemap
- 50 Mo non compressés par fichier de sitemap
- Jusqu'à 50 000 sitemaps par fichier d'index de sitemap (imbriquer les index si davantage sont nécessaires)
- Doit utiliser des URL absolues
- Encodage UTF-8 requis
- Échappement d'entités pour les caractères spéciaux (&amp; &apos; &quot; &gt; &lt;)

## Résultat

### Rapport d'analyse de sitemap
- Total d'URL indexées, répartition du statut de santé
- Problèmes identifiés avec sévérité (critique/élevée/moyenne/faible)
- Pages manquantes qui devraient figurer dans le sitemap
- Recommandations triées par impact

### Sortie de génération de sitemap
- Sitemap(s) XML complet(s) ou plan de sitemap
- Index de sitemap si plusieurs fichiers sont nécessaires
- Ligne de déclaration du sitemap pour robots.txt
- Instructions de soumission pour Google Search Console

## Agents utilisés

- **seo-specialist** — Analyse de sitemap, vérifications de santé des URL, recommandations d'architecture

## Scripts utilisés

- **tech-seo-auditor.py** — Vérification de la santé des URL (codes de statut, redirections)

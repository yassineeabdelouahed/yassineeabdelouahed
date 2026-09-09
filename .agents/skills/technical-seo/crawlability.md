# Crawlabilité — Robots.txt, Sitemaps, budget de crawl et analyse de logs

Une référence complète pour garantir que les crawlers des moteurs de recherche peuvent découvrir, accéder, rendre et crawler efficacement toutes les pages importantes d'un site web. La crawlabilité est le fondement du SEO technique — si les moteurs de recherche ne peuvent pas crawler une page, elle ne peut pas se classer.

---

## Robots.txt

### Objectif

Le fichier `robots.txt` indique aux crawlers des moteurs de recherche quelles URL ils sont autorisés ou non à demander. C'est une directive de crawl, pas une directive d'indexation — les pages bloquées par robots.txt peuvent toujours apparaître dans les résultats de recherche si d'autres pages y renvoient (elles s'afficheront comme « URL bloquée par robots.txt » dans GSC).

### Référence de syntaxe

```
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /internal-search?
Allow: /api/public/

User-agent: Googlebot
Disallow: /staging/
Crawl-delay: 1

Sitemap: https://example.com/sitemap-index.xml
```

**Directives :**
- `User-agent` : spécifie à quel crawler les règles s'appliquent. `*` signifie tous les crawlers
- `Disallow` : bloque le crawl du chemin spécifié. Une valeur vide (`Disallow:`) signifie tout autoriser
- `Allow` : autorise explicitement le crawl d'un chemin au sein d'un Disallow plus large. Googlebot prend en charge Allow ; certains crawlers ne le font pas
- `Crawl-delay` : demande un délai (en secondes) entre les requêtes. Google l'ignore — le limiteur de taux de crawl de GSC a été supprimé en janvier 2024, et Google ajuste désormais automatiquement le taux de crawl en fonction des réponses du serveur (des réponses 500/503/429 soutenues le ralentissent). Bing respecte Crawl-delay
- `Sitemap` : pointe vers le sitemap XML. Peut lister plusieurs directives Sitemap

**Correspondance de motifs (spécifique à Googlebot) :**
- `*` correspond à toute séquence de caractères : `Disallow: /*.pdf$` bloque tous les fichiers PDF
- `$` ancre la fin de l'URL : `Disallow: /page$` bloque `/page` mais autorise `/page/subpage`
- La correspondance de chemin est sensible à la casse

### Erreurs courantes de robots.txt

| Erreur | Impact | Correctif |
|---|---|---|
| Bloquer les fichiers CSS/JS | Googlebot ne peut pas rendre la page ; l'indexation mobile-first échoue | Autoriser tout le CSS et le JS : `Allow: /*.css` et `Allow: /*.js` |
| Bloquer accidentellement tout le site (`Disallow: /`) | Aucune page crawlée ; tout le site désindexé au fil du temps | Auditer robots.txt après chaque déploiement |
| Bloquer des URL paramétrées ayant un contenu unique | Des pages de valeur ne sont jamais crawlées | Utiliser noindex plutôt que Disallow pour les pages qui ne doivent pas être indexées mais peuvent être crawlées |
| Absence de directive Sitemap | Les crawlers doivent découvrir le sitemap par d'autres moyens | Toujours inclure la directive `Sitemap:` |
| Utiliser robots.txt pour empêcher l'indexation | Les pages peuvent quand même être indexées si liées en externe | Utiliser meta noindex ou X-Robots-Tag pour le contrôle d'indexation |
| Robots.txt différent en staging vs production | Le robots.txt de staging (Disallow: /) déployé en production | Ajouter la validation de robots.txt à la checklist de déploiement |
| Bloquer le fichier robots.txt lui-même via la config serveur | Les crawlers supposent que tout est autorisé | S'assurer que robots.txt renvoie un code de statut 200 |

### Tester robots.txt

- **Google Search Console > Paramètres > rapport robots.txt** : montre quels fichiers robots.txt Google a trouvés, le statut de récupération, et les erreurs d'analyse (l'ancien testeur de robots.txt autonome a été retiré). Pour tester des URL spécifiques par rapport aux règles, utiliser un analyseur/testeur robots.txt tiers
- **Bing Webmaster Tools** : fonctionnalité de test similaire pour les règles de Bingbot
- Robots.txt doit être servi à la racine du domaine : `https://example.com/robots.txt`
- Doit renvoyer HTTP 200. S'il renvoie 5xx, Google le traite comme un « tout autoriser » temporaire. S'il renvoie 4xx, Google le traite comme l'absence de restrictions
- Taille de fichier maximale : 500 Ko (Google ignore les règles au-delà de cette limite)

---

## Sitemaps XML

### Objectif

Les sitemaps XML indiquent aux moteurs de recherche quelles URL existent et méritent d'être crawlées. Ils complètent la découverte naturelle par crawl à travers les liens. Les sitemaps sont particulièrement importants pour les grands sites, les nouveaux sites avec peu de liens entrants, les sites à l'architecture profonde, et les pages avec un maillage interne limité.

### Structure

**Sitemap basique :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page-1</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Index de sitemaps (pour les grands sites) :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
    <lastmod>2025-11-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
    <lastmod>2025-11-10</lastmod>
  </sitemap>
</sitemapindex>
```

### Limites et exigences

| Contrainte | Limite |
|---|---|
| URL par fichier sitemap | 50 000 |
| Taille du fichier sitemap (non compressé) | 50 Mo |
| Sitemaps par index de sitemaps | 50 000 |
| Nombre maximal total d'URL (via l'index) | 2,5 milliards (50K x 50K) |
| Encodage | UTF-8 |
| Compression | gzip pris en charge et recommandé pour les grands sitemaps |

### Bonnes pratiques de sitemap

1. **N'inclure que les URL canoniques et indexables** : ne pas inclure les URL avec noindex, les URL non canoniques, les URL redirigées, ou les pages 4xx/5xx
2. **Utiliser des dates `lastmod` précises** : Google utilise lastmod pour prioriser le crawl. Ne mettre à jour la date que lorsque le contenu change de façon significative. Des dates inexactes (mise à jour automatique à aujourd'hui) amènent Google à ignorer totalement lastmod
3. **Segmenter les sitemaps par type de contenu** : sitemaps séparés pour les produits, les articles de blog, les pages de catégorie, et le contenu éditorial. Cela rend le reporting GSC plus utile et aide à diagnostiquer les problèmes de crawl par section
4. **Garder les sitemaps à jour** : générer dynamiquement les sitemaps ou les mettre à jour à la publication/mise à jour du contenu. Des sitemaps obsolètes avec des URL mortes gaspillent le budget de crawl
5. **Soumettre les sitemaps dans GSC** : soumettre via Google Search Console ET référencer dans robots.txt
6. **Compresser les grands sitemaps en gzip** : compresser les sitemaps pour réduire la bande passante serveur et accélérer les téléchargements des crawlers
7. **Surveiller le statut du sitemap dans GSC** : vérifier le rapport « Sitemaps » pour les erreurs, avertissements, et la couverture

### Sitemaps spécialisés

**Sitemap d'images :**
```xml
<url>
  <loc>https://example.com/product-page</loc>
  <image:image>
    <image:loc>https://example.com/images/product.jpg</image:loc>
    <image:title>Nom du produit</image:title>
    <image:caption>Description de l'image du produit</image:caption>
  </image:image>
</url>
```

**Sitemap vidéo :**
```xml
<url>
  <loc>https://example.com/video-page</loc>
  <video:video>
    <video:thumbnail_loc>https://example.com/thumb.jpg</video:thumbnail_loc>
    <video:title>Titre de la vidéo</video:title>
    <video:description>Description de la vidéo</video:description>
    <video:content_loc>https://example.com/video.mp4</video:content_loc>
    <video:duration>600</video:duration>
  </video:video>
</url>
```

**Sitemap d'actualités** (pour les éditeurs Google News) :
- Les URL doivent avoir moins de 2 jours
- Nécessite les éléments `<news:publication>`, `<news:publication_date>`, et `<news:title>`
- Ne soumettre que les articles, pas les pages d'index ou de catégorie

---

## Budget de crawl

### Qu'est-ce que c'est

Le budget de crawl est le nombre d'URL que Googlebot crawlera sur un site pendant une période donnée. Il est déterminé par deux facteurs :

1. **Limite de taux de crawl** : la vitesse de crawl maximale utilisée par Googlebot pour éviter de surcharger le serveur. Déterminée par la réactivité et la santé du serveur
2. **Demande de crawl** : à quel point Google veut crawler en fonction de la popularité du site, des signaux de fraîcheur, et de la taille perçue

### Quand le budget de crawl compte

Le budget de crawl est principalement une préoccupation pour :
- les sites de 10 000+ pages
- les sites qui génèrent rapidement de nouvelles URL (e-commerce, petites annonces, plateformes UGC)
- les sites avec des temps de réponse serveur lents (un TTFB < 200 ms est idéal pour l'efficacité du crawl)
- les sites où les pages importantes changent fréquemment et nécessitent un recrawl rapide

Pour les petits sites (moins de 10 000 pages), le budget de crawl est rarement un facteur limitant.

### Ce qui gaspille le budget de crawl

| Source de gaspillage | Description | Correctif |
|---|---|---|
| URL de navigation à facettes | Le filtrage/tri crée des millions de combinaisons de paramètres | Bloquer les facettes à faible valeur dans robots.txt ; canonicaliser vers la catégorie de base |
| Pages de résultats de recherche interne | `/search?q=xyz` indexée et crawlée pour chaque requête | Bloquer `/search` dans robots.txt ; ajouter noindex aux résultats de recherche |
| URL avec ID de session | Même page avec des paramètres de session différents | Retirer les ID de session des URL ; utiliser des cookies à la place |
| Pièges de défilement infini/pagination | Widgets calendrier, pagination infinie générant des URL illimitées | Plafonner la profondeur de pagination ; utiliser `rel="canonical"` sur les pages composantes |
| Pages en soft 404 | Pages renvoyant 200 mais affichant « aucun résultat » ou un contenu vide | Renvoyer les codes de statut 404 ou 410 appropriés |
| Contenu dupliqué issu des paramètres | Ordres de tri, paramètres de suivi, sélecteurs de devise | Canonicaliser vers la version sans paramètre |
| Pages orphelines | Pages sans lien interne — accessibles uniquement via le sitemap | Ajouter des liens internes ou retirer du sitemap si sans valeur |
| Chaînes de redirection | Chaque redirection consomme un crawl, et Google peut arrêter de suivre après 5 sauts | Résoudre les chaînes en redirections 301 directes |

### Stratégies d'optimisation du budget de crawl

1. **Améliorer le temps de réponse serveur** : un TTFB inférieur à 200 ms permet à Googlebot de crawler plus d'URL par session
2. **Bloquer le crawl des URL à faible valeur** via robots.txt (résultats de recherche, vues filtrées, pages admin, points de terminaison API)
3. **Nettoyer les chaînes de redirection** : résoudre en redirections 301 directes à saut unique
4. **Renvoyer les codes de statut appropriés** : 404 pour introuvable, 410 pour définitivement supprimé, 503 pour indisponibilité temporaire
5. **Garder les sitemaps XML propres** : uniquement des URL canoniques, indexables, avec statut 200
6. **Utiliser le maillage interne pour signaler la priorité** : les pages avec plus de liens internes sont crawlées plus fréquemment
7. **Mettre à jour `lastmod` avec précision** : aide Googlebot à prioriser les URL récemment modifiées
8. **Surveiller les statistiques de crawl dans GSC** : le rapport Statistiques de crawl montre les pages crawlées par jour, le temps de réponse moyen, et la répartition des réponses de crawl

---

## Rendu JavaScript et crawl

### Comment Googlebot gère le JavaScript

Googlebot utilise un processus en deux phases :
1. **Phase de crawl** : télécharge le HTML, découvre les liens et ressources dans le HTML brut
2. **Phase de rendu** : exécute le JavaScript à l'aide d'une instance Chromium headless, découvre du contenu et des liens supplémentaires dans le DOM rendu

La phase de rendu est gourmande en ressources et se déroule dans une file d'attente séparée. En période de forte charge, le rendu peut être retardé de quelques secondes à plusieurs jours. Le contenu et les liens qui n'existent que dans le DOM rendu par JavaScript peuvent être découverts tardivement.

### Stratégies de rendu et impact SEO

| Stratégie | HTML initial | Risque SEO | Idéal pour |
|---|---|---|---|
| **HTML statique** | Contenu complet | Aucun | Blogs, sites marketing, documentation |
| **Rendu côté serveur (SSR)** | Contenu complet | Aucun | Contenu dynamique changeant à chaque requête |
| **Génération de site statique (SSG)** | Contenu complet | Aucun | Contenu changeant peu fréquemment |
| **Régénération statique incrémentale (ISR)** | Contenu complet (stale-while-revalidate) | Très faible | Contenu dynamique à fort trafic |
| **Rendu côté client (CSR)** | Coquille vide ou squelette | Élevé | Tableaux de bord authentifiés (pas pour les pages SEO) |
| **Hybride (SSR + CSR)** | Contenu critique rendu côté serveur ; parties interactives rendues côté client | Faible | Applications web modernes avec exigences SEO |

### Checklist SEO JavaScript

- [ ] Le contenu critique est visible dans le source HTML brut (Afficher la source, pas Inspecter l'élément)
- [ ] Les liens internes sont des balises `<a href="...">` standards, pas une navigation déclenchée par JavaScript
- [ ] Les balises meta (title, description, canonical, robots) sont dans le HTML initial, pas injectées par JS
- [ ] Les données structurées (JSON-LD) sont dans la réponse HTML initiale
- [ ] L'outil d'inspection d'URL dans GSC montre que le HTML rendu correspond à ce que voient les utilisateurs
- [ ] Aucune erreur de rendu critique dans la section « Plus d'infos » de l'inspection d'URL de GSC
- [ ] Le routage côté client utilise l'History API (pushState), pas un routage basé sur hash (`#/page`)
- [ ] Le serveur renvoie les codes de statut HTTP appropriés (404, 301) plutôt que de les gérer côté client

---

## Analyse de fichiers journaux

### Que faut-il analyser

Les logs serveur enregistrent chaque requête faite au serveur, y compris celles des crawlers de moteurs de recherche. Analyser ces logs révèle comment les crawlers se comportent réellement sur le site, ce qui peut différer significativement de ce que l'on attend.

### Métriques clés issues des fichiers journaux

| Métrique | Ce qu'elle indique | Plage saine |
|---|---|---|
| **Fréquence de crawl par URL** | À quelle fréquence Googlebot visite chaque URL | Pages importantes : quotidienne ; faible valeur : hebdomadaire ou moins |
| **Fréquence de crawl par section** | Quelles sections du site reçoivent le plus d'attention des crawlers | Devrait s'aligner avec la valeur business de chaque section |
| **Répartition des codes de réponse** | Pourcentage de réponses 200, 301, 404, 5xx servies aux bots | > 90 % devrait être 200 ; < 1 % devrait être 5xx |
| **Temps de réponse moyen pour les bots** | Performance serveur sous la charge des crawlers | < 200 ms idéal ; > 500 ms est un problème |
| **Crawl d'URL non indexables** | Quelle part du budget de crawl est gaspillée sur des URL noindex, bloquées, ou redirigées | < 20 % du total des requêtes de bots |
| **Crawl de pages orphelines** | Pages crawlées qui n'ont aucun lien interne | Devrait être proche de 0 pour le contenu important |
| **Identification des bots** | Quels bots crawlent et leur comportement | Vérifier Googlebot, Bingbot ; surveiller les bots scraper |

### Flux d'analyse de logs

1. **Extraire les requêtes de bots** des logs d'accès (filtrer par user-agent contenant « Googlebot », « bingbot », « Yandex », etc.)
2. **Vérifier l'identité du bot** : les IP de Googlebot résolvent vers `*.googlebot.com` ou `*.google.com` via DNS inversé. Les faux Googlebots sont courants
3. **Segmenter par motif d'URL** : regrouper les URL crawlées par répertoire/modèle (pages produit, articles de blog, pages de catégorie, etc.)
4. **Calculer la répartition du crawl** : quel pourcentage de crawls va vers chaque section ? Correspond-il à la priorité du site ?
5. **Identifier le gaspillage de crawl** : URL renvoyant 3xx, 4xx, 5xx aux bots ; URL non indexables crawlées de façon répétée
6. **Vérifier les temps de réponse** : certains motifs d'URL sont-ils systématiquement lents pour les bots ?
7. **Comparer au sitemap** : toutes les URL du sitemap sont-elles crawlées ? Des URL hors sitemap sont-elles crawlées plus que les URL du sitemap ?
8. **Suivre dans le temps** : analyse hebdomadaire des logs pour détecter les changements de comportement de crawl après des mises à jour du site

### Outils pour l'analyse de logs

- **Screaming Frog Log File Analyser** : outil dédié à l'analyse de logs SEO. Analyse les formats de log courants, segmente par bot, visualise les schémas de crawl
- **Scripts personnalisés (Python/pandas)** : pour les gros fichiers de logs ou des besoins d'analyse personnalisés. Analyser avec des regex, agréger avec pandas
- **Stack ELK (Elasticsearch, Logstash, Kibana)** : pour la surveillance continue de logs et le dashboarding à grande échelle
- **BigQuery ou Athena** : pour interroger de très gros fichiers de logs stockés dans le cloud
- **Botify, OnCrawl, JetOctopus** : plateformes SEO d'entreprise avec analyse de logs intégrée

---

## Détection de pages orphelines

### Que sont les pages orphelines

Les pages orphelines sont des URL qui existent sur le serveur et peuvent être indexées mais n'ont aucun lien interne pointant vers elles. Elles ne sont découvrables que via :
- les sitemaps XML
- les backlinks externes
- la saisie directe de l'URL
- les données de crawl mises en cache précédemment

### Pourquoi les pages orphelines comptent

- **Inefficacité de crawl** : si la page a de la valeur, elle est privée de fréquence de crawl et de PageRank
- **Gonflement de l'index** : si la page a une faible valeur, elle consomme de l'espace d'index sans contribuer
- **Opportunité SEO manquée** : les pages sans lien interne signalent une faible importance aux moteurs de recherche

### Méthode de détection

1. Crawler le site avec un outil comme Screaming Frog, Sitebulb, ou un crawler personnalisé en partant de la page d'accueil
2. Exporter la liste des URL découvertes (accessibles via les liens internes)
3. Comparer avec : les URL du sitemap XML, les URL indexées dans GSC, les URL des logs serveur (pages réellement crawlées par Googlebot)
4. Toute URL présente dans le sitemap, GSC, ou les logs mais qui N'A PAS été trouvée par le crawl interne est orpheline

### Résolution

- **Pages orphelines de valeur** : ajouter des liens internes depuis des pages parentes pertinentes. Inclure dans la navigation ou les sections de contenu associé
- **Pages orphelines à faible valeur** : retirer du sitemap, ajouter noindex, ou renvoyer 410 Gone si vraiment obsolète
- **Pages orphelines avec des backlinks** : priorité élevée pour la récupération — ajouter des liens internes pour capter ce link equity externe

---

## Gestion des paramètres d'URL

### Le problème

Les paramètres d'URL (chaînes de requête) créent plusieurs URL pointant vers un contenu identique ou similaire :
- `example.com/shoes` (base)
- `example.com/shoes?color=red` (filtrée)
- `example.com/shoes?sort=price` (triée)
- `example.com/shoes?color=red&sort=price&page=2` (combinée)

Pour un site avec 50 catégories, 10 filtres, 5 options de tri, et 10 pages de pagination, l'explosion combinatoire produit 250 000 variations d'URL à partir de 50 catégories de base.

### Stratégies de résolution

| Stratégie | Quand l'utiliser | Mise en œuvre |
|---|---|---|
| **Canonique vers l'URL de base** | Le paramètre ne crée pas de contenu unique et de valeur (tri, session, suivi) | `<link rel="canonical" href="url-de-base">` sur les pages paramétrées |
| **Blocage robots.txt** | URL de paramètres à fort volume gaspillant le budget de crawl | `Disallow: /*?sort=` dans robots.txt |
| **Noindex, follow** | Les pages de paramètres ont une certaine valeur de lien mais ne doivent pas se classer | `<meta name="robots" content="noindex, follow">` |
| **Autoriser l'indexation** | Le paramètre crée un contenu véritablement unique et recherché (par ex. `/shoes?color=red` cible « chaussures rouges ») | S'assurer d'un title, d'une description et d'un contenu uniques ; canonique auto-référencée |
| **Filtrage basé sur AJAX** | Empêcher totalement la génération d'URL de paramètres | Le filtrage met à jour le contenu via JavaScript sans changer l'URL ; utiliser l'History API pour un état partageable |

Remarque : Google a supprimé son outil Paramètres d'URL dans Google Search Console en 2022. La gestion des paramètres doit désormais se faire entièrement via des signaux sur site (canoniques, robots, noindex).
</content>

# Architecture de site — Structure d'URL, maillage interne et architecture de l'information

Une référence complète pour concevoir et optimiser l'architecture de site pour les moteurs de recherche et les utilisateurs. L'architecture de site détermine comment le link equity circule à travers un site, avec quelle efficacité les crawlers découvrent le contenu, et avec quelle facilité les utilisateurs trouvent ce dont ils ont besoin. C'est l'un des leviers SEO techniques à plus fort effet de levier pour les grands sites.

---

## Structure d'URL

### Bonnes pratiques

**Lisibilité et mots-clés :**
- Les URL doivent être lisibles par un humain et inclure le mot-clé cible principal : `/blog/technical-seo-guide` et non `/blog/post?id=4827`
- Utiliser des traits d'union (`-`) pour séparer les mots, pas des underscores (`_`) ni des espaces (`%20`). Google traite les traits d'union comme des séparateurs de mots mais les underscores comme des liaisons
- Garder les URL concises — moins de 100 caractères si possible (pas de limite stricte, mais des URL plus courtes sont plus faciles à partager et à afficher dans les SERP)
- Utiliser des minuscules de façon cohérente. Les URL sont sensibles à la casse sur la plupart des serveurs ; une casse mixte crée un risque de contenu dupliqué

**Schémas de structure :**

| Schéma | Exemple | Idéal pour |
|---|---|---|
| Plat | `/product-name` | Petits sites, landing pages individuelles |
| Catégorie/page | `/category/page-name` | Blogs, sites moyens, hubs de contenu |
| Hiérarchique | `/category/subcategory/page-name` | Grands sites, e-commerce avec une taxonomie claire |
| Basé sur la date | `/2025/11/article-name` | Sites d'actualités (montre la fraîcheur), mais limite la réorganisation future |

**Ce qu'il faut éviter dans les URL :**
- ID de session : `/page?sessionid=abc123` — utiliser des cookies à la place
- Paramètres excessifs : `/page?color=red&size=m&sort=price&page=2&ref=homepage`
- Profondeur inutile : `/store/products/clothing/mens/shirts/casual/blue-shirt` (trop profond)
- Mots vides en excès : `/the-complete-guide-to-the-best-ways-to-do-seo` — réduire à `/complete-seo-guide`
- Changer les URL après publication — chaque changement d'URL nécessite une redirection 301 et risque une perte de classement

### Cohérence de la barre oblique finale

Choisir un format et l'appliquer sur tout le site :
- `example.com/page/` (avec barre oblique finale)
- `example.com/page` (sans barre oblique finale)

Google traite ces deux formats comme des URL différentes. Si les deux se résolvent avec un statut 200, cela crée du contenu dupliqué. Imposer un format unique avec une redirection côté serveur (301) depuis le format non canonique.

La plupart des CMS ont un paramètre pour cela. Pour les implémentations sur mesure, le gérer dans la configuration du serveur web (nginx, Apache) ou le routeur applicatif.

---

## Architecture de l'information

### Principes

1. **Chaque page importante doit être accessible en 3 clics maximum depuis la page d'accueil.** Les pages à plus de 3 niveaux de profondeur reçoivent moins de fréquence de crawl et moins de PageRank. Cela ne signifie pas une structure d'URL plate — cela signifie que les liens internes créent des chemins courts.

2. **Regrouper le contenu associé.** Les moteurs de recherche utilisent la proximité de contenu (pages se reliant entre elles, partageant une structure de chemin d'URL, et couvrant des sujets connexes) pour comprendre l'autorité thématique.

3. **Construire l'autorité thématique via des clusters de contenu.** Une page pilier ciblant un sujet large renvoie vers des pages de cluster ciblant des sous-sujets spécifiques. Toutes les pages de cluster renvoient vers le pilier. Cela crée un signal d'autorité auto-renforçant.

### Modèle de cluster thématique

```
                    [Page pilier]
                   "Guide de SEO technique"
                  /    |    |    |    \
                 /     |    |    |     \
    [Cluster]  [Cluster] [Cluster] [Cluster] [Cluster]
   "Core Web   "Budget  "Migration  "Balisage  "Mobile-
    Vitals"    de crawl" de site"    Schema"    First"
```

**Page pilier** : présentation complète (2 000-5 000 mots) ciblant le terme générique large. Renvoie vers chaque page de cluster.

**Pages de cluster** : articles approfondis (1 000-3 000 mots) ciblant des sous-sujets de longue traîne spécifiques. Chacune renvoie vers le pilier et se lie de façon croisée avec les pages de cluster associées.

**Résultat** : les moteurs de recherche comprennent que le site fait autorité sur le sujet pilier en raison de la profondeur et de l'interconnexion de la couverture.

### Silotage de contenu

Le silotage de contenu organise le contenu du site en sections thématiques distinctes avec un maillage contrôlé entre elles. L'objectif est de concentrer la pertinence thématique au sein de chaque silo.

**Silo dur** : la structure d'URL reflète le silo : `/technical-seo/core-web-vitals`, `/technical-seo/crawlability`. Les liens internes restent dans le silo. Les liens inter-silos passent par les pages de silo de niveau supérieur.

**Silo souple** : la structure d'URL peut être plate, mais le maillage interne crée des silos virtuels. Des liens contextuels connectent le contenu associé au sein de la même zone thématique.

**Quand siloter :**
- des sites couvrant plusieurs sujets distincts (une agence marketing avec des sections SEO, PPC, social, e-mail)
- des sites e-commerce avec des catégories de produits distinctes
- des éditeurs couvrant plusieurs domaines

**Quand le silotage est inutile :**
- petits sites (moins de 50 pages) où tout le contenu est étroitement lié
- sites de niche mono-thématiques où tout est un seul silo

---

## Stratégie de maillage interne

### Pourquoi les liens internes comptent

1. **Découverte de crawl** : Googlebot suit les liens internes pour découvrir les pages. Les pages avec plus de liens internes sont crawlées plus fréquemment
2. **Distribution du PageRank** : les liens internes transmettent le PageRank (link equity) d'une page à une autre. Un maillage interne stratégique concentre l'autorité sur les pages prioritaires
3. **Signaux de pertinence thématique** : le texte d'ancre et le contexte environnant des liens internes aident les moteurs de recherche à comprendre le sujet de la page liée
4. **Navigation utilisateur** : des liens internes bien placés réduisent le taux de rebond et augmentent le nombre de pages par session

### Types de liens internes

| Type | Description | Valeur SEO | Exemple |
|---|---|---|---|
| **Liens de navigation** | Menus d'en-tête, pied de page, barre latérale | Moyenne (dilution à l'échelle du site) | Menu principal renvoyant aux pages de catégorie |
| **Liens contextuels** | Liens dans le corps du texte | Élevée (contexte pertinent + texte d'ancre) | Article de blog renvoyant vers un article associé |
| **Liens de fil d'Ariane** | Chemin hiérarchique de la page d'accueil à la page actuelle | Moyenne-élevée (renforce la hiérarchie) | Accueil > Catégorie > Sous-catégorie > Page |
| **Liens de contenu associé** | Pages associées sélectionnées algorithmiquement ou manuellement | Moyenne | Section « articles associés » sous les articles de blog |
| **Liens en pied de page** | Liens dans le pied de page du site | Faible-moyenne (à l'échelle du site, souvent ignorés) | Utile pour des pages importantes absentes de la navigation principale |
| **Liens en barre latérale** | Liens dans les widgets de barre latérale | Faible-moyenne | Listes de catégories, articles populaires, articles récents |

### Optimisation du texte d'ancre

- **Utiliser un texte d'ancre descriptif et pertinent au niveau des mots-clés** : « checklist d'audit SEO technique » et non « cliquez ici » ou « en savoir plus »
- **Varier naturellement le texte d'ancre** : ne pas utiliser exactement le même texte d'ancre pour chaque lien vers une page. Utiliser des variations, correspondances partielles, et phrases naturelles
- **Éviter la sur-optimisation** : ne pas bourrer chaque ancre de lien interne avec des mots-clés en correspondance exacte. Les algorithmes de Google détectent ce schéma
- **Le contexte compte** : le paragraphe environnant fournit des signaux de pertinence supplémentaires au-delà du seul texte d'ancre
- **Éviter les ancres génériques** pour les liens importants : « en savoir plus », « cliquez ici », et « lire ceci » gaspillent une opportunité de texte d'ancre

### Méthodologie d'audit de maillage interne

1. **Crawler le site** pour construire un graphe de liens complet (Screaming Frog, Sitebulb, ou un crawler personnalisé)
2. **Identifier les pages avec un faible nombre de liens internes** : les pages importantes (pages de mots-clés cibles, pages génératrices de revenus) avec moins de 5 liens internes pointant vers elles ont besoin de plus de liens
3. **Identifier les pages avec des liens internes excessifs** : les pages liant vers 200+ URL diluent le PageRank par lien. Consolider ou prioriser
4. **Trouver les pages orphelines** : pages sans aucun lien interne (voir crawlability.md pour la méthode de détection)
5. **Analyser la profondeur de lien** : cartographier la profondeur de clic depuis la page d'accueil. Signaler les pages critiques à plus de 3 clics
6. **Vérifier les liens internes cassés** : les 404 provenant de liens internes gaspillent le budget de crawl et le PageRank
7. **Examiner la répartition du texte d'ancre** : s'assurer que les pages importantes reçoivent un texte d'ancre pertinent au niveau des mots-clés depuis plusieurs sources
8. **Visualiser le flux de liens** : utiliser une visualisation de l'architecture de site pour identifier les goulots d'étranglement de PageRank et les silos

### Principes de distribution du link equity

- **La page d'accueil a le plus de PageRank** (elle reçoit le plus de backlinks externes). Les liens depuis la page d'accueil sont les liens internes les plus précieux
- **Le PageRank circule à travers les liens et est divisé entre tous les liens d'une page**. Une page avec 10 liens sortants transmet plus d'equity par lien qu'une page avec 100 liens sortants
- **Les pages profondes nécessitent un maillage intentionnel** : un article de blog à 5 clics de la page d'accueil reçoit un PageRank minimal sauf s'il est lié depuis des pages à plus forte autorité
- **« Faites des liens vers vos pages money »** : les pages produit, les pages de service, et les landing pages à fort taux de conversion doivent recevoir des liens internes depuis du contenu à forte autorité (articles de blog avec des backlinks, page d'accueil, pages de catégorie)

---

## Gestion de la pagination

### Bonnes pratiques actuelles (après la dépréciation de rel=prev/next)

Google a déprécié le support de `rel="prev"` et `rel="next"` en 2019. Approches actuelles :

**Option 1 : page « tout afficher » (préférée pour le SEO)**
- Créer une seule page avec tout le contenu (`/products/shoes?view=all`)
- Définir la page « tout afficher » comme canonique pour toutes les pages composantes paginées
- Idéal pour : les listes de produits de moins de 200 articles, les listes d'articles
- Mise en garde : la page doit se charger raisonnablement vite. Si 500 produits causent un temps de chargement de 10 secondes, ce n'est pas viable

**Option 2 : pages paginées auto-canonicalisées**
- Chaque page paginée (`/shoes?page=1`, `/shoes?page=2`) a une canonique auto-référencée
- Google indexe chaque page indépendamment
- Idéal pour : les grands catalogues où une page « tout afficher » n'est pas réalisable
- S'assurer que chaque page a un contenu unique et pertinent (pas seulement le même texte d'intro avec des produits différents)

**Option 3 : bouton « charger plus » / défilement infini (avec considérations SEO)**
- Bouton « charger plus » ou défilement infini propulsé par JavaScript
- Critique : implémenter comme une amélioration progressive avec des URL paginées crawlables en dessous
- Google recommande : des liens `<a href="/shoes?page=2">` dans le HTML que JavaScript enrichit en fonctionnalité « charger plus »
- Sans URL de repli crawlables, Googlebot ne peut pas accéder au contenu au-delà du chargement initial

---

## Navigation à facettes (e-commerce)

### Le défi

Le filtrage e-commerce (couleur, taille, fourchette de prix, marque, note) génère d'énormes combinaisons d'URL. Une catégorie avec 8 types de filtres et 5 options chacun crée 5^8 = 390 625 combinaisons d'URL possibles à partir d'une seule catégorie.

### Matrice de stratégie

| Type de facette | Exemple | Indexable ? | Traitement |
|---|---|---|---|
| **Facettes à forte demande** | Couleur, marque, matière pour la mode | Oui — s'il existe un volume de recherche pour « chaussures de course rouges » | Title/description uniques, canonique auto-référencée, inclure dans le sitemap |
| **Paramètres de tri** | Trier par prix, popularité, nouveauté | Non — mêmes produits, ordre différent | Canonique vers la catégorie de base ; blocage robots.txt ou noindex |
| **Pagination au sein des facettes** | Page 2 des chaussures rouges | Selon la profondeur | Les pages 1-3 peuvent être indexables ; les pages plus profondes canoniques vers la page 1 |
| **Facettes à sélection multiple** | Rouge + bleu + taille 10 | Non — trop spécifique, pas de demande de recherche | Canonique vers la facette applicable la plus large ; blocage robots.txt |
| **Fourchette de prix** | 50-100 € | Rarement | Généralement canonique vers la catégorie de base sauf si « [produit] pas cher » a du volume |
| **Filtres de notation** | 4 étoiles et plus | Non | Canonique vers la catégorie de base |

### Approches de mise en œuvre

1. **Filtrage basé sur AJAX (meilleure option)** : les filtres mettent à jour le contenu via JavaScript sans générer de nouvelles URL. Utiliser l'History API pour mettre à jour l'URL en vue du partage sans créer d'URL de paramètres crawlables. Googlebot ne voit que l'URL de catégorie de base.

2. **Canonique + robots.txt (courant)** : autoriser l'existence des URL de paramètres mais canonicaliser les combinaisons à faible valeur vers l'URL de base. Bloquer les motifs de paramètres à fort volume dans robots.txt pour préserver le budget de crawl.

3. **Noindex, follow (solution de repli)** : appliquer noindex aux pages de paramètres qui ne doivent pas se classer mais contiennent des liens à suivre. Utiliser lorsque les signaux canoniques sont insuffisants.

---

## Implémentation du fil d'Ariane

### Bénéfices SEO

- Renforce la hiérarchie du site pour les moteurs de recherche
- Fournit des liens internes riches en mots-clés vers les pages parentes
- Permet des résultats enrichis de fil d'Ariane dans les SERP de Google (augmente le taux de clic)
- Aide les utilisateurs à comprendre leur emplacement au sein du site

### Implémentation HTML

```html
<nav aria-label="Fil d'Ariane">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/"><span itemprop="name">Accueil</span></a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/technical-seo"><span itemprop="name">SEO technique</span></a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Core Web Vitals</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

### Alternative JSON-LD (préférée)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://example.com/"},
    {"@type": "ListItem", "position": 2, "name": "SEO technique", "item": "https://example.com/technical-seo"},
    {"@type": "ListItem", "position": 3, "name": "Core Web Vitals"}
  ]
}
```

### Bonnes pratiques

- Toujours commencer par « Accueil » comme premier élément du fil d'Ariane
- Le dernier élément (page actuelle) ne doit pas être un lien
- Utiliser des noms descriptifs (pas des slugs d'URL) — « Guide des Core Web Vitals » et non « core-web-vitals »
- Pour les produits appartenant à plusieurs catégories, choisir la catégorie principale pour le chemin de fil d'Ariane (correspondant à la canonique)
- Implémenter le schema BreadcrumbList pour l'éligibilité aux résultats enrichis

---

## Planification de migration de site

### Checklist pré-migration

- [ ] Correspondance d'URL complète : ancienne URL vers nouvelle URL pour chaque page avec du trafic organique ou des backlinks
- [ ] Mettre en place des redirections 301 pour chaque URL mappée (tester avant le lancement)
- [ ] Vérifier que le nouveau site n'a pas de blocage robots.txt ou de balises noindex issues du développement
- [ ] Mettre à jour tous les liens internes pour qu'ils pointent vers les nouvelles URL (éviter de compter uniquement sur les redirections pour la navigation interne)
- [ ] Mettre à jour les balises canoniques pour référencer les nouvelles URL
- [ ] Mettre à jour les sitemaps XML pour référencer les nouvelles URL
- [ ] Mettre à jour les balises hreflang (pour un site international)
- [ ] Mettre à jour les données structurées (URL dans le balisage schema)
- [ ] Établir une référence de la performance actuelle : trafic organique par page, nombre de pages indexées, statistiques de crawl, classements pour les mots-clés cibles, Core Web Vitals
- [ ] Notifier Google via l'outil de changement d'adresse de GSC (pour les migrations de domaine)
- [ ] Mettre en place une surveillance : vérifications quotidiennes du trafic organique, surveillance horaire des erreurs de crawl pendant la première semaine

### Jour de migration

- [ ] Déployer les redirections
- [ ] Vérifier que les redirections fonctionnent (tester un échantillon de 50+ URL sur différents modèles)
- [ ] Soumettre le nouveau sitemap à GSC
- [ ] Demander l'indexation des pages les plus importantes via l'outil d'inspection d'URL
- [ ] Surveiller les statistiques de crawl en temps réel pendant les premières 24 heures
- [ ] Vérifier un pic d'erreurs de crawl dans GSC

### Surveillance post-migration

| Délai | Vérification | Attendu |
|---|---|---|
| Jour 1-3 | Erreurs de crawl dans GSC | Un pic est normal ; devrait diminuer rapidement |
| Semaine 1 | Couverture d'index | Les anciennes URL transitionnent vers les nouvelles |
| Semaine 1 | Trafic organique | Une baisse de 10-30 % est normale pour des migrations bien exécutées |
| Semaine 2-4 | Classements pour les mots-clés cibles | Devraient commencer à récupérer les niveaux pré-migration |
| Mois 1-2 | Récupération du trafic organique | Devrait atteindre 90-100 % des niveaux pré-migration |
| Mois 3 | Audit complet | Performance comparable ou améliorée sur toutes les métriques |
| Mois 6-12 | Maintenance des redirections | Garder l'ancien domaine et les redirections actifs pendant au moins 12 mois |

### Lorsque les classements ne récupèrent pas

Si le trafic organique n'a pas récupéré à 90 % en 8 semaines :
1. Vérifier les erreurs de redirection (redirections cassées, chaînes de redirection, boucles)
2. Vérifier l'absence de blocage noindex ou robots.txt sur le nouveau site
3. Vérifier que les balises canoniques ne pointent pas vers les anciennes URL
4. Vérifier que les liens internes sont mis à jour (pas seulement basés sur des chaînes de redirection)
5. Vérifier les problèmes de parité de contenu (contenu manquant sur les nouvelles pages)
6. Examiner GSC pour des actions manuelles ou des problèmes de sécurité
7. Auditer les Core Web Vitals sur le nouveau site (une régression de performance peut pénaliser les classements)
</content>

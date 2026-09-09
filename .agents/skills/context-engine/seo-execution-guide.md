# Guide d'exécution SEO

Connaissances de référence pour l'exécution SEO via les API de CMS, les opérations Search Console, le déploiement de schémas, la surveillance de classement, et les flux de travail SEO techniques. Utilisez ce guide lors de l'exécution de tâches SEO de manière programmatique via les serveurs MCP et les scripts.

---

## 1. Mises à jour des champs SEO WordPress

### Champs méta Yoast SEO

Mettre à jour via `POST /wp-json/wp/v2/posts/{id}` avec l'objet `meta` :

| Clé méta | Longueur max | Objectif |
|---|---|---|
| `_yoast_wpseo_title` | 60 caractères | Remplacement du titre SEO. Prend en charge les variables : `%%title%%`, `%%sep%%`, `%%sitename%%`, `%%primary_category%%`. |
| `_yoast_wpseo_metadesc` | 160 caractères | Méta-description pour l'extrait SERP. Inclure le mot-clé principal naturellement. Terminer par un CTA ou une proposition de valeur. |
| `_yoast_wpseo_focuskw` | N/A | Mot-clé principal pour l'analyse de contenu Yoast. Un seul mot-clé ou une seule expression. |
| `_yoast_wpseo_canonical` | URL | Remplacement de l'URL canonique. À utiliser lorsque le contenu est syndiqué ou dupliqué. |
| `_yoast_wpseo_opengraph-title` | 60 caractères | Titre OG pour le partage social. Se replie sur `_yoast_wpseo_title` si vide. |
| `_yoast_wpseo_opengraph-description` | 200 caractères | Description OG pour le partage social. |
| `_yoast_wpseo_opengraph-image` | URL | URL de l'image OG. Recommandé : 1200x630 px. |
| `_yoast_wpseo_twitter-title` | 60 caractères | Remplacement du titre de la carte Twitter. Se replie sur le titre OG. |
| `_yoast_wpseo_twitter-description` | 200 caractères | Remplacement de la description de la carte Twitter. |
| `_yoast_wpseo_schema_article_type` | énumération | `Article`, `BlogPosting`, `NewsArticle`, `TechArticle`, `ScholarlyArticle`. |

### Champs méta RankMath SEO

Mettre à jour via le même objet `meta` de l'API REST WordPress :

| Clé méta | Longueur max | Objectif |
|---|---|---|
| `rank_math_title` | 60 caractères | Titre SEO. Prend en charge les variables : `%title%`, `%sep%`, `%sitename%`, `%category%`. |
| `rank_math_description` | 160 caractères | Méta-description. |
| `rank_math_focus_keyword` | N/A | Mot-clé principal. Séparé par des virgules pour plusieurs mots-clés. |
| `rank_math_canonical_url` | URL | Remplacement de l'URL canonique. |
| `rank_math_robots` | tableau | Directives d'indexation : `["index", "follow"]` ou `["noindex", "nofollow"]`. |
| `rank_math_advanced_robots` | objet | `{ "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 }` |
| `rank_math_schema_Article` | JSON | Remplacement complet du schéma. Permet l'injection de JSON-LD personnalisé. |

### Module de redirection RankMath

- **Point de terminaison API** : `POST /wp-json/rankmath/v1/redirections`
- **Champs** : `sources` (tableau de motifs d'URL), `url_to` (destination), `header_code` (301, 302, 307, 410), `status` (actif/inactif)
- **Prise en charge des expressions régulières** : Définir `comparison` sur `regex` pour les redirections basées sur des motifs
- **Import** : Import en masse via CSV avec les colonnes : source, destination, type, catégorie

---

## 2. Mises à jour des champs SEO Webflow

### Champs SEO des éléments CMS

Mettre à jour via `PATCH /collections/{collection_id}/items/{item_id}` avec l'objet `fields` :

| Slug de champ | Objectif | Détails |
|---|---|---|
| `name` | Titre de la page/de l'élément | Nom d'affichage principal utilisé dans le CMS. |
| `slug` | Slug d'URL | Doit être unique au sein de la collection. Minuscules, tirets uniquement. |
| `post-body` (ou personnalisé) | Contenu en texte enrichi | Sous-ensemble HTML. Prend en charge les titres, paragraphes, listes, liens, images. |
| Champ de titre SEO personnalisé | Titre SEO | Faire correspondre au slug du champ de titre SEO personnalisé de votre collection. |
| Champ de description SEO personnalisé | Méta-description | Faire correspondre au slug du champ de méta-description personnalisé de votre collection. |
| Champ d'image OG personnalisé | Image Open Graph | `{ "url": "https://...", "alt": "Description" }`. Doit être accessible publiquement. |

### Paramètres SEO natifs Webflow

- **SEO au niveau de la page** : Défini via `PATCH /pages/{page_id}` avec `seo.title`, `seo.description`, `openGraph.title`, `openGraph.description`, `openGraph.titleCopy`, `openGraph.descriptionCopy`
- **Image OG** : Téléverser via `POST /sites/{site_id}/assets` puis référencer dans `openGraph.image`
- **Sitemap** : Généré automatiquement à `/sitemap.xml`. Aucun contrôle via API — géré via le tableau de bord Webflow
- **Redirections** : `POST /sites/{site_id}/redirects` avec `{ "path": "/old-path", "target": "/new-path", "statusCode": 301 }`
- **Limites de redirection** : Plan Basic : 100 redirections. Plan CMS : 500. Plan Business : 2 000. Enterprise : illimité
- **Publier après les changements** : Les changements nécessitent `POST /sites/{site_id}/publish` — les changements ne sont pas en ligne tant qu'ils ne sont pas publiés

---

## 3. Opérations de l'API Google Search Console

### API d'inspection d'URL

- **Point de terminaison** : `POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`
- **Charge utile** : `{ "inspectionUrl": "https://example.com/page", "siteUrl": "https://example.com/" }`
- **Champs de réponse** : `indexStatusResult.verdict` (PASS, NEUTRAL, FAIL), `indexStatusResult.coverageState` (Envoyée et indexée, Explorée - actuellement non indexée, Découverte - actuellement non indexée, etc.), `mobileUsabilityResult`, `richResultsResult`
- **Cas d'usage** : Vérifier le statut d'indexation avant et après les mises à jour de contenu. Vérifier que les nouvelles pages sont indexées.

### Demande d'indexation (soumission d'URL)

- **Point de terminaison** : `POST https://indexing.googleapis.com/v3/urlNotifications:publish`
- **Charge utile** : `{ "url": "https://example.com/page", "type": "URL_UPDATED" }` ou `"type": "URL_DELETED"`
- **Quota** : 200 demandes de publication par jour et par propriété (pas 500 — la documentation de l'API précise 200 pour la plupart des propriétés ; les sites à fort volume peuvent demander des augmentations)
- **Portée** : Conçue à l'origine pour les pages de schéma `JobPosting` et `BroadcastEvent`. Google a étendu la prise en charge mais peut ne pas traiter tous les types d'URL de façon égale
- **Bonne pratique** : Utiliser pour les pages prioritaires (nouveaux lancements de produits, contenu sensible au temps). Pour les soumissions en masse, utiliser plutôt la soumission de sitemap

### API de soumission de sitemap

- **Point de terminaison** : `PUT https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}`
- **Paramètres** : `siteUrl` (URL de propriété encodée), `feedpath` (URL de sitemap encodée)
- **Supprimer un sitemap** : `DELETE /webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}`
- **Lister les sitemaps** : `GET /webmasters/v3/sites/{siteUrl}/sitemaps`
- **Bonne pratique** : Soumettre après des mises à jour de contenu en masse, des lancements de nouvelles sections, ou une restructuration de site. Notifier Google après la régénération du sitemap.

---

## 4. Schémas d'implémentation des redirections

### WordPress — API du plugin Redirection

- **Base de l'API REST du plugin** : `/wp-json/redirection/v1/`
- **Créer une redirection** : `POST /redirect` avec `{ "url": "/old-path", "match_url": "/old-path", "action_data": { "url": "/new-path" }, "action_type": "url", "action_code": 301, "group_id": 1 }`
- **Prise en charge des expressions régulières** : Définir `match_type` sur `url` (exact) ou `regex` (correspondance de motif)
- **Accès aux journaux** : `GET /log` — journaux des redirections avec horodatages, agents utilisateurs, référents
- **Surveillance des 404** : `GET /404s` — erreurs 404 non résolues pour l'identification d'opportunités de redirection

### Webflow — Redirections 301 natives

- **Créer** : `POST /sites/{site_id}/redirects` avec `{ "path": "/old-path", "target": "/new-path", "statusCode": 301 }`
- **Création en masse** : Parcourir la liste de redirections avec un délai de 100 ms entre les requêtes (limite de 60 requêtes/min)
- **Validation** : Le chemin doit commencer par `/`. La cible peut être relative (`/new-path`) ou absolue (`https://example.com/new-path`)
- **Limites de plan appliquées côté serveur** : L'API renvoie 429 ou une erreur lorsque la limite de redirection est atteinte

### Protocole de sécurité pour les redirections en masse

1. **Instantané pré-édition** : Exporter la liste de redirections actuelle. Stocker sous forme de `redirects_backup_{timestamp}.json`
2. **Passe de validation** : Pour chaque redirection, vérifier que l'URL source renvoie 200 (existe) et que l'URL de destination renvoie 200 (cible valide). Signaler les chaînes de redirection (A→B où B→C existe déjà)
3. **Déploiement échelonné** : Déployer par lots de 25. Après chaque lot, vérifier ponctuellement 3 redirections via une requête HTTP HEAD
4. **Vérification post-déploiement** : Explorer toutes les URL source. Confirmer les codes de statut 301. Vérifier l'absence de boucles de redirection. Vérifier que la destination finale correspond à l'intention
5. **Annulation (rollback)** : Si des erreurs sont détectées, restaurer depuis l'instantané pré-édition. Tous les outils de redirection doivent prendre en charge l'annulation dans les 30 minutes suivant le déploiement

---

## 5. Flux de déploiement de schéma

### Exécution étape par étape

1. **Générer le JSON-LD** — Construire le balisage de schéma selon le type de contenu :
   - `BlogPosting` : title, author, datePublished, dateModified, image, publisher, description
   - `Product` : name, description, image, offers (price, priceCurrency, availability), aggregateRating, review
   - `FAQ` : tableau mainEntity avec des paires Question/Answer — **remarque :** les résultats enrichis FAQ sont restreints (août 2023) aux sites gouvernementaux et de santé faisant autorité uniquement ; le balisage reste valide pour la structure, mais n'attendez pas de résultat enrichi sur la plupart des sites
   - `HowTo` : name, tableau step avec name/text/image, totalTime, estimatedCost — **remarque :** les résultats enrichis HowTo sont dépréciés (septembre 2023) ; le balisage reste valide pour la structure, mais préférez un format Article avec une structure étape par étape
   - `LocalBusiness` : name, address, geo, telephone, openingHours, priceRange
   - `Organization` : name, url, logo, sameAs (profils sociaux), contactPoint

2. **Valider le schéma** — Passer par le validateur Schema.org (`https://validator.schema.org/`). Zéro erreur requise. Les avertissements sont acceptables mais doivent être minimisés.

3. **Déployer sur la page** — La méthode d'injection dépend du CMS :
   - **WordPress** : Utiliser le champ méta `rank_math_schema_Article`, ou injecter via l'action `wp_head` dans un plugin personnalisé, ou ajouter au filtre de sortie de schéma Yoast
   - **Webflow** : Injecter dans la section Custom Code de la page (head ou body), ou intégrer en texte enrichi via un bloc de code personnalisé
   - **CMS personnalisé** : Ajouter `<script type="application/ld+json">` dans le `<head>` de la page

4. **Vérifier avec le Rich Results Test** — `https://search.google.com/test/rich-results` — confirmer que tous les types de schéma sont détectés et éligibles aux résultats enrichis. Capturer le résultat en écran pour la documentation.

5. **Surveiller dans GSC** — Vérifier les rapports Améliorations : `Données structurées non analysables`, `Product`, `Breadcrumb` (les rapports `FAQ` et `How-to` ont été retirés par Google en même temps que ces résultats enrichis). Alerter sur toute nouvelle erreur dans les 7 jours suivant le déploiement.

---

## 6. Surveillance de classement et suivi des fonctionnalités SERP

### Configuration de la surveillance de classement

- **Définition de la liste de mots-clés** : Regrouper par niveau de priorité :
  - **Niveau 1** (marque + termes principaux, 10-30 mots-clés) : Suivi quotidien. Alerter sur tout changement de position >3 positions
  - **Niveau 2** (longue traîne à forte intention, 30-100 mots-clés) : Suivi 3x/semaine. Alerter sur une baisse >5 positions
  - **Niveau 3** (informationnel + découverte, 100-500 mots-clés) : Suivi hebdomadaire. Alerter sur une baisse >10 positions ou une sortie de la page 1
- **Capture de référence** : Enregistrer les positions initiales, les fonctionnalités SERP présentes, l'URL classée, la date
- **Source de données** : API de performance GSC (`POST /searchAnalytics/query`) avec les dimensions `query`, `page`, `date`, `device`, `country`
- **Alertes** : Calculer le delta de position entre la vérification actuelle et précédente. Déclencher des alertes selon les seuils par niveau ci-dessus

### Méthodologie de suivi des fonctionnalités SERP

| Fonctionnalité | Méthode de détection | Signal d'optimisation |
|---|---|---|
| **AI Overview** | Rechercher le mot-clé cible sur Google, vérifier la présence d'un résumé généré par IA au-dessus des résultats organiques | Contenu cité dans l'AI Overview = signal d'autorité élevé. Suivre la présence de citation. |
| **Extrait optimisé (Featured Snippet)** | Données GSC : filtrer par `searchAppearance = RICH_RESULT`. Manuel : rechercher et vérifier la position 0 | Optimiser le format de contenu : paragraphe (40-60 mots), liste (5-8 éléments), tableau (3+ lignes) |
| **Autres questions posées (People Also Ask)** | Observation manuelle de recherche. Suivre quelles questions PAA apparaissent pour les mots-clés cibles | Créer du contenu FAQ ciblant les questions PAA. Utiliser la question exacte comme H2/H3 |
| **Bloc de connaissances (Knowledge Panel)** | Rechercher le nom de marque. Vérifier la présence d'un panneau latéral droit | Renforcer les signaux d'entité : Wikidata, Google Business Profile, données structurées |
| **Pack local (Local Pack)** | Rechercher avec un modificateur d'intention locale. Vérifier la présence d'une carte + de résultats à 3 | Optimisation GBP, schéma local, cohérence des citations |
| **Carrousel vidéo** | Rechercher et vérifier la présence de résultats vidéo | Créer du contenu vidéo pour les mots-clés montrant une intention vidéo |
| **Pack d'images** | Rechercher et vérifier la présence de résultats d'images en ligne | Optimiser le texte alt des images, les noms de fichiers, le contexte environnant |

### Détection et renouvellement de la décroissance de contenu

1. **Identifier le contenu en décroissance** : Extraire les données GSC des 6 derniers mois. Signaler les pages où les clics ont chuté >30 % ou où la position moyenne s'est dégradée de plus de 5 positions par rapport au pic
2. **Prioriser par impact** : Trier les pages en décroissance par trafic de pic (le plus fort trafic passé = la plus haute priorité)
3. **Checklist de renouvellement** :
   - Mettre à jour les statistiques, dates et références obsolètes
   - Ajouter de nouvelles sections couvrant les sous-sujets pour lesquels les concurrents se classent désormais
   - Renouveler les liens internes (ajouter des liens vers/depuis un contenu plus récent)
   - Mettre à jour le titre méta et la description si le CTR a décliné
   - Ajouter ou mettre à jour le balisage de schéma
   - Renouveler les images et le texte alt
4. **Ré-indexer** : Après le renouvellement, soumettre l'URL via l'API d'indexation. Surveiller la reprise de position sur 2 à 4 semaines
5. **Documenter le résultat** : Consigner les métriques pré-renouvellement, les changements effectués, les métriques post-renouvellement aux marques de 2 et 4 semaines

---

## 7. Exécution SEO technique

### Gestion du Robots.txt

- **WordPress** : Éditer via `Réglages > Lecture` ou édition directe du fichier à la racine du site. Utiliser `Disallow` pour les chemins de contenu léger/dupliqué, les répertoires de staging, les résultats de recherche interne
- **Webflow** : Non directement éditable via API. Géré dans Paramètres du projet > SEO > Robots.txt
- **Règles critiques** : Ne jamais bloquer les fichiers CSS/JS (Googlebot en a besoin pour le rendu). Toujours inclure la directive `Sitemap:` pointant vers l'URL du sitemap XML

### Gestion des balises canoniques

- **Canoniques auto-référençantes** : Chaque page indexable devrait avoir une canonique auto-référençante. Vérifier via le code source de la page ou l'API d'inspection d'URL
- **Canoniques inter-domaines** : À utiliser lors de la syndication de contenu. Définir la canonique sur la copie syndiquée pointant vers l'original
- **Pagination** : Utiliser `rel="canonical"` pointant vers la page paginée elle-même (pas vers la page 1). Google a déprécié `rel="next/prev"` mais la canonique par page reste valide
- **Erreurs courantes** : Canoniques HTTP/HTTPS mixtes, incohérences de barre oblique finale, canonique pointant vers une URL redirigée, canonique pointant vers une page non-200

### Implémentation Hreflang

- **Format** : `<link rel="alternate" hreflang="en-us" href="https://example.com/page" />`
- **Requis** : Balise hreflang auto-référençante sur chaque page de l'ensemble. Balise `x-default` pour le sélecteur de langue/région ou la page par défaut
- **Validation** : Chaque hreflang doit avoir une balise réciproque sur la page cible. Les balises hreflang non réciproques sont ignorées par Google
- **Options de déploiement** : Balises `<head>` HTML (petits sites), en-têtes HTTP (fichiers non-HTML), éléments `<xhtml:link>` du sitemap XML (grands sites, recommandé)

### Cadre de test A/B des balises de titre

1. **Sélectionner les pages de test** : Choisir des pages avec un trafic stable (>100 clics/semaine) et un classement cohérent
2. **Référence** : Enregistrer le titre actuel, le CTR, la position moyenne, les clics pendant 4 semaines
3. **Implémenter le changement** : Mettre à jour la balise de titre via l'API du CMS. Documenter le changement exact et l'horodatage
4. **Période de mesure** : 4 semaines minimum. Contrôler les changements de position (la comparaison de CTR n'est valide qu'à des positions similaires)
5. **Critères de décision** : Amélioration du CTR statistiquement significative (utiliser un test du khi-carré, p < 0,05). Si le CTR s'améliore de >10 % relativement avec une position stable, conserver le nouveau titre. Si négatif ou non concluant, revenir en arrière
6. **Protocole de retour en arrière** : Restaurer le titre d'origine via l'API du CMS dans les 24 heures suivant la décision. Resoumettre l'URL pour indexation

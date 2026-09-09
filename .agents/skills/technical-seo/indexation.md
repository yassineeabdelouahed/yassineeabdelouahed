# Indexation — Canoniques, meta robots, contenu dupliqué et gestion de l'index

Une référence complète pour contrôler quelles pages les moteurs de recherche indexent, résoudre le contenu dupliqué, gérer la couverture d'index, et accélérer l'indexation du nouveau contenu. La gestion de l'indexation garantit que les index des moteurs de recherche ne contiennent que les pages que vous souhaitez classer, sans duplication, sans gonflement, et sans autorité gaspillée.

---

## Balises canoniques

### Objectif

L'élément de lien `rel="canonical"` indique aux moteurs de recherche quelle URL est la version préférée (canonique) d'une page lorsque plusieurs URL servent un contenu identique ou substantiellement similaire. Il consolide les signaux de classement (backlinks, PageRank) sur l'URL canonique.

### Mise en œuvre

**Élément lien HTML (le plus courant) :**
```html
<link rel="canonical" href="https://example.com/preferred-page">
```

**En-tête HTTP (pour les ressources non-HTML comme les PDF) :**
```
Link: <https://example.com/preferred-page>; rel="canonical"
```

### Règles des balises canoniques

1. **Canoniques auto-référencées** : chaque page indexable doit avoir une balise canonique pointant vers elle-même. Cela évite les problèmes liés aux paramètres d'URL, codes de suivi, ou ID de session créant des URL dupliquées que Google découvre via des liens externes
2. **La canonique doit être une URL absolue** : `href="https://example.com/page"` et non `href="/page"`
3. **La canonique doit pointer vers une page avec statut 200** : ne pas canonicaliser vers une page 301, 404, ou 5xx
4. **La canonique doit correspondre au protocole** : les pages HTTPS doivent canonicaliser vers des URL HTTPS
5. **La canonique est un indice, pas une directive** : Google peut choisir de l'ignorer si d'autres signaux la contredisent (par ex. les liens internes pointent principalement vers une URL différente)
6. **Une seule canonique par page** : plusieurs balises canoniques sur la même page amènent Google à toutes les ignorer

### Erreurs courantes de canonique

| Erreur | Impact | Correctif |
|---|---|---|
| La canonique pointe vers une page noindex | Signaux conflictuels — Google peut ignorer les deux | Retirer noindex de la cible canonique, ou changer la canonique vers une page indexable |
| La canonique pointe vers une page 404/410 | Le signal canonique est ignoré ; la page peut être indexée indépendamment | Mettre à jour la canonique vers une page active et pertinente |
| Canonique vers une URL redirigée | Google peut suivre la redirection et utiliser la destination finale, mais cela ajoute une ambiguïté inutile | Faire pointer la canonique directement vers l'URL de destination finale |
| Chaîne de canoniques (A canonicalise vers B, B canonicalise vers C) | Google peut résoudre correctement mais des délais de traitement surviennent ; les longues chaînes peuvent être abandonnées | Faire pointer A directement vers C |
| URL relatives dans la canonique | Interprétées relativement à l'URL actuelle — peuvent se résoudre incorrectement selon les modèles | Toujours utiliser des URL absolues |
| Canonique entre des pages très différentes | Google ignore la canonique car le contenu ne correspond pas | Ne canonicaliser qu'entre des pages au contenu substantiellement similaire |
| Absence de canonique auto-référencée | Les variations de paramètres et URL de suivi peuvent être indexées comme des doublons | Ajouter une canonique auto-référencée à chaque modèle de page indexable |
| Canonique dans le `<body>` plutôt que dans le `<head>` | Google peut ne pas la traiter | S'assurer que la balise canonique est dans l'élément `<head>` |

### Canoniques cross-domain

Utilisées lorsque le même contenu existe sur plusieurs domaines (syndication, multi-marque, sites régionaux) :

```html
<!-- Sur syndication-partner.com -->
<link rel="canonical" href="https://original-publisher.com/article">
```

Les canoniques cross-domain sont un indice plus fort que celles au sein d'un même domaine, et Google les respecte généralement lorsque le contenu est réellement identique. Le domaine canonicalisé transmet les signaux de classement au domaine canonique.

---

## Directives meta robots

### Directives disponibles

| Directive | Signification |
|---|---|
| `index` | Autoriser l'indexation de cette page (comportement par défaut ; rarement nécessaire de l'expliciter) |
| `noindex` | Ne pas afficher cette page dans les résultats de recherche. Contrôle d'indexation le plus fort |
| `follow` | Suivre les liens sur cette page (comportement par défaut) |
| `nofollow` | Ne suivre aucun lien sur cette page à des fins de classement |
| `noarchive` | Ne pas afficher de copie en cache de cette page dans les résultats de recherche |
| `nosnippet` | Ne pas afficher d'extrait de texte ni d'aperçu vidéo dans les résultats de recherche |
| `max-snippet:[n]` | Limiter l'extrait de texte à n caractères |
| `max-image-preview:[size]` | Limiter la taille de l'aperçu d'image : `none`, `standard`, `large` |
| `max-video-preview:[n]` | Limiter l'aperçu vidéo à n secondes |
| `notranslate` | Ne pas proposer de traduction de cette page dans les résultats de recherche |
| `noimageindex` | Ne pas indexer les images sur cette page |
| `unavailable_after:[date]` | Ne pas afficher cette page après la date spécifiée |

### Mise en œuvre

**Balise meta HTML :**
```html
<meta name="robots" content="noindex, follow">
```

**Crawler spécifique :**
```html
<meta name="googlebot" content="noindex">
<meta name="bingbot" content="noindex">
```

**En-tête HTTP X-Robots-Tag** (fonctionne pour tous les types de fichiers, pas seulement le HTML) :
```
X-Robots-Tag: noindex, follow
```

### Quand utiliser noindex vs robots.txt vs canonical

| Objectif | Utiliser | Raison |
|---|---|---|
| La page ne doit jamais apparaître dans les résultats de recherche | `noindex` | Retrait définitif de l'index une fois crawlée |
| La page ne doit pas être crawlée du tout (économiser le budget de crawl) | `robots.txt Disallow` | Empêche le crawl, mais la page peut quand même être indexée si liée en externe |
| Plusieurs URL pour le même contenu — en choisir une gagnante | `canonical` | Consolide les signaux vers l'URL préférée |
| Retirer temporairement une page de la recherche | Outil de suppression d'URL de GSC + noindex | L'outil de suppression est rapide (heures) mais temporaire (6 mois) ; noindex est permanent |
| Contenu définitivement supprimé | Code de statut `410 Gone` | Indique à Google que la page a disparu définitivement ; plus rapide que noindex pour la désindexation |

**Distinction critique** : robots.txt bloque le crawl mais pas l'indexation. Si une page bloquée par robots.txt a des backlinks externes, Google peut l'indexer uniquement sur la base du texte d'ancre (apparaissant comme « Aucune information n'est disponible pour cette page » dans les résultats de recherche). Pour empêcher l'indexation, utiliser noindex — mais la page doit être crawlable pour que Google voie la balise noindex.

---

## Couverture d'index dans Google Search Console

### Catégories de statut

| Statut | Signification | Action |
|---|---|---|
| **Valide** | La page est indexée et peut apparaître dans les résultats de recherche | Surveiller les changements. Vérifier que ce sont bien des pages que vous voulez voir indexées |
| **Valide avec avertissements** | La page est indexée mais présente des problèmes pouvant affecter la visibilité | Examiner les avertissements (par ex. indexée mais bloquée par robots.txt) |
| **Exclue** | La page n'est pas indexée — peut être intentionnel ou problématique | Examiner les raisons d'exclusion ci-dessous |
| **Erreur** | La page a des problèmes empêchant une indexation correcte | Corriger les erreurs serveur, les erreurs de redirection, ou les anomalies de crawl |

### Raisons d'exclusion courantes et correctifs

| Raison d'exclusion | Signification | Action |
|---|---|---|
| **Exclue par la balise noindex** | La page a une meta noindex — intentionnel si vous l'avez définie | Vérifier que c'est intentionnel. Sinon, retirer la balise noindex |
| **Bloquée par robots.txt** | Robots.txt empêche le crawl | Si intentionnel, c'est correct. Si la page devrait être indexée, mettre à jour robots.txt |
| **Explorée mais non indexée actuellement** | Google a crawlé mais a choisi de ne pas indexer (problème de qualité/pertinence) | Améliorer la qualité du contenu, ajouter des liens internes, construire des backlinks. Google dit ici « je l'ai vue mais ce n'est pas assez bon » |
| **Découverte, actuellement non indexée** | Google sait que l'URL existe mais ne l'a pas encore crawlée | Fréquent pour les pages nouvelles/à faible autorité. Améliorer le maillage interne, soumettre dans le sitemap, demander l'indexation via l'inspection d'URL |
| **Autre page avec balise canonique appropriée** | La page canonicalise vers une autre URL — comportement attendu | Vérifier que la cible canonique est correcte et indexée |
| **Doublon sans URL canonique désignée par l'utilisateur** | Google a trouvé du contenu dupliqué et a choisi sa propre canonique | Vérifier si le choix de Google correspond à votre intention. Sinon, renforcer les signaux canoniques (liens internes, sitemap, balise canonique explicite) |
| **Doublon, Google a choisi une autre URL canonique** | Vous avez défini une canonique mais Google n'était pas d'accord | Examiner pourquoi — le contenu peut ne pas être assez similaire, ou la cible canonique peut avoir des problèmes. Renforcer les signaux sur votre canonique préférée |
| **Page avec redirection** | L'URL redirige vers une autre page | Attendu pour les URL redirigées. Vérifier que les cibles de redirection sont correctes |
| **Soft 404** | La page renvoie 200 mais Google pense qu'il s'agit d'un 404 (contenu vide ou quasi vide) | Renvoyer un code de statut 404/410 approprié, ou ajouter du contenu substantiel à la page |
| **Introuvable (404)** | La page renvoie un statut 404 | Si intentionnel, le 404 finira par sortir de l'index. Si la page devrait exister, corriger l'URL ou mettre en place une redirection |

---

## Gestion du contenu dupliqué

### Types de contenu dupliqué

**Doublons exacts** : contenu identique accessible via plusieurs URL
- `http://` vs `https://`
- `www.` vs non-www
- Barre oblique finale vs pas de barre oblique finale
- Paramètres d'URL (suivi, session, tri)
- `index.html` vs `/`
- URL en majuscules vs minuscules

**Quasi-doublons** : contenu substantiellement similaire avec des variations mineures
- Pages produit ne différant que par le choix de couleur/taille
- Pages de localisation avec du contenu standard et seulement le nom de la ville changé
- Contenu paginé où le texte d'introduction se répète sur les pages
- Versions imprimables des pages
- URL spécifiques au mobile (m.example.com)

**Doublons syndiqués** : même contenu sur différents domaines
- Contenu republié sur des sites partenaires
- Communiqués de presse sur des services de fil de presse
- Descriptions de produits fournies par les fabricants

### Stratégies de résolution

| Type de doublon | Stratégie | Mise en œuvre |
|---|---|---|
| Variations de protocole/www/barre oblique | Redirection 301 vers la version canonique | Configuration serveur (règles de redirection nginx/Apache) |
| Variations de paramètres | Canonique auto-référencée sur l'URL propre | Balise canonique sur chaque modèle de page |
| Versions imprimables | Canonique vers la page principale ou noindex | Balise canonique sur les pages d'impression |
| Pages de localisation quasi-dupliquées | Contenu unique par page (minimum 60-70 % unique) | Investir dans du contenu spécifique à la localisation |
| Contenu syndiqué | Canonique cross-domain vers l'éditeur original | Balise canonique sur les pages du partenaire de syndication |
| Contenu paginé | Canonique auto-référencée par page OU canonique « tout afficher » | Dépend du nombre de pages (voir site-architecture.md) |
| Contenu traduit (même langue) | Choisir une version ; canonicaliser vers elle | Balise canonique ; ne pas utiliser hreflang pour des doublons de même langue |

---

## Gonflement de l'index

### Qu'est-ce que c'est

Le gonflement de l'index survient lorsqu'un moteur de recherche indexe significativement plus de pages que le site n'a de contenu unique et de valeur. Symptômes courants :
- Le nombre de pages indexées dans GSC est 2x+ supérieur au nombre de pages dans le sitemap
- Un grand nombre de pages légères ou dupliquées apparaissent dans l'index
- Des pages importantes sont en concurrence avec des pages à faible valeur pour les classements

### Sources courantes de gonflement de l'index

| Source | Exemple | Risque d'échelle |
|---|---|---|
| Navigation à facettes | Chaque combinaison de filtre génère une URL indexable | Extrême (des centaines de milliers à des millions) |
| Résultats de recherche interne | Pages `/search?q=*` indexées pour chaque requête | Élevé |
| Pages de tags/archives | Pages de tags WordPress avec 1-2 articles chacune | Moyen |
| Pagination | Pages paginées profondes (page 50+) sans valeur unique | Moyen |
| Archives de calendrier/date | Pages d'archives de date vides ou quasi vides | Moyen |
| Pages de profil utilisateur | Pages de profil public légères sur les plateformes UGC | Élevé |
| Variations de paramètres | Paramètres de suivi, session, devise, langue | Élevé |
| Environnements de staging/développement | Staging.example.com indexé par Google | Moyen |
| Doublons PDF et fichiers | Même contenu que les pages HTML mais au format PDF | Faible-moyen |

### Processus de nettoyage du gonflement de l'index

1. **Auditer l'index** : comparer le nombre de pages indexées dans GSC au nombre d'URL de votre sitemap. Un ratio supérieur à 1,5:1 suggère un gonflement
2. **Identifier les sources de gonflement** : utiliser le rapport de couverture d'index de GSC, l'opérateur de recherche site:, et les données de crawl pour catégoriser les URL indexées par type de modèle
3. **Prioriser par volume** : traiter en premier les plus grandes sources de gonflement (navigation à facettes avant les pages de tags)
4. **Appliquer des contrôles** :
   - `noindex, follow` sur les pages ayant une valeur de lien mais ne devant pas se classer
   - `robots.txt Disallow` sur les motifs d'URL qui ne doivent jamais être crawlés
   - `canonical` pour consolider les pages dupliquées/quasi-dupliquées
   - `410 Gone` pour les pages devant être définitivement supprimées
   - `rel="canonical"` vers la page « tout afficher » ou principale pour les séries paginées
5. **Nettoyer les sitemaps** : retirer toutes les URL non indexables des sitemaps XML
6. **Surveiller** : suivre le nombre de pages indexées chaque semaine. Attendre une diminution progressive sur 4 à 8 semaines à mesure que Google recrawle et désindexe les pages

---

## Indexation du nouveau contenu

### Comment accélérer l'indexation des nouvelles pages

**Niveau 1 : fort impact (à faire immédiatement)**
- Ajouter des liens internes depuis des pages à forte autorité et fréquemment crawlées (page d'accueil, pages de catégorie, articles de blog populaires)
- Inclure la nouvelle URL dans le sitemap XML avec une date `lastmod` précise
- Utiliser l'outil d'inspection d'URL de Google Search Console > « Demander l'indexation » (limité à environ 10-20 demandes par jour)

**Niveau 2 : complémentaire (à faire dans les 24 heures)**
- Partager l'URL sur les réseaux sociaux (Google découvre les URL via les plateformes sociales)
- S'assurer que le sitemap est soumis dans GSC et référencé via une directive `Sitemap:` dans robots.txt (l'ancien point de terminaison de ping de sitemap `google.com/ping` a été fermé en 2023)
- Pour Bing et Yandex, soumettre les nouvelles URL via IndexNow pour une découverte quasi instantanée
- Si le site utilise l'API d'indexation de Google (éligible pour les offres d'emploi et le contenu de diffusion en direct), soumettre via l'API (bien plus rapide que le crawl standard)

**Niveau 3 : long terme (continu)**
- Maintenir un taux de crawl sain en gardant le site rapide et sans erreur
- Construire des backlinks externes vers le nouveau contenu
- Publier du contenu de façon régulière (les sites avec un calendrier de publication régulier sont crawlés plus fréquemment)
- Garder les sitemaps XML précis (aucune URL cassée, dates lastmod précises)

### Attentes de délai d'indexation

| Autorité du site | Indexation de la nouvelle page | Facteurs |
|---|---|---|
| Élevée (domaine établi, fort profil de backlinks) | Minutes à heures | Google crawle fréquemment ; le nouveau contenu est découvert rapidement via les liens internes |
| Moyenne (domaine en croissance, autorité modérée) | Heures à jours | Calendrier de crawl régulier ; le sitemap et les liens internes aident |
| Faible (nouveau domaine, peu de backlinks) | Jours à semaines | Crawl peu fréquent ; l'inspection d'URL et la soumission de sitemap sont critiques |
| Très faible (domaine tout nouveau, aucun backlink) | Semaines à mois | Google peut avoir besoin de plusieurs cycles de crawl avant l'indexation ; se concentrer sur la construction d'autorité |

### API d'indexation de Google

L'API d'indexation fournit une indexation quasi instantanée (minutes) mais n'est officiellement prise en charge que pour :
- les pages avec données structurées `JobPosting`
- les pages avec données structurées `BroadcastEvent` (diffusion en direct)

Certains SEO l'utilisent pour des types de contenu plus larges avec des résultats mitigés. Google a déclaré qu'elle n'est destinée qu'aux types pris en charge. Pour la plupart des sites, la fonction « Demander l'indexation » de l'outil d'inspection d'URL est la méthode d'indexation manuelle recommandée.

---

## Outils et processus de suppression d'URL

### Suppression temporaire (Google Search Console)

- **Outil de suppression d'URL** : masque temporairement une URL des résultats de recherche Google pendant environ 6 mois
- À utiliser pour : suppression d'urgence de contenu sensible, pages obsolètes nécessitant du temps pour être corrigées
- NE supprime PAS définitivement la page de l'index — la page doit aussi avoir noindex ou renvoyer 404/410 pour une suppression permanente

### Méthodes de suppression permanente

| Méthode | Vitesse | Permanence | Cas d'usage |
|---|---|---|---|
| Balise meta `noindex` | Jours à semaines (prochain crawl) | Permanent tant que la balise est présente | Pages devant exister mais ne pas se classer |
| Code de statut `410 Gone` | Jours à semaines | Permanent (Google retire de l'index) | Contenu définitivement supprimé sans remplacement |
| `404 Not Found` | Semaines à mois | Finit par sortir de l'index | Le contenu n'existe plus |
| `301 Redirect` | Jours à semaines | L'ancienne URL est remplacée par la nouvelle dans l'index | Contenu déplacé vers une nouvelle URL |
| Outil de suppression d'URL + noindex | Heures (suppression) + permanent (noindex) | Permanent | Suppression urgente de contenu sensible/nuisible |

### Suppression de contenu obsolète

Google fournit un outil séparé « Supprimer le contenu obsolète » pour demander la suppression de contenu en cache qui ne reflète plus la page en ligne. Utilisé lorsque :
- L'extrait d'une page dans les résultats de recherche affiche des informations obsolètes
- Une page a été mise à jour mais le cache de Google ne s'est pas actualisé
- Une page supprimée apparaît encore dans les résultats de recherche pour d'autres utilisateurs pouvant demander la suppression

Cet outil est disponible pour tous, pas seulement les propriétaires de site : `https://search.google.com/search-console/remove-outdated-content`
</content>

---
name: technical-seo
description: "Module de connaissances SEO technique approfondi couvrant les Core Web Vitals, la crawlabilité, l'indexation, l'architecture de site, le SEO JavaScript, les redirections, les données structurées, le hreflang et les migrations — produisant des rapports d'audit, des cartes de redirection, des spécifications robots.txt et JSON-LD, et des checklists de migration. Se déclenche sur \"/digital-marketing-pro:technical-seo\", \"my LCP is failing\", \"plan a site migration\", \"fix redirect chains\", \"write schema markup for my pages\", \"crawl budget problems\". Lit le profil de marque ainsi que ses propres fichiers de référence (core-web-vitals, crawlability, site-architecture, indexation, international-seo) et alimente la commande /digital-marketing-pro:tech-seo-audit."
---

# Technical SEO

## Quand utiliser cette compétence

Activer ce module lorsque la demande de l'utilisateur concerne l'un des points suivants :

- **Core Web Vitals** : optimiser les scores LCP, INP ou CLS ; diagnostiquer des problèmes de vitesse de page ; interpréter les données CrUX ou les rapports PageSpeed Insights
- **Crawlabilité** : configuration de robots.txt, création ou audit de sitemap XML, gestion du budget de crawl, ou problèmes d'accès de Googlebot
- **Architecture de site** : planification de la structure des URL, architecture de l'information, stratégie de maillage interne, optimisation de la profondeur du site, ou silotage de contenu
- **Indexation** : implémentation des balises canoniques, directives noindex/nofollow, gonflement de l'index, résolution de contenu dupliqué, ou problèmes de couverture d'index dans Google Search Console
- **Redirections** : audit des chaînes de redirection, stratégie 301/302, cartes de redirection pour les migrations de site, ou migration HTTP vers HTTPS
- **SEO JavaScript** : problèmes de rendu côté client, évaluation SSR vs CSR vs SSG, rendu dynamique, ou problèmes de crawlabilité JavaScript
- **Indexation mobile-first** : problèmes de rendu mobile, vérifications de parité mobile, audit du design responsive, ou erreurs d'utilisabilité mobile
- **Données structurées** : implémentation du balisage schema (JSON-LD), éligibilité aux résultats enrichis, validation de schema, ou stratégie de données structurées
- **Analyse de fichiers journaux** : interprétation des logs serveur, analyse de fréquence de crawl, identification du gaspillage de crawl, ou audit du comportement des bots
- **SEO international** : implémentation du hreflang, décisions ccTLD vs sous-domaine vs sous-répertoire, ciblage géographique, ou architecture de site multilingue
- **Sécurité** : migration HTTPS, résolution de contenu mixte, implémentation de HSTS, ou configuration des en-têtes de sécurité
- **Codes de statut HTTP** : diagnostic des erreurs 4xx/5xx, détection des soft 404, schémas d'erreur serveur, ou stratégie de codes de statut
- **Vitesse de page** : temps de réponse serveur (TTFB), ressources bloquant le rendu, optimisation d'images, découpage de code, ou configuration CDN
- **Migrations de site** : changements de domaine, migrations de plateforme, transitions HTTPS, restructuration d'URL, ou consolidation de sites suite à une fusion/acquisition

**Expressions déclenchantes** : « technical seo », « core web vitals », « page speed », « crawl budget », « robots.txt », « sitemap », « redirect », « canonical », « indexation », « noindex », « hreflang », « javascript seo », « mobile-first indexing », « log file analysis », « site architecture », « internal linking », « crawl errors », « HTTP status », « schema markup », « structured data », « site migration », « TTFB », « LCP », « INP », « CLS », « render blocking », « crawlability », « index bloat », « redirect chain », « mixed content », « HTTPS »

## Efficacité de contexte

Compétence lourde. **Grep avant Read** pour tout fichier référencé, puis `Read` uniquement les plages trouvées avec `offset` + `limit`. Lister `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. Lors d'une réinvocation en cours de session, ignorer les fichiers déjà en contexte.

## Contexte de marque (appliqué automatiquement)

Avant de produire toute sortie marketing depuis ce module :

1. **Vérifier le contexte de session** — le résumé de la marque active a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents indiqués à cet endroit.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et le choix des mots de tout le contenu
4. **Vérifier la conformité** — appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — référencer `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les allégations restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les adaptations de ton spécifiques à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les taglines et le langage de positionnement ; `voice-and-tone.md` pour des règles de voix détaillées au-delà des 4 scores numériques. Lors de la production de contenu pour un canal spécifique, les règles de style du canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations déjà présentes dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail SEO technique, rassembler :

1. **URL du site** : le domaine à auditer ou optimiser
2. **CMS / Plateforme** : WordPress, Shopify, Webflow, sur mesure, headless, etc. — détermine les voies de mise en œuvre
3. **Environnement d'hébergement** : mutualisé, VPS, dédié, cloud (AWS/GCP/Azure), fournisseur CDN — affecte les recommandations côté serveur
4. **Données de performance actuelles** : accès à Google Search Console, scores PageSpeed Insights, données CrUX, ou rapports d'audit existants
5. **Échelle du site** : nombre approximatif de pages (centaines, milliers, centaines de milliers) — détermine la pertinence du budget de crawl
6. **Méthode de rendu** : HTML statique, rendu côté serveur, rendu côté client (React/Angular/Vue), hybride (Next.js/Nuxt) — critique pour le SEO JavaScript
7. **Présence internationale** : pays et langues cibles, structure d'URL actuelle pour les versions internationales
8. **Problèmes connus** : problèmes existants dont l'utilisateur a connaissance (erreurs de crawl, baisses d'indexation, plaintes de lenteur, pertes de classement)
9. **Plans de migration** : tout changement de domaine, migration de plateforme, ou restructuration d'URL à venir
10. **Contraintes de stack technique** : disponibilité de l'équipe de développement, processus de déploiement, limitations CDN, restrictions de plugins/extensions

Pour les demandes de diagnostic rapide (par ex. « pourquoi ma page est lente »), déduire des valeurs par défaut raisonnables et livrer immédiatement. Pour les audits complets, rassembler le contexte complet.

## Capacités

- **Optimisation des Core Web Vitals** : diagnostiquer et corriger les problèmes de LCP (cible < 2,5 s), d'INP (cible < 200 ms) et de CLS (cible < 0,1) avec des recommandations précises et prêtes à mettre en œuvre ; interpréter les écarts entre données terrain (CrUX) et données labo (Lighthouse) ; prioriser les correctifs par impact utilisateur
- **Audits de crawlabilité** : analyse et optimisation de robots.txt, structure et validation du sitemap XML, allocation du budget de crawl pour les grands sites, identification du gaspillage de crawl, détection de pages orphelines, et optimisation des chemins de crawl
- **Conception de l'architecture de site** : planification de la structure d'URL (plate vs hiérarchique), architecture de l'information via clusters thématiques et silos de contenu, stratégie de maillage interne avec modélisation du flux de PageRank, optimisation de la profondeur de clic (pages critiques à moins de 3 clics), et implémentation du fil d'Ariane
- **Optimisation du maillage interne** : analyse de la distribution du link equity, stratégie de placement de liens contextuels, optimisation du texte d'ancre, audit de la structure de navigation, stratégie de liens en pied de page et en barre latérale, et récupération des pages orphelines
- **Gestion de l'indexation** : stratégie de balises canoniques (auto-référencées, cross-domain, URL paramétrées), implémentation des directives meta robots, en-têtes HTTP X-Robots-Tag, diagnostic de la couverture d'index via GSC, identification et nettoyage du gonflement de l'index, et accélération de l'indexation du nouveau contenu
- **SEO JavaScript** : évaluation du rendu côté client, conseils de mise en œuvre du rendu côté serveur, recommandations de génération de site statique, rendu dynamique en solution de repli, vérification du rendu par Googlebot, analyse de l'impact JavaScript sur le budget de crawl, et diagnostic des problèmes d'hydratation
- **Indexation mobile-first** : vérifications de parité de rendu mobile, validation du design responsive, résolution des erreurs d'utilisabilité mobile, dimensionnement des zones tactiles, configuration du viewport, et optimisation de la vitesse de page mobile
- **Optimisation de la vitesse de page** : réduction du TTFB (réglage serveur, CDN, cache), élimination des ressources bloquant le rendu, optimisation d'images (choix de format, chargement différé, images responsives, préchargement), minification et découpage de code CSS/JS, audit des scripts tiers, et stratégie de chargement des polices (font-display, préchargement, sous-ensembles)
- **Gestion des redirections** : détection et résolution des chaînes de redirection, cadre de décision 301 vs 302, création de cartes de redirection pour les migrations, identification des boucles de redirection, et analyse de l'impact des redirections sur la performance
- **Audit des codes de statut HTTP** : diagnostic et résolution des erreurs 4xx, analyse des schémas d'erreurs serveur 5xx, détection des soft 404, implémentation du 410 Gone pour le contenu définitivement supprimé, et stratégie de surveillance des codes de statut
- **Conseils d'analyse de fichiers journaux** : analyse de la fréquence et des schémas de crawl de Googlebot, identification du gaspillage de crawl (crawl d'URL non indexables), répartition des codes de réponse, évaluation de l'utilisation du budget de crawl, et ratios de trafic bot vs humain
- **Implémentation des données structurées** : balisage schema JSON-LD pour les types Organization, Product, Article, FAQ, HowTo, BreadcrumbList, LocalBusiness, Event et Review ; évaluation de l'éligibilité aux résultats enrichis ; validation et test du schema ; modèles de schema imbriqués et avancés
- **SEO technique international** : implémentation du hreflang (méthodes lien HTML, en-tête HTTP, sitemap XML), cadre de décision ccTLD vs sous-domaine vs sous-répertoire, configuration du ciblage géographique, ciblage de langue et de région, et stratégie de sitemap international
- **Sécurité et HTTPS** : planification de la migration HTTPS, détection et résolution de contenu mixte, implémentation de HSTS, configuration des en-têtes de sécurité (CSP, X-Frame-Options, X-Content-Type-Options), et gestion des certificats
- **Stratégie de sitemap XML** : structure de sitemap pour les grands sites (index de sitemaps), sitemaps d'images et de vidéos, sitemaps d'actualités, conseils sur priority et changefreq, génération dynamique de sitemap, et soumission/surveillance du sitemap
- **Optimisation de la structure d'URL** : lisibilité des URL et inclusion de mots-clés, gestion des paramètres, cohérence des barres obliques finales, sensibilité à la casse des URL, et optimisation de la longueur des URL

## Processus

**Flux principal : audit et optimisation SEO technique**

1. **Instantané de santé du site**
   - Récupérer les Core Web Vitals actuels depuis CrUX ou PageSpeed Insights (LCP, INP, CLS pour mobile et desktop)
   - Examiner le rapport de couverture d'index de Google Search Console (comptes valides, exclus, en erreur, en avertissement)
   - Vérifier les actions manuelles ou problèmes de sécurité dans GSC
   - Noter les statistiques de crawl actuelles (pages crawlées par jour, temps de réponse moyen, erreurs de crawl)
   - Référence : documenter le trafic organique actuel, le nombre de pages indexées, et les positions de classement pour les mots-clés cibles

2. **Analyse de crawlabilité**
   - Examiner robots.txt pour les problèmes de blocage (ressources critiques, CSS/JS, répertoires importants)
   - Valider le sitemap XML (bien formé, toutes les pages importantes incluses, aucune URL non indexable, dans la limite de 50 000 URL / 50 Mo)
   - Évaluer l'allocation du budget de crawl (les crawlers passent-ils du temps sur des pages à faible valeur ?)
   - Vérifier les pièges de crawl (pagination infinie de calendrier, ID de session dans les URL, navigation à facettes générant des millions d'URL)
   - Vérifier que Googlebot peut accéder à toutes les ressources critiques (CSS, JS, images nécessaires au rendu)

3. **Revue de l'indexation**
   - Auditer les balises canoniques sur tous les modèles de page (auto-référencées, cross-domain, URL paramétrées)
   - Vérifier les directives conflictuelles (canonique pointant vers la page A alors que noindex est défini)
   - Examiner les directives meta robots sur tous les modèles
   - Identifier le gonflement de l'index (contenu léger, pages de tags, résultats de recherche interne, variations de paramètres)
   - Vérifier la gestion de la pagination (séries paginées, rel=canonical sur les pages composantes)
   - Vérifier les balises noindex involontaires (fréquentes après une migration de staging vers production)

4. **Évaluation de l'architecture de site**
   - Cartographier la structure d'URL et identifier les problèmes de profondeur (pages critiques au-delà de 3 clics depuis la page d'accueil)
   - Analyser les schémas de maillage interne (pages avec un nombre élevé/faible de liens internes, pages orphelines)
   - Évaluer l'architecture de l'information (regroupement logique, clusters thématiques, silos de contenu)
   - Examiner la structure de navigation (en-tête, pied de page, barre latérale, fil d'Ariane)
   - Vérifier la cohérence du format d'URL (barres obliques finales, sensibilité à la casse, gestion des paramètres)

5. **Analyse approfondie de la vitesse de page**
   - **Optimisation LCP** : identifier l'élément LCP, vérifier le temps de réponse serveur (TTFB < 800 ms), auditer les ressources bloquant le rendu, vérifier l'optimisation des images (format, taille, chargement différé, préchargement pour le contenu au-dessus de la ligne de flottaison)
   - **Optimisation INP** : identifier les tâches longues (> 50 ms), auditer les gestionnaires d'événements, vérifier le blocage du thread principal, examiner l'impact des scripts tiers
   - **Optimisation CLS** : vérifier les images/iframes sans dimensions explicites, l'injection de contenu dynamique au-dessus de la ligne de flottaison, le chargement de polices web causant un décalage de mise en page, les réservations d'emplacements publicitaires
   - Auditer les scripts tiers pour leur impact sur la performance (gestionnaires de balises, analytics, widgets de chat, outils de test A/B)
   - Examiner les en-têtes de cache (Cache-Control, ETag, Expires) et la configuration CDN

6. **Vérification de conformité mobile-first**
   - Vérifier la parité de contenu entre les versions rendues mobile et desktop
   - Vérifier les problèmes de rendu spécifiques au mobile (configuration du viewport, zones tactiles, tailles de police)
   - Tester la vitesse de page mobile séparément (les réseaux mobiles ont une latence plus élevée)
   - Examiner la présence de données structurées sur la version mobile (doit correspondre au desktop)
   - Vérifier le contenu à chargement différé que Googlebot pourrait manquer sur mobile

7. **Évaluation du SEO JavaScript**
   - Déterminer la stratégie de rendu (CSR, SSR, SSG, ISR, hybride)
   - Tester le rendu par Googlebot à l'aide de l'outil d'inspection d'URL (HTML rendu vs HTML brut)
   - Vérifier si le contenu et les liens critiques nécessitent du JavaScript pour se rendre
   - Évaluer l'impact JavaScript sur le budget de crawl (délais de file d'attente de rendu)
   - Examiner le routage côté client et son impact sur la crawlabilité
   - Vérifier que les balises meta et canoniques sont présentes dans le HTML rendu côté serveur (et non injectées par JS)

8. **Audit des chaînes de redirection**
   - Identifier les chaînes de redirection (plus d'un saut) et les boucles de redirection
   - Vérifier l'usage mixte de 301/302 (des 302 qui devraient être des 301)
   - Auditer l'implémentation des redirections HTTPS (HTTP vers HTTPS, www vers non-www ou l'inverse)
   - Vérifier les redirections depuis les anciennes URL après toute migration passée
   - Évaluer l'impact du temps de réponse des redirections sur l'efficacité du crawl

9. **Validation des données structurées**
   - Auditer le balisage schema existant pour les erreurs et avertissements (Google Rich Results Test)
   - Identifier les opportunités de schema manquantes selon les types de contenu
   - Valider la syntaxe et l'imbrication du JSON-LD
   - Vérifier l'éligibilité aux résultats enrichis (FAQ, HowTo, Product, Review, Breadcrumb, etc.)
   - Vérifier que le schema correspond au contenu visible sur la page (aucun balisage caché ou trompeur)

10. **Revue SEO international** (le cas échéant)
    - Valider l'implémentation du hreflang (balises auto-référencées, x-default, liens retour)
    - Vérifier les conflits entre hreflang et balises canoniques
    - Vérifier les paramètres de ciblage géographique dans Google Search Console
    - Évaluer la structure d'URL pour les versions internationales
    - Examiner la localisation du contenu par rapport aux signaux de qualité de traduction

11. **Évaluation de la sécurité**
    - Vérifier l'implémentation complète de HTTPS (aucun contenu mixte)
    - Vérifier la présence et la configuration de l'en-tête HSTS
    - Examiner les en-têtes de sécurité (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
    - Vérifier la validité et la chaîne du certificat SSL
    - Vérifier l'exposition de fichiers sensibles (wp-config.php, .env, .git)

12. **Plan de recommandations priorisé**
    - Noter chaque constat par impact (élevé/moyen/faible) et effort (gain rapide/moyen/projet majeur)
    - Créer une matrice impact/effort pour visualiser la priorité
    - Regrouper les recommandations en : correctifs immédiats (0-48 heures), gains à court terme (1-2 semaines), projets à moyen terme (2-8 semaines), initiatives stratégiques à long terme (2-6 mois)
    - Estimer le potentiel de récupération ou de croissance du trafic pour chaque catégorie de correctif
    - Fournir des spécifications de mise en œuvre pour les 5 éléments les plus prioritaires

## Fichiers de référence

- `core-web-vitals.md` — guides d'optimisation LCP, INP et CLS avec seuils précis, causes courantes, stratégies de correction, méthodologie de mesure, et interprétation données terrain vs données labo
- `crawlability.md` — syntaxe et bonnes pratiques de robots.txt, structure et limites du sitemap XML, gestion du budget de crawl, rendu JavaScript, analyse de fichiers journaux, et détection de pages orphelines
- `site-architecture.md` — bonnes pratiques de structure d'URL, cadres d'architecture de l'information, stratégie de maillage interne, gestion de la pagination, navigation à facettes, fil d'Ariane, et planification de migration de site
- `indexation.md` — implémentation des balises canoniques, directives meta robots, X-Robots-Tag, diagnostic de couverture d'index, gestion du contenu dupliqué, nettoyage du gonflement de l'index, et accélération de l'indexation du nouveau contenu
- `international-seo.md` — stratégies de structure d'URL pour les sites internationaux, méthodes d'implémentation du hreflang avec exemples, erreurs courantes de hreflang, ciblage géographique, localisation de contenu, et parts de marché des moteurs de recherche par pays

## Formats de sortie

| Livrable | Format | Description |
|---|---|---|
| Rapport d'audit SEO technique | Document | Audit complet sur les 12 dimensions avec scores, constats et recommandations priorisées |
| Rapport Core Web Vitals | Document | Analyse spécifique aux CWV avec diagnostic par métrique, spécifications de correctif, et fourchettes d'amélioration attendues |
| Carte de redirection | Feuille de calcul | Correspondance URL source vers URL de destination avec codes de statut et type de redirection pour les migrations |
| Stratégie de sitemap XML | Document + Code | Plan de structure de sitemap avec code de mise en œuvre (index de sitemaps, sitemaps par type, approche de génération) |
| Plan d'architecture de site | Document + description de diagramme | Hiérarchie d'URL, stratégie de maillage interne, structure de silos de contenu, et recommandations de navigation |
| Spécification robots.txt | Code | Fichier robots.txt optimisé avec directives, références de sitemap, et paramètres de crawl-delay |
| Spécification de données structurées | Code (JSON-LD) | Balisage schema prêt à mettre en œuvre pour tous les modèles de page applicables |
| Plan SEO international | Document | Spécification d'implémentation du hreflang, recommandation de structure d'URL, et configuration de ciblage géographique |
| Checklist de migration | Document de checklist | Checklist de surveillance pré-migration, jour de migration, et post-migration avec procédures de retour arrière |
| Plan d'optimisation de la vitesse de page | Document | Correctifs de vitesse priorisés avec détails de mise en œuvre, améliorations LCP/INP/CLS attendues, et plan de test |

## Cas particuliers

### Applications monopage lourdes en JavaScript (React, Angular, Vue)
- **Situation** : le site rend tout le contenu côté client ; Googlebot peut voir des pages vides ou incomplètes
- **Approche** : tester le HTML rendu à l'aide de l'outil d'inspection d'URL de Google et le comparer au HTML source. Si du contenu ou des liens critiques manquent dans la réponse serveur, recommander le SSR (Next.js, Nuxt, Angular Universal) ou la génération de site statique. Si le SSR n'est pas réalisable, évaluer le rendu dynamique comme solution provisoire (Rendertron, prérendu basé sur Puppeteer). S'assurer que les balises meta, canoniques et hreflang sont présentes dans la réponse HTML initiale, et non injectées par JavaScript. Auditer la taille du bundle JavaScript et le temps d'hydratation car ils impactent directement l'INP.

### Grands sites e-commerce (100 000+ pages, navigation à facettes)
- **Situation** : la navigation à facettes génère des millions de combinaisons d'URL ; le budget de crawl est consommé par des pages de paramètres à faible valeur
- **Approche** : implémenter une stratégie de canonicalisation pour les URL à facettes (canonique vers la page de catégorie de base sauf si la facette crée un contenu véritablement unique et de valeur). Utiliser robots.txt ou meta robots pour bloquer le crawl des combinaisons de paramètres à faible valeur. Créer une stratégie de maillage interne organisée qui dirige les crawlers vers les pages à forte valeur. Construire des sitemaps XML séparés pour les pages produit, les pages de catégorie et le contenu éditorial. Surveiller les statistiques de crawl pour vérifier que le budget de crawl est alloué aux pages génératrices de revenus. Envisager un filtrage basé sur AJAX qui ne génère pas d'URL crawlables pour les combinaisons sans valeur.

### Migrations de site web (domaine, plateforme, HTTPS)
- **Situation** : l'entreprise change de domaine, change de plateforme CMS, ou consolide plusieurs sites
- **Approche** : créer une correspondance d'URL complète (ancienne URL vers nouvelle URL) avant la migration. Implémenter des redirections 301 pour chaque URL ayant du trafic organique ou des backlinks. Mettre en place une surveillance des erreurs de crawl, de la couverture d'index, et du trafic organique immédiatement après la migration. Anticiper une baisse temporaire de classement (généralement 2 à 8 semaines pour des migrations bien exécutées). Garder l'ancien domaine/hébergement actif pendant au moins 12 mois pour servir les redirections. Vérifier que tous les liens internes, balises canoniques, sitemaps et balises hreflang référencent la nouvelle structure d'URL. Effectuer un audit technique complet 1 semaine, 1 mois, et 3 mois après la migration.

### Sites multilingues avec exigences hreflang complexes
- **Situation** : le site diffuse du contenu dans plus de 10 langues avec des variantes régionales (par ex. en-US, en-GB, en-AU, es-ES, es-MX)
- **Approche** : utiliser la méthode du sitemap XML pour le hreflang à grande échelle (les balises lien HTML deviennent ingérables au-delà de 20+ versions). S'assurer que chaque page dispose d'un hreflang auto-référencé et d'un repli x-default. Vérifier les liens retour bidirectionnels (si la page A pointe vers la page B avec hreflang, la page B doit pointer en retour vers la page A). Surveiller les conflits de canonique (canonique et hreflang doivent référencer la même URL). Automatiser la génération du hreflang via le CMS ou le système de build pour éviter les erreurs manuelles. Tester avec les outils de test hreflang de Google et surveiller le ciblage international dans GSC.

### Sites avec une dette technique héritée
- **Situation** : des années de problèmes accumulés — HTTP/HTTPS mixte, pages orphelines, chaînes de redirection de 5+ sauts, contenu dupliqué entre sous-domaines, environnements de staging abandonnés indexés par Google
- **Approche** : prioriser par dommage — le gonflement de l'index et le gaspillage de crawl en premier (ils affectent tout le site), puis les chaînes de redirection (elles font perdre du PageRank), puis le contenu mixte (signaux de sécurité et de confiance), puis les pages orphelines (investissement de contenu gaspillé). Ne pas essayer de tout corriger d'un coup. Créer un plan de remédiation par phases : Phase 1 (nettoyage du crawl et de l'index), Phase 2 (consolidation des redirections), Phase 3 (optimisation de l'architecture). Surveiller le trafic organique après chaque phase pour mesurer l'impact et détecter les régressions.

## Compétences liées

- **Content Engine** — la vitesse de page et la crawlabilité affectent directement la découvrabilité du contenu ; les données structurées améliorent l'apparence du contenu dans les SERP ; l'architecture de site détermine comment l'autorité du contenu circule à travers les liens internes
- **Paid Advertising** — les Core Web Vitals et la vitesse de la landing page impactent le Quality Score de Google Ads ; la santé technique des landing pages affecte les taux de conversion et l'efficacité des dépenses publicitaires
- **AEO/GEO Intelligence** — l'implémentation des données structurées renforce la compréhension par les plateformes IA et la probabilité de citation ; l'architecture de site affecte la manière dont les crawlers IA découvrent et interprètent le contenu
- **Analytics & Insights** — les changements SEO techniques nécessitent une mesure via les tableaux de bord de trafic organique, de statistiques de crawl, de couverture d'index et de Core Web Vitals ; les données analytiques guident la priorisation SEO technique
- **CRO** — la vitesse de page est corrélée aux taux de conversion (l'affirmation « chaque amélioration de 100 ms du LCP augmente les conversions d'environ 1 % » est un chiffre illustratif largement répété, pas une mesure universelle — validez-le avec vos propres données de tunnel) ; l'utilisabilité mobile affecte les parcours de conversion ; l'architecture de site détermine l'efficacité du flux utilisateur
</content>

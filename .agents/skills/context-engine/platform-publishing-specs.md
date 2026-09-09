# Spécifications de publication de plateforme — Exigences API et formats de contenu

> **Provenance des références (en date du 2026-08) :** Les chiffres en dollars de ce document sont des estimations de planification, pas des cotations — les tarifs de marché et d'enchère évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez ensuite depuis ce registre (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

Ce fichier définit les exigences au niveau API pour publier et gérer du contenu à travers les plateformes marketing. Utilisez cette référence lors de la construction de charges utiles, du mappage de champs, et de la validation de contenu avant exécution. Pour les spécifications créatives visuelles (tailles d'image, limites de caractères pour les publications organiques), voir `platform-specs.md`.

---

## 1. WordPress

### API REST — Création d'article

| Champ | Type | Détails |
|---|---|---|
| `title` | chaîne (rendue) | Titre de l'article. Bonne pratique SEO : rester sous 60 caractères pour un affichage SERP complet. |
| `content` | chaîne (HTML) | Corps complet de l'article en HTML. Prend en charge le balisage de blocs Gutenberg. L'éditeur classique utilise du HTML standard. |
| `excerpt` | chaîne | Extrait manuel. Si vide, WordPress génère automatiquement à partir des 55 premiers mots. Rédiger un extrait personnalisé de 150-160 caractères pour le SEO. |
| `status` | énumération | `draft` | `publish` | `future` | `pending` | `private`. Utiliser `future` avec le champ `date` pour la programmation. |
| `date` | chaîne (ISO 8601) | Date de publication. Pour les articles programmés, définir `status: future` et `date` sur un horodatage futur. Fuseau horaire selon les réglages WordPress. |
| `categories` | tableau[int] | ID de catégorie (pas les noms). Rechercher les ID via `GET /wp-json/wp/v2/categories?search={name}`. Assigner exactement 1 catégorie principale. |
| `tags` | tableau[int] | ID de tags. Rechercher via `GET /wp-json/wp/v2/tags?search={name}`. Créer de nouveaux tags avec `POST /wp-json/wp/v2/tags`. |
| `featured_media` | int | ID de pièce jointe pour l'image mise en avant. Téléverser l'image d'abord via `POST /wp-json/wp/v2/media` (multipart/form-data). |
| `slug` | chaîne | Slug d'URL. Auto-généré à partir du titre si omis. Pour le SEO : inclure le mot-clé principal, utiliser des tirets, rester sous 60 caractères. |
| `author` | int | ID utilisateur de l'auteur. Par défaut, l'utilisateur authentifié. |
| `comment_status` | énumération | `open` | `closed`. Par défaut selon les réglages WordPress. |
| `meta` | objet | Champs personnalisés. Champs Yoast SEO ci-dessous. |

### Champs méta Yoast SEO

| Clé méta | Longueur max | Objectif |
|---|---|---|
| `_yoast_wpseo_title` | 60 car. | Titre SEO (remplace le titre de l'article dans la SERP). Utiliser les variables `%%title%% %%sep%% %%sitename%%` ou rédiger un titre personnalisé. |
| `_yoast_wpseo_metadesc` | 160 car. | Méta-description pour l'extrait SERP. Inclure le mot-clé principal. Terminer par un CTA ou une proposition de valeur. |
| `_yoast_wpseo_focuskw` | N/A | Mot-clé principal pour l'analyse Yoast. Un seul mot-clé ou une seule expression. |
| `_yoast_wpseo_canonical` | URL | URL canonique si différente du permalien par défaut. |
| `_yoast_wpseo_opengraph-title` | 60 car. | Titre Open Graph pour le partage social (se replie sur le titre SEO). |
| `_yoast_wpseo_opengraph-description` | 200 car. | Description Open Graph pour le partage social. |

### Limites de débit et authentification

| Paramètre | Valeur |
|---|---|
| Authentification | Mots de passe d'application (recommandé), JWT, ou OAuth 2.0 |
| Limite de débit | Aucune limite intégrée ; l'hébergeur peut imposer des limites (typiquement 60-120 req/min) |
| Taille max de téléversement de média | Déterminée par `upload_max_filesize` du serveur (typiquement 2-64 Mo) |
| Opérations en masse | Non prises en charge nativement ; utiliser des requêtes séquentielles avec un délai de 100 ms |

---

## 2. Webflow

### API CMS — Création d'élément

| Champ | Type | Détails |
|---|---|---|
| `collection_id` | chaîne | ID de la collection CMS cible. Récupérer via `GET /collections`. |
| `fields` | objet | Paires clé-valeur correspondant aux slugs de champ de la collection. |
| `fields.name` | chaîne | Nom de l'élément (requis). Utilisé comme nom d'affichage principal. |
| `fields.slug` | chaîne | Slug d'URL. Auto-généré si omis. Doit être unique au sein de la collection. |
| `fields._archived` | booléen | Définir sur `true` pour archiver (masquer du site). Par défaut : `false`. |
| `fields._draft` | booléen | Définir sur `true` pour sauvegarder comme brouillon (non publié). Par défaut : `false`. |
| `fields.[rich-text]` | chaîne (sous-ensemble HTML) | Prend en charge : `<h1>`-`<h6>`, `<p>`, `<a>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, `<blockquote>`, `<img>`, `<figure>`. Pas de `<script>`, `<style>`, ou attributs personnalisés. |
| `fields.[image]` | objet | `{ "url": "https://...", "alt": "Description" }`. L'image doit être une URL publiquement accessible. |
| `fields.[reference]` | chaîne | ID d'élément référencé pour les champs relationnels. |
| `fields.[multi-reference]` | tableau[chaîne] | Tableau d'ID d'éléments référencés. |

### Limites de débit

| Paramètre | Valeur |
|---|---|
| API générale | 60 requêtes par minute par site |
| API CMS | 60 requêtes par minute |
| API de publication | 1 publication par minute par site |
| Authentification | Jeton API (v2) ou OAuth 2.0 |
| Éléments max par collection | 10 000 (plan CMS), 100 000 (plan Business) |

---

## 3. Plateformes e-mail

### Comparaison des charges utiles

| Fonctionnalité | SendGrid | Klaviyo | Customer.io | Brevo (Sendinblue) | Mailgun |
|---|---|---|---|---|---|
| **Point de terminaison** | `POST /v3/mail/send` | `POST /api/campaigns` | `POST /v1/send/email` | `POST /v3/smtp/email` | `POST /v3/{domain}/messages` |
| **Syntaxe de personnalisation** | `{{variable}}` ou `-variable-` (héritée) | `{{ variable }}` (Django/Jinja) | `{{customer.variable}}` (Liquid) | `{{ contact.variable }}` | `%recipient.variable%` |
| **Logique conditionnelle** | Handlebars : `{{#if}}` | Jinja : `{% if %}` | Liquid : `{% if %}` | Jinja : `{% if %}` | Non pris en charge dans les modèles |
| **Programmation** | `send_at` (horodatage Unix) | `send_time` (ISO 8601) | `send_at` (horodatage Unix) | `scheduledAt` (ISO 8601) | `o:deliverytime` (RFC 2822) |
| **Programmation max en avance** | 72 heures | Illimité | Illimité | Illimité | 7 jours |
| **Référence liste/segment** | ID de liste ou de segment dans `to` | ID de liste ou de segment | ID de segment ou filtre | ID de liste ou filtre de contact | Adresse de liste de diffusion |
| **Gestion de suppression** | Suppression auto des rebonds, désabonnements, signalements spam | Suppression auto ; profils marqués supprimés | Suppression auto ; API de suppression explicite | Suppression auto ; API de liste noire | Suppression auto ; liste de suppression intégrée |
| **Limite de débit** | 10 000 req/min (par défaut) | 75 req/s (campagnes), 350 req/s (profils) | 100 req/s | 50 req/s | 300 req/min (gratuit), plus élevé en payant |
| **Destinataires max/envoi** | 1 000 par appel API (lot) | Liste entière (l'API gère le lotissement) | 1 000 par déclenchement de lot | 2 000 par appel API | 1 000 par appel API |
| **Événements webhook** | delivered, opened, clicked, bounced, dropped, spam_report, unsubscribe | delivered, opened, clicked, bounced, dropped, marked_as_spam, unsubscribed | delivered, opened, clicked, bounced, failed, unsubscribed | delivered, opened, clicked, hard_bounce, soft_bounce, spam, unsubscribed | delivered, opened, clicked, bounced, dropped, complained, unsubscribed |

### Méthodes d'authentification

| Plateforme | Méthode d'authentification |
|---|---|
| SendGrid | Jeton Bearer (`Authorization: Bearer {API_KEY}`) |
| Klaviyo | En-tête de clé API (`Authorization: Klaviyo-API-Key {KEY}`) |
| Customer.io | Authentification basique (site_id:api_key) pour l'API track ; jeton Bearer pour l'API app |
| Brevo | En-tête de clé API (`api-key: {KEY}`) |
| Mailgun | Authentification basique (`api:{API_KEY}`) |

---

## 4. Google Ads

### Hiérarchie de campagne et champs

| Niveau | Champs clés | Détails |
|---|---|---|
| **Campagne** | `name`, `budget` (quotidien, en micros : montant x 1 000 000), `bidding_strategy`, `advertising_channel_type` (SEARCH, DISPLAY, SHOPPING, VIDEO, PERFORMANCE_MAX), `geo_target_type_setting`, `language_settings` | Budget en micros : 50 $/jour = 50 000 000 micros. Le ciblage géo utilise des ID de critère (US = 2840). |
| **Groupe d'annonces** | `name`, `campaign` (nom de ressource), `type` (SEARCH_STANDARD, DISPLAY_STANDARD, VIDEO), `cpc_bid_micros` (enchère par défaut) | Enchère CPC par défaut en micros. Remplacée par la stratégie d'enchère au niveau campagne si automatisée. |
| **Annonce** | `type` (RESPONSIVE_SEARCH_AD, RESPONSIVE_DISPLAY_AD, VIDEO_AD), `final_urls[]`, `path1`, `path2` | Voir les spécifications créatives ci-dessous. |

### Champs d'annonce de recherche réactive (RSA)

| Champ | Nombre | Longueur max | Remarques |
|---|---|---|---|
| `headlines` | 3-15 | 30 car. chacun | Au moins 3 requis. Fournir 15 pour un nombre maximal de combinaisons. Peut être épinglé aux positions 1, 2, 3. |
| `descriptions` | 2-4 | 90 car. chacune | Au moins 2 requis. Peut être épinglé aux positions 1, 2. |
| `final_urls` | 1+ | N/A | URL de page d'atterrissage. La première URL est la principale. |
| `path1` | 0-1 | 15 car. | Segment 1 du chemin de l'URL d'affichage (par ex., « chaussures »). |
| `path2` | 0-1 | 15 car. | Segment 2 du chemin de l'URL d'affichage (par ex., « course »). |

### Stratégies d'enchère

| Stratégie | À utiliser quand | Paramètre clé |
|---|---|---|
| `MANUAL_CPC` | Contrôle total sur les enchères, données limitées | `cpc_bid_micros` par groupe d'annonces/mot-clé |
| `TARGET_CPA` | Axé conversion, 30+ conversions/mois | `target_cpa_micros` |
| `TARGET_ROAS` | Axé chiffre d'affaires, 50+ conversions/mois | `target_roas` (pourcentage, par ex., 300 % = 3,0) |
| `MAXIMIZE_CONVERSIONS` | Axé conversion, dépenser tout le budget | `target_cpa_micros` optionnel |
| `MAXIMIZE_CONVERSION_VALUE` | Axé chiffre d'affaires, dépenser tout le budget | `target_roas` optionnel |
| `MAXIMIZE_CLICKS` | Axé trafic | `cpc_bid_ceiling_micros` optionnel |

---

## 5. Meta Ads (Facebook et Instagram)

### Structure de campagne

| Niveau | Champs clés | Détails |
|---|---|---|
| **Campagne** | `name`, `objective` (OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_APP_PROMOTION, OUTCOME_SALES), `special_ad_categories[]` (HOUSING, EMPLOYMENT, CREDIT, NONE), `status` | L'objectif détermine les objectifs d'optimisation et formats publicitaires disponibles. Les Catégories Publicitaires Spéciales restreignent les options de ciblage. |
| **Ensemble d'annonces** | `name`, `campaign_id`, `targeting`, `budget` (`daily_budget` ou `lifetime_budget` en centimes), `bid_strategy`, `billing_event`, `optimization_goal`, `start_time`, `end_time`, `status` | Budget en centimes : 50 $/jour = 5000. Le budget quotidien minimum varie selon le pays (1-5 $ USD). |
| **Annonce** | `name`, `adset_id`, `creative` (objet), `status` | La création contient tous les éléments visuels et de texte. |

### Objet de ciblage

| Champ | Type | Détails |
|---|---|---|
| `age_min` | int | 18-65 (minimum 18). Non disponible dans les Catégories Publicitaires Spéciales. |
| `age_max` | int | 18-65+. Non disponible dans les Catégories Publicitaires Spéciales. |
| `genders` | tableau[int] | `[0]` = tous, `[1]` = homme, `[2]` = femme. Non disponible dans les Catégories Publicitaires Spéciales. |
| `geo_locations` | objet | `countries[]`, `regions[]`, `cities[]`, `zips[]`. Ciblage par rayon disponible. |
| `interests` | tableau[objet] | `[{ "id": "123", "name": "Digital Marketing" }]`. Parcourir via l'API de Recherche d'Intérêts. |
| `behaviors` | tableau[objet] | Ciblage comportemental (comportement d'achat, usage d'appareil, voyage). |
| `custom_audiences` | tableau[objet] | `[{ "id": "audience_id" }]`. Listes CRM, visiteurs du site, utilisateurs d'application. |
| `excluded_custom_audiences` | tableau[objet] | Audiences à exclure du ciblage. |
| `locales` | tableau[int] | Ciblage de langue par ID de locale. |

### Objet créatif

| Champ | Longueur max | Détails |
|---|---|---|
| `object_story_spec.link_data.message` | 2 200 car. (125 recommandés) | Texte principal au-dessus de la création. |
| `object_story_spec.link_data.name` | 255 car. (27 recommandés) | Titre sous la création. |
| `object_story_spec.link_data.description` | 2 200 car. (27 recommandés) | Description sous le titre (non affichée sur tous les emplacements). |
| `object_story_spec.link_data.link` | URL | URL de destination. |
| `object_story_spec.link_data.call_to_action.type` | énumération | SHOP_NOW, LEARN_MORE, SIGN_UP, DOWNLOAD, GET_OFFER, BOOK_TRAVEL, CONTACT_US, APPLY_NOW, SUBSCRIBE, WATCH_MORE, GET_QUOTE, SEND_MESSAGE |
| `object_story_spec.link_data.image_hash` | chaîne | Téléverser l'image via l'API Marketing, utiliser le hash retourné. |
| `object_story_spec.video_data.video_id` | chaîne | Téléverser la vidéo via l'API Marketing, utiliser l'ID retourné. |

---

## 6. LinkedIn Ads

### Structure de campagne

| Niveau | Champs clés | Détails |
|---|---|---|
| **Groupe de campagnes** | `name`, `status`, `total_budget` (plafond optionnel), `start_date`, `end_date` | Conteneur pour les campagnes liées. |
| **Campagne** | `name`, `campaign_group`, `type` (SPONSORED_CONTENT, MESSAGE_ADS, TEXT_ADS, DYNAMIC_ADS), `objective` (BRAND_AWARENESS, WEBSITE_VISITS, ENGAGEMENT, VIDEO_VIEWS, LEAD_GENERATION, WEBSITE_CONVERSIONS, JOB_APPLICANTS), `daily_budget` (en centimes), `bid_strategy`, `audience` | Budget en centimes. Budget quotidien minimum : 10 $ USD. |
| **Création** | `campaign`, `type`, `content` (varie selon le type) | Liée à une campagne. La structure du contenu dépend du type d'annonce. |

### Facettes de ciblage

| Facette | Détails |
|---|---|
| `job_titles` | Liste d'URN. Titres de poste spécifiques de la taxonomie LinkedIn. |
| `job_functions` | Catégories de fonction larges (Marketing, Ingénierie, Finance, etc.). |
| `seniorities` | Débutant, Senior, Manager, Directeur, VP, Direction générale, Propriétaire/Associé. |
| `industries` | Taxonomie sectorielle LinkedIn (150+ secteurs). |
| `company_names` | Entreprises spécifiques par URN. Audience minimum : 300 membres. |
| `company_size` | Fourchettes : 1, 2-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10001+. |
| `skills` | Compétences listées par le membre. Correspondance large. |
| `degrees` | Type de diplôme (Licence, Master, Doctorat, etc.). |
| `fields_of_study` | Domaine d'étude académique. |
| `member_groups` | Appartenance à un Groupe LinkedIn. |
| `locations` | Ciblage géographique par pays, état, zone métropolitaine. |

### Contenu sponsorisé — Champs créatifs

| Champ | Longueur max |
|---|---|
| Texte introductif | 600 car. (150 recommandés pour éviter la troncature) |
| Titre | 200 car. (70 recommandés) |
| Description | 300 car. (100 recommandés) |
| Image | 1200 x 627 px (1,91:1). Prend aussi en charge 1080x1080 et 1080x1350. Max 5 Mo. |
| Vidéo | 3s-30min. 360p-1080p. MP4. Max 200 Mo. |

---

## 7. TikTok Ads

### Structure de campagne

| Niveau | Champs clés | Détails |
|---|---|---|
| **Campagne** | `campaign_name`, `objective_type` (REACH, TRAFFIC, VIDEO_VIEWS, LEAD_GENERATION, APP_PROMOTION, WEB_CONVERSIONS, PRODUCT_SALES), `budget_mode` (BUDGET_MODE_DAY, BUDGET_MODE_TOTAL), `budget` | Budget quotidien minimum : 50 $ USD (niveau campagne), 20 $ USD (niveau groupe d'annonces). |
| **Groupe d'annonces** | `adgroup_name`, `placement_type` (PLACEMENT_TYPE_AUTOMATIC, PLACEMENT_TYPE_NORMAL), `targeting`, `budget`, `schedule_type`, `bid_type`, `bid_price` | Placement automatique recommandé. Options de placement manuel : TikTok, Pangle, Global App Bundle. |
| **Annonce** | `ad_name`, `ad_format` (SINGLE_VIDEO, SINGLE_IMAGE, CAROUSEL, SPARK_ADS), `video_id` ou `image_ids[]`, `ad_text`, `call_to_action`, `landing_page_url` | Spark Ads : utiliser `tiktok_item_id` depuis une publication organique autorisée. |

### Options de ciblage

| Champ | Détails |
|---|---|
| `age_groups` | AGE_13_17, AGE_18_24, AGE_25_34, AGE_35_44, AGE_45_54, AGE_55_100. |
| `genders` | GENDER_MALE, GENDER_FEMALE, GENDER_UNLIMITED. |
| `languages` | Codes de langue ISO 639-1. |
| `locations` | Pays, état/province, ville, DMA. |
| `interests` | Catégories d'intérêt TikTok (hiérarchiques). |
| `behaviors` | Comportements d'interaction vidéo, interaction créateur, interaction hashtag. |
| `custom_audiences` | ID d'audiences personnalisées (import CRM, pixel de site, événements d'application). |
| `lookalike_audiences` | ID d'audience similaire avec type de similarité (étroite, équilibrée, large). |

### Spécifications créatives

| Champ | Spécification |
|---|---|
| Ratio d'aspect vidéo | 9:16 (recommandé), 1:1, 16:9 |
| Durée vidéo | 5-60 secondes (9-15 secondes recommandées pour In-Feed) |
| Résolution vidéo | 720x1280 minimum (1080x1920 recommandé) |
| Format vidéo | MP4, MOV, MPEG, AVI |
| Taille de fichier vidéo | Max 500 Mo |
| Texte publicitaire | 1-100 caractères (emoji pris en charge) |
| Nom d'affichage | Max 40 caractères |
| Image de profil | 50x50 px minimum |

---

## 8. Spécifications de publication sociale — Référence rapide

| Plateforme | Caractères max | Taille d'image | Durée vidéo max | Taille vidéo max | Hashtags | Comportement des liens |
|---|---|---|---|---|---|---|
| **Twitter/X** | 280 (gratuit), 25K (Premium) | 1600x900 ou 1080x1080 | 2:20 (gratuit), 4h (Premium) | 512 Mo | 1-2 recommandés | Auto-raccourci (t.co) |
| **Instagram Feed** | 2 200 | 1080x1080 ou 1080x1350 | 60s (fil), jusqu'à 3 min (Reels) | 4 Go | 5-10 recommandés (30 max) | Lien en bio uniquement (aucun lien cliquable dans les légendes) |
| **LinkedIn** | 3 000 (publications), 125K (articles) | 1200x627 ou 1080x1080 | 10 min | 5 Go | 3-5 recommandés | Cliquable dans la publication (peut réduire la portée) |
| **TikTok** | 4 000 | N/A (vidéo d'abord) | 60 min | 10 Go (bureau) | 3-5 recommandés | Lien en bio ; sticker de lien pour 1K+ abonnés |
| **Facebook** | 63 206 | 1200x630 ou 1080x1080 | 240 min | 10 Go | 1-3 recommandés | Aperçu de lien cliquable |
| **YouTube** | Titre : 100, Desc : 5 000 | Miniature : 1280x720 | 12 heures | 256 Go | N/A (tags : 500 car. au total) | Cliquable dans la description |
| **Pinterest** | Desc : 500 | 1000x1500 | 15 min | 2 Go | Non utilisés (basé sur mots-clés) | URL de destination cliquable par épingle |

---

## 9. Twilio SMS/WhatsApp

### Spécifications SMS

| Paramètre | Valeur |
|---|---|
| Encodage GSM-7 | 160 caractères par segment. Caractères : A-Z, a-z, 0-9, ponctuation standard. |
| Encodage Unicode | 70 caractères par segment. Déclenché par : emojis, écritures non latines, caractères spéciaux. |
| SMS concaténé | Jusqu'à 10 segments (1 600 caractères GSM-7 ou 700 caractères Unicode). Chaque segment facturé séparément. |
| Média MMS | Max 5 Mo par message. Pris en charge : JPEG, PNG, GIF, MP4, MP3. |
| Types d'expéditeur (US) | Numéro gratuit (vérifié), code court (débit élevé, 500-1 000 $/mois), 10DLC (enregistré, frais A2P de 2-15 $/mois). |
| Types d'expéditeur (International) | ID d'expéditeur alphanumérique (11 car., par ex. « ACME » — non disponible aux US/Canada). |
| Débit | Numéro gratuit : 40 MPS. Code court : 100+ MPS. 10DLC : 1-75 MPS (selon le score de confiance). |
| Contenu requis | Instructions de désabonnement dans chaque message marketing : « Répondez STOP pour vous désabonner » ou équivalent. |
| Heures calmes | Aucun envoi de 21h à 8h heure locale du destinataire (bonne pratique du secteur ; certains états l'imposent légalement). |

### API Business WhatsApp

| Paramètre | Valeur |
|---|---|
| Types de message | Messages modèles (pré-approuvés, pour initier des conversations) et messages de session (dans la fenêtre de 24h suivant un message utilisateur). |
| Approbation de modèle | Soumettre via Meta Business Manager. Revue : 24-48 heures. Catégories : MARKETING, UTILITY, AUTHENTICATION. |
| Variables de modèle | `{{1}}`, `{{2}}`, etc. Espaces réservés positionnels. Jusqu'à 10 par modèle. |
| Limite de message texte | 1 024 caractères. |
| Types de média | Image (5 Mo), Vidéo (16 Mo), Document (100 Mo), Audio (16 Mo), Sticker (100 Ko statique, 500 Ko animé). |
| Messages interactifs | Boutons (jusqu'à 3 boutons de réponse rapide, 20 car. chacun) ou listes (jusqu'à 10 éléments dans jusqu'à 10 sections). |
| Tarification des messages | Facturation par message (depuis juillet 2025 — la facturation basée sur la conversation est retirée). Chaque message modèle livré est facturé par catégorie (MARKETING, UTILITY, AUTHENTICATION), pays du destinataire, et palier de volume ; le marketing est le plus cher (~0,01-0,14 $ USD/message selon le marché, aucune remise de volume). Les réponses de service dans la fenêtre de 24h de service client sont gratuites. Les BSP ajoutent une majoration par message. |
| Note de qualité | Vert (élevée), Jaune (moyenne), Rouge (faible). Faible qualité = débit réduit ou rejet de modèle. Maintenir en gardant les taux de désabonnement et de blocage bas. |
| Exigence de désabonnement | Doit fournir un mécanisme de désabonnement. Des taux de blocage élevés déclenchent des baisses de note de qualité. Honorer les désabonnements sous 24 heures. |

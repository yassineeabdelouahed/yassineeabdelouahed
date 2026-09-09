# Référence rapide SEO Google (juillet 2026)

Guide de référence concis pour les agents et compétences. Il ne s'agit pas d'une reproduction de la documentation de Google — voir les liens vers la documentation officielle en bas de page pour les détails complets. Les éléments volatils (surfaces, statut des schémas, dates d'algorithme) portent une date — revérifiez tout élément vieux de plus de ~3 mois par rapport à la documentation officielle et au [tableau de bord de statut de la recherche](https://status.search.google.com/).

---

## Comment fonctionne la recherche Google

Trois étapes : **exploration (crawling)** (Googlebot découvre les pages via les liens et les sitemaps), **indexation** (traite et stocke le contenu, les métadonnées, les signaux), **diffusion (serving)** (classe les pages indexées par pertinence, qualité, utilisabilité). Les pages doivent être explorables et indexables pour apparaître.

---

## Fondamentaux de la recherche Google

### Exigences techniques
- Pages accessibles à Googlebot (non bloquées par robots.txt ou noindex)
- HTTP 200 pour le contenu indexable
- HTML préféré ; le contenu rendu en JS est pris en charge mais plus lent à indexer
- HTTPS requis

### Politiques anti-spam
- Pas de cloaking, de pages passerelles, de texte/liens cachés
- Pas de bourrage de mots-clés, de spam de liens (achat de liens, échanges excessifs)
- Pas de contenu extrait ou généré automatiquement sans valeur ajoutée
- Pas de redirections furtives, de pages d'affiliation légères
- **Abus de contenu à l'échelle** (mars 2024) : contenu généré par IA à grande échelle sans valeur unique — application majeure depuis juin 2025
- **Abus de réputation de site** (novembre 2024) : contenu tiers sur des domaines à forte autorité sans supervision éditoriale

### Meilleures pratiques clés
- Contenu pour les utilisateurs, pas pour les moteurs de recherche
- Hiérarchie claire, titres et meta descriptions uniques et descriptifs
- Balises de titre (H1-H6) pour une structure logique
- Texte alternatif d'image et tailles de fichier appropriées
- Design responsive adapté au mobile
- Optimisation des Core Web Vitals
- Sitemap XML dans Search Console
- Données structurées JSON-LD

---

## E-E-A-T (qualité du contenu)

- **Expérience** : expérience de première main (photos originales, histoires personnelles, usage démontré)
- **Expertise** : connaissance ou qualifications pertinentes (parcours professionnel, profondeur technique)
- **Autorité** : reconnu comme une source de référence (citations, mentions de marque, reconnaissance d'experts)
- **Fiabilité** : fiable et transparent (coordonnées, site sécurisé, normes éditoriales)

**YMYL** : les sujets liés à la santé, la finance, la sécurité, le juridique sont soumis aux normes E-E-A-T les plus élevées.

**Mise à jour de décembre 2025** : l'évaluation E-E-A-T s'étend désormais à TOUTES les requêtes concurrentielles, pas seulement aux sujets YMYL.

---

## Core Web Vitals

Mesurés au 75e centile des données réelles des utilisateurs (données de terrain).

| Indicateur | Bon | À améliorer | Faible |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2,5s | 2,5s – 4,0s | > 4,0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms – 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0,1 | 0,1 – 0,25 | > 0,25 |

- INP a remplacé FID le 12 mars 2024. FID entièrement retiré de tous les outils Chrome le 9 septembre 2024. NE PAS référencer FID.
- Les CWV sont un signal de classement confirmé (depuis juin 2021)
- Les données de terrain (CrUX) sont préférées aux données de laboratoire (Lighthouse)

---

## Statut du balisage de schéma (juillet 2026)

### Actif et pris en charge
Article, BreadcrumbList, Course, Dataset, Event, ItemList, JobPosting, LocalBusiness, Organization, Person, Product, ProductGroup, ProfilePage, Recipe, Review, SoftwareApplication, SoftwareSourceCode, VideoObject, Clip, SeekToAction, BroadcastEvent, Certification, OfferShippingDetails, MerchantReturnPolicy, DiscussionForumPosting

### Déprécié / restreint
- **HowTo** : déprécié (septembre 2023) — résultats enrichis retirés
- **FAQ** : restreint aux sites gouvernementaux/santé uniquement (août 2023)
- **SpecialAnnouncement** : déprécié (juillet 2025)
- **EnergyConsumptionDetails** : remplacé par Certification (avril 2025)

### JSON-LD requis
Google recommande le JSON-LD pour toutes les données structurées. Microdata et RDFa sont pris en charge mais non privilégiés.

---

## Meilleures pratiques SEO pour les images

- **Format** : WebP (support 97 %+) ou AVIF (92 %+) plutôt que JPEG/PNG
- **`<picture>`** : amélioration progressive avec repli AVIF > WebP > JPEG
- **Image LCP** : `fetchpriority="high"`, PAS de `loading="lazy"`, PAS de `decoding="async"`
- **Images non-LCP** : `loading="lazy"` + `decoding="async"`
- **Dimensions** : toujours définir `width` et `height` sur `<img>` pour prévenir le CLS
- **Texte alternatif** : descriptif (10-125 caractères), inclusion naturelle de mots-clés, pas « image.jpg »
- **Noms de fichiers** : descriptifs, avec tirets, en minuscules (`blue-running-shoes.webp`)
- **JPEG XL** : le support Chrome est en cours de restauration (annonce de novembre 2025) — pas encore en version stable. À surveiller.

---

## Optimisation pour la recherche IA (GEO/AEO)

### Surfaces canoniques (6, mi-2026)
Le plugin note la visibilité IA sur six surfaces (la constante `PLATFORMS` dans `scripts/geo-tracker.py` ; notée avec la grille de `/digital-marketing-pro:aeo-audit`) :
- **Google AI Mode** — onglet de recherche conversationnelle ; devenu l'expérience par défaut pour les utilisateurs ayant opté pour cette fonctionnalité lors de Google I/O (19 mai 2026), ~1 milliard d'utilisateurs actifs mensuels, propulsé par Gemini 3.5 Flash. **Distinct des AI Overviews** — schéma de citation différent pour la même requête ; à auditer séparément.
- **Google AI Overviews** — bloc de synthèse au-dessus des résultats SERP classiques
- ChatGPT (mode recherche web)
- Perplexity
- Gemini
- Microsoft Copilot

### Nouveautés depuis mars 2026
- **Rapport AI Performance de GSC (3 juin 2026, d'abord au Royaume-Uni puis mondial) :** impressions réelles dans les AI Overviews + AI Mode pour les propriétés vérifiées, plus une **bascule de retrait IA** au niveau de la propriété (aucune directive robots spécifique à l'IA nécessaire). Exclut les données de clic. Voir `/digital-marketing-pro:gsc-ai-performance`.
- **Groupe de canaux GA4 « Assistant IA » (13 mai 2026) :** capture les référencements `Medium=ai-assistant` depuis ChatGPT / Gemini / Claude — le complément côté clic au rapport GSC.
- **Position officielle de Google (guide d'optimisation IA, 15 mai 2026) :** pas de `llms.txt`, pas de schéma spécifique à l'IA, pas de porte d'éligibilité IA séparée — les pages éligibles aux extraits dans la recherche classique sont éligibles aux fonctionnalités IA.
- **`Google-Extended`** (robots.txt) contrôle toujours les *autres* systèmes IA de Google (entraînement Gemini, ancrage Vertex), distinct de la bascule AI Overviews/AI Mode dans Search Console.

### Signaux d'optimisation
- **Cohérence d'entité** : nom de marque, descriptions, revendications clés cohérents sur le site web, les profils sociaux, les annuaires, les mentions tierces
- **Contenu digne de citation** : statistiques, recherche originale, citations d'experts, données structurées
- **Réponses structurées** : blocs de réponse concis adaptés aux extraits enrichis et à l'extraction IA
- **Contenu « speakable »** : réponses courtes et claires pour la recherche vocale et les assistants IA
- **Autorité de source** : autorité de domaine établie, backlinks de qualité, signaux E-E-A-T

---

## Liens vers la documentation officielle

- Google Search Central : https://developers.google.com/search
- Aide Search Console : https://support.google.com/webmasters
- Données structurées : https://developers.google.com/search/docs/appearance/structured-data
- Core Web Vitals : https://web.dev/vitals/
- Directives pour les évaluateurs de qualité de recherche : https://guidelines.raterhub.com/
</content>

---
name: competitor-pages
description: "Construire des pages de comparaison et d'alternatives face aux concurrents — comparatifs X-vs-Y, listes d'alternatives à X, tours d'horizon de catégorie, et pages de matrice de fonctionnalités — livrant un modèle de page de 1 500+ mots, un tableau comparatif, un schéma JSON-LD via schema-generator.py, un ciblage de mots-clés et de balises title, un plan de maillage interne, et des garde-fous d'équité et d'exactitude. Se déclenche sur \"/digital-marketing-pro:competitor-pages\", \"create a vs page\", \"build an alternatives page\", \"comparison page for our product\", \"best tools roundup for our category\". Produit le contenu et le balisage de la page, pas une publication en direct. Lit le profil de marque et les guidelines, en particulier les restrictions sur les mentions de concurrents."
argument-hint: "[URL or generate] [competitor]"
user-invocable: true
---

# /digital-marketing-pro:competitor-pages

## Objectif

Créer des pages de comparaison et d'alternatives face aux concurrents à fort taux de conversion, ciblant les mots-clés à intention concurrentielle avec un contenu précis et structuré ainsi qu'un balisage de schéma approprié.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Type de page** : « X vs Y », « alternatives à X », « tour d'horizon des meilleurs outils », ou « tableau comparatif »
- **Votre produit/service** : Le produit à positionner
- **Concurrents** : 1 à 5 produits concurrents à comparer
- **Critères de comparaison** : Fonctionnalités, tarification, cas d'usage à comparer (ou détectés automatiquement)
- **Audience cible** : Qui prend cette décision d'achat

## Types de pages

### 1. Pages de comparaison « X vs Y »
- Comparaison directe tête-à-tête entre deux produits/services
- Analyse équilibrée fonctionnalité par fonctionnalité
- Verdict ou recommandation claire avec justification
- Mot-clé cible : `[Produit A] vs [Produit B]`

### 2. Pages « Alternatives à X »
- Liste d'alternatives à un produit/service spécifique
- Chaque alternative avec un bref résumé, avantages/inconvénients, cas d'usage idéal
- Mot-clé cible : `alternatives à [Produit]`, `meilleures alternatives à [Produit]`

### 3. Pages de tour d'horizon « Meilleurs outils de [Catégorie] »
- Liste sélectionnée des meilleurs outils/services d'une catégorie
- Critères de classement clairement énoncés
- Mot-clé cible : `meilleurs outils de [catégorie] [année]`, `meilleur logiciel de [catégorie]`

### 4. Pages de tableau comparatif
- Matrice de fonctionnalités avec plusieurs produits en colonnes
- Recommandations de mise en page triable/filtrable
- Mot-clé cible : `comparaison [catégorie]`, `tableau comparatif [catégorie]`

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque et les règles de conformité. Vérifier les guidelines de marque — en particulier les restrictions sur les mentions de concurrents.
2. **Rechercher les concurrents** : Rassembler les données de fonctionnalités, de tarification, de positionnement à partir de sources publiques. Vérifier toutes les affirmations.
3. **Générer la structure de comparaison** : Matrice de fonctionnalités, plan de contenu, ordre des sections
4. **Appliquer le balisage de schéma** : JSON-LD Product, SoftwareApplication, ou ItemList selon le type de page (via `schema-generator.py --type <Type>` — `AggregateRating` n'est pas un `--type` autonome ; c'est un champ imbriqué au sein de `Product`, comme montré dans le modèle Product ci-dessous)
5. **Optimiser pour la conversion** : Stratégie de placement des CTA, sections de preuve sociale, mise en avant de la tarification
6. **Appliquer les guidelines d'équité** : Vérification de l'exactitude, citations de sources, divulgation d'affiliation
7. **Optimisation des mots-clés** : Ciblage des mots-clés primaires et secondaires, formules de balise title, schémas H1
8. **Stratégie de maillage interne** : Liens croisés entre pages de comparaison connexes, pages de fonctionnalités, études de cas

## Modèle de tableau comparatif

```
| Feature          | Your Product | Competitor A | Competitor B |
|------------------|:------------:|:------------:|:------------:|
| Feature 1        | ✅           | ✅           | ❌           |
| Feature 2        | ✅           | ⚠️ Partial   | ✅           |
| Feature 3        | ✅           | ❌           | ❌           |
| Pricing (from)   | $X/mo        | $Y/mo        | $Z/mo        |
| Free Tier        | ✅           | ❌           | ✅           |
```

### Exigences d'exactitude des données
- Toutes les affirmations de fonctionnalités doivent être vérifiables à partir de sources publiques
- La tarification doit être à jour (inclure la mention « au [date] »)
- Fréquence de mise à jour : revoir trimestriellement ou lorsque les concurrents publient des changements majeurs
- Lier vers la source de chaque point de donnée concurrent lorsque possible

## Modèles de balisage de schéma

### Product avec AggregateRating (pour les pages X vs Y)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "description": "[Product Description]",
  "brand": { "@type": "Brand", "name": "[Brand Name]" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Rating]",
    "reviewCount": "[Count]",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### SoftwareApplication (pour les comparaisons de logiciels)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Software Name]",
  "applicationCategory": "[Category]",
  "operatingSystem": "[OS]",
  "offers": { "@type": "Offer", "price": "[Price]", "priceCurrency": "USD" }
}
```

### ItemList (pour les pages de tour d'horizon)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best [Category] Tools [Year]",
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "numberOfItems": "[Count]",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "[Product Name]", "url": "[Product URL]" }
  ]
}
```

## Ciblage de mots-clés

### Schémas d'intention de comparaison
| Schéma | Exemple | Signal de volume |
|---------|---------|--------------|
| `[A] vs [B]` | « Slack vs Teams » | Élevé |
| `[A] alternative` | « alternatives à Figma » | Élevé |
| `[A] alternatives [année]` | « alternatives à Notion 2026 » | Élevé |
| `meilleurs outils de [catégorie]` | « meilleurs outils de gestion de projet » | Élevé |
| `[A] vs [B] pour [cas d'usage]` | « AWS vs Azure pour les startups » | Moyen |
| `[A] vs [B] tarification` | « tarification HubSpot vs Salesforce » | Moyen |
| `[A] est-il meilleur que [B]` | « Notion est-il meilleur que Confluence » | Moyen |

### Formules de balise title
- X vs Y : `[A] vs [B] : [Différenciateur clé] ([Année])`
- Alternatives : `[N] Meilleures alternatives à [A] en [Année] (Gratuit et Payant)`
- Tour d'horizon : `[N] Meilleurs outils de [Catégorie] en [Année], Comparés et Classés`

## Mises en page optimisées pour la conversion

### Placement des CTA
- **Au-dessus de la ligne de flottaison** : Bref résumé comparatif avec CTA principal
- **Après le tableau comparatif** : CTA « Essayez [Votre Produit] gratuitement »
- **Bas de page** : Recommandation finale avec CTA
- Éviter les CTA agressifs dans les sections de description des concurrents (réduit la confiance)

### Sections de preuve sociale
- Témoignages clients pertinents pour les critères de comparaison
- Notations G2/Capterra/TrustPilot (avec liens sources)
- Études de cas montrant une migration depuis un concurrent
- Histoires « Migré depuis [Concurrent] »

### Signaux de confiance
- Horodatage « Dernière mise à jour le [date] »
- Auteur avec expertise pertinente
- Divulgation de la méthodologie
- Divulgation de l'affiliation avec le produit propre
- Présentation équilibrée — reconnaître honnêtement les forces des concurrents

## Guidelines d'équité

- **Exactitude** : Toutes les informations sur les concurrents doivent être vérifiables à partir de sources publiques
- **Pas de diffamation** : Ne jamais faire d'affirmations fausses ou trompeuses sur les concurrents
- **Citer les sources** : Lier vers les sites web des concurrents, les sites d'avis, ou la documentation
- **Mises à jour en temps voulu** : Revoir et mettre à jour lorsque les concurrents publient des changements majeurs
- **Divulguer l'affiliation** : Indiquer clairement quel produit est le vôtre
- **Présentation équilibrée** : Reconnaître honnêtement les forces des concurrents
- **Exactitude de la tarification** : Inclure des mentions « au [date] » sur toutes les données de tarification

## Résultat

Un pack de page de comparaison concurrentielle structuré contenant :

- Modèle de contenu de page (minimum 1 500 mots) avec toutes les sections
- Tableau de matrice de fonctionnalités
- Balisage de schéma (JSON-LD) approprié au type de page
- Mots-clés primaires et secondaires avec recommandations de balise title et H1
- Plan de maillage interne (liens croisés vers les comparaisons connexes, pages de fonctionnalités, études de cas)
- Recommandations d'optimisation de la conversion
- Analyse des écarts de contenu par rapport aux pages concurrentes existantes

## Agents utilisés

- **seo-specialist** — Ciblage de mots-clés, balisage de schéma, optimisation on-page
- **content-creator** — Rédaction du contenu comparatif, application de la voix de marque
- **competitive-intel** — Recherche des fonctionnalités et de la tarification des concurrents
- **brand-guardian** — Assurer la conformité aux guidelines de marque sur les mentions de concurrents

## Scripts utilisés

- **schema-generator.py** — Générer du JSON-LD Product, SoftwareApplication, ou ItemList
- **competitor-scraper.py** — Extraire les données de page concurrente pour la comparaison
- **content-scorer.py** — Noter la qualité de la page de comparaison

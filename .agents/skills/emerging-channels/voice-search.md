# Recherche vocale — Guide d'optimisation

> La recherche vocale représente désormais une part significative et croissante de toutes les requêtes de recherche. La façon dont les gens parlent aux appareils est fondamentalement différente de la façon dont ils tapent. Ce guide couvre comment optimiser le contenu, structurer les données, et capter le trafic généré par la voix sur toutes les grandes plateformes.

---

## Schémas de requête vocale

Les requêtes vocales diffèrent des requêtes tapées de manière prévisible. Comprendre ces schémas est le fondement de l'optimisation pour la recherche vocale.

### Comparaison des types de requête

| Attribut | Recherche tapée | Recherche vocale |
|-----------|-------------|-------------|
| Longueur | 2-4 mots | 6-10+ mots (conversationnel) |
| Format | Mots-clés, fragments | Phrases complètes, questions |
| Signal d'intention | Implicite | Explicite (mots interrogatifs) |
| Exemple | « meilleur restaurant italien Paris » | « Quel est le meilleur restaurant italien près de moi qui est ouvert en ce moment ? » |
| Intention locale | ~30 % des requêtes | ~58 % des requêtes |
| Intention d'action | Faible | Élevée (« appeler », « itinéraire vers », « commander ») |

### Structures de requête vocale courantes

| Schéma | Exemple | Cible d'optimisation |
|---------|---------|-------------------|
| Questions en **qui** | « Qui a fondé Tesla ? » | Knowledge panel, Wikipédia, pages À propos |
| Questions en **quoi** | « Quel est le meilleur CRM pour une petite entreprise ? » | Extrait en vedette, contenu listicle |
| Questions en **où** | « Où se trouve la pharmacie la plus proche ? » | Fiche Google Business Profile, SEO local |
| Questions en **quand** | « Quand ferme Target ? » | Horaires de la fiche Google Business Profile, schema |
| Questions en **comment** | « Comment réparer un robinet qui fuit ? » | Schema How-to, contenu étape par étape |
| Questions en **combien** | « Combien coûte le remplacement d'une toiture ? » | Contenu FAQ, pages de tarification |
| Questions en **puis-je/est-ce que** | « Puis-je retourner des articles chez Costco sans reçu ? » | Pages FAQ, contenu de politique |
| Requêtes « près de moi » | « Cafés près de moi » | SEO local, fiche Google Business Profile |
| Requêtes d'**action** | « Appelle Pizza Hut » / « Commande sur Amazon » | Fiche entreprise, mise en place du commerce vocal |

---

## Optimisation du contenu pour la voix

### Optimisation de l'extrait en vedette (position zéro)

Les assistants vocaux puisent massivement leurs réponses dans les extraits en vedette. Décrocher la position zéro est la tactique de recherche vocale la plus impactante.

| Type d'extrait | Format | Approche d'optimisation |
|-------------|--------|----------------------|
| Paragraphe | Bloc de réponse de 40-60 mots | Répondre directement à la question dans le premier paragraphe, puis développer |
| Liste | Étapes numérotées ou à puces | Utiliser un H2/H3 avec la question, suivi d'une liste ordonnée/non ordonnée |
| Tableau | Comparaison structurée | Utiliser des tableaux HTML avec des en-têtes clairs |
| Vidéo | Résultat YouTube | Optimiser le titre de la vidéo comme une question, ajouter des horodatages |

### Règles de structure du contenu pour la voix

1. **Commencer par la réponse.** Les 1-2 premières phrases doivent répondre directement à la question ciblée
2. **Utiliser des H2 et H3 sous forme de question.** Refléter exactement la formulation utilisée à l'oral
3. **Écrire à un niveau de lecture accessible.** Les assistants vocaux privilégient un langage concis et clair
4. **Limiter les blocs de réponse à 40-60 mots.** La longueur préférée de Google pour les extraits en vedette
5. **Inclure des questions de suivi.** Les questions « Autres questions posées » sont une mine d'or pour la recherche vocale
6. **Utiliser un langage conversationnel.** Écrire comme si vous expliquiez à quelqu'un en face à face

### Optimisation de la page FAQ

Les pages FAQ sont l'un des actifs à plus forte valeur pour la recherche vocale car elles s'alignent naturellement avec le format question-réponse.

**Structure :**
```html
<section itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">How much does roof replacement cost?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">The average roof replacement costs between $5,000 and $15,000
      depending on size, materials, and location. Asphalt shingles are the most affordable
      at $3-5 per square foot, while metal roofing ranges from $7-15 per square foot.</p>
    </div>
  </div>
</section>
```

---

## Schema Speakable (JSON-LD)

Le schema `speakable` indique aux moteurs de recherche quelles sections de votre page sont les plus adaptées à la lecture audio texte-vers-parole. Ceci est particulièrement pertinent pour Google Assistant et le contenu d'actualité.

### Mise en œuvre JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "How Much Does Roof Replacement Cost in 2025?",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".article-summary",
      ".key-answer"
    ]
  },
  "url": "https://example.com/roof-replacement-cost"
}
```

### Consignes pour le contenu speakable
- Ne baliser que des sections concises et autonomes (pas des articles entiers)
- Chaque section speakable doit faire moins de 2-3 phrases
- Éviter les abréviations, le jargon, ou les références visuelles uniquement (« voir le graphique ci-dessous »)
- Rédiger les sections speakable comme si elles allaient être lues à voix haute mot pour mot
- Inclure l'information la plus critique — la réponse, pas le contexte

---

## Optimisation spécifique à chaque plateforme

### Google Assistant
| Facteur | Optimisation |
|--------|-------------|
| Source de données principale | Extraits en vedette + fiche Google Business Profile |
| Requêtes locales | Optimiser la fiche GBP : horaires exacts, catégories, attributs, photos |
| Requêtes d'action | Activer « Réserver avec Google », « Commander avec Google » si applicable |
| Contenu | Schema FAQ, Schema How-To, Schema Speakable |
| Extraits en vedette | Cibler les mots-clés sous forme de question avec du contenu à réponse directe |

### Amazon Alexa
| Facteur | Optimisation |
|--------|-------------|
| Source de données principale | Bing (pas Google), catalogue produit Amazon, Alexa Skills |
| Optimisation de recherche | Optimiser pour Bing : Bing Places, Bing Webmaster Tools |
| Commerce | Optimiser les fiches produit Amazon pour l'achat vocal |
| Skills | Construire une Alexa Skill pour du contenu ou des utilitaires de marque |
| Flash Briefing | Créer une skill Flash Briefing pour du contenu de marque régulier |

### Apple Siri
| Facteur | Optimisation |
|--------|-------------|
| Source de données principale | Apple Maps, Safari/Google, Apple Business Connect |
| Requêtes locales | Revendiquer la fiche Apple Business Connect, garantir l'exactitude |
| Contenu | Les bonnes pratiques SEO web standard s'appliquent (Siri utilise Google/Bing) |
| Intégration d'application | Mettre en œuvre SiriKit dans votre application iOS pour les commandes vocales |
| Raccourcis | Créer des raccourcis Siri pour les actions répétées dans votre application |

---

## Commerce vocal (V-Commerce)

### Paysage actuel du commerce vocal

| Plateforme | Capacité de commerce | Mise en place requise |
|----------|-------------------|----------------|
| Amazon Alexa | Tunnel d'achat complet via Amazon | Optimiser les fiches Amazon, activer l'achat vocal |
| Google Assistant | « Commander avec Google », inventaire local | Google Merchant Center, annonces d'inventaire local |
| Apple Siri | Intégration Apple Pay, achats intégrés | SiriKit, mise en œuvre d'Apple Pay |

### Checklist d'optimisation du commerce vocal

- [ ] Les titres de produit sont descriptifs et adaptés au langage naturel (éviter le bourrage de mots-clés)
- [ ] Les produits les plus vendus ont des descriptions concises et « speakable »
- [ ] Le prix est compétitif (les acheteurs vocaux comparent souvent en posant la question)
- [ ] Le tunnel de recommande est sans friction (la voix excelle pour les achats récurrents)
- [ ] Le nom de marque est phonétiquement clair et facile à reconnaître pour les assistants vocaux
- [ ] Le produit est disponible sur Amazon si vous ciblez le commerce Alexa
- [ ] Les questions liées à « acheter » et « commander » dans le contenu FAQ renvoient vers le tunnel d'achat

---

## Optimisation de la recherche vocale locale

L'intention locale domine la recherche vocale. Plus de la moitié des requêtes vocales ont une intention locale.

### Checklist de recherche vocale locale

| Action | Priorité | Détails |
|--------|----------|---------|
| Fiche Google Business Profile — complète et exacte | Critique | Chaque champ rempli : horaires, catégories, attributs, photos, services |
| Cohérence NAP | Critique | Nom, Adresse, Téléphone identiques sur tous les annuaires |
| Balisage schema local | Élevée | Schema LocalBusiness avec géocoordonnées, horaires, contact |
| Optimisation du contenu « près de moi » | Élevée | Inclure naturellement le quartier, la ville, et les termes régionaux dans le contenu |
| Avis | Élevée | Le volume et la fraîcheur influencent directement les résultats vocaux locaux |
| Apple Business Connect | Moyenne | Revendiquer et optimiser pour les requêtes locales Siri |
| Bing Places | Moyenne | Revendiquer et optimiser pour les requêtes locales Alexa |
| Pages de localisation | Moyenne | Pages spécifiques par ville/quartier avec du contenu unique |
| Q&R sur la fiche Google Business Profile | Moyenne | Ajouter et répondre proactivement aux questions fréquentes |

### Exemple de schema local

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Joe's Italian Kitchen",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "telephone": "+1-512-555-0123",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "11:00",
      "closes": "22:00"
    }
  ],
  "priceRange": "$$",
  "servesCuisine": "Italian"
}
```

---

## Analytics & Mesure

### Suivre la performance de la recherche vocale

L'attribution de la recherche vocale est intrinsèquement difficile car les requêtes vocales n'apparaissent pas distinctement dans la plupart des outils d'analytics. Utiliser ces méthodes de substitution :

| Méthode | Ce qu'elle mesure | Comment la mettre en œuvre |
|--------|-----------------|------------------|
| Suivi des extraits en vedette | Gains de position zéro pour les mots-clés sous forme de question | SEMrush, Ahrefs, ou un outil de suivi SERP dédié |
| Analyse des requêtes longue traîne | Trafic issu de requêtes conversationnelles dans Search Console | Filtrer GSC pour les requêtes de 5+ mots, mots interrogatifs |
| Suivi des requêtes « près de moi » | Proxy du trafic vocal local | Filtre GSC pour les requêtes « près de moi » |
| Insights de la fiche Google Business Profile | Appels, itinéraires, clics vers le site depuis la fiche GBP | Tableau de bord GBP |
| Analytics des skills d'enceinte connectée | Usage des Alexa Skills | Tableaux de bord spécifiques à la plateforme |
| Impressions speakable | Contenu lu à voix haute par les assistants | Google Search Console (limité) |

### KPI de la recherche vocale

| KPI | Définition | Objectif |
|-----|-----------|--------|
| Détention d'extraits en vedette | % des mots-clés cibles sous forme de question avec position zéro | >30 % des requêtes suivies |
| Trafic de questions longue traîne | Sessions organiques issues de requêtes de 5+ mots | En croissance mois après mois |
| Taux d'action locale | Appels + itinéraires depuis la fiche GBP par mois | En hausse trimestre après trimestre |
| Performance de la page FAQ | Pages vues, temps sur la page, taux de rebond du contenu FAQ | Taux de rebond <50 %, temps >1 min |
| Chiffre d'affaires du commerce vocal | Chiffre d'affaires attribué aux achats initiés par la voix | Suivi via les analytics de la plateforme |
| Trafic organique Bing | Proxy de la performance des requêtes Alexa | Stable ou en croissance |

---

## Checklist d'optimisation de la recherche vocale — Résumé

- [ ] Auditer les 50 principaux mots-clés de marque et de catégorie pour les variantes sous forme de question
- [ ] Créer ou optimiser les pages FAQ avec le balisage schema FAQ
- [ ] Mettre en œuvre le schema speakable sur les pages de contenu clés
- [ ] Optimiser le contenu pour les extraits en vedette (blocs de réponse de 40-60 mots, listes, tableaux)
- [ ] S'assurer que la fiche Google Business Profile est complète à 100 % avec tous les attributs
- [ ] Revendiquer les fiches Apple Business Connect et Bing Places
- [ ] Rédiger le contenu à un niveau de lecture accessible en utilisant un langage naturel
- [ ] Mettre en œuvre le schema LocalBusiness avec des détails complets
- [ ] Mettre en place le suivi des extraits en vedette pour les mots-clés cibles sous forme de question
- [ ] Évaluer le développement d'une Alexa Skill pour un utilitaire de marque (pour Google Assistant/Gemini, investir dans le contenu structuré et le schema — les actions conversationnelles autonomes ont été abandonnées en juin 2023)
- [ ] Revoir et optimiser les fiches produit pour la préparation au commerce vocal
- [ ] Surveiller Google Search Console pour la croissance des requêtes conversationnelles

---

> **L'optimisation pour la recherche vocale n'est pas une discipline séparée — c'est l'évolution du SEO.** Les marques qui gagnent en recherche vocale sont celles qui répondent clairement aux questions, structurent correctement les données, et apparaissent au moment précis où quelqu'un parle au lieu de taper.

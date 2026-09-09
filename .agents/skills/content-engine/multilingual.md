# Contenu multilingue — Guide de localisation

## Checklist de préparation à la localisation

### Préparation du contenu
- [ ] Le contenu source est finalisé (ne jamais localiser un brouillon)
- [ ] Les références culturelles sont identifiées et signalées pour adaptation
- [ ] Les idiomes, l'argot, et l'humour sont marqués pour transcréation
- [ ] Les termes de marque et noms de produits ne devant PAS être traduits sont listés
- [ ] Un glossaire des termes clés avec traductions approuvées existe
- [ ] Le guide de style est adapté pour chaque locale cible

### Préparation technique
- [ ] Le CMS prend en charge le contenu multilingue (URL séparées par locale)
- [ ] La structure d'URL est décidée (sous-domaine, sous-répertoire, ou ccTLD)
- [ ] Les balises hreflang sont correctement implémentées
- [ ] L'encodage de caractères prend en charge les langues cibles (UTF-8)
- [ ] Le support de mise en page RTL (droite-à-gauche) pour l'arabe, l'hébreu, le farsi, l'ourdou

### Préparation juridique
- [ ] Les mentions légales requises par marché sont identifiées
- [ ] La politique de confidentialité est localisée pour chaque juridiction
- [ ] Le consentement aux cookies est adapté aux réglementations locales
- [ ] Les affirmations produit sont vérifiées pour leur légalité dans chaque marché

---

## Cadre d'adaptation culturelle

| Dimension | Quoi adapter | Exemple |
|-----------|-------------|---------|
| **Ton** | Le niveau de formalité varie selon la culture | Allemagne/Japon : plus formel ; US/Australie : plus décontracté |
| **Humour** | Ce qui est drôle varie énormément | Les jeux de mots se traduisent rarement ; le comique de situation est plus universel |
| **Imagerie** | Les normes culturelles visuelles diffèrent | Gestes des mains, vêtements, structure familiale dans les images |
| **Couleurs** | Le symbolisme des couleurs varie | Blanc = pureté (Occident) vs deuil (parties de l'Asie) |
| **Nombres** | Chiffres porte-bonheur/malheur | 4 porte malheur en Chine/au Japon ; 13 dans les cultures occidentales |
| **Dates** | Le format varie | MM/JJ/AAAA (US) vs JJ/MM/AAAA (UE/UK) vs AAAA/MM/JJ (ISO) |
| **Devise** | Devise locale et formatage | 1 000,00 $ (US) vs 1.000,00 € (Allemagne) |
| **Mesure** | Impérial vs métrique | US : miles, livres, Fahrenheit. La majeure partie du monde : km, kg, Celsius |
| **Noms** | L'ordre des noms varie | Prénom Nom (Occident) vs Nom Prénom (Asie de l'Est) |
| **Témoignages** | Les attentes de preuve sociale diffèrent | Certaines cultures préfèrent les figures d'autorité, d'autres les pairs |

---

## Traduction vs transcréation

| Approche | Quand l'utiliser | Processus |
|----------|-----------|---------|
| **Traduction** | Documentation technique, texte juridique, contenu factuel | Traduction directe préservant le sens |
| **Localisation** | Contenu marketing, interface utilisateur, descriptions produit | Traduction + adaptation culturelle/marché |
| **Transcréation** | Texte publicitaire, slogans, contenu émotionnel, campagnes | Recréation créative complète pour la culture cible |

### La transcréation est requise lorsque :
- Le contenu repose sur des jeux de mots, calembours, ou idiomes
- L'appel émotionnel diffère selon les cultures
- Le contexte culturel change le sens
- Le CTA doit motiver différemment

---

## SEO pour le contenu multilingue

### Implémentation hreflang
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/page" />
<link rel="alternate" hreflang="es-es" href="https://example.com/es/page" />
<link rel="alternate" hreflang="de-de" href="https://example.com/de/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

### Options de structure d'URL
| Option | Exemple | Avantages | Inconvénients |
|--------|---------|------|------|
| Sous-répertoire | example.com/de/ | Facile à gérer, hérite de l'autorité du domaine | Signal de géo-ciblage moindre |
| Sous-domaine | de.example.com | Séparation claire | Peut ne pas hériter de l'autorité complète |
| ccTLD | example.de | Signal géo le plus fort | Coûteux, SEO séparé par domaine |

### Recherche de mots-clés localisée
- NE PAS simplement traduire les mots-clés anglais — le comportement de recherche diffère selon la langue
- Utiliser des outils de mots-clés locaux (Google Keyword Planner ciblé sur le pays/langue)
- Vérifier le volume de recherche pour les variations locales
- Étudier le contenu concurrent local pour les schémas de mots-clés

---

## Considérations RTL (droite-à-gauche)

Pour le contenu en arabe, hébreu, farsi, ourdou :
- L'alignement du texte s'inverse (texte du corps aligné à droite)
- La mise en page se reflète (navigation, barres latérales, images retournées horizontalement)
- Les nombres restent de gauche à droite au sein du texte RTL
- Les icônes à signification directionnelle se retournent (flèches, barres de progression)
- Support du texte bidirectionnel pour le contenu mixte LTR/RTL
- Tester minutieusement — de nombreuses mises en page se cassent avec le RTL

---

## Checklist d'assurance qualité

- [ ] Un locuteur natif a relu tout le contenu traduit
- [ ] La terminologie de marque est utilisée de façon cohérente sur toutes les locales
- [ ] Aucun artefact de traduction automatique (formulation maladroite, faux amis)
- [ ] Les références culturelles sont appropriées pour l'audience cible
- [ ] Toutes les pages localisées ont les balises hreflang correctes
- [ ] Les formulaires fonctionnent avec les formats d'adresse/téléphone locaux
- [ ] Les moyens de paiement sont pertinents pour le marché
- [ ] Le formatage de date, heure, devise correspond à la locale
- [ ] Les images sont culturellement appropriées
- [ ] Les mentions légales sont spécifiques au marché et correctes

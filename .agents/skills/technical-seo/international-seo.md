# SEO technique international — Hreflang, structures d'URL et architecture de site globale

Une référence complète pour construire et maintenir des sites web ciblant plusieurs pays, langues, ou régions. Le SEO international est l'un des domaines les plus techniquement complexes du SEO — une seule erreur de hreflang peut faire classer la mauvaise version linguistique dans le mauvais pays.

---

## Stratégies de structure d'URL

### Trois approches

| Stratégie | Exemple | Avantages | Inconvénients | Idéal pour |
|---|---|---|---|---|
| **ccTLD** (domaine de premier niveau national) | `example.de`, `example.co.uk`, `example.fr` | Signal de ciblage géographique le plus fort ; les utilisateurs font confiance aux domaines locaux ; séparation claire des propriétés | Le plus coûteux (plusieurs domaines à enregistrer et maintenir) ; le link equity ne se transfère pas entre domaines ; nécessite des propriétés GSC séparées ; autorité SEO séparée par domaine | Entreprises avec une forte présence locale dans chaque marché ; marque déjà bien connue dans les pays cibles |
| **Sous-domaine** | `de.example.com`, `uk.example.com`, `fr.example.com` | Facile à mettre en place ; peut héberger sur différents serveurs/CDN par région ; propriétés GSC séparées possibles ; ciblage géographique dans GSC | Traité comme des sites semi-séparés par Google ; le link equity du domaine racine se transfère de façon limitée ; confiance utilisateur légèrement inférieure au ccTLD | Entreprises souhaitant une séparation régionale avec un domaine unique ; sites nécessitant un hébergement différent par région |
| **Sous-répertoire** | `example.com/de/`, `example.com/uk/`, `example.com/fr/` | Tout le link equity reste sur un seul domaine ; le plus facile à maintenir ; configuration d'hébergement unique ; propriété GSC unique avec filtrage ; consolidation d'autorité de domaine la plus forte | Ne peut pas héberger sur différents serveurs par région sans une configuration CDN complexe ; signal de ciblage géographique moins clair que le ccTLD | La plupart des entreprises ; la recommandation par défaut sauf exigences spécifiques contraires |

### Cadre de décision

**Choisir le ccTLD lorsque :**
- La marque a des entités commerciales distinctes par pays
- Une forte identité de marque locale est essentielle (par ex. banque, gouvernement, services juridiques)
- Le budget permet de maintenir des domaines séparés et des stratégies SEO séparées
- Les pays cibles ont une forte préférence pour les ccTLD (par ex. .de en Allemagne, .co.uk au Royaume-Uni)

**Choisir le sous-domaine lorsque :**
- Le contenu régional est géré par des équipes séparées ou hébergé sur une infrastructure différente
- L'entreprise a besoin d'analytics GSC séparés par région mais ne veut pas plusieurs domaines
- Le contenu et l'expérience utilisateur diffèrent significativement par région (pas seulement la langue)

**Choisir le sous-répertoire (recommandation par défaut) lorsque :**
- La consolidation de l'autorité SEO est une priorité (la plupart des cas)
- Une équipe unique gère le site web globalement
- Le budget et les ressources sont limités
- L'entreprise entre sur de nouveaux marchés et n'a pas d'autorité locale établie

### Langue vs région dans la structure d'URL

| Motif d'URL | Cible | Exemple |
|---|---|---|
| `/es/` | Langue espagnole (toutes régions) | Un article de blog pour tous les hispanophones |
| `/es-mx/` | Langue espagnole, Mexique spécifiquement | Une page produit avec des prix, une livraison et des exigences légales spécifiques au Mexique |
| `/es-es/` | Langue espagnole, Espagne spécifiquement | Une page produit avec des prix et réglementations spécifiques à l'Espagne |

Utiliser des chemins langue seule (`/es/`) lorsque le contenu est identique pour tous les locuteurs de cette langue. Utiliser des chemins langue-région (`/es-mx/`) lorsque le contenu diffère par pays (prix, légal, livraison, références culturelles, numéros de téléphone locaux, devise).

---

## Implémentation du hreflang

### Objectif

Les balises hreflang indiquent aux moteurs de recherche quelle version linguistique et régionale d'une page afficher aux utilisateurs à différents emplacements. Sans hreflang, Google peut afficher la version française d'une page à des utilisateurs anglophones, ou la version US à des utilisateurs britanniques.

### Syntaxe

L'attribut hreflang utilise les codes de langue ISO 639-1 et des codes de pays ISO 3166-1 Alpha-2 optionnels :

| Format | Signification | Exemple |
|---|---|---|
| `hreflang="en"` | Anglais (toute région) | Contenu anglais général |
| `hreflang="en-us"` | Anglais (États-Unis) | Prix et contenu spécifiques aux US |
| `hreflang="en-gb"` | Anglais (Royaume-Uni) | Prix et contenu spécifiques au Royaume-Uni |
| `hreflang="es"` | Espagnol (toute région) | Contenu espagnol général |
| `hreflang="es-mx"` | Espagnol (Mexique) | Contenu spécifique au Mexique |
| `hreflang="zh-hans"` | Chinois (simplifié) | Contenu en chinois simplifié |
| `hreflang="zh-hant"` | Chinois (traditionnel) | Contenu en chinois traditionnel |
| `hreflang="x-default"` | Par défaut/repli | Page de sélection de langue ou version linguistique par défaut |

### Méthodes de mise en œuvre

**Méthode 1 : éléments lien HTML (dans le `<head>`)**

```html
<link rel="alternate" hreflang="en-us" href="https://example.com/page">
<link rel="alternate" hreflang="en-gb" href="https://example.com/uk/page">
<link rel="alternate" hreflang="de" href="https://example.com/de/page">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```

**Idéal pour** : les sites avec moins de 20 versions langue/région par page. Au-delà, le `<head>` HTML devient encombré.

**Méthode 2 : en-têtes HTTP**

```
Link: <https://example.com/page>; rel="alternate"; hreflang="en-us",
      <https://example.com/uk/page>; rel="alternate"; hreflang="en-gb",
      <https://example.com/de/page>; rel="alternate"; hreflang="de",
      <https://example.com/fr/page>; rel="alternate"; hreflang="fr",
      <https://example.com/page>; rel="alternate"; hreflang="x-default"
```

**Idéal pour** : les ressources non-HTML (PDF, documents) nécessitant hreflang mais ne pouvant pas contenir de balises HTML.

**Méthode 3 : sitemap XML (recommandée pour les grands sites)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/page</loc>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/page"/>
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/uk/page"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/page"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/page"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page"/>
  </url>
  <url>
    <loc>https://example.com/uk/page</loc>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/page"/>
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/uk/page"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/page"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/page"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page"/>
  </url>
</urlset>
```

**Idéal pour** : les sites avec 20+ versions langue/région, ou tout site où maintenir hreflang dans le `<head>` HTML est impraticable. La méthode sitemap garde le HTML propre et est plus facile à générer programmatiquement.

### Erreurs courantes de hreflang

| Erreur | Impact | Correctif |
|---|---|---|
| **Absence de hreflang auto-référencé** | Google peut ne pas traiter correctement l'ensemble hreflang | Chaque page doit inclure une balise hreflang pointant vers elle-même |
| **Absence de x-default** | Aucun repli pour les utilisateurs dans des régions/langues non listées | Ajouter x-default pointant vers la page de sélection de langue ou la version linguistique principale |
| **Absence de liens retour (bidirectionnels)** | Si la page A lie en hreflang vers la page B, mais que la page B ne renvoie pas vers la page A, Google ignore l'annotation | S'assurer que chaque page de l'ensemble hreflang inclut l'ensemble complet de toutes les versions alternatives |
| **Hreflang pointant vers une URL non canonique** | Si la canonique et le hreflang référencent des URL différentes, Google peut ignorer le hreflang | Les valeurs href du hreflang doivent correspondre à l'URL canonique de chaque page |
| **Hreflang pointant vers une page noindex/bloquée** | Google ne peut pas indexer une page à laquelle il ne peut pas accéder ; le signal hreflang est perdu | Toutes les cibles hreflang doivent être indexables, crawlables, et renvoyer 200 |
| **Codes de langue/région incorrects** | `hreflang="uk"` n'est pas valide (UK est un code de pays ; le code de langue pour l'ukrainien est `uk`, mais l'anglais du Royaume-Uni est `en-gb`) | Utiliser ISO 639-1 pour la langue et ISO 3166-1 Alpha-2 pour le pays. Valider les codes |
| **Formats d'URL incohérents** | Mélanger `http` et `https`, ou `www` et non-www, dans les URL hreflang | Utiliser le format exact de l'URL canonique de façon cohérente sur toutes les annotations hreflang |
| **Utiliser hreflang pour du contenu dupliqué** | Deux pages avec le même contenu dans la même langue, juste des URL différentes | Hreflang sert aux différentes versions langue/région. Utiliser canonical pour les doublons de même langue |

### Validation du hreflang

- **Screaming Frog** : crawle toutes les annotations hreflang et signale les liens retour manquants, les codes invalides, et les conflits avec les canoniques
- **Générateur de balises Hreflang d'Aleyda Solis** : génère le balisage hreflang correct à partir d'une matrice d'URL
- **Outil de test de balises Hreflang de Merkle** : valide l'implémentation du hreflang sur les pages en ligne

---

## Ciblage géographique

### Comment Google détermine le ciblage géographique

L'outil de ciblage international de Google Search Console a été supprimé — il n'existe plus de paramètre manuel de ciblage par pays pour les sous-répertoires ou sous-domaines. Google déduit désormais la pertinence géographique à partir de signaux sur site et d'infrastructure :

1. **ccTLD** : un domaine de premier niveau national (par ex. `example.de`) est le signal le plus fort et est automatiquement ciblé géographiquement
2. **Annotations hreflang** : les codes de région `hreflang` (par ex. `en-gb`, `de-de`) indiquent à Google quel pays/langue chaque version sert
3. **Emplacement du serveur et locale du CDN** : l'emplacement d'hébergement et la configuration edge du CDN fournissent un signal de support faible
4. **Signaux de contenu local** : devise locale, adresses, numéros de téléphone, langue, et liens depuis des sites du pays

**Remarque** : les codes de région hreflang ciblent un **pays**, pas seulement une langue. Pour un ciblage par langue sans restriction de pays, utiliser des codes hreflang langue seule (par ex. `de` pour les germanophones dans le monde entier).

### Redirection basée sur l'IP : à ne pas faire

Rediriger les utilisateurs en fonction de leur adresse IP est une erreur courante en SEO international :

- **Problème** : Googlebot crawle principalement depuis des adresses IP US. Si vous redirigez les IP US vers la version anglaise, Google pourrait ne jamais crawler ou indexer vos versions non anglaises
- **Alternative** : afficher une bannière suggérant la version langue/région appropriée (par ex. « Il semble que vous soyez en Allemagne. Voir notre site allemand ? ») sans rediriger. Laisser l'utilisateur choisir
- **Exception** : utiliser la détection IP pour définir une préférence de langue par défaut lors de la première visite est acceptable si l'utilisateur peut facilement basculer et si toutes les versions sont accessibles aux crawlers sans blocage basé sur l'IP

---

## Localisation vs traduction du contenu

### Traduction

Conversion linguistique directe du contenu d'une langue à une autre. Nécessaire mais insuffisante pour un SEO international efficace.

### Localisation

Adapter le contenu au contexte culturel, légal, et de marché de la région cible :

| Dimension | Traduction seule | Localisation complète |
|---|---|---|
| **Devise** | Montants en dollars laissés tels quels | Convertis en devise locale |
| **Unités** | Mesures impériales | Métrique (ou standard local) |
| **Formats de date** | MM/JJ/AAAA | JJ/MM/AAAA ou AAAA-MM-JJ selon la locale |
| **Numéros de téléphone** | Format US | Format local avec indicatif pays |
| **Références légales** | Réglementations US | Réglementations et conformité locales |
| **Références culturelles** | Fêtes, sports, expressions US | Références localement pertinentes |
| **Images** | Photos stock globales | Personnes, contextes, produits localement pertinents |
| **Moyens de paiement** | Cartes de crédit | iDEAL (Pays-Bas), Klarna (pays nordiques), PIX (Brésil), UPI (Inde) |
| **Preuve sociale** | Témoignages globaux | Témoignages et études de cas de clients locaux |
| **Ciblage de mots-clés** | Mots-clés traduits | Mots-clés recherchés localement (le comportement de recherche diffère) |

### Recherche de mots-clés internationale

Les mots-clés ne se traduisent pas 1:1 entre les langues. Les différences incluent :

- **Volume de recherche** : un mot-clé avec 10 000 recherches mensuelles en anglais peut avoir une traduction directe avec seulement 500 recherches en allemand car les Allemands utilisent une expression différente
- **Intention de recherche** : la même expression traduite peut avoir une intention différente selon les marchés
- **Expressions familières** : « sneakers » (US) vs « trainers » (UK) vs « Turnschuhe » (DE) — tous signifient chaussures de sport
- **Marque vs générique** : certains marchés recherchent davantage les noms de marque que les termes génériques (ou l'inverse)

Toujours mener la recherche de mots-clés nativement dans chaque langue cible en utilisant des données de recherche locales, plutôt qu'en traduisant une liste de mots-clés anglais.

---

## Modèles d'architecture de site international

### Modèle 1 : domaine unique, sous-répertoires (le plus courant)

```
example.com/           (Anglais, US — par défaut)
example.com/uk/        (Anglais, UK)
example.com/de/        (Allemand)
example.com/fr/        (Français)
example.com/es-mx/     (Espagnol, Mexique)
```

- Autorité de domaine unique
- Une seule configuration d'hébergement (utiliser un CDN pour la performance mondiale)
- Hreflang dans le sitemap XML
- GSC : une propriété avec filtrage au niveau du répertoire

### Modèle 2 : sous-domaines par région

```
www.example.com        (Anglais, US — par défaut)
uk.example.com         (Anglais, UK)
de.example.com         (Allemand)
fr.example.com         (Français)
mx.example.com         (Espagnol, Mexique)
```

- Autorité semi-séparée (les sous-domaines héritent d'une partie de l'autorité du domaine racine)
- Peut héberger sur différents serveurs/CDN par région pour la performance
- Propriétés GSC séparées par sous-domaine
- Plus complexe à gérer

### Modèle 3 : ccTLD par pays

```
example.com            (Anglais, US)
example.co.uk          (Anglais, UK)
example.de             (Allemand)
example.fr             (Français)
example.com.mx         (Espagnol, Mexique)
```

- Autorité de domaine complètement séparée
- Signal de ciblage géographique le plus fort
- Le plus coûteux et complexe à maintenir
- Chaque domaine nécessite sa propre stratégie de netlinking et de SEO

### Modèle 4 : hybride (ccTLD + sous-répertoires pour les langues)

```
example.de/            (Allemand, Allemagne)
example.de/en/         (Version anglaise pour l'Allemagne)
example.co.uk/         (Anglais, UK)
example.com/           (Anglais, US — par défaut)
example.com/es/        (Espagnol, général)
example.com/fr/        (Français, général)
```

- Utilisé lorsque certains marchés justifient des ccTLD (marchés majeurs) mais pas d'autres
- Combine de forts signaux locaux pour les marchés clés avec une autorité consolidée pour les marchés secondaires

---

## CDN et emplacement du serveur

### Impact sur la performance internationale

- **L'emplacement du serveur affecte le TTFB** : un serveur aux US servant des pages à des utilisateurs en Australie ajoute 200-300 ms de latence par requête
- **Le CDN est essentiel pour les sites internationaux** : mettre en cache les ressources statiques et le HTML aux emplacements edge proches des utilisateurs dans chaque marché cible
- **Principaux fournisseurs de CDN** : Cloudflare (offre gratuite la plus large), Fastly (meilleure purge en temps réel), CloudFront (idéal pour l'infrastructure AWS), Akamai (entreprise)

### Configuration CDN pour les sites internationaux

1. **Mettre en cache le HTML à la périphérie** — pas seulement les ressources statiques. Cela élimine la latence TTFB pour les pages mises en cache
2. **Définir des clés de cache incluant la langue/région** — s'assurer que les pages `/de/` sont mises en cache séparément des pages `/en/`
3. **Utiliser l'en-tête Vary** si vous servez un contenu différent depuis la même URL selon Accept-Language : `Vary: Accept-Language` (non recommandé — l'approche par sous-répertoire est plus propre)
4. **Surveiller les taux de succès du cache CDN par région** — des taux de succès faibles dans une région indiquent soit une présence edge insuffisante, soit une expiration de cache trop agressive

---

## Parts de marché des moteurs de recherche par pays

| Pays | Moteur de recherche principal | Part de marché | Remarques |
|---|---|---|---|
| États-Unis | Google | ~87 % | Bing a ~7 % (important pour le B2B en raison des paramètres par défaut en entreprise) |
| Royaume-Uni | Google | ~92 % | |
| Allemagne | Google | ~90 % | |
| France | Google | ~91 % | |
| Japon | Google | ~76 % | Yahoo Japan (~15 %) utilise l'index de Google |
| Corée du Sud | Naver | ~55 % | Google ~35 %. Naver nécessite une optimisation séparée |
| Chine | Baidu | ~65 % | Google est bloqué. Baidu nécessite une licence ICP, du chinois simplifié, un domaine .cn |
| Russie | Yandex | ~60 % | Google ~38 %. Yandex a des facteurs de classement différents |
| République tchèque | Seznam | ~25 % | Google ~72 %. Seznam reste significatif |
| Brésil | Google | ~96 % | |
| Inde | Google | ~98 % | |

### Implications SEO par moteur de recherche

**Baidu (Chine) :**
- Nécessite une licence ICP pour héberger en Chine (obligatoire)
- Le contenu en chinois simplifié est essentiel
- Le ccTLD .cn est fortement préféré
- Le rendu JavaScript est limité — SSR ou HTML statique requis
- La balise meta keywords est encore utilisée comme signal de classement
- Baidu Webmaster Tools pour la soumission et la surveillance

**Yandex (Russie) :**
- Signaux comportementaux forts (les métriques d'engagement utilisateur affectent les classements)
- Yandex Webmaster Tools pour la soumission et la surveillance
- L'algorithme de classement régional diffère de Google (forts signaux géographiques locaux)
- Prend en charge ses propres formats de données structurées en plus de schema.org
- Plus lent à crawler que Google — les sitemaps sont critiques

**Naver (Corée du Sud) :**
- Le contenu de blog et de connaissances (Naver Blog, Naver Knowledge iN) se classe de façon prépondérante
- Naver Webmaster Tools pour la soumission
- Le contenu en coréen sur les propres plateformes de Naver est prioritaire
- Envisager Naver Blog comme un canal de contenu en complément du site web

---

## Considérations légales et de conformité

### RGPD (Espace économique européen)

- Bannière de consentement aux cookies requise avant de définir des cookies non essentiels
- La politique de confidentialité doit être disponible dans la langue locale
- Accords de traitement des données requis avec les outils tiers
- Le droit à l'effacement affecte le contenu généré par l'utilisateur
- L'analytics doit être conforme (analytics côté serveur, IP anonymisée, suivi basé sur le consentement)

### CCPA/CPRA (Californie, US)

- Lien « Ne pas vendre mes informations personnelles » requis pour les utilisateurs californiens
- La politique de confidentialité doit divulguer les pratiques de collecte de données

### Directive ePrivacy (UE)

- S'applique aux communications électroniques, cookies, et suivi
- Plus stricte que le RGPD pour certaines activités marketing (l'email marketing nécessite un opt-in explicite)

### Exigences spécifiques par pays

| Pays | Exigence | Impact sur le site web |
|---|---|---|
| Allemagne | Page Impressum (mentions légales) obligatoire | Ajouter une page `/impressum` avec les détails de l'entreprise |
| France | Mentions légales requises | Ajouter une page `/mentions-legales` |
| Chine | Numéro de licence ICP affiché sur la page d'accueil | Requis pour l'hébergement en Chine |
| Australie | Conformité au Privacy Act, loi anti-spam pour l'email | Politique de confidentialité et mécanismes de consentement e-mail |
| Brésil | LGPD (similaire au RGPD) | Consentement aux cookies et conformité de confidentialité |
| Canada | CASL pour l'email marketing, PIPEDA pour la confidentialité | Consentement explicite pour les e-mails marketing |
| Japon | APPI (loi sur la protection des données) | Politique de confidentialité et mécanismes de consentement |

### Données structurées pour la conformité légale

- Implémenter le schema Organization avec `address` par entité de pays
- Utiliser le schema LocalBusiness pour les emplacements physiques dans chaque pays
- Inclure `areaServed` dans les schemas Service et Product pour clarifier la disponibilité géographique
- S'assurer que `priceRange` et `priceCurrency` dans le schema Product correspondent à la devise et aux prix locaux
</content>

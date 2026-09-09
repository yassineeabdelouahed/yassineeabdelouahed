---
name: hreflang-check
description: "Auditer l'implémentation hreflang à partir de HTML, XML de sitemap, ou exports d'outils SEO fournis (ne crawle pas les sites) — en exécutant sept vérifications : balises auto-référentielles, paires bidirectionnelles, codes ISO 639-1/3166-1 valides, x-default, doublons, URL absolues, et cohérence des URL — produisant un score sur 0-100, une matrice de couverture linguistique, et des extraits de code corrigés par problème. Se déclenche sur « /digital-marketing-pro:hreflang-check », « audite nos balises hreflang », « pourquoi Google sert-il la mauvaise version linguistique », « vérifie la configuration x-default », « valide nos balises SEO international ». Compare les constats aux langues configurées de la marque dans profile.json pour signaler les marchés sans couverture hreflang."
---

# /digital-marketing-pro:hreflang-check

## Objectif

Auditer l'implémentation des balises hreflang pour le SEO multilingue et
multirégional. Les annotations hreflang indiquent aux moteurs de recherche quelle
version linguistique et régionale d'une page servir à quel public — lorsqu'elles sont
mal implémentées, la mauvaise version linguistique apparaît dans les résultats de
recherche, les pages entrent en concurrence entre elles pour les mêmes requêtes, et du
trafic organique international est perdu à cause d'un contenu mal servi. Cette
commande réalise un audit technique approfondi de l'implémentation hreflang,
vérifiant que toutes les versions linguistiques sont correctement recoupées avec des
annotations correctes, que chaque page se référence elle-même, que les références sont
bidirectionnelles (si la page A pointe vers la page B, la page B pointe en retour vers
la page A), que les codes langue-région sont valides, que le repli x-default est
configuré, et qu'aucune référence orpheline ne pointe vers des pages inexistantes.

Critique pour toute marque exploitant des sites web multilingues ou multirégionaux.
Les erreurs hreflang comptent parmi les problèmes de SEO international les plus
courants — elles sont invisibles pour les utilisateurs, rarement détectées lors du
contrôle qualité manuel, et dégradent silencieusement la performance de recherche sur
chaque marché concerné. Même une seule référence bidirectionnelle manquante peut
empêcher les moteurs de recherche d'associer correctement les versions linguistiques,
provoquant le classement de la mauvaise page ou la suppression des signaux de contenu
dupliqué pour les deux versions. Cette commande fait apparaître chaque erreur
d'implémentation avec des instructions de correction précises et des extraits de code
corrigés.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **URL du site web ou du sitemap** : Le point de départ de l'audit. Peut être une URL
  de page unique (audite le hreflang sur cette page et ses alternatives référencées),
  une URL de sitemap (audite toutes les pages listées dans le sitemap), ou une liste
  d'URL de pages spécifiques à vérifier. Remarque : le plugin ne crawle pas
  directement les sites web — si une URL est fournie, l'utilisateur sera guidé pour
  fournir le code source HTML ou les données hreflang à analyser. Alternativement,
  l'utilisateur peut coller directement le code source HTML, des ensembles de balises
  hreflang, ou des données hreflang exportées
- **URL de pages spécifiques à vérifier** (optionnel) : Un sous-ensemble de pages sur
  lequel concentrer l'audit — utile pour auditer une section spécifique (par exemple,
  toutes les pages produit, tous les articles de blog) plutôt que le site entier. Si
  omis, toutes les pages avec des annotations hreflang dans les données fournies sont
  auditées
- **Codes langue-région attendus** (optionnel) : L'ensemble des codes langue-région
  qui devraient apparaître dans les annotations hreflang (par exemple, en-US, de-DE,
  fr-FR, es-ES, ja-JP). Par défaut, les langues configurées de la marque depuis la
  configuration linguistique dans profile.json. Utilisé pour signaler les versions
  linguistiques manquantes — si la marque cible de-DE mais qu'aucun hreflang pour
  de-DE n'existe sur une page, ceci est signalé comme une lacune

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json`
   pour obtenir le slug actif, puis charger
   `~/.claude-marketing/brands/{slug}/profile.json`. Charger la configuration
   linguistique pour déterminer les langues attendues — langue principale, langues
   secondaires, et langues de contenu. Celles-ci forment l'ensemble hreflang attendu
   auquel chaque page devrait idéalement faire référence. Appliquer les règles de
   conformité pour les marchés ciblés (`skills/context-engine/compliance-rules.md`) et
   le contexte sectoriel. Vérifier aussi les guidelines dans
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes,
   charger toute guideline SEO international. Vérifier les SOP d'agence dans
   `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer une
   marque d'abord (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les
   valeurs par défaut.
2. **Obtenir les données hreflang** : Si une URL est fournie, noter que le crawl réel
   d'un site web nécessite un outillage externe — le plugin n'effectue pas de requêtes
   HTTP vers des sites web arbitraires. Guider l'utilisateur pour fournir les données
   hreflang dans l'un de ces formats : (a) code source HTML brut des pages contenant
   des balises `<link rel="alternate" hreflang="..." href="...">`, (b) annotations
   hreflang dans les en-têtes HTTP, (c) sitemap XML avec des entrées hreflang
   `xhtml:link`, (d) un export structuré d'un outil SEO (Screaming Frog, Sitebulb,
   Ahrefs) listant les annotations hreflang par URL, ou (e) une liste de
   correspondances URL-vers-langue compilée manuellement. Si l'utilisateur a déjà
   fourni du HTML ou des données hreflang en ligne, passer directement à l'analyse.
3. **Analyser toutes les annotations hreflang** : Extraire chaque annotation hreflang
   des données fournies. Pour chaque page, construire une carte de : l'URL propre de
   la page, et chaque attribut `hreflang` avec son URL `href` associée. Suivre la
   source de chaque annotation (balise HTML `<link>`, en-tête HTTP, ou sitemap XML)
   puisque la méthode d'implémentation affecte la façon dont les corrections doivent
   être appliquées. Construire une matrice de référence croisée complète : pour
   chaque page, quelles autres pages référence-t-elle, et dans quelles langues.
4. **Vérifier chaque page pour la correction hreflang** : Pour chaque page avec des
   annotations hreflang, exécuter les vérifications suivantes :
   - **(a) Présence de la balise auto-référentielle** : Chaque page doit inclure une
     annotation hreflang pointant vers elle-même avec son propre code langue-région.
     L'absence de balises auto-référentielles est l'erreur hreflang la plus courante
     et amène les moteurs de recherche à ignorer l'ensemble hreflang entier pour cette
     page. Sévérité : critique.
   - **(b) Références bidirectionnelles** : Si la page A en en-US référence la page B
     en de-DE, alors la page B doit aussi référencer la page A en en-US. Vérifier
     chaque paire de références pour la cohérence bidirectionnelle. Les références
     unidirectionnelles sont traitées comme des erreurs par les moteurs de recherche
     et peuvent entraîner l'ensemble d'annotations tout entier à être ignoré.
     Sévérité : critique.
   - **(c) Codes langue-région valides** : Valider chaque valeur hreflang selon ISO
     639-1 pour la composante langue et ISO 3166-1 Alpha-2 pour la composante région
     optionnelle. Erreurs courantes : utiliser `en-UK` au lieu de `en-GB`, utiliser
     des codes à trois lettres comme `eng` au lieu de `en`, utiliser des codes pays
     seuls comme `US` sans le préfixe de langue. Sévérité : critique pour les codes
     invalides (les moteurs de recherche les ignorent), avertissement pour les codes
     non standards mais analysables.
   - **(d) Présence de la balise x-default** : Vérifier qu'une annotation hreflang
     x-default existe, pointant vers la page de repli pour les utilisateurs dont la
     langue ne correspond à aucun hreflang spécifique. Pointe généralement vers la
     version anglaise ou une page de sélection de langue. L'absence de x-default
     signifie que les utilisateurs dans des régions non ciblées peuvent voir une
     version linguistique arbitraire. Sévérité : avertissement.
   - **(e) Pas de codes de langue en double** : Vérifier que chaque page n'a pas
     plusieurs annotations hreflang avec le même code langue-région pointant vers des
     URL différentes. Les codes en double créent de l'ambiguïté et les moteurs de
     recherche peuvent ignorer toutes les annotations pour cette langue. Sévérité :
     critique.
   - **(f) URL absolues** : Vérifier que toutes les valeurs href dans les annotations
     hreflang sont des URL absolues (commençant par https:// ou http://), pas des
     chemins relatifs. Les URL relatives dans hreflang sont invalides selon la
     spécification. Sévérité : critique.
   - **(g) Cohérence des URL** : Vérifier que toutes les URL référencées utilisent des
     protocoles cohérents (toutes HTTPS ou toutes HTTP, pas mélangées), des préfixes
     www/non-www cohérents, et des conventions de barre oblique finale cohérentes.
     Les incohérences peuvent amener les moteurs de recherche à traiter les
     références comme pointant vers des pages différentes. Sévérité : avertissement.
5. **Recouper avec la configuration linguistique de la marque** : Comparer l'ensemble
   des codes langue-région trouvés dans les annotations hreflang à celles configurées
   pour la marque (depuis la configuration linguistique de profile.json ou les codes
   attendus fournis par l'utilisateur). Signaler toute langue configurée absente des
   annotations hreflang — cela signifie qu'une langue activement ciblée par la marque
   n'a aucun support hreflang, donc les moteurs de recherche ne peuvent pas router
   correctement les utilisateurs vers cette version linguistique. Signaler aussi tout
   code de langue hreflang absent de la configuration de la marque — ceux-ci peuvent
   être légitimes (langues configurées ailleurs) ou peuvent indiquer des annotations
   obsolètes pour des versions linguistiques abandonnées.
6. **Générer une liste de corrections priorisée avec extraits de code** : Pour chaque
   problème trouvé, générer le code hreflang corrigé précis. Pour les balises
   auto-référentielles manquantes : fournir la balise exacte
   `<link rel="alternate" hreflang="xx-XX" href="https://...">` à ajouter. Pour les
   incohérences bidirectionnelles : fournir les balises à ajouter sur la page à
   laquelle manque la référence retour. Pour les codes invalides : fournir le code
   corrigé avec la valeur langue-région valide. Pour le x-default manquant : fournir
   la balise x-default recommandée avec l'URL de repli appropriée. Regrouper les
   corrections par page pour permettre une mise en œuvre page par page, et aussi par
   type de problème afin que les problèmes systémiques (par exemple, « balises
   auto-référentielles manquantes sur les 47 articles de blog ») puissent être traités
   par une correction unique de modèle plutôt que 47 corrections individuelles.

## Résultat

Un rapport d'audit hreflang structuré contenant :

- **Score d'audit hreflang** : Score global de qualité d'implémentation (0-100)
  reflétant le ratio d'annotations correctes sur le total des annotations, pondéré par
  la sévérité des problèmes — les problèmes critiques réduisent significativement le
  score, les avertissements modérément, et les éléments informatifs minimalement
- **Statistiques récapitulatives de l'audit** : Total des pages auditées, total des
  annotations hreflang trouvées, total des codes langue-région uniques détectés,
  total des problèmes trouvés (répartis en critique/avertissement/info), et
  pourcentage de pages avec une implémentation hreflang entièrement correcte
- **Problèmes par type** : Constats regroupés pour chaque catégorie de vérification —
  balises auto-référentielles manquantes (décompte et pages concernées), références
  orphelines (références pointant vers des pages inexistantes ou ne répondant pas),
  codes langue-région invalides (avec le code invalide et la correction), x-default
  manquant (pages sans configuration de repli), incohérences bidirectionnelles (paires
  de pages où la référence est unidirectionnelle), codes de langue en double (pages
  avec des annotations conflictuelles pour la même langue), URL relatives (annotations
  utilisant des chemins non absolus), et problèmes de cohérence des URL (protocoles
  mélangés, www/non-www, incohérences de barre oblique finale)
- **Recommandations de correction spécifiques** : Pour chaque problème, l'extrait de
  code hreflang corrigé précis prêt pour la mise en œuvre — l'utilisateur peut copier
  directement la balise `<link>` corrigée ou l'entrée de sitemap dans sa page. Les
  corrections sont regroupées à la fois par page (pour la mise en œuvre au niveau de
  la page) et par type de problème (pour les corrections systémiques à l'échelle du
  site)
- **Matrice de couverture linguistique** : Un tableau montrant les pages (lignes)
  versus les codes langue-région (colonnes), chaque cellule indiquant si une
  annotation hreflang correcte existe (réussite), existe avec des problèmes
  (avertissement), ou est manquante (lacune). Visualise immédiatement quelles pages
  ont une couverture hreflang complète et lesquelles ont des trous
- **Comparaison de la configuration linguistique de la marque** : Comparaison côte à
  côte des langues configurées de la marque versus les langues trouvées dans les
  annotations hreflang — mettant en évidence les langues que la marque cible mais qui
  n'ont aucun support hreflang (couverture manquante), et les langues hreflang qui ne
  sont pas dans la configuration de la marque (potentiellement obsolètes ou non
  gérées)
- **Notes de méthode d'implémentation** : Sur la base de la source des annotations
  (balises link HTML, en-têtes HTTP, sitemap XML), fournir des conseils spécifiques à
  l'implémentation pour appliquer les corrections — où ajouter des balises dans le
  `<head>` du HTML, comment configurer les en-têtes HTTP, ou comment mettre à jour le
  sitemap XML avec des entrées `xhtml:link`

## Agents utilisés

- **seo-specialist** — Dirige l'audit technique hreflang. Analyse les annotations
  hreflang depuis le HTML, les en-têtes HTTP et les sitemaps XML. Exécute les sept
  vérifications de validation (auto-référentiel, bidirectionnel, codes valides,
  x-default, codes en double, URL absolues, cohérence des URL) par rapport aux
  spécifications SEO international. Génère des extraits de code hreflang corrigés
  pour chaque problème trouvé. Évalue l'impact SEO des erreurs hreflang sur la
  visibilité de recherche internationale et fournit des conseils de priorisation
  basés sur les corrections qui auront le plus grand impact sur le routage du trafic
  organique. Se réfère à `skills/technical-seo/international-seo.md` pour les
  détails de la spécification hreflang et les bonnes pratiques
- **localization-specialist** — Valide les codes langue-région par rapport aux normes
  ISO 639-1 et ISO 3166-1, recoupe la couverture linguistique hreflang par rapport
  aux langues configurées de la marque pour identifier les lacunes de couverture, et
  signale les codes de langue qui peuvent être techniquement valides mais
  inappropriés pour les marchés cibles de la marque (par exemple, `zh` générique au
  lieu de `zh-Hans` ou `zh-Hant` pour un ciblage distinct du marché chinois). Fournit
  un contexte spécifique à la langue pour la matrice de couverture et recommande la
  granularité langue-région basée sur la stratégie de marché de la marque

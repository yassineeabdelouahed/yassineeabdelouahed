# Core Web Vitals — Référence d'optimisation

Un guide complet pour mesurer, diagnostiquer et corriger les problèmes de Core Web Vitals. Ces trois métriques (LCP, INP, CLS) sont les principaux signaux d'expérience utilisateur de Google et affectent directement les classements de recherche, le Quality Score des publicités, et les taux de conversion.

---

## Résumé des seuils

| Métrique | Bon | À améliorer | Mauvais |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2,5 s | 2,5 s – 4,0 s | > 4,0 s |
| **INP** (Interaction to Next Paint) | < 200 ms | 200 ms – 500 ms | > 500 ms |
| **CLS** (Cumulative Layout Shift) | < 0,1 | 0,1 – 0,25 | > 0,25 |

Google utilise le 75e percentile des chargements de page (p75) issu du Chrome UX Report (CrUX) pour les signaux de classement. Optimiser pour la médiane ne suffit pas — il faut amener le 75e percentile dans la plage « bonne ».

---

## LCP — Largest Contentful Paint

### Ce qu'il mesure

Le temps de rendu du plus grand élément de contenu visible dans le viewport. Les éléments LCP sont typiquement :
- des éléments `<img>` (élément LCP le plus courant sur le web)
- des images d'affiche `<video>`
- des éléments avec un `background-image` CSS
- des éléments de texte de niveau bloc (`<h1>`, `<p>`, etc.)

### Causes courantes d'un mauvais LCP

**1. Temps de réponse serveur lent (TTFB > 800 ms)**
- Le navigateur ne peut pas commencer à rendre tant qu'il n'a pas reçu le premier octet du HTML
- TTFB cible : < 800 ms pour la requête du document
- Causes : requêtes de base de données non optimisées, absence de cache côté serveur, absence de CDN, hébergement sous-dimensionné, goulots d'étranglement au niveau applicatif

**Stratégies de correction :**
- Mettre en place un CDN pour les ressources statiques et le HTML (Cloudflare, Fastly, CloudFront)
- Activer le cache côté serveur (Redis, Memcached, Varnish, cache de page complète)
- Optimiser les requêtes de base de données (indexation, optimisation des requêtes, pooling de connexions)
- Utiliser HTTP/2 ou HTTP/3 pour des connexions multiplexées
- Envisager le edge computing (Cloudflare Workers, Vercel Edge Functions) pour réduire la latence
- Mettre à niveau l'hébergement si la capacité est régulièrement dépassée

**2. Ressources bloquant le rendu**
- Le CSS et le JavaScript synchrone dans le `<head>` bloquent le rendu jusqu'à leur téléchargement et leur exécution
- Chaque ressource bloquante supplémentaire ajoute au LCP

**Stratégies de correction :**
- Mettre le CSS critique (nécessaire pour le contenu au-dessus de la ligne de flottaison) directement en ligne dans le `<head>`
- Différer le CSS non critique avec `media="print" onload="this.media='all'"` ou le charger de façon asynchrone
- Ajouter l'attribut `defer` ou `async` aux balises `<script>` non critiques
- Supprimer le CSS inutilisé (PurgeCSS, onglet Coverage de Chrome DevTools)
- Supprimer le JavaScript inutilisé (tree-shaking, découpage de code)
- Minimiser le nombre de fichiers CSS/JS par regroupement (mais équilibrer avec la granularité du cache)

**3. Temps de chargement lents des ressources (élément LCP)**
- Des images volumineuses et non optimisées constituent le goulot d'étranglement LCP le plus courant
- L'image LCP est découverte tardivement dans la cascade de chargement (par ex. chargée via CSS ou JavaScript)

**Stratégies de correction :**
- **Précharger l'image LCP** : `<link rel="preload" as="image" href="hero.webp">` — c'est le correctif LCP à plus fort impact pour les éléments LCP basés sur des images
- **Utiliser des formats d'image modernes** : WebP (25-35 % plus léger que JPEG), AVIF (50 % plus léger que JPEG). Servir avec l'élément `<picture>` pour la prise en charge de repli
- **Images responsives** : utiliser les attributs `srcset` et `sizes` pour que les navigateurs téléchargent l'image de taille appropriée au viewport
- **Compresser les images** : viser une qualité de 75-85 pour JPEG/WebP (visuellement sans perte pour la plupart des contenus)
- **Définir une largeur et une hauteur explicites** sur les éléments `<img>` (évite le décalage de mise en page ET aide le navigateur à allouer l'espace en amont)
- **Ne PAS charger l'image LCP en différé** : `loading="lazy"` sur l'élément LCP le retarde. Ne différer que les images en dessous de la ligne de flottaison
- **Définir `fetchpriority="high"`** sur l'élément d'image LCP pour prioriser son téléchargement
- **Éviter le `background-image` CSS pour le LCP** : le navigateur ne peut pas découvrir les images d'arrière-plan CSS avant l'analyse du fichier CSS. Utiliser `<img>` avec préchargement à la place

**4. Rendu côté client**
- Les SPA qui rendent le contenu avec JavaScript retardent le LCP jusqu'au téléchargement, à l'analyse et à l'exécution du JS
- Le navigateur voit une page vide ou un squelette jusqu'à l'hydratation par JavaScript

**Stratégies de correction :**
- Mettre en place le rendu côté serveur (SSR) pour le contenu au-dessus de la ligne de flottaison
- Utiliser la génération de site statique (SSG) pour les pages qui changent peu fréquemment
- Mettre en place la régénération statique incrémentale (ISR) pour du contenu dynamique bénéficiant des avantages du SSG
- Si le SSR n'est pas réalisable, utiliser le prérendu ou l'injection de HTML critique au niveau du document

### Checklist de priorité pour l'optimisation LCP

1. Identifier l'élément LCP (Chrome DevTools > panneau Performance > Timings > LCP)
2. Vérifier le TTFB (cible < 800 ms) — s'il est élevé, corriger d'abord le serveur/CDN
3. Vérifier si l'image LCP est préchargée — sinon, ajouter un lien de préchargement
4. Vérifier le format et la compression de l'image — convertir en WebP/AVIF
5. Vérifier le CSS/JS bloquant le rendu — différer ou mettre en ligne le critique
6. Vérifier si l'élément LCP nécessite du JavaScript pour se rendre — mettre en place le SSR si c'est le cas
7. Vérifier que `fetchpriority="high"` est défini sur l'image LCP
8. Vérifier que `loading="lazy"` n'est PAS défini sur l'image LCP

---

## INP — Interaction to Next Paint

### Ce qu'il mesure

L'INP mesure la latence de toutes les interactions utilisateur (clics, appuis tactiles, saisies clavier) tout au long du cycle de vie de la page et rapporte la pire interaction (les valeurs aberrantes étant exclues). Il a remplacé le FID (First Input Delay) en tant que Core Web Vital en mars 2024.

Différence clé avec le FID : le FID ne mesurait que le délai de la première interaction. L'INP mesure TOUTES les interactions et rapporte la pire d'entre elles, ce qui en fait une métrique de réactivité bien plus complète.

### Causes courantes d'un mauvais INP

**1. Tâches longues sur le thread principal**
- Toute tâche JavaScript de plus de 50 ms bloque le thread principal et retarde la réponse aux interactions
- Coupables courants : initialisation lourde de framework, manipulation complexe du DOM, appels API synchrones, calculs intensifs

**Stratégies de correction :**
- **Découper les tâches longues** : utiliser `setTimeout(fn, 0)`, `requestAnimationFrame`, ou `scheduler.yield()` pour découper le travail en plus petits blocs (< 50 ms chacun)
- **Utiliser des web workers** : décharger les calculs lourds (traitement de données, analyse, calculs) vers des web workers afin qu'ils ne bloquent pas le thread principal
- **Différer l'initialisation non critique** : charger les composants en différé et les initialiser lors de l'interaction utilisateur plutôt qu'au chargement de la page
- **Découper agressivement le code** : ne charger que le JavaScript nécessaire à la vue actuelle. Utiliser `import()` dynamique pour les fonctionnalités sous la ligne de flottaison et déclenchées par interaction

**2. Gestionnaires d'événements coûteux**
- Les gestionnaires de clic, de saisie et de pression de touche qui effectuent une manipulation lourde du DOM, un recalcul d'état, ou des requêtes de mise en page synchrones
- Les re-rendus React/Angular/Vue déclenchés par des changements d'état pendant l'interaction

**Stratégies de correction :**
- **Debounce et throttle** : pour les gestionnaires de scroll, de redimensionnement et de saisie, appliquer un debounce (attendre une pause) ou un throttle (limiter la fréquence)
- **Minimiser les lectures/écritures DOM dans les gestionnaires** : regrouper les mutations DOM, éviter les mises en page synchrones forcées (lire offsetHeight après une écriture)
- **Utiliser CSS pour le retour visuel** : les transitions et animations CSS s'exécutent sur le thread de composition, pas le thread principal. Utiliser CSS pour les états de survol, le retour de pression de bouton, et les animations simples
- **Virtualiser les longues listes** : ne pas rendre 10 000 nœuds DOM. Utiliser le défilement virtuel (react-virtualized, vue-virtual-scroller) pour ne rendre que les éléments visibles
- **Optimiser les re-rendus React** : utiliser `React.memo`, `useMemo`, `useCallback` pour éviter les re-rendus inutiles. Utiliser `useTransition` pour les mises à jour d'état non urgentes

**3. Taille de DOM importante**
- Les pages avec plus de 1 500 éléments DOM sont à risque ; plus de 3 000 est un signal d'alerte
- Un DOM volumineux augmente l'utilisation mémoire et ralentit le recalcul de style, la mise en page, et les opérations de peinture

**Stratégies de correction :**
- Réduire les nœuds DOM en simplifiant la mise en page (moins de conteneurs imbriqués)
- Utiliser CSS Grid/Flexbox plutôt que des structures `<div>` profondément imbriquées
- Virtualiser les longues listes et tableaux
- Rendre en différé le contenu hors écran
- Retirer les éléments cachés du DOM plutôt que d'utiliser `display: none` sur des milliers de nœuds

**4. Impact des scripts tiers**
- Les gestionnaires de balises, l'analytics, les widgets de chat, les outils de test A/B et les scripts publicitaires se disputent tous le temps du thread principal
- Les scripts tiers sont la source la plus courante de tâches longues sur les sites riches en contenu

**Stratégies de correction :**
- Auditer tous les scripts tiers avec le panneau Performance de Chrome DevTools (filtrer par domaine)
- Charger les scripts tiers non essentiels avec `defer` ou `async`
- Retarder les widgets de chat et outils de feedback jusqu'à une interaction utilisateur ou un événement de scroll
- Utiliser `requestIdleCallback` pour les appels analytics non urgents
- Envisager Partytown ou des bibliothèques similaires pour décharger les scripts tiers vers des web workers
- Auditer régulièrement les conteneurs du gestionnaire de balises et supprimer les balises inutilisées

### Flux de diagnostic INP

1. Ouvrir Chrome DevTools > panneau Performance > enregistrer une session avec des interactions réelles
2. Rechercher les tâches longues (barres signalées en rouge > 50 ms sur le thread principal)
3. Identifier quel script/fonction en est responsable (pile d'appels dans le détail de la tâche)
4. Vérifier la piste « Interactions » pour voir quelles interactions utilisateur ont eu une latence élevée
5. Utiliser l'extension Chrome Web Vitals pour obtenir des relevés d'INP en temps réel par interaction
6. Croiser avec les données CrUX pour voir l'INP terrain au niveau p75

---

## CLS — Cumulative Layout Shift

### Ce qu'il mesure

Le CLS quantifie l'ampleur du décalage du contenu visible pendant le cycle de vie de la page. Chaque décalage de mise en page est noté en multipliant la fraction d'impact (pourcentage du viewport affecté) par la fraction de distance (distance de déplacement des éléments). Le CLS est la somme de tous les scores de décalage de mise en page inattendus, regroupés en fenêtres de session de 5 secondes maximum avec des écarts d'1 seconde.

Un CLS de 0,1 signifie l'équivalent de 10 % du viewport se décalant de 10 % de la hauteur du viewport.

### Causes courantes d'un mauvais CLS

**1. Images et iframes sans dimensions explicites**
- Lorsque le navigateur ne connaît pas à l'avance les dimensions d'une image, il alloue un espace nul, puis décale le contenu au chargement de l'image

**Stratégies de correction :**
- Toujours définir les attributs `width` et `height` sur les éléments `<img>` et `<iframe>`
- Utiliser la propriété CSS `aspect-ratio` pour les images responsives : `aspect-ratio: 16 / 9`
- Pour les images responsives avec `srcset`, les attributs `width` et `height` aident quand même le navigateur à calculer le ratio d'aspect avant le téléchargement

**2. Contenu injecté dynamiquement**
- Les bannières, barres de consentement de cookies, pop-ins de newsletter, ou barres promotionnelles insérées au-dessus du contenu existant repoussent tout vers le bas

**Stratégies de correction :**
- Réserver de l'espace pour le contenu dynamique avec `min-height` CSS sur les éléments conteneurs
- Insérer le contenu dynamique en dessous de la ligne de flottaison lorsque possible
- Utiliser des animations `transform` CSS plutôt que de modifier `top`, `margin`, ou `height` (les transforms ne causent pas de décalages de mise en page)
- Pour les bannières de cookies et barres de notification, utiliser un positionnement fixe/sticky pour qu'elles se superposent plutôt que de repousser le contenu
- Éviter d'insérer du contenu au-dessus du contenu existant sauf en réponse à une interaction utilisateur (les décalages initiés par l'utilisateur sont exclus du CLS)

**3. Polices web causant un décalage de mise en page (FOUT/FOIT)**
- Lorsqu'une police web se charge et remplace une police de repli, le texte se réorganise si les polices ont des métriques différentes (hauteur de ligne, espacement des lettres, largeur des mots)

**Stratégies de correction :**
- Utiliser `font-display: optional` — la meilleure option pour le CLS ; si la police n'est pas déjà en cache, le repli est utilisé pour toute la visite, et la police web est mise en cache pour la prochaine visite
- Utiliser `font-display: swap` avec des surcharges de métriques de police (`ascent-override`, `descent-override`, `line-gap-override`, `size-adjust` sur le `@font-face` de la police de repli) pour faire correspondre les métriques du repli à celles de la police web
- Précharger les polices critiques : `<link rel="preload" as="font" type="font/woff2" href="font.woff2" crossorigin>`
- Créer des sous-ensembles de polices n'incluant que les caractères nécessaires (latin, latin étendu) avec des outils comme glyphhanger ou fonttools
- Auto-héberger les polices plutôt que d'utiliser le CDN Google Fonts (élimine la recherche DNS et la connexion supplémentaires)

**4. Publicités et intégrations sans espace réservé**
- Les emplacements publicitaires qui se redimensionnent après le chargement ou se chargent de façon asynchrone sans espace d'espace réservé
- Les intégrations tierces (YouTube, Twitter, cartes) qui se chargent avec des dimensions inconnues

**Stratégies de correction :**
- Définir un `min-height` fixe sur les conteneurs publicitaires basé sur la taille de publicité la plus courante pour cet emplacement
- Utiliser `aspect-ratio` CSS ou des dimensions explicites pour les conteneurs d'intégration
- Pour les emplacements publicitaires responsives, définir la taille minimale et n'autoriser la croissance que vers le bas (sous la publicité)
- Charger les publicités sous la ligne de flottaison lorsque possible
- Envisager des emplacements publicitaires statiques/réservés plutôt qu'une insertion publicitaire dynamique

**5. CSS ou JavaScript à chargement tardif causant un reflow**
- Les fichiers CSS chargés après le rendu initial peuvent modifier la mise en page
- Le JavaScript qui modifie les tailles, positions ou visibilité d'éléments après le chargement de la page

**Stratégies de correction :**
- Mettre le CSS critique en ligne pour garantir que la mise en page au-dessus de la ligne de flottaison est stable dès le premier rendu
- Charger le CSS non critique de façon asynchrone tout en s'assurant qu'il n'affecte pas la mise en page au-dessus de la ligne de flottaison
- Éviter le JavaScript qui modifie les propriétés de mise en page d'éléments visibles après le chargement
- Utiliser `contain: layout` CSS sur les composants qui ne doivent pas affecter leurs frères lorsqu'ils changent

### Flux de débogage CLS

1. Ouvrir Chrome DevTools > panneau Performance > enregistrer le chargement de la page
2. Vérifier la piste « Layout Shifts » pour les marqueurs bleus
3. Cliquer sur chaque décalage pour voir quels éléments ont bougé, le score de décalage, et s'il était initié par l'utilisateur
4. Utiliser la fonctionnalité Layout Shift Regions (Chrome DevTools > Rendering > Layout Shift Regions) pour une superposition visuelle des éléments qui se décalent pendant une navigation réelle
5. Vérifier le CLS terrain dans les données CrUX — les données labo sous-estiment souvent le CLS car les outils automatisés ne font pas défiler ni n'interagissent avec la page

---

## Mesure : données terrain vs données labo

### Données terrain (Real User Monitoring)

- **Chrome UX Report (CrUX)** : le jeu de données que Google utilise pour les signaux de classement. Agrégé à partir des utilisateurs Chrome ayant opté pour le partage. Disponible via PageSpeed Insights, l'API CrUX, BigQuery, et le rapport Core Web Vitals de GSC
- **Real User Monitoring (RUM)** : instrumentation personnalisée utilisant la bibliothèque JavaScript `web-vitals`. Fournit des répartitions par page, par segment, par zone géographique
- **Rapport CWV de Google Search Console** : agrège les données CrUX au niveau du groupe d'URL. Montre la répartition bon/à améliorer/mauvais

**Les données terrain sont celles que Google utilise pour le classement.** Les données labo servent uniquement au diagnostic.

### Données labo (test synthétique)

- **Lighthouse** (Chrome DevTools, PageSpeed Insights, CI/CD) : chargement de page simulé sur une connexion limitée. Bon pour le diagnostic, non représentatif de l'expérience utilisateur réelle
- **WebPageTest** : test synthétique avancé avec de vrais navigateurs, de vraies conditions réseau, et des vues filmstrip/waterfall. Meilleur outil labo pour une analyse de performance approfondie
- **Panneau Performance de Chrome DevTools** : enregistrement en temps réel sur votre machine locale. Non limité par défaut — activer la limitation CPU et réseau pour des résultats réalistes

### Divergences courantes entre terrain et labo

| Scénario | Le labo montre | Le terrain montre | Explication |
|---|---|---|---|
| CLS depuis le défilement | CLS faible | CLS élevé | Les outils labo ne mesurent que le CLS au chargement ; le terrain capture tous les décalages de la session utilisateur |
| INP depuis des interactions réelles | Non mesurable | INP mauvais | Les outils labo ne peuvent pas simuler la diversité des interactions réelles des utilisateurs |
| LCP sur réseaux lents | Bon LCP (réseau local rapide) | LCP mauvais | Le terrain inclut des utilisateurs en 3G, 4G, et sur des réseaux saturés |
| Impact des scripts tiers | Minimal | Significatif | Le labo peut ne pas charger tous les scripts tiers (bloqueurs de pub, gestionnaires de consentement bloquant les balises) |
| Latence géographique | TTFB faible | TTFB élevé | Le labo teste depuis un seul emplacement ; le terrain inclut des utilisateurs éloignés des serveurs |

Toujours privilégier les données terrain pour la prise de décision. Utiliser les données labo pour diagnostiquer les problèmes spécifiques identifiés dans les données terrain.

---

## Cadre de priorisation de l'optimisation

Lorsque plusieurs métriques CWV nécessitent une amélioration, prioriser selon ce cadre :

### Priorité 1 : métrique dans la plage « Mauvais »
Toute métrique dans la plage mauvaise (LCP > 4 s, INP > 500 ms, CLS > 0,25) doit être traitée en premier. Un mauvais CWV peut directement pénaliser le classement.

### Priorité 2 : LCP
Le LCP est le CWV ayant le plus d'impact sur l'expérience utilisateur et est souvent le plus facile à améliorer avec des correctifs ciblés (préchargement d'image, CDN, optimisation de format). Une amélioration d'1 seconde du LCP peut augmenter les conversions de 2 à 5 %.

### Priorité 3 : CLS
Les correctifs CLS sont typiquement peu coûteux en effort (ajout de dimensions d'image, réservation d'espace publicitaire, paramètres font-display) avec un impact immédiat. Le CLS est aussi la métrique la plus perceptible par les utilisateurs — un décalage de mise en page est visuellement dérangeant et érode la confiance.

### Priorité 4 : INP
L'INP est souvent le plus difficile à corriger car il nécessite une refonte JavaScript, des changements au niveau du framework, ou un audit des scripts tiers. Les améliorations peuvent nécessiter des sprints de développement plutôt que de simples changements de configuration.

### Gains rapides inter-métriques

| Correctif | Impact LCP | Impact INP | Impact CLS | Effort |
|---|---|---|---|---|
| Précharger l'image LCP | Élevé | Aucun | Aucun | 5 minutes |
| Ajouter les dimensions d'image | Aucun | Aucun | Élevé | 30 minutes |
| Convertir les images en WebP/AVIF | Moyen | Aucun | Aucun | 1-2 heures |
| Mettre le CSS critique en ligne | Moyen | Faible | Faible | 2-4 heures |
| Différer les scripts tiers | Faible | Élevé | Moyen | 1-2 heures |
| Mettre en place un CDN | Élevé | Aucun | Aucun | 2-4 heures |
| font-display: optional | Aucun | Aucun | Élevé | 15 minutes |
| Découper le code JavaScript | Faible | Élevé | Aucun | 1-2 jours |
| SSR pour le contenu au-dessus de la ligne de flottaison | Élevé | Moyen | Faible | 1-2 semaines |

---

## Référence des outils

| Outil | Idéal pour | Coût |
|---|---|---|
| PageSpeed Insights | Vérification rapide des CWV avec données terrain + labo | Gratuit |
| Rapport CWV de Google Search Console | Statut CWV à l'échelle du site et regroupement par URL | Gratuit |
| Panneau Performance de Chrome DevTools | Diagnostic approfondi de pages spécifiques | Gratuit |
| WebPageTest | Analyse waterfall avancée et comparaison filmstrip | Gratuit (public) / Payant (privé) |
| API CrUX | Accès programmatique aux données terrain | Gratuit |
| Jeu de données CrUX BigQuery | Analyse CWV à grande échelle sur plusieurs sites | Gratuit (offre gratuite BigQuery) |
| Bibliothèque JS `web-vitals` | Instrumentation de real user monitoring | Gratuit (open source) |
| Lighthouse CI | Test de régression CWV automatisé en CI/CD | Gratuit (open source) |
| Extension Chrome Web Vitals | Superposition CWV en temps réel pendant la navigation | Gratuit |
| DebugBear | Surveillance CWV continue avec alertes | Payant |
| SpeedCurve | Surveillance de performance avec tendances CWV | Payant |
| Calibre | Budgets de performance automatisés et alertes | Payant |
</content>

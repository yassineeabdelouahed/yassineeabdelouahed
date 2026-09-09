---
name: local-seo
description: "Construire une stratégie SEO local de bout en bout — optimisation de la fiche Google Business Profile, cohérence NAP et nettoyage des citations, tactiques de classement dans le pack local, pages de localisation et de zone de service, gestion des avis, netlinking local, schéma LocalBusiness et gestion multi-établissements — livrée sous forme de rapports d'audit, de checklists et d'une feuille de route à 30/60/90 jours. Se déclenche sur \"/digital-marketing-pro:local-seo\", \"optimize my Google Business Profile\", \"why aren't we in the map pack\", \"fix our NAP consistency\", \"local SEO for our 12 locations\", \"rank for near me searches\". Intègre les recommandations 2026 de Google sur la réservation agentique pour les verticales services locaux, réparation à domicile, beauté et soins pour animaux. Lit le profil de marque et les règles de conformité ; ses fichiers de référence alimentent aussi /digital-marketing-pro:local-seo-audit."
---

# Local SEO

## Quand utiliser cette compétence

Activez ce module lorsque la demande de l'utilisateur porte sur l'un des points suivants :

- **Optimisation de la fiche Google Business Profile** : Mise en place, optimisation ou audit d'une fiche Google Business Profile (catégories, attributs, photos, publications, questions-réponses, produits, services)
- **Citations locales** : Construction, audit ou nettoyage des fiches d'entreprise dans les annuaires et agrégateurs de données
- **Cohérence NAP** : Audit de la cohérence du Nom, de l'Adresse et du Numéro de téléphone sur le web
- **Classements dans le pack local / Map Pack** : Stratégies pour apparaître dans le pack de 3 résultats de Google et dans Google Maps
- **Pages de localisation** : Création ou optimisation de landing pages pour des établissements individuels ou des zones de service
- **SEO multi-établissements** : Gestion du SEO local à grande échelle pour des entreprises disposant de plusieurs établissements physiques ou opérant en franchise
- **Optimisation « near me »** : Optimisation pour les recherches basées sur la proximité et les recherches locales implicites
- **Netlinking local** : Obtention de liens depuis des organisations locales, chambres de commerce, partenaires communautaires, sponsors et médias locaux
- **Balisage schema local** : Mise en œuvre de LocalBusiness, GeoCoordinates, OpeningHours, AggregateRating et des données structurées associées
- **Gestion des avis pour le local** : Génération d'avis, amélioration des notes, réponse aux avis, et exploitation des avis comme signaux de classement local
- **Entreprises à zone de service** : Optimisation pour les entreprises sans vitrine physique qui servent les clients à leur emplacement
- **Stratégie de contenu local** : Pages villes, guides de quartier, contenu d'événements locaux et articles de blog géociblés
- **Optimisation Google Maps** : Amélioration de la visibilité et de l'engagement spécifiquement dans Google Maps
- **Analyse concurrentielle locale** : Benchmark de la performance en recherche locale par rapport aux concurrents à proximité

**Phrases déclencheuses** : « seo local », « google business profile », « gbp », « google maps », « pack local », « map pack », « près de moi », « citations locales », « cohérence nap », « pages de localisation », « multi-établissements », « zone de service », « netlinking local », « avis locaux », « schema local », « entreprise locale », « classements locaux », « pack de 3 google », « annuaire local », « recherche locale », « localisateur de magasins », « seo franchise », « pages villes », « seo quartier »

## Efficacité de contexte

Compétence lourde. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement des plages correspondantes avec `offset` + `limit`. Lister `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. En cas de réinvocation en cours de session, ignorer les fichiers déjà en contexte.

## Priorité 2026 — Expansion de la réservation agentique Google

Lors de I/O 2026, Google a étendu son **flux de réservation agentique** au-delà des restaurants vers :

- **Services locaux** (agents d'entretien, électriciens, plombiers, bricoleurs)
- **Réparation à domicile** (entrepreneurs généraux, CVC, réparation d'électroménager)
- **Beauté** (salons de coiffure, spas, instituts de manucure)
- **Soins pour animaux** (toiletteurs, promeneurs, vétérinaires)

Si votre marque appartient à l'une de ces 4 verticales, la réservation agentique constitue désormais un investissement SEO local à fort effet de levier. Trois éléments comptent pour l'activation :

1. **La fiche Google Business Profile doit accepter les réservations.** Soit via l'intégration directe de Google avec des prestataires de planification pris en charge (Booksy, Vagaro, Square Appointments, Resy, Tock, etc.), soit via Reserve with Google.
2. **Les données structurées `AvailabilityFeed` doivent être diffusées** afin que l'agent IA puisse raisonner sur les créneaux disponibles sans passer d'appel. Voir `skills/context-engine/schema-templates.json` pour l'association `LocalBusiness` + `Reservation` + `AvailabilityFeed`.
3. **Transparence tarifaire dans le catalogue de services** — les agents privilégient les entreprises qui affichent des fourchettes de prix ; une tarification opaque pousse l'agent vers l'option suivante.

Source : [blog.google/search-io-2026](https://blog.google/products-and-platforms/products/search/search-io-2026/). À combiner avec le nouveau champ `AssetGroup.google_local_services_info` de Google Ads API v24.2 (voir `skills/paid-advertising/google-ads.md`) pour le volet payant complémentaire.

## Contexte de marque (appliqué automatiquement)

Avant de produire tout livrable marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de la marque active a été affiché au démarrage de la session. Utiliser le nom de la marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité et les concurrents qui y figurent.
2. **Si le profil complet est nécessaire**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, d'énergie, d'humour et d'autorité doivent façonner le ton et le choix des mots de tout le contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Consulter les benchmarks sectoriels** — Se référer à `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique des campagnes** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, indiquer : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les meilleures pratiques générales. »
9. **Vérifier les guidelines de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les revendications restreintes et les mentions légales obligatoires ; `channel-styles.md` pour les adaptations de ton spécifiques à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés, slogans et éléments de positionnement approuvés ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Pour un contenu destiné à un canal spécifique, les règles de style de ce canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter un travail de SEO local, rassembler :

1. **Nom et adresse de l'entreprise** : Raison sociale exacte et adresse postale complète (ou plusieurs adresses en cas de multi-établissements)
2. **Numéro(s) de téléphone** : Numéros principal et de suivi utilisés
3. **Zones de service** : Zones géographiques desservies (villes, départements, codes postaux, rayon)
4. **Nombre d'établissements** : Établissement unique, multi-établissements (combien), ou entreprise à zone de service (sans vitrine)
5. **Accès GBP** : L'entreprise dispose-t-elle d'une fiche Google Business Profile revendiquée et vérifiée ?
6. **Profil d'avis actuel** : Note moyenne, nombre total d'avis, tendance de vélocité des avis, et taux de réponse
7. **Secteur/Catégorie** : Catégorie principale de l'entreprise et éventuelles catégories secondaires actuellement définies
8. **Concurrents locaux** : Les 3 à 5 principales entreprises en concurrence pour les mêmes recherches locales
9. **Classements actuels** : Positions connues dans le pack local pour les mots-clés cibles (si suivies)
10. **Structure du site web** : Le site dispose-t-il de pages de localisation individuelles ? D'un localisateur de magasins ? De contenu spécifique à chaque localisation ?
11. **Citations existantes** : Fiches d'annuaires connues (Yelp, PagesJaunes, BBB, annuaires sectoriels) et leur exactitude
12. **Budget et ressources** : Capacité de l'équipe pour la gestion des avis, la création de contenu et la maintenance continue des citations

Pour les demandes rapides (par exemple, « optimiser notre fiche Google Business Profile »), procéder avec les informations disponibles. Pour une stratégie SEO locale complète, rassembler l'ensemble du contexte.

## Capacités

### Optimisation de la fiche Google Business Profile
- Audit et optimisation de l'exhaustivité de la fiche (chaque champ, chaque section)
- Stratégie de sélection des catégories primaire et secondaires
- Configuration des attributs de l'entreprise pour les signaux de classement et l'engagement utilisateur
- Stratégie photo (extérieur, intérieur, équipe, produit, en situation — quantité et qualité de référence)
- Stratégie de publication Google Posts (Nouveautés, Événements, Offres — cadence et optimisation des CTA)
- Alimentation et gestion de la section questions-réponses
- Optimisation de la section Produits et Services
- Optimisation de la description de l'entreprise par mots-clés dans la limite de caractères
- Gestion des horaires, horaires spéciaux et horaires de fermeture
- Intégration des URL de réservation et de prise de rendez-vous
- Configuration de la messagerie et du chat
- Procédures de prévention et de récupération après suspension GBP
- Analyse des GBP Insights et plan d'action

### Construction de citations locales et gestion NAP
- Audit des citations structurées sur plus de 50 annuaires
- Identification des citations non structurées (mentions dans des articles, la presse, des blogs)
- Notation de la cohérence NAP et résolution des écarts
- Soumissions aux agrégateurs de données (Data Axle, Neustar Localeze, Foursquare)
- Identification et priorisation des sources de citation sectorielles
- Détection et nettoyage des fiches en double
- Planification de la vélocité des citations pour une croissance régulière des fiches

### Stratégie de recherche locale
- Recherche de mots-clés locaux (termes géo-modifiés, combinaisons service+localisation, requêtes locales implicites)
- Analyse des facteurs de classement du pack local (proximité, notoriété, pertinence)
- Analyse des écarts concurrentiels locaux (citations, avis, contenu, liens)
- Ciblage des fonctionnalités SERP locales (pack local, knowledge panel, local finder, Google Maps)
- Optimisation « near me » et recherche vocale pour l'intention locale

### Pages de localisation et contenu local
- Conception de modèles de pages de localisation avec un contenu unique et substantiel par établissement
- Stratégie de pages de zone de service pour les entreprises sans vitrine
- Pages villes et quartiers (le cas échéant, en évitant le contenu pauvre)
- Planification de contenu de blog local (événements communautaires, actualités locales, guides de quartier)
- Témoignages et études de cas localisés
- Contenu FAQ local par secteur

### Netlinking local
- Opportunités de liens issues de partenariats et sponsorings locaux
- Adhésions aux chambres de commerce et associations professionnelles
- Obtention de liens via les médias et la presse locale
- Sponsoring et participation à des événements communautaires
- Programmes de bourses et d'œuvres caritatives locales générant des liens
- Soumissions à des annuaires sectoriels géo-pertinents

### Balisage schema local
- Schéma LocalBusiness (et sous-types : Restaurant, Dentist, Attorney, etc.)
- GeoCoordinates, PostalAddress, OpeningHoursSpecification
- AggregateRating et schéma Review individuel
- Balisage Service, hasOfferCatalog et areaServed
- Schéma de relation Organization-to-LocalBusiness pour le multi-établissements
- Schéma FAQ et HowTo pour le contenu local

### Gestion multi-établissements
- Structure de compte GBP organisationnel et groupes de localisations
- Architecture de pages de localisation évolutive
- SEO du localisateur de magasins (indexable, enrichi de schéma, convivial)
- Cadres de gestion centralisée vs décentralisée
- Application de la cohérence de marque entre établissements
- Reporting et benchmarking multi-établissements

## Processus

### Workflow principal : audit et stratégie SEO local

1. **Audit de la fiche Google Business Profile**
   - Vérifier le statut de revendication et de vérification
   - Évaluer l'exhaustivité de la fiche : exactitude du nom, adresse, téléphone, site web, horaires, catégories, attributs, description, photos, publications, questions-réponses, produits, services
   - Évaluer la sélection des catégories (primaire et secondaires) par rapport aux concurrents
   - Examiner la quantité, la qualité et la récence des photos (référence : 100+ photos, mises à jour trimestriellement)
   - Évaluer l'activité et l'engagement des Google Posts
   - Vérifier les infractions à la politique ou les risques de suspension

2. **Audit de cohérence NAP**
   - Documenter le NAP canonique (le nom, l'adresse et le téléphone exacts qui doivent apparaître partout)
   - Scanner les 50 principales sources de citations pour les fiches existantes
   - Noter chaque fiche pour l'exactitude NAP (correspondance exacte, variation mineure, écart majeur)
   - Identifier la source des écarts (ancienne adresse, ancienne raison sociale, format de téléphone incorrect)

3. **Audit et stratégie de citations**
   - Compter le total des citations structurées (fiches d'annuaires)
   - Comparer le volume de citations aux 3 principaux concurrents locaux
   - Identifier les citations manquantes sur les annuaires à forte autorité
   - Vérifier l'exactitude des agrégateurs de données (Data Axle, Neustar Localeze, Foursquare)
   - Prioriser la construction de citations par autorité de domaine et pertinence sectorielle

4. **Recherche de mots-clés locaux**
   - Cartographier les mots-clés géo-modifiés : [service] + [ville], [service] + [quartier], [service] near me
   - Identifier les mots-clés locaux implicites (mots-clés que Google traite comme locaux sans modificateur géographique)
   - Analyser le volume de recherche local et la concurrence pour les termes prioritaires
   - Associer les mots-clés aux pages (pages de localisation, pages de service, contenu de blog)

5. **Évaluation des pages de localisation**
   - Auditer les pages de localisation existantes pour la profondeur, l'unicité et l'optimisation du contenu
   - En l'absence de pages de localisation, concevoir le modèle de page et le plan de contenu
   - Vérifier que chaque page dispose d'un contenu unique (pas seulement le nom de la ville substitué dans un modèle)
   - Vérifier la mise en œuvre du balisage schema local sur chaque page de localisation

6. **Analyse du profil de netlinking local**
   - Identifier les liens existants provenant de sources locales (annuaires, médias, organisations, partenaires)
   - Comparer le profil de liens locaux aux principaux concurrents
   - Construire une liste d'opportunités de liens locaux (chambres de commerce, associations, sponsors, événements, médias)
   - Prioriser par autorité, pertinence et difficulté d'acquisition

7. **Analyse du profil d'avis**
   - Note moyenne actuelle et volume total par plateforme (Google, Yelp, plateformes sectorielles)
   - Tendance de vélocité des avis (croissante, stable ou déclinante)
   - Évaluation du taux de réponse et de la qualité des réponses
   - Analyse de sentiment des avis récents (éloges fréquents, plaintes récurrentes)
   - Benchmark des avis concurrents (leur note, volume, vélocité)

8. **Revue du schema local**
   - Tester le schema existant avec le Rich Results Test et le Schema Validator de Google
   - Identifier les types de schema manquants (LocalBusiness, GeoCoordinates, OpeningHours, AggregateRating)
   - Recommander des ajouts de schema avec du JSON-LD prêt à l'implémentation

9. **Benchmark concurrentiel SEO local**
   - Identifier les 3 principaux concurrents du pack local pour les mots-clés prioritaires
   - Comparer sur tous les facteurs de classement : exhaustivité GBP, avis, citations, contenu, liens, proximité
   - Identifier les écarts spécifiques où l'entreprise peut gagner un avantage concurrentiel

10. **Plan d'action SEO local priorisé**
    - Classer toutes les conclusions par impact et effort (gains rapides d'abord)
    - Créer une feuille de route SEO locale à 30/60/90 jours
    - Assigner des actions spécifiques avec des responsables et des échéances
    - Définir les KPI : position dans le pack local, impressions GBP, actions GBP (appels, itinéraires, clics vers le site), volume d'avis, score d'exactitude des citations

## Fichiers de référence

- `gbp-optimization.md` — Guide complet d'optimisation de la fiche Google Business Profile : checklist d'exhaustivité de la fiche, stratégie de catégories, optimisation photo, Google Posts, gestion des questions-réponses, prévention des suspensions, et analytique GBP
- `citation-management.md` — Cadre de construction de citations : principales sources par secteur, exigences de cohérence NAP, stratégie d'agrégateurs de données, méthodologie d'audit, procédures de nettoyage, et gestion multi-établissements des citations
- `local-content.md` — Stratégie de contenu local : recherche de mots-clés géo-modifiés, bonnes pratiques de pages de localisation, pages villes et quartiers, contenu de blog local, optimisation « near me », recherche vocale, et mise à l'échelle du contenu local
- `multi-location.md` — SEO local multi-établissements : gestion GBP à l'échelle, architecture des pages de localisation, SEO du localisateur de magasins, défis des franchises, gestion des avis multi-établissements, reporting, et procédures d'ouverture/fermeture d'établissements

## Formats de livrables

| Livrable | Format | Description |
|---|---|---|
| Rapport d'audit SEO local | Document | Évaluation complète de la fiche GBP, des citations, du NAP, des avis, du contenu, des liens et du schema, avec scores et priorités |
| Checklist d'optimisation GBP | Checklist | Guide d'optimisation GBP champ par champ avec état actuel et actions recommandées |
| Rapport de citations | Tableur | Statut fiche par fiche par annuaire, exactitude NAP et priorité de soumission |
| Modèle de page de localisation | Document | Structure de contenu, exigences SEO, balisage schema et lignes directrices de contenu unique par établissement |
| Calendrier de contenu local | Tableur/Calendrier | Plan de contenu local mensuel avec sujets, mots-clés, formats et calendrier de publication |
| Modèles de réponse aux avis | Document | Modèles de réponse adaptés au secteur pour les avis positifs, neutres, négatifs et faux |
| Plan de netlinking local | Tableur | Liste d'opportunités avec source, autorité, contact et approche d'outreach |
| Package de schema local | Extraits de code | JSON-LD prêt à l'implémentation pour LocalBusiness, GeoCoordinates, OpeningHours et AggregateRating |
| Feuille de route SEO locale | Document | Plan d'action à 30/60/90 jours avec priorités, responsables, échéances et KPI |

## Cas particuliers

### Entreprises à zone de service (sans vitrine physique)
Les entreprises à zone de service (plombiers, électriciens, services mobiles, nettoyeurs à domicile) ne peuvent pas afficher d'adresse postale sur GBP. Définir la zone de service par noms de villes ou codes postaux. Masquer l'adresse dans les paramètres GBP. Ne pas utiliser de boîte postale ou de bureau virtuel — Google suspendra la fiche. Les pages de localisation deviennent des pages de zone de service ciblant chaque ville desservie. La construction de citations utilise l'adresse masquée de manière cohérente mais s'appuie sur le téléphone et l'URL du site comme identifiants principaux. Concentrer la stratégie de contenu sur des pages de service spécifiques à chaque ville plutôt que sur une page de localisation unique.

### Chaînes multi-établissements (50+ établissements)
À grande échelle, la gestion manuelle échoue. Recommander une gestion GBP en masse via API ou plateformes tierces (Yext, Rio SEO, Uberall). Mettre en œuvre des pages de localisation modélisées mais localement uniques, avec des flux de données automatisés pour les horaires, le personnel et les offres. Centraliser la réponse aux avis avec des modèles approuvés tout en permettant aux responsables d'établissement de personnaliser. Construire des tableaux de bord de reporting qui comparent les établissements entre eux et signalent les moins performants. Prioriser les établissements à fort chiffre d'affaires ou sous-performants pour une attention dédiée plutôt que de répartir l'effort de manière égale.

### Marchés locaux très concurrentiels (restaurants, dentistes, plombiers)
Sur des marchés locaux saturés, le playbook standard est un prérequis de base — tout le monde a des citations et des avis. La différenciation vient de : (1) une vélocité et une qualité de réponse aux avis supérieures aux concurrents, (2) des signaux d'engagement GBP issus de publications, photos et activité Q&A régulières, (3) une profondeur de contenu local que les concurrents n'investissent pas, (4) un netlinking local issu d'un engagement communautaire difficile à reproduire, et (5) un ciblage hyper-local au niveau du quartier plutôt qu'au seul niveau de la ville.

### Entreprises couvrant plusieurs villes ou régions
Lorsqu'une entreprise dessert une large zone géographique, éviter de créer des pages passerelles pauvres pour chaque ville. Construire à la place un contenu substantiel pour les marchés prioritaires (avec témoignages, études de cas, membres d'équipe et détails de service uniques par établissement) et utiliser le ciblage de zone de service dans GBP pour les marchés secondaires. Prioriser les villes au potentiel de chiffre d'affaires le plus élevé. Pour les entreprises multi-régions, tenir compte des différentes exigences réglementaires selon la région et ajuster le message de conformité en conséquence.

### Nouvelle entreprise sans présence locale
Partir de zéro nécessite une approche progressive : (1) Revendiquer et optimiser entièrement le GBP dès le premier jour — c'est l'action unique à plus fort impact. (2) Soumettre aux quatre principaux agrégateurs de données dans la première semaine. (3) Construire 20 à 30 citations à forte autorité au cours du premier mois (générales + sectorielles). (4) Lancer immédiatement un programme de génération d'avis — les 10 à 20 premiers avis sont les plus difficiles à obtenir mais les plus impactants. (5) Publier une page de localisation entièrement optimisée avec schema local. (6) Démarrer le contenu local et le netlinking au deuxième mois une fois les fondations posées. Fixer les attentes : une visibilité significative dans le pack local prend généralement 3 à 6 mois pour une nouvelle entreprise sur un marché modérément concurrentiel.

## Conseils et mises en garde

- **La fiche Google Business Profile est l'actif à plus fort effet de levier** en SEO local — les praticiens la considèrent couramment comme représentant la majorité de l'impact du pack local (le chiffre de « 60-80 % » est une règle empirique illustrative, pas une statistique mesurée). Optimisez-la à 100 % avant tout le reste.
- **La cohérence NAP (Nom/Adresse/Téléphone) compte sur des CENTAINES de sources de citations** — pas seulement les 10 premières. Utilisez un outil de gestion des citations chaque trimestre pour détecter les dérives.
- **Ne fabriquez pas de faux avis.** Les systèmes anti-spam d'avis de Google sont de plus en plus agressifs (une mise à jour d'avril 2026 aurait encore durci le seuil — vérifiez le statut d'application actuel avant de conseiller un client). Un seul schéma de faux avis détecté peut supprimer la visibilité GBP pendant des mois.
- **Les entreprises à zone de service** (sans vitrine) nécessitent une stratégie de proximité différente des commerces physiques — des pages de localisation par zone de service, pas par magasin.
- **Pour les marques multi-établissements,** traitez chaque établissement comme sa propre entité GBP — ne cherchez pas à consolider. Créez des liens croisés entre les pages de localisation pour le signal de maillage interne.
- **Les AI Overviews sont de plus en plus locales** — pour les requêtes « near me », l'AI Mode et les AI Overviews font désormais tous deux remonter des résultats locaux. Exécutez `/digital-marketing-pro:aeo-audit` sur des requêtes spécifiques à la localisation chaque trimestre.

## Compétences associées

- **Content Engine** — Pour créer du contenu de blog optimisé localement, du texte de page de localisation, et des calendriers de contenu local
- **Reputation Management** — Pour une stratégie d'avis complète, la gestion de crise et la surveillance de sentiment au-delà des tactiques d'avis spécifiques au local
- **Paid Advertising** — Pour les extensions de localisation Google Ads, les campagnes locales, et les annonces de service local qui complètent le SEO local organique
- **Digital PR & Authority** — Pour obtenir une couverture médiatique locale et construire une autorité locale par la presse et l'engagement communautaire
- **Analytics & Insights** — Pour suivre les métriques de performance SEO local, l'analyse des GBP Insights, et le suivi des classements locaux

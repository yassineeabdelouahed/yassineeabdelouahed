# Mesure privacy-first — Attribution sans cookies

> **Provenance des benchmarks (au 2026-08) :** les montants en dollars de ce document sont des a priori de planification, pas des cotations — les taux de marché et d'enchère évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, rafraîchissez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et consignez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le registre (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Le paysage de la confidentialité

L'ère du suivi cross-site sans restriction est révolue. Safari et Firefox bloquent les cookies tiers depuis 2020. Chrome a introduit des restrictions significatives via le Privacy Sandbox. Des réglementations comme le RGPD, le CCPA/CPRA, et des lois émergentes au niveau des États et à l'international exigent un consentement explicite pour le suivi. Les marketeurs qui n'adaptent pas leur infrastructure de mesure perdront la visibilité sur 40 à 60 % de leur parcours client.

### Ce qui a changé

| Changement | Impact sur la mesure | Calendrier |
|--------|----------------------|----------|
| Safari ITP (Intelligent Tracking Prevention) | Cookies first-party plafonnés à 7 jours (24 heures pour certains) ; suivi cross-site bloqué | Actif depuis 2020 |
| Firefox Enhanced Tracking Protection | Cookies tiers bloqués par défaut | Actif depuis 2019 |
| Chrome Privacy Sandbox / Topics API | Dépréciation ANNULÉE (2024-2025) — Chrome conserve les cookies tiers ; les API Privacy Sandbox continuent sous forme réduite | Revirement confirmé en avril 2025 |
| iOS App Tracking Transparency (ATT) | Les utilisateurs doivent opter pour le suivi cross-app ; taux d'opt-in d'environ 25 % | Actif depuis iOS 14.5 (2021) |
| RGPD (UE) | Exige un consentement explicite pour les cookies non essentiels ; amendes jusqu'à 4 % du revenu mondial | Actif depuis 2018 |
| CCPA/CPRA (Californie) | Droit de refuser la vente/le partage des données personnelles | Actif depuis 2020/2023 |
| Lois de confidentialité étatiques (États-Unis) | Virginie, Colorado, Connecticut, Texas, Oregon, et d'autres avec des exigences similaires | Déploiement continu 2023-2026 |
| Règlement ePrivacy (UE — RETIRÉ en février 2025) | Proposition retirée du programme de travail de la Commission ; les règles sur les cookies de la Directive ePrivacy de 2002 restent en vigueur | Surveiller le chantier du Digital Fairness Act |

---

## Approches d'attribution sans cookies

### La nouvelle pile de mesure

Le remplacement de l'attribution basée sur les cookies n'est pas une solution unique mais une combinaison d'approches.

| Approche | Ce qu'elle fait | Niveau de confidentialité | Précision | Effort de mise en œuvre |
|----------|-------------|---------------|----------|----------------------|
| **Suivi côté serveur** | Envoie les données de conversion de votre serveur vers les plateformes publicitaires (contourne les restrictions du navigateur) | Moyen (traite encore des données utilisateur) | Élevée | Moyen-élevé |
| **Appariement de données first-party** | Fait correspondre vos données CRM/e-mail aux utilisateurs de la plateforme via des identifiants hachés | Moyen | Moyenne-élevée | Moyen |
| **Suivi basé sur le consentement** | Suivi complet pour les utilisateurs consentants ; données modélisées pour les autres | Élevé | Moyenne (dépend du taux de consentement) | Moyen |
| **Marketing Mix Modeling** | Analyse statistique agrégée ne nécessitant aucune donnée utilisateur | Très élevé | Moyenne (stratégique, pas tactique) | Élevé |
| **Tests d'incrémentalité** | Expériences contrôlées mesurant le lift causal | Très élevé | Élevée (pour les canaux testés) | Élevé |
| **API Privacy Sandbox** | Topics, Attribution Reporting, Protected Audiences de Chrome | Élevé | Moyenne (encore en évolution) | Moyen |
| **Data clean rooms** | Environnements sécurisés pour l'appariement de données annonceur + éditeur sans exposer les PII | Élevé | Moyenne-élevée | Élevé |
| **Attribution auto-déclarée** | Demander directement aux utilisateurs comment ils vous ont trouvé | Très élevé | Faible-moyenne (biais de mémoire) | Faible |

---

## Architecture de gestion du consentement

### Exigences de la plateforme de gestion du consentement (CMP)

Une CMP est le fondement de la mesure conforme à la confidentialité. Elle doit gérer :

| Exigence | Détail |
|-------------|--------|
| **Collecte du consentement** | Afficher une bannière conforme à la première visite ; collecter un consentement granulaire par finalité |
| **Stockage du consentement** | Stocker l'état du consentement côté serveur (pas seulement dans un cookie qui expire) |
| **Propagation du consentement** | Transmettre les signaux de consentement à toutes les balises, pixels, et intégrations côté serveur |
| **Retrait du consentement** | Permettre aux utilisateurs de modifier leurs préférences à tout moment via un lien persistant |
| **Règles basées sur la géographie** | Appliquer les règles RGPD aux visiteurs de l'UE, le CCPA à la Californie, etc. |
| **Conformité TCF 2.2** | Prendre en charge le IAB Transparency & Consent Framework pour le programmatique |
| **Google Consent Mode v2** | Requis pour les publicités dans l'EEE — envoie des signaux de consentement aux balises Google |

### Options d'outils CMP

| Outil | Idéal pour | Tarification |
|------|----------|---------|
| Cookiebot (Usercentrics) | PME à mid-market, configuration facile | Gratuit (< 100 pages), payant à partir de ~15 $/mois |
| OneTrust | Entreprise, exigences multi-géo complexes | Tarification sur mesure |
| Osano | Mid-market, bonne UX | À partir de ~199 $/mois |
| TrustArc | Entreprise, focus sur la conformité réglementaire | Tarification sur mesure |
| Sourcepoint | Éditeurs et ad-tech | Tarification sur mesure |

### Mise en œuvre du Consent Mode

Google Consent Mode v2 permet à vos balises d'ajuster leur comportement selon le consentement de l'utilisateur :

| État du consentement | Comportement de la balise | Données collectées |
|--------------|-------------|----------------|
| `ad_storage = granted` | Suivi publicitaire complet, remarketing | Cookies, ID de clic, données de conversion |
| `ad_storage = denied` | Pings sans cookies pour la modélisation des conversions | Conversions agrégées, modélisées |
| `analytics_storage = granted` | Suivi GA4 complet | Données analytiques au niveau utilisateur |
| `analytics_storage = denied` | Pings sans cookies pour la modélisation analytique | Analytics modélisées, agrégées |

**Liste de contrôle de mise en œuvre :**

- [ ] CMP installée et configurée pour toutes les juridictions applicables
- [ ] Google Consent Mode v2 intégré avec la CMP
- [ ] État de consentement par défaut correctement défini par région (refusé pour l'EEE, accordé pour les États-Unis sauf opt-out)
- [ ] Toutes les balises Google (GA4, Ads, Floodlight) mises à jour pour respecter les signaux de consentement
- [ ] Meta Pixel configuré pour respecter le consentement (via intégration CMP ou Meta Consent Mode)
- [ ] Taux de consentement surveillés et optimisés (objectif > 70 % d'opt-in avec une UX conforme)
- [ ] Mesure de secours côté serveur active pour les utilisateurs non consentants

---

## Mise en œuvre du suivi côté serveur

### Meta Conversions API (CAPI)

CAPI envoie les événements de conversion depuis votre serveur directement à Meta, contournant les limites du pixel basé sur le navigateur.

**Architecture :**

```
User converts on your site
    → Your server captures event data
    → Your server sends event to Meta CAPI endpoint
    → Meta matches the event to the user via hashed identifiers
    → Meta uses the event for optimization and reporting
```

**Options de mise en œuvre :**

| Méthode | Complexité | Idéal pour |
|--------|-----------|----------|
| **Intégration native Shopify** | Faible | Marchands Shopify (activer dans les paramètres) |
| **GTM Server-Side** | Moyenne | Équipes utilisant Google Tag Manager |
| **Intégration API directe** | Élevée | Plateformes personnalisées, contrôle maximal |
| **Intégration partenaire (Segment, mParticle)** | Moyenne | Équipes utilisant un CDP |

**Données à envoyer via CAPI :**

| Paramètre | Requis ? | Objectif |
|-----------|----------|---------|
| `event_name` | Oui | Achat, AddToCart, Lead, etc. |
| `event_time` | Oui | Horodatage Unix de l'événement |
| `action_source` | Oui | `website`, `app`, `email`, etc. |
| `user_data.em` | Fortement recommandé | E-mail haché pour l'appariement |
| `user_data.ph` | Recommandé | Téléphone haché pour l'appariement |
| `user_data.fn` / `user_data.ln` | Recommandé | Prénom/nom hachés |
| `user_data.external_id` | Recommandé | Votre ID utilisateur interne (haché) |
| `user_data.fbc` | Si disponible | ID de clic Facebook depuis le paramètre d'URL |
| `user_data.fbp` | Si disponible | ID de navigateur Facebook depuis le cookie _fbp |
| `custom_data.value` | Pour les événements d'achat | Revenu de la transaction |
| `custom_data.currency` | Pour les événements d'achat | Code devise (USD, EUR) |

**Déduplication :** si vous exécutez à la fois le pixel navigateur et CAPI, vous devez inclure un `event_id` dans les deux pour éviter le double comptage. Utilisez le même identifiant unique (par ex. l'ID de commande) dans l'événement du pixel et l'événement CAPI.

### Google Enhanced Conversions

Enhanced Conversions envoie des données first-party hachées (e-mail, téléphone, adresse) avec vos balises de conversion Google Ads, améliorant les taux de correspondance.

**Types :**

| Type | Fonctionnement | Idéal pour |
|------|-------------|----------|
| **Enhanced Conversions for Web** | Données utilisateur hachées envoyées avec l'événement de conversion gtag | Génération de leads, e-commerce avec achats sur site |
| **Enhanced Conversions for Leads** | Données de conversion hors ligne importées et appariées via des identifiants hachés | B2B avec cycle de vente hors ligne |

**Liste de contrôle de mise en œuvre :**

- [ ] Accepter les conditions Enhanced Conversions de Google Ads
- [ ] Identifier où les données utilisateur sont capturées (paiement, formulaire de lead, création de compte)
- [ ] Configurer gtag.js ou GTM pour capturer et hacher les champs de données utilisateur (e-mail, téléphone, nom, adresse)
- [ ] Vérifier Enhanced Conversions dans les diagnostics Google Ads (vérifier le taux de correspondance — objectif > 60 %)
- [ ] Pour les leads : configurer l'import de conversions hors ligne avec appariement par GCLID ou e-mail haché
- [ ] Tester avec Google Tag Assistant pour confirmer que les données hachées sont envoyées correctement

### TikTok Events API

| Élément | Détail |
|---------|--------|
| **Point de terminaison** | TikTok Events API (serveur à serveur) |
| **Appariement** | E-mail, téléphone hachés, ou ID de clic TikTok (ttclid) |
| **Événements clés** | ViewContent, AddToCart, CompletePayment, SubmitForm |
| **Déduplication** | Utiliser l'appariement `event_id` entre le pixel et Events API |
| **Configuration** | Via TikTok Business Center ou intégration partenaire |

---

## Stratégie de données first-party

### Construire une fondation de données first-party

| Source de données | Ce qu'il faut capturer | Stockage | Cas d'usage |
|-------------|----------------|---------|----------|
| Inscriptions e-mail | E-mail, nom, source d'acquisition | CRM / CDP | Appariement côté serveur, marketing e-mail, audiences similaires (lookalike) |
| Achats | E-mail, téléphone, adresse, historique d'achat | Plateforme e-commerce + CRM | Appariement CAPI, segmentation, modélisation de LTV |
| Création de compte | E-mail, données de profil, préférences | Système d'authentification + CRM | Personnalisation, appariement cross-device |
| Programme de fidélité | E-mail, téléphone, fréquence d'achat, préférences | Plateforme de fidélité + CRM | Audiences à fort taux de correspondance, mesure de la rétention |
| Quiz / enquêtes | E-mail, préférences, signaux d'intention | CRM / CDP | Segmentation, retargeting personnalisé |
| Comportement sur site | Vues de page, requêtes de recherche, clics (avec consentement) | Analytics + CDP | Audiences comportementales, optimisation de contenu |

### Activation d'audience first-party

| Plateforme | Fonctionnalité d'audience | Méthode d'appariement | Taux de correspondance typique |
|----------|-----------------|-------------|-------------------|
| Meta | Custom Audiences | E-mail, téléphone hachés | 60-80 % |
| Google | Customer Match | E-mail, téléphone, adresse hachés | 50-70 % |
| TikTok | Custom Audiences | E-mail, téléphone hachés | 40-60 % |
| LinkedIn | Matched Audiences | E-mail haché, nom d'entreprise | 30-50 % |
| Pinterest | Customer Lists | E-mail haché | 40-60 % |

**Optimisation du taux de correspondance :**
- Inclure autant d'identifiants que possible (e-mail + téléphone + nom + adresse)
- Nettoyer et standardiser les données avant l'import (minuscules, suppression des espaces, formatage cohérent)
- Mettre à jour les listes régulièrement (synchronisation hebdomadaire ou automatisée via un CDP)
- Utiliser un double opt-in e-mail pour garantir des adresses valides
- Enrichir les données avec la capture du numéro de téléphone au paiement

---

## Data clean rooms

### Que sont les data clean rooms ?

Une data clean room est un environnement sécurisé, préservant la confidentialité, où deux parties ou plus peuvent apparier et analyser leurs données sans qu'aucune des deux ne voie les données brutes de l'autre.

| Fournisseur | Type | Idéal pour |
|----------|------|----------|
| **Google Ads Data Hub** | Spécifique à la plateforme | Analyser la performance Google Ads avec vos données first-party |
| **Meta Advanced Analytics** | Spécifique à la plateforme | Recouper l'exposition publicitaire Meta avec vos données de conversion |
| **AWS Clean Rooms** | Basé sur le cloud (neutre) | Collaboration de données multi-partenaire (détaillant + marque, éditeur + annonceur) |
| **Snowflake Data Clean Rooms** | Basé sur le cloud (neutre) | Collaboration de données d'entreprise avec une infrastructure Snowflake existante |
| **LiveRamp Data Collaboration** | Basé sur l'identité | Appariement et mesure d'audience cross-plateforme |
| **InfoSum** | Décentralisé | Collaboration privacy-first sans mouvement de données |

### Cas d'usage

| Cas d'usage | Fonctionnement | Bénéfice pour la confidentialité |
|----------|-------------|-----------------|
| **Mesure cross-plateforme** | Apparier vos données de conversion avec les données d'exposition publicitaire de la plateforme | Aucune donnée brute ne quitte l'environnement de l'une ou l'autre partie |
| **Attribution retail media** | La marque apparie les données de vente avec les données d'exposition publicitaire du détaillant | La marque ne voit pas les données clients du détaillant et vice versa |
| **Insight d'audience éditeur** | L'annonceur découvre le chevauchement entre ses clients et l'audience d'un éditeur | Aucune PII échangée |
| **Analyse multi-touch** | Combiner les données d'exposition de plusieurs plateformes dans une seule clean room | Les plateformes ne voient pas les données des autres |

---

## Reporting préservant la confidentialité

### Standards de reporting agrégé

| Principe | Mise en œuvre |
|-----------|---------------|
| **Seuils d'agrégation minimaux** | Ne jamais rapporter sur des segments de moins de 50 utilisateurs (certaines plateformes exigent 100+) |
| **Confidentialité différentielle** | Ajouter du bruit statistique aux petits segments pour empêcher l'identification individuelle |
| **Reporting au niveau cohorte** | Rapporter sur des groupes d'utilisateurs (cohortes), pas des individus |
| **Reporting à délai** | Accepter des délais de données de 24-72 heures en échange de la conformité en matière de confidentialité |
| **Conversions modélisées** | Utiliser les données modélisées de la plateforme pour combler les lacunes des utilisateurs non consentants |

### Configuration de confidentialité GA4

- [ ] Rétention des données définie à la période appropriée (14 mois max, ou plus court selon la politique)
- [ ] Anonymisation IP confirmée (par défaut dans GA4)
- [ ] Google Signals activé uniquement si le consentement est collecté
- [ ] Suivi User-ID mis en œuvre uniquement avec consentement
- [ ] Demandes de suppression de données automatisées via API
- [ ] Consent Mode v2 actif et vérifié
- [ ] Seuillage (thresholding) compris (GA4 masque les lignes lorsque la taille d'échantillon est trop faible)
- [ ] Export BigQuery configuré pour l'analyse de données brutes (là où le consentement le permet)

---

## Conformité aux réglementations de confidentialité pour la mesure

### Liste de contrôle de conformité par réglementation

| Exigence | RGPD | CCPA/CPRA | Autres lois d'États américains |
|-------------|------|-----------|-------------------|
| Consentement requis avant le suivi ? | Oui (opt-in) | Non (modèle opt-out) | Variable (majoritairement opt-out) |
| Divulgation de la collecte de données obligatoire ? | Oui (politique de confidentialité) | Oui (politique de confidentialité) | Oui |
| Droit à l'effacement ? | Oui | Oui | Oui (la plupart) |
| Accord de traitement des données requis ? | Oui (avec tous les sous-traitants) | Oui (accords de prestataire de service) | Oui (la plupart) |
| Restrictions de transfert transfrontalier ? | Oui (CCT, décisions d'adéquation) | Limitées | Limitées |
| Consentement pour le profilage/ciblage ? | Oui (l'intérêt légitime peut s'appliquer dans certains cas) | Droit d'opt-out | Variable |
| Bannière de consentement cookies requise ? | Oui (consentement préalable) | Pas spécifiquement (mais recommandé) | Variable |

### Actions de conformité spécifiques à la mesure

- [ ] Politique de confidentialité mise à jour pour divulguer toutes les technologies de suivi et le partage de données avec les plateformes publicitaires
- [ ] Accords de traitement des données (DPA) signés avec tous les fournisseurs analytiques et de plateformes publicitaires
- [ ] Enregistrements de consentement stockés et auditables (quels utilisateurs ont consenti, quand, à quoi)
- [ ] Les demandes des personnes concernées (suppression, accès) peuvent être satisfaites sous 30 jours
- [ ] Le suivi côté serveur ne traite que des données consenties (ou des données agrégées, non personnelles)
- [ ] Le hachage des PII se produit côté client avant la transmission à des tiers
- [ ] Audit de confidentialité régulier de toutes les balises, pixels, et connexions côté serveur (trimestriel minimum)
- [ ] Équipe marketing formée sur les exigences de confidentialité pertinentes pour leurs outils et workflows
- [ ] Revue juridique de toute nouvelle implémentation de suivi avant déploiement

---

## Feuille de route de mise en œuvre

### Phase 1 : fondations (mois 1)

- [ ] Déployer une CMP avec des règles de consentement basées sur la géographie
- [ ] Mettre en œuvre Google Consent Mode v2
- [ ] Auditer toutes les balises de suivi existantes pour la conformité au consentement
- [ ] Activer Meta CAPI (utiliser l'intégration native Shopify ou GTM server-side)
- [ ] Activer Google Enhanced Conversions
- [ ] Surveiller les taux de consentement et optimiser l'UX de la bannière

### Phase 2 : données first-party (mois 2-3)

- [ ] Auditer les points de collecte de données first-party (e-mail, téléphone, création de compte)
- [ ] Mettre en œuvre le streaming d'événements côté serveur pour les conversions clés
- [ ] Configurer les synchronisations d'audience first-party vers les principales plateformes publicitaires (Custom Audiences, Customer Match)
- [ ] Déployer la déduplication entre les événements navigateur et côté serveur
- [ ] Vérifier les taux de correspondance sur toutes les plateformes (objectif > 60 %)

### Phase 3 : mesure avancée (mois 3-6)

- [ ] Mettre en œuvre ou commander un Marketing Mix Modeling
- [ ] Concevoir et exécuter le premier test d'incrémentalité
- [ ] Évaluer les options de data clean room pour la mesure cross-plateforme
- [ ] Construire un tableau de bord de reporting conforme à la confidentialité avec des conversions modélisées
- [ ] Établir une revue trimestrielle de la précision de mesure

### Phase 4 : optimisation (continu)

- [ ] Améliorer continuellement les taux de consentement via l'optimisation de l'UX
- [ ] Étendre la collecte de données first-party (programme de fidélité, quiz, profilage progressif)
- [ ] Calibrer le MMM avec les résultats des tests d'incrémentalité
- [ ] Mettre à jour la conformité en matière de confidentialité à mesure que de nouvelles réglementations entrent en vigueur
- [ ] Former l'équipe trimestriellement sur l'évolution du paysage de la confidentialité et les approches de mesure
- [ ] Documenter la méthodologie de mesure et les limites connues pour la transparence envers les parties prenantes

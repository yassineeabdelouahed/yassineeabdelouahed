# LinkedIn Ads — Référence publicité B2B

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Vue d'ensemble des types de campagnes

| Type de campagne | Adéquation à l'objectif | Format | CPC moyen | Idéal pour |
|---|---|---|---|---|
| Sponsored Content (image unique) | Notoriété, leads, visites du site | Image in-feed + texte | 5–12 $ | Leadership éclairé, promotion de contenu |
| Sponsored Content (vidéo) | Notoriété, engagement | Vidéo in-feed | 0,06–0,15 $ (CPV) | Storytelling de marque, démos produit |
| Sponsored Content (carrousel) | Engagement, considération | Multi-cartes défilables | 4–10 $ | Vitrine multi-fonctionnalités, études de cas |
| Document Ads | Génération de leads, engagement | Document téléchargeable in-feed | 4–10 $ | Livres blancs, rapports, guides |
| Message Ads (InMail) | Génération de leads, promotion d'événement | Message direct | 0,30–1,00 $ (par envoi) | Offres à haute valeur, invitations à des événements |
| Conversation Ads | Génération de leads | Arbre de messages interactif | 0,30–1,00 $ (par envoi) | CTA multi-chemins, parcours de qualification |
| Lead Gen Forms | Capture de leads | Overlay de formulaire natif | 5–15 $ | Contenu réservé, demandes de démo |
| Dynamic Ads (Follower) | Croissance de la page | Colonne de droite, personnalisé | 3–7 $ | Acquisition d'abonnés de page entreprise |
| Dynamic Ads (Spotlight) | Trafic, conversion | Colonne de droite, personnalisé | 3–7 $ | CTA personnalisés, offres d'emploi |
| Text Ads | Trafic | Colonne de droite, petit format | 2–5 $ | Notoriété à petit budget, complément de remarketing |

## Approfondissement du ciblage

### Dimensions de ciblage professionnel

| Dimension | Options de ciblage | Notation de qualité | Notes |
|---|---|---|---|
| Intitulé de poste | Titres exacts ou normalisés | La plus élevée | Le plus précis ; à utiliser pour l'ABM étroit |
| Fonction | 26 catégories (par ex. Marketing, IT, Finance) | Élevée | Portée plus large, bon pour la notoriété |
| Niveau d'ancienneté | Débutant, Senior, Manager, Directeur, VP, CXO, Propriétaire | Élevée | Combiner avec la fonction pour la précision |
| Nom d'entreprise | Organisations spécifiques | La plus élevée | Listes ABM ; min. 300 correspondances d'entreprise |
| Secteur d'entreprise | 148 secteurs | Moyenne-élevée | Bonne couche de haut de tunnel |
| Taille d'entreprise | 1–10 jusqu'à 10 001+ (9 tranches) | Élevée | Critique pour le ciblage TPE/PME vs Entreprise |
| Compétences | Compétences déclarées par le membre (2 000+) | Moyenne | Autodéclaré ; plus large mais moins fiable |
| Groupes | Appartenance à un groupe LinkedIn | Moyenne | Audiences de niche ; échelle limitée |
| Formation | École, diplôme, domaine d'étude | Moyenne | Recrutement, verticales de l'enseignement supérieur |
| Années d'expérience | 1–12+ ans | Moyenne | Proxy d'ancienneté utile |
| Centres d'intérêt | Inférés à partir de l'engagement avec le contenu | Faible-moyenne | Complément, à ne pas utiliser seul |

### Bonnes pratiques de combinaison de ciblage
- [ ] Superposer Fonction + Ancienneté pour cibler les décideurs
- [ ] Utiliser le nom d'entreprise pour l'ABM ; secteur + taille d'entreprise pour un B2B plus large
- [ ] Éviter les audiences trop étroites — minimum 50 000 pour Sponsored Content
- [ ] Exclure les concurrents, les agences et les chercheurs d'emploi le cas échéant
- [ ] Utiliser « OU » au sein d'une dimension, « ET » entre dimensions
- [ ] N'activer l'Expansion d'audience que pour les campagnes de notoriété — désactiver pour la précision

### Recommandations de taille d'audience

| Type de campagne | Audience minimale | Zone idéale |
|---|---|---|
| Sponsored Content | 50 000 | 100 000–500 000 |
| Message Ads | 15 000 | 30 000–100 000 |
| Text/Dynamic Ads | 30 000 | 60 000–300 000 |
| ABM (liste d'entreprises) | 300 entreprises | 1 000–10 000 entreprises |

## Stratégies ABM (Account-Based Marketing)

### Cadre ABM LinkedIn

```
Niveau 1 : Comptes nommés (1:1)
├── Matched Audience : Charger une liste d'entreprises (CSV)
├── Créatif : Personnalisé par compte/secteur
├── Objectif : Engagement, demandes de démo
└── Budget : Dépense la plus élevée par compte

Niveau 2 : Groupes sectoriels (1:Quelques-uns)
├── Ciblage : Secteur d'entreprise + taille + ancienneté
├── Créatif : Messages spécifiques au secteur
├── Objectif : Consommation de contenu, génération de leads
└── Budget : Dépense moyenne par compte

Niveau 3 : Caractéristiques ICP (1:Beaucoup)
├── Ciblage : Fonction + ancienneté + taille d'entreprise
├── Créatif : Basé sur les personas, proposition de valeur large
├── Objectif : Notoriété, nurturing
└── Budget : Dépense la plus faible par compte
```

### Checklist d'exécution ABM
- [ ] Charger la liste des entreprises cibles (CSV : nom d'entreprise, domaine, secteur)
- [ ] Cible de taux de correspondance : 70 %+ (nettoyer et standardiser les noms)
- [ ] Superposer avec l'ancienneté/la fonction pour atteindre les décideurs au sein des comptes
- [ ] Créer un créatif spécifique au compte ou au secteur
- [ ] Configurer le reporting de démographie de site web pour le suivi d'engagement au niveau du compte
- [ ] Suivre les métriques d'engagement : impressions, clics, leads au niveau entreprise
- [ ] Coordonner avec l'équipe commerciale sur la priorisation des comptes et le suivi

## Optimisation des Lead Gen Forms

### Impact du nombre de champs sur la performance

| Nombre de champs | Taux de complétion | À utiliser quand |
|---|---|---|
| 2–3 champs | 12–15 % | Maximiser le volume (haut de tunnel) |
| 4–5 champs | 8–12 % | Équilibre qualité et volume |
| 6–7 champs | 4–8 % | Qualifier les leads (bas de tunnel) |
| 8+ champs | < 4 % | Qualification entreprise uniquement |

### Configuration de champs recommandée

| Champ | Auto-rempli | Inclure ? | Notes |
|---|---|---|---|
| Prénom | Oui | Toujours | Pré-rempli ; aucune friction |
| Nom | Oui | Toujours | Pré-rempli ; aucune friction |
| Email (professionnel) | Oui | Toujours | Email professionnel auto-rempli ; valeur la plus élevée |
| Intitulé de poste | Oui | Recommandé | Signal de qualification |
| Nom d'entreprise | Oui | Recommandé | Attribution ABM |
| Numéro de téléphone | Non | Optionnel | Ajoute de la friction ; à utiliser pour la forte intention seulement |
| Taille d'entreprise | Non | Optionnel | Saisie manuelle ; qualification |
| Question personnalisée | Non | Optionnel | Texte libre ou choix multiple pour l'intention |

### Bonnes pratiques des Lead Gen Forms
- [ ] Offrir un échange de valeur clair et spécifique (pas seulement « En savoir plus »)
- [ ] Utiliser un message de remerciement personnalisé avec un CTA d'étape suivante
- [ ] Configurer des champs cachés pour le suivi UTM et l'attribution de campagne
- [ ] Connecter au CRM via une intégration (HubSpot, Salesforce, Zapier)
- [ ] Répondre aux leads dans les 5 minutes — le taux de conversion chute de 80 % après 30 minutes
- [ ] Test A/B : formulaire court (3 champs) vs formulaire qualifiant (5+ champs)

## Structure de tunnel B2B

### Architecture de campagne LinkedIn full-funnel

| Étape | Objectif | Type de campagne | Type de contenu | KPI |
|---|---|---|---|---|
| Notoriété (haut de tunnel) | Reconnaissance de marque | Sponsored Content (vidéo) | Leadership éclairé, tendances, point de vue | Vues vidéo, portée, taux d'engagement |
| Considération (milieu de tunnel) | Éducation + intérêt | Sponsored Content (image/carrousel), Document Ads | Études de cas, livres blancs, webinaires | CTR, téléchargements de contenu, engagement |
| Conversion (bas de tunnel) | Capture de leads | Lead Gen Forms, Message Ads | Offres de démo, essai gratuit, consultation | CPL, volume de leads, taux de complétion du formulaire |
| Fidélisation | Upsell + loyauté | Sponsored Content, Conversation Ads | Mises à jour produit, témoignages clients | Engagement, revenu d'expansion |

### Couches de retargeting

| Audience | Fenêtre de rétrospective | Étape du tunnel |
|---|---|---|
| Spectateurs vidéo (50 %+) | 90 jours | Milieu de tunnel |
| Personnes ayant ouvert le formulaire de lead (sans soumettre) | 90 jours | Bas de tunnel |
| Visiteurs du site (pages clés) | 180 jours | Milieu-bas de tunnel |
| Personnes ayant engagé avec la page entreprise | 365 jours | Milieu de tunnel |
| Participants à un événement | 365 jours | Milieu-bas de tunnel |
| Liste clients (import CRM) | Rafraîchie mensuellement | Fidélisation |

## Spécifications créatives et bonnes pratiques

### Sponsored Content (image unique)
- **Taille de l'image :** 1200x627 (1,91:1) ou 1080x1080 (1:1)
- **Titre :** Max 70 caractères (recommandé) / 200 (limite)
- **Texte introductif :** Max 150 caractères au-dessus de la ligne de flottaison / 600 (limite)
- **Type de fichier :** JPG, PNG
- **Taille de fichier max :** 5 Mo

### Sponsored Content (vidéo)
- **Ratio d'aspect :** 16:9 (paysage), 1:1 (carré), 9:16 (vertical/mobile)
- **Durée :** 15–90 secondes (zone idéale : 30 secondes)
- **Taille de fichier :** 75 Ko–200 Mo
- **Sous-titres :** Requis (ajouter un SRT ou les incruster)

### Bonnes pratiques créatives pour le B2B
- [ ] Ouvrir avec un insight, pas un discours produit — « Ce que nous avons appris en analysant 10 000 deals B2B »
- [ ] Utiliser des données et de la précision — « 37 % de réduction du temps d'onboarding » l'emporte sur « onboarding plus rapide »
- [ ] Inclure des visages — les publications avec des personnes obtiennent 2 à 3x plus d'engagement
- [ ] Utiliser un créatif natif, de style éditorial — éviter l'esthétique banque d'images
- [ ] Tester le texte long vs le texte court (l'audience LinkedIn lit)
- [ ] Toujours inclure un CTA unique et clair dans le texte et dans l'image

## Recommandations budgétaires

### Budgets minimums viables

| Objectif de campagne | Minimum mensuel | Mensuel recommandé | Notes |
|---|---|---|---|
| Notoriété / Leadership éclairé | 3 000 $ | 5 000–10 000 $ | Besoin de portée ; les CPM LinkedIn sont élevés (30–60 $) |
| Génération de leads | 5 000 $ | 10 000–25 000 $ | Attendre un CPL de 50–200 $ selon l'offre |
| ABM (Niveau 1) | 5 000 $ | 10 000–20 000 $ | Les petites audiences nécessitent des impressions soutenues |
| B2B full-funnel | 10 000 $ | 25 000–50 000 $+ | Supporte notoriété + retargeting + génération de leads |

### Allocation budgétaire par étape du tunnel (B2B)

| Étape | % du budget | Justification |
|---|---|---|
| Notoriété (haut de tunnel) | 30–40 % | Construire l'audience, gagner la confiance |
| Considération (milieu de tunnel) | 30–40 % | Générer de l'engagement avec du contenu de valeur |
| Conversion (bas de tunnel) | 20–30 % | Capturer la demande générée ci-dessus |

## Benchmarks spécifiques à LinkedIn

| Métrique | Sponsored Content | Message Ads | Lead Gen Forms | Text Ads |
|---|---|---|---|---|
| CTR | 0,4–0,7 % | 3–5 % (taux d'ouverture : 30–50 %) | 10–15 % (taux de remplissage du formulaire) | 0,02–0,05 % |
| CPC | 5–12 $ | N/A (coût par envoi) | 10–50 $ (CPL) | 2–5 $ |
| CPM | 30–60 $ | N/A | 30–60 $ | 8–15 $ |
| Taux d'engagement | 0,5–1,5 % | N/A | N/A | N/A |
| CPL moyen | 50–150 $ | 30–100 $ | 30–120 $ | 80–200 $ |

### Remarques clés sur les métriques
- Le CPC LinkedIn est 3 à 5 fois plus élevé que sur Meta ou Google Display — c'est normal et attendu pour le B2B
- La valeur réside dans la qualité de l'audience : des décideurs sur des profils professionnels vérifiés
- Mesurer les métriques en aval (taux de SQL, pipeline, revenu) et pas seulement le CPL
- Les cycles de vente B2B durent 3 à 12 mois — l'attribution doit tenir compte de fenêtres de considération longues
- Utiliser le LinkedIn Insight Tag pour le reporting de démographie de site web (voir quelles entreprises visitent)

## Dépannage des problèmes courants

| Problème | Cause probable | Correctif |
|---|---|---|
| Faible diffusion / impressions | Audience trop étroite, enchère trop basse | Élargir l'audience à 100K+ ; augmenter l'enchère au-dessus de la fourchette suggérée |
| CPC élevé, faible CTR | Créatif faible ou mauvais alignement de ciblage | Tester de nouveaux angles créatifs ; affiner le ciblage pour retirer les segments à faible pertinence |
| CPL élevé depuis les Lead Gen Forms | Trop de champs, offre faible | Réduire à 3–4 champs ; renforcer l'échange de valeur |
| Faible taux d'ouverture sur les Message Ads | Objet faible, mauvais expéditeur | Tester des objets de moins de 40 caractères ; envoyer depuis une personne, pas une marque |
| Faible taux d'engagement | Contenu trop promotionnel | Passer à du contenu de leadership éclairé, orienté données, éducatif |
| Faible taux de correspondance sur la liste d'entreprises | Noms d'entreprise incohérents | Standardiser selon les conventions de nommage LinkedIn ; inclure les domaines |

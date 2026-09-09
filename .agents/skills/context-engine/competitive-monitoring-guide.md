# Guide de surveillance concurrentielle

Connaissances de référence pour l'intelligence concurrentielle continue, la détection de changement, l'écoute sociale, le calcul de la part de voix, les playbooks de réponse concurrentielle, et la gestion des alertes. Utilisez ce guide lors de la mise en place ou de l'exécution de flux de surveillance concurrentielle.

---

## 1. Identification et catégorisation des concurrents

### Définitions de catégorie

| Catégorie | Définition | Exemples | Priorité de surveillance |
|---|---|---|---|
| **Direct** | Même produit/service, même marché cible. Rivalise pour les mêmes clients et mots-clés. | Deux outils SaaS de gestion de projet ciblant le marché intermédiaire | La plus élevée — surveiller quotidiennement à hebdomadairement |
| **Indirect** | Produit différent, résout le même besoin sous-jacent. Les clients choisissent entre vous. | Outil de gestion de projet vs flux de travail basé sur tableur | Moyenne — surveiller hebdomadairement à mensuellement |
| **Aspirationnel** | Où vous voulez être. Leaders de marché ou marques définissant la catégorie auxquelles vous vous comparez. | Une startup se comparant à Salesforce ou HubSpot | Faible — surveiller mensuellement à trimestriellement |
| **Émergent** | Startups, nouveaux entrants, ou acteurs adjacents s'étendant vers votre marché. | Un CRM ajoutant des fonctionnalités de gestion de projet | Moyenne-élevée — surveiller hebdomadairement (la détection précoce est critique) |

### Modèle de profilage concurrentiel

Pour chaque concurrent suivi, maintenir un profil structuré :

- **Entreprise** : Nom, URL, année de fondation, étape de financement/estimation de chiffre d'affaires, nombre d'employés
- **Produit** : Fonctionnalités clés, paliers tarifaires, disponibilité d'un palier gratuit, différenciateurs clés
- **Marché** : Segments cibles, focus géographique, spécialisations verticales
- **Présence digitale** : Autorité de domaine, trafic organique estimé, mots-clés classés principaux (nombre), abonnés sociaux par plateforme, estimations de dépense publicitaire
- **Stratégie de contenu** : Rythme de blog, types de contenu (blog, vidéo, podcast, webinaire), ratio fermé vs ouvert
- **Message** : Slogan, proposition de valeur principale, déclaration de positionnement, affirmations clés
- **Dernière mise à jour** : Horodatage de l'actualisation la plus récente du profil

---

## 2. Rythme de surveillance par catégorie

### Surveillance quotidienne (automatisée)

- **Changements de tarification** : Scraper les pages de tarification. Comparer à l'instantané stocké. Alerter sur tout changement de nom de palier, prix, inclusions de fonctionnalités, ou structure de plan
- **Changements de stock/disponibilité** : Pour les concurrents e-commerce, surveiller les changements de statut de disponibilité produit
- **Mouvements de mots-clés critiques** : Suivre les positions pour les 10-20 termes principaux. Alerter quand un concurrent entre dans le top 3 ou déplace votre position
- **Changements de création publicitaire** : Surveiller le Google Ads Transparency Center et la Meta Ad Library pour de nouvelles créations des concurrents suivis
- **Mentions presse/actualités** : API d'actualités ou Google Alerts pour les mentions de marque concurrente dans les sources d'actualités

### Surveillance hebdomadaire

- **Publication de contenu** : Vérifier les flux RSS de blog concurrent ou scraper les pages d'index de blog. Journaliser les nouvelles publications avec titre, URL, sujet, estimation de nombre de mots, mot-clé cible
- **Activité sur les réseaux sociaux** : Extraire la fréquence de publication, les taux d'engagement, la croissance des abonnés. Signaler les anomalies (changement de fréquence de publication >50 %, pic d'engagement >3x la moyenne)
- **Acquisition de backlinks** : Vérifier les nouveaux domaines référents vers les sites concurrents via des API de surveillance de backlinks. Signaler les liens à haute autorité (DA 60+)
- **Thèmes de message publicitaire** : Revoir les publicités actives à travers les plateformes. Catégoriser par type d'offre (remise, essai gratuit, mise en avant de fonctionnalité, preuve sociale)
- **Changements de fonctionnalités SERP** : Suivre quels concurrents apparaissent dans les Extraits Optimisés, AI Overviews, PAA, Blocs de Connaissances pour les mots-clés cibles

### Surveillance mensuelle

- **Évolutions de stratégie** : Revoir les sujets de blog concurrent, le message publicitaire, les mises à jour produit, et les schémas de recrutement pour des signaux de direction stratégique
- **Changements de positionnement** : Comparer le message actuel au mois précédent. Signaler les changements de slogan, nouvelles affirmations, langage de repositionnement
- **Recalcul de la part de voix** : Analyse SOV complète à travers les canaux organique, payant, et social
- **Changements de pile technologique** : Surveiller via BuiltWith ou similaire pour les changements de CMS, analytics, automatisation marketing, plateforme CRM
- **Tendances d'avis/sentiment** : Agréger les notes G2, Capterra, Trustpilot. Suivre la trajectoire du sentiment

### Surveillance trimestrielle

- **Audit concurrentiel complet** : Actualisation complète de tous les profils concurrents. Mettre à jour la carte de positionnement de marché
- **Analyse gains/pertes** : Revoir les données CRM de gains/pertes du trimestre. Identifier les schémas spécifiques aux concurrents
- **Analyse d'écart de contenu** : Comparer votre couverture de contenu aux 3 principaux concurrents. Identifier les sujets qu'ils couvrent mais pas vous
- **Mise à jour de la matrice de comparaison de fonctionnalités** : Actualiser la comparaison de fonctionnalités produit. Noter les nouvelles fonctionnalités, les fonctionnalités dépréciées, les changements de tarification

---

## 3. Méthodologie de détection de changement

### Différenciation HTML pour les changements de contenu

- **Hachage du contenu de page** : Générer un hash SHA-256 de la zone de contenu principal (exclure navigation, pied de page, publicités). Comparer au hash stocké. Changement de hash = changement de contenu
- **Surveillance sélective d'éléments** : Suivre des sélecteurs CSS spécifiques par page concurrente :
  - Page de tarification : `.pricing-table`, `.plan-card`, `.price-amount`
  - Page d'accueil : `.hero-section`, `.value-prop`, `.social-proof`
  - Page produit : `.feature-list`, `.integration-list`, `.changelog`
- **Génération de diff** : Quand le hash change, générer un diff ligne par ligne. Classer le changement comme : mineur (typo, formatage), modéré (mise à jour de texte, nouvelle section), majeur (restructuration, nouvelle page, changement de tarification)
- **Comparaison de captures d'écran** : Capturer des captures d'écran de viewport avant et après la détection de changement. Le diff visuel met en évidence les changements de mise en page/design que la différenciation textuelle manque

### Surveillance des balises méta

Suivre par page concurrente à chaque vérification :

| Élément | Détection | Signification |
|---|---|---|
| Balise `<title>` | Comparaison de chaîne exacte | Changement de ciblage de mot-clé, évolution du positionnement de marque |
| `<meta name="description">` | Comparaison de chaîne exacte | Changement de message ou de CTA |
| `<meta name="robots">` | Comparaison de chaîne exacte | Changement de stratégie d'indexation (noindex = page en cours de retrait) |
| URL canonique | Comparaison de chaîne exacte | Changement de structure d'URL, signal de consolidation |
| Types de balisage de schéma | Analyser le JSON-LD, comparer les valeurs `@type` | Changement de stratégie de résultat enrichi |
| Balises OG | Comparer `og:title`, `og:description`, `og:image` | Changement de message social ou de création |
| Balises Hreflang | Nombre et codes de langue | Expansion ou contraction internationale |

### Détection de changement structurel

- **Surveillance de la navigation** : Analyser les liens de navigation principale. Signaler les nouveaux éléments de menu (nouveau produit, nouvelle page de fonctionnalité, nouvelle section de ressources)
- **Surveillance du sitemap** : Télécharger et analyser `sitemap.xml`. Comparer le nombre d'URL et les nouvelles URL à l'instantané précédent. Les nouvelles URL indiquent de nouvelles pages/sections
- **Suivi du nombre de pages** : Suivre le total des pages indexées via le nombre de résultats de requête `site:concurrent.com`. Des augmentations significatives indiquent des poussées de contenu ; des diminutions indiquent un élagage

---

## 4. Calcul de la part de voix

### Part de voix organique

**Formule** : SOV = Somme (trafic estimé par mot-clé) / Somme (trafic total estimé pour tous les mots-clés suivis à travers tous les concurrents)

**Étapes de calcul** :
1. Définir l'univers de mots-clés : tous les mots-clés cibles pertinents pour la catégorie (100-1 000 mots-clés)
2. Extraire les positions de classement pour tous les concurrents pour chaque mot-clé
3. Appliquer une courbe de CTR pour estimer le trafic par mot-clé par concurrent :
   - Position 1 : ~28 % CTR, Position 2 : ~15 %, Position 3 : ~11 %, Position 4 : ~8 %, Position 5 : ~7 %
   - Position 6-10 : ~2-5 %, Position 11-20 : ~0,5-2 %, Position 21+ : ~0 %
4. Multiplier le CTR estimé par le volume de recherche du mot-clé = trafic estimé
5. Sommer par concurrent, diviser par le total = pourcentage SOV

### Part de voix payante

- **Google Ads Auction Insights** : Métrique `impression_share` par campagne/mot-clé. Diviser votre part d'impressions par la somme des parts d'impressions de tous les concurrents pour une SOV normalisée
- **Meta Ads** : Utiliser les estimations de portée et de fréquence de la Meta Ad Library. Calculer la part sur la base des impressions estimées dans l'audience cible
- **SOV basée sur la dépense** : Si les données de dépense sont disponibles (via des outils d'intelligence concurrentielle), SOV = votre dépense / dépense totale de la catégorie
- **Présence publicitaire SERP** : Pour les mots-clés cibles, compter combien de fois la publicité de chaque concurrent apparaît dans les positions supérieures. Taux de présence = proxy de SOV publicitaire

### Part de voix sociale

- **Basée sur le volume** : Nombre de mentions de marque (y compris hashtags, @mentions, discussion organique) / mentions totales de la catégorie. Source : outil d'écoute sociale avec requêtes booléennes
- **Pondérée par engagement** : Pondérer les mentions par engagement (mentions J'aime, partages, commentaires). Les mentions à engagement plus élevé comptent davantage
- **Ajustée au sentiment** : Multiplier le volume de mentions par le score de sentiment (positif = 1,0, neutre = 0,5, négatif = 0,0). Empêche les marques avec un fort buzz négatif d'afficher une SOV gonflée

### SOV pondérée par fonctionnalité (composite)

Combiner les SOV de canal avec une pondération stratégique :

| Canal | Pondération suggérée | Justification |
|---|---|---|
| Recherche organique | 35 % | Trafic à forte intention, autorité de marque à long terme |
| Recherche payante | 20 % | Canal de conversion directe, reflète le niveau d'investissement |
| Social organique | 15 % | Notoriété de marque et engagement communautaire |
| Social payant | 15 % | Portée ciblée, visibilité pilotée par la campagne |
| Visibilité sur les moteurs IA | 15 % | Canal en croissance, représente les schémas de découverte futurs |

---

## 5. Playbooks de réponse concurrentielle

### Baisse de prix d'un concurrent

1. **Détecter** : Changement de page de tarification détecté. Calculer le % de réduction et les paliers affectés
2. **Évaluer** : Déterminer si la baisse de prix est permanente, promotionnelle, ou spécifique au segment. Vérifier les changements de message associés (nouveau slogan, positionnement « le plus abordable »)
3. **Arbre de décision** :
   - Si le concurrent cible votre segment le plus fort : **Urgence élevée**. Préparer un contre-message basé sur la valeur sous 48 heures. Ne pas aligner le prix sauf si l'analyse de marge le soutient
   - Si le concurrent cible un segment où vous êtes faible : **Faible urgence**. Surveiller pendant 2 semaines. Évaluer si leur tarification attire vos clients existants
   - Si promotionnel/temporaire : **Aucune action immédiate**. Documenter les termes et la durée de la promotion. Préparer une contre-promotion si la vélocité des affaires baisse
4. **Options de réponse** : Mettre l'accent sur la valeur/ROI plutôt que le prix, regrouper des fonctionnalités pour augmenter la valeur perçue, introduire une offre de migration concurrentielle (durée limitée), créer un contenu de comparaison mettant en avant le coût total de possession

### Lancement d'un produit concurrent

- **T+0 (Détection)** : Journaliser les détails du lancement — nom de la fonctionnalité, positionnement, impact tarifaire, segment cible
- **T+24h (Analyse)** : Analyse approfondie des capacités de la fonctionnalité. Tester si possible (essai gratuit, démo). Évaluer le chevauchement avec votre feuille de route
- **T+48h (Message)** : Rédiger une réponse de positionnement. Options : « nous le faisons déjà » (si vrai), « voici pourquoi notre approche est meilleure », ou « ceci valide la catégorie que nous construisons »
- **T+1 semaine (Contenu)** : Publier du contenu de comparaison si stratégiquement précieux. Mettre à jour les pages de comparaison de fonctionnalités. Briefer l'équipe commerciale avec une fiche de bataille concurrentielle
- **T+1 mois (Évaluation)** : Surveiller les signaux d'adoption (mentions sociales, retour de site d'avis, volume de recherche pour le nom de la fonctionnalité). Déterminer si une réponse produit est nécessaire

### Poussée de contenu d'un concurrent

- **Signal** : Le concurrent augmente sa fréquence de publication de plus de 2x ou lance un nouveau format de contenu (podcast, série vidéo, newsletter)
- **Évaluation** : Analyser les sujets de contenu pour le chevauchement de mots-clés avec votre stratégie. Vérifier si leur nouveau contenu se classe pour vos termes cibles
- **Réponse** : Prioriser la création de contenu pour les mots-clés qui se chevauchent où vous avez un potentiel de classement. Accélérer le contenu planifié dans les clusters de sujets affectés. Ne pas créer réactivement du contenu sur des sujets hors de votre stratégie

---

## 6. Intégration du retour gains/pertes

### Points de collecte de données CRM

- **Champ d'étape d'affaire** : `Concurrent mentionné` — champ à sélection multiple renseigné pendant les étapes de découverte et de négociation
- **Raison de gain/perte** : Champ structuré avec catégories : Prix, Fonctionnalités, Marque/Confiance, Relation, Timing, Intégration, Support
- **Enquête post-décision** : Envoyée dans les 48 heures suivant la clôture gagnée ou perdue. 3-5 questions : alternative principale considérée, facteur décisif, perception de chaque fournisseur
- **Notes de debriefing commercial** : Champ texte libre pour le contexte qualitatif du représentant commercial

### Schémas d'analyse

- **Fréquence des concurrents** : Quels concurrents apparaissent le plus dans les affaires ? Tendance dans le temps (en augmentation = menace croissante)
- **Taux de gain par concurrent** : Quand le Concurrent X est dans l'affaire, quel est votre taux de gain ? Segmenter par taille d'affaire, segment, et région
- **Raison de perte par concurrent** : Quand vous perdez contre le Concurrent X, pourquoi ? Identifie les faiblesses spécifiques à traiter
- **Influence du contenu** : Quels éléments de contenu ont été partagés durant les affaires gagnées vs perdues ? Identifie le contenu concurrentiel efficace
- **Vulnérabilité de segment** : Certains segments clients sont-ils plus susceptibles de choisir des concurrents spécifiques ? Guide le ciblage et le positionnement

---

## 7. Gestion des alertes et escalade

### Niveaux d'escalade

| Niveau | Déclencheur | Délai de réponse | Canal de notification | Destinataire |
|---|---|---|---|---|
| **P1 — Critique** | Changement de tarification, lancement de produit, acquisition, départ d'un dirigeant, rebranding majeur | < 4 heures | DM Slack + e-mail | Responsable marketing, responsable produit, responsable commercial |
| **P2 — Important** | Changement de message, nouvelle campagne publicitaire, poussée de contenu significative, nouveau partenariat | < 24 heures | Canal Slack | Équipe marketing |
| **P3 — Informationnel** | Mises à jour de contenu mineures, changements d'activité sociale, petites mises à jour de fonctionnalités | Digest hebdomadaire | Digest e-mail | Parties prenantes abonnées |

### Prévention de la fatigue d'alerte

- **Déduplication** : Regrouper les changements liés en une seule alerte (par ex., 5 nouveaux articles de blog = 1 alerte « poussée de contenu », pas 5 alertes séparées)
- **Ajustement des seuils** : Commencer avec des seuils sensibles, puis les élargir selon le taux de faux positifs. Cible : <20 % de taux de faux positifs
- **Mode digest** : Les alertes P3 sont toujours livrées en digest hebdomadaire. Jamais en temps réel pour les changements informationnels
- **Capacité de mise en veille** : Permettre aux destinataires de mettre en veille des concurrents spécifiques ou des types de changement pour des périodes définies
- **Routage de canal** : Différents types d'alerte vers différents canaux. Les ventes reçoivent les alertes tarification/produit. L'équipe de contenu reçoit les alertes contenu/SEO. La direction reçoit uniquement le P1

### Schéma de base de données d'intelligence concurrentielle

```
competitors (
  id, name, url, category, status, created_at, updated_at
)
competitor_snapshots (
  id, competitor_id, page_type, content_hash, screenshot_path,
  meta_title, meta_description, schema_types, snapshot_date
)
change_log (
  id, competitor_id, change_type, severity, page_url,
  old_value, new_value, detected_at, acknowledged_by, acknowledged_at
)
pricing_history (
  id, competitor_id, plan_name, price, currency, billing_cycle,
  features_json, effective_date, detected_at
)
content_inventory (
  id, competitor_id, url, title, publish_date, word_count,
  estimated_keyword, content_type, first_detected
)
alert_history (
  id, competitor_id, alert_tier, alert_type, message,
  sent_at, channel, acknowledged, response_action
)
```

---

## 8. Sources de surveillance publicitaire

### Google Ads Transparency Center

- **URL** : `https://adstransparency.google.com/`
- **Rechercher par** : Nom de l'annonceur, domaine, ou sujet de mot-clé
- **Données disponibles** : Toutes les publicités diffusées par un annonceur au cours des 30 derniers jours, format publicitaire (texte, image, vidéo), régions où la publicité a été diffusée, plages de dates
- **Limitations** : Aucune donnée de dépense, aucune donnée de ciblage, aucune donnée de performance. Analyse de la création et du message uniquement
- **Approche de surveillance** : Captures d'écran hebdomadaires des publicités actives. Catégoriser par thème de message, type d'offre, et CTA. Suivre la fréquence de rotation des créations

### Meta Ad Library

- **URL** : `https://www.facebook.com/ads/library/`
- **API** : `GET /ads_archive` avec `search_terms`, `ad_reached_countries`, `ad_active_status`
- **Données disponibles** : Toutes les publicités actives et inactives, actifs créatifs (image/vidéo), texte publicitaire, date de début, plateforme (Facebook, Instagram, Messenger, Audience Network), nom de la page
- **Pour les publicités politiques/sociales** : Données additionnelles incluant les fourchettes de dépense, les impressions, la portée démographique
- **Approche de surveillance** : Extraire les publicités actives chaque semaine via l'API. Stocker les créations et le texte. Comparer à la semaine précédente pour identifier les nouvelles campagnes, les campagnes en pause, et les renouvellements créatifs

### Surveillance publicitaire LinkedIn

- **Bibliothèque publicitaire publique disponible** (linkedin.com/ad-library — consultable par annonceur et pays ; les charges utiles publicitaires sont visibles, le détail de ciblage/dépense est limité hors de l'UE). Surveiller aussi via :
  - Suivre les pages entreprise concurrentes et vérifier l'onglet « Publicités »
  - Observation du fil d'actualité LinkedIn (le contenu sponsorisé apparaît dans le fil)
  - Outils tiers qui agrègent les observations de publicités LinkedIn
- **Limitations de données** : Impossible de voir toutes les publicités, le ciblage, ou la dépense. Surveillance au mieux effort uniquement

### Cadre d'analyse publicitaire concurrentielle

Pour chaque publicité capturée, documenter :

- **Thème du message** : Quelle proposition de valeur est mise en avant ? (prix, fonctionnalités, résultats, preuve sociale, urgence)
- **Type d'offre** : Essai gratuit, remise, démo, téléchargement de contenu, webinaire, aucune offre spécifique
- **CTA** : Texte exact du CTA et type d'action (en savoir plus, s'inscrire, acheter maintenant, commencer, parler aux ventes)
- **Page d'atterrissage** : URL de destination et type de page (page d'accueil, page produit, page d'atterrissage, contenu, tarification)
- **Style créatif** : Photo, illustration, capture d'écran, vidéo, carrousel, style UGC, témoignage
- **Analyse de tendance** : Semaine sur semaine, quels thèmes sont en augmentation ? Quelles offres sont testées ? Quelles créations ont la plus longue durée de diffusion (probablement les plus performantes) ?

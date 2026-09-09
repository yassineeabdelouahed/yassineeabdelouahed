# Intelligence concurrentielle — Suivi et analyse

> **Provenance des benchmarks (au 2026-08) :** les montants en dollars de ce document sont des a priori de planification, pas des cotations — les taux de marché et d'enchère évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, rafraîchissez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et consignez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le registre (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Objectif

L'intelligence concurrentielle ne consiste pas à copier les concurrents. Il s'agit de comprendre le paysage du marché pour prendre des décisions stratégiques mieux informées — identifier les lacunes, anticiper les menaces, et trouver des avantages de positionnement que les concurrents ont manqués.

---

## Cadre de surveillance des concurrents

### Que suivre

| Catégorie | Signaux à surveiller | Fréquence | Outil / Source |
|----------|-------------------|-----------|---------------|
| **Publicité payante** | Création publicitaire, texte, offres, landing pages, estimations de dépense | Hebdomadaire | Meta Ad Library, Google Ads Transparency, SpyFu |
| **SEO / Contenu** | Classements de mots-clés, nouveau contenu publié, acquisition de backlinks | Bimensuelle | Ahrefs, SEMrush, SimilarWeb |
| **Changements de site web** | Mises à jour de la page d'accueil, changements de tarification, nouvelles fonctionnalités, nouvelles pages | Hebdomadaire | Visualping, Wayback Machine, revue manuelle |
| **Réseaux sociaux** | Thèmes de contenu, fréquence de publication, taux d'engagement, croissance d'audience | Hebdomadaire | Analytics natifs de la plateforme, Sprout Social |
| **Produit / Offre** | Nouveaux produits, changements de tarification, offres groupées, promotions, essais gratuits | Continue | Inscription e-mail, outils de suivi de prix, revue manuelle |
| **Avis / Réputation** | Volume d'avis, sentiment, plaintes courantes, proxys de NPS | Mensuelle | G2, Trustpilot, Reddit, App Store, Google Reviews |
| **Recrutement / Équipe** | Offres d'emploi (en particulier marketing, produit, ingénierie) | Mensuelle | LinkedIn, pages carrières de l'entreprise |
| **Financement / Finances** | Levées de fonds, jalons de revenu (si public), activité de fusion-acquisition | Trimestrielle | Crunchbase, dépôts SEC, communiqués de presse |
| **E-mail / CRM** | Fréquence d'e-mail, objets, offres, flux (bienvenue, panier abandonné) | Continue | S'inscrire aux e-mails des concurrents avec une boîte de réception dédiée |
| **Partenariats** | Nouvelles intégrations, co-marketing, programmes d'affiliation, accords influenceurs | Mensuelle | Communiqués de presse, mentions sociales, réseaux d'affiliation |

### Classification par niveau de concurrent

| Niveau | Définition | Profondeur de surveillance | Cadence de revue |
|------|-----------|-----------------|----------------|
| **Niveau 1 — Direct** | Rivalise pour les mêmes clients avec un produit/service similaire | Approfondie — suivre tout ce qui précède | Hebdomadaire |
| **Niveau 2 — Adjacent** | Sert la même audience mais avec un produit ou modèle économique différent | Modérée — suivre les publicités, le SEO, les mouvements majeurs | Bimensuelle |
| **Niveau 3 — Aspirationnel** | Leaders de marché dont on peut s'inspirer même s'ils sont sur un segment différent | Légère — suivre la stratégie, le positionnement, les grandes campagnes | Mensuelle |
| **Niveau 4 — Émergent** | Nouveaux entrants ou disrupteurs pouvant devenir Niveau 1 | Liste de surveillance — suivre le financement, les lancements de produit, le positionnement initial | Trimestrielle |

---

## Recommandations d'outils

### Outils gratuits

| Outil | Cas d'usage | Données clés |
|------|----------|----------|
| **Meta Ad Library** | Voir toutes les publicités Meta/Instagram actives de n'importe quel annonceur | Création, texte, CTA, dates d'activité, plateformes |
| **Google Ads Transparency Center** | Voir les publicités Google Ads actives de n'importe quel annonceur | Annonces de recherche, display, YouTube |
| **Google Trends** | Comparer l'intérêt de recherche de marque dans le temps | Volume de recherche relatif, intérêt géographique, requêtes associées |
| **BuiltWith** | Identifier la pile technologique du concurrent | Analytics, CMS, plateforme d'e-mail, processeurs de paiement |
| **Wayback Machine** | Voir des instantanés historiques du site web | Évolution des messages, changements de tarification, évolutions de design |
| **LinkedIn** | Surveiller le recrutement, la croissance de l'entreprise, la stratégie de contenu | Offres d'emploi, effectif, publications de l'entreprise |
| **Reddit / Quora** | Trouver un sentiment client non filtré sur les concurrents | Plaintes, éloges, demandes de fonctionnalités, questions de comparaison |
| **App Store / Play Store** | Notes d'avis, mises à jour de fonctionnalités, plaintes des utilisateurs | Volume d'avis, tendances de sentiment, notes de version |

### Outils payants

| Outil | Cas d'usage | Prix de départ | Idéal pour |
|------|----------|---------------|----------|
| **SimilarWeb** | Estimations de trafic, répartition des sources de trafic, chevauchement d'audience | ~149 $/mois | Comprendre la stratégie de trafic des concurrents |
| **SpyFu** | Listes de mots-clés concurrents, historique de créations publicitaires, dépense estimée | ~39 $/mois | Analyse concurrentielle de recherche payante |
| **SEMrush** | Analyse concurrentielle complète SEO + PPC, analyse des lacunes de contenu | ~129 $/mois | Suivi SEO concurrentiel complet |
| **Ahrefs** | Analyse de backlinks, explorateur de contenu, suivi de mots-clés | ~99 $/mois | Intelligence de netlinking, analyse de contenu |
| **Crayon** | Plateforme automatisée d'intelligence concurrentielle | Tarification sur mesure | Programmes CI de niveau entreprise |
| **Klue** | Facilitation concurrentielle pour les équipes commerciales | Tarification sur mesure | Battlecards de vente B2B et analyse win/loss |
| **Pathmatics (Sensor Tower)** | Estimations de dépense publicitaire digitale par canal | Tarification sur mesure | Benchmarking de dépense média |

---

## Cadre de benchmarking concurrentiel

### Modèle de benchmark trafic et engagement

| Métrique | Votre marque | Concurrent A | Concurrent B | Concurrent C | Moyenne sectorielle |
|--------|-----------|-------------|-------------|-------------|-------------|
| Visites mensuelles est. | | | | | |
| Tendance de trafic (3 mois) | | | | | |
| Durée moyenne de visite | | | | | |
| Pages par visite | | | | | |
| Taux de rebond | | | | | |
| Source de trafic : Organique % | | | | | |
| Source de trafic : Payant % | | | | | |
| Source de trafic : Direct % | | | | | |
| Source de trafic : Social % | | | | | |
| Source de trafic : E-mail % | | | | | |
| Source de trafic : Recommandation % | | | | | |
| Top 3 pays de trafic | | | | | |

*Source : SimilarWeb ou SEMrush. Remarque : ce sont des estimations avec une précision de +/- 20 %.*

### Modèle de benchmark SEO

| Métrique | Votre marque | Concurrent A | Concurrent B | Concurrent C |
|--------|-----------|-------------|-------------|-------------|
| Autorité / note de domaine | | | | |
| Total de mots-clés organiques | | | | |
| Mots-clés dans le top 3 | | | | |
| Mots-clés dans le top 10 | | | | |
| Trafic organique est. | | | | |
| Total de backlinks | | | | |
| Domaines référents | | | | |
| Pages de contenu publiées (3 mois) | | | | |
| Thèmes de contenu les mieux classés | | | | |

### Modèle de benchmark médias payants

| Métrique | Votre marque | Concurrent A | Concurrent B | Concurrent C |
|--------|-----------|-------------|-------------|-------------|
| Dépense publicitaire mensuelle est. | | | | |
| Canaux principaux | | | | |
| Nombre d'annonces actives (Meta) | | | | |
| Style de création publicitaire | | | | |
| CTA principal | | | | |
| Type de landing page | | | | |
| Offres/promotions clés | | | | |
| Chevauchement de mots-clés estimé (%) | | | | |

### Benchmark positionnement et messagerie

| Élément | Votre marque | Concurrent A | Concurrent B | Concurrent C |
|---------|-----------|-------------|-------------|-------------|
| Slogan / titre | | | | |
| Proposition de valeur principale | | | | |
| Audience cible (déclarée) | | | | |
| Stratégie tarifaire | | | | |
| Différenciateur clé revendiqué | | | | |
| Preuve sociale utilisée | | | | |
| Ton / voix de marque | | | | |
| Piliers de contenu | | | | |

---

## Playbooks de réponse concurrentielle

### Playbook : un concurrent lance une baisse de prix

1. **Évaluer la portée** — s'agit-il d'une promotion temporaire ou d'un changement de prix permanent ?
2. **Mesurer l'impact** — surveiller votre CVR, votre trafic, et le volume de recherche de marque pendant 2 semaines
3. **Analyser les marges** — le concurrent peut-il soutenir ce prix ? vérifier sa position financière/de financement
4. **Options de réponse :**
   - Ne rien faire (si votre différenciation est forte et le CVR est stable)
   - Ajuster sélectivement (remise uniquement pour les changeurs concurrentiels, pas les clients existants)
   - Ajouter de la valeur (offre groupée, garantie prolongée, meilleur support) plutôt que de baisser le prix
   - Mettre l'accent sur la différenciation dans le texte publicitaire et les landing pages
5. **À éviter :** un alignement réflexe des prix qui érode les marges sans preuve de perte de clients

### Playbook : un concurrent lance une nouvelle fonctionnalité/produit

1. **Évaluer le chevauchement** — cette fonctionnalité concurrence-t-elle votre offre principale ou un domaine périphérique ?
2. **Jauger la demande** — vérifier les tendances de recherche, les mentions sociales, et les retours clients sur la fonctionnalité
3. **Évaluer le calendrier** — combien de temps pour construire une fonctionnalité comparable ? Est-ce même stratégique pour vous ?
4. **Options de réponse :**
   - Suivre rapidement (si la fonctionnalité s'aligne avec votre feuille de route et est très demandée)
   - Se différencier (miser sur vos forces et les mettre en avant dans les messages)
   - S'associer (intégrer une solution tierce plutôt que construire)
   - Ignorer (si la fonctionnalité est de niche et que vos données montrent une faible demande client)
5. **Mettre à jour l'habilitation commerciale** — fournir des arguments à l'équipe commerciale/de succès client sur comment se positionner face à la nouvelle fonctionnalité

### Playbook : un concurrent augmente significativement sa dépense publicitaire

1. **Vérifier** — utiliser SpyFu, Pathmatics, ou Meta Ad Library pour confirmer l'augmentation
2. **Mesurer l'impact** — suivre votre part d'impressions, vos CPC, et les métriques de concurrence aux enchères
3. **Évaluer la durée** — s'agit-il d'une poussée ponctuelle ou d'une augmentation soutenue ?
4. **Options de réponse :**
   - Maintenir la position sur les campagnes à fort ROI ; réduire la dépense sur les campagnes marginales
   - Déplacer le budget vers des canaux où le concurrent n'est pas présent
   - Améliorer la qualité publicitaire (création, landing page) pour maintenir la position à moindre coût
   - N'augmenter la dépense que sur les segments où vous avez un avantage d'efficacité clair
5. **Ne pas** s'engager dans une guerre d'enchères sur des termes génériques à faible ROAS

### Playbook : un nouveau concurrent entre sur le marché

1. **Établir un profil immédiatement** — financement, équipe, positionnement, tarification, canaux initiaux
2. **Classifier le niveau** — généralement Niveau 4 au départ ; reclasser si la traction est évidente
3. **Surveiller les signaux de traction** — croissance du trafic, abonnés sociaux, volume d'avis, recrutement
4. **Options de réponse :**
   - Renforcer vos avantages d'acteur établi (avis, contenu, forteresse SEO, relations clients)
   - Envisager du contenu défensif ciblant les comparaisons avec le nom de leur marque
   - Accélérer le développement de fonctionnalités/produits qui élargit votre différenciation
5. **Briefer l'équipe** — mettre à jour les équipes commerciales et de succès client pour qu'elles puissent aborder le nouveau concurrent dans les conversations

---

## Méthodologie d'analyse win/loss

### Collecte de données

| Source | Ce qu'il faut capturer | Méthode |
|--------|----------------|--------|
| Données CRM | Résultat gagné/perdu, taille de la transaction, concurrent impliqué, durée du cycle de vente | Automatisé depuis le CRM |
| Équipe commerciale | Insights qualitatifs sur les raisons du gain ou de la perte | Formulaire de débrief structuré (dans les 48 heures suivant le résultat) |
| Entretiens clients | Retour direct des acheteurs (en particulier les pertes) | Entretien de 15 minutes, minimum 3-5 pertes par mois |
| Sites d'avis | Mentions comparatives, raisons de changement | Surveiller G2, Capterra, Trustpilot |

### Guide d'entretien win/loss

1. Qu'essayiez-vous de résoudre ? (Job to be done)
2. Qui d'autre avez-vous évalué ? (Ensemble concurrentiel)
3. Quels étaient vos critères de décision ? (Priorisés)
4. Qu'avez-vous aimé dans notre solution ? (Forces)
5. Qu'est-ce qui vous a préoccupé ? (Faiblesses)
6. Pourquoi avez-vous finalement choisi [gagnant] ? (Facteur de décision)
7. Qu'aurions-nous pu faire différemment ? (Retour actionnable)

### Cadre d'analyse

| Dimension | Questions à répondre |
|-----------|-------------------|
| Taux de gain par concurrent | Face à quels concurrents gagnons/perdons-nous le plus ? |
| Raisons de perte | Quelles sont les 3 à 5 principales raisons de nos pertes ? |
| Raisons de gain | Quelles sont les 3 à 5 principales raisons de nos gains ? |
| Motifs par segment | Gagnons/perdons-nous différemment selon la taille de l'entreprise, le secteur, ou le cas d'usage ? |
| Impact tarifaire | À quelle fréquence le prix est-il le principal facteur de perte vs un facteur contributif ? |
| Lacunes de fonctionnalités | Quelles fonctionnalités manquantes sont le plus souvent citées dans les pertes ? |
| Processus de vente | Y a-t-il des améliorations de processus qui pourraient améliorer le taux de gain ? |

---

## Modèle de revue concurrentielle mensuelle

**Cadence :** première semaine de chaque mois.
**Durée :** réunion de 60 minutes.

### Ordre du jour

1. **Mises à jour des concurrents de Niveau 1** (20 min)
   - Mouvements majeurs de chaque concurrent direct (produit, tarification, campagnes, recrutement)
   - Évaluation de l'impact (réel ou anticipé)

2. **Signaux de marché** (10 min)
   - Nouveaux entrants, tours de financement, activité de fusion-acquisition
   - Changements réglementaires ou de plateforme affectant le paysage concurrentiel

3. **Mise à jour du benchmarking** (10 min)
   - Tendances de trafic, SEO, médias payants, et part de voix
   - Tout changement significatif de classement ou de positionnement

4. **Résumé win/loss** (10 min)
   - Taux de gain mensuel face à chaque concurrent
   - Thèmes notables issus des pertes

5. **Actions à mener** (10 min)
   - Réponses concurrentielles nécessaires
   - Lacunes d'intelligence à combler
   - Mises à jour des battlecards de vente ou du positionnement marketing

### Liste de contrôle de maintenance de l'intelligence concurrentielle

- [ ] Bibliothèques publicitaires des concurrents de Niveau 1 revues hebdomadairement
- [ ] Flux d'e-mails des concurrents revus (inscription rafraîchie si nécessaire)
- [ ] Chevauchement de classement de mots-clés suivi bimensuellement
- [ ] Surveillance des changements de site web active pour tous les concurrents de Niveau 1
- [ ] Entretiens win/loss menés (minimum 3-5 par mois)
- [ ] Feuille de calcul de benchmarking concurrentiel mise à jour mensuellement
- [ ] Battlecards de vente rafraîchies après tout mouvement majeur d'un concurrent
- [ ] Présentation trimestrielle du paysage concurrentiel préparée pour la direction
- [ ] Liste de surveillance des nouveaux concurrents revue et mise à jour trimestriellement
- [ ] Équipe formée sur le positionnement concurrentiel (session d'habilitation trimestrielle)

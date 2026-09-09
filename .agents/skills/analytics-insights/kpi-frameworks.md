# Cadres de KPI — Arbres de métriques spécifiques au modèle économique

## Méthodologie de l'arbre de KPI

Un arbre de KPI est une décomposition hiérarchique des résultats d'entreprise en métriques mesurables et actionnables. Chaque métrique de l'arbre doit remonter à une seule métrique nord (North Star) et redescendre vers une équipe ou un levier spécifique.

### Niveaux de hiérarchie

| Niveau | Objectif | Propriétaire | Cadence de revue |
|-------|---------|-------|----------------|
| **Métrique nord (North Star)** | Une seule métrique représentant la livraison de valeur fondamentale | PDG / Fondateur | Hebdomadaire |
| **Métriques primaires** | 3-5 métriques qui pilotent directement la métrique nord | VP / Directeur | Hebdomadaire |
| **Métriques de support** | Facteurs spécifiques à un canal ou une fonction qui pilotent les métriques primaires | Manager / Lead | Hebdomadaire |
| **Métriques de diagnostic** | Intrants granulaires investigués lorsque les métriques de support évoluent | Analyste / Spécialiste | Selon les besoins |

### Construire un arbre de KPI — étape par étape

1. **Définir la métrique nord** — quelle métrique unique, si maximisée, garantirait la santé de l'entreprise à long terme ?
2. **Décomposer mathématiquement** — décomposer la métrique nord en une formule (par ex. Revenu = Clients x AOV x Fréquence)
3. **Assigner les métriques primaires** — chaque variable de la formule devient une métrique primaire
4. **Superposer les métriques de support** — pour chaque métrique primaire, identifier les 2 à 4 intrants qui la pilotent
5. **Ajouter les diagnostics** — pour chaque métrique de support, lister les signaux granulaires que vous vérifieriez si elle évoluait de manière inattendue
6. **Assigner des propriétaires** — chaque métrique a un propriétaire, jamais partagé
7. **Fixer des objectifs** — utiliser les références historiques + les benchmarks sectoriels + les objectifs de croissance

---

## Guide de sélection de la métrique nord

Votre métrique nord doit satisfaire aux cinq critères suivants :

- [ ] **Alignée sur la valeur** — elle reflète une valeur réelle livrée aux clients
- [ ] **Avancée** — elle prédit le revenu à long terme, pas seulement mesurer le revenu passé
- [ ] **Actionnable** — les équipes peuvent l'influencer par leur travail quotidien
- [ ] **Mesurable** — elle peut être suivie avec précision grâce à l'infrastructure existante
- [ ] **Simple** — n'importe qui dans l'entreprise peut la comprendre et la réciter

| Modèle économique | Métrique nord recommandée | Pourquoi |
|----------------|----------------------------|-----|
| SaaS B2B | Utilisateurs actifs hebdomadaires (qualifiés) — métrique nord d'usage product-led ; le NRR est la métrique nord de revenu | Prédit la rétention et l'expansion mieux que le revenu |
| E-commerce | Revenu par visiteur (RPV) | Combine qualité du trafic, conversion, et AOV |
| Marketplace | Transactions complétées par semaine | Capture la santé de l'offre et de la demande |
| Commerce local | Taux de visite répétée (mensuel) | La fidélité pilote une économie locale durable |
| Marque DTC | Taux de rachat à 90 jours | Les modèles pilotés par la LTV vivent ou meurent sur le comportement de répétition |
| Médias / Contenu | Temps engagé par utilisateur par semaine | L'attention est le produit ; l'engagement prédit la monétisation |

---

## Arbres de KPI complets par modèle économique

### Arbre de KPI SaaS B2B

**Métrique nord :** Net Revenue Retention (NRR) — la métrique nord de revenu ; les WAU (qualifiés) du guide de sélection ci-dessus sont la métrique nord complémentaire d'usage product-led

| Niveau | Métrique | Définition | Benchmark (médiane) | Benchmark (quartile supérieur) |
|-------|--------|------------|--------------------|-----------------------|
| Primaire | MRR | Revenu récurrent mensuel — somme de tous les abonnements actifs | — | — |
| Primaire | ARR | Revenu récurrent annuel — MRR x 12 | — | — |
| Primaire | NRR | (MRR de départ + Expansion - Contraction - Désabonnement) / MRR de départ | 100-105 % | 115-130 % |
| Primaire | Marge brute | (Revenu - COGS) / Revenu | 70-75 % | 80-85 % |
| Support | CAC | Coût total ventes + marketing / nouveaux clients acquis | Varie selon l'ACV | Retour sur CAC < 12 mois |
| Support | LTV | Revenu moyen par compte x marge brute x durée de vie moyenne | LTV:CAC > 3:1 | LTV:CAC > 5:1 |
| Support | Désabonnement de logos | % de clients perdus sur la période | 5-7 % annuel | < 3 % annuel |
| Support | Désabonnement de revenu | % de MRR perdu sur la période (hors expansion) | 0,5-1 % mensuel | < 0,5 % mensuel |
| Support | Revenu d'expansion | MRR gagné auprès des clients existants (upsell + cross-sell) | 20-30 % du nouveau MRR | > 40 % du nouveau MRR |
| Diagnostic | Taux de vélocité de leads | Croissance mois sur mois des leads qualifiés | 10-15 % | > 20 % |
| Diagnostic | Durée du cycle de vente | Jours du premier contact à la signature | 30-90 jours (PME) | Tendance décroissante |
| Diagnostic | Taux d'activation | % de nouveaux utilisateurs complétant le jalon d'onboarding clé | 40-60 % | > 70 % |
| Diagnostic | NPS | Net Promoter Score | 30-40 | > 50 |
| Diagnostic | Volume de tickets de support | Tickets pour 100 comptes actifs par mois | Tendance décroissante | — |

**Ratios rapides SaaS :**
- **Efficacité de croissance :** Nombre magique = Nouvel ARR net / Dépense ventes et marketing (objectif > 0,75)
- **Efficacité de combustion :** Multiple de combustion = Combustion nette / Nouvel ARR net (objectif < 2x)
- **Règle des 40 :** % de croissance du revenu + % de marge de profit > 40

### Arbre de KPI e-commerce

**Métrique nord :** Revenu par visiteur (RPV)

| Niveau | Métrique | Définition | Benchmark | Quartile supérieur |
|-------|--------|------------|-----------|-------------|
| Primaire | CVR | Commandes / Sessions | 2-3 % | > 4 % |
| Primaire | AOV | Revenu / Commandes | Dépend de la catégorie | Tendance croissante |
| Primaire | Sessions | Total des visites du site web | — | — |
| Support | Taux d'ajout au panier | Sessions avec ajout au panier / Total des sessions | 8-12 % | > 15 % |
| Support | Taux d'abandon de panier | Paniers abandonnés / Paniers créés | 65-75 % | < 60 % |
| Support | Taux de rachat | Clients avec 2+ commandes / Total des clients (12 mois) | 25-30 % | > 40 % |
| Support | Unités moyennes par commande | Unités vendues / Commandes | Dépend de la catégorie | Tendance croissante |
| Diagnostic | Taux de rebond | Sessions d'une seule page / Total des sessions | 35-50 % | < 30 % |
| Diagnostic | Vitesse du site (LCP) | Largest Contentful Paint | < 2,5 s | < 1,5 s |
| Diagnostic | Taux recherche-vers-achat | Achats issus de la recherche / Total des recherches | 5-10 % | > 15 % |
| Diagnostic | Taux de retour | Articles retournés / Articles vendus | 15-30 % (habillement) | < 15 % |
| Diagnostic | Part du revenu e-mail | Revenu de l'e-mail / Revenu total | 20-30 % | > 35 % |

### Arbre de KPI marketplace

**Métrique nord :** Volume brut de marchandises (GMV) par utilisateur actif

| Niveau | Métrique | Définition | Notes |
|-------|--------|------------|-------|
| Primaire | GMV | Valeur totale des transactions sur la plateforme | Prise de conscience Offre x Demande x Taux de commission |
| Primaire | Acheteurs actifs (MAU) | Acheteurs uniques transigeant en 30 jours | Santé côté demande |
| Primaire | Vendeurs actifs | Vendeurs uniques avec au moins 1 annonce active | Santé côté offre |
| Support | Taux de liquidité | % d'annonces aboutissant à une transaction sous 30 jours | Signal central de santé de la marketplace |
| Support | Taux de commission | Revenu de la plateforme / GMV | Équilibrer monétisation vs croissance |
| Support | Délai jusqu'à la première transaction | Jours entre l'inscription et le premier achat ou la première vente | Qualité de l'activation |
| Diagnostic | Ratio acheteurs-vendeurs | Acheteurs actifs / Vendeurs actifs | Indicateur d'équilibre |
| Diagnostic | Taux recherche-vers-conclusion | Recherches aboutissant à une transaction | Adéquation offre-demande |
| Diagnostic | Désabonnement des vendeurs | % de vendeurs inactifs après 90 jours | Rétention de l'offre |

### Arbre de KPI commerce local

**Métrique nord :** Taux de visite répétée mensuel

| Niveau | Métrique | Définition | Benchmark |
|-------|--------|------------|-----------|
| Primaire | Nouveaux clients / mois | Visiteurs ou acheteurs pour la première fois | Signal de croissance |
| Primaire | Taux de visite répétée | Clients visitant 2+ fois en 30 jours | 30-40 % |
| Primaire | Valeur moyenne de transaction | Revenu / Transactions | Dépend de la catégorie |
| Support | Vues de la fiche Google Business Profile | Vues mensuelles sur la fiche GBP | Tendance croissante |
| Support | Note d'avis | Note moyenne en étoiles sur Google/Yelp | > 4,3 étoiles |
| Support | Volume d'avis | Nouveaux avis par mois | > 5/mois |
| Support | Ratio visite spontanée vs rendez-vous | Répartition des types de visite | Spécifique à l'entreprise |
| Diagnostic | Part d'impressions de recherche locale | Vos impressions / Total des impressions locales | Tendance croissante |
| Diagnostic | Demandes d'itinéraire | Clics sur itinéraire GBP par mois | Corrélé au trafic en magasin |
| Diagnostic | Volume d'appels téléphoniques | Appels depuis GBP par mois | — |

### Arbre de KPI marque DTC

**Métrique nord :** Taux de rachat à 90 jours

| Niveau | Métrique | Définition | Benchmark | Quartile supérieur |
|-------|--------|------------|-----------|-------------|
| Primaire | CAC du premier achat | Coût d'acquisition d'un nouveau client | Varie selon la catégorie | < 1/3 de l'AOV de première commande |
| Primaire | Taux de rachat à 90 jours | % d'acheteurs pour la première fois qui rachètent sous 90 jours | 15-25 % | > 30 % |
| Primaire | LTV (12 mois) | Revenu total par client sur les 12 premiers mois | 2-3x l'AOV de première commande | > 4x l'AOV de première commande |
| Support | Taux d'abonnement | % de clients sous abonnement | 15-25 % (le cas échéant) | > 35 % |
| Support | ROAS mixte | Revenu total / Dépense publicitaire totale | 3-5x | > 6x |
| Support | % de revenu e-mail + SMS | Revenu des canaux propres / Revenu total | 25-35 % | > 40 % |
| Support | Marge de contribution | (Revenu - COGS - Livraison - Dépense publicitaire) / Revenu | 15-25 % | > 30 % |
| Diagnostic | NPS post-achat | NPS collecté 14 jours après la livraison | > 40 | > 60 |
| Diagnostic | Taux de remboursement | Remboursements / Commandes | < 8 % | < 3 % |
| Diagnostic | Volume UGC | Contenus créés par les clients par mois | Tendance croissante | — |

---

## Tableau de référence des benchmarks sectoriels

| Métrique | SaaS B2B | E-commerce | DTC | Marketplace | Fiabilité de la source |
|--------|----------|-----------|-----|-------------|-------------------|
| Retour sur CAC (mois) | 12-18 | 1-3 | 2-6 | 6-12 | Élevée |
| Ratio LTV:CAC | 3:1 - 5:1 | 3:1 - 4:1 | 2,5:1 - 4:1 | 3:1+ | Élevée |
| Marge brute | 70-85 % | 40-60 % | 55-75 % | 60-80 % | Élevée |
| Net Revenue Retention | 100-130 % | N/A | N/A | N/A | Élevée |
| Désabonnement mensuel | 0,5-2 % | N/A | 5-10 % (abonnement) | 3-5 % (vendeurs) | Moyenne |
| Part de trafic organique | 40-60 % | 30-50 % | 20-35 % | 40-60 % | Moyenne |
| Taux d'ouverture e-mail | 20-25 % | 15-22 % | 18-25 % | 15-20 % | Moyenne |
| Tendance du CAC payant | Hausse de 10-15 % en glissement annuel | Hausse de 15-25 % en glissement annuel | Hausse de 20-30 % en glissement annuel | Variable | Moyenne |

---

## Glossaire des définitions de métriques

| Métrique | Abréviation | Formule | Catégorie |
|--------|-------------|---------|----------|
| Revenu récurrent mensuel | MRR | Somme de toutes les valeurs d'abonnement mensuel actives | Revenu |
| Revenu récurrent annuel | ARR | MRR x 12 | Revenu |
| Net Revenue Retention | NRR | (MRR de départ + Expansion - Contraction - Désabonnement) / MRR de départ | Rétention |
| Coût d'acquisition client | CAC | (Dépense ventes + marketing) / Nouveaux clients | Acquisition |
| Valeur vie client | LTV | ARPU x Marge brute x (1 / Taux de désabonnement) | Économie unitaire |
| Panier moyen | AOV | Revenu total / Commandes totales | Revenu |
| Taux de conversion | CVR | Conversions / Sessions (ou Visiteurs) | Conversion |
| Retour sur dépense publicitaire | ROAS | Revenu des publicités / Dépense publicitaire | Efficacité |
| Coût par acquisition | CPA | Coût total de campagne / Conversions | Acquisition |
| Taux de clic | CTR | Clics / Impressions | Engagement |
| Coût pour mille | CPM | (Dépense publicitaire / Impressions) x 1000 | Portée |
| Volume brut de marchandises | GMV | Valeur totale des transactions sur la plateforme | Revenu (Marketplace) |
| Revenu par visiteur | RPV | Revenu total / Visiteurs totaux | Efficacité |
| Marge de contribution | CM | (Revenu - Coûts variables) / Revenu | Rentabilité |

---

## Liste de contrôle de mise en œuvre

- [ ] Métrique nord sélectionnée et validée selon les cinq critères
- [ ] Arbre de KPI construit avec les quatre niveaux renseignés
- [ ] Chaque métrique a un propriétaire unique assigné
- [ ] Benchmarks établis (référence interne + sectorielle)
- [ ] Objectifs fixés pour le trimestre en cours
- [ ] Infrastructure de suivi vérifiée pour chaque métrique
- [ ] Tableau de bord construit reflétant la hiérarchie de l'arbre
- [ ] Cadence de revue établie (hebdomadaire pour Primaire/Support, mensuelle pour l'arbre complet)
- [ ] Seuils d'alerte configurés pour les métriques Primaires et de Support
- [ ] Documentation partagée avec tous les propriétaires de métrique

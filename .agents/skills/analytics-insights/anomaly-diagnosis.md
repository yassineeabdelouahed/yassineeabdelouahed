# Diagnostic d'anomalies — Cadre d'investigation des métriques

## Principe fondamental

Lorsqu'une métrique évolue de manière inattendue, la première question n'est jamais « Que s'est-il passé ? » — c'est « Les données sont-elles correctes ? » La plupart des anomalies apparentes sont des erreurs de mesure. Après avoir confirmé l'intégrité des données, suivre un arbre de diagnostic structuré pour isoler la cause profonde avant d'agir.

---

## Liste de contrôle de vérification — À exécuter en premier

Avant d'investiguer toute anomalie, compléter cette liste de contrôle pour écarter les problèmes de données et de suivi.

### Vérifications de l'intégrité des données

- [ ] **Code de suivi présent** — vérifier que le pixel/tag de suivi se déclenche toujours sur toutes les pages concernées
- [ ] **Audit du gestionnaire de balises** — vérifier les changements récents de conteneur, les balises mises en pause, ou les retours en arrière de version
- [ ] **Gestion du consentement** — confirmer que les bannières de consentement fonctionnent et ne bloquent pas le suivi
- [ ] **Filtrage des bots** — vérifier que le filtrage des bots/robots est actif ; contrôler les pics de trafic provenant d'IP de bots connues
- [ ] **Réconciliation multiplateforme** — comparer la métrique entre deux sources indépendantes (par ex. GA4 vs données de plateforme vs backend)
- [ ] **Alignement de la plage de dates** — s'assurer que les périodes de comparaison ont un nombre de jours égal et tenir compte des jours fériés ou des variations saisonnières
- [ ] **Cohérence devise/fuseau horaire** — confirmer que les rapports utilisent des paramètres de fuseau horaire et de devise cohérents
- [ ] **Fenêtre d'attribution** — vérifier si la fenêtre d'attribution a changé (changement du réglage par défaut de Meta, changement de modèle d'attribution de Google Ads)
- [ ] **Échantillonnage** — dans GA4, vérifier si les données sont échantillonnées (icône de bouclier jaune) ; basculer vers un export non échantillonné si nécessaire
- [ ] **Comptage des conversions** — vérifier que la méthode de comptage des conversions (une par clic vs chaque conversion) n'a pas changé
- [ ] **Disponibilité du serveur/site** — vérifier les pannes, les temps de chargement lents, ou les erreurs 500 pendant la période de l'anomalie

### Questions de validation rapide

| Question | Si oui | Si non |
|----------|--------|-------|
| L'anomalie apparaît-elle dans plusieurs sources de données ? | Probablement réelle — passer au diagnostic | Probablement un problème de suivi — investiguer le pipeline de données |
| L'anomalie a-t-elle commencé à une date/heure précise ? | Vérifier les déploiements, changements de configuration, ou événements externes à cette date | Dérive progressive — chercher des changements algorithmiques ou concurrentiels |
| L'anomalie est-elle isolée à un segment (appareil, géographie, canal) ? | Investiguer spécifiquement ce segment | Problème à l'échelle du site — vérifier l'infrastructure ou un facteur externe majeur |
| D'autres métriques évoluent-elles selon la corrélation attendue ? | Le motif est cohérent — probablement un changement réel | Une corrélation rompue suggère une erreur de données ou des signaux mélangés |

---

## Arbres de décision diagnostiques

### Arbre de décision — Baisse de trafic

```
Traffic dropped significantly
├── Is tracking working correctly?
│   ├── NO → Fix tracking. Revalidate after fix.
│   └── YES → Continue
├── Is the drop across all channels or one channel?
│   ├── ONE CHANNEL → Go to channel-specific diagnosis
│   │   ├── Organic Search dropped
│   │   │   ├── Check Google Search Console for indexing errors
│   │   │   ├── Check for manual actions or algorithmic update
│   │   │   ├── Check robots.txt and sitemap for changes
│   │   │   ├── Check for ranking losses on high-traffic keywords
│   │   │   └── Check for technical SEO regressions (page speed, crawl errors)
│   │   ├── Paid Search dropped
│   │   │   ├── Check budget pacing (did budget run out?)
│   │   │   ├── Check for paused campaigns/ad groups
│   │   │   ├── Check auction insights for new competitors
│   │   │   ├── Check quality score changes
│   │   │   └── Check for disapproved ads
│   │   ├── Paid Social dropped
│   │   │   ├── Check for ad account issues (policy violations, spending limits)
│   │   │   ├── Check for audience saturation (frequency > 3)
│   │   │   ├── Check for creative fatigue (CTR declining over time)
│   │   │   └── Check for CPM increases (auction competition)
│   │   ├── Email / SMS dropped
│   │   │   ├── Check deliverability (bounce rate, spam complaints)
│   │   │   ├── Check send volume (were fewer campaigns sent?)
│   │   │   └── Check open rate decline (subject line, send time)
│   │   └── Direct / Referral dropped
│   │       ├── Check for lost referral partnerships or broken links
│   │       └── Check for brand search volume decline (Google Trends)
│   └── ALL CHANNELS → Sitewide issue
│       ├── Check for site outage or performance degradation
│       ├── Check for domain / DNS issues
│       ├── Check for major market event or seasonal shift
│       └── Check for Google Analytics configuration change
```

### Arbre de décision — Baisse du taux de conversion

```
Conversion rate dropped
├── Is the tracking pixel firing on the confirmation page?
│   ├── NO → Fix conversion tracking
│   └── YES → Continue
├── Did traffic source mix shift?
│   ├── YES → Lower-intent traffic is diluting CVR; segment analysis needed
│   └── NO → Continue
├── Was there a site change?
│   ├── YES → Check deployment logs
│   │   ├── Checkout flow changed → A/B test or rollback
│   │   ├── Page speed degraded → Performance fix
│   │   ├── Pricing changed → Expected CVR impact; monitor AOV
│   │   └── Design / layout changed → UX investigation
│   └── NO → Continue
├── Is the drop device-specific?
│   ├── Mobile only → Check mobile rendering, forms, payment flow
│   ├── Desktop only → Check for browser-specific issues
│   └── All devices → Continue
├── Is the drop geo-specific?
│   ├── YES → Check regional payment processing, shipping, or compliance issues
│   └── NO → Continue
└── External factors
    ├── Competitor launched promotion or undercut pricing
    ├── Seasonality or macro-economic shift
    └── Platform algorithm change affecting traffic quality
```

### Arbre de décision — Pic de coût

```
CPA / CPM / CPC spiked
├── Is the cost increase across all campaigns or isolated?
│   ├── ISOLATED → Investigate specific campaign
│   │   ├── Check for audience overlap / self-competition
│   │   ├── Check for bid strategy malfunction
│   │   ├── Check for quality score / relevance score drop
│   │   └── Check for creative fatigue (CTR drop → CPC increase)
│   └── ALL CAMPAIGNS → Platform-level or market-level shift
│       ├── Check for auction competition (new advertiser, Q4 seasonality)
│       ├── Check for platform policy change affecting targeting
│       ├── Check for iOS / privacy update affecting optimization
│       └── Check CPM trends in industry benchmarking tools
├── Did conversion volume also drop?
│   ├── YES → Likely a targeting or quality issue (bad traffic at higher cost)
│   └── NO → May be acceptable if ROAS still within target
└── Action framework
    ├── If ROAS still acceptable → Monitor but don't react
    ├── If ROAS degraded → Reduce spend on worst performers, reallocate
    └── If systemic → Diversify channels, improve organic/owned
```

### Arbre de décision — Baisse de revenu

```
Revenue declined
├── Is the decline in transaction count or average order value?
│   ├── TRANSACTION COUNT → Follow Conversion Rate Drop tree
│   ├── AOV DECLINED
│   │   ├── Check for pricing changes or promotions
│   │   ├── Check product mix shift (more low-price items)
│   │   ├── Check for discount code abuse
│   │   └── Check for bundle / upsell feature breakage
│   └── BOTH → Systemic issue; investigate traffic quality + site experience
├── Is the decline in new customer revenue or returning customer revenue?
│   ├── NEW CUSTOMER → Acquisition issue; check paid channels and landing pages
│   ├── RETURNING CUSTOMER → Retention issue; check email, loyalty, product experience
│   └── BOTH → Market-level concern or major site issue
└── Revenue attribution check
    ├── Is the decline real in backend data (Shopify, Stripe, etc.)?
    ├── Or is it only in the analytics platform (attribution loss)?
    └── If discrepancy → Attribution model or tracking issue, not revenue issue
```

---

## Tableau des causes profondes courantes

| Métrique | Cause profonde courante | Probabilité | Étape d'investigation |
|--------|-------------------|-------------|-------------------|
| Baisse de trafic (globale) | Code de suivi retiré/cassé | Élevée | Vérifier le gestionnaire de balises + le code source de la page |
| Baisse de trafic (organique) | Mise à jour d'algorithme Google | Moyenne | Vérifier Search Console + les échanges sectoriels |
| Baisse de trafic (organique) | Robots.txt bloquant des pages | Moyenne | Récupérer le robots.txt et le comparer à la version précédente |
| Baisse de trafic (payant) | Budget épuisé en cours de période | Élevée | Vérifier le rythme de dépense quotidien |
| Baisse de trafic (payant) | Refus de publicités | Élevée | Vérifier le statut des annonces sur la plateforme |
| Baisse du CVR | Régression de la vitesse du site | Moyenne | Vérifier les Core Web Vitals avant/après |
| Baisse du CVR | Bug de paiement sur un appareil spécifique | Élevée | Tester le paiement sur tous les appareils + navigateurs |
| Baisse du CVR | Mix de trafic déplacé vers une intention plus faible | Moyenne | Segmenter le CVR par source |
| Pic de CPC | Pression saisonnière sur les enchères (T4, Black Friday) | Élevée | Vérifier les tendances de CPC en glissement annuel |
| Pic de CPC | Baisse du Quality Score | Moyenne | Vérifier la tendance du QS et l'expérience de la landing page |
| Pic de CPM | Nouveau concurrent entrant dans l'enchère | Moyenne | Vérifier les insights d'enchère / Ad Library |
| Baisse de revenu | Rupture de stock sur les meilleures ventes | Élevée | Vérifier la disponibilité des produits |
| Baisse de revenu | Fin de promotion (contrecoup post-promo) | Moyenne | Comparer au calendrier de promotions |
| Baisse du ROAS | Changement de fenêtre d'attribution | Moyenne | Vérifier les paramètres d'attribution de la plateforme |
| Baisse du taux d'ouverture email | Problème de délivrabilité chez un FAI | Moyenne | Vérifier par domaine de FAI dans l'ESP |

---

## Playbooks de résolution

### Playbook : rétablissement du trafic

1. Confirmer que la baisse est réelle (liste de contrôle de vérification complétée)
2. Identifier le canal et le segment affectés
3. Pour le payant : vérifier le budget, le statut des annonces, la stratégie d'enchères, le statut d'approbation
4. Pour l'organique : vérifier GSC pour les erreurs de crawl, la couverture d'index, les changements de classement
5. Pour l'e-mail : vérifier la délivrabilité, le volume d'envoi, la santé de la liste
6. Mettre en œuvre le correctif et surveiller le rétablissement pendant 48 à 72 heures
7. En l'absence de rétablissement, escalader vers un spécialiste du canal ou le support de la plateforme
8. Documenter la cause profonde et mettre à jour les alertes de suivi

### Playbook : rétablissement du taux de conversion

1. Confirmer l'intégrité du suivi sur les pages de conversion
2. Segmenter le CVR par appareil, géographie, source et landing page
3. Vérifier les changements de site dans le journal de déploiement
4. Réaliser une QA sur l'ensemble du tunnel de conversion (recherche → fiche produit → panier → paiement → confirmation)
5. Tester sur plusieurs appareils et navigateurs
6. Si un changement de site est identifié, annuler ou tester ce changement en A/B
7. En cas de problème de qualité de trafic, ajuster le ciblage ou la stratégie d'enchères
8. Surveiller le CVR pendant 7 jours après le correctif pour confirmer le rétablissement

### Playbook : optimisation des coûts

1. Confirmer que le pic de coût n'est pas un retard de données ou une erreur de reporting
2. Isoler à des campagnes, groupes d'annonces ou mots-clés spécifiques
3. Vérifier l'auto-concurrence (chevauchement d'audience, cannibalisation de mots-clés)
4. Revoir la stratégie d'enchères (l'enchère automatisée surindexe-t-elle sur des clics coûteux ?)
5. Réduire la dépense de 20 à 30 % sur les segments les moins performants
6. Rafraîchir la création si le CTR a baissé (fatigue créative)
7. Étendre l'audience ou l'ensemble de mots-clés pour trouver un inventaire moins cher
8. Surveiller pendant 5 à 7 jours et réévaluer

---

## Cadre de configuration des alertes

### Seuils d'alerte recommandés

| Métrique | Type d'alerte | Seuil | Fréquence | Notification |
|--------|-----------|-----------|-----------|-------------|
| Sessions sur le site | Baisse | > 20 % sous la moyenne sur 7 jours | Quotidienne | Slack + E-mail |
| Taux de conversion | Baisse | > 15 % sous la moyenne sur 30 jours | Quotidienne | Slack + E-mail |
| Revenu quotidien | Baisse | > 25 % sous la moyenne sur 7 jours | Quotidienne | Slack + E-mail |
| CPA / CAC | Pic | > 30 % au-dessus de la moyenne sur 30 jours | Quotidienne | Slack |
| Rythme des dépenses publicitaires | Sur-dépense | > 110 % du budget quotidien | Quotidienne | Slack |
| Rythme des dépenses publicitaires | Sous-dépense | < 70 % du budget quotidien | Quotidienne | Slack |
| Taux de rebond | Pic | > 20 % au-dessus de la moyenne sur 30 jours | Quotidienne | E-mail |
| Temps de chargement de page (LCP) | Dégradation | > 3,0 secondes | Temps réel | PagerDuty |
| Taux de rebond des e-mails | Pic | > 5 % sur un envoi | Par envoi | Slack |
| Taux d'erreurs 404 | Pic | > 50 erreurs 404 uniques par jour | Quotidienne | Slack |

### Principes de conception des alertes

- [ ] Utiliser un écart en pourcentage par rapport à une moyenne glissante, pas des seuils absolus (tient compte de la saisonnalité)
- [ ] Appliquer des ajustements par jour de la semaine pour les métriques à forts motifs hebdomadaires (par ex. baisse du trafic B2B le week-end)
- [ ] Fixer une période de « refroidissement » (4-6 heures) pour éviter les alertes en double pour le même problème
- [ ] Exiger deux points de données consécutifs avant de déclencher (évite les à-coups ponctuels)
- [ ] Inclure des liens directs vers les tableaux de bord pertinents dans chaque message d'alerte
- [ ] Router les alertes vers le propriétaire de la métrique, pas vers un canal partagé que tout le monde ignore
- [ ] Revoir et ajuster les seuils mensuellement — si une alerte se déclenche plus de 3 fois par semaine sans action prise, le seuil est mal calibré

---

## Modèle de documentation d'investigation

Lors de la finalisation de toute investigation d'anomalie, enregistrer les constats selon ce format :

| Champ | Détail |
|-------|--------|
| **Date de détection** | |
| **Métrique affectée** | |
| **Ampleur** | Variation en % par rapport à la référence |
| **Durée** | Date de début — Date de fin (ou en cours) |
| **Cause profonde** | Confirmée / Hypothétique |
| **Détail de la cause profonde** | |
| **Intégrité des données confirmée ?** | Oui / Non |
| **Résolution** | |
| **Rétablissement confirmé ?** | Oui / Non — Date à laquelle la métrique est revenue à la référence |
| **Prévention** | Alerte ou processus ajouté pour éviter la récurrence |
| **Documenté par** | |

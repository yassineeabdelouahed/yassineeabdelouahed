# Performance influenceur — Mesure & attribution

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des a priori de planification, pas des cotations — les taux de marché et d'enchère dérivent continuellement. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, l'actualiser en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et l'enregistrer avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citer depuis le livre ensuite (`--action quote`). Ne jamais présenter un chiffre non horodaté comme un fait de marché actuel.

## Méthodes de calcul de la valeur média gagnée (EMV)

### Qu'est-ce que l'EMV ?
La valeur média gagnée attribue une valeur en dollars à l'engagement social
organique et aux impressions générées par le contenu influenceur, benchmarkée
contre ce que coûterait une exposition média payante équivalente.

### Formule EMV standard
```
EMV = (Impressions x CPM Benchmark / 1,000) + (Engagements x CPE Benchmark)
```

### Benchmarks CPM & CPE par plateforme pour l'EMV

| Plateforme | Benchmark CPM | Benchmark CPE | Notes |
|----------|--------------|---------------|-------|
| **Fil Instagram** | 8 $ – 15 $ | 0,10 $ – 0,30 $ | Plus élevé pour la mode, la beauté, le lifestyle |
| **Reels Instagram** | 5 $ – 12 $ | 0,05 $ – 0,15 $ | Les Reels gagnent généralement un CPM plus bas mais une portée plus élevée |
| **Stories Instagram** | 4 $ – 10 $ | 0,08 $ – 0,20 $ | Mesurer les réponses et taps de sticker comme des engagements |
| **TikTok** | 3 $ – 8 $ | 0,03 $ – 0,10 $ | Forte portée, CPM plus bas ; le potentiel de viralité fausse les valeurs |
| **YouTube** | 15 $ – 30 $ | 0,15 $ – 0,50 $ | CPM premium ; comptabiliser les vues, likes, commentaires |
| **LinkedIn** | 20 $ – 45 $ | 0,50 $ – 1,50 $ | Prime B2B ; audiences plus petites mais valeur plus élevée |
| **Twitter/X** | 3 $ – 8 $ | 0,05 $ – 0,15 $ | Taux d'engagement plus bas ; idéal pour lancer des conversations |

### Limites de l'EMV
- L'EMV est une **métrique directionnelle**, pas une mesure de ROI précise
- Différentes agences et plateformes utilisent différents benchmarks, rendant la comparaison croisée peu fiable
- L'EMV ne prend pas en compte le sentiment, le brand lift, ou les conversions en aval
- Utiliser l'EMV comme un signal parmi d'autres — jamais comme seule métrique de succès

---

## Modèles d'attribution pour le marketing d'influence

### Comparaison des méthodes d'attribution

| Méthode | Fonctionnement | Forces | Faiblesses | Idéal pour |
|--------|-------------|-----------|------------|----------|
| **Codes promo** | Code de réduction unique par créateur, suivi au paiement | Attribution directe de revenu ; facile à mettre en place | Ne capture que les acheteurs motivés par la réduction ; le partage de code fausse les données | E-commerce DTC, lancements de produit |
| **Liens UTM** | URL taguées UTM uniques par créateur, suivies dans les analytics | Données de trafic et conversion granulaires ; fonctionne avec GA4 | Ne fonctionne pas dans les formats non cliquables (Stories sans lien, TV) | Trafic site web, marketing de contenu |
| **Liens d'affiliation** | Liens de suivi uniques avec commission sur les conversions | Modèle auto-financé ; aligne les incitations du créateur | Peut ne pas capturer les conversions par vue ou assistées | Programmes permanents, partenariats de performance |
| **Étude de brand lift** | Enquête pré/post mesurant la notoriété, la favorabilité, l'intention | Mesure l'impact haut de tunnel ; capture l'influence sans clic | Coûteux ; nécessite un grand échantillon ; calendrier de 4-6 semaines | Campagnes de notoriété de marque, lancements majeurs |
| **Suivi par pixel** | Les pixels de plateforme suivent les conversions depuis le contenu créateur | Automatisé ; données en temps réel | Les restrictions de confidentialité (iOS 14.5+, dépréciation des cookies) limitent la précision | Amplification payante du contenu influenceur |
| **Attribution par engagement** | Corréler les pics d'engagement avec les pics de conversion | Capture l'influence organique ; pas d'infrastructure de suivi nécessaire | Corrélation n'est pas causalité ; de nombreuses variables confondantes | Campagnes de notoriété ; analyse complémentaire |
| **Enquête post-achat** | Question « Comment avez-vous entendu parler de nous ? » au paiement | Capture le bouche-à-oreille et l'influence du dark social | Auto-déclaré ; faible taux de complétion ; biais de rappel | Marques DTC ; validation de la contribution influenceur |

### Approche d'attribution multi-touch
Pour les campagnes avec plusieurs influenceurs et canaux, utiliser un modèle mixte :
1. **Premier contact** : Crédit à l'influenceur qui a introduit le consommateur à la marque
2. **Dernier contact** : Crédit à l'influenceur dont le contenu a précédé la conversion
3. **Linéaire** : Crédit égal à travers tous les points de contact
4. **Dégressif dans le temps** : Plus de crédit aux points de contact plus proches de la conversion
5. **Basé sur les données** : Un modèle ML attribue le crédit basé sur les motifs de conversion observés

**Approche recommandée** : Utiliser le dernier contact pour les campagnes de réponse
directe et linéaire/dégressif dans le temps pour les campagnes de notoriété.
Toujours compléter avec des enquêtes post-achat.

---

## Modèle de rapport de campagne d'influence

### Aperçu de campagne
| Champ | Valeur |
|-------|-------|
| Nom de campagne | |
| Dates de campagne | |
| Objectif | |
| Budget total | |
| Nombre de créateurs | |
| Total des livrables | |

### Tableau récapitulatif de performance

| Métrique | Définition | Total | Moyenne par créateur | Benchmark | vs Benchmark |
|--------|-----------|-------|----------------|-----------|---------------|
| **Portée** | Comptes uniques ayant vu le contenu | | | | |
| **Impressions** | Nombre total d'affichages du contenu | | | | |
| **Engagement** | Likes + commentaires + sauvegardes + partages totaux | | | | |
| **Taux d'engagement** | Engagements / Portée x 100 | | | | |
| **Vues vidéo** | Vues vidéo totales (3s ou définies par la plateforme) | | | | |
| **Taux de complétion vidéo** | Vues complètes / Vues totales x 100 | | | | |
| **Clics de lien** | Clics sur des URL suivies ou swipe-up | | | | |
| **Taux de clic** | Clics / Impressions x 100 | | | | |
| **Conversions** | Achats, inscriptions, ou actions de conversion définies | | | | |
| **Taux de conversion** | Conversions / Clics x 100 | | | | |
| **Revenu généré** | Revenu total suivi issu de l'activité influenceur | | | | |
| **CPE** | Coût par engagement (Dépense totale / Engagements) | | | | |
| **CPC** | Coût par clic (Dépense totale / Clics) | | | | |
| **CPA** | Coût par acquisition (Dépense totale / Conversions) | | | | |
| **CPM** | Coût pour mille impressions (Dépense / Impressions x 1 000) | | | | |
| **ROAS** | Retour sur dépense publicitaire (Revenu / Dépense totale) | | | | |
| **EMV** | Valeur média gagnée | | | | |

### Performance individuelle des créateurs

| Créateur | Plateforme | Livrables | Portée | Engagement | Taux eng. | Clics | Conversions | Coût | CPE | CPA | ROAS |
|---------|----------|-------------|-------|------------|-----------|--------|-------------|------|-----|-----|------|
| | | | | | | | | | | | |

---

## Benchmarks par secteur & plateforme

### Benchmarks de taux d'engagement

| Secteur | Instagram | TikTok | YouTube | LinkedIn |
|----------|-----------|--------|---------|----------|
| **Beauté & Soins de la peau** | 2,5% – 4,0% | 4,0% – 7,0% | 3,0% – 5,0% | N/A |
| **Mode & Habillement** | 2,0% – 3,5% | 3,5% – 6,0% | 2,5% – 4,5% | N/A |
| **Alimentation & Boissons** | 2,5% – 4,5% | 5,0% – 8,0% | 3,0% – 5,0% | N/A |
| **Santé & Fitness** | 2,0% – 3,5% | 4,0% – 7,0% | 3,5% – 5,5% | 1,5% – 3,0% |
| **Technologie** | 1,5% – 2,5% | 3,0% – 5,0% | 4,0% – 6,0% | 2,0% – 4,0% |
| **Voyage & Hôtellerie** | 3,0% – 5,0% | 4,0% – 7,0% | 3,0% – 5,0% | 1,0% – 2,0% |
| **B2B / SaaS** | 1,0% – 2,0% | 2,0% – 4,0% | 2,5% – 4,0% | 2,5% – 5,0% |
| **Finance / Fintech** | 1,0% – 2,0% | 3,0% – 5,0% | 3,0% – 5,0% | 2,0% – 4,0% |
| **Gaming** | 1,5% – 3,0% | 5,0% – 9,0% | 4,0% – 7,0% | N/A |
| **Parentalité / Famille** | 2,5% – 4,0% | 4,0% – 7,0% | 3,0% – 5,0% | N/A |

### Benchmarks d'efficacité de coût

| Métrique | Bien | Moyen | En dessous de la moyenne |
|--------|------|---------|---------------|
| **CPE (Instagram)** | < 0,15 $ | 0,15 $ – 0,40 $ | > 0,40 $ |
| **CPE (TikTok)** | < 0,08 $ | 0,08 $ – 0,20 $ | > 0,20 $ |
| **CPC (toutes plateformes)** | < 1,50 $ | 1,50 $ – 4,00 $ | > 4,00 $ |
| **CPA (e-commerce DTC)** | < 25 $ | 25 $ – 75 $ | > 75 $ |
| **CPM (Instagram)** | < 10 $ | 10 $ – 25 $ | > 25 $ |
| **ROAS (code promo)** | > 5x | 2x – 5x | < 2x |

---

## Méthodologie d'étude de brand lift

### Conception de l'étude
1. **Groupe contrôle** : Audience non exposée au contenu influenceur
2. **Groupe exposé** : Audience confirmée exposée au contenu influenceur (pixel de plateforme ou filtre d'enquête)
3. **Taille d'échantillon** : Minimum 500 par groupe pour la significativité statistique ; 1 000+ préféré
4. **Timing** : Enquête de référence pré-campagne + mesure post-campagne (7–14 jours après le dernier post)

### Métriques clés de brand lift
| Métrique | Exemple de question d'enquête | Gain cible |
|--------|------------------------|-------------|
| **Notoriété spontanée** | « Quelles marques vous viennent à l'esprit quand vous pensez à [catégorie] ? » | +5 – 15 points |
| **Notoriété assistée** | « Avez-vous entendu parler de [Marque] ? » | +10 – 25 points |
| **Favorabilité de marque** | « Quel est votre avis favorable sur [Marque] ? » (échelle 1–5) | +0,3 – 0,5 points |
| **Intention d'achat** | « Quelle est la probabilité que vous achetiez chez [Marque] dans les 30 prochains jours ? » | +5 – 15 points |
| **Association de message** | « Laquelle de ces déclarations associez-vous à [Marque] ? » | +10 – 20 points |
| **Rappel publicitaire** | « Vous rappelez-vous avoir vu du contenu sur [Marque] d'un créateur ? » | +15 – 30 points |

### Exécuter une étude de brand lift
- Utiliser des outils natifs de plateforme (Meta Brand Lift, TikTok Brand Lift) quand le budget dépasse 30K $
- Pour les campagnes plus petites, exécuter des enquêtes manuelles via Typeform ou SurveyMonkey
- Exiger une durée de campagne minimum de 2 semaines pour un lift mesurable
- Contrôler pour toute autre activité marketing en cours simultanément

---

## Classement de performance de contenu

### Méthodologie de classement
Classer chaque pièce de contenu influenceur en utilisant un score composite :

```
Content Score = (Engagement Rate x 0.30) + (Reach Index x 0.25) + (Conversion Index x 0.25) + (Content Quality Score x 0.20)
```

| Composante | Comment la calculer | Échelle |
|-----------|-----------------|-------|
| **Taux d'engagement** | Engagements / Portée x 100 | Normalisé sur 0–100 au sein de la campagne |
| **Indice de portée** | Portée du créateur / Portée moyenne de la campagne | Normalisé sur 0–100 |
| **Indice de conversion** | Conversions du créateur / Conversions moyennes de la campagne | Normalisé sur 0–100 |
| **Qualité de contenu** | Revue manuelle : qualité visuelle, narration, intégration de marque | Échelle subjective 0–100 |

### Cas d'usage du classement de contenu
- Identifier le contenu le plus performant pour l'amplification payante (whitelisting/dark posting)
- Déterminer quels créateurs réengager pour des campagnes futures
- Construire une bibliothèque de référence « ce qui fonctionne » pour les briefs futurs
- Justifier des changements d'allocation budgétaire vers les meilleurs performeurs

---

## Suivi du ROI à long terme

### Au-delà de la fenêtre de campagne
L'impact du marketing d'influence s'étend bien au-delà de la date de publication.
Suivre ces métriques longitudinales :

| Fenêtre de temps | Ce qu'il faut mesurer | Méthode |
|-----------|----------------|--------|
| **0–7 jours** | Réponse directe : clics, conversions, échanges de codes promo | UTM, code promo, suivi par pixel |
| **7–30 jours** | Conversions différées, gain de recherche de marque, augmentation de trafic organique | GA4, Google Search Console, enquêtes post-achat |
| **30–90 jours** | Valeur vie client des clients acquis par influenceur vs autres canaux | Segmentation CRM, analyse de cohorte |
| **90–365 jours** | Longévité du contenu (le contenu YouTube/blog evergreen continue de générer des vues) | Analytics de plateforme ; suivre les impressions continues |
| **Continu** | Changement de sentiment de marque, changement de part de voix, taux de croissance de communauté | Outils de veille sociale ; enquêtes de suivi de marque |

### Analyse de cohorte des clients acquis par influenceur
- Tagger dans votre CRM les clients acquis via des campagnes d'influence
- Comparer la LTV, le taux d'achat répété, et le panier moyen face aux autres canaux d'acquisition
- Suivre le comportement de parrainage — les clients acquis par influenceur parrainent souvent d'autres à des taux plus élevés
- Calculer le véritable ROAS incluant la LTV, pas seulement le revenu du premier achat

### Tableau de bord de performance de portefeuille
Maintenir un tableau de bord évolutif suivant :
- Dépense influenceur totale (mensuelle/trimestrielle/annuelle)
- ROAS agrégé sur tous les partenariats d'influence
- Top 10 créateurs performants (par score composite)
- Lignes de tendance d'efficacité de coût (CPE, CPA, CPM dans le temps)
- Croissance de la bibliothèque de contenu et taux de réutilisation
- Métriques de brand lift (si suivies)

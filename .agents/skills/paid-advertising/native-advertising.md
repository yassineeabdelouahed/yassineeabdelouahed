# Publicité native — Découverte de contenu et campagnes in-feed

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Paysage des plateformes

### Grands réseaux publicitaires natifs

| Plateforme | Portée | Force | Qualité des éditeurs | Self-Serve | Dépense min. |
|---|---|---|---|---|---|
| **Taboola** | 500 M+ utilisateurs quotidiens, 9 000+ éditeurs | Plus grand réseau de découverte de contenu, algorithme le plus fort | Mixte (premium + longue traîne) | Oui | 10 $/jour |
| **Outbrain** | 340 M+ utilisateurs quotidiens, éditeurs premium | Réseau d'éditeurs premium (Condé Nast, BBC, CNN, Washington Post) | Élevée (sélectionné) | Oui | 20 $/jour |
| **Nativo** | 600+ éditeurs premium | Rendu véritablement natif — la publicité hérite du CSS/de la mise en page de l'éditeur | Très élevée (brand-safe par défaut) | Géré + self-serve | 5K $/mois typique |
| **TripleLift** | Échelle programmatique via les DSP | Native in-feed et in-article programmatique | Varie (basé sur l'exchange) | Via DSP | Minimums du DSP applicables |
| **Sharethrough** | Échelle programmatique via les DSP | Native amélioré avec moteur d'optimisation de titre | Varie (basé sur l'exchange) | Via DSP | Minimums du DSP applicables |
| **MGID** | 850 M+ utilisateurs mensuels | Fort en EMEA et LATAM, CPC plus bas | Mixte | Oui | 5 $/jour |
| **Yahoo Native** | 900 M+ utilisateurs mensuels | Propriétés Yahoo/AOL, écosystème fermé | Élevée (propriétés propres) | Oui (via Yahoo DSP) | Varie |

### Arbre de décision de sélection de plateforme

```
DÉBUT : Quel est votre objectif principal ?
│
├── Amplification de contenu (articles de blog, guides) → Taboola ou Outbrain
├── Sécurité de marque premium requise → Nativo ou Outbrain
├── Achat programmatique via DSP → TripleLift ou Sharethrough
├── CPC le plus bas / budgets de test → Taboola ou MGID
├── Look and feel natif éditeur → Nativo (rendu véritablement natif)
└── Priorité à l'optimisation de titre → Sharethrough (titres auto-améliorés)
```

---

## Types de campagne

### Explication des formats publicitaires natifs

| Format | Emplacement | Expérience utilisateur | Idéal pour |
|---|---|---|---|
| **Découverte de contenu** | Widget en bas/sur le côté des articles (« Recommandé pour vous ») | L'utilisateur voit des vignettes + titres parmi les recommandations organiques | Amplification de blog, aimants à leads, notoriété |
| **In-Feed** | Apparaît dans le fil de contenu de l'éditeur (entre les articles) | Fluide — correspond au contenu éditorial environnant | Pages produit, landing pages, eCommerce |
| **Widget de recommandation** | Widget dans la barre latérale ou en bas d'article | Grille de vignettes ou liste aux côtés de liens organiques | Content marketing, affiliation, génération de leads |
| **In-Article** | Placé entre les paragraphes de contenu éditorial | Intégré en cours de lecture — forte visibilité | Notoriété de marque, distribution vidéo |
| **Contenu de marque** | Article sponsorisé complet sur le site de l'éditeur | Storytelling long format, signé ou « Sponsorisé par » | Leadership éclairé, produits complexes, B2B |
| **Vidéo native** | Vidéo en lecture automatique dans le fil ou in-article | Son coupé par défaut, sous-titres essentiels | Démos produit, histoires de marque, explicatifs |

---

## Spécifications créatives

### Spécifications plateforme par plateforme

| Spec | Taboola | Outbrain | Nativo | TripleLift | Sharethrough |
|---|---|---|---|---|---|
| **Longueur du titre** | 60 caractères (max 100) | 80 caractères (max 150) | Dépend de l'éditeur | 90 caractères max | 90 caractères max |
| **Description** | 150 caractères | Non utilisée | Dépend de l'éditeur | 300 caractères max | 200 caractères max |
| **Taille de l'image** | 1000x600 min | 1200x800 min | Modèle de l'éditeur | Adaptatif à l'offre | 1200x627 recommandé |
| **Vignette** | 400x350 | 400x350 | N/A | N/A | N/A |
| **Texte sur l'image** | Autorisé (max 20 %) | Non autorisé | Règles de l'éditeur | Non recommandé | Non recommandé |
| **Logo de marque** | Optionnel | Non requis | Modèle de l'éditeur | Recommandé | Requis |
| **Vidéo** | MP4, 15-60s | MP4, 6-30s | Varie | Tag VAST | Tag VAST |
| **Taille de fichier** | 5 Mo max | 1 Mo max | Varie | Via specs du DSP | Via specs du DSP |
| **Landing page** | Requise | Requise | Article ou LP | Requise | Requise |

### Bonnes pratiques créatives

- **Titres :** Les questions surpassent les affirmations de 15-20 %. Les chiffres surpassent les deux (format « 7 façons de... »). Éviter le putaclic — les plateformes pénalisent les titres trompeurs avec une distribution plus faible.
- **Images :** Les photos de personnes génèrent un CTR 30 %+ plus élevé que les objets ou images abstraites. Éviter l'esthétique banque d'images — l'imagerie de style éditorial se fond mieux. Les gros plans surpassent les plans larges. Le contraste élevé et les couleurs chaudes améliorent la performance des vignettes.
- **Descriptions :** Ouvrir avec la proposition de valeur, pas le nom de la marque. Inclure un CTA doux (« Découvrez comment... » vs « Achetez maintenant »).
- **Landing pages :** Les landing pages de style article (format publireportage) convertissent mieux que les pages produit pour le trafic froid. Faire correspondre le titre de la landing page au titre de la publicité pour la continuité. Inclure la preuve sociale tôt.

---

## Stratégie d'enchères et de budget

### Modèles d'enchères

| Modèle | Fonctionnement | Idéal pour | Fourchette typique |
|---|---|---|---|
| **CPC** (Coût par clic) | Payer uniquement quand l'utilisateur clique | Amplification de contenu, génération de leads, test | 0,20–4,00 $ |
| **vCPM** (CPM visible) | Payer pour 1 000 impressions visibles | Notoriété de marque, campagnes de portée | 2,00–12,00 $ |
| **CPA cible** | La plateforme optimise vers un coût par action cible | Campagnes de conversion (nécessite pixel + données) | Varie selon la verticale |
| **Enchère intelligente** | La plateforme auto-optimise les enchères via ML | Campagnes matures avec des données de conversion suffisantes (50+/semaine) | Géré par la plateforme |
| **oCPC** (CPC optimisé) | CPC avec une surcouche d'optimisation de conversion | Transition du CPC vers l'optimisation CPA | Démarre au CPC, s'ajuste vers le CPA |

### Directives d'allocation budgétaire

| Phase de campagne | Répartition du budget | Durée | Objectif |
|---|---|---|---|
| **Test** | 20 % du budget natif | 1–2 semaines | Tester 5+ titres, 3+ images par campagne |
| **Optimisation** | 30 % du budget natif | 2–4 semaines | Mettre à l'échelle les gagnants, éliminer les perdants, affiner le ciblage |
| **Montée en puissance** | 50 % du budget natif | Continu | Maximiser le volume à un CPA/ROAS cible |

**Budgets minimums pour la significativité statistique :**
- Par variante créative : 50–100 $ de dépense minimum avant de juger la performance
- Par campagne : 500 $+ sur 2 semaines pour des données fiables
- Par éditeur : 1 000+ impressions avant d'évaluer la performance de l'éditeur

---

## Ciblage d'audience

### Méthodes de ciblage par plateforme

| Méthode | Taboola | Outbrain | Nativo | Programmatique (TTL/Sharethrough) |
|---|---|---|---|---|
| **Basé sur les centres d'intérêt** | Oui (comportement de lecture) | Oui (comportement de lecture) | Oui | Via DMP/DSP |
| **Contextuel** | Oui (sujets d'article) | Oui (sujets d'article) | Oui (fort) | Oui |
| **Retargeting** | Basé sur pixel | Basé sur pixel | Basé sur pixel | Pixel DSP + CRM |
| **Lookalike** | Expansion d'audience seed | Expansion d'audience seed | Basé sur le CRM | Modélisation DSP |
| **Segments DMP** | Limité | Limité | Oui | Accès DMP complet |
| **Ciblage géo** | Pays/état/ville | Pays/état/ville | Pays/état/DMA | Pile géo complète |
| **Appareil** | Desktop/mobile/tablette | Desktop/mobile/tablette | Oui | Graphe d'appareils complet |
| **Dayparting** | Oui | Oui | Oui | Oui |

### Stratégie de ciblage par étape du tunnel

| Étape | Ciblage | Type de contenu | Enchère | Métrique de succès |
|---|---|---|---|---|
| **Notoriété** | Centre d'intérêt large + contextuel | Articles éducatifs, guides | vCPM ou CPC bas | CTR, temps sur la page |
| **Considération** | Retargeting + lookalike | Guides comparatifs, études de cas | CPC | Profondeur de défilement, pages/session |
| **Conversion** | Retargeting (visiteurs du site) | Pages produit, essais gratuits, démos | CPA ou oCPC | Conversions, CPA |

---

## Benchmarks de performance par verticale

| Verticale | CTR | CPC | TdC (Clic→Lead) | CPL | Temps sur la page |
|---|---|---|---|---|---|
| **Tech / SaaS** | 0,15–0,30 % | 0,50–1,50 $ | 3–8 % | 15–50 $ | 1:30–3:00 |
| **Finance / Assurance** | 0,10–0,20 % | 1,00–3,00 $ | 2–5 % | 30–100 $ | 2:00–4:00 |
| **Santé / Bien-être** | 0,20–0,40 % | 0,30–0,80 $ | 4–10 % | 8–25 $ | 1:00–2:30 |
| **eCommerce / Retail** | 0,15–0,35 % | 0,40–1,20 $ | 2–6 % | 10–40 $ | 0:45–2:00 |
| **B2B / Entreprise** | 0,08–0,18 % | 1,50–4,00 $ | 1–4 % | 50–150 $ | 2:00–5:00 |
| **Éducation** | 0,15–0,30 % | 0,30–1,00 $ | 5–12 % | 5–30 $ | 2:00–4:00 |
| **Immobilier** | 0,10–0,25 % | 0,60–2,00 $ | 2–5 % | 20–60 $ | 1:30–3:00 |

---

## Sécurité de marque et qualité

### Cadre de sécurité de marque pour le native

| Couche | Contrôle | Ce qu'elle fait |
|---|---|---|
| **Listes blanches d'éditeurs** | Liste d'éditeurs approuvés curée manuellement | Diffuser uniquement sur des sites vérifiés, sûrs pour la marque |
| **Listes noires d'éditeurs** | Exclure des domaines spécifiques | Bloquer les tabloïds, les sites de faible qualité, les concurrents |
| **Exclusions de catégorie** | Bloquer des catégories de contenu (actualités, politique, adulte) | Éviter l'adjacence à des sujets sensibles |
| **Vérification tierce** | Intégration IAS, DoubleVerify | Notation de sécurité de marque avant et après l'enchère |
| **Standards de visibilité** | MRC : 50 % des pixels visibles pendant 1+ seconde | S'assurer que les publicités sont réellement vues |
| **Détection de fraude** | Native à la plateforme + tiers | Filtrer le trafic bot, la fraude au clic, l'usurpation de domaine |

### Facteurs de Quality Score (spécifiques à la plateforme)

Taboola et Outbrain utilisent des scores de qualité internes qui affectent la distribution et le coût :
- **Performance du CTR** — Un CTR plus élevé par rapport à la concurrence abaisse le CPC effectif
- **Qualité de la landing page** — Vitesse de chargement, optimisation mobile, profondeur de contenu
- **Fraîcheur créative** — Les nouveaux créatifs reçoivent un coup de pouce de distribution initial ; rafraîchir toutes les 2 à 3 semaines
- **Conformité aux politiques** — Les affirmations trompeuses, la capitalisation excessive, ou le putaclic réduisent le score
- **Engagement post-clic** — Le taux de rebond, le temps sur la page, les pages par session affectent le score de qualité dans le temps

---

## Mesure et attribution

### Métriques spécifiques au native

| Métrique | Ce qu'elle mesure | Benchmark | Pourquoi c'est important |
|---|---|---|---|
| **CTR** | Taux de clic sur la publicité native | 0,15–0,35 % | Métrique d'efficacité principale |
| **Temps sur la page** | Profondeur d'engagement post-clic | 1:30+ minutes | Indique la qualité du contenu et l'adéquation à l'audience |
| **Profondeur de défilement** | % de la landing page consommée | 50 %+ | Mesure la consommation de contenu |
| **Pages par session** | Profondeur de navigation après le clic | 1,5+ | Montre un engagement plus profond sur le site |
| **Taux de rebond** | % qui partent après une page | < 70 % pour les articles | Plus bas c'est mieux — rebond élevé = décalage de ciblage |
| **Conversions vue-jusqu'au-clic** | Conversions après avoir vu mais sans cliquer sur la publicité | Varie | Capture l'impact de notoriété |
| **Conversions assistées** | Conversions où le native était dans le parcours | Varie | Montre le rôle du native dans le tunnel complet |
| **Taux de consommation de contenu** | % de l'article lu (si l'article est la LP) | 40 %+ | Métrique centrale pour les campagnes de contenu de marque |

### Approches d'attribution

- **Dernier clic :** Standard mais sous-évalue le native (le native est généralement en haut de tunnel)
- **Vue-jusqu'au-clic :** Inclure les impressions ayant mené à des conversions dans les 1 à 7 jours (recommandé : fenêtre de vue de 1 jour, de clic de 7 jours)
- **Multi-touch :** Attribuer un crédit partiel au native dans le parcours de conversion (basé sur la position ou piloté par les données)
- **Études de Brand Lift :** Mesurer le lift de notoriété, considération, et intention issu de l'exposition native (disponible sur Taboola et Outbrain pour les budgets plus importants)
- **Test d'incrémentalité :** Groupes témoins pour mesurer le véritable lift des campagnes natives (référence absolue mais nécessite de l'échelle)

---

## Playbook d'optimisation

### Calendrier d'optimisation semaine par semaine

| Semaine | Action | Critères de décision |
|---|---|---|
| **Semaine 1** | Lancer avec 5+ variantes de titre, 3+ variantes d'image par campagne. Ciblage large. Enchère CPC. | S'assurer que tous les créatifs atteignent 1 000+ impressions |
| **Semaine 2** | Mettre en pause les 50 % du bas par CTR. Revoir la performance au niveau éditeur. Resserrer le ciblage. | Éliminer les créatifs avec un CTR < 50 % du meilleur performeur |
| **Semaine 3** | Ajouter de nouvelles variantes créatives inspirées des gagnants. Commencer les ajustements d'enchère au niveau éditeur. Passer à l'oCPC si 50+ conversions. | Les nouvelles variantes doivent itérer sur les motifs de titre/image gagnants |
| **Semaine 4+** | Continu : rafraîchir les créatifs toutes les 2-3 semaines, s'étendre à de nouvelles plateformes, mettre à l'échelle les segments d'éditeurs gagnants. | Fatigue créative = baisse du CTR > 20 % par rapport au pic |

### Optimisation au niveau éditeur

- Exporter le rapport de performance par éditeur chaque semaine
- Identifier les 20 % d'éditeurs les plus performants par taux de conversion — augmenter les enchères de 10-20 % sur ceux-ci
- Identifier les 20 % du bas par taux de rebond ou zéro conversion — les bloquer
- Construire dans le temps une liste blanche d'« éditeurs éprouvés » à partir des performeurs constants
- Tester les nouveaux éditeurs dans une campagne séparée à des enchères plus basses avant de les ajouter aux campagnes principales

### Stratégie de rafraîchissement créatif

- **Cycle de rafraîchissement :** Toutes les 2-3 semaines pour les campagnes à fort volume, mensuel pour un volume plus faible
- **Méthode d'itération :** Prendre la structure de titre gagnante et changer l'angle/le bénéfice. Prendre le style d'image gagnant et changer le sujet.
- **Structure de test :** Toujours avoir 2-3 créatifs « éprouvés » en cours d'exécution aux côtés de 2-3 créatifs « de test »
- **Signaux de fatigue :** Le CTR chute de 20 %+ par rapport au pic, le CPC augmente de 15 %+, la fréquence dépasse 3x par utilisateur

---

## Intégration avec le content marketing

### Stratégie d'amplification de contenu

```
Tunnel de contenu pour la publicité native :

1. DÉCOUVERTE (publicité native) → 2. ENGAGEMENT (article/guide) → 3. CAPTURE (CTA/formulaire) → 4. NURTURING (email/retargeting)
```

**Quel contenu amplifier via le native :**
- Articles de blog avec un engagement organique éprouvé (fort temps sur la page, faible taux de rebond)
- Guides evergreen et contenu comment faire (la longue durée de vie réduit la charge de rafraîchissement créatif)
- Contenu piloté par les données ou de recherche originale (fort potentiel de partage, construction d'autorité)
- Contenu comparatif ou « vs » (capture l'intention au stade de considération)

**Notation du contenu pour la distribution :** Noter chaque pièce sur : score d'engagement organique (1-5), pertinence pour l'audience cible (1-5), potentiel de conversion (1-5), attractivité du titre pour le native (1-5). Amplifier le contenu notant 16+ sur 20.

**Stratégie article-comme-landing-page :** Plutôt que d'envoyer le trafic natif vers une page produit, envoyer les utilisateurs vers un article informatif (sur votre site ou chez l'éditeur via du contenu de marque). Inclure des CTA doux dans l'article. Recibler les lecteurs de l'article avec des publicités orientées conversion. Cette approche produit typiquement des métriques d'engagement 2 à 3 fois supérieures et des CPA plus bas pour les produits complexes ou à forte considération.

> **Principe clé :** La publicité native fonctionne mieux lorsqu'elle délivre une valeur authentique avant de demander quoi que ce soit. Les campagnes natives les plus performantes donnent l'impression d'être des recommandations de contenu, pas des publicités. Optimiser d'abord pour l'engagement, puis pour la conversion.

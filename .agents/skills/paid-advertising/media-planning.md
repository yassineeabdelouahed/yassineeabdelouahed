# Cadre de planification média

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

Avant que des hypothèses de taux n'entrent dans un plan, interrogez chaque métrique x canal depuis le carnet de benchmarks (`python scripts/benchmark_book.py --action quote --metric cpm --channel <canal>`). Un refus (code de sortie 3) signifie que le chiffre doit être recherché en direct et enregistré d'abord — jamais reporté depuis la mémoire ou depuis ce document.

## Fondamentaux de la planification média

La planification média est le processus stratégique de sélection des canaux, du timing et de l'allocation budgétaire pour délivrer des messages publicitaires à une audience cible avec une efficacité maximale.

### Métriques clés

| Métrique | Définition | Formule | Cas d'usage |
|--------|-----------|---------|----------|
| Portée | Individus uniques exposés à une publicité au moins une fois | Impressions uniques / Population cible | Mesure de l'étendue de la campagne |
| Fréquence | Nombre moyen de fois où chaque personne voit la publicité | Total des impressions / Portée | Suivi du renforcement du message |
| GRP (points de couverture bruts) | Poids total d'un plan média | Portée (%) x Fréquence | Devise de planification TV/radio/OOH |
| TRP (points de couverture cible) | GRP filtré sur la démographie cible | Portée cible (%) x Fréquence | Planification axée sur la démographie |
| CPM (coût pour mille) | Coût pour atteindre 1 000 impressions | (Coût / Impressions) x 1 000 | Comparaison de coût cross-canal |
| SOV (part de voix) | Présence publicitaire de la marque vs la catégorie totale | Dépense de la marque / Dépense de la catégorie | Positionnement concurrentiel |

### Fréquence effective

Le nombre minimum d'expositions nécessaires avant qu'une publicité ne génère une réponse mesurable :

1. **1-2 expositions** — Enregistrement de la notoriété uniquement ; le message risque de ne pas s'ancrer
2. **3-5 expositions** — Fourchette de fréquence effective généralement admise pour la plupart des campagnes
3. **6-10 expositions** — Nécessaire pour les messages complexes, les nouvelles catégories, ou les décisions à faible implication
4. **10+ expositions** — Les rendements décroissants commencent ; risque de fatigue publicitaire et de sentiment négatif
5. **Modèle de récence** — Pour les marques établies, une seule exposition proche de la décision d'achat peut être la plus efficace

La courbe de rendements décroissants suit un motif logarithmique : les trois premières expositions délivrent environ 70 % de l'impact total de la campagne. Chaque exposition suivante produit un gain progressivement plus faible. Surveiller les plafonds de fréquence au niveau de la plateforme pour éviter le gaspillage.

### Poids média

Le poids média fait référence au volume total de pression publicitaire appliqué à un marché. Il est mesuré par les GRP, les impressions, ou la dépense. Un poids plus élevé n'équivaut pas toujours à de meilleurs résultats — la relation entre poids et résultat suit une courbe en S, avec un seuil minimum en dessous duquel la dépense est gaspillée et un plafond au-dessus duquel une dépense supplémentaire produit des rendements négligeables.

---

## Méthodologie de sélection des canaux

### Quatre approches

| Approche | Méthode | Quand l'utiliser |
|----------|--------|-------------|
| Performance historique | Allouer selon les données historiques de ROAS/CPA par canal | Comptes matures avec 6+ mois de données |
| Test incrémental | Exécuter des tests de lift contrôlés pour mesurer l'incrémentalité réelle | Quand les données historiques risquent d'être surestimées à cause de problèmes d'attribution |
| Parité concurrentielle | Égaler ou dépasser la dépense des concurrents sur les canaux clés | Défendre une part de marché dans des catégories saturées |
| Part de voix (SOV) | Fixer la SOV au-dessus de la part de marché (SOM) pour croître | Phase de croissance ; campagnes de construction de marque |

### Matrice d'adéquation canal-objectif

| Objectif | Search | Social | Display | Vidéo | Audio | Native | OOH |
|-----------|--------|--------|---------|-------|-------|--------|-----|
| Notoriété de marque | Faible | Élevée | Moyenne | Élevée | Élevée | Moyenne | Élevée |
| Considération | Élevée | Élevée | Moyenne | Élevée | Moyenne | Élevée | Faible |
| Génération de leads | Élevée | Élevée | Faible | Moyenne | Faible | Moyenne | Faible |
| Ventes directes | Élevée | Élevée | Faible | Moyenne | Faible | Moyenne | Faible |
| Fidélisation | Moyenne | Élevée | Moyenne | Moyenne | Moyenne | Moyenne | Faible |
| Portée locale | Élevée | Moyenne | Moyenne | Faible | Élevée | Faible | Élevée |

Priorité de sélection : Commencer par les canaux alignés sur l'objectif principal, puis superposer les canaux de soutien pour un message séquentiel.

---

## Modèles d'allocation budgétaire

| Modèle | Description | Avantages | Inconvénients | Idéal pour |
|-------|-------------|------|------|----------|
| Descendant (% du revenu) | Allouer un pourcentage fixe du revenu réel ou projeté à la publicité | Simple, prévisible, évolue avec l'activité | Ignore les conditions de marché, s'auto-renforce (faible revenu = faible dépense) | Entreprises stables avec un revenu cohérent |
| Ascendant (basé sur l'objectif) | Calculer la dépense nécessaire pour atteindre des objectifs spécifiques (CPL x leads cibles) | Directement lié aux résultats, défendable | Nécessite des benchmarks précis, peut dépasser la capacité budgétaire | Campagnes orientées performance avec des KPI clairs |
| Parité concurrentielle | Égaler ou dépasser proportionnellement les niveaux de dépense des concurrents | Maintient la position de marché, facile à benchmarker | Suppose que les concurrents dépensent efficacement, réactif | Marchés matures avec des données concurrentielles transparentes |
| Basé sur l'optimisation | Utiliser des modèles algorithmiques (MMM, MTA) pour allouer selon les rendements marginaux | Piloté par les données, maximise l'efficacité | Nécessite une infrastructure de données significative, décalage de modèle | Budgets importants avec des systèmes de mesure robustes |
| Hybride | Combiner un plafond budgétaire descendant avec une allocation ascendante à l'intérieur | Équilibre discipline budgétaire et optimisation de performance | Plus complexe à gérer, nécessite un alignement inter-équipes | La plupart des annonceurs de taille moyenne à grande |

### Répartitions indicatives par tunnel

- **Construction de marque (notoriété/considération) :** 40-60 % du budget total
- **Performance (conversion/acquisition) :** 30-50 % du budget total
- **Fidélisation/loyauté :** 10-20 % du budget total

Ajuster les ratios selon la maturité de la marque : les nouvelles marques penchent 60/30/10 vers la notoriété ; les marques établies peuvent fonctionner à 30/50/20 vers la performance et la fidélisation.

---

## Stratégies de flighting

| Stratégie | Motif | Critères de décision |
|----------|---------|-------------------|
| Continu | Dépense stable et régulière sur toutes les semaines | Produits evergreen, génération de leads always-on, demande constante |
| Pulsé | Dépense de base avec des pics périodiques | Produits saisonniers avec une pertinence toute l'année (par ex. fitness) |
| Flighting | Alternance de périodes actives/inactives avec des écarts de dépense nulle | Produits fortement saisonniers, budgets limités, événementiel |
| Chargé en début | Forte dépense les premières semaines, en atténuation | Lancements de produit, offres sensibles au temps, construction d'une dynamique précoce |
| Chargé en fin | Dépense légère initialement, montée en puissance vers un pic | Événements à date fixe (conférences, fêtes), construction de l'anticipation |

### Cadre de décision

1. La demande est-elle saisonnière ou constante ? Saisonnière mène au pulsé ou au flighting ; constante mène au continu.
2. Y a-t-il une date d'événement fixe ? Oui mène au chargé en fin ou en début selon que la notoriété pré-événement ou l'urgence de dernière minute compte le plus.
3. Le budget est-il contraint par rapport au bruit concurrentiel ? Les budgets contraints bénéficient du flighting (impact concentré) plutôt que du continu (présence diluée).
4. Le produit nécessite-t-il une considération soutenue ? Les cycles de vente longs favorisent le continu ; les produits d'achat impulsif peuvent supporter le flighting.

---

## Vagues budgétaires et contingence

### Réserves de sécurité

Maintenir 10-15 % du budget total comme réserve non engagée. Cette réserve sert trois objectifs :

1. **Capture d'opportunité** — Répondre aux moments viraux inattendus, aux faux pas des concurrents, ou aux sujets tendance
2. **Montée en puissance de la performance** — Doubler la mise sur les campagnes qui dépassent les objectifs en cours de flight
3. **Atténuation des risques** — Couvrir les hausses de coût dues à la pression d'enchères ou aux changements de plateforme

### Multiplicateurs saisonniers

Appliquer des multiplicateurs à la dépense hebdomadaire de base selon les motifs de demande :

| Période | Multiplicateur | Justification |
|--------|-----------|-----------|
| Saison de pointe | 1,5-2,0x | Demande la plus élevée, pression concurrentielle |
| Saison intermédiaire | 1,0-1,2x | Demande modérée, rentable |
| Hors saison | 0,5-0,8x | Demande plus faible, opportunité de construction de marque |
| Événements phares (Black Friday, etc.) | 2,0-3,0x | Demande concentrée, CPM élevés |

### Règles de réallocation basées sur des déclencheurs

Définir les règles à l'avance pour que les décisions en cours de flight soient rapides :

- Si le CPA dépasse la cible de 30 % pendant 5+ jours consécutifs, réduire la dépense de 25 % et réallouer vers le meilleur performeur
- Si le ROAS dépasse la cible de 50 % pendant 3+ jours, augmenter la dépense de 20 % depuis la réserve
- Si un canal épuise son audience (fréquence > 8), mettre en pause et déplacer le budget vers le meilleur canal suivant
- Si un concurrent lance une campagne majeure, activer la réserve pour une poussée défensive de SOV

### Cibles de rythme

- **Rythme journalier :** Dépense réelle dans les +/-10 % de la cible journalière
- **Rythme hebdomadaire :** Dépense cumulée dans les +/-5 % de la cible hebdomadaire
- **Réconciliation mensuelle :** Ajuster les semaines restantes pour atteindre la cible mensuelle

---

## Cadence de rotation créative

### Indicateurs de fatigue par plateforme

| Plateforme | Signal de fatigue | Seuil | Action |
|----------|---------------|-----------|--------|
| Meta (Facebook/Instagram) | Baisse du CTR | >20 % de baisse par rapport à la référence sur 7 jours | Rafraîchir le créatif |
| Meta | Fréquence | >4,0 pour la conversion, >6,0 pour la notoriété | Faire tourner ou élargir l'audience |
| Google Display | Baisse du CTR | >30 % de baisse par rapport à la référence | Remplacer les variantes créatives |
| YouTube | Baisse du taux de visionnage complet | >15 % de baisse par rapport à la référence | Tester de nouvelles accroches |
| LinkedIn | Baisse du CTR | >25 % de baisse par rapport à la référence | Rafraîchir le texte et l'imagerie |
| TikTok | Baisse du taux d'engagement | >20 % de baisse sur 5 jours | Remplacer par un nouveau concept |

### Cycles de rafraîchissement

- **Social (Meta, TikTok, LinkedIn) :** Toutes les 2 à 4 semaines, ou plus tôt si des signaux de fatigue apparaissent
- **Display :** Toutes les 4 à 8 semaines pour les bannières standard ; 2 à 4 semaines pour le remarketing
- **Vidéo (YouTube, CTV) :** Toutes les 6 à 8 semaines pour la production complète ; 3 à 4 semaines pour le style UGC
- **Publicités Search :** Rafraîchissement de texte trimestriel ; rotation continue des assets RSA

### Structure A/B au sein de la rotation

Maintenir au moins 3 créatifs actifs par ad set en permanence. Structurer comme : 1 performeur éprouvé (contrôle) + 1 variante itérative (évolution) + 1 test audacieux (exploration). Promouvoir les gagnants au rang de contrôle, retirer les perdants, et introduire de nouveaux tests dans un cycle continu.

---

## Synergie cross-canal

### Messages séquentiels

1. **Couche notoriété** — Les canaux de portée large (vidéo, display, social) présentent la marque ou le produit
2. **Couche considération** — Recibler les utilisateurs engagés avec du contenu plus approfondi (études de cas, démos, comparatifs)
3. **Couche conversion** — Capturer l'intention avec le search, le remarketing, et le social à réponse directe
4. **Couche fidélisation** — Réengager les clients avec l'email, le social, et des messages axés loyauté

### Attribution des rôles de canal

| Rôle | Canaux | KPI |
|------|----------|------|
| Acquisition (nouvelles audiences) | Social prospecting, search large, vidéo, programmatique | CPM, portée, taux de nouveaux visiteurs |
| Retargeting (audiences tièdes) | Display remarketing, social retargeting, email | CTR, taux de conversion, CPA |
| Fidélisation (clients existants) | Email, social organique, programmes de loyauté | LTV, taux de rachat, churn |

### Impact sur l'attribution

La synergie cross-canal complique l'attribution. Un utilisateur qui voit une publicité YouTube, clique sur une publicité de retargeting Meta, et convertit via une recherche de marque s'attribuera différemment selon le modèle. Anticiper cela en utilisant des tests d'incrémentalité en complément du reporting d'attribution, et éviter de couper des canaux qui apparaissent peu performants en dernier clic mais qui génèrent un lift de haut de tunnel.

---

## Modèle de calendrier de flight

| Semaine | Canal | Budget journalier | Créatif | Audience | Cible KPI | Notes |
|------|---------|-------------|----------|----------|------------|-------|
| S1 | Meta - Prospecting | X $/jour | Ensemble de lancement A (3 créatifs) | Intérêt large + lookalike | CPM < X $, Portée > X | Phase de lancement, surveiller la diffusion |
| S1 | Google Search - Marque | X $/jour | Ensemble RSA 1 | Mots-clés de marque | CPC < X $, CTR > X % | Base always-on |
| S2 | Meta - Prospecting | X $/jour | Ensemble A (surveiller la fatigue) | Idem + expansion | CPM < X $ | Évaluer la performance créative |
| S2 | YouTube - Notoriété | X $/jour | Montages 15s + 30s | Affinité + intention personnalisée | VTR > X %, CPV < X $ | Plafond de fréquence : 3/semaine |
| S3 | Meta - Retargeting | X $/jour | Ensemble B (témoignage) | Visiteurs du site 7-30 jours | CPA < X $ | Lancer la couche de retargeting |
| S3 | Google Search - Hors marque | X $/jour | Ensemble RSA 2 | Mots-clés de catégorie | CPA < X $ | Ajustements d'enchère basés sur S1-2 |
| S4 | Tous canaux | Ajusté | Meilleurs performeurs + nouveau test | Segments affinés | CPA consolidé < X $ | Optimisation à mi-parcours |

Étendre le calendrier pour toute la durée de la campagne. Ajouter des lignes pour chaque combinaison canal/audience. Revoir chaque semaine et annoter avec la performance réelle.

---

## Notes de planification spécifiques à la plateforme

### Google Ads
- Types de campagne : Search, Performance Max, Display, Vidéo (YouTube), Demand Gen, App
- Performance Max consolide les signaux entre canaux mais limite la visibilité ; l'exécuter en parallèle des campagnes standard pour garder le contrôle
- Budgets minimums : Aucun techniquement, mais 50-100 $/jour recommandé par campagne pour l'apprentissage
- La requête large + les enchères intelligentes est la configuration préférée de Google ; la correspondance exacte reste précieuse pour les termes à forte intention

### Meta (Facebook & Instagram)
- Types d'achat : Enchères (standard), Réservation (portée garantie pour la notoriété)
- Les campagnes Advantage+ automatisent le ciblage mais réduisent le contrôle ; à utiliser pour mettre à l'échelle des concepts éprouvés
- Budget minimum viable : 20 $/jour par ad set pour une diffusion stable
- Le volume créatif compte : prévoir 3 à 5 créatifs minimum par ad set

### LinkedIn
- Budget journalier minimum : 10 $/jour ; enchère CPC minimum : 2,00 $ (varie selon le marché)
- CPC/CPM plus élevés que les autres plateformes sociales ; idéal pour le B2B à forte LTV
- Les Matched Audiences (retargeting, listes ABM) surpassent significativement le ciblage par centre d'intérêt
- Les Document Ads et les Thought Leader Ads voient typiquement un engagement plus élevé que les formats standard

### TikTok
- Les Spark Ads (boost de publications organiques) surpassent les publicités in-feed standard en authenticité
- Budget minimum de campagne : 50 $ ; budget minimum de groupe d'annonces : 20 $/jour
- La durée de vie créative est courte (7-14 jours) ; prévoir un volume créatif élevé
- Le format vertical 9:16 est obligatoire ; le contenu horizontal réadapté sous-performe significativement

### Programmatique (DSP)
- Les deals de Private Marketplace (PMP) offrent un inventaire premium avec des prix planchers ; négocier des tarifs garantis
- L'échange ouvert offre de l'échelle mais une qualité inférieure ; utiliser des outils de sécurité de marque et des listes d'inclusion/exclusion
- Le budget minimum viable varie selon le DSP mais prévoir 5 000-10 000 $/mois pour des données significatives
- Le ciblage contextuel gagne en importance à mesure que le blocage des cookies Safari/Firefox, l'ATT, et les régimes de consentement réduisent l'adressabilité

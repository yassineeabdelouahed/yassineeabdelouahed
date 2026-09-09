# Stratégie d'enchères — Optimisation et gestion

## Arbre de décision de stratégie d'enchères par objectif

```
DÉBUT : Quel est votre objectif de campagne principal ?
│
├── Générer des conversions (leads, ventes, inscriptions)
│   ├── Avez-vous un CPA cible ? ──────────────────→ CPA cible (tCPA)
│   │   └── Volume suffisant ? (30+ conv/mois) → Oui : tCPA | Non : Maximiser les conversions
│   ├── Avez-vous un ROAS cible ? ─────────────────→ ROAS cible (tROAS)
│   │   └── Volume suffisant ? (50+ conv/mois) → Oui : tROAS | Non : Maximiser la valeur de conversion
│   └── Pas de cible spécifique ? ─────────────────→ Maximiser les conversions (sans plafond)
│
├── Générer du trafic / des clics
│   ├── Clics rentables ? ────────────────────→ Maximiser les clics (fixer un plafond de CPC)
│   └── Focus engagement ? ─────────────────────→ Maximiser les clics (sans plafond)
│
├── Construire la notoriété / la portée
│   ├── Objectif de part d'impressions ? ──────────────→ Part d'impressions cible
│   ├── Portée maximale ? ──────────────────────→ Enchères CPM (Meta, TikTok, Programmatique)
│   └── Vues vidéo ? ───────────────────────→ Enchères CPV / ThruPlay
│
└── Besoin d'un contrôle manuel complet
    ├── Volume très faible (<15 conv/mois) ? ──→ CPC manuel
    ├── Contraintes réglementaires / de conformité ? → CPC manuel
    └── Test de nouvelles campagnes ? ─────────────→ CPC manuel → transition vers l'automatisé
```

## Comparaison des stratégies d'enchères entre plateformes

| Stratégie | Google Ads | Meta Ads | LinkedIn Ads | TikTok Ads | Programmatique (DSP) |
|---|---|---|---|---|---|
| Max de conversions | Maximiser les conversions | Maximiser les conversions | Maximiser les conversions | Conversion maximale | Auto-optimisation vers la conversion |
| CPA cible | tCPA | Objectif de coût par résultat | Coût cible | Plafond de coût | CPA cible |
| ROAS cible | tROAS | Objectif ROAS (Adv+) | N/A | Objectif ROAS | ROAS cible |
| Max de clics | Maximiser les clics | Maximiser les clics sur le lien | Maximiser les clics | Maximiser les clics | Optimisation max de clics |
| Basé sur l'impression | Part d'impr. cible | Maximiser la portée (CPM) | N/A | Portée (CPM) | CPM fixe / plancher |
| Manuel | CPC manuel | Plafond d'enchère | Enchère manuelle | Plafond d'enchère | CPM fixe / enchère max |
| Basé sur la valeur | Valeur de conv. max | Valeur la plus élevée | N/A | Valeur max | Maximiser le revenu |

## Gestion de la phase d'apprentissage

### Qu'est-ce que la phase d'apprentissage ?
Lorsque vous lancez une nouvelle campagne ou effectuez des changements significatifs, l'algorithme de la plateforme a besoin de données pour optimiser la diffusion. Pendant cette période, la performance fluctue tandis que le système explore quels utilisateurs, emplacements et moments convertissent le mieux.

### Durée de la phase d'apprentissage par plateforme

| Plateforme | Durée typique | Conversions nécessaires | Déclencheurs de réinitialisation |
|---|---|---|---|
| Google Ads | 1–2 semaines | 30–50 conversions | Changement de budget >20 %, changement de stratégie d'enchères, changement d'action de conversion |
| Meta Ads | 7 jours (ou 50 conversions) | 50 conversions par ad set | Changement de budget >20 %, changement d'enchère, changement d'audience, changement de créatif, pause de 7 jours |
| LinkedIn Ads | 1–2 semaines | ~15 conversions | Changement d'enchère, changement d'audience, changement de budget |
| TikTok Ads | 4–7 jours (ou 50 conversions) | 50 conversions par groupe d'annonces | Changement de budget >50 %, changement d'enchère, changement de ciblage |
| Programmatique | Varie selon le DSP | Dépend de la campagne | Changements majeurs de ciblage ou de budget |

### Bonnes pratiques de la phase d'apprentissage
- [ ] Ne pas faire de changements pendant la phase d'apprentissage — laisser l'algorithme se stabiliser
- [ ] Fixer des budgets suffisamment élevés pour générer les conversions requises dans la fenêtre
- [ ] Utiliser un ciblage plus large au lancement pour donner à l'algorithme de la marge pour explorer
- [ ] Regrouper vos changements — faire toutes les modifications en une fois plutôt que des ajustements incrémentaux
- [ ] Si le CPA est 3x+ supérieur à la cible pendant l'apprentissage, envisager de mettre en pause et de restructurer
- [ ] Suivre les statuts « Apprentissage » et « Apprentissage limité » — ce dernier signale des données insuffisantes
- [ ] Prévoir un CPA supérieur de 20 à 30 % pendant l'apprentissage comme coût normal de l'optimisation

### Formule de budget de la phase d'apprentissage
```
Budget quotidien minimum = CPA cible x 5 (Google)
Budget quotidien minimum = CPA cible x 10 (Meta, TikTok)

Exemple : Si le CPA cible = 50 $
  Google : 250 $/jour minimum par campagne
  Meta :   500 $/jour minimum par ad set
```

## Stratégies d'enchères de portefeuille (Google Ads)

### Qu'est-ce qu'une stratégie de portefeuille ?
Les stratégies d'enchères de portefeuille appliquent une seule stratégie d'enchères automatisée à travers plusieurs campagnes, permettant à l'algorithme d'optimiser de manière holistique plutôt que campagne par campagne.

### Types de stratégies de portefeuille

| Stratégie | Fonctionnement | Idéal pour |
|---|---|---|
| Portefeuille tCPA | Fait la moyenne du CPA entre campagnes | Plusieurs campagnes avec le même objectif de CPA |
| Portefeuille tROAS | Fait la moyenne du ROAS entre campagnes | E-commerce avec des campagnes produit variées |
| Portefeuille Max de clics | Maximise le total des clics entre campagnes | Configurations multi-campagnes axées sur le trafic |
| Portefeuille Part d'impressions cible | Maintient la part d'impressions entre campagnes | Défense de marque sur plusieurs termes de marque |

### Quand utiliser les stratégies de portefeuille
- [ ] 3+ campagnes partageant le même objectif de conversion
- [ ] Les campagnes individuelles ont un faible volume de conversion (< 30/mois)
- [ ] Vous voulez que le système déplace le budget vers les campagnes les plus performantes
- [ ] Campagnes saisonnières où le volume fluctue
- [ ] Campagnes de marque où la cohérence de la part d'impressions compte

### Checklist de stratégie de portefeuille
- [ ] Regrouper les campagnes avec des objectifs et des types de conversion similaires
- [ ] Fixer une cible partagée (CPA ou ROAS) qui reflète la moyenne du portefeuille
- [ ] Minimum 50 conversions totales par mois à travers le portefeuille
- [ ] Surveiller la performance de chaque campagne individuelle — ne pas laisser une campagne être privée de budget
- [ ] Revoir et ajuster les cibles trimestriellement selon les objectifs métier

## Ajustements d'enchères

### Types d'ajustements et plages

| Dimension | Disponible sur | Plage | Quand l'utiliser |
|---|---|---|---|
| Appareil (Mobile, Bureau, Tablette) | Google, Microsoft | -100 % à +900 % | Écart de performance significatif entre appareils |
| Localisation (géo) | Google, Microsoft | -90 % à +900 % | Variation de performance régionale |
| Audience (RLSA, In-Market, etc.) | Google, Microsoft | -90 % à +900 % | Segments d'audience à haute valeur |
| Heure de la journée / Jour de la semaine | Google, Microsoft | -90 % à +900 % | B2B (heures ouvrées), commerces locaux |
| Démographie (âge, genre, revenu) | Google, Microsoft | -90 % à +900 % | Différences de performance démographique claires |
| Emplacement (sites web, apps) | Meta (enchère manuelle) | Varie | Emplacements sur/sous-performants |

### Cadre de décision d'ajustement d'enchère

| Écart de performance | Ajustement recommandé | Période de revue |
|---|---|---|
| Taux de conv. 50 %+ plus élevé | +20 % à +50 % | Attendre la significativité statistique (100+ clics) |
| Taux de conv. 20–50 % plus élevé | +10 % à +20 % | 2 à 4 semaines de données |
| Taux de conv. dans les 20 % | Pas d'ajustement | Variance normale |
| Taux de conv. 20–50 % plus bas | -10 % à -30 % | 2 à 4 semaines de données |
| Taux de conv. 50 %+ plus bas | -30 % à -60 % | Envisager l'exclusion plutôt |
| Zéro conversion, forte dépense | -100 % (exclure) | Après 3x la dépense du CPA |

### Remarques importantes sur les ajustements d'enchères + les enchères intelligentes
- **Les enchères intelligentes (tCPA, tROAS, Max de conversions) ajustent déjà les enchères** par appareil, localisation, heure, audience, et plus
- Superposer des ajustements d'enchère manuels par-dessus les enchères intelligentes crée des **effets cumulatifs** et peut provoquer de l'instabilité
- Le seul ajustement d'enchère qui fonctionne avec les enchères intelligentes : **appareil -100 %** (pour exclure complètement un appareil)
- Pour les campagnes en enchères intelligentes, optimiser via le **ciblage et les signaux d'audience**, pas les ajustements d'enchère

## Enchères manuelles vs automatisées

### Matrice de comparaison

| Facteur | Enchères manuelles | Enchères automatisées |
|---|---|---|
| Contrôle | Total — vous fixez chaque enchère | Limité — l'algorithme décide |
| Exigence de données | Faible (peut fonctionner avec peu de conversions) | Élevée (30–50+ conversions/mois) |
| Vitesse d'optimisation | Lente (limitée par l'humain) | Rapide (signaux d'enchère en temps réel) |
| Utilisation des signaux | Limitée aux métriques visibles | Utilise plus de 100 signaux par enchère |
| Investissement temps | Élevé (surveillance et ajustement quotidiens) | Faible (fixer la stratégie, surveiller les résultats) |
| Idéal pour | Faible volume, conformité stricte, test | Échelle, performance, efficacité |
| Risque | Sous-optimisation (signaux manqués) | Surdépense pendant la phase d'apprentissage |

### Chemin de transition : Manuel vers automatisé
1. **Commencer avec le CPC manuel** — établir le CPA et le volume de conversion de référence
2. **Accumuler 30+ conversions/mois** — donnée minimale pour l'enchère automatisée
3. **Passer à Maximiser les conversions (sans plafond)** — laisser l'algorithme apprendre sans contraintes
4. **Après 2 à 4 semaines, ajouter tCPA** — fixer la cible 10 à 20 % au-dessus du CPA moyen actuel
5. **Resserrer graduellement la cible** — réduire tCPA par paliers de 5 à 10 % toutes les 2 semaines
6. **Surveiller l'arbitrage volume vs efficacité** — des cibles plus strictes réduisent le volume

## Ajustements de saisonnalité

### Ajustements de saisonnalité Google Ads
- [ ] Utiliser l'outil Ajustements de saisonnalité dans Google Ads pour les **événements de courte durée** (1 à 7 jours)
- [ ] Saisir le changement de taux de conversion attendu (par exemple, +30 % pour le Black Friday)
- [ ] Définir la plage de dates, l'appareil et la portée de campagne
- [ ] L'algorithme préajuste les enchères pour la période de l'événement puis revient à la normale ensuite
- [ ] Non nécessaire pour les évolutions saisonnières progressives — les enchères intelligentes les apprennent de manière organique

### Calendrier de planification saisonnière

| Saison / Événement | Impact typique | Planification anticipée |
|---|---|---|
| Q4 fêtes de fin d'année (nov.–déc.) | CPM +30–80 %, TdC +20–40 % | Budget approuvé en septembre ; créatif en octobre |
| Black Friday / Cyber Monday | CPM +50–100 %, TdC +30–60 % | Campagnes en ligne 1 à 2 semaines à l'avance pour l'apprentissage |
| Rentrée scolaire (juil.–sept.) | CPM +10–20 % | Planifier en juin |
| Saint-Valentin / Fête des Mères | Pics de CPM spécifiques à la catégorie | 3 à 4 semaines à l'avance |
| Après-fêtes (janvier) | CPM baisse de 30–50 %, opportunité d'efficacité | Planifier les campagnes de janvier en décembre |
| Événements spécifiques au secteur | Varie | Cartographier le calendrier saisonnier de votre verticale |

### Cadre d'allocation budgétaire saisonnière
```
Budget mois standard :  100 % (référence)
Mois pré-pic :          120–140 % (construire les audiences, tester le créatif)
Mois de pic :           150–200 % (maximiser la capture pendant la période à forte intention)
Mois post-pic :         80–90 % (gains d'efficacité, CPM plus bas)
```

## Rythme budgétaire

### Modèles de rythme

| Modèle | Description | Idéal pour |
|---|---|---|
| **Rythme régulier (standard)** | Répartir le budget uniformément sur la période | La plupart des campagnes ; diffusion prévisible |
| **Rythme accéléré** | Dépenser aussi vite que possible | Offres à durée limitée, événements, ventes flash |
| **Chargé en début de période** | Forte dépense en début de période, puis atténuation | Lancements de produit, pics de notoriété |
| **Chargé en fin de période** | Faible dépense en début, montée en puissance | Événements commerciaux, construction vers une échéance |
| **Par tranche horaire (dayparting)** | Concentrer la dépense sur des heures spécifiques | B2B (heures ouvrées), restaurants (heures de repas) |

### Checklist de surveillance du rythme
- [ ] Vérifier la dépense quotidienne par rapport au rythme quotidien attendu (budget total / jours de la période)
- [ ] Seuil d'alerte : +/-15 % hors rythme pendant 3+ jours consécutifs
- [ ] Correctif sous-rythme : élargir le ciblage, augmenter les enchères, ajouter des emplacements
- [ ] Correctif sur-rythme : resserrer le ciblage, réduire les enchères, ajouter des plafonds de fréquence
- [ ] Utiliser des règles automatisées ou des scripts pour des alertes quotidiennes de rythme
- [ ] Tenir compte de la variance semaine/week-end (B2B chargé en semaine, B2C chargé le week-end)

### Formule de rythme budgétaire
```
Dépense quotidienne attendue = Budget total / Nombre total de jours de campagne
% de rythme réel = (Dépense à ce jour / Dépense attendue à ce jour) x 100

Dans le rythme :  95–105 %
Légèrement hors rythme : 85–95 % ou 105–115 %
Action requise : <85 % ou >115 %
```

## Coordination des enchères cross-plateforme

### Allocation budgétaire multi-plateforme

| Plateforme | Rôle dans le mix média | Part de budget (typique) | KPI principal |
|---|---|---|---|
| Google Search | Capture de la demande | 30–40 % | CPA, ROAS |
| Meta Ads | Génération de demande + retargeting | 20–30 % | CPA, ROAS, CPL |
| YouTube / CTV | Notoriété + considération | 10–15 % | CPV, VCR, Brand Lift |
| LinkedIn | Génération de demande B2B | 10–15 % (B2B) | CPL, taux de SQL |
| TikTok | Découverte + notoriété | 5–15 % | CPA, engagement |
| Display programmatique | Retargeting + portée | 5–10 % | CPM, viewability |

### Stratégie d'optimisation cross-plateforme
- [ ] Établir un suivi de conversion unifié (GA4, CDP, ou plateforme d'attribution)
- [ ] Utiliser une taxonomie UTM cohérente sur toutes les plateformes
- [ ] Fixer des cibles CPA/ROAS spécifiques à chaque plateforme qui remontent vers un objectif global
- [ ] Déplacer le budget vers les plateformes ayant la meilleure incrémentalité (pas seulement le dernier clic)
- [ ] Exécuter des tests avec groupe témoin par plateforme pour mesurer l'impact incrémental réel
- [ ] Reporting cross-plateforme hebdomadaire pour identifier la sur/sous-investissement
- [ ] Tenir compte du chevauchement d'attribution — Google et Meta revendiqueront tous deux les mêmes conversions

## Guide de dépannage

| Symptôme | Cause probable | Diagnostic | Correctif |
|---|---|---|---|
| Le CPA a bondi après un changement de stratégie d'enchères | Réinitialisation de la phase d'apprentissage | Vérifier le statut « Apprentissage » | Attendre 2 semaines ; revenir en arrière si le CPA > 3x la cible |
| Le budget ne se dépense pas (sous-diffusion) | Cible trop restrictive | Vérifier la part d'impressions perdue par classement | Augmenter tCPA/tROAS de 10–20 % ou élargir le ciblage |
| Dépense trop rapide, mauvais CPA | Cible trop lâche ou algorithme qui poursuit le volume | Revoir la qualité des conversions | Resserrer tCPA, vérifier les conversions parasites, revoir les termes de recherche |
| Statut « Apprentissage limité » | Conversions insuffisantes | Besoin de 50+ conversions en 7 jours (Meta) | Consolider les ad sets, élargir l'audience, augmenter le budget |
| Dépense quotidienne erratique | L'algorithme explore | Normal dans les 7 à 14 premiers jours | Surveiller les moyennes hebdomadaires, pas quotidiennes ; ajuster seulement si le CPA hebdomadaire est hors cible |
| Bon CPA mais faible volume | Cible trop agressive | Part d'impressions perdue par budget/classement | Augmenter tCPA de 10 %, augmenter le budget, ajouter des mots-clés/audiences |
| Forte part d'impressions mais faibles conversions | Gagne les mauvaises enchères | Vérifier les termes de recherche, le chevauchement d'audience | Ajouter des négatifs, affiner les audiences, vérifier le taux de conversion de la landing page |
| Dégradation de performance dans le temps | Fatigue d'audience, pression concurrentielle | Vérifier la fréquence, les insights d'enchère | Rafraîchir le créatif, élargir les audiences, tester de nouveaux canaux |
| La stratégie de portefeuille prive une campagne de budget | Distribution de performance inégale | Revoir les métriques par campagne | Envisager de retirer le moins performant du portefeuille ou d'ajuster la structure |

### Protocole de changement de stratégie d'enchères
1. Documenter la performance actuelle (CPA, ROAS, volume, dépense) comme référence
2. Effectuer le changement pendant une période de faible trafic (lundi matin, pas vendredi après-midi)
3. Ne rien changer d'autre simultanément (créatif, ciblage, budget)
4. Laisser la phase d'apprentissage se terminer avant d'évaluer (2 semaines minimum)
5. Comparer au niveau hebdomadaire, pas quotidien
6. Cadre de décision : si le CPA de la semaine 3 est dans les 20 % de la cible, continuer ; si 20–50 % au-dessus, ajuster la cible ; si 50 %+ au-dessus, revenir en arrière et diagnostiquer

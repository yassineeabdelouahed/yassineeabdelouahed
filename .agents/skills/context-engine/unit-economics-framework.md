# Cadre de l'unité économique

Toute stratégie marketing se résout finalement en une seule question : le revenu d'un client dépasse-t-il le coût de son acquisition, avec une marge suffisante pour soutenir et faire croître l'entreprise ?

Si la réponse est non, aucune création astucieuse ni ciblage sophistiqué ne sauvera la stratégie. Si la réponse est oui, chaque décision de canal devient une question de comment monter en échelle efficacement.

Ce cadre est la fondation. Chaque recommandation de ce plugin — sélection de canal, allocation budgétaire, approbation de campagne, décisions de mise à l'échelle — se vérifie par rapport à l'unité économique.

## Les indicateurs fondamentaux

### Coût d'acquisition client (CAC)

```
CAC = Coût total marketing et ventes / Nombre de nouveaux clients acquis
```

**Ce qui entre dans le coût total marketing et ventes :**

- Dépense publicitaire (Google, Meta, LinkedIn, TikTok, programmatique, etc.)
- Frais d'agence
- Salaires de l'équipe marketing (chargés des avantages sociaux)
- Coûts des logiciels marketing (CRM, CDP, MAP, analytique, outils de design, etc.)
- Coûts de création de contenu (rédacteurs, designers, vidéastes, freelances)
- Coûts d'événements (parrainages, stands, événements organisés)
- Coûts de l'équipe commerciale (pour le B2B, si le marketing génère les leads que les ventes convertissent)

**Comment calculer le CAC à plusieurs niveaux :**

- **CAC mixte :** coût total marketing+ventes / total des nouveaux clients. Chiffre phare. À utiliser pour le reporting au conseil d'administration.
- **CAC par canal :** pour chaque canal, quel est le coût par client. À utiliser pour l'optimisation de canal.
- **CAC par segment :** pour chaque segment de clientèle, quel est le coût par client. À utiliser pour la priorisation de segment.
- **CAC par cohorte :** pour chaque cohorte d'acquisition (semaine ou mois), quel était le CAC. À utiliser pour l'analyse de tendance.

Les compétences qui recommandent des changements de canal citent toujours le CAC par canal, pas le CAC mixte.

### Valeur vie client (LTV)

```
LTV = Revenu moyen par client × Durée de vie client moyenne × Marge brute
```

**La marge brute est critique** — sans elle, la LTV surestime la contribution aux frais généraux et à la croissance.

**Méthodes de calcul de la LTV :**

- **Basée sur les cohortes :** Prendre une cohorte de clients acquis il y a N mois. Suivre leur revenu cumulé. Plus N est long, plus c'est précis mais plus les données sont anciennes.
- **Probabiliste :** Utiliser l'analyse de survie ou des modèles BG/NBD. Meilleur pour les entreprises d'abonnement.
- **Prédictive :** Utiliser l'apprentissage automatique sur les attributs client pour prédire la LTV à l'acquisition. Utile pour la prédiction en phase précoce.

Pour une entreprise en phase précoce sans données historiques, **estimer la LTV avec des hypothèses explicites** :

> Estimation de LTV : ARPU 2 400 INR par mois × durée d'abonnement estimée à 14 mois × marge brute de 65 % = 21 840 INR
> Hypothèse : durée de 14 mois basée sur le repère de catégorie ; à réviser lorsque des données de cohorte sur 12 mois sont disponibles.

L'estimation est acceptable tant que les hypothèses sont explicites et révisables.

### Ratio LTV:CAC

```
Ratio LTV:CAC = LTV / CAC
```

**Seuils de santé (norme du secteur) :**

| Ratio | Statut | Implication |
|---|---|---|
| **≥ 3,0** | Sain | Trajectoire de croissance durable. Monter en échelle avec confiance. |
| **2,0-3,0** | Avertissement | Marginalement rentable. Optimiser le CAC à la baisse ou la LTV à la hausse avant de monter en échelle. |
| **< 2,0** | Critique | Le marketing détruit de la valeur. Arrêter la mise à l'échelle, corriger d'abord l'unité économique. |
| **> 5,0** | À examiner | Signale souvent un sous-investissement en marketing — pourrait croître plus vite avec plus de dépense. |

Le seuil de 3,0 est le **minimum** pour une entreprise durable. Au-dessus de 3,0, c'est sain. Au-dessus de 5,0, cela signale souvent un sous-investissement — l'entreprise pourrait croître plus vite en dépensant davantage.

### Période de retour sur investissement (payback)

```
Période de retour = CAC / (Contribution mensuelle du client moyen)
```

Pour les entreprises d'abonnement, la période de retour est critique. Une longue période de retour signifie que la trésorerie est immobilisée dans l'acquisition client ; une courte période de retour signifie que la trésorerie se recycle rapidement en davantage d'acquisition.

**Repères de santé :**

| Période | Implication |
|---|---|
| < 12 mois | Excellent pour une entreprise d'abonnement |
| 12-18 mois | Sain pour le SaaS B2B |
| 18-24 mois | Gérable si LTV:CAC > 4 |
| > 24 mois | Risque de tension de trésorerie ; bilan solide nécessaire |

Pour les entreprises hors abonnement (achat ponctuel), le retour est la contribution du premier achat divisée par le CAC.

## Où ces indicateurs se situent dans l'engagement

- **Document central 3.1 (analyse business et SBU), étape 4** — capture l'unité économique de chaque SBU
- **Document central 3.4 (DMFlow), étape 5** — utilise le LTV:CAC pour fixer l'allocation budgétaire de canal
- **Fichier d'instructions vivant du projet** — le CAC mixte actuel, la LTV, le ratio, le retour sont visibles dans la section « Vérité actuelle »
- **Rapport de performance mensuel** — la performance est rapportée par CAC de canal vs objectif, avec tendance
- **Revue de stratégie trimestrielle** — audit complet de l'unité économique, ajustements aux documents source si nécessaire

## Comment les recommandations se vérifient par rapport à l'unité économique

Chaque recommandation de canal, chaque allocation budgétaire, chaque approbation de campagne devrait vérifier :

1. **Cela maintient-il un LTV:CAC ≥ 3,0 ?** Sinon, la recommandation doit expliquer pourquoi quand même (par exemple, investissement de marque à long terme avec ROI différé).
2. **Cela reste-t-il dans la tolérance de retour ?** Sinon, la recommandation doit traiter l'impact sur la trésorerie.
3. **L'hypothèse de LTV est-elle toujours valide ?** Si le mix de canaux se déplace vers des segments à plus faible LTV, la LTV mixte peut décliner — recalculer.

Les compétences qui formulent des recommandations sans montrer cette vérification produisent des suggestions à l'instinct qui peuvent détruire l'unité économique.

## Erreurs courantes

1. **CAC sans le coût de l'équipe commerciale (B2B).** Si le marketing génère les leads mais que les ventes les concluent, le coût des ventes fait partie du CAC. L'exclure fait paraître le marketing plus efficace qu'il ne l'est.

2. **LTV utilisant le revenu brut plutôt que le revenu ajusté à la marge.** Une vente de 10 000 INR à 30 % de marge brute contribue 3 000 INR à la LTV — pas 10 000 INR. La marge compte.

3. **Calculer la LTV à partir d'un achat de produit unique alors que l'entreprise dépend du renouvellement.** Pour les entreprises d'abonnement / de consommables, la LTV doit inclure des hypothèses de rétention.

4. **Utiliser la LTV moyenne du secteur au lieu de la LTV spécifique à la marque.** Les moyennes sectorielles sont des points de départ ; les données spécifiques à la marque priment toujours.

5. **Ne pas revoir l'unité économique à mesure que l'entreprise monte en échelle.** Le CAC augmente généralement en montant en échelle (saturation d'audience, environnements d'enchères plus coûteux). La LTV peut baisser si la mise à l'échelle attire des clients de moindre qualité. Recalculer chaque trimestre.

6. **Ignorer le retour dans les entreprises à trésorerie contrainte.** Une entreprise avec 3 crore INR en banque et une combustion mensuelle de 50 lakh INR ne peut pas soutenir une période de retour de 24 mois, peu importe la qualité apparente du LTV:CAC.

## Outils utilisés par le plugin

Le plugin inclut des scripts qui calculent et suivent l'unité économique :

- `scripts/roi-calculator.py` — ROI au niveau de la campagne avec sélection de modèle d'attribution
- `scripts/clv-calculator.py` — modèles de LTV basés sur les cohortes et probabilistes
- `scripts/budget-optimizer.py` — réallocation budgétaire de canal respectant les contraintes LTV:CAC
- `scripts/revenue-forecaster.py` — prévision de revenu avec saisonnalité
- `scripts/revenue-simulator.py` — simulation de revenu Monte Carlo avec scénarios
- `scripts/churn-predictor.py` — prédiction du risque de churn éclairant les calculs de LTV

Ces scripts sont appelés par les compétences selon les besoins. Ils produisent un résultat lisible par machine que les compétences consomment.

## Références liées

- [four-core-documents-spec.md](four-core-documents-spec.md) — document central 3.1, étape 4 (unité économique)
- [in-market-out-market.md](in-market-out-market.md) — décisions de répartition budgétaire
- [decision-framework.md](decision-framework.md) — prise de décision multidimensionnelle
- [three-scenario-forecasting.md](three-scenario-forecasting.md) — projeter l'unité économique
</content>

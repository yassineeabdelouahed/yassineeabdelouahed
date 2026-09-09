# Analyse d'écarts du tunnel — Cadre & priorisation

## Méthodologie d'identification des écarts

### Analyse basée sur les données

1. **Récupérer les métriques du tunnel** pour chaque étape (volume, taux de conversion, temps passé à l'étape)
2. **Comparer aux benchmarks** de funnel-templates.md pour votre modèle économique
3. **Calculer l'abandon** entre chaque étape : % d'abandon = 1 - (Étape N+1 / Étape N)
4. **Identifier les valeurs aberrantes** : toute étape avec un taux de conversion >20 % en dessous du benchmark est un écart
5. **Analyse de tendance** : une étape se dégrade-t-elle dans le temps ? (même si actuellement au-dessus du benchmark)

### Signaux qualitatifs

- Retours clients mentionnant de la friction à des étapes précises
- L'équipe commerciale rapportant des objections communes ou des points d'abandon
- Tickets de support se concentrant autour de moments précis du parcours
- Enregistrements de session montrant la confusion ou l'abandon de l'utilisateur
- Scores NPS/CSAT qui chutent à des points de contact précis

---

## Schémas d'écarts communs par modèle économique

### SaaS B2B
| Schéma d'écart | Symptôme | Cause probable |
|-------------|---------|-------------|
| Écart de notoriété | Faible trafic organique, mauvais volume de recherche de marque | Stratégie de contenu faible, mauvais SEO |
| Écart d'activation | Taux d'inscription élevé, faible usage du produit | Mauvais onboarding, temps jusqu'à la valeur peu clair |
| Écart MQL→SQL | Le marketing génère des leads, les ventes les rejettent | Notation de lead mal alignée, mauvaise audience |
| Écart essai→payant | Les utilisateurs essaient mais ne convertissent pas | Friction tarifaire, démonstration de valeur insuffisante |
| Écart d'expansion | Les clients restent mais ne se développent pas | Aucun déclencheur d'upsell, manque de connaissance des fonctionnalités |

### E-commerce
| Schéma d'écart | Symptôme | Cause probable |
|-------------|---------|-------------|
| Écart de découverte | Faible trafic malgré de bons produits | Problème de distribution, mauvais mix de canaux |
| Écart navigation→panier | Trafic élevé, peu d'ajouts au panier | Adéquation produit-marché, tarification, problèmes d'UX |
| Abandon de panier | Taux d'abandon de 70 %+ | Coûts surprises, paiement complexe, déficit de confiance |
| Écart d'achat répété | Les acheteurs uniques ne reviennent pas | Aucun programme de rétention, mauvaise expérience post-achat |

### Services B2B
| Schéma d'écart | Symptôme | Cause probable |
|-------------|---------|-------------|
| Écart de confiance | Trafic mais pas de demandes | Preuve sociale insuffisante, leadership éclairé insuffisant |
| Écart de consultation | Les leads demandent mais ne réservent pas | Réponse lente, friction dans le processus de réservation |
| Écart de proposition | Beaucoup de propositions, faible taux de succès | Tarification, positionnement, ou qualité de la proposition |

---

## Notation de sévérité des écarts

### Cadre ICE (Impact × Confiance × Facilité)

Noter chaque écart identifié sur trois dimensions (1-10) :

| Dimension | Ce qu'elle mesure | Guide de notation |
|-----------|-----------------|---------------|
| **Impact** | Combien de chiffre d'affaires/croissance corriger cet écart débloquerait | 10 = >50 % d'amélioration, 5 = 10-25 %, 1 = <5 % |
| **Confiance** | À quel point sommes-nous sûrs qu'il s'agit du vrai problème et que notre correction fonctionnera | 10 = étayé par des données, testé auparavant, 5 = estimation éclairée, 1 = spéculation |
| **Facilité** | À quel point est-il facile de mettre en œuvre la correction | 10 = le jour même, sans développement, 5 = 1-2 semaines, 1 = des mois + ingénierie |

**Score ICE** = (Impact + Confiance + Facilité) / 3

### Niveaux de priorité

| Score ICE | Priorité | Action |
|-----------|----------|--------|
| 8-10 | P1 — Immédiat | Corriger cette semaine |
| 6-7,9 | P2 — Court terme | Planifier pour le prochain sprint/mois |
| 4-5,9 | P3 — Backlog | Programmer quand les ressources le permettent |
| <4 | P4 — À surveiller | Suivre mais ne pas investir pour l'instant |

---

## Cartographie écart-vers-action

| Type d'écart | Tactiques recommandées |
|----------|-------------------|
| **Écart de notoriété** | Marketing de contenu, SEO, social payant, RP, partenariats d'influenceurs |
| **Écart de considération** | Contenu comparatif, études de cas, webinaires, retargeting |
| **Écart de confiance** | Preuve sociale, avis, couverture média, certifications de sécurité |
| **Écart d'activation** | Optimisation de l'onboarding, guidage in-app, jalons de réussite |
| **Écart de conversion** | CRO, optimisation tarifaire, urgence/rareté, simplification du paiement |
| **Écart de rétention** | Nurturing par email, programmes de fidélité, campagnes d'adoption de fonctionnalités |
| **Écart d'expansion** | Déclencheurs d'upsell, alertes basées sur l'usage, prospection par la réussite client |
| **Écart de parrainage** | Programmes de parrainage, suivi NPS, campagnes de défense de marque |

---

## Cadre de mesure

### Suivi avant/après

Pour chaque correction d'écart, documenter :

1. **Métrique de référence** : taux de conversion de l'étape avant la correction (2-4 semaines de données)
2. **Description de la correction** : exactement ce qui a été changé
3. **Date de mise en œuvre** : quand la correction est entrée en vigueur
4. **Métrique post-correction** : taux de conversion de l'étape après la correction (2-4 semaines de données)
5. **Signification statistique** : le changement était-il significatif ou dans la variance normale ?
6. **Impact sur le chiffre d'affaires** : changement de chiffre d'affaires estimé issu de l'amélioration du taux de conversion

### Calculer l'impact sur le chiffre d'affaires d'une correction d'écart

```
Chiffre d'affaires mensuel actuel : X $
Taux de conversion de l'étape (avant) : A%
Taux de conversion de l'étape (après) : B%
Multiplicateur d'amélioration : B/A

Hausse de chiffre d'affaires estimée = X $ × (B/A - 1) × [poids de cette étape dans le tunnel global]
```

### Surveillance continue de la santé du tunnel

- **Hebdomadaire** : vérifier les taux de conversion à chaque étape, signaler les anomalies
- **Mensuel** : analyse complète du tunnel, comparaison aux benchmarks, mise à jour des priorités d'écarts
- **Trimestriel** : revue stratégique du tunnel, réévaluation de l'architecture, planification du prochain cycle d'optimisation

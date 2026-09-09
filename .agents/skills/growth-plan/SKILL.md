---
name: growth-plan
description: "Produire le Growth Plan en 11 sections — le livrable phare orienté client de la Partie 8, qui synthétise les Parties 1-7 de l'engagement en une seule stratégie exécutable de 20-30 pages avec des prévisions à trois scénarios, une répartition budgétaire In-Market/Out-Market, et un calendrier 30/60/90, exportée en PDF et DOCX. Se déclenche sur « /digital-marketing-pro:growth-plan », « produce the growth plan », « write the strategy document for the client », « run part 8 », « synthesise the engagement into one deliverable ». Nécessite les Parties 1-7 terminées ; lit les Four Core Documents, le Living Project Instruction File et les documents de préparation de la Partie 7, et se combine avec /digital-marketing-pro:yearly-planner."
user-invocable: true
triggers:
  - produce the growth plan
  - generate flagship client deliverable
  - run part 8 growth plan
  - synthesise the engagement into a growth plan
  - write the strategy document for the client
  - 11-section growth plan
allowed-tools: Read Write Edit Bash Glob Grep
engagement-part: "8"
view-preference: v2-primary
---

# /digital-marketing-pro:growth-plan — Livrable phare de la Partie 8

Le Growth Plan est le livrable phare orienté client. Il synthétise chaque document
interne produit dans les Parties 1 à 7 en un seul récit en 11 sections répondant à :
*« Comment allons-nous faire croître cette entreprise numériquement, et à quel coût ? »*

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** pour tout fichier référencé, puis `Read`
uniquement les plages correspondantes avec `offset` + `limit`. Lister le répertoire de
données de la marque (`~/.claude-marketing/brands/{slug}/`, ou
`$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` si cette variable
d'environnement est définie) avant d'ouvrir des fichiers. Lors d'une réinvocation en
cours de session, ignorer les fichiers déjà dans le contexte.

**Spécification :** [growth-plan-template.md](../context-engine/growth-plan-template.md) —
la structure canonique en 11 sections.

## Conditions préalables

Avant de produire le Growth Plan, vérifier :

1. **Parties 1–7 terminées** dans l'engagement
2. **Four Core Documents à la version canonique** (v2 si des ré-exécutions ont eu lieu, v1 sinon)
3. **Living Project Instruction File à jour** — reflète les faits stratégiques actuels
4. **Documents de préparation de la Partie 7 terminés** — architecture de campagne,
   conventions de nommage, arbre de KPI, piliers de contenu, inventaire des actifs,
   chaînes d'approbation

Si une condition préalable échoue, NE PAS produire. Instruire l'utilisateur.

## Les 11 sections

| # | Section | Longueur | Source |
|---|---------|--------|--------|
| 1 | Executive Summary | 1 page | Synthèse |
| 2 | Business Context | 2-3 pages | Core Doc 3.1 + Part 4.4 + Part 4.2 |
| 3 | Target Audience | 2-3 pages | Core Doc 3.2 |
| 4 | Strategic Positioning | 2 pages | Core Doc 3.3 |
| 5 | Channel Strategy | 3-4 pages | Core Doc 3.4 + Part 9 channel docs |
| 6 | Budget & Media Plan | 2-3 pages | Core Doc 3.4 Step 5 + 9 |
| 7 | KPI Framework | 2 pages | Part 7 KPI tree |
| 8 | Implementation Timeline | 2-3 pages | Part 7 + 30/60/90 framework |
| 9 | Team & Resource Plan | 1-2 pages | Contexte d'engagement |
| 10 | Risk & Contingency | 1-2 pages | Core Doc 3.1 Step 16 |
| 11 | Expected Outcomes | 2 pages | Prévisions à trois scénarios |

Longueur cible totale : **20–30 pages**. Au-delà de 30, les clients arrêtent de lire.

## Processus de production

### Étape 1 : Lire les documents sources

Ordre de lecture (version canonique de chacun) :

1. Living Project Instruction File (vérité actuelle)
2. Core Doc 3.1 Business & SBU Analysis
3. Core Doc 3.2 Segmentation Framework
4. Core Doc 3.3 Brand Positioning & Communications
5. Core Doc 3.4 DMFlow
6. Documents de la Partie 4 (4.1, 4.2, 4.3, 4.4)
7. Documents de préparation de la Partie 7 (architecture de campagne, arbre de KPI, piliers de contenu)

### Étape 2 : Synthétiser — ne pas re-formuler

Le Growth Plan est une **synthèse**, pas une concaténation. Ne pas copier des
paragraphes des Core Docs mot pour mot. Réécrire chaque section sous forme de récit
orienté client, en citant le document source pour la traçabilité.

### Étape 3 : Appliquer la discipline des trois scénarios

La Section 11 (Expected Outcomes) présente des scénarios Conservateur / Modéré /
Agressif selon [three-scenario-forecasting.md](../context-engine/three-scenario-forecasting.md).

La Section 7 (KPI Framework) présente également les cibles sous forme de trois
scénarios par KPI.

### Étape 4 : Appliquer la répartition In-Market vs Out-Market

La Section 5 (Channel Strategy) et la Section 6 (Budget & Media Plan) mentionnent
explicitement la répartition budgétaire In-Market vs Out-Market selon
[in-market-out-market.md](../context-engine/in-market-out-market.md).

### Étape 5 : Appliquer le cadre 30/60/90

La Section 8 (Implementation Timeline) utilise le phasage 30/60/90 selon
[30-60-90-framework.md](../context-engine/30-60-90-framework.md) pour le premier
trimestre, puis des jalons trimestriels ensuite.

### Étape 6 : Résultat

Enregistrer dans `engagements/{id}/part-08-growth-plan/growth-plan.md`. Générer les
exports complémentaires :

- PDF via le script existant `pdf-generator.py`
- DOCX via les utilitaires d'export de documents existants

## Conseils section par section

### Section 1 : Executive Summary

Le PDG lit ceci. Faites en sorte que ça compte.

- Constats clés (3-5 puces — les éléments les plus importants issus de l'analyse)
- Stratégie recommandée (titre en 1-2 phrases)
- Résultats attendus (scénario modéré, avec fourchette conservateur-agressif)
- Investissement requis (budget total ; répartition fixe + variable)
- Calendrier (30/60/90 + jalons trimestriels en une phrase)
- La chose la plus importante que le client doit retenir

### Section 2 : Business Context

Planter le décor pour expliquer pourquoi la stratégie est ce qu'elle est.

- Résumé de l'analyse business (Core Doc 3.1) — ce qu'est l'entreprise, comment elle
  génère des revenus, forces et contraintes clés
- Paysage sectoriel — taille du marché, trajectoire de croissance, intensité concurrentielle
- Position concurrentielle — où se situe la marque, principaux concurrents, positionnement actuel
- Hypothèses critiques — principaux faits établis (Stone facts) et opinions validées

### Section 3 : Target Audience

- Résumé du persona principal au format actionnable (6 questions)
- Persona secondaire si pertinent
- Pourquoi ces personas ont été choisis (relier au scoring TG de 3.2)
- Anti-personas — qui nous ne ciblons explicitement PAS
- Pour le B2B : résumé de l'unité de décision d'achat (DMU) par persona

### Section 4 : Strategic Positioning

- Déclaration de positionnement (la phrase formelle unique)
- Promesse de marque + 3-5 points de preuve à l'appui
- Les 3-5 piliers de messaging
- Profil de ton de voix avec un exemple on-tone et un exemple off-tone
- Règles de « ne pas dire »

### Section 5 : Channel Strategy

- Résumé de la sélection des canaux (dans le périmètre vs différé selon
  [channel-families.md](../context-engine/channel-families.md))
- Rôle par canal (quelle étape du tunnel)
- Logique de séquencement des canaux (lequel alimente lequel)
- Répartition In-Market vs Out-Market avec justification
- Mix média entre payant / organique / gagné / propriétaire

### Section 6 : Budget & Media Plan

- Budget fixe mensuel total
- Enveloppe budgétaire variable selon
  [fixed-vs-variable-budget.md](../context-engine/fixed-vs-variable-budget.md)
- Tableau d'allocation par canal avec justification
- Rythme budgétaire trimestriel
- Investissement total en année 1
- Investissement vs retour attendu (calcul LTV:CAC selon
  [unit-economics-framework.md](../context-engine/unit-economics-framework.md))

### Section 7 : KPI Framework

- KPI principal (le seul chiffre le plus important pour la période)
- KPI secondaires (3-5)
- KPI par canal
- Cibles de KPI en trois scénarios
- Cadence de reporting selon [reporting-cadence.md](../context-engine/reporting-cadence.md)
- Modèle d'attribution utilisé
- Limites de mesure connues

### Section 8 : Implementation Timeline

Jalons 30 / 60 / 90 jours pour le premier trimestre. Jalons trimestriels ensuite.

- Jours 1-30 Fondations
- Jours 31-60 Validation
- Jours 61-90 Optimisation & Scale
- Jalons T2
- Jalons T3
- Objectifs de fin d'année

### Section 9 : Team & Resource Plan

- Rôles de l'équipe agence / conseil
- Rôles de l'équipe client (en particulier ce que le client doit prendre en charge)
- Partenaires externes
- Workflows d'approbation et SLA
- Dépendances critiques pouvant retarder l'exécution

### Section 10 : Risk & Contingency

- Les 3-5 principaux risques selon les dimensions marché, concurrentielle, réglementaire,
  opérationnelle, exécution
- Par risque : probabilité, impact, stratégie d'atténuation, conditions de déclenchement
- Budget de contingence (typiquement une réserve de 10-15 %)
- Autorité de décision pour invoquer la contingence

### Section 11 : Expected Outcomes

- Prévision à trois scénarios (Conservateur / Modéré / Agressif)
- Prévision par trimestre (T1, T2, T3, T4)
- Déclencheurs qui font basculer entre scénarios
- Ce que l'équipe suivra pour savoir quel scénario se déroule
- Conditions dans lesquelles le plan serait révisé

## Discipline qualité

1. **Chaque affirmation cite une source** — référence au Core Doc avec numéro de version
2. **Chaque projection énonce ses hypothèses** — pas de chiffres nus
3. **Langage simple** — le PDG n'est pas un spécialiste marketing
4. **Preuves visuelles là où cela aide** — graphiques, tableaux de scénarios, diagrammes de calendrier
5. **Cible de 20-30 pages** — au-delà de 30, les clients arrêtent de lire
6. **Cohérence avec le Yearly Planner** — le calendrier opérationnel issu de
   `/digital-marketing-pro:yearly-planner` doit s'aligner avec ce Growth Plan

## Après la production

1. Enregistrer le markdown dans `part-08-growth-plan/growth-plan.md`
2. Générer les exports PDF + DOCX
3. Marquer la Partie 8 comme sous-terminée (Growth Plan) ; l'achèvement du Yearly
   Planner termine la Partie 8
4. Mettre à jour le LIF : Phase d'engagement = « Stratégie approuvée ; Channel Build en attente »
5. Brief : « Growth Plan terminé. {N} pages. Exécuter
   /digital-marketing-pro:yearly-planner pour produire le complément opérationnel. Après
   approbation du client, /digital-marketing-pro:engagement next fait avancer vers la
   Partie 9 Channel Strategy. »

## Exemples

### Exemple 1 : Première production de Growth Plan

*EXEMPLE SYNTHÉTIQUE — fabriqué à des fins d'illustration ; ne jamais réutiliser ces
chiffres. Les chiffres de prévision en INR ci-dessous sont inventés.*

```
User: Produce the Growth Plan for Acme.

Skill response:
1. Verify pre-conditions: Parts 1-7 completed, Core Docs at v2 ✓
2. Pull from source docs ONE AT A TIME via targeted Read with offset+limit (grep first for the section you need, then Read just that range) — the full corpus is ~95K words, so bulk-reading every doc up front blows the per-skill 5K-token budget
3. Synthesise into 11 sections, ~24 pages
4. Apply three-scenario forecasting in Sections 7 + 11
5. Apply 30/60/90 phasing in Section 8
6. Save markdown + generate PDF + DOCX
7. Mark Growth Plan complete (Yearly Planner pending)
8. Brief: "Growth Plan v1.0 produced. 24 pages. Conservative Q1 forecast: INR 1.8 Cr new ARR; Moderate: INR 2.6 Cr; Aggressive: INR 3.4 Cr. Run /digital-marketing-pro:yearly-planner next."
```

## Compétences liées

- `engagement-workflow` — orchestre la Partie 8
- `yearly-planner` — livrable complémentaire qui achève la Partie 8
- `four-core-documents` — produit les Core Docs canoniques qui alimentent le Growth Plan

## Références liées

- [growth-plan-template.md](../context-engine/growth-plan-template.md) — structure canonique en 11 sections
- [three-scenario-forecasting.md](../context-engine/three-scenario-forecasting.md) — Sections 7 + 11
- [in-market-out-market.md](../context-engine/in-market-out-market.md) — Sections 5 + 6
- [fixed-vs-variable-budget.md](../context-engine/fixed-vs-variable-budget.md) — Section 6
- [unit-economics-framework.md](../context-engine/unit-economics-framework.md) — Section 6
- [30-60-90-framework.md](../context-engine/30-60-90-framework.md) — Section 8
- [reporting-cadence.md](../context-engine/reporting-cadence.md) — Section 7
- [channel-families.md](../context-engine/channel-families.md) — Section 5

---
name: yearly-planner
description: "Produire le Planificateur Annuel opérationnel sur 12 mois — le compagnon calendrier de la Partie 8 du Growth Plan — avec des thèmes trimestriels, 12 sections mensuelles (initiatives avec responsables, dates clés, budget, objectifs de KPI), une stratégie saisonnière, des calendriers de campagne et de piliers de contenu, et une cadence par canal, livré en markdown, PDF, et XLSX. Se déclenche sur \"/digital-marketing-pro:yearly-planner\", \"produce the yearly planner\", \"month-by-month execution plan\", \"operational calendar for the year\", \"quarterly themes and monthly initiatives\". Nécessite un Growth Plan terminé et les documents de préparation de la Partie 7 ; lit le profil de marque pour la saisonnalité liée à la géographie et marque la Partie 8 comme terminée dans le flux de travail d'engagement."
user-invocable: true
triggers:
  - produire le planificateur annuel
  - générer le calendrier opérationnel sur 12 mois
  - exécuter la partie 8 planificateur annuel
  - plan d'exécution mois par mois
  - thèmes trimestriels et initiatives mensuelles
  - calendrier opérationnel pour l'année
allowed-tools: Read Write Edit Bash Glob Grep
engagement-part: "8"
view-preference: v2-primary
---

# /digital-marketing-pro:yearly-planner — Compagnon opérationnel de la Partie 8

Le Planificateur Annuel complète le Growth Plan avec un calendrier opérationnel sur 12 mois qui relie la stratégie à une exécution date par date. Si le Growth Plan répond à *« Comment allons-nous faire croître cette entreprise ? »*, le Planificateur Annuel répond à *« Que ferons-nous, semaine par semaine, mois par mois ? »*

**Spécification :** [yearly-planner-template.md](../context-engine/yearly-planner-template.md) — la structure canonique.

## Pré-conditions

Le Planificateur Annuel est produit **après** le Growth Plan. Il opérationnalise les décisions stratégiques du Growth Plan.

Avant de produire, vérifier :

1. **Growth Plan terminé** à `part-08-growth-plan/growth-plan.md`
2. **Documents de préparation de la Partie 7 disponibles** (architecture de campagne, piliers de contenu, arbre de KPI)
3. **Fichier d'instructions vivant du projet à jour**
4. **Profil de marque** précisant les opérations géographiques (afin que le contexte saisonnier puisse être appliqué)

## Structure (8 sections)

| # | Section | Source |
|---|---------|--------|
| 1 | Thèmes annuels | Synthèse de la stratégie du Growth Plan sur 4 trimestres |
| 2 | Calendrier mensuel | 12 sous-sections mensuelles ; Section 8 du Growth Plan développée |
| 3 | Stratégie saisonnière | Saisonnalité sectorielle + culturelle/festive (contexte régional) |
| 4 | Architecture de campagne | Architecture de campagne de la Partie 7 détaillée par trimestre |
| 5 | Calendrier des piliers de contenu | Piliers de messaging du Document de base 3.3 × piliers de contenu de la Partie 7 |
| 6 | Cadence spécifique par canal | Une sous-section par famille de canal active |
| 7 | Rythme des ressources et du budget | Rythme budgétaire trimestriel + plan de ressources |
| 8 | Calendrier de revue trimestrielle | Dates de QBR + autorité de décision selon [reporting-cadence.md](../context-engine/reporting-cadence.md) |

## Processus de production

### Étape 1 : lire les sources

- Growth Plan (version canonique)
- Fichier d'instructions vivant du projet
- Documents de préparation de la Partie 7
- Profil de marque (pour la géographie → saisonnalité)
- Pour les marques opérant en Inde : [india-market-context.md](../context-engine/india-market-context.md)

### Étape 2 : construire les thèmes annuels

Identifier 4 thèmes trimestriels qui organisent l'année. Chaque thème est une phrase avec une justification stratégique et s'articule avec le positionnement global. Les thèmes pourraient être (ceci est un exemple de schéma, à personnaliser selon l'engagement) :

- T1 : Fondation + capture initiale de la demande
- T2 : Activation de la génération de demande
- T3 : Expansion de compte + communauté
- T4 : Pic festif + poussée récompenses/presse

### Étape 3 : détailler le calendrier mensuel

12 sous-sections, ~1 page chacune. Pour chaque mois :

- **Thème** — résumé en une phrase
- **Initiatives majeures** — 2-4 initiatives précises avec responsable et échéance
- **Activité permanente** — ce qui se poursuit depuis le mois précédent (publicités payantes à budget fixe, cadence de publication organique, programme e-mail, production de contenu SEO)
- **Dates clés** — lancements de produit, événements sectoriels, jours fériés/fêtes pertinents pour la marque, moments de RP planifiés
- **Aperçu du calendrier de contenu** — thèmes par semaine, piliers de contenu couverts, volume cible par canal
- **Budget** — dépenses fixes mensuelles par canal, réserve de budget variable
- **Objectifs de KPI** — KPI principal + 2-3 KPI secondaires pour le mois

### Étape 4 : cartographier la stratégie saisonnière

Pour les marques opérant en Inde, référencer le tableau de saisonnalité de [india-market-context.md](../context-engine/india-market-context.md) :

- Dussehra → Diwali (sept-nov) pic festif
- Saison des mariages (nov-fév)
- Fin d'année fiscale (jan-mars) — dépenses budgétaires B2B
- Rentrée scolaire (avr-juin)
- Mousson (juin-sept)
- Saison cricket/IPL (mars-mai)

Pour les autres marchés, appliquer une saisonnalité équivalente. Pour le B2B à l'échelle mondiale, la fin d'exercice fiscal et les grands événements sectoriels sont des moteurs de saisonnalité universels.

### Étape 5 : cartographier l'architecture de campagne

Le document d'architecture de campagne de la Partie 7 définit les grandes campagnes de l'année. Le Planificateur Annuel place chaque campagne dans son créneau calendaire avec :

- Nom de campagne + thème
- Persona cible
- Canaux principaux
- Chronologie (début, pic, désengagement)
- KPI
- Résultat attendu

### Étape 6 : cartographier le calendrier des piliers de contenu

Les 3-5 piliers de contenu du Document de base 3.3 sont planifiés tout au long de l'année :

- Objectif de production annuel par pilier (volume par format)
- Répartition trimestrielle (comment le mix de contenu évolue)
- Flux de recyclage (article de blog long format → publications sociales → vidéo → e-mail)

### Étape 7 : cartographier la cadence spécifique par canal

Pour chaque famille de canal active :

- Cadence de publication/envoi (par ex. LinkedIn : 4 publications/semaine ; E-mail : 1 diffusion/semaine + flux de cycle de vie ; SEO : 6 articles/mois)
- Objectifs de volume pour l'année
- Évolutions d'accent trimestrielles
- Besoins en ressources (production créative, rédaction, design, vidéo)

### Étape 8 : produire les fichiers compagnons

Le Planificateur Annuel est livré sous forme de :

- **`yearly-planner.md`** (canonique)
- **`yearly-planner.pdf`** (distribution client via `pdf-generator.py`)
- **`yearly-planner.xlsx`** (calendrier sous forme de tableur pour un usage opérationnel continu)

Enregistrer le tout dans `engagements/{id}/part-08-growth-plan/`.

## Discipline qualité

1. **Chaque initiative a un responsable.** « L'équipe marketing fera X » n'est pas actionnable.
2. **Chaque trimestre a des objectifs de KPI mesurables.** « Améliorer le trafic » n'est pas un objectif.
3. **L'activité permanente est distinguée des initiatives.** Le permanent est la référence de base ; les initiatives sont des efforts limités dans le temps qui s'y ajoutent.
4. **Capacité réaliste respectée.** Le séquençage évite l'épuisement.
5. **Document vivant.** Revu et ajusté à chaque Revue commerciale trimestrielle.
6. **Aligné avec le Growth Plan.** Aucune contradiction entre les deux.

## Après la production

1. Enregistrer tous les formats dans `part-08-growth-plan/`
2. Marquer la Partie 8 comme entièrement terminée via `engagement-state.py mark-part-completed --part 8`
3. Mettre à jour le LIF : phase d'engagement = « Stratégie approuvée ; Construction des canaux (Partie 9) prête à démarrer »
4. Brief : « Planificateur Annuel terminé. Le calendrier opérationnel couvre 12 mois avec des thèmes trimestriels, des initiatives mensuelles, et une cadence spécifique par canal. Recommandation : le revoir avec le client avant de lancer la construction des canaux de la Partie 9. /digital-marketing-pro:engagement pour avancer ensuite. »

## Exemples

### Exemple 1 : production standard du Planificateur Annuel

```
Utilisateur : Produis le Planificateur Annuel pour Acme.

Réponse de la compétence :
1. Vérifier que le Growth Plan existe ✓ ; documents de préparation de la Partie 7 disponibles ✓
2. Lire le Growth Plan, les documents de la Partie 7, le profil de marque (géographie : Inde)
3. Appliquer la saisonnalité indienne : le T3 inclut la planification du pic Dussehra-Diwali ; le T4 inclut la préparation de la saison des mariages
4. Construire 4 thèmes trimestriels
5. Détailler 12 sections mensuelles avec initiatives, dates, budget, KPI
6. Planifier 6 grandes campagnes tout au long de l'année (T1 : lancement ; T2 : accélération de croissance ; T3 : festif ; T4 : poussée récompenses-RP)
7. Cartographier les piliers de contenu : Pilier A 40 %, B 25 %, C 20 %, D 15 % de la production annuelle
8. Générer markdown + PDF + XLSX
9. Marquer la Partie 8 comme terminée
10. Brief : « Planificateur Annuel terminé. 12 mois, 6 grandes campagnes, 48 pièces de contenu planifiées, 4 points de contrôle de revue trimestrielle. La saison festive du T3 a un rythme budgétaire 2x la normale pour le pic de Diwali. /digital-marketing-pro:engagement passe ensuite à la Partie 9. »
```

## Compétences associées

- `growth-plan` — livrable compagnon ; produit en premier
- `engagement-workflow` — orchestre la Partie 8

## Références associées

- [yearly-planner-template.md](../context-engine/yearly-planner-template.md) — structure canonique
- [growth-plan-template.md](../context-engine/growth-plan-template.md) — livrable compagnon
- [india-market-context.md](../context-engine/india-market-context.md) — saisonnalité
- [reporting-cadence.md](../context-engine/reporting-cadence.md) — cadence QBR de la Section 8
- [fixed-vs-variable-budget.md](../context-engine/fixed-vs-variable-budget.md) — structure budgétaire mensuelle
</content>

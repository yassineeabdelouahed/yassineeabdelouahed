---
name: context-engine
description: "Charge et gère le contexte marketing partagé sur lequel s'appuient les autres compétences — le profil de marque actif (voix, audiences, concurrents, objectifs), les profils de repères sectoriels, les règles de conformité géographiques et sectorielles, les spécifications de plateforme, et les grilles de notation — plus le changement de marque et la persistance des données de campagne sous ~/.claude-marketing/. Se déclenche sur « /digital-marketing-pro:context-engine », « switch to brand X », « what are the benchmarks for my industry », « which compliance rules apply to us », « load my brand context ». Se combine avec /digital-marketing-pro:brand-setup pour créer des profils et /digital-marketing-pro:switch-brand pour les changer ; ses fichiers de référence sont lus par presque toutes les compétences sœurs."
argument-hint: "[brand-slug]"
---

# Context Engine — Intelligence marketing partagée

## Quand utiliser cette compétence

- L'utilisateur configure une nouvelle marque ou un nouveau projet marketing
- L'utilisateur bascule entre des marques/clients (cas d'usage agence)
- Toute autre compétence marketing a besoin du contexte de marque, de données sectorielles, de règles de conformité, ou de spécifications de plateforme
- L'utilisateur pose des questions sur les repères sectoriels, les exigences de plateforme, ou la conformité réglementaire

## Contexte requis

Cette compétence charge et gère :
1. **Profil de marque** — identité, voix, audiences, concurrents, objectifs (depuis `~/.claude-marketing/brands/`)
2. **Profils sectoriels** — repères, KPI, efficacité des canaux par secteur (voir `industry-profiles.md`)
3. **Règles de conformité** — lois de confidentialité géographiques + réglementations sectorielles (voir `compliance-rules.md`)
4. **Spécifications de plateforme** — limites de caractères, tailles d'image, signaux d'algorithme par plateforme (voir `platform-specs.md`)
5. **Grilles de notation** — critères d'évaluation standardisés pour tous les types de contenu (voir `scoring-rubrics.md`)

## Gestion du profil de marque

### Charger une marque

1. Vérifier `~/.claude-marketing/brands/_active-brand.json` pour la marque actuellement active
2. Si une marque active existe, charger `~/.claude-marketing/brands/{slug}/profile.json`
3. Si aucune marque active, demander : « Aucune marque active configurée. Exécutez /digital-marketing-pro:brand-setup pour en créer une, ou parlez-moi de votre marque et je vous aiderai à la configurer. »

### Schéma du profil de marque

```json
{
  "brand_name": "",
  "brand_slug": "",
  "created_at": "",
  "updated_at": "",
  "schema_version": "1.0.0",
  "identity": {
    "tagline": "",
    "mission": "",
    "vision": "",
    "values": [],
    "unique_selling_proposition": "",
    "positioning_statement": "",
    "elevator_pitch": ""
  },
  "business_model": {
    "type": "",
    "revenue_model": "",
    "price_range": "",
    "sales_cycle_length": "",
    "average_deal_size": "",
    "customer_lifetime_value": ""
  },
  "industry": {
    "primary": "",
    "secondary": [],
    "regulated": false,
    "regulation_codes": [],
    "compliance_notes": ""
  },
  "target_markets": [],
  "brand_voice": {
    "formality": 5,
    "energy": 5,
    "humor": 3,
    "authority": 5,
    "personality_traits": [],
    "tone_keywords": [],
    "avoid_words": [],
    "prefer_words": [],
    "this_not_that": [],
    "sample_content": []
  },
  "channels": {
    "active": [],
    "primary": "",
    "handles": {}
  },
  "competitors": [],
  "goals": {
    "primary_objective": "",
    "kpis": [],
    "budget_range": "",
    "team_size": ""
  }
}
```

### Changer de marque

Quand l'utilisateur dit « passer à [nom de marque] » :
1. Exécuter : `python "${CLAUDE_PLUGIN_ROOT}/scripts/setup.py" --switch-brand SLUG`
2. Le script gère la correspondance approximative, la validation, et met à jour `_active-brand.json`
3. Confirmer : « Passé à [brand_name]. Tous les résultats marketing utiliseront désormais la voix, les règles de conformité, et le contexte de cette marque. »

Ou utiliser : `/digital-marketing-pro:switch-brand`

## Comment les autres modules utilisent cette compétence

Chaque module devrait :
1. Vérifier qu'une marque active existe avant de produire des résultats marketing
2. Charger le profil sectoriel pertinent pour les repères et recommandations de canal
3. Appliquer automatiquement les règles de conformité selon les `target_markets` et `industry.regulation_codes` de la marque
4. Référencer les spécifications de plateforme lors de la création de contenu spécifique à une plateforme
5. Utiliser les grilles de notation lors de l'évaluation ou de la notation de la qualité du contenu
6. Utiliser la **notation adaptative** — exécuter `adaptive-scorer.py` pour obtenir les pondérations spécifiques à la marque avant de noter le contenu
7. **Enregistrer les données de campagne** — utiliser `campaign-tracker.py` pour faire persister les plans, la performance, et les insights
8. **Vérifier les campagnes passées** — avant de formuler des recommandations, vérifier si des campagnes similaires existent dans l'historique de la marque

## Types de modèle économique

Les types suivants déclenchent différents modèles de tunnel, cadres de KPI, et stratégies de canal :

- `B2B_SaaS` — Axé sur le MRR/ARR, croissance portée par le produit ou par les ventes
- `B2C_eCommerce` — Axé sur le ROAS, marketing de catalogue produit
- `B2C_DTC` — Construction de marque directe au consommateur + performance
- `B2B_Services` — Leadership éclairé, cycles de vente longs
- `Local_Business` — Google Business Profile, SEO local, avis
- `Agency` — Gestion multi-clients, résultats en marque blanche
- `Creator` — Marque personnelle, construction d'audience, monétisation
- `Enterprise` — ABM, comités d'achat, ventes complexes
- `Non_Profit` — Acquisition de donateurs, notoriété, plaidoyer
- `Marketplace` — Acquisition à deux versants, liquidité, confiance

## Notation de la voix de marque

Le notateur de voix de marque (`brand-voice-scorer.py`) normalise automatiquement les données de profil :
- Lit `brand_voice.formality` (échelle entière 1-10) → convertit en flottant 0,0-1,0 en interne
- Fait correspondre `brand_voice.prefer_words` → `preferred_words`, `brand_voice.avoid_words` → `avoided_words`
- Prend en charge à la fois le schéma de profil complet (issu de brand-setup) et les schémas directs hérités

## Persistance des données

Les données de campagne, les instantanés de performance, et les insights marketing persistent entre les sessions :
```
~/.claude-marketing/brands/{slug}/
├── campaigns/              # Plans de campagne et bilans post-mortem
│   ├── _index.json         # Index de campagne pour une recherche rapide
│   └── {id}.json           # Données de campagne individuelles
├── performance/            # Instantanés de performance dans le temps
│   └── {campaign}-{date}.json
├── insights.json           # Enseignements marketing (200 derniers)
├── content-library/        # Contenus enregistrés
└── voice-samples/          # Contenu de référence pour la voix de marque
```

Utilisez `campaign-tracker.py` pour toutes les opérations de persistance.

## Intégrations MCP

Lorsque des serveurs MCP sont configurés (dans `.mcp.json`), les modules peuvent extraire des données réelles :
- **Google Analytics** → données réelles de trafic/conversion pour les rapports de performance
- **Google Search Console** → données de classement réelles pour les audits SEO
- **Google Ads / Meta** → performance de campagne en direct pour la publicité payante
- **HubSpot** → données CRM pour l'analyse de tunnel
- **Mailchimp** → indicateurs de campagne e-mail
- **Google Sheets** → exporter des rapports et calendriers

Tous les serveurs MCP se connectent aux comptes PROPRES DE L'UTILISATEUR via ses clés API.

## Fichiers de référence

### Contexte et spécifications de base

- **industry-profiles.md** — 20+ profils sectoriels avec repères, canaux, conformité, types de contenu
- **platform-specs.md** — Spécifications des réseaux sociaux, e-mail, et plateformes publicitaires
- **platform-publishing-specs.md** — Exigences de publication au niveau API et formats de contenu par plateforme (charges utiles, mapping de champs, validation)
- **google-seo-reference.md** — Référence rapide et concise du SEO Google (exploration/indexation/diffusion, surfaces, statut des schémas, dates d'algorithme)
- **schema-templates.json** — Modèles de schéma JSON-LD prêts à l'emploi avec statut de support/dépréciation Google
- **india-market-context.md** — Contexte du marché régional indien : réglementation (DPDP), plateformes, et dynamiques de marché

### Cadres méthodologiques

- **engagement-flow-methodology.md** — La méthodologie d'engagement séquentielle en 12 parties à laquelle chaque commande, compétence, et agent se réfère
- **four-core-documents-spec.md** — Spécification complète des quatre documents centraux de la partie 3 (61 étapes) qui forment l'épine stratégique
- **decision-matrix-rerun.md** — Quels documents de la partie 3/4 relancer en v2 après la validation client de la partie 5
- **two-views-model.md** — Maintenir les vues v1 (recherche non biaisée) et v2 (validée par le client) faisant autorité pour des questions différentes
- **update-back-rule.md** — Les corrections atterrissent dans le document source, pas seulement dans le livrable qui a détecté l'erreur
- **stone-vs-opinion.md** — Tagging de confiance des faits d'intake : Stone vérifiable vs Opinion du client
- **living-instruction-file-spec.md** — Spécification du fichier d'instructions vivant par engagement (source unique de vérité)
- **30-60-90-framework.md** — Phasage par défaut du premier trimestre : jalons Fondation / Optimisation / Mise à l'échelle
- **actionable-persona-format.md** — Format de persona en six questions qui remplace les récits biographiques
- **b2b-decision-making-unit.md** — Superposition des rôles du comité d'achat B2B pour chaque persona B2B
- **five-digital-markets.md** — Taxonomie stratégique des cinq types de marché numérique ; le type de marché détermine le canal
- **channel-families.md** — Regroupement opérationnel des 17 canaux de la partie 9 en sept familles
- **in-market-out-market.md** — Logique de répartition budgétaire entre les audiences in-market (3-5 %) et out-market (95-97 %)
- **fixed-vs-variable-budget.md** — Séparer la dépense mensuelle engagée de la dépense variable étayée par les données
- **unit-economics-framework.md** — Fondation CAC/LTV à laquelle se réfère chaque décision de canal et de budget
- **three-scenario-forecasting.md** — Chaque projection présentée sous forme de scénarios conservateur/attendu/optimiste
- **decision-framework.md** — Cadre de décision multidimensionnel : nommer, pondérer, et noter chaque dimension
- **competitor-3-question-output.md** — Les trois questions auxquelles chaque analyse concurrentielle doit répondre pour chaque concurrent

### Guides d'exécution

- **execution-workflows.md** — Procédures opérationnelles standardisées pour publier, envoyer, et lancer des actions marketing
- **seo-execution-guide.md** — Exécution SEO via les API de CMS, opérations Search Console, déploiement de schéma, suivi de classement
- **geo-execution-guide.md** — Optimisation pour les moteurs génératifs : surveillance de la visibilité IA, entités, citations
- **multilingual-execution-guide.md** — Pipeline de campagne multilingue de bout en bout : services de traduction, RTL/indic/CJK, SEO
- **transcreation-framework.md** — Transcréation vs traduction vs localisation, avec processus et notation qualité
- **crm-integration-guide.md** — Schémas de connexion CRM, mapping d'objets, et synchronisation de données (Salesforce, HubSpot, etc.)
- **custom-mcp-guide.md** — Ajouter ou construire des serveurs MCP au-delà du catalogue de connecteurs opt-in
- **self-healing-ops-guide.md** — Surveillance et correction automatisées de campagne dans le respect de garde-fous de sécurité
- **approval-framework.md** — Classification de risque déterminant les flux d'exécution automatique vs approbation explicite
- **agency-operations-guide.md** — Procédures multi-clients : intégration, santé du portefeuille, isolation des identifiants, marque blanche
- **team-roles-framework.md** — Rôles d'équipe, autorisations, chaînes d'approbation, et planification de capacité
- **guidelines-framework.md** — Comment les directives de marque, restrictions, et règles de style sont structurées et appliquées

### Conformité et UE

- **compliance-rules.md** — Lois de confidentialité géographiques (16 juridictions) + réglementations sectorielles (10+ secteurs)
- **eu-code-of-practice.md** — Code de bonnes pratiques de l'UE sur le contenu généré par IA + obligations de l'article 50 de l'AI Act pour les marketeurs

### Modèles et grilles de notation

- **scoring-rubrics.md** — Critères de notation pour la qualité du contenu, les créations publicitaires, l'e-mail, et les landing pages
- **eval-rubrics.md** — Grilles de notation détaillées pour les six dimensions d'évaluation utilisées par eval-runner.py
- **eval-framework-guide.md** — Architecture et usage du pipeline automatisé d'assurance qualité de contenu à six dimensions
- **growth-plan-template.md** — Modèle de livrable phare du Growth Plan client de la partie 8
- **yearly-planner-template.md** — Modèle de calendrier opérationnel de douze mois de la partie 8
- **monthly-report-template.md** — Structure de rapport client mensuel orienté décision
- **reporting-cadence.md** — Faire correspondre la fréquence de revue des indicateurs (quotidien→trimestriel) à la vélocité de décision
- **advanced-reporting-guide.md** — Génération de rapport PDF, tableaux de bord, attribution, reporting de cohorte et de variance

### Intelligence et mémoire

- **intelligence-layer.md** — Comment fonctionne le système d'intelligence adaptative (notation, apprentissage, persistance)
- **memory-architecture.md** — Le système de connaissance de marque persistant à 5 couches
- **compound-intelligence-guide.md** — Graphe d'intelligence qui rend chaque décision meilleure que la précédente
- **creative-intelligence-guide.md** — Prédiction de fatigue créative, déclin de contenu, et priorisation du rafraîchissement
- **market-intelligence-guide.md** — Détection de signaux macro : indicateurs économiques, timing de marché, suivi réglementaire
- **competitive-monitoring-guide.md** — Détection continue des changements concurrents, veille sociale, part de voix
- **narrative-warfare-guide.md** — Cartographie des territoires narratifs, contre-discours, et création de catégorie
- **journey-growth-guide.md** — Machines à états de parcours, boucles de croissance, analyse du tunnel obscur, simulation de parcours
- **marketing-science-guide.md** — Inférence causale, MMM bayésien, incrémentalité, et rigueur d'expérimentation
- **synthetic-audience-guide.md** — Recherche d'audience simulée par IA, groupes de discussion, et test de message avec calibration
</content>

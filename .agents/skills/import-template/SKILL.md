---
name: import-template
description: "Importer des modèles de livrables — formats de proposition, structures de rapport, mises en page de brief — et les convertir en modèles réutilisables marqués par des placeholders, enregistrés par marque, afin que des commandes comme /digital-marketing-pro:performance-report et /digital-marketing-pro:content-brief formatent leur résultat à votre façon plutôt que par défaut. Se déclenche sur « /digital-marketing-pro:import-template », « nos rapports suivent toujours ce format », « utilise cette structure de proposition », « ajoute un modèle pour les briefs de contenu », « fais correspondre le résultat à notre format de livrable ». Lit le profil de marque actif, associe chaque modèle à sa commande correspondante, et met à jour le manifeste de modèles de la marque à l'enregistrement."
---

# /digital-marketing-pro:import-template

## Objectif

Importer des modèles de livrables qui définissent le format de sortie des commandes
du plugin. Les modèles précisent la structure des sections, les exigences de contenu,
et les règles de formatage pour les propositions, rapports, briefs, présentations, et
autres livrables marketing.

Quand une commande comme `/digital-marketing-pro:performance-report` s'exécute, elle
vérifie d'abord l'existence d'un modèle personnalisé. Si un existe, le résultat suit
le format du modèle plutôt que le format par défaut.

## Informations requises

L'utilisateur fournit :

- **Contenu du modèle** : Structure de modèle collée, titres de section, ou spécifications de format
- **Nom du modèle** : À quoi sert ce modèle (par exemple, « proposal », « performance-report », « content-brief », « campaign-plan »)
- **Description** (optionnel) : Quand utiliser ce modèle

Si l'utilisateur ne fournit pas de nom, l'inférer à partir de la structure du contenu.

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json`
   pour obtenir le slug actif, puis charger
   `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les
   règles de conformité pour les marchés ciblés
   (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel.
   **Vérifier aussi les guidelines existantes** dans
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes,
   charger les restrictions et les fichiers de catégorie pertinents. Vérifier les
   templates personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`.
   Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque
   n'existe, demander : « Configurer une marque d'abord
   (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.

2. **Analyser la structure du modèle** :
   - Identifier les titres de section et la hiérarchie
   - Noter les exigences de contenu par section (longueur, points de données, format)
   - Identifier les marqueurs de placeholder pour le contenu dynamique
   - Détecter les préférences de format (puces vs récit, orienté données vs synthèse)

3. **Structurer en modèle réutilisable** :
   - Préserver tous les titres de section et leur ordre
   - Ajouter des commentaires de guidance de contenu (ce qui va dans chaque section)
   - Marquer les sections obligatoires vs optionnelles
   - Inclure des notes de format (longueur max, exigences de style)
   - Ajouter la syntaxe de placeholder : `{{variable_name}}` pour le contenu dynamique

4. **Associer aux commandes** — Identifier quelles commandes du plugin devraient utiliser ce modèle :
   - Modèle nommé « performance-report » → `/digital-marketing-pro:performance-report`
   - Modèle nommé « proposal » → résultats de plan de campagne
   - Modèle nommé « content-brief » → `/digital-marketing-pro:content-brief`
   - Les modèles personnalisés peuvent être référencés par n'importe quel module

5. **Vérifier les modèles existants** — Si un modèle portant ce nom existe déjà :
   - Montrer le modèle actuel
   - Demander : remplacer (écraser) ou garder les deux (renommer le nouveau)

6. **Enregistrer le modèle** :
   - Enregistrer avec `guidelines-manager.py --brand {slug} --action save-template --name {name}`
   - Ou écrire directement dans `~/.claude-marketing/brands/{slug}/templates/{name}.md`
   - Mettre à jour le manifeste de modèles avec le nom et la description

7. **Confirmer et expliquer l'usage** :
   - Montrer quelles commandes utiliseront ce modèle
   - Expliquer que le modèle s'applique uniquement à cette marque
   - Remarque : les modèles à l'échelle de l'agence peuvent être dupliqués entre les marques

## Résultat

- Confirmation avec le nom du modèle et le nombre de sections
- Aperçu du modèle structuré
- Liste des commandes qui utiliseront ce modèle
- Suggestion : « La prochaine fois que vous exécuterez
  `/digital-marketing-pro:{matching-command}`, le résultat suivra le format de ce
  modèle. »

## Exemples

**Utilisateur** : « Nos rapports de performance mensuels devraient avoir ces
sections : Executive Summary (3 puces max), Channel Performance (tableau avec MTD vs
objectif), Campaign Highlights (top 3 campagnes), Issues & Risks, Recommendations,
Next Month Plan »

**Résultat** : Enregistre dans
`~/.claude-marketing/brands/{slug}/templates/performance-report.md` :
```markdown
# Monthly Performance Report Template

## Executive Summary
<!-- Max 3 bullet points summarizing overall performance -->
- {{headline_metric_1}}
- {{headline_metric_2}}
- {{headline_metric_3}}

## Channel Performance
<!-- Table format: Channel | MTD Actual | Target | Variance | Status -->
| Channel | MTD Actual | Target | Variance | Status |
|---------|-----------|--------|----------|--------|
| {{channel_rows}} |

## Campaign Highlights
<!-- Top 3 performing campaigns with key metrics -->
### 1. {{top_campaign_1}}
- Objective: {{objective}}
- Results: {{key_metrics}}
- Insight: {{learning}}

### 2. {{top_campaign_2}}
### 3. {{top_campaign_3}}

## Issues & Risks
<!-- Current issues affecting performance and upcoming risks -->
- {{issues_list}}

## Recommendations
<!-- Actionable recommendations based on data -->
- {{recommendations_list}}

## Next Month Plan
<!-- Planned activities, launches, and focus areas -->
- {{next_month_plan}}
```

**Utilisateur** : « Nos propositions suivent toujours ce format : Page de couverture
avec nom du client et date, Situation Analysis, Objectives, Strategy, Tactical Plan
by Channel, Budget Breakdown, Timeline, Team, Terms »

**Résultat** : Enregistre dans `~/.claude-marketing/brands/{slug}/templates/proposal.md` :
```markdown
# Client Proposal Template

## Cover
- Client: {{client_name}}
- Date: {{date}}
- Prepared by: {{agency_name}}

## 1. Situation Analysis
<!-- Current state, market context, challenges, opportunities -->
<!-- Length: 1-2 pages -->

## 2. Objectives
<!-- SMART goals aligned to client business KPIs -->
<!-- Format: numbered list with metrics -->

## 3. Strategy
<!-- Strategic approach, positioning, target audiences -->
<!-- Include: audience segments, messaging angle, competitive positioning -->

## 4. Tactical Plan by Channel
<!-- Detailed activities per channel -->
<!-- Format: subsection per channel with activities, frequency, content types -->

## 5. Budget Breakdown
<!-- Table format: Channel | Monthly | Quarterly | Annual | % of Total -->

## 6. Timeline
<!-- Gantt-style phases or month-by-month milestones -->
<!-- Mark: setup, launch, optimization, reporting checkpoints -->

## 7. Team
<!-- Team members, roles, contact information, availability -->

## 8. Terms
<!-- Payment terms, contract duration, deliverables, SLAs -->
```

## Fichiers de référence

- `skills/context-engine/guidelines-framework.md` — Comment les modèles s'intègrent au système de guidelines
- `scripts/guidelines-manager.py` — CLI pour les opérations CRUD sur les modèles (--action list-templates, save-template, get-template)

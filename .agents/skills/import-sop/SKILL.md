---
name: import-sop
description: "Importer les procédures opérationnelles standardisées (SOP) d'agence — workflows d'approbation, checklists de lancement de campagne, procédures d'escalade, étapes de contrôle qualité — et les structurer en étapes numérotées assignées par rôle avec les points d'approbation humaine marqués. Les SOP s'enregistrent au niveau de l'agence pour s'appliquer à tous les clients, pas par marque. Se déclenche sur « /digital-marketing-pro:import-sop », « ajoute notre workflow d'approbation de contenu », « importe notre checklist de lancement », « voici notre processus d'escalade de crise », « chaque livrable doit suivre ces étapes ». Lit le profil de marque actif pour le contexte, fusionne avec une SOP existante du même nom après confirmation, et explique quelles commandes référenceront la SOP."
---

# /digital-marketing-pro:import-sop

## Objectif

Importer et structurer les procédures opérationnelles standardisées (SOP) d'agence
qui s'appliquent à tous les clients. Les SOP définissent **comment le travail est
réalisé** — workflows d'approbation, étapes de revue de contenu, checklists de
lancement de campagne, procédures d'escalade, et portes qualité.

Les SOP sont stockées au niveau de l'agence (`~/.claude-marketing/sops/`), pas par
marque, afin qu'elles s'appliquent de façon cohérente à tous les clients.

## Informations requises

L'utilisateur fournit :

- **Contenu de la SOP** : Étapes de workflow collées, éléments de checklist, ou descriptions de processus
- **Nom de la SOP** : Ce que cette SOP couvre (par exemple, « content-approval », « campaign-launch », « crisis-escalation »)
- **Description** (optionnel) : Bref résumé de quand cette SOP s'applique

Si l'utilisateur ne fournit pas de nom, l'inférer à partir du contenu.

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

2. **Classer le type de SOP** :
   - **Workflow de contenu** : Étapes de revue, d'approbation, et de publication du contenu
   - **Checklist de campagne** : Étapes de vérification avant, pendant et après le lancement
   - **Procédure d'escalade** : Qui contacter, autorité de décision, délais de réponse
   - **Contrôle qualité** : Étapes de test, vérifications de conformité de marque, vérification d'accessibilité
   - **Intégration client** : Étapes pour configurer un nouveau client dans le système
   - **Workflow de reporting** : Étapes de collecte de données, analyse, présentation, livraison

3. **Structurer en étapes actionnables** :
   - Numéroter clairement chaque étape
   - Identifier les points de décision (branches si/alors)
   - Marquer quelles étapes nécessitent une approbation humaine vs des vérifications automatisées
   - Ajouter des attributions de rôle là où mentionnées (qui fait quoi)
   - Inclure les délais/SLA là où fournis
   - Signaler les étapes que le plugin peut automatiser vs les étapes nécessitant une action humaine

4. **Vérifier les SOP existantes** — Si une SOP portant ce nom existe déjà :
   - Montrer le contenu de la SOP actuelle
   - Demander : fusionner (combiner les étapes), remplacer (écraser), ou annuler
   - Lors de la fusion, dédupliquer et maintenir l'ordre des étapes

5. **Enregistrer la SOP** :
   - Enregistrer avec `guidelines-manager.py --action save-sop --name {name} --content "{content}"`
   - Ou écrire directement dans `~/.claude-marketing/sops/{name}.md`
   - Mettre à jour le manifeste des SOP

6. **Expliquer l'intégration** — Dire à l'utilisateur comment cette SOP sera appliquée :
   - Quelles commandes référenceront cette SOP
   - Quelles étapes de workflow seront ajoutées aux résultats
   - Quand les points d'approbation humaine seront signalés

## Résultat

- Confirmation avec le nom de la SOP et le nombre d'étapes
- Aperçu de la SOP structurée
- Explication des commandes/modules qui référenceront cette SOP
- Suggestion : « Cette SOP s'appliquera à toutes les marques. Pour créer des workflows
  spécifiques à une marque, utilisez les guidelines à la place. »

## Exemples

**Utilisateur** : « Avant de publier tout contenu, il doit passer par : 1. Le
rédacteur crée un brouillon, 2. L'éditeur relit la qualité, 3. Le responsable de
marque vérifie l'alignement de la voix, 4. Le service juridique relit s'il contient
des allégations, 5. Le client approuve, 6. Publier »

**Résultat** : Enregistre dans `~/.claude-marketing/sops/content-approval.md` :
```markdown
# Content Approval Workflow

## Scope
Applies to all content before publishing across all brands/clients.

## Steps

1. **Writer creates draft**
   - Role: Content Creator
   - Plugin support: Content Engine generates draft with brand voice applied
   - Output: Draft content document

2. **Editor reviews for quality**
   - Role: Editor
   - Checklist: Grammar, clarity, structure, readability score
   - Plugin support: Content scorer provides readability metrics
   - Gate: Human approval required

3. **Brand manager checks voice alignment**
   - Role: Brand Manager
   - Checklist: Voice consistency, messaging alignment, restriction compliance
   - Plugin support: Brand voice scorer provides alignment score
   - Gate: Human approval required

4. **Legal reviews (conditional)**
   - Trigger: Content contains health claims, financial claims, testimonials, or competitor comparisons
   - Role: Legal Team
   - Gate: Human approval required

5. **Client approves**
   - Role: Client Stakeholder
   - Gate: Human approval required

6. **Publish**
   - Role: Content Creator / Social Media Manager
   - Plugin support: Platform formatting applied automatically
```

**Utilisateur** : « Notre agence a un processus d'escalade de crise : les problèmes
mineurs vont au chargé de compte, les problèmes majeurs vont au directeur d'agence,
les problèmes critiques vont au PDG en moins d'1 heure »

**Résultat** : Enregistre dans `~/.claude-marketing/sops/crisis-escalation.md` :
```markdown
# Crisis Escalation Procedure

## Severity Levels

### Minor (Severity: Low)
- **Examples**: Negative review, minor social media complaint, factual error in published content
- **Escalate to**: Account Manager
- **Response SLA**: 4 hours
- **Action**: Acknowledge, draft response, resolve

### Major (Severity: Medium)
- **Examples**: Viral negative post, media inquiry, product recall mention, multiple complaints
- **Escalate to**: Agency Director
- **Response SLA**: 1 hour
- **Action**: Pause scheduled content, draft holding statement, convene response team

### Critical (Severity: High)
- **Examples**: Legal threat, data breach, executive controversy, widespread media coverage
- **Escalate to**: CEO
- **Response SLA**: 1 hour
- **Action**: All content paused, crisis team activated, holding statement within 30 minutes
```

## Fichiers de référence

- `skills/context-engine/guidelines-framework.md` — Comment les SOP s'intègrent au système de guidelines
- `scripts/guidelines-manager.py` — CLI pour les opérations CRUD sur les SOP (--action list-sops, save-sop, get-sop)

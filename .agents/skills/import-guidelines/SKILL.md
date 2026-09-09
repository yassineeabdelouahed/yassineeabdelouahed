---
name: import-guidelines
description: "Importer des guidelines de marque — règles de voix et de ton, messaging, mots interdits et restrictions, styles par canal, identité visuelle — et les structurer en fichiers markdown exploitables dans la couche de guidelines de la marque, classées automatiquement par catégorie, vérifiées pour d'éventuels conflits avec le profil de marque, et fusionnées avec les règles existantes plutôt qu'écrasées. Se déclenche sur « /digital-marketing-pro:import-guidelines », « voici notre guide de voix de marque », « ajoute ces mots interdits », « importe notre guide de style », « enregistre la règle qu'on n'utilise jamais de jargon ». Lit le profil de marque actif et le manifeste de guidelines existant ; les guidelines enregistrées sont ensuite appliquées automatiquement sur toutes les commandes de production de contenu."
argument-hint: "[file-path or URL]"
---

# /digital-marketing-pro:import-guidelines

## Objectif

Importer et structurer des guidelines de marque dans la couche de connaissance
persistante de la marque. Convertit des documents de guidelines non structurés, des
guides de style, des listes de restrictions, et des playbooks de messaging en
fichiers markdown structurés et exploitables, automatiquement appliqués sur tous les
modules et commandes.

## Informations requises

L'utilisateur fournit un ou plusieurs des éléments suivants :

- **Contenu de guidelines collé** : Texte issu d'un guide de marque, guide de style,
  ou liste de restrictions existant
- **Description verbale** : Règles orales/tapées (« on n'utilise jamais de points
  d'exclamation », « toujours commencer par les données »)
- **Catégorie à mettre à jour** : Quelle catégorie de guideline compléter
  (voice-and-tone, messaging, restrictions, channel-styles, visual-identity, ou custom)
- **Référence du document source** : Description de la provenance de ces guidelines

Si l'utilisateur ne spécifie pas de catégorie, analyser le contenu et le router
automatiquement vers la bonne catégorie.

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json`
   pour obtenir le slug actif, puis charger
   `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les
   règles de conformité pour les marchés ciblés
   (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel.
   **Vérifier aussi les guidelines existantes** dans
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes,
   charger les guidelines existantes pour fusion (pas écrasement). Si aucune marque
   n'existe, demander : « Configurer une marque d'abord
   (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.

2. **Classer le contenu** — Déterminer à quelle(s) catégorie(s) de guideline l'entrée appartient :
   - Règles de voix, style d'écriture, ton → `voice-and-tone.md`
   - Messages clés, slogans, positionnement, propositions de valeur → `messaging.md`
   - Mots interdits, revendications restreintes, avertissements, sujets prohibés → `restrictions.md`
   - Règles de format/ton par canal → `channel-styles.md`
   - Couleurs, polices, règles de logo, style visuel → `visual-identity.md`
   - Tout le reste → `custom/{descriptive-name}.md`

3. **Structurer le contenu** — Convertir l'entrée non structurée en markdown organisé :
   - Extraire les règles individuelles sous forme de puces
   - Regrouper par sous-thème avec des titres clairs
   - Ajouter des exemples avant/après là où l'entrée les fournit
   - Préserver l'intention de l'utilisateur — ne pas ajouter de règles qu'il n'a pas spécifiées
   - Utiliser la structure du cadre depuis `skills/context-engine/guidelines-framework.md`

4. **Vérifier les conflits** — Comparer les nouvelles guidelines aux paramètres existants du profil :
   - Si les guidelines disent « ton décontracté » mais que le profil a formality=8, signaler le conflit
   - Si les restrictions interdisent des mots présents dans le messaging de marque existant, le signaler
   - Présenter les conflits à l'utilisateur et demander lequel a priorité
   - Remarque : les styles par canal outrepassent intentionnellement la voix de base pour des canaux spécifiques (ce n'est pas un conflit)

5. **Fusionner avec les guidelines existantes** — Si la catégorie a déjà du contenu :
   - Montrer à l'utilisateur ce qui existe déjà
   - Demander : fusionner (ajouter les nouvelles règles aux existantes), remplacer (écraser), ou annuler
   - Lors de la fusion, dédupliquer les règles et maintenir l'organisation

6. **Enregistrer et confirmer** — Écrire le fichier de guideline structuré :
   - Enregistrer avec `guidelines-manager.py --brand {slug} --action save --category {category}`
   - Ou écrire directement dans `~/.claude-marketing/brands/{slug}/guidelines/{file}`
   - Le manifeste est reconstruit automatiquement à l'enregistrement
   - Confirmer : montrer la catégorie, le nombre de règles, et un aperçu de ce qui a été enregistré

7. **Demander des catégories supplémentaires** — Si l'entrée de l'utilisateur peut couvrir plusieurs catégories :
   - « J'ai aussi remarqué du contenu de messaging — voulez-vous que je l'enregistre dans messaging.md ? »
   - « Certaines de ces règles sont spécifiques à un canal — devrais-je aussi créer channel-styles.md ? »

## Résultat

- Confirmation de ce qui a été enregistré, avec les nombres de règles
- Aperçu du fichier de guideline structuré
- Tout conflit signalé entre les guidelines et le profil de marque existant
- Suggestion d'importer des catégories supplémentaires si du contenu pertinent a été détecté
- Rappel : « Ces guidelines seront automatiquement appliquées lors de la création de
  contenu. Utilisez à nouveau `/digital-marketing-pro:import-guidelines` pour en
  ajouter d'autres. »

## Référence des catégories de guidelines

| Catégorie | Fichier | Ce qui y va |
|----------|------|---------------|
| Voix & ton | `voice-and-tone.md` | Style d'écriture, règles de ton, à faire/à ne pas faire, lisibilité, préférences de pronoms |
| Messaging | `messaging.md` | Positionnement, propositions de valeur, messages clés, slogans, pitchs éclair, points de preuve |
| Restrictions | `restrictions.md` | Mots interdits, revendications restreintes, avertissements obligatoires, sujets prohibés |
| Styles par canal | `channel-styles.md` | Ton, format par canal, politiques hashtags/emojis, types de contenu |
| Identité visuelle | `visual-identity.md` | Couleurs, polices, règles de logo, style de photographie (descriptions textuelles) |
| Custom | `custom/{name}.md` | Règles d'accessibilité, déclencheurs de revue juridique, règles saisonnières, guidelines de partenaires |

## Exemples

**Utilisateur** : « Voici notre guide de voix de marque : Nous sommes amicaux mais
professionnels. Jamais de jargon. Toujours expliquer les concepts techniques
simplement. Utiliser "vous" et non "les clients". Les phrases doivent faire moins de
20 mots. »

**Résultat** : Enregistre dans `voice-and-tone.md` :
```markdown
# Brand Voice & Tone Guide

## Core Voice
- Friendly but professional
- Always explain technical concepts in plain language
- Use "you" and "your" — never "customers" or "users"

## Writing Style
- Sentences: maximum 20 words
- No jargon — if a simpler word exists, use it

## Dos and Don'ts
- DO: Use plain language and direct address
- DON'T: Use industry jargon or technical terminology without explanation
```

**Utilisateur** : « On ne peut jamais utiliser les mots "cheap", "guarantee", "best",
ou "revolutionary". Les revendications santé ont besoin d'un avertissement. »

**Résultat** : Enregistre dans `restrictions.md` :
```markdown
# Brand Restrictions & Guardrails

## Banned Words and Phrases
- "cheap" → use "affordable" or "cost-effective"
- "guarantee" → use "committed to" or "designed to"
- "best" → use specific proof points instead
- "revolutionary" → use "innovative" or describe the specific innovation

## Mandatory Disclaimers
- Health/wellness claims: Include "This is not medical advice. Consult your healthcare provider."
```

## Fichiers de référence

- `skills/context-engine/guidelines-framework.md` — Cadre complet pour structurer et appliquer les guidelines
- `scripts/guidelines-manager.py` — CLI pour les opérations CRUD sur les guidelines

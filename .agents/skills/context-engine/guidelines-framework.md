# Cadre des guidelines — Structurer et appliquer les connaissances de marque

Cette référence définit comment les guidelines de marque, les restrictions, les styles de canal, les modèles, et les SOP d'agence sont structurés, stockés, et appliqués à travers tous les modules et commandes.

## Pourquoi les guidelines sont importantes

Un profil de marque capture **ce qu'**est la marque (identité, scores de voix, canaux, objectifs). Les guidelines capturent **comment** la marque communique — les règles détaillées, restrictions, et choix de style qui rendent le contenu authentiquement à l'image de la marque.

| Profil de marque | Guidelines de marque |
|--------------|-----------------|
| Formalité : 7/10 | « Ne jamais utiliser de points d'exclamation dans les titres » |
| Ton : professionnel, digne de confiance | « Toujours commencer par les données, puis l'histoire » |
| Mots à éviter : bon marché, remise | Liste complète de mots interdits avec plus de 40 termes et contexte |
| Secteur : santé | « Toutes les allégations de santé nécessitent une citation. Ne jamais utiliser « guérit » ou « garantit » » |
| Canal : LinkedIn | « Publications LinkedIn : max 1300 caractères, aucun emoji dans la première ligne, terminer par une question » |

## Structure de stockage

Guidelines par marque à `~/.claude-marketing/brands/{slug}/` :

```
guidelines/
├── _manifest.json        # Index: counts, categories, last-updated
├── voice-and-tone.md     # Detailed voice guide
├── messaging.md          # Key messages, value props, positioning
├── restrictions.md       # Banned words, restricted claims, disclaimers
├── channel-styles.md     # Per-channel rules
├── visual-identity.md    # Colors, fonts, logo rules
└── custom/               # Additional guideline files
```

Modèles par marque à `~/.claude-marketing/brands/{slug}/` :

```
templates/
├── _manifest.json        # Template index
└── *.md                  # Proposal, report, brief templates
```

SOP au niveau agence à `~/.claude-marketing/` :

```
sops/
├── _manifest.json        # SOP index
└── *.md                  # Workflow definitions
```

## Catégories de guidelines

### 1. Voix et ton (`voice-and-tone.md`)

Guide de voix détaillé qui va au-delà des 4 scores numériques (formalité, énergie, humour, autorité) du profil de marque.

**Ce qui appartient ici :**
- Règles détaillées de style rédactionnel (longueur de phrase, structure de paragraphe, niveau de lisibilité)
- Modificateurs de ton par type de contenu (blog=conversationnel, livre blanc=faisant autorité, social=décontracté)
- Préférences de pronoms (nous vs l'entreprise, vous vs les clients)
- Recommandations et interdictions spécifiques avec exemples
- Exemples avant/après montrant la voix correcte vs incorrecte
- Registre émotionnel (empathique, direct, aspirationnel, pragmatique)

**Exemple de structure :**
```markdown
# Brand Voice & Tone Guide

## Core Voice
- We speak as a trusted advisor, not a salesperson
- Lead with empathy, follow with expertise
- Use "you" and "your" — make it about the reader

## Writing Style
- Sentences: max 25 words average
- Paragraphs: 2-3 sentences
- Readability: Grade 8-10 (Flesch-Kincaid)
- Active voice preferred (80%+ of sentences)

## Tone by Content Type
- **Blog posts**: Conversational, story-driven, relatable
- **Whitepapers**: Authoritative, data-first, formal
- **Social media**: Warm, engaging, concise
- **Email**: Personal, action-oriented, helpful
- **Ad copy**: Bold, benefit-focused, urgent (but not pushy)

## Dos and Don'ts
- DO: "We help you grow" → personal, active
- DON'T: "Our solution enables growth" → corporate, passive
- DO: "Here's what we found" → direct
- DON'T: "It should be noted that" → filler
```

### 2. Cadre de message (`messaging.md`)

Messages approuvés, positionnement, et langage que la marque utilise de manière cohérente.

**Ce qui appartient ici :**
- Déclaration de positionnement de marque
- Propositions de valeur (principale + à l'appui)
- Messages clés par segment d'audience
- Slogans et accroches approuvés
- Argumentaires éclair (30 secondes, 60 secondes)
- Points de preuve et statistiques que la marque utilise
- Différenciateurs concurrentiels (comment se décrire face aux concurrents)
- Hiérarchie de message (quels messages mettre en avant en premier)

**Exemple de structure :**
```markdown
# Messaging Framework

## Positioning Statement
For [target audience] who [need], [Brand] is the [category] that [key benefit] because [reason to believe].

## Value Propositions
1. **Primary**: Save 10 hours per week on marketing reporting
2. **Supporting**: AI-powered insights, not just data
3. **Supporting**: Integrates with your existing tools in minutes

## Key Messages by Audience
### CMOs
- "Turn marketing data into board-ready insights in minutes"
- "Prove ROI across every channel with unified attribution"

### Marketing Managers
- "Stop building reports manually — automate with AI"
- "Get alerts when campaigns need attention"

## Approved Taglines
- Main: "Marketing intelligence, simplified"
- Campaign: "Your data. Your insights. Your edge."
- NEVER use: "The best marketing tool" (too generic)

## Proof Points
- "Used by 500+ marketing teams"
- "Average 40% reduction in reporting time"
- "4.8/5 rating on G2"
```

### 3. Restrictions (`restrictions.md`)

Règles strictes sur ce que la marque ne doit jamais dire, revendiquer, ou faire.

**Ce qui appartient ici :**
- Mots et expressions interdits (avec le contexte expliquant pourquoi)
- Allégations restreintes (allégations nécessitant une qualification ou une preuve)
- Mentions légales obligatoires (par type de contenu ou canal)
- Sujets ou comparaisons interdits
- Exigences de langage juridique/conformité
- Règles d'usage des marques déposées
- Règles de mention des concurrents

**Comment les restrictions sont appliquées :**
- Avant de générer tout contenu, vérifier le fichier de restrictions
- Analyser le résultat pour détecter les mots interdits — signaler et suggérer des alternatives
- Vérifier les allégations par rapport à la liste des allégations restreintes
- Ajouter les mentions légales obligatoires quand le contenu correspond aux conditions de déclenchement
- Journaliser les violations dans le suivi de campagne pour l'analyse de schéma

**Exemple de structure :**
```markdown
# Brand Restrictions & Guardrails

## Banned Words and Phrases
- "cheap" → use "affordable" or "cost-effective"
- "guarantee" → use "committed to" or "designed to"
- "best in class" → use specific proof points instead
- "revolutionary" → use "innovative" or describe the specific innovation
- "synergy" / "leverage" / "paradigm" → plain language always
- "[Competitor name] is bad/worse" → never disparage by name

## Restricted Claims (Require Qualification)
- Performance claims → must cite source and date: "40% faster (2024 benchmark study)"
- ROI claims → must include "results may vary" or specific conditions
- Health/wellness claims → must include "consult your healthcare provider"
- Award mentions → must be current year or specify year

## Mandatory Disclaimers
- **Email marketing**: Unsubscribe link + physical address (CAN-SPAM)
- **Financial content**: "Not financial advice" disclaimer
- **Testimonials**: "Individual results may vary"
- **Influencer content**: #ad or #sponsored clearly visible
- **Healthcare**: "This is not medical advice"

## Prohibited Topics
- Political opinions or endorsements
- Religious statements
- Competitor disparagement (compare features, not companies)
- Unverified statistics or made-up data
```

### 4. Styles de canal (`channel-styles.md`)

Règles de ton et de format par canal qui peuvent différer de la voix de marque de base.

**Principe clé :** Les styles de canal **remplacent** les réglages de voix de base pour ce canal spécifique. Si le profil de marque indique une formalité=7 mais que channel-styles indique « Instagram : décontracté, adapté aux emojis, formalité 4 » — le contenu Instagram suit le style de canal.

**Ce qui appartient ici :**
- Ajustements de ton par canal
- Limites de caractères et règles de format
- Politiques de hashtags et d'emojis
- Préférences d'heure de publication
- Préférences de type de contenu par canal
- Style de CTA par canal

**Exemple de structure :**
```markdown
# Channel-Specific Styles

## LinkedIn
- **Tone**: Professional thought leadership, formality 8/10
- **Format**: 1300 chars max, no emoji in first line, paragraph breaks every 2-3 sentences
- **Hashtags**: 3-5 relevant, at end of post
- **CTAs**: "What's your experience with...?" or "Link in comments"
- **Content types**: Industry insights, case studies, team highlights
- **Avoid**: Sales pitches, excessive self-promotion

## Instagram
- **Tone**: Warm, visual-first, formality 4/10
- **Format**: Caption max 2200 chars, hook in first line (before "more")
- **Hashtags**: 15-20 in first comment, 3-5 in caption
- **Emoji**: Yes, 2-3 per post, relevant not decorative
- **Content types**: Behind-the-scenes, tips, user stories, reels
- **Avoid**: Long text blocks, corporate jargon

## Email
- **Tone**: Personal, helpful, formality 6/10
- **Subject line**: Max 50 chars, no ALL CAPS, personalize when possible
- **Preview text**: Complement (don't repeat) subject line
- **CTA**: One primary CTA per email, button format
- **Avoid**: Multiple competing CTAs, walls of text

## Twitter/X
- **Tone**: Concise, witty, formality 5/10
- **Format**: Single tweet preferred, thread for depth
- **Hashtags**: 1-2 max, only if trending or branded
- **Emoji**: Sparingly, 0-1 per tweet
- **Content types**: Hot takes, quick tips, engagement questions
```

### 5. Identité visuelle (`visual-identity.md`)

Descriptions textuelles des éléments visuels de marque. Puisque le plugin crée du contenu textuel (pas des images), ceci sert de référence pour les briefs, les directions créatives, et pour assurer la cohérence visuelle dans les descriptions.

**Ce qui appartient ici :**
- Couleurs de marque (codes hexadécimaux, noms, règles d'usage)
- Typographie (familles de polices, hiérarchie d'usage)
- Règles d'usage du logo (taille minimale, espace de dégagement, arrière-plans)
- Style de photographie/imagerie (sujets, ambiance, traitement)
- Style d'iconographie
- Préférences de mise en page

### 6. Guidelines personnalisées (`custom/`)

Fichiers de guidelines additionnels qui ne rentrent pas dans les catégories standard. Exemples :
- `accessibility.md` — Normes d'accessibilité et règles de langage inclusif
- `legal-review.md` — Quand une revue juridique est requise
- `seasonal.md` — Règles de contenu pour les fêtes et périodes saisonnières
- `partner-co-branding.md` — Règles pour le contenu partenaire

## Comment les guidelines sont appliquées

### Au démarrage de session (piloté par compétence — le plugin ne fournit aucun hook par conception)
1. Les compétences qui chargent le contexte de marque exécutent `guidelines-manager.py --brand {slug} --action summary` en parallèle de `setup.py --summary`
2. Si des guidelines existent, le résumé inclut : le nombre de catégories, le total de règles, le nombre de restrictions, le nombre de modèles
3. Cela amorce la session avec la conscience que des guidelines existent

### Dans les compétences de module (point 9 du contexte de marque)
Chaque module vérifie les guidelines avant de générer un livrable :
1. Vérifier si `guidelines/_manifest.json` existe
2. Charger `restrictions.md` — appliquer les mots interdits, allégations restreintes, mentions légales obligatoires
3. Charger `channel-styles.md` — appliquer les remplacements de ton spécifiques au canal
4. Charger `messaging.md` — utiliser les messages clés approuvés et le langage de positionnement
5. Charger `voice-and-tone.md` — suivre les règles de voix détaillées au-delà des scores numériques

### Dans les compétences de commande (extension de l'Étape 1)
Chaque commande charge les guidelines en parallèle du profil de marque :
1. Charger `_active-brand.json` → `profile.json` (existant)
2. Vérifier `guidelines/_manifest.json` — si présent, charger les restrictions et catégories pertinentes
3. Vérifier `templates/_manifest.json` — si un modèle personnalisé existe pour cette commande, l'utiliser
4. Vérifier `sops/_manifest.json` — si une SOP s'applique à ce workflow, la suivre

### Avant de rédiger du contenu (vérification appliquée par l'agent)
Lors de la rédaction de contenu marketing, la compétence de rédaction doit :
1. Vérifier les restrictions — analyser pour détecter les mots interdits et les allégations restreintes
2. Vérifier que les mentions légales obligatoires sont incluses quand requises
3. Journaliser les violations dans le suivi de campagne

### Ordre de priorité
Quand les guidelines entrent en conflit avec le profil de marque :
1. **Restrictions** — toujours appliquées (priorité la plus élevée)
2. **Styles de canal** — remplacent la voix de base pour des canaux spécifiques
3. **Voix et ton des guidelines** — remplacent les scores de voix numériques par des règles détaillées
4. **Scores de voix du profil de marque** — par défaut quand aucune guideline n'existe
5. **SOP** — ajoutent des étapes de workflow, ne remplacent pas les règles de contenu

## Conversion de guidelines non structurées

Quand les utilisateurs collent ou décrivent leurs guidelines (via `/digital-marketing-pro:import-guidelines`), convertir en markdown structuré :

1. **Identifier la catégorie** — à quel fichier ce contenu appartient-il ?
2. **Extraire les règles** — convertir le texte en puces avec des recommandations/interdictions claires
3. **Ajouter des exemples** — inclure des exemples avant/après lorsque possible
4. **Noter les conflits** — si les guidelines entrent en conflit avec les réglages de profil existants, signaler pour résolution utilisateur
5. **Mettre à jour le manifeste** — reconstruire `_manifest.json` avec des comptages exacts

**Exemple de conversion :**
- L'utilisateur dit : « Nous n'utilisons jamais de points d'exclamation dans le contenu professionnel et écrivons toujours les nombres en toutes lettres en dessous de dix »
- Va dans : `voice-and-tone.md` sous les règles « Style rédactionnel » :
  ```
  - Never use exclamation marks in professional content (blog, whitepaper, email)
  - Spell out numbers under ten ("seven" not "7")
  ```

## Intégration des modèles

Les modèles modifient le format de sortie des commandes. Quand une commande comme `/digital-marketing-pro:performance-report` s'exécute :

1. Vérifier `templates/_manifest.json` pour un modèle correspondant (par ex., « performance-report »)
2. Si trouvé, charger le modèle et structurer le livrable pour correspondre à son format
3. Si non trouvé, utiliser le format par défaut de la commande

Les modèles devraient inclure :
- Les en-têtes de section (quelles sections inclure)
- Le guidage de contenu (ce qui va dans chaque section)
- Les exigences de format (longueur, style, mise en page visuelle)
- Les marqueurs d'espace réservé pour le contenu dynamique

## Intégration des SOP

Les SOP ajoutent des étapes de workflow aux commandes. Quand une SOP comme « content-approval-workflow » existe :

1. La commande ou le module pertinent vérifie les SOP applicables
2. Ajoute les étapes de la SOP au livrable (par ex., « Soumettre à la revue juridique avant publication »)
3. Peut signaler quand une étape de workflow nécessite une approbation humaine

Les SOP sont au niveau agence (pas par marque) afin qu'elles s'appliquent de manière cohérente à travers tous les clients.

## Suivi des violations

Quand une guideline est violée (mot interdit utilisé, restriction enfreinte) :

1. Signaler immédiatement dans le livrable avec la référence de règle spécifique
2. Suggérer une alternative conforme
3. Journaliser dans le suivi de campagne : action `save-violation` avec :
   - `rule` : quelle guideline a été violée
   - `category` : quelle catégorie de guideline
   - `severity` : faible/moyen/élevé
   - `content` : le texte en violation
   - `suggestion` : alternative conforme
4. Les violations peuvent être revues via : l'action `get-violations` pour l'analyse de schéma

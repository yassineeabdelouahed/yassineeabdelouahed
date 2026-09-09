---
name: content-engine
description: "Rédiger du contenu marketing dans la voix de marque — articles de blog, texte publicitaire, séquences e-mail, posts sociaux, landing pages, et guides de voix de marque — via un pipeline à portes (recherche, plan, brouillon, fact-check, humanisation, vérification de voix, checklist SEO) avec des fichiers de travail numérotés et un tableau de bord qualité à cinq portes avant que le texte ne soit prêt à publier. Se déclenche sur \"/digital-marketing-pro:content-engine\", \"write a blog post about X\", \"draft ad copy for this campaign\", \"create an email sequence\", \"landing page copy for our product\". Prend /digital-marketing-pro:content-brief comme amont privilégié ; transmet vers /digital-marketing-pro:publish-blog, /digital-marketing-pro:content-repurpose, et /digital-marketing-pro:check. Lit le profil de marque, les guidelines, les spécifications de plateforme, et les règles de conformité."
argument-hint: "[content-type and topic]"
---

# Content Engine

## Quand utiliser cette compétence

Activez ce module lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- **Contenu SEO** : Articles de blog, pages piliers, clusters thématiques, ou tout contenu optimisé pour la recherche
- **Texte publicitaire** : Titres, descriptions, et créas pour toute plateforme payante (Google, Meta, LinkedIn, TikTok, etc.)
- **E-mail marketing** : Séquences e-mail, campagnes drip, newsletters, e-mails transactionnels, ou prospection à froid
- **Contenu réseaux sociaux** : Posts organiques, légendes, stratégie de hashtags, ou calendriers de contenu pour les plateformes sociales
- **Landing pages** : Texte de page orienté conversion, sections héroïques, CTA, et structure de page
- **Calendriers de contenu** : Planification éditoriale, ordonnancement de contenu, et cartographie thématique
- **Voix de marque** : Guidelines de voix et de ton, cadres de messagerie, et systèmes de langage de marque
- **Détection de déclin de contenu** : Identifier le contenu ayant perdu des classements, du trafic, ou de la pertinence dans le temps
- **Gestion de la qualité du contenu IA** : Assurer que le contenu généré par IA respecte les standards de qualité, d'originalité, et de marque
- **Conformité d'accessibilité** : Rendre le contenu accessible (normes WCAG, texte alt, lisibilité, compatibilité lecteur d'écran)
- **Multilingue/Localisation** : Adapter le contenu pour différentes langues, cultures, et marchés régionaux
- **Infrastructure e-mail** : Délivrabilité, authentification (SPF, DKIM, DMARC), montée en charge de domaine, et réputation d'expéditeur

**Phrases déclencheuses** : « write a blog post », « ad copy », « email sequence », « social media calendar », « landing page », « content calendar », « brand voice », « content audit », « content decay », « AI content », « accessibility », « translate », « localize », « email deliverability », « subject line », « headline », « CTA », « newsletter »

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de marque actif a été affiché au démarrage de la session. Utiliser le nom de marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité, et les concurrents montrés là.
2. **Si vous avez besoin du profil complet**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, d'énergie, d'humour, d'autorité doivent façonner tout le ton et les choix de mots du contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les `target_markets` et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Consulter les benchmarks sectoriels** — Consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer `skills/context-engine/platform-specs.md` pour les limites de caractères et les exigences de format
7. **Vérifier l'historique de campagne** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier de nouveaux travaux
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les bonnes pratiques générales. »
9. **Vérifier les guidelines de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les affirmations restreintes, et les mentions légales obligatoires ; `channel-styles.md` pour les surcharges de ton spécifiques à un canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, taglines, et langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Si le contenu est produit pour un canal spécifique, les règles de style du canal priment sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter le travail de contenu, rassembler :

1. **Type de contenu** : Quel format de contenu spécifique est nécessaire ?
2. **Audience** : Pour qui ce contenu est-il destiné ? (Lien vers les personas d'Audience Intelligence si disponible)
3. **Objectif** : Que doit accomplir ce contenu ? (Trafic, conversions, engagement, éducation, rétention)
4. **Voix de marque** : Existe-t-il un guide de voix de marque ? Quel est le ton ? (Professionnel, décontracté, autoritaire, ludique, etc.)
5. **Mots-clés/Sujets** : Pour le contenu SEO — mots-clés cibles, intention de recherche, et paysage concurrentiel
6. **Plateforme** : Où ce contenu vivra-t-il ? (Les exigences spécifiques à la plateforme comptent)
7. **Étape du tunnel** : Où ce contenu s'insère-t-il dans le parcours client ?
8. **Contenu existant** : Quel contenu connexe existe déjà ? (Éviter la cannibalisation)
9. **Contraintes** : Limites de nombre de mots, limites de caractères, mentions légales réglementaires, guidelines de marque
10. **Benchmarks de performance** : À quoi ressemble le succès pour ce type de contenu ?

Pour les demandes rapides (par exemple, « écris-moi un post LinkedIn »), déduire des valeurs par défaut raisonnables et livrer immédiatement. Pour le travail de contenu stratégique, rassembler le contexte complet.

## Capacités

- **Création de contenu SEO** : Articles de blog optimisés pour les mots-clés, pages piliers, conception de clusters thématiques, titres meta/descriptions, stratégie de maillage interne, et optimisation pour les featured snippets
- **Texte publicitaire (toutes plateformes)** : Google Ads (RSA, titres, descriptions), Meta Ads (texte principal, titres, descriptions), LinkedIn Ads, TikTok Ads, Twitter/X Ads — formats et limites de caractères spécifiques à chaque plateforme
- **Séquences e-mail** : Séquences de bienvenue, drips de nurturing, abandon de panier, réengagement, onboarding, upsell/cross-sell, et séquences de reconquête avec objets, texte d'aperçu, corps de texte, et CTA
- **Contenu social** : Contenu natif de plateforme pour LinkedIn, Twitter/X, Instagram, TikTok, Facebook, YouTube, Pinterest — incluant légendes, hashtags, accroches, et structure de post
- **Texte de landing page** : Titre/sous-titre héroïque, blocs de proposition de valeur, preuve sociale, sections fonctionnalités/bénéfices, FAQ, et optimisation de CTA
- **Calendriers de contenu** : Calendriers éditoriaux avec cartographie thématique, piliers de contenu, cadence de publication, et plans de distribution par canal
- **Système de voix de marque** : Attributs de voix, spectre de ton (comment la voix s'adapte selon le contexte), guidelines de vocabulaire, exemples à faire/ne pas faire, et terminologie spécifique à la marque
- **Détection de déclin de contenu** : Méthodologie pour identifier le contenu en déclin par trafic, classements, engagement, et fraîcheur — avec priorisation de rafraîchissement
- **Gestion de la qualité du contenu IA** : Checklist de qualité pour le contenu généré par IA, approche de vérification d'originalité, revue d'alignement à la marque, protocole de fact-checking, et guidelines de supervision humaine
- **Conformité d'accessibilité** : Guidelines de contenu WCAG 2.2 AA, rédaction de texte alt, notation de lisibilité, structure de titres, texte de lien, guidance de contraste de couleur, et optimisation pour lecteur d'écran
- **Multilingue/Localisation** : Structuration de contenu prêt pour la traduction, cadre d'adaptation culturelle, guidelines de messagerie spécifiques à la locale, et considérations pour les langues RTL
- **Infrastructure e-mail** : Guidance de configuration SPF/DKIM/DMARC, calendriers de montée en charge de domaine, pratiques d'hygiène de liste, surveillance de délivrabilité, et gestion de réputation d'expéditeur

## Processus

**Workflow principal : création de contenu**

1. **Alignement de la stratégie de contenu**
   - Confirmer le type de contenu, l'audience, l'objectif, et l'étape du tunnel
   - Vérifier le contenu existant pouvant se chevaucher (éviter la cannibalisation)
   - Identifier le message central et le point à retenir clé
   - Sélectionner le cadre de contenu approprié pour la tâche

2. **Recherche et préparation**
   - Pour le contenu SEO : Analyser le mot-clé cible, l'intention de recherche, les fonctionnalités SERP, et le contenu le mieux classé
   - Pour le texte publicitaire : Revoir les spécifications de plateforme, les publicités concurrentes, et les points de douleur de l'audience
   - Pour l'e-mail : Identifier le déclencheur de séquence, l'action souhaitée, et le segment d'abonnés
   - Pour le social : Vérifier les tendances de plateforme, les formats optimaux, et les schémas de comportement de l'audience
   - Pour les landing pages : Identifier la source de trafic, l'intention du visiteur, et l'objectif de conversion

3. **Création de contenu**
   - Appliquer les guidelines de voix de marque (ou les établir si aucune n'existe)
   - Rédiger selon les exigences de format spécifiques (limites de caractères, structure, normes de plateforme)
   - Construire l'architecture de persuasion :
     - **Attention** : Accroche/titre qui arrête le défilement ou gagne le clic
     - **Intérêt** : Cadrage conscient du problème démontrant la compréhension
     - **Désir** : Positionnement de la solution avec bénéfices clairs et preuve sociale
     - **Action** : CTA clair et spécifique avec friction réduite
   - Inclure les éléments SEO le cas échéant (mots-clés, titres, liens internes, métadonnées)
   - Rédiger plusieurs variantes pour les tests lorsque le format le permet (texte publicitaire, objets d'e-mail, CTA)

4. **Assurance qualité**
   - Vérification d'alignement à la voix de marque
   - Évaluation du score de lisibilité (viser le niveau collège ou en dessous pour les audiences grand public). Exécuter l'analyseur sur le brouillon :
     ```bash
     python "${CLAUDE_PLUGIN_ROOT}/scripts/readability-analyzer.py" \
         --file "${CLAUDE_PLUGIN_DATA}/{brand}/seo/content-engine/{date}/{slug}/03-draft-v1.md" \
         --target b2c_general
     ```
     (`--text` en ligne ou `--file` chemin — mutuellement exclusifs, l'un requis ; `--target` l'un de `b2c_general`, `b2b_professional`, `b2b_technical`, `children`, `academic`.)
   - Revue d'accessibilité (hiérarchie de titres, guidance de texte alt, clarté du texte de lien)
   - Fact-checking pour toute affirmation, statistique, ou référence
   - Vérification de conformité de plateforme (politiques publicitaires, limites de caractères, exigences de format)
   - Audit SEO on-page (placement de mots-clés, métadonnées, liens internes) pour le contenu de recherche
   - Vérification de qualité du contenu IA si assisté par IA (originalité, alignement à la marque, exactitude factuelle)

5. **Plan d'optimisation et de test**
   - Définir ce qu'il faut tester en A/B (titres, CTA, objets d'e-mail, créas publicitaires)
   - Définir des benchmarks de performance selon le type de contenu et le canal
   - Planifier des dates de revue de contenu pour la surveillance du déclin
   - Planifier le recyclage de contenu sur les formats et canaux

**Workflow secondaire : audit et rafraîchissement de contenu**

1. Récupérer l'inventaire de contenu (URL, dates de publication, trafic/classements actuels)
2. Noter chaque pièce sur la fraîcheur, la tendance de performance, et la pertinence
3. Catégoriser : Garder (bonne performance), Rafraîchir (en déclin mais réparable), Consolider (léger/chevauchant), Supprimer (non pertinent/nuisible)
4. Prioriser les candidats au rafraîchissement par potentiel de récupération de trafic
5. Créer des briefs de rafraîchissement avec des instructions de mise à jour spécifiques

## Fichiers de référence

- `seo-content.md` — Optimisation des mots-clés, conception de cluster thématique, stratégie de featured snippet, et checklist SEO on-page
- `ad-copy.md` — Cadres de texte publicitaire spécifiques à la plateforme, limites de caractères, guidelines de politique, et méthodologie de test A/B
- `email-sequences.md` — Modèles de séquence (bienvenue, nurturing, abandon, etc.), formules d'objet, et cadres de rédaction e-mail
- `social-content.md` — Guidelines de contenu plateforme par plateforme, formules d'accroche, stratégie de hashtags, et pratiques de publication optimales
- `landing-pages.md` — Modèles de structure de landing page, optimisation de CTA, cadres au-dessus de la ligne de flottaison, et formules de texte de conversion
- `content-calendar.md` — Modèles de calendrier éditorial, cadres de piliers de contenu, recommandations de cadence de publication, et cartographie thématique
- `brand-voice.md` — Méthodologie de développement de voix, conception du spectre de ton, guidelines de vocabulaire, et processus d'audit de voix de marque
- `content-decay.md` — Méthodologie de détection de déclin, grille de notation de contenu, cadre de priorisation de rafraîchissement, et suivi des mises à jour
- `ai-content-quality.md` — Checklist de qualité du contenu IA, vérification d'originalité, revue d'alignement à la marque, et workflow de revue humaine
- `accessibility.md` — Checklist de contenu WCAG 2.2 AA, guide de rédaction de texte alt, standards de lisibilité, et guidelines de langage inclusif
- `multilingual.md` — Checklist de préparation à la localisation, cadre d'adaptation culturelle, gestion de traduction, et considérations RTL
- `email-infrastructure.md` — Configuration d'authentification (SPF/DKIM/DMARC), plan de montée en charge de domaine, meilleures pratiques de délivrabilité, et hygiène de liste
- `email-automation.md` — Conception de déclencheurs d'automatisation, cartographie de workflow, règles de contenu dynamique, et logique e-mail comportementale
- `case-studies.md` — Cadre Défi-Solution-Résultats, structure narrative client-héros, et meilleures pratiques de création d'étude de cas
- `personalization.md` — Modèle de maturité de personnalisation, stratégies par segment/règle/comportement, et guidance de mise en œuvre
- `video-scripting.md` — Formats et durées vidéo spécifiques à la plateforme, structures de script, et techniques d'accroche et de rétention

## Formats de résultat

| Livrable | Format | Description |
|---|---|---|
| Article de blog | Document | Contenu complet optimisé SEO avec métadonnées, titres, et suggestions de liens internes |
| Jeu de texte publicitaire | Document / Tableur | Plusieurs variantes par plateforme avec titres, descriptions, et CTA |
| Séquence e-mail | Document | Séquence complète avec objets, texte d'aperçu, corps de texte, CTA, et timing d'envoi |
| Contenu réseaux sociaux | Tableur / Calendrier | Posts organisés par plateforme, date, texte, hashtags, et direction visuelle |
| Texte de landing page | Document | Texte section par section avec titre, sous-titre, corps, puces, CTA, et texte de formulaire |
| Calendrier de contenu | Tableur | Plan éditorial mensuel/trimestriel avec thèmes, sujets, formats, canaux, et responsables |
| Guide de voix de marque | Document | Système de voix complet avec attributs, spectre de ton, vocabulaire, et exemples |
| Rapport d'audit de contenu | Tableur + Document | Inventaire avec scores, catégorisation, et recommandations de rafraîchissement priorisées |
| Rapport d'accessibilité | Document checklist | Évaluation d'accessibilité au niveau du contenu avec étapes de remédiation spécifiques |

## Cas particuliers

### Contenu de secteur réglementé (mentions légales requises)
- **Situation** : Santé, services financiers, juridique, assurance, cannabis, jeux d'argent, ou autres secteurs nécessitant des mentions légales, divulgations, ou langage de conformité obligatoires
- **Approche** : Signaler l'exigence réglementaire dès le début de la création de contenu. Inclure un texte de mention légale substitut et recommander une revue juridique avant publication. Pour les plateformes publicitaires, noter les restrictions de politique spécifiques (par exemple, mentions légales de services financiers de Facebook, politiques publicitaires santé de Google). Ne jamais présenter le contenu marketing comme conforme sans revue juridique — toujours recommander une vérification de conformité professionnelle. Garder le texte marketing et le langage de conformité visuellement distincts.

### Campagnes multilingues
- **Situation** : Le contenu doit fonctionner sur plusieurs langues et contextes culturels
- **Approche** : Rédiger le contenu source en pensant à la localisation (éviter les idiomes, références culturelles, humour qui ne se traduiront pas). Créer un brief de localisation aux côtés du contenu signalant les éléments culturellement sensibles. Ne pas utiliser la traduction automatique pour les livrables finaux — recommander des traducteurs professionnels avec expertise marketing. Pour les langues RTL (arabe, hébreu, farsi), signaler les implications de mise en page pour les équipes design. Tenir compte de l'expansion du texte (le texte allemand est environ 30 % plus long que l'anglais) dans les formats à caractères limités.

### Cannibalisation de contenu
- **Situation** : Plusieurs pages en concurrence pour le même mot-clé ou couvrant le même sujet
- **Approche** : Auditer le contenu existant avant d'en créer un nouveau. Si la cannibalisation existe, recommander la consolidation (fusionner les pages plus faibles en une seule page forte) plutôt que de créer encore une nouvelle pièce concurrente. Utiliser des balises canoniques, le maillage interne, et la différenciation de contenu pour résoudre la cannibalisation existante. Lors de la création de nouveau contenu, vérifier le chevauchement de mots-clés et de sujets avec l'inventaire existant.

### Divulgation de contenu généré par IA
- **Situation** : L'utilisateur veut publier du contenu généré par IA et a besoin de guidance sur la divulgation
- **Approche** : Recommander la transparence. Noter que les politiques de plateforme évoluent (Google ne pénalise pas le contenu IA mais valorise la qualité ; certaines plateformes sociales exigent une divulgation IA). Toujours recommander une revue et une édition humaine des brouillons générés par IA. Signaler que le contenu purement généré par IA sans supervision humaine risque des erreurs factuelles, des incohérences de marque, et des problèmes de confiance de l'audience. Fournir la checklist d'assurance qualité pour le contenu assisté par IA.

### Accessibilité pour le contenu vidéo/audio
- **Situation** : Le contenu inclut de la vidéo, de l'audio, ou des éléments interactifs nécessitant un traitement d'accessibilité
- **Approche** : Recommander des sous-titres (pas auto-générés — l'exactitude compte) pour tout contenu vidéo. Fournir des descriptions audio pour les informations purement visuelles dans les vidéos. Créer des transcriptions pour les podcasts et le contenu audio. Assurer que les éléments interactifs sont navigables au clavier. Tester avec des lecteurs d'écran. Suivre WCAG 2.2 AA au minimum, avec AAA comme objectif ambitieux pour le contenu public.

### Langues RTL
- **Situation** : Contenu en arabe, hébreu, farsi, ourdou, ou autres langues de droite à gauche
- **Approche** : Signaler les implications RTL tôt dans le processus. La structure du contenu, le placement des CTA, et la hiérarchie visuelle s'inversent tous. Les nombres et le texte latin intégré restent LTR au sein d'un contexte RTL (texte bidirectionnel). Recommander une revue par un locuteur natif pour tout contenu RTL. Les modèles de design doivent prendre en charge les mises en page RTL. Tester les modèles d'e-mail en mode RTL spécifiquement, car de nombreux clients e-mail gèrent le RTL de façon incohérente.

## Convention de résultat numéroté

Tous les résultats de content-engine vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/content-engine/{YYYY-MM-DD}/{slug}/` :

```
00-input.md                topic, target keyword, intent, format, source brief (from keyword-cluster?)
01-research.md             source list, key data points, expert quotes, competitor references
02-outline.md              H1, H2/H3 structure with target word counts per section
03-draft-v1.md             first complete draft
04-fact-check.md           per-claim verification + citations
00-source-draft.md         the author's own words, verbatim (ONLY when --source-draft was given)
05-humanize.md             AI-pattern detection + rewrite log (flags from scripts/ai-tell-scan.py)
05-scans.json              Surface + structural scan output, keyed {"surface":…, "structure":…}
05-authorship.json         author-sentence provenance (ONLY when 00-source-draft.md exists)
06-brand-voice-check.md    voice score (formality/energy/humor/authority) vs brand profile
07-seo-checklist.md        title, meta, schema, internal links, image alt text
08-quality-scorecard.md    the gates below
09-publish-ready.md        final clean copy + handoff metadata
PLAN.md                    summary + publish instructions
```

## Tableau de bord qualité

| Porte | Ce qu'elle vérifie |
|---|---|
| **brand_voice_match** | `06-brand-voice-check.md` montre une **`distance` ≤ 0,15 sur chaque axe** (formalité/énergie/humour/autorité). **L'unité est l'échelle 0-1 du scoreur, pas l'échelle 1-10 du profil.** Cette porte indiquait auparavant « ≤ 1,5 point d'écart » alors que `brand-voice-scorer.py` émet une `distance` bornée à 1,0 — donc lue littéralement, elle ne pouvait jamais échouer, ce qui est le même défaut de porte creuse qu'une porte sans mesure derrière elle. 0,15 est le seuil que le scoreur utilise déjà en interne pour signaler un écart. Notez ce que cela mesure et ne mesure pas : les valeurs d'axe cible proviennent du mapping de descripteurs de voix en nombres de `brand-setup`, et il n'existe pas de référentiel pour les descripteurs qu'il n'a pas vus — donc un ÉCHEC ici est une invitation à vérifier les cibles du profil autant que le texte |
| **fact_check_clean** | `04-fact-check.md` montre 0 affirmation non vérifiée et ≥ 1 citation par déclaration factuelle |
| **humanize_passed** | `python "${CLAUDE_PLUGIN_ROOT}/scripts/ai-tell-scan.py" --file 05-humanize.md` rapporte `humanize_passed: true` — c'est-à-dire que `flagged_paragraph_pct` ≤ le seuil de la marque (10 % par défaut). **Exécutez le script ; ne jugez pas cela à l'œil.** Voir « Étape d'humanisation » ci-dessous pour ce qui constitue un signalement |
| **seo_complete** | `07-seo-checklist.md` montre un title ≤ 60 caractères, une meta de 150-160 caractères, ≥ 1 type de schéma, ≥ 3 liens internes, toutes les images ont un texte alt. **Deux critères prennent un `N/A` explicite plutôt qu'un succès :** les liens internes lorsque la marque n'a pas de site publié (le premier article d'une marque pré-lancement ne peut lier en interne vers rien — enregistrer `N/A (no site)` et la porte l'ignore, mais ne jamais l'enregistrer comme atteint), et le texte alt lorsque la pièce n'a pas d'images (0 sur 0 est un succès qui ne vérifie rien — enregistrer `N/A (no images)`). Un `N/A` doit nommer sa raison ; un `N/A` nu est un ÉCHEC |
| **eu_disclosure_if_ai** | Si la marque a des `target_markets` incluant l'UE ET que le contenu est généré par IA, `09-publish-ready.md` porte la divulgation article 50 requise (lisible par machine + visible) |

`status: ready` nécessite que les cinq portes réussissent — **et que l'audit d'exécution les re-dérive :**

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/run-audit.py" --run-dir "${CLAUDE_PLUGIN_DATA}/{brand}/seo/content-engine/{date}/{slug}"
```

Exécutez-le après avoir écrit `08-quality-scorecard.md` et avant de déclarer `status: ready`. Il re-dérive ce que la scorecard prétend à partir des artefacts eux-mêmes : chaque artefact numéroté présent, le verdict d'humanisation re-mesuré avec une exécution fraîche de `ai-tell-scan.py` (jamais lu depuis la scorecard), aucun JSON de scan intégré dans le fichier que `authorship.py` mesure, l'enregistrement d'authorship correspondant à une mesure fraîche lorsqu'un brouillon source existe, les distances de voix enregistrées effectivement dans la porte de 0,15, et le texte prêt à publier exempt de placeholders de production. **Un code de sortie 1 signifie que la scorecard prétend quelque chose que les artefacts ne soutiennent pas — corrigez le constat, jamais la formulation.** Le verdict atterrit dans `run-audit.json` à côté des artefacts, afin que le prochain lecteur puisse voir que l'exécution a été vérifiée plutôt que crue sur parole.

## Divulgation d'assistance IA (toutes les exécutions, pas seulement l'UE)

Au-delà de la porte UE ci-dessus, chaque brouillon prêt à publier applique le bloc `ai_disclosure` de la marque depuis profile.json — `{"mode": "claude-surfaces"|"always"|"off", "text": null|custom, "author": null|name}` (bloc manquant = le défaut : claude-surfaces, pas de texte personnalisé, pas d'auteur).

1. Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/detect_surface.py" --mode {mode}` — son champ `disclosure_applies` EST la décision. Le mécanisme de sécurité est délibéré : une surface `uncertain` applique la divulgation en mode claude-surfaces (l'ignorer nécessite une empreinte non-Claude AFFIRMATIVE). Ne jamais outrepasser la réponse du script en devinant.
2. Lorsqu'elle s'applique, ajouter le bloc comme dernier paragraphe de contenu de `09-publish-ready.md` — à l'intérieur du corps, afin qu'il survive à `/digital-marketing-pro:publish-blog` — en utilisant : pas de texte personnalisé et pas d'auteur → `*Créé avec l'assistance de l'IA et relu par notre équipe éditoriale.*` ; auteur défini → `*Créé avec l'assistance de l'IA ; recherché, vérifié, et édité par {author}.*` ; texte personnalisé → verbatim. La formulation par défaut est neutre vis-à-vis du fournisseur (aucun nom de modèle ou de fournisseur) et ne revendique que la revue que ce pipeline effectue. Le champ auteur est OPTIONNEL — ne jamais inventer un nom, ne jamais bloquer parce qu'il est vide.
3. Enregistrer la décision dans les métadonnées de transfert dans tous les cas : `disclosure: {applied, mode, surface}` — une divulgation non appliquée est un choix enregistré, pas une omission.

## Étape d'humanisation (`05-humanize.md`) — ce qu'un signalement est réellement

La porte `humanize_passed` est mesurée par `scripts/ai-tell-scan.py`, pas par impression. Exécutez-le et traitez les signalements qu'il renvoie.

**`05-scans.json` contient LES DEUX scans sous des clés nommées — jamais deux documents JSON dans un seul fichier.** Écrivez-le comme `{"surface": {...ai-tell-scan output...}, "structure": {...structural-tell-scan output...}}`. Deux redirections `>` vers le même chemin produisent un fichier que `json.load` rejette ; une exécution ayant fait exactement cela est comment ce problème a été découvert. Sous Windows, rediriger avec `PYTHONIOENCODING=utf-8` défini — l'encodage cp1252 par défaut encode le tiret cadratin de la note consultative en octet `0x97` et le fichier échoue alors à s'analyser.

**Gardez `05-humanize.md` limité au corps de l'article.** `scripts/authorship.py --draft 05-humanize.md` classifie chaque phrase de ce fichier, donc le JSON de scan ou le texte de rapport qui y vit est compté comme du texte ajouté par la machine contre la part de l'auteur. Mesuré sur une exécution réelle : ajouter le JSON de scan et un court rapport a fait passer `author_word_share` de 0,253 à 0,206 et a fait basculer `may_claim_authored` de vrai à faux — refusant à l'auteur le crédit d'un travail qu'il avait réellement fait, uniquement à cause de la disposition du fichier. Les rapports vont dans `05-scans.json`, le fichier brouillon reste le brouillon.

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/ai-tell-scan.py" --file 05-humanize.md [--max-flagged-pct N]
```

**Deux tells comptent pour la porte**, car ils sont suffisamment précis pour être bloquants :

- **`significance_marker`** — une phrase dont le seul rôle est de dire au lecteur ce qu'une phrase voisine signifie : « voilà le truc », « c'est exactement ce qui m'a marqué », « ce qui est précisément le problème », « laissez cela infuser ». → **SUPPRIMEZ la phrase. Ne la reformulez pas.** Le spécifique qu'elle pointe fait déjà le travail ; adoucir un marqueur en un marqueur plus doux n'est pas une correction. Si le moment compte, revenez au spécifique plutôt que de l'annoncer.
- **`soft_adverb_cluster`** — deux occurrences ou plus parmi honnêtement / vraiment / réellement / littéralement / en fait / fondamentalement / tranquillement dans une phrase → supprimez-les. Une phrase qui a besoin de force a besoin d'un spécifique, pas d'un adverbe.

**Tout ce que le scan rapporte par ailleurs est du contexte consultatif, pas matière à porte** — `llm_favored_word`, les ouvertures connectives (« Donc, », « Cependant, »), les ouvertures participiales, la densité de tirets cadratins, et les phrases courtes non étayées. Celles-ci apparaissent aussi dans l'écriture humaine ordinaire, et en faire une porte échouerait sur du bon texte et lancerait le pipeline dans des réécritures inutiles. Corrigez-les là où le scan a raison ; ne poursuivez pas le chiffre.

- **`llm_favored_word`** (consultatif depuis le 2026-08-15) — approfondir, exploiter, fluide, tapisserie, témoignage, central, myriade… → toujours à corriger : utilisez le mot simple que vous diriez à voix haute, ou mieux, un nom concret issu du sujet propre de la pièce. Il a cessé de compter pour la porte après mesure : sur 272 extraits de texte publiés avant l'existence de ChatGPT, 23 de ces mots se sont déclenchés et **chacun ne s'est déclenché que sur l'écriture humaine, jamais sur l'écriture du modèle**. L'anglais technique et journalistique utilise « robuste », « faciliter » et « exploiter » normalement, tandis que les modèles actuels ont largement été entraînés à s'en éloigner — donc en tant que signal bloquant, cela ne pourrait produire que des faux positifs.

### Ce que réussir cette porte signifie et ne signifie pas

Réussir signifie **aucun cluster dense des deux tells précis**. C'est un plancher, pas un verdict. Mesuré sur 39 documents publiés avant l'existence de ChatGPT, la porte n'en a échoué aucun ; mesuré sur 18 documents de prose de modèle non éditée, elle n'en a attrapé aucun. Donc un succès n'est pas une preuve que la pièce se lit comme écrite par une personne, et cela n'attraperait pas une étape d'humanisation qui n'aurait rien fait du tout. Traitez `advisory_rating` et le scan structurel comme le signal destiné à l'éditeur — ils séparent bien les deux classes (la prose de modèle non éditée atterrit HIGH 83 % du temps contre 9 % pour la prose humaine publiée) — et traitez les deux comme une liste de tâches pour une personne, jamais comme une preuve d'authorship.

**Le correctif pour tout signalement est un spécifique vérifié depuis `04-fact-check.md`, jamais un synonyme échangé et jamais un fait inventé.** S'il n'existe aucun ancrage pour une phrase, coupez la phrase ou ajoutez une réserve défendable — n'inventez pas un chiffre, une date, une source, ou un exemple pour faire sonner le texte comme humain.

## Apportez vos propres mots (`--source-draft`)

Lorsque l'utilisateur fournit son propre brouillon brut — une transcription de note vocale, des puces, un jet de flux de conscience — enregistrez-le verbatim comme `00-source-draft.md` et construisez la pièce **autour de leurs phrases plutôt que par-dessus**. Ne le nettoyez pas à l'entrée ; le désordre est le signal.

- Reportez leurs phrases dans `03-draft-v1.md` **verbatim** — fautes de frappe, phrases à rallonge, minuscules et tout le reste. Ne jamais paraphraser, condenser, fusionner, ou corriger la grammaire ; « améliorer » leur voix est ce qui supprime leur authorship.
- **Les tells de l'étape d'humanisation ne s'appliquent pas à leurs phrases.** Si l'auteur a écrit « voilà le truc », cela reste. Un motif décrit ce qu'un modèle écrit sans y être invité, pas ce qu'une personne a choisi de dire.
- Ajoutez votre matériel *entre* leurs phrases : la recherche, les spécifiques sourcés, la structure, les sections qu'ils n'ont fait qu'esquisser.
- **Leurs affirmations sont leur voix, pas des faits vérifiés.** Tout ce qui est factuel que VOUS AJOUTEZ vient toujours de `04-fact-check.md`. Si l'une de leurs affirmations contredit la recherche, signalez-le pour l'éditeur humain et laissez la phrase telle quelle — c'est à eux de décider, pas à vous.
- Après l'humanisation, vérifiez que la promesse a été tenue :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/authorship.py" \
  --source 00-source-draft.md --draft 05-humanize.md --out 05-authorship.json
```

Un code de sortie 3 signifie que des phrases de l'auteur ont été réécrites ou supprimées. **Restaurez-les verbatim et relancez jusqu'à obtenir un code 0.** Ceci n'est pas consultatif : chaque scan de tells IA ici reste consultatif car un signal de détecteur est une opinion probabiliste, mais « l'auteur a écrit cette phrase et elle n'est plus là » est un fait vérifiable sur une promesse que ce pipeline a faite.

- **Divulgation exacte quant à la provenance.** Lorsque `05-authorship.json` rapporte `may_claim_authored: true` — ce qui exige à la fois que ≥25 % des mots finaux soient ceux de l'auteur verbatim ET qu'aucune de leurs phrases n'ait été réécrite ou supprimée — la divulgation dans `09-publish-ready.md` devient `*Écrit par {author} avec l'assistance de l'IA pour la recherche, la structure, et le fact-checking.*` (ou, sans auteur nommé, `*Écrit à partir du brouillon original de l'auteur, développé avec l'assistance de l'IA et relu avant publication.*`). Sinon, utilisez la formulation standard ci-dessus. **Ne jamais déduire l'authorship d'autre chose que cet enregistrement.** La direction est à sens unique par conception : un enregistrement d'authorship ne peut jamais que rendre une divulgation PLUS spécifique quant à l'implication humaine ayant réellement eu lieu. Surestimer l'authorship humaine est la seule forme de cette déclaration qu'un lecteur ne peut pas vérifier.
- Il n'y a pas de ratio cible. `author_word_share` existe pour que la divulgation soit exacte ; aucun chiffre ne rend un texte « suffisamment humain », et rien ici ne vise un détecteur.

## Passe de tells structurels (consultative, jamais une porte)

Après `05-humanize.md`, exécutez `python "${CLAUDE_PLUGIN_ROOT}/scripts/structural-tell-scan.py" --file {draft}` — la couche STRUCTURELLE de Niveau 2 (dérivée de StoryScope : le texte IA reste détectable sur la structure même après une passe de surface parfaite). Là où il rapporte NOTE/ATTENTION (chutes moralisatrices, symétrie de modèle, faible spécificité, absence de point de vue, rythme uniforme, développement d'entités), appliquez des éditions structurelles ancrées dans le fichier de fact-check : coupez le point à retenir explicité, brisez la symétrie que le contenu ne mérite pas, ajoutez des faits spécifiques vérifiés (jamais inventés), prenez une position défendable.

**`entity_development`** mérite sa propre note car il est facile de le corriger de la mauvaise façon. Une bande NOTE/ATTENTION signifie que la pièce introduit nom après nom et chiffre après chiffre, chacun mentionné une fois et abandonné — une machine établissant un décor plutôt qu'un expert construisant une argumentation. **Corrigez en développant, jamais en supprimant :** donnez à un spécifique sur lequel l'argument repose déjà une seconde mention substantielle depuis `04-fact-check.md` — ce qu'il implique, qui le conteste, ce qu'il a coûté. Couper des spécifiques pour faire baisser ce chiffre abaisserait le constat de `specificity` dans le même scan, qui compte davantage, et inventer une mention est interdit purement et simplement. Le proxy reste silencieux en dessous de 600 mots ou 12 entités distinctes, car une pièce courte nomme les choses une fois faute de place. Ajoutez le JSON du scan à **`05-scans.json`** sous la clé `"structure"`, aux côtés de la clé `"surface"` du scan de surface (jamais dans `05-humanize.md` — voir l'étape d'humanisation : ce fichier est mesuré phrase par phrase par `authorship.py`) et notez la bande globale dans `08-quality-scorecard.md` comme CONSULTATIF — cela ne bloque jamais `status: ready`, et cela ne mesure que la structure visible (cela ne peut ni voir ni n'a de relation avec un quelconque filigrane statistique).

## Transferts de chaîne

- **Amont :** `/digital-marketing-pro:content-brief` (préféré — déjà recherché) ou `/digital-marketing-pro:keyword-cluster` (`06-pillar-pages.md` devient des briefs de contenu)
- **Aval :**
  - `/digital-marketing-pro:publish-blog` — pousse le brouillon prêt à publier vers le CMS
  - `/digital-marketing-pro:content-repurpose` + `/digital-marketing-pro:social-strategy` — recycle l'article sur les plateformes
  - `/digital-marketing-pro:check` — porte finale avant publication
  - `/digital-marketing-pro:c2pa-metadata` — si des images générées par IA accompagnent l'article et que des marchés UE sont ciblés

## Conseils et mises en garde

- **La tolérance d'écart de voix de marque est par axe, pas agrégée.** Une pièce qui est à 1 point d'écart sur chaque axe n'est pas la même chose qu'une pièce à 4 points d'écart sur l'humour seul — cette dernière est un échec même si la moyenne semble correcte.
- **L'étape d'humanisation n'est pas une garantie** contre les outils de détection IA — c'est une amélioration probabiliste, et aucun scan ici ne détecte ni ne supprime de filigrane statistique. `ai-tell-scan.py` ne mesure que le texte visible. Pour les pièces qui doivent minimiser les motifs à consonance IA, exécutez des passes d'humanisation supplémentaires et re-notez avec `/digital-marketing-pro:eval-content`, en itérant jusqu'à ce que les motifs signalés disparaissent ; une passe d'édition humaine finale reste le signal le plus fort — et le signal le plus fort de tous est les propres phrases de l'auteur, ce que `--source-draft` préserve.
- **Le fact-check est la porte de contenu la plus souvent sautée.** Ne livrez pas une pièce avec « 0 non vérifié » simplement parce que personne n'a regardé. Exécutez `/digital-marketing-pro:verify-claims` contre le brouillon si vous n'aviez pas de fact-checker dans la boucle.
- **Pour le contenu pilier,** visez la borne supérieure du nombre de mots (3000+ pour le SaaS, 5000+ pour la recherche B2B) — les pages piliers ont besoin de profondeur pour l'autorité thématique. Pour le contenu déclinaison, la borne inférieure convient.
- **N'écrivez pas la meta description en dernier.** Écrivez-la EN PREMIER, avant l'article — c'est la réponse à « quelle est la promesse de cette page ? » L'écrire en dernier produit des résumés a posteriori qui ne pilotent pas l'intention de clic.

## Compétences liées

- **Audience Intelligence** — Pour le ciblage de contenu spécifique aux personas et une messagerie qui résonne avec les segments définis
- **AEO/GEO Intelligence** — Pour optimiser le contenu afin qu'il soit cité par les moteurs de réponse IA et maintenir la cohérence d'entité
- **Campaign Orchestrator** — Pour cartographier le contenu vers les canaux de campagne et assurer la cohérence des messages sur tous les points de contact
- **Funnel Architect** — Pour aligner le contenu sur les étapes du tunnel et s'assurer que chaque étape dispose d'un support de contenu approprié
- **Digital PR & Authority** — Pour le contenu de leadership éclairé, les communiqués de presse, et la construction d'autorité E-E-A-T à travers le contenu
- **Analytics & Insights** — Pour mesurer la performance du contenu, identifier le déclin, et optimiser sur la base des données

## Efficacité contextuelle

Les documents de référence de cette compétence (`skills/<this-skill>/*.md`) totalisent environ 30-50 Ko. Ne les chargez pas avidement — sélectionnez des sections ciblées :

- **Grep avant Read.** Trouvez d'abord le mot-clé ou le titre de section, puis lisez avec `offset` + `limit` pour extraire uniquement cette plage.
- **Parcourez `${CLAUDE_SKILL_DIR}` une seule fois.** Utilisez un seul listage de répertoire pour voir ce qui s'y trouve, puis lisez uniquement les fichiers correspondant à votre étape actuelle.
- **Une source à la fois.** Si le workflow dit « consultez trois fichiers de référence », lisez-les séquentiellement après avoir décidé ce dont vous avez besoin de chacun. Charger les trois en bloc dépasse le budget de 5K tokens par compétence que la compaction automatique réserve.
- **Éliminez le bruit des entrées CSV.** Si l'entrée est un grand CSV, grep d'abord la ligne d'en-tête pour choisir les colonnes, puis traitez ligne par ligne — ne lisez pas le fichier entier en contexte.

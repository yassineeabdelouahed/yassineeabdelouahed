---
name: content-repurpose
description: "Transformez un contenu unique en un plan de recyclage multicanal — une matrice de déclinaisons ciblant plus de 10 formats, des brouillons complets adaptés à chaque plateforme, un calendrier de publication, des liens taggés UTM et des scores d'alignement à la voix de marque par déclinaison ; chaque déclinaison doit réussir le test d'autonomie (accroche propre, chute propre) et la liste des éléments écartés consigne ce qui n'a pas passé le test. Se déclenche sur « /digital-marketing-pro:content-repurpose », « recycle cet article de blog », « transforme ce webinaire en posts sociaux », « tire plus de valeur de cet article », « décompose ce livre blanc ». Produit des brouillons et un calendrier, pas des publications déjà en ligne. Lit le profil de marque, les déclinaisons de style par canal et les spécifications de plateforme."
---

# /digital-marketing-pro:content-repurpose

## Objectif

Prendre un contenu existant et générer un plan de recyclage complet sur plusieurs canaux et formats. Produit des déclinaisons de contenu, un calendrier de publication et des adaptations spécifiques à chaque plateforme afin de maximiser le retour sur investissement de chaque contenu produit.

## Éléments à fournir

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu source** : Le matériel d'origine — une URL, un texte collé, un document téléversé, ou une description du contenu (article de blog, enregistrement de webinaire, épisode de podcast, livre blanc, étude de cas, présentation, vidéo, etc.)
- **Canaux cibles** : Les plateformes et formats vers lesquels recycler le contenu (LinkedIn, Twitter/X, Instagram, newsletter e-mail, blog, YouTube, TikTok, podcast, infographie, etc.) ou demander des recommandations
- **Contexte de voix de marque** : Préférences de ton et de style (chargées automatiquement depuis le profil de marque si disponible)
- **Objectifs prioritaires** : Ce que le contenu recyclé doit accomplir (trafic, engagement, génération de leads, leadership éclairé, backlinks SEO)
- **Délai** : La rapidité à laquelle le contenu recyclé doit être mis en ligne (le jour même, une semaine, deux semaines, diffusion continue)
- **Contraintes** : Plateformes à exclure, restrictions de contenu, exigences de conformité ou circuits de validation
- **Données de performance du contenu** : Optionnel — les indicateurs d'engagement du contenu d'origine pour identifier les éléments les plus forts

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour connaître le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix, la conformité, le contexte sectoriel. Vérifier `guidelines/_manifest.json` pour les restrictions, les éléments de discours, les styles par canal, les règles de ton et voix, et les modèles. Si un modèle correspondant à cette commande existe dans `~/.claude-marketing/brands/{slug}/templates/`, appliquer son format. Si aucune marque n'existe, proposer `/digital-marketing-pro:brand-setup` ou continuer avec les valeurs par défaut.
2. **Vérifier l'historique des campagnes** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` afin d'identifier les campagnes liées et les contenus déjà publiés vers lesquels les déclinaisons peuvent renvoyer ou faire référence.
3. **Analyser le contenu d'origine** : Extraire les éléments essentiels — messages clés, données chiffrées, citations marquantes, statistiques, processus étape par étape, concepts visuels, accroches narratives, éclairages contre-intuitifs et principaux enseignements. Identifier quels éléments sont les plus forts pour chaque format cible.
4. **Établir la correspondance avec les formats par canal** : Construire une matrice de recyclage faisant correspondre le contenu d'origine à des formats dérivés : blog vers fils sociaux, webinaire vers série de blog, podcast vers audiogrammes, livre blanc vers infographie, étude de cas vers posts de témoignages, présentation vers posts carrousel, contenu long vers extraits courts, et inversement. Viser plus de 10 déclinaisons par source — **mais cet objectif ne prime jamais sur le test d'autonomie ci-dessous ; huit déclinaisons solides valent mieux que douze dont quatre ne sont que du remplissage.**
4.5. **Appliquer le test d'autonomie — et écarter ce qui échoue** : Chaque déclinaison doit fonctionner pour quelqu'un qui ne verra jamais la source : sa propre accroche, sa propre chute, aucune dette de contexte (« comme évoqué dans l'article complet » est un échec). Toutes les sections d'une source ne sont pas recyclables — un passage qui ne fonctionne que dans l'argumentaire de l'original n'est pas une déclinaison faible en attente d'un meilleur montage, ce n'est simplement pas une déclinaison. Lister ce qui a été écarté et pourquoi, à côté de la matrice ; cette liste est la preuve que le filtre a fonctionné. Classer les survivants selon leur capacité à tenir seuls, et mettre en tête de calendrier les plus solides.
5. **Appliquer les spécifications de plateforme** : Se référer à `skills/context-engine/platform-specs.md` pour les limites de caractères, dimensions d'image, durées vidéo, bonnes pratiques de hashtags et exigences de format par plateforme. Adapter chaque déclinaison aux conventions natives de la plateforme.
6. **Adapter le message pour chaque format** : Réécrire et restructurer le contenu pour chaque déclinaison — pas une simple troncature mais une véritable adaptation. Un post LinkedIn a besoin d'une accroche et d'une structure différentes d'un fil Twitter/X, qui diffère lui-même d'un extrait de newsletter e-mail ou d'un carrousel Instagram. Correspondre au style de contenu natif de chaque plateforme.
7. **Appliquer les déclinaisons de voix par canal** : Si les directives de marque incluent `channel-styles.md`, appliquer les ajustements de ton propres à chaque plateforme (par exemple, plus décontracté sur les réseaux sociaux, plus autoritaire par e-mail, plus concis sur Twitter/X).
8. **Générer un calendrier de contenu pour les déclinaisons** : Séquencer le contenu dérivé sur un calendrier de publication. Espacer les déclinaisons liées pour éviter la lassitude de l'audience. Mettre en avant les formats à fort impact suivis des pièces de soutien. Aligner avec les meilleurs horaires de publication par plateforme.
9. **Évaluer chaque variante pour l'alignement avec la voix de marque** : Vérifier chaque déclinaison par rapport aux paramètres de voix de marque (formalité, énergie, humour, autorité) et aux déclinaisons de style par canal issues des directives. Signaler toute déclinaison qui s'écarte de la voix établie.
10. **Ajouter le suivi et l'attribution** : Attacher des paramètres UTM à tous les liens du contenu dérivé afin que le trafic renvoyé vers l'original ou les pages d'atterrissage puisse être attribué à la déclinaison et à la plateforme spécifiques.
11. **Définir des indicateurs de performance par format** : Fixer des repères d'engagement pour chaque déclinaison (impressions, clics, partages, enregistrements, commentaires) sur la base des moyennes de la plateforme et des performances historiques de la marque.

## Résultat

Un plan de recyclage de contenu structuré contenant :

- Résumé du contenu d'origine avec les éléments clés extraits (messages, données, citations, accroches, enseignements)
- Matrice de recyclage faisant correspondre le contenu d'origine à plus de 10 formats dérivés sur différents canaux
- Brouillon complet de chaque déclinaison, adapté aux conventions et au style natif de la plateforme
- Notes de formatage spécifiques à la plateforme (nombre de caractères, spécifications d'image, jeux de hashtags, format de publication)
- Calendrier de publication avec dates, horaires et logique de séquencement recommandés
- Score d'alignement à la voix de marque pour chaque déclinaison, avec notes d'ajustement le cas échéant
- Stratégie de maillage reliant les déclinaisons entre elles et à l'original
- Projections de portée et d'engagement estimées par format, basées sur les repères du canal
- Liens taggés UTM pour chaque déclinaison permettant le suivi de l'attribution
- Repères de performance par format avec critères de réussite pour chaque déclinaison
- Exigences en matière d'éléments visuels par déclinaison (dimensions d'image, spécifications vidéo, notes de conception)
- Recommandations de hashtags et de mots-clés par plateforme pour la découvrabilité
- Suggestions d'accroches d'engagement et d'appels à l'action adaptés au comportement de l'audience de chaque plateforme

## Agents utilisés

- **content-creator** — Analyse de contenu, rédaction des déclinaisons, adaptation de format, alignement de voix, planification du calendrier éditorial et stratégie de maillage
- **social-media-manager** — Mise en forme spécifique à la plateforme, rédaction de posts sociaux, stratégie de hashtags, optimisation du calendrier de publication, conception d'accroches d'engagement et coordination cross-plateforme
</content>

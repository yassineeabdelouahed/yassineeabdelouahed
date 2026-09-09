---
name: ad-creative
description: "Générer 3 à 5 variantes de texte publicitaire par plateforme — titres, descriptions et CTA formatés selon les spécifications Google, Meta, LinkedIn, TikTok, X et Pinterest — chacune notée de 1 à 10 avec des signaux de conformité aux politiques, des regroupements pour tests A/B et une vérification de la cohérence du message avec la landing page. Se déclenche sur \"/digital-marketing-pro:ad-creative\", \"write ad copy for Meta\", \"give me RSA headline variations\", \"we need LinkedIn ad copy\", \"draft TikTok ad creative\". Lit le profil de marque, les guidelines et les règles de conformité ; renvoie les scripts de vidéo publicitaire vers /digital-marketing-pro:video-script et soumet les visuels générés par IA pour les campagnes UE à /digital-marketing-pro:c2pa-metadata et /digital-marketing-pro:check."
argument-hint: "[platform]"
---

# /digital-marketing-pro:ad-creative

## Objectif

Générer des variantes de texte publicitaire performantes, adaptées à des plateformes et formats spécifiques. Chaque variante est notée pour sa qualité et sa conformité, avec des recommandations de stratégie de test.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Produit/service** : ce qui est promu
- **Plateforme(s)** : Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok, X, Pinterest
- **Format publicitaire** : RSA, image simple, carrousel, script vidéo, story, etc. Pour les scripts de vidéo publicitaire (bumper 6 s, format skippable 15 s, spot 30 s, style UGC), rediriger vers /digital-marketing-pro:video-script — son étape 2.4 porte les règles structurelles propres à chaque format (le délai de 5 secondes avant le skip, les bumpers à message unique, la divulgation en style natif) et son résultat passe par le filtre /check. Cette compétence gère la couche texte autour de la vidéo : titres, descriptions et CTA.
- **Objectif de la campagne** : notoriété, trafic, leads, conversions, installations d'application
- **Audience cible** : à qui s'adressent les publicités
- **Offre/CTA clé** : promotion, proposition de valeur ou action souhaitée
- **URL de la landing page** : vers où la publicité dirige le trafic (facultatif)

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifier également l'existence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Identifier les contraintes propres à chaque plateforme : limites de caractères, exigences de format, restrictions de politique
3. Générer 3 à 5 variantes de texte publicitaire par plateforme, chacune avec un angle distinct (bénéfice, urgence, preuve sociale, curiosité, direct)
4. Noter chaque variante sur : l'alignement de marque, la clarté, l'impact émotionnel, la force du CTA, la conformité aux politiques
5. Signaler toute violation potentielle des politiques (allégations restreintes, langage interdit)
6. Recommander des regroupements de tests A/B et un ordre de priorité
7. Si une URL de landing page est fournie, vérifier la cohérence du message entre la publicité et la page

## Résultat

Pour chaque plateforme, un ensemble de variantes de texte publicitaire comprenant :

- Titres, descriptions et CTA formatés selon les spécifications de la plateforme
- Un score de qualité (1-10) avec justification par variante
- Une vérification de conformité aux politiques avec les problèmes signalés
- Une recommandation de test A/B avec une hypothèse pour chaque test
- Une évaluation de la cohérence du message (si la landing page est fournie)
- Des notes de direction créative pour les assets visuels/vidéo (voir les recommandations de génération d'images/vidéos par IA ci-dessous)

### Recommandations de génération d'images et de vidéos par IA (mai 2026)

Lorsque le brief inclut des visuels statiques ou de la vidéo courte, recommander le modèle adapté au cas d'usage et signaler la charge de conformité associée :

| Type d'asset | Modèle recommandé (mai 2026) | Quand l'utiliser | Note de conformité |
|---|---|---|---|
| Photos produit hero, photographie lifestyle, vignettes e-commerce | **Google Nano Banana Pro** (Gemini 3 Pro Image, composition multi-image, cohérence des personnages/objets) | Rendu de texte solide à l'intérieur des images (logos, texte sur emballage), cohérence du personnage de marque sur l'ensemble d'une campagne, réalisme produit haute fidélité. | Les sorties sont filigranées par défaut avec SynthID ; signer AUSSI avec C2PA via `/digital-marketing-pro:c2pa-metadata` avant toute diffusion dans l'UE. |
| Vidéo sociale courte (reels ≤8 s, format vertical organique) | **Gemini Veo 3.1** (audio natif synchronisé, clips plus longs et plus cohérents que Veo 3.0) | Reels, TikTok, formats courts pour Shorts, expérimentation de créations publicitaires. | Le contenu à voix synthétique / humain synthétique doit porter une divulgation deepfake visible en vertu de l'article 50 de l'UE — voir `skills/context-engine/compliance-rules.md` §1.1b. |
| Vidéo longue avec audio natif / narration multimodale | **Gemini Omni** (génération multimodale, lancement I/O de mai 2026 — texte + image + audio + vidéo unifiés) | Campagnes de contenu connecté où un seul brief produit un film hero, des déclinaisons sociales, une version audio et des visuels fixes de manière cohérente. Idéal pour les marques ayant une gouvernance créative rigoureuse — l'étendue d'Omni dépasse la plupart des processus de revue de sécurité de marque. | Les sorties Omni par défaut portent des marqueurs de provenance SynthID + Gemini. Ajouter C2PA avant publication dans l'UE. Faire valider par le service juridique les sorties représentant des personnes synthétiques — les humains photoréalistes d'Omni franchissent fréquemment le seuil de « manipulation substantielle par IA » de l'article 50. |
| Image statique — itération rapide / mood-boarding | OpenAI gpt-image-2, Midjourney v7, Adobe Firefly | Mood boards internes, exploration de concepts. À ne pas utiliser pour une création finale diffusée dans l'UE sans C2PA. | Aucun de ces outils n'intègre automatiquement C2PA — signer manuellement avec `/digital-marketing-pro:c2pa-metadata` avant publication dans l'UE. |

**Recommandation de workflow :**

1. Décrire le concept visuel dans le résultat de cette compétence (sujet, composition, contraintes liées au personnage de marque, texte sur emballage le cas échéant).
2. Transmettre la spécification visuelle à la filière de production concernée — votre équipe design, un outil d'IA image/vidéo (le tableau de modèles ci-dessus fait correspondre cas d'usage → générateur), ou une plateforme de design connectée (par ex. les connecteurs MCP Canva / Figma listés dans `/digital-marketing-pro:integrations`). La spécification est volontairement indépendante de l'outil : n'importe quelle filière de production peut l'exploiter telle quelle.
3. Traiter tous les visuels générés par IA comme **relevant a priori de l'article 50** jusqu'à preuve du contraire. Le filtre de pré-publication (`/digital-marketing-pro:check`) bloque les assets IA non signés pour les campagnes ciblant l'UE.

## Agents utilisés

- **content-creator** — Génération de texte publicitaire, développement d'angles, rédaction de CTA
- **media-buyer** — Spécifications de plateforme, conformité aux politiques, stratégie de test
- **brand-guardian** — Alignement de la voix, revue de conformité, vérification des allégations

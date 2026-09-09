---
name: email-sequence
description: "Concevez une séquence d'emails complète, prête pour votre ESP — options d'objets par email, texte d'aperçu, corps de texte avec CTA, timing d'envoi, logique de segmentation et de branchement, ainsi qu'une checklist de délivrabilité pour l'envoi en masse (SPF/DKIM/DMARC, désabonnement en un clic, limites de taux de plainte). Ne fait que concevoir ; n'envoie rien. Se déclenche sur « /digital-marketing-pro:email-sequence », « construis une séquence de bienvenue », « rédige un flux d'abandon de panier », « nos emails arrivent toujours en spam », « séquence de nurturing pour les utilisateurs en essai ». Lit le profil de marque, la voix, les modèles et les règles de conformité ; l'envoi effectif relève de /digital-marketing-pro:send-email-campaign."
argument-hint: "[sequence-type]"
---

# /digital-marketing-pro:email-sequence

## Objectif

Concevoir une séquence d'emails complète, prête à être mise en œuvre dans n'importe quel ESP. Comprend les objets, les textes d'aperçu, le corps de texte, le timing d'envoi, les règles de segmentation, et les bonnes pratiques de délivrabilité.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Type de séquence** : bienvenue, nurturing, onboarding, réengagement, abandon de panier, post-achat, événement, promotionnelle
- **Objectif** : ce que la séquence doit accomplir (activer, convertir, fidéliser, vendre en supplément, éduquer)
- **Segment d'audience** : qui reçoit cette séquence et déclencheur d'entrée
- **Nombre d'emails** : nombre souhaité, ou laisser le système le recommander
- **Messages/offres clés** : propositions de valeur principales, promotions, ou contenu à inclure
- **ESP existant** : plateforme utilisée (Klaviyo, Mailchimp, HubSpot, etc.) pour orienter le format

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs par défaut.
2. Faire correspondre la séquence à l'étape du parcours client et définir l'arc narratif
3. Déterminer le nombre optimal d'emails et la cadence d'envoi en fonction du type de séquence
4. Rédiger chaque email : objet (2-3 options), texte d'aperçu, corps de texte avec CTA clair
5. Définir la logique de segmentation et de branchement (déclencheurs d'ouverture/de clic, chemins conditionnels)
6. Appliquer les contrôles de délivrabilité : mots déclencheurs de spam, densité de liens, ratio image/texte, rappels d'authentification, et la **checklist d'envoi en masse** ci-dessous
7. Ajouter des jetons de personnalisation et des recommandations de contenu dynamique
8. Revoir l'ensemble de la séquence pour la cohérence avec la voix de marque et la conformité réglementaire (CAN-SPAM, RGPD)

### Checklist de délivrabilité pour l'envoi en masse (Gmail / Yahoo / Outlook)

Toute marque envoyant en volume important (~5 000+ messages/jour vers un fournisseur de messagerie) doit respecter les exigences de ce fournisseur pour l'expéditeur, sous peine de voir ses emails throttlés ou rejetés. Intégrer ces points aux notes de mise en œuvre de la séquence (repris de `/digital-marketing-pro:send-email-campaign`, avec Outlook 2025 ajouté) :

- **Authentifier le domaine d'envoi** : SPF **et** DKIM **et** une politique DMARC publiée (au moins `p=none`, alignée) — requis par **Gmail & Yahoo (février 2024)** et **Microsoft Outlook / Outlook.com (déploiement progressif jusqu'en 2025 pour les expéditeurs ≥5 000/jour)**.
- **Désabonnement en un clic** : inclure l'en-tête `List-Unsubscribe` avec support du clic unique (RFC 8058), et honorer les désabonnements sous 2 jours. Un lien de désabonnement visible dans le corps du message reste également requis en complément.
- **Maintenir le taux de plainte pour spam sous 0,3 %** (mesuré dans Google Postmaster Tools / Yahoo / Microsoft SNDS) — idéalement sous 0,1 %.
- **Envoyer depuis une IP cohérente et valide en PTR/DNS inverse via TLS**, avec un domaine d'envoi préchauffé et une adresse d'expéditeur cohérente.
- **Adresse postale physique + identité From/Reply-To exacte** dans chaque message (CAN-SPAM), et consentement d'opt-in documenté selon chaque juridiction (RGPD / CASL).
- **Hygiène de liste** : supprimer les hard bounces et les adresses inactives ; ne jamais envoyer à des listes achetées.

## Sortie

Une séquence d'emails complète contenant :

- Vue d'ensemble de la séquence avec objectifs, audience, et conditions de déclenchement
- Détail par email : objets, texte d'aperçu, corps de texte, CTA, timing d'envoi
- Diagramme de la logique de segmentation et de branchement
- Checklist de délivrabilité par email
- Recommandations de personnalisation et de contenu dynamique
- Checklist de conformité (désabonnement, adresse physique, consentement)
- Benchmarks de performance pour la mesure

## Agents utilisés

- **content-creator** — texte des emails, objets, arc narratif, stratégie de CTA
- **brand-guardian** — cohérence de la voix, revue de conformité, contrôles réglementaires
- **email-specialist** — optimisation de la délivrabilité, stratégie de timing d'envoi, notation des objets, analyse du risque de spam, conception de tests A/B

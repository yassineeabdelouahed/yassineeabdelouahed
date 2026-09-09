---
name: localize-campaign
description: "Localiser une campagne entière — e-mails, publicités, publications sociales, landing pages, scripts vidéo — pour plusieurs marchés, en produisant un package prêt au déploiement par marché : traductions, options de transcréation pour le texte émotionnel, notes d'adaptation culturelle basées sur Hofstede, ajouts de conformité spécifiques au marché, spécifications SEO localisées et hreflang, mise en forme RTL et locale, scores de qualité, et un rapport de cohérence cross-marché. Se déclenche sur \"/digital-marketing-pro:localize-campaign\", \"localize this campaign for Germany and Japan\", \"adapt these assets for new markets\", \"take the Q3 campaign multilingual\", \"prepare our launch for hi-IN and ar-SA\". Prépare et note les actifs mais ne publie rien — chaque package est livré avec une checklist de déploiement. Lit la configuration linguistique du profil de marque et les termes à ne pas traduire ; pour une pièce unique, utiliser /digital-marketing-pro:translate-content."
argument-hint: "[target-markets]"
---

# /digital-marketing-pro:localize-campaign

## Objectif

Localisation complète de campagne sur plusieurs marchés cibles. Cette commande prend tous les actifs de campagne — e-mails, publicités, publications sociales, landing pages, scripts vidéo, notifications push — et les adapte pour chaque marché cible. Elle va bien au-delà de la traduction : les références culturelles sont ajustées, les éléments de conformité sont modifiés par région, le SEO est localisé, les recommandations créatives sont adaptées, et les actifs sont préparés pour une publication multilingue.

C'est le workflow de localisation complet pour l'expansion de marché. Là où `/digital-marketing-pro:translate-content` traite une seule pièce de contenu, `/digital-marketing-pro:localize-campaign` orchestre la localisation d'une campagne entière sur plusieurs marchés simultanément. Elle coordonne le routage du service de traduction par langue, la transcréation pour le contenu émotionnel, les ajouts de conformité spécifiques au marché, l'adaptation culturelle basée sur les dimensions culturelles de Hofstede, le SEO localisé, la mise en forme RTL pour les langues concernées, et produit un package prêt au déploiement par marché avec des scores de qualité et des checklists de publication.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Actifs de campagne** : Contenu à localiser, fourni sous forme de :
  - Chemins de fichiers par type d'actif (par exemple, « emails : /campaign/email-welcome.html, /campaign/email-follow-up.html ; ads : /campaign/fb-ad.txt, /campaign/google-ad.txt ; social : /campaign/ig-post.txt »)
  - Un répertoire de campagne (par exemple, « /campaign-q1/ ») — tous les fichiers seront catégorisés par type selon les conventions de nommage ou les métadonnées
  - Blocs de contenu en ligne avec des étiquettes de type d'actif
- **Marchés cibles** : Un ou plusieurs codes de marché au format langue-région (par exemple, hi-IN, de-DE, ja-JP, fr-FR, ar-SA, pt-BR, es-MX). Chaque code précise à la fois la langue et le contexte culturel/réglementaire
- **Brief de campagne ou document de stratégie** : Optionnel — fournit les objectifs de campagne, la hiérarchie des messages, les thèmes clés, et les segments d'audience. Utilisé pour éclairer les décisions de transcréation et garantir que les versions localisées maintiennent l'alignement stratégique
- **Exigences de conformité spécifiques au marché** : Optionnel — exigences réglementaires, légales, ou sectorielles supplémentaires par marché au-delà de ce qui figure déjà dans le profil de marque (par exemple, « l'Allemagne exige un lien Impressum », « l'Inde exige l'affichage du MRP », « l'Arabie saoudite interdit les références visuelles à l'alcool »)
- **Allocation budgétaire par marché** : Optionnel — si fournie, influence la priorisation (les marchés à budget plus élevé reçoivent une transcréation complète et une adaptation culturelle plus approfondie ; les marchés à budget plus faible reçoivent une traduction de qualité avec adaptation standard)
- **Marchés prioritaires** : Optionnel — marchés à traiter en premier et avec l'adaptation la plus approfondie. Les autres marchés reçoivent une localisation standard
- **Priorité des actifs** : Optionnel — quels types d'actifs sont les plus importants (par exemple, « les landing pages sont la priorité la plus haute, les publications sociales sont secondaires »). Affecte la profondeur de la revue et l'effort de transcréation

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Extraire la configuration linguistique complète — termes `do_not_translate`, `translation_preferences`, règles `locale_formatting` par marché, liste des marchés approuvés. Charger les règles de conformité pour chaque marché cible depuis `skills/context-engine/compliance-rules.md`. Vérifier l'existence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les règles de voix et de ton, la hiérarchie des messages, les guides de style par canal, et toute guideline de marque spécifique au marché. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/` — des modèles localisés peuvent déjà exister pour certains marchés. Vérifier l'existence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Inventorier tous les actifs de campagne** : Recenser chaque actif depuis les sources fournies. Catégoriser chacun par type (e-mail, publicité, publication sociale, landing page, script vidéo, notification push, SMS, article de blog). Pour chaque actif, analyser le contenu pour le classer comme :
   - **Factuel/informationnel** : Descriptions de produits, spécifications, conditions, tarification — adapté à la traduction directe
   - **Émotionnel/créatif** : Titres, CTA, slogans, texte d'accroche, storytelling — nécessite une transcréation
   - **Sensible à la conformité** : Mentions légales, langage de consentement, texte juridique, avis de confidentialité — nécessite une adaptation spécifique au marché
   - **Dépendant du SEO** : Landing pages, articles de blog, contenu de métadonnées — nécessite une recherche de mots-clés localisée
   Restituer l'inventaire complet à l'utilisateur : nombre total d'actifs, répartition par type, répartition par classification de contenu, et périmètre de traitement estimé par marché.
3. **Pour chaque marché cible**, exécuter le pipeline de localisation suivant :
   a. **Router le service de traduction** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action route --source "{source_lang}" --target "{market_lang}"` pour sélectionner le service de traduction optimal pour cette paire de langues. Journaliser le service sélectionné.
   b. **Traduire le contenu factuel** : Traiter tous les actifs factuels/informationnels via ce que l'action route a résolu — le serveur préféré de la marque, un MCP de traduction connecté, ou (lorsque `basis: unresolved`) la capacité multilingue propre du harnais selon les règles d'exécution de translate-content. Transmettre ou appliquer les termes à ne pas traduire, les entrées de glossaire, les paramètres de formalité, et les indicateurs de préservation du formatage. Noter chaque traduction via `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action score`.
   c. **Transcréer le contenu émotionnel** : Pour tous les actifs émotionnels/créatifs, appliquer la méthodologie de transcréation de `skills/context-engine/transcreation-framework.md`. Produire 2 à 3 options d'adaptation créative par pièce, chacune avec :
      - Le contenu adapté dans la langue cible
      - Une rétro-traduction pour la revue
      - Un score de préservation de l'intention
      - Une évaluation de l'adéquation culturelle pour ce marché spécifique
      - Un alignement de ton avec l'original
      Marquer l'option recommandée mais conserver toutes les alternatives pour la revue client.
   d. **Adapter les éléments culturels** : Se référer au mapping des dimensions culturelles dans `skills/context-engine/multilingual-execution-guide.md` (référentiel Hofstede) pour adapter :
      - **Style de preuve sociale** : Témoignages (marchés individualistes) vs. recommandations communautaires (marchés collectivistes) vs. citations d'autorité (marchés à forte distance hiérarchique)
      - **Tactiques d'urgence** : Rareté directe (marchés occidentaux) vs. urgence basée sur la relation (marchés asiatiques) vs. urgence de bénéfice de groupe (marchés collectivistes)
      - **Signaux de confiance** : Certifications et données (marchés germaniques) vs. relation et réputation (marchés asiatiques) vs. approbation d'autorité (marchés du Moyen-Orient)
      - **Recommandations visuelles/iconographiques** : Associations de couleurs, significations des gestes, considérations de pudeur, références saisonnières par marché
      - **Humour et ton** : Ajuster ou supprimer l'humour qui ne se traduit pas culturellement ; adapter le ton aux attentes du marché en matière de formalité
   e. **Localiser la conformité** : Pour chaque marché, ajouter ou modifier :
      - Mentions légales et avis juridiques spécifiques au marché
      - Langage de consentement des données et de confidentialité selon la réglementation régionale (RGPD pour l'UE, DPDPA pour l'Inde, APPI pour le Japon, PIPA pour la Corée du Sud, LGPD pour le Brésil, etc.)
      - Déclarations réglementaires sectorielles
      - Divulgations requises (tarification, normes publicitaires, divulgation d'influence)
      - Exigences de conformité spécifiques au marché fournies par l'utilisateur
      Se référer à `skills/context-engine/compliance-rules.md` pour le cadre réglementaire par marché.
   f. **Localiser le SEO** (pour les landing pages, articles de blog, et contenu web) : Fournir des suggestions de mots-clés localisées basées sur les cibles de mots-clés d'origine, générer les spécifications de balises hreflang pour la configuration de site multilingue, créer des balises title et meta descriptions localisées, et adapter les recommandations de slug d'URL pour la langue cible.
   g. **Ajuster la mise en forme** : Appliquer la mise en forme spécifique à la locale :
      - Direction de texte RTL pour l'arabe (ar), l'hébreu (he), l'ourdou (ur), le persan (fa) — signaler tout élément de mise en page nécessitant une adaptation RTL
      - Formats de date par locale (JJ/MM/AAAA vs. MM/JJ/AAAA vs. AAAA-MM-JJ)
      - Formatage des nombres (séparateurs décimaux, séparateurs de milliers)
      - Symboles de devise et leur positionnement
      - Unités de mesure (métrique vs. impérial)
      - Formats de numéro de téléphone avec indicatifs pays
      - Conventions de format d'adresse
4. **Noter chaque actif localisé** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action score` sur chaque actif traduit/transcréé pour évaluer la qualité de traduction (ratio de longueur, préservation du formatage, cohérence des termes clés, intégrité des placeholders, exhaustivité).
5. **Évaluer la qualité du contenu localisé** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/eval-runner.py" --brand {slug} --action run-quick --text "{localized_content}" --content-type "{type}"` sur chaque actif localisé pour évaluer la qualité globale du contenu dans la langue cible. Cela détecte des problèmes au-delà de l'exactitude de traduction — lisibilité, persuasion, alignement de marque dans la langue cible.
6. **Exécuter la vérification de voix de marque** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/brand-voice-scorer.py" --brand {slug} --text "{localized_content}"` sur les actifs clés (titres, texte d'accroche, objets d'e-mail) pour vérifier la préservation de la voix de marque à travers les langues.
7. **Créer un package de livraison par marché** : Pour chaque marché cible, assembler :
   - Tous les actifs localisés organisés par type
   - Les scores de qualité de traduction par actif
   - Les scores de qualité de contenu par actif
   - Les options de transcréation pour le contenu émotionnel (avec l'option recommandée marquée)
   - Les notes d'adaptation culturelle expliquant ce qui a été changé et pourquoi
   - Les ajouts de conformité avec les références réglementaires
   - Les recommandations SEO (mots-clés, hreflang, contenu de métadonnées)
   - Les notes de mise en forme (indicateurs RTL, formats de date/nombre/devise appliqués)
   - Une checklist de déploiement spécifique à ce marché
8. **Générer un rapport de cohérence cross-marché** : Vérifier que le message de marque principal, les thèmes de campagne, et les propositions de valeur restent cohérents sur toutes les versions localisées. Signaler tout marché où le message localisé diverge significativement de la stratégie de campagne. Vérifier que les termes à ne pas traduire sont préservés de manière cohérente sur tous les marchés. Vérifier que les recommandations visuelles/iconographiques sont cohérentes lorsque cela est approprié et divergent lorsque cela est culturellement nécessaire.
9. **Produire un résumé de localisation** : Compiler la vue d'ensemble complète — tous les marchés, tous les actifs, tous les scores, tous les signalements — en un document de synthèse unique avec un tableau de bord qualité (marchés en lignes, actifs en colonnes, scores dans les cellules) et un score global de santé de la localisation de la campagne.

## Résultat

Un package complet de localisation de campagne contenant :

- **Package d'actifs par marché** : Pour chaque marché cible :
  - Tout le contenu localisé organisé par type d'actif (e-mail, publicité, social, landing page, etc.)
  - Score de qualité de traduction par actif avec ventilation par dimension
  - Score de qualité de contenu par actif (évaluation eval-runner)
  - Score de voix de marque pour les actifs clés
- **Options de transcréation** : Pour tout le contenu émotionnel/créatif sur tous les marchés — 2 à 3 options par pièce avec rétro-traductions, scores de préservation de l'intention, notes d'adéquation culturelle, et option recommandée marquée
- **Notes d'adaptation culturelle** : Résumé par marché de ce qui a été adapté et pourquoi — style de preuve sociale, tactiques d'urgence, signaux de confiance, ajustements d'humour, recommandations iconographiques, avec références aux dimensions de Hofstede
- **Ajouts de conformité par marché** : Chaque mention légale, déclaration de consentement, avis réglementaire, et divulgation requise ajoutés pour chaque marché, avec les références réglementaires (Article X du RGPD, Section Y du DPDPA, etc.)
- **Recommandations SEO localisées** : Suggestions de mots-clés par marché, spécifications de balises hreflang, balises title et descriptions localisées, recommandations de slug d'URL
- **Notes RTL et de mise en forme** : Pour les marchés concernés — indicateurs de mise en page RTL, spécifications de format date/nombre/devise, conversions d'unités de mesure, conventions de format d'adresse et de téléphone
- **Rapport de cohérence cross-marché** : Vérification que le message de marque, les thèmes de campagne, et les propositions de valeur sont cohérents sur tous les marchés, avec des signalements pour les divergences significatives
- **Tableau de bord qualité** : Matrice de tous les marchés (lignes) par tous les actifs (colonnes) avec les scores de qualité de traduction, les scores de qualité de contenu, et les notes globales — offre une vue d'ensemble instantanée de la santé de la localisation de la campagne
- **Checklist de déploiement par marché** : Étapes spécifiques au marché pour la publication — paramètres de plateforme, ciblage linguistique, ciblage géographique, approbations de conformité nécessaires, points de revue QA, séquence de mise en ligne
- **Score de santé de la localisation de la campagne** : Score agrégé unique reflétant la qualité globale de la localisation, la cohérence, et l'exhaustivité sur tous les marchés
- **Recommandations** : Éléments prioritaires pour la revue humaine (actifs à faible score, décisions de transcréation culturellement sensibles, éléments de conformité nécessitant une validation juridique), améliorations de processus pour les futures exécutions de localisation, et termes à ajouter au glossaire de marque

## Agents utilisés

- **localization-specialist** — Gère le pipeline de localisation de bout en bout incluant le routage du service de traduction, l'exécution de la transcréation, l'adaptation culturelle utilisant les dimensions de Hofstede, la localisation de la conformité, la notation de qualité, la vérification de cohérence cross-marché, et l'assemblage du package par marché
- **content-creator** — Génère les options de transcréation pour le contenu émotionnel et créatif, produit des titres et CTA culturellement adaptés, crée des meta descriptions et du texte SEO localisés, et garantit que l'efficacité marketing est préservée à travers les langues
- **execution-coordinator** — Coordonne le workflow de publication multi-marché, gère les checklists de déploiement, séquence la mise en ligne à travers les marchés et canaux, suit le statut d'approbation par marché, et garantit que toutes les validations de conformité sont obtenues avant la publication

---
name: publish-blog
description: "Publier un article de blog sur WordPress ou Webflow via le MCP CMS connecté avec les métadonnées SEO, les catégories et tags, l'image mise en avant, l'optimisation du slug, et une planification optionnelle. Exécute des portes avant publication — content-scorer.py, brand-voice-scorer.py, vérifications SEO et de conformité — et une porte d'approbation OBLIGATOIRE : un Résumé d'exécution que l'utilisateur doit approuver avec un oui explicite tapé (journalisé via approval-manager.py) avant que quoi que ce soit ne parte en ligne, puis vérifie l'URL en direct et le balisage schema et soumet à Google Search Console si connecté. Se déclenche sur \"/digital-marketing-pro:publish-blog\", \"publish this post to WordPress\", \"push the draft live on Webflow\", \"schedule this article for Monday\", \"take this blog post live\". Lit le profil de marque et platform-publishing-specs.md pour les correspondances de champs par CMS."
disable-model-invocation: false
argument-hint: "[--platform=wordpress|webflow]"
---

# /digital-marketing-pro:publish-blog

## Objectif

Publier un article de blog entièrement optimisé sur le CMS de la marque (WordPress ou Webflow) avec les métadonnées SEO, les catégories et tags, l'image mise en avant, et une planification optionnelle. Inclut des contrôles qualité avant publication pour le scoring de contenu et l'alignement à la voix de marque, plus une vérification après publication pour confirmer que l'URL en direct est accessible et s'affiche correctement. Conçu comme l'étape finale d'un workflow de contenu — faisant passer un brouillon prêt à un état en ligne avec toutes les portes d'optimisation appliquées.

## Porte d'exécution (OBLIGATOIRE — ne peut pas être contournée)

1. Présenter l'aperçu complet — destinataires / dépense / changements / conformité — sous forme de **Résumé d'exécution** avant de toucher un quelconque système en production.
2. L'utilisateur doit taper `yes` (ou une approbation explicite équivalente). TOUTE autre saisie — ambiguë, implicite, partielle, ou absente — annule l'exécution.
3. Ne jamais procéder sur une saisie ambiguë. Ne jamais relancer automatiquement une exécution échouée ; un échec nécessite une revue humaine avant toute relance.
4. Enregistrer l'approbation avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action create-approval --data '{"risk_level":"<tier>","summary":"..."}'` **avant** l'exécution, puis `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action mark-executed --id {approval_id}` une fois que la plateforme confirme le succès.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu du blog** : Le brouillon complet de l'article ou un brouillon approximatif à affiner — titre, corps, tout média intégré, et citations ou encadrés
- **Plateforme CMS cible** : Quelle plateforme de publication utiliser — WordPress ou Webflow — le MCP correspondant doit être connecté
- **Date de publication** : Publication immédiate ou date et heure planifiées avec fuseau horaire — la planification utilise la fonction de planification native de la plateforme
- **Catégories et tags** : Catégories de contenu et tags de taxonomie pour l'organisation et la découvrabilité, ou permettre l'auto-suggestion basée sur l'analyse du contenu et la taxonomie existante
- **Image mise en avant** : Chemin de fichier image, URL, ou description pour la génération — utilisée comme image héro et vignette de partage social (Open Graph et Twitter Card)
- **Métadonnées SEO** : Mot-clé principal, mots-clés secondaires, meta title (50-60 caractères), meta description (150-160 caractères) — ou demander l'auto-génération basée sur l'analyse du contenu et la stratégie de mots-clés
- **Attribution de l'auteur** : Nom de l'auteur et lien de bio si différent de l'auteur de marque par défaut configuré dans le CMS
- **Préférence de slug** : Slug d'URL personnalisé ou auto-génération à partir du titre avec optimisation de mots-clés et suppression des mots vides
- **Liens internes** : Pages internes spécifiques à lier au sein de l'article, ou permettre la détection automatique des opportunités de maillage basée sur le contenu existant du site
- **Texte de partage social** : Titre et description Open Graph personnalisés pour les aperçus sociaux, ou auto-génération à partir du meta title et de la meta description
- **Format de contenu** : Format d'article — article standard, liste, guide comment faire, étude de cas, ou leadership éclairé — détermine le type de balisage schema et les attentes structurelles
- **Extrait ou résumé** : Un extrait de 1-2 phrases pour les pages d'archive, les flux RSS, et les cartes sociales, ou auto-génération à partir du paragraphe d'ouverture
- **Articles associés** : Optionnel — articles spécifiques à lier comme contenu associé à la fin de l'article, ou détection automatique basée sur le chevauchement de catégorie et de sujet
- **Bloc CTA** : Optionnel — bloc d'appel à l'action personnalisé à ajouter à la fin de l'article (inscription newsletter, essai produit, contenu additionnel, réservation de consultation)

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Vérifier la connexion CMS** : Vérifier quel serveur MCP CMS est connecté (wordpress ou webflow) et confirmer qu'il correspond à la plateforme cible de l'utilisateur. S'il n'est pas connecté, indiquer à l'utilisateur de configurer d'abord le serveur MCP et fournir le lien de configuration pertinent.
3. **Noter la qualité du contenu** : Exécuter `content-scorer.py` sur le brouillon de blog pour évaluer la lisibilité (niveau Flesch-Kincaid), la structure (hiérarchie des titres, longueur des paragraphes, usage des listes), la profondeur (nombre de mots vs complexité du sujet), et le potentiel d'engagement. Signaler tout problème à corriger avant publication.
4. **Noter l'alignement à la voix de marque** : Exécuter `brand-voice-scorer.py` pour vérifier que le contenu correspond au ton, au vocabulaire, et aux guidelines de messages de la marque. Suggérer des modifications spécifiques si le score tombe en dessous du seuil minimum de la marque défini dans profile.json.
5. **Optimiser pour le SEO** : S'assurer que le mot-clé principal apparaît dans le titre, le H1, les 100 premiers mots, le slug d'URL, et la meta description. Vérifier que la meta description compte 150-160 caractères et que le meta title compte 50-60 caractères. Vérifier les opportunités de maillage interne, le texte alt des images, et l'usage des mots-clés dans les titres. Valider la compatibilité du balisage schema pour le type de contenu (article, comment faire, FAQ).
6. **Formater pour l'API de la plateforme** : Structurer la charge utile de contenu selon les exigences du CMS cible — consulter `skills/context-engine/platform-publishing-specs.md` pour les correspondances de champs, le formatage HTML, la gestion des images, les ID de taxonomie catégorie/tag, l'upload de l'image mise en avant, les champs meta Open Graph, et toute particularité spécifique à la plateforme comme les champs personnalisés WordPress ou la structure de collection CMS Webflow.
7. **Exécuter le contrôle de conformité** : Vérifier que le contenu répond aux exigences réglementaires pour les marchés cibles de la marque — déclarations de divulgation, avertissements de liens affiliés, avertissements médicaux ou financiers, et attribution de droits d'auteur pour tout contenu ou image tiers référencé.
8. **Créer l'enregistrement d'approbation** : Créer l'enregistrement via `approval-manager.py --action create-approval` avec le niveau de risque à l'intérieur du JSON `--data` — `{"risk_level":"medium",...}`. Il n'y a pas de flag `--risk-level` ; voir la Porte d'exécution ci-dessus pour la commande exacte. Générer un résumé avant publication montrant le titre, le slug d'URL, l'heure de publication, le score SEO, le score de voix de marque, le score de qualité de contenu, les catégories, les tags, l'aperçu de l'image mise en avant, et le statut de conformité.
9. **Présenter le résumé avant publication** : Afficher le résumé complet pour revue et approbation de l'utilisateur. Mettre en évidence tout avertissement issu du scoring de contenu, de l'analyse SEO, ou des contrôles de conformité. Montrer un aperçu côte à côte de la façon dont l'article apparaîtra dans les résultats de recherche et les cartes de partage social. Attendre la confirmation explicite de l'utilisateur avant de procéder.
10. **Exécuter la publication via le MCP CMS** : Sur approbation, envoyer la charge utile formatée au CMS à travers le serveur MCP connecté. Gérer la planification si une date de publication future a été spécifiée. Confirmer que la réponse de l'API indique un succès.
11. **Vérifier l'URL en direct** : Après publication, demander l'URL en direct depuis l'API CMS et vérifier qu'elle retourne un statut 200. Confirmer que le titre, la meta description, l'image mise en avant, l'URL canonique, et les tags Open Graph s'affichent correctement. Vérifier que la page n'est pas bloquée par robots.txt ou des balises noindex.
12. **Valider le balisage schema** : Confirmer que la page publiée inclut les données structurées correctes (Article, HowTo, FAQ, ou BreadcrumbList) et qu'elles passent la validation pour l'éligibilité aux résultats enrichis dans les résultats de recherche.
13. **Soumettre aux moteurs de recherche** : Si la marque a Google Search Console connecté, soumettre la nouvelle URL pour indexation afin d'accélérer la découverte. Journaliser l'horodatage de soumission.
14. **Journaliser l'exécution et enregistrer un insight** : Exécuter `execution-tracker.py` pour journaliser l'événement de publication avec l'horodatage, la plateforme, l'URL, les scores, et les catégories. Enregistrer un insight sur le contenu publié — sujet, mots-clés, prédictions de performance — pour référence future dans la stratégie de contenu et l'analyse de lacunes.

## Résultat

Une confirmation de publication structurée contenant :

- **URL publiée** : L'URL en direct ou planifiée où l'article de blog est accessible, avec confirmation de l'URL canonique correcte
- **Score SEO** : Score SEO du contenu avec répartition — placement des mots-clés, qualité du meta title et de la meta description, nombre de liens internes, couverture du texte alt des images, structure des titres, et optimisation du slug d'URL
- **Score de voix de marque** : Score d'alignement avec des notes sur le ton, le vocabulaire, la cohérence des messages, et tout ajustement effectué pendant l'optimisation
- **Score de qualité de contenu** : Niveau de lisibilité (Flesch-Kincaid), évaluation de la structure (hiérarchie des titres, équilibre des paragraphes), nombre de mots, et notation du potentiel d'engagement
- **Résultats de la checklist avant publication** : Statut réussite/échec pour chaque porte qualité — score de contenu, voix de marque, optimisation SEO, revue de conformité, et validation du formatage de la plateforme
- **Détails de publication** : Plateforme, statut de publication (en direct ou planifié avec date), auteur, catégories, tags, confirmation de l'image mise en avant, URL canonique, et aperçu Open Graph
- **Aperçu de partage social** : À quoi ressemblera l'article lorsqu'il sera partagé sur Facebook, Twitter/X, et LinkedIn — incluant le rendu de l'image, du titre, et de la description Open Graph
- **Statut de conformité** : Vérification de toutes les mentions légales, divulgations, et attributions requises incluses selon les réglementations du marché de la marque
- **Validation du balisage schema** : Type de données structurées appliqué, statut de validation, et éligibilité aux résultats enrichis pour le format de contenu
- **Soumission aux moteurs de recherche** : Statut de la demande d'indexation via Google Search Console (si connecté) avec horodatage de soumission
- **Référence de performance** : Instantané de métriques initial — temps de chargement de la page, scores Core Web Vitals, et statut de crawl — comme référence pour le suivi de performance post-publication
- **Articles associés liés** : Liste du contenu associé lié à la fin de l'article avec titres et URL pour le flux de trafic interne
- **Confirmation du bloc CTA** : Le bloc d'appel à l'action rendu à la fin de l'article avec le type, le texte, et l'URL de destination
- **Entrée du journal d'exécution** : Enregistrement horodaté de l'action de publication avec toutes les métadonnées pour l'audit et le suivi de performance

## Agents utilisés

- **content-creator** — Scoring de la qualité de contenu, optimisation SEO, alignement à la voix de marque, placement des mots-clés, rédaction de meta description, recommandations de maillage interne, conseils de balisage schema, et génération de texte de partage social
- **execution-coordinator** — Workflow d'approbation, exécution de l'API CMS, vérification après publication, validation de l'URL en direct, journalisation d'exécution, et capture d'insight pour la stratégie de contenu

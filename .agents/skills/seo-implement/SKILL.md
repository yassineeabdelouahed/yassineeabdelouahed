---
name: seo-implement
description: "Exécute les changements SEO approuvés sur un CMS WordPress ou Webflow connecté — mises à jour de meta title/description, déploiement de schema JSON-LD, URL canoniques, redirections 301/302, et demandes d'indexation Search Console — avec des diffs avant/après, une vérification post-déploiement, et des instantanés de restauration conservés. Chaque exécution s'arrête à une porte d'approbation obligatoire : rien n'est déployé tant que l'utilisateur n'a pas relu le diff et donné son approbation explicite. Se déclenche sur \"/digital-marketing-pro:seo-implement\", \"update the meta tags on these pages\", \"deploy the schema markup\", \"set up 301 redirects for the migration\", \"push the audit fixes live\". Consomme PLAN.md de /digital-marketing-pro:seo-audit, lit le profil de marque, et journalise chaque changement via seo-executor.py."
disable-model-invocation: false
argument-hint: "[URL or change-type]"
---

# /digital-marketing-pro:seo-implement

## Objectif

Exécuter des changements d'implémentation SEO sur des plateformes CMS connectées. Va au-delà de l'analyse pour réellement mettre à jour les balises meta, déployer le balisage schema JSON-LD, gérer les URL canoniques, créer des redirections 301/302, et demander l'indexation — le tout via des connexions MCP WordPress ou Webflow. Cette commande comble l'écart entre les recommandations SEO et le déploiement en production, en veillant à ce que les constats d'audit et les plans d'optimisation se traduisent en changements réels au niveau des pages, avec des pistes d'audit complètes et une capacité de restauration.

## Porte d'exécution (OBLIGATOIRE — ne peut pas être ignorée)

1. Présentez l'aperçu complet — le diff avant/après de chaque changement de meta / schema / canonique / redirection, ainsi que le périmètre et la conformité — sous forme de **Résumé d'exécution** avant de toucher à une quelconque page en production.
2. L'utilisateur doit taper `yes` (ou une approbation explicite équivalente). TOUTE autre saisie — ambiguë, implicite, partielle ou absence d'approbation — annule l'exécution.
3. Ne jamais procéder sur une saisie ambiguë. Ne jamais relancer automatiquement une exécution échouée ; un échec nécessite une revue humaine avant toute nouvelle tentative.
4. Enregistrez l'approbation avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action create-approval --data '{"risk_level":"<tier>","summary":"..."}'` **avant** l'exécution, puis `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action mark-executed --id {approval_id}` une fois que la plateforme confirme le succès.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **URL cible(s)** : Une ou plusieurs URL à modifier — une page unique pour des mises à jour ciblées ou un lot d'URL pour des opérations groupées comme un déploiement de schema à l'échelle du site ou des mises à jour de balises meta liées à une migration
- **Type de changement** : La modification SEO à effectuer — `meta-update` (balise title, meta description, directives robots), `schema-deploy` (données structurées JSON-LD), `canonical` (définir ou mettre à jour l'URL canonique), `redirect` (créer une redirection 301/302), ou `indexing-request` (soumettre une URL à Google pour crawl via Search Console). Plusieurs types de changement peuvent être combinés pour une même URL
- **Valeurs spécifiques** : Les nouvelles données à appliquer — nouveau texte de balise title et nombre de caractères, nouveau texte de meta description et nombre de caractères, objet schema JSON-LD ou type de schema à générer automatiquement (Article, Product, FAQ, HowTo, LocalBusiness, BreadcrumbList), URL canonique cible, source et destination de redirection avec le type (301 ou 302), ou priorité d'indexation (normale ou urgente)
- **Plateforme CMS** : `wordpress` ou `webflow` — le serveur MCP CMS correspondant doit être connecté. Pour WordPress, précisez si les champs SEO sont gérés par Yoast, RankMath, ou All in One SEO. Pour Webflow, les paramètres SEO natifs sont utilisés directement

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également la présence de directives dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier la présence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : "Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ?" — ou procéder avec les valeurs par défaut.
2. **Valider les changements proposés par rapport à l'état actuel de la page** : Capturer un instantané avant changement des balises meta existantes, du balisage schema, des paramètres canoniques, et des règles de redirection pour chaque URL cible via le MCP CMS. Comparer les changements proposés aux meilleures pratiques SEO — longueur de la balise title (50-60 caractères), longueur de la meta description (150-160 caractères), validité du schema par rapport aux exigences de données structurées de Google, accessibilité de l'URL canonique, et codes de statut de la cible de redirection.
3. **Générer la spécification de changement pour chaque URL** : Faire correspondre les changements proposés aux champs de l'API CMS — pour WordPress : champs meta Yoast (`_yoast_wpseo_title`, `_yoast_wpseo_metadesc`), équivalents RankMath, ou champs AIOSEO ; pour Webflow : objet de paramètres SEO de la page. Pour le déploiement de schema, générer un JSON-LD valide à partir du type spécifié en utilisant le contenu de la page et les données de marque, ou valider le JSON-LD fourni par l'utilisateur par rapport aux spécifications schema.org et aux exigences de résultats enrichis de Google.
4. **Créer la porte d'approbation** : Présenter tous les changements sous forme de diff (avant/après) pour relecture par l'utilisateur — ancienne balise title contre nouvelle balise title, ancien schema contre nouveau schema, canonique actuelle contre canonique proposée. Évaluer le niveau de risque : `medium` pour les changements sur une seule page avec des mises à jour simples, `high` pour les mises à jour groupées affectant plus de 5 pages, la création de redirections, ou les changements canoniques susceptibles d'affecter l'indexation. Afficher l'impact estimé et tout avertissement (par ex. title trop long, schema avec des champs requis manquants).
5. **Exécuter les changements via le MCP CMS après approbation** : Déployer les changements approuvés via le serveur MCP WordPress ou Webflow connecté. Pour les mises à jour meta : écrire les nouvelles valeurs dans les champs du plugin SEO. Pour le schema : injecter le JSON-LD dans l'en-tête de la page ou le champ schema du plugin SEO. Pour les redirections : créer des règles via l'API du plugin Redirection, les redirections RankMath, ou l'API de redirection native de Webflow. Pour les demandes d'indexation : soumettre les URL via le MCP Google Search Console.
6. **Vérifier après le déploiement** : Relire les données de page mises à jour depuis le CMS pour confirmer que les changements ont pris effet — comparer les valeurs déployées à la spécification approuvée. Pour les redirections, tester le code de réponse HTTP et la destination. Pour les demandes d'indexation, confirmer l'acceptation de la soumission. Signaler tout écart entre l'état prévu et l'état réellement déployé.
7. **Journaliser tous les changements via seo-executor.py** : Enregistrer chaque changement avec horodatage, URL, type de changement, état avant, état après, plateforme CMS, référence d'approbation, et données de restauration. Conserver les instantanés de restauration afin que les changements puissent être annulés si nécessaire.

## Résultat

Un rapport d'implémentation structuré contenant :

- **Confirmation de changement** : Comparaison avant/après pour chaque URL et type de changement — montrant exactement ce qui a été modifié, avec le nombre de caractères pour les balises meta et le statut de validation pour le balisage schema
- **Statut de vérification** : Résultats de la vérification post-déploiement confirmant que chaque changement est en production et correspond à la spécification approuvée, avec tout écart signalé
- **Instructions de restauration** : Instructions étape par étape et instantanés conservés pour annuler chaque changement si nécessaire — anciennes valeurs meta, schema supprimé, redirections supprimées, ou canoniques restaurées
- **Entrée du journal d'exécution** : Enregistrement horodaté avec les métadonnées complètes du changement, les réponses de l'API CMS, la référence d'approbation, et les données de restauration pour la piste d'audit

## Agents utilisés

- **seo-specialist** — Validation SEO préalable aux changements par rapport aux meilleures pratiques (longueur de title, longueur de description, exigences de schema, logique canonique, règles de redirection), génération de la spécification de changement faisant correspondre les champs SEO aux paramètres de l'API CMS, génération et validation du schema JSON-LD par rapport aux directives schema.org et aux données structurées Google, et vérification post-déploiement de l'exactitude SEO
- **execution-coordinator** — Exécution MCP CMS pour WordPress (Yoast, RankMath, AIOSEO, plugin Redirection) et Webflow (paramètres SEO natifs et API de redirection), flux d'approbation avec évaluation du risque proportionnelle au périmètre et au type de changement, capture et stockage des données de restauration, et journalisation d'exécution avec piste d'audit complète

---
name: validate-output
description: "Valider le contenu marketing par rapport à un schéma structurel — sections requises, nombre de mots, mise en forme markdown, texte de remplissage (TBD, lorem ipsum, variables non renseignées), cohérence CTA-sujet, et structure SEO — en renvoyant une checklist réussite/échec avec des instructions de correction. Huit schémas intégrés plus des schémas JSON personnalisés ; détecte automatiquement le schéma lorsqu'aucun n'est nommé. Se déclenche sur \"/digital-marketing-pro:validate-output\", \"check this post against the blog schema\", \"is this email structurally ready to ship\", \"scan for leftover placeholders\", \"why does this draft feel incomplete\". Exécute output-validator.py et lit les modèles de marque et schémas personnalisés ; complète /digital-marketing-pro:eval-content, qui juge la qualité plutôt que la structure."
---

# /digital-marketing-pro:validate-output

## Objectif

Valider le contenu marketing par rapport aux schémas structurels attendus pour garantir l'exhaustivité, la cohérence de mise en forme, et la préparation à la production. Vérifie les sections requises, les plages de nombre de mots, la conformité de mise en forme markdown, la détection de texte de remplissage (variables de modèle non renseignées, lorem ipsum, marqueurs TBD), et la cohérence contenu-CTA. Prend en charge huit schémas intégrés pour les types de contenu marketing courants, ainsi que des schémas personnalisés pour les modèles propres à la marque.

Cette commande détecte les problèmes structurels et de mise en forme que l'évaluation de qualité ne voit pas — le H2 manquant qui casse le SEO, le placeholder « [INSÉRER LE NOM DE L'ENTREPRISE] » qui est passé inaperçu, l'article de blog qui manque 300 mots par rapport à l'exigence du brief, ou l'e-mail dont le CTA promet une démo alors que le corps parle d'un livre blanc. Elle est conçue pour être exécutée comme un contrôle final avant publication, après que la qualité du contenu a été évaluée via /digital-marketing-pro:eval-content.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu à valider** : le texte à vérifier — fourni en ligne, en tant que bloc collé, ou en tant que chemin de fichier. Prend en charge tout format de contenu marketing
- **Nom ou fichier de schéma** (optionnel) : l'un des huit schémas intégrés — `blog_post`, `email`, `ad_copy`, `social_post`, `landing_page`, `press_release`, `content_brief`, `campaign_plan` — ou un chemin de fichier vers un schéma JSON personnalisé. Si omis, le validateur détecte automatiquement le schéma le plus probable en fonction de la structure du contenu, de la longueur, et des schémas de mise en forme. Les schémas personnalisés suivent le format défini dans `skills/context-engine/eval-framework-guide.md`

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer les standards de mise en forme et les exigences de contenu de la marque. Vérifier aussi la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les définitions de modèles depuis `templates/` qui peuvent définir des sections requises, des plages de nombre de mots, et des règles de mise en forme propres à la marque. Vérifier la présence de schémas personnalisés dans `~/.claude-marketing/brands/{slug}/schemas/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Déterminer le schéma** : si un nom ou fichier de schéma a été fourni, l'utiliser directement. Sinon, exécuter `scripts/output-validator.py --action list-schemas` pour obtenir tous les schémas disponibles, puis sélectionner le plus approprié en fonction des caractéristiques du contenu (longueur, structure, schémas de mise en forme). Indiquer quel schéma a été sélectionné et pourquoi, afin que l'utilisateur puisse corriger si la sélection était erronée.
3. **Exécuter la validation structurelle** : exécuter `scripts/output-validator.py --action validate --text "{content}" --schema {builtin_schema_name}` pour l'un des huit schémas intégrés, ou `--custom-schema {path/to/schema.json}` pour un fichier de schéma personnalisé (les deux indicateurs sont distincts — `--schema` ne prend qu'un nom intégré, `--custom-schema` prend un chemin de fichier). Le validateur vérifie :
   - **Sections requises** : toutes les sections définies dans le schéma sont présentes avec des titres appropriés. Pour chaque section manquante, identifier ce qui est attendu et où elle devrait apparaître dans la structure du contenu
   - **Nombre de mots** : le nombre de mots total et par section se situe dans les plages définies par le schéma. Signaler à la fois le nombre insuffisant (trop léger, manque de profondeur) et le nombre excessif (trop long, nécessite un raccourcissement)
   - **Conformité de mise en forme** : la hiérarchie des titres markdown est correcte (aucun niveau sauté), les listes sont correctement formatées, les liens ont une syntaxe valide, les images ont un texte alt, les blocs de code sont fermés, et les tableaux se rendent correctement
   - **Détection de placeholders** : scanner à la recherche de variables de modèle non renseignées (`{placeholder}`, `[PLACEHOLDER]`, `[INSÉRER X]`, `TODO`, `TBD`, `FIXME`, `Lorem ipsum`, `xxx`, « ACME Corp » utilisé comme placeholder), de complétions partielles, et de contenu manifestement issu d'un modèle qui n'a pas été personnalisé
   - **Cohérence du CTA** : l'appel à l'action correspond au sujet et à la promesse du contenu — un article de blog sur l'email marketing ne devrait pas avoir un CTA vers un guide de réseaux sociaux, un e-mail promouvant un webinaire devrait renvoyer vers l'inscription au webinaire, pas vers une page de contact générique
   - **Structure SEO** (pour les schémas blog_post et landing_page) : H1 présent et unique, longueur de meta description entre 150 et 160 caractères, balise title entre 50 et 60 caractères, lien interne présent, le mot-clé apparaît dans le H1 et les 100 premiers mots
   - **Marqueurs de conformité** (pour les secteurs réglementés) : mentions légales requises présentes, divulgations obligatoires incluses, conditions générales référencées où nécessaire
4. **Générer des conseils de correction** : pour chaque contrôle en échec, fournir des conseils précis :
   - Ce qui manque ou est incorrect, avec l'emplacement exact dans le contenu
   - Ce que le schéma exige (la règle appliquée)
   - Comment le corriger, avec un exemple de ce à quoi devrait ressembler la section corrigée
   - Si le correctif est requis (le schéma l'impose) ou recommandé (bonne pratique)
5. **Gérer les demandes de schéma personnalisé** : si l'utilisateur a besoin d'un schéma qui ne correspond à aucune option intégrée, le guider sur le format de schéma JSON :
   - Champs requis : `name`, `sections` (tableau de définitions de section avec nom, indicateur requis, nombre de mots min/max), `total_word_count` (min/max), `formatting_rules`, `placeholder_patterns`
   - Proposer de générer un schéma de départ basé sur la structure actuelle du contenu que l'utilisateur pourra affiner
6. **Présenter les résultats sous forme de checklist** : formater tous les résultats de validation comme une checklist réussite/échec que l'utilisateur peut parcourir séquentiellement, avec les échecs les plus critiques en premier.

## Sortie

Un rapport de validation structuré contenant :

- **Score de validation** : pourcentage de contrôles réussis sur le total de contrôles exécutés — la métrique phare de l'exhaustivité structurelle
- **Schéma utilisé** : quel schéma a été appliqué (nom intégré ou chemin de fichier personnalisé), s'il a été spécifié par l'utilisateur ou détecté automatiquement, et la confiance de détection si détecté automatiquement
- **Checklist réussite/échec** : chaque contrôle comme une ligne avec un statut réussite ou échec :
  - **Contrôle des sections** : liste des sections requises avec statut présent/manquant. Pour chaque section manquante, le titre attendu, où elle devrait apparaître, et un exemple de ce qu'elle devrait contenir
  - **Contrôle du nombre de mots** : nombre de mots total par rapport à la plage du schéma, plus les décomptes par section pour toute section hors de sa plage attendue. Montre l'écart (par ex. « 247 mots en dessous du minimum de 1 500 »)
  - **Contrôle de mise en forme** : validation de la hiérarchie des titres, mise en forme des listes, syntaxe des liens, texte alt des images, fermeture des blocs de code, rendu des tableaux. Chaque problème avec son emplacement et la règle de mise en forme spécifique enfreinte
  - **Contrôle des placeholders** : chaque instance de placeholder détectée avec le texte exact, l'emplacement de ligne, et l'action suggérée (remplacer par du contenu réel, supprimer, ou confirmer si intentionnel). Regroupé par type : variables de modèle, lorem ipsum, marqueurs TBD/TODO, noms de placeholder évidents
  - **Contrôle de cohérence du CTA** : si le CTA s'aligne avec le sujet et la promesse du contenu. En cas de désalignement, l'incohérence spécifique et une correction suggérée
  - **Contrôle de structure SEO** (le cas échéant) : présence et unicité du H1, longueur de la meta description, longueur de la balise title, placement des mots-clés, maillage interne
  - **Contrôle de conformité** (le cas échéant) : mentions légales requises, divulgations, et références légales
- **Checklist de correction** : liste ordonnée par priorité de tous les échecs avec des instructions de correction précises — correctifs requis en premier, puis améliorations recommandées, chacun avec un exemple de texte corrigé
- **Inventaire des placeholders** : liste complète de tous les placeholders détectés dans le contenu, dédupliquée, afin que l'utilisateur dispose d'une référence unique pour tout ce qui doit être renseigné
- **Référence de schéma** : si l'utilisateur peut en avoir besoin, un résumé des règles de schéma appliquées — utile pour que les rédacteurs comprennent les exigences structurelles avant de commencer leur prochaine pièce

## Agents utilisés

- **quality-assurance** — sélection et détection automatique du schéma, exécution de la validation structurelle sur toutes les dimensions de contrôle (sections, nombre de mots, mise en forme, placeholders, cohérence du CTA, structure SEO, marqueurs de conformité), génération de conseils de correction avec des exemples précis, mise en forme de checklist, et conseils de création de schéma personnalisé
</content>

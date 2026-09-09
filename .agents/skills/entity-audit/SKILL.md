---
name: entity-audit
description: "Auditez la cohérence de l'entité de marque à travers les sources de connaissances auxquelles font confiance les moteurs IA — propriétés Wikidata, Knowledge Panel Google, présence et notoriété Wikipédia, et annuaires sectoriels — en produisant une grille de cohérence, une liste des écarts par propriété, et un plan de correction classé par impact sur la visibilité IA. Audite et recommande ; ne modifie pas ces plateformes à votre place. Se déclenche sur « /digital-marketing-pro:entity-audit », « notre Knowledge Panel est-il exact », « notre fiche Wikidata affiche une mauvaise date de fondation », « audite nos données d'entité », « pourquoi les moteurs IA se trompent-ils sur les faits de notre entreprise ». Lit le profil de marque comme source de vérité et enregistre chaque constat via geo-tracker."
---

# /digital-marketing-pro:entity-audit

## Objectif

Auditer la cohérence des données d'entité de marque sur les plateformes que les moteurs IA utilisent comme sources de connaissances. Vérifier les entrées Wikidata, l'exactitude du Knowledge Panel Google, la présence et la notoriété Wikipédia, et les fiches d'annuaires sectoriels pour leur cohérence. Des données d'entité incohérentes dégradent la confiance et la visibilité auprès des moteurs IA — lorsque les sources de connaissances se contredisent sur des faits de base comme le site web officiel, la date de fondation, la localisation du siège, ou la classification sectorielle, les moteurs IA omettent entièrement la marque ou présentent des informations contradictoires. Cette commande fournit un audit systématique, plateforme par plateforme, avec des écarts précis signalés et un plan de correction priorisé selon l'impact sur la visibilité IA.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom de la marque/entité** : le nom exact de la marque, de l'organisation, de la personne, ou du produit à auditer — doit correspondre à l'entité telle qu'elle devrait apparaître dans les sources de connaissances. Si la marque a des alias connus ou des noms antérieurs, les inclure pour le recoupement
- **Type d'entité** : `Organization`, `Person`, `Product`, ou `Brand` — détermine quelles propriétés sont vérifiées et quels types d'annuaires sont pertinents. Les organisations vérifient la date de fondation, le siège, le secteur ; les produits vérifient le fabricant, la date de lancement, la catégorie ; les personnes vérifient le rôle, l'affiliation, les œuvres notables
- **Propriétés clés à vérifier** : URL du site web officiel, date de fondation, localisation du siège, profils sur les réseaux sociaux (LinkedIn, Twitter/X, Facebook, Instagram), classification sectorielle, personnes clés (CEO, fondateurs), organisation mère, nombre d'employés, et toute propriété spécifique à l'entité que l'utilisateur considère comme critique. Les propriétés issues du profil de marque servent de source de vérité
- **Annuaires à vérifier (optionnel)** : annuaires spécifiques au secteur (par ex. G2, Capterra, Clutch pour le SaaS ; Yelp, TripAdvisor pour l'hôtellerie), associations professionnelles, et registres d'entreprises pertinents pour le secteur de la marque. Si non fourni, la commande suggérera des annuaires en fonction de la classification sectorielle de la marque dans le profil

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Extraire les valeurs faisant autorité pour toutes les propriétés d'entité — nom officiel, site web, date de fondation, siège, profils sociaux, secteur, personnes clés, et description. Celles-ci deviennent la source de vérité par rapport à laquelle toutes les plateformes sont comparées. Vérifier également la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs fournies par l'utilisateur.
2. **Vérifier Wikidata** : rechercher l'entité sur Wikidata par nom et alias. Si trouvée, vérifier chaque propriété — site web officiel (P856), profils sur les réseaux sociaux (P2002, P2003, P2013, P4264), date de fondation (P571), siège (P159), secteur (P452), personnes clés (P169, P112), instance de (P31), et description. Enregistrer chaque propriété comme correspondante, incohérente (avec les deux valeurs), obsolète, ou manquante. Si aucune entrée Wikidata n'existe, enregistrer comme absente et évaluer si l'entité répond aux critères de notoriété pour une création.
3. **Vérifier le Knowledge Panel Google** : vérifier l'existence du Knowledge Panel pour la requête du nom de marque. S'il est présent, vérifier s'il est revendiqué ou non revendiqué, si les informations affichées (site web, adresse, liens sociaux, description, catégorie) correspondent au profil de marque, et si les images et logos sont à jour. Enregistrer chaque élément comme exact, inexact (avec détails de l'écart), obsolète, ou manquant. Noter l'attribution de la source du panneau.
4. **Évaluer la présence Wikipédia** : rechercher l'entité sur Wikipédia. Si un article existe, vérifier l'exactitude des faits clés — date de fondation, siège, description, personnes clés, produits/services, et toute allégation pouvant être obsolète ou incorrecte. Vérifier la qualité et la fraîcheur des citations. Si aucun article n'existe, évaluer les critères de notoriété — couverture significative dans des sources fiables indépendantes, importance démontrée dans le domaine, et allégations vérifiables. Enregistrer comme présent-et-exact, présent-avec-problèmes (lister les problèmes), ou absent avec évaluation de la notoriété (probablement notable, limite, ou peu probablement notable).
5. **Vérifier les annuaires sectoriels** : pour chaque annuaire pertinent, vérifier que la fiche existe et contrôler la cohérence des données — orthographe du nom de l'entreprise, adresse, numéro de téléphone, URL du site web, description de l'entreprise, classification par catégorie, et tout champ spécifique à l'annuaire. Enregistrer chaque fiche comme cohérente, incohérente (avec les écarts précis), incomplète (champs manquants), ou absente. Signaler spécifiquement les incohérences NAP (Nom, Adresse, Téléphone), car elles ont un impact disproportionné sur la résolution d'entité par les moteurs IA.
6. **Enregistrer les constats** : stocker chaque constat d'entité via l'action `entity-check` de geo-tracker (`--platform` prend une plateforme d'entité : `wikidata`, `google-kp`, `wikipedia`, ou `directory` ; `--status` prend `present`, `absent`, `inconsistent`, ou `outdated`) :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/geo-tracker.py" \
       --brand {slug} --action entity-check \
       --platform wikidata \
       --entity-name "Acme Corp" \
       --status inconsistent \
       --details "Founding date P571 shows 2015; brand profile says 2014"
   ```
   Exécuter une fois par constat plateforme × propriété, en enregistrant la valeur attendue vs. réelle et la sévérité dans `--details`.
7. **Générer le rapport d'incohérences** : compiler tous les écarts entre plateformes en un seul rapport — regroupés par propriété (voir toutes les plateformes en désaccord sur la date de fondation, par exemple) et par plateforme (voir tous les problèmes sur Wikidata, par exemple). Calculer un score de cohérence global de l'entité basé sur la proportion de propriétés qui correspondent sur toutes les plateformes.
8. **Créer un plan d'action priorisé** : classer les corrections par impact sur la visibilité IA — corrections des propriétés Wikidata en premier (impact direct sur le knowledge graph), revendications et corrections du Knowledge Panel en second (impact sur Google AI Overview), corrections d'exactitude Wikipédia en troisième (impact large sur les citations), et corrections de cohérence des annuaires en quatrième (renforcement des signaux d'entité). Inclure des instructions précises pour chaque correction : quoi changer, où le changer, et toute exigence de processus (exigences de sources fiables de Wikipédia, vérification de revendication du Knowledge Panel, besoins de citation de Wikidata).

## Sortie

Un audit de cohérence d'entité complet contenant :

- **Grille de cohérence de l'entité** : statut par plateforme — présent/absent, cohérent/incohérent/obsolète — avec un pourcentage de cohérence global et une note lettre
- **Liste des écarts précis** : chaque incohérence de propriété sur chaque plateforme, montrant la valeur attendue (depuis le profil de marque), la valeur réelle trouvée, et la sévérité (critique pour les incohérences NAP/site web, élevée pour les erreurs de date de fondation/secteur, moyenne pour les profils sociaux manquants, faible pour les différences mineures de description)
- **Actions Wikidata** : propriétés à créer, mettre à jour, ou corriger sur Wikidata, avec les sources de citation requises et un guide d'édition étape par étape
- **Actions Knowledge Panel** : statut et processus de revendication, corrections d'information à soumettre, mises à jour d'image/logo nécessaires, et ajustements de catégorie
- **Évaluation de notoriété Wikipédia** : si aucun article n'existe — évaluation des critères de notoriété avec des sources fiables précises identifiées, recommandation sur l'opportunité de créer un article, et plan de rédaction si notable. Si un article existe — problèmes d'exactitude à traiter avec des consignes de discussion en page de discussion
- **Audit des fiches d'annuaire** : statut par annuaire avec les champs précis à mettre à jour, les fiches manquantes à créer, et les problèmes de cohérence NAP à résoudre
- **Plan de correction priorisé** : toutes les actions classées par impact sur la visibilité IA, avec une estimation d'effort (correction rapide, effort modéré, projet significatif) et l'impact attendu sur le score de cohérence de l'entité
- **Entrée du journal d'exécution** : enregistrement horodaté avec le nombre de plateformes, le score de cohérence, le nombre d'écarts critiques, et les signaux clés pour la piste d'audit

## Agents utilisés

- **seo-specialist** — analyse d'entité sur Wikidata, Knowledge Panel, Wikipédia, et annuaires, stratégie d'optimisation du knowledge graph, vérification des propriétés Wikidata et guidance d'édition, évaluation de la notoriété Wikipédia avec identification de sources fiables, analyse de cohérence NAP, évaluation de l'impact sur la résolution d'entité, et recommandations de correction priorisées par impact sur la visibilité IA
- **execution-coordinator** — coordination des mises à jour d'annuaires sur plusieurs plateformes, guidance du processus de revendication du Knowledge Panel Google, création de plan d'action structuré avec estimations d'effort et séquencement, et suivi d'exécution pour les workflows de correction d'entité multi-étapes

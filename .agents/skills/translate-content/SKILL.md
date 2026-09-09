---
name: translate-content
description: "Traduire du contenu marketing avec un routage automatique de service par paire de langues, une notation de qualité sur cinq dimensions (ratio de longueur, mise en forme, termes clés, placeholders, exhaustivité), et une vérification de la voix de marque sur le résultat ; signale les idiomes, jeux de mots, et CTA émotionnels pour une transcréation avec 2-3 options créatives notées plus des rétro-traductions. Se déclenche sur \"/digital-marketing-pro:translate-content\", \"translate this landing page into German\", \"localize this email for India\", \"transcreate our slogan\", \"does the translated version keep our brand voice\". Lit les termes à ne pas traduire, le glossaire, et les préférences de formalité du profil de marque ; s'exécute via les serveurs MCP de traduction connectés."
argument-hint: "[target-language]"
---

# /digital-marketing-pro:translate-content

## Objectif

Traduire du contenu marketing avec un routage de service axé sur les capacités et une assurance qualité. Pour chaque langue cible, le routeur identifie ce dont la famille de langue a besoin d'un service de traduction (modèles conscients de l'écriture native pour les cibles indiques, registres de formalité pour l'européen, segmentation et mélange d'écritures pour le CJK) et résout un service concret à l'exécution — à partir de la préférence enregistrée de la marque ou des serveurs MCP de traduction déjà connectés par l'utilisateur. Lorsque rien ne se résout, la traduction se poursuit via la capacité multilingue propre au harnais avec une notation de qualité obligatoire — aucun produit n'est jamais nommé de mémoire, et aucun n'est requis. La voix de marque, la mise en forme, et la terminologie clé sont préservées tout au long.

Au-delà de la traduction littérale, cette commande analyse le contenu à la recherche d'éléments nécessitant une transcréation plutôt qu'une traduction : idiomes, jeux de mots, humour, appels à l'action émotionnels, et références culturelles. Lorsque ceux-ci sont détectés (ou lorsque l'utilisateur demande explicitement une transcréation), elle produit plusieurs options créatives avec une notation de préservation de l'intention, garantissant que l'impact émotionnel et l'efficacité marketing se transmettent à travers les langues. Chaque traduction est notée en qualité et vérifiée en voix de marque avant livraison.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu à traduire** : texte en ligne, chemin de fichier, ou bloc de contenu collé. Peut être un élément unique (titre, e-mail, texte publicitaire) ou un document structuré (landing page, modèle d'e-mail avec sections)
- **Langue(s) cible(s)** : une ou plusieurs langues cibles — accepte les codes de langue (hi, de, ja, fr-CA, pt-BR) ou les noms en clair (hindi, allemand, japonais, français canadien, portugais brésilien). Plusieurs cibles peuvent être spécifiées pour une traduction par lots
- **Langue source** : optionnel — la langue du contenu original. Auto-détectée via language-router.py si omise
- **Indicateur de transcréation** : optionnel — mettre à `true` pour forcer l'approche de transcréation sur tout le contenu, indépendamment de l'analyse de contenu. Utile lorsque l'utilisateur sait que le contenu est hautement créatif ou culturellement sensible
- **Termes à ne pas traduire** : optionnel — termes spécifiques, noms de produits, ou éléments de marque devant rester dans la langue source. Remplace toute liste de termes à ne pas traduire déjà définie dans le profil de marque
- **Niveau de formalité** : optionnel — `formal` ou `informal`, pour les langues avec des registres formel/informel (le Sie/du allemand, le vous/tu français, etc.). Transmis au service de traduction résolu lorsqu'il prend en charge le contrôle de registre ; sinon appliqué dans les instructions de traduction et vérifié en révision. Si omis, par défaut la préférence du profil de marque ou formel
- **Entrées de glossaire** : optionnel — paires de termes (source : cible) pour imposer des traductions spécifiques pour la terminologie clé. Complète tout glossaire au niveau de la marque

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Extraire la configuration linguistique — la liste de termes `do_not_translate`, les `translation_preferences` (services préférés par paire de langues, valeurs par défaut de formalité, glossaire), et les règles `locale_formatting` (formats de date, séparateurs de nombres, symboles de devise). Charger les règles de conformité pour les marchés cibles depuis `skills/context-engine/compliance-rules.md`. Vérifier la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les règles de voix et de ton (elles alimentent la notation de voix de marque de la traduction). Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Détecter la langue source** : si la langue source n'a pas été spécifiée, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action detect --text "{content_or_path}"` pour identifier la langue source avec un score de confiance. Signaler la langue détectée à l'utilisateur pour confirmation si la confiance est inférieure à 95 %.
3. **Router vers une capacité de traduction** : pour chaque langue cible, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action route --source "{source_lang}" --target "{target_lang}" --brand {slug}`. Le résultat identifie le `capability_kind` et les `service_criteria` pour la famille de langue et résout un service concret UNIQUEMENT à partir de la préférence enregistrée de la marque (`basis: brand-preference`) ou des serveurs MCP de traduction connectés de l'utilisateur (`basis: connected-servers` ; avec plusieurs candidats, choisir celui correspondant le mieux aux critères et proposer d'enregistrer le choix via /digital-marketing-pro:language-config). Signaler à l'utilisateur le service résolu et sa base. Si `basis: unresolved`, le dire clairement et suivre l'échelle de résolution de la charge utile — ne jamais nommer un service de mémoire et ne jamais recommander d'en installer un.
4. **Analyser le contenu pour les besoins de transcréation** : scanner le contenu source à la recherche d'éléments résistant à la traduction littérale — idiomes et expressions familières, jeux de mots ou calembours, humour et sarcasme, CTA émotionnels et slogans, références et analogies culturelles, schémas de rime ou de rythme, doubles sens. Si l'indicateur de transcréation est défini ou si le contenu contient des éléments nécessitant significativement une transcréation, préparer un brief de transcréation en utilisant la méthodologie définie dans `skills/context-engine/transcreation-framework.md`. Pour chaque élément signalé, documenter l'intention originale, le ton émotionnel, et la réponse d'audience souhaitée pour guider l'adaptation créative.
5. **Exécuter la traduction** via ce que le routage a résolu :
   - **Serveur MCP résolu** (`basis: brand-preference` ou `connected-servers`) : appeler ce serveur. Utiliser ses capacités là où elles existent — paramètres de formalité/registre, application du glossaire ou des termes à ne pas traduire, gestion des balises pour la préservation HTML/XML, préférences d'écriture ou de dialecte pour les cibles indiques, sélection de variante pour le chinois. Là où le serveur manque d'une capacité requise par les critères, l'appliquer dans les instructions envoyées et la vérifier à l'étape de notation.
   - **Non résolu** (`basis: unresolved`) : traduire avec la propre capacité multilingue du harnais, en appliquant vous-même les `service_criteria` du résultat de routage (registre, fidélité d'écriture, variante). Ce chemin est légitime, pas un repli dégradé — mais le score de qualité de l'étape 6 et le signalement pour révision humaine en dessous de 85 de l'étape 7 sont non négociables pour lui.
   - Dans chaque cas : transmettre ou appliquer les termes à ne pas traduire (fusionnés depuis le profil de marque et la liste fournie par l'utilisateur), les paramètres de formalité, les entrées de glossaire, et la préservation de la mise en forme (balises HTML, placeholders comme {{first_name}}, syntaxe Markdown)
6. **Noter la qualité de traduction** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/language-router.py" --action score --source "{source}" --target "{target}" --original "{source_content}" --translated "{translated_content}"` pour évaluer la qualité sur plusieurs dimensions :
   - Ratio de longueur (traduit vs source — signale une expansion ou compression inhabituelle)
   - Préservation de la mise en forme (balises HTML, Markdown, placeholders intacts)
   - Cohérence des termes clés (termes à ne pas traduire respectés, termes de glossaire correctement appliqués)
   - Intégrité des placeholders (toutes les variables dynamiques comme {{name}}, {price} préservées)
   - Exhaustivité (aucune phrase ou paragraphe manquant)
7. **Gérer les problèmes de qualité** : si le score de qualité de traduction est inférieur à 85, identifier les problèmes spécifiques à partir de la répartition de notation. Tenter des corrections ciblées — retraduire les segments problématiques, corriger les ruptures de mise en forme, restaurer les placeholders manquants. Renoter après corrections. Si la qualité reste inférieure à 85, signaler les problèmes spécifiques pour révision humaine.
8. **Exécuter la transcréation** (le cas échéant) : pour le contenu signalé pour transcréation ou lorsque l'indicateur de transcréation est défini, produire 2-3 options d'adaptation créative par élément signalé. Chaque option inclut :
   - L'adaptation créative dans la langue cible
   - La rétro-traduction en anglais pour révision
   - Le score de préservation de l'intention (dans quelle mesure l'intention marketing originale est transmise)
   - Des notes d'adéquation culturelle (pourquoi cette adaptation fonctionne pour le marché cible)
   - Une évaluation de l'alignement de ton (formel/enjoué/urgent correspond au ton original)
9. **Exécuter la vérification de voix de marque** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/brand-voice-scorer.py" --brand {slug} --text "{translated_content}"` pour évaluer si le contenu traduit maintient les caractéristiques de la voix de marque. Signaler toute dérive de voix avec des exemples et suggestions spécifiques.
10. **Présenter le contenu traduit avec les indicateurs de qualité** : livrer le contenu traduit final accompagné de toutes les données de qualité, formaté pour une révision et une approbation faciles.

## Sortie

Une livraison de traduction structurée contenant :

- **Contenu traduit** : le texte traduit final pour chaque langue cible, préservant la mise en forme originale (HTML, Markdown, placeholders)
- **Score de qualité de traduction** : score global (0-100) avec répartition par dimension — ratio de longueur, préservation de la mise en forme, cohérence des termes clés, intégrité des placeholders, exhaustivité
- **Service utilisé** : quel service de traduction a géré cette paire de langues et pourquoi il a été sélectionné
- **Langue source** : langue source détectée ou confirmée avec le niveau de confiance
- **Conformité aux termes à ne pas traduire** : confirmation que tous les termes protégés ont été préservés dans la langue source, ou signalement de toute violation
- **Score de voix de marque** : dans quelle mesure le contenu traduit maintient les caractéristiques de la voix de marque, avec des observations spécifiques sur la dérive de voix si détectée
- **Options de transcréation** (le cas échéant) : 2-3 options d'adaptation créative par élément signalé, chacune avec rétro-traduction, score de préservation de l'intention, notes d'adéquation culturelle, et évaluation de l'alignement de ton
- **Rapport de préservation de mise en forme** : confirmation que les balises HTML, la syntaxe Markdown, les placeholders, et les éléments structurels ont survécu intacts à la traduction
- **Signalements qualité** : tout problème noté en dessous du seuil avec des descriptions et une sévérité précises (critique : contenu manquant ou placeholders cassés ; avertissement : légère dérive de mise en forme ou ratio de longueur inhabituel ; info : observations de style mineures)
- **Recommandations** : suggestions pour améliorer la traduction — priorités de révision humaine, termes à ajouter au glossaire pour les futures traductions, et tout ajustement spécifique à la locale nécessaire (par ex. format de date, symbole de devise, unités de mesure)

## Agents utilisés

- **localization-specialist** — gère le flux de traduction de bout en bout, y compris le routage de service, l'analyse de transcréation, la notation de qualité, l'évaluation de l'adaptation culturelle, la préservation de la voix de marque dans la langue cible, et la résolution des problèmes de qualité
</content>

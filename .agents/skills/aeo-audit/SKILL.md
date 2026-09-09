---
name: aeo-audit
description: "Auditer la manière dont une marque apparaît sur les 6 surfaces de réponse IA canoniques — ChatGPT, Perplexity, Google AI Mode, AI Overviews, Gemini, Copilot — en interrogeant 10 à 25 requêtes pour produire un ensemble de livrables numérotés avec des tableaux de bord de visibilité par plateforme, des vérifications de précision des citations, une matrice concurrentielle, des lacunes de contenu et un plan d'optimisation validé par un tableau de bord qualité à quatre portes. Se déclenche sur \"/digital-marketing-pro:aeo-audit\", \"does ChatGPT know about our brand\", \"check our AI search visibility\", \"how does Perplexity describe us\", \"are we showing up in AI Overviews\". Lit le profil de marque ; réconcilie les sondages avec les données réelles de GSC via /digital-marketing-pro:gsc-ai-performance et définit le standard de notation de visibilité IA réutilisé par geo-monitor et share-of-voice."
argument-hint: "[brand-name or URL]"
---

# /digital-marketing-pro:aeo-audit

## Objectif

Évaluer la visibilité et la précision de la marque sur les moteurs de réponse IA. Analyser comment la marque est citée, décrite et recommandée par ChatGPT, Perplexity, **Google AI Mode** (la surface de recherche conversationnelle devenue l'expérience par défaut de Google lors de l'I/O 2026 — environ 1 milliard d'utilisateurs actifs mensuels en mai 2026), Google AI Overviews, Gemini et Microsoft Copilot. Produire des recommandations d'optimisation pour améliorer la visibilité IA.

**AI Mode vs AI Overviews — pourquoi les deux comptent :** les AI Overviews sont le bloc de synthèse en haut d'une page de résultats Google classique et se déclenchent sur un sous-ensemble de requêtes. AI Mode est un onglet conversationnel (devenu désormais l'expérience de recherche par défaut pour les utilisateurs y ayant adhéré) reposant sur Gemini 3.5 Flash, avec un raisonnement plus poussé, des questions de suivi et un schéma de citation différent. Les deux surfaces sélectionnent des sources différentes pour une même requête dans une large part des cas (observation interne, 05/2026 — le chiffre « 40-60 % » est une estimation approximative ; à revérifier avec votre propre ensemble de sondages). Auditez les deux.

**Recoupement avec le rapport GSC AI Performance (déployé le 3 juin 2026) :** le rapport GSC AI Performance de Google Search Console (déploiement initial au Royaume-Uni, puis mondial) fournit les *impressions* réelles dans AI Overviews + AI Mode pour les propriétés vérifiées. Les résultats de sondage synthétiques de cette compétence doivent être réconciliés avec les données réelles de GSC — voir `/digital-marketing-pro:gsc-ai-performance` pour le workflow. Avertissement important : le rapport GSC exclut volontairement les données de clic ; l'attribution du clic doit venir de GA4 (le nouveau groupe de canaux `AI Assistant`, ajouté le 13 mai 2026, capture les référents `Medium=ai-assistant` en provenance de ChatGPT/Gemini/Claude ; voir `/digital-marketing-pro:analytics-insights`).

**Position officielle de Google sur l'optimisation IA** (guide d'optimisation IA de Google, mis à jour le 15 mai 2026) : pas de `llms.txt`, pas de schéma spécifique à l'IA, pas de porte d'éligibilité IA séparée. Les pages éligibles aux extraits dans la recherche classique sont éligibles aux fonctionnalités IA. Ne fabriquez pas de travail autour de facteurs de classement fictifs — `/digital-marketing-pro:aeo-geo` documente ce qui *fonctionne réellement* (cohérence des entités, extraits dignes de citation, alignement avec le knowledge graph).

**Information Agents (Google AI Pro / Ultra, lancement prévu à l'été 2026) :** Google a annoncé lors de l'I/O 2026 une nouvelle classe d'agents persistants qui surveillent en continu le web, les actualités et les données en temps réel pour les abonnés, et livrent des synthèses avec des capacités actionnables. Une fois ces agents en service, ils deviendront une **7e cible de sondage** pour cette compétence (aux côtés de ChatGPT / Perplexity / AI Mode / AI Overviews / Gemini / Copilot). D'ici là, traitez AI Mode comme le proxy — les agents reposent sur la même architecture Gemini 3.5 Flash. Source : [blog.google/search-io-2026](https://blog.google/products-and-platforms/products/search/search-io-2026/).

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Nom de la marque** : la marque à auditer
- **URL du site web** : domaine principal
- **Requêtes clés** : 5 à 10 requêtes qu'un client potentiel pourrait poser et qui devraient faire apparaître la marque
- **Concurrents** : 2 à 3 concurrents pour comparaison
- **Catégories de produits/services** : ce pour quoi la marque devrait être connue

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de la marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. **Vérifier également l'existence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. Définir un ensemble de requêtes de test : requêtes de marque, requêtes de catégorie, requêtes de comparaison, requêtes « meilleur… », requêtes problème-solution
3. Analyser comment la marque apparaît dans les réponses IA pour chaque type de requête
4. Vérifier la précision des citations : les faits sont-ils exacts ? Les URL sont-elles valides ? La description est-elle à jour ?
5. Comparer la fréquence de mention de la marque et le sentiment associé face aux concurrents
6. Évaluer l'autorité des sources : de quelles sources les moteurs IA tirent-ils les informations sur la marque ?
7. Évaluer la présence des données structurées et du panneau de connaissances (knowledge panel)
8. Identifier les lacunes de contenu là où la marque devrait apparaître mais ne le fait pas
9. Générer des recommandations d'optimisation pour améliorer la visibilité IA

## Résultat

Un rapport d'audit AEO structuré contenant :

- Un tableau de bord de visibilité IA multiplateforme (ChatGPT, Perplexity, Google AI Mode, Google AI Overviews, Gemini, Microsoft Copilot)
- Les résultats requête par requête, montrant où la marque apparaît, comment elle est décrite et les sources de citation
- Une matrice de comparaison concurrentielle pour la visibilité IA
- Une évaluation de la précision des citations, avec les corrections nécessaires
- Une analyse de l'autorité des sources — quelles pages/quels sites génèrent les mentions IA
- Une liste des lacunes de contenu — requêtes où la marque est absente mais devrait apparaître
- Un plan d'optimisation : données structurées, stratégie de contenu, construction d'autorité et optimisation des entités

## Convention de numérotation des livrables

Tous les livrables de l'audit AEO vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/aeo-audit/{YYYY-MM-DD}/` :

```
00-input.md                 identité de marque, ensemble de requêtes cibles, liste de concurrents, plateformes IA sondées
01-query-set.md             les 10 à 25 requêtes sondées, avec classification d'intention
02-probe-results.json       réponses brutes des sondages par plateforme et par requête (la couche de données)
03-platform-scorecard.md    tableau de bord de visibilité par plateforme IA (1-10) avec écart vs exécution précédente
04-citation-accuracy.md     vérification fait par fait de la précision des descriptions IA ; ce qu'il faut corriger
05-source-authority.md      quelles pages/sites génèrent les mentions IA ; carte des entités thématiques
06-content-gaps.md          requêtes où la marque est absente mais devrait apparaître
07-competitor-matrix.md     présence IA côte à côte face aux concurrents
08-quality-scorecard.md     les portes ci-dessous
09-optimization-playbook.md  données structurées, contenu, autorité, travail sur les entités — séquencés
PLAN.md                     livrable synthétique sur une page
```

Réconciliez `03-platform-scorecard.md` avec les données réelles de `/digital-marketing-pro:gsc-ai-performance` — les résultats de sondage montrent ce que l'IA *pourrait* faire remonter ; GSC montre ce qu'elle a *réellement* fait remonter.

## Tableau de bord qualité

| Porte | Ce qu'elle vérifie |
|---|---|
| **query_set_size** | ≥ 10 requêtes sondées (en dessous, les résultats sont anecdotiques) |
| **platform_coverage** | ≥ 4 des 6 plateformes prises en charge sondées (ChatGPT, Perplexity, AI Mode, AI Overviews, Gemini, Copilot) |
| **competitor_coverage** | ≥ 2 concurrents sondés avec le même ensemble de requêtes que la marque |
| **citation_accuracy_done** | Chaque résultat « la marque apparaît » a été vérifié factuellement (pas de livraison silencieuse d'un « l'IA a dit X — ça a l'air correct ») |

`status: ready` requiert que les quatre portes soient validées.

## Standard de notation de visibilité IA (canonique — réutilisé dans tout le plugin)

Cette compétence définit le **standard unique de notation de visibilité IA** du plugin. Chaque surface de visibilité IA le réutilise — n'inventez pas un modèle parallèle.

- **Surfaces canoniques (6)** : Google AI Mode, Google AI Overviews, ChatGPT, Perplexity, Gemini, Microsoft Copilot. Cet ensemble exact correspond à la constante `PLATFORMS` dans `scripts/geo-tracker.py` — référencez cette constante, ne relistez pas un ensemble différent.
- **Grille canonique** : le score de visibilité par plateforme sur 1-10, plus les quatre portes ci-dessus. Notez chaque plateforme séparément ; ne faites jamais de moyenne entre plateformes (une marque peut obtenir 9/10 sur Perplexity et 2/10 sur ChatGPT — la moyenne induit en erreur).
- **Mode récurrent** : `/digital-marketing-pro:geo-monitor` applique cette même grille selon un calendrier (hebdomadaire / mensuel) et en suit l'évolution dans le temps. Le score de santé GEO sur 0-100 et la note de A à F que produit `geo-tracker.py` sont la **vue de tendance** de ces mêmes données sous-jacentes — un cumul longitudinal, pas un second modèle de notation.
- **Consommateurs** : `geo-monitor` (récurrent), `share-of-voice` (sa dimension IA), `rank-monitor` (présence de citation dans AI Overview en mode `--features`). Tous réconcilient les scores de sondage synthétiques avec les données réelles de GSC via `/digital-marketing-pro:gsc-ai-performance`.

## Enchaînements

- **En amont :** `/digital-marketing-pro:aeo-geo` pour le cadrage stratégique par rapport auquel cet audit mesure
- **En aval :**
  - `/digital-marketing-pro:gsc-ai-performance` — réconcilier les résultats de sondage synthétiques avec les données réelles de GSC
  - `/digital-marketing-pro:keyword-cluster` — `06-content-gaps.md` devient une donnée d'entrée pour le clustering
  - `/digital-marketing-pro:entity-audit` — pilote les corrections de `05-source-authority.md` dans le Knowledge Graph
  - `/digital-marketing-pro:seo-drift` — au trimestre suivant, comparer deux instantanés AEO

## Conseils et mises en garde

- **AI Mode et AI Overviews sont fréquemment en désaccord sur les mêmes requêtes** (observation interne, 05/2026 — le chiffre « 40-60 % » est une estimation approximative, à revérifier avec votre propre ensemble de sondages) — sondez toujours les deux séparément, ne les regroupez jamais sous « Google AI ».
- **Ne sondez pas plus de 25 requêtes par session.** Au-delà, les limites de débit des modèles et le coût en tokens deviennent dominants. Choisissez les 10 à 25 requêtes à plus forte valeur.
- **La précision des citations est l'étape la plus souvent négligée de l'audit.** Les moteurs IA hallucinent des faits sur les marques avec assurance ; si vous ne vérifiez pas les faits, vous certifiez des informations erronées. Vérifiez toujours au moins le fait le plus cité par plateforme.
- **Les sondages synthétiques surestiment la présence.** Les vrais utilisateurs formulent leurs requêtes différemment de l'ensemble de test. Le recoupement avec le rapport GSC AI Performance (3 juin 2026, Royaume-Uni en premier) est ce qui indique les impressions réelles.
- **Notez les résultats de sondage, ne faites pas de moyenne entre plateformes.** Une marque peut obtenir 9/10 sur Perplexity (qui cite tout le monde) et 2/10 sur ChatGPT (citation sélective) — la moyenne induit en erreur. Reportez les scores par plateforme côte à côte.

## Agents utilisés

- **seo-specialist** — Analyse de la recherche IA, optimisation des entités, données structurées, stratégie de citation

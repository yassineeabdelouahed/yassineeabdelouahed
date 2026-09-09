---
name: keyword-research
description: "Recherche de mots-clés autonome — étend les mots-clés de départ via le MCP de mots-clés connecté de la marque (Ahrefs, Semrush, SE Ranking, ou GSC), classe l'intention de recherche, associe les mots-clés à des types de contenu, fait ressortir les lacunes de contenu par rapport aux concurrents, les opportunités longue traîne et de fonctionnalités SERP, et livre un document de stratégie de mots-clés priorisé. Le volume et la difficulté proviennent du fournisseur connecté et ne sont jamais inventés. Se déclenche sur \"/digital-marketing-pro:keyword-research\", \"what keywords should we target\", \"find content gaps versus competitors\", \"expand these seed keywords\", \"which queries have buying intent\". Lit le profil de marque, les guidelines et l'historique des campagnes ; transmet 20+ mots-clés bruts à /digital-marketing-pro:keyword-cluster pour un clustering pilier+déclinaisons."
argument-hint: "[topic or seed keywords]"
---

# /digital-marketing-pro:keyword-research

## Objectif

Outil autonome de *recherche* de mots-clés — expansion, classification de l'intention de recherche, et analyse des lacunes concurrentielles. Produit une liste de mots-clés priorisée et classée par intention avec des recommandations de contenu. Les chiffres de volume et de difficulté de mot-clé proviennent du MCP de mots-clés connecté de la marque (Ahrefs / Semrush / SE Ranking / GSC) — ce skill les fait ressortir et les interprète, il ne les invente pas. **Le clustering en un plan pilier+déclinaisons est délégué à `/digital-marketing-pro:keyword-cluster`** (le moteur `keyword_cluster.py`) ; ce skill produit les mots-clés de départ que ce skill consomme.

## Entrée requise

L'utilisateur doit fournir (ou se verra demander) :

- **Mots-clés de départ ou sujet** : mots-clés de départ, un domaine thématique, ou une URL depuis laquelle extraire des thèmes de mots-clés
- **Audience cible** : à qui le contenu est destiné (démographie, niveau d'expertise, points de douleur)
- **Secteur** : le secteur ou la niche pour contextualiser les estimations de volume et de difficulté
- **Domaines concurrents** : facultatif -- 1 à 3 domaines concurrents contre lesquels lancer l'analyse des lacunes de contenu
- **Marché/langue cible** : ciblage géographique et linguistique pour les estimations de volume
- **Objectifs de contenu** : trafic, leads, leadership éclairé, ventes produit, ou notoriété de marque
- **Inventaire de contenu existant** : facultatif -- URL ou sujets déjà publiés pour éviter les doublons

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix, la conformité, le contexte sectoriel. Vérifier `guidelines/_manifest.json` pour les restrictions, la messagerie, les styles par canal, les règles de voix et de ton, et les modèles. Si un modèle correspondant à cette commande existe dans `~/.claude-marketing/brands/{slug}/templates/`, appliquer son format. Si aucune marque n'existe, proposer `/digital-marketing-pro:brand-setup` ou continuer avec les valeurs par défaut.
2. **Vérifier l'historique des campagnes** : lancer `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` pour identifier les recherches de mots-clés et campagnes de contenu précédentes sur lesquelles s'appuyer plutôt que de les dupliquer.
3. **Charger les fichiers de référence** : consulter `skills/content-engine/` pour le contexte de stratégie de contenu et `skills/context-engine/industry-profiles.md` pour les benchmarks de mots-clés spécifiques au secteur et les motifs de comportement de recherche.
4. **Étendre l'ensemble de départ** : utiliser le MCP de mots-clés connecté de la marque (Ahrefs `getRelatedKeywords`, Semrush, SE Ranking, ou extraction de requêtes GSC) pour étendre les mots-clés de départ en une liste de candidats, en récupérant les chiffres de volume et de difficulté du fournisseur lorsqu'ils sont disponibles. Noter le fournisseur et la date de récupération — le volume/KD sont des estimations du fournisseur, pas des mesures, et les fournisseurs divergent de 20 à 50 %. Ne **pas** affirmer des chiffres de volume/KD/tendance que les outils connectés n'ont pas renvoyés.
5. **Classer l'intention de recherche** : catégoriser chaque mot-clé en groupes d'intention -- informationnelle (comment faire, qu'est-ce que), navigationnelle (marque, noms de produit), commerciale (meilleur, avis, comparaison), et transactionnelle (acheter, prix, démo, essai gratuit).
6. **Associer les mots-clés à des types de contenu** : attribuer à chaque cluster un format de contenu recommandé -- article de blog, landing page, page pilier, page de comparaison, FAQ, vidéo, outil, ou contenu interactif -- basé sur l'intention et l'analyse des fonctionnalités SERP.
7. **Identifier les lacunes de contenu par rapport aux concurrents** : si des domaines concurrents ont été fournis, croiser leurs mots-clés positionnés avec la couverture actuelle de la marque pour faire ressortir les opportunités manquées et les sujets sous-desservis.
8. **Découvrir les opportunités longue traîne** : étendre chaque cluster avec des variantes longue traîne, des mots-clés sous forme de question (motifs People Also Ask), et des modificateurs de recherche associés représentant des points d'entrée à moindre difficulté.
9. **Évaluer les opportunités de fonctionnalités SERP** : pour chaque mot-clé principal, identifier quelles fonctionnalités SERP sont présentes (featured snippets, People Also Ask, knowledge panels, image packs, carrousels vidéo) et noter lesquelles sont atteignables.
10. **Identifier les opportunités saisonnières et tendance** : signaler les mots-clés présentant des motifs saisonniers notables ou des tendances de recherche en hausse représentant des opportunités de contenu sensibles au temps nécessitant une planification priorisée.
11. **Prioriser par impact et difficulté** : noter chaque cluster de mots-clés sur une métrique de priorité composite pondérant le volume estimé, la difficulté de classement, la pertinence business, le potentiel de conversion, et l'opportunité de lacune de contenu.
12. **Générer le document de stratégie de mots-clés** : compiler l'analyse complète en un livrable structuré avec des recommandations claires de prochaines étapes pour le séquençage de création de contenu.

## Sortie

Un document de stratégie de mots-clés structuré contenant :

- Des clusters de mots-clés organisés par thème, chacun listant les mots-clés individuels
- Le volume de recherche mensuel estimé et la difficulté de mot-clé par mot-clé
- La classification de l'intention de recherche (informationnelle, navigationnelle, commerciale, transactionnelle) par mot-clé
- Les opportunités de fonctionnalités SERP par cluster (featured snippets, PAA, vidéo, image pack)
- Le type et format de contenu recommandé pour chaque cluster
- Un score de priorité (élevé/moyen/faible) avec justification pour le séquençage
- Une analyse des lacunes de contenu montrant les mots-clés détenus par les concurrents que la marque n'a pas
- Des opportunités de mots-clés longue traîne à difficulté moindre et forte pertinence
- Une liste de mots-clés sous forme de question pour le ciblage FAQ et People Also Ask
- Une feuille de route de création de contenu recommandée basée sur le classement de priorité
- Des mots-clés à gain rapide (difficulté faible, volume correct, forte pertinence) signalés pour une action immédiate
- Des opportunités de mots-clés saisonniers ou tendance avec recommandations de timing
- Des opportunités de maillage interne entre les clusters de mots-clés et le contenu existant

## Astuces et mises en garde

- **Le volume de recherche de n'importe quel fournisseur est une estimation.** Ahrefs, Semrush, GSC, SE Ranking divergent tous de 20 à 50 % sur le même mot-clé. Utilisez des fourchettes, pas des valeurs ponctuelles.
- **La difficulté de mot-clé (KD) est une heuristique, pas une mesure.** Un KD de 60 signifie « compétitif » — pas « impossible ». Une petite marque avec une autorité de niche peut se positionner sur des mots-clés KD-70 face à des sites généralistes KD-30.
- **La longue traîne n'est pas toujours à plus faible volume.** Avec la recherche IA qui reformule les requêtes, la requête réelle qui génère le clic peut différer du mot-clé de départ. Vérifiez toujours la requête *effectivement* tapée par un utilisateur via GSC, pas l'hypothèse du rank-tracker.
- **Transmettez à `/digital-marketing-pro:keyword-cluster`** dès que vous avez ≥ 20 mots-clés bruts. Le clustering avant la rédaction est ce qui produit l'autorité thématique, pas les listes de mots-clés.
- **Ne refaites pas de recherche sur le même ensemble de mots-clés trimestriellement.** Ne refaites une recherche que lorsque le modèle économique, le marché cible, ou le paysage concurrentiel change. Sinon, les écarts ne sont que du bruit.
- **La classification de l'intention prime sur le volume.** Une requête « acheter [produit] » à 200/mois vaut plus que « qu'est-ce que [produit] » à 5000/mois pour la plupart des marques commerciales.

## Agents utilisés

- **seo-specialist** -- Recherche de mots-clés, estimation du volume et de la difficulté, analyse SERP, identification des lacunes de contenu, et notation de priorité
- **content-creator** -- Association aux types de contenu, recommandations d'angles de contenu, et planification éditoriale pour les pièces ciblées par mots-clés

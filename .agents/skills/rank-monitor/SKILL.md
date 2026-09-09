---
name: rank-monitor
description: "Mettre en place et exécuter le suivi du positionnement des mots-clés — capture de référence, contrôles de position planifiés via GSC et les MCP de suivi de classement connectés, et alertes à sévérité graduée (mineure/majeure/critique) en cas de baisse ; --features ajoute une matrice de propriété des requêtes par fonctionnalité SERP incluant la présence de citation dans l'AI Overview. Se déclenche sur \"/digital-marketing-pro:rank-monitor\", \"track our keyword rankings\", \"why did our rankings drop\", \"alert me when positions change\", \"are we in the AI Overview for this query\". Lit le profil de marque et les listes de mots-clés enregistrées ; pour une visibilité IA notée, associez /digital-marketing-pro:geo-monitor, et pour une comparaison d'instantanés /digital-marketing-pro:seo-drift."
argument-hint: "[brand-name] [--features]"
---

# /digital-marketing-pro:rank-monitor

## Objectif

Mettre en place et gérer le suivi du positionnement des mots-clés — et, avec `--features`, le suivi des fonctionnalités SERP dans la même exécution. Suivre les positions des mots-clés cibles sur Google, établir des références, détecter les baisses de plus de 5 positions et générer des alertes lorsque les classements changent de manière significative. En mode `--features`, suivre également quelles fonctionnalités SERP apparaissent pour chaque requête (AI Overviews, Featured Snippets, People Also Ask, Knowledge Panels, Local Pack, Image Pack, Video Carousel, Shopping) et si la marque les possède. Cela donne une visibilité continue sur la performance organique — en repérant tôt les baisses de classement, en identifiant les tendances à la hausse et en suivant une page de résultats de plus en plus riche en fonctionnalités.

> **Compétence fusionnée (anciennement `rank-monitor` + `serp-tracker`).** Le suivi des fonctionnalités SERP est désormais le mode `--features` de cette compétence unique. L'ancien `/digital-marketing-pro:serp-tracker` est un pointeur de dépréciation vers celle-ci.

### Sources de données (à lire avant la configuration)

- **Le MCP Google Search Console** est la source de position + impressions faisant autorité pour les propriétés vérifiées. GSC renvoie les positions, impressions, clics et CTR par requête/page — il ne renvoie **pas** la disposition complète des fonctionnalités SERP par requête ni les listes de citations AI Overview. Ne pas affirmer le contraire.
- **Les MCP de suivi de classement** (Ahrefs / Semrush / SE Ranking, si connectés) complètent les positions pour les mots-clés/concurrents que GSC ne peut pas voir et fournissent leurs propres indicateurs de fonctionnalités SERP.
- **Le MCP Moz** (`mcp-moz`) est **optionnel** — vérifiez que le package existe sur npm avant utilisation (`npm view mcp-moz`) ; `npx` exécute du code distant, donc ne branchez pas un package non vérifié. Si Moz n'est pas connecté, utilisez GSC + le MCP de suivi de classement déjà disponible pour la marque.
- **La présence d'AI Overview** en mode `--features` n'enregistre que *si* un AI Overview est apparu et *si la marque y a été citée* (un signal binaire de fonctionnalité SERP). Pour une mesure notée de la visibilité IA sur les 6 surfaces IA canoniques, utilisez `/digital-marketing-pro:geo-monitor` / `/digital-marketing-pro:aeo-audit` (le standard de notation de visibilité IA de référence) et, pour les impressions réelles, `/digital-marketing-pro:gsc-ai-performance`. Ne réimplémentez pas la notation de visibilité IA ici.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Mots-clés cibles** : Une liste de mots-clés à suivre — fournie directement, importée depuis un CSV ou une Google Sheet, ou récupérée depuis la liste de suivi de mots-clés existante de la marque à `${CLAUDE_PLUGIN_DATA}/{brand}/seo/keywords.json`. Les mots-clés doivent inclure une classification de l'intention de recherche (informationnelle, navigationnelle, transactionnelle, commerciale) si disponible
- **Mode** : le mode par défaut est classements uniquement. Passez `--features` pour construire également la matrice de présence des fonctionnalités SERP par requête dans la même exécution
- **Fréquence de suivi** : `daily` (quotidien) ou `weekly` (hebdomadaire) — quotidien pour les termes de tête prioritaires et les mots-clés de campagnes actives (ainsi que les ensembles de fonctionnalités volatils), hebdomadaire pour la longue traîne et les termes de priorité moindre
- **Seuils d'alerte** : le changement de position qui déclenche une alerte — la valeur par défaut est une baisse de plus de 5 positions. Personnalisable par groupe de mots-clés (par ex. >3 pour les termes de marque, >5 pour les termes de tête, >10 pour la longue traîne). Les seuils de baisse et de gain sont tous deux pris en charge
- **Domaines concurrents (optionnel)** : Domaines à suivre en parallèle de la marque pour les mêmes mots-clés / fonctionnalités — jusqu'à 10
- **Type d'appareil** : `mobile`, `desktop`, ou `both`
- **Pays cible** : la locale Google dans laquelle vérifier les classements — par ex. US, UK, AU, CA, IN

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. Vérifier également les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les SOP d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Capturer la référence de classement actuelle** : Interroger les sources de classement connectées (MCP GSC, plus tout MCP de suivi de classement / Moz disponible) pour la position de classement actuelle de chaque mot-clé cible. Enregistrer la position, l'URL classée, le taux de clics et les impressions depuis GSC lorsque disponible. En mode `--features`, enregistrer également quelles fonctionnalités SERP sont présentes pour la requête (à partir des indicateurs de fonctionnalités du suivi de classement ou d'une observation manuelle) et le domaine propriétaire par fonctionnalité. Pour les domaines concurrents, capturer leurs positions (et la propriété des fonctionnalités) pour les mêmes mots-clés.
3. **Configurer le planning de suivi** : Enregistrer la liste de mots-clés, le mode (`rankings` ou `rankings+features`), la fréquence de suivi, les seuils d'alerte, les domaines concurrents, le type d'appareil et le pays cible dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/rank-monitor/config.json`. Créer ou mettre à jour l'instantané de référence à `${CLAUDE_PLUGIN_DATA}/{brand}/seo/rank-monitor/baseline.json` avec les positions actuelles (et, en mode `--features`, la matrice de fonctionnalités) comme point de référence.
4. **À chaque contrôle de suivi : interroger et comparer** : Récupérer les positions actuelles de tous les mots-clés suivis. Comparer la position actuelle de chaque mot-clé à la fois à la référence (position d'origine au démarrage du suivi) et au contrôle précédent (dernière position enregistrée). Calculer le changement absolu par rapport à la référence, le changement depuis le dernier contrôle, la tendance glissante sur 7 et 30 jours, et la position moyenne sur tous les mots-clés suivis. En mode `--features`, comparer la matrice de fonctionnalités à l'instantané précédent (fonctionnalités gagnées/perdues, changements de propriété, apparition/changement de citation de l'AI Overview).
5. **Détecter les changements significatifs** : Identifier les mots-clés ayant franchi les seuils d'alerte — baisses dépassant le seuil de position configuré, mots-clés passés de la page 1 (positions 1-10) à la page 2 ou au-delà, mots-clés ayant gagné plus de 5 positions (gains rapides potentiels), et (en mode `--features`) nouvelles apparitions ou pertes de fonctionnalités SERP pour les URL de classement de la marque, ainsi que les changements de classement/fonctionnalités des concurrents qui les ont fait passer devant ou derrière la marque.
6. **Générer une alerte si les seuils sont franchis** : Catégoriser les alertes par sévérité — `minor` (mineure) pour des baisses de 3 à 5 positions (à surveiller), `major` (majeure) pour des baisses de 5 à 10 positions (enquêter sur la fraîcheur du contenu, des problèmes techniques ou l'activité concurrentielle), `critical` (critique) pour des baisses de plus de 10 positions ou des transitions page 1 → page 2 (enquête immédiate — vérifier les mises à jour d'algorithme, les actions manuelles, les erreurs techniques ou la cannibalisation de contenu). En mode `--features`, traiter la perte d'un Featured Snippet détenu ou d'une citation AI Overview comme au moins `major`. Inclure les prochaines étapes recommandées pour chaque niveau de sévérité.

## Suivi des fonctionnalités SERP (mode `--features`)

Lorsque `--features` est activé, l'exécution construit également une matrice requête par fonctionnalité. Fonctionnalités suivies et comment les interpréter :

| Fonctionnalité | Ce que « possédée » signifie | Signal d'optimisation |
|---|---|---|
| **AI Overview** | Un AI Overview est apparu ET l'URL de la marque figure parmi ses sources citées | Signal binaire de présence de citation uniquement. Pour une visibilité IA notée, utiliser `/digital-marketing-pro:geo-monitor` |
| **Featured Snippet** | La marque occupe la position 0 pour la requête | Format d'extraction : paragraphe (40-60 mots), liste (5-8 éléments), ou tableau |
| **People Also Ask** | Une URL de la marque répond à une question PAA pour la requête | Cibler les questions PAA avec un contenu H2/H3 de type FAQ |
| **Knowledge Panel** | Le panneau s'affiche pour l'entité de la marque | Renforcer les signaux d'entité (Wikidata, GBP, données structurées) — voir `/digital-marketing-pro:entity-audit` |
| **Local Pack** | La marque apparaît dans le pack de cartes à 3 résultats | Optimisation GBP + schéma local — voir `/digital-marketing-pro:local-seo` |
| **Image / Video Carousel** | Un actif de la marque apparaît dans le carrousel | Optimiser le texte alternatif / les noms de fichiers (images) ou les titres, descriptions, transcriptions (vidéo) |
| **Shopping / Sitelinks** | Une fiche de la marque est présente | Schéma produit / structure du site |

Les opportunités de fonctionnalités sont notées par atteignabilité (à quel point la marque est proche de remporter la fonctionnalité compte tenu de la position actuelle et du format de contenu) × impact sur le trafic (impact estimé sur le CTR compte tenu du volume de recherche et de la visibilité de la fonctionnalité).

## Résultat

Un rapport de classement structuré (et, en mode `--features`, de fonctionnalités SERP) contenant :

- **Instantané de classement** : Positions actuelles de tous les mots-clés suivis — position, URL classée, appareil, pays, date, comparaison à la référence et au contrôle précédent avec des indicateurs directionnels (hausse, baisse, stable)
- **Rapport de changement** : Changements de position depuis la référence et depuis le dernier contrôle — triés par les plus grandes baisses en premier, avec des mini-graphiques de tendance sur 7 et 30 jours
- **Résumé des alertes** : Mots-clés nécessitant une attention — regroupés par sévérité (critique, majeure, mineure) avec les changements de position spécifiques, les URL concernées et les étapes d'investigation recommandées
- **Matrice de fonctionnalités SERP** *(--features)* : Grille requête par fonctionnalité montrant quelles fonctionnalités apparaissent, qui les possède (marque, concurrent, ou autre), et le changement depuis le dernier instantané — y compris l'apparition d'AI Overview + le statut de citation de la marque
- **Liste d'opportunités de fonctionnalités** *(--features)* : Fonctionnalités non détenues classées par ordre de priorité que la marque pourrait raisonnablement cibler, avec des recommandations spécifiques de contenu/schéma
- **Comparaison concurrentielle** : Changements de position relative (et de propriété des fonctionnalités) pour les domaines concurrents suivis — qui a gagné, qui a perdu, face-à-face par mot-clé, et tendances de l'écart concurrentiel dans le temps

## Conseils et mises en garde

- **GSC n'a pas d'export de citation AI Overview.** Le signal AI Overview du mode `--features` est observationnel (un AIO est-il apparu, la marque y est-elle citée). Réconciliez les véritables impressions IA via `/digital-marketing-pro:gsc-ai-performance` et la visibilité IA notée via `/digital-marketing-pro:geo-monitor`.
- **Les variations de position sont plus bruyantes que les variations de clics/impressions** — un mot-clé oscillant entre les positions 8 et 12 produit de fortes variations en pourcentage qui ne signifient pas grand-chose. Faites davantage confiance aux mouvements d'impressions/clics pour le diagnostic.
- **Les données GSC ont environ 3 jours de retard.** Lors de la récupération des données « actuelles », terminez la fenêtre 3 jours avant aujourd'hui.
- **Ne suivez pas trop.** 50 à 150 mots-clés à forte valeur bien suivis valent mieux que 2 000 suivis comme du bruit.

## Agents utilisés

- **seo-specialist** — Analyse du classement des mots-clés et des fonctionnalités SERP, attribution de la propriété des fonctionnalités, diagnostic des changements de classement (mise à jour d'algorithme vs problème technique vs déplacement concurrentiel vs déclin du contenu), établissement de la référence et calcul des tendances, et actions recommandées par niveau de sévérité
- **performance-monitor-agent** — Génération d'alertes avec classification de sévérité, gestion du planning de suivi, détection de franchissement de seuil avec comparaison sur fenêtre glissante, suivi des tendances avec analyse directionnelle sur 7 et 30 jours, et mise en forme des notifications

## Voir aussi

- `/digital-marketing-pro:geo-monitor` — visibilité IA notée sur les 6 surfaces IA canoniques (le standard de notation de visibilité IA)
- `/digital-marketing-pro:gsc-ai-performance` — impressions réelles d'AI Overview / AI Mode depuis GSC
- `/digital-marketing-pro:seo-drift` — comparer deux instantanés de classement et faire ressortir les plus gros mouvements
</content>

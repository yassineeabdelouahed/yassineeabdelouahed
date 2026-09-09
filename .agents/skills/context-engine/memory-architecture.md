# Architecture de mémoire — Système de connaissances de marque persistant

Comment le plugin Digital Marketing Pro stocke, récupère, et apprend des connaissances marketing à travers les sessions.

---

## Vue d'ensemble

Le plugin utilise une **architecture de mémoire à 5 couches**. Chaque couche sert un objectif, un niveau de persistance, et un schéma de requête différents. Les couches sont additives — le plugin fonctionne avec la seule Couche 1, et chaque couche supplémentaire ajoute des capacités.

| Couche | Nom | Persistance | Configuration | Idéal pour |
|---|---|---|---|---|
| 1 | Contexte de session | Permanent (insights.json) + par session (mémoire auto) | Zéro configuration | Profil de marque, suivi de campagne, continuité de session |
| 2 | RAG de marque | Permanent, hébergé sur le cloud | Clé API Pinecone ou Qdrant | Enseignements historiques de campagne, recherche sémantique |
| 3 | Graphe de connaissances temporel | Permanent, hébergé sur le cloud | Clé API Graphiti | Comprendre comment les audiences, campagnes, et marchés évoluent dans le temps |
| 4 | Mémoire d'agent universelle | Permanent, hébergé sur le cloud | Clé API Supermemory | Partage de connaissances inter-agents, apprentissage institutionnel |
| 5 | Base de connaissances | Permanent, éditable par l'humain | Identifiants Notion ou Google Drive | Documentation d'équipe, guides de style, SOP |

> **Vérification de la réalité des packages MCP (à vérifier avant `npx`).** Seuls certains des packages nommés ci-dessous sont vérifiés comme réels sur npm à la date de cette publication. **Vérifiés réels :** `@pinecone-database/mcp` (Couche 2), `mcp-google-drive` (Couche 5). **Non vérifiés / aucun package npm officiel connu** — NE PAS supposer qu'ils existent ; rechercher d'abord sur npm, et se rappeler que `npx` exécute du code distant, donc vérifier tout package avant de l'exécuter (préférer `/digital-marketing-pro:add-integration` pour un chemin MCP personnalisé) : `mcp-server-qdrant` (un package portant ce nom existe mais est probablement un squattage de nom — le serveur MCP Qdrant officiel est distribué en Python/`uvx`, pas npm), `graphiti-mcp` (Couche 3), `@supermemoryai/supermemory-mcp` (Couche 4), et `@notionhq/mcp-server` (Couche 5 — Notion distribue plutôt un MCP HTTP hébergé à `https://mcp.notion.com/mcp`). **DMP n'intègre aucun MCP de mémoire** — la Couche 1 fonctionne toujours localement ; les Couches 2 à 5 ne fonctionnent que si vous connectez votre propre serveur.

---

## Couche 1 : Contexte de session (toujours disponible)

**Source :** Mémoire auto de Claude Code à `~/.claude/projects/` + `insights.json` à `~/.claude-marketing/brands/{slug}/insights.json`

**Persistance :** Par session (la mémoire auto survit entre sessions, insights.json est permanent)

**Ce qui est stocké :**
- Résumés de session et contexte de conversation
- Données du suivi de campagne (campagnes, instantanés de performance, enseignements, violations)
- Profil de marque (identité, voix, audiences, concurrents, objectifs)
- État de marque actif (`_active-brand.json`)

**Schéma de requête :** Chargé au démarrage de session par l'étape de contexte de marque de chaque compétence (`setup.py --summary`) ; aucun hook impliqué — le plugin ne fournit aucun hook par conception.

**Configuration :** Zéro configuration. Fonctionne dès l'installation avec `setup.py` et `campaign-tracker.py`.

**Limitations :**
- Aucune recherche sémantique — balayage linéaire uniquement
- Limité à environ 200 enseignements par marque (les entrées plus anciennes sont élaguées)
- Aucune requête inter-marques (les données de chaque marque sont isolées)
- Aucune conscience de relation ou temporelle entre les points de données

---

## Couche 2 : RAG de marque (base de données vectorielle)

**Services :** Pinecone (`@pinecone-database/mcp`) ou Qdrant (`mcp-server-qdrant`)

**Persistance :** Permanent, hébergé sur le cloud (Pinecone) ou auto-hébergé (Qdrant)

**Ce qui est stocké :**
- Guidelines de marque et documentation de voix
- Archives de campagne (plans, résultats, bilans post-mortem)
- Historique de performance et données de tendance
- Rapports d'intelligence concurrentielle
- Modèles de contenu et exemples hautement performants
- Documents de recherche d'audience et personas

**Métadonnées par entrée :**

| Champ | Type | Exemple |
|---|---|---|
| `brand_slug` | chaîne | `"acme-corp"` |
| `content_type` | énumération | `guideline`, `campaign-learning`, `competitive-intel`, `performance-insight`, `brand-asset` |
| `tags` | chaîne[] | `["email", "developer-audience", "q3-2026"]` |
| `source` | chaîne | `"campaign-tracker"`, `"manual-upload"`, `"performance-report"` |
| `created_at` | ISO 8601 | `"2026-01-15T14:30:00Z"` |
| `content_hash` | SHA-256 | Utilisé pour la déduplication — ignorer le stockage si le hash correspond à une entrée existante |

**Schéma de requête :** Recherche par similarité sémantique — les requêtes en langage naturel récupèrent les connaissances stockées les plus pertinentes.

Exemples :
- « Quelles stratégies e-mail ont fonctionné pour les audiences développeur ? »
- « Montrez-moi l'intelligence concurrentielle sur la tarification d'Acme »
- « Quels formats de blog ont généré le plus de trafic organique le trimestre dernier ? »

**Configuration :** Définir `PINECONE_API_KEY` dans `.env` (palier gratuit Pinecone : 1 index, 100K vecteurs) ou `QDRANT_URL` + `QDRANT_API_KEY` pour l'auto-hébergement.

**Stockage via :**
```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/memory-manager.py" --brand {slug} --action prepare-store --data '{"content": "...", "content_type": "campaign-learning", "tags": [...]}'
```
Le script prépare la charge utile, puis l'appel de stockage MCP l'écrit dans la base de données vectorielle. (Mettre `content_type` à l'intérieur de `--data` ; le drapeau `--type` est un filtre pour les actions de lecture et est ignoré par `prepare-store`.)

---

## Couche 3 : Graphe de connaissances temporel (Graphiti/Zep)

**Service :** Zep Graphiti (`graphiti-mcp`)

**Persistance :** Permanent, hébergé sur le cloud

**Ce qui est stocké :** Données entité-relation-temporelles — des faits sur les entités marketing et comment elles se rapportent les unes aux autres dans le temps.

**Types d'entités :**

| Entité | Exemples |
|---|---|
| Marque | Acme Corp, BetaWidget |
| Campagne | Envoi e-mail T3, Black Friday 2026 |
| Audience | Persona développeur, acheteur entreprise |
| Concurrent | RivalCo, AlternateTech |
| Canal | E-mail, LinkedIn, Google Ads |
| Message | Proposition de valeur A, offre de remise |
| Produit | Plan Pro, kit de démarrage |
| Marché | SaaS Amérique du Nord, entreprise APAC |

**Types de relations :**

| Relation | Schéma | Exemple |
|---|---|---|
| `targeted` | Campagne → Audience | « L'envoi e-mail T3 a ciblé le Persona développeur de janvier à mars 2026 » |
| `outperformed` | Campagne → Campagne | « Black Friday 2026 a surpassé Black Friday 2025 de 35 % de ROAS » |
| `shifted` | Changement de propriété d'audience | « Le Persona développeur est passé d'une préférence e-mail à une préférence Slack au T2 2026 » |
| `correlated` | Canal → Canal | « L'engagement LinkedIn a corrélé avec le lift de conversion Google Ads (r=0,72) » |
| `influenced` | Message → Conversion | « La proposition de valeur A a influencé 45 % des conversions entreprise du T3 » |

**Dimension temporelle :** Chaque relation a une plage temporelle. Cela permet des requêtes comme « Qu'était vrai au T1 vs au T3 ? » et le suivi de l'évolution des stratégies, audiences, et marchés.

**Schéma de requête :** Parcours de graphe avec filtres temporels.

Exemples :
- « Quelles campagnes ont ciblé les développeurs au T3 et quels ont été les résultats ? »
- « Comment la préférence de canal de notre audience entreprise a-t-elle changé sur les 12 derniers mois ? »
- « Quels messages ont corrélé avec les taux de conversion les plus élevés en APAC ? »

**Configuration :** Définir `GRAPHITI_API_KEY` dans `.env`.

**Stockage via :**
```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/memory-manager.py" --brand {slug} --action prepare-graph --data '{"entity_type": "campaign", "name": "...", "relationships": [...]}'
```
(Il n'y a pas de drapeau `--entity-type` — mettre `entity_type` à l'intérieur de `--data`.)

---

## Couche 4 : Mémoire d'agent universelle (Supermemory)

**Service :** Supermemory (`@supermemoryai/supermemory-mcp`)

**Persistance :** Permanent, hébergé sur le cloud

**Ce qui est stocké :** Enseignements d'agent inter-sessions — les découvertes, préférences, et schémas de chaque agent. C'est la couche de connaissance institutionnelle.

**Exemples de mémoires stockées :**
- « Le spécialiste e-mail a appris que l'audience d'Acme préfère les envois du mardi 10h aux envois du jeudi (taux d'ouverture 23 % plus élevé) »
- « L'acheteur média a trouvé que les publicités vidéo surpassent les publicités image 2:1 pour cette marque sur Meta »
- « Le spécialiste SEO a découvert que les guides longs (2 500+ mots) se classent 3x mieux que les articles courts pour les mots-clés d'Acme »
- « Le créateur de contenu a appris à éviter la voix passive — le brand manager l'a signalé deux fois en revue »

**Déduplication automatique :** Supermemory fusionne automatiquement les mémoires similaires, empêchant l'accumulation d'entrées redondantes.

**Schéma de requête :** Langage naturel — tout agent peut interroger ce que d'autres agents ont appris.

Exemples :
- « Qu'est-ce que tout agent a appris sur l'e-mail pour cette marque ? »
- « Quels schémas l'acheteur média a-t-il observés sur la performance des publicités vidéo ? »
- « Y a-t-il des problèmes connus avec le contenu LinkedIn de cette marque ? »

**Configuration :** Définir `SUPERMEMORY_API_KEY` dans `.env`.

**Partagé entre :** Les 24 agents. Quand un agent apprend quelque chose, tout autre agent peut le récupérer.

---

## Couche 5 : Base de connaissances (Notion/Google Drive)

**Services :** Notion (`@notionhq/mcp-server`) ou Google Drive (`mcp-google-drive`)

**Persistance :** Permanent, éditable par l'humain

**Ce qui est stocké :**
- Documentation d'équipe et supports d'intégration
- Guides de style de marque (les documents source originaux)
- Briefs de campagne et briefs créatifs
- Procédures opérationnelles standard
- Actifs créatifs et références de design
- Notes de réunion et journaux de décision

**Schéma de requête :** Recherche structurée par page/dossier + recherche textuelle dans les documents.

Exemples :
- « Trouver le guide de style de marque dans l'espace de travail Acme »
- « Que dit le brief de campagne du T3 sur l'audience cible ? »
- « Extraire les dernières notes de réunion sur l'allocation budgétaire »

**Configuration :** Définir `NOTION_API_KEY` dans `.env` ou `GOOGLE_APPLICATION_CREDENTIALS` pour Google Drive.

**Idéal pour :** Les connaissances maintenues par l'humain qui changent peu fréquemment. Cette couche est la source de vérité pour les documents que les équipes éditent collaborativement — le plugin y lit mais n'y écrit pas sans instruction explicite.

---

## Arbre de décision : quelle couche utiliser

| Besoin | Couche | Justification |
|---|---|---|
| « Quelle est notre voix de marque ? » | Couche 1 (profile.json) ou Couche 5 (Notion) | Toujours vérifier d'abord le profil ; Notion pour le guide de style complet |
| « Qu'est-ce qui a fonctionné pour l'e-mail le trimestre dernier ? » | Couche 2 (BD vectorielle) | Recherche sémantique sur les enseignements de campagne et les données de performance |
| « Comment notre audience a-t-elle changé au fil du temps ? » | Couche 3 (Graphe de connaissances) | Requête de graphe temporel à travers les relations d'entités |
| « Qu'est-ce que l'acheteur média a appris sur les publicités vidéo ? » | Couche 4 (Supermemory) | Requête de mémoire inter-agents |
| « Où est le PDF du guide de style de marque ? » | Couche 5 (Notion/Drive) | Récupération de document depuis la base de connaissances maintenue par l'humain |
| « Contexte de session rapide — sur quoi travaillons-nous ? » | Couche 1 (mémoire auto) | Chargé automatiquement au démarrage de session |
| « Quels concurrents ont récemment changé de stratégie ? » | Couche 3 (Graphe de connaissances) | Requêtes temporelles sur les entités concurrentes |
| « Quelqu'un dans l'équipe a-t-il documenté ce workflow ? » | Couche 5 (Notion/Drive) | Recherche de SOP et de documentation |

---

## Configuration minimale viable

Commencez simple et ajoutez des couches à mesure que les besoins grandissent :

| Étape | Couches | Coût | Capacités |
|---|---|---|---|
| **Démarrage** | Couche 1 uniquement | Gratuit | Profil de marque, suivi de campagne, mémoire de session |
| **Ajout du RAG** | Couche 1 + Couche 2 | Gratuit (palier gratuit Pinecone : 1 index, 100K vecteurs) | + Recherche sémantique sur l'historique de campagne |
| **Apprentissage inter-sessions** | Couche 1 + Couche 2 + Couche 4 | Plan Supermemory | + Enseignements d'agent persistants à travers les sessions |
| **Intelligence complète** | Les 5 couches | Plusieurs abonnements | + Analyse temporelle, documents d'équipe, système de mémoire complet |

**Recommandation :** La plupart des utilisateurs devraient commencer avec les Couches 1 + 2. Ajouter la Couche 4 quand vous voulez que les agents se souviennent des enseignements à travers les sessions. Les Couches 3 et 5 sont pour les utilisateurs avancés gérant des portefeuilles multi-marques complexes ou de grandes équipes.

---

## Opérations de synchronisation

La commande `/digital-marketing-pro:sync-memory` synchronise les données locales avec les couches de mémoire distantes.

**Comment cela fonctionne :**
1. Lit `insights.json` pour la marque active
2. Compare avec `_last_sync.json` pour identifier les entrées nouvelles ou mises à jour depuis la dernière synchronisation
3. Prépare les nouveaux éléments avec des métadonnées (content_type, tags, content_hash)
4. Stocke via des appels MCP vers les couches de mémoire configurées (Couche 2, 3, et/ou 4)
5. Met à jour `_last_sync.json` avec l'horodatage de synchronisation actuel et les hashs d'entrée

**Fichier d'état de synchronisation :** `~/.claude-marketing/brands/{slug}/_last_sync.json`

```json
{
  "last_sync_at": "2026-02-10T09:00:00Z",
  "synced_layers": [2, 4],
  "entries_synced": 47,
  "entry_hashes": ["a1b2c3...", "d4e5f6..."]
}
```

**Rythme recommandé :** Exécuter `/digital-marketing-pro:sync-memory` après chaque revue de campagne majeure, revue d'activité trimestrielle, ou lors du passage d'une marque à une autre après un travail significatif. Fréquence minimale recommandée : hebdomadaire pour les marques actives.

**Résolution de conflit :** La mémoire distante est en ajout uniquement (append-only). Le champ `content_hash` empêche les entrées en double. Si les données locales sont mises à jour (par ex., un enseignement est révisé), la synchronisation crée une nouvelle entrée avec une référence `updated_from` vers le hash original.

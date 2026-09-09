---
name: help
description: "Afficher le guide Digital Marketing Pro avec l'état en direct du plugin — version, agent, compétence, commande, et nombre de connecteurs lus depuis plugin-metadata.py, jamais codés en dur — plus les étapes de démarrage, des exemples et le dépannage. Inclut le mode de routage par intention --intent, qui transforme un objectif énoncé en jusqu'à 3 chaînes de compétences ordonnées se terminant par une porte qualité, et affiche des badges de niveau de profondeur — [E] exécute des scripts, [M] sortie mesurée, [G] guidance structurée — lus depuis skills-index.json. Se déclenche sur « /digital-marketing-pro:help », « what can this plugin do », « which skill should I use for more leads », « list all the commands », « how do I get started ». Se combine avec /digital-marketing-pro:status et /digital-marketing-pro:integrations pour l'état de la marque et des connecteurs."
argument-hint: "[--commands | --skills | --examples | --connectors | --troubleshoot | --brand | --intent \"<goal>\"]"
---

# /digital-marketing-pro:help

Afficher le guide utilisateur de Digital Marketing Pro avec **l'état en direct du
plugin** (version, nombre d'agents/compétences/commandes/scripts, nombre de
connecteurs, environnement d'exécution) extrait du disque — pas codé en dur — plus les
étapes de démarrage, des exemples d'utilisation et le dépannage.

## CRITIQUE : ne jamais coder en dur la version, les décomptes ou les numéros de connecteurs

Les versions et décomptes de ce plugin étaient auparavant intégrés en dur dans le corps
de cette compétence sous forme de chaînes littérales — un numéro de version figé, un
nombre fixe de commandes slash, un nombre fixe d'intégrations. Ceux-ci se sont
désynchronisés de l'installation réelle à chaque version et ont mal représenté le
plugin aux utilisateurs.

**Toujours lire les valeurs en direct depuis `scripts/plugin-metadata.py`. Ne jamais
citer un numéro de version, un nombre de compétences, un nombre d'agents, un nombre de
commandes, ou un nombre de connecteurs de mémoire ou du corps de cette compétence.**

## Comportement

### Étape 1 — Récupérer les métadonnées en direct du plugin

Exécuter **en premier**, à chaque invocation de cette compétence (avec ou sans
argument) :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/plugin-metadata.py" --section all-with-environment
```

Cela renvoie du JSON avec :

- `version` — `{ version, name, required_min_version, ... }`
- `assets` — `{ agents, skills_total, commands, scripts, reference_docs }`
- `connectors` — `{ available_http, available_npx, available_total, active_count, active_names, cowork_compatible_count }`
- `skills` — tableau de `{ skill_dir, slash_command, description }`
- `commands` — tableau de `{ command_file, slash_command, description }`
- `environment` — détection d'exécution (Claude Code local vs bac à sable Cowork, avec
  un avertissement si les écritures sur le système de fichiers n'atteindront pas
  l'hôte de l'utilisateur)

Substituer les valeurs de ce JSON à chaque endroit où la sortie du guide fait référence
à un décompte, une version, ou une liste de commandes slash. Ne **pas** inventer ou
citer de chiffres provenant d'ailleurs.

### Étape 2 — Rendu par défaut (sans argument)

Rendre une orientation claire en utilisant les données en direct. Format suggéré
(remplir chaque `<...>` depuis le JSON) :

```
=== DIGITAL MARKETING PRO ===
Version: <version.version>
Agents: <assets.agents> | Skills: <assets.skills_total> | Commands: <assets.commands> | Scripts: <assets.scripts>
Connectors: <connectors.available_http> HTTP + <connectors.available_npx> npx available
  (<connectors.active_count> currently active in your .mcp.json)
  Cowork-compatible: <connectors.cowork_compatible_count> (HTTP only — npx connectors don't run in Cowork)
Environment: <environment.environment>
<if environment.cowork_warning is non-null, show it as a WARNING block>

Getting Started:
  1. /digital-marketing-pro:brand-setup       — Create your brand profile (start here)
  2. /digital-marketing-pro:import-guidelines  — Import voice guides, restrictions, templates
  3. /digital-marketing-pro:integrations       — See which connectors are active
  4. /digital-marketing-pro:connect <name>     — Set up a new connector
  5. Just ask!                                 — Describe what you need in natural language
```

### Étape 3 — Avertissement Cowork (le cas échéant)

Si `environment.cowork_warning` n'est pas nul, l'afficher bien en évidence après le
bloc d'orientation, en expliquant que les écritures d'état de marque vers
`~/.claude-marketing/` atterrissent à l'intérieur du bac à sable et ne persisteront pas
sur l'hôte de l'utilisateur ; recommander `/digital-marketing-pro:cowork-setup` pour
router l'état via un MCP Drive.

### Étape 4 — Routage des arguments

| Argument | Ce qu'il faut afficher |
|----------|----------------|
| (aucun) | Étapes 2 + 3 + une courte invite « posez simplement votre question » |
| `--commands` | Étapes 2 + 3 + liste de chaque commande depuis le tableau JSON `commands` (son `slash_command` + `description`), regroupées par catégorie si utile |
| `--skills` | Étapes 2 + 3 + liste de chaque compétence depuis le tableau JSON `skills` (son `slash_command` + `description`) |
| `--connectors` | Étapes 2 + 3 + redirection : « Pour le statut des connecteurs actifs/disponibles, exécutez `/digital-marketing-pro:integrations` » |
| `--examples` | Étapes 2 + 3 + les exemples de prompts détaillés (voir ci-dessous) |
| `--troubleshoot` | Étapes 2 + 3 + matrice de dépannage (voir ci-dessous) |
| `--brand` | Étapes 2 + 3 + résumé de la marque actuelle (exécuter `/digital-marketing-pro:status --section brand`) |
| `--intent "<goal>"` | Routage par intention (voir Étape 4.5) — une CHAÎNE de compétences pour l'objectif, pas une liste |

Lors du rendu de la liste des compétences/commandes, **itérer sur les tableaux JSON** —
ne pas coller une liste maintenue à la main, et ne pas énoncer un total de mémoire.
Chaque ligne affiche le champ `slash_command` comme libellé destiné à l'utilisateur et
le champ `description` comme explication.

Lors du rendu de `--skills`, lire AUSSI
`${CLAUDE_PLUGIN_ROOT}/skills-index.json` (généré par
`scripts/build_skills_index.py`, vérifié machine par machine contre le dépôt à chaque
version) et annoter chaque compétence avec son niveau de profondeur : **[E]** exécute
de vrais scripts, **[M]** sortie mesurée à travers la machinerie qualité, **[G]**
guidance structurée. Afficher la légende une seule fois en haut. Le niveau est le
contrat publié de la compétence — ne jamais le deviner, toujours le lire depuis
l'index.

### Étape 4.5 — Routage par intention (`--intent "<goal>"`, ou toute demande en
langage naturel sur « quelle compétence »)

Une liste alphabétique de plus de 150 compétences ne répond à rien. Quand l'utilisateur
énonce un OBJECTIF (« plus de leads depuis l'organique », « lancer un produit »,
« corriger nos dépenses pub »), l'orienter vers une chaîne :

1. Lire `${CLAUDE_PLUGIN_ROOT}/skills-index.json`. Faire correspondre l'objectif à la
   `description` de chaque entrée et suivre `cross_refs` pour trouver les compétences
   qui se transmettent le travail entre elles.
2. Afficher au maximum **3 chaînes candidates**, la meilleure en premier. Une chaîne
   est une séquence ordonnée : compétence d'entrée → les compétences qui reçoivent son
   travail (depuis `cross_refs`) → la porte qui vérifie le résultat. Annoter chaque
   étape avec son badge de niveau et UNE ligne expliquant pourquoi elle est dans la
   chaîne.
3. Chaque chaîne produisant un résultat publiable doit se terminer par une porte
   (`/digital-marketing-pro:check` ou le relecteur pertinent) — ne jamais laisser une
   chaîne en suspens à une étape non contrôlée.
4. Si l'objectif est ambigu, poser UNE question de clarification plutôt que d'afficher
   trois chaînes erronées.
5. Si aucune compétence ne correspond, le dire clairement et pointer vers `--skills` —
   ne jamais inventer un nom de compétence.

Exemple de forme de rendu (les valeurs doivent provenir de l'index, pas de ce fichier) :

```
Goal: "more leads from organic"

Chain 1 (recommended):
  1. [E] /digital-marketing-pro:seo-audit        — find what blocks organic visibility
  2. [G] /digital-marketing-pro:content-strategy — turn gaps into a content plan
  3. [E] /digital-marketing-pro:lead-magnet-ideas — capture the traffic you win
  4. [M] /digital-marketing-pro:check            — gate before anything ships
```

### Étape 5 — Exemples de prompts (`--examples`)

Afficher des exemples de prompts réels à travers les tâches marketing :

```
Getting Started:
  /digital-marketing-pro:brand-setup
  → Create your brand profile interactively (5 quick questions or 17 detailed)

Strategy:
  "Plan a product launch for our new cold brew line"
  → Activates the campaign orchestrator with your brand context

Content:
  "Write a 3-email welcome sequence for new subscribers"
  → Creates emails in your brand voice with compliance rules applied

SEO:
  /digital-marketing-pro:seo-audit https://example.com
  → Full technical + content + E-E-A-T audit with action items

Competitive:
  /digital-marketing-pro:competitor-analysis "Blue Bottle, Counter Culture, Stumptown"
  → Multi-dimensional analysis: content, SEO, ads, social, positioning

Analytics:
  /digital-marketing-pro:performance-report
  → KPI tracking, trend analysis, anomaly detection, recommendations

AI Visibility:
  /digital-marketing-pro:aeo-audit
  → Check how your brand appears in ChatGPT, Perplexity, Google AI Overviews

Full engagement:
  /digital-marketing-pro:engagement start acme-corp 2026-q2
  → Run the full 12-Part strategy methodology end to end
```

### Étape 6 — Dépannage (`--troubleshoot`)

| Problème | Solution |
|-------|----------|
| Message « Aucune marque active » | Exécuter `/digital-marketing-pro:brand-setup` pour créer votre premier profil de marque |
| Fonctionnalités Python indisponibles | Installer : `pip install nltk textstat` (mode allégé) ou le requirements.txt complet |
| Le connecteur MCP ne fonctionne pas | Exécuter `/digital-marketing-pro:integrations` pour vérifier le statut, `/digital-marketing-pro:connect <name>` pour la configuration |
| La voix de marque semble décalée | Exécuter `/digital-marketing-pro:brand-setup --full` pour un profilage détaillé en 17 questions |
| Commandes non reconnues | S'assurer que le plugin est installé : vérifier « Manage Plugin » dans Cowork ou `claude plugin list` |
| Les fichiers ne persistent pas dans Cowork | Exécuter `/digital-marketing-pro:cowork-setup` pour router l'état de marque via un MCP Drive |
| Workflow long interrompu | Exécuter `/digital-marketing-pro:resume` pour reprendre depuis le dernier point de contrôle |

### Étape 7 — Références documentaires

| Guide | Ce qu'il couvre |
|-------|-------|
| `docs/getting-started.md` | Parcours de configuration complet avec exemples |
| `docs/brand-guidelines.md` | Importer des guides de voix, restrictions, templates |
| `docs/integrations-guide.md` | Connecter des outils marketing |
| `docs/multi-brand-guide.md` | Workflows d'agence, changement de marque |
| `docs/strategy-and-kpis.md` | Cadres de KPI, tableaux de bord de reporting |
| `docs/architecture.md` | Plongée technique : modules, agents |
| `docs/claude-interfaces.md` | Capacités spécifiques à Cowork |
| `CONNECTORS.md` | Connecteurs disponibles par catégorie |

## Règles de formatage de la sortie

- Rendre dans des tableaux et blocs de code propres et lisibles. Rester concis — c'est
  une référence rapide, pas un tutoriel.
- **Toujours** citer `version` et les décomptes depuis le JSON, jamais depuis le corps
  de ce fichier.
- Itérer sur les tableaux JSON `skills` / `commands` pour ces listes — jamais une liste
  maintenue à la main.
- Si `scripts/plugin-metadata.py` échoue à s'exécuter (par exemple, Python
  indisponible), se replier sur : « Le script de métadonnées en direct n'a pas pu
  s'exécuter. La version du plugin est dans `.claude-plugin/plugin.json` ; la liste des
  compétences est dans `skills/` ; la liste des commandes est dans `commands/`. » Ne
  pas inventer de chiffres dans le repli non plus.

## Ce que cette compétence évite explicitement

- Citer des numéros de version depuis le corps de ce fichier
- Citer toute chaîne de décompte (nombre d'agents, de compétences, de commandes, de
  connecteurs) depuis le corps de ce fichier
- Lister les commandes slash manuellement — toujours dérivées du JSON
- Références obsolètes à des compétences renommées (toujours utiliser les noms du JSON)

---
name: intelligence-report
description: "Générer un briefing d'intelligence à partir de la base d'intelligence composée de la marque — nombre total d'apprentissages avec distribution de confiance, motifs inter-agents par canal, audience et objectif, playbooks actionnables synthétisés à partir de stratégies éprouvées, apprentissages obsolètes signalés pour revalidation, et un score de maturité de l'intelligence composée sur 0-100. Se déclenche sur \"/digital-marketing-pro:intelligence-report\", \"what have we learned across campaigns\", \"summarize our marketing intelligence\", \"generate a playbook for the product launch\", \"where are our knowledge gaps\". Lit le profil de marque et extrait des statistiques, des motifs et des playbooks depuis intelligence-graph.py ; adapté à la planification trimestrielle, aux revues de stratégie et à l'intégration de nouveaux collaborateurs."
user-invocable: true
triggers:
  - generate marketing intelligence report
  - summarize what we've learned
  - cross-agent marketing patterns
  - marketing intelligence briefing
  - compound learning report
  - review marketing playbooks
  - quarterly marketing intelligence
  - what patterns have we identified
---

# /digital-marketing-pro:intelligence-report

## Objectif

Générer un briefing d'intelligence complet à partir du système d'intelligence composée de la marque. Cette commande fait remonter les connaissances accumulées par les agents au fil du temps — nombre total d'apprentissages capturés, distribution de confiance parmi les insights, principaux motifs identifiés à travers les agents et les canaux, playbooks actionnables générés à partir de stratégies éprouvées, et indicateurs de santé de la base d'intelligence montrant où la connaissance est solide et où subsistent des lacunes. Le rapport d'intelligence transforme des données brutes accumulées en avantage stratégique en synthétisant des motifs inter-agents qu'aucun agent seul ne ferait ressortir. Utilisez-le pour la planification trimestrielle, les revues de stratégie, l'intégration de nouveaux membres d'équipe à l'intelligence marketing d'une marque, ou l'identification des domaines nécessitant davantage d'expérimentation et de collecte de données pour renforcer la confiance décisionnelle.

## Entrée requise

L'utilisateur doit fournir (ou se verra demander) :

- **Domaine d'intérêt (facultatif)** : un canal spécifique (email, paid search, social), un segment d'audience, un objectif de campagne (notoriété, conversion, rétention), ou un thème stratégique à approfondir. Si fourni, le rapport priorise les motifs, playbooks et recommandations pour ce domaine tout en incluant néanmoins la vue d'ensemble complète de la base d'intelligence. Si omis, le rapport couvre toutes les dimensions de façon équilibrée
- **Demande de playbook (facultatif)** : un scénario spécifique pour lequel générer un playbook actionnable — par exemple « lancement de produit T2 sur le social payant », « campagne de réengagement pour les abonnés désabonnés », ou « poussée de notoriété de marque sur un nouveau marché ». Le système d'intelligence synthétise les apprentissages pertinents en un playbook étape par étape ancré dans des motifs éprouvés issus des données de cette marque

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer le positionnement de marque, le mix de canaux, l'historique des campagnes et les objectifs stratégiques. Vérifier également la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Obtenir les statistiques d'intelligence** : lancer `python "${CLAUDE_PLUGIN_ROOT}/scripts/intelligence-graph.py" --brand {slug} --action get-stats` pour récupérer la vue d'ensemble de la base d'intelligence — nombre total d'apprentissages capturés, apprentissages par agent et par canal, distribution des scores de confiance (élevée, modérée, faible), plage de dates de l'intelligence, et horodatage du dernier apprentissage.
3. **Obtenir les motifs inter-agents** : lancer `python "${CLAUDE_PLUGIN_ROOT}/scripts/intelligence-graph.py" --brand {slug} --action get-patterns --dimension channel` (répéter avec `--dimension audience` et `--dimension objective`) pour les dimensions clés — motifs de performance par canal, motifs de réponse d'audience, motifs de timing et de saisonnalité, motifs créatifs et de messages, et motifs d'efficacité budgétaire. Si un domaine d'intérêt a été précisé, pondérer la récupération des motifs vers cette dimension. Identifier les motifs qui traversent plusieurs agents (par exemple un motif de timing confirmé à la fois par le spécialiste email et le responsable des réseaux sociaux).
4. **Générer les playbooks** : si une demande de playbook a été formulée, lancer `python "${CLAUDE_PLUGIN_ROOT}/scripts/intelligence-graph.py" --brand {slug} --action export-playbook --channel {channel} --min-confidence 0.6` pour synthétiser les apprentissages à plus haute confiance pour ce canal en un playbook actionnable étape par étape. (Il n'existe pas de filtre `--scenario` en texte libre — interpréter le scénario demandé pour choisir le `--channel`, puis construire le récit autour des apprentissages retournés.) Chaque étape du playbook référence les apprentissages spécifiques et les niveaux de confiance qui la justifient. Si aucun playbook n'a été demandé, générer un résumé des trois meilleurs playbooks disponibles en fonction des groupes de motifs les plus solides.
5. **Identifier les apprentissages obsolètes** : signaler les apprentissages qui n'ont pas été revalidés dans leur fenêtre de revalidation recommandée — généralement 90 jours pour les insights tactiques, 180 jours pour les motifs stratégiques. Les apprentissages obsolètes peuvent rester exacts mais leur confiance doit être décotée. Prioriser les recommandations de revalidation par impact — les apprentissages obsolètes à fort impact sont signalés en premier.
6. **Calculer le score d'intelligence composée** : calculer un score global de maturité de l'intelligence basé sur le volume total d'apprentissages, le niveau de confiance moyen, la densité des motifs inter-agents, la fraîcheur de l'intelligence, la couverture des canaux et des audiences, et le ratio d'apprentissages validés versus non validés. Score sur une échelle de 0 à 100 avec des libellés de niveau — Émergent (0-25), En développement (26-50), Établi (51-75), Avancé (76-100).

## Sortie

Un briefing d'intelligence structuré contenant :

- **Santé de la base d'intelligence** : total des apprentissages capturés, ventilation par agent et par canal, score de confiance moyen, distribution de confiance (pourcentage élevé, modéré, faible), plage de dates de la couverture d'intelligence, horodatages du plus récent et du plus ancien apprentissage, et lacunes de couverture là où les canaux ou audiences manquent de données
- **Principaux motifs par canal, audience et objectif** : les motifs inter-agents à plus haute confiance organisés par dimension — ce qui fonctionne systématiquement sur chaque canal, quelles audiences répondent à quelles approches, et quels objectifs disposent de playbooks éprouvés versus ceux nécessitant davantage d'expérimentation
- **Playbooks actionnables** : playbooks étape par étape pour le scénario demandé ou les trois meilleurs playbooks disponibles — chaque étape ancrée dans des apprentissages spécifiques avec niveaux de confiance, résultats attendus basés sur des motifs historiques, et facteurs de risque à surveiller
- **Apprentissages obsolètes nécessitant une revalidation** : apprentissages ayant dépassé leur fenêtre de revalidation classés par impact — avec méthodes de revalidation recommandées (relancer le test, vérifier les analytics les plus récents, mettre à jour avec les données de nouvelles campagnes) et effort estimé pour chacun
- **Score d'intelligence composée** : le score de maturité 0-100 avec libellé de niveau, ventilation par composante de score, tendance par rapport à l'évaluation précédente, et actions spécifiques pour améliorer le score — par exemple « Lancer des tests de lignes d'objet email pour combler la lacune d'optimisation email » ou « Valider les motifs de timing social du T3 avec les données actuelles »
- **Recommandations pour renforcer la base d'intelligence** : liste priorisée d'expériences, d'analyses et d'activités de collecte de données qui amélioreraient le plus la couverture, la confiance et l'actionnabilité de l'intelligence — les investissements à plus fort ROI en connaissance marketing

## Agents utilisés

- **intelligence-curator** — Synthèse des motifs inter-agents et identification des insights confirmés par plusieurs sources, génération de playbooks à partir de groupes de motifs éprouvés avec séquençage d'étapes pondéré par la confiance, évaluation de la santé de la base d'intelligence avec analyse des lacunes de couverture, identification des apprentissages obsolètes et priorisation de la revalidation, calcul du score d'intelligence composée avec ventilation par composante, et recommandations stratégiques pour l'amélioration de la base d'intelligence

---
name: client-report
description: "Générer un rapport client à marque blanche dans la voix de l'agence — pulse hebdomadaire, revue mensuelle ou QBR — avec un tableau de bord KPI vs objectifs et période de comparaison, des répartitions par canal, les principales réussites avec attribution, une analyse des causes profondes des objectifs manqués, 3 à 5 recommandations stratégiques et l'efficacité budgétaire. Nécessite une approbation explicite avant tout envoi externe ; ce n'est qu'ensuite qu'il peut être livré via les MCP Slack, e-mail ou Google Sheets connectés, avec journalisation de l'envoi. Se déclenche sur \"/digital-marketing-pro:client-report\", \"prépare le rapport mensuel pour le client\", \"construis le QBR pour ce compte\", \"envoie le pulse de performance hebdomadaire\", \"rapport de performance en marque blanche\". Lit le profil de marque et récupère les données via campaign-tracker.py, execution-tracker.py et les MCP de plateformes connectées ; formate via report-generator.py."
---

# /digital-marketing-pro:client-report

## Objectif

Générer un rapport client professionnel, en marque blanche, pour une marque spécifique. Utilise la voix de l'agence (et non la voix de la marque), inclut la performance des KPI, les répartitions par canal, des recommandations stratégiques et les prochaines étapes. Conçu pour une livraison client externe via Slack, e-mail, Google Sheets ou markdown — avec un verrou d'approbation avant tout envoi externe afin d'éviter toute divulgation accidentelle ou livraison prématurée de résultats provisoires.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Slug de la marque** : La marque couverte par ce rapport — doit correspondre à une marque configurée dans `~/.claude-marketing/brands/`
- **Type de rapport** : L'un des suivants :
  - Pulse hebdomadaire : Instantané rapide des KPI avec 3 à 5 indicateurs clés et un bref commentaire
  - Revue mensuelle : Analyse complète de la performance avec répartitions par canal et recommandations
  - QBR : Analyse trimestrielle approfondie avec feuille de route stratégique et plan à venir
- **Plage de dates** : Dates de début et de fin spécifiques pour la période de reporting — définit les données récupérées et analysées
- **Canal de livraison** : Où le rapport doit être envoyé — slack, email, google-sheets, ou markdown-only (aucune livraison externe, uniquement génération de l'artefact)
- **Sections personnalisées (optionnel)** : Toute section supplémentaire demandée par le client — mise à jour concurrentielle, répartition de la performance créative, insights sur l'audience, analyse approfondie de l'attribution, ou sujet d'investigation ad hoc
- **Période de comparaison** : Contre quoi comparer — période précédente, même période l'année dernière, plan/objectif, ou les trois simultanément
- **Liste des destinataires (optionnel)** : Contacts client spécifiques qui doivent recevoir le rapport en cas de livraison par e-mail ou Slack — noms et identifiants/adresses
- **Emphase narrative (optionnel)** : Ce à quoi le client tient le plus pendant cette période — croissance, efficacité, notoriété de marque, génération de pipeline, ou revenu — influence les métriques mises en avant en premier et la manière dont les insights sont formulés
- **Inclure une annexe** : Indique si des tableaux de données brutes et le détail au niveau campagne doivent être joints en annexe — par défaut oui pour les revues mensuelles et QBR, non pour le pulse hebdomadaire
- **Paramètres de marque blanche (optionnel)** : Placement du logo de l'agence, palette de couleurs et texte de mentions légales — récupérés depuis le profil de l'agence s'il est configuré, sinon des valeurs par défaut sobres sont utilisées

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) et le contexte sectoriel. Vérifier également l'existence de directives dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Récupérer toutes les métriques de la marque** : Interroger les serveurs MCP connectés et exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` (puis `--action get-campaign --id {id}` par campagne) pour rassembler les données de performance sur tous les canaux actifs ; filtrer sur la plage de dates spécifiée pendant l'analyse
3. **Rassembler l'historique des campagnes et le journal d'exécution** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history` pour compiler tous les livrables réalisés, les campagnes lancées, les optimisations effectuées et les tests conclus, puis filtrer sur la période de reporting pendant l'analyse
4. **Calculer les KPI par rapport aux objectifs et à la période de comparaison** : Calculer les résultats réels par rapport aux objectifs de KPI déclarés de la marque dans `profile.json` et par rapport à la période de comparaison sélectionnée — calculer les écarts, les variations en pourcentage, la direction de la tendance et la significativité statistique lorsque la taille des échantillons le permet
5. **Décomposer la performance par canal** : Segmenter les métriques par canal (recherche payante, social payant, recherche organique, e-mail, display, vidéo, affiliation, etc.) avec les KPI par canal, les dépenses, les métriques d'efficacité (CPC, CPA, ROAS, CTR) et le pourcentage de contribution aux objectifs globaux
6. **Identifier les principales réussites et leur attribution** : Sélectionner les 3 à 5 campagnes ou initiatives les plus performantes de la période — documenter ce qui a été fait, ce qui a généré le résultat, les insights sur l'audience et la créa, et le lien avec les résultats business
7. **Analyser les sous-performances avec causes profondes** : Pour tout KPI n'ayant pas atteint son objectif, identifier les causes profondes :
   - Facteurs externes : évolutions du marché, saisonnalité, mouvements concurrentiels, changements d'algorithme des plateformes
   - Facteurs internes : contraintes budgétaires, lassitude créative, saturation d'audience, désalignement de timing
   - Actions correctives : ce qui a déjà été fait et ce qui est recommandé pour la prochaine période
8. **Générer des recommandations stratégiques** : Sur la base des données de performance, formuler 3 à 5 recommandations actionnables — quoi accentuer, quoi mettre en pause, quoi tester ensuite, où le budget doit être réalloué, et quelles nouvelles opportunités explorer
9. **Rédiger le rapport dans la voix de l'agence** : Rédiger le rapport complet en utilisant une voix d'agence professionnelle, à la troisième personne — PAS la personnalité de la marque. Se concentrer sur la clarté, des insights étayés par les données, des prochaines étapes actionnables, et un ton confiant mais honnête qui renforce la confiance du client
10. **Formater pour le canal de livraison** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/report-generator.py" --brand {slug} --action format-slack` (ou `format-email` / `format-sheets`), en passant le rapport JSON via `--data '{report_json}'` ; pour un artefact markdown propre, utiliser `--action generate-report --data '{report_json}'`
11. **Créer un point de contrôle d'approbation** : Présenter l'aperçu complet du rapport pour révision. Niveau de risque : faible. Exiger une approbation explicite avant toute livraison externe — mettre en évidence toute donnée sensible, tout résultat inattendu ou toute conclusion négative qui pourrait nécessiter un pré-briefing avec le client
12. **Livrer via MCP si approuvé** : Après approbation, envoyer via l'intégration MCP appropriée (MCP Slack, MCP e-mail, MCP Google Sheets) si un canal de livraison a été spécifié. Gérer les erreurs de livraison avec élégance et fournir des conseils de reprise
13. **Journaliser la livraison et archiver** : Enregistrer la livraison du rapport dans le journal d'exécution avec horodatage, destinataires, statut de confirmation de livraison, version du rapport et une référence vers le rapport archivé pour comparaison future

## Résultat

Un rapport client structuré contenant :

- **Résumé exécutif** : Aperçu de 3 à 5 phrases de la période — résultat principal, réussites clés, points d'attention, perspectives pour la prochaine période et une action recommandée pour le client
- **Tableau de bord KPI** : Résultats réels vs objectifs vs période de comparaison dans un tableau lisible en un coup d'œil avec des indicateurs de statut codés par couleur (dépassé, en bonne voie, à risque, manqué) et des flèches de tendance montrant l'élan directionnel
- **Répartition de la performance par canal** : Métriques par canal avec dépenses, résultats, métriques d'efficacité (CPC, CPA, ROAS, CTR), pourcentage de contribution aux objectifs globaux et évaluation de la santé du canal
- **Faits marquants des campagnes avec attribution** : Campagnes les plus performantes avec ce qui a conduit au succès, insights créatifs et sur l'audience, impact mesuré, et recommandations de reproduction pour les futures campagnes
- **Analyse des sous-performances** : Évaluation honnête de tout écart avec catégorisation des causes profondes (externes vs internes), quantification de l'impact, actions correctives prises, et mesures préventives pour la prochaine période
- **Recommandations stratégiques (3-5)** : Prochaines étapes étayées par les données avec impact attendu, investissement requis, calendrier de mise en œuvre, classement par priorité et lien avec les objectifs business déclarés du client
- **Analyse de l'efficacité budgétaire** : Résumé dépenses vs retour par canal, courbes de tendance des coûts sur la période, taux d'utilisation du budget et comparaison d'efficacité aux périodes précédentes avec indicateurs d'amélioration/déclin
- **Livrables et calendrier à venir** : Ce que l'agence livrera la prochaine période avec dates, jalons, dépendances et toute action requise du client pour maintenir le plan sur la bonne voie
- **Annexe (si demandée)** : Tableaux de données brutes, répartitions au niveau campagne, exports complets de métriques, données de performance créative et calculs justificatifs pour une revue détaillée
- **Confirmation de livraison** : Canal, horodatage, destinataires, statut de livraison et version du rapport — ou artefact markdown si aucune livraison externe n'a été demandée

## Agents utilisés

- **agency-operations** — Voix et ton du rapport (professionnel d'agence, pas la personnalité de la marque), conscience du contexte client, gestion du workflow d'approbation, formatage en marque blanche, et coordination de la livraison
- **analytics-analyst** — Analyse des métriques, calculs de KPI, répartitions par canal, analyse de tendances, calculs de comparaison, modélisation d'attribution, vérifications de significativité statistique, et support de données pour les recommandations
- **execution-coordinator** — Formatage du rapport pour les canaux de livraison, livraison via intégration MCP, journalisation d'exécution, gestion des erreurs de livraison, et archivage

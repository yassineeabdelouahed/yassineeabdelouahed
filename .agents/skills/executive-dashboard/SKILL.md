---
name: executive-dashboard
description: "Concevez un tableau de bord marketing exécutif sous forme de spécification prête à construire — 5 à 7 métriques nord-étoile avec justification, hiérarchie des métriques, choix de graphiques, seuils d'alerte, mapping des sources de données, mise en page en wireframe, structure de drill-down, et une variante mobile. Conçoit le tableau de bord ; ne le construit ni ne le connecte en direct. Se déclenche sur « /digital-marketing-pro:executive-dashboard », « conçois un tableau de bord CMO », « quelles métriques le conseil d'administration devrait-il voir », « notre rapport exécutif est trop bruyant », « crée une vue de reporting pour la direction ». Lit le profil de marque et les guidelines ; se combine avec /digital-marketing-pro:exec-summary pour le récit écrit compagnon."
---

# /digital-marketing-pro:executive-dashboard

## Objectif

Concevoir un tableau de bord marketing pour le comité de direction qui traduit les métriques marketing en résultats business pour la prise de décision exécutive. Comble l'écart entre les données d'activité marketing et l'impact business, donnant aux dirigeants seniors la clarté nécessaire pour prendre des décisions stratégiques plus rapides et mieux informées sans se noyer dans le détail opérationnel.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Rôle exécutif** : audience principale — CEO, CMO, CFO, VP Marketing, ou conseil d'administration — chacun nécessite un accent différent sur les métriques et un niveau d'abstraction différent
- **Modèle économique et leviers de chiffre d'affaires** : comment l'entreprise gagne de l'argent — SaaS, e-commerce, génération de leads, marketplace, abonnement — et les leviers de chiffre d'affaires clés que le marketing influence
- **Priorités stratégiques ce trimestre** : les 2 à 4 priorités business sur lesquelles l'équipe de direction se concentre et auxquelles le marketing doit contribuer
- **Fréquence de reporting** : à quelle fréquence le tableau de bord sera revu — standup exécutif hebdomadaire, réunion mensuelle de direction, revue trimestrielle du conseil d'administration
- **Sources de données et outils actuels** : plateformes analytics, CRM, plateformes publicitaires, outils d'attribution, et systèmes BI actuellement utilisés avec des notes de fraîcheur et de fiabilité des données
- **Rapports existants à remplacer** : artefacts de reporting actuels que le tableau de bord va consolider ou remplacer — aide à identifier les lacunes et les redondances
- **Décisions clés que le tableau de bord doit éclairer** : décisions précises que les dirigeants prennent et que ce tableau de bord doit soutenir — allocation budgétaire, mix de canaux, recrutement, montée en puissance de campagne, expansion de marché
- **Niveau de maîtrise des données des parties prenantes** : à quel point l'audience est à l'aise avec les métriques marketing — détermine le libellé, le contexte, et la densité narrative nécessaires

## Processus

1. **Charger le contexte de la marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou procéder avec les valeurs par défaut.
2. **Identifier les métriques nord-étoile** : sélectionner 5 à 7 métriques reliant directement l'activité marketing aux résultats business — chiffre d'affaires influencé, pipeline généré, coût d'acquisition client, valeur vie client, part de marché, indicateurs de capital de marque
3. **Concevoir la hiérarchie des métriques** : organiser les métriques en trois niveaux — indicateurs avancés (prédisent la performance future), indicateurs retardés (confirment les résultats passés), et métriques de santé (signalent la stabilité et la durabilité du système)
4. **Sélectionner le type de visualisation par métrique** : choisir le type de graphique optimal pour chaque métrique selon la forme des données et le contexte de décision — courbes de tendance pour la trajectoire, jauges pour les objectifs, graphiques à barres pour les comparaisons, sparklines pour la densité
5. **Définir les seuils d'alerte et déclencheurs d'anomalie** : fixer des seuils vert/jaune/rouge pour chaque métrique avec des valeurs de déclenchement précises, et configurer des règles de détection d'anomalie pour les pics ou baisses inattendus
6. **Cartographier les sources de données pour chaque métrique** : documenter quel système fournit chaque métrique, comment elle est calculée, la fraîcheur des données (temps réel, quotidien, hebdomadaire), et les limites ou délais connus
7. **Concevoir la mise en page pour la vitesse de balayage** : structurer le tableau de bord pour un balayage en motif F ou Z — métriques les plus critiques en haut à gauche, résumé avant le détail, hiérarchie visuelle cohérente, charge cognitive minimale
8. **Ajouter des consignes narratives** : rédiger des instructions « comment lire ceci » pour chaque section — à quoi ressemble le bon, à quoi ressemble le mauvais, et quelle action entreprendre dans chaque scénario
9. **Construire la structure de drill-down** : concevoir trois niveaux de profondeur — vue résumée (le tableau de bord lui-même), vue détaillée (répartitions par campagne ou canal), et vue de cause racine (données diagnostiques pour investiguer les anomalies)
10. **Créer une variante adaptée au mobile** : adapter la mise en page du tableau de bord pour un affichage mobile ou tablette — prioriser les 3 à 5 principales métriques, empiler verticalement, agrandir les zones tactiles, et simplifier les visualisations
11. **Ajouter des références de comparaison** : définir à quoi chaque métrique est comparée — plan/objectif, période précédente (MoM, QoQ, YoY), benchmark sectoriel, et estimation concurrentielle — avec le format d'affichage de la comparaison

## Sortie

Une conception de tableau de bord exécutif structurée contenant :

- **Métriques nord-étoile (5-7)** : métriques sélectionnées avec une justification business expliquant pourquoi chacune compte pour l'audience exécutive et comment elle se rattache aux priorités stratégiques
- **Diagramme de hiérarchie des métriques** : cadre visuel montrant les métriques avancées, retardées, et de santé avec les relations causales et l'influence directionnelle entre elles
- **Recommandations de visualisation** : type de graphique, échelle, codage couleur, et style d'annotation pour chaque métrique avec la justification du choix de conception
- **Définitions des seuils d'alerte** : limites vert/jaune/rouge pour chaque métrique avec des valeurs de déclenchement précises, des règles de détection d'anomalie, et le routage de notification
- **Mapping des sources de données** : documentation métrique par métrique du système source, de la méthode de calcul, de la fréquence de rafraîchissement, de la latence des données, et des problèmes de qualité connus
- **Mise en page en wireframe du tableau de bord** : disposition spatiale montrant le placement des métriques, le regroupement par section, la hiérarchie visuelle, et le flux de balayage optimisé pour l'audience cible
- **Guide narratif** : guide de présentation section par section expliquant comment lire chaque zone, quelles questions elle répond, et quelles actions envisager selon les données affichées
- **Structure de drill-down** : conception à trois niveaux de profondeur — résumé (tableau de bord), détail (répartition canal/campagne), et cause racine (investigation diagnostique) avec le flux de navigation
- **Variante de mise en page mobile** : conception adaptée pour l'affichage mobile avec métriques priorisées, empilement vertical, graphiques simplifiés, et interactions optimisées pour le tactile
- **Définitions des références de comparaison** : pour chaque métrique, le standard de comparaison (objectif, période précédente, benchmark, concurrentiel) avec le format d'affichage et les notes de contexte
- **Cadence de rafraîchissement et notes de latence des données** : documentation de la fréquence de mise à jour de chaque métrique, du délai de données attendu, et des implications pour le timing de décision
- **Modèle de synthèse exécutive** : un modèle narratif écrit en 3 phrases synthétisant les constats du tableau de bord en un briefing oral — ce qui s'est passé, pourquoi c'est important, quoi faire ensuite
- **Glossaire de termes** : définitions en langage clair de toutes les métriques et de la terminologie marketing pour les parties prenantes non marketing, avec exemples et contexte

## Agents utilisés

- **analytics-analyst** — sélection des métriques, conception de la hiérarchie, recommandations de visualisation, mapping des sources de données, seuils d'alerte, architecture de drill-down, cadence de rafraîchissement, et optimisation de la mise en page du tableau de bord

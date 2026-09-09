---
name: ab-test-plan
description: "Concevoir un plan de test A/B ou multivarié statistiquement rigoureux — hypothèse Si/Alors/Parce que, spécifications du contrôle et des variantes, taille d'échantillon requise par variante (MDE absolu vs relatif via sample-size-calculator.py), durée du test, métriques de garde-fou, règles d'arrêt et critères de décision go/no-go. Se déclenche sur \"/digital-marketing-pro:ab-test-plan\", \"set up an A/B test\", \"how long should my test run\", \"calculate sample size for an experiment\", \"is this test result significant\". Lit le profil de marque et les résultats passés du campaign-tracker pour éviter de retester des hypothèses déjà validées ; les tests terminés sont évalués avec significance-tester.py par l'agent cro-specialist."
argument-hint: "[element-to-test]"
---

# /digital-marketing-pro:ab-test-plan

## Objectif

Planification dédiée de tests A/B avec un cadre d'hypothèse structuré, un calcul statistique de la taille d'échantillon, une conception des variantes et un plan de suivi. Produit une spécification d'expérience complète avec rigueur statistique et des critères de décision clairs.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Élément à tester** : la page, le composant ou l'expérience spécifique testée (titre de landing page, bouton CTA, mise en page de la page tarifaire, objet d'e-mail, tunnel de paiement, conception de formulaire, etc.)
- **Taux de conversion actuel** : taux de conversion de référence pour la métrique testée (ou meilleure estimation)
- **Effet minimal détectable (MDE) souhaité** : la plus petite amélioration qu'il vaut la peine de détecter. **Le MDE est ABSOLU par défaut** — exprimé dans la même unité que la référence (référence de 5,0 % et vous voulez détecter une hausse de +1,0 point de pourcentage, soit 5,0 % → 6,0 % ⇒ `--mde 0.01 --mde-type absolute`). Pour l'exprimer plutôt en **hausse relative** (une amélioration relative de 10 % sur une référence de 5 % = 5,5 % ⇒ `--mde 0.10 --mde-type relative`), passez `--mde-type relative`. Cette distinction est l'erreur la plus fréquente en matière de taille d'échantillon : les mêmes « 10 % » interprétés en absolu vs en relatif changent la taille d'échantillon requise d'environ deux ordres de grandeur (~200×) sur une référence de 5 %. Confirmez toujours ce que l'utilisateur entend par là.
- **Trafic ou impressions quotidiens** : visiteurs ou impressions moyens par jour sur la page ou l'élément testé
- **Niveau de significativité** : niveau de confiance souhaité, 95 % par défaut (alpha = 0,05)
- **Puissance statistique** : puissance souhaitée, 80 % par défaut (bêta = 0,20)
- **Nombre de variantes** : combien de variantes tester (par défaut 1 traitement + 1 contrôle ; davantage pour un test multivarié)
- **Contexte métier** : ce qui a motivé l'idée du test (données analytiques, retours utilisateurs, analyse concurrentielle, audit heuristique, demande d'une partie prenante)

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix, la conformité, le contexte sectoriel. Vérifier `guidelines/_manifest.json` pour les restrictions, les messages, les styles par canal, les règles de ton et les modèles. Si un modèle correspondant à cette commande existe dans `~/.claude-marketing/brands/{slug}/templates/`, appliquer son format. Si aucune marque n'existe, proposer `/digital-marketing-pro:brand-setup` ou continuer avec les valeurs par défaut.
2. **Vérifier l'historique des campagnes** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` pour examiner les résultats de tests passés et éviter de retester des hypothèses déjà validées.
3. **Exécuter le calculateur de taille d'échantillon** : lancer le calculateur avec le taux de référence, le MDE, le type de MDE, la significativité et la puissance. Le flag `--mde-type` vaut `absolute` par défaut — confirmez toujours avec l'utilisateur laquelle des deux interprétations est visée avant de calculer (les deux diffèrent d'environ deux ordres de grandeur, ~200×, sur une référence de 5 %) :
   ```bash
   # MDE absolu — détecter une hausse de 1,0 point de pourcentage sur une référence de 5 % (5,0 % → 6,0 %)
   python "${CLAUDE_PLUGIN_ROOT}/scripts/sample-size-calculator.py" --baseline-rate 0.05 --mde 0.01 --mde-type absolute --significance 0.95 --power 0.80

   # MDE relatif — détecter une hausse relative de 10 % sur une référence de 5 % (5,0 % → 5,5 %)
   python "${CLAUDE_PLUGIN_ROOT}/scripts/sample-size-calculator.py" --baseline-rate 0.05 --mde 0.10 --mde-type relative --significance 0.95 --power 0.80
   ```
   Cela détermine la taille d'échantillon requise par variante. Plus tard, une fois le test lancé, évaluer le résultat avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/significance-tester.py" --control-visitors {n} --control-conversions {n} --variant-visitors {n} --variant-conversions {n} --confidence 0.95`.
4. **Construire l'énoncé de l'hypothèse** : structurer l'hypothèse au format : « Si [changement spécifique], alors [métrique principale] va [direction et ampleur] parce que [justification ancrée dans des données, une recherche utilisateur ou un principe UX établi]. »
5. **Concevoir les variantes du test** : définir le contrôle (expérience actuelle) et une ou plusieurs variantes de traitement. Préciser exactement ce qui change dans chaque variante — texte, mise en page, couleur, imagerie, parcours ou fonctionnalité. Pour les tests multivariés, définir la matrice de variables et les effets d'interaction à surveiller.
6. **Définir les métriques primaire et secondaires** : identifier la métrique de succès principale (celle qui détermine le gagnant) et les métriques secondaires à surveiller pour détecter des effets non voulus (par exemple, tester le taux de clic sur le CTA comme métrique primaire, tout en surveillant le taux de rebond, le temps passé sur la page et la conversion en aval comme garde-fous secondaires).
7. **Calculer la durée du test** : à partir des besoins en taille d'échantillon et du trafic quotidien, estimer le nombre de jours nécessaires. S'assurer que la durée couvre au moins un cycle métier complet (7 jours minimum) pour tenir compte des variations selon le jour de la semaine. Signaler si la durée dépasse 8 semaines (risque de validité).
8. **Créer un plan de suivi** : définir des points de contrôle intermédiaires pour l'assurance qualité technique (pas pour un « peeking » statistique), la détection d'un déséquilibre de répartition de l'échantillon (SRM) et des alertes sur les métriques de garde-fou qui déclencheraient un arrêt anticipé du test pour des raisons de qualité de données ou d'expérience utilisateur.
9. **Définir les règles d'arrêt et les critères de décision** : préciser quand clore le test (taille d'échantillon atteinte + seuil de significativité atteint), quand l'arrêter prématurément (violations de garde-fou, SRM détecté, bugs d'implémentation) et le protocole en cas de résultats non concluants (prolonger, reconcevoir ou implémenter selon le signal directionnel).
10. **Évaluer la faisabilité en termes de trafic** : vérifier que le trafic quotidien permet d'atteindre la taille d'échantillon requise dans un délai raisonnable (moins de 8 semaines). Si le trafic est insuffisant, recommander de réduire le nombre de variantes, d'augmenter le MDE, ou d'utiliser des méthodes qualitatives à la place.
11. **Documenter le pré-enregistrement** : consigner le plan de test avant le lancement — hypothèse, métriques, taille d'échantillon, durée et critères de décision — pour éviter la rationalisation a posteriori et garantir la rigueur scientifique.

## Résultat

Un plan de test A/B structuré contenant :

- L'énoncé de l'hypothèse au format Si/Alors/Parce que, avec preuves ou justification à l'appui
- Les descriptions du contrôle et des variantes, avec des détails de changement spécifiques et implémentables
- La taille d'échantillon requise par variante et la taille totale d'échantillon
- La durée estimée du test en jours, selon le volume de trafic et la taille d'échantillon requise
- Les définitions de la métrique primaire et des métriques secondaires, avec leurs méthodes de mesure
- Les métriques de garde-fou qui déclenchent un arrêt anticipé en cas de dégradation
- La spécification du tableau de bord de suivi, avec le calendrier des points de contrôle intermédiaires
- Le plan d'analyse statistique (fréquentiste ou bayésien, unilatéral ou bilatéral, correction pour comparaisons multiples)
- Les règles d'arrêt anticipé (violations de garde-fou, détection de SRM, bugs critiques)
- Les critères de décision go/no-go avec des seuils clairs pour déclarer un gagnant
- Le plan d'action post-test pour les scénarios de victoire, de défaite et de résultat non concluant
- L'évaluation de la faisabilité en termes de trafic, avec des recommandations alternatives en cas de trafic faible
- Un modèle de documentation de test pour consigner les résultats et enseignements dans le campaign tracker

## Agents utilisés

- **cro-specialist** — Conception de l'hypothèse, spécification des variantes, calcul de la taille d'échantillon, plan d'analyse statistique, cadre de suivi, règles d'arrêt et évaluation de la faisabilité en termes de trafic, documentation de l'expérience

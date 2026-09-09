---
name: roi-calculator
description: "Calculer le ROI de campagne à partir des données de dépenses, de conversion et de revenu — ROI/ROAS/CPA/CPL par canal, totaux consolidés, comparaison de cinq modèles d'attribution (dernier clic, premier clic, linéaire, dégressif dans le temps, basé sur la position), périodes de retour sur investissement en fonction de la LTV, notation par rapport aux benchmarks sectoriels, et 2-3 scénarios modélisés de réallocation budgétaire, le tout emballé dans un rapport prêt pour la direction. Se déclenche sur \"/digital-marketing-pro:roi-calculator\", \"what's the ROI on this campaign\", \"compare ROAS across channels\", \"is our CAC sustainable against LTV\", \"where should we shift budget\". Exécute roi-calculator.py, lit les benchmarks sectoriels pour le secteur de la marque, et journalise les résultats dans le suivi de campagne pour la comparaison de tendance d'une période à l'autre."
argument-hint: "[campaign-name]"
---

# /digital-marketing-pro:roi-calculator

## Objectif

Calculateur de ROI de campagne avec modèles d'attribution multi-touch. Produit une analyse de ROI complète sur les canaux pour la justification budgétaire, les recommandations d'optimisation, et le reporting à la direction.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Dépenses de campagne par canal** : Montants investis par canal (recherche payante, social payant, email, SEO, contenu, événements, etc.)
- **Conversions et revenu par canal** : Nombre de conversions et revenu total attribué à chaque canal
- **Période** : La plage de dates pour l'analyse (semaine, mois, trimestre, année)
- **Préférence de modèle d'attribution** : Dernier clic, premier clic, linéaire, dégressif dans le temps, ou basé sur la position (ou comparer tous les modèles)
- **LTV client** : Optionnel -- valeur vie client moyenne pour une projection de ROI à long terme
- **Secteur d'activité** : Pour le contexte de comparaison aux benchmarks
- **Définitions de conversion** : Ce qui compte comme une conversion (achat, lead, inscription, demande de démo, début d'essai, etc.)
- **Coûts au-delà de la dépense publicitaire** : Optionnel -- frais d'agence, coûts d'outils, coûts de production créative, temps d'équipe

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix, la conformité, le contexte sectoriel. Vérifier `guidelines/_manifest.json` pour les restrictions, les messages clés, les styles par canal, les règles de voix et de ton, et les modèles. Si un modèle correspondant à cette commande existe dans `~/.claude-marketing/brands/{slug}/templates/`, appliquer son format. Si aucune marque n'existe, inviter à `/digital-marketing-pro:brand-setup` ou continuer avec les valeurs par défaut.
2. **Vérifier l'historique des campagnes** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` pour récupérer les données de campagnes historiques pour la comparaison de tendance et l'analyse d'une période à l'autre.
3. **Exécuter le calculateur de ROI** : Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/roi-calculator.py"` avec les données de dépenses, de revenu, et de conversion pour calculer les métriques par canal et consolidées.
4. **Calculer le ROI et le ROAS par canal** : Pour chaque canal, calculer le ROI ((revenu - coût) / coût), le ROAS (revenu / coût), le CPA (coût / conversions), le CPL (coût / leads), et le pourcentage de marge de contribution.
5. **Appliquer le modèle d'attribution** : Redistribuer le crédit entre les canaux en utilisant le modèle d'attribution sélectionné. Si l'utilisateur souhaite une comparaison, exécuter les cinq modèles (dernier clic, premier clic, linéaire, dégressif dans le temps, basé sur la position) et montrer comment chaque modèle déplace le crédit entre les canaux.
6. **Calculer le ROI consolidé** : Agréger tous les canaux en un ROI de campagne total, un ROAS consolidé, et un CPA global. Intégrer la LTV si fournie pour projeter le ROI à court vs long terme et la période de retour sur investissement.
7. **Comparer aux benchmarks sectoriels** : Consulter `skills/context-engine/industry-profiles.md` pour contextualiser si la performance du canal est au-dessus, dans la moyenne, ou en dessous des moyennes sectorielles pour le secteur de la marque.
8. **Identifier les opportunités d'efficacité** : Signaler les canaux avec des rendements marginaux décroissants, les canaux où une dépense accrue pourrait produire des gains disproportionnés, et les canaux où le CPA dépasse la LTV (dépense non soutenable).
9. **Calculer la période de retour sur investissement** : Si des données de LTV sont fournies, calculer les mois pour atteindre le seuil de rentabilité sur le coût d'acquisition client par canal, en identifiant quels canaux se rentabilisent le plus vite et lesquels nécessitent de la patience pour une valeur à long terme.
10. **Modéliser des scénarios de réallocation budgétaire** : Générer 2-3 scénarios de réallocation déplaçant le budget des canaux sous-performants vers les canaux performants, avec l'impact projeté sur le ROI total, les conversions totales, et le CPA consolidé.
11. **Journaliser les résultats dans le suivi de campagne** : Enregistrer l'analyse de ROI dans `campaign-tracker.py` afin que les futures analyses puissent comparer les tendances d'une période à l'autre et valider si les réallocations recommandées ont amélioré la performance.
12. **Compiler le rapport pour la direction** : Formater l'analyse pour la présentation aux parties prenantes avec des enseignements clairs, des tableaux de données prêts pour la visualisation, et des prochaines étapes actionnables.

## Résultat

Un rapport d'analyse de ROI structuré contenant :

- Tableau de performance canal par canal (dépense, revenu, conversions, ROI, ROAS, CPA, CPL)
- ROI de campagne consolidé et ROAS global avec un résumé de la dépense et du revenu totaux
- Comparaison des modèles d'attribution montrant les changements de distribution de crédit entre modèles
- Projection de ROI ajustée à la LTV et analyse de la période de retour sur investissement (si la LTV client a été fournie)
- Comparaison aux benchmarks sectoriels avec notations au-dessus/dans la moyenne/en dessous de la performance par canal
- Analyse d'efficacité identifiant les rendements décroissants et les opportunités de mise à l'échelle
- Recommandations de réallocation budgétaire avec 2-3 scénarios modélisés et résultats projetés
- Diagnostic des canaux sous-performants avec des actions d'amélioration spécifiques
- Comparaison de tendance d'une période à l'autre (si des données historiques sont disponibles depuis le suivi de campagne)
- Résumé exécutif avec les 3 principaux enseignements et les prochaines étapes recommandées
- Tableaux de données prêts pour la visualisation, formatés pour Google Sheets ou l'export en présentation

## Agents utilisés

- **analytics-analyst** -- Calcul de ROI, modélisation d'attribution, comparaison aux benchmarks, analyse d'efficacité, calcul de la période de retour sur investissement, et recommandations fondées sur les données
- **marketing-strategist** -- Stratégie d'optimisation budgétaire, recommandations de mix de canaux, conception de scénarios de réallocation, et formulation d'insights au niveau direction pour la communication aux parties prenantes
</content>

---
name: creative-testing-framework
description: "Concevoir un plan de test créatif publicitaire structuré — matrice de variables priorisée, grille de test isolée, tailles d'échantillon et budgets minimums par variante calculés par script, conception de contrôle témoin, cadence d'itération, et critères de sélection du gagnant. Planifie le programme de test ; ne lance ni ne modifie aucune publicité en direct. Se déclenche sur « /digital-marketing-pro:creative-testing-framework », « conçois un test A/B pour nos publicités », « nos créations publicitaires fatiguent trop vite », « construis une feuille de route de test créatif », « combien de conversions par variante nous faut-il ». Lit le profil de marque et les guidelines, et se combine avec /digital-marketing-pro:c2pa-metadata pour les variantes générées par IA destinées à des placements dans l'UE."
user-invocable: true
triggers:
  - design an A/B test for ads
  - creative testing strategy
  - multivariate ad test
  - test ad creative
  - ad creative testing framework
  - plan creative iterations
  - sample size for ad test
  - creative optimization testing
---

# /digital-marketing-pro:creative-testing-framework

## Objectif

Concevoir un cadre de test créatif systématique qui maximise la vitesse d'apprentissage tout en maintenant une rigueur statistique sur l'ensemble des plateformes publicitaires. Produit un plan de test complet avec priorisation des variables, exigences de taille d'échantillon, cadence d'itération, et standards de documentation pour une optimisation créative continue.

## Éléments à fournir

L'utilisateur doit fournir (ou se verra demander) :

- **Plateforme(s) publicitaire(s)** : Où les publicités sont diffusées — Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, DSP programmatiques, Pinterest, X/Twitter, ou multiplateforme
- **Types de créations disponibles** : Quels formats peuvent être produits — image statique, vidéo (format court/long), carrousel, texte seul, display responsive, HTML5, jouable, ou annonces de collection
- **Budget publicitaire mensuel alloué aux tests** : Combien de budget est disponible spécifiquement pour l'expérimentation créative par rapport aux performeurs éprouvés
- **Meilleure création actuelle** : Description ou référence des publicités actuellement les plus performantes, avec leurs indicateurs clés
- **Objectifs d'apprentissage** : Quels éléments créatifs nécessitent une optimisation — titres, visuels, texte d'appel à l'action, accroches vidéo, palette de couleurs, cadrage de l'offre, preuve sociale, type de format, ou longueur du texte publicitaire
- **Segments d'audience pour les tests** : Les groupes d'audience disponibles pour les tests — prospection, retargeting, similaires (lookalike), basés sur les centres d'intérêt, démographiques, ou segments personnalisés
- **Objectifs de campagne** : Sur quoi les publicités sont optimisées — notoriété (impressions/portée), considération (clics/vues vidéo), ou conversion (leads/achats/ROAS)
- **Données historiques de performance créative** : Optionnel — résultats de tests passés, schémas de fatigue créative, variations de performance saisonnières, et gagnants/perdants connus
- **Contraintes de directives de marque** : Règles d'identité visuelle, restrictions de message, mentions légales obligatoires, ou goulots d'étranglement d'approbation affectant la vitesse de production créative
- **Calendrier de test** : Combien de temps le programme de test doit durer — sprint unique (2-4 semaines), feuille de route trimestrielle, ou programme continu

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour connaître le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les directives** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Définir les variables de test** : Cataloguer tous les éléments créatifs testables — texte du titre, longueur du texte principal, texte et couleur de l'appel à l'action, sujet de l'image principale, style d'image (photo vs illustration vs contenu généré par l'utilisateur), accroche vidéo (3 premières secondes), durée de la vidéo, format publicitaire (statique vs carrousel vs vidéo), palette de couleurs, cadrage de l'offre (remise vs valeur vs urgence), type de preuve sociale (témoignage vs statistique vs badge), et composition de mise en page.
3. **Prioriser les variables par impact attendu et facilité** : Noter chaque variable sur une matrice 2x2 d'impact de performance attendu (élevé/faible) et d'effort de production (élevé/faible). Classer les variables afin que l'équipe teste d'abord les éléments à fort impact et faible effort. Utiliser les données historiques et les repères de plateforme pour éclairer les estimations d'impact lorsqu'elles sont disponibles.
4. **Concevoir la matrice de test** : Construire la grille variable par variante — pour chaque variable prioritaire, définir 2 à 4 variantes à tester contre le contrôle actuel. S'assurer que les tests sont isolés (une variable par test), sauf pour des expériences multivariées délibérées. Associer chaque test au segment d'audience et à la plateforme appropriés.
5. **Calculer la taille d'échantillon par variante et le budget minimum** : Calculer les conversions requises par variante avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/sample-size-calculator.py" --baseline-rate {rate} --mde {mde} --mde-type relative --significance 0.95 --power 0.80` (une « hausse relative de 10 à 20 % » correspond à `--mde 0.10`-`0.20` avec `--mde-type relative` ; utiliser `--mde-type absolute` si l'objectif est exprimé en points de pourcentage — les deux diffèrent d'environ 40× à une référence de 5 %). Traduire la taille d'échantillon en budget minimum par test en fonction des taux CPM/CPC actuels.
6. **Définir la structure du contrôle témoin** : Concevoir le cadre du contrôle — allouer 10 à 20 % du budget de test à une création témoin inchangée servant de repère stable. Définir quand le contrôle doit être rafraîchi (trimestriellement ou lorsque la performance se dégrade sous un seuil) et comment les nouveaux gagnants deviennent le nouveau contrôle.
7. **Fixer les seuils de significativité statistique** : Définir le niveau de confiance requis pour déclarer un gagnant (90 % pour les décisions directionnelles, 95 % pour les changements créatifs majeurs). Préciser s'il faut utiliser la méthodologie fréquentiste (valeur p) ou bayésienne (probabilité d'être le meilleur). Documenter la période d'observation minimale (7 jours ou plus pour tenir compte des variations selon le jour de la semaine) et les protocoles anti-lecture-anticipée.
8. **Créer la cadence d'itération** : Concevoir le rythme de test — rafraîchissements créatifs hebdomadaires pour les comptes à fort volume, bihebdomadaires pour un volume moyen, mensuels pour un volume plus faible. Définir le pipeline : brief (jour 1), production (jours 2-3), revue et approbation (jour 4), lancement (jour 5), surveillance (jours 6-14), analyse et itération (jour 15). Aligner la cadence avec les circuits d'approbation de la marque.
9. **Construire les critères de sélection du gagnant** : Définir comment les gagnants sont déterminés — indicateur principal (CTR, taux de conversion, ROAS, ou CPA selon l'objectif), niveau de confiance minimum, taille d'échantillon minimale atteinte, et indicateurs de garde-fou qui ne doivent pas se dégrader (par exemple, un titre qui augmente le CTR mais fait chuter le taux de conversion n'est pas un gagnant). Confirmer qu'un gagnant candidat est statistiquement réel avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/significance-tester.py" --control-visitors {n} --control-conversions {n} --variant-visitors {n} --variant-conversions {n} --confidence 0.95` avant de le déclarer. Inclure des règles pour les égalités et les résultats non concluants.
10. **Créer un modèle de documentation pour les résultats et enseignements** : Concevoir un modèle de fiche de test standardisé capturant : hypothèse, variable testée, variantes, audience, plateforme, plage de dates, taille d'échantillon, résultats de l'indicateur principal, indicateurs secondaires, significativité statistique, déclaration du gagnant, enseignement clé, et recommandation pour le test suivant. Cela construit la base de connaissances créative au fil du temps.

## Résultat

Un cadre de test créatif structuré contenant :

- **Classement de priorité des variables de test** — matrice impact-effort avec tous les éléments testables notés, classés, et séquencés en une feuille de route de test
- **Matrice de test** — grille variable par variante montrant chaque test, son contrôle, ses variantes, son audience cible et sa plateforme, avec une isolation claire des variables
- **Exigences de taille d'échantillon par variante** — minimums calculés à partir des données de performance actuelles, du MDE souhaité, et du niveau de confiance
- **Budget minimum par test** — traduit à partir des exigences de taille d'échantillon en utilisant les taux CPM/CPC actuels de la plateforme, avec l'allocation totale du budget de test
- **Conception du contrôle témoin** — allocation budgétaire de 10 à 20 %, critères de rafraîchissement du contrôle, et processus de promotion du gagnant du test vers le statut évergreen
- **Seuils et méthodologie de significativité statistique** — niveaux de confiance, approche fréquentiste vs bayésienne, périodes d'observation minimales, et règles anti-lecture-anticipée
- **Calendrier de cadence d'itération** — planning de test semaine par semaine ou sprint par sprint avec dates de brief, production, lancement et analyse
- **Critères de sélection du gagnant** — indicateur principal, niveau de confiance, seuil de hausse minimum, indicateurs de garde-fou, règles de départage, et protocoles de résultat non concluant
- **Modèle de brief créatif par variante** — format de brief standardisé garantissant que chaque variante est produite avec une différenciation claire par rapport au contrôle et aux autres variantes
- **Convention de nommage pour le suivi créatif** — structure de nommage systématique (plateforme_audience_variable_variante_date) permettant une analyse de performance propre sur toutes les plateformes
- **Modèle de documentation pour les résultats et enseignements** — format de fiche de test pour consigner l'hypothèse, les résultats, la significativité, les enseignements, et les prochaines étapes dans une base de connaissances consultable
- **Indicateurs de fatigue créative et déclencheurs de rafraîchissement** — indicateurs signalant qu'une création gagnante perd en efficacité (déclin du CTR, seuil de fréquence, baisse d'engagement) avec des actions de rafraîchissement recommandées
- **Meilleures pratiques de test propres à chaque plateforme** — considérations Meta Advantage+ pour les créations (y compris Advantage+ Leads, disponible mondialement en mai 2026), nuances de test des annonces responsives Google, spécifications créatives LinkedIn, exigences de contenu natif TikTok, placement image seule de Threads (déploiement mondial se terminant en mai 2026), et budgets minimums propres à chaque plateforme
- **Production de variantes créatives par IA** — Lors du test de variantes à grande échelle, utiliser `Nano Banana Pro` pour des variantes statiques haute-fidélité avec cohérence de personnage de marque (rendu de texte sur image parmi les meilleurs du marché), `Veo 3.1` ou `Gemini Omni` pour les variantes vidéo courtes, et `Veo 3.1` en particulier lorsque l'audio natif synchronisé importe. Toutes les variantes de test générées par IA destinées à des placements dans l'UE doivent être signées C2PA via `/digital-marketing-pro:c2pa-metadata` avant le lancement — le contrôle avant publication (`/digital-marketing-pro:check`) bloque les actifs IA non signés sur les ensembles d'annonces ciblant l'UE. Considérer le coût de génération IA par variante comme le nouveau plancher du « coût de production créative » dans vos calculs de budget minimum
- **Feuille de route de test trimestrielle** — plan de 12 semaines montrant quelles variables tester dans quel ordre, avec phasage budgétaire, revues de jalons, et objectifs d'apprentissage stratégiques par trimestre

## Agents utilisés

- **cro-specialist** — Conception de la méthodologie de test, cadre de rigueur statistique, calcul de taille d'échantillon, seuils de significativité, critères de sélection du gagnant, structure du contrôle témoin, et standards de documentation
- **media-buyer** — Configuration de test propre à chaque plateforme, allocation budgétaire par test, recommandations de format créatif, correspondance des segments d'audience, conventions de nommage, surveillance de la fatigue, et planification de la feuille de route trimestrielle
</content>

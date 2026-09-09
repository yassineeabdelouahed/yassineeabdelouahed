# Tests A/B — Méthodologie et pièges

Un cadre rigoureux pour concevoir, exécuter et interpréter des expériences de conversion. Ce guide couvre le cycle de vie complet, de la formation de l'hypothèse à l'analyse, en insistant sur les pièges statistiques et opérationnels qui invalident la plupart des tests.

---

## Cadre de conception de test

Chaque test A/B valide suit cette séquence. Sauter une étape introduit un biais ou rend les résultats ininterprétables.

### Étape 1 : Hypothèse

**Format :** « Si nous [changement], alors [indicateur] va [s'améliorer/diminuer] de [montant estimé], parce que [raisonnement]. »

| Composante | Objectif | Exemple |
|---|---|---|
| Changement | Ce que vous modifiez | Remplacer l'image héro générique par une capture d'écran du produit montrant le tableau de bord |
| Indicateur | Le KPI principal que vous allez mesurer | Taux d'inscription à l'essai gratuit |
| Direction et ampleur | Effet attendu et taille estimée | Augmentation de 10 à 15 % |
| Raisonnement | Pourquoi vous pensez que cela va fonctionner | Les données de carte de chaleur montrent que les visiteurs ignorent l'image de stock actuelle ; les entretiens clients révèlent que le tableau de bord est le principal déclencheur d'achat |

**Checklist de qualité de l'hypothèse :**
- [ ] Basée sur des données (analytics, cartes de chaleur, recherche utilisateur, tickets de support), pas sur une opinion
- [ ] Précise un unique indicateur principal mesurable
- [ ] Inclut une prédiction réfutable — vous pouvez prouver qu'elle est fausse
- [ ] Liée à un problème utilisateur ou point de friction documenté
- [ ] L'impact estimé est réaliste au regard des résultats de tests historiques

### Étape 2 : Sélection de la variable

| Type de variable | Description | Exemple |
|---|---|---|
| Variable unique | Un seul élément changé | Couleur du bouton, texte du titre, image |
| Variable composite | Plusieurs éléments liés changés ensemble | Refonte complète de la section héro (titre + image + CTA) |
| Niveau page | Conception de page entièrement différente | Page actuelle vs variante longue vs variante orientée vidéo |

**Règle empirique :** Testez des variables uniques en phase de diagnostic. Testez des variables composites lorsque vous avez une hypothèse forte sur une section. Testez au niveau page lorsque vous avez suffisamment de trafic et avez besoin d'une amélioration en rupture.

### Étape 3 : Indicateur principal

Choisissez exactement un indicateur principal. Suivez les indicateurs secondaires pour le contexte mais ne les utilisez pas pour déclarer un gagnant.

| Type d'indicateur | Quand l'utiliser | Point de vigilance |
|---|---|---|
| Taux de conversion | La plupart des tests A/B sur les landing pages | Peut être manipulé en attirant des leads de moindre qualité |
| Revenu par visiteur | E-commerce, tests de tarification | Nécessite une durée de test plus longue en raison de la variance |
| Taux d'activation | Tests d'essai gratuit et d'intégration | Nécessite un suivi au-delà de la conversion initiale |
| Score de qualité de lead | Génération de leads où le volume seul est trompeur | Nécessite une intégration CRM et suffisamment de temps pour que les leads mûrissent |

### Étape 4 : Durée et calendrier

| Facteur | Recommandation |
|---|---|
| Durée minimale | 2 cycles d'activité complets (généralement 2 semaines minimum) |
| Durée maximale | 8 semaines — au-delà, des facteurs externes contaminent les résultats |
| Conscience du calendrier | Doit couvrir tous les jours de la semaine ; éviter de lancer en milieu de semaine |
| Périodes d'exclusion | Black Friday, lancements de produit, événements de relations presse, pannes majeures |
| Chevauchement avec les jours fériés | Si un test se déroule pendant un jour férié, le prolonger pour inclure une période équivalente hors jour férié |

### Étape 5 : Calcul de la taille d'échantillon

Déterminez la taille d'échantillon requise **avant** de lancer le test. Ne commencez jamais un test sans savoir quand l'arrêter.

**Éléments requis :**
- Taux de conversion de référence (performance actuelle du contrôle)
- Effet minimum détectable (MDE) — la plus petite amélioration qu'il vaut la peine de détecter
- Niveau de significativité statistique (généralement 95 %, ou alpha = 0,05)
- Puissance statistique (généralement 80 %, ou bêta = 0,20)

---

## Tableau de référence des tailles d'échantillon

*Test bilatéral, significativité de 95 %, puissance de 80 %. Les chiffres indiquent les visiteurs nécessaires PAR VARIANTE.*

| CVR de référence | MDE : 5 % relatif | MDE : 10 % relatif | MDE : 15 % relatif | MDE : 20 % relatif | MDE : 25 % relatif |
|---|---|---|---|---|---|
| 1 % | 637 000 | 163 000 | 74 000 | 43 000 | 28 000 |
| 2 % | 315 000 | 81 000 | 37 000 | 21 000 | 14 000 |
| 3 % | 208 000 | 53 000 | 24 000 | 14 000 | 9 100 |
| 5 % | 122 000 | 31 000 | 14 000 | 8 200 | 5 300 |
| 8 % | 74 000 | 19 000 | 8 600 | 4 900 | 3 200 |
| 10 % | 58 000 | 15 000 | 6 700 | 3 800 | 2 500 |
| 15 % | 36 000 | 9 300 | 4 200 | 2 400 | 1 600 |
| 20 % | 26 000 | 6 500 | 2 900 | 1 700 | 1 100 |
| 30 % | 15 000 | 3 800 | 1 700 | 960 | 620 |

*Valeurs calculées avec `scripts/sample-size-calculator.py` (`--mde-type relative`, test Z à deux proportions).*

*Idée clé : les pages à faible conversion ont besoin d'un trafic massif pour détecter de petits effets. Si votre page convertit à 2 % et que vous voulez détecter une hausse relative de 10 % (de 2,0 % à 2,2 %), il vous faut environ 81 000 visiteurs par variante.*

---

## Significativité statistique — ce que cela signifie réellement

### Valeur p

La valeur p est la probabilité d'observer des résultats aussi extrêmes (ou plus extrêmes) que ceux mesurés, en supposant que l'hypothèse nulle est vraie (c'est-à-dire en supposant qu'il n'y a pas de différence réelle entre les variantes).

- **p < 0,05** signifie qu'il y a moins de 5 % de chances que la différence observée soit due au bruit aléatoire
- Cela ne signifie PAS qu'il y a 95 % de chances que la variante soit meilleure
- Cela ne renseigne PAS sur l'ampleur de l'effet — seulement qu'un effet existe probablement

### Intervalles de confiance

Un intervalle de confiance à 95 % donne la plage dans laquelle se situe probablement la véritable différence de taux de conversion.

| Scénario | Intervalle de confiance | Interprétation |
|---|---|---|
| Gagnant clair | +1,2 % à +3,8 % | La variante est meilleure ; l'effet se situe entre 1,2 % et 3,8 % de hausse absolue |
| Non concluant | -0,5 % à +2,1 % | L'intervalle inclut zéro ; impossible de déclarer un gagnant avec confiance |
| Perdant clair | -3,0 % à -0,8 % | La variante est moins bonne ; le contrôle doit être conservé |

**Rapportez toujours les intervalles de confiance, pas seulement les valeurs p.** Un résultat statistiquement significatif avec un intervalle de confiance minuscule autour d'un effet négligeable ne vaut pas la peine d'être mis en œuvre.

### Effet minimum détectable (MDE)

Le MDE est la plus petite taille d'effet que votre test est en mesure de détecter. Sa définition relève d'un jugement métier :

- Quelle est la plus petite amélioration qui justifierait le coût de mise en œuvre ?
- Quelle hausse changerait significativement le revenu en aval ?

**Erreur courante :** Fixer un MDE trop bas (essayer de détecter des effets minuscules) conduit à des tailles d'échantillon irréalistement grandes. Le fixer trop haut (ne détecter que des effets énormes) signifie que vous manquez des améliorations réelles mais modérées.

---

## Pièges courants

### 1. Lecture anticipée (tests de significativité répétés)

**Ce qui se passe :** Vous vérifiez les résultats quotidiennement et arrêtez le test dès que vous voyez p < 0,05.

**Pourquoi c'est faux :** La significativité statistique fluctue. Si vous vérifiez un test 10 fois pendant son exécution, le taux de faux positifs gonfle de 5 % à environ 26 %. Vous déclarerez des gagnants qui ne sont en réalité pas meilleurs.

**Correction :** Engagez-vous à l'avance sur une taille d'échantillon et une durée d'exécution. N'arrêtez pas prématurément. Si vous devez surveiller, utilisez des méthodes de test séquentiel (par exemple, valeurs p toujours valides, approches bayésiennes) qui tiennent compte des observations multiples.

### 2. Biais saisonnier et cyclique

**Ce qui se passe :** Vous exécutez un test qui commence un lundi et se termine un jeudi, ou qui se déroule pendant une période promotionnelle.

**Pourquoi c'est faux :** Les taux de conversion varient selon le jour de la semaine, le moment du mois, les cycles de paie, et les schémas saisonniers. Des données de cycle partiel faussent les résultats.

**Correction :** Exécutez toujours les tests sur des cycles d'activité complets (semaines complètes au minimum). Documentez tout événement externe survenant pendant la période de test.

### 3. Effet de nouveauté

**Ce qui se passe :** Un nouvel élément de conception performe bien initialement, mais la hausse s'estompe à mesure que les visiteurs récurrents s'y habituent.

**Pourquoi c'est faux :** Vous mettez en œuvre le changement en espérant une hausse permanente, mais elle revient à la référence en quelques semaines.

**Correction :** Segmentez les résultats par nouveaux visiteurs vs visiteurs récurrents. Exécutez le test suffisamment longtemps (3 à 4 semaines) pour que la nouveauté s'estompe. Surveillez la performance post-mise en œuvre pendant 4 à 6 semaines.

### 4. Paradoxe de Simpson

**Ce qui se passe :** La variante B l'emporte globalement, mais lorsque vous segmentez par type d'appareil ou source de trafic, la variante A l'emporte dans chaque segment.

**Pourquoi c'est faux :** Une répartition inégale du trafic entre les segments crée des résultats agrégés trompeurs. Le « gagnant » est un artefact du mix de trafic, pas de la performance de la page.

**Correction :** Vérifiez les résultats sur les principaux segments (appareil, source, nouveau/récurrent). Si la direction de l'effet s'inverse dans les segments, examinez la répartition du trafic avant de déclarer un gagnant.

### 5. Tests sous-alimentés

**Ce qui se passe :** Vous exécutez un test avec un trafic insuffisant et déclarez « aucune différence significative » comme preuve que la variante n'a aucun effet.

**Pourquoi c'est faux :** L'absence de preuve n'est pas une preuve d'absence. Un test avec 500 visiteurs par variante ne peut pas détecter une hausse relative de 10 % sur un taux de conversion de 3 % — il n'y avait simplement pas assez de données.

**Correction :** Calculez la taille d'échantillon requise avant le lancement. Si vous ne pouvez pas l'atteindre en 8 semaines, augmentez le MDE, testez une page à plus fort trafic, ou combinez le test avec d'autres sources de trafic.

### 6. Problème des comparaisons multiples

**Ce qui se passe :** Vous testez 5 variantes contre un contrôle et vous réjouissez lorsque l'une d'elles affiche p < 0,05.

**Pourquoi c'est faux :** Avec 5 comparaisons, la probabilité d'au moins un faux positif est d'environ 23 % (pas 5 %). Vous célébrez probablement du bruit.

**Correction :** Appliquez une correction (Bonferroni : diviser alpha par le nombre de comparaisons) ou utilisez une approche de test multivarié structurée. Mieux encore, testez moins de variantes avec des hypothèses plus solides.

### 7. Biais du survivant dans les tests de tunnel

**Ce qui se passe :** Vous testez un changement à l'étape 2 d'un tunnel et observez une conversion plus élevée vers l'étape 3. Mais l'achèvement total du tunnel chute car le changement a aussi causé plus d'abandon entre les étapes 1 et 2.

**Pourquoi c'est faux :** Optimiser une étape isolément peut nuire au tunnel global.

**Correction :** Suivez la macro-conversion (résultat final du tunnel), pas seulement la micro-conversion à l'étape testée.

---

## Cadre de priorisation ICE

Notez chaque idée de test sur trois dimensions (échelle de 1 à 10) et multipliez pour obtenir un score composite.

| Dimension | Question | Guide de notation |
|---|---|---|
| **Impact** | Quelle sera l'ampleur de l'effet si l'hypothèse est correcte ? | 1-3 : Hausse mineure. 4-6 : Amélioration modérée. 7-10 : Changement transformateur. |
| **Confiance** | Quelle est votre certitude que cela produira un résultat positif ? | 1-3 : Intuition uniquement. 4-6 : Soutenu par des données indirectes. 7-10 : Preuves solides issues de la recherche, de tests passés, ou d'analyse concurrentielle. |
| **Facilité** | À quel point est-ce simple à mettre en œuvre et à lancer ? | 1-3 : Travail de développement majeur, plusieurs équipes. 4-6 : Effort modéré, un sprint. 7-10 : Changement de texte/image, lançable en quelques heures. |

| Idée de test | Impact | Confiance | Facilité | Score ICE | Priorité |
|---|---|---|---|---|---|
| Réécrire le titre pour correspondre au texte publicitaire le plus performant | 7 | 8 | 9 | 504 | P1 |
| Réduire le formulaire de 8 à 4 champs | 8 | 7 | 7 | 392 | P1 |
| Ajouter un témoignage vidéo au-dessus de la ligne de flottaison | 6 | 5 | 4 | 120 | P2 |
| Refondre entièrement la mise en page de la page | 9 | 4 | 2 | 72 | P3 |

---

## Directives de test multivarié (MVT)

| Critère | Test A/B | Test multivarié |
|---|---|---|
| Trafic requis | Modéré | Élevé (multiplié par le nombre de combinaisons) |
| Idéal pour | Valider une hypothèse unique | Comprendre les effets d'interaction entre éléments |
| Complexité | Faible | Élevée — nécessite une conception factorielle soignée |
| Analyse | Comparaison simple | Effets principaux + effets d'interaction |
| Quand l'utiliser | Choix par défaut pour la plupart des équipes | Lorsque vous avez plus de 100 000 visiteurs mensuels ET besoin de tester les interactions entre éléments |

**Règle de taille d'échantillon MVT :** Multipliez l'exigence de taille d'échantillon A/B par le nombre de combinaisons. Un MVT 2x2 (deux éléments, deux niveaux chacun = 4 combinaisons) nécessite environ 4 fois le trafic d'un simple test A/B.

---

## Modèle de documentation de test

Complétez ceci pour chaque test. Stockez-le dans un référentiel de tests partagé afin que l'équipe construise une connaissance institutionnelle.

```
ID DU TEST : [Numéro séquentiel]
NOM DU TEST : [Nom descriptif]
DATE : [Début] — [Fin]
PAGE : [URL testée]
TRAFIC : [Source/segment ciblé]

HYPOTHÈSE :
Si nous [changement], alors [indicateur] va [direction] de [montant],
parce que [raisonnement basé sur des preuves].

VARIANTES :
- Contrôle : [Description + lien de capture d'écran]
- Variante A : [Description + lien de capture d'écran]
- Variante B : [Description + lien de capture d'écran, le cas échéant]

INDICATEUR PRINCIPAL : [Indicateur unique]
INDICATEURS SECONDAIRES : [Liste]
INDICATEURS DE GARDE-FOU : [Indicateurs qui ne doivent pas se dégrader]

TAILLE D'ÉCHANTILLON REQUISE : [Par variante]
MDE : [Effet minimum détectable]
NIVEAU DE SIGNIFICATIVITÉ : [Généralement 95 %]
PUISSANCE : [Généralement 80 %]

RÉSULTATS :
- CVR du contrôle : [X %]
- CVR de la variante A : [X %] (p = [X], IC : [X % à X %])
- Gagnant : [Contrôle / Variante / Non concluant]

SEGMENTS VÉRIFIÉS :
- Appareil : [Bureau / Mobile / Tablette]
- Source de trafic : [Payant / Organique / Direct / E-mail]
- Nouveau vs récurrent : [Résultats par segment]

DÉCISION : [Mettre en œuvre / Itérer / Archiver]
DATE DE MISE EN ŒUVRE : [Quand le gagnant a été déployé]

ENSEIGNEMENTS :
[Qu'est-ce que ce test nous a appris ? Que devrions-nous tester ensuite ?]
```

---

## Repères de vélocité de test

| Étape de l'entreprise | Tests par mois | Focus |
|---|---|---|
| Démarrage (faible trafic) | 1-2 | Tests à fort impact, au niveau page, avec un MDE élevé |
| Croissance | 4-8 | Tests au niveau section sur les pages clés |
| Mature / fort trafic | 10-20+ | Tests au niveau élément avec une méthodologie rigoureuse |

**L'effet composé :** Une équipe exécutant 8 tests par trimestre avec un taux de réussite de 30 % et une hausse moyenne de 5 % par test gagnant atteint environ 14 % d'amélioration cumulée de conversion par trimestre. Sur une année, cela se compose en plus de 60 % de hausse totale — bien au-delà de ce que livre n'importe quelle refonte isolée.
</content>

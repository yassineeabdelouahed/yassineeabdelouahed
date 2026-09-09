# Grilles d'évaluation -- Critères de notation pour toutes les dimensions

Grilles de notation détaillées pour les six dimensions d'évaluation utilisées par `eval-runner.py`. Chaque grille définit ce qui constitue une plage de score donnée, avec des exemples concrets. Utilisez ces grilles pour comprendre pourquoi un contenu a reçu un score particulier et ce qu'il faut corriger.

---

## 1. Score de risque d'hallucination (0--100)

Mesure la probabilité qu'un contenu contienne des statistiques fabriquées, de fausses citations, des URL de substitution (placeholder), ou des affirmations non étayées. Des scores plus élevés signifient un risque plus faible.

| Plage de score | Niveau de risque | Description | Exemple |
|-------------|------------|-------------|---------|
| **90--100** | Risque minimal | Toutes les statistiques sont citées dans les 2 phrases. Aucune URL de substitution. Aucun superlatif non étayé. Les affirmations prospectives utilisent des nuances appropriées. Des formules d'attribution présentes partout. | « Selon notre rapport GA4 du T4 2025, les conversions ont augmenté de 47 % d'un trimestre à l'autre, principalement grâce aux améliorations de la recherche organique. » |
| **75--89** | Risque faible | Lacunes de citation mineures ou attribution occasionnellement manquante, mais aucune donnée fabriquée. Certaines statistiques peuvent manquer de sourçage immédiat mais sont plausibles et vérifiables. | « Les conversions ont augmenté significativement le trimestre dernier. » (L'absence du chiffre précis est en fait plus sûre que d'en fabriquer un -- vague mais honnête.) |
| **60--74** | Risque modéré | Quelques statistiques non vérifiées présentes. Quelques affirmations superlatives sans preuve. Légers problèmes de nuance sur les déclarations prospectives. Revue humaine recommandée avant publication. | « Notre plateforme a aidé des milliers d'entreprises à développer leur chiffre d'affaires. » (Vague mais pas fabriqué. L'affirmation « des milliers » devrait être vérifiée.) |
| **40--59** | Risque élevé | Plusieurs statistiques non vérifiées. URL de substitution détectées. Plusieurs affirmations non étayées. Des chiffres précis apparaissent sans aucune attribution de source. Révision requise. | « 73 % des marketeurs conviennent que notre outil est le meilleur, entraînant des améliorations de ROI de 5x dès le premier mois. » (Aucune source pour les 73 %, « le meilleur » n'est pas étayé, le ROI de 5x n'est pas vérifié.) |
| **0--39** | Risque critique | Statistiques fabriquées avec de fausses citations. Plusieurs affirmations superlatives sans aucune preuve. URL de substitution partout. Références d'entités inventées. Ne pas publier. Déclenche un rejet automatique. | « Une étude de la Harvard Business School a confirmé que notre produit augmente les conversions de 500 %, faisant de nous la plateforme n°1 approuvée par plus de 10 000 entreprises dans le monde. » (Aucune étude de ce type n'existe, les 500 % sont fabriqués, le n°1 n'est pas étayé, les 10 000 ne sont pas vérifiés.) |

**Schémas clés qui réduisent les scores** : Pourcentages non cités (-5 à -10 chacun), URL de substitution (-10 chacune), superlatifs non qualifiés (-5 chacun), fausses citations d'entités (-15 chacune), nuance manquante sur les projections (-5 chacune).

---

## 2. Score de vérification des affirmations (0--100)

Mesure dans quelle mesure les affirmations vérifiables du contenu correspondent au fichier de preuves fourni. Noté uniquement lorsqu'un fichier de preuves est fourni.

| Plage de score | Niveau | Description |
|-------------|-------|-------------|
| **90--100** | Entièrement vérifié | Toutes les affirmations extraites correspondent aux éléments de preuve avec une grande confiance (correspondance floue >= 0,80). Les éléments de preuve sont marqués comme vérifiés. Les dates de source sont actuelles. |
| **70--89** | Majoritairement vérifié | La plupart des affirmations sont vérifiées. Certaines affirmations mineures (par ex. « équipe en croissance », « présence mondiale ») ne sont pas vérifiées mais présentent un faible risque. Toutes les affirmations quantitatives centrales ont des preuves. |
| **50--69** | Mixte | Environ la moitié des affirmations sont vérifiées. Certaines affirmations quantitatives importantes manquent de preuves. Une revue humaine est nécessaire pour déterminer quelles affirmations non vérifiées conserver, réviser ou supprimer. |
| **30--49** | Majoritairement non vérifié | La plupart des affirmations manquent de preuves correspondantes. Plusieurs affirmations quantitatives ne peuvent pas être confirmées. Lacunes de preuve significatives à combler avant publication. |
| **0--29** | Non vérifié ou contredit | Les affirmations n'ont soit aucune preuve, soit la preuve contredit les affirmations (par ex. le contenu dit « augmentation de 50 % » mais la preuve montre 32 %). Bloquer la publication jusqu'à ce que des preuves soient fournies ou que les affirmations soient corrigées. |

**Formule de notation** : `(nombre_vérifié * 100 + nombre_partiellement_vérifié * 60) / total_affirmations`. Si aucune affirmation vérifiable n'est trouvée dans le contenu, le score est par défaut de 100 avec une note expliquant qu'aucune affirmation ne nécessitait de vérification.

**Ce qui compte comme une affirmation vérifiable** : Pourcentages, montants en dollars, multiplicateurs, nombres de clients/utilisateurs, affirmations de confiance (« approuvé par X »), certifications, classements, affirmations de conformité, et chiffres financiers. Les déclarations qualitatives générales (« nous nous soucions de la qualité ») ne sont pas extraites comme affirmations vérifiables.

---

## 3. Score de structure du livrable (0--100)

Mesure si le contenu correspond au schéma structurel attendu. Noté uniquement lorsqu'un schéma est spécifié.

| Plage de score | Niveau | Description |
|-------------|-------|-------------|
| **90--100** | Complet | Toutes les sections requises présentes et détectées. Nombre de mots dans les limites. Toutes les règles de format satisfaites (titres, paragraphes, CTA le cas échéant). Aucun texte de substitution détecté. |
| **70--89** | Lacunes mineures | Variations mineures de nom de section encore détectées par correspondance floue. Le formatage est majoritairement correct. Le nombre de mots est à moins de 10 % des limites. Aucun texte de substitution. |
| **50--69** | Partiel | 1 à 2 sections requises manquantes, ou le nombre de mots est à 10-25 % en dehors des limites, ou problèmes de formatage mineurs (par ex. aucun titre alors que `has_headings` est requis). |
| **30--49** | Lacunes significatives | Plusieurs sections requises manquantes. Violation significative du nombre de mots (plus de 25 % en dehors des limites). Texte de substitution détecté (par ex. `[Insérer ici]`, `{nom_entreprise}`, `Lorem ipsum`). |
| **0--29** | Fondamentalement erroné | Le contenu ne correspond pas du tout au schéma. La plupart des sections requises manquent. La structure ne ressemble en rien au type de contenu attendu. |

**Déductions courantes** : Section requise manquante (-15 par section), texte de substitution trouvé (-10 par occurrence), nombre de mots inférieur au minimum (-10), nombre de mots supérieur au maximum (-5), format de titre requis manquant (-5), CTA manquant alors que `has_cta` est requis (-15).

---

## 4. Score de qualité de contenu (0--100)

Mesure la qualité rédactionnelle globale : clarté, cohérence, profondeur, exploitabilité et engagement. Noté par `content-scorer.py` en utilisant la grille pondérée définie dans `scoring-rubrics.md`.

| Dimension | Pondération | 0 (Échec) | 5 (Faible) | 10 (Bon) | 15--20 (Excellent) |
|-----------|--------|----------|----------|-----------|-------------------|
| **Pertinence pour l'audience** | 20 % | Mauvaise audience entièrement | Générique, pourrait convenir à n'importe qui | S'adresse au persona cible | Résonne profondément avec les points de douleur et les jobs-to-be-done du persona spécifique |
| **Lisibilité** | 15 % | Niveau scolaire totalement inapproprié | 3 niveaux ou plus décalés par rapport à la cible | À 1 niveau de la cible | Niveau scolaire parfait pour l'audience (B2C : 6e--8e, B2B : 10e--12e) |
| **Optimisation SEO** | 15 % | Aucun ciblage de mot-clé | Mot-clé présent mais mal placé | Mot-clé principal dans le titre, H1, les 100 premiers mots, la méta | Optimisation complète : clusters de mots-clés, liens internes, schéma, correspondance d'intention |
| **Originalité** | 15 % | Contenu générique réchauffé | Quelques angles uniques | Insights ou points de données originaux | Expérience de première main, données propriétaires, cadres uniques |
| **Correspondance de voix de marque** | 15 % | Complètement hors marque | Partiellement aligné | Cohérent avec le profil de voix de marque | Incontestablement dans le ton de la marque sur les 4 dimensions de voix |
| **Efficacité du CTA** | 10 % | Aucun CTA ou CTA non pertinent | CTA présent mais faible/générique | CTA clair aligné avec l'étape du tunnel | CTA convaincant, spécifique, adapté à l'urgence avec proposition de valeur |
| **Conformité** | 10 % | Violations présentes (risque juridique) | Bonnes pratiques optionnelles manquantes | Toutes les mentions légales requises présentes | Conformité complète + bonnes pratiques proactives (accessibilité, divulgation) |

**Interprétation du score** : 85--100 = Prêt à publier. 70--84 = Révisions mineures. 50--69 = Révisions majeures. En dessous de 50 = Réécriture.

---

## 5. Score de voix de marque (0--100)

Mesure l'alignement avec le profil de voix de la marque active (formalité, énergie, humour, autorité). Noté par `brand-voice-scorer.py` en utilisant le système de contexte de marque à 9 points.

| Plage de score | Niveau | Description |
|-------------|-------|-------------|
| **90--100** | Incontestablement dans le ton de la marque | Le ton, le vocabulaire, la structure des phrases et les marqueurs de personnalité correspondent tous au profil de la marque. Le contenu ne pourrait provenir que de cette marque. |
| **75--89** | Constamment dans le ton de la marque | Le ton global est correct. Variations mineures de vocabulaire qui ne rompent pas la cohérence de marque. Les marqueurs de personnalité sont présents. |
| **60--74** | Partiellement dans le ton de la marque | Le ton est généralement approprié mais incohérent. Certaines sections correspondent à la voix de marque tandis que d'autres dérivent. Lacunes de vocabulaire. |
| **40--59** | Majoritairement hors marque | Le ton ne correspond pas au profil de la marque. Mauvais niveau de formalité, énergie décalée, ou humour inapproprié. Le contenu paraît générique. |
| **0--39** | Complètement hors marque | Le contenu contredit le profil de voix de la marque. Registre d'audience erroné, personnalité en contradiction, ou message décalé par rapport au ton. |

**Ce que le système de notation vérifie** : Niveau de formalité (décontracté à formel sur une échelle de 1 à 10), niveau d'énergie (discret à énergique), niveau d'humour (sérieux à ludique), niveau d'autorité (pair à expert). Chaque dimension est comparée aux valeurs du profil de marque avec des seuils de tolérance.

---

## 6. Score de lisibilité (0--100)

Mesure à quel point le contenu est accessible pour l'audience cible. Noté par `readability-analyzer.py` en utilisant plusieurs métriques de lisibilité.

| Plage de score | Niveau | Description |
|-------------|-------|-------------|
| **90--100** | Optimal | Le niveau Flesch-Kincaid correspond parfaitement à l'audience cible. La longueur moyenne des phrases est de 15--20 mots. Les paragraphes font 3--5 phrases. Le jargon est absent ou expliqué dès la première utilisation. |
| **75--89** | Bon | Le niveau scolaire est à 1--2 niveaux de la cible. La longueur des phrases est majoritairement appropriée. Paragraphes occasionnellement longs ou jargon non expliqué. |
| **60--74** | Acceptable | Le niveau scolaire est décalé de 2--3 niveaux par rapport à la cible. Certaines phrases sont trop complexes. La densité de jargon est notable. Les paragraphes sont de taille incohérente. |
| **40--59** | Difficile | Le niveau scolaire est significativement décalé. Des phrases longues et complexes dominent. Jargon dense sans explication. Paragraphes en pavés de texte. |
| **0--39** | Inaccessible | Le contenu est illisible pour l'audience cible. Complexité de niveau académique pour une audience grand public, ou trop simplifié pour une audience technique. |

**Lisibilité cible par audience** : B2C général (Flesch-Kincaid 6e--8e), B2C premium (8e--10e), B2B général (10e--12e), B2B technique (12e--14e), Académique/recherche (14e+).

---

## 7. Interprétation du score composite et matrice de décision

Le score composite est une somme pondérée de toutes les dimensions évaluées. Il détermine la note en lettre et l'action recommandée.

| Note | Score | Publier ? | Réviser ? | Réécrire ? | Revue humaine requise ? |
|-------|-------|----------|---------|----------|----------------------|
| A+ | 95--100 | Oui | Non | Non | Facultatif |
| A | 90--94 | Oui | Facultatif | Non | Facultatif |
| A- | 85--89 | Oui | Recommandé | Non | Non, sauf secteur réglementé |
| B+ | 80--84 | Conditionnel | Oui | Non | Recommandé pour le contenu externe |
| B | 75--79 | Conditionnel | Oui | Non | Oui, pour les éléments signalés |
| B- | 70--74 | Non | Oui | Non | Oui |
| C+ | 65--69 | Non | Oui, significatif | Non | Oui |
| C | 60--64 | Non | Envisager une réécriture | Peut-être | Oui |
| C- | 55--59 | Non | Non | Oui | Oui |
| D | 40--54 | Non | Non | Oui | Oui |
| F | <40 | Bloqué | Non | Oui, depuis zéro | Obligatoire |

**Publication « conditionnelle »** : Le contenu dans la plage B à B+ peut être publié si les éléments spécifiques signalés ont été examinés et acceptés. Vérifiez quelles dimensions tirent le score vers le bas -- un B+ avec un faible score d'hallucination est plus préoccupant qu'un B+ avec un faible score de lisibilité.

---

## 8. Recommandations de pondération spécifiques au type de contenu

Les pondérations par défaut (issues de `eval-runner.py` FULL_EVAL_WEIGHTS) sont équilibrées pour un usage général. Redéfinissez-les par type de contenu pour une évaluation plus ciblée.

| Type de contenu | Qualité de contenu | Voix de marque | Hallucination | Vérification des affirmations | Structure | Lisibilité |
|-------------|----------------|-------------|--------------|-------------------|-----------|-------------|
| **blog_post** | 0,25 | 0,20 | 0,20 | 0,15 | 0,10 | 0,10 |
| **email** | 0,20 | 0,20 | 0,20 | 0,15 | 0,15 | 0,10 |
| **ad_copy** | 0,20 | 0,20 | 0,30 | 0,15 | 0,05 | 0,10 |
| **social_post** | 0,20 | 0,25 | 0,25 | 0,10 | 0,05 | 0,15 |
| **landing_page** | 0,20 | 0,15 | 0,20 | 0,20 | 0,15 | 0,10 |
| **press_release** | 0,15 | 0,15 | 0,20 | 0,25 | 0,15 | 0,10 |
| **content_brief** | 0,30 | 0,10 | 0,10 | 0,10 | 0,25 | 0,15 |
| **campaign_plan** | 0,30 | 0,10 | 0,10 | 0,10 | 0,25 | 0,15 |

**Justification des ajustements notables** :
- **Le texte publicitaire reçoit une pondération d'hallucination de 0,30** : Contenu court avec une forte visibilité externe. Une seule affirmation fabriquée dans une publicité de 50 mots est bien plus dommageable que dans un article de blog de 1 500 mots.
- **Les publications sociales reçoivent une pondération de voix de marque de 0,25** : Les réseaux sociaux sont l'endroit où la personnalité de marque est la plus visible. Des publications sociales hors marque érodent rapidement la cohérence de marque.
- **Les communiqués de presse reçoivent une pondération de vérification des affirmations de 0,25** : Les communiqués de presse sont cités par les journalistes et deviennent la référence publique. Chaque affirmation doit être vérifiable.
- **Les briefs de contenu et les plans de campagne reçoivent une pondération de structure de 0,25** : Ce sont des documents de planification. Leur valeur vient de l'exhaustivité et de l'organisation, pas de la finition.

---

## 9. Considérations d'évaluation spécifiques au secteur

Au-delà des ajustements de pondération, certains secteurs nécessitent une vigilance d'évaluation supplémentaire dans des domaines spécifiques.

### Santé et pharmaceutique
- **Dimensions critiques** : Hallucination (0,30), vérification des affirmations (0,25)
- **Contrôles supplémentaires** : Aucune allégation de traitement de maladie sans mentions légales FDA. Aucun langage « guérit » ou « prévient » pour les compléments alimentaires. Références patient conformes HIPAA (aucune donnée personnelle identifiable). Divulgations d'effets indésirables lorsque requis.
- **Déclencheurs de rejet automatique** : Toute allégation d'efficacité non vérifiée. Mentions légales requises manquantes. Conseil de santé non autorisé.

### Services financiers et assurance
- **Dimensions critiques** : Hallucination (0,25), vérification des affirmations (0,25)
- **Contrôles supplémentaires** : Aucun langage de rendement garanti (« gagnera », « profit garanti »). Présence des mentions légales SEC/FCA. Mentions légales de performances passées sur le contenu d'investissement. Précision de divulgation du TAEG/frais. Aucune allégation de comparaison trompeuse.
- **Déclencheurs de rejet automatique** : Allégations de rendement garanti. Mentions légales réglementaires manquantes. Chiffres de performance fabriqués.

### Services juridiques
- **Dimensions critiques** : Hallucination (0,25), vérification des affirmations (0,25), structure (0,15)
- **Contrôles supplémentaires** : Aucune pratique non autorisée du droit. Mentions légales juridictionnelles. Avis de publicité d'avocat lorsque requis. Aucune garantie de résultat (« nous gagnerons votre affaire »). Langage précis -- le marketing juridique ne tolère aucune ambiguïté.
- **Déclencheurs de rejet automatique** : Résultats d'affaire garantis. Divulgations de publicité d'avocat manquantes.

### Éducation et EdTech
- **Dimensions critiques** : Vérification des affirmations (0,20), qualité de contenu (0,20)
- **Contrôles supplémentaires** : Les allégations d'accréditation doivent être vérifiées auprès de l'organisme accréditeur. Les allégations de résultats étudiants nécessitent une justification (taux de diplomation, taux d'emploi, données salariales). Aucune promesse d'inscription trompeuse.
- **Déclencheurs de rejet automatique** : Allégations d'accréditation fabriquées. Statistiques de résultats non étayées.

### Immobilier
- **Dimensions critiques** : Hallucination (0,20), vérification des affirmations (0,20)
- **Contrôles supplémentaires** : Conformité au Fair Housing Act -- aucun langage discriminatoire ciblant ou excluant des classes protégées. Descriptions de propriété exactes (surface, nombre de chambres). Aucune caractérisation trompeuse de quartier. Exactitude des prix.
- **Déclencheurs de rejet automatique** : Violations du fair housing. Détails de propriété fabriqués.

### Alimentation, boissons et compléments alimentaires
- **Dimensions critiques** : Hallucination (0,25), vérification des affirmations (0,25)
- **Contrôles supplémentaires** : Exigences d'étiquetage FDA pour les allégations de santé. Aucun « cliniquement prouvé » sans essais cliniques réels. Divulgation des allergènes. Limites des allégations « structure/fonction » (peut dire « soutient la santé immunitaire », ne peut pas dire « prévient les rhumes »). Vérification de la certification biologique/sans OGM.
- **Déclencheurs de rejet automatique** : Allégations de santé non autorisées. Mentions légales FDA manquantes sur les compléments. Références d'essais cliniques fabriquées.

---

## Référence rapide : quand remplacer les valeurs par défaut

Utilisez `eval-config-manager.py --action set-weights` lorsque :
- Votre secteur présente des risques de conformité spécifiques (voir les sections sectorielles ci-dessus)
- Votre mix de types de contenu est dominé par un seul format (pondérez les priorités de ce format)
- Vous constatez des faux signalements récurrents sur une dimension moins importante pour votre cas d'usage
- Votre marque a dépassé la phase de construction de référence et vous souhaitez des portes plus strictes

Utilisez `eval-config-manager.py --action set-threshold` lorsque :
- Une dimension spécifique sous-performe systématiquement et vous voulez un plancher minimum
- Les exigences réglementaires imposent un minimum strict sur l'hallucination ou la vérification des affirmations
- Vous voulez des minimums spécifiques par type de contenu (par ex. hallucination >= 80 pour ad_copy uniquement)

Utilisez `eval-config-manager.py --action set-auto-reject` lorsque :
- Vous voulez changer le score composite en dessous duquel le contenu est automatiquement bloqué
- La valeur par défaut est 40 (note F). Les secteurs réglementés devraient envisager 45--50.

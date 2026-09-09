# Guide du cadre d'évaluation -- Système d'assurance qualité de contenu

Le système d'évaluation de Digital Marketing Pro est un pipeline d'assurance qualité automatisé qui note le contenu marketing selon six dimensions avant qu'il n'atteigne la publication. Il détecte les hallucinations, les affirmations non vérifiées, les problèmes structurels, la dérive de voix de marque, les problèmes de lisibilité, et les lacunes générales de qualité de contenu -- puis persiste les résultats dans le temps afin que vous puissiez détecter les régressions et vous améliorer en continu.

Ce guide couvre l'architecture complète, quand utiliser chaque type d'évaluation, comment interpréter les résultats, et comment configurer le système pour différents secteurs et types de contenu.

---

## 1. Architecture du système d'évaluation

Huit scripts fonctionnent ensemble pour former le pipeline d'évaluation. Chaque script est un outil Python autonome (bibliothèque standard uniquement, zéro dépendance externe) qui peut s'exécuter indépendamment ou être orchestré par l'exécuteur principal.

### Inventaire des scripts

| Script | Rôle | Entrée | Sortie |
|--------|------|-------|--------|
| `eval-runner.py` | Orchestrateur principal | Texte/fichier de contenu + options | Rapport composite avec scores pondérés, note, réussite/échec |
| `hallucination-detector.py` | Détection de fabrication | Texte/fichier de contenu | Score de risque d'hallucination + éléments signalés |
| `claim-verifier.py` | Recoupement de preuves | Contenu + JSON de preuves | Score de vérification des affirmations + statut par affirmation |
| `output-validator.py` | Validation de structure | Contenu + nom de schéma | Score de structure + sections manquantes/problèmes de format |
| `quality-tracker.py` | Persistance et tendances | Résultats d'évaluation | Évaluation journalisée + données de tendance + alertes de régression |
| `eval-config-manager.py` | Gestion des seuils | Slug de marque + changements de configuration | Configuration d'évaluation par marque |
| `prompt-ab-tester.py` | Comparaison de variantes | Nom de test + scores de variantes | Comparaison statistique + détermination du gagnant |
| `language-router.py` | Détection/routage de langue | Texte de contenu | Langue détectée + recommandation de routage |

### Comment ils se connectent

```
Content (text or file)
        |
        v
  eval-runner.py (orchestrator)
        |
        +---> hallucination-detector.py ---> hallucination risk score
        |
        +---> claim-verifier.py -----------> claim verification score
        |         (requires --evidence)
        |
        +---> output-validator.py ---------> output structure score
        |         (requires --schema)
        |
        +---> content-scorer.py -----------> content quality score
        |
        +---> brand-voice-scorer.py -------> brand voice score
        |
        +---> readability-analyzer.py -----> readability score
        |
        v
  Weighted composite score + letter grade
        |
        v
  quality-tracker.py (persistence)
        |
        +---> Rolling baseline update
        +---> Regression detection
        +---> Trend analysis
```

L'eval-runner appelle chaque script via un sous-processus, collecte la sortie JSON de chacun, applique les pondérations de dimension, calcule un score composite, assigne une note en lettre, et journalise optionnellement le résultat dans quality-tracker.

### Décisions de conception clés

- **Isolation par sous-processus** : Chaque évaluateur s'exécute dans son propre processus. Un échec dans une dimension ne bloque pas les autres. L'eval-runner capture les erreurs et rapporte des résultats partiels.
- **JSON en entrée, JSON en sortie** : Chaque script lit les arguments depuis les drapeaux CLI et écrit du JSON structuré vers stdout. Cela les rend composables et testables.
- **Conscience de la marque** : Tous les scripts résolvent la marque active depuis `~/.claude-marketing/brands/_active-brand.json` quand aucun drapeau `--brand` n'est fourni. Cela signifie que la configuration d'évaluation, l'historique de qualité, et les tests A/B sont tous délimités par marque.

---

## 2. Quand utiliser chaque type d'évaluation

### run-full -- Avant de publier tout contenu

Évaluation complète à 6 dimensions. Utilisez ceci pour tout contenu qui sera vu par une audience externe.

```
python eval-runner.py --action run-full --file draft.md --evidence claims.json --schema blog_post --log
```

**À utiliser pour** : Articles de blog, e-mails, pages d'atterrissage, communiqués de presse, texte publicitaire, plans de campagne, briefs de contenu, livres blancs, études de cas, pages web.

**Dimensions évaluées** : content_quality (0,25), brand_voice (0,20), hallucination (0,20), claim_verification (0,15), output_structure (0,10), readability (0,10).

**Quand sauter la preuve/le schéma** : Si aucun fichier de preuves n'existe, claim_verification est omis et sa pondération est redistribuée. Si aucun schéma n'est spécifié, output_structure est omis. Le composite se recalcule avec les dimensions restantes.

### run-quick -- Pendant les itérations de rédaction

Boucle de retour rapide avec 3 dimensions. Utilisez ceci pendant l'itération sur les brouillons pour détecter les problèmes majeurs tôt sans la surcharge de l'évaluation complète.

```
python eval-runner.py --action run-quick --text "Your draft content here..."
```

**À utiliser pour** : Premiers brouillons, transitions plan-vers-brouillon, cycles d'itération rapide, rondes de revue interne.

**Dimensions évaluées** : hallucination (0,40), content_quality (0,35), readability (0,25).

**Pourquoi ces trois** : Le risque d'hallucination est le plus fortement pondéré car détecter les affirmations fabriquées tôt évite des problèmes en aval. La qualité de contenu et la lisibilité fournissent un signal rapide sur si le brouillon va dans la bonne direction.

### run-compliance -- Avant tout contenu réglementé/sensible

Évaluation axée sur la conformité avec 4 dimensions pondérées vers la véracité et la vérifiabilité.

```
python eval-runner.py --action run-compliance --file page.md --evidence facts.json --schema landing_page
```

**À utiliser pour** : Marketing de la santé, contenu des services financiers, marketing juridique, allégations pharmaceutiques, offres d'assurance, marketing d'institutions éducatives, annonces immobilières.

**Dimensions évaluées** : hallucination (0,35), claim_verification (0,30), brand_voice (0,20), output_structure (0,15).

**Pourquoi cette combinaison** : Les secteurs réglementés font face à des conséquences juridiques pour les affirmations non vérifiées. La forte pondération sur l'hallucination et la vérification des affirmations garantit que le contenu est véridique avant de passer par les contrôles de marque et de structure.

### Scripts individuels -- Investiguer des problèmes spécifiques

Exécutez tout évaluateur de manière autonome quand vous devez diagnostiquer un problème spécifique.

```
python hallucination-detector.py --action detect --file draft.md
python claim-verifier.py --action extract-claims --text "We grew revenue 3x..."
python output-validator.py --action validate --file page.md --schema landing_page
```

**À utiliser pour** : Investiguer pourquoi un score composite a chuté, approfondir une dimension spécifique, valider un seul aspect du contenu durant la révision.

---

## 3. Interpréter les scores composites et les notes

| Note | Plage de score | Signification | Action |
|-------|-------------|---------|--------|
| **A+** | 95--100 | Prêt à publier, qualité exemplaire | Publier avec confiance. Utiliser comme exemple de référence pour le contenu futur. |
| **A** | 90--94 | Excellent, révision minime nécessaire | Publier. Peaufinage mineur optionnel pour la perfection. |
| **A-** | 85--89 | Très bon, peaufinage mineur recommandé | Publier après avoir traité les éléments signalés. Révisions de faible priorité. |
| **B+** | 80--84 | Bonne qualité, certaines améliorations valent la peine | Revoir les éléments signalés. Publier si le calendrier est serré ; réviser si possible. |
| **B** | 75--79 | Acceptable, revoir les éléments signalés | Réviser les éléments signalés avant publication. La plupart du contenu atterrit ici au premier brouillon. |
| **B-** | 70--74 | Sous la moyenne, révision recommandée | Réviser avant publication. Vérifier quelles dimensions tirent le score vers le bas. |
| **C+** | 65--69 | Médiocre, révision significative nécessaire | Ne pas publier sans révision. Identifier les 2-3 dimensions les plus faibles et les traiter. |
| **C** | 60--64 | Faible, problèmes majeurs présents | Révision substantielle requise. Envisager de ré-aborder sous un angle différent. |
| **C-** | 55--59 | Très faible, réécriture substantielle nécessaire | Territoire proche de la réécriture. Vérifier si le brief de contenu était suffisamment clair. |
| **D** | 40--54 | Échec, ne pas publier sans révision majeure | Réécrire depuis zéro avec un brief plus clair et un matériau source plus solide. |
| **F** | En dessous de 40 | Rejet automatique, problèmes de qualité fondamentaux | Bloqué par la porte de rejet automatique. Le contenu n'est pas récupérable par révision. Recommencer. |

**Conseil pratique** : La plupart des premiers brouillons des agents obtiennent un score dans la plage B à B+ (75-84). Deux rondes de révision ciblée amènent typiquement le contenu dans la plage A- à A. Si un premier brouillon obtient moins de C+ (65), le problème est généralement un brief peu clair ou un contexte manquant, pas seulement du peaufinage.

---

## 4. Méthodologie de détection d'hallucination

Le hallucination-detector utilise une correspondance de motifs heuristique pour identifier le contenu qui pourrait contenir des faits fabriqués. Il est délibérément prudent -- il signale les problèmes potentiels pour revue humaine plutôt que de laisser passer silencieusement des affirmations douteuses.

### Ce qu'il détecte

- **Statistiques fabriquées sans citations** : Pourcentages, montants en dollars, multiplicateurs, et ratios qui apparaissent sans attribution dans les 2 phrases
- **URL de substitution** : `example.com`, `your-site.com`, `brand.com`, et motifs similaires
- **Superlatifs non étayés** : « meilleur », « leader », « top », « n°1 » sans preuve qualifiante
- **Citations d'entités inventées** : « Une étude de Harvard a trouvé... », « Selon Forrester... » quand aucune source réelle n'est fournie
- **Nuance manquante sur les affirmations prospectives** : Prédictions et projections énoncées comme des faits sans « attendu », « projeté », « estimé »

### Ce qu'il ne peut pas détecter

Ceci est essentiel à comprendre. Le détecteur identifie des *motifs* qui corrèlent avec l'hallucination. Il ne peut pas vérifier l'exactitude factuelle.

- **Statistiques factuellement incorrectes mais plausibles** : « 23 % des marketeurs utilisent l'IA » est plausible mais pourrait être 27 % ou 19 %. Le détecteur voit un pourcentage cité et le laisse passer.
- **Données obsolètes présentées comme actuelles** : Une statistique de 2021 avec une citation de 2021 paraît valide pour le détecteur même si les données sont périmées.
- **Représentations erronées subtiles** : Données sélectionnées avec parti pris, comparaisons trompeuses, ou citations hors contexte.
- **Inexactitudes spécifiques au domaine** : Jargon sectoriel utilisé incorrectement, affirmations techniques qui sonnent juste mais sont fausses.

### Scénarios de faux positifs

- **Statistiques légitimes avec citation dans un paragraphe différent** : Le détecteur vérifie dans une fenêtre de 2 phrases. Si la citation est à 3 phrases ou plus, il pourrait signaler la statistique.
- **Superlatifs intentionnels dans du contenu d'opinion/éditorial** : « Notre meilleur trimestre jamais » dans une lettre du PDG est légitime mais peut déclencher le détecteur de superlatif.
- **Noms de marque qui ressemblent à des substituts** : Une marque littéralement nommée « YourBrand » ou « CompanySite » déclenchera les motifs de substitution.

### Réduire les faux positifs

1. Toujours citer les sources dans les 2 phrases de toute statistique
2. Utiliser des formules d'attribution explicites : « selon », « d'après », « sur la base de », « comme rapporté par »
3. Ajouter des dates aux affirmations sensibles au temps : « Au T4 2025, les conversions ont augmenté de 47 % »
4. Utiliser un langage nuancé pour les projections : « projeté à atteindre », « attendu à croître », « estimé à »
5. Qualifier les superlatifs : « la plateforme leader de notre catégorie » plutôt que simplement « la plateforme leader »

---

## 5. Vérification des affirmations

Le claim-verifier extrait les affirmations vérifiables du contenu et les fait correspondre de manière floue à un fichier de preuves fourni par l'utilisateur. C'est la seule dimension d'évaluation qui nécessite une entrée externe (le JSON de preuves).

### Préparer les fichiers de preuves

Les fichiers de preuves sont en JSON avec cette structure :

```json
{
    "evidence": [
        {
            "claim": "50% increase in conversions",
            "source": "GA4 Q4 2025 report",
            "date": "2025-12-31",
            "verified": true
        },
        {
            "claim": "Trusted by 500+ companies",
            "source": "CRM customer count",
            "date": "2025-11-15",
            "verified": true
        }
    ]
}
```

Chaque élément a besoin de : `claim` (le texte de l'affirmation tel que vous l'écririez), `source` (d'où viennent les données), `date` (quand cela a été vérifié), et `verified` (booléen -- est-ce confirmé ?).

### Construire une bibliothèque de preuves

Construisez votre fichier de preuves progressivement à partir de sources de données réelles :

- **Analytics** : Exporter les métriques clés depuis GA4, Search Console, plateformes publicitaires. Enregistrer les chiffres exacts avec les dates.
- **Prix/Certifications** : Documenter le nom du prix, l'organisme décernant, la date de réception, et toute expiration.
- **Nombre de clients** : Extraire du CRM. Mettre à jour trimestriellement.
- **Affirmations financières** : Utiliser les rapports financiers officiels. Marquer clairement s'il s'agit d'estimations vs de chiffres réels.
- **Témoignages** : Enregistrer le nom du client, la citation, la date, et le statut de consentement.
- **Affirmations de performance** : Capturer en écran ou exporter le rapport spécifique qui étaye chaque affirmation.

### Niveaux de confiance de correspondance

| Niveau | Score de correspondance floue | Statut de preuve | Signification |
|-------|-------------------|-----------------|---------|
| **Vérifié** | 0,80 ou plus | `verified: true` | L'affirmation correspond à la preuve et la preuve est confirmée |
| **Partiellement vérifié** | 0,60--0,79 | Tout | L'affirmation est similaire à la preuve mais pas une correspondance exacte. Les chiffres peuvent différer légèrement. |
| **Non vérifié** | En dessous de 0,60 ou aucune correspondance | N/A | Aucune preuve trouvée pour cette affirmation. Elle pourrait être vraie mais n'est pas documentée. |
| **Contredit** | 0,60 ou plus | Les chiffres entrent en conflit | L'affirmation correspond au texte de preuve mais les chiffres sont différents (par ex., « augmentation de 50 % » vs la preuve montrant « augmentation de 32 % »). |

### Bonnes pratiques

- Mettre à jour les fichiers de preuves trimestriellement -- des preuves obsolètes mènent à de faux résultats « non vérifiés »
- Inclure la date pour chaque élément de preuve afin que les affirmations sensibles au temps puissent être signalées à leur expiration
- Marquer explicitement les affirmations expirées (définir `verified: false` avec une note) plutôt que de les supprimer
- Stocker les fichiers de preuves à `~/.claude-marketing/brands/{slug}/evidence/` pour la persistance à travers les sessions
- Séparer les preuves par domaine : `evidence-metrics.json`, `evidence-awards.json`, `evidence-customers.json`

---

## 6. Validation de la sortie

Le output-validator vérifie le contenu par rapport à des schémas structurels. Il vérifie que les sections requises sont présentes, que le nombre de mots est dans les limites, que les règles de formatage sont suivies, et qu'aucun texte de substitution ne demeure.

### Schémas intégrés

| Schéma | Sections requises | Mots min | Mots max | Règles de format |
|--------|-------------------|-----------|-----------|--------------|
| `blog_post` | title, introduction, body, conclusion | 300 | -- | has_headings, has_paragraphs |
| `email` | subject_line, body, cta | 50 | -- | has_cta, has_subject |
| `ad_copy` | headline, body, cta | 10 | 150 | has_cta |
| `social_post` | body | 5 | 500 | -- |
| `landing_page` | headline, value_proposition, body, cta | 100 | -- | has_headings, has_cta |
| `press_release` | headline, dateline, body, boilerplate, contact | 200 | -- | has_headings, has_paragraphs |
| `content_brief` | objective, target_audience, key_messages, outline | 100 | -- | has_headings |
| `campaign_plan` | objective, strategy, channels, timeline, budget, kpis | 300 | -- | has_headings, has_paragraphs |

### Créer des schémas personnalisés

Sauvegardez un fichier JSON avec votre schéma personnalisé et passez-le via `--custom-schema` :

```json
{
    "required_sections": ["headline", "hero_copy", "features", "testimonials", "pricing", "cta"],
    "min_words": 200,
    "max_words": 1500,
    "format_rules": ["has_headings", "has_cta", "has_paragraphs"],
    "description": "SaaS product page with pricing table"
}
```

### Détection de section

Le validateur utilise une correspondance floue sur les titres markdown (`##`, `###`) et les labels en gras (`**Nom de la section**`) pour identifier les sections. Le mappage `SECTION_ALIASES` gère les variations courantes (par ex., « intro » correspond à « introduction », « prochaines étapes » correspond à « cta »).

### Échecs de validation courants

- **CTA manquants** : L'échec le plus fréquent. Toujours inclure une section d'appel à l'action explicite même dans le contenu informationnel.
- **Texte de substitution laissé en place** : `[Insérer le nom de l'entreprise]`, `{marque}`, `Lorem ipsum`, `TBD` déclenchent tous des déductions.
- **Violations de nombre de mots** : Texte publicitaire dépassant 150 mots, articles de blog sous 300 mots. Vérifier les limites du schéma avant de rédiger.
- **Sections requises manquantes** : Les communiqués de presse manquent couramment la section boilerplate ou contact. Les plans de campagne sautent souvent la section des KPI.

---

## 7. Suivi de qualité et régression

Le quality-tracker persiste chaque résultat d'évaluation et calcule des statistiques mobiles. C'est ainsi que vous détectez la dérive de qualité dans le temps.

### Comment fonctionnent les références

- Les références sont calculées comme la **moyenne mobile sur 30 jours** par type de contenu par dimension de notation
- Un minimum de 5 évaluations est requis avant qu'une référence ne soit établie
- Les références se mettent à jour automatiquement à chaque fois qu'une nouvelle évaluation est journalisée
- Stockage : `~/.claude-marketing/brands/{slug}/quality/evals/eval-{timestamp}.json`

### Alertes de régression

Une régression est signalée quand l'une ou l'autre condition est remplie :

1. **Chute de moyenne mobile** : La moyenne des 5 dernières évaluations pour toute dimension chute de plus de **10 points** en dessous de la référence sur 30 jours
2. **Pic sur une seule dimension** : Toute évaluation unique obtient un score de plus de **15 points** en dessous de la référence pour une dimension

### Interpréter les tendances

Utilisez `quality-tracker.py --action get-trends --days 30` pour voir les compartiments hebdomadaires :

- **En amélioration** : La moyenne hebdomadaire augmente de 3 points ou plus par semaine pendant 2 semaines consécutives ou plus
- **Stable** : La moyenne hebdomadaire est à +/- 3 points de la référence
- **En déclin** : La moyenne hebdomadaire chute de 3 points ou plus par semaine pendant 2 semaines consécutives ou plus

### Agir sur la régression

Quand une alerte de régression se déclenche, investiguer dans cet ordre :

1. **Changements récents de prompt** : Les instructions d'un agent ont-elles changé ? Une mise à jour de workflow a-t-elle modifié la manière dont le contenu est généré ?
2. **Mises à jour du profil de marque** : Le profil de voix de marque a-t-il été modifié ? Le secteur ou le ciblage d'audience a-t-il changé ?
3. **Changements d'instruction d'agent** : Des fichiers markdown d'agent ont-ils été édités récemment ?
4. **Obsolescence du fichier de preuves** : Les scores de vérification des affirmations chutent-ils parce que les preuves sont obsolètes ?
5. **Changement de type de contenu** : Générez-vous davantage d'un type de contenu qui obtient naturellement un score plus bas (par ex., publications sociales courtes vs longs articles de blog) ?

---

## 8. Intégration avec le flux d'approbation

Le système d'évaluation est câblé dans le cadre d'approbation documenté dans `approval-framework.md`.

### Évaluation automatique durant l'exécution

- L'agent `execution-coordinator` appelle `eval-runner.py --action run-quick` avant de créer un enregistrement d'approbation pour tout contenu
- La note d'évaluation est incluse dans l'enregistrement d'approbation afin que les relecteurs humains aient un contexte de qualité
- Si le score composite tombe en dessous du **seuil de rejet automatique** (40 par défaut, configurable via eval-config-manager), l'exécution est bloquée automatiquement

### Notation de contenu durant la rédaction

Exécutez `hallucination-detector.py` sur les brouillons au fur et à mesure que vous écrivez, pas seulement au moment de l'évaluation finale — une passe légère détecte tôt les indicateurs évidents de fabrication (URL de substitution, statistiques inventées, superlatifs non attribués). (Ce plugin ne fournit aucun hook par conception ; les compétences demandent à l'agent d'exécuter cette vérification avant que le contenu n'avance, et vous pouvez câbler vous-même un hook PreToolUse de portée utilisateur si vous voulez l'automatiser.)

### Intégration de l'enregistrement d'approbation

Chaque enregistrement d'approbation inclut :
- `eval_grade` : La note en lettre de l'évaluation la plus récente
- `eval_composite` : Le score composite numérique
- `eval_flags` : Tableau des problèmes spécifiques signalés par tout évaluateur
- `eval_timestamp` : Quand l'évaluation a été exécutée

Les relecteurs humains devraient porter une attention particulière aux éléments où `eval_flags` n'est pas vide, même si le score composite est acceptable.

---

## 9. Recommandations de configuration d'évaluation

Utilisez `eval-config-manager.py` pour ajuster les pondérations et seuils par marque.

### Par secteur

| Secteur | Hallucination | Vérification des affirmations | Qualité de contenu | Voix de marque | Structure | Lisibilité |
|----------|--------------|-------------------|----------------|-------------|-----------|-------------|
| Santé | 0,30 | 0,25 | 0,15 | 0,15 | 0,10 | 0,05 |
| Services financiers | 0,25 | 0,25 | 0,15 | 0,15 | 0,10 | 0,10 |
| Services juridiques | 0,25 | 0,25 | 0,15 | 0,15 | 0,15 | 0,05 |
| Technologie B2B | 0,15 | 0,15 | 0,30 | 0,15 | 0,10 | 0,15 |
| Consommation/Style de vie | 0,15 | 0,10 | 0,20 | 0,25 | 0,10 | 0,20 |
| E-commerce | 0,20 | 0,15 | 0,20 | 0,20 | 0,15 | 0,10 |
| Éducation | 0,25 | 0,20 | 0,20 | 0,10 | 0,15 | 0,10 |

### Par type de contenu

| Type de contenu | Hallucination | Vérification des affirmations | Qualité de contenu | Voix de marque | Structure | Lisibilité |
|-------------|--------------|-------------------|----------------|-------------|-----------|-------------|
| Texte publicitaire | 0,30 | 0,15 | 0,20 | 0,20 | 0,05 | 0,10 |
| Articles de blog | 0,20 | 0,15 | 0,25 | 0,20 | 0,10 | 0,10 |
| Communiqués de presse | 0,20 | 0,25 | 0,15 | 0,15 | 0,15 | 0,10 |
| Publications sociales | 0,25 | 0,10 | 0,20 | 0,25 | 0,05 | 0,15 |
| Pages d'atterrissage | 0,20 | 0,20 | 0,20 | 0,15 | 0,15 | 0,10 |
| E-mails | 0,20 | 0,15 | 0,20 | 0,20 | 0,15 | 0,10 |
| Plans de campagne | 0,10 | 0,10 | 0,30 | 0,10 | 0,25 | 0,15 |

### Par maturité de marque

- **Nouvelles marques** (30 premiers jours) : Utiliser des seuils minimums plus bas (50-60) pendant la construction des références. Se concentrer sur l'établissement d'une production de contenu cohérente avant de resserrer les portes de qualité. Définir le rejet automatique à 35.
- **Marques en croissance** (30-90 jours) : Augmenter progressivement les seuils minimums (60-70) à mesure que les références se stabilisent. Commencer à appliquer les scores de voix de marque. Définir le rejet automatique à 40.
- **Marques établies** (90+ jours) : Utiliser des seuils plus élevés (70-80) avec une application stricte. Les alertes de régression devraient déclencher une investigation immédiate. Définir le rejet automatique à 45-50.

---

## 10. Limitations du LLM comme juge

Le système d'évaluation utilise des heuristiques déterministes (correspondance de motifs, correspondance floue, comptage de mots) plutôt qu'un jugement basé sur LLM pour la notation. C'est intentionnel -- les vérifications déterministes sont cohérentes, rapides, et gratuites. Cependant, cela signifie que le système d'évaluation a des angles morts inhérents.

### Ce qui nécessite encore un jugement humain

- **Exactitude factuelle spécifique au domaine** : Cette allégation médicale est-elle réellement correcte ? Cette interprétation juridique est-elle solide ? Le système d'évaluation vérifie si les affirmations sont *citées*, pas si elles sont *vraies*.
- **Adéquation culturelle** : Ton, humour, et références qui peuvent être inappropriés pour des contextes culturels spécifiques. Aucune heuristique ne peut détecter cela de manière fiable.
- **Alignement stratégique** : Ce contenu soutient-il l'objectif de campagne ? Est-il positionné correctement face aux concurrents ? Ce sont des questions stratégiques au-delà de la correspondance de motifs.
- **Qualité et originalité créative** : Ce contenu est-il véritablement perspicace, ou est-ce un remaniement compétent d'idées existantes ? La créativité n'est pas notable par heuristique.
- **Résonance émotionnelle** : Ce contenu connecte-t-il avec le lecteur émotionnellement ? L'engagement se ressent, il ne se mesure pas par des motifs de mots.

### L'agent d'assurance qualité

L'agent `quality-assurance` ajoute un raisonnement basé sur LLM par-dessus les scores des scripts. Il lit les résultats d'évaluation, examine les éléments signalés, et fournit un commentaire qualitatif. Cela ajoute une nuance que les scripts ne peuvent pas fournir -- mais les jugements de l'agent devraient être vérifiés pour le contenu à fort enjeu car le raisonnement LLM peut lui-même être incohérent.

### Flux de travail recommandé

1. **Évaluation automatisée d'abord** : Exécuter `eval-runner.py` pour obtenir des scores quantitatifs et des éléments signalés
2. **Revue par l'agent pour les éléments signalés** : Laisser l'agent d'assurance qualité analyser tout signalement ou dimension à faible score
3. **Revue humaine pour le contenu à fort enjeu** : Tout contenu réglementé, à forte dépense, ou à forte visibilité devrait recevoir des yeux humains indépendamment du score
4. **Approbation finale** : Utiliser le flux d'approbation pour confirmer la préparation à la publication

---

## 11. Test A/B de prompt

Le prompt-ab-tester suit la performance des variantes dans le temps. Utilisez-le quand vous voulez comparer différentes approches à la même tâche de contenu.

### Quand tester

- **Objets d'e-mail** : « Bénéfice direct » vs « écart de curiosité » vs « basé sur une question »
- **Titres** : Angles différents sur le même sujet
- **CTA** : « Démarrer l'essai gratuit » vs « Voir la tarification » vs « Réserver une démo »
- **Approches de corps d'e-mail** : Narration longue vs puces courtes
- **Styles de texte publicitaire** : Axé fonctionnalité vs axé bénéfice vs axé preuve sociale

### Configurer un test

```
python prompt-ab-tester.py --action create-test --test-name email-subject-q1 \
    --data '{"description":"Testing email subject line styles for Q1 campaign"}'
```

### Journaliser les variantes

Exécutez chaque variante à travers `eval-runner.py`, puis journalisez les scores :

```
python prompt-ab-tester.py --action log-variant --test-name email-subject-q1 \
    --variant A --data '{"description":"Direct benefit","scores":{"content_quality":85,"brand_voice":78,"composite":82}}'

python prompt-ab-tester.py --action log-variant --test-name email-subject-q1 \
    --variant B --data '{"description":"Question-based","scores":{"content_quality":78,"brand_voice":82,"composite":80}}'
```

### Tailles d'échantillon minimales

| Taille d'échantillon | Fiabilité |
|-------------|-------------|
| 1--4 évaluations par variante | Insuffisant. Les résultats sont anecdotiques. |
| 5--9 évaluations par variante | Signal directionnel. Utile pour éliminer les variantes clairement inférieures. |
| 10+ évaluations par variante | Comparaison fiable. Les différences de 5 points ou plus sont significatives. |

### Interpréter les résultats

- **Différence de plus de 10 points** : Significative. La variante à score plus élevé est meaningfully meilleure.
- **Différence de 5 à 10 points** : Probablement significative. Utiliser la variante à score plus élevé mais envisager de retester avec plus d'échantillons.
- **Différence de moins de 5 points** : Non concluant. Les variantes sont effectivement équivalentes. Choisir selon la préférence stratégique.

### Bonnes pratiques

1. **Tester une variable à la fois** : Si vous changez à la fois le titre et le CTA, vous ne pouvez pas attribuer les différences de score à l'un ou l'autre changement.
2. **Utiliser des critères d'évaluation cohérents** : Toutes les variantes d'un test devraient utiliser le même type d'évaluation (run-full, run-quick) avec les mêmes pondérations.
3. **Journaliser toutes les variantes** : Même les variantes perdantes ont de la valeur. Elles montrent ce qui ne fonctionne pas et informent la stratégie de contenu future.
4. **Nommer les tests de manière descriptive** : `email-subject-q1-curiosity-vs-benefit` est meilleur que `test-1`.
5. **Archiver les tests terminés** : Utiliser les résultats pour mettre à jour les guidelines de contenu et informer les futurs tests A/B.

---

## Référence rapide : commandes de script

```bash
# Full eval with all options
python eval-runner.py --action run-full --file draft.md --evidence claims.json --schema blog_post --brand acme --log

# Quick eval during drafting
python eval-runner.py --action run-quick --text "Your draft content..."

# Compliance eval for regulated content
python eval-runner.py --action run-compliance --file page.md --evidence facts.json --schema landing_page

# Standalone hallucination check
python hallucination-detector.py --action detect --file draft.md

# Extract claims without verifying
python claim-verifier.py --action extract-claims --text "We grew revenue by 3x..."

# Verify claims against evidence
python claim-verifier.py --action verify --file draft.md --evidence evidence.json

# Validate structure against schema
python output-validator.py --action validate --file page.md --schema landing_page

# List available schemas
python output-validator.py --action list-schemas

# Get quality trends for last 30 days
python quality-tracker.py --action get-trends --days 30

# Check for quality regression
python quality-tracker.py --action check-regression

# Get current eval config
python eval-config-manager.py --action get-config

# Set hallucination threshold for ad copy
python eval-config-manager.py --action set-threshold --dimension hallucination --threshold 80 --content-type ad_copy

# Create an A/B test
python prompt-ab-tester.py --action create-test --test-name headline-test --data '{"description":"Testing headline styles"}'

# Get A/B test results
python prompt-ab-tester.py --action get-results --test-name headline-test
```

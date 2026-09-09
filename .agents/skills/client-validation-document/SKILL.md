---
name: client-validation-document
description: "Produire le document de validation client de la Partie 5 — l'unique point d'arrêt obligatoire de l'engagement en 12 parties où les constats v1 non biaisés des Parties 2 à 4 sont compilés en 12 à 25 blocs de constats étayés par des preuves, chacun en attente d'une décision client ACCEPTER / REJETER / MODIFIER / DIFFÉRER, accompagné d'un modèle de réponse JSON. Les réponses enregistrées alimentent la Matrice de décision de la Partie 6 (engagement-state.py) pour déterminer les relances v2. Se déclenche sur \"/digital-marketing-pro:client-validation-document\", \"prépare les constats v1 pour la revue client\", \"lance la partie 5 validation client\", \"l'unique point d'arrêt obligatoire\", \"enregistre les réponses de validation du client\". Nécessite que les Parties 3-4 soient marquées comme terminées dans _engagement.json ; lit les huit documents de base v1 ; s'utilise avec /digital-marketing-pro:engagement-workflow et /digital-marketing-pro:four-core-documents."
user-invocable: true
triggers:
  - produce client validation document
  - run part 5 client validation
  - prepare findings for client review
  - client validation deliverable
  - the one true stop
  - prepare v1 findings for client
allowed-tools: Read Write Edit Bash Glob Grep
engagement-part: "5"
view-preference: v1-only
---

# /digital-marketing-pro:client-validation-document — Partie 5 : l'unique point d'arrêt obligatoire

Cette compétence produit le livrable de la Partie 5 : le Document de validation client. C'est l'unique moment de l'engagement où les constats v1 non biaisés sont formellement présentés au client pour des décisions d'acceptation/rejet/modification.

## Efficacité contextuelle

Compétence lourde. **Grep avant Read** pour tout fichier référencé, puis `Read` uniquement les plages correspondantes avec `offset` + `limit`. Lister `${CLAUDE_PLUGIN_DATA}/<brand>/` avant d'ouvrir des fichiers. En cas de réinvocation en cours de session, ignorer les fichiers déjà en contexte.

C'est **l'unique point d'arrêt obligatoire** du flux en 12 parties. Rien dans les Parties 6+ ne progresse tant que cette étape n'est pas validée.

## Ce qu'est ce document

Le Document de validation client compile les constats les plus stratégiquement déterminants issus des Parties 2, 3 et 4 (la recherche non biaisée et les quatre documents de base) dans un document de revue structuré. Pour chaque constat :

- Le constat lui-même
- Preuves / sources
- Implication proposée en cas d'acceptation
- Trois options de réponse pour le client : ACCEPTER / REJETER / MODIFIER / DIFFÉRER
- (En cas de REJET ou de MODIFICATION) — le client fournit sa version corrigée et sa justification

Les réponses du client alimentent ensuite la Matrice de décision de la Partie 6 pour déterminer les relances v2 nécessaires.

## Ce que ce document N'EST PAS

- **Ce n'est pas un Plan de croissance.** Ce sont des constats de recherche, pas des recommandations stratégiques déguisées. Le Plan de croissance est la Partie 8.
- **Ce n'est pas exhaustif.** Il n'inclut que les constats ayant des implications stratégiques matérielles. Le détail se trouve dans les documents sources.
- **Ce n'est pas un jeu de diapositives.** C'est un document écrit que le client lit attentivement et auquel il répond. Des diapositives ne peuvent pas capturer la rigueur requise.
- **Ce n'est pas optionnel.** Chaque engagement exécute la Partie 5. Aucun raccourci vers la Partie 6 sans elle.

## Pré-conditions

Avant d'exécuter cette compétence :

1. Les Parties 2, 3, 4 doivent être terminées (ou substantiellement terminées avec reconnaissance explicite que certaines recherches se poursuivent)
2. Le fichier d'état de l'engagement `_engagement.json` doit indiquer les Parties 3 et 4 comme `completed`
3. Le fichier d'instructions vivant du projet doit être à jour avec les faits stratégiques v1

Si les pré-conditions échouent, NE PAS produire de sortie. Indiquer à l'utilisateur ce qui manque.

## Structure du document

Le Document de validation client est organisé par catégorie de constat. Chaque catégorie compte 3 à 8 constats ; le document total compte généralement 12 à 25 constats répartis dans les catégories.

### Section 1 : Briefing exécutif

**Longueur :** 1 page.

**Contenu :**

- Objet de ce document
- Comment le lire (le cadre ACCEPTER / REJETER / MODIFIER / DIFFÉRER)
- Ce qui se passe après la réponse du client (relances v2 de la Partie 6 régies par la Matrice de décision)
- Date limite de décision (généralement 7 à 14 jours)

### Section 2 : Constats — par catégorie

Chaque catégorie contient ses constats sous forme de blocs structurés. Catégories :

#### A. Constats sur l'entreprise et les SBU (issus de 3.1)

Constats sur la réalité de l'entreprise — séparation des SBU, économie unitaire, chaîne de valeur, leviers de croissance, contraintes, risques. Généralement 3 à 5 constats.

#### B. Constats sur l'audience et la segmentation (issus de 3.2 + 4.3)

Constats sur les groupes cibles, la priorisation des personas, les unités de décision d'achat, les définitions MQL/SQL. Généralement 3 à 5 constats.

#### C. Constats sur le positionnement et la communication (issus de 3.3)

Le positionnement retenu, les piliers de messagerie, le ton de voix, les règles de « à ne pas dire », la gestion des sujets sensibles. Généralement 3 à 5 constats.

#### D. Constats sur les canaux et le budget (issus de 3.4)

Sélections de canaux, répartition in-market vs out-market, allocation budgétaire, séquencement des canaux. Généralement 2 à 4 constats.

#### E. Constats concurrentiels (issus de 4.1 + 4.2)

Liste des concurrents, positionnement concurrentiel, résultats de la méthode des Trois Questions (bien faire / mal faire / ne pas faire). Généralement 2 à 4 constats.

#### F. Constats sur le marché et les clients (issus de 4.3 + 4.4)

Dimensionnement du marché, schémas de comportement client, signaux de demande. Généralement 2 à 4 constats.

### Section 3 : Questions ouvertes

Questions que la recherche non biaisée n'a pas pu résoudre et qui nécessitent l'apport du client. Le client fournit les réponses ici.

### Section 4 : Mécanisme de réponse

Comment le client renvoie ses réponses (généralement un fichier de réponse structuré ou un passage en revue en réunion).

## Format du bloc de constat

Chaque constat suit exactement cette structure :

```markdown
### Finding {ID}: {Short title}

**Category:** {A/B/C/D/E/F}
**Source:** {Document and step references — e.g., "3.1 Step 4, 4.1 Three-Question Output"}
**Materiality:** {High / Medium / Low}

**Finding:**
{2–4 sentences stating the finding from the unbiased research}

**Evidence:**
- {Cited source 1 with specific data point}
- {Cited source 2}
- {Cited source 3}

**Proposed implication if accepted:**
{1–3 sentences on what this means for the strategy if the client accepts}

**Client response:**

- [ ] ACCEPT — finding is correct as stated
- [ ] REJECT — finding is wrong; correction below
- [ ] EDIT — finding is partially correct; amended version below
- [ ] DEFER — needs further investigation; reason below

**If REJECT or EDIT, client correction:**
{Client fills in: what the correct finding is, with their evidence}

**If DEFER, reason and follow-up plan:**
{Client fills in: what additional research / data is needed, who is accountable, deadline}
```

## Classification de la matérialité

Chaque constat reçoit une note de Matérialité indiquant l'importance de la réponse :

- **Élevée** — accepter ou rejeter changerait significativement le mix de canaux, le budget, le positionnement ou la priorité d'audience. Déclenche des relances v2 selon la Matrice de décision.
- **Moyenne** — accepter ou rejeter changerait l'exécution tactique mais pas la direction stratégique. Peut ou non déclencher des relances.
- **Faible** — accepter ou rejeter change la formulation ou les exemples mais pas le fond. Aucune relance déclenchée.

Le client doit concentrer le plus d'attention sur les constats de Matérialité élevée ; les constats de matérialité Moyenne et Faible sont tout de même présentés pour l'exhaustivité.

## Catégorisation des réponses pour la Matrice de décision

Après que le client a fourni ses réponses, celles-ci sont catégorisées en déclencheurs de la Matrice de décision :

| Modèle de décision client | Déclencheur de la Matrice de décision |
|---|---|
| Tout constat concurrentiel REJETÉ ou MODIFIÉ avec de nouveaux concurrents | `competitors_changed` |
| Tout constat de dimensionnement de marché REJETÉ ou MODIFIÉ | `target_market_changed` |
| Tout constat de segmentation REJETÉ ou MODIFIÉ avec changements de persona | `audiences_changed` |
| Tout constat de positionnement REJETÉ ou MODIFIÉ | `positioning_changed` |
| Tout constat de budget/périmètre REJETÉ ou MODIFIÉ | `budget_or_scope_changed` |
| Tout constat de tarification ou d'offre REJETÉ ou MODIFIÉ | `pricing_or_offering_changed` |
| Tout constat d'économie unitaire REJETÉ ou MODIFIÉ | `unit_economics_changed` |
| Uniquement des MODIFICATIONS de faible matérialité / corrections mineures de formulation | `minor_corrections_only` |

La compétence compile la liste des déclencheurs et exécute :

```bash
python ${CLAUDE_PLUGIN_ROOT}/scripts/engagement-state.py decision-matrix \
  --brand {slug} --id {id} \
  --triggers "{comma-separated-trigger-list}"
```

Le résultat alimente ensuite le plan de relance v2 de la Partie 6.

## Étapes de production

1. **Vérifier les pré-conditions** — Parties 2, 3, 4 terminées.

2. **Lire les documents sources v1 :**
   - `part-03-four-core-documents/v1/3.1-business-and-sbu-analysis.md`
   - `part-03-four-core-documents/v1/3.2-segmentation-framework.md`
   - `part-03-four-core-documents/v1/3.3-brand-positioning-and-communications.md`
   - `part-03-four-core-documents/v1/3.4-dmflow.md`
   - `part-04-competitive-customer-market/v1/4.1-competitor-ad-analysis.md`
   - `part-04-competitive-customer-market/v1/4.2-competitor-positioning.md`
   - `part-04-competitive-customer-market/v1/4.3-customer-analysis.md`
   - `part-04-competitive-customer-market/v1/4.4-market-analysis.md`

3. **Extraire les constats matériels.** Pour chaque document source, identifier les 2 à 5 constats les plus stratégiquement déterminants. Note de matérialité : privilégier Élevée et Moyenne ; n'inclure Faible que si le client en bénéficie spécifiquement en confirmant.

4. **Synthétiser les constats dans le format structuré.** Utiliser un langage clair orienté client, pas de jargon interne. Chaque constat doit se suffire à lui-même — ne pas exiger du client qu'il lise les documents sources.

5. **Ajouter la section Questions ouvertes** tirée des sections « Questions ouvertes » de chaque document source.

6. **Ajouter la section mécanisme de réponse** — indiquer au client comment renvoyer ses réponses (recommandé : produire un fichier `client-validation-responses.json` apparié au document).

7. **Enregistrer le document** dans :
   ```
   engagements/{id}/part-05-client-validation/client-validation-document.md
   ```

8. **Générer le modèle de réponse :**
   ```
   engagements/{id}/part-05-client-validation/client-validation-responses.template.json
   ```
   Contenant une entrée par constat avec des champs décision/correction vides.

9. **Marquer la Partie 5 comme `awaiting_input`** dans `_engagement.json` (pas `completed` — la Partie 5 n'est terminée que lorsque les réponses du client sont enregistrées).

10. **Informer l'utilisateur** du document, du mécanisme de réponse et de la fenêtre de décision typique de 7 à 14 jours.

## Enregistrement des réponses du client

Lorsque le client renvoie ses réponses (fichier JSON rempli ou passage en revue oral capturé en réunion) :

1. Enregistrer le fichier de réponse rempli dans :
   ```
   engagements/{id}/part-05-client-validation/client-validation-responses.json
   ```

2. Exécuter `engagement-state.py decision-matrix --validation-file <path>` pour déterminer le plan de relance v2.

3. Marquer la Partie 5 comme `completed`.

4. Passer à la Partie 6 (relances v2).

## Discipline qualité

1. **Langage client clair.** Pas de jargon « pipeline MQL/SQL architecture d'entonnoir ». Traduire en « la façon dont les prospects passent d'intéressés à prêts à acheter ».
2. **Chaque constat se suffit à lui-même.** Le client ne doit pas avoir besoin de consulter les documents sources pour comprendre le constat.
3. **Les preuves sont citées explicitement.** Les affirmations vagues (« les données de marché montrent... ») sont inacceptables. Citer la source spécifique avec le point de donnée.
4. **La matérialité est honnête.** Ne pas déclasser un constat inconfortable en « Faible » pour le rendre plus facile à accepter.
5. **Les Questions ouvertes sont de vraies questions.** Ne pas fabriquer de questions juste pour avoir une section Questions ouvertes.
6. **Le mécanisme de réponse est structuré.** Les e-mails client en texte libre sont difficiles à traduire en déclencheurs de la Matrice de décision ; le modèle de réponse JSON rend le schéma sans ambiguïté.

## Exemples

### Exemple 1 : Production du document

```
User: We've completed Parts 2, 3, 4 for Acme. Time to prepare the Client Validation Document.

Skill response:
1. Verify pre-conditions ✓
2. Pull findings from the 8 source documents (4 from Part 3 + 4 from Part 4) using grep first to locate each category's section, then targeted Read with offset+limit — avoid bulk-Read on all 8 files up front or you'll blow the per-skill 5K-token budget
3. Extract 18 material findings across categories A–F:
   - 4 in Business & SBU
   - 3 in Audience & Segmentation
   - 4 in Positioning & Communications
   - 3 in Channel & Budget
   - 2 in Competitive
   - 2 in Market & Customer
4. 12 are High materiality, 5 Medium, 1 Low
5. 4 Open Questions identified from source docs
6. Save document at engagements/2026-q2/part-05-client-validation/client-validation-document.md (~22 pages)
7. Save response template at engagements/2026-q2/part-05-client-validation/client-validation-responses.template.json
8. Mark Part 5 as awaiting_input
9. Brief: "Document ready. 18 findings, 4 open questions. Recommend client meeting in 5–7 days for live walk-through, with responses returned within 2 weeks."
```

### Exemple 2 : Enregistrement des réponses du client

```
User: Acme client returned responses. They accepted most but rejected the positioning finding (they want to keep their existing positioning) and added 2 new competitors we missed.

Skill response:
1. Read the populated client-validation-responses.json
2. Categorise responses: 16 ACCEPT, 1 REJECT (positioning), 1 EDIT (competitor list)
3. Determine triggers: positioning_changed + competitors_changed
4. Run engagement-state.py decision-matrix --triggers "positioning_changed,competitors_changed"
5. Output: triggered re-runs = 3.1, 3.2, 3.3, 3.4, 4.1, 4.2 (the union of both triggers' re-run sets)
6. Estimate cost: ~85K tokens
7. Mark Part 5 completed
8. Brief: "Part 5 closed. 6 v2 re-runs triggered. Recommend reviewing the re-run plan and approving before invoking four-core-documents and competitor-analysis with view=v2."
```

## Compétences liées

- `engagement-workflow` — orchestre le flux en 12 parties
- `four-core-documents` — a produit les documents v1 en cours de validation ; produira les relances v2 après la Partie 5
- Compétences/agents existants `competitor-analysis`, `audience-intelligence`, `market-intelligence` ont produit les documents de la Partie 4

## Références liées

- [engagement-flow-methodology.md](../context-engine/engagement-flow-methodology.md) — la Partie 5 en contexte
- [decision-matrix-rerun.md](../context-engine/decision-matrix-rerun.md) — comment les réponses se traduisent en relances
- [two-views-model.md](../context-engine/two-views-model.md) — architecture v1 + v2
- [stone-vs-opinion.md](../context-engine/stone-vs-opinion.md) — contexte du marquage de confiance

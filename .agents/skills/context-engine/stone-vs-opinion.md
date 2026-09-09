# Stone vs Opinion — Marquage de la fiabilité

Chaque fait recueilli lors de la prise de connaissance client (Partie 1) est étiqueté avec l'un des deux niveaux de fiabilité. Cette séparation est fondamentale pour la méthodologie d'engagement.

## Les deux étiquettes

### Stone (fait avéré)

**Définition :** Ce que le client sait avec certitude. Un fait vérifiable de manière indépendante ou directement observé.

Exemples de Stone :
- « Notre entreprise a été fondée en 2018 » (vérifiable par l'immatriculation)
- « Nous comptons 47 employés en avril 2026 » (vérifiable via les registres RH)
- « Notre chiffre d'affaires annuel l'an dernier était de 12 crores INR » (vérifiable via les comptes financiers)
- « Nous vendons uniquement en Inde et à Singapour » (vérifiable via les opérations)
- « Nos paliers tarifaires sont 999 INR, 4 999 INR, 19 999 INR par mois » (vérifiable via le produit)
- « Nous utilisons HubSpot CRM et Klaviyo pour l'e-mail » (vérifiable via les systèmes)
- « Notre plus gros client est [marque nommée] » (vérifiable via les contrats)
- « Notre panier moyen est de 2 400 INR » (vérifiable via les données de commande)

Les faits Stone sont traités comme une vérité de référence (ground truth) dans la recherche non biaisée (Parties 2 à 4) et dans toutes les compétences en aval.

### Opinion (opinion)

**Définition :** Ce que le client croit. Une affirmation qui peut être vraie mais qui n'a pas été validée de manière indépendante.

Exemples d'Opinion :
- « Nos clients nous adorent pour notre qualité »
- « Nous sommes connus comme l'option la plus abordable de notre catégorie »
- « Notre plus grande opportunité de croissance est le marché du Sud de l'Inde »
- « Notre principal concurrent est [marque nommée] »
- « Nos clients font des recherches pendant 2 semaines avant d'acheter »
- « Notre marque est positionnée comme premium »
- « La plupart de nos clients viennent du bouche-à-oreille »
- « Notre marketing de contenu a été très efficace »

Les faits Opinion sont recueillis mais **explicitement étiquetés comme des hypothèses**. Ils ne sont PAS utilisés comme vérité de référence pendant la phase de recherche non biaisée. Ils deviennent au contraire des **questions de recherche** que les Parties 2 à 4 cherchent activement à valider ou à contredire.

## Pourquoi cette séparation est importante

Sans la séparation Stone vs Opinion, la prise de connaissance client contamine la recherche non biaisée. Le client dit à l'agence « nous sommes positionnés comme premium » — et la recherche non biaisée, au lieu d'évaluer indépendamment la position réelle de la marque sur le marché, produit une analyse confirmatoire qui ne fait que reformuler la croyance du client.

En étiquetant ce même élément de prise de connaissance comme Opinion, la phase de recherche non biaisée est contrainte de répondre : *La marque est-elle réellement positionnée comme premium sur le marché ? Quelles preuves soutiennent ou contredisent cela ?*

Le résultat est une véritable intelligence de marché plutôt qu'un récit client habillé différemment.

## Recueillir Stone vs Opinion dans la Partie 1

La prise de connaissance de la Partie 1 produit deux fichiers :

### `stone-facts.json`

```json
{
  "engagement_id": "acme-2026-q2",
  "captured_at": "2026-05-03T10:00:00Z",
  "facts": [
    {
      "id": "stone-001",
      "category": "company",
      "fact": "Founded in 2018",
      "source": "client statement, validated against MCA records",
      "validation_method": "public-record"
    },
    {
      "id": "stone-002",
      "category": "scale",
      "fact": "47 employees as of April 2026",
      "source": "client HR system",
      "validation_method": "client-document"
    },
    {
      "id": "stone-003",
      "category": "geography",
      "fact": "Sells only in India and Singapore",
      "source": "client statement, confirmed from website footer + product listings",
      "validation_method": "public-source"
    }
  ]
}
```

### `opinion-hypotheses.json`

```json
{
  "engagement_id": "acme-2026-q2",
  "captured_at": "2026-05-03T10:00:00Z",
  "hypotheses": [
    {
      "id": "opinion-001",
      "category": "positioning",
      "hypothesis": "We are positioned as the most affordable option in our category",
      "client_evidence": "client belief, citing customer feedback",
      "research_question": "Is the brand actually positioned as the most affordable in its category? How does pricing compare to top 5 competitors? What do third-party reviews say about price perception?",
      "research_assigned_to": "Part 2 ecosystem scan + Part 4.2 Competitor Positioning"
    },
    {
      "id": "opinion-002",
      "category": "audience",
      "hypothesis": "Our biggest growth opportunity is the South India market",
      "client_evidence": "client intuition, recent enquiry uptick",
      "research_question": "What does the unbiased market sizing say about South India opportunity vs other geographies? What is the competitive density in South India?",
      "research_assigned_to": "Part 4.4 Market Analysis"
    }
  ]
}
```

## Comment la recherche exploite Stone vs Opinion

### Parties 2–4 (Recherche non biaisée)

- Lire `stone-facts.json` — ces éléments sont acceptés comme vérité de référence
- Lire `opinion-hypotheses.json` — ces éléments deviennent des **questions de recherche à valider**
- NE PAS consulter les documents du client (deck, rapports internes, etc.) pendant cette phase
- Utiliser uniquement des sources publiques, des données tierces, des rapports de marché, de l'intelligence concurrentielle
- Produire des constats qui confirment, contredisent ou affinent chaque hypothèse d'opinion

### Partie 5 (Validation client)

Chaque hypothèse d'opinion est présentée au client comme un constat :

> « Vous avez mentionné lors de la prise de connaissance que le Sud de l'Inde est votre plus grande opportunité de croissance. L'analyse de marché non biaisée suggère que l'Ouest de l'Inde et les villes de Tier 2 du Maharashtra offrent un TAM plus important et une densité concurrentielle plus faible. Ce constat nécessite votre validation avant de poursuivre. »

Le client ACCEPTE / REJETTE / MODIFIE alors le constat (avec justification).

### Parties 6 et suivantes (Exploitation)

- Les faits Stone continuent d'être la vérité de référence tout au long de l'engagement
- Les hypothèses d'opinion sont désormais soit :
  - **Validées** (le client et la recherche non biaisée sont d'accord) → traitées comme un fait
  - **Corrigées** (la recherche non biaisée a montré quelque chose de différent et le client a accepté la correction) → traitées comme un fait, signalées comme « initialement énoncé comme opinion, validé comme différent »
  - **Maintenues contre la recherche** (la recherche non biaisée était en désaccord mais le client a insisté) → signalées comme « affirmé par le client, preuves de marché contraires »
  - **Ouvertes** (encore non résolues) → restent une question de recherche

## Stone vs Opinion dans les livrables des compétences

Lorsqu'une compétence cite un fait, elle peut inclure la piste de fiabilité :

> Selon Stone (vérifié via les registres MCA), l'entreprise a été fondée en 2018.

> Selon une Opinion validée (initialement une croyance client, confirmée par l'analyse de positionnement concurrentiel de la Partie 4.2), la marque est positionnée comme une alternative d'entrée de gamme face aux acteurs historiques du segment entreprise.

> Selon une Opinion affirmée par le client (preuves de marché contraires), le marché du Sud de l'Inde est traité comme la géographie de croissance prioritaire. L'équipe doit surveiller si la performance réelle valide cette affirmation d'ici le T1.

Cela rend l'ensemble de l'engagement intellectuellement traçable. Toute personne qui l'examine des mois plus tard peut voir ce qui a été supposé, ce qui a été validé, et où les hypothèses reposent encore uniquement sur la croyance du client.

## Pièges courants à éviter

1. **Traiter l'opinion du client comme un fait pendant la recherche.** Cela contamine le regard non biaisé et produit une analyse confirmatoire plutôt qu'indépendante.
2. **Refuser complètement de recueillir les opinions du client.** Les opinions ont de la valeur — elles révèlent ce que le client croit et ce qu'il souhaite être vrai. Il suffit de les étiqueter clairement.
3. **Reclasser des opinions en Stone après un seul point de donnée confirmant.** La validation exige des preuves significatives, pas une simple anecdote.
4. **Laisser des faits Stone sans citation.** Même les faits Stone ont besoin que leur source soit documentée. « Fondée en 2018 » sans source n'est qu'une opinion de plus.
5. **Oublier de revisiter les opinions non résolues.** Les opinions qui restent « ouvertes » après la Partie 5 doivent être revisitées dans la Partie 12 (amélioration continue) au fur et à mesure que davantage de données s'accumulent.

## Références associées

- [engagement-flow-methodology.md](engagement-flow-methodology.md) — contexte de la Partie 1
- [two-views-model.md](two-views-model.md) — comment les opinions validées alimentent v2
- [living-instruction-file-spec.md](living-instruction-file-spec.md) — où vivent les faits validés

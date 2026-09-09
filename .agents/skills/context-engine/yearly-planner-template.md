# Modèle de planificateur annuel

Le planificateur annuel est le deuxième livrable destiné au client produit dans la partie 8 de la méthodologie d'engagement. Il complète le Growth Plan avec un calendrier opérationnel de 12 mois qui relie la stratégie à une exécution date par date.

Si le Growth Plan répond à *« Comment allons-nous faire croître cette entreprise ? »*, le planificateur annuel répond à *« Que ferons-nous, semaine par semaine, mois par mois ? »*

## Structure

### Section 1 : Thèmes annuels

**Longueur :** 1 page.

**Contenu :**

- Les 4 thèmes trimestriels (un par trimestre) qui organisent le travail marketing de l'année
- Chaque thème énoncé en 1-2 phrases avec un raisonnement stratégique
- Comment les thèmes s'articulent avec le positionnement global (document central 3.3)

Exemple :

> T1 : Éducation de catégorie portée par le fondateur (construire l'autorité avec du leadership éclairé TOFU avant de lancer la génération de demande à l'échelle)
> T2 : Activation de la génération de demande (lancer des campagnes full-funnel ; augmenter la dépense payante avec des créations éprouvées)
> T3 : Expansion de compte + communauté (approfondir les relations avec les comptes acquis ; lancer la communauté client)
> T4 : Récompenses + amplification festive (pic festif dans les segments proches du B2C ; poussée récompenses / presse pour élever la marque)

### Section 2 : Calendrier mensuel

**Longueur :** 12 sous-sections mensuelles, ~1 page chacune.

Pour chaque mois :

- **Thème :** résumé en une phrase du focus du mois
- **Initiatives majeures :** 2 à 4 initiatives précises avec responsable et échéance
- **Activité permanente :** ce qui continue du mois précédent (généralement : publicités payantes à budget fixe, cadence de publication organique, programme e-mail, production de contenu SEO)
- **Dates clés :** lancements de produit, événements sectoriels, jours fériés/festivals pertinents pour la marque, moments de relations presse planifiés
- **Aperçu du calendrier de contenu :** thèmes par semaine, piliers de contenu couverts, volume cible par canal
- **Budget :** dépense fixe mensuelle par canal, réserve de budget variable
- **Objectifs de KPI :** KPI principal + 2-3 KPI secondaires pour le mois

### Section 3 : Stratégie saisonnière

**Longueur :** 1 à 2 pages.

**Contenu :**

- Saisonnalité spécifique au secteur (quand la demande atteint des pics et des creux pour la catégorie de cette marque)
- Saisonnalité culturelle / festive (pertinente pour la géographie de la marque — pour l'Inde voir [india-market-context.md](india-market-context.md))
- Fenêtres de préparation pré-pic (quand commencer à construire la création pour la période festive, etc.)
- Fenêtres de suivi post-pic (quand nourrir les clients récemment acquis)

### Section 4 : Architecture de campagne

**Longueur :** 2 à 3 pages.

**Contenu :**

- Les grandes campagnes planifiées pour l'année (généralement 4 à 8 campagnes avec des identités explicites)
- Pour chaque campagne : nom, thème, persona cible, canaux principaux, calendrier, KPI, résultat attendu
- La convention de nommage des campagnes (voir partie 9.2, stratégie de campagne)
- Comment les campagnes s'articulent avec l'activité permanente

### Section 5 : Calendrier des piliers de contenu

**Longueur :** 1 à 2 pages.

**Contenu :**

- Les 3 à 5 piliers de contenu (issus du document central 3.3)
- Objectif de production par pilier pour l'année (volume par format)
- Distribution trimestrielle sur les piliers (comment le mix de contenu évolue)
- Flux de recyclage (comment un article de blog long devient des posts sociaux, une vidéo, un e-mail, etc.)

### Section 6 : Cadence spécifique par canal

**Longueur :** 2 à 3 pages, une par famille de canal dans le périmètre.

Pour chaque famille de canal active :

- Cadence de publication / d'envoi (par exemple, LinkedIn : 4 posts/semaine ; e-mail : 1 diffusion/semaine + flux de cycle de vie ; SEO : 6 articles/mois)
- Objectifs de volume pour l'année
- Évolutions d'accent trimestrielles
- Besoins en ressources (production créative, rédaction, design, vidéo)

### Section 7 : Rythme des ressources et du budget

**Longueur :** 2 pages avec tableaux.

**Contenu :**

- Rythme budgétaire trimestriel (la dépense augmente-t-elle linéairement, ou est-elle concentrée en T1, ou en fin de période pour les T3/T4 festifs ?)
- Besoins en ressources par trimestre (équivalents temps plein, volume de production créative, dépense fournisseurs)
- Implications de trésorerie (fonds de roulement nécessaire pour le média payant, revenu différé des abonnements, etc.)

### Section 8 : Calendrier de revue trimestrielle

**Longueur :** 1 page.

**Contenu :**

- Dates de revue business trimestrielle (quand la stratégie est réévaluée)
- Calendrier de préparation des données pré-QBR (quand chaque rapport est dû avant la QBR)
- Participants à la QBR et autorité de décision
- Ce qui peut être révisé lors de la QBR (mix de canaux, réallocation budgétaire, priorité de persona) vs ce qui est verrouillé pour l'année (positionnement, identité de marque, campagnes majeures)

## Format et outils

Le planificateur annuel est livré sous forme de :

- **Un fichier markdown** (canonique, vit dans le répertoire d'engagement)
- **Un PDF exporté** (pour distribution client)
- **Un XLSX exporté** (le calendrier sous forme de feuille de calcul pour un usage opérationnel continu)
- **(Optionnel) Une vue partagée Google Calendar / Notion / Airtable** si le client utilise ces outils

La compétence qui produit le planificateur annuel génère tous les formats à partir de la source markdown.

## Approche de production

Le planificateur annuel est produit **après le Growth Plan** car il opérationnalise les décisions stratégiques du Growth Plan sous forme de calendrier.

Utiliser :

```
/digital-marketing-pro:engagement yearly-planner
```

Le résultat atterrit à `engagements/{engagement-id}/part-08-growth-plan/yearly-planner.md` (avec les exports PDF + XLSX à côté).

## Discipline qualité

- **Chaque initiative a un responsable.** « L'équipe marketing fera X » n'est pas actionnable. « Le responsable de la recherche persona [nom / rôle] fera X d'ici [date] » l'est.
- **Chaque trimestre a des objectifs de KPI mesurables.** « Améliorer le trafic » n'est pas un objectif. « Croissance du trafic organique de 20 % MoM » l'est.
- **L'activité permanente est distinguée des initiatives.** L'activité permanente est la référence qui tourne chaque mois. Les initiatives sont des efforts limités dans le temps par-dessus.
- **Le calendrier respecte une capacité réaliste.** Une petite équipe ne peut pas soutenir 6 initiatives majeures simultanément. Le séquencement évite l'épuisement.
- **Le planificateur annuel est un document vivant.** Il est révisé et ajusté à chaque QBR. La première version est le plan ; la version de fin d'année est le réel.

## Références liées

- [growth-plan-template.md](growth-plan-template.md) — livrable compagnon
- [engagement-flow-methodology.md](engagement-flow-methodology.md) — la partie 8 en contexte
- [india-market-context.md](india-market-context.md) — schémas de saisonnalité pour les marques opérant en Inde
- [monthly-report-template.md](monthly-report-template.md) — comment le planificateur annuel est révisé mensuellement
</content>

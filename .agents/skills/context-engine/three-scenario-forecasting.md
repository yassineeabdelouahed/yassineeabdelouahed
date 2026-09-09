# Prévision à trois scénarios

Chaque projection dans ce plugin — prévision de revenu, résultat de campagne, performance de canal, trajectoire de croissance — est présentée sous forme de trois scénarios, jamais comme un chiffre unique.

Une prévision à chiffre unique détruit la confiance du client dès la première fois qu'elle est manquée (ce qui arrivera). Trois scénarios avec des hypothèses explicites créent une bande d'attente honnête sur l'incertitude et résiliente aux résultats à l'intérieur de la bande.

## Les trois scénarios

### Conservateur

**Définition :** À quoi ressemblent les résultats si les conditions sont difficiles — la concurrence augmente, le marché se ramollit, certaines campagnes sous-performent, des retards d'exécution surviennent.

**C'est le plancher.** Le minimum que le client devrait attendre. Si les résultats tombent en dessous, quelque chose de fondamental s'est mal passé et déclenche une revue d'urgence.

**Hypothèses à utiliser pour le conservateur :**

- Prendre la référence modérée et réduire les intrants clés de 20 à 30 %
- Supposer qu'un canal majeur sous-performe de 30 à 50 %
- Supposer qu'un risque majeur se matérialise (par exemple, un concurrent clé double sa dépense publicitaire, un changement réglementaire, un raté de saisonnalité)
- Supposer que des retards d'équipe / d'approbation repoussent certaines initiatives d'un mois
- Appliquer la borne inférieure des fourchettes de taux de conversion, la borne supérieure des fourchettes de CAC

### Modéré

**Définition :** À quoi ressemblent les résultats dans des conditions normales avec une exécution solide.

**C'est le scénario le plus probable** et devrait être la référence de planification. La plupart des décisions (budget, recrutement, gestion des attentes) devraient s'y référer.

**Hypothèses à utiliser pour le modéré :**

- Utiliser les repères de performance historiques (les vôtres si disponibles, les repères de catégorie sinon)
- Supposer que l'exécution se déroule à une compétence d'agence / d'équipe typique (ni exceptionnelle, ni faible)
- Supposer aucune perturbation externe majeure
- Appliquer le point médian des fourchettes de taux de conversion et de CAC
- Supposer une saisonnalité normale

### Agressif

**Définition :** À quoi ressemblent les résultats si tout se passe bien — les campagnes surperforment, les conditions de marché favorisent la marque, les opportunités de mise à l'échelle se matérialisent plus vite que prévu, aucune friction d'exécution significative.

**C'est le plafond.** Le potentiel dont le client devrait être conscient mais sur lequel il ne devrait pas planifier.

**Hypothèses à utiliser pour l'agressif :**

- Prendre la référence modérée et augmenter les intrants clés de 20 à 30 %
- Supposer qu'une ou deux campagnes produisent des résultats disproportionnés (par exemple, un contenu devient viral, un concept de campagne résonne plus que prévu)
- Supposer des conditions de marché favorables (par exemple, changement réglementaire favorable, faiblesse d'un concurrent, vent porteur de catégorie)
- Appliquer la borne supérieure des fourchettes de taux de conversion, la borne inférieure des fourchettes de CAC
- Supposer une capacité à capter le potentiel (l'équipe est prête à monter en échelle rapidement)

## Comment présenter trois scénarios

Chaque prévision présentée au client doit inclure les trois scénarios avec les hypothèses de chacun.

### Format

```markdown
## Prévision — {Période} {Résultat}

| Scénario | Résultat | Hypothèses clés |
|----------|---------|-----------------|
| **Conservateur** | {valeur ou fourchette} | {2-3 hypothèses clés} |
| **Modéré** | {valeur ou fourchette} | {2-3 hypothèses clés} |
| **Agressif** | {valeur ou fourchette} | {2-3 hypothèses clés} |

### Déclencheurs qui nous font basculer entre scénarios

- Nous nous rapprochons de l'agressif si : {signal précis 1}, {signal précis 2}
- Nous nous rapprochons du conservateur si : {signal précis 1}, {signal précis 2}

### Ce que nous surveillons

- {Indicateur ou signal 1 — ce que nous suivrons pour savoir quel scénario se déroule}
- {Indicateur ou signal 2}
```

## Exemple travaillé — Prévision de revenu T1 pour un engagement SaaS B2B

```markdown
## Prévision — ARR nouveau du T1 2026 issu du pipeline sourcé par le marketing

| Scénario | Nouvel ARR | Hypothèses clés |
|----------|---------|-----------------|
| **Conservateur** | 1,8 crore INR | Le CPL de Google Ads reste à 1 800 INR (actuel) ; le CPL de LinkedIn Ads augmente de 20 % en raison de l'afflux budgétaire du T1 dans la catégorie ; le taux de clôture reste au niveau actuel de 18 % ; un gros deal entreprise glisse au T2. |
| **Modéré** | 2,6 crore INR | Les CPL restent stables sur tous les canaux ; le taux de clôture s'améliore à 22 % à mesure que l'équipe commerciale adopte le nouveau lead scoring ; le gros deal entreprise se clôture au T1 comme prévu. |
| **Agressif** | 3,4 crore INR | La conférence sectorielle du T1 produit 40+ leads qualifiés (contre 25 habituellement) ; une sortie de produit planifiée comble la lacune de fonctionnalité la plus contestée et fait passer le taux de clôture à 27 % ; le gros deal entreprise se clôture plus une vente incitative. |

### Déclencheurs qui nous font basculer entre scénarios

- Vers l'agressif : fréquentation de la conférence sectorielle > 200, CPL publicitaire en baisse de 15 %+, taux de clôture au-dessus de 25 % d'ici la semaine 6
- Vers le conservateur : conférence sectorielle annulée ou sous-fréquentée, coûts publicitaires en hausse de 25 %+, capacité de l'équipe commerciale en dessous du planifié

### Ce que nous surveillons

- Hebdomadaire : pipeline généré, conversion MQL-vers-SQL, tendance du CPL publicitaire
- Mensuel : taux de clôture, progression des étapes des deals entreprise, mix de canaux réel vs plan
```

## Pourquoi trois scénarios comptent

1. **Ils empêchent les promesses excessives.** Un chiffre unique est interprété comme un engagement. Une fourchette avec hypothèses est interprétée comme une prévision honnête.

2. **Ils rendent les hypothèses visibles.** Lorsque le scénario modéré suppose un taux de clôture de 22 % mais que le réel est de 17 %, la conversation est « l'hypothèse de taux de clôture était fausse, voici pourquoi » — pas « votre prévision était fausse, vous avez sous-livré ».

3. **Ils invitent à la collaboration.** Le client peut remettre en question les hypothèses. « Pourquoi supposez-vous que les CPL resteront stables ? Nous lançons un nouveau produit qui devrait attirer des enchérisseurs dans la catégorie. » Cela produit une meilleure prévision de manière collaborative.

4. **Ils définissent des déclencheurs d'action.** Si nous atteignons des signaux de niveau conservateur à mi-trimestre, l'équipe sait qu'il faut pivoter. Si nous atteignons des signaux de niveau agressif, l'équipe sait qu'il faut monter en échelle.

5. **Ils protègent contre les disputes d'attribution.** Lorsque les résultats se situent dans la bande conservateur-à-agressif, la conversation porte sur quelles hypothèses ont tenu ou non — pas sur si la prévision était fausse.

## Ce que trois scénarios ne sont PAS

- **Pas une « estimation basse / moyenne / haute » sans rigueur.** Chaque scénario doit avoir des hypothèses explicites.
- **Pas un moyen de cacher l'incertitude en donnant une large bande.** Si le conservateur est à 30 % du modéré, le modèle est trop incertain — l'affiner avant de le présenter.
- **Pas un plafond de responsabilité.** L'agressif est ce qui est atteignable avec une excellente exécution ; l'équipe reste responsable du modéré comme référence de planification.
- **Pas un substitut au suivi.** L'intérêt des déclencheurs et de « ce que nous surveillons » est de savoir tôt quel scénario se déroule afin que l'équipe puisse réagir.

## Quand mettre à jour les scénarios

- **Mensuellement :** lors de la revue de performance mensuelle, les scénarios pour le reste du trimestre sont recalibrés selon les données réelles
- **Aux événements majeurs :** lancements de produit, mouvements de concurrents, évolutions de marché, changements réglementaires
- **À l'actualisation stratégique trimestrielle :** nouvelle prévision complète pour le trimestre suivant avec de nouveaux scénarios

## Où les prévisions se situent dans l'engagement

- **Document central 3.4 (DMFlow), étape 9 :** les implications stratégiques incluent une prévision directionnelle
- **Growth Plan (partie 8) :** la section Résultats attendus présente formellement les trois scénarios
- **Planificateur annuel (partie 8) :** prévision annuelle sous forme de trois scénarios par trimestre
- **Rapports de performance mensuels :** réel vs scénarios + prévisions à terme recalibrées
- **Actualisation stratégique trimestrielle :** nouvelle prévision complète pour le trimestre suivant

## Références liées

- [growth-plan-template.md](growth-plan-template.md) — la section Résultats attendus utilise trois scénarios
- [unit-economics-framework.md](unit-economics-framework.md) — intrants CAC / LTV pour les prévisions
- [monthly-report-template.md](monthly-report-template.md) — reporting réel vs scénarios
</content>

# Suivi du sentiment — Mise en place et reporting

> **Provenance des benchmarks (au 2026-08) :** Les chiffres en dollars de ce document sont des estimations de planification, pas des cotations — les tarifs de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez ensuite depuis le livre (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

> Suivi continu de la manière dont votre marque, vos concurrents, et votre secteur sont perçus sur Internet. La détection précoce des changements de sentiment fait la différence entre une gestion de réputation proactive et une lutte contre les incendies en mode crise.

---

## Recommandations et comparaison d'outils

| Outil | Idéal pour | Fourchette de prix | Points forts clés | Limites |
|------|----------|-------------|---------------|-------------|
| **Brandwatch** | Entreprise, analytics approfondi | 800-3 000 $+/mois | Sentiment propulsé par IA, données historiques, reconnaissance d'image | Configuration complexe, tarification premium |
| **Mention** | PME, alertes en temps réel | 49-199 $/mois | Configuration facile, suivi en temps réel, identification d'influenceurs | Données historiques limitées |
| **Talkwalker** (propriété de Hootsuite) | Entreprise, analytics visuel | 800-2 500 $+/mois | Reconnaissance image/vidéo, 150 M de sources, détection de crise | Courbe d'apprentissage abrupte |
| **Google Alerts** | Suivi de base, niveau gratuit | Gratuit | Coût nul, livraison par email, couverture de l'index Google | Pas de notation de sentiment, sources limitées, délais |
| **Sprout Social** | Marques axées social | 249-499 $/mois | Veille sociale + gestion en un, bonne UX | Principalement canaux sociaux |
| **Meltwater** | Équipes RP, veille média | 500-2 000 $+/mois | Média radiodiffusé/imprimé/en ligne, analytics RP | Axé média, moins de profondeur social |
| **Brand24** | Milieu de marché, option valeur | 79-399 $/mois | Bonne IA de sentiment, graphiques de volume de discussion, alertes | Base de sources plus petite |
| **Hootsuite Listening (Talkwalker)** | Utilisateurs Hootsuite existants | Tarification add-on | Intégré au workflow Hootsuite | Dépendant de l'abonnement Hootsuite |

### Cadre de sélection

| Si votre priorité est... | Choisissez... |
|------------------------|-----------|
| Suivi de base soucieux du budget | Google Alerts + Brand24 |
| Marque centrée sur les réseaux sociaux | Sprout Social ou Mention |
| Analytics et IA de niveau entreprise | Brandwatch ou Talkwalker |
| Focus RP et relations médias | Meltwater |
| Gestion sociale tout-en-un + veille | Sprout Social ou Hootsuite Listening (Talkwalker) |

---

## Configuration des alertes

### Catégories de mots-clés à surveiller

**Catégorie 1 : Termes de marque**
| Type de mot-clé | Exemples | Priorité |
|-------------|----------|----------|
| Nom de marque (exact) | « {{company_name}} » | Critique |
| Nom de marque (fautes d'orthographe) | Fautes de frappe courantes, abréviations | Élevée |
| Noms de produit | Chaque nom de produit/service | Élevée |
| Hashtags de marque | #VotreMarque, #VotreCampagne | Élevée |
| Nom de domaine | votreentreprise.com | Moyenne |
| Noms du PDG / dirigeants | « {{CEO name}} » | Élevée |
| Slogans/taglines de marque | « Just Do It » | Moyenne |

**Catégorie 2 : Termes concurrents**
| Type de mot-clé | Exemples | Priorité |
|-------------|----------|----------|
| Noms de marque concurrents | Top 3-5 concurrents par nom | Moyenne |
| Noms de produits concurrents | Produits directement concurrents | Moyenne |
| « {{marque}} vs {{concurrent}} » | Requêtes de comparaison | Élevée |
| Noms de dirigeants concurrents | Leur PDG, CMO | Faible |

**Catégorie 3 : Secteur et catégorie**
| Type de mot-clé | Exemples | Priorité |
|-------------|----------|----------|
| Termes sectoriels + « meilleur » | « meilleur logiciel CRM » | Moyenne |
| Termes de catégorie + « avis » | « avis outils de gestion de projet » | Moyenne |
| Termes de tendance sectorielle | Terminologie émergente dans votre domaine | Faible |
| Termes réglementaires | Changements de conformité affectant votre secteur | Moyenne |

**Catégorie 4 : Déclencheurs de crise**
| Type de mot-clé | Exemples | Priorité |
|-------------|----------|----------|
| « {{marque}} » + termes négatifs | « {{marque}} arnaque », « {{marque}} action en justice » | Critique |
| « {{marque}} » + termes médias | « {{marque}} enquête », « {{marque}} rapport » | Critique |
| Termes données/sécurité | « {{marque}} violation », « {{marque}} piratage » | Critique |
| Termes employés | « {{marque}} licenciements », « {{marque}} toxique » | Élevée |

---

## Méthodologie de notation du sentiment

### Classification automatisée du sentiment

| Plage de score | Label | Définition | Exemple |
|-------------|-------|-----------|---------|
| 0,8 - 1,0 | Très positif | Éloges enthousiastes, forte recommandation | « J'adore absolument ce produit, le meilleur achat que j'ai fait ! » |
| 0,5 - 0,79 | Positif | Satisfaction générale, éloges modérés | « Bon produit, fonctionne comme attendu. » |
| 0,2 - 0,49 | Neutre | Mention factuelle, pas de sentiment clair | « J'ai acheté leur produit la semaine dernière. » |
| -0,2 - 0,19 | Mixte | Contient des éléments positifs et négatifs | « Excellentes fonctionnalités mais le support est terrible. » |
| -0,5 - -0,21 | Négatif | Insatisfaction, plainte | « Déçu par la qualité, ça ne vaut pas le prix. » |
| -1,0 - -0,51 | Très négatif | Colère, indignation, intention de nuire à la marque | « Cette entreprise est une arnaque, N'ACHETEZ PAS chez eux. » |

### Calibrage manuel du sentiment

Les outils automatisés sont typiquement précis à 70-85 %. Améliorer la précision avec :

1. **Entraîner le modèle :** La plupart des outils permettent de corriger les mentions mal classifiées — faites-le hebdomadairement pendant le premier mois
2. **Règles de contexte :** Créer des règles pour les secteurs riches en ironie (par ex. jeu vidéo, mode)
3. **Pondérer par la portée :** Une mention négative de quelqu'un avec 500K abonnés compte plus qu'une de 50
4. **Exclure le bruit :** Filtrer les offres d'emploi, les tickers boursiers, les correspondances de noms non liées

---

## Modèles de reporting

### Rapport d'alerte quotidien (Email / Slack)

```
ALERTE SENTIMENT QUOTIDIEN — {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total des mentions : {{count}}
Sentiment : {{positive}}% Pos / {{neutral}}% Neut / {{negative}}% Nég
Tendance de sentiment : {{up/down/stable}} vs moyenne sur 7 jours

⚠ ALERTES NÉCESSITANT UNE ACTION :
1. [{{severity}}] {{résumé de la mention}} — Source : {{platform}} — Portée : {{number}}
2. [{{severity}}] {{résumé de la mention}} — Source : {{platform}} — Portée : {{number}}

📈 POSITIF NOTABLE :
1. {{résumé de la mention positive}} — Source : {{platform}} — Portée : {{number}}

Tableau de bord complet : {{link}}
```

### Rapport de synthèse hebdomadaire

| Section | Contenu |
|---------|---------|
| Résumé exécutif | Aperçu en 2-3 phrases du paysage de sentiment de la semaine |
| Métriques de volume | Total des mentions, changement d'une semaine sur l'autre, ventilation par canal |
| Ventilation du sentiment | Répartition positif/neutre/négatif avec flèches de tendance |
| Principales mentions positives | Top 5 par portée, avec liens |
| Principales mentions négatives | Top 5 par portée, avec liens et statut de réponse |
| Comparaison concurrentielle | Sentiment côte à côte vs les 3 principaux concurrents |
| Sujets émergents | Nouveaux thèmes ou sujets prenant de l'ampleur |
| Éléments d'action | Réponses recommandées, opportunités de contenu, escalades |

### Rapport mensuel

| Section | Contenu |
|---------|---------|
| Analyse de tendance sur 30 jours | Graphique de tendance de sentiment, graphique de volume |
| Performance par canal | Sentiment par canal (social, actualités, avis, forums) |
| Benchmarking concurrentiel | Part de voix, comparaison de sentiment, mouvements clés des concurrents |
| Analyse thématique | Top 10 des thèmes/sujets générant des mentions, sentiment par thème |
| Activité d'influenceurs | Influenceurs clés mentionnant la marque (positif et négatif) |
| Impact de campagne | Hausse/baisse de sentiment corrélée aux campagnes marketing |
| Journal de crise | Tout incident, sévérité, temps de réponse, résolution |
| Recommandations | Recommandations stratégiques pour le mois suivant |

---

## Benchmarking concurrentiel

### Tableau de bord de part de voix

| Métrique | Votre marque | Concurrent A | Concurrent B | Concurrent C |
|--------|-----------|-------------|-------------|-------------|
| Total des mentions | | | | |
| Part de voix % | | | | |
| Score de sentiment moyen | | | | |
| % de mentions positives | | | | |
| % de mentions négatives | | | | |
| Canal principal | | | | |
| Sujets en tendance | | | | |

### Processus de suivi du sentiment concurrentiel
1. Mettre en place des requêtes de suivi identiques pour chaque concurrent
2. Normaliser le volume par la taille de la marque (mentions par 1M $ de revenu ou par 1K clients)
3. Suivre le sentiment hebdomadairement dans un tableau de bord partagé
4. Signaler les changements de sentiment concurrentiel significatifs (lancement de produit, crise, campagne)
5. Rapporter les tendances de sentiment concurrentiel trimestrielles à la direction

---

## Détection de tendance et système d'alerte précoce

### Indicateurs d'alerte précoce

| Indicateur | Seuil | Action |
|-----------|-----------|--------|
| Pic de volume de mentions | >200 % de la moyenne quotidienne | Enquêter immédiatement sur la source |
| Pic de sentiment négatif | >150 % de la moyenne négative quotidienne | Alerter le community manager, préparer une déclaration d'attente |
| Nouveau hashtag négatif | Tout nouveau hashtag avec >50 utilisations en 24h | Classifier la sévérité, informer l'équipe de crise |
| Reprise média | Marque mentionnée dans 3+ médias le même jour | Alerter l'équipe RP |
| Pic de mentions d'un dirigeant | >300 % de la normale pour une personne nommée | Alerter le dirigeant et l'équipe RP |
| Attaque concurrentielle | Un concurrent mentionne négativement votre marque | Évaluer et préparer un contre-narratif |

### Cadence d'analyse de tendance

| Période | Ce qu'il faut analyser | Qui revoit |
|-----------|----------------|-------------|
| Temps réel | Déclencheurs de crise, pics de volume | Community Manager (alertes automatisées) |
| Quotidien | Changements de sentiment, principales mentions | Community Manager |
| Hebdomadaire | Émergence de thèmes, mouvements des concurrents | Responsable Marketing |
| Mensuel | Tendances à long terme, corrélations de campagne | VP Marketing |
| Trimestriel | Changements stratégiques, évolutions de perception de marché | CMO / Direction |

---

## Règles d'escalade

| Condition | Niveau d'escalade | Chronologie | Action |
|-----------|-----------------|----------|--------|
| Mention négative unique, faible portée (<1K) | Niveau 0 — Pas d'escalade | Traiter dans les 24 h | CM répond selon le modèle |
| Mention négative, forte portée (>10K) | Niveau 1 — Manager | Traiter dans les 4 h | Le manager revoit la réponse avant publication |
| Mentions négatives multiples, sujet en tendance | Niveau 2 — Équipe de crise | Traiter dans les 2 h | Activer le protocole de crise Niveau 2 |
| Couverture médiatique, implications légales | Niveau 3 — Direction | Traiter dans l'heure | Activer le protocole de crise Niveau 3 (voir `crisis-communication.md`) |
| Mention virale positive (>100K de portée) | Niveau 1 — Opportunité | Traiter dans les 2 h | Amplifier, engager, exploiter pour du contenu généré par les utilisateurs |

---

## Checklist de mise en place

- [ ] Sélectionner et souscrire à un ou des outils de suivi selon le cadre de sélection ci-dessus
- [ ] Configurer toutes les catégories de mots-clés (marque, concurrent, secteur, déclencheurs de crise)
- [ ] Mettre en place le routage des alertes (email, Slack, SMS) par niveau de priorité
- [ ] Calibrer le modèle de sentiment avec 50+ mentions classifiées manuellement
- [ ] Créer les modèles de reporting dans votre outil BI ou la plateforme de suivi
- [ ] Assigner la responsabilité de suivi quotidien à un membre spécifique de l'équipe
- [ ] Configurer les règles d'escalade avec le routage des notifications
- [ ] Mettre en place le suivi concurrentiel pour les 3-5 principaux concurrents
- [ ] Planifier la livraison de la synthèse hebdomadaire et du rapport mensuel
- [ ] Réaliser la première mesure de référence (scores de sentiment et volume actuels)

---

> **Vous ne pouvez pas gérer ce que vous ne mesurez pas.** Le suivi du sentiment n'est pas optionnel — c'est le système nerveux de votre pratique de gestion de la réputation. Mettez-le en place une fois, maintenez-le en continu, et agissez sur ce qu'il vous révèle.
</content>

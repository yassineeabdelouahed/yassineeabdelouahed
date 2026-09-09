# Guide de l'intelligence composée

Connaissances de référence pour construire une intelligence marketing qui s'améliore avec le temps. Chaque campagne, test et observation devrait nourrir un système qui rend la prochaine décision meilleure que la précédente.

---

## 1. Architecture du graphe d'intelligence

### Structure centrale
Le graphe d'intelligence est un réseau d'enseignements marketing connectés par des relations :
- **Nœuds** : Enseignements ou apprentissages individuels, chacun stocké comme un enregistrement structuré avec des champs définis
- **Arêtes** : Relations entre enseignements — même audience, même canal, même objectif, preuve à l'appui, preuve contradictoire, relation causale, séquence temporelle
- **Métadonnées par nœud** : Score de confiance (0,0-1,0), agent source (quel spécialiste a généré l'enseignement), horodatage (quand observé), date de revalidation (quand revérifier), conditions de contexte (marque, secteur, audience, canal, saison, niveau de budget)

### Pourquoi un graphe, pas une liste
Les listes d'enseignements sont plates et déconnectées. Un graphe révèle des schémas : « Ces 5 enseignements concernent tous l'audience développeur sur LinkedIn — ensemble ils forment un playbook. » Il fait aussi émerger des contradictions : « Ces 2 enseignements sur le timing des e-mails sont en désaccord — ils ont été observés à des saisons différentes, ce qui peut expliquer le conflit. »

### Types de nœuds
- **Observation** : Point de donnée brut. « La campagne e-mail n°47 a eu un taux d'ouverture de 23 % avec un objet contenant un emoji »
- **Hypothèse** : Explication proposée. « Les objets d'e-mail avec emoji augmentent les taux d'ouverture pour l'audience développeur »
- **Apprentissage validé** : Schéma confirmé avec des preuves suffisantes. « Les objets d'e-mail avec emoji augmentent les taux d'ouverture de 8-12 % pour l'audience développeur (confiance : 0,82, basé sur 7 campagnes) »
- **Règle de playbook** : Instruction exploitable dérivée d'apprentissages validés. « Lors de la rédaction d'objets d'e-mail pour l'audience développeur, inclure 1 emoji pertinent — augmentation attendue du taux d'ouverture : 8-12 % »
- **Anti-schéma** : Enseignement négatif validé. « Éviter les objets tout en majuscules pour l'audience entreprise — taux d'ouverture inférieur de 15 % (confiance : 0,75, basé sur 5 campagnes) »

### Types d'arêtes
- **Soutient** : Un enseignement fournit une preuve pour un autre
- **Contredit** : Un enseignement entre en conflit avec un autre (déclenche une investigation)
- **Étend** : Un enseignement ajoute une nuance ou une portée à un autre
- **Remplace** : Un enseignement plus récent remplace un plus ancien (l'ancien est archivé, pas supprimé)
- **Dépendant du contexte** : Deux enseignements qui semblent se contredire s'appliquent en réalité dans des contextes différents

---

## 2. Cycle de vie de la structure d'apprentissage

### Étape 1 : Observation
Un seul point de donnée provenant d'une campagne, d'un test ou d'une analyse. Structuré comme :
- **Ce qui s'est passé** : « Les taux d'ouverture e-mail ont chuté de 15 % lorsque nous sommes passés d'un format question à un format affirmation pour les objets »
- **Contexte** : Marque, segment d'audience, canal, période, taille d'échantillon
- **Source** : Quel agent ou analyse a généré cette observation
- **Confiance initiale** : 0,5 (observation unique, aucune corroboration)

### Étape 2 : Hypothèse
Lorsque 2 observations ou plus suggèrent un schéma, formuler une hypothèse :
- **Énoncé du schéma** : « Les objets au format question surpassent le format affirmation pour notre audience B2B »
- **Observations à l'appui** : Liens vers les observations qui suggèrent ce schéma
- **Résultat prédit** : « Si nous revenons au format question, les taux d'ouverture se rétabliront de 10-15 % »
- **Conception du test** : Comment valider — « Test A/B format question vs affirmation sur les 3 prochains envois d'e-mail »
- **Confiance** : 0,6 (schéma émergent mais non validé)

### Étape 3 : Accumulation de preuves
Exécuter le test ou rassembler des observations supplémentaires :
- Chaque observation confirmante augmente la confiance (+0,1, plafonné à +0,3 par preuve)
- Chaque observation contradictoire diminue la confiance (-0,2)
- Suivre la piste de preuves — chaque observation qui soutient ou contredit est liée comme une arête

### Étape 4 : Apprentissage validé
Lorsque la confiance dépasse le seuil de 0,8 :
- **Énoncé formel** : « Pour l'audience SaaS B2B : les objets d'e-mail au format question obtiennent des taux d'ouverture 12 % plus élevés que le format affirmation, basé sur 7 campagnes sur 3 mois (confiance : 0,82) »
- **Conditions** : Spécifier quand cela s'applique (audience, canal, type de contenu, saison)
- **Limites** : Spécifier quand cela ne s'applique PAS ou n'est pas testé
- **Date de revalidation** : Fixer une vérification à 6 mois pour confirmer que l'apprentissage tient toujours

### Étape 5 : Règle de playbook
Les apprentissages validés avec une confiance >0,85 sont promus au rang de règles de playbook :
- **Instruction exploitable** : « Lors de la rédaction d'objets d'e-mail pour l'audience SaaS B2B, utiliser le format question. Augmentation attendue : 10-14 % du taux d'ouverture »
- **Exceptions** : Conditions connues où la règle ne s'applique pas
- **Conditions de dérogation** : Quand s'écarter (par ex., e-mails transactionnels, annonces urgentes)

---

## 3. Système de notation de confiance

### Calcul du score
| Événement | Changement de score |
|-------|-------------|
| Observation initiale | 0,50 (point de départ) |
| Chaque observation à l'appui | +0,10 (max +0,30 issus de preuves supplémentaires) |
| Chaque observation contradictoire | -0,20 |
| Décroissance temporelle | -0,01 par mois sans revalidation |
| Bonus d'étendue de contexte | +0,10 si validé sur 3 campagnes ou plus |
| Confirmation inter-agents | +0,15 si observé par un type d'agent différent |
| Bonus de grande taille d'échantillon | +0,05 si basé sur >10 000 points de données |
| Validation causale (expérience) | +0,10 si confirmé via une expérience contrôlée |

### Seuils de confiance
- **>0,85** : Confiance élevée. Inclure dans les playbooks comme règles par défaut. Les agents devraient les suivre sauf si le contexte les contredit explicitement
- **0,70-0,85** : Confiance modérée-élevée. Inclure dans les recommandations avec le contexte à l'appui. « Sur la base de 5 campagnes précédentes, nous recommandons... »
- **0,50-0,70** : Confiance modérée. Suggérer mais signaler comme en développement. « Les preuves précoces suggèrent... nous recommandons de tester »
- **0,30-0,50** : Confiance faible. Surveiller pour des preuves supplémentaires. Ne pas inclure dans les recommandations
- **<0,30** : Archivage automatique. Preuves insuffisantes ou trop de contradiction. Conserver dans le graphe pour référence historique mais exclure de l'intelligence active

### Décroissance de la confiance et revalidation
Chaque enseignement perd 0,01 point de confiance par mois sans revalidation. Cela garantit que les enseignements obsolètes perdent progressivement leur influence. Méthodes de revalidation :
- **Passive** : De nouvelles données de campagne confirment l'enseignement (automatique, aucun effort requis)
- **Active** : Tester délibérément l'enseignement dans une nouvelle campagne (pour les enseignements à forte valeur approchant du seuil)
- **Revue** : Un analyste ou un agent revoit l'enseignement par rapport aux conditions de marché actuelles (processus trimestriel)

---

## 4. Règles de distribution inter-agents

### Quand partager des enseignements
Lorsqu'un agent spécialiste découvre un enseignement, déterminer sa pertinence pour d'autres agents :
- **Le créateur de contenu découvre une préférence d'audience** (par ex., « l'audience développeur préfère les exemples de code aux explications abstraites ») -> Distribuer au spécialiste e-mail, au gestionnaire des réseaux sociaux, au spécialiste SEO
- **L'analyste analytics découvre un schéma de canal** (par ex., « LinkedIn génère 3x plus de leads qualifiés que Meta pour l'audience entreprise ») -> Distribuer au stratège marketing, à l'acheteur média
- **Le spécialiste SEO trouve un format de classement** (par ex., « les articles de comparaison se classent 40 % mieux que les avis mono-produit dans la catégorie SaaS ») -> Distribuer au créateur de contenu
- **L'acheteur média trouve un schéma de coût** (par ex., « les CPM baissent de 30 % le mardi pour les audiences B2B sur LinkedIn ») -> Distribuer au gestionnaire des réseaux sociaux, au stratège marketing

### Filtre de distribution
Un enseignement doit partager au moins une dimension de contexte avec le domaine de l'agent récepteur :
- **Chevauchement d'audience** : Les deux agents servent le même segment d'audience
- **Chevauchement de canal** : Les deux agents opèrent sur la même plateforme
- **Chevauchement d'objectif** : Les deux agents travaillent vers le même objectif de campagne
- **Chevauchement de secteur** : Les deux agents travaillent dans le même vertical

Si aucune dimension ne se chevauche, ne pas distribuer — l'enseignement est probablement non pertinent et ajoute du bruit.

### Format de distribution
Lors du partage inter-agents, inclure :
- L'énoncé de l'enseignement (une phrase)
- Le score de confiance
- L'explication de pertinence (« Ceci est pertinent pour votre travail parce que... »)
- Le nombre de preuves source
- L'action suggérée pour l'agent récepteur

---

## 5. Quantification de l'avantage cumulatif

### Score d'intelligence de marque
`Score = total_apprentissages_validés * confiance_moyenne * facteur_de_récence`

Où facteur_de_récence = moyenne de (0,99^mois_depuis_validation) sur tous les apprentissages.

### Étapes de maturité de l'intelligence
| Étape | Campagnes | Plage de score | Caractéristiques |
|-------|-----------|-------------|----------------|
| Démarrage à froid | 0-5 | 0-10 | Références sectorielles pures. Aucune intelligence spécifique à la marque. Chaque recommandation est générique |
| Apprentissage précoce | 5-25 | 10-75 | Schémas basiques émergents. Premiers apprentissages validés sur l'audience et la performance de canal. Commence à diverger du conseil générique |
| Reconnaissance de schémas | 25-100 | 75-500 | Enseignements robustes à travers les canaux principaux. Règles de playbook en formation. Les recommandations sont mesurablement meilleures que les références génériques |
| Barrière d'intelligence | 100-500 | 500-2000 | Enseignements inter-canaux, schémas saisonniers, micro-segments d'audience compris. Avantage concurrentiel en vitesse et précision des décisions marketing |
| Avantage composé | 500+ | 2000+ | Chaque nouvelle campagne bénéficie de tous les apprentissages précédents. Le système d'intelligence lui-même devient un actif stratégique. Les concurrents sans intelligence composée ne peuvent égaler la qualité de décision quel que soit le budget |

### L'argument de la barrière
Une marque qui a exécuté 500 campagnes avec une intelligence composée dispose d'un avantage structurel qui ne peut pas être répliqué par une marque partant de zéro, même avec un budget plus important. La compréhension accumulée de ce qui fonctionne pour cette audience spécifique, sur ce marché spécifique, avec ce produit spécifique, se cumule dans le temps. C'est la principale proposition de valeur à long terme du système d'intelligence.

---

## 6. Anti-schémas à éviter

### Surajustement à de petits échantillons
Exiger un minimum de 3 observations avant de promouvoir une observation en hypothèse. Un seul résultat de campagne — même spectaculaire — n'est pas un schéma. Il peut être piloté par le timing, la composition de l'audience, l'absence de concurrence, ou une variance aléatoire.

### Biais du survivant
Suivre ce qui n'a PAS fonctionné, pas seulement ce qui a fonctionné. La base de données d'anti-schémas est aussi précieuse que le playbook de bonnes pratiques. « Nous avons testé 8 formats d'accroche ; 2 ont fonctionné et 6 non » est plus précieux que « Nous avons trouvé 2 formats d'accroche qui fonctionnent ».

### Corrélation vs causalité
Étiqueter chaque enseignement comme « corrélation » sauf validation causale via une expérience contrôlée (test A/B, holdout, geo-lift). Les enseignements corrélationnels restent utiles pour la génération d'hypothèses mais ne devraient pas être traités comme des règles de playbook fiables. Exemple : « Les campagnes lancées le mardi performent mieux » peut être une corrélation (vous lancez votre meilleur travail le mardi) plutôt qu'une causalité (le mardi est intrinsèquement meilleur).

### Biais de récence
Pondérer les enseignements par score de confiance, pas seulement par leur ancienneté. Un apprentissage validé d'il y a 6 mois (confiance 0,85) est plus fiable qu'une observation unique de la semaine dernière (confiance 0,50). La décroissance temporelle gère la perte progressive de pertinence sans laisser la récence l'emporter sur la qualité des preuves.

### Effet de chambre d'écho
Rechercher activement des preuves qui infirment. Lorsqu'une hypothèse a 4 observations à l'appui, chercher délibérément des conditions dans lesquelles elle échoue. Tester l'hypothèse dans un segment d'audience différent, un canal différent, ou une saison différente. Les enseignements qui survivent à des tentatives actives d'infirmation sont significativement plus robustes.

### Élévation d'anecdote
Un seul résultat impressionnant ne constitue pas un enseignement fiable. « Cette publication LinkedIn est devenue virale » ne signifie pas que le format, le sujet, ou le timing est une stratégie reproductible. Exiger des preuves au niveau du schéma avant de changer les procédures opérationnelles standard.

---

## 7. Intelligence en mode agence

### Détection de schémas inter-clients
Lors du fonctionnement en mode agence (plusieurs marques), le système d'intelligence peut détecter des schémas qu'aucun système mono-client ne pourrait voir :
- **Références sectorielles issues de données réelles** : « Sur 12 clients SaaS, le taux d'ouverture e-mail moyen est de 22,4 % — le Client X à 18 % sous-performe »
- **Efficacité de canal par vertical** : « LinkedIn surpasse Meta pour la génération de leads B2B sur 8 des 9 clients »
- **Schémas saisonniers** : « Les CPM du T4 augmentent de 40-60 % à travers tous les clients e-commerce — planifier les budgets en conséquence à l'avance »

### Exigences d'anonymisation
Retirer toute information identifiant le client avant d'agréger l'intelligence inter-clients :
- Remplacer les noms de clients par des identifiants anonymes
- Retirer les détails créatifs spécifiques à la marque
- Agréger les métriques au niveau secteur/audience, pas au niveau campagne
- Ne jamais partager les données de performance spécifiques d'un client avec un autre client

### Pool d'intelligence partagée sur opt-in
Les clients peuvent opter pour contribuer des enseignements anonymisés et recevoir en retour de l'intelligence inter-clients :
- **Contributeurs** : Leurs données (anonymisées) améliorent le pool, et ils reçoivent le plein bénéfice des schémas inter-clients
- **Non-contributeurs** : Reçoivent uniquement des références sectorielles, pas d'enseignements inter-clients détaillés
- **Pare-feu** : L'intelligence spécifique à un client n'est JAMAIS accessible aux autres clients, indépendamment du statut d'opt-in. Seuls les schémas agrégés et anonymisés sont partagés

### Seuils de confiance plus élevés
Les enseignements inter-clients nécessitent des preuves plus solides car ils se généralisent à travers différentes marques, audiences, et contextes :
- Exiger 5 observations ou plus à travers 3 clients ou plus (vs 3 observations pour les enseignements mono-client)
- Confiance minimale de 0,75 avant de faire remonter des recommandations inter-clients (vs 0,50 pour le mono-client)
- Toujours étiqueter les enseignements inter-clients avec le secteur et les conditions d'audience sous lesquelles ils ont été observés

---

## 8. Maintenance de l'intelligence

### Revue mensuelle
Revoir les 20 principaux enseignements par score de confiance :
- Sont-ils toujours valides sur la base des données de campagne récentes ?
- Le marché, la plateforme, ou l'audience a-t-il changé d'une manière qui pourrait les invalider ?
- Certains approchent-ils des échéances de revalidation ?
- Promouvoir les hypothèses solides qui ont accumulé de nouvelles preuves
- Archiver les enseignements qui ont décru en dessous de 0,30 de confiance

### Audit trimestriel
Revue complète du graphe d'intelligence :
- **Archiver les enseignements obsolètes** : Tout ce qui est en dessous de 0,30 de confiance ou de plus de 12 mois sans revalidation
- **Promouvoir les hypothèses solides** : Les hypothèses qui ont accumulé suffisamment de preuves depuis le dernier audit
- **Résoudre les contradictions** : Lorsque deux enseignements entrent en conflit, investiguer les différences de contexte. Exécuter un test ciblé si les enjeux sont élevés. Archiver l'enseignement à confiance plus faible si aucune résolution n'est trouvée
- **Métriques de santé du graphe** : Total des enseignements actifs, confiance moyenne, pourcentage revalidé dans les 90 derniers jours, taux de conversion enseignement-vers-règle-de-playbook

### Actualisation annuelle du playbook
Reconstruire les playbooks à partir des apprentissages validés à haute confiance actuels :
- Retirer les règles de playbook basées sur des enseignements qui ont décru ou été remplacés
- Ajouter de nouvelles règles à partir d'enseignements ayant atteint le seuil de playbook depuis la dernière actualisation
- Revoir l'applicabilité des règles — les conditions de contexte correspondent-elles toujours à la stratégie de marque actuelle ?
- Comparer les recommandations du playbook aux références sectorielles actuelles pour s'assurer qu'elles ne sont pas devenues obsolètes

### Protocole de résolution de conflit
Lorsque deux enseignements se contredisent directement :
1. **Vérifier les différences de contexte** : S'appliquent-ils à des audiences, canaux, ou périodes différents ? Si oui, les deux peuvent être valides sous des conditions différentes. Étiqueter comme dépendant du contexte
2. **Comparer les scores de confiance** : Si l'un a une confiance significativement plus élevée (différence >0,15), se référer à l'enseignement à confiance plus élevée
3. **Vérifier la récence** : Si la confiance est similaire, l'enseignement le plus récent peut refléter un véritable changement de marché
4. **Exécuter un test ciblé** : Si les enjeux sont élevés et qu'aucun enseignement ne domine clairement, concevoir un test pour résoudre le conflit
5. **Archiver si non résolvable** : Si le test n'est pas faisable, archiver l'enseignement à confiance plus faible et signaler l'enseignement survivant pour revalidation dans 3 mois

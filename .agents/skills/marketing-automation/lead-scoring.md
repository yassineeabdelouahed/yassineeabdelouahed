# Référence du lead scoring

Référence complète pour construire, calibrer, et maintenir des modèles de lead scoring qui prédisent avec précision l'intention d'achat et la maturité commerciale.

---

## Fondamentaux de la notation

Le lead scoring attribue des valeurs numériques aux contacts selon deux dimensions :

1. **Notation explicite (adéquation)** — Dans quelle mesure cette personne correspond-elle à votre profil de client idéal ? Basée sur des données démographiques et firmographiques.
2. **Notation implicite (engagement)** — Quel est le niveau d'intérêt de cette personne pour votre produit ou service ? Basée sur des signaux comportementaux.

Le score combiné détermine l'étape de cycle de vie (froid, tiède, MQL, SQL) et déclenche les actions appropriées (continuer le nurturing, alerter les ventes, escalader la priorité).

**Échelle de notation** : Utiliser 0-100. Les scores au-dessus de 100 indiquent une adéquation + un engagement exceptionnels et devraient tout de même déclencher le transfert SQL — ils n'ont pas besoin d'un plafond plus élevé.

---

## Notation explicite (adéquation démographique/firmographique)

La notation explicite mesure dans quelle mesure un lead correspond à votre profil de client idéal (ICP). Ces points sont attribués en fonction de qui est la personne, pas de ce qu'elle fait.

### Critères de notation explicite B2B

| Critère | Forte adéquation | Adéquation modérée | Adéquation faible | Disqualifiant |
|---|---|---|---|---|
| **Taille d'entreprise (employés)** | 50-500 (+15) | 501-2000 (+10) | 10-49 (+5) | <10 ou >5000 (+0) |
| **Chiffre d'affaires annuel** | 5M$-50M$ (+15) | 50M$-200M$ (+10) | 1M$-5M$ (+5) | <1M$ (+0) |
| **Secteur** | Secteur cible (+15) | Secteur adjacent (+8) | Secteur neutre (+3) | Secteur exclu (-10) |
| **Titre de poste/rôle** | Décideur (VP+) (+20) | Influenceur (directeur/manager) (+12) | Utilisateur final (+5) | Stagiaire/étudiant (-5) |
| **Département** | Département acheteur principal (+10) | Département lié (+5) | Département non lié (+0) | — |
| **Géographie** | Marché cible (+10) | Marché desservi (+5) | Distant/non pris en charge (+0) | Région restreinte (-15) |

**Notes :**
- Les valeurs de points ci-dessus sont des modèles de départ. Calibrer après 90 jours de données de conversion.
- Les critères de « forte adéquation » devraient refléter votre top 20 % des deals gagnés.
- Ajuster les fourchettes de taille d'entreprise et de chiffre d'affaires selon VOTRE ICP, pas des benchmarks génériques.

### Critères de notation explicite B2C

| Critère | Haute valeur | Valeur moyenne | Faible valeur |
|---|---|---|---|
| **Localisation** | Marché principal (+10) | Marché secondaire (+5) | Hors zone de service (+0) |
| **Âge/démographie** | Démographie cœur de cible (+10) | Démographie adjacente (+5) | Hors cible (+0) |
| **Tranche de revenu** | Tranche cible (+10) | Tranche adjacente (+5) | Sous le seuil (+0) |
| **Type de client** | Ancien client (+15) | Parrainage (+10) | Lead froid (+0) |
| **Intérêt produit** | Produit à forte marge (+10) | Produit standard (+5) | Faible marge/niveau gratuit (+0) |

### Notation explicite e-commerce

| Critère | Points |
|---|---|
| Compte créé | +10 |
| Moyen de paiement ajouté | +15 |
| Historique d'achat passé (1-2 commandes) | +10 |
| Historique d'achat passé (3+ commandes) | +20 |
| Panier moyen élevé (>2x la moyenne) | +15 |
| Inscrit au SMS | +5 |
| Membre du programme de fidélité | +10 |

---

## Notation implicite (engagement comportemental)

La notation implicite mesure l'intention à travers les actions. Ce que quelqu'un fait révèle son niveau d'intérêt.

### Engagement e-mail

| Action | Points | Déclin |
|---|---|---|
| A ouvert un e-mail | +1 | Par e-mail, plafonné à +5/semaine |
| A cliqué sur un lien e-mail | +3 | Par clic, plafonné à +10/semaine |
| A cliqué sur un CTA (pas juste un lien) | +5 | Par clic sur CTA |
| A répondu à un e-mail | +10 | Par réponse |
| A transféré un e-mail | +8 | Par transfert |
| A ouvert 5+ e-mails en 30 jours | +5 | Bonus pour engagement soutenu |

### Comportement sur le site web

| Action | Points | Notes |
|---|---|---|
| Visite de page générale | +1 | Par page, plafonné à +5/session |
| Lecture d'article de blog (>60s sur la page) | +2 | Ne compter que les lectures significatives |
| Visite de page produit/service | +5 | Pages à forte intention |
| Visite de la page tarifaire | +15 | Signal d'achat le plus fort avant la demande de démo |
| Visite de page comparaison/alternative | +10 | Signal d'étape d'évaluation |
| Page d'étude de cas/témoignage | +8 | Recherche de preuve sociale = étape de considération |
| Visite de la page carrières | +0 ou -5 | Probablement un candidat à l'emploi, pas un acheteur |
| 3+ sessions en 7 jours | +10 | Bonus pour engagement répété |
| 5+ pages par session | +5 | Engagement profond sur le site |

### Téléchargements de contenu

| Action | Points | Notes |
|---|---|---|
| Contenu haut de tunnel (checklist, infographie) | +5 | Étape de notoriété |
| Contenu milieu de tunnel (livre blanc, guide, rapport) | +10 | Étape de considération |
| Contenu bas de tunnel (calculateur de ROI, guide d'achat) | +15 | Étape de décision |
| Inscription à un webinaire | +10 | — |
| Assistance à un webinaire (en direct) | +15 | Intention plus élevée que la seule inscription |
| Webinaire visionné à la demande | +8 | Intention mais urgence plus faible |

### Actions à forte intention

| Action | Points | Notes |
|---|---|---|
| Demande de démo | +25 | Intention d'achat directe |
| Inscription à l'essai gratuit | +20 | Évaluation du produit |
| Formulaire de contact commercial | +25 | Signal d'achat explicite |
| Chat avec les ventes | +15 | Engagement en temps réel avec les ventes |
| Demande de RFP/devis | +30 | Processus d'achat actif |
| Assistance à un événement ou une réunion en personne | +20 | Action de fort engagement |

### Usage produit (SaaS)

| Action | Points | Notes |
|---|---|---|
| Onboarding terminé | +15 | Utilisateur activé |
| Fonctionnalité principale utilisée | +10 | A trouvé la valeur principale |
| Membre d'équipe invité | +20 | Signal d'expansion — indicateur PQL le plus fort |
| Intégration connectée | +15 | Approfondissement de l'engagement |
| Approche de la limite d'usage | +10 | Déclencheur d'upgrade naturel |
| Usage quotidien actif (7+ jours) | +15 | Utilisateur habituel |

---

## Notation négative

La notation négative est aussi importante que la notation positive. Elle empêche les leads non qualifiés d'atteindre les ventes et protège la précision de la notation.

### Notation négative basée sur l'engagement

| Signal | Points | Notes |
|---|---|---|
| E-mail rejeté (rebond dur) | -15 | Contact invalide — signaler aussi pour l'hygiène des données |
| E-mail rejeté (rebond doux, 3+ fois) | -10 | Problème de délivrabilité |
| Désabonné des e-mails | -25 | Signal de désengagement clair |
| E-mail marqué comme spam | -50 | Retirer entièrement de la notation |
| Aucun engagement e-mail depuis 30 jours | -5 | Appliquer comme déclin continu |
| Aucun engagement e-mail depuis 60 jours | -10 | Déclin supplémentaire |
| Aucun engagement e-mail depuis 90 jours | -15 | Déclin supplémentaire — déclencher le workflow de ré-engagement |
| Aucune visite de site depuis 60 jours | -10 | — |

### Notation négative basée sur l'adéquation

| Signal | Points | Notes |
|---|---|---|
| E-mail de domaine concurrent | -50 | Probablement de la veille concurrentielle, pas un acheteur |
| Domaine e-mail gratuit (gmail, yahoo) pour B2B | -10 | Peut être valide mais confiance plus faible pour l'entreprise |
| E-mail étudiant/académique (.edu) | -15 | Recherche, pas intention d'achat (sauf ed-tech) |
| Titre de poste : stagiaire, étudiant, assistant | -10 | Faible autorité décisionnelle |
| Taille d'entreprise sous le minimum | -15 | Sous le seuil desservable |
| Secteur disqualifié | -20 | Impossible de servir ce secteur |
| A visité uniquement la page carrières | -15 | Candidat à l'emploi, pas prospect |

### Notation négative comportementale

| Signal | Points | Notes |
|---|---|---|
| Désabonné du produit/essai | -20 | Rejet actif |
| Demande de suppression de données (RGPD) | Retirer de la notation | Exigence de conformité — arrêter toute notation |
| A téléchargé une comparaison concurrent et jamais revenu | -5 | Simple curieux |
| Rendez-vous/démo annulé sans se présenter | -10 | Faible engagement |
| Remplissages de formulaire répétés avec de fausses données | -25 | Bot ou lead de faible qualité |

---

## Seuils de score et étapes de cycle de vie

| Plage de score | Étape | Définition | Action |
|---|---|---|---|
| 0-25 | **Froid** | Faible adéquation ou faible engagement. Peut-être en début d'étape ou mauvaise adéquation. | Continuer le nurturing haut de tunnel. Ne pas transférer aux ventes. |
| 26-50 | **Tiède** | Adéquation et/ou engagement modérés. Montre un intérêt initial. | Nurturing milieu de tunnel. Personnaliser selon le comportement. |
| 51-75 | **MQL** (Marketing Qualified Lead) | Forte adéquation + engagement significatif. Prêt pour l'évaluation commerciale. | Alerter l'équipe commerciale. Démarrer le processus de transfert MQL-vers-SQL. |
| 76-100 | **SQL** (Sales Qualified Lead) | Forte adéquation + fort engagement. A démontré des signaux d'achat. | Suivi commercial immédiat. SLA : répondre sous 4 heures (B2B) ou 1 heure (B2C). |

### Processus de calibration des seuils

1. **Commencer avec les valeurs par défaut ci-dessus** pour les 90 premiers jours.
2. **Après 90 jours**, extraire les données de conversion : quel score les deals gagnés ont-ils atteint avant de convertir ?
3. **Trouver le point de rupture naturel** : la plage de score où le taux de conversion bondit significativement. C'est votre seuil MQL.
4. **Valider avec les ventes** : demander aux ventes quels MQL étaient réellement qualifiés. Si >60 % des MQL convertissent en SQL, votre seuil est correct. Si <40 %, votre seuil MQL est trop bas (vous envoyez des leads pas prêts).
5. **Recalibrer trimestriellement** : les comportements d'achat, les changements de produit, et les évolutions de marché affectent tous la précision de la notation.

---

## Profilage progressif

Le profilage progressif collecte les informations de lead de manière incrémentale à travers plusieurs interactions plutôt que de tout demander d'emblée.

### Collecte de données par niveau d'engagement

| Niveau d'engagement | Données à collecter | Méthode |
|---|---|---|
| **Premier contact** | Adresse e-mail uniquement | Formulaire à un seul champ, inscription en ligne |
| **Deuxième engagement** (téléchargement de contenu) | Prénom, nom d'entreprise | Formulaire à 2-3 champs |
| **Troisième engagement** (contenu plus approfondi) | Titre de poste, taille d'entreprise | Formulaire à 3-4 champs (préremplir les champs connus) |
| **Quatrième engagement** (forte intention) | Téléphone, secteur, points de douleur | Formulaire plus long acceptable à ce niveau d'intention |
| **Seuil MQL** | Budget, calendrier, processus de décision | Appel de découverte commercial (pas des formulaires) |

**Règles :**
- Ne jamais demander une information que vous avez déjà. Préremplir les champs connus.
- Ne jamais verrouiller du contenu haut de tunnel derrière des formulaires de 5+ champs. La baisse de taux de conversion n'en vaut pas la peine.
- Chaque champ de formulaire supplémentaire réduit le taux de complétion d'environ 10 %.
- Utiliser des outils d'enrichissement (Clearbit, ZoomInfo, Apollo) pour remplir les données firmographiques sans demander au prospect.

---

## Modèles de lead scoring par type d'entreprise

### SaaS B2B

- **Accent** : Signaux d'usage produit > engagement e-mail > consommation de contenu
- **Indicateurs PQL clés** : Membre d'équipe invité, intégration connectée, usage quotidien actif
- **Critères MQL** : Score 55+ avec au moins une action à forte intention (demande de démo, visite page tarifaire + inscription à l'essai)
- **Critères SQL** : Score 80+ OU seuil PQL atteint (jalons d'usage produit spécifiques)
- **Considération unique** : L'usage du niveau gratuit doit être noté avec soin — un fort engagement produit ne signifie pas toujours une intention d'achat si le niveau gratuit suffit

### Services professionnels B2B

- **Accent** : Consommation de contenu (études de cas, contenu méthodologique) > demande directe > assistance à des événements
- **Signaux clés** : A téléchargé plusieurs études de cas du même secteur, a assisté à un webinaire, est revenu sur le site 3+ fois
- **Critères MQL** : Score 50+ avec adéquation sectorielle confirmée et engagement avec du contenu au niveau solution
- **Critères SQL** : Score 75+ OU demande de consultation directe
- **Considération unique** : Cycles de vente longs (3-12 mois). Le déclin de score doit être plus lent (mensuel, pas hebdomadaire). Pondérer fortement l'adéquation sectorielle — un secteur mal aligné convertit presque jamais.

### E-commerce B2C

- **Accent** : Comportement de navigation > activité panier > historique d'achat > engagement e-mail
- **Signaux clés** : Visites répétées du site, création de panier, ajouts à la liste de souhaits, vues de pages produits (surtout 3+ produits dans la même catégorie)
- **Application de la notation** : Déclencher les workflows d'abandon de panier, d'abandon de navigation, et de réapprovisionnement plutôt que le transfert MQL traditionnel
- **Considération unique** : Aucun transfert vers une « équipe commerciale ». Le score pilote l'inscription à des workflows automatisés et le ciblage promotionnel.

### Entreprise locale

- **Accent** : Proximité de localisation > demande directe > engagement aux avis
- **Signaux clés** : A visité la page itinéraire/localisation, a appelé l'entreprise, a soumis un formulaire de contact, a cliqué sur « prendre rendez-vous »
- **Application de la notation** : Modèle simple à 3 niveaux (froid/tiède/chaud) déclenchant un suivi automatisé
- **Considération unique** : Le volume est généralement assez faible pour qu'une notation complexe soit inutile. Se concentrer sur la vitesse de réponse plutôt que sur la sophistication de la notation.

---

## Déclin du score

Les scores doivent décliner avec le temps pour refléter que l'engagement s'estompe. Un lead qui était très engagé il y a 6 mois mais silencieux depuis n'est pas le même qu'un lead actif aujourd'hui.

### Modèles de déclin

**Déclin basé sur le temps (recommandé pour la plupart des entreprises) :**

| Période d'inactivité | Action de déclin |
|---|---|
| 14 jours sans activité | -2 points (rappel doux) |
| 30 jours sans activité | -5 points |
| 60 jours sans activité | -10 points + déclencher le workflow de ré-engagement |
| 90 jours sans activité | -15 points |
| 180 jours sans activité | Réinitialiser à la ligne de base (conserver le score d'adéquation explicite, remettre à zéro le score comportemental) |

**Déclin basé sur l'activité (pour les modèles à fort engagement) :**
- Ne décliner que les scores comportementaux, pas les scores d'adéquation (la taille d'une entreprise ne change pas parce qu'elle a arrêté de lire vos e-mails)
- Appliquer le déclin proportionnellement : les contacts à fort engagement déclinent plus vite car leurs scores gonflés sont plus trompeurs s'ils sont obsolètes
- Remettre le score comportemental à zéro après 6 mois d'inactivité, puis renoter uniquement sur les nouvelles actions

**Ajustement saisonnier :**
- Suspendre le déclin pendant les périodes de faible activité connues (fêtes, été) pour le B2B
- Pour le B2C, inverser : augmenter la notation pendant les pics saisonniers (Black Friday, rentrée scolaire) pour capter l'urgence

---

## Règles de transfert commercial

### Processus de transfert MQL-vers-SQL

1. **Le lead atteint le seuil MQL** (score 51-75)
2. **Notification automatisée** envoyée au commercial assigné (ou en round-robin à l'équipe SDR)
3. **SLA de transfert** : les ventes doivent contacter le MQL dans une fenêtre définie
   - SaaS B2B : 4 heures ouvrées
   - Entreprise B2B : 24 heures ouvrées (recherche nécessaire avant la prise de contact)
   - B2C/e-commerce : 1 heure (ou automatisé — aucun humain nécessaire)
4. **Qualification commerciale** : le SDR/AE détermine si le MQL est réellement prêt pour les ventes
   - **Accepté** → SQL (score ajusté à 76+, entre dans le pipeline commercial)
   - **Rejeté** → Recyclé vers le nurturing marketing avec une raison de feedback
   - **Disqualifié** → Retiré de la notation (mauvaise adéquation, mauvaise personne, concurrent)
5. **Boucle de rétroaction** : les raisons de rejet commercial réalimentent la calibration du modèle de notation
   - Si 50 %+ des MQL sont rejetés, le seuil MQL est trop bas
   - Si <5 % des MQL sont rejetés, le seuil pourrait être trop haut (opportunités manquées)

### Package de données de transfert

Lors du transfert d'un MQL aux ventes, inclure :
- Décomposition du score du lead (explicite vs. implicite)
- Chronologie complète d'activité (pages visitées, contenu téléchargé, e-mails engagés)
- Données d'enrichissement entreprise/contact
- Source du premier contact et de l'engagement le plus récent
- Séquence de nurturing active (pour que les ventes ne répètent pas ce que le marketing a déjà dit)
- Tout point de douleur connu ou signal de cas d'usage issu des schémas d'engagement au contenu

---

## Déclencheurs de re-notation

Certains événements devraient déclencher une réévaluation complète du score d'un contact plutôt que des changements incrémentaux.

| Déclencheur | Action |
|---|---|
| Changement de titre de poste (promotion) | Renoter l'adéquation explicite. Une promotion VP = augmentation significative du score. |
| Changement d'entreprise | Renoter tous les critères explicites. La nouvelle entreprise pourrait ne pas être l'ICP. |
| Ré-engagement après dormance | Remettre le score comportemental à zéro, puis renoter uniquement à partir de la nouvelle activité |
| Deal perdu | Réinitialiser à tiède (30-40 points), entrer en nurturing long terme. Ne pas remettre à zéro. |
| Client churné | Déplacer vers le parcours win-back. Noter séparément du lead scoring de nouveaux leads. |
| Demande de retrait du pipeline commercial | Retirer du SQL, retourner au nurturing MQL. Réduire le score de 20. |
| Enregistrements en double fusionnés | Combiner les scores : prendre le score explicite le plus élevé + somme du comportemental (plafonné à 100) |

---

## Mesurer la précision du modèle de notation

### Métriques clés

| Métrique | Objectif | Ce qu'elle indique |
|---|---|---|
| **Taux de conversion MQL-vers-SQL** | 40-60 % | Les MQL sont-ils réellement qualifiés ? |
| **Taux de conversion SQL-vers-Opportunité** | 50-70 % | Les SQL sont-ils vraiment prêts pour les ventes ? |
| **Taux MQL-vers-Deal gagné** | 5-15 % (B2B) | Efficacité de la notation de bout en bout |
| **Score moyen à la conversion** | Analyse de clusters | Où les conversions se produisent réellement sur l'échelle |
| **Taux de faux positifs** | <40 % | Leads à score élevé qui ne convertissent jamais |
| **Taux de faux négatifs** | <10 % | Leads à faible score qui convertissent quand même (opportunités manquées) |
| **Corrélation score-chiffre d'affaires** | R > 0,5 | Le score prédit-il réellement le chiffre d'affaires ? |
| **Délai de MQL à SQL** | En baisse trimestre après trimestre | La notation identifie-t-elle la maturité plus tôt ? |

### Checklist d'audit de notation trimestriel

1. Extraire tous les leads convertis en client au cours du dernier trimestre
2. Analyser leur score au moment du transfert MQL — quelle était la distribution ?
3. Extraire tous les MQL rejetés par les ventes — quel était leur score au transfert ?
4. Identifier tout client jamais noté comme MQL (faux négatifs) — quels signaux ont été manqués ?
5. Comparer le score moyen à la conversion par rapport au seuil MQL — ajuster le seuil s'ils divergent
6. Revoir les 5 leads les mieux notés qui n'ont PAS converti — pourquoi ? Certains critères de notation sont-ils surpondérés ?
7. Vérifier l'efficacité du déclin — les leads obsolètes sont-ils correctement déprioritisés ?
8. Valider avec l'équipe commerciale — feedback qualitatif sur la tendance de qualité des MQL

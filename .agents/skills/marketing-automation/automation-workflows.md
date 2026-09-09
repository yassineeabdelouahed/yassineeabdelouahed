# Référence des workflows d'automatisation

Référence complète pour concevoir, construire et optimiser des workflows d'automatisation marketing à travers les plateformes et les modèles économiques.

---

## Types de déclencheurs

Chaque workflow d'automatisation commence par un déclencheur — l'événement ou la condition qui inscrit un contact dans le flux.

### Déclencheurs basés sur le temps
- **Basé sur une date** : Date d'inscription, anniversaire d'abonnement, date de renouvellement de contrat, anniversaire
- **Basé sur un délai** : X jours après l'inscription, X heures après le dernier achat, X semaines depuis le dernier engagement
- **Planifié** : Digest hebdomadaire, récapitulatif mensuel, rappel de revue trimestrielle
- **Idéal pour** : Campagnes de cycle de vie, communications récurrentes, workflows d'anniversaire/renouvellement

### Déclencheurs basés sur des événements
- **Soumission de formulaire** : Téléchargement de lead magnet, demande de démo, formulaire de contact, inscription à un webinaire
- **Événement d'achat** : Premier achat, achat répété, commande à haute valeur, produit/catégorie spécifique
- **Événement de compte** : Inscription, début d'essai, upgrade de plan, downgrade de plan, annulation
- **Idéal pour** : Workflows à réponse immédiate où la sensibilité au timing est élevée

### Déclencheurs comportementaux
- **Engagement e-mail** : Ouvertures, clics, réponses, transferts, ou absence de ceux-ci
- **Comportement sur le site web** : Visite de page (en particulier tarification, comparaison, pages d'études de cas), durée de session, profondeur de défilement
- **Usage produit** : Activation de fonctionnalité, jalon d'usage, inactivité, approche de la limite d'usage
- **Consommation de contenu** : Lectures de blog, visionnages vidéo, écoutes de podcast, téléchargements de ressources
- **Idéal pour** : Workflows basés sur l'intention qui répondent aux signaux des prospects

### Déclencheurs conditionnels
- **Seuil de score** : Le score de lead franchit le seuil MQL ou SQL
- **Changement de propriété** : Changement de titre de poste, changement de taille d'entreprise, changement d'étape de cycle de vie
- **Appartenance à une liste** : Ajouté à ou retiré d'un segment ou d'une liste spécifique
- **Changement d'étape de deal** : Opportunité créée, déplacée en négociation, gagnée, perdue
- **Idéal pour** : Workflows pilotés par le CRM et transitions d'étape de cycle de vie

### Déclencheurs hybrides
- **Conditions composées** : Déclencheur comportemental ET seuil de score (par exemple, a visité la page tarifaire ET score > 50)
- **Comportement borné dans le temps** : Action spécifique dans une fenêtre de temps (par exemple, 3 visites de page en 7 jours)
- **Déclencheurs négatifs** : Absence de comportement attendu dans une fenêtre (par exemple, aucune connexion dans les 14 jours suivant l'inscription)
- **Idéal pour** : Workflows sophistiqués nécessitant plusieurs signaux avant activation

---

## Schémas de workflow

### 1. Série de bienvenue

| Élément | Détail |
|---|---|
| **Déclencheur** | Nouvel abonné, inscription de compte, ou première soumission de formulaire |
| **Objectif** | Orienter, construire la confiance, fixer les attentes, générer la première action significative |
| **Étapes** | 3 à 5 e-mails sur 7 à 14 jours |
| **Timing** | E-mail 1 : immédiat. E-mail 2 : jour 2. E-mail 3 : jour 5. E-mail 4 : jour 8. E-mail 5 : jour 12. |
| **Conditions de sortie** | Série terminée, désabonné, ou converti vers l'étape de cycle de vie suivante |
| **Métriques de succès** | Taux d'ouverture >50 %, taux de clic >15 %, taux de complétion >60 %, taux de première action |

**Structure de la séquence :**
1. **Bienvenue + livraison de valeur** (immédiat) — Remercier, livrer l'actif promis, fixer les attentes pour la suite
2. **Histoire de marque + preuve sociale** (jour 2) — Qui vous êtes, qui vous servez, preuve que ça fonctionne
3. **Contenu de gain rapide** (jour 5) — Conseil ou ressource actionnable utilisable immédiatement
4. **Approfondissement fonctionnalité/bénéfice** (jour 8) — Mettre en avant votre proposition de valeur principale avec des détails concrets
5. **CTA doux** (jour 12) — Inviter à l'étape suivante (démo, essai, achat, consultation)

### 2. Récupération de panier abandonné

| Élément | Détail |
|---|---|
| **Déclencheur** | Panier créé mais paiement non finalisé dans l'heure |
| **Objectif** | Récupérer le chiffre d'affaires abandonné |
| **Étapes** | 3 e-mails + SMS optionnel sur 72 heures |
| **Timing** | E-mail 1 : 1 heure. E-mail 2 : 24 heures. SMS (optionnel) : 36 heures. E-mail 3 : 72 heures. |
| **Conditions de sortie** | Achat finalisé, panier vidé, ou désabonné |
| **Métriques de succès** | Taux de récupération de 5 à 15 %, chiffre d'affaires récupéré, panier moyen des paniers récupérés |

**Structure de la séquence :**
1. **Rappel** (1 heure) — « Vous avez oublié quelque chose. » Montrer le contenu du panier. Aucune réduction.
2. **Urgence + preuve sociale** (24 heures) — Avis, rareté de stock, ou délai de livraison. Toujours aucune réduction.
3. **Relance SMS** (36 heures, optionnel) — Bref « Vous hésitez encore ? » avec lien vers le panier
4. **Incitation** (72 heures) — Réduction ou livraison gratuite en dernier recours seulement. Si la marge le permet, 10-15 % de réduction.

**Règle critique** : Ne jamais habituer les clients à attendre des réductions en en proposant dès le premier e-mail. Commencer par la valeur, monter en urgence, et utiliser les réductions uniquement comme tentative de récupération finale.

### 3. Ré-engagement (Win-Back)

| Élément | Détail |
|---|---|
| **Déclencheur** | Aucune ouverture ni clic d'e-mail depuis 60 à 90 jours (B2C) ou 90 à 120 jours (B2B) |
| **Objectif** | Réactiver les contacts dormants ou confirmer qu'ils doivent être supprimés |
| **Étapes** | 3 à 4 e-mails sur 21 à 30 jours |
| **Timing** | E-mail 1 : jour 0. E-mail 2 : jour 7. E-mail 3 : jour 14. E-mail 4 (sunset) : jour 21-30. |
| **Conditions de sortie** | Ré-engagé (ouvert/cliqué), désabonné, ou sunset terminé (déplacé vers supprimé) |
| **Métriques de succès** | Taux de réactivation de 5 à 12 %, liste nettoyée des contacts véritablement inactifs |

**Structure de la séquence :**
1. **« Vous nous manquez »** — Mettre en avant ce qu'ils manquent, les nouvelles fonctionnalités, ou le contenu populaire depuis leur désengagement
2. **Meilleur contenu** — Envoyer votre pièce de contenu la plus performante pour maximiser la chance de ré-engagement
3. **Mise à jour des préférences** — Demander s'ils veulent changer la fréquence ou les sujets (donner le contrôle, pas seulement le désabonnement)
4. **Avertissement de sunset** — « Nous cesserons de vous envoyer des e-mails sauf si vous cliquez ici. » Retirer les non-répondants de la liste active.

**Règle critique** : Ne pas continuer à envoyer des e-mails aux contacts véritablement inactifs. Ils endommagent la réputation d'expéditeur. L'e-mail de sunset n'est pas optionnel — c'est une hygiène de délivrabilité.

### 4. Suivi post-achat

| Élément | Détail |
|---|---|
| **Déclencheur** | Achat finalisé |
| **Objectif** | Réduire le remords de l'acheteur, stimuler l'adoption du produit, encourager l'avis, créer un acheteur récurrent |
| **Étapes** | 4 à 6 e-mails sur 30 à 60 jours |
| **Timing** | E-mail 1 : immédiat. E-mail 2 : jour 3. E-mail 3 : jour 7-10. E-mail 4 : jour 14. E-mail 5 : jour 30. E-mail 6 : jour 45-60. |
| **Conditions de sortie** | Série terminée ou second achat effectué (déplacer vers le parcours fidélité) |
| **Métriques de succès** | Taux d'avis, taux de réponse NPS, taux de rachat, taux de tickets support |

**Structure de la séquence :**
1. **Confirmation de commande + attentes** (immédiat) — Confirmer l'achat, fixer les attentes de livraison, fournir le suivi
2. **Premiers pas** (jour 3) — Comment utiliser le produit, guides de configuration, conseils pour la première utilisation
3. **Point de suivi** (jour 7-10) — « Comment ça se passe ? » Lien vers le support si besoin
4. **Demande d'avis** (jour 14) — Demander un avis/une note une fois qu'ils ont eu le temps de l'utiliser
5. **Vente croisée/additionnelle** (jour 30) — Produits complémentaires basés sur l'achat
6. **Réapprovisionnement ou fidélité** (jour 45-60) — Rappel de recommande (consommables) ou invitation au programme de fidélité

### 5. Nurturing de lead (B2B)

| Élément | Détail |
|---|---|
| **Déclencheur** | Lead créé (remplissage de formulaire, téléchargement de contenu, inscription à webinaire) mais pas encore MQL |
| **Objectif** | Éduquer, construire la confiance, et faire avancer le lead vers le seuil MQL |
| **Étapes** | 5 à 8 e-mails sur 4 à 8 semaines |
| **Timing** | Tous les 5-7 jours pour le B2B (moins fréquent que le B2C) |
| **Conditions de sortie** | Score MQL atteint, réunion réservée, désabonné, ou disqualifié |
| **Métriques de succès** | Taux de conversion MQL, délai jusqu'au MQL, taux d'engagement au contenu |

**Structure de la séquence :**
1. **Livraison de valeur** — Livrer le contenu promis, se présenter
2. **Éducation au problème** — Développer sur le point de douleur, partager des données sectorielles
3. **Cadre de solution** — Comment des problèmes comme le leur se résolvent (méthodologie, pas argumentaire produit)
4. **Preuve sociale** — Étude de cas ou histoire client pertinente pour leur secteur/taille
5. **Contenu d'approfondissement** — Webinaire, guide, ou rapport démontrant l'expertise
6. **Comparaison/évaluation** — Les aider à évaluer les options (y compris la vôtre) de manière honnête
7. **CTA doux** — Proposer une consultation, une démo, ou une évaluation
8. **CTA direct** — Prochaine étape spécifique avec urgence ou valeur ajoutée

### 6. Onboarding SaaS

| Élément | Détail |
|---|---|
| **Déclencheur** | Essai commencé ou compte créé |
| **Objectif** | Stimuler l'activation (atteindre le « moment aha »), réduire le délai de valeur, convertir l'essai en payant |
| **Étapes** | 5 à 7 e-mails sur la période d'essai (7 à 30 jours) |
| **Timing** | E-mail 1 : immédiat. Puis basé sur les jalons d'activation + repli basé sur le temps. |
| **Conditions de sortie** | Converti en payant, essai expiré, ou compte supprimé |
| **Métriques de succès** | Taux d'activation, adoption de fonctionnalité, taux de conversion essai-vers-payant |

**Structure de la séquence :**
1. **Bienvenue + démarrage rapide** (immédiat) — Chemin le plus court vers la première valeur. Une seule action à accomplir.
2. **Jalon d'activation 1** (jour 1-2) — Guide pour accomplir la première action clé
3. **Mise en avant de fonctionnalité** (jour 3-5) — Mettre en avant la fonctionnalité la plus corrélée à la conversion
4. **Preuve sociale** (jour 5-7) — Histoire de succès client d'un utilisateur/entreprise similaire
5. **Conseils avancés** (jour 7-10) — Fonctionnalités power user, intégrations, collaboration d'équipe
6. **CTA de conversion** (3-5 jours avant la fin de l'essai) — Invitation à upgrade avec comparaison de plans
7. **Dernière chance** (jour avant expiration) — Dernière relance de conversion, offre à durée limitée si approprié

**Logique de branchement** : Si l'utilisateur accomplit les jalons d'activation tôt, sauter les e-mails éducatifs et passer au parcours de conversion. S'il est inactif après le jour 3, déclencher une branche de ré-engagement.

### 7. Win-Back (client churné)

| Élément | Détail |
|---|---|
| **Déclencheur** | Abonnement annulé ou aucun achat depuis X jours (2x le cycle d'achat moyen) |
| **Objectif** | Récupérer les clients churnés |
| **Étapes** | 3 à 5 e-mails sur 30 à 60 jours |
| **Timing** | E-mail 1 : 3 jours après le churn. E-mail 2 : 14 jours. E-mail 3 : 30 jours. E-mail 4 : 45 jours. E-mail 5 : 60 jours. |
| **Conditions de sortie** | Réactivé, désabonné, ou série terminée (déplacer vers dormant long terme) |
| **Métriques de succès** | Taux de win-back de 5 à 15 %, chiffre d'affaires de réactivation |

### 8. Collecte de feedback

| Élément | Détail |
|---|---|
| **Déclencheur** | Événement post-interaction (achat, ticket support résolu, onboarding terminé, événement assisté) |
| **Objectif** | Collecter NPS, CSAT, ou feedback produit |
| **Étapes** | 2 à 3 e-mails sur 7 à 10 jours |
| **Timing** | E-mail 1 : 1-3 jours après l'événement. E-mail 2 : 5-7 jours. E-mail 3 (remerciement) : immédiat après réponse. |
| **Conditions de sortie** | Sondage terminé ou série terminée |
| **Métriques de succès** | Taux de réponse >15 %, score NPS, volume de feedback actionnable |

### 9. Anniversaire/Date de naissance

| Élément | Détail |
|---|---|
| **Déclencheur** | Basé sur une date : anniversaire client, date de naissance, ou anniversaire d'inscription |
| **Objectif** | Construire la fidélité, stimuler l'engagement, créer une occasion d'achat |
| **Étapes** | 1 à 2 e-mails |
| **Timing** | E-mail 1 : le jour même (ou 1-3 jours avant). E-mail 2 : rappel 3-5 jours après si l'offre n'est pas utilisée. |
| **Conditions de sortie** | Offre utilisée, expirée, ou désabonné |
| **Métriques de succès** | Taux d'utilisation, chiffre d'affaires généré, hausse d'engagement |

### 10. Renouvellement d'abonnement

| Élément | Détail |
|---|---|
| **Déclencheur** | Date de renouvellement d'abonnement approchant (30 à 60 jours) |
| **Objectif** | Retenir l'abonné, réduire le churn involontaire, upsell vers l'annuel |
| **Étapes** | 3 à 5 e-mails sur 30 à 45 jours |
| **Timing** | E-mail 1 : 30-45 jours avant. E-mail 2 : 14 jours avant. E-mail 3 : 3 jours avant. E-mail 4 : jour du renouvellement. E-mail 5 : post-renouvellement/expiré. |
| **Conditions de sortie** | Renouvelé, annulé, ou paiement échoué (déplacer vers workflow de relance de paiement) |
| **Métriques de succès** | Taux de renouvellement, taux de churn volontaire, taux d'upgrade vers plan annuel |

---

## Logique de décision et branchement

### Schémas de branchement Si/Alors

**Branchement basé sur l'engagement :**
```
SI a ouvert l'e-mail 1 → envoyer l'e-mail 2 axé contenu
SI n'a PAS ouvert l'e-mail 1 → renvoyer avec un nouvel objet après 48 heures
  SI toujours aucune ouverture → envoyer un SMS (si consentement existe) ou passer à l'e-mail 3
```

**Branchement basé sur le score :**
```
SI score de lead >= 75 → sortir du nurturing, déclencher le workflow de transfert MQL
SI score de lead 50-74 → continuer le nurturing avec du contenu milieu de tunnel
SI score de lead < 50 → continuer le nurturing avec du contenu éducatif haut de tunnel
```

**Branchement basé sur le comportement :**
```
SI a visité la page tarifaire → accélérer vers l'e-mail d'offre de démo
SI a téléchargé une étude de cas → envoyer une histoire de succès client connexe
SI a assisté à un webinaire → envoyer l'enregistrement à la demande + offre de consultation
SI aucun engagement depuis 30 jours → déplacer vers la branche de ré-engagement
```

### Portes d'engagement

Une porte d'engagement met en pause une séquence jusqu'à ce que le contact démontre de l'engagement. Cela évite d'envoyer du contenu plus approfondi à des contacts qui ne lisent pas les messages précédents.

**Logique de porte :**
```
Envoyer l'e-mail 1 → Attendre 3 jours
  SI ouvert OU cliqué → passer à l'e-mail 2
  SI aucun engagement → attendre 4 jours de plus, renvoyer avec un nouvel objet
    SI toujours aucun engagement → sortir de la séquence, marquer comme faible engagement
```

Les portes protègent la délivrabilité en garantissant que vous ne continuez d'envoyer des e-mails qu'aux personnes qui les lisent.

---

## Orchestration cross-canal

### Priorité et coordination des canaux

| Canal | À utiliser quand | Contenu typique |
|---|---|---|
| **E-mail** | Communication principale, livraison de contenu, nurturing | Format long, éducatif, promotionnel, transactionnel |
| **SMS** | Sensible au temps, forte urgence, messages courts | Rappels de rendez-vous, ventes flash, mises à jour d'expédition, panier abandonné |
| **Notifications push** | Utilisateurs d'application, engagement en temps réel, messages éphémères | Mises à jour de fonctionnalités, alertes d'activité, recommandations personnalisées |
| **Messagerie in-app** | L'utilisateur est activement dans le produit, guidage contextuel | Infobulles d'onboarding, annonces de fonctionnalités, invites d'upgrade |
| **Courrier direct** | Comptes à haute valeur, ré-engagement, moments de marque | Kits de bienvenue, cadeaux d'anniversaire, offres de win-back |
| **Publicités de retargeting** | Renforcement de la notoriété, reste visible entre les e-mails | Notoriété de marque, preuve sociale, renforcement d'offre |

### Règles d'orchestration

1. **Ne jamais envoyer le même message via plusieurs canaux simultanément** — Coordonner pour que chaque canal serve un objectif distinct
2. **Respecter les préférences de canal** — Si un contact refuse le SMS, ne pas tenter de compenser en envoyant deux fois plus d'e-mails
3. **Utiliser l'escalade de canal** — Commencer par l'e-mail. Sans engagement, escalader vers le SMS (avec consentement). Si haute valeur, envisager le courrier direct.
4. **Sensibilité au fuseau horaire** — Envoyer les e-mails pendant les heures ouvrées (B2B) ou les heures actives (B2C) dans le fuseau horaire du contact
5. **Plafond de fréquence global** — Le total des points de contact sur tous les canaux ne devrait pas dépasser un maximum hebdomadaire (3-5 pour le B2B, 5-7 pour le B2C)

### Exemple : panier abandonné multi-canal

```
Heure 0 : Panier abandonné
Heure 1 : E-mail — « Vous avez laissé des articles dans votre panier » avec images produits
Heure 12 : Notification push (si utilisateur d'application) — « Votre panier vous attend »
Heure 24 : E-mail — Preuve sociale + urgence (« Se vend vite »)
Heure 36 : SMS (si consenti) — Message court avec lien vers le panier
Heure 48 : Publicité de retargeting activée — Montrer les produits du panier sur social/display
Heure 72 : E-mail final — Offre de réduction (dernier recours)
```

---

## Tester les workflows d'automatisation

### Tests avant lancement

1. **Test de parcours** : Faire passer des contacts de test par chaque chemin de branchement possible. Vérifier que chaque route livre le bon contenu dans le bon ordre.
2. **Vérification du déclencheur** : Confirmer que le déclencheur se déclenche correctement (et uniquement quand voulu). Tester les cas limites : que se passe-t-il si le déclencheur se déclenche deux fois ? Que se passe-t-il si le contact existe déjà dans le workflow ?
3. **Validation du timing** : Vérifier que les étapes d'attente utilisent les bonnes durées. Vérifier la gestion des fuseaux horaires.
4. **Test de suppression** : Confirmer que les contacts dans les listes de suppression ou d'autres workflows actifs sont correctement exclus.
5. **Test de condition de sortie** : Vérifier que les contacts sortent quand ils le devraient (conversion, désabonnement, disqualification). Confirmer qu'ils ne sortent PAS prématurément.
6. **Test d'intégration** : Vérifier que les enregistrements CRM se mettent à jour, que les scores changent, que les notifications de transfert se déclenchent, et que les appartenances de liste se mettent à jour correctement.

### Tests A/B en flux

- **Tests d'objet** : Tester au sein de la même étape e-mail. Diviser 50/50 avec un gagnant déclaré après 24-48 heures ou un volume suffisant.
- **Tests de variantes de contenu** : Tester différentes approches de contenu à la même étape de séquence.
- **Tests de timing** : Tester différentes durées d'attente entre les e-mails (par exemple, écart de 3 jours vs. 5 jours).
- **Tests de chemin de branchement** : Tester si le branchement comportemental surperforme un chemin linéaire unique.
- **Échantillon minimum** : Ne pas déclarer de gagnants avec moins de 100 contacts par variante. Pour les workflows à faible volume, prolonger les tests plutôt que réduire la taille de l'échantillon.

### Surveillance continue

- **Taux d'inscription** : Les contacts entrent-ils au volume attendu ?
- **Taux de complétion par étape** : Quel pourcentage atteint chaque étape ? Où se situe l'abandon ?
- **Taux d'erreur** : Des étapes échouent-elles (rebonds, erreurs d'intégration, échecs d'envoi) ?
- **Taux de complétion d'objectif** : Quel pourcentage atteint l'objectif défini du workflow ?
- **Délai jusqu'à l'objectif** : Combien de temps faut-il pour atteindre l'objectif ? Cela s'améliore-t-il avec le temps ?
- **Taux de désabonnement par étape** : Identifier les e-mails spécifiques qui génèrent des désabonnements.

---

## Erreurs courantes et anti-schémas

### 1. Aucune condition de sortie
**Problème** : Les contacts bouclent indéfiniment ou reçoivent des messages redondants après conversion.
**Correctif** : Chaque workflow doit avoir des conditions de sortie explicites. Au minimum : objectif atteint, désabonné, ou temps maximum écoulé.

### 2. Workflows qui se chevauchent sans suppression
**Problème** : Un contact est dans une série de bienvenue ET une campagne promotionnelle ET un flux de ré-engagement simultanément, recevant 3+ e-mails par jour.
**Correctif** : Construire une hiérarchie de priorité. Utiliser des listes de suppression ou des règles d'exclusion de workflow. Mettre en œuvre un plafond de fréquence global.

### 3. Envoi trop fréquent
**Problème** : E-mails quotidiens qui ignorent les signaux d'engagement.
**Correctif** : Conditionner la progression à l'engagement. Réduire la cadence pour les non-ouvreurs. Respecter le maximum de 3-5 points de contact par semaine sur tous les canaux.

### 4. Contenu uniforme pour tous
**Problème** : La même séquence de nurturing pour chaque persona, secteur, et étape de cycle de vie.
**Correctif** : Segmenter les workflows selon au moins une dimension (persona, secteur, ou étape de cycle de vie). Utiliser des blocs de contenu dynamique pour la personnalisation au sein de workflows partagés.

### 5. Mentalité « configurer et oublier »
**Problème** : Workflows construits une fois et jamais revus, même alors que les produits, le message, et l'audience évoluent.
**Correctif** : Audits de workflow trimestriels. Revues de performance mensuelles. Reconstruction complète annuelle pour les workflows principaux.

### 6. Ignorer les signaux négatifs
**Problème** : Continuer à envoyer des e-mails à des contacts ayant montré des signaux de désengagement (non-ouvertures multiples, plaintes spam).
**Correctif** : Construire des branches de signaux négatifs qui réduisent la fréquence, changent d'approche, ou déclenchent un sunset. Protéger la réputation d'expéditeur est plus important qu'atteindre un contact de plus.

### 7. Offre de réduction prématurée
**Problème** : Des flux de panier abandonné qui proposent immédiatement 20 % de réduction, habituant les clients à abandonner délibérément.
**Correctif** : Commencer par la valeur, pas les réductions. Utiliser la preuve sociale, l'urgence, et les bénéfices produit avant toute incitation. Si une réduction est nécessaire, la faire uniquement dans le dernier e-mail, et utiliser le montant efficace le plus faible.

### 8. Sauter le warm-up pour les nouveaux workflows
**Problème** : Lancer un workflow vers 50 000 contacts le premier jour, déclenchant les filtres anti-spam.
**Correctif** : Commencer avec un petit segment (5-10 %), surveiller la délivrabilité, et monter en charge sur 2 à 4 semaines. Cela s'applique aux nouvelles IP, nouveaux domaines, et nouveaux workflows à fort volume.

# Segmentation — Cadres RFM, comportemental et cycle de vie

## Modèle de notation RFM

### Dimensions

| Dimension | Définition | Notation (1-5) |
|-----------|-----------|---------------|
| **Récence** | Depuis combien de temps le client a effectué un achat/une action | 5 = 7 derniers jours, 4 = 8-30 jours, 3 = 31-90 jours, 2 = 91-180 jours, 1 = 180+ jours |
| **Fréquence** | À quelle fréquence il/elle achète/s'engage | 5 = 10+/an, 4 = 6-9, 3 = 3-5, 2 = 2, 1 = 1 |
| **Valeur monétaire** | Dépense totale ou valeur générée | 5 = top 10 %, 4 = 11-25 %, 3 = 26-50 %, 2 = 51-75 %, 1 = 25 % du bas |

### Correspondance des segments RFM

| Segment | Score RFM | Description | Action marketing |
|---------|-----------|-------------|-----------------|
| **Champions** | 5-5-5, 5-5-4 | Meilleurs clients, achètent souvent, dépensent beaucoup | Traitement VIP, accès exclusif, demandes de recommandation |
| **Fidèles** | 4-4-4, 5-4-3 | Clients à forte valeur constants | Récompenses de fidélité, vente incitative, vente croisée |
| **Fidèles potentiels** | 5-3-3, 4-3-3 | Clients récents avec un potentiel de croissance | Nurturing, onboarding, programmes d'engagement |
| **Nouveaux clients** | 5-1-1, 5-1-2 | Viennent d'effectuer leur premier achat | Séquence de bienvenue, éducation, gains rapides |
| **À risque** | 2-4-4, 2-3-3 | Étaient bons auparavant, ralentissent | Offres de reconquête, campagnes de réengagement |
| **En dormance** | 1-2-2, 1-1-1 | Longtemps depuis le dernier achat, faible valeur | Offres de dernière chance, extinction si aucune réponse |
| **À ne pas perdre** | 1-5-5, 2-5-5 | Étaient de meilleurs clients, s'estompent maintenant | Reconquête urgente, contact personnel |

---

## Segmentation comportementale

### Segments de comportement d'achat

| Segment | Critères | Stratégie |
|---------|----------|----------|
| Acheteurs pour la première fois | 1 achat | Onboarding, incitation au deuxième achat |
| Acheteurs récurrents | 2-4 achats | Programme de fidélité, vente croisée |
| Acheteurs assidus | 5+ achats | Programme VIP, plaidoyer, recommandation |
| Abandonneurs de panier | Ajouté mais pas acheté | E-mails d'abandon, retargeting |
| Abandonneurs de navigation | Vu mais pas ajouté | Recommandations de produit, preuve sociale |
| Acheteurs de remise | N'achètent qu'avec des promotions | Réduire progressivement la dépendance aux remises |

### Segments d'engagement

| Segment | Critères | Stratégie |
|---------|----------|----------|
| Fortement engagé | Ouvre les e-mails, visite chaque semaine, utilise le produit quotidiennement | Vente incitative, communauté, plaidoyer |
| Modérément engagé | Ouvre certains e-mails, visite mensuellement | Augmenter l'engagement, nurturing de contenu |
| Faiblement engagé | Ouvre rarement, visites peu fréquentes | Campagne de réengagement |
| Dormant | Aucune activité depuis 60+ jours | Reconquête ou extinction |

---

## Segmentation de cycle de vie

| Étape | Définition | Déclencheur d'entrée | Déclencheur de sortie | Focus marketing |
|-------|-----------|---------------|-------------|----------------|
| **Prospect** | Contact connu, pas d'achat | Remplissage de formulaire, inscription | Premier achat | Nurturing, éducation, construction de confiance |
| **Nouveau client** | Premier achat récent | Premier achat | 30 jours ou 2e achat | Onboarding, gains rapides, satisfaction |
| **Client actif** | Engagement/achats réguliers | 2e achat ou usage constant | 90 jours sans activité | Vente croisée, vente incitative, fidélité |
| **À risque** | Engagement en baisse | Tendance en baisse sur 60 jours | Se réengage ou devient dormant | Offres de reconquête, contact de suivi |
| **Dormant** | Aucune activité pendant une période prolongée | 90+ jours sans activité | Se réengage ou se désabonne | Campagnes de dernière chance, chemin d'extinction |
| **Désabonné** | Annulé ou complètement inactif | Annulation ou 180 jours | Se réactive | Reconquête avec une nouvelle proposition de valeur |
| **Ambassadeur** | Promeut activement la marque | Recommandation, avis, UGC | L'engagement décline | Récompense, amplification, communauté |

---

## Correspondance segment-vers-action

| Segment | Fréquence e-mail | Ciblage publicitaire | Type de contenu | Type d'offre |
|---------|----------------|-------------|-------------|-----------|
| Nouveau prospect | 2-3/semaine | Notoriété + Éducation | Guides, webinaires | Ressource gratuite, essai |
| Lead actif | 1-2/semaine | Retargeting + Conversion | Études de cas, démos | Essai, consultation |
| Nouveau client | 1-2/semaine | Exclu de l'acquisition | Onboarding, conseils | Offres d'expansion |
| Client fidèle | 1/semaine | Audience de départ lookalike, exclu | Contenu avancé | VIP, accès anticipé |
| À risque | 1-2/semaine | Retargeting de reconquête | Rappels de valeur | Offre spéciale, remise |
| Dormant | 1/mois puis extinction | Exclu | Réengagement | Remise finale, « vous nous manquez » |

---

## Déclencheurs de segmentation dynamique

Déclencheurs comportementaux en temps réel qui déplacent les utilisateurs entre les segments :

| Événement déclencheur | Depuis le segment | Vers le segment | Action immédiate |
|--------------|-------------|-----------|-----------------|
| Premier achat | Prospect | Nouveau client | Démarrer la séquence d'onboarding |
| 2e achat sous 30 jours | Nouveau client | Client actif | Séquence de vente croisée |
| Aucune connexion depuis 14 jours | Client actif | À risque | E-mail de réengagement |
| Page de tarification consultée 3+ fois | Prospect | Lead à forte intention | Alerte commerciale + offre ciblée |
| A laissé un avis | Client actif | Ambassadeur | Remerciement + invitation au programme de recommandation |
| Abonnement annulé | Client actif | Désabonné | Séquence de reconquête (délai de 24h) |

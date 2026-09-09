# Product-Led Growth — Stratégie & cadres

> Le PLG est une stratégie de mise sur le marché où le produit lui-même pilote
> l'acquisition, l'expansion, et la rétention. Les utilisateurs expérimentent la
> valeur avant d'engager un budget.

---

## Le flywheel PLG

Le moteur PLG suit un flywheel en quatre étapes. Chaque étape alimente la suivante.

```
Value Delivery → Habit Formation → Expansion → Advocacy
      ↑                                          |
      └──────────────────────────────────────────┘
```

| Étape | Objectif | Levier clé | Exemple |
|---|---|---|---|
| Livraison de valeur | Amener l'utilisateur au « moment aha » rapidement | Onboarding sans friction | Slack — envoyer le premier message en <2 min |
| Formation d'habitude | Intégrer le produit dans le workflow quotidien | Déclencheurs + récompenses variables | Notion — ouvertures quotidiennes de l'espace de travail |
| Expansion | Faire croître le revenu au sein des comptes | Tarification à l'usage, expansion de sièges | Figma — un designer invite un développeur |
| Advocacy (recommandation) | Transformer les utilisateurs en canaux d'acquisition | Boucles de parrainage, preuve sociale | Calendly — chaque lien d'invitation = marketing |

---

## Arbre de décision Freemium vs Essai gratuit

Utiliser ce cadre pour sélectionner le bon modèle pour votre produit.

| Facteur | Favorise Freemium | Favorise l'essai gratuit |
|---|---|---|
| Temps de mise en valeur | Long (l'utilisateur a besoin de semaines pour voir le ROI) | Court (la valeur est apparente en quelques jours) |
| Coût marginal par utilisateur | Proche de zéro | Coût d'infrastructure significatif |
| Effets de réseau | Forts (plus d'utilisateurs = plus de valeur) | Faibles ou absents |
| Complexité du produit | Faible — UI auto-explicative | Élevée — nécessite mise en place, formation |
| Paysage concurrentiel | Encombré — besoin de retirer le risque | Différencié — la valeur est claire |
| Potentiel viral | Élevé (les utilisateurs gratuits diffusent le produit) | Faible (l'usage est privé/interne) |
| Taille de deal moyenne | ACV faible (<5 000 $/an) | ACV élevée (>15 000 $/an) |
| Implication commerciale | Minimale — le libre-service domine | Requise — vente consultative |

**Approche hybride :** Offrir le freemium pour les individus et des essais gratuits
pour les paliers équipe/entreprise. Cela capture à la fois l'adoption ascendante et
l'évaluation descendante.

---

## Identification de la métrique d'activation

L'activation est la métrique PLG la plus importante. Elle définit le moment où un
utilisateur expérimente pour la première fois une valeur significative.

### Comment trouver votre métrique d'activation

1. **Extraire les données comportementales** — Exporter les journaux d'événements des 7-14 premiers jours de tous les utilisateurs
2. **Segmenter par résultat** — Diviser les utilisateurs entre retenus (actifs au Jour 30+) vs churnés
3. **Comparer les comportements** — Identifier les actions que les utilisateurs retenus ont réalisées à des taux significativement plus élevés
4. **Classer par corrélation** — Trouver l'action avec la corrélation la plus forte avec la rétention
5. **Valider la causalité** — Exécuter une expérience : guider les nouveaux utilisateurs vers cette action et mesurer le gain de rétention
6. **Fixer le seuil** — Définir la fréquence ou profondeur minimale (par exemple, « a créé 3 projets dans les 7 premiers jours »)

### Exemples de métrique d'activation

| Produit | Métrique d'activation | Seuil |
|---|---|---|
| Slack | Messages envoyés dans un canal | 2 000 messages d'équipe |
| Dropbox | Fichier sauvegardé dans le dossier Dropbox | 1 fichier lors de la première session |
| HubSpot | Contacts importés + e-mail envoyé | Dans les 7 premiers jours |
| Zoom | A organisé une réunion avec 2+ participants | Dans les 48 premières heures |
| Figma | A créé et partagé un fichier de design | Dans les 7 premiers jours |

---

## Modèle de notation PQL (Product-Qualified Lead)

Les PQL remplacent les MQL dans le PLG. Un PQL est un utilisateur dont le
comportement produit signale une intention d'achat.

### Composantes de la notation PQL

| Catégorie de signal | Poids | Exemples |
|---|---|---|
| Complétion de l'activation | 25% | Onboarding complété, moment aha atteint |
| Profondeur d'usage | 25% | Fonctionnalités utilisées, fréquence, durée de session |
| Étendue d'usage | 15% | Nombre de membres d'équipe actifs, départements impliqués |
| Signaux de croissance | 20% | Ajouts de sièges, atteinte des limites de plan, usage d'API |
| Adéquation firmographique | 15% | Taille d'entreprise, secteur, correspondance de stack technique |

### Paliers de notation

| Palier | Fourchette de score | Action |
|---|---|---|
| PQL chaud | 80-100 | Contact commercial sous 24 heures |
| PQL tiède | 60-79 | Nurturing automatisé + invites de mise à niveau contextuelles dans l'app |
| PQL en développement | 40-59 | Séquences de nurturing pilotées par le produit, incitations de découverte de fonctionnalité |
| PQL précoce | 0-39 | Optimisation d'onboarding, campagnes d'activation |

---

## Optimisation de l'onboarding en libre-service

### Checklist d'onboarding

- [ ] Le temps de première valeur est inférieur à 5 minutes
- [ ] L'inscription ne nécessite pas plus de 3 champs (e-mail, nom, mot de passe — ou SSO)
- [ ] Le flux de bienvenue pose 1-2 questions de segmentation pour personnaliser l'expérience
- [ ] Les états vides incluent des modèles, données d'exemple, ou actions guidées
- [ ] Les indicateurs de progression montrent le statut de complétion
- [ ] Les info-bulles et l'aide contextuelle sont déclenchées par le comportement utilisateur, pas par des minuteurs
- [ ] La séquence e-mail complète la guidance dans l'app (Jour 0, 1, 3, 7)
- [ ] Les utilisateurs peuvent inviter des coéquipiers avant de terminer l'onboarding
- [ ] L'expérience mobile est fonctionnelle même si le desktop est prioritaire
- [ ] Les points de sortie offrent de l'aide (chat, docs, vidéo) avant l'abandon

### Anti-motifs d'onboarding

| Anti-motif | Pourquoi c'est nuisible | Correction |
|---|---|---|
| Visite guidée des fonctionnalités à la première connexion | Submerge l'utilisateur avant qu'il ait du contexte | Différer les visites guidées jusqu'à ce que la fonctionnalité pertinente soit nécessaire |
| Complétion de profil obligatoire | Ajoute de la friction avant la livraison de valeur | Rendre optionnel, demander progressivement |
| Pas de segmentation | Une expérience générique manque les besoins de l'utilisateur | Demander le rôle/objectif dès le départ, personnaliser le flux |
| Boucle de vérification e-mail longue | Retarde l'activation de plusieurs heures ou jours | Autoriser un accès limité immédiatement, vérifier plus tard |
| Cacher le chemin de mise à niveau | Les utilisateurs ne peuvent pas passer au payant en libre-service | Montrer la tarification de façon contextuelle aux moments de limite |

---

## Tableau de bord des métriques PLG

### Métriques principales

| Métrique | Formule | Benchmark (SaaS B2B) |
|---|---|---|
| Taux d'activation | Utilisateurs activés / Inscriptions | 20-40% |
| Temps de mise en valeur (TTV) | Temps médian de l'inscription à l'activation | <5 minutes (idéal), <24 heures (acceptable) |
| Conversion gratuit-vers-payant | Utilisateurs payants / Utilisateurs gratuits | 2-5% (freemium), 10-25% (essai gratuit) |
| Revenu d'expansion (% de l'ARR) | MRR d'expansion / MRR de départ | >30% de Net Revenue Retention |
| Coefficient viral (K-factor) | Invitations moyennes par utilisateur x taux de conversion des invitations | >0,5 (bon), >1,0 (viral) |
| Revenu par utilisateur (RPU) | Revenu total / Utilisateurs actifs | Variable — suivre la tendance dans le temps |
| Taux de croissance naturelle (NRG) | Taux de croissance annuel issu des canaux organiques + PLG | >50% = mécanique PLG solide |

### Suivi de cohorte

Suivre ces éléments pour chaque cohorte d'inscription hebdomadaire ou mensuelle :

- [ ] Rétention Jour 1, Jour 7, Jour 30, Jour 90
- [ ] Taux d'activation dans les 7 premiers jours
- [ ] Temps médian jusqu'à l'activation
- [ ] Conversion gratuit-vers-payant au Jour 30, 60, 90
- [ ] Revenu d'expansion généré au Jour 180
- [ ] Parrainages générés par cohorte

---

## PLG pour différents modèles économiques

| Modèle économique | Approche PLG | Défi clé | Exemple |
|---|---|---|---|
| SaaS horizontal | Freemium + partage viral | Activation à travers de nombreux cas d'usage | Notion, Airtable |
| SaaS vertical | Essai gratuit + mise en place guidée | Onboarding spécifique au domaine requis | Gusto, Procore |
| API / Outils développeur | Palier gratuit + tarification à l'usage | La doc et le DX sont le produit | Stripe, Twilio |
| Marketplace / Plateforme | Côté acheteur gratuit, monétiser l'offre | Problème de démarrage à froid | Airbnb, Upwork |
| Infrastructure | Palier gratuit avec des limites généreuses | Déclencheurs d'expansion à l'échelle | AWS, Vercel |
| Outils de collaboration | Gratuit pour petites équipes, payant à l'échelle | Doit atteindre l'adoption au niveau de l'équipe | Slack, Figma |

### Hybride PLG + Sales-Assist

La plupart des entreprises PLG réussies ajoutent des ventes à mesure qu'elles se
développent. Le modèle évolue :

```
Stage 1: Pure self-serve (0 → $1M ARR)
Stage 2: Self-serve + inbound sales for large accounts ($1M → $10M ARR)
Stage 3: PLG-qualified pipeline feeds AE team ($10M → $50M ARR)
Stage 4: Full hybrid — PLG for SMB, sales-led for enterprise ($50M+ ARR)
```

### Priorité de mise en œuvre

| Priorité | Action | Impact |
|---|---|---|
| 1 | Définir et instrumenter la métrique d'activation | Fondation pour tout le PLG |
| 2 | Réduire le temps de mise en valeur à moins de 5 minutes | Améliore directement la conversion |
| 3 | Construire la notation et l'alerte PQL | Relie l'usage produit au revenu |
| 4 | Mettre en œuvre des invites de mise à niveau dans l'app aux moments de limite | Capture l'intention d'expansion |
| 5 | Ajouter des boucles virales (invitations, partage, intégration) | Compose la croissance dans le temps |
| 6 | Lancer un programme de parrainage pour les utilisateurs activés | Réduit systématiquement le CAC |

---

*Le PLG compose parce que chaque utilisateur est un canal d'acquisition potentiel,
chaque équipe est une opportunité d'expansion, et chaque intégration approfondit la
rétention. Le produit est le moteur de croissance.*

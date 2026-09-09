# Automatisation e-mail — Workflows et déclencheurs

## Taxonomie des déclencheurs

| Type de déclencheur | Exemples | Cas d'usage |
|-------------|---------|----------|
| **Comportemental** | Visite de page, soumission de formulaire, clic de lien, ajout au panier, vue de produit | Répondre aux actions de l'utilisateur |
| **Basé sur le temps** | X jours après inscription, X jours avant renouvellement, anniversaire | Timing du cycle de vie |
| **Basé sur l'attribut** | Changement de segment, seuil de score de lead, tag ajouté | Changements de profil |
| **Engagement** | E-mail ouvert, non ouvert depuis X jours, lien spécifique cliqué | Comportement e-mail |
| **Transactionnel** | Achat effectué, abonnement démarré, paiement échoué | Événements commerce |
| **Prédictif** | Augmentation du score de risque de churn, date d'achat prévue | Déclencheurs basés sur le ML |

---

## Workflows d'automatisation courants

### Flux de bienvenue
```
Trigger: New subscriber / signup
→ Email 1 (immediate): Welcome + value delivery
→ Wait 2 days
→ Email 2: Quick-start guide
→ Wait 3 days
→ Email 3: Social proof / success story
→ Wait 4 days
→ Email 4: Feature highlight or tip
→ Wait 7 days
→ Email 5: Upgrade / next step CTA
→ Exit: Move to regular nurture
```

### Abandon de navigation
```
Trigger: Viewed product page, did NOT add to cart (within 1 hour)
→ Wait 2 hours
→ Email 1: "Still interested in [Product]?" + product image + reviews
→ Wait 24 hours
→ Check: Did they purchase? → Yes: Exit | No: Continue
→ Email 2: Related product recommendations
→ Exit
```

### Réengagement
```
Trigger: No email open or click for 60 days
→ Email 1: "We miss you" + what's new
→ Wait 7 days
→ Check: Engaged? → Yes: Return to active | No: Continue
→ Email 2: Exclusive offer or content
→ Wait 7 days
→ Check: Engaged? → Yes: Return to active | No: Continue
→ Email 3: "Last email unless you want to stay"
→ Wait 7 days
→ Check: Engaged? → Yes: Return to active | No: Suppress from marketing
```

---

## Règles de contenu dynamique

| Type de règle | Logique | Exemple |
|-----------|-------|---------|
| **Basé sur le segment** | Montrer un contenu différent par segment | L'entreprise voit une étude de cas ; la PME voit un guide de démarrage rapide |
| **Comportemental** | Basé sur des actions passées | Montrer un CTA « mise à niveau » aux utilisateurs gratuits ; « renouveler » à ceux qui expirent |
| **Localisation** | Basé sur la géographie | Invitations à des événements locaux, offres régionales |
| **Intérêt produit** | Basé sur l'historique de navigation/achat | Recommandations de produits correspondant aux catégories consultées |
| **Étape du cycle de vie** | Basé sur l'étape du client | Le nouveau client voit l'onboarding ; l'actif voit des conseils avancés |

---

## Optimisation du moment d'envoi

### Méthodes
1. **Analyse historique** : Envoyer aux moments avec les taux d'ouverture les plus élevés des campagnes passées
2. **Optimisation par abonné** : Prédiction basée sur le ML du moment optimal pour chaque abonné
3. **Ajustement de fuseau horaire** : Envoyer au moment cible dans le fuseau horaire local de chaque abonné
4. **Optimisation du jour** : Tester différents jours, analyser par segment

### Référentiels généraux
- B2B : Mardi-jeudi, 9h-11h heure locale
- B2C : Mardi-jeudi, 10h ou 19h-21h heure locale
- E-commerce : Dimanche soir, mardi matin (varie selon le secteur)

---

## Plafonnement de fréquence

| Segment d'abonné | Max e-mails/semaine | Types |
|-------------------|----------------|-------|
| Nouvel abonné (30 premiers jours) | 3-4 | Bienvenue + 1 marketing |
| Actif engagé | 2-3 | Marketing + déclenché |
| Modérément engagé | 1-2 | Marketing uniquement |
| Faible engagement | 1/2 semaines | Réengagement uniquement |
| Transactionnel uniquement | Selon besoin | Reçus, notifications |

### Règles de priorité
Lorsque plusieurs automatisations se déclenchent pour le même abonné :
1. Les e-mails transactionnels s'envoient toujours (reçus, confirmations)
2. Les automatisations déclenchées priment sur les campagnes planifiées
3. Le déclencheur le plus récent prime si plusieurs se déclenchent simultanément
4. Toujours respecter le plafond de fréquence global

---

## Métriques de performance d'automatisation

| Métrique | Cible | Action si en dessous |
|--------|--------|----------------|
| Taux d'ouverture | >25% | Tester les objets, le moment d'envoi, le nom d'expéditeur |
| Taux de clic | >3% | Améliorer le contenu, le CTA, la personnalisation |
| Taux de conversion | Varie selon le flux | Optimiser l'offre, la landing page, la segmentation |
| Taux de désabonnement | <0,5 % par e-mail | Réduire la fréquence, améliorer le ciblage |
| Revenu par e-mail | Tendance en hausse | Optimiser les recommandations de produits, les offres |
| Taux d'achèvement d'automatisation | >60% | Vérifier les points de friction, améliorer le contenu |

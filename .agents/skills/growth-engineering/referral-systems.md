# Systèmes de parrainage — Conception & optimisation de programme

> Un programme de parrainage structuré transforme des clients satisfaits en un canal
> d'acquisition évolutif et à faible CAC. Les meilleurs programmes alignent les
> incitations à la fois pour le parrain et le filleul.

---

## Modèles de programme de parrainage

### Comparaison de modèles

| Modèle | Fonctionnement | Idéal pour | Exemple |
|---|---|---|---|
| Double face | Le parrain et le filleul sont tous deux récompensés | SaaS, fintech, marketplaces | Dropbox — les deux reçoivent du stockage supplémentaire |
| Face unique (parrain) | Seul le parrain est récompensé | Achats à forte considération | Amex — le parrain reçoit des points bonus |
| Face unique (filleul) | Seul le nouvel utilisateur reçoit un avantage | Essais à faible friction, e-commerce | « Offrez 20 $ de réduction à votre ami » |
| À paliers | Les récompenses s'escaladent avec le nombre de parrainages | Produits pilotés par la communauté | Morning Brew — débloquer des goodies à des jalons |
| À jalons | Débloquer des récompenses à des nombres de parrainage spécifiques | Campagnes de liste d'attente et de lancement | Pré-lancement Harry's — paliers de parrainage 5, 10, 25, 50 |
| Classement | Les meilleurs parrains gagnent des récompenses premium | Campagnes limitées dans le temps, concours | Compétitions de lancement avec grands prix |
| Intégré / natif | Le parrainage est intégré dans l'UX du produit | Outils de collaboration et de réseau | Calendly — chaque lien est un parrainage |

### Conception d'un programme à double face

```
Referrer Action → Unique Link/Code Generated → Referee Signs Up →
Referee Qualifies (activation event) → Both Parties Rewarded
```

| Composant | Décision | Recommandation |
|---|---|---|
| Récompense parrain | Argent, crédit, mois gratuits, points | Faire correspondre à ce que les utilisateurs valorisent déjà dans votre produit |
| Récompense filleul | Réduction, essai prolongé, bonus | Retirer la friction pour le premier achat/activation |
| Événement de qualification | Inscription, activation, achat, rétention | Lier à un moment de valeur significatif, pas juste l'enregistrement |
| Timing de la récompense | Instantané vs différé | Instantané pour la motivation du parrain ; différé pour la prévention de fraude |
| Plafond par parrain | Illimité vs plafonné | Plafonner à 10-20 initialement ; augmenter pour les power referrers |

---

## Principes de conception d'incitation

### Sélection du type de récompense

| Type de récompense | Avantages | Inconvénients | Idéal pour |
|---|---|---|---|
| Crédit de compte | Valeur perçue élevée, garde les utilisateurs dans l'écosystème | Pas de valeur si l'utilisateur churne | SaaS, plateformes |
| Argent / cartes-cadeaux | Universellement attrayant, facile à comprendre | Coûteux, attire la fraude | Fintech, produits à ACV élevée |
| Mois gratuits | Coût marginal faible, prolonge la rétention | Valable seulement si l'utilisateur paie | Produits d'abonnement |
| Déblocages de fonctionnalités | Coût marginal nul, pilote l'engagement | Attrait limité si les fonctionnalités ne sont pas convaincantes | Produits freemium |
| Produits physiques / goodies | Tangible, partageable, preuve sociale | Complexité logistique, coût | Entreprises pilotées par la marque |
| Don caritatif | Aligné avec les valeurs, image de marque positive | Motivation directe plus faible | Marques à mission |

### Checklist de calibrage d'incitation

- [ ] La valeur de la récompense représente 10-25% de la LTV client (garantit un ROI positif)
- [ ] La récompense est immédiatement compréhensible (pas de calculs complexes)
- [ ] La récompense correspond à la motivation de l'utilisateur (intrinsèque vs extrinsèque)
- [ ] Les récompenses à double face sont à peu près équilibrées (aucune partie ne se sent lésée)
- [ ] Des récompenses escaladées existent pour les power referrers (5+ parrainages réussis)
- [ ] L'accomplissement de la récompense est automatisé (pas de goulot d'approbation manuelle)
- [ ] Les implications fiscales sont documentées pour les récompenses en argent au-delà des seuils de déclaration
- [ ] La politique d'expiration de récompense est clairement communiquée

---

## Mécaniques de parrainage

### Infrastructure de suivi

| Mécanisme | Fonctionnement | Forces | Faiblesses |
|---|---|---|---|
| Lien de parrainage unique | URL avec paramètre d'ID de parrain | Facile à partager, traçable | Peut être perdu si l'utilisateur efface les cookies |
| Code de parrainage | Code alphanumérique saisi à l'inscription | Fonctionne hors ligne, mémorisable | Nécessite une saisie manuelle, friction |
| Invitation e-mail | E-mail direct envoyé depuis le produit | Signal d'intention élevé, personnalisé | Portée limitée vs partage social |
| Invitation dans l'app | Partage directement dans l'UI du produit | Contextuel, faible friction | Nécessite un usage actif du produit |
| Code QR | Code scannable menant à l'URL de parrainage | Fonctionne pour les contextes physiques/événements | Cas d'usage de niche |

### Architecture de lien

```
https://yourapp.com/invite?ref=USER_ID&campaign=CAMPAIGN_NAME

Parameters tracked:
- ref: unique referrer identifier
- campaign: which referral program variant
- channel: where the link was shared (email, social, direct)
- timestamp: when the link was generated
```

### Règles d'attribution

| Scénario | Règle recommandée |
|---|---|
| Plusieurs liens de parrainage cliqués | Attribution au dernier clic dans une fenêtre de 30 jours |
| Lien de parrainage + point de contact publicitaire payant | Le parrainage a priorité (récompenser l'ambassadeur) |
| L'utilisateur s'inscrit sans lien mais saisit un code | Attribution au code honorée |
| Le cookie expire avant la conversion | Pas d'attribution (étendre le cookie à 90 jours) |
| L'utilisateur parrainé existe déjà dans le système | Pas de récompense (dédupliquer par e-mail) |

---

## Tactiques de prévention de fraude

### Motifs de fraude courants

| Type de fraude | Description | Méthode de détection |
|---|---|---|
| Auto-parrainage | L'utilisateur crée plusieurs comptes pour se parrainer lui-même | Correspondance IP, fingerprinting d'appareil, analyse du domaine e-mail |
| Cercles de parrainage | Des groupes d'utilisateurs se parrainent mutuellement en cercle | Analyse de graphe de réseau, regroupement par horodatage |
| Abus d'incitation | Les utilisateurs s'inscrivent uniquement pour la récompense, puis churnent | Exiger un événement d'activation avant la récompense ; surveiller la rétention à 7 jours |
| Inscriptions générées par bot | Création de compte automatisée pour réclamer des récompenses | CAPTCHA, analyse comportementale, surveillance de la vélocité d'inscription |
| Faux comptes e-mail | E-mails jetables utilisés pour les comptes filleul | Bloquer les domaines e-mail jetables connus, exiger la vérification e-mail |

### Checklist de prévention de fraude

- [ ] Exiger un événement d'activation significatif avant d'émettre des récompenses (pas juste l'inscription)
- [ ] Mettre en œuvre le fingerprinting d'appareil pour détecter le multi-compte
- [ ] Fixer des limites de vélocité (max 5 parrainages par jour, 20 par semaine)
- [ ] Bloquer les domaines e-mail jetables connus
- [ ] Retenir les récompenses pendant une période de refroidissement de 7-14 jours avant le paiement
- [ ] Surveiller le ratio parrainage-vers-activation par parrain (signaler si <20%)
- [ ] Revoir manuellement les meilleurs parrains chaque mois
- [ ] Construire un système de signalement automatisé pour les motifs anormaux
- [ ] Inclure des conditions anti-fraude dans les CGV du programme de parrainage
- [ ] Réserver le droit de révoquer les récompenses rétroactivement

---

## Playbook de lancement

### Pré-lancement (2-4 semaines avant)

| Semaine | Action | Responsable |
|---|---|---|
| -4 | Définir les objectifs, KPI, et budget du programme | Croissance / Marketing |
| -4 | Sélectionner une plateforme de parrainage ou construire un suivi interne | Ingénierie |
| -3 | Concevoir la structure de récompense et les règles de prévention de fraude | Croissance / Finance |
| -3 | Créer la landing page de parrainage et les modèles d'e-mail | Design / Contenu |
| -2 | Construire le tableau de bord de parrainage (vue parrain + vue admin) | Ingénierie |
| -2 | Rédiger les conditions générales du programme | Juridique / Marketing |
| -1 | Contrôler qualité le flux de parrainage de bout en bout (génération de lien → accomplissement de récompense) | QA |
| -1 | Amorcer le programme avec 50-100 power users pour un soft launch | Croissance |

### Checklist du jour du lancement

- [ ] Le widget ou la page de parrainage est en direct dans le produit
- [ ] E-mail déclenché envoyé aux 20% d'utilisateurs les plus actifs annonçant le programme
- [ ] Notification ou bannière dans l'app promouvant le programme de parrainage
- [ ] Annonce sur les réseaux sociaux avec des actifs partageables
- [ ] Équipe de support briefée sur les détails du programme et la FAQ
- [ ] Tableaux de bord analytics confirmés fonctionnels (parrainages, conversions, récompenses)
- [ ] Surveillance de fraude active et alertes configurées
- [ ] Génération de lien de parrainage testée sur toutes les plateformes (web, mobile, e-mail)

### Post-lancement (30 premiers jours)

| Jour | Action |
|---|---|
| 1-3 | Surveiller les taux de conversion, corriger les flux cassés, traiter les tickets de support |
| 7 | Première revue de performance — taux de parrainage, taux de partage, taux de conversion |
| 14 | Tester A/B le messaging de récompense et l'emplacement du CTA |
| 21 | Identifier et engager les meilleurs parrains avec un outreach personnalisé |
| 30 | Revue complète du programme — analyse ROI, audit de fraude, plan d'optimisation |

---

## Benchmarks

### Métriques clés

| Métrique | Formule | Bien | Très bien | Élite |
|---|---|---|---|---|
| Taux de parrainage | Parrains / Total des utilisateurs actifs | 2-5% | 5-15% | 15%+ |
| Taux de partage | Utilisateurs qui partagent le lien / Utilisateurs voyant l'invite de parrainage | 10-15% | 15-25% | 25%+ |
| Taux de conversion d'invitation | Inscriptions parrainées / Total des invitations envoyées | 5-10% | 10-20% | 20%+ |
| K-Factor | Invitations par utilisateur x taux de conversion | 0,1-0,3 | 0,3-0,7 | 0,7+ |
| Réduction du CAC | (CAC standard - CAC de parrainage) / CAC standard | 30-50% | 50-70% | 70%+ |
| LTV de parrainage vs LTV organique | LTV utilisateur parrainé / LTV utilisateur organique | 1,0x | 1,1-1,25x | 1,25x+ |
| Temps jusqu'au parrainage | Jours médians de l'inscription au premier parrainage | 30-60 jours | 14-30 jours | <14 jours |

### Calcul du K-Factor

```
K = i × c

Where:
  i = average number of invites sent per user
  c = conversion rate of those invites

Example:
  Each user sends 5 invites, 10% convert → K = 5 × 0.10 = 0.5
  (Each user brings 0.5 new users — not viral, but contributes to growth)
```

---

## Points d'intégration

### Où faire apparaître les parrainages dans le produit

| Point de contact | Timing | Pourquoi ça fonctionne |
|---|---|---|
| Invite post-activation | Après que l'utilisateur complète une action clé | L'utilisateur vient de vivre la valeur — motivation maximale |
| Page paramètres / compte | Persistante, toujours accessible | Les power users la cherchent |
| Confirmation post-achat | Après paiement ou mise à niveau | Euphorie de l'acheteur — motivation de preuve sociale |
| Flux de partage / export | Quand l'utilisateur partage du contenu à l'externe | Moment de partage naturel, parrainage intégré |
| Célébrations de jalon | Après une réussite ou un jalon d'usage | Pic émotionnel, réponse de gratitude |
| Suivi NPS | Après que l'utilisateur note 9-10 au NPS | Les promoteurs sont des parrains pré-qualifiés |
| Page facturation / facture | Pendant le renouvellement ou la revue de plan | Moment sensible au budget, l'appel du crédit |
| Résolution d'aide / support | Après une interaction de support réussie | La gratitude et le soulagement pilotent la recommandation |

### Considérations de stack technique

| Approche | Avantages | Inconvénients | Idéal pour |
|---|---|---|---|
| Construction interne | Contrôle total, intégration profonde | Temps d'ingénierie, charge de maintenance | Produits avec des mécaniques de parrainage uniques |
| SaaS de parrainage (ReferralCandy, Friendbuy) | Rapide à lancer, UX éprouvée | Coût mensuel, personnalisation limitée | E-commerce, programmes standards |
| Plateforme d'affiliation (Impact, PartnerStack) | S'étend aux partenaires + affiliés | Complexité, coût | SaaS B2B avec canaux partenaires |
| Intégration CRM (HubSpot, Salesforce) | Relie les parrainages au pipeline commercial | Nécessite une maturité CRM | Programmes de parrainage assistés par les ventes |

---

*Les meilleurs programmes de parrainage ne ressemblent pas à des programmes
marketing. Ils ressemblent à un ami qui en aide un autre à découvrir quelque chose
de précieux. Concevez pour cela.*

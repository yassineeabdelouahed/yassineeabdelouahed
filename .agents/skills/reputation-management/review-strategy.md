# Stratégie d'avis — Génération et gestion

> Cadre systématique pour générer, gérer, et tirer parti des avis clients sur toutes les principales plateformes. Les avis sont parmi les signaux de confiance les plus élevés dans les décisions d'achat — les sondages constatent régulièrement que la plupart des consommateurs déclarent que les avis en ligne influencent leur comportement d'achat (vérifier le chiffre actuel auprès d'une source primaire telle que le Local Consumer Review Survey annuel de BrightLocal avant de citer un pourcentage précis).

---

## Paysage des avis par plateforme

| Plateforme | Usage principal | Seuil moyen d'étoiles | Sollicitation autorisée ? | Filtrage d'avis légal ? |
|----------|-------------|--------------------|-----------------------|----------------------|
| Google Business | Local / B2C | 4,2+ | Oui (avec conditions) | Non (viole la politique) |
| Yelp | Local / Hôtellerie | 3,8+ | **Non** (strictement interdit) | Non |
| G2 | B2B SaaS | 4,0+ | Oui (incitations OK) | Non |
| Capterra | B2B SaaS | 4,0+ | Oui (cartes-cadeaux OK) | Non |
| Trustpilot | E-commerce / SaaS | 4,2+ | Oui (via invitations) | Non (viole les conditions) |
| Amazon | E-commerce | 4,0+ | **Restreint** (Vine uniquement) | Non |
| Glassdoor | Marque employeur | 3,8+ | Oui (encourager, ne pas contraindre) | Non |
| TripAdvisor | Voyage / Hôtellerie | 4,0+ | Oui (outils de rappel) | Non |

---

## Règles de sollicitation spécifiques aux plateformes

### Yelp — Interdiction stricte
- **NE JAMAIS** demander aux clients des avis Yelp — jamais
- Pas de signalétique « Trouvez-nous sur Yelp » qui suggère des demandes d'avis
- **Autorisé :** Offres de check-in Yelp, revendication de votre profil, réponse aux avis
- L'algorithme de Yelp supprime les avis des comptes à faible activité ; les avis sollicités sont souvent filtrés

### Amazon — Vine et garde-fous
- Les vendeurs **ne peuvent pas** offrir de compensation pour des avis (viole les CGU, risque la suspension du compte)
- Programme Amazon Vine : envoyer des produits à des évaluateurs de confiance (des frais d'inscription s'appliquent)
- Le bouton « Demander un avis » dans Seller Central est la seule méthode de sollicitation conforme
- Pas d'emails de suivi incluant des demandes d'avis avec des offres de réduction

### Google — Permissif avec des limites
- La sollicitation est autorisée ; le filtrage d'avis ne l'est pas
- Impossible d'offrir des incitations pour des avis
- Impossible de mettre en place des stations d'avis à votre établissement sur un seul appareil (signalement IP)
- Peut utiliser des présentoirs NFC tap-to-review, des codes QR, des suivis email/SMS

### Trustpilot — Système d'invitation
- Doit utiliser les outils d'invitation de Trustpilot pour la sollicitation
- Ne peut pas sélectionner qui reçoit les invitations (doit inviter tout le monde ou utiliser des déclencheurs automatiques)
- Les avis de service et les avis de produit ont des flux séparés

---

## Modèles de demande d'avis

### Email — Post-achat (envoyer 3-7 jours après la livraison/le service)

**Options d'objet :**
- « Comment nous en sommes-nous sortis, {{first_name}} ? »
- « Votre retour nous aide à nous améliorer »
- « Une question rapide sur votre récent(e) {{product/service}} »

**Corps :**
> Bonjour {{first_name}},
>
> Merci d'avoir choisi {{company}}. Nous espérons que {{product/service}} fonctionne bien pour vous.
>
> Cela vous dérangerait-il de partager votre expérience ? Cela prend environ 60 secondes et aide d'autres clients à prendre des décisions éclairées.
>
> [Laisser un avis → {{direct_review_link}}]
>
> Dans tous les cas, si vous avez des questions ou des préoccupations, répondez à cet email et nous nous en occuperons.
>
> Merci,
> {{sender_name}}

### SMS — Post-achat (envoyer 2-5 jours après la livraison/le service)

> Bonjour {{first_name}}, merci pour votre récent achat auprès de {{company}} ! Nous aimerions savoir comment cela s'est passé. Laissez un avis rapide ici : {{short_link}} — Répondez STOP pour vous désabonner.

---

## Modèles de réponse aux avis

### Avis positif (5 étoiles)
> Merci beaucoup, {{reviewer_name}} ! Nous sommes heureux que {{détail spécifique de l'avis}} ait répondu à vos attentes. Votre retour compte beaucoup pour l'équipe. Nous avons hâte de vous servir à nouveau.

### Avis neutre (3 étoiles)
> Bonjour {{reviewer_name}}, merci d'avoir partagé votre retour honnête. Nous apprécions que {{aspect positif mentionné}} ait bien fonctionné. Nous aimerions en savoir plus sur la manière dont nous pouvons améliorer {{domaine de préoccupation}}. Pourriez-vous nous contacter à {{support_email}} afin que nous puissions corriger la situation ?

### Avis négatif (1-2 étoiles)
> {{reviewer_name}}, nous sommes désolés d'apprendre votre expérience avec {{problème spécifique}}. Ce n'est pas le standard que nous nous fixons. Nous aimerions corriger la situation — veuillez contacter {{name}} directement à {{phone/email}} afin que nous puissions résoudre cela pour vous. Merci de nous avoir signalé cela.

### Avis suspecté de faux
> Nous prenons tous les retours au sérieux, mais nous ne parvenons pas à trouver d'enregistrement correspondant à cet avis dans notre système. Si vous avez déjà fait affaire avec nous, veuillez contacter {{support_email}} avec les détails de votre commande afin que nous puissions enquêter et résoudre toute préoccupation.

---

## Workflow de gestion des avis

| Étape | Action | Fréquence | Responsable |
|------|--------|-----------|-------|
| 1 | Surveiller toutes les plateformes via un agrégateur (Birdeye, Podium, ReviewTrackers) | Alertes en temps réel | Community Manager |
| 2 | Catégoriser les avis entrants (positif, neutre, négatif, faux) | Dans les 2 heures | Community Manager |
| 3 | Répondre aux avis négatifs | Dans les 4 heures (heures ouvrées) | CM senior / Manager |
| 4 | Répondre aux avis positifs | Dans les 24 heures | Community Manager |
| 5 | Escalader les préoccupations légales/de diffamation | Immédiatement | Légal / Directeur |
| 6 | Signaler les avis suspectés de faux pour suppression par la plateforme | Dans les 24 heures | Community Manager |
| 7 | Journaliser les tendances et thèmes récurrents | Hebdomadaire | Analyste marketing |
| 8 | Rapporter les métriques d'avis à la direction | Mensuel | Responsable marketing |

---

## Stratégie de vélocité d'avis

La vélocité d'avis — le rythme auquel de nouveaux avis arrivent — est un signal de classement sur Google et influence la confiance des consommateurs sur toutes les plateformes.

### Cibles de vélocité par taille d'entreprise

| Taille d'entreprise | Cible d'avis mensuelle | Mix de tactiques |
|--------------|----------------------|------------|
| PME locale | 5-15 nouveaux avis/mois | Email + demande en personne + codes QR |
| Milieu de marché | 15-50 nouveaux avis/mois | Séquences email automatisées + SMS + NFC |
| Entreprise | 50-200+ nouveaux avis/mois | Automatisation déclenchée par le CRM + sondages post-support + intégration au programme de fidélité |

### Tactiques d'accélération de la vélocité
1. **Automatisation déclenchée** : Envoyer des demandes d'avis après des interactions de support positives (CSAT 4-5)
2. **Intégration reçu/facture** : Inclure le lien d'avis sur les reçus numériques
3. **Placement de codes QR** : En magasin, sur l'emballage, sur les cartes de visite
4. **Programme employé** : Former le personnel en première ligne à mentionner les avis au point de vente
5. **Association au programme de fidélité** : Offrir des points de fidélité (pas pour les avis — pour le partage de retour)

---

## Gestion des faux avis

### Checklist d'identification
- [ ] L'auteur de l'avis n'a pas d'autre historique d'avis ou a un profil suspect
- [ ] L'avis ne contient aucun détail spécifique sur le produit/service
- [ ] Le langage correspond aux motifs observés dans les campagnes d'attaque concurrentielles
- [ ] Plusieurs avis négatifs publiés dans une courte fenêtre temporelle
- [ ] L'auteur de l'avis n'a jamais été client (aucun enregistrement correspondant)

### Processus de suppression par plateforme

| Plateforme | Processus | Délai typique |
|----------|---------|-----------------|
| Google | Signaler via Google Business Profile → « Signaler l'avis » | 5-14 jours |
| Yelp | Signaler via les outils Business Owner | 7-21 jours |
| Trustpilot | Signaler avec des preuves via l'équipe de conformité | 3-10 jours |
| Amazon | Signaler via Seller Central → « Signaler un abus » | 7-14 jours |
| G2 | Contacter le support G2 avec des preuves | 5-10 jours |

### Si la plateforme refuse la suppression
1. Répondre publiquement avec une réponse factuelle et professionnelle
2. Noyer le faux avis avec des avis positifs légitimes (stratégie de vélocité)
3. Consulter un conseiller juridique si l'avis est diffamatoire et démontrablement faux
4. Documenter tout pour d'éventuels litiges futurs

---

## Analytics des avis — KPI à suivre

| Métrique | Définition | Référence |
|--------|-----------|-----------|
| Note moyenne en étoiles | Note moyenne sur toutes les plateformes | 4,2+ |
| Volume d'avis | Total des avis par mois | Varie selon le secteur |
| Vélocité d'avis | Nouveaux avis par semaine | Stable ou en croissance |
| Taux de réponse | % des avis auxquels on a répondu | 100 % négatif, 80 %+ positif |
| Temps de réponse | Temps moyen jusqu'à la première réponse | < 4 h (négatif), < 24 h (positif) |
| Ratio de sentiment | Positif : Neutre : Négatif | 70:20:10 ou mieux |
| Corrélation avis-revenu | Impact sur le revenu par amélioration de 0,1 étoile | Suivre via l'attribution |

---

## Principe clé

> Ne jamais filtrer les avis. Ne jamais inciter les notes. Ne jamais ignorer les critiques. L'objectif est le volume, la vélocité, et l'authenticité — pas la perfection. Un 4,6 avec 500 avis surpasse toujours un 5,0 avec 12 avis.
</content>

# Retargeting et remarketing — Référence de stratégie d'audience

## Taxonomie des segments d'audience

### Segments basés sur le site web

| Segment | Définition | Taille typique | Niveau d'intention | Fenêtre recommandée |
|---------|-----------|-------------|-------------|-------------------|
| Tous les visiteurs du site | Toute personne ayant visité une page quelconque | Grande | Faible | 30-90 jours |
| Visiteurs de pages spécifiques | Ont visité des pages produit, tarification, ou fonctionnalité | Moyenne | Moyen-élevé | 14-30 jours |
| Navigateurs de catégorie | Ont vu plusieurs produits dans la même catégorie | Moyenne | Moyen | 14-30 jours |
| Abandons de panier | Ont ajouté au panier mais n'ont pas acheté | Petite-moyenne | Élevé | 7-14 jours |
| Démarreurs de checkout | Ont commencé le tunnel de paiement, non complété | Petite | Très élevé | 3-7 jours |
| Démarreurs de formulaire | Ont commencé un formulaire de lead, non soumis | Petite | Très élevé | 7-14 jours |
| Visiteurs récurrents | 3+ visites dans les 14 derniers jours | Petite-moyenne | Élevé | 14-30 jours |
| Visiteurs à fort engagement | Durée de session >3 minutes ou >5 pages | Petite-moyenne | Moyen-élevé | 30-60 jours |
| Lecteurs de blog/contenu | Ont visité le blog ou des pages de ressources | Grande | Faible-moyen | 30-90 jours |

### Segments basés sur le client

| Segment | Définition | Cas d'usage |
|---------|-----------|----------|
| Acheteurs passés (récents) | Ont acheté dans les 30-60 derniers jours | Cross-sell, produits complémentaires |
| Acheteurs passés (inactifs) | Ont acheté il y a 60-180 jours, sans rachat | Reconquête, offres de réengagement |
| Clients à forte valeur | Top 20 % par LTV ou valeur de commande | Offres VIP, loyauté, exclusions des publicités de remise |
| Abonnement résilié | Abonnement annulé dans les 90 derniers jours | Reconquête avec une offre améliorée |
| Acheteurs uniques | Ont acheté une fois, jamais renouvelé | Incitation au deuxième achat |
| Multi-acheteurs | 2+ achats | Programmes de loyauté, demandes de parrainage |

### Segments basés sur l'engagement

| Segment | Définition | Plateforme |
|---------|-----------|----------|
| Spectateurs vidéo (25/50/75/95 %) | Ont regardé la vidéo jusqu'à un pourcentage d'achèvement spécifique | Meta, YouTube, TikTok |
| Utilisateurs d'app (actifs) | Ont utilisé l'app dans les 7-30 derniers jours | Meta, Google, TikTok |
| Utilisateurs d'app (inactifs) | N'ont pas ouvert l'app depuis 30+ jours | Meta, Google, TikTok |
| Ouvreurs d'email | Ont ouvert un email dans les 30 derniers jours | Meta (Custom Audiences), Google (Customer Match) |
| Non-ouvreurs d'email | Sur la liste mais aucune ouverture depuis 90+ jours | Meta, Google |
| Personnes engagées sur le social | Ont aimé, commenté, partagé, enregistré | Meta, TikTok, LinkedIn |
| Ouvreurs de formulaire de lead | Ont ouvert un formulaire de lead in-platform | Meta, LinkedIn, TikTok |
| Participants à un événement | Ont assisté ou confirmé leur présence à un événement | Meta, LinkedIn |

### Segments d'expansion

| Segment | Définition | Cas d'usage |
|---------|-----------|----------|
| Lookalike / Similaire (1 %) | Top 1 % le plus similaire à l'audience seed | Prospecting de la plus haute qualité |
| Lookalike / Similaire (1-3 %) | Correspondance de similarité plus large | Prospecting à l'échelle |
| Lookalike / Similaire (3-5 %) | Similarité utile la plus large | Prospecting axé volume |
| Lookalike Customer Match | Similaire à la liste clients chargée | Acquisition de clients similaires |
| Lookalike à forte valeur | Similaire aux 20 % de clients les plus élevés par LTV | Acquisition des meilleurs clients |

---

## Capacités de retargeting spécifiques à la plateforme

### Google Ads

| Fonctionnalité | Fonctionnement | Exigence de configuration |
|---------|-------------|-------------------|
| RLSA (Remarketing Lists for Search Ads) | Ajustements d'enchère ou ciblage pour les anciens visiteurs sur le search | Tag Google + liste d'audience (1 000 minimum pour le search) |
| Remarketing Display | Bannières aux anciens visiteurs à travers le réseau Display de Google | Tag Google + liste d'audience (100 minimum pour le display) |
| Remarketing YouTube | Publicités vidéo aux anciens visiteurs ou aux personnes engagées avec la chaîne | Tag Google + chaîne YouTube liée |
| Remarketing dynamique | Publicités auto-générées montrant les produits spécifiques consultés | Tag Google + flux produit Merchant Center |
| Customer Match | Charger des listes email/téléphone pour le ciblage sur Search, YouTube, Gmail | Liste client hachée (minimum 1 000 utilisateurs correspondants) |
| Segments similaires | Audiences auto-générées similaires à vos listes | Audience existante avec 100+ utilisateurs |

### Meta (Facebook & Instagram)

| Fonctionnalité | Fonctionnement | Exigence de configuration |
|---------|-------------|-------------------|
| Audiences personnalisées de site web | Cibler les visiteurs par URL, temps passé, événements | Pixel Meta + API Conversions (CAPI) |
| Publicités dynamiques de produit (DPA) | Afficher automatiquement les produits vus/mis au panier | Pixel Meta + catalogue produit |
| Audiences personnalisées d'engagement | Cibler selon l'engagement Instagram/Facebook | Page/compte professionnel connecté |
| Audiences personnalisées vidéo | Cibler par pourcentage d'achèvement de visionnage vidéo | Contenu vidéo publié sur Meta |
| Audiences de liste client | Charger email/téléphone pour la correspondance | Liste client (import CSV ou intégration CRM) |
| Audiences lookalike | Trouver des utilisateurs similaires à l'audience seed | Audience seed (100+ personnes, 1 000+ recommandé) |
| Publicités catalogue Advantage+ | Publicités dynamiques optimisées par ML à partir du catalogue | Catalogue produit + Pixel + CAPI |

### LinkedIn

| Fonctionnalité | Fonctionnement | Exigence de configuration |
|---------|-------------|-------------------|
| Retargeting de site web | Cibler les visiteurs ayant déclenché le LinkedIn Insight Tag | LinkedIn Insight Tag (300+ membres correspondants) |
| Ciblage par contact | Charger des listes d'emails d'entreprise ou de contact | Liste CSV (10 000+ recommandé pour les taux de correspondance) |
| Ciblage par entreprise | Cibler les employés d'entreprises spécifiques | Liste de noms d'entreprise ou d'URL de page entreprise LinkedIn |
| Spectateurs vidéo | Cibler les utilisateurs ayant vu des publicités vidéo LinkedIn | Campagnes de publicité vidéo précédentes |
| Ouvreurs de Lead Gen Form | Cibler les utilisateurs ayant ouvert mais pas soumis le formulaire | Campagnes Lead Gen Form précédentes |
| Participants à un événement | Cibler les participants aux LinkedIn Events | Association à un LinkedIn Event |
| Audiences lookalike | Professionnels similaires à l'audience seed | Matched Audience avec 300+ membres |

### TikTok

| Fonctionnalité | Fonctionnement | Exigence de configuration |
|---------|-------------|-------------------|
| Audiences personnalisées de site web | Cibler les visiteurs selon les événements du TikTok Pixel | TikTok Pixel + Events API |
| Audiences d'activité d'app | Cibler selon les événements in-app | Intégration SDK d'app |
| Audiences d'engagement | Utilisateurs ayant engagé avec le contenu TikTok | Contenu ou campagnes publicitaires TikTok publiés |
| Audiences de fichier client | Charger email, téléphone, ou ID d'appareil | Liste client (CSV ou intégration partenaire) |
| Audiences lookalike | Étendre la portée au-delà des audiences seed | Audience seed avec 10 000+ utilisateurs |

---

## Stratégies de retargeting séquentiel

### Séquence notoriété vers conversion

```
Étape 1 : Notoriété (Jours 1-7 post-visite)
├── Créatif : Histoire de marque, preuve sociale, contenu éducatif
├── Format : Vidéo (15-30s), carrousel montrant la gamme
├── Plafond de fréquence : 1 impression/jour
└── Objectif : Construire la familiarité et la confiance

Étape 2 : Considération (Jours 8-14)
├── Créatif : Bénéfices produit, comparaison, témoignages
├── Format : Carrousel, publicités collection, études de cas
├── Plafond de fréquence : 2 impressions/jour
└── Objectif : Générer un engagement plus profond

Étape 3 : Conversion (Jours 15-21)
├── Créatif : Offre spécifique, urgence, CTA direct
├── Format : Image/vidéo unique avec un CTA fort
├── Plafond de fréquence : 3 impressions/jour
└── Objectif : Générer l'achat ou la soumission de lead

Étape 4 : Réengagement (Jours 22-30)
├── Créatif : Offre finale, rareté, produits alternatifs
├── Format : Publicités dynamiques, message d'angle nouveau
├── Plafond de fréquence : 1 impression/jour
└── Objectif : Capturer l'intention restante avant l'expiration de l'audience
```

### Séquence d'abandon de panier

| Point de contact | Timing | Canal | Message |
|-----------|--------|---------|---------|
| Email 1 | 1 heure | Email | Rappel de panier, sans remise |
| Publicité retargeting | 2-6 heures | Meta/Google Display | Publicité dynamique de produit, preuve sociale |
| Email 2 | 24 heures | Email | Urgence + avis |
| Publicité retargeting | 24-72 heures | Meta/Google Display | Message de rareté, stock limité |
| Email 3 | 48-72 heures | Email | Petite incitation (si les marges le permettent) |
| Publicité retargeting | 72+ heures | Meta/Google Display | Offre de remise ou livraison gratuite |

---

## Directives de plafonnement de fréquence

| Niveau d'intention du segment | Plafond de fréquence recommandé | Justification |
|---------------------|--------------------------|-----------|
| Très élevé (abandons de checkout) | 5-7 impressions/semaine | La forte probabilité de conversion justifie la fréquence |
| Élevé (abandons de panier, visiteurs récurrents) | 4-6 impressions/semaine | Forte intention, éviter la sursaturation |
| Moyen (visiteurs de page, navigateurs de catégorie) | 3-5 impressions/semaine | Équilibre entre rappel et agacement |
| Faible (tous visiteurs, lecteurs de contenu) | 2-3 impressions/semaine | Touche légère pour rester présent à l'esprit |
| Prospecting (lookalikes) | 2-3 impressions/semaine | Audience froide, se concentrer sur la portée plutôt que la fréquence |

### Pixels de brûlure et exclusions

Un pixel de brûlure est un événement de suivi placé sur la page de conversion/remerciement qui déclenche l'exclusion d'audience.

- [ ] Placer des pixels de brûlure sur toutes les pages de confirmation de conversion
- [ ] Exclure les acheteurs des campagnes d'acquisition (économiser le budget, réduire l'agacement)
- [ ] Réinclure les acheteurs uniquement dans les campagnes de cross-sell ou de loyauté
- [ ] Exclure les employés via IP, liste d'emails, ou exclusion de ciblage par entreprise
- [ ] Exclure les clients existants des campagnes d'essai gratuit ou de démo
- [ ] Exclure les utilisateurs ayant complété des formulaires du retargeting de génération de leads
- [ ] Fixer des plafonds d'exposition maximum par utilisateur à travers toutes les campagnes (au niveau plateforme)

---

## Configuration du retargeting dynamique

### Exigences du catalogue produit

| Plateforme | Format de flux | Attributs clés | Fréquence de rafraîchissement |
|----------|-----------|----------------|-------------------|
| Google Merchant Center | XML, TSV, CSV | id, title, description, image, price, availability, link | Toutes les 6 heures minimum |
| Catalogue Meta | CSV, XML, Google Sheets | id, title, description, image_link, price, availability, url | Quotidien minimum |
| Catalogue TikTok | CSV, XML | sku_id, title, description, image_link, price, availability_status, landing_page_url | Quotidien minimum |

### Couches de personnalisation publicitaire dynamique

| Couche | Ce qui change | Exemple |
|-------|-------------|---------|
| Produit | Montre les articles spécifiques que l'utilisateur a consultés | « Toujours intéressé par les baskets de running bleues ? » |
| Catégorie | Montre les meilleurs produits de la catégorie parcourue | « Populaire dans les baskets de running homme » |
| Prix | Affiche le prix actuel (incluant les soldes) | « 89,99 $ (au lieu de 129,99 $) » |
| Disponibilité | Montre le statut de stock | « Plus que 3 en stock » |
| Preuve sociale | Ajoute des étoiles d'avis ou un nombre d'achats | « Noté 4,8/5 par 2 341 clients » |
| Recommandations | Suggestions de cross-sell pilotées par ML | « Les clients ont aussi acheté... » |

---

## Retargeting cross-appareil

### Méthodes de correspondance

| Méthode | Précision | Couverture | Exigence |
|--------|----------|----------|-------------|
| Déterministe (connecté) | Très élevée (~95 %) | Limitée aux utilisateurs connectés | Connexion utilisateur à travers les appareils |
| Probabiliste (graphe d'appareils) | Modérée (~60-70 %) | Portée plus large | Graphe d'appareils de la plateforme |
| Natif à la plateforme (Google, Meta) | Élevée (~80-90 %) | Dépendant de la plateforme | Tags de plateforme + utilisateur connecté |
| Customer Match (basé sur l'email) | Élevée | Limitée aux utilisateurs connus | Import de liste email |
| Données propriétaires (CDP) | Élevée | Dépend de la collecte de données | Mise en œuvre CDP |

### Stratégie cross-appareil

- [ ] S'assurer que les tags de suivi se déclenchent sur tous les appareils (site responsive)
- [ ] Utiliser Customer Match pour unifier les utilisateurs connus à travers les appareils
- [ ] Activer Google Signals pour le reporting GA4 cross-appareil
- [ ] Mettre en œuvre l'API Conversions Meta (côté serveur) pour une meilleure correspondance cross-appareil
- [ ] Concevoir les créatifs pour le contexte de l'appareil (créatif mobile-first pour le retargeting mobile)
- [ ] Attribuer les conversions cross-appareil dans le reporting (ne pas sous-créditer le mobile)

---

## Impact de la vie privée sur le retargeting

### Paysage actuel

| Changement | Impact | Statut |
|--------|--------|--------|
| ATT iOS (App Tracking Transparency) | ~75 % des utilisateurs iOS refusent, réduisant les tailles d'audience Meta de 30-40 % | Actif depuis iOS 14.5 |
| Dépréciation des cookies tiers | Annulée — Chrome conserve les cookies tiers (revirement 2024-2025) ; Safari/Firefox les bloquent déjà | Clos |
| Privacy Sandbox (Google) | L'API Topics et l'API Attribution Reporting remplacent les cookies tiers | Déploiement en cours |
| Consentement RGPD/CCPA | Nécessite un consentement explicite pour le suivi dans l'UE et en Californie | Actif |
| Confidentialité email (Apple MPP) | Les taux d'ouverture Apple Mail sont gonflés, impossible de segmenter fiablement par ouvertures | Actif depuis iOS 15 |

### Stratégies d'adaptation

| Stratégie | Mise en œuvre | Impact |
|----------|---------------|--------|
| Collecte de données propriétaires | Capture d'email, création de compte, programmes de fidélité | Construire des données d'audience propriétaires |
| Suivi côté serveur | API Conversions (Meta), Conversions améliorées (Google) | Récupérer 15-25 % du signal perdu |
| Ciblage contextuel | Cibler selon le contenu de la page, pas l'historique utilisateur | Alternative conforme à la vie privée |
| Conversions améliorées Google | Envoyer des données propriétaires hachées avec le tag de conversion | Meilleure attribution et construction d'audience |
| Meta CAPI | Transmission d'événements serveur-à-serveur | Récupérer les événements iOS perdus |
| Customer Match / Audiences personnalisées | Charger des listes propriétaires pour le ciblage | Ciblage indépendant des cookies |
| Conversions modélisées | Le ML de la plateforme estime les conversions à partir de données partielles | Combler les lacunes d'attribution |

---

## Optimisation de la fenêtre de retargeting

### Durée de la fenêtre par modèle économique

| Modèle économique | Période de considération | Fenêtre principale recommandée | Fenêtre étendue |
|---------------|---------------------|---------------------------|-----------------|
| eCommerce d'impulsion (<50 $) | Heures à jours | 7 jours | 14 jours |
| eCommerce considéré (50-500 $) | Jours à semaines | 14 jours | 30 jours |
| eCommerce à forte valeur (>500 $) | Semaines à mois | 30 jours | 60-90 jours |
| SaaS B2B (TPE/PME) | 1-4 semaines | 30 jours | 60 jours |
| SaaS B2B (Entreprise) | 1-6 mois | 60 jours | 90-180 jours |
| Services locaux | Jours à semaines | 14 jours | 30 jours |
| Voyage / hôtellerie | Semaines à mois | 30 jours | 90 jours |

### Stratégie de fenêtres en couches

Créer des segments d'audience séparés par récence et ajuster les enchères en conséquence :

| Fenêtre | Étiquette d'audience | Ajustement d'enchère | Approche créative |
|--------|---------------|---------------|-------------------|
| 0-3 jours | Visiteurs chauds | +50-80 % | CTA direct, urgence |
| 4-7 jours | Visiteurs tièdes | +30-50 % | Bénéfices, preuve sociale |
| 8-14 jours | Visiteurs en refroidissement | +10-20 % | Nouvel angle, témoignages |
| 15-30 jours | Visiteurs froids | Référence | Renforcement de marque |
| 31-60 jours | Visiteurs très froids | -20-30 % | Renotoriété, nouveau contenu |
| 61-90 jours | Visiteurs dormants | -40-50 % | Histoire de marque, éducation |

---

## Stratégie créative par segment

| Segment | Ton créatif | Focus du message | Style de CTA |
|---------|-------------|---------------|-----------|
| Abandons de panier | Urgent, serviable | Spécifique au produit, adresser la friction | « Complétez votre commande » |
| Visiteurs de page produit | Informatif, persuasif | Bénéfices produit, avis, comparaisons | « Achetez maintenant » ou « En savoir plus » |
| Navigateurs de catégorie | Découverte, curaté | Points forts de la catégorie, meilleures ventes | « Explorez la collection » |
| Lecteurs de blog/contenu | Éducatif, leadership éclairé | Contenu associé, ressources plus approfondies | « Lire la suite » ou « Télécharger le guide » |
| Clients passés (récents) | Reconnaissant, exclusif | Produits complémentaires, nouveautés | « Découvrez les nouveautés » |
| Clients passés (inactifs) | Reconquête, personnel | « Vous nous manquez » + incitation ou nouveautés | « Revenez et économisez » |
| Clients à forte valeur | VIP, exclusif | Accès anticipé, avantages de loyauté, premium | « Accès exclusif » |
| Abandons de formulaire | Rassurant, simple | Simplifier la demande, adresser les préoccupations | « Ça ne prend que 2 minutes » |
| Spectateurs vidéo (75 %+) | Direct, étape suivante | Informations plus approfondies sur le produit/service | « Voyez comment ça marche » |

---

## Cadre de mesure

### Modèles d'attribution pour le retargeting

| Modèle | Comment il compte | Idéal pour | À surveiller |
|-------|-------------|----------|---------------|
| Au clic (7 jours) | Conversion dans les 7 jours suivant le clic | Réponse directe, mesure conservatrice | Rate l'influence de la vue |
| Au clic (28 jours) | Conversion dans les 28 jours suivant le clic | Produits à considération plus longue | Peut sur-créditer si la fenêtre est trop longue |
| À la vue (1 jour) | Conversion dans le jour suivant l'impression (sans clic) | Comprendre l'influence complète du retargeting | Peut sur-créditer pour les campagnes à haute fréquence |
| À la vue (7 jours) | Conversion dans les 7 jours suivant l'impression | Retargeting de notoriété de marque | Sur-crédite probablement ; à utiliser pour des données directionnelles uniquement |
| Attribution pilotée par les données | Crédit distribué par ML entre les points de contact | Mesure holistique à travers les canaux | Nécessite un volume de conversion significatif |

### Test d'incrémentalité

Pour mesurer le véritable lift du retargeting (pas seulement capturer des conversions qui se seraient produites de toute façon) :

1. **Test avec groupe témoin** — Suspendre les publicités de retargeting pour un échantillon aléatoire de 10-20 % de votre audience pendant 2-4 semaines
2. **Mesurer l'écart** — Comparer les taux de conversion entre le groupe exposé et le groupe témoin
3. **Calculer le lift incrémental** — (TdC exposé - TdC témoin) / TdC témoin = véritable lift de retargeting
4. **Constat typique** — Le retargeting génère généralement un lift incrémental de 10-30 % (pas 100 % des conversions attribuées)
5. **Ajuster les attentes de ROAS** — Le véritable ROAS de retargeting représente typiquement 40-70 % du ROAS rapporté après incrémentalité

### Métriques clés à suivre

| Métrique | Définition | Plage de benchmark |
|--------|-----------|-----------------|
| Fréquence | Impressions moyennes par utilisateur et par semaine | 3-7 (varie selon le segment) |
| Portée | Utilisateurs uniques dans l'audience | Dépend du trafic du site |
| Conversions à la vue | Conversions après vue de la publicité, sans clic | 20-50 % du total des conversions de retargeting |
| Taux de décroissance de l'audience | Baisse du taux de conversion à mesure que la fenêtre s'allonge | Baisse de 40-60 % entre les jours 1-7 et 14-30 |
| ROAS incrémental | Revenu des vraies conversions incrémentales / dépense publicitaire | 3-8x pour un retargeting bien optimisé |
| Chevauchement d'audience | % d'utilisateurs apparaissant dans plusieurs segments | Garder <30 % pour éviter la concurrence d'enchères |

---

*Le retargeting ne consiste pas à suivre les gens sur Internet. Il s'agit de délivrer le bon message à la bonne personne au bon moment de leur processus de décision. Les meilleures stratégies de retargeting donnent l'impression d'être utiles, pas envahissantes, et elles s'adaptent aux évolutions de la vie privée en construisant des fondations de données propriétaires plutôt qu'en s'appuyant sur des cookies tiers.*

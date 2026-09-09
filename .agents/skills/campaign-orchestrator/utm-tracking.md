# UTM Tracking — Conventions de nommage et gouvernance

## Définitions des paramètres UTM

| Paramètre | Requis | Objectif | Exemple |
|-----------|----------|---------|---------|
| `utm_source` | Oui | D'où vient le trafic | google, facebook, linkedin, newsletter |
| `utm_medium` | Oui | Comment le trafic arrive | cpc, social, email, referral, organic |
| `utm_campaign` | Oui | Quelle campagne | 2026-q2-product-launch |
| `utm_term` | Facultatif | Mot-clé payant (annonces de recherche) | project-management-software |
| `utm_content` | Facultatif | Quelle création/variation | hero-image-v2, cta-blue |

---

## Règles de convention de nommage

1. **Toujours en minuscules** : `facebook` et non `Facebook`
2. **Tirets pour les espaces** : `product-launch` et non `product_launch` ou `product launch`
3. **Aucun caractère spécial** : uniquement a-z, 0-9, et des tirets
4. **Terminologie cohérente** : utilisez les valeurs source/medium standardisées ci-dessous
5. **Format de date** : YYYY-QN ou YYYY-MM (ex. : `2026-q2` ou `2026-06`)
6. **Descriptif mais concis** : suffisant pour identifier, pas une phrase complète

---

## Valeurs standardisées de source/medium

### Sources (utm_source)

| Valeur | À utiliser pour |
|-------|---------|
| `google` | Google Ads, organique |
| `facebook` | Facebook/Meta organique et payant |
| `instagram` | Instagram organique et payant |
| `linkedin` | LinkedIn organique et payant |
| `twitter` | Twitter/X |
| `tiktok` | TikTok organique et payant |
| `youtube` | YouTube |
| `pinterest` | Pinterest |
| `bing` | Microsoft/Bing Ads |
| `email` | Campagnes e-mail (votre ESP) |
| `newsletter` | Newsletter spécifiquement |
| `partner-[name]` | Partenaire de co-marketing |
| `influencer-[name]` | Campagnes d'influence |
| `podcast-[name]` | Sponsoring de podcast |
| `qr` | Scans de code QR |
| `direct-mail` | Courrier direct physique |
| `event-[name]` | Événements en présentiel |

### Mediums (utm_medium)

| Valeur | À utiliser pour |
|-------|---------|
| `cpc` | Recherche payante (coût par clic) |
| `paid-social` | Publicités sur réseaux sociaux payantes |
| `social` | Réseaux sociaux organiques |
| `email` | Marketing par e-mail |
| `referral` | Recommandation partenaire/affiliation |
| `display` | Publicité display/bannière |
| `video` | Publicité vidéo (YouTube, CTV) |
| `affiliate` | Marketing d'affiliation |
| `influencer` | Partenariats d'influence |
| `organic` | Recherche organique (généralement non taguée) |
| `pr` | Couverture presse/médias |
| `podcast` | Publicité podcast |
| `sms` | Marketing SMS/texte |
| `push` | Notification push |
| `direct-mail` | Courrier physique |
| `qr` | Code QR |

---

## Format de nommage des campagnes

```
utm_campaign = [year]-[quarter]-[type]-[audience]-[description]
```

**Exemples** :
- `2026-q2-launch-enterprise-ai-features`
- `2026-q3-promo-all-summer-sale`
- `2026-q1-abm-target-accounts-nurture`
- `2026-evergreen-retargeting-website-visitors`

---

## Schémas de tag utm_content

Utilisez `utm_content` pour différencier :

| Schéma | Exemple | Cas d'usage |
|---------|---------|----------|
| `[format]-[variant]` | `carousel-v2` | Test de format d'annonce |
| `[position]-[cta]` | `hero-signup` | Position du lien dans l'e-mail |
| `[audience]-[message]` | `cfo-roi-focus` | Test audience-message |
| `[creative-id]` | `creative-2026-0142` | Lien vers le suivi de l'actif créatif |

---

## Erreurs UTM courantes

| Erreur | Problème | Correction |
|---------|---------|-----|
| Capitalisation incohérente | `Facebook` et `facebook` apparaissent comme des sources séparées | Toujours utiliser des minuscules |
| Espaces dans les paramètres | Casse l'encodage de l'URL | Utiliser des tirets |
| Pas d'UTM sur les liens e-mail | Impossible de suivre le trafic généré par e-mail | Taguer chaque lien e-mail |
| UTM sur des liens internes | Écrase l'attribution de source d'origine | Ne JAMAIS utiliser d'UTM sur les liens internes du site |
| Mediums différents pour le même canal | `social`, `social-media`, `organic-social` tous différents | Standardiser sur la liste ci-dessus |
| Pas de convention de nommage de campagne | Impossible d'agréger les campagnes | Suivre le format de nommage |
| URL non raccourcies | Liens laids, peu fiables dans les emplacements visibles | Utiliser un raccourcisseur d'URL pour les liens visibles |

---

## UTM pour l'offline-vers-online

| Canal offline | Implémentation UTM |
|----------------|-------------------|
| Courrier direct | URL courte ou code QR avec UTM intégrés |
| Publicité imprimée | URL vanity redirigeant vers une page taguée UTM |
| Stand d'événement | Code QR sur la signalétique → landing page taguée UTM |
| Carte de visite | Code QR → URL taguée UTM |
| TV/Radio | URL vanity (`brand.com/tv`) redirigeant avec des UTM |
| Panneau publicitaire | URL courte ou QR → page taguée UTM |

---

## Règles de gouvernance

1. **Propriétaire unique** : une personne/équipe possède le document de taxonomie UTM
2. **Suivi centralisé** : maintenir un tableur de tous les paramètres UTM actifs
3. **Pas d'improvisation** : tous les membres de l'équipe utilisent les valeurs standardisées de ce document
4. **Outil de générateur d'URL** : utiliser un générateur UTM partagé qui applique les règles de nommage
5. **Audit trimestriel** : revoir l'analytics pour les valeurs UTM non standard et nettoyer
6. **Demandes de nouvelles valeurs** : ajouter une nouvelle valeur source/medium nécessite une mise à jour du standard

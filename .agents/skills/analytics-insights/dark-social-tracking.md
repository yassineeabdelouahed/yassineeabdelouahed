# Suivi du dark social — Méthodes de mesure

## Qu'est-ce que le dark social ?

Le dark social désigne le partage de contenu et le trafic de référence qui se produit via des canaux privés et non traçables — messages directs, discussions de groupe privées, SMS, transferts d'e-mail, Slack, WhatsApp, Discord, et partage natif d'applications mobiles. Lorsqu'un utilisateur copie un lien et le colle dans une discussion de groupe, l'en-tête de référent est supprimé. La visite qui en résulte apparaît comme du « trafic direct » dans les outils d'analytics, la rendant invisible pour l'attribution standard.

### Pourquoi cela compte

| Dimension | Impact |
|-----------|--------|
| **Échelle** | Le dark social représente une estimation de 70 à 80 % de l'ensemble de l'activité de partage social en ligne |
| **Distorsion de l'attribution** | Gonfle le trafic « Direct » dans GA4, masquant la véritable source de découverte |
| **Canaux sous-valorisés** | Le marketing de contenu, la communauté, les podcasts, et le social organique paraissent moins efficaces qu'ils ne le sont réellement |
| **Qualité de décision** | L'allocation budgétaire basée sur l'attribution au dernier clic sous-finance systématiquement les canaux de notoriété et de bouche-à-oreille |
| **Impact B2B** | Particulièrement significatif en B2B où les acheteurs partagent du contenu en interne via Slack, Teams, et e-mail avant de convertir |

### Quels canaux génèrent du trafic de dark social ?

| Canal | Mécanisme | Traçabilité |
|---------|-----------|-------------|
| WhatsApp / iMessage / SMS | Lien partagé dans un message privé | Non traçable sans UTM |
| Slack / Microsoft Teams | Lien partagé dans les canaux d'espace de travail | Non traçable sans UTM |
| Discord | Lien partagé sur des serveurs ou en DM | Non traçable sans UTM |
| E-mail (liens transférés) | Le destinataire clique sur un lien transféré | Partiellement traçable (les UTM d'origine peuvent persister) |
| Menus de partage natifs d'application | Le bouton « Partager » des applications mobiles copie l'URL | Supprime le référent ; apparaît comme Direct |
| Mentions dans des podcasts | L'animateur mentionne l'URL verbalement | Non traçable sans URL personnalisée ou UTM |
| Bouche-à-oreille (hors ligne) | Quelqu'un tape l'URL directement | Apparaît comme Direct |
| Groupes Facebook privés | Liens partagés au sein de groupes fermés | Données de référent limitées |
| DM LinkedIn | Liens partagés en messages privés | Non traçable sans UTM |
| DM Reddit | Liens partagés en messages privés | Non traçable sans UTM |

---

## Méthodes de mesure

### Méthode 1 : suivi UTM pour le contenu partageable

L'approche la plus directe consiste à intégrer des paramètres de suivi dans chaque lien partageable afin que, même lorsque le référent est supprimé, les paramètres UTM persistent.

**Structure UTM pour le dark social :**

| Paramètre | Valeur | Objectif |
|-----------|-------|---------|
| `utm_source` | `dark_social` ou plateforme spécifique (`whatsapp`, `slack`, `sms`) | Identifier la plateforme de partage |
| `utm_medium` | `share` ou `social_share` | Distinguer des autres trafics sociaux |
| `utm_campaign` | Nom ou identifiant du contenu | Suivre quel contenu est partagé |
| `utm_content` | Emplacement du bouton de partage (`inline`, `floating`, `bottom`) | Optimiser le placement du bouton de partage |

**Exemple :**
```
https://example.com/blog/post-title?utm_source=whatsapp&utm_medium=share&utm_campaign=blog-post-title
```

### Méthode 2 : boutons de partage spécifiques à la plateforme

Remplacer les boutons génériques de « copie de lien » par des boutons de partage spécifiques à la plateforme qui pré-remplissent les UTM.

**Liste de contrôle de mise en œuvre :**

- [ ] Bouton de partage WhatsApp avec `utm_source=whatsapp`
- [ ] Bouton de partage Telegram avec `utm_source=telegram`
- [ ] Bouton de partage SMS (via le protocole `sms:`) avec `utm_source=sms`
- [ ] Bouton de partage e-mail avec `utm_source=email_share`
- [ ] Bouton de partage LinkedIn avec `utm_source=linkedin_share`
- [ ] Bouton de partage Twitter/X avec `utm_source=twitter_share`
- [ ] Bouton « Copier le lien » qui ajoute automatiquement `utm_source=copy_link&utm_medium=share`
- [ ] Chaque bouton déclenche un événement personnalisé GA4 (par ex. `share_click`) avec la plateforme comme paramètre

**Notes de mise en œuvre technique :**
- Utiliser JavaScript pour ajouter dynamiquement les UTM lorsque le bouton de partage est cliqué
- Pour « Copier le lien », intercepter l'écriture dans le presse-papiers pour ajouter les paramètres à l'URL
- Stocker l'URL de la page + les UTM dans le presse-papiers, pas seulement l'URL propre
- Sur mobile, utiliser la Web Share API (`navigator.share()`) avec une URL taguée UTM

### Méthode 3 : URL raccourcies avec suivi

Utiliser des liens courts de marque qui redirigent à travers une couche de suivi.

| Approche | Outil | Bénéfice | Limite |
|----------|------|---------|------------|
| Liens courts de marque | Bitly, Rebrandly, Short.io | Suit les clics, la géographie, l'appareil ; paraît propre | Nécessite la création d'un lien court par contenu |
| URL personnalisées (vanity URLs) | Redirection personnalisée (par ex. `brand.com/guide`) | Mémorisable pour les podcasts, événements, print | Nécessite une configuration de redirection ; métadonnées limitées |
| Codes QR | Tout générateur QR avec UTM intégrés | Fait le pont entre offline et online tracking | Pertinent uniquement pour les médias physiques/visuels |

**Bonne pratique :** utiliser des URL raccourcies pour le contenu diffusé via des canaux à forte présence de dark social (newsletters, podcasts, communautés). Intégrer des UTM complets dans la destination de redirection.

### Méthode 4 : segmentation du trafic direct

Le dark social gonflant le trafic Direct, analyser les motifs de trafic Direct pour estimer la composante dark social.

**Logique de segmentation :**

| Segment de trafic direct | Source probable | Justification |
|-----------------------|-------------|-----------|
| Visites de la page d'accueil (direct) | Vrai direct (URL tapée, favoris) | Les utilisateurs qui connaissent la marque naviguent vers la page d'accueil |
| Visites de pages profondes (direct) — articles de blog, pages produit, URL longues | Dark social | Personne ne tape manuellement `example.com/blog/2024/12/long-post-title` |
| Visites de landing page avec une longueur de chemin > 3 segments (direct) | Dark social | Des URL complexes indiquent un lien partagé, pas une URL tapée |
| Trafic direct de nouveaux utilisateurs sur des pages de contenu | Dark social | Les nouveaux utilisateurs ne mettent pas en favoris ni ne tapent d'URL profondes |
| Trafic direct depuis un appareil mobile + page de contenu | Dark social (probabilité très élevée) | Les utilisateurs mobiles partagent des liens via des applications de messagerie |

**Mise en œuvre GA4 :**
1. Créer un segment : Source = (direct), Landing Page ne correspond PAS à la page d'accueil, Appareil = Mobile
2. Ce segment approxime le trafic mobile de dark social
3. Suivre le volume et les tendances de ce segment dans le temps
4. Comparer aux pages de contenu recevant un trafic social connu élevé, pour calibration

### Méthode 5 : attribution auto-déclarée (« Comment avez-vous entendu parler de nous ? »)

Ajouter une question « Comment avez-vous entendu parler de nous ? » aux points de conversion clés.

**Options de mise en œuvre :**

| Emplacement | Format | Taux de réponse |
|-----------|--------|--------------|
| Enquête post-achat | Texte libre + menu déroulant | 60-80 % |
| Formulaire de lead (champ additionnel) | Menu déroulant avec option « Autre » | 40-60 % |
| Onboarding in-app | Choix multiple | 50-70 % |
| Enquête e-mail (post-conversion) | Texte libre | 15-30 % |

**Options de réponse recommandées :**
- Moteur de recherche (Google, Bing)
- Réseau social (Instagram, TikTok, LinkedIn, etc.)
- Recommandé par un ami ou un collègue
- Podcast
- Newsletter ou e-mail
- Communauté en ligne (Reddit, Discord, Slack)
- Article de blog
- Vidéo YouTube
- J'ai vu une publicité
- Autre (précisez) : ___

**Guidance d'analyse :**
- « Recommandé par un ami ou un collègue » et « Communauté en ligne » sont de forts indicateurs de dark social
- Recouper la source auto-déclarée avec la source attribuée par les analytics pour quantifier les écarts d'attribution
- Suivre les tendances d'attribution auto-déclarée mensuellement ; les changements indiquent des motifs de découverte en évolution

---

## Modèles d'estimation

### Formule d'estimation du trafic de dark social

```
Estimated Dark Social = Direct Traffic to Non-Homepage Pages (New Users, Mobile)
```

**Estimation plus affinée :**

| Étape | Calcul |
|------|------------|
| 1. Sessions Direct totales | Depuis GA4 |
| 2. Soustraire les sessions Direct de la page d'accueil | Probablement du vrai Direct (favoris, URL tapée) |
| 3. Soustraire le trafic d'applications connu classé à tort comme Direct | Certaines applications suppriment le référent mais ne sont pas « sociales » |
| 4. Restant = Dark social estimé | Direct sur page profonde de nouveaux utilisateurs, en particulier mobile |

**Calibration :** comparer le volume de dark social estimé à l'activité de partage connue (clics sur boutons de partage, clics sur URL raccourcies) pour valider l'estimation. Constat typique : le dark social estimé représente 3 à 5 fois l'activité de partage suivie.

### Évaluation de l'impact du dark social

| Métrique | Calcul | Objectif |
|--------|------------|---------|
| Part de dark social (%) | Sessions de dark social est. / Sessions totales | Comprendre l'échelle du partage non mesuré |
| Taux de conversion du dark social | Conversions du dark social est. / Sessions de dark social est. | Évaluer la qualité du trafic de dark social |
| Revenu du dark social | Conversions du dark social x AOV | Quantifier l'impact sur le revenu |
| Ratio partage-vers-visite | Clics sur boutons de partage / Visites résultantes (suivies) | Estimer le coefficient de viralité |
| Tendance de croissance du dark social | Variation MoM du volume de dark social estimé | Évaluer si le bouche-à-oreille croît |

---

## Motifs spécifiques par plateforme

### D'où provient le trafic de dark social par plateforme

| Plateforme | Comportement principal de dark social | Approche de suivi |
|----------|----------------------------|-------------------|
| **WhatsApp** | Partage de liens en 1:1 et en discussions de groupe ; canal de dark social le plus courant au monde | Bouton de partage WhatsApp avec UTM ; publicités Click-to-WhatsApp comme proxy |
| **iMessage / SMS** | Partage de liens, en particulier chez les utilisateurs iPhone US/UK | Bouton de partage SMS ; URL personnalisées pour l'offline-vers-online |
| **Slack** | Partage de contenu B2B dans les canaux d'équipe et en DM | Bouton de partage Slack ; surveiller les communautés Slack pour les mentions de marque |
| **Discord** | Partage piloté par la communauté, en particulier chez les jeunes démographies | UTM spécifiques à Discord ; outils de gestion de communauté |
| **DM LinkedIn** | Décideurs B2B partageant du contenu avec des collègues | Bouton de partage LinkedIn ; l'attribution auto-déclarée capture bien cela |
| **Telegram** | Élevé sur les marchés internationaux, communautés crypto/tech | Bouton de partage Telegram avec UTM |
| **Transferts d'e-mail** | Les UTM d'e-mail d'origine peuvent persister si le destinataire clique sur le lien original | Encourager les liens « transférer à un ami » avec des UTM uniques |
| **Podcasts** | La mention verbale de l'URL génère du trafic direct | URL personnalisées (`brand.com/podcast`), codes promo uniques |

---

## Cadre de reporting

### Composants du tableau de bord dark social

| Composant | Métrique | Visualisation | Cadence de mise à jour |
|-----------|--------|---------------|----------------|
| Volume de dark social | Sessions estimées provenant du dark social | Graphique linéaire (tendance hebdomadaire) | Hebdomadaire |
| % de dark social sur le total | Sessions de dark social / Sessions totales | Métrique unique avec tendance | Hebdomadaire |
| Usage des boutons de partage | Clics par plateforme et par contenu | Graphique à barres par plateforme | Hebdomadaire |
| Contenu le plus partagé | Pages de contenu classées par trafic de dark social | Tableau | Hebdomadaire |
| Taux de conversion du dark social | Conversions / Sessions de dark social estimées | Graphique linéaire avec comparaison au CVR global | Mensuelle |
| Répartition des sources auto-déclarées | Répartition des réponses « Comment avez-vous entendu parler de nous ? » | Camembert ou graphique à barres | Mensuelle |
| Écart d'attribution | Différence entre source attribuée par les analytics et source auto-déclarée | Graphique d'écart par canal | Mensuelle |

### Modèle de rapport mensuel sur le dark social

**Section 1 : volume et tendances**
- Sessions de dark social estimées ce mois vs le mois dernier
- Dark social en % du trafic total (tendance sur 6 mois)
- Volume de clics sur boutons de partage par plateforme

**Section 2 : performance du contenu**
- Top 10 des contenus les plus partagés (par clics sur boutons de partage + trafic de dark social estimé)
- Thèmes de contenu qui génèrent le plus de partage
- Motifs de partage du contenu nouveau vs evergreen

**Section 3 : impact sur la conversion**
- Revenu estimé du trafic de dark social
- Taux de conversion du dark social vs taux de conversion global du site
- Données d'attribution auto-déclarée (% disant « ami », « communauté », « podcast »)

**Section 4 : analyse de l'écart d'attribution**
- Comparaison de l'attribution de canal GA4 vs l'attribution auto-déclarée
- Canaux les plus sous-comptabilisés par les analytics (généralement le social organique, les podcasts, le bouche-à-oreille)
- Implications pour l'allocation budgétaire

**Section 5 : recommandations**
- Contenu dans lequel investir en fonction des motifs de partage
- Améliorations d'expérience de partage à mettre en œuvre
- Canaux où le dark social indique un sous-investissement

---

## Feuille de route de mise en œuvre

### Phase 1 : fondations (semaines 1-2)

- [ ] Mettre en œuvre des boutons de partage spécifiques à la plateforme sur toutes les pages de contenu clés
- [ ] Configurer le bouton « Copier le lien » pour ajouter automatiquement les UTM
- [ ] Configurer des événements personnalisés GA4 pour les clics sur boutons de partage
- [ ] Créer une segmentation du trafic Direct pour l'estimation du dark social
- [ ] Ajouter « Comment avez-vous entendu parler de nous ? » au formulaire de conversion principal

### Phase 2 : mesure (semaines 3-4)

- [ ] Construire un modèle d'estimation du dark social à l'aide de la logique de segmentation
- [ ] Créer un tableau de bord initial de dark social
- [ ] Configurer des liens courts de marque pour la diffusion en podcast et communauté
- [ ] Configurer des URL personnalisées pour les canaux offline
- [ ] Établir des métriques de référence pour le volume et la conversion du dark social

### Phase 3 : optimisation (mois 2+)

- [ ] Analyser l'usage des boutons de partage pour optimiser le placement et le design
- [ ] Identifier le contenu le plus partagé et investir dans des formats similaires
- [ ] Recouper mensuellement l'attribution auto-déclarée avec l'attribution des analytics
- [ ] Ajuster l'allocation budgétaire en fonction de l'analyse de l'écart d'attribution
- [ ] Tester de nouvelles incitations au partage (par ex. texte « Partagez ceci avec un collègue qui... »)
- [ ] Rapporter les tendances de dark social trimestriellement à la direction dans le cadre de la revue d'attribution

### Phase 4 : avancé (trimestre 2+)

- [ ] Intégrer les données d'attribution auto-déclarée dans le MMM comme signal additionnel
- [ ] Construire un « score de partageabilité » pour la planification de contenu (prédire quel contenu sera partagé)
- [ ] Mettre en œuvre la Web Share API pour une expérience de partage mobile-first
- [ ] Tester le partage incitatif (récompenses de recommandation) et mesurer l'impact incrémental
- [ ] Intégrer les insights de dark social au processus de planification de la stratégie de contenu

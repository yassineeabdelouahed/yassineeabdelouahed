# Commerce conversationnel — Chat, SMS & Messagerie

> **Provenance des benchmarks (au 2026-08) :** les chiffres en dollars présents dans ce document sont des estimations de planification, pas des cotations — les taux de marché et d'enchères évoluent en permanence. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, l'actualiser en direct (les tableaux de bord de plateforme et les rapports publiés récents valent mieux que la mémoire) et l'enregistrer avec `python scripts/benchmark_book.py --action record ... --source <url>` ; le citer ensuite depuis le livre de référence (`--action quote`). Ne jamais présenter un chiffre non validé comme un fait de marché actuel.

> Le commerce conversationnel est l'intersection entre la messagerie et l'achat. Les clients s'attendent de plus en plus à découvrir, évaluer, et acheter des produits au sein d'interfaces de chat. Ce guide couvre tous les principaux canaux de messagerie, les exigences de conformité, et les cadres de mesure.

---

## Paysage des canaux

| Canal | Utilisateurs actifs mensuels | Maturité du commerce | Idéal pour |
|---------|---------------------|-------------------|----------|
| **WhatsApp Business** | 2 Mds+ | Élevée (notamment hors États-Unis) | Commerce international, support, notifications |
| **SMS / MMS** | Universel | Élevée | Promotions, alertes, réengagement, transactionnel |
| **Facebook Messenger** | 1 Md+ | Moyenne-élevée | Génération de leads, support client, flux automatisés |
| **DM Instagram** | 2 Mds+ (Instagram total) | Moyenne | Demandes produit, commerce d'influenceur |
| **RCS (Rich Communication Services)** | En croissance (par défaut sur Android) | Émergent | Messagerie riche en médias, expéditeur de marque |
| **Chat en direct (site web)** | N/A | Élevée | Support en temps réel, conversion des ventes |
| **Chatbots (IA)** | N/A | Moyenne-élevée | Support automatisé, qualification, FAQ |
| **Apple Business Messages** | Utilisateurs iOS | Moyenne | Support premium, prise de rendez-vous |

---

## WhatsApp Business — Mise en place & Marketing

### Niveaux de compte

| Niveau | Application WhatsApp Business | Plateforme WhatsApp Business (API) |
|------|----------------------|--------------------------------|
| Idéal pour | Petites entreprises (<5 agents) | Marché intermédiaire et entreprise |
| Coût | Gratuit | Tarification au message depuis le 1er juillet 2025 (varie selon le pays et le type de modèle — modèle marketing en Inde ≈ 0,0118 USD ; les messages de service dans la fenêtre de service client de 24h et la fenêtre gratuite de 72h depuis les CTA de CTWA/Page sont gratuits) |
| Automatisation | Réponses rapides basiques, étiquettes | Chatbot complet, intégration CRM, workflows |
| Diffusion | Listes de diffusion (256 contacts) | Messages modèles illimités (pré-approuvés) |
| Commerce | Catalogue produit dans l'app | Catalogue complet + panier + intégration de paiement |
| Vérification | Coche verte disponible | Coche verte disponible |

### Types de messages WhatsApp

| Type | Cas d'usage | Opt-in requis ? | Approbation de modèle ? |
|------|---------|-------------------|-------------------|
| **Utilitaire** | Confirmations de commande, mises à jour d'expédition, reçus | Oui | Oui |
| **Authentification** | OTP, vérification de connexion | Oui | Oui |
| **Marketing** | Promotions, lancements de produit, réengagement | Oui (explicite) | Oui |
| **Service** | Conversations de support initiées par le client | Non (initiées par le client) | Non (format libre dans la fenêtre de 24h) |

### Bonnes pratiques marketing WhatsApp
1. Obtenir un opt-in explicite avant d'envoyer tout message marketing
2. Segmenter les audiences — ne pas diffuser à toute la liste de contacts
3. Personnaliser les messages avec le nom du client et des données produit pertinentes
4. Inclure un CTA clair (acheter maintenant, réserver un rendez-vous, répondre à la commande)
5. Respecter la fréquence : 2-4 messages marketing par mois maximum
6. Toujours fournir un mécanisme de désabonnement facile
7. Utiliser des médias riches : images, vidéos, carrousels de produits, boutons interactifs

---

## Cadre de conception de chatbot

### Architecture de conversation

```
Point d'entrée → Accueil → Détection d'intention → Routage de flux
                                               │
                    ┌──────────┬────────────────┼────────────────┐
                    ▼          ▼                ▼                ▼
               Parcours    Problème        Prise de         Qualification
               produit     de support      rendez-vous       de lead
                    │          │                │                │
                    ▼          ▼                ▼                ▼
               Ajouter     Résoudre /      Confirmer /      Capturer /
               au panier   Escalader       Rappeler         Router vers vente
                    │          │                │                │
                    └──────────┴────────────────┴────────────────┘
                                               │
                                          Clôturer / Enquête
```

### Principes de conception de chatbot

| Principe | Mise en œuvre |
|-----------|---------------|
| **Identifier le bot** | Toujours divulguer que l'utilisateur discute avec un bot, pas un humain |
| **Limiter le périmètre** | Définir 5 à 10 intentions clés que le bot gère bien ; escalader tout le reste |
| **Fournir une escalade humaine** | Option « parler à un humain » disponible à chaque étape |
| **Utiliser des réponses rapides** | Proposer des options de bouton pour guider la conversation (réduire la friction du texte libre) |
| **Gérer les impasses** | Toute saisie non reconnue reçoit un repli élégant (« Je n'ai pas bien compris. Voici ce que je peux faire pour vous : ») |
| **Personnaliser** | Utiliser le nom du client, l'historique de commande, le contexte de navigation lorsque disponibles |
| **Rester concis** | Messages de moins de 60 mots ; découper les longues réponses en plusieurs messages |
| **Confirmer les actions** | Toujours confirmer avant de traiter les commandes, réservations, ou changements de compte |

### Comparaison des plateformes de chatbot

| Plateforme | Idéal pour | Capacité IA | Canaux pris en charge | Tarification |
|----------|---------|---------------|-------------------|---------|
| **ManyChat** | PME, e-commerce | Basé sur des règles + IA | Messenger, Instagram, WhatsApp, SMS | Offre gratuite + 15 $+/mois |
| **Intercom** | SaaS, support | IA (Fin) + règles | Chat web, email, Messenger, WhatsApp | 74 $+/mois |
| **Drift** | Génération de leads B2B | IA + playbooks | Chat web, email | Tarification personnalisée |
| **Zendesk Chat** | Équipes de support | IA + routage d'agent | Chat web, Messenger, WhatsApp | 49 $+/agent/mois |
| **Tidio** | Petit e-commerce | IA + modèles | Chat web, Messenger, email | Offre gratuite + 29 $+/mois |
| **Personnalisé (API GPT/Claude)** | Entreprise, besoins personnalisés | Capacité LLM complète | Tout (via intégration) | Coûts d'usage API |

---

## Guide de conformité SMS

### TCPA (Telephone Consumer Protection Act) — États-Unis

| Exigence | Détails |
|------------|---------|
| **Consentement écrit explicite** | Requis avant l'envoi de tout SMS marketing |
| **Le consentement doit être clair** | Ne peut pas être enfoui dans des conditions générales ; doit être visible |
| **Désabonnement** | Doit honorer immédiatement STOP/UNSUBSCRIBE |
| **Identification** | Chaque message doit identifier l'expéditeur |
| **Heures de silence** | Ne pas envoyer avant 8h ou après 21h (fuseau horaire du destinataire) |
| **Conservation des dossiers** | Conserver les enregistrements de consentement pendant au moins 4 ans |
| **Sanctions** | 500-1 500 $ par message non sollicité (risque de recours collectif) |

### Enregistrement 10DLC (10-Digit Long Code)

Depuis 2023, toutes les entreprises envoyant des SMS via des numéros de téléphone standard doivent s'enregistrer auprès du Campaign Registry (TCR).

| Étape | Action | Détails |
|------|--------|---------|
| 1 | Enregistrer votre marque | Nom de l'entreprise, EIN, site web, secteur |
| 2 | Enregistrer votre campagne | Cas d'usage, exemples de messages, description du flux d'opt-in |
| 3 | Recevoir un score de confiance | Le score détermine les limites de débit (messages par seconde) |
| 4 | Approbation de l'opérateur | AT&T, T-Mobile, Verizon examinent et approuvent |
| 5 | Commencer l'envoi | Rester dans le cadre du cas d'usage et du débit approuvés |

### Bonnes pratiques d'opt-in

| Méthode | Exemple | Niveau de conformité |
|--------|---------|-----------------|
| Formulaire web avec case à cocher | « [ ] J'accepte de recevoir des SMS de {{marque}}. Des frais SMS/données peuvent s'appliquer. Répondez STOP pour vous désabonner. » | Solide |
| Opt-in par mot-clé | « Envoyez JOIN au 55555 » (avec conditions affichées) | Solide |
| Point de vente | Formulaire de consentement papier ou tablette à la caisse | Solide (si documenté) |
| Case précochée | Toute case de consentement précochée | **Non conforme** (à ne pas utiliser) |
| Consentement implicite | Achat = consentement au marketing | **Non conforme** (à ne pas utiliser) |

### Divulgations SMS requises (premier message)

```
Welcome to {{brand}} alerts! You'll receive up to {{frequency}} msgs/mo.
Msg & data rates may apply. Reply HELP for help, STOP to cancel.
Terms: {{URL}} Privacy: {{URL}}
```

---

## Modèles de flux de conversation

### E-commerce — Flux de recommandation de produit

```
Bot: Hey {{name}}! 👋 Looking for something specific today?
     [Browse New Arrivals] [Get a Recommendation] [Check Order Status]

User: [Get a Recommendation]

Bot: Great! What are you shopping for?
     [Clothing] [Accessories] [Home] [Gifts]

User: [Clothing]

Bot: What's the occasion?
     [Casual / Everyday] [Work / Professional] [Special Event]

User: [Casual / Everyday]

Bot: Here are 3 picks I think you'll love:
     [Product Card 1 — image, name, price, "View" button]
     [Product Card 2 — image, name, price, "View" button]
     [Product Card 3 — image, name, price, "View" button]

     [Show More] [Talk to a Stylist]
```

### B2B — Flux de qualification de lead

```
Bot: Hi there! I'm {{bot_name}} from {{company}}.
     How can I help you today?
     [Learn about pricing] [Book a demo] [Talk to sales] [Support]

User: [Learn about pricing]

Bot: Happy to help! A couple of quick questions so I can point you
     to the right plan. How many team members would use {{product}}?
     [1-10] [11-50] [51-200] [200+]

User: [11-50]

Bot: And what's your primary use case?
     [{{Use case A}}] [{{Use case B}}] [{{Use case C}}]

User: [{{Use case B}}]

Bot: Based on your team size and needs, our {{Plan Name}} at
     ${{price}}/mo would be the best fit. Here's what's included:
     {{key features}}

     [Start Free Trial] [Book a Demo] [Talk to Sales]
```

---

## Bonnes pratiques du chat en direct

| Bonne pratique | Détails |
|--------------|---------|
| Temps de réponse | Première réponse sous 30 secondes ; viser <15 secondes |
| Disponibilité | N'afficher le chat que pendant les heures dotées en personnel ; utiliser un bot en dehors |
| Déclencheurs proactifs | Déclencher une invitation au chat après 30+ secondes sur la page de tarification, la page panier, ou les pages à forte intention |
| Réponses préenregistrées | Pré-rédiger des réponses pour les 20 principales FAQ ; personnaliser avant l'envoi |
| Routage | Router par page (tarification → ventes, support → SAV, produit → spécialiste) |
| Contexte | Transmettre l'URL de la page, l'historique du client, et le contenu du panier à l'agent |
| Multitâche | Les agents gèrent au maximum 3 chats simultanés pour la qualité |
| Transfert | Transfert fluide du bot vers l'humain avec l'historique complet de la conversation |
| Après le chat | Envoyer la transcription par email ; déclencher une enquête CSAT |
| Optimisation mobile | Le widget de chat doit fonctionner sur mobile sans obscurcir le contenu |

---

## Marketing Facebook Messenger

### Points d'entrée Messenger

| Point d'entrée | Mise en place | Idéal pour |
|-------------|-------|----------|
| Bouton « Envoyer un message » sur la Page | Automatique | Demandes générales |
| Publicités click-to-Messenger | Facebook Ads Manager | Génération de leads, promotions |
| Liens m.me | m.me/VotrePage | Email, site web, codes QR |
| URL de référence Messenger | m.me/VotrePage?ref=campagne | Flux spécifiques à une campagne |
| Plugin de chat client | Intégration sur le site web | Transfert site web → Messenger |
| Plugin case à cocher | Sur les formulaires web | Opt-in pendant le paiement/l'inscription |

### Points essentiels de la politique Messenger
- **Règle des 24 heures :** messages au format libre uniquement dans les 24 heures suivant le dernier message de l'utilisateur
- **Au-delà de 24 heures :** doit utiliser des tags de message approuvés (événement confirmé, mise à jour post-achat, mise à jour de compte) ou des messages sponsorisés (payants)
- **Aucun contenu promotionnel** dans les tags de message — cela entraînera une restriction de votre Page
- **La messagerie par abonnement** nécessite une approbation, réservée aux bots d'actualité

---

## Aperçu du RCS (Rich Communication Services)

| Attribut | SMS | RCS |
|-----------|-----|-----|
| Support des médias | MMS (limité) | Images haute résolution, vidéo, audio, fichiers |
| Identité de marque | Pas d'identité d'expéditeur | Nom d'expéditeur vérifié, logo, couleur |
| Interactivité | Aucune | Boutons, carrousels, réponses rapides |
| Accusés de lecture | Non | Oui |
| Indicateurs de frappe | Non | Oui |
| Repli | N/A | Repli sur SMS si RCS indisponible |
| Disponibilité | Universelle | Android (par défaut dans Google Messages) ; adopté par Apple dans iOS 18 |
| Coût | Au message | Au message (similaire au SMS) |

### Checklist marketing RCS
- [ ] S'enregistrer comme expéditeur RCS vérifié via Google ou un agrégateur
- [ ] Concevoir un profil d'expéditeur de marque (logo, couleurs, description)
- [ ] Créer des modèles de messages riches en médias (carrousels, boutons)
- [ ] Mettre en place un repli SMS pour les appareils non-RCS
- [ ] Tester sur plusieurs appareils Android et opérateurs
- [ ] Suivre les métriques spécifiques au RCS (taux de lecture, clics sur bouton)

---

## Cadre de mesure

| Métrique | Définition | Benchmark |
|--------|-----------|-----------|
| **Taux de réponse** | % de messages recevant une réponse | SMS : 45 %+, Chat : 70 %+ |
| **Temps de première réponse** | Délai jusqu'à la première réponse agent/bot | <30 secondes (chat en direct), instantané (bot) |
| **Taux de résolution** | % de conversations résolues sans escalade | Bot : 60-80 %, Chat en direct : 85 %+ |
| **CSAT (satisfaction client)** | Score d'enquête post-conversation | 4,2+ / 5,0 |
| **Taux de conversion** | % de conversations aboutissant à un achat/lead | 5-15 % (varie selon le canal) |
| **Chiffre d'affaires par conversation** | Chiffre d'affaires total / total des conversations | Suivre et améliorer dans le temps |
| **Taux de désabonnement** | % d'abonnés qui se désabonnent | SMS : <2 % par campagne |
| **Coût par conversation** | Coût total du canal / conversations | Inférieur au support téléphonique |
| **Taux de résolution par bot** | % géré par le bot sans intervention humaine | Objectif : 60-70 % |
| **Taux de clic** | % qui cliquent sur les liens/boutons dans les messages | SMS : 15-30 %, RCS : 25-40 % |

---

## Matrice de sélection de canal

| Si votre objectif est... | Meilleur(s) canal/canaux |
|--------------------|----------------|
| Campagnes promotionnelles (marché US) | SMS + RCS |
| Commerce international | WhatsApp Business |
| Support de vente en temps réel | Chat en direct sur le site web |
| Qualification de lead automatisée | Chatbot (Messenger, site web, WhatsApp) |
| Engagement post-achat | SMS + WhatsApp + Email |
| Vente B2B à fort accompagnement | Chat en direct + Drift/Intercom |
| Engagement Gen Z / millennials | DM Instagram + SMS |
| Promotions riches en médias | RCS (Android) + Messenger |

---

> **Le commerce conversationnel effondre le tunnel.** La découverte, la considération, et l'achat se déroulent dans un seul fil. Les marques qui maîtrisent la messagerie surpasseront celles qui forcent encore les clients à traverser des tunnels traditionnels.

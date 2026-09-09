# Référence des opérations marketing

> **Provenance des benchmarks (au 2026-08-2026) :** Les chiffres en dollars de ce document sont des a priori de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget, ou un livrable client, l'actualiser en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et l'enregistrer avec `python scripts/benchmark_book.py --action record ... --source <url>` ; le citer ensuite depuis le livre (`--action quote`). Ne jamais présenter un chiffre non horodaté comme un fait de marché actuel.

Référence complète pour la colonne vertébrale opérationnelle de l'automatisation marketing : hygiène des données, gestion de la stack technologique, délivrabilité, conformité, infrastructure de reporting, et workflows d'équipe.

---

## Hygiène des données

Des données propres sont le fondement de chaque programme d'automatisation. Des données sales produisent des scores erronés, une personnalisation cassée, des déclencheurs mal déclenchés, et un budget gaspillé.

### Déduplication

**Problème** : La même personne existe sous plusieurs enregistrements. Les e-mails vont aux deux. La notation est divisée. Les ventes voient un historique fragmenté.

**Règles de déduplication :**
1. **Correspondre d'abord sur l'adresse e-mail** — L'e-mail est l'identifiant unique le plus fiable pour les contacts marketing.
2. **Correspondance secondaire sur entreprise + nom** — Pour les contacts avec plusieurs adresses e-mail (personnelle + professionnelle).
3. **Stratégie de fusion** : Conserver l'enregistrement avec les données les plus complètes. Combiner l'historique d'activité. Prendre le score de lead le plus élevé. Préserver la date de création la plus ancienne.
4. **Prévention** : Imposer l'unicité de l'e-mail sur tous les formulaires. Utiliser le profilage progressif plutôt que de créer de nouveaux enregistrements pour les visiteurs récurrents.
5. **Cadence** : Exécuter la déduplication mensuellement pour les bases actives, hebdomadairement pendant les périodes de campagne à fort volume.

### Normalisation des données

**Problème** : « États-Unis », « USA », « U.S. », « usa », et « Amérique » sont tous le même pays mais cassent la segmentation.

| Champ | Règle de normalisation |
|---|---|
| Pays | Mapper vers les codes ISO 3166-1 alpha-2 (US, GB, DE, etc.) |
| Région/Province | Mapper vers les abréviations postales (CA, NY, TX) |
| Numéro de téléphone | Format E.164 (+1XXXXXXXXXX) |
| Titre de poste | Mapper vers des catégories standardisées (VP Marketing, Directeur Marketing, Responsable Marketing → « Responsable Marketing ») |
| Nom d'entreprise | Normaliser les variations courantes (Inc., Inc, Incorporated → « Inc. ») |
| Secteur | Mapper vers une liste contrôlée (SIC, NAICS, ou taxonomie personnalisée) |
| URL | Minuscules, retirer la barre oblique finale, normaliser www vs. non-www |

**Mise en œuvre** : Construire la normalisation comme un workflow automatisé qui se déclenche à la création d'enregistrement et à la mise à jour de champ. Ne pas compter sur le nettoyage manuel.

### Validation des données

**Règles à appliquer au point de saisie :**
- Validation du format e-mail (conforme RFC 5322 + vérification de l'enregistrement MX)
- Validation du format de numéro de téléphone (rejeter les évidemment faux : 000-000-0000, 123-456-7890)
- Application des champs obligatoires (l'e-mail est toujours requis ; le nom pour le contenu verrouillé)
- Liste noire de domaines (concurrents, fournisseurs d'e-mail jetables comme mailinator.com, guerrillamail.com)
- Détection de bots (champs pot de miel, vérifications de timing de soumission, reCAPTCHA pour les formulaires à haute valeur)

### Gestion du déclin des données

Les données de contact déclinent d'environ 25 à 30 % par an. Les gens changent d'emploi, sont promus, changent de fournisseur d'e-mail, et changent d'entreprise.

| Signal de déclin | Méthode de détection | Action |
|---|---|---|
| Rebond dur d'e-mail | Notification de rebond depuis l'ESP | Marquer comme invalide, supprimer des envois, signaler pour ré-enrichissement |
| Changement de titre de poste | Rafraîchissement d'outil d'enrichissement (trimestriel) | Renoter l'adéquation explicite, mettre à jour la segmentation |
| Changement d'entreprise | Rafraîchissement d'outil d'enrichissement (trimestriel) | Renoter tous les critères explicites |
| Rebond doux d'e-mail (3+ consécutifs) | Suivi des rebonds | Investiguer, tenter une re-vérification, supprimer si non résolvable |
| Aucun engagement depuis 180 jours | Suivi d'engagement | Exécuter le workflow de ré-engagement, supprimer si aucune réponse |
| Téléphone déconnecté | Données de disposition d'appel des ventes | Retirer le téléphone, mettre à jour l'enregistrement de contact |

### Enrichissement des données

**Objectif** : Remplir les champs manquants sans demander au prospect, en utilisant des fournisseurs de données tiers.

| Fournisseur | Idéal pour | Données disponibles |
|---|---|---|
| Clearbit | SaaS B2B, enrichissement en temps réel | Taille d'entreprise, chiffre d'affaires, secteur, stack technologique, profils sociaux |
| ZoomInfo | Entreprise B2B, téléphones directs | Infos de contact, organigrammes, données d'intention, détails d'entreprise |
| Apollo | Startup/marché intermédiaire B2B | Vérification e-mail, données d'entreprise, données d'engagement |
| FullContact | Résolution d'identité B2C | Profils sociaux, démographie, données de foyer |
| Datanyze | Technographie | Détection de stack technologique pour les comptes cibles |

**Déclencheurs d'enrichissement :**
- À la soumission de formulaire (enrichir immédiatement pour améliorer le lead scoring)
- À la création d'enregistrement CRM (enrichir les nouveaux contacts issus de leads commerciaux)
- Rafraîchissement par lot trimestriel (ré-enrichir la base existante pour capter les changements d'emploi et d'entreprise)

---

## Gestion de la stack technologique

### Critères de sélection MAP

Lors de l'évaluation d'une plateforme d'automatisation marketing, noter chaque critère sur une échelle de 1 à 5.

| Critère | Poids | Questions à poser |
|---|---|---|
| **Facilité d'utilisation** | Élevé | Un marketeur non technique peut-il construire des workflows sans support d'ingénierie ? |
| **Qualité du constructeur d'e-mails** | Élevé | Éditeur glisser-déposer ? Modèles adaptatifs mobile ? Accès HTML ? |
| **Profondeur de workflow/automatisation** | Élevé | Logique de branchement, déclencheurs multiples, basé sur le temps + comportemental, cross-canal ? |
| **Lead scoring** | Moyen-élevé | Modèles de notation personnalisés ? Déclin ? Plusieurs dimensions de notation ? |
| **Intégration CRM** | Élevé | Intégration native avec votre CRM ? Synchronisation bidirectionnelle ? Temps réel ? |
| **Reporting et analytique** | Moyen-élevé | Attribution ? Reporting de chiffre d'affaires ? Tableaux de bord personnalisés ? |
| **Délivrabilité** | Élevé | IP partagée vs. dédiée ? Support d'authentification ? Outils de délivrabilité ? |
| **Évolutivité** | Moyen | Limites de contacts/envois ? Performance à 100K+ contacts ? Limites de taux d'API ? |
| **API et intégrations** | Moyen | API REST ? Support de webhook ? Catalogue d'intégrations préconstruites ? |
| **Outils de conformité** | Moyen | Outils RGPD ? Gestion du consentement ? Automatisation de suppression ? |
| **Prix** | Moyen | Tarification par contact ? Fonctionnalités verrouillées par palier ? Coûts cachés (dépassements, add-ons) ? |
| **Qualité du support** | Moyen | SLA de délai de réponse ? Assistance à l'onboarding ? Qualité de la documentation ? |

### Schémas d'intégration

**Synchronisation CRM (intégration la plus critique)**
- Synchronisation bidirectionnelle entre MAP et CRM (données de contact, scores de lead, activité, étape de cycle de vie)
- Fréquence de synchronisation : temps réel pour le lead scoring et les changements d'étape de cycle de vie. Par lots (toutes les 15-60 min) acceptable pour les données d'enrichissement.
- Résolution des conflits : définir quel système est la « source de vérité » par champ. Typiquement : le MAP possède les données d'engagement, le CRM possède les données de deal.
- Mapping de champs : documenter chaque champ mappé, les règles de transformation, et la direction de synchronisation.

**Architecture d'intégration courante :**
```
Site web → MAP (soumissions de formulaire, suivi)
MAP ↔ CRM (synchronisation bidirectionnelle contact/lead)
MAP → Plateformes publicitaires (synchronisation d'audience pour le retargeting)
CRM → MAP (mises à jour d'étape de deal, activité commerciale)
MAP → Analytics (performance de campagne, attribution)
CDP → MAP (profils clients unifiés, segmentation)
Outil de webinaire → MAP (inscription, données d'assistance)
Outil de chat → MAP (données de conversation, création de lead)
Facturation → MAP (événements d'abonnement, données de chiffre d'affaires)
```

### Cartographie des flux de données

Documenter chaque flux de données entre systèmes. Pour chaque flux :
1. **Système source** — D'où provient la donnée
2. **Système de destination** — Où va la donnée
3. **Déclencheur** — Ce qui initie la synchronisation (événement temps réel, lot planifié, manuel)
4. **Champs de données** — Exactement quels champs sont transférés
5. **Transformation** — Tout mapping de champ, normalisation, ou calcul appliqué durant la synchronisation
6. **Gestion des erreurs** — Ce qui se passe quand une synchronisation échoue (nouvelle tentative, alerte, file d'attente)
7. **Responsable** — Qui est responsable de la surveillance de cette intégration

---

## Gestion de la délivrabilité

La délivrabilité est le fondement peu glamour qui détermine si votre automatisation atteint réellement les boîtes de réception.

### Authentification d'expéditeur

| Protocole | Objectif | Mise en œuvre |
|---|---|---|
| **SPF** (Sender Policy Framework) | Déclare quels serveurs peuvent envoyer des e-mails au nom de votre domaine | Enregistrement DNS TXT listant les IP/services d'envoi autorisés |
| **DKIM** (DomainKeys Identified Mail) | Signature cryptographique prouvant que l'e-mail n'a pas été altéré en transit | Enregistrement DNS TXT avec clé publique ; le MAP signe les e-mails sortants avec la clé privée |
| **DMARC** (Domain-based Message Authentication) | Politique indiquant aux destinataires quoi faire quand SPF/DKIM échouent | Enregistrement DNS TXT spécifiant la politique (none, quarantine, reject) et l'adresse de reporting |

**Séquence de mise en œuvre :**
1. Configurer SPF pour toutes les sources d'envoi (MAP, e-mail transactionnel, CRM)
2. Configurer la signature DKIM dans votre MAP
3. Déployer DMARC avec `p=none` d'abord (surveillance uniquement)
4. Surveiller les rapports DMARC pendant 2 à 4 semaines pour identifier tout expéditeur non autorisé
5. Escalader vers `p=quarantine` puis `p=reject` une fois tous les expéditeurs légitimes authentifiés

### Warm-up d'IP et de domaine

**Quand le warm-up est requis :**
- Nouvelle IP d'envoi dédiée
- Nouveau domaine ou sous-domaine d'envoi
- Réactivation d'une IP/domaine dormant depuis 30+ jours
- Migration vers un nouvel ESP/MAP

**Calendrier de warm-up (IP dédiée) :**

| Semaine | Volume d'envoi quotidien | Notes |
|---|---|---|
| 1 | 500-1 000 | Envoyer uniquement à vos contacts les plus engagés (ouverture dans les 30 derniers jours) |
| 2 | 2 000-5 000 | Élargir aux contacts engagés dans les 60 derniers jours |
| 3 | 5 000-15 000 | Élargir aux contacts engagés dans les 90 derniers jours |
| 4 | 15 000-30 000 | Continuer à élargir l'audience |
| 5 | 30 000-50 000 | Approche du volume complet |
| 6+ | Volume complet | Surveiller étroitement pendant les 2-3 premiers mois |

**Règles pendant le warm-up :**
- Ne jamais faire de pic de volume de plus de 2x d'un jour à l'autre
- Surveiller les taux de rebond quotidiennement (le rebond dur devrait rester <2 %)
- Surveiller les taux de plaintes spam (doit rester <0,1 %)
- Si des problèmes de délivrabilité apparaissent, réduire le volume et diagnostiquer avant de continuer

### Hygiène de liste

| Action | Fréquence | Critères |
|---|---|---|
| Retirer les rebonds durs | Temps réel (automatisé) | Chaque rebond dur est immédiatement supprimé |
| Supprimer les rebonds doux | Après 3 consécutifs | Trois rebonds doux consécutifs = traiter comme un rebond dur |
| Re-vérifier les adresses obsolètes | Trimestriel | Exécuter la vérification e-mail sur les contacts sans engagement depuis 90+ jours |
| Retirer les adresses basées sur un rôle | Mensuel | Supprimer info@, admin@, support@, sales@ — ces adresses convertissent rarement |
| Supprimer les plaignants spam | Temps réel (automatisé) | Chaque plainte spam déclenche une suppression immédiate |
| Sunset des contacts inactifs | Continu via le workflow de ré-engagement | Aucun engagement depuis 90-180 jours → ré-engagement → supprimer si aucune réponse |

### Surveillance de la délivrabilité

| Métrique | Sain | Avertissement | Critique |
|---|---|---|---|
| **Taux de placement en boîte de réception** | >95 % | 85-95 % | <85 % |
| **Taux de rebond dur** | <0,5 % | 0,5-2 % | >2 % |
| **Taux de plainte spam** | <0,05 % | 0,05-0,1 % | >0,1 % |
| **Taux de désabonnement** | <0,3 % | 0,3-0,5 % | >0,5 % |
| **Statut liste noire** | Non listé | Listé sur des listes mineures | Listé sur Spamhaus, Barracuda, ou SORBS |

---

## Automatisation de la conformité

### Gestion du consentement

**Workflow de double opt-in :**
1. L'utilisateur soumet le formulaire → enregistrement créé avec `consent_status: pending`
2. E-mail de confirmation envoyé immédiatement → « Cliquez pour confirmer votre inscription »
3. L'utilisateur clique → `consent_status: confirmed`, `consent_date: horodatage`, `consent_source: nom_du_formulaire`
4. L'utilisateur NE clique PAS dans les 48 heures → rappel envoyé
5. L'utilisateur NE clique PAS dans les 7 jours → enregistrement marqué `consent_status: expired`, exclu des envois marketing

**Exigences d'enregistrement de consentement (RGPD) :**
- À quoi ils ont consenti (finalité spécifique)
- Quand ils ont consenti (horodatage)
- Comment ils ont consenti (URL du formulaire, texte de la case à cocher)
- Preuve de consentement (journal de soumission de formulaire, adresse IP)

### Centres de préférences

**Fonctionnalités minimales d'un centre de préférences :**
- Options de fréquence d'e-mail (hebdomadaire, bimensuelle, mensuelle)
- Préférences de sujet/catégorie (mises à jour produit, contenu éducatif, promotions, événements)
- Préférences de canal (e-mail, SMS, push)
- Désabonnement global (toujours disponible, en un clic)
- Mise à jour de l'adresse e-mail

**Fonctionnalités avancées :**
- Mettre les e-mails en pause pour une période définie (« pause de 30 jours »)
- Préférences de format de contenu (texte vs. HTML riche)
- Préférence de langue
- Heure d'envoi préférée

### Listes de suppression

| Liste | Objectif | Gestion |
|---|---|---|
| **Désabonnement global** | Contacts ayant refusé tout marketing | Automatisé — ne jamais retirer manuellement |
| **Rebond dur** | Adresses e-mail invalides | Automatisé — ne jamais tenter de renvoyer |
| **Plaignant spam** | Contacts ayant signalé du spam | Automatisé — suppression légalement requise |
| **Domaines concurrents** | Adresses e-mail de concurrents | Manuel — mettre à jour trimestriellement |
| **À ne pas contacter** | Exclusions juridiques/conformité | Manuel — géré par l'équipe juridique |
| **Récemment contacté** | Application du plafond de fréquence | Automatisé — fenêtre glissante (par exemple, suppression de 48 heures après envoi) |

### Automatisation RGPD/CCPA

| Exigence | Automatisation |
|---|---|
| Droit d'accès (RGPD Art. 15) | Export automatisé des données depuis le MAP + CRM sur demande |
| Droit à l'effacement (RGPD Art. 17) | Workflow de suppression automatisé sur tous les systèmes lorsque demandé |
| Droit à la portabilité (RGPD Art. 20) | Export automatisé des données dans un format lisible par machine |
| Opt-out de la vente (CCPA) | Suppression automatisée + propagation vers les systèmes en aval |
| Retrait du consentement | Le désabonnement en un clic déclenche la mise à jour de l'enregistrement de consentement + suppression sur tous les canaux |
| Limites de rétention des données | Purge automatisée des données au-delà de la période de rétention (à définir par type de donnée) |

---

## Infrastructure de reporting

### Gouvernance UTM

**Paramètres UTM standards :**

| Paramètre | Convention | Exemple |
|---|---|---|
| `utm_source` | Nom de plateforme ou de canal (minuscules, sans espaces) | `google`, `facebook`, `linkedin`, `email`, `direct-mail` |
| `utm_medium` | Support marketing (minuscules) | `cpc`, `social`, `email`, `display`, `referral` |
| `utm_campaign` | Nom de campagne (minuscules, tirets, inclure la date) | `2026-q1-saas-nurture`, `2026-02-product-launch` |
| `utm_content` | Variante créative ou de contenu spécifique | `hero-cta-v2`, `sidebar-banner`, `email-3-casestudy` |
| `utm_term` | Mot-clé (recherche payante uniquement) | `marketing-automation-software` |

**Règles de gouvernance :**
- Tableur ou outil de construction UTM centralisé — pas de saisie libre
- Document de convention de nommage partagé avec tous les membres de l'équipe
- Validation automatisée à la soumission de formulaire et au suivi de lien
- Audit UTM mensuel pour repérer les incohérences

### Configuration de l'attribution

| Modèle | Idéal pour | Fonctionnement |
|---|---|---|
| **Premier contact** | Comprendre l'efficacité des canaux haut de tunnel | 100 % du crédit à la première interaction |
| **Dernier contact** | Comprendre ce qui pilote directement la conversion | 100 % du crédit à la dernière interaction avant conversion |
| **Linéaire** | Crédit égal sur tous les points de contact | Distribution égale sur tous les contacts |
| **Dégressif dans le temps** | Longs cycles B2B où la récence compte | Plus de crédit aux points de contact récents, moins aux premiers |
| **Basé sur la position (en U)** | Emphase équilibrée premier + dernier contact | 40 % premier, 40 % dernier, 20 % distribué au milieu |
| **Basé sur les données** | Entreprises à fort volume avec données suffisantes | Algorithmique, basé sur les schémas de conversion réels |

**Pour l'attribution spécifique à l'automatisation** : Suivre dans quelle séquence ou workflow automatisé un contact se trouvait au moment de la conversion. Attribuer le pipeline et le chiffre d'affaires à la séquence, pas seulement à l'e-mail individuel.

### Architecture de tableau de bord

**Tableau de bord exécutif (revue hebdomadaire/mensuelle) :**
- Pipeline et chiffre d'affaires générés par le marketing
- Volume et vélocité MQL et SQL
- Tendances CAC et LTV
- Canaux les plus performants par contribution au chiffre d'affaires
- Résumé de santé du programme d'automatisation (workflows actifs, taux de conversion)

**Tableau de bord des opérations marketing (quotidien/hebdomadaire) :**
- Métriques de délivrabilité e-mail (rebond, plainte, placement en boîte de réception)
- Santé des workflows d'automatisation (taux d'inscription, taux d'erreur, taux de complétion)
- Score de qualité des données (exhaustivité des champs, taux de doublons, taux de rebond)
- Statut d'intégration (taux de succès/échec de synchronisation)
- Distribution du lead scoring et taux de flux MQL

**Tableau de bord au niveau campagne (par campagne) :**
- Performance au niveau de la séquence (ouverture, clic, conversion par e-mail)
- Flux de leads à travers les étapes (visualisation de tunnel)
- Résultats de tests A/B
- Chiffre d'affaires attribué à la campagne

---

## Workflows d'équipe

### Transfert marketing-vers-ventes

**Workflow de transfert automatisé :**
1. Le contact atteint le seuil MQL → le workflow se déclenche
2. Assignation à un commercial (round-robin, territoire, ou routage basé sur le compte)
3. Créer une tâche CRM avec une échéance SLA (4 heures pour le SaaS B2B, 24 heures pour l'entreprise)
4. Envoyer une notification au commercial assigné avec un résumé du lead (décomposition du score, historique d'activité, contenu consommé)
5. Si non contacté dans le délai SLA → notification d'escalade au responsable commercial
6. Le commercial dispose du lead : Accepté (→ SQL), Recyclé (→ retour au nurturing avec raison), Disqualifié (→ retiré avec raison)
7. Les données de disposition réalimentent le marketing pour la calibration du modèle de notation

### Processus de briefing de campagne

**Modèle de demande de campagne :**
1. Objectif de campagne et KPI
2. Audience cible (segment, persona, étape de cycle de vie)
3. Canaux et types de séquence nécessaires
4. Exigences de contenu (actifs existants disponibles, nouveau contenu nécessaire)
5. Calendrier et date de lancement
6. Allocation budgétaire
7. Exigences de revue conformité/juridique
8. Critères de succès et cadence de reporting

### Workflow d'approbation de contenu

```
Brouillon créé → Auto-revue de l'auteur
  → Revue par les pairs (équipe marketing)
  → Revue de marque/voix (gardien de marque)
  → Revue de conformité (si secteur réglementé)
  → Approbation des parties prenantes (le cas échéant)
  → Contrôle QA (liens, jetons de personnalisation, rendu)
  → Planifier/publier
```

**Checklist QA avant lancement d'automatisation :**
- [ ] Tous les jetons de personnalisation s'affichent correctement (tester aussi avec des données manquantes)
- [ ] Tous les liens sont corrects et traçables (UTM appliqués)
- [ ] Lien de désabonnement présent et fonctionnel
- [ ] Adresse postale physique incluse (CAN-SPAM)
- [ ] L'e-mail s'affiche correctement dans les 5 principaux clients e-mail (Gmail, Outlook, Apple Mail, Yahoo, mobile)
- [ ] L'objet et le texte d'aperçu s'affichent correctement (pas de troncature)
- [ ] Le nom d'expéditeur et l'adresse de réponse sont corrects
- [ ] Le déclencheur ne se déclenche que pour les contacts visés (tester avec critères d'inclusion et d'exclusion)
- [ ] Les conditions de sortie fonctionnent (tester avec un contact qui convertit)
- [ ] Les règles de suppression empêchent les conflits avec d'autres workflows actifs
- [ ] Les étapes d'attente utilisent les bonnes durées et la bonne gestion de fuseau horaire

---

## Matrice de comparaison de plateformes

| Capacité | HubSpot | ActiveCampaign | Klaviyo | Mailchimp | Marketo | Pardot |
|---|---|---|---|---|---|---|
| **Idéal pour** | B2B PME à marché intermédiaire | PME, agences | E-commerce (focus Shopify) | Petite entreprise, débutants | Entreprise B2B | B2B (utilisateurs Salesforce) |
| **Modèle tarifaire** | Palier par contact | Palier par contact | Palier par profil | Palier par contact + fonctionnalité | Par contact (personnalisé) | Par contact (personnalisé) |
| **Prix de départ** | ~800 $/mois (Pro) | ~49 $/mois | ~20 $/mois | ~13 $/mois | ~1 000 $+/mois | ~1 250 $/mois |
| **CRM inclus** | Oui (HubSpot CRM, gratuit) | CRM basique inclus | Non (s'intègre avec d'autres) | Non | Non (s'intègre avec des CRM) | Non (Salesforce requis) |
| **Constructeur d'e-mail** | Excellent (glisser-déposer) | Bon | Excellent (modèles e-commerce) | Bon (basique) | Bon | Adéquat |
| **Complexité de workflow** | Élevée (constructeur visuel) | Élevée (constructeur visuel) | Moyenne-élevée (constructeur de flux) | Faible-moyenne | Très élevée | Moyenne-élevée |
| **Lead scoring** | Oui (propriétés personnalisées) | Oui (notation de contact) | Analytique prédictive | Basique (basé sur des tags) | Avancé (multi-modèle) | Oui (intégré Salesforce) |
| **SMS** | Oui (add-on) | Oui (intégré) | Oui (intégré) | Oui (add-on) | Via intégration | Via intégration |
| **Intégration e-commerce** | Bonne (Shopify, WooCommerce) | Bonne | Excellente (Shopify natif) | Basique | Via intégration | Via intégration |
| **Intégration Salesforce** | Bonne (bidirectionnelle) | Bonne | Basique | Basique | Bonne | Native (même entreprise) |
| **Reporting** | Solide (attribution intégrée) | Bon | Solide (attribution de chiffre d'affaires) | Basique | Avancé (rapports personnalisés) | Bon (rapports Salesforce) |
| **Qualité de l'API** | Excellente | Bonne | Excellente | Adéquate | Excellente | Bonne |
| **Courbe d'apprentissage** | Moyenne | Faible-moyenne | Faible (e-commerce) | Faible | Élevée | Moyenne-élevée |
| **Évolutivité** | Bonne jusqu'à 100K+ | Bonne jusqu'à 50K+ | Excellente pour l'e-commerce | Limitée à l'échelle | Niveau entreprise | Niveau entreprise |

### Résumé des forces et faiblesses

**HubSpot** : Plateforme tout-en-un avec une excellente UX. Faiblesse : devient coûteux à l'échelle ; certaines fonctionnalités avancées nécessitent le palier Enterprise.

**ActiveCampaign** : Meilleur rapport qualité-prix pour la profondeur d'automatisation au tarif PME. Faiblesse : le CRM est basique ; le reporting est adéquat mais pas le meilleur de sa catégorie.

**Klaviyo** : Dominant pour l'e-commerce avec une intégration Shopify approfondie et de l'analytique prédictive. Faiblesse : pas conçu pour le B2B ; capacités CRM limitées.

**Mailchimp** : Le plus facile pour démarrer, la barrière d'entrée la plus basse. Faiblesse : l'automatisation est superficielle ; rapidement dépassée par les marketeurs sérieux.

**Marketo** : L'automatisation la plus puissante pour l'entreprise B2B. Faiblesse : courbe d'apprentissage raide ; coûteux ; nécessite un administrateur dédié.

**Pardot (Marketing Cloud Account Engagement)** : Meilleur choix si déjà engagé dans l'écosystème Salesforce. Faiblesse : l'interface est datée ; le rythme d'innovation est lent ; le prix est élevé pour ce qu'on obtient.

### Cadre d'évaluation des fournisseurs

**Indispensables (éliminatoires si absents) :**
- Intégration native avec votre CRM
- Constructeur de workflow visuel avec logique de branchement
- Lead scoring (critères personnalisés, pas seulement des points d'engagement)
- Constructeur d'e-mail avec modèles adaptatifs mobile
- Outils de conformité RGPD/CCPA (gestion du consentement, suppression de données)
- Accès API pour intégrations personnalisées
- Outils de délivrabilité (support d'authentification, option d'IP dédiée)

**Bonus (différencient les finalistes) :**
- Canaux SMS et notification push intégrés
- Analytique prédictive et recommandations IA
- Reporting d'attribution de chiffre d'affaires
- Tests A/B au sein des workflows (pas seulement les objets d'e-mail)
- Blocs de contenu dynamique basés sur les propriétés de contact
- Fonctionnalités de marketing basé sur les comptes
- Capacités de plateforme de données client (CDP)

**Éliminatoires (à exclure immédiatement) :**
- Aucun support API ou webhook
- Tarification basée sur la liste de contacts sans moyen de gérer les coûts à l'échelle
- Aucun outil de conformité RGPD (aucun suivi de consentement, aucun workflow de suppression)
- IP partagée uniquement sans option d'IP dédiée
- Aucun branchement de workflow (séquences linéaires uniquement)
- Verrouillage fournisseur (aucune capacité d'export de données)

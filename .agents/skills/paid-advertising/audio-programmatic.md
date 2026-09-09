# Publicité audio programmatique — Streaming, podcasts et audio numérique

> **Provenance des benchmarks (au 2026-08) :** Les montants en dollars de ce document sont des hypothèses de planification, pas des cotations — les taux de marché et d'enchères évoluent en continu. Avant qu'un chiffre n'entre dans un plan média, un budget ou un livrable client, actualisez-le en direct (les tableaux de bord de plateforme et les rapports publiés actuels valent mieux que la mémoire) et enregistrez-le avec `python scripts/benchmark_book.py --action record ... --source <url>` ; citez-le ensuite depuis le carnet (`--action quote`). Ne présentez jamais un chiffre non horodaté comme un fait de marché actuel.

## Écosystème de la publicité audio

### Paysage des plateformes

| Plateforme | Utilisateurs / Portée | Modèle publicitaire | Avantage unique | Self-Serve |
|---|---|---|---|---|
| **Spotify Ad Studio** | 600 M+ utilisateurs, 220 M+ avec publicité | Self-serve + géré | Ciblage par humeur/activité, contexte de playlist, display compagnon | Oui (250 $ min.) |
| **Pandora / SiriusXM Media** | 50 M+ auditeurs avec publicité | Géré + programmatique | Plus grand réseau publicitaire audio aux US, ciblage Music Genome | Limité (portail SXM Media) |
| **iHeartRadio** | 150 M+ utilisateurs mensuels | Géré + programmatique | Combinaison radio diffusée + streaming, forte capacité de ciblage local | Géré uniquement |
| **Amazon Music / Alexa** | 100 M+ utilisateurs | Amazon DSP | Intégration à l'intention d'achat, CTA vocal Alexa | Via Amazon DSP |
| **YouTube Music** | 80 M+ abonnés musique + palier publicitaire | Google Ads / DV360 | Données d'audience Google, cross-plateforme avec la vidéo YouTube | Oui (via Google Ads) |
| **Deezer** | 16 M+ utilisateurs (fort en UE/LATAM) | Programmatique + direct | Portée européenne, parrainage de playlist éditoriale | Géré uniquement |

### Réseaux publicitaires podcast

| Réseau | Échelle | Modèle | Force |
|---|---|---|---|
| **Spotify Audience Network** | 250 M+ auditeurs de podcast | Programmatique + direct | Ciblage d'audience cross-émission, données propriétaires Spotify |
| **Megaphone** (propriété de Spotify) | 60 K+ émissions, plus grand serveur publicitaire podcast | Insertion publicitaire dynamique (DAI) | Marketplace programmatique, hébergement de podcast entreprise |
| **iHeart Podcast Network** | 400 M+ téléchargements mensuels | Lu par l'animateur + DAI | Catalogue d'émissions massif, animateurs célébrités/influenceurs |
| **Acast** | 100 K+ émissions, mondial | Marketplace + programmatique | Portée mondiale, ciblage conversationnel, self-serve |
| **SiriusXM Podcast Network** | Stack SXM Media + AdsWizz | Programmatique + lu par l'animateur | Inventaire premium, mesure avancée |
| **Podscribe** | Plateforme d'attribution | Mesure + marketplace | Attribution par pixel, mesure cross-émission |
| **Podcorn** | Podcasts micro-influenceurs | Marketplace (lu par l'animateur) | Relations directes avec des émissions de niche |

### Comparaison des modèles d'achat

```
Arbre de décision : Comment acheter des publicités audio

├── Budget < 1 000 $/mois → Spotify Ad Studio (self-serve)
├── Budget 1 000 $–10 000 $/mois → Spotify Ad Studio + marketplace Acast
├── Budget 10 000 $–50 000 $/mois → Géré via SXM Media ou iHeart + programmatique
├── Budget 50 000 $+/mois → Programmatique complet (DSP) + parrainages de podcast en direct
└── Stratégie podcast uniquement → Megaphone/SAN (programmatique) + Podcorn (lu par l'animateur)
```

---

## Formats publicitaires

### Formats audio streaming

| Format | Durée | Expérience | Fourchette de CPM | Idéal pour |
|---|---|---|---|---|
| **Spot audio** | 15s, 30s, 60s | Son uniquement pendant les pauses musicales | 5–15 $ | Format central — notoriété, considération |
| **Display compagnon** | Affiché pendant le spot audio | Bannière visuelle accompagnant la lecture audio | +2–5 $ incrémental | Générer des clics, montrer le produit, renforcer la marque |
| **Prise de contrôle vidéo** | 15–30s | Vidéo plein écran pendant une pause de streaming (mobile) | 15–30 $ | Démos produit, branding visuel, installations d'app |
| **Playlist sponsorisée** | Continu | Logo de marque + message sur playlist éditorialisée | 10 000–50 000 $ forfait | Association lifestyle, notoriété soutenue |
| **Session sponsorisée** | 30 minutes | L'utilisateur obtient une session sans pub en échange de regarder une vidéo publicitaire | 20–40 $ | Impressions à haute valeur, association de marque positive |
| **Prise de contrôle de la page d'accueil** | 24 heures | Placement en vedette sur l'écran d'accueil de l'app | 50 000 $+ forfait | Lancements phares, portée maximale |

### Formats publicitaires podcast

| Format | Diffusion | Facteur de confiance | Fourchette de CPM | Idéal pour |
|---|---|---|---|---|
| **Lu par l'animateur** | Enregistré par l'animateur du podcast | Le plus élevé (engagement 2 à 3x supérieur vs pré-produit) | 25–50 $ | Confiance de marque, réponse directe, audiences de niche |
| **Pré-produit (DAI)** | Inséré dynamiquement, enregistré par la marque | Modéré | 15–30 $ | Échelle, cohérence, tests A/B |
| **Intégré en dur** | Permanent dans l'enregistrement de l'épisode | Élevé (donne une impression organique) | 30–60 $ (forfait par épisode) | Campagnes evergreen, exposition longue traîne |
| **Pré-roll** | Avant le contenu de l'épisode (15–30s) | Plus faible (facile à passer) | 15–25 $ | Messages de notoriété courts, budgets plus faibles |
| **Mid-roll** | Pendant le contenu de l'épisode (30–60s) | La plus forte attention | 25–50 $ | Placement principal — meilleur rappel |
| **Post-roll** | Après le contenu de l'épisode (15–30s) | La plus faible (l'audience décroche) | 10–18 $ | CPM le plus bas, messages orientés CTA |

### Matrice de sélection de format

| Objectif | Format streaming | Format podcast | Justification |
|---|---|---|---|
| Notoriété de marque | Spot audio (30s) + compagnon | Mid-roll lu par l'animateur | Renforcement son + visuel ; confiance de l'animateur |
| Réponse directe / CTA | Spot audio (15s) + compagnon | Mid-roll lu par l'animateur avec code promo | Accroche courte + compagnon cliquable ; code traçable |
| Lancement produit | Session sponsorisée + prise de contrôle vidéo | Parrainage de série de marque | Attention premium ; storytelling approfondi |
| Local / TPE | Spot audio (15s) sur Spotify | Podcasts locaux de niche via Podcorn | Ciblage géo ; alignement d'audience locale |
| eCommerce | Spot audio (30s) + compagnon | Lu par l'animateur avec URL personnalisée | L'audio génère la notoriété, le compagnon génère le clic |

---

## Capacités de ciblage

### Ciblage audio streaming

| Type de ciblage | Spotify | Pandora | Amazon Music | Description |
|---|---|---|---|---|
| **Démographie** | Âge, genre, localisation | Âge, genre, localisation, revenu | Âge, genre, localisation | Ciblage démographique standard |
| **Genre / Playlist** | 1 000+ segments de genre | Catégories Music Genome | Basé sur le genre | Cibler par goût d'écoute |
| **Humeur / Activité** | Sport, concentration, fête, détente, trajet | Stations d'humeur | Limité | Ciblage contextuel |
| **Contexte en temps réel** | Plateforme (mobile/bureau/enceinte connectée), heure de la journée | Plateforme, appareil | Appareil, contexte Alexa | Atteindre les utilisateurs à des moments précis |
| **Comportement d'écoute** | Auditeurs de podcast, abonnés à des playlists, gros streamers | Fidélité à la station, taux de skip | Superposition de comportement d'achat | Segments comportementaux |
| **Données propriétaires (first-party)** | Correspondance de liste CRM (email) | Correspondance CRM | Correspondance client Amazon | Recibler les clients existants |
| **Lookalike** | Extension depuis un seed CRM | Extension depuis des segments | Amazon Lookalike | Trouver des auditeurs similaires |
| **Retargeting** | Retargeting par exposition publicitaire | Retargeting cross-plateforme | Pixel de retargeting Amazon | Messages séquentiels |

### Ciblage podcast

| Méthode | Fonctionnement | Précision | Échelle |
|---|---|---|---|
| **Au niveau de l'émission** | Sélectionner des titres de podcast spécifiques | La plus élevée (vous choisissez l'émission) | La plus faible |
| **Catégorie / Genre** | Cibler des catégories de podcast (business, comédie, true crime) | Moyenne | Élevée |
| **Segment d'audience** | Ciblage d'audience cross-émission basé sur le comportement d'écoute | Moyenne-élevée | Élevée |
| **Contextuel** | Cibler par sujet de l'épisode / analyse de transcription | Moyenne | Moyenne |
| **Démographique** | Âge, genre, localisation des auditeurs (sondage + inféré) | Moyenne | Élevée |
| **Séquentiel** | L'auditeur entend la publicité A → plafond de fréquence → la publicité B suit | Élevée | Moyenne |

### Stratégie de messages séquentiels

```
Exemple de séquence (campagne audio en 3 touches) :

Touche 1 (Semaine 1) : Spot notoriété de 30s — présenter la marque + l'énoncé du problème
    ↓ (plafond de fréquence : 3x/semaine)
Touche 2 (Semaine 2) : Spot considération de 15s — preuve sociale + différenciateur
    ↓ (plafond de fréquence : 2x/semaine)
Touche 3 (Semaine 3) : Spot conversion de 15s — offre + CTA clair
    ↓
Retargeting sur display/social : Les auditeurs ayant complété la séquence → publicités visuelles
```

---

## Production créative

### Modèles de script

**Spot de 15 secondes (Accroche → Valeur → CTA) :**
```
[0-3s]  Accroche : Question ou affirmation qui capte l'attention
[3-10s] Valeur : Un bénéfice ou différenciateur clair
[10-15s] CTA : Action simple et mémorable (URL, code promo, ou « cherchez [marque] »)
```

**Spot de 30 secondes (Accroche → Problème → Solution → CTA) :**
```
[0-5s]   Accroche : Scénario relatable ou fait surprenant
[5-15s]  Problème : Articuler le point de douleur
[15-25s] Solution : Comment votre produit/service le résout
[25-30s] CTA : Prochaine étape claire avec mécanisme de suivi
```

**Spot de 60 secondes (Arc narratif) :**
```
[0-10s]  Mise en place : Présentation d'un personnage ou d'un scénario
[10-25s] Conflit : Problème ou défi rencontré
[25-45s] Résolution : Comment le produit aide, avec des détails
[45-55s] Preuve sociale : Statistique, témoignage ou marqueur de crédibilité
[55-60s] CTA : Action mémorable, répétable
```

### Spécifications de production audio

| Spécification | Exigence |
|---|---|
| **Format de fichier** | WAV (production) ou MP3 320 kbps (livraison) |
| **Taux d'échantillonnage** | 44,1 kHz |
| **Profondeur de bits** | 16 bits minimum |
| **Volume sonore** | -16 LUFS (intégré), -1 dBTP (crête vraie) |
| **Musique de fond** | -20 dB en dessous de la voix, libre de droits ou sous licence |
| **Voix off** | Articulation claire, ton conversationnel, sans écho de pièce |
| **Durée** | Exacte à la spécification (15,0s, 30,0s ou 60,0s — aucune tolérance) |

### Créatif audio dynamique

L'audio dynamique personnalise la publicité en temps réel selon les données de l'auditeur :

| Variable | Source | Exemple |
|---|---|---|
| **Météo** | Météo actuelle de l'auditeur | « Jour de pluie à Seattle ? Le moment parfait pour... » |
| **Localisation** | Géo-IP / localisation de l'appareil | « Salut Chicago, votre magasin le plus proche est sur Michigan Ave » |
| **Heure de la journée** | Horloge de l'appareil | « Bonjour — commencez votre journée avec... » |
| **Jour de la semaine** | Calendrier | « Bon vendredi — ce week-end, essayez... » |
| **Nom de l'auditeur** | Correspondance de données CRM (Spotify) | « Salut Sarah, on a créé cette playlist pour toi » |

**Production :** Nécessite un enregistrement modulaire — enregistrer le script de base et tous les inserts variables séparément avec un ton, un rythme et une acoustique de pièce correspondants.

---

## Mesure et attribution

### Métriques clés

| Métrique | Définition | Benchmark (streaming) | Benchmark (podcast) |
|---|---|---|---|
| **Taux d'écoute complète (LTR)** | % qui entendent la publicité en entier | 90 %+ (15s), 80 %+ (30s) | 95 %+ (lu par l'animateur), 85 %+ (DAI) |
| **Taux d'achèvement** | % qui écoutent jusqu'à la fin | 85 %+ (15s), 75 %+ (30s) | 90 %+ (mid-roll) |
| **Fréquence** | Nombre moyen de fois qu'un auditeur entend la publicité | 3–5x/semaine optimal | 2–3x par auditeur par émission |
| **Portée** | Auditeurs uniques exposés | Varie selon le budget | Varie selon la taille de l'émission |
| **CPM** | Coût pour 1 000 impressions | 5–15 $ (streaming) | 15–50 $ (podcast) |
| **CPCV** | Coût par écoute/visionnage complet | 0,01–0,03 $ | 0,02–0,06 $ |
| **Brand Lift** | Évolution de la notoriété/considération/intention | 5–15 % de lift (moyenne) | 10–25 % de lift (lu par l'animateur) |

### Méthodes d'attribution podcast

| Méthode | Fonctionnement | Précision | Facilité |
|---|---|---|---|
| **URL personnalisée** | marque.com/nompodcast | Moyenne (certains tapent en direct) | Facile |
| **Code promo** | Code unique par émission/campagne | Élevée (correspondance directe) | Facile |
| **Attribution par pixel** | Spotify Ad Analytics (anciennement Podsights), pixel Podscribe sur le site | Élevée (impression-à-conversion) | Moyenne |
| **Sondage post-écoute** | « Comment avez-vous entendu parler de nous ? » | Faible (biais de rappel) | Facile |
| **Lift de recherche de marque** | Surveiller le volume de recherche de marque pendant la campagne | Moyenne (corrélation) | Moyenne |
| **Graphe de foyer** | Faire correspondre l'appareil d'écoute podcast à l'appareil de conversion | Élevée | Difficile (nécessite un partenaire) |

### Études de Brand Lift

Disponibles via Spotify Brand Lift et Nielsen pour les campagnes avec une dépense suffisante (typiquement 25 000 $+) :
- **Rappel publicitaire :** « Vous souvenez-vous avoir entendu une publicité pour [marque] ? » — Benchmark : 15–30 % de lift
- **Notoriété :** « Avez-vous entendu parler de [marque] ? » — Benchmark : 5–15 % de lift
- **Considération :** « Envisageriez-vous [marque] ? » — Benchmark : 3–10 % de lift
- **Intention d'achat :** « Quelle est la probabilité que vous achetiez chez [marque] ? » — Benchmark : 2–8 % de lift

---

## Intégration cross-canal

### L'audio dans le mix média

| Stratégie | Fonctionnement | Impact attendu |
|---|---|---|
| **Retargeting audio → Display/Social** | Les auditeurs ayant entendu la publicité audio → retargeting avec un créatif visuel | CTR display supérieur de 20 à 40 % pour les audiences amorcées par l'audio |
| **Séquentiel audio + vidéo** | Publicité audio (notoriété) → publicité vidéo (considération) → display (conversion) | Couverture full-funnel à travers les contextes |
| **Audio + recherche** | L'audio génère de la recherche de marque → capturer avec des publicités de recherche de marque | Lift de volume de recherche de marque de 15 à 25 % pendant les flights audio |
| **Podcast + email** | Sponsor de podcast → générer une inscription email → séquence de nurturing | Leads de haute qualité issus de la recommandation d'un animateur de confiance |
| **Streaming + CTV** | Publicités audio pendant la musique → publicités CTV pendant la vidéo en streaming | Portée multi-format au sein du même foyer |

### Plafonnement de fréquence à travers l'audio

- Spotify : Plafonds de fréquence au niveau plateforme (définis dans Ad Studio ou via DSP)
- Podcast : La fréquence est par émission ; la fréquence cross-émission nécessite un achat programmatique via SAN ou DSP
- Cross-plateforme : Utiliser un DSP (The Trade Desk, DV360) pour gérer la fréquence à travers streaming + podcast + CTV
- Fréquence audio totale recommandée : 5 à 8 impressions par auditeur et par semaine sur tous les canaux audio

---

## Bonnes pratiques créatives audio

### Ce qui fonctionne

- **Le ton conversationnel** surpasse la voix corporate/annonceur de 20 à 30 % en rappel
- **Les logos sonores / mnémoniques** (le bong d'Intel, le « ta-dum » de Netflix) construisent une reconnaissance de marque à long terme — investir dans une signature audio de 2 à 3 secondes
- **Les 3 premières secondes doivent accrocher** — pas d'ouverture du type « Cette publicité vous est offerte par... » (les auditeurs décrochent)
- **La personnalisation** (météo, localisation, heure dynamiques) augmente le rappel de 30 %+ vs générique
- **La répétition du nom de marque** — mentionner le nom de la marque 2 à 3 fois dans un spot de 30s (au minimum au début et à la fin)
- **Un seul message par spot** — ne pas essayer de couvrir plusieurs fonctionnalités ou offres
- **La clarté du CTA** — action simple, répétable (« visitez marque point com slash podcast » ou « cherchez Marque dans l'app store »)

### Ce qui échoue

- Commencer par « Salut auditeurs » ou des salutations génériques — donne une impression d'interruption
- Effets sonores plus forts que la voix — désagréable dans un environnement casque
- CTA multiples (visitez le site ET téléchargez l'app ET utilisez le code promo) — en choisir un seul
- Spots trop produits qui ne ressemblent en rien au contenu environnant
- Spots de 60 secondes sans histoire convaincante — 30 secondes est le choix par défaut sûr
- Musique de fond qui rivalise avec la voix — la garder à -20 dB minimum

### Directives pour le lu par l'animateur en podcast

Lors du briefing des animateurs de podcast pour des publicités lues par l'animateur :
- [ ] Fournir 3 à 5 points clés à évoquer, pas un script rigide — les animateurs doivent sonner naturels
- [ ] Inclure un guide de prononciation de la marque et les termes à éviter
- [ ] Préciser le seul CTA (URL personnalisée ou code promo)
- [ ] Partager un brief de marque d'une page avec le ton, l'audience et le différenciateur clé
- [ ] Permettre aux animateurs d'utiliser leur propre langage et leurs anecdotes personnelles
- [ ] Relire et approuver les lectures avant diffusion, ou accepter que les lectures intégrées en dur ne peuvent pas être modifiées
- [ ] Fixer des attentes claires de mention légale FTC (« Cet épisode est sponsorisé par... »)

> **Principe clé :** La publicité audio réussit lorsqu'elle respecte l'environnement de l'auditeur. Les gens écoutent l'audio pendant des moments personnels, souvent intimes — trajet domicile-travail, sport, cuisine, endormissement. Les publicités qui correspondent au ton et au contexte de ces moments donnent l'impression d'être des compagnons naturels plutôt que des interruptions. Les meilleures publicités audio donnent l'impression d'être à leur place.

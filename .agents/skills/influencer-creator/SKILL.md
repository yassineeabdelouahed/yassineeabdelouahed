---
name: influencer-creator
description: "Planifier le marketing d'influence et de créateurs de bout en bout — découverte de créateurs et vérification de l'authenticité d'audience, développement de brief de campagne, audits de conformité de divulgation FTC et internationale, cadres de contrat et de droits d'usage, stratégie UGC, et mesure de performance (EMV, ROAS, brand lift). Uniquement conseil et planification — ne contacte aucun créateur et ne publie rien. Se déclenche sur « /digital-marketing-pro:influencer-creator », « trouve des influenceurs pour notre lancement », « ces posts sponsorisés sont-ils conformes FTC », « comment structurer un contrat d'influenceur », « planifie une campagne UGC ». Lit le profil de marque, les guidelines, les règles de conformité, et l'historique des campagnes via campaign-tracker.py avant de planifier un nouveau travail."
---

# Influenceurs & créateurs

## Quand utiliser cette compétence

Activer cette compétence lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- Trouver ou vérifier des influenceurs et créateurs pour des partenariats de marque
- Construire des briefs créateurs ou des briefs de campagne pour des collaborations d'influence
- Comprendre les exigences de divulgation FTC pour le contenu sponsorisé
- Structurer des contrats d'influenceurs incluant droits d'usage, exclusivité, et conditions de paiement
- Mesurer la performance de campagne d'influence (EMV, ROAS, brand lift, engagement)
- Planifier des campagnes ou stratégies UGC (contenu généré par l'utilisateur)
- Concéder sous licence ou réutiliser du contenu influenceur/UGC dans des publicités payantes
- Gérer les relations avec les influenceurs à l'échelle (programmes ambassadeurs, partenariats permanents)
- Naviguer la conformité internationale des influenceurs (ASA UK, ARPP française, etc.)
- Gérer les controverses ou violations de conformité d'influenceurs en cours de campagne
- Évaluer l'authenticité d'un influenceur (faux abonnés, engagement pods, qualité d'audience)
- Planifier des partenariats B2B avec des influenceurs ou leaders d'opinion
- Concevoir des programmes de plaidoyer employé qui recoupent la stratégie d'influence
- Construire des modèles de rémunération hybride affiliation-influenceur

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de marque actif a été affiché au
   démarrage de la session. Utiliser le nom de marque, le secteur, les paramètres de
   voix, les canaux, les objectifs, la conformité, et les concurrents affichés là.
2. **Si vous avez besoin du profil complet**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, énergie, humour,
   autorité doivent façonner tout le ton du contenu et les choix de mots
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les
   target_markets et le secteur de la marque en utilisant
   `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — Consulter
   `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer
   `skills/context-engine/platform-specs.md` pour les limites de caractères et les
   exigences de format
7. **Vérifier l'historique de campagne** — Exécuter
   `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns`
   avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez
   /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les
   meilleures pratiques générales. »
9. **Vérifier les guidelines de marque** — Si
   `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et
   appliquer : `restrictions.md` pour les mots interdits, les revendications
   restreintes, et les avertissements obligatoires ; `channel-styles.md` pour les
   dérogations de ton spécifiques au canal (peuvent différer de la voix de base) ;
   `messaging.md` pour les messages clés approuvés, slogans, et langage de
   positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des
   4 scores numériques. Lors de la production de contenu pour un canal spécifique, les
   règles de style de canal ont priorité sur les paramètres de voix de base.

Ne pas demander à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant d'exécuter, recueillir ce qui suit auprès de l'utilisateur (demander si non fourni) :

- **Objectif de la campagne** : Notoriété, considération, conversions, création de contenu, ou construction de communauté
- **Produit/service** : Ce qui est promu, incluant le prix et la complexité d'achat
- **Audience cible** : Démographie, intérêts, plateformes utilisées, et comportement d'achat
- **Budget** : Budget influenceur total et comment il devrait se répartir entre honoraires et seeding de produit
- **Plateformes** : Quels réseaux sociaux sont prioritaires (Instagram, TikTok, YouTube, LinkedIn, X, Pinterest, Twitch)
- **Type de contenu nécessaire** : Posts, Stories, Reels, TikToks, vidéos YouTube, livestreams, articles de blog, podcasts
- **Droits d'usage** : Si le contenu sera réutilisé en publicités payantes, site web, ou autres canaux
- **Calendrier** : Dates de campagne, délais de livraison de contenu, et périodes de revue
- **Secteur** : Nécessaire pour signaler les exigences de conformité spécifiques (FTC, FDA, FINRA, FCC)
- **Géographie** : Marchés ciblés pour déterminer les lois de divulgation applicables
- **Travail d'influence passé** : Ce qui a été essayé auparavant et ce qui a fonctionné ou non

## Capacités

### Découverte d'influenceurs
- **Recherche spécifique par plateforme** : Critères d'identification pour les créateurs Instagram, TikTok, YouTube, LinkedIn, X, Pinterest, et Twitch
- **Analyse d'authenticité d'audience** : Détecter les faux abonnés, engagement pods, et l'engagement acheté. Les signaux d'alerte incluent les pics soudains d'abonnés, la faible qualité des commentaires, les anomalies de taux d'engagement, et les problèmes de ratio abonnés/abonnements
- **Évaluation de la qualité d'engagement** : Aller au-delà des métriques de vanité pour évaluer le sentiment des commentaires, les taux de sauvegarde, les taux de partage, et l'interaction authentique de l'audience
- **Correspondance de niche** : Aligner les thèmes de contenu du créateur, la démographie de l'audience, et les valeurs de marque avec les objectifs de campagne
- **Classification par palier** : Nano (1K-10K), micro (10K-100K), mid-tier (100K-500K), macro (500K-1M), et mega (1M+) avec des cas d'usage stratégiques pour chaque palier
- **Analyse concurrentielle** : Identifier les créateurs qui travaillent avec des concurrents et évaluer les opportunités de partenariat ou les besoins d'exclusion

### Modèles de brief créateur
- **Structure de brief de campagne** : Contexte, objectifs, messages clés, direction créative, éléments obligatoires, à faire/à ne pas faire, calendrier, et livrables
- **Cadre de liberté créative** : Équilibrer les exigences de marque avec l'expression créative authentique du créateur. Le contenu trop scénarisé sous-performe.
- **Formats spécifiques par plateforme** : Adapter les exigences de brief pour Reels vs TikTok vs YouTube vs Stories vs posts statiques
- **Hiérarchie de messagerie** : Messages obligatoires, recommandés, et optionnels pour donner aux créateurs une flexibilité structurée
- **Contenu de référence** : Inclure des exemples du style de contenu que la marque apprécie (mood boards, posts de référence) sans demander aux créateurs de les copier

### Moteur de conformité FTC
- **Exigences de divulgation** : Règles de divulgation claire et non équivoque. « #ad » ou « Sponsored » doit être sans ambiguïté et inévitable
- **Placement de divulgation spécifique par plateforme** : Instagram (au-dessus de la ligne de flottaison dans les légendes, pas enterré dans les hashtags), TikTok (superposition de texte et légende), YouTube (divulgation verbale et écrite dans les 30 premières secondes plus la case à cocher de promotion payante de la plateforme), podcasts (divulgation verbale avant et pendant les segments sponsorisés)
- **Définition de la connexion matérielle** : Toute relation susceptible d'affecter la crédibilité doit être divulguée — produits gratuits, paiement, liens d'affiliation, relations familiales, emploi
- **Règles IA et influenceurs virtuels** : Les influenceurs virtuels et le contenu généré par IA doivent divulguer leur nature non-humaine. La FTC a signalé un focus d'application ici
- **Règle sur les avis consommateurs (Consumer Review Rule)** : Les avis doivent refléter une expérience authentique. Les avis incités nécessitent une divulgation. Les faux avis et la suppression d'avis négatifs sont interdits
- **Clauses de conformité contractuelle** : Langage contractuel spécifique exigeant la conformité FTC, l'indemnisation pour non-conformité, et le droit de demander des modifications de contenu pour les problèmes de divulgation
- **Conformité internationale** : ASA UK (étiquetage clair comme « Ad »), ARPP française (divulgation obligatoire avec langage spécifique), réglementations UE, normes publicitaires canadiennes, exigences AANA australiennes
- **Mises à jour des guides d'approbation** : Les guides d'approbation mis à jour de la FTC en 2023 ont élargi les exigences de divulgation, augmenté la responsabilité de la marque, et abordé les spécificités des réseaux sociaux

### Suivi de performance
- **Valeur média gagnée (EMV)** : Calculer la valeur publicitaire équivalente de la portée et de l'engagement organiques d'influence
- **ROAS direct** : Suivre le revenu issu de codes de réduction spécifiques aux influenceurs, liens UTM, et liens d'affiliation
- **Mesure du brand lift** : Enquêtes pré/post campagne, changements du volume de recherche de marque, augmentations des mentions sociales, et changements de sentiment
- **Métriques d'engagement** : Taux, qualité, sauvegardes, partages, commentaires, et croissance d'audience pendant les périodes de campagne
- **Performance de contenu** : Comparer la performance du contenu influenceur aux benchmarks de contenu créé par la marque
- **Modélisation d'attribution** : Attribution multi-touch pour l'influence comme canal de notoriété/considération qui assiste les conversions ailleurs

### Cadres de contrat
- **Droits d'usage** : Organique uniquement, droits d'amplification payante, perpétuel vs limité dans le temps, restrictions de plateforme, restrictions territoriales
- **Termes d'exclusivité** : Exclusivité de catégorie (marques concurrentes), exclusivité de plateforme, durée, et prime de rémunération pour l'exclusivité (typiquement 25-100% d'augmentation d'honoraires)
- **Clause de moralité** : Normes de comportement, motifs de résiliation, exigences de notification, et droits de retrait de contenu
- **Conditions de paiement** : Forfait fixe, bonus de performance, hybride affiliation/commission, produit uniquement, retainer. Calendriers de paiement (50% initial / 50% à la livraison est standard)
- **Processus d'approbation de contenu** : Nombre de tours de révision (2 est standard), délai d'approbation (48-72 heures), et ce qui constitue une approbation vs une révision
- **Spécification des livrables** : Nombre exact, format, plateforme, calendrier de publication, et exigences de légende/divulgation
- **Conditions d'annulation** : Préavis, kill fee (typiquement 25-50% pour les campagnes annulées), et clauses de force majeure
- **Propriété PI** : Qui possède le contenu (généralement le créateur), termes de licence accordés à la marque, et droits d'œuvre dérivée

### Stratégie UGC
- **Sollicitation UGC** : Campagnes de hashtag de marque, concours, campagnes d'avis, encouragement à l'unboxing, et défis communautaires
- **Gestion des droits** : Obtenir la permission d'utiliser le contenu client, conditions d'utilisation pour les soumissions, et attribution appropriée
- **UGC en publicités payantes** : Concéder sous licence le contenu client pour les créations publicitaires, publicités de style UGC produites par des créateurs, et whitelisting/Spark Ads pour diffuser des publicités depuis les comptes de créateurs
- **Curation UGC** : Sélectionner, modérer, et mettre en avant le contenu utilisateur sur les canaux de marque, le site web, et les supports marketing
- **Contrôle qualité** : Maintenir la sécurité de marque en amplifiant le contenu utilisateur, politiques de modération, et guidelines de contenu

## Processus

### Construction de campagne d'influence (cas d'usage le plus courant)

1. **Définir les paramètres de campagne** — Établir les objectifs, le budget, le calendrier, l'audience cible, et les priorités de plateforme. Déterminer si la campagne est focalisée sur la notoriété, la conversion, ou la création de contenu.
2. **Identification d'influenceurs** — Construire une liste de candidats en utilisant la pertinence de niche, la démographie de l'audience, la qualité d'engagement, le style de contenu, et l'alignement de marque. Se référer à `influencer-discovery.md` pour les stratégies de recherche spécifiques par plateforme.
3. **Vérification de l'audience** — Analyser l'audience de chaque candidat pour l'authenticité et la correspondance démographique. Vérifier les faux abonnés, les engagement pods, et l'alignement audience-marque. Éliminer les créateurs dont l'audience ne correspond pas à la cible.
4. **Outreach et négociation** — Rédiger un outreach personnalisé. Présenter l'opportunité de partenariat avec des attentes et une rémunération claires. Négocier les livrables, le calendrier, les droits d'usage, et les conditions de paiement.
5. **Contractualisation** — Exécuter des contrats couvrant les livrables, le calendrier, la rémunération, les droits d'usage, l'exclusivité, les exigences de conformité FTC, la clause de moralité, le processus d'approbation, et les conditions d'annulation. Se référer à `contract-frameworks.md`.
6. **Livraison du brief** — Envoyer des briefs créatifs détaillés qui communiquent les exigences de marque tout en préservant la liberté créative. Inclure les éléments obligatoires, messages clés, à faire/à ne pas faire, et contenu de référence. Se référer à `creator-briefs.md`.
7. **Revue de contenu** — Revoir le contenu soumis pour l'alignement de marque, la conformité FTC (placement et clarté de la divulgation), l'exactitude factuelle, et les normes de qualité. Fournir du feedback dans le délai convenu. Limiter les demandes de révision aux tours contractés.
8. **Publier et amplifier** — Coordonner le calendrier de publication entre les créateurs. Booster le contenu le plus performant avec de l'amplification payante là où les droits d'usage le permettent. Exécuter des Spark Ads ou des publicités whitelistées depuis les comptes de créateurs.
9. **Mesure de performance** — Suivre l'EMV, l'engagement, la portée, les conversions (via codes/UTM), et le brand lift. Comparer aux benchmarks et aux KPI de campagne. Se référer à `performance-tracking.md`.
10. **Analyse post-campagne** — Documenter ce qui a fonctionné, ce qui n'a pas fonctionné, quels créateurs ont surperformé, et les leçons apprises. Utiliser les constats pour alimenter la planification de campagne future et le développement de relations créateurs.

### Audit de conformité FTC

1. **Revoir tout le contenu sponsorisé** — Vérifier chaque pièce de contenu influenceur pour une divulgation claire et non équivoque.
2. **Vérifier le placement de la divulgation** — Confirmer que les divulgations sont visibles sans cliquer sur « plus », ne sont pas enterrées dans des chaînes de hashtags, sont dans la première ligne des légendes, et apparaissent en superposition de texte dans le contenu vidéo.
3. **Vérifier le langage de divulgation** — S'assurer que la divulgation est sans ambiguïté. « #ad » et « Sponsored by [Brand] » sont clairs. « #ambassador », « #collab », et « #partner » ne suffisent pas seuls.
4. **Auditer le contenu vidéo** — Vérifier la divulgation verbale dans les 30 premières secondes et la divulgation écrite dans la vidéo elle-même (pas seulement la description).
5. **Documenter le statut de conformité** — Créer un journal de conformité pour chaque pièce de contenu avec statut, problèmes trouvés, et actions correctives prises.
6. **Remédier aux violations** — Contacter les créateurs pour mettre à jour le contenu non conforme. Documenter la demande et la résolution pour la protection juridique.

## Fichiers de référence

- `influencer-discovery.md` — Stratégies de recherche spécifiques par plateforme, checklists de vérification, cadres d'analyse d'audience, et guides de stratégie par palier
- `creator-briefs.md` — Modèles de brief pour chaque format de contenu, guidelines de liberté créative, et cadres de hiérarchie de messagerie
- `ftc-compliance.md` — Exigences complètes du guide d'approbation FTC, règles de divulgation spécifiques par plateforme, matrice de conformité internationale, et modèles de langage contractuel
- `performance-tracking.md` — Méthodes de calcul EMV, modèles d'attribution, modèles de reporting, et données de benchmark par secteur et plateforme
- `contract-frameworks.md` — Modèles de contrat complets, explications clause par clause, guides de négociation, et benchmarking de tarifs par palier et plateforme
- `ugc-strategy.md` — Playbooks de sollicitation UGC, cadres de gestion des droits, pipelines UGC-vers-publicité, et meilleures pratiques de curation
- `micro-influencer-strategy.md` — Définitions des paliers micro/nano, découverte et vérification, modèles de rémunération, programmes de gifting et d'ambassadeurs, et tactiques micro-influenceur spécifiques par plateforme

## Formats de résultat

- **Plan de campagne d'influence** : Aperçu de campagne, shortlist de créateurs avec justification, plan de brief, calendrier, répartition budgétaire, et cibles de KPI
- **Brief créateur** : Document de brief complet prêt à envoyer aux influenceurs avec toutes les exigences de marque, direction créative, et instructions de conformité
- **Audit de conformité FTC** : Statut de conformité par contenu, violations trouvées, actions de remédiation, et guidelines de conformité mises à jour
- **Modèle de contrat d'influenceur** : Contrat personnalisé avec toutes les clauses pertinentes basées sur les spécificités de la campagne
- **Rapport de performance de campagne** : Métriques de performance par créateur et agrégées, analyse ROI, classements de performance de contenu, et recommandations stratégiques
- **Conception de programme UGC** : Stratégie de sollicitation, processus de gestion des droits, guidelines de curation, et workflow de réutilisation

## Cas particuliers

### Post d'influenceur sans divulgation
Si un post d'influenceur en direct manque la divulgation FTC requise, répondre en
quelques heures. Contacter le créateur immédiatement pour ajouter la divulgation.
Documenter l'outreach et la résolution. Si le créateur ne répond pas dans les 24
heures, escalader à son management. Maintenir un journal de conformité démontrant
des efforts de bonne foi. La marque porte la responsabilité pour la non-conformité
de l'influenceur selon les guidelines FTC.

### Controverse d'influenceur en cours de campagne
Quand un influenceur partenaire devient impliqué dans une controverse, évaluer la
sévérité immédiatement. Pour les problèmes mineurs (opinion hors marque), surveiller
mais continuer. Pour les problèmes modérés (contenu offensant sans rapport avec la
marque), mettre en pause le contenu planifié et évaluer. Pour les problèmes graves
(activité illégale, discours de haine, scandale), mettre en pause immédiatement,
activer la clause de moralité, publier une déclaration de marque prenant ses
distances avec l'individu, et retirer ou désamplifier le contenu existant. La
vitesse de décision compte — une réponse retardée est perçue comme un
cautionnement.

### Campagnes transfrontalières avec des règles de divulgation différentes
Lors de l'exécution de campagnes à travers plusieurs pays, appliquer la norme
applicable la plus stricte comme référence. L'ASA UK exige des labels « Ad ». La
France exige une divulgation spécifique en français. L'UE a des règles évolutives
spécifiques par plateforme. Construire une matrice de conformité par marché et
intégrer des instructions spécifiques au marché dans les briefs créateurs. En cas de
doute, sur-divulguer.

### Marketing d'influence B2B
Les partenariats d'influence B2B impliquent des leaders d'opinion, des analystes de
secteur, et des créateurs professionnels plutôt que des influenceurs lifestyle. Les
KPI passent de l'engagement et la portée à la qualité des leads, l'autorité de
contenu, et l'influence sur le pipeline. Les modèles de paiement impliquent souvent
des honoraires de conférence, du contenu co-créé, des rôles de conseil, ou des
sponsorings d'événement plutôt que des honoraires par post. LinkedIn et YouTube sont
les plateformes principales. Le contenu long format (livres blancs, webinaires,
interviews podcast) surperforme le format court.

### Plaidoyer employé vs marketing d'influence
Le partage par les employés de contenu d'entreprise est régi par des règles
différentes du marketing d'influence, mais la divulgation reste requise. Les
employés doivent divulguer leur relation d'emploi lorsqu'ils approuvent les produits
de leur employeur. Concevoir des programmes de plaidoyer employé avec une
divulgation intégrée, une messagerie approuvée, et des guidelines claires séparant
les opinions personnelles des approbations d'entreprise.

### Arrangements hybrides affiliation-influenceur
Quand les influenceurs reçoivent à la fois un forfait fixe et une commission
d'affiliation, à la fois le sponsoring et la relation d'affiliation doivent être
divulgués. « #ad » couvre le sponsoring ; les liens d'affiliation nécessitent une
divulgation séparée (par exemple, « je gagne une commission si vous achetez via mon
lien »). Structurer les contrats pour délimiter clairement la composante honoraires
de la composante performance à des fins comptables et de conformité.

## Compétences liées

- **Paid Advertising** — Amplifier le contenu influenceur via des canaux payants (whitelisting, Spark Ads, contenu boosté)
- **Content Engine** — Stratégie de contenu qui incorpore le contenu influenceur et UGC dans le calendrier de contenu plus large
- **Reputation Management** — Gérer la réputation de marque quand des controverses d'influenceurs surviennent
- **Growth Engineering** — Programmes hybrides affiliation-influenceur et amplification de parrainage via des créateurs
- **Analytics & Insights** — Attribution et mesure pour la performance de campagne d'influence
- **Emerging Channels** — Intégration de commerce social avec le contenu influenceur (TikTok Shop, Instagram Shopping)

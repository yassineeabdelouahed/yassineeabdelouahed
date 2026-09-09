# Référence des règles de conformité

Ce fichier est le jeu de règles de conformité canonique pour le plugin Digital Marketing Pro. Tous les modules marketing DOIVENT vérifier les livrables par rapport à ces règles avant livraison. Les règles sont structurées pour une consommation programmatique par le moteur de contexte.

---

## Section 1 : Lois géographiques sur la vie privée

### 1.1 UE/EEE — Règlement Général sur la Protection des Données (RGPD)

| Champ | Détail |
|---|---|
| **Région** | Union Européenne / Espace Économique Européen (27 états membres de l'UE + Islande, Liechtenstein, Norvège) |
| **Loi** | Règlement Général sur la Protection des Données (RGPD) |
| **Année d'adoption** | 2016 (appliqué le 25 mai 2018) |
| **Modèle de consentement** | Opt-in. Un consentement explicite, informé, librement donné, spécifique, et sans ambiguïté est requis avant le traitement des données personnelles. Le consentement doit être aussi facile à retirer qu'à donner. L'intérêt légitime peut s'appliquer dans des contextes B2B étroits mais nécessite un test de mise en balance documenté. |
| **Règles e-mail** | Opt-in préalable requis pour tous les e-mails marketing. Exception d'opt-in souple : les clients existants peuvent recevoir des e-mails sur des produits/services similaires si un opt-out facile est proposé à la collecte et dans chaque message. Chaque e-mail doit inclure l'identité de l'expéditeur, l'adresse physique, et un mécanisme de désabonnement fonctionnel honoré sous 30 jours. |
| **Règles cookies/suivi** | Consentement préalable requis pour tous les cookies et traqueurs non essentiels (Directive ePrivacy). Les bannières de cookies doivent permettre un choix granulaire (accepter/refuser par catégorie). Les cases pré-cochées sont invalides. Les cookies d'analytics nécessitent un consentement sauf s'ils sont strictement nécessaires. Le suivi côté serveur de données personnelles nécessite toujours une base légale. |
| **Fourchette de sanction** | Jusqu'à 20 millions EUR ou 4 % du chiffre d'affaires mondial annuel, le plus élevé des deux. Les autorités de contrôle peuvent aussi émettre des avertissements, des interdictions de traitement, et des ordres d'effacement de données. |
| **Impact marketing clé** | Le double opt-in est la norme du secteur. Tous les formulaires de lead ont besoin de cases de consentement claires (pas groupées). Des Accords de Traitement de Données sont requis avec chaque fournisseur martech. La politique de confidentialité doit divulguer tous les destinataires de données. Les transferts de données transfrontaliers nécessitent des décisions d'adéquation, des CCT, ou des BCR. Le droit à l'effacement signifie que les listes de suppression doivent être maintenues. Le profilage pour le ciblage publicitaire nécessite un consentement explicite ou un intérêt légitime avec opt-out. |

### 1.1b UE/EEE — Article 50 de l'AI Act (Divulgation de l'IA générative)

| Champ | Détail |
|---|---|
| **Région** | Union Européenne / Espace Économique Européen |
| **Loi** | Règlement (UE) 2024/1689 — Loi sur l'Intelligence Artificielle, Article 50 (obligations de transparence pour les fournisseurs et déployeurs de certains systèmes d'IA) |
| **Applicable** | **2 août 2026** (obligations de transparence) ; les obligations d'IA à usage général se sont appliquées le 2 août 2025 ; les obligations pour les systèmes à haut risque le 2 août 2027 |
| **Portée** | Tous les livrables d'IA générative distribués sur les marchés de l'UE — aucun seuil de dépense minimum, la publicité n'est pas exemptée. Les fournisseurs (développeurs d'IA) et les déployeurs (annonceurs, marques) portent tous deux des obligations. |
| **Exigences de divulgation** | (a) Le contenu généré ou manipulé par IA **doit être marqué dans un format lisible par machine** utilisant des normes ouvertes et interopérables. **C2PA (Coalition for Content Provenance and Authenticity) est l'ossature émergente.** Le marquage doit être techniquement robuste et survivre au traitement de routine. (b) Les deepfakes (audio/image/vidéo synthétique ressemblant à des personnes, objets, lieux, ou événements réels) doivent être **divulgués visiblement**. (c) Le texte généré par IA sur des sujets d'intérêt public doit être divulgué sauf s'il a été revu par un humain et que la marque assume la responsabilité éditoriale. |
| **Exceptions** | Les œuvres véritablement artistiques, satiriques, ou fictionnelles sont exemptées de manière restreinte — s'applique dans des cas limités et n'exempte pas globalement le marketing. |
| **Fourchette de sanction** | Jusqu'à **15 millions EUR ou 3 % du chiffre d'affaires mondial annuel**, le plus élevé des deux (obligations de transparence). Violations sur systèmes à haut risque jusqu'à 35 M EUR ou 7 %. |
| **Impact marketing clé** | Toute création publicitaire générée par IA, image sociale, vidéo narrée par IA, ou texte long généré par IA distribué dans l'UE doit porter des métadonnées de provenance lisibles par machine. Utiliser `/digital-marketing-pro:c2pa-metadata` pour intégrer un manifeste C2PA dans toute image/vidéo/audio/PDF générée par IA avant publication dans l'UE. Les deepfakes nécessitent une divulgation visible additionnelle en superposition ou un signal audio. Les pièces éditoriales écrites par IA nécessitent une mention « assisté par IA » sauf si l'éditeur humain assume l'entière responsabilité éditoriale. La porte de pré-publication (`/digital-marketing-pro:check`) vérifie la présence de C2PA sur les actifs signalés IA dans les campagnes ciblant l'UE. |

#### 1.1b.i — Directives d'implémentation de l'Article 50 (FINALES, 2026)

La Commission européenne a publié un projet de directives d'implémentation pour l'Article 50 le 8 mai 2026 (consultation close le 3 juin) et a depuis **adopté les Directives finales**, aux côtés du **Code de bonnes pratiques final sur la Transparence du Contenu Généré par IA de l'AI Office (10 juin 2026)** — les deux avant la date d'applicabilité du 2 août 2026. Les clarifications ci-dessous se sont maintenues du projet vers l'interprétation finale :

| Sujet | Directive finale (2026) | Ce que cela signifie pour le marketing |
|---|---|---|
| **« Manipulation IA substantielle »** | Définie comme tout changement piloté par IA qui altère le sens, l'identité, ou les affirmations factuelles d'une personne, d'un objet, d'un lieu, ou d'un événement réel. La correction de couleur de routine, le cadrage, le débruitage ne sont PAS dans la portée. | Un remplacement de sujet dans une image = manipulation substantielle (divulgation). Une retouche de style Lightroom = non. |
| **« Sujets d'intérêt public »** | Inclut la santé, les élections, la finance, les services gouvernementaux, la sécurité publique, et tout sujet où un consommateur raisonnable attend une exactitude journalistique. Le texte marketing lui-même n'est généralement pas dans la portée SAUF s'il aborde l'un de ces sujets (par ex., allégations de santé, allégations de produits financiers). | Le texte produit générique = aucune divulgation IA requise. Le texte généré par IA faisant des allégations de santé, financières, ou politiques = divulgation requise sauf si un éditeur humain valide. |
| **Marquage lisible par machine** | Les Content Credentials C2PA sont explicitement nommés comme un chemin de « présomption de conformité ». Des marquages de norme ouverte alternatifs sont autorisés s'ils sont techniquement équivalents. | Continuer à utiliser C2PA via `/digital-marketing-pro:c2pa-metadata`. Les marques qui livrent sans C2PA doivent montrer une provenance équivalente — nettement plus de travail. |
| **Divulgation visible des deepfakes** | Un label visible, un filigrane, ou un signal audio doit être perceptible à une distance normale de visionnage/écoute. Les superpositions cachées dans un coin en petit texte sont explicitement insuffisantes. | Si vous produisez une publicité avec un talent synthétique ou une voix clonée par IA pour le marché de l'UE, la divulgation doit être visible depuis toute distance de visionnage normale. |
| **Exception de responsabilité éditoriale** | Le relecteur humain doit (a) être identifiable, (b) avoir l'autorité de modifier ou rejeter le résultat de l'IA, (c) avoir un dossier de revue documenté. Un simple tampon d'approbation ne satisfait pas l'exception. | Une fiche d'évaluation de relecteur documentée (par ex., l'évaluation journalisée de l'agent quality-assurance) satisfait (c), mais un éditeur humain nommé doit tout de même valider et ce nom doit figurer sur la pièce publiée (byline, ours, ou lien accessible « À propos de cet article »). |
| **Priorité d'application** | Les régulateurs nationaux devraient prioriser (1) les deepfakes, (2) le contenu politique/santé généré par IA, (3) le contenu généré par IA commercialisé sans aucune métadonnée de provenance. La création commerciale de routine avec C2PA est de faible priorité. | Les marques utilisant C2PA sur les actifs IA distribués dans l'UE sont dans une posture défensive solide selon les directives finales. |

**Actions à entreprendre pour les marques ayant une exposition UE avant le 2 août 2026 :**

1. **Auditer votre inventaire d'actifs IA UE maintenant.** Cataloguer toute image, vidéo, audio générés par IA, tout contenu synthétique de style deepfake, et tout texte long écrit par IA distribué aux utilisateurs de l'UE au cours des 12 derniers mois. Identifier lesquels portent C2PA et lesquels non.
2. **Verrouiller l'approvisionnement de votre certificat de signature C2PA immédiatement — l'Article 50 s'applique le 2 août 2026.** Voir `docs/c2pa-production-cert-guide.md` pour les quatre autorités reconnues. Prévoir 2 à 4 semaines pour l'approbation Adobe Content Credentials.
3. **Mettre à jour votre Définition du Terminé.** Toute création produite pour distribution UE devrait être signée C2PA au moment de la production, pas rétroactivement au moment de la publication. La porte de pré-publication (`/digital-marketing-pro:check`) bloque les actifs IA non signés pour les campagnes ciblant l'UE.
4. **Traiter l'exception comme conditionnelle, pas comme un laissez-passer.** « Revu par un humain » exige une responsabilité nommée. Ne revendiquez pas la responsabilité éditoriale sauf si un éditeur nommé est prêt à en répondre publiquement.

### 1.2 États-Unis fédéral — CAN-SPAM Act

| Champ | Détail |
|---|---|
| **Région** | États-Unis (fédéral) |
| **Loi** | Controlling the Assault of Non-Solicited Pornography and Marketing Act (CAN-SPAM) |
| **Année d'adoption** | 2003 (effective le 1er janvier 2004 ; amendée en 2008) |
| **Modèle de consentement** | Opt-out. Aucun consentement préalable requis pour envoyer un e-mail commercial. Les destinataires doivent recevoir un moyen clair de se désabonner, et les demandes de désabonnement doivent être honorées sous 10 jours ouvrés. |
| **Règles e-mail** | Pas d'objets d'e-mail trompeurs. Les champs « De » et « Répondre à » doivent identifier précisément l'expéditeur. Chaque e-mail commercial doit inclure : une identification claire comme publicité (le cas échéant), l'adresse postale physique valide de l'expéditeur, et un mécanisme de désabonnement visible. Les listes achetées sont légales mais les obligations de désabonnement s'appliquent toujours. Les e-mails transactionnels sont exemptés si leur objet principal est transactionnel. |
| **Règles cookies/suivi** | Aucune loi fédérale de consentement aux cookies. Les pixels de suivi dans les e-mails sont légaux. La FTC applique les pratiques de suivi trompeuses en vertu de la Section 5 du FTC Act. |
| **Fourchette de sanction** | Sanctions civiles par violation (par e-mail), ajustées annuellement à l'inflation (~53K$+ en 2026). Les FAI et les procureurs généraux d'état peuvent aussi engager des actions. |
| **Impact marketing clé** | Barre plus basse que le RGPD mais stricte sur le respect du désabonnement. Les e-mails d'affiliés et de partenaires comptent — la marque dont le produit est promu est responsable. La définition d'« expéditeur » inclut l'entité dont le produit est publicisé. La gestion des listes de suppression est critique. La manipulation d'en-têtes est une infraction pénale. |

### 1.3 Californie — CCPA / CPRA

| Champ | Détail |
|---|---|
| **Région** | Californie, États-Unis |
| **Loi** | California Consumer Privacy Act (CCPA, 2018) tel que modifié par le California Privacy Rights Act (CPRA, 2020 ; pleinement opérationnel le 1er janvier 2023) |
| **Année d'adoption** | CCPA : 2018. Amendement CPRA : 2020 (appliqué en 2023). |
| **Modèle de consentement** | Opt-out pour la vente/le partage d'informations personnelles. Opt-in requis pour les consommateurs de moins de 16 ans (moins de 13 ans nécessite le consentement parental). Le « partage » inclut la publicité comportementale inter-contextes. |
| **Règles e-mail** | CAN-SPAM régit l'e-mail. Le CCPA/CPRA s'ajoute par-dessus : les consommateurs peuvent refuser la « vente » ou le « partage » d'informations personnelles utilisées pour le ciblage et la personnalisation e-mail. Le respect des signaux Global Privacy Control (GPC) est requis. |
| **Règles cookies/suivi** | Les cookies tiers et les pixels publicitaires qui partagent des données avec des plateformes publicitaires constituent un « partage » sous le CPRA. Un lien « Ne pas vendre ou partager mes informations personnelles » doit figurer sur le site web. Les signaux navigateur GPC doivent être honorés comme un opt-out valide. |
| **Fourchette de sanction** | 2 500 $ par violation non intentionnelle ; 7 500 $ par violation intentionnelle. Droit d'action privé pour les violations de données (100-750 $ par consommateur par incident). Appliqué par la California Privacy Protection Agency (CPPA). |
| **Impact marketing clé** | Le retargeting d'audiences utilisant des données tierces nécessite un mécanisme d'opt-out. Des accords de fournisseur de services sont nécessaires avec tous les fournisseurs martech. Rétrospection de 12 mois sur les divulgations de collecte de données. Les « informations personnelles sensibles » (par ex., géolocalisation, race, santé) déclenchent des restrictions additionnelles — limiter l'usage à ce qui est nécessaire. |

### 1.4 Lois de confidentialité des états américains (résumé multi-états)

| Champ | Détail |
|---|---|
| **Région** | États-Unis — 20+ états avec des lois de confidentialité complètes adoptées |
| **Lois** | Virginie (VCDPA, 2023), Colorado (CPA, 2023), Connecticut (CTDPA, 2023), Utah (UCPA, 2023), Iowa (ICDPA, 2025), Indiana (ICDPA, 2026), Tennessee (TIPA, 2025), Montana (MCDPA, 2024), Texas (TDPSA, 2024), Oregon (OCPA, 2024), Delaware (DPDPA, 2025), New Hampshire (SB 255, 2025), New Jersey (SB 332, 2025), Nebraska (NDPA, 2025), Maryland (MODPA, 2025), Minnesota (MCDPA, 2025), Rhode Island (RIDPA, 2026), Kentucky (KCDPA, 2026), Vermont (VDPA, 2025), et d'autres en attente. |
| **Année d'adoption** | Continue : 2021-2026. La plupart opérationnelles entre 2023-2026. |
| **Modèle de consentement** | Généralement opt-out pour la vente de données et la publicité ciblée. Opt-in pour le traitement de données sensibles. La plupart suivent le modèle VCDPA. Maryland et Minnesota sont plus restrictifs (plus proches de la norme de minimisation des données du RGPD). |
| **Règles e-mail** | Se réfèrent à CAN-SPAM au niveau fédéral. Les lois d'état ajoutent des droits sur les données (accès, suppression, correction, portabilité) qui affectent la gestion CRM et des listes e-mail. |
| **Règles cookies/suivi** | La plupart exigent des droits d'opt-out pour la publicité ciblée (ce qui implique les cookies et pixels publicitaires). Les mécanismes d'opt-out universel (comme GPC) sont obligatoires au Colorado, Connecticut, Texas, Montana, Oregon, Delaware, et d'autres. |
| **Fourchette de sanction** | Typiquement 7 500-10 000 $ par violation. La plupart appliquées par le Procureur Général de l'état. Peu ont des droits d'action privés. Les périodes de grâce (30-60 jours) sont courantes dans les lois adoptées tôt mais sont retirées dans les lois plus récentes. |
| **Impact marketing clé** | Traiter les États-Unis comme un patchwork. L'approche la plus sûre est de construire selon le standard le plus restrictif (actuellement Maryland ou CPRA) et de l'appliquer nationalement. La prise en charge des signaux d'opt-out universel devient un standard de base. La cartographie des données est essentielle pour savoir quelles lois d'état s'appliquent à quels consommateurs. |

### 1.5 Canada — LCAP

| Champ | Détail |
|---|---|
| **Région** | Canada |
| **Loi** | Loi canadienne anti-pourriel (LCAP / CASL) |
| **Année d'adoption** | 2014 |
| **Modèle de consentement** | Opt-in. Consentement exprès requis pour les messages électroniques commerciaux (MEC). Un consentement implicite existe dans des cas limités : relation d'affaires existante (dans les 2 ans d'un achat, 6 mois d'une demande), publication visible de l'adresse (si pertinente pour le rôle), ou divulgation via un parrainage. |
| **Règles e-mail** | Chaque MEC doit inclure : identification de l'expéditeur, coordonnées (physiques et numériques), et un mécanisme de désabonnement fonctionnel traité sous 10 jours ouvrés. Les registres de consentement doivent être conservés avec la preuve de comment et quand le consentement a été obtenu. Les demandes de consentement elles-mêmes ne peuvent contenir de marketing. |
| **Règles cookies/suivi** | La LCAP exige un consentement pour l'installation de programmes sur les appareils. Le consentement aux cookies est régi par la LPRPDE (loi fédérale sur la confidentialité) — un consentement implicite peut suffire pour les cookies fonctionnels/analytics, mais le suivi pour le ciblage publicitaire devrait utiliser un consentement exprès. |
| **Fourchette de sanction** | Jusqu'à 10 millions CAD par violation (individus : 1 million $). Appliqué par le CRTC. Un droit d'action privé a été adopté mais l'application se fait via des sanctions administratives pécuniaires. |
| **Impact marketing clé** | L'une des lois e-mail les plus strictes au monde. Les fenêtres de consentement implicite sont courtes — le CRM doit suivre l'expiration du consentement. La « publication visible » est étroite et ne couvre pas le scraping. La prospection à froid B2B est fortement restreinte. Les programmes de parrainage/recommandation nécessitent une structuration soignée. |

### 1.6 Brésil — LGPD

| Champ | Détail |
|---|---|
| **Région** | Brésil |
| **Loi** | Lei Geral de Proteção de Dados (LGPD) |
| **Année d'adoption** | 2018 (appliqué en septembre 2020 ; sanctions à partir d'août 2021) |
| **Modèle de consentement** | Opt-in. Le consentement doit être libre, informé, et sans ambiguïté pour une finalité spécifique. L'intérêt légitime est disponible comme base alternative mais nécessite une Évaluation d'Intérêt Légitime (LIA). |
| **Règles e-mail** | Consentement ou intérêt légitime requis. Le désabonnement doit être facile et immédiat. Les personnes concernées ont des droits d'accès, de correction, de suppression, et de portabilité. Les communications marketing doivent identifier l'expéditeur et la finalité. |
| **Règles cookies/suivi** | Les directives de l'ANPD (Autorité Nationale de Protection des Données) exigent un consentement pour les cookies non essentiels. Les bannières de cookies avec options accepter/refuser sont une pratique standard. |
| **Fourchette de sanction** | Jusqu'à 2 % du chiffre d'affaires au Brésil, plafonné à 50 millions BRL (~10 millions USD) par violation. L'ANPD peut aussi émettre des avertissements, publiciser les violations, et bloquer ou supprimer des données. |
| **Impact marketing clé** | Structure similaire au RGPD mais avec un plafond de chiffre d'affaires spécifique aux opérations brésiliennes. La nomination d'un Délégué à la Protection des Données (DPO) est obligatoire. Les transferts transfrontaliers nécessitent une adéquation, des garanties contractuelles, ou un consentement. Des avis de confidentialité en portugais sont requis. |

### 1.7 Royaume-Uni — UK GDPR + PECR

| Champ | Détail |
|---|---|
| **Région** | Royaume-Uni |
| **Loi** | Règlement Général sur la Protection des Données du Royaume-Uni (UK GDPR) + Privacy and Electronic Communications Regulations (PECR) |
| **Année d'adoption** | UK GDPR : 2018 (conservé post-Brexit, 2021). PECR : 2003. |
| **Modèle de consentement** | Opt-in pour le marketing. PECR exige un consentement préalable pour les e-mails marketing non sollicités à des individus. Exception d'opt-in souple (similaire à l'UE) : les clients existants peuvent recevoir des e-mails sur des produits similaires si l'opt-out était proposé à la collecte et dans chaque message. Exception B2B : les adresses e-mail d'entreprise (par ex., info@entreprise.com) peuvent être contactées sans consentement préalable sous PECR, mais le UK GDPR exige toujours une base légale. |
| **Règles e-mail** | Mêmes exigences structurelles que le RGPD : identité de l'expéditeur, adresse physique, désabonnement. L'ICO applique. L'e-mail B2C non sollicité sans consentement est une violation PECR. |
| **Règles cookies/suivi** | PECR exige un consentement préalable pour les cookies non essentiels. L'ICO a signalé une application plus stricte. L'intérêt légitime n'est pas une base valide pour les cookies publicitaires sous PECR. |
| **Fourchette de sanction** | UK GDPR : jusqu'à 17,5 millions GBP ou 4 % du chiffre d'affaires mondial. PECR : jusqu'à 500 000 GBP. Application par l'ICO. |
| **Impact marketing clé** | Post-Brexit, la décision d'adéquation du Royaume-Uni depuis l'UE permet les flux de données, mais cela fait l'objet d'une révision. Des Évaluations d'Impact sur la Protection des Données sont requises pour le traitement à haut risque (profilage, marketing à grande échelle). L'ICO publie des directives de marketing direct — les traiter comme contraignantes. Les transferts internationaux nécessitent des mécanismes de transfert spécifiques au Royaume-Uni (CCT du Royaume-Uni, IDTA). |

### 1.8 Australie — Privacy Act + Spam Act

| Champ | Détail |
|---|---|
| **Région** | Australie |
| **Loi** | Privacy Act 1988 (Australian Privacy Principles) + Spam Act 2003 |
| **Année d'adoption** | Privacy Act : 1988 (APP ajoutés en 2014). Spam Act : 2003. |
| **Modèle de consentement** | Opt-in sous le Spam Act pour les messages électroniques commerciaux. Le consentement peut être exprès ou déduit (d'une relation d'affaires existante ou d'une publication visible). Le Privacy Act utilise une norme d'« attente raisonnable » pour l'usage des informations personnelles. |
| **Règles e-mail** | Le Spam Act exige : consentement (exprès ou déduit), identification précise de l'expéditeur, désabonnement fonctionnel honoré sous 5 jours ouvrés. La récolte d'adresses et la vente de listes sont interdites. |
| **Règles cookies/suivi** | Aucune loi spécifique de consentement aux cookies actuellement. Le Privacy Act exige la transparence sur la collecte de données. La révision du Privacy Act du gouvernement (2023-2025) devrait introduire des exigences de consentement plus fortes pour le suivi — surveiller les changements. |
| **Fourchette de sanction** | Spam Act : jusqu'à 2,22 millions AUD par jour pour les personnes morales. Privacy Act : jusqu'à 50 millions AUD, 3x le bénéfice obtenu, ou 30 % du chiffre d'affaires ajusté (le plus élevé) suite aux amendements de 2022. Application par l'ACMA et l'OAIC. |
| **Impact marketing clé** | Le Spam Act interdit les logiciels de récolte d'adresses et les listes scrapées achetées. Le consentement déduit des relations d'affaires est relativement large mais doit être documenté. L'augmentation des sanctions du Privacy Act en 2022 fait de l'Australie une juridiction à conséquences élevées. La divulgation transfrontalière à des destinataires étrangers nécessite des mesures raisonnables pour assurer la conformité. |

### 1.9 Singapour — PDPA

| Champ | Détail |
|---|---|
| **Région** | Singapour |
| **Loi** | Personal Data Protection Act (PDPA) |
| **Année d'adoption** | 2012 (amendements significatifs en 2021) |
| **Modèle de consentement** | Opt-in pour le marketing. Un consentement présumé s'applique dans des situations limitées (par ex., fournir volontairement des données pour une finalité claire). Les amendements de 2021 ont ajouté des exceptions d'« intérêt légitime » et d'« amélioration commerciale ». |
| **Règles e-mail** | Registre Do Not Call (DNC) : vérification obligatoire avant d'envoyer des messages marketing à des numéros/adresses de Singapour. L'opt-out doit être gratuit et traité sous 10 jours ouvrés. L'expéditeur doit être identifié. |
| **Règles cookies/suivi** | Aucune loi spécifique de consentement aux cookies. L'obligation de consentement du PDPA s'applique si les cookies collectent des données personnelles. Les directives consultatives de la PDPC recommandent la transparence et le consentement pour le suivi. |
| **Fourchette de sanction** | Jusqu'à 1 million SGD ou 10 % du chiffre d'affaires annuel à Singapour (le plus élevé, suite aux amendements de 2021). Application par la PDPC. |
| **Impact marketing clé** | La vérification du registre DNC est obligatoire et unique à Singapour — épurer toutes les listes de contact. La notification de violation de données est obligatoire sous 3 jours. Des Délégués à la Protection des Données doivent être nommés. Le retrait du consentement doit être facile. Les transferts transfrontaliers nécessitent une protection comparable. |

### 1.10 Chine — PIPL

| Champ | Détail |
|---|---|
| **Région** | République populaire de Chine |
| **Loi** | Loi sur la Protection des Informations Personnelles (PIPL) |
| **Année d'adoption** | 2021 (effective le 1er novembre 2021) |
| **Modèle de consentement** | Opt-in. Un consentement séparé est requis pour : les informations personnelles sensibles, les transferts transfrontaliers, la divulgation publique, et le traitement par des tiers. Le consentement doit être informé, volontaire, et explicite. |
| **Règles e-mail** | Le marketing nécessite un consentement. Les individus ont le droit de refuser et de retirer leur consentement. Toutes les finalités de traitement doivent être divulguées. Aucun statut spécifique de format d'e-mail comme CAN-SPAM, mais les obligations générales de consentement et de transparence s'appliquent. |
| **Règles cookies/suivi** | Consentement requis pour la collecte d'informations personnelles via cookies et traqueurs. La prise de décision automatisée (recommandations algorithmiques, publicités ciblées) doit offrir un opt-out et une alternative non personnalisée. |
| **Fourchette de sanction** | Jusqu'à 50 millions RMB (~7 millions USD) ou 5 % du chiffre d'affaires de l'année précédente. Les individus responsables peuvent être condamnés à une amende jusqu'à 1 million RMB et interdits d'exercer comme directeurs/dirigeants. Application par la CAC (Administration du Cyberespace de Chine). |
| **Impact marketing clé** | Localisation des données : les informations personnelles des résidents chinois doivent être stockées en Chine sauf si une évaluation de sécurité, un contrat standard, ou une certification est complétée pour le transfert transfrontalier. Un consentement séparé pour chaque finalité. Des Évaluations d'Impact sur la Protection des Informations Personnelles sont requises pour les données sensibles, la prise de décision automatisée, et les transferts transfrontaliers. Un DPO local ou un représentant est requis si le traitement se fait depuis l'extérieur de la Chine. |

### 1.11 Inde — DPDPA

| Champ | Détail |
|---|---|
| **Région** | Inde |
| **Loi** | Digital Personal Data Protection Act (DPDPA) 2023, opérationnalisée par les Digital Personal Data Protection Rules 2025 (notifiées par le MeitY le 3 janvier 2025 ; entrée en vigueur échelonnée jusqu'en 2025-2026). |
| **Année d'adoption** | 2023 (Règles 2025 finalisées ; consulter la notification du MeitY pour le calendrier d'entrée en vigueur phase par phase avant de concevoir pour l'Inde). |
| **Modèle de consentement** | Opt-in. Le consentement doit être libre, spécifique, informé, inconditionnel, et sans ambiguïté, et doit être demandé dans un langage clair et simple. L'avis doit accompagner ou précéder la demande de consentement (Règle 3). Le « consentement présumé » a été retiré de la Loi de 2023 et remplacé par des « Usages Légitimes Certains » (Section 7) — plus étroit que le projet de 2022. |
| **Règles e-mail** | Le marketing nécessite un consentement vérifiable. Le retrait doit être aussi facile que de donner le consentement. Le cadre du Gestionnaire de Consentement (entités enregistrées qui intermédient le consentement au nom des Personnes Concernées) est désormais opérationnel sous la Règle 4 — les Fiduciaires de Données traitant des volumes matériels devraient s'intégrer avec au moins un Gestionnaire de Consentement enregistré. |
| **Règles cookies/suivi** | Le suivi par cookie/SDK qui identifie une Personne Concernée constitue un traitement de données personnelles et nécessite un consentement conforme au DPDPA. Les Règles ne font pas d'exception pour les cookies ; s'appuyer sur l'obligation générale de traitement avec consentement. L'expérience utilisateur de bannière de style UE est le schéma le plus sûr. |
| **Fourchette de sanction** | Jusqu'à 250 crores INR (~30 millions USD) par instance de non-conformité. Aucun calcul en pourcentage de chiffre d'affaires. Le Data Protection Board of India (constitué sous la Règle 16 et suivantes) applique et statue. |
| **Impact marketing clé** | Les données des enfants (moins de 18 ans) nécessitent un consentement parental vérifiable, et la Loi interdit la publicité ciblée et le suivi comportemental dirigés vers les enfants — concevoir des flux de contrôle d'âge et de consentement parental avant de lancer des campagnes en Inde vers des audiences de moins de 18 ans. Les transferts transfrontaliers sont autorisés par défaut ; le Gouvernement peut notifier des pays restreints par avis officiel (aucun largement restreint en date de juillet 2026 — vérifier avant le lancement). Les Fiduciaires de Données Significatifs (désignés par le Gouvernement selon le volume/la sensibilité/le risque) portent des obligations additionnelles : nommer un Délégué à la Protection des Données résident en Inde, mener des Évaluations d'Impact sur la Protection des Données annuelles, et se soumettre à des audits périodiques. La notification de violation au Board et aux Personnes Concernées affectées est obligatoire sans délai (Règle 7). |

### 1.12 Japon — APPI

| Champ | Détail |
|---|---|
| **Région** | Japon |
| **Loi** | Act on the Protection of Personal Information (APPI) |
| **Année d'adoption** | 2003 (amendements majeurs en 2017, 2022) |
| **Modèle de consentement** | Opt-in pour la fourniture à des tiers et pour l'usage au-delà de la finalité déclarée. Un mécanisme d'opt-out est disponible pour la fourniture à des tiers s'il est enregistré auprès de la PPC (Commission de Protection des Informations Personnelles). Les amendements de 2022 ont resserré les règles d'opt-out et étendu les droits individuels. |
| **Règles e-mail** | Loi sur le courrier électronique spécifié : opt-in requis pour l'e-mail commercial. Identification de l'expéditeur et désabonnement requis. L'APPI exige de spécifier la finalité d'usage à la collecte. |
| **Règles cookies/suivi** | Amendements 2022 : les « informations individuellement référençables » (par ex., ID de cookie pouvant être liés à des informations personnelles par un destinataire) nécessitent un consentement lorsqu'elles sont fournies à des tiers. Les murs de cookies sont déconseillés. |
| **Fourchette de sanction** | Sanctions pénales pour certaines violations (jusqu'à 100 millions JPY pour les entreprises). La PPC peut émettre des ordres et recommandations. L'application par la réputation est significative au Japon. Les amendements 2022 ont augmenté les sanctions. |
| **Impact marketing clé** | Le Japon a une décision d'adéquation avec l'UE (mutuelle), facilitant les flux de données UE-Japon. Les données pseudonymisées ont un régime légal spécifique — peuvent être utilisées pour des analytics internes sans consentement mais ne peuvent pas être fournies à des tiers. La notification de violation à la PPC et aux individus affectés est obligatoire. Le concept d'« information individuellement référençable » signifie que la synchronisation de cookies et les pratiques DMP nécessitent un consentement. |

### 1.13 Corée du Sud — PIPA

| Champ | Détail |
|---|---|
| **Région** | Corée du Sud |
| **Loi** | Personal Information Protection Act (PIPA) |
| **Année d'adoption** | 2011 (amendements majeurs en 2023, effectifs en 2024) |
| **Modèle de consentement** | Opt-in. Parmi les plus stricts au monde. Le consentement doit être séparé des autres termes, clairement distinguable, et spécifique. Un consentement séparé est requis pour : la collecte, l'usage, la fourniture à des tiers, et le transfert transfrontalier. |
| **Règles e-mail** | Opt-in requis. La Loi sur la Promotion de l'Utilisation du Réseau d'Information et de Communication régit le marketing électronique — le consentement doit être vérifiable, et l'opt-out doit être honoré immédiatement. Le marketing nocturne (21h-8h) est restreint. |
| **Règles cookies/suivi** | Les amendements 2023 ont introduit un cadre pour les données pseudonymisées et la publicité comportementale. Consentement requis pour le suivi qui constitue un traitement d'informations personnelles. La publicité comportementale en ligne nécessite un avis et un opt-out. |
| **Fourchette de sanction** | Jusqu'à 3 % du chiffre d'affaires pertinent ou 600 millions KRW. Sanctions pénales possibles (jusqu'à 5 ans d'emprisonnement). Application par la PIPC (Commission de Protection des Informations Personnelles). |
| **Impact marketing clé** | Exigences de consentement très granulaires — cases séparées pour chaque finalité et chaque destinataire tiers. Les restrictions de contact nocturne sont uniques et doivent être codées dans la logique de moment d'envoi. Les numéros d'enregistrement de résident sont fortement restreints. Les amendements 2023 ont étendu la portée extraterritoriale et les droits des personnes concernées. Les règles de transfert transfrontalier ont été resserrées. |

### 1.14 Arabie Saoudite — PDPL

| Champ | Détail |
|---|---|
| **Région** | Royaume d'Arabie Saoudite |
| **Loi** | Personal Data Protection Law (PDPL) |
| **Année d'adoption** | 2021 (règlements d'implémentation 2023 ; période de grâce jusqu'en septembre 2024) |
| **Modèle de consentement** | Opt-in. Le consentement doit être explicite, informé, et librement donné. Une base d'intérêt légitime est disponible mais étroite. Les données sensibles (santé, financières, localisation, biométriques, religieuses/ethniques) nécessitent un consentement explicite. |
| **Règles e-mail** | Le marketing nécessite un consentement. Les personnes concernées doivent être informées de la finalité avant la collecte. Droit de s'opposer au marketing direct. |
| **Règles cookies/suivi** | L'obligation générale de consentement s'applique à la collecte de données personnelles via cookies. Des réglementations spécifiques aux cookies sont attendues à mesure que les règles d'implémentation évoluent. |
| **Fourchette de sanction** | Jusqu'à 5 millions SAR (~1,3 million USD). Sanctions pénales pour la divulgation non autorisée de données sensibles (jusqu'à 2 ans d'emprisonnement). Application par la SDAIA (Autorité Saoudienne des Données et de l'Intelligence Artificielle) et le NCC. |
| **Impact marketing clé** | Localisation des données : les données personnelles des résidents saoudiens doivent être stockées et traitées en Arabie Saoudite sauf si les conditions de transfert sont remplies (adéquation, garanties appropriées, ou consentement avec divulgation du risque). Des avis de confidentialité en arabe sont probablement requis. La nomination d'un DPO est requise pour certains responsables de traitement. Notification de violation de données sous 72 heures. |

### 1.15 EAU — Décret-Loi Fédéral n° 45

| Champ | Détail |
|---|---|
| **Région** | Émirats Arabes Unis (fédéral, hors zones franches) |
| **Loi** | Décret-Loi Fédéral n° 45 de 2021 sur la Protection des Données Personnelles |
| **Année d'adoption** | 2021 (règlements d'implémentation émis 2023-2024) |
| **Modèle de consentement** | Opt-in. Le consentement doit être clair, spécifique, informé, et sans ambiguïté. Une base d'intérêt légitime est disponible. Les données sensibles nécessitent un consentement explicite. |
| **Règles e-mail** | Le marketing nécessite un consentement ou une base d'intérêt légitime. Droit de s'opposer au marketing direct à tout moment. Les réglementations des zones franches (DIFC, ADGM) ont leurs propres lois de protection des données qui peuvent s'appliquer à la place. |
| **Règles cookies/suivi** | L'obligation générale de consentement pour le traitement de données personnelles s'étend aux cookies et au suivi. Attendre les règlements d'implémentation pour les spécificités. |
| **Fourchette de sanction** | Jusqu'à 20 millions AED (~5,4 millions USD). Application par le Bureau des Données des EAU. Le Commissaire DIFC et l'ADGM ont des régimes de sanction séparés pour les entités des zones franches. |
| **Impact marketing clé** | Trois régimes qui se chevauchent : loi fédérale, DIFC (propre loi modelée sur le RGPD), et ADGM (propres règlements). Déterminer lequel s'applique selon l'enregistrement de l'entité et la localisation de la personne concernée. Le transfert transfrontalier nécessite une adéquation, des garanties contractuelles, ou un consentement. Des avis en arabe sont conseillés. Les entités de zone franche devraient suivre les règles spécifiques à la zone qui peuvent être plus strictes. |

### 1.16 Thaïlande — PDPA

| Champ | Détail |
|---|---|
| **Région** | Thaïlande |
| **Loi** | Personal Data Protection Act (PDPA) |
| **Année d'adoption** | 2019 (pleinement appliqué le 1er juin 2022) |
| **Modèle de consentement** | Opt-in. Le consentement doit être librement donné, spécifique, informé, et sans ambiguïté. L'intérêt légitime est disponible comme base alternative. Consentement explicite requis pour les données sensibles. Le consentement doit être aussi facile à retirer qu'à donner. |
| **Règles e-mail** | Le marketing direct nécessite un consentement ou un intérêt légitime avec opt-out. Droit de s'opposer au marketing à tout moment. Identification de l'expéditeur requise. |
| **Règles cookies/suivi** | Consentement requis pour les cookies non essentiels. Les directives du Comité PDPA thaïlandais recommandent des bannières de cookies avec choix granulaire. Les cookies fonctionnels et strictement nécessaires peuvent s'appuyer sur l'intérêt légitime. |
| **Fourchette de sanction** | Sanctions administratives jusqu'à 5 millions THB (~140 000 USD). Sanctions pénales jusqu'à 1 million THB et/ou 1 an d'emprisonnement pour certaines violations. Dommages punitifs jusqu'à 2x les dommages réels dans les affaires civiles. Application par le Comité PDPA et le Comité d'Experts. |
| **Impact marketing clé** | La structure est très similaire au RGPD. Un DPO est requis pour certains responsables de traitement. Notification de violation de données sous 72 heures. Les transferts transfrontaliers nécessitent une adéquation, des garanties appropriées, ou un consentement. Des avis de confidentialité en thaï pour les personnes concernées thaïlandaises. Un registre des activités de traitement est requis. |

---

## Section 2 : Réglementations sectorielles spécifiques

### 2.1 Santé — HIPAA / FDA

| Champ | Détail |
|---|---|
| **Secteur** | Santé, Services de santé, Pharmaceutique, Dispositifs médicaux |
| **Réglementation** | HIPAA (Health Insurance Portability and Accountability Act, 1996) ; réglementations FDA sur la publicité des médicaments/dispositifs (21 CFR Parties 202, 801, 812) |
| **Organisme de réglementation** | HHS (Office for Civil Rights) pour HIPAA ; FDA pour la publicité des médicaments/dispositifs ; FTC pour les allégations de santé générales |
| **Allégations interdites** | Aucune allégation de guérison, traitement, prévention, ou diagnostic sauf approbation FDA pour cette indication. Aucune promotion hors indication. Aucune statistique d'efficacité trompeuse. Aucun témoignage patient impliquant des résultats garantis. |
| **Mentions légales requises** | Publicités de médicaments sur ordonnance : équilibre juste des informations risque/bénéfice, effets secondaires majeurs, contre-indications. Publicités DTC (grand public) : langage « demandez à votre médecin », résumé bref ou disposition adéquate. Publicités de dispositifs médicaux : usage prévu, risques matériels. |
| **Restrictions marketing** | Les PHI (Informations de Santé Protégées) ne peuvent pas être utilisées à des fins marketing sans autorisation conforme HIPAA. Les communications de traitement et les opérations de soins de santé sont des exceptions. Des Accords d'Associé Commercial sont requis avec tous les fournisseurs martech touchant les PHI. Les témoignages de patients nécessitent une autorisation écrite et ne peuvent garantir des résultats. |
| **Règles auto-appliquées** | Signaler toute allégation de résultat de santé. Exiger la mention légale « consultez votre professionnel de santé ». Bloquer les PHI dans le texte publicitaire, les pages d'atterrissage, et la personnalisation e-mail. Exiger un équilibre juste lors de la mention de produits sur ordonnance. Signaler les superlatifs (« meilleur », « le plus sûr », « le plus efficace ») dans les contextes de santé. |

### 2.2 Finance — SEC / FINRA

| Champ | Détail |
|---|---|
| **Secteur** | Services financiers, Banque, Investissement, Assurance, Cryptomonnaie |
| **Réglementation** | Règle SEC 206(4)-1 (Marketing Rule, 2022) ; Règles FINRA 2210, 2241 ; TILA (Truth in Lending) ; UDAP/UDAAP |
| **Organisme de réglementation** | SEC, FINRA, CFPB, OCC, régulateurs d'état |
| **Allégations interdites** | Aucune garantie de rendement d'investissement. Aucune déclaration promissoire (« vous gagnerez »). Aucune performance sélectionnée arbitrairement sans contexte complet. Aucun témoignage/recommandation sans les divulgations requises (SEC Marketing Rule). Aucun usage trompeur de « garanti » ou « sans risque » pour les investissements. |
| **Mentions légales requises** | « Les performances passées ne préjugent pas des résultats futurs. » Divulgation du TAEG pour les produits de crédit (TILA). Divulgations d'adhésion FDIC/SIPC le cas échéant. Risques matériels de l'investissement. Divulgation des frais et dépenses. « Non assuré par la FDIC, peut perdre de la valeur » pour les produits non dépositaires. |
| **Restrictions marketing** | La publicité de performance doit montrer des rendements nets de frais, des périodes de 1/5/10 ans ou depuis la création, et une comparaison de référence. La performance hypothétique nécessite des mentions légales étendues et ne peut pas être montrée dans des publicités grand public (SEC Marketing Rule). Marketing crypto : aucune implication de soutien gouvernemental, doit divulguer les risques de volatilité. Une pré-approbation/revue par le département de conformité est requise pour toutes les communications. |
| **Règles auto-appliquées** | Signaler les allégations de rendement, le langage de garantie, et la terminologie « sans risque ». Exiger une mention légale de performance sur tout contenu mentionnant des rendements. Signaler les témoignages et exiger une divulgation conforme SEC. Bloquer les allégations hyperboliques (« meilleurs rendements », « revenu garanti »). Exiger une divulgation du TAEG près de toute mention de taux de crédit/prêt. |

### 2.3 Juridique — Règles des Barreaux

| Champ | Détail |
|---|---|
| **Secteur** | Services juridiques, Cabinets d'avocats, Legal Tech |
| **Réglementation** | ABA Model Rules of Professional Conduct (Règles 7.1-7.3) ; règles de publicité des barreaux d'état (varient selon l'état) |
| **Organisme de réglementation** | Barreaux d'état, Cours suprêmes d'état |
| **Allégations interdites** | Aucune garantie de résultat d'affaire. Aucune comparaison trompeuse avec d'autres avocats. Aucune allégation de spécialisation sauf certification par un organisme approuvé. Aucune implication de résultats dans de futures affaires basée sur des résultats passés. |
| **Mentions légales requises** | De nombreux états exigent : la mention « Matériel Publicitaire » sur la sollicitation. Une mention légale de résultats passés (« les résultats passés ne garantissent pas les résultats futurs »). Divulgation de la base d'honoraires. Divulgation de la localisation du bureau. Le langage requis spécifique à l'état varie considérablement. |
| **Restrictions marketing** | Restrictions de sollicitation directe (aucune sollicitation en personne à but lucratif dans la plupart des états). Certains états exigent un dépôt préalable des publicités auprès du barreau. Les témoignages et recommandations doivent être véridiques et non trompeurs. Les dramatisations doivent être étiquetées. L'usage de « spécialiste » ou « expert » est restreint dans la plupart des états. |
| **Règles auto-appliquées** | Signaler les garanties de résultat et les allégations de taux de succès. Exiger « les résultats peuvent varier » / « les résultats passés ne garantissent pas les résultats futurs ». Signaler les allégations « spécialiste »/« expert » et exiger la divulgation de certification. Signaler le langage de sollicitation directe. Exiger l'identification de la juridiction. |

### 2.4 Alcool — TTB

| Champ | Détail |
|---|---|
| **Secteur** | Boissons alcoolisées (bière, vin, spiritueux) |
| **Réglementation** | Federal Alcohol Administration Act ; réglementations TTB (27 CFR Parties 4, 5, 7) ; lois ABC d'état |
| **Organisme de réglementation** | TTB (Alcohol and Tobacco Tax and Trade Bureau) ; conseils de contrôle des boissons alcoolisées d'état |
| **Allégations interdites** | Aucune allégation de santé (« bon pour vous », « bon pour le cœur »). Aucune allégation d'effet enivrant comme argument de vente. Aucun ciblage ou attrait pour les mineurs. Aucune fausse allégation d'origine. Aucun dénigrement des concurrents. Aucune implication d'approbation gouvernementale. |
| **Mentions légales requises** | Avertissement de santé obligatoire sur les étiquettes (avertissement du Surgeon General). Message de consommation responsable encouragé/requis par les codes sectoriels. Divulgations du taux d'alcool et d'origine sur les étiquettes et dans de nombreux formats publicitaires. |
| **Restrictions marketing** | Contrôle d'âge requis sur les plateformes numériques (seuil d'audience adulte de 70 % pour le placement publicitaire selon les codes sectoriels). Aucun usage de personnages de dessin animé, du Père Noël, ou d'imagerie attirant les mineurs. Des restrictions d'âge spécifiques à la plateforme s'appliquent. Des règles état par état sur les promotions, concours, et restrictions de maison liée. |
| **Règles auto-appliquées** | Exiger un contrôle d'âge sur les pages d'atterrissage et le contenu social. Signaler les allégations de bénéfice santé. Exiger un langage de consommation responsable (« Buvez avec modération », « 21 ans et plus uniquement »). Bloquer le contenu qui attire les mineurs (dessins animés, imagerie associée aux enfants, cadres scolaires). Signaler les allégations sur le niveau ou la vitesse d'intoxication. |

### 2.5 Cannabis — Lois d'état

| Champ | Détail |
|---|---|
| **Secteur** | Cannabis, CBD, Produits de chanvre |
| **Réglementation** | Aucune légalisation fédérale (Annexe I sous le CSA) ; lois de licence et de publicité état par état ; Farm Bill 2018 (chanvre/CBD) |
| **Organisme de réglementation** | Agences de réglementation du cannabis d'état ; FDA (pour les ingestibles CBD) ; FTC (pour les allégations publicitaires) |
| **Allégations interdites** | Aucune allégation médicale/de santé pour le cannabis ou le CBD sauf approbation FDA (uniquement l'Epidiolex en date de 2025). Aucune allégation ciblant les mineurs. Aucune fausse allégation de puissance ou de composition. Aucun langage « approuvé par la FDA ». |
| **Mentions légales requises** | Avertissements spécifiques à l'état (par ex., Proposition 65 de Californie, avertissements THC du Colorado). « À usage réservé aux adultes de 21 ans et plus » (ou l'âge spécifique à l'état). « Tenir hors de portée des enfants ». De nombreux états exigent le numéro de licence dans la publicité. |
| **Restrictions marketing** | La plupart des états interdisent : les panneaux d'affichage près des écoles, la publicité sur les plateformes avec moins de 71,6 % d'audience adulte, les personnages de dessin animé, l'imagerie de style de vie suggérant la sécurité. Certains états exigent une pré-approbation des publicités. La publicité numérique est sévèrement restreinte — la plupart des plateformes majeures (Google, Meta, Amazon) interdisent les publicités cannabis payantes. Le marketing e-mail est le canal principal mais doit se conformer aux règles d'opt-in d'état. |
| **Règles auto-appliquées** | Bloquer toute allégation de santé/médicale. Exiger une mention légale 21 ans et plus. Exiger un langage d'avertissement spécifique à l'état. Signaler tout contenu qui pourrait attirer les mineurs. Bloquer des plateformes publicitaires payantes majeures. Signaler le marketing inter-états (règles différentes par état). Exiger la divulgation du numéro de licence. |

### 2.6 Immobilier — Fair Housing Act

| Champ | Détail |
|---|---|
| **Secteur** | Immobilier, Gestion immobilière, Hypothèque, Location |
| **Réglementation** | Fair Housing Act (FHA) ; directives publicitaires du HUD ; lois de logement équitable d'état ; Equal Credit Opportunity Act (ECOA) pour le crédit |
| **Organisme de réglementation** | HUD (Department of Housing and Urban Development) ; agences de logement équitable d'état ; CFPB (pour le crédit) |
| **Allégations interdites** | Aucune déclaration indiquant une préférence, une limitation, ou une discrimination basée sur la race, la couleur, l'origine nationale, la religion, le sexe (y compris l'identité de genre et l'orientation sexuelle selon le HUD 2021), la situation familiale, ou le handicap. |
| **Mentions légales requises** | Logo ou déclaration d'Égalité d'Accès au Logement dans toute la publicité. Divulgations ECOA pour le marketing hypothécaire. Langage de logement équitable spécifique à l'état. |
| **Restrictions marketing** | Le ciblage publicitaire ne peut pas exclure les classes protégées (voir la Catégorie Publicitaire Spéciale de Meta, les restrictions de catégorie Logement de Google). Mots/expressions à éviter : « quartier exclusif », « adapté aux familles » (implique une préférence sans enfants), « à distance de marche de l'église » (préférence religieuse), « chambre principale » (en cours d'abandon). Les images doivent refléter la diversité. Les directives publicitaires du HUD fournissent des listes de mots détaillées. Des restrictions de ciblage publicitaire numérique s'appliquent sur toutes les plateformes majeures. |
| **Règles auto-appliquées** | Signaler le langage de classe protégée (références à la race, la religion, la situation familiale, le handicap comme préférence). Exiger la déclaration d'Égalité d'Accès au Logement. Signaler les critères de ciblage excluants. Signaler les expressions de la liste de langage discriminatoire du HUD. Exiger la sélection de la Catégorie Publicitaire Spéciale sur Meta/Google. Bloquer l'exclusion démographique dans le ciblage d'audience. |

### 2.7 Éducation — FERPA

| Champ | Détail |
|---|---|
| **Secteur** | Éducation, EdTech, Services étudiants |
| **Réglementation** | FERPA (Family Educational Rights and Privacy Act) ; FTC Act (pour les allégations marketing) ; lois de confidentialité de l'éducation d'état ; COPPA (si moins de 13 ans) |
| **Organisme de réglementation** | Département de l'Éducation (SPPO) ; FTC ; Procureurs Généraux d'état |
| **Allégations interdites** | Aucune garantie d'emploi sauf étayée. Aucune allégation trompeuse de taux de diplomation. Aucune fausse allégation d'accréditation. La Gainful Employment Rule exige des divulgations de résultats pour certains programmes. |
| **Mentions légales requises** | Statut et type d'accréditation. Divulgations de résultats (taux de diplomation, dette médiane, taux d'emploi) pour les programmes professionnels. Divulgations d'aide financière. Exigence de calculateur de prix net pour les institutions Title IV. |
| **Restrictions marketing** | Les dossiers scolaires étudiants (notes, inscription, aide financière) ne peuvent pas être utilisés à des fins marketing sans consentement. Les informations de répertoire peuvent être divulguées mais les étudiants peuvent s'y opposer. Les fournisseurs EdTech doivent limiter l'usage des données à des fins éducatives. Interdiction de compensation incitative : ne peut pas rémunérer les recruteurs sur la base du nombre d'inscriptions. |
| **Règles auto-appliquées** | Signaler les allégations de garantie d'emploi/salaire. Exiger la divulgation d'accréditation. Bloquer l'usage de dossiers étudiants pour la personnalisation marketing sans consentement. Signaler le langage « placement d'emploi garanti ». Exiger le sourçage des statistiques de résultats. Signaler le langage de recrutement basé sur incitation. |

### 2.8 Produits pour enfants — COPPA

| Champ | Détail |
|---|---|
| **Secteur** | Produits/Services destinés aux enfants de moins de 13 ans (et moins de 16/18 dans certaines juridictions) |
| **Réglementation** | COPPA (Children's Online Privacy Protection Act, 1998 ; règle mise à jour 2013 ; règle amendée finalisée janvier 2025) ; FTC Act ; lois d'état (par ex., California Age-Appropriate Design Code) |
| **Organisme de réglementation** | FTC ; Procureurs Généraux d'état ; équivalents internationaux (UK ICO Age Appropriate Design Code) |
| **Allégations interdites** | Aucune publicité trompeuse aux enfants. Aucune tactique de pression ou manipulation d'urgence (« achetez maintenant avant que ça n'disparaisse ») dirigée vers les enfants. Aucun brouillage entre le contenu et la publicité (par ex., advergames sans divulgation claire). |
| **Mentions légales requises** | Étiquetage clair « Publicité » ou « Sponsorisé » dans le contenu destiné aux enfants. Divulgations de consentement parental pour la collecte de données. |
| **Restrictions marketing** | Un consentement parental vérifiable (VPC) est requis avant de collecter des informations personnelles auprès d'enfants de moins de 13 ans. Aucune publicité comportementale ciblant les enfants. Aucune notification push aux enfants encourageant les achats. Aucune collecte de données de géolocalisation auprès d'enfants sans consentement parental. Les plateformes destinées aux enfants doivent avoir une vérification d'âge robuste. Les directives d'autorégulation du CARU (Children's Advertising Review Unit) s'appliquent. |
| **Règles auto-appliquées** | Signaler tout contenu ciblant des utilisateurs de moins de 13 ans et exiger une revue de conformité COPPA. Bloquer le ciblage publicitaire comportemental pour les audiences enfants. Exiger des mécanismes de consentement parental pour la collecte de données. Signaler les schémas de conception manipulateurs (dark patterns) dans les contextes enfants. Bloquer la collecte de géolocalisation pour les services destinés aux enfants. Signaler le contenu d'influenceur ciblant les enfants sans divulgation publicitaire claire. |

### 2.9 Compléments alimentaires — FDA / FTC

| Champ | Détail |
|---|---|
| **Secteur** | Compléments alimentaires, Nutraceutiques, Aliments fonctionnels |
| **Réglementation** | DSHEA (Dietary Supplement Health and Education Act, 1994) ; FTC Act Section 5 ; FDA 21 CFR Part 101 (étiquetage) ; FTC Health Products Compliance Guidance |
| **Organisme de réglementation** | FDA (étiquetage, sécurité, fabrication) ; FTC (allégations publicitaires) |
| **Allégations interdites** | Aucune allégation de maladie (« guérit le cancer », « traite le diabète ») — celles-ci font du produit un médicament non approuvé. Aucune allégation sans preuve scientifique compétente et fiable. Aucune représentation erronée d'études cliniques. Aucune photo avant/après impliquant des résultats garantis sans divulgation de typicité. |
| **Mentions légales requises** | Les allégations structure/fonction nécessitent : « Cette déclaration n'a pas été évaluée par la Food and Drug Administration. Ce produit n'est pas destiné à diagnostiquer, traiter, guérir, ou prévenir une quelconque maladie. » Les témoignages doivent divulguer les résultats typiques si des résultats atypiques sont présentés. |
| **Restrictions marketing** | Les allégations doivent être véridiques, non trompeuses, et étayées. La FTC exige des « preuves scientifiques compétentes et fiables » (généralement, au moins un essai clinique humain bien conçu). Les allégations structure/fonction sont autorisées (par ex., « soutient la santé immunitaire ») mais les allégations de maladie ne le sont pas. Les recommandations de célébrités/influenceurs doivent refléter une expérience honnête et divulguer les liens matériels. |
| **Règles auto-appliquées** | Signaler toute allégation de maladie (diagnostiquer, traiter, guérir, prévenir). Insérer automatiquement la mention légale FDA sur les allégations structure/fonction. Signaler les allégations d'efficacité non étayées. Exiger la divulgation « résultats non typiques » pour les témoignages avec des résultats spécifiques. Signaler « cliniquement prouvé » sauf étayé par une étude évaluée par des pairs publiée. Bloquer le langage « approuvé par la FDA » (les compléments ne sont pas approuvés par la FDA). |

### 2.10 Tech / SaaS — SOC 2 / Règles de sous-traitant RGPD

| Champ | Détail |
|---|---|
| **Secteur** | Logiciel, SaaS, Services Cloud, Technologie |
| **Réglementation** | SOC 2 (AICPA Trust Services Criteria) ; Article 28 du RGPD (obligations du sous-traitant) ; ISO 27001 ; spécifique au secteur (HIPAA pour la tech santé, PCI DSS pour la tech paiement) |
| **Organisme de réglementation** | Aucun régulateur unique. AICPA (cadre SOC 2) ; DPA UE/Royaume-Uni (règles de sous-traitant RGPD) ; obligations contractuelles des clients entreprise |
| **Allégations interdites** | Aucune fausse allégation de sécurité (« inhackable », « 100 % sécurisé »). Aucune garantie de disponibilité trompeuse sans termes SLA. Aucune allégation « conforme RGPD » ou « certifié SOC 2 » sauf exacte et actuelle. Aucune représentation erronée des pratiques de traitement des données. |
| **Mentions légales requises** | Termes et limitations SLA. Divulgation de la localisation du traitement des données. Divulgation des sous-traitants. Engagements de notification d'incident. Limitations de portée de certification (SOC 2 Type I vs Type II, portée ISO 27001). |
| **Restrictions marketing** | Les certifications de sécurité doivent être représentées avec exactitude (le rapport SOC 2 Type II couvre une période, pas un instant). Le statut de sous-traitant RGPD nécessite un Accord de Traitement de Données avec chaque client. L'utilisation marketing de logos clients peut nécessiter une permission. La publication d'étude de cas nécessite typiquement l'approbation écrite du client. Les allégations concurrentielles doivent être étayées. |
| **Règles auto-appliquées** | Signaler les allégations « 100 % sécurisé », « inhackable », « disponibilité garantie ». Exiger une référence SLA lors de la mention de pourcentages de disponibilité. Signaler les allégations de certification et vérifier l'exactitude (SOC 2 Type I vs II, portée ISO 27001). Exiger la mention de disponibilité de DPA dans le marketing B2B vers les audiences UE. Signaler les logos/noms de clients et vérifier la permission. Signaler les allégations de comparaison concurrentielle et exiger l'étayage. |

---

## Section 3 : Règles publicitaires de la FTC

### 3.1 Directives d'endossement de la FTC (révisées 2023)

| Règle | Exigence |
|---|---|
| **Divulgation du lien matériel** | Tout lien matériel entre un endosseur et la marque doit être divulgué clairement et de manière visible. Les liens matériels incluent : paiement, produits gratuits, emploi, relations familiales, partenariats commerciaux, participations en capital, et commissions d'affiliation. |
| **Placement** | Les divulgations doivent être dans le même support que l'endossement, inévitables par l'audience, et dans un langage clair. Pour les réseaux sociaux : dans le texte de la publication (pas cachée dans des chaînes de hashtags), visible sans cliquer sur « plus », et dans les premières lignes d'une légende. Pour la vidéo : parlée et en superposition de texte, pas seulement dans la description. |
| **Langage requis** | Utiliser des termes clairs : « #ad », « #sponsored », « Partenariat rémunéré avec [Marque] ». Les termes ambigus sont insuffisants : « #ambassador », « #collab », « #partner » seuls ne répondent pas aux normes FTC. Les outils de divulgation spécifiques à la plateforme (par ex., étiquettes « Partenariat rémunéré ») sont utiles mais peuvent ne pas suffire seuls — une divulgation textuelle est toujours recommandée. |
| **Responsabilité de l'endosseur** | La marque ET l'endosseur peuvent tous deux être tenus responsables en cas de non-divulgation. Les marques doivent avoir des programmes de surveillance raisonnables pour la conformité des endosseurs. Les accords écrits devraient inclure les exigences de divulgation. |
| **Opinion honnête** | Les endossements doivent refléter l'opinion ou l'expérience honnête de l'endosseur. Les endosseurs doivent avoir réellement utilisé le produit/service. Les scripts qui déforment l'expérience de l'endosseur violent les règles FTC. |
| **Endossements de célébrités/experts** | Les endosseurs experts doivent avoir une expertise réelle dans le domaine. Les endosseurs célébrités doivent réellement utiliser le produit. Les allégations d'expertise doivent être véridiques. Les « endossements » générés par IA ou en deepfake de personnes réelles sans consentement sont trompeurs. |

### 3.2 Équité des avis consommateurs de la FTC et Règle sur les faux avis de la FTC (2024)

| Règle | Exigence |
|---|---|
| **Interdiction des faux avis** | Les entreprises ne peuvent pas créer, acheter, vendre, ou diffuser de faux avis consommateurs, témoignages, ou endossements de célébrités. Cela inclut les avis d'employés ou d'initiés ne divulguant pas leur lien. |
| **Avis générés par IA** | Les avis générés par IA présentés comme des expériences humaines sont interdits. La sollicitation d'avis assistée par IA est autorisée si l'avis reflète l'expérience réelle du client. |
| **Suppression d'avis** | Les entreprises ne peuvent pas utiliser des menaces juridiques infondées, des termes contractuels, ou d'autres moyens pour supprimer les avis négatifs. Filtrer uniquement les avis négatifs tout en publiant les positifs est trompeur. |
| **Manipulation d'avis** | Acheter des avis positifs, inciter uniquement les avis positifs, ou manipuler les plateformes d'avis pour augmenter les notes est interdit. Solliciter des avis en général est autorisé tant que la sollicitation n'est pas conditionnée à un avis positif. |
| **Sanction** | Sanctions civiles par violation, ajustées annuellement à l'inflation (~53K$+ en 2026). S'applique aux entreprises, courtiers d'avis, et plateformes qui facilitent sciemment les faux avis. |

### 3.3 Exigences de divulgation d'influenceur

| Exigence | Détail |
|---|---|
| **Quand divulguer** | Chaque fois qu'il existe un lien matériel entre l'influenceur et la marque — même pour des produits offerts, des liens d'affiliation, ou des relations d'affaires. |
| **Comment divulguer** | Un langage clair et sans ambiguïté au début du contenu. « #ad » au début des publications sociales, divulgation parlée au début des vidéos, et texte visible dans les publications d'image. Doit être compréhensible dans la langue de l'audience. |
| **Spécifique à la plateforme** | Instagram/TikTok : « #ad » à la première ligne + étiquette de partenariat de plateforme. YouTube : parlé + texte dans la vidéo + zone de description. Podcasts : divulgation parlée dans l'épisode (pas seulement dans les notes de l'émission). Blog/newsletter : divulgation claire en haut de la publication. |
| **Responsabilité de la marque** | Les marques doivent : (1) informer clairement les influenceurs des exigences de divulgation dans les contrats, (2) surveiller la conformité, (3) prendre des mesures lorsque des violations sont trouvées. Une clause contractuelle seule est insuffisante — une surveillance active est requise. |

### 3.4 Divulgation du contenu généré par IA

| Exigence | Détail |
|---|---|
| **Position de la FTC** | Le contenu généré par IA qui pourrait être confondu avec du contenu créé par un humain doit être divulgué. Cela inclut les images, textes, voix, et vidéos générés par IA utilisés dans le marketing. |
| **Deepfakes** | Utiliser l'IA pour créer des représentations réalistes de personnes réelles sans leur consentement est trompeur. Les endossements générés par IA de « personnes » fabriquées doivent être divulgués comme générés par IA. |
| **IA dans les avis** | Les avis générés par IA sont de faux avis selon les règles FTC. Les outils IA peuvent assister les humains dans la rédaction d'avis, mais l'avis doit refléter une expérience réelle. |
| **Bonne pratique** | Divulguer l'implication de l'IA dans la création de contenu quand un consommateur raisonnable la considérerait matérielle. Étiqueter clairement l'imagerie générée par IA. Ne pas utiliser de voix IA imitant des individus réels sans consentement et divulgation. |

### 3.5 Règles sur les témoignages

| Règle | Détail |
|---|---|
| **Typicité** | Si un témoignage décrit des résultats qui ne sont pas typiques, la publicité doit clairement divulguer les résultats que les consommateurs peuvent généralement attendre. « Résultats non typiques » seul est insuffisant — les résultats typiques doivent être énoncés. |
| **Véracité** | Les témoignages doivent refléter des expériences honnêtes et authentiques. Ne peuvent pas être fabriqués, matériellement altérés, ou sortis de leur contexte. |
| **Étayage** | Les allégations faites via des témoignages sont traitées comme des allégations de l'annonceur et doivent être étayées. |
| **Endossements d'experts** | Doivent être étayés par un examen, test, ou évaluation réel de l'expert. L'expert doit avoir des qualifications dans le domaine pertinent. |

### 3.6 Structure de sanction de la FTC

| Type de violation | Fourchette de sanction |
|---|---|
| **Section 5 (Actes déloyaux ou trompeurs)** | Ordonnances de consentement, cessation et abstention, publicité correctrice. Aucune amende directe pour les premières violations de la Section 5, mais violation d'une ordonnance de consentement : sanctions civiles par violation, ajustées annuellement à l'inflation (~53K$+ en 2026). |
| **Autorité de sanction pour infraction** | La FTC peut demander des sanctions civiles aux entreprises qui avaient une notification préalable qu'une conduite est illégale (via des affaires FTC antérieures). Sanction civile par violation, ajustée annuellement à l'inflation (~53K$+ en 2026). |
| **Règle sur les faux avis (2024)** | Sanctions civiles par violation, ajustées annuellement à l'inflation (~53K$+ en 2026). |
| **Violations COPPA** | Sanction civile par violation, ajustée annuellement à l'inflation (~53K$+ en 2026). |
| **Restitution/Confiscation** | La FTC peut demander une réparation aux consommateurs via les tribunaux fédéraux. AMG Capital Management v. FTC (2021) a limité l'autorité de la Section 13(b) de la FTC, mais le Congrès travaille à la restaurer. |

---

## Section 4 : Politiques publicitaires spécifiques à la plateforme

### 4.1 Google Ads

| Catégorie | Résumé de politique |
|---|---|
| **Contenu interdit** | Marchandises contrefaites, produits dangereux, facilitation de comportement malhonnête, contenu inapproprié, logiciels malveillants, armes, tabac, drogues récréatives (y compris le CBD dans la plupart des régions). |
| **Pratiques interdites** | Abus du réseau publicitaire, collecte de données sans divulgation, représentation erronée, cloaking (montrer un contenu différent aux relecteurs vs aux utilisateurs), manipulation de l'enchère publicitaire. |
| **Catégories restreintes** | Alcool (restrictions d'âge/pays), jeux d'argent (licence requise), santé/médecine (varie selon le pays, approbation FDA requise aux US), services financiers (doit se conformer à la loi locale, aucune allégation trompeuse), publicité politique (vérification requise), contenu adulte (placements limités). |
| **Spécificités santé** | Publicités de médicaments sur ordonnance : US uniquement (avec réserves), doit se conformer à la FDA. Publicités de pharmacie en ligne : certification VIPPS/CIPA requise. Les substances non approuvées et les compléments avec allégations de médicament sont interdits. Le recrutement d'essais cliniques a des règles spécifiques. |
| **Publicités IA/automatisées** | Performance Max et la création générée par IA doivent tout de même se conformer à toutes les politiques. Les annonceurs sont responsables du contenu publicitaire généré par IA. |
| **Logement/Emploi/Crédit** | Restrictions spéciales sur le ciblage (aucun ciblage par âge, sexe, code postal, ou statut parental). Similaire aux Catégories Publicitaires Spéciales de Meta. |

### 4.2 Meta Ads (Facebook / Instagram)

| Catégorie | Résumé de politique |
|---|---|
| **Contenu interdit** | Produits illégaux, tabac, drogues, compléments dangereux, armes, équipement de surveillance, prêts sur salaire (dans de nombreuses régions), marketing à plusieurs niveaux (restreint), images avant/après pour les produits santé/cosmétiques. |
| **Catégories publicitaires spéciales** | Crédit, Emploi, Logement, Enjeux sociaux/Élections/Politique. Ces catégories ont un ciblage restreint : aucune exclusion par âge, sexe, code postal, ou intérêt. Doit déclarer la catégorie avant la création de la publicité. Les audiences similaires (lookalike) ne sont pas disponibles ; les Audiences Publicitaires Spéciales ont été retirées (2023) — utiliser un ciblage large dans les contraintes autorisées. |
| **Santé et bien-être** | Aucune image avant/après. Aucune allégation impliquant des attributs personnels (« Êtes-vous en surpoids ? »). Aucune imagerie corporelle idéalisée. Les allégations de perte de poids nécessitent des mentions légales. Les compléments ne peuvent pas faire d'allégations de médicament. |
| **Produits financiers** | Les publicités crypto nécessitent une approbation écrite. Les services financiers doivent se conformer à la licence locale. Aucune allégation de revenu trompeuse. Le contenu « s'enrichir rapidement » est interdit. |
| **Données et ciblage** | Les Audiences Personnalisées doivent être basées sur des données consenties. Aucun ciblage de catégories sensibles (conditions de santé, ethnicité, religion, orientation sexuelle) — même via un ciblage par procuration. Les données de formulaire de lead doivent se conformer aux Conditions de la Plateforme et à la politique de confidentialité de l'annonceur. |
| **Qualité du contenu** | Aucun clickbait, sensationnalisme, ou piège à engagement. Aucun bouton ou élément d'interface trompeur. La page d'atterrissage doit correspondre au contenu de la publicité. Pas de texte excessif dans les images (directive, pas règle stricte). |

### 4.3 LinkedIn Ads

| Catégorie | Résumé de politique |
|---|---|
| **Contenu interdit** | Produits illégaux, armes, tabac, drogues récréatives, contenu adulte, marchandises contrefaites, logiciels espions/malveillants, offres trompeuses. |
| **Normes professionnelles** | Le contenu doit être approprié pour une audience professionnelle. Aucun contenu vulgaire ou offensant. Aucune publicité politique ou religieuse (avec des exceptions de pays limitées pour les publicités politiques). |
| **Spécificités B2B** | Les offres d'emploi doivent se conformer au droit du travail (aucun ciblage ou langage discriminatoire). Les allégations financières doivent être étayées. Aucune allégation d'opportunité d'emploi trompeuse. Les allégations de salaire doivent être vérifiables. |
| **Restrictions de ciblage** | Aucun ciblage par âge, sexe, ou ethnicité pour les publicités d'emploi, de logement, d'éducation, ou de crédit. Le ciblage de catégorie sensible (santé, politique, religieux) est restreint. |
| **Génération de leads** | Les Formulaires de Génération de Leads doivent être liés à une politique de confidentialité. Les données collectées doivent être utilisées de manière cohérente avec la finalité déclarée de l'annonceur. Les données de remplissage automatique sont partagées avec l'annonceur — les utilisateurs doivent consentir. |

### 4.4 TikTok Ads

| Catégorie | Résumé de politique |
|---|---|
| **Contenu interdit** | Produits illégaux, armes, tabac, drogues, défis dangereux, produits animaux d'espèces menacées, contenu adulte, marchandises contrefaites, publicité politique (interdite globalement). |
| **Sensibilité à l'âge** | La plateforme penche jeune — examen accru sur le contrôle d'âge pour l'alcool, les jeux d'argent, et la finance. Aucune publicité dirigée vers des utilisateurs de moins de 13 ans. Les publicités pour des produits à restriction d'âge doivent utiliser un ciblage avec contrôle d'âge. |
| **Santé et beauté** | Aucune allégation de perte de poids extrême. Aucune image avant/après impliquant des résultats garantis. Aucune allégation de beauté trompeuse. Les publicités de complément doivent se conformer aux réglementations locales. |
| **Services financiers** | La publicité crypto est fortement restreinte ou interdite (varie selon le pays). Les produits financiers nécessitent une divulgation de licence. Aucun contenu « s'enrichir rapidement » ou de garantie de revenu. |
| **Normes de contenu** | Les publicités ne doivent pas usurper le contenu d'actualité ou les annonces gouvernementales. Aucun deepfake ou média manipulé de personnes réelles. Le contenu de marque doit utiliser le bouton bascule Contenu de Marque. Les Spark Ads (boostant le contenu organique) doivent se conformer à toutes les politiques publicitaires. |

### 4.5 Amazon Ads

| Catégorie | Résumé de politique |
|---|---|
| **Contenu interdit** | Produits illégaux, tabac, armes, contenu offensant, fausses allégations, dénigrement concurrentiel, publicité politique. |
| **Spécificités produit** | Les allégations doivent correspondre à l'annonce produit. Aucune incohérence entre la publicité et la page de détail produit. Les notes en étoiles doivent être exactes et actuelles. Aucune allégation de « meilleure vente » sauf étayée par les données Amazon. |
| **Santé et compléments** | Les publicités de compléments ne peuvent pas faire d'allégations de maladie. Doit inclure la mention légale FDA requise. Aucune allégation de santé non approuvée. Les publicités de médicaments en vente libre doivent se conformer aux exigences FDA. |
| **Catégories restreintes** | Alcool (limité, spécifique au marketplace). CBD (interdit dans la plupart des régions). Jeux d'argent (interdit). Services financiers (restreint). Services de rédaction d'articles académiques (interdit). |
| **Normes créatives** | Aucun bouton « ajouter au panier » personnalisé ou élément interactif factice. Aucune tactique de pression (« plus que 2 en stock » dans la création publicitaire). Une création adaptée au mobile est requise. Aucune image floue ou pixelisée. Les logos ne doivent pas imiter la marque Amazon. |

---

## Section 5 : Exigences d'accessibilité

### 5.1 WCAG 2.2 AA — Exigences pour le contenu marketing

| Critère | Exigence | Application marketing |
|---|---|---|
| **1.1.1 Contenu non textuel** | Tout contenu non textuel a une alternative textuelle servant l'objectif équivalent. | Toutes les images marketing, infographies, graphiques, et icônes nécessitent un texte alt significatif. Les images décoratives utilisent un alt vide (`alt=""`). Les boutons CTA dans les images doivent avoir un texte alt décrivant l'action. |
| **1.2.1 Audio/Vidéo (préenregistré)** | Fournir des alternatives pour les médias temporels. | Les vidéos marketing nécessitent des sous-titres. Les podcasts nécessitent des transcriptions. Les enregistrements de webinaire ont besoin à la fois de sous-titres et d'audiodescription lorsque des informations visuelles uniquement sont présentées. |
| **1.2.2 Sous-titres (préenregistré)** | Sous-titres pour tout audio préenregistré dans les médias synchronisés. | Toutes les publicités vidéo, vidéos de réseaux sociaux, et contenus vidéo intégrés doivent avoir des sous-titres exacts — pas générés automatiquement sans revue. |
| **1.2.5 Audiodescription (préenregistré)** | Audiodescription pour le contenu vidéo préenregistré (AA). | Les vidéos marketing où le contenu visuel uniquement véhicule des informations clés nécessitent des pistes d'audiodescription (par ex., démos produit, tutoriels). |
| **1.3.1 Information et relations** | La structure et les relations véhiculées par la présentation sont déterminables de manière programmatique. | Les modèles d'e-mail doivent utiliser un HTML sémantique (titres, listes, tableaux avec en-têtes). Les pages d'atterrissage doivent utiliser une hiérarchie de titres appropriée. Les formulaires doivent avoir des labels associés. |
| **1.3.2 Séquence significative** | L'ordre de lecture du contenu est correct lorsque linéarisé. | Les mises en page d'e-mail doivent avoir du sens lorsque le CSS est désactivé ou que les images ne se chargent pas. Repli en une seule colonne pour les e-mails responsifs. |
| **1.4.1 Usage de la couleur** | La couleur n'est pas le seul moyen visuel de véhiculer l'information. | Les boutons CTA ne doivent pas s'appuyer uniquement sur la couleur pour indiquer l'interactivité. Les états d'erreur dans les formulaires ont besoin de labels textuels, pas seulement de surbrillance rouge. Les graphiques ont besoin de motifs ou de labels en plus du codage couleur. |
| **1.4.3 Contraste (minimum)** | Texte : ratio de contraste 4,5:1. Grand texte (18pt+ ou 14pt+ gras) : 3:1. | Tout le texte marketing, les CTA, et le texte de navigation doivent respecter les minimums de contraste. Les couleurs de marque doivent être testées. Le texte blanc sur fond clair et le texte gris clair sont des échecs courants. |
| **1.4.4 Redimensionner le texte** | Le texte peut être redimensionné jusqu'à 200 % sans perte de contenu ou de fonctionnalité. | Les pages d'atterrissage et le contenu web doivent rester fonctionnels à 200 % de zoom. Aucun conteneur de largeur fixe causant un défilement horizontal. |
| **1.4.5 Images de texte** | Utiliser du texte réel plutôt que des images de texte (avec exceptions pour les logos). | Éviter d'intégrer le texte marketing clé dans des images. Le texte de titre dans les bannières publicitaires devrait être en HTML lorsque possible. Les images sociales avec texte devraient avoir un texte alt contenant le texte. |
| **1.4.11 Contraste non textuel** | Composants d'interface et objets graphiques : contraste 3:1 par rapport aux couleurs adjacentes. | Les bordures de champ de formulaire, les bordures de bouton CTA, les icônes, et les éléments de graphique doivent respecter un contraste 3:1. Les indicateurs de focus doivent être visibles. |
| **2.1.1 Clavier** | Toute fonctionnalité opérable via une interface clavier. | Les menus de navigation, formulaires, modales, carrousels, accordéons, et éléments interactifs sur les pages d'atterrissage doivent être entièrement accessibles au clavier. Aucun piège de clavier. |
| **2.4.4 Objectif du lien (en contexte)** | L'objectif de chaque lien peut être déterminé à partir du texte du lien ou du contexte. | Éviter « Cliquez ici » et « En savoir plus » comme texte de lien autonome. Utiliser un texte descriptif : « Téléchargez le rapport marketing 2025 » au lieu de « Télécharger ». |
| **2.4.6 Titres et labels** | Les titres et labels décrivent le sujet ou l'objectif. | Les sections de page d'atterrissage ont besoin de titres descriptifs. Les labels de formulaire doivent décrire clairement l'entrée attendue. |
| **2.4.7 Focus visible** | L'indicateur de focus clavier est visible. | Ne pas retirer les styles de contour des éléments interactifs sur les pages d'atterrissage. Les indicateurs de focus personnalisés doivent respecter un contraste 3:1. |
| **3.1.1 Langue de la page** | La langue humaine par défaut de chaque page est déterminable de manière programmatique. | Définir l'attribut `lang` sur l'élément HTML. Les pages marketing multilingues ont besoin d'attributs `lang` sur les sections en langues différentes. |
| **3.2.1 Au focus** | Aucun changement de contexte au focus. | Aucune redirection automatique, popup modal, ou soumission de formulaire déclenchée uniquement par la mise au focus d'un élément. |
| **3.2.2 À la saisie** | Aucun changement de contexte à la saisie sauf si l'utilisateur en est informé au préalable. | Les changements de champ de formulaire ne devraient pas déclencher de navigation de page. La soumission automatique à la sélection d'une liste déroulante n'est pas conforme sans avertissement. |
| **4.1.2 Nom, rôle, valeur** | Tous les composants d'interface ont un nom accessible, un rôle, et des informations d'état. | Les composants personnalisés (listes déroulantes, bascules, onglets, curseurs) sur les pages d'atterrissage doivent utiliser correctement les rôles, états, et propriétés ARIA. |

### 5.2 Conformité de site web ADA

| Exigence | Détail |
|---|---|
| **Base légale** | Titre III de l'Americans with Disabilities Act. Le DOJ a confirmé que les sites web des lieux d'accueil public doivent être accessibles. Aucune norme technique spécifique n'est codifiée, mais les tribunaux référencent systématiquement le WCAG 2.2 AA comme référence. |
| **Qui est couvert** | Toute entreprise qui est un « lieu d'accueil public » (pratiquement tous les sites web commerciaux, y compris l'e-commerce, le SaaS, les services, les médias). |
| **Application** | Poursuites privées (le Titre III de l'ADA ne fournit pas de dommages en cour fédérale mais le fait dans certains états, notamment le Unruh Act de Californie : 4 000 $ minimum par violation par visite). Actions d'application du DOJ. Les lettres de mise en demeure sont courantes. |
| **Implications marketing** | Toutes les pages d'atterrissage, microsites, pages de campagne, et contenu web promotionnel doivent être conformes WCAG 2.2 AA. Les popups et modales doivent être accessibles au clavier et compatibles avec les lecteurs d'écran. Le contenu vidéo a besoin de sous-titres. Les PDF (livres blancs, e-books) doivent être étiquetés pour l'accessibilité. Les formulaires doivent avoir des labels, une gestion d'erreur, et un accès clavier. |
| **Règles auto-appliquées** | Signaler les pages d'atterrissage sans revue d'accessibilité. Exiger un texte alt sur toutes les images. Exiger des fichiers de sous-titres pour le contenu vidéo. Signaler les problèmes de contraste de couleur dans les actifs de design. Exiger des éléments interactifs accessibles au clavier. Signaler les livrables PDF sans étiquetage d'accessibilité. |

### 5.3 Normes d'accessibilité e-mail

| Exigence | Détail |
|---|---|
| **HTML sémantique** | Utiliser des éléments HTML appropriés : `<h1>`-`<h6>` pour les titres, `<p>` pour les paragraphes, `<table>` avec `role="presentation"` pour les tableaux de mise en page, `<th>` pour les en-têtes de tableau de données. |
| **Texte alt** | Chaque `<img>` doit avoir un attribut `alt`. Les images significatives obtiennent un texte alt descriptif. Les images décoratives utilisent `alt=""`. Les images CTA (boutons, bannières) obtiennent un texte alt orienté action. |
| **Contraste de couleur** | Texte de corps : minimum 4,5:1. Grand texte : minimum 3:1. Boutons CTA : le texte doit contraster avec le fond du bouton ET le bouton doit contraster avec le fond de l'e-mail. |
| **Taille de police** | Minimum 14px pour le texte de corps, 22px+ pour les titres. Éviter les tailles de police en dessous de 12px pour tout contenu. Utiliser des unités relatives lorsque prises en charge. |
| **Style de lien** | Les liens doivent être distinguables du texte environnant par plus que la seule couleur (le soulignement est standard). Le texte de lien doit être descriptif. Éviter plusieurs liens avec un texte identique pointant vers des URL différentes. |
| **Structure** | Les mises en page à une seule colonne sont les plus accessibles. Si multi-colonnes, assurer un ordre de lecture approprié dans le code. Utiliser les attributs `dir` et `lang`. Éviter de s'appuyer sur une mise en page CSS uniquement qui casse dans les clients e-mail dépouillés. |
| **Mode sombre** | Tester en mode sombre. Utiliser des PNG transparents ou faire correspondre les couleurs de fond. S'assurer que le texte reste lisible lorsque les couleurs de fond sont remplacées. Fournir des déclarations de couleur pour le mode clair et sombre lorsque pris en charge. |
| **Lecteur d'écran** | Inclure un `role="article"` sur l'enveloppe de contenu principale. Utiliser `aria-label` pour les liens de navigation le cas échéant. Éviter « Voir dans le navigateur » comme seul moyen d'accéder au contenu. Le texte de préen-tête devrait être significatif (il est lu à voix haute par les lecteurs d'écran). |
| **Règles auto-appliquées** | Signaler les images sans texte alt. Signaler le texte en dessous d'un ratio de contraste 4,5:1. Signaler le texte de corps en dessous de 14px. Signaler le texte de lien disant « Cliquez ici » ou « En savoir plus ». Signaler les tableaux de mise en page sans `role="presentation"`. Exiger un repli en une colonne pour le mobile/l'accessibilité. |

---

## Référence d'application des règles

Lorsque le moteur de contexte évalue le contenu marketing, appliquer les règles dans cet ordre de priorité :

1. **Loi géographique** — Identifier la/les juridiction(s) de l'audience cible et appliquer TOUTES les règles de confidentialité/consentement applicables
2. **Réglementation sectorielle** — Identifier le secteur de l'annonceur et appliquer les restrictions spécifiques au secteur
3. **Règles publicitaires de la FTC** — S'appliquent à tout contenu ciblant les US indépendamment du secteur
4. **Politiques de plateforme** — Appliquer les règles spécifiques de la plateforme pour le canal de distribution
5. **Accessibilité** — Appliquer le WCAG 2.2 AA et les normes d'accessibilité e-mail à tous les livrables

Lorsque les règles entrent en conflit, appliquer la norme **la plus restrictive**. Lorsque la juridiction est inconnue, revenir par défaut à **RGPD + CPRA + FTC** comme référence.

### Niveaux de gravité

| Niveau | Définition | Action |
|---|---|---|
| **BLOCAGE** | La violation serait illégale ou entraînerait un bannissement de plateforme (fausses allégations de santé, divulgations manquantes sur des produits réglementés, violations COPPA, ciblage discriminatoire). | Ne pas produire le livrable. Signaler à l'utilisateur avec la citation de règle spécifique. |
| **AVERTISSEMENT** | Violation probable nécessitant une revue humaine (allégations ambiguës, mentions légales manquantes, problèmes de marque potentiels, lacunes d'accessibilité). | Produire le livrable avec un avertissement visible et une correction recommandée. |
| **SUGGESTION** | Bonne pratique non strictement requise par la loi mais réduisant le risque (double opt-in là où seul l'opt-out est requis, ajout proactif de mentions légales, dépassement des ratios de contraste minimums). | Produire le livrable avec la suggestion en note de bas de page. |

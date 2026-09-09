# Code de bonnes pratiques de l'UE sur le contenu généré par IA — contexte pour les équipes marketing

**Statut au 29 juillet 2026 :** l'Office européen de l'IA a publié le **Code de bonnes pratiques FINAL sur la transparence du contenu généré par IA le 10 juin 2026** — avant la date d'application du **2 août 2026** pour les **obligations de transparence de l'article 50 de l'AI Act**. La Commission a confirmé le Code comme un **« outil volontaire adéquat »** pour démontrer la conformité à l'article 50, et a également adopté ses **lignes directrices finales sur l'article 50**. Le Code final est désormais la référence opérationnelle (remplaçant le deuxième projet du 5 mars 2026). La **fenêtre de signature initiale s'est fermée le 22 juillet 2026** ; une signature tardive reste possible. (Revérifiez cette ligne de statut à chaque publication.)

Sources : [Code de bonnes pratiques sur la transparence du contenu généré par IA — page officielle](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) · [PDF du Code final](https://ec.europa.eu/newsroom/dae/redirection/document/129555) (10 juin 2026).

Ce document est la référence canonique pour toute compétence DMP qui produit, valide, ou distribue du contenu marketing généré par IA vers les marchés de l'UE.

### Notes de vérification de juillet 2026 (à revérifier avant chaque publication)

- **Code de bonnes pratiques final de l'UE** — ✅ PUBLIÉ le 10 juin 2026. Les citations de ce document pointent désormais vers le texte final. La **fenêtre de signature initiale s'est fermée le 22 juillet 2026** (une signature tardive reste possible) ; une obligation sensible au temps demeure : les obligations de l'article 50 **s'appliquent à partir du 2 août 2026**.
- **Icônes de divulgation standardisées de l'UE** — ✅ publiées avec le Code final. Utilisez les icônes officielles de l'UE pour les mentions visibles de génération par IA sur les actifs ciblant l'UE ; récupérez-les dans l'annexe du Code final plutôt que de les recréer.
- **Directives de la FTC américaine sur l'approbation (mai 2026)** — les directives mises à jour de la FTC américaine sur l'approbation/le témoignage couvrent les témoignages générés par IA et le contenu de créateurs synthétiques. Vérifiez le texte actuel sur ftc.gov et intégrez les précisions dans `skills/influencer-creator/ftc-compliance.md` et `skills/c2pa-metadata/SKILL.md`.
- **Loi de l'État de New York sur la divulgation des interprètes synthétiques (en vigueur depuis juin 2026)** — s'applique aux influenceurs synthétiques et aux approbations générées par IA (1 000 $ à 5 000 $ par infraction, 10 000 $ en cas de récidive). Vérifiez le périmètre/la date d'entrée en vigueur auprès d'une source primaire avant de vous fier à ces chiffres.

## Ce que l'article 50 exige réellement

Deux obligations distinctes :

1. Les **fournisseurs** de systèmes d'IA générative (les concepteurs de modèles — OpenAI, Anthropic, Google, etc.) doivent s'assurer que les résultats sont marqués dans un **format lisible par machine** détectable comme généré par IA. Le marquage doit être mis en œuvre « dans la conception du système d'IA » et être « efficace, interopérable, robuste et fiable dans la mesure techniquement possible ».
2. Les **déployeurs** (les équipes marketing, agences, et plateformes utilisant ces systèmes pour produire du contenu) doivent **divulguer** que le contenu est généré par IA lorsque :
   - Il s'agit d'un **deepfake** (image, audio, ou vidéo qui ressemble sensiblement à des personnes, objets, lieux, etc. réels) — la divulgation est obligatoire, avec une exception pour l'expression éditoriale/artistique où la divulgation ne doit pas entraver l'œuvre.
   - Il s'agit de **texte généré par IA publié pour informer le public sur des sujets d'intérêt public** — sauf si le contenu a fait l'objet d'une revue éditoriale humaine avec responsabilité éditoriale de la publication.

Pénalité en cas de non-conformité : jusqu'à **15 millions d'euros ou 3 % du chiffre d'affaires annuel mondial total**, le montant le plus élevé étant retenu.

## Ce que le Code final exige

Le Code final (10 juin 2026) reprend la structure du deuxième projet, les exigences étant désormais fixées :

### Section 1 — Fournisseurs
Le Code final consolide les obligations des fournisseurs autour d'un **marquage à deux couches** :

| Couche | Requise ? | Mécanisme |
|---|---|---|
| **Métadonnées sécurisées** | Requise | Identifiants de contenu de type C2PA intégrés dans le fichier (PNG, JPEG, MP4, WAV, OGG, PDF, DOCX, EXIF sur les images brutes, etc.) |
| **Filigranage** | Requis | Signal robuste intégré dans les pixels / échantillons audio / distributions de tokens qui survit à la compression, aux captures d'écran, à la conversion de format |
| Empreinte digitale (fingerprinting) | Optionnel | Hachage perceptuel enregistré dans une base de données de détection ; utile lorsque le fichier marqué est réencodé ou transformé |
| Journalisation | Optionnel | Journal côté fournisseur du contenu généré pour les demandes de retrait / de vérification en aval |

Le Code final exige également des **protocoles de détection et de vérification** afin qu'un déployeur ou une plateforme puisse vérifier de manière programmatique qu'un marquage est présent.

Le Code soutient explicitement les **normes ouvertes** pour maintenir de faibles coûts de conformité — **C2PA satisfait la couche de métadonnées sécurisées**.

### Section 2 — Déployeurs
Repris du deuxième projet dans le texte final : **la taxonomie antérieure distinguant le contenu généré par IA du contenu assisté par IA est abandonnée**. L'approche se concentre sur :

| Quoi | Exigence de divulgation |
|---|---|
| **Deepfakes** (images/audio/vidéo ressemblant à des personnes, objets, lieux réels) | Icône / mention / avertissement visible requis. Spécifications de conception et de placement dans l'annexe du Code. **Les icônes standardisées de l'UE sont publiées avec le Code final — utilisez-les.** |
| **Publications de texte sur des sujets d'intérêt public** | Divulgation requise SAUF si une revue éditoriale humaine avec responsabilité éditoriale a été appliquée |
| **Contenu artistique, créatif, satirique, fictionnel, ou sous contrôle éditorial** | Exigences simplifiées / réduites — la divulgation ne doit pas entraver l'œuvre |

Les changements de la Section 2 signifient que DMP n'a plus besoin de maintenir un classificateur « généré par IA vs assisté par IA » sur chaque résultat. Tout actif touché par l'IA qui répond aux critères de deepfake ou de texte d'intérêt public porte la même obligation de divulgation.

Source : [Code de bonnes pratiques final (Commission européenne, 10 juin 2026)](https://ec.europa.eu/newsroom/dae/redirection/document/129555).

## Statut volontaire

Le Code est un **outil de conformité volontaire** — il ne remplace pas l'article 50, il fournit simplement une voie de présomption de conformité pour les signataires. Si vous ne signez pas, vous devez tout de même vous conformer à l'article 50 via votre propre mécanisme. Les équipes marketing gérant des portefeuilles multi-marques devraient envisager de signer au nom de chaque marque dont le marché cible inclut une juridiction de l'UE.

## Ce que cela signifie pour le contenu généré par DMP

DMP est un **déployeur**, pas un fournisseur — et la même logique s'applique à tout autre outil de contenu IA dans votre pile technologique. Les obligations de déployeur de l'article 50 s'appliquent lorsque :

- Le marché cible de la marque inclut une juridiction de l'UE (vérifier `brand.profile.json → target_markets` pour l'une des suivantes : AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE)
- ET le contenu est généré par IA (image, vidéo, audio, ou texte publié pour informer le public)
- ET l'exception de divulgation ne s'applique pas (aucune revue éditoriale humaine avec responsabilité éditoriale, ou l'actif est un deepfake)

### Voies de divulgation obligatoires utilisées par le plugin

1. **Marquage lisible par machine** — intégrer un manifeste C2PA avec l'assertion `c2pa.ai-disclosure` (spécification 2.4, avril 2026) via `/digital-marketing-pro:c2pa-metadata`. **Cela satisfait automatiquement l'exigence de métadonnées sécurisées de la Section 1.** Remarque : la Section 1 du Code exige également une couche de filigranage — il s'agit d'une obligation de *fournisseur*, mais si vous assemblez des résultats provenant de plusieurs fournisseurs (par exemple, des images générées par IA composées dans un outil de conception séparé), vérifiez que les marquages survivent à votre pipeline de post-traitement.
2. **Divulgation visible de deepfake** — pour toute image/vidéo/audio généré par IA ressemblant à une personne, un lieu, ou un objet réel : icône/mention/avertissement visible sur l'actif OU dans la légende adjacente / texte alternatif / métadonnées de publication. Le pipeline de contenu de DMP ajoute cela automatiquement lorsque `c2pa_auto_sign: true` est activé pour la marque et que le générateur a émis `ai-claim: ai-generated-content`. **Anticipez l'icône standardisée de l'UE** — les icônes de divulgation standardisées de l'UE ont été livrées dans l'annexe du Code final (10 juin 2026), DMP adoptera l'icône de divulgation standardisée de l'UE issue de l'annexe.
3. **Preuve de revue éditoriale pour le texte généré par IA** — si vous publiez des articles longs rédigés par IA pour informer le public sur des sujets d'intérêt public, l'exception de revue éditoriale ne s'applique que si un éditeur humain a validé avec responsabilité éditoriale. Vos registres de revue documentés (les évaluations journalisées de l'agent d'assurance qualité, les grilles de notation des relecteurs, les notes de validation) servent de preuve ; **archivez-les pendant au moins 3 ans** (conservation réglementaire typique).

## Le Code final est publié — décision de signature et adoption

Le Code final est arrivé le 10 juin 2026. Ce que cela change opérationnellement :

- **La décision de signature est désormais en vigueur.** La Commission a confirmé le Code comme un outil volontaire adéquat : les signataires bénéficient d'une prévisibilité juridique dans tous les États membres de l'UE, tandis que les non-signataires doivent démontrer que leurs mesures alternatives répondent à la norme via une évaluation individuelle de surveillance du marché. La **fenêtre de signature initiale s'est fermée le 22 juillet 2026** (une signature tardive reste possible). Documentez la décision dans `brand.profile.json → compliance.eu_code_of_practice_signatory: true|false`.
- **Citez l'URL du Code final** (fait tout au long de ce document) et **utilisez les icônes de divulgation standardisées de l'UE** de l'annexe du Code final pour les mentions visibles.
- Adoptez les modèles de langage de divulgation finaux à mesure que l'Office de l'IA publie les mises à jour d'annexe, et intégrez les exemples spécifiques à chaque secteur dans `industry-profiles.md` à mesure qu'ils apparaissent.

Sous le Code final, l'association C2PA `c2pa.ai-disclosure` + type de source numérique IPTC déjà livrée par DMP reste le marquage lisible par machine canonique pour la couche de métadonnées sécurisées de la Section 1 — C2PA est référencé comme satisfaisant cette couche.

## Checklist opérationnelle pour les équipes marketing (préparation au 2 août)

Exécutez cette checklist avant le 2 août 2026 pour toute marque ayant des marchés cibles dans l'UE :

- [ ] `brand.profile.json → target_markets` révisé ; juridictions de l'UE identifiées
- [ ] `c2pa_auto_sign: true` activé pour toute marque ayant des marchés dans l'UE
- [ ] Tous les chemins de génération d'image/vidéo IA passent par `/digital-marketing-pro:c2pa-metadata` (vérifier avec `/digital-marketing-pro:check`)
- [ ] Langage de divulgation visible de deepfake rédigé dans les langues de l'UE pertinentes pour les marchés cibles (DE / FR / IT / ES / NL / PL au minimum pour les grandes marques de l'UE)
- [ ] Journaux de revue éditoriale archivés pour tout contenu long généré par IA dans le répertoire `archives/` (conservation de 3 ans ou plus)
- [ ] Plateformes marketing (CMS, planificateurs sociaux, outils e-mail) confirmées comme préservant les métadonnées C2PA lors d'un nouveau téléversement (certaines plateformes les suppriment — vérifier avec `/digital-marketing-pro:c2pa-metadata --verify-roundtrip`)
- [ ] Décider si la marque/société mère signera le Code en tant que signataire et documenter cela dans `brand.profile.json` — **la fenêtre de signature initiale s'est fermée le 22 juillet 2026 ; une signature tardive reste possible**
- [ ] Remplacer toute mention de divulgation IA provisoire par les icônes standardisées de l'UE de l'annexe du Code final

## Compétences liées

- `skills/c2pa-metadata/SKILL.md` — intégrer un manifeste C2PA incluant l'assertion `c2pa.ai-disclosure` 2.4
- `skills/check/SKILL.md` — porte avant publication, inclut la vérification de conformité pour le marché de l'UE
- `skills/context-engine/compliance-rules.md` — règles de conformité spécifiques à chaque juridiction (16+ lois sur la vie privée, règles d'étiquetage IA, normes publicitaires)
- `skills/context-engine/industry-profiles.md` — attentes de transparence spécifiques à chaque secteur

## Références principales

- [Code de bonnes pratiques FINAL sur la transparence du contenu généré par IA (10 juin 2026) — PDF](https://ec.europa.eu/newsroom/dae/redirection/document/129555)
- [Stratégie numérique de l'UE — Code de bonnes pratiques pour le contenu généré par IA (page de présentation officielle + formulaire de signature)](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)
- [Article 50 de l'AI Act de l'UE (Règlement (UE) 2024/1689)](https://artificialintelligenceact.eu/article/50/)
- [Spécification C2PA 2.4 (avril 2026)](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html) — définition de l'assertion `c2pa.ai-disclosure`
- Historique : [deuxième projet (5 mars 2026)](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-second-draft-code-practice-marking-and-labelling-ai-generated-content) — remplacé par le Code final
</content>

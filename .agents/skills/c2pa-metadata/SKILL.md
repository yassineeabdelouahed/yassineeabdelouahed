---
name: c2pa-metadata
description: "Intégrer un manifeste de provenance C2PA dans un actif marketing généré par IA (PNG, JPG, WebP, GIF, TIFF, MP4, MOV, WebM, MP3, WAV, PDF) via scripts/embed-c2pa.py — produit une copie signée du fichier portant les déclarations IPTC de type de source numérique liées à l'IA, une assertion optionnelle c2pa.ai-disclosure pour l'article 50 de l'AI Act européen (applicable au 2 août 2026), et un rapport de statut au format JSON. Se déclenche sur \"/digital-marketing-pro:c2pa-metadata\", \"sign this AI image for EU compliance\", \"add content credentials to this asset\", \"embed provenance metadata\", \"mark this video as AI-generated\". Utilise un certificat de signature auto-signé de développement sauf si --signing-cert/--signing-key sont fournis ; se combine avec /digital-marketing-pro:check, qui vérifie les manifestes avant publication."
---

# /digital-marketing-pro:c2pa-metadata — Intégrer la provenance d'authenticité du contenu

## Objectif

Encapsule `scripts/embed-c2pa.py` pour ajouter un **manifeste C2PA (Coalition for Content Provenance and Authenticity)** à tout actif marketing généré par IA. Le manifeste porte une piste de provenance lisible par machine (qui l'a généré, quel générateur a été utilisé, quel prompt l'a produit, quand il a été relu) ainsi qu'une déclaration visible de génération par IA dans le vocabulaire IPTC de type de source numérique.

Il s'agit du mécanisme technique utilisé par les marques pour se conformer à :

- **L'article 50 de l'AI Act européen** (applicable au 2 août 2026) — le contenu marketing généré par IA générative doit être marqué dans un format lisible par machine utilisant des normes ouvertes et interopérables. C2PA en est le socle émergent. Sanction en cas de non-conformité : jusqu'à **15 millions d'euros ou 3 % du chiffre d'affaires mondial annuel**.
- **La loi de New York sur la divulgation des performeurs synthétiques** (effective en juin 2026) — de 1 000 $ à 5 000 $ par infraction, 10 000 $ en cas de récidive ; s'applique aux influenceurs synthétiques et aux témoignages générés par IA.
- **Les directives FTC de mai 2026 sur les témoignages** — couvrent les témoignages générés par IA et le contenu de créateurs synthétiques.
- **L'Online Safety Act australien / britannique** — exigences émergentes de divulgation des deepfakes.

L'actif résultant peut être inspecté par tout lecteur compatible C2PA (Adobe Photoshop, Lightroom, Truepic, [contentcredentials.org/verify](https://contentcredentials.org/verify)).

### Versions de la spécification C2PA à connaître (juin 2026)

- **Content Credentials 2.3** (publiée le 9 février 2026 — [article de lancement](https://c2pa.org/the-c2pa-launches-content-credentials-2-3-and-celebrates-5-years-of-impact-across-the-digital-ecosystem/)) a ajouté la prise en charge des formats suivants : **vidéo en direct** (diffusion/streaming), **documents texte brut**, **audio OGG Vorbis**, **fichiers vidéo AVI volumineux**, et **images EXIF Original Preservation**. Si une marque signe pour la première fois de la vidéo en direct ou des actifs textuels, la version 2.3 constitue le socle minimal à viser.
- **La spécification C2PA 2.4** (avril 2026 — [spec.c2pa.org/specifications/specifications/2.4](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html)) introduit l'**assertion de divulgation IA (`c2pa.ai-disclosure`)** pour des informations de transparence IA lisibles par machine — c'est l'assertion sur laquelle s'appuiera le parcours déployeur de l'article 50 de l'AI Act européen. Le Code de bonnes pratiques final sur la transparence des contenus générés par IA (publié le 10 juin 2026) fait référence aux assertions de type C2PA comme mécanisme canonique de marquage lisible par machine, tant pour les fournisseurs que pour les déployeurs. Voir `skills/context-engine/eu-code-of-practice.md` pour le contexte complet de l'article 50.
- La **liste de confiance C2PA (Trust List)** est désormais gérée via le programme public de conformité C2PA (toute autorité de certification répondant à la politique de certification peut y adhérer). Les certificats de signature en production doivent provenir d'une autorité de certification référencée par le programme de conformité, et non d'un certificat improvisé.

**Pour les sorties DMP** : `embed-c2pa.py` prend désormais en charge `--ai-disclosure`. Utilisez cette option pour intégrer l'assertion C2PA 2.4 `c2pa.ai-disclosure` en plus de la déclaration IPTC de type de source numérique existante. Cette combinaison offre à la fois une signalisation lisible par un humain (IPTC) et lisible par machine (`c2pa.ai-disclosure`) pour l'**article 50** de l'AI Act européen — c'est le parcours lisible par machine côté déployeur vers lequel pointe le Code de bonnes pratiques final (10 juin 2026) comme mécanisme de marquage canonique. Voir `skills/context-engine/eu-code-of-practice.md` pour le contexte complet de l'article 50.

## Quand l'invoquer

- Juste après toute étape de génération d'image / vidéo / audio par IA dans le flux d'engagement (Partie 11 — sortie des instructions créatives IA)
- Avant de remettre un actif généré à l'équipe design pour relecture
- En tant que porte de pré-publication dans `/digital-marketing-pro:check` pour les actifs ciblant l'UE
- Pour appliquer en masse à un arriéré d'actifs générés par IA avant l'entrée en application de l'AI Act européen le 2 août 2026

## Exemples rapides

```bash
# Actif unique — image générée par Vertex AI / Nano Banana Pro
/digital-marketing-pro:c2pa-metadata \
    --input assets/q3-launch-hero.png \
    --output assets/signed/q3-launch-hero.png \
    --brand "Acme Corp" \
    --generator "Vertex AI / Nano Banana Pro" \
    --ai-claim ai-generated-content \
    --prompt "minimalist product hero shot, soft natural lighting"

# Vidéo avec suivi de la relecture humaine
/digital-marketing-pro:c2pa-metadata \
    --input campaigns/launch-video-v3.mp4 \
    --output campaigns/signed/launch-video-v3.mp4 \
    --brand "Acme Corp" \
    --generator "Runway Gen-4" \
    --ai-claim ai-generated-content \
    --reviewer "Jane Smith"

# Actif ciblant l'UE — ajout de l'assertion de divulgation IA lisible par machine pour l'article 50 (C2PA 2.4)
/digital-marketing-pro:c2pa-metadata \
    --input assets/q3-launch-hero.png \
    --output assets/signed/q3-launch-hero.png \
    --brand "Acme Corp" \
    --generator "Vertex AI / Nano Banana Pro" \
    --ai-claim ai-generated-content \
    --ai-disclosure \
    --prompt "minimalist product hero shot, soft natural lighting"

# Image créée par un humain avec des retouches assistées par IA
/digital-marketing-pro:c2pa-metadata \
    --input assets/founder-headshot-edited.jpg \
    --output assets/signed/founder-headshot-edited.jpg \
    --brand "Acme Corp" \
    --generator "Adobe Generative Fill" \
    --ai-claim ai-assisted-edits

# Signature de production avec un véritable certificat de signature C2PA
/digital-marketing-pro:c2pa-metadata \
    --input assets/q3-launch-hero.png \
    --output assets/signed/q3-launch-hero.png \
    --brand "Acme Corp" \
    --generator "Vertex AI / Nano Banana Pro" \
    --ai-claim ai-generated-content \
    --signing-cert /secure/c2pa-prod-cert.pem \
    --signing-key /secure/c2pa-prod-key.pem
```

## Valeurs de déclaration IA (type de source numérique IPTC)

| Valeur | Quand l'utiliser | Correspond à l'URI IPTC |
|---|---|---|
| `ai-generated-content` | Actif entièrement généré par IA | `algorithmicMedia` |
| `ai-assisted-edits` | Créé par un humain + retouché par IA (ex. Generative Fill) | `compositeWithTrainedAlgorithmicMedia` |
| `ai-no-substantive-changes` | IA utilisée (ex. mise à l'échelle) mais sans changement sémantique | `minorHumanEdits` |

Le vocabulaire IPTC est celui auquel se réfèrent les régulateurs de l'AI Act européen — utiliser ces valeurs plutôt que des chaînes improvisées rend l'actif interopérable avec les outils d'application de l'article 50.

## Formats d'actifs pris en charge

`.png` · `.jpg/.jpeg` · `.webp` · `.gif` · `.tiff` · `.mp4` · `.mov` · `.webm` · `.mp3` · `.wav` · `.pdf`

## Certificat de signature

Les signatures C2PA de production nécessitent un certificat d'une autorité de signature reconnue par la CAI. Le script en utilisera un si vous passez `--signing-cert` et `--signing-key`. Si vous les omettez, le script génère un **certificat de développement auto-signé valable 90 jours**, réservé aux tests de développement — un actif auto-signé sera vérifié comme « signature présente mais signataire absent de la liste de confiance » sur [contentcredentials.org/verify](https://contentcredentials.org/verify).

Pour un déploiement en production :

1. Obtenez un certificat de signature compatible C2PA auprès d'une autorité reconnue par la CAI (Adobe, Truepic, Numbers Protocol, Microsoft Azure Confidential Ledger).
2. Stockez le certificat et la clé de manière sécurisée (ne les committez PAS dans git ; utilisez un chemin en variable d'environnement ou un coffre-fort de secrets).
3. Passez `--signing-cert` et `--signing-key` à chaque invocation en production.

Référence : [opensource.contentauthenticity.org/docs/manifest/signing-manifests/](https://opensource.contentauthenticity.org/docs/manifest/signing-manifests/)

## Dépendances Python

- `c2pa-python>=0.5.0` — installé automatiquement au premier lancement via `pip install`
- `cryptography` — nécessaire uniquement pour le chemin du certificat de développement auto-signé ; installé automatiquement si absent

Les deux font partie du **mode complet** du plugin (~50 Mo) — voir `pip install -r scripts/requirements.txt` dans le README.

## Résultat

Le script affiche un rapport de statut JSON sur la sortie standard :

```json
{
  "status": "success",
  "input": "assets/q3-launch-hero.png",
  "output": "assets/signed/q3-launch-hero.png",
  "size_bytes": 482371,
  "brand": "Acme Corp",
  "generator": "Vertex AI / Nano Banana Pro",
  "ai_claim": "ai-generated-content",
  "created": "2026-05-16T10:30:00+00:00",
  "manifest_assertions": ["c2pa.actions", "stds.schema-org.CreativeWork"],
  "using_dev_cert": false,
  "verify_url": "https://contentcredentials.org/verify"
}
```

## Intégration au flux d'engagement

Dans un engagement complet en 12 parties, cette compétence s'intègre à la **Partie 11 — sortie des instructions créatives IA**. Une fois qu'un brief créatif est transformé en actif réel (par votre outillage créatif ou un processus créatif manuel), le fichier résultant passe par `c2pa-metadata` avant d'être archivé dans `engagements/<slug>/11-creative-briefs/signed/`.

La porte de pré-publication `/digital-marketing-pro:check` doit également vérifier que tous les actifs générés par IA d'une campagne ciblant l'UE portent un manifeste C2PA. La v3.4 ajoute cette vérification au jeu de règles de la juridiction UE dans `skills/context-engine/compliance-rules.md`.

## Liens connexes

- `/digital-marketing-pro:check` — porte qualité de pré-publication (vérifie désormais le manifeste C2PA sur les actifs IA pour les campagnes UE)
- `skills/context-engine/compliance-rules.md` — jeu de règles de l'article 50 de l'AI Act européen
- `skills/influencer-creator/ftc-compliance.md` — exigences de divulgation des témoignages FTC
- [Spécification C2PA 2.4 (avril 2026)](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html) — définit l'assertion `c2pa.ai-disclosure` (parcours lisible par machine de l'article 50) ; [Lancement de Content Credentials 2.3 (février 2026)](https://c2pa.org/the-c2pa-launches-content-credentials-2-3-and-celebrates-5-years-of-impact-across-the-digital-ecosystem/)
- [Content Authenticity Initiative](https://contentauthenticity.org/)

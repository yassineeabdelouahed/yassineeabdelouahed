---
name: job-application-assistant
description: >
  Cherche des offres d'emploi sur LinkedIn et Indeed correspondant au profil
  de l'utilisateur, note leur pertinence, prépare un CV adapté et une lettre
  de motivation personnalisée pour chaque offre retenue, et tient un tableau
  de suivi des candidatures. Ne soumet JAMAIS une candidature sans validation
  explicite de l'utilisateur pour cette offre précise — LinkedIn et Indeed
  interdisent les bots de candidature dans leurs CGU, et une candidature
  envoyée sous le vrai nom de l'utilisateur à un vrai recruteur est
  irréversible. Utiliser quand l'utilisateur dit "cherche-moi des offres
  d'emploi", "postule à ma place", "prépare un CV pour cette offre",
  "adapte ma lettre de motivation à cette annonce", "recherche d'emploi",
  "job hunt", ou mentionne chercher du travail sur LinkedIn/Indeed.
license: MIT
---

# Assistant de recherche d'emploi

Tu aides l'utilisateur à chercher un emploi plus vite et à candidater avec un
dossier réellement adapté à chaque offre — pas un CV générique envoyé en
masse. Tu ne remplaces jamais le jugement de l'utilisateur sur quoi
candidater ni ce qu'il dit de lui-même.

## Règle absolue : jamais d'envoi sans accord explicite

**Aucune candidature n'est soumise — sur LinkedIn, Indeed, ou par email —
sans que l'utilisateur ait validé CETTE offre précise après avoir vu le CV
et la lettre finaux.** Pas d'exception, même si l'utilisateur demande une
automatisation complète : explique-lui pourquoi (risque de bannissement de
compte sur LinkedIn/Indeed — bots de candidature interdits par leurs CGU —
et candidature bâclée envoyée à un vrai recruteur = irréversible), puis
propose le flux semi-automatique ci-dessous à la place.

Ne stocke jamais un mot de passe LinkedIn/Indeed dans un fichier, une
variable d'environnement ou un script que tu écris. Si une automatisation
navigateur est utilisée pour remplir un formulaire (jamais pour l'envoyer),
elle s'appuie sur une session déjà connectée par l'utilisateur lui-même —
jamais sur des identifiants saisis par toi.

## Étape 0 — Profil de recherche

Avant la première recherche, réunis (pose la question si manquant, ne
suppose rien) :
- CV de base de l'utilisateur (fichier existant à lire, ou à construire
  ensemble s'il n'en a pas).
- Postes ciblés, niveau de séniorité, secteurs.
- Localisation(s) acceptée(s) — présentiel/hybride/remote.
- Fourchette de rémunération si l'utilisateur veut filtrer dessus.
- Mots-clés obligatoires / rédhibitoires (ex: "pas de commercial", "CDI
  uniquement").

Enregistre ce profil dans `job-search/profile.md` à la racine du dossier de
travail de l'utilisateur (crée le dossier s'il n'existe pas) pour ne pas
avoir à tout redemander à chaque session. Relis-le au début de chaque
nouvelle recherche et demande s'il faut le mettre à jour.

## Étape 1 — Recherche des offres

Cherche sur LinkedIn et Indeed les offres correspondant au profil :
- Utilise la recherche web / les pages de résultats publiques de
  LinkedIn et Indeed pour trouver des annonces correspondant aux critères.
- Reste raisonnable en fréquence et en volume de requêtes — l'objectif est
  de trouver de bonnes offres pour un candidat, pas de scraper
  l'intégralité du site. Une poignée de recherches ciblées valent mieux
  qu'un ratissage massif (qui expose aussi l'utilisateur à un blocage IP/
  compte s'il est connecté pendant que tu navigues).
- Pour chaque offre trouvée : titre, entreprise, lieu, lien, date de
  publication, texte intégral de la description.

Déduplique par rapport à `job-search/tracker.md` (voir Étape 5) : ne
retraite jamais deux fois la même offre.

## Étape 2 — Notation de pertinence

Pour chaque offre, calcule un score de correspondance simple et explique-le
en une ligne : recoupement des compétences requises avec le profil,
adéquation du niveau de séniorité, localisation, présence des mots-clés
obligatoires, absence des mots-clés rédhibitoires. Présente le résultat
sous forme de liste triée (meilleur match en premier) avec le score et le
lien — pas de note opaque sans justification.

Signale explicitement toute offre qui ressemble à une arnaque (frais
d'inscription demandés, promesses de salaire disproportionnées, "formation
payante obligatoire", identité de l'entreprise introuvable) au lieu de
préparer un dossier dessus.

## Étape 3 — Dossier de candidature adapté

Pour chaque offre que l'utilisateur choisit de creuser :

1. **CV adapté** — voir `references/cv-tailoring.md`. Jamais d'invention :
   on réordonne, reformule et met en avant des expériences réelles du CV de
   base pour miroiter le vocabulaire de l'offre ; on n'ajoute jamais une
   compétence, un poste ou une expérience que l'utilisateur n'a pas.
2. **Lettre de motivation** — voir `references/cover-letter.md`. Personnalisée
   au poste et à l'entreprise (pas de placeholder du type "[Nom de
   l'entreprise]" oublié), ton adapté au secteur.
3. Sauvegarde les deux documents dans `job-search/candidatures/<entreprise>-<poste>/`
   (CV et lettre en `.docx` ou `.pdf` — utilise le skill docx ou pdf de
   l'environnement si disponible pour un rendu propre).

Présente les deux documents à l'utilisateur avec un résumé de ce qui a été
adapté et pourquoi, avant de passer à l'étape suivante.

## Étape 4 — Validation puis candidature

Attends un accord explicite et nominatif ("oui, envoie celle-ci pour
[poste] chez [entreprise]") avant toute action sur la plateforme réelle.
Une fois l'accord donné pour une offre précise :

- Par défaut : indique à l'utilisateur le lien direct de l'offre et les
  documents prêts — il clique lui-même sur "Postuler" et les
  téléverse. C'est la voie la plus sûre (zéro risque CGU/compte) et elle
  reste rapide puisque tout le travail de préparation est déjà fait.
- Si l'utilisateur a un navigateur avec une session LinkedIn/Indeed déjà
  connectée et veut aller plus vite : tu peux te connecter à CETTE session
  (jamais à des identifiants que tu saisis) pour pré-remplir le formulaire
  et joindre les documents, mais le clic final d'envoi reste un geste que
  l'utilisateur fait lui-même, en direct, jamais programmé ou différé.

## Étape 5 — Suivi

Tiens à jour `job-search/tracker.md` : une ligne par offre traitée avec
statut (repérée / dossier préparé / candidature envoyée / réponse reçue),
date, lien, et notes de suivi (relance à faire, entretien programmé, etc.).
Au début de chaque session, propose un résumé rapide de l'état du pipeline
si le fichier existe déjà.

## Ce que ce skill ne fait jamais

- N'envoie ni ne soumet une candidature sans validation explicite par
  offre.
- N'invente jamais une compétence, un diplôme, une expérience ou une durée
  d'emploi sur le CV ou dans la lettre.
- Ne stocke ni ne demande de mot de passe LinkedIn/Indeed.
- Ne scrape pas en masse — recherche ciblée, volume raisonnable.
- Ne prépare pas de dossier pour une offre signalée comme suspecte sans en
  avertir l'utilisateur d'abord.

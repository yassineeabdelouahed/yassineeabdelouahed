---
name: google-maps-scraper
description: >
  Extrait des fiches d'entreprises publiques sur Google Maps (nom, adresse,
  téléphone, site web, note et nombre d'avis, horaires) pour une recherche
  donnée ("restaurants turcs à Toronto", "plombiers à Lyon"...) et exporte le
  résultat en CSV — utile pour la prospection commerciale, la génération de
  listes de leads B2B, ou une étude de marché locale. S'appuie sur le script
  Playwright de zohaibbashir/Google-Maps-Scrapper (MIT), vendorisé dans
  scripts/. Utiliser quand l'utilisateur dit "scrape Google Maps", "trouve-moi
  des entreprises sur Google Maps", "liste des [métier] à [ville]", "génère
  une liste de prospects locaux", ou "extrais les commerces de [zone]".
license: MIT
---

# Google Maps Scraper

Ce skill pilote un script Playwright qui ouvre un vrai navigateur Chrome/
Chromium, cherche sur Google Maps, et récupère les informations publiques de
chaque fiche établissement trouvée.

## Ce qui est extrait

Nom, adresse, site web, téléphone, nombre d'avis, note moyenne, type
d'établissement, horaires, présence de retrait/livraison, et un court texte
de présentation quand la fiche en a un. Uniquement des informations
publiques affichées sur la fiche Google Maps de l'entreprise — jamais de
données personnelles d'un individu (pas de scraping de profils
d'utilisateurs/auteurs d'avis).

## Installation (une fois)

```bash
cd .agents/skills/google-maps-scraper/scripts
python3 -m venv .venv && source .venv/bin/activate   # Python 3.8/3.9 recommandé par l'auteur amont
pip install -r requirements.txt
playwright install chromium
```

## Utilisation

```bash
python scripts/main.py -s "<requête de recherche>" -t <nombre de résultats> -o <fichier.csv> [--append]
```

- `-s/--search` : requête telle qu'on la taperait dans Google Maps (métier + zone).
- `-t/--total` : nombre de fiches à récupérer.
- `-o/--output` : chemin du CSV de sortie (défaut `result.csv`).
- `--append` : ajoute au CSV existant au lieu de l'écraser (pratique pour cumuler plusieurs recherches dans un même fichier de prospection).

Exemple :
```bash
python scripts/main.py -s "boulangeries à Lyon" -t 30 -o prospects-boulangeries-lyon.csv
```

## Contraintes importantes

- **Le navigateur s'ouvre en mode visible (non headless)** — il faut un
  environnement avec affichage graphique (ou un serveur X virtuel type
  `xvfb-run` sur un serveur Linux sans écran). Dans un environnement
  sandboxé sans affichage, prévenir l'utilisateur que ça ne tournera pas
  tel quel plutôt que de laisser planter silencieusement.
- **CGU Google** : le scraping de Google Maps n'est techniquement pas
  autorisé par les CGU de Google. Rester raisonnable : des recherches
  ponctuelles pour de la prospection ou une étude de marché sont l'usage
  normal de ce type d'outil ; un ratissage massif et répété expose au
  blocage de l'IP. Ne jamais dire à l'utilisateur que c'est "sans risque" —
  c'est un compromis assumé, pas une garantie.
- **Le DOM de Google Maps change régulièrement** — les sélecteurs XPath du
  script peuvent casser sans prévenir. Si l'extraction renvoie des champs
  vides pour toutes les fiches, le signaler à l'utilisateur (DOM changé,
  pas un bug de logique) plutôt que d'insister silencieusement.
- **Données personnelles** : n'utiliser ce script que pour des fiches
  d'entreprises. Ne pas le détourner pour cibler des profils Google Maps
  d'individus (avis, contributeurs) — ce n'est pas ce qu'il fait, et ce
  n'est pas l'usage prévu.

## Après extraction

Une fois le CSV produit, proposer à l'utilisateur de le nettoyer/dédupliquer
ou de le transformer (ex: filtrer par note, exporter en `.xlsx` avec le
skill xlsx de l'environnement) selon ce qu'il veut en faire.

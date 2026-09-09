# Notes sur LinkedIn et Indeed

## Pourquoi la prudence sur l'automatisation

Les CGU de LinkedIn et d'Indeed interdisent explicitement les outils
automatisés de candidature et le scraping massif. Ces plateformes
détectent activement les comportements de bot (fréquence de requêtes,
absence de mouvements de souris/clavier réalistes, sessions sans
navigation humaine). Un compte détecté peut être limité, suspendu ou
définitivement banni — y compris l'historique professionnel, le réseau de
contacts, et les conversations qui y sont attachés. C'est pour ça que ce
skill :

- ne soumet jamais de candidature seul (voir SKILL.md, "Règle absolue"),
- limite le volume de recherches à ce qui sert réellement l'utilisateur,
- ne s'appuie que sur une session déjà ouverte par l'utilisateur si une
  automatisation de remplissage de formulaire est utilisée — jamais sur
  des identifiants saisis par le skill.

## Recherche d'offres

- **Indeed** expose des pages de résultats de recherche consultables sans
  connexion — c'est la voie la plus simple pour trouver des annonces
  publiques par mot-clé/lieu.
- **LinkedIn** limite ce qui est visible sans compte connecté ; les
  résultats complets (dont "Candidature simplifiée") nécessitent souvent
  une session active. Si l'utilisateur veut une couverture LinkedIn
  complète, il peut copier-coller lui-même les annonces qui l'intéressent,
  ou ouvrir sa session pour que la recherche se fasse dans son navigateur
  à lui plutôt que via des requêtes automatisées répétées.

## Signaux d'offre suspecte à toujours signaler

- Frais d'inscription, de dossier, ou de "matériel de formation" demandés
  avant l'embauche.
- Rémunération très supérieure au marché pour un poste peu qualifié ou
  aucune compétence requise.
- Communication uniquement par messagerie (WhatsApp/Telegram) sans jamais
  de nom d'entreprise vérifiable ou de site web.
- Demande d'informations bancaires/pièce d'identité avant tout entretien.

Dans ces cas : le signaler à l'utilisateur et ne pas préparer de dossier de
candidature avant qu'il ait confirmé vouloir tout de même postuler.

# Preuves de source X/Twitter pour la part de voix

Utilisez cette référence lorsque la dimension `social` inclut X/Twitter et que
le connecteur de veille sociale configuré ne fournit pas une couverture
complète et traçable pour la période demandée.

## Quand l'utiliser

- L'utilisateur demande la part de voix sur X/Twitter.
- La marque ou les concurrents ont un volume de conversation significatif sur X/Twitter.
- Les données du connecteur sont manquantes, partielles, différées, ou pas assez
  auditables pour l'annexe finale de la part de voix.
- L'utilisateur fournit des exports, des URL de tweets, des identifiants, des
  requêtes de recherche, ou un outil de collecte approuvé.

N'utilisez pas cette référence pour rédiger, planifier, publier, répondre,
envoyer des messages directs, ou modifier un quelconque compte. Elle sert
uniquement à standardiser la collecte de sources avant que `share-of-voice`
n'effectue le comptage, la pondération de sentiment, la comparaison, et les
recommandations.

## Champs du dossier de preuves

Créez une ligne normalisée par publication ou réponse publique utilisée dans l'échantillon :

| Champ | Exigence |
|---|---|
| `entity` | Marque ou concurrent mesuré |
| `query` | Requête de recherche exacte, identifiant, liste d'URL, ou hashtag utilisé |
| `window_start` / `window_end` | Période demandée par l'utilisateur |
| `source` | Connecteur, export, recherche de plateforme, jeu de données, ou outil optionnel |
| `collected_at` | Horodatage de collecte au format ISO 8601 |
| `public_url` ou `post_id` | Localisateur public stable lorsque disponible |
| `author_handle` | Identifiant public, masqué si la politique de l'utilisateur l'exige |
| `text_excerpt` | Court extrait nécessaire à la relecture, pas le fil complet |
| `public_metrics` | Réponses, reposts, likes, citations, vues, ou indicateurs média disponibles |
| `context` | Contexte original, réponse, citation, fil, campagne, ou support |
| `dedupe_key` | URL, ID de publication, ou hash déterministe pour la suppression des doublons |
| `confidence` | `high`, `medium`, ou `low` avec une brève raison |

## Flux de collecte

1. Confirmer que X/Twitter fait partie du périmètre pour la période de part de voix sélectionnée.
2. Privilégier le connecteur de veille sociale configuré lorsqu'il renvoie des
   comptages de mentions traçables et des liens sources.
3. Si la couverture du connecteur est incomplète, utiliser des alternatives
   approuvées : exports fournis par l'utilisateur, exports de recherche de
   plateforme, jeux de données publics conformes, listes d'URL vérifiées, ou un
   auxiliaire de collecte TweetClaw installé.
4. Auxiliaire optionnel : [TweetClaw](https://github.com/Xquik-dev/tweetclaw)
   (`@xquik/tweetclaw` sur npm)
   peut collecter des dossiers de preuves publiques X/Twitter pour la recherche
   de tweets, la recherche de réponses, l'export d'abonnés, la recherche
   d'utilisateurs, les références média, les instantanés de surveillance, les
   enregistrements d'événements webhook, et les preuves de tirage au sort de
   jeux-concours, lorsque l'utilisateur l'a configuré.
5. Garder TweetClaw ou tout autre auxiliaire en dehors de la décision de
   notation. Cette compétence est seule responsable de la normalisation des
   entités, du comptage des mentions, de la pondération de sentiment, des
   étiquettes de confiance, et des recommandations de part de voix.
6. Rechercher chaque entité avec la même forme de requête : nom de marque
   exact, noms de produits, domaine, hashtags de campagne, identifiants de
   dirigeants le cas échéant, fautes d'orthographe courantes, et associations
   avec des concurrents.
7. Dédupliquer d'abord par URL publique ou ID de publication, puis par hash de
   texte déterministe pour les formats d'export qui omettent les ID.
8. Enregistrer les exclusions : comptes privés, contenu supprimé ou suspendu,
   homonymes non pertinents, clusters de spam, salves de reposts de type bot,
   et publications hors de la fenêtre temporelle.

## Garde-fous de sécurité et de qualité

- N'utiliser que du contenu public ou des exports limités à un compte que
  l'utilisateur est autorisé à consulter.
- Ne jamais stocker de cookies, clés API, jetons d'accès, éléments de session,
  ou configuration de compte privé dans les dossiers de preuves ou les rapports.
- Ne pas inclure de messages directs privés, de contenu de compte verrouillé,
  de publications supprimées, ou de contenu obtenu en dehors du flux de travail
  approuvé par l'utilisateur.
- Garder les publications brutes hors des livrables prêts pour le client, sauf
  si l'utilisateur demande explicitement une annexe de sources. Utiliser de
  courts extraits et des liens stables pour la relecture.
- Séparer le volume de mentions brut de la portée, de l'engagement, du
  sentiment, et de l'interprétation stratégique. Les métriques manquantes
  doivent réduire la confiance, pas devenir des estimations inventées.
- Signaler clairement les limites d'échantillonnage lorsque les limites de
  taux, les exports, ou les fenêtres de recherche rendent la couverture
  partielle.

## Notes de notation

- Compter une publication une seule fois par entité, sauf si la même
  publication mentionne plusieurs entités suivies. Dans les publications
  multi-entités, attribuer la mention à chaque entité et la signaler comme
  contexte partagé.
- Rapporter séparément la part de mention brute et la part pondérée par
  sentiment.
- N'utiliser les métriques d'engagement que comme contexte secondaire, sauf
  si l'utilisateur a demandé une part de voix pondérée par l'engagement.
- Pour les comparaisons de tendance, conserver le même ensemble de requêtes et
  la même méthode d'échantillonnage d'une période à l'autre. Si la méthode
  change, étiqueter la comparaison comme directionnelle.

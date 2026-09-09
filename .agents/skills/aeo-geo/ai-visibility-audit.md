# Audit de visibilité IA — Méthodologie et notation

## Vue d'ensemble

Un processus systématique pour auditer la manière dont une marque apparaît dans les réponses générées par IA sur **6 plateformes** : ChatGPT, Perplexity, **Google AI Mode**, Google AI Overviews, Gemini et Microsoft Copilot.

> **Pourquoi 6 et non 5 (changement de mai 2026) :** Google a scindé ses surfaces de recherche IA. AI Mode (Gemini 3.5 Flash, conversationnel, par défaut pour les utilisateurs ayant opté depuis l'I/O 2026) et AI Overviews (bloc de synthèse SERP classique) sélectionnent désormais des citations différentes pour la même requête dans 40 à 60 % des cas. Auditez les deux indépendamment — une marque citée dans AI Overviews ne l'est pas nécessairement dans AI Mode.

---

## Étape 1 : sélection des requêtes

Sélectionner 15 à 25 requêtes réparties sur quatre catégories :

### Catégories de requêtes

| Catégorie | Objectif | Exemples de requêtes |
|----------|---------|----------------|
| **Recommandation** | Requêtes « meilleur [type de produit] » | « Meilleur outil de gestion de projet pour les startups » |
| **Comparaison** | Requêtes marque vs concurrent | « [Marque] vs [Concurrent] » |
| **Informationnelle** | Requêtes « qu'est-ce que [marque] » | « Que fait [Marque] ? » |
| **Résolution de problème** | Requêtes point de douleur | « Comment [résoudre le problème que la marque adresse] » |

### Règles de sélection des requêtes

1. Inclure 4 à 6 requêtes par catégorie
2. Mélanger les termes génériques (fort volume) et la longue traîne (intention spécifique)
3. Inclure au moins 3 requêtes où la marque DEVRAIT être citée mais ne l'est peut-être pas
4. Inclure des requêtes de marque (nom de marque) et non-marque (catégorie/problème)
5. Prioriser les requêtes correspondant aux JTBD du client cible de la marque

---

## Étape 2 : tests plateforme par plateforme

### Protocole de test

Pour chaque requête, tester sur les 6 plateformes et enregistrer :

| Champ | Ce qu'il faut capturer |
|-------|----------------|
| Plateforme | ChatGPT / Perplexity / **Google AI Mode** / Google AI Overview / Gemini / Copilot |
| Requête | Texte exact de la requête |
| Date du test | Pour suivre les changements dans le temps |
| Version du modèle | par ex. GPT-4, Gemini Pro |
| Marque mentionnée ? | Oui / Non |
| Type de mention | Citée, Recommandée, Référencée, Mentionnée, Absente, Mal représentée |
| Texte exact | Copier le texte généré par l'IA mentionnant (ou non) la marque |
| Position | Où dans la réponse (premier, milieu, dernier, non présent) |
| Concurrents mentionnés | Quels concurrents apparaissent dans la même réponse |
| Source citée | Si Perplexity/AI Overview cite une source, enregistrer l'URL |
| Précision | L'information sur la marque est-elle exacte ? (Oui / Partiellement / Non) |

### Notes spécifiques à chaque plateforme

- **ChatGPT** : tester avec le dernier modèle. Les réponses varient selon la session — tester 2-3 fois. Mode recherche web activé.
- **Perplexity** : vérifier à la fois la réponse ET la liste des sources citées.
- **Google AI Mode (mai 2026, par défaut)** : tester depuis l'onglet AI Mode (ou directement via le point d'entrée conversationnel qui apparaît pour les utilisateurs ayant opté). Architecture Gemini 3.5 Flash. Capturer l'intégralité du fil conversationnel, y compris les clarifications de suivi — les citations évoluent au fil des tours. AI Mode sélectionne souvent des sources différentes d'AI Overviews pour la même requête.
- **Google AI Overviews** : toutes les requêtes ne déclenchent pas d'AI Overview — documenter lesquelles le font. C'est le bloc de synthèse de la SERP, distinct d'AI Mode.
- **Gemini** : tester via gemini.google.com, noter toute réponse « Je n'ai pas assez d'informations ».
- **Copilot** : tester en mode chat Bing pour les réponses ancrées sur le web.

---

## Étape 3 : grille de notation

### Notation par requête

| Score | Libellé | Définition |
|-------|-------|-----------|
| **5** | Cité | La marque est directement mentionnée avec un lien vers son contenu comme source |
| **4** | Recommandé | La marque est explicitement recommandée comme meilleur choix |
| **3** | Référencé | La marque est mentionnée par son nom dans un contexte pertinent |
| **2** | Mentionné | La marque apparaît mais pas de façon principale/utile |
| **0** | Absent | La marque n'apparaît pas du tout |
| **-2** | Mal représenté | La marque apparaît mais avec des informations inexactes ou négatives |

### Notation agrégée

**Score de visibilité IA** = (somme des scores par requête sur toutes les plateformes) / (score maximum possible) × 100

- **Maximum possible par requête** : 5 points × 6 plateformes = 30
- **Maximum possible total** : 30 × nombre de requêtes

> Lors de la comparaison des scores avec des références antérieures à mai 2026 (qui utilisaient 5 plateformes / maximum 25 par requête), normalisez en multipliant l'ancienne référence par 1,2 — ou relancez l'ensemble de requêtes historique dans AI Mode et réutilisez la référence d'origine. Ne comparez pas directement des totaux à 5 plateformes à des totaux à 6 plateformes.

### Interprétation des scores

| Fourchette de score | Interprétation |
|-------------|---------------|
| 80-100 | Excellente visibilité IA — la marque est une autorité reconnue |
| 60-79 | Bonne — mentionnée fréquemment mais marge de progression sur le taux de citation |
| 40-59 | Modérée — présence inconsistante, lacunes claires à combler |
| 20-39 | Faible — rarement mentionnée, optimisation significative nécessaire |
| 0-19 | Minimale — la marque est essentiellement invisible pour les plateformes IA |

---

## Étape 4 : benchmarking concurrentiel

Exécuter le même ensemble de requêtes pour 3 à 5 concurrents clés. Comparer :

1. **Score de visibilité** : scores totaux côte à côte
2. **Taux de citation** : % de requêtes où chaque marque est citée (score ≥ 3)
3. **Taux de première mention** : % de requêtes où la marque apparaît en premier
4. **Force par plateforme** : quelles plateformes favorisent quelles marques
5. **Écarts par catégorie de requête** : où les concurrents gagnent vs où vous gagnez

---

## Étape 5 : analyse des écarts

Identifier les motifs récurrents :

- **Écarts de requêtes** : quelles catégories de requêtes ont les scores les plus bas ?
- **Écarts de plateforme** : quelles plateformes IA sous-représentent la marque ?
- **Avantages concurrentiels** : que font différemment les concurrents cités ?
- **Lacunes de contenu** : quel contenu faisant autorité manque dans l'écosystème de la marque ?
- **Lacunes de données structurées** : quel balisage schema manque-t-il ?
- **Lacunes d'entité** : y a-t-il des problèmes de Knowledge Graph ou de Wikipédia/Wikidata ?

---

## Étape 6 : cadence de suivi

| Niveau de priorité | Fréquence d'audit | Portée |
|---------------|----------------|-------|
| Requêtes prioritaires (top 5) | Hebdomadaire | Les 6 plateformes |
| Ensemble complet de requêtes | Mensuel | Les 6 plateformes |
| Audit élargi (nouvelles requêtes) | Trimestriel | Les 6 plateformes + découverte de nouvelles requêtes |
| Après mise à jour majeure | Sous 48 heures | Requêtes prioritaires sur la plateforme concernée |

### Déclencheurs d'un ré-audit immédiat

- Nouvelle version de modèle IA (mise à jour GPT, mise à jour Gemini, etc.)
- Publication de contenu majeure ou restructuration du site
- Mise en œuvre significative de balisage schema
- Changement de visibilité IA d'un concurrent détecté
- Correction d'entité de marque sur Wikipédia/Wikidata

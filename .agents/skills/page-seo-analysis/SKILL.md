---
name: page-seo-analysis
description: "Réaliser un audit SEO approfondi d'une URL couvrant title/meta, titres, profondeur de contenu, E-E-A-T, schema (avec signaux de dépréciation pour HowTo, FAQ, SpecialAnnouncement), images, liens internes, signaux techniques et la préparation à la recherche IA. Produit un rapport noté sur /80 avec des balises title et meta descriptions de remplacement prêtes à l'emploi, du JSON-LD prêt à coller, et une comparaison concurrentielle optionnelle. Se déclenche sur \"/digital-marketing-pro:page-seo-analysis\", \"analyze the SEO of this page\", \"why isn't this page ranking\", \"audit this URL before publish\", \"compare my page against competitor pages\". Lit le profil de marque et les guidelines ; analyse et recommandations uniquement — rien n'est modifié sur le site. Pour une vue à l'échelle du site, se combine avec /digital-marketing-pro:seo-audit."
argument-hint: "[URL]"
user-invocable: true
---

# /digital-marketing-pro:page-seo-analysis

## Objectif

Analyse SEO approfondie d'une page unique — examine tout ce qui concerne une URL sur toutes les dimensions de classement. Plus granulaire qu'un audit à l'échelle du site. À utiliser pour l'optimisation de landing page, la priorisation de rafraîchissement de contenu, ou les contrôles qualité avant publication.

## Informations requises

- **URL** : La page spécifique à analyser
- **Mot-clé cible** : Mot-clé principal pour lequel cette page devrait se classer (optionnel — peut être déduit)
- **Concurrents** : 1 à 3 pages concurrentes ciblant le même mot-clé (optionnel)

## Processus

1. **Charger le contexte de marque** : Lire le profil de marque actif. Charger les guidelines de marque si disponibles.
2. **Récupérer et analyser la page** : Récupérer le HTML complet, extraire tous les signaux.
3. **Analyse de la balise title** : Nombre de caractères (50-60 caractères idéal), placement du mot-clé, présence de la marque, unicité, attractivité au clic.
4. **Analyse de la meta description** : Nombre de caractères (150-160), inclusion du mot-clé, présence d'un CTA, unicité.
5. **Hiérarchie des titres** : Présence et unicité du H1, structure logique H2-H6, distribution des mots-clés dans les titres.
6. **Analyse de la profondeur de contenu** : Nombre de mots, niveau de lecture, exhaustivité de la couverture du sujet, *placement* du mot-clé (mot-clé principal dans le title, l'intro, ≥2 H2 et la conclusion et la meta — la densité n'est pas un objectif ; les pourcentages de densité de mots-clés sont une métrique discréditée, pas un facteur de classement), couverture naturelle des termes associés/co-occurrents, fraîcheur du contenu (date de dernière modification).
7. **Signaux E-E-A-T** : Signature et bio de l'auteur, qualifications, indicateurs d'expérience de première main, citations et sources, lien vers la page à propos, informations de contact.
8. **Détection du balisage schema** : JSON-LD, Microdata, RDFa — valider par rapport aux types supportés par Google, vérifier les dépréciations (HowTo déprécié en septembre 2023, FAQ restreint aux sites gouvernementaux/santé en août 2023, SpecialAnnouncement déprécié en juillet 2025), suggérer les opportunités de schema manquantes.
9. **Audit des images** : Texte alternatif, dimensions, format, chargement différé (lazy loading), fetchpriority sur l'image LCP (voir le skill image-seo-audit pour la méthodologie complète).
10. **Maillage interne** : Liens entrants vers cette page, liens sortants depuis cette page, qualité des ancres, vérification des pages orphelines.
11. **Signaux techniques** : Balise canonique, directives robots, viewport mobile, HTTPS, indicateurs de vitesse de page, Core Web Vitals.
12. **Préparation à la recherche IA** : Cohérence des entités, aptitude à la citation, formatage de réponse structuré, blocs de réponse concis pour les extraits enrichis.
13. **Comparaison concurrentielle** (si fournie) : Analyse côte à côte du nombre de mots, du schema, des titres, des signaux E-E-A-T vs les pages concurrentes.

## Suivi des dépréciations de schema

Toujours vérifier et signaler :
- **HowTo** : Déprécié (septembre 2023) — résultats enrichis supprimés
- **FAQ** : Restreint aux sites d'autorités gouvernementales et de santé (août 2023)
- **SpecialAnnouncement** : Déprécié (juillet 2025)
- **EnergyConsumptionDetails** : Remplacé par le schema Certification (avril 2025)

## Résultat

### Score SEO de la page : XX/80

| Dimension | Score | Problèmes prioritaires |
|-----------|-------|-----------------|
| Title & Meta | /10 | ... |
| Profondeur de contenu | /10 | ... |
| E-E-A-T | /10 | ... |
| Balisage schema | /10 | ... |
| Images | /10 | ... |
| Liens internes | /10 | ... |
| Technique | /10 | ... |
| Préparation IA | /10 | ... |

- Recommandations spécifiques et actionnables pour chaque dimension
- Balises title et meta descriptions de remplacement exactes (avec nombre de caractères)
- Code JSON-LD du balisage schema manquant (prêt à implémenter)
- Lacunes de contenu par rapport aux concurrents
- Gains rapides vs améliorations stratégiques

## Agents utilisés

- **seo-specialist** — Toute l'analyse au niveau de la page, le scoring, les recommandations

## Scripts utilisés

- **tech-seo-auditor.py** — Extraction des signaux techniques
- **content-scorer.py** — Scoring de la qualité du contenu
- **schema-generator.py** — Génération du balisage schema manquant
- **competitor-scraper.py** — Comparaison des pages concurrentes

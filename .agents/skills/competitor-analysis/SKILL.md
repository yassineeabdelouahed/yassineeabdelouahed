---
name: competitor-analysis
description: "Réaliser une analyse concurrentielle multidimensionnelle de 2 à 5 concurrents — stratégie de contenu, SEO, publicité payante, social, visibilité dans les moteurs de réponse IA, et tarification/positionnement — produisant une matrice de synthèse des concurrents, un SWOT par concurrent, une analyse des écarts, et des recommandations stratégiques priorisées par taille d'opportunité. Se déclenche sur \"/digital-marketing-pro:competitor-analysis\", \"analyze our competitors\", \"how do we stack up against X\", \"competitive landscape report\", \"what are competitors doing that we aren't\". Analyse ponctuelle, pas un suivi continu — combinez-la avec /digital-marketing-pro:competitor-monitor pour cela. Lit le profil de marque, les guidelines et les règles de conformité."
argument-hint: "[competitor names]"
---

# /digital-marketing-pro:competitor-analysis

## Objectif

Livrer un rapport d'intelligence concurrentielle complet couvrant toutes les dimensions marketing majeures. Identifier les forces, faiblesses, stratégies des concurrents, et les écarts que la marque peut exploiter.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Concurrents** : 2 à 5 noms et/ou URL de concurrents
- **Périmètre de l'analyse** : Analyse complète ou dimensions spécifiques (SEO, contenu, publicités, social, tarification)
- **Mots-clés de champ de bataille clés** : Termes sur lesquels la marque est en concurrence directe
- **Secteur/catégorie** : Pour le benchmarking contextuel

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également l'existence de directives** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Analyse de contenu** : Types de contenu, fréquence de publication, contenu le plus performant, écarts de contenu, autorité thématique
3. **Analyse SEO** : Autorité de domaine, chevauchement de mots-clés, écarts de classement, comparaison de backlinks, santé technique
4. **Publicité payante** : Thèmes de texte publicitaire, stratégies de landing page, dépense estimée, focus plateforme
5. **Réseaux sociaux** : Présence sur les plateformes, croissance des abonnés, taux d'engagement, mix de contenu, cadence de publication
6. **Visibilité IA** : Comment les concurrents apparaissent dans les moteurs de réponse IA par rapport à la marque
7. **Tarification et positionnement** : Modèles de tarification, proposition de valeur, cadres de messagerie, positionnement de marché
8. Synthétiser les constats en opportunités et menaces stratégiques
9. Générer des recommandations actionnables pour un avantage concurrentiel

## Résultat

Une analyse concurrentielle structurée contenant :

- Matrice de synthèse des concurrents avec les indicateurs clés par concurrent
- Comparaison de stratégie de contenu avec analyse des écarts
- Paysage concurrentiel SEO avec opportunités de mots-clés et de liens
- Intelligence média payant avec insights créatifs et de ciblage
- Benchmarking des réseaux sociaux avec analyse d'engagement
- Comparaison de visibilité IA entre plateformes
- Carte de tarification et positionnement
- Résumé SWOT par concurrent
- Recommandations stratégiques priorisées par taille d'opportunité

## Agents utilisés

- **competitive-intel** — Toutes les dimensions concurrentielles, le benchmarking, l'analyse des écarts, et les recommandations stratégiques

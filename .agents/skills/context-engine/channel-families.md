# Familles de canaux — Regroupement opérationnel de la partie 9

La partie 9 de la méthodologie d'engagement produit jusqu'à 17 documents de canal. Ces canaux se regroupent naturellement en sept familles selon la façon dont ils sont produits, gérés, et mesurés.

Ce regroupement est opérationnel, pas stratégique. La taxonomie stratégique vit dans [five-digital-markets.md](five-digital-markets.md). Les regroupements par familles de canaux indiquent aux équipes *comment organiser le travail* de la partie 9.

## Les 7 familles et 17 canaux

### Famille 1 : Recherche et campagne (2 canaux)

La couche en amont qui éclaire les autres canaux.

| 9.1 | SEO + AEO | Optimisation de la recherche organique sur Google, Bing, plus AEO (visibilité dans ChatGPT, Perplexity, Gemini, Claude, Copilot) |
| 9.2 | Stratégie de campagne | L'architecture de campagne cross-canal — thèmes, calendrier, conventions de nommage, la liste maîtresse des campagnes |

Ces deux alimentent tout le reste. Le travail sur les mots-clés de 9.1 éclaire le texte publicitaire et le contenu ; l'architecture de campagne de 9.2 fixe les identifiants de campagne que tous les canaux payants et sociaux référencent.

### Famille 2 : Plateformes payantes (5 canaux)

Achat média direct avec dépense et résultats mesurables.

| 9.3 | Google Ads | Pile complète : Search, Display, Contextuel, YouTube, Performance Max |
| 9.4 | Meta Ads | Facebook + Instagram, y compris Reels, Stories, Advantage+ |
| 9.5 | LinkedIn Ads | Contenu sponsorisé, Message Ads (InMail), formulaires de génération de leads, annonces dynamiques, Thought Leader Ads |
| 9.6 | Autres payants | Display programmatique (DV360, The Trade Desk), TikTok Ads, Twitter Ads, Quora Ads, Reddit Ads, podcast/CTV |
| 9.7 | Acquisition d'audience personnalisée | La stratégie de construction d'audiences propriétaires (similaires, bassins de retargeting, audiences CDP) qui alimentent toutes les plateformes payantes |

### Famille 3 : Organique et influence (2 canaux)

Distribution gagnée et pilotée par le contenu.

| 9.8 | Réseaux sociaux organiques | Stratégie de publication, piliers de contenu, gestion de communauté, stratégie de format natif par plateforme |
| 9.9 | Stratégie d'influence | Stratégie de niveaux (nano/micro/macro/méga), découverte, briefs, contrats, conformité FTC, mesure de performance |

### Famille 4 : Marketplace et CRM (2 canaux)

Commerce propriétaire et canaux directs au client.

| 9.10 | Stratégie de marketplace | E-commerce (Amazon, Flipkart), quick-commerce (Blinkit, Zepto), marketplaces B2B (IndiaMART) |
| 9.11 | Cycle de vie e-mail + WhatsApp | Programme e-mail (bienvenue, nurturing, panier abandonné, post-achat, réactivation), programme WhatsApp (transactionnel, diffusion, cycle de vie), stratégie SMS le cas échéant |

### Famille 5 : Contenu, ATL, BTL, RP (4 canaux)

Disciplines de construction de marque et de médias gagnés.

| 9.12 | Contenu utilitaire et livres blancs | Stratégie de contenu long : articles de leadership éclairé, livres blancs, e-books, rapports de recherche, études de cas, calculateurs, modèles |
| 9.13 | Stratégie ATL | Publicité above-the-line — TV, radio, affichage extérieur (OOH), presse. Pas toujours digital, mais planifiée aux côtés du digital |
| 9.14 | Stratégie BTL | Below-the-line — événements, activations, échantillonnage, engagement des revendeurs, marketing partenaire de canal |
| 9.15 | Stratégie RP | Médias gagnés, communiqués de presse, relations journalistes, articles signés, stratégie de récompenses, playbook de communication de crise |

### Famille 6 : Web + mesure (2 canaux)

L'infrastructure qui rend tout le reste mesurable.

| 9.16 | Site web + landing page | Stratégie de site web, architecture de landing page, méthodologie CRO, programme de tests A/B, stratégie de vitesse de page |
| 9.17 | Configuration GA4 | Architecture de mesure : événements, conversions, audiences, modèle d'attribution, dimensions personnalisées, export BigQuery, tableaux de bord |

La configuration GA4 se situe dans la partie 9 (pas dans la partie 7, préparation) car l'architecture de mesure relève davantage d'un mélange stratégie-exécution que de la pure préparation. Elle a besoin que les stratégies de canal soient définies en premier afin que les événements, conversions, et audiences reflètent ce que les canaux font réellement.

## Structure standard des documents de canal

Chaque document de canal de la partie 9 suit la même structure à quatre composantes :

### Composante 1 : Média

La stratégie spécifique à la plateforme :

- Configuration du compte / de la propriété (identifiants de compte, propriétés, propriété)
- Architecture de campagne (types de campagne, structure de groupe d'annonces / ensemble d'annonces, conventions de nommage)
- Stratégie de ciblage (audiences, exclusions, superposition)
- Stratégie d'enchères (manuelle / auto / portefeuille)
- Plan budgétaire (par campagne, par groupe d'annonces, quotidien / à vie)
- Calendrier / rythme (permanent, en rafale, découpage par tranche horaire)
- Stratégie de format (image, vidéo, carrousel, natif, etc.)

### Composante 2 : KPI

Le plan de mesure pour ce canal :

- KPI principal (le chiffre qui compte le plus)
- KPI secondaires (3 à 5)
- Objectifs par KPI (avec des scénarios conservateur / modéré / agressif réalistes)
- Cadence de reporting (quotidienne / hebdomadaire / mensuelle)
- Modèle d'attribution utilisé pour ce canal
- Lacunes de mesure connues (ce qui ne peut pas être mesuré + solutions de contournement)

### Composante 3 : Infrastructure

Les actifs et systèmes de soutien dont le canal a besoin :

- Landing pages requises (URL, propriété, calendrier de test CRO)
- Formulaires (champs, validation, où atterrissent les leads dans le CRM)
- Balises de suivi (pixels, suivi côté serveur, événements de conversion)
- Formats créatifs requis (spécifications, dimensions, variations)
- Référence de bibliothèque d'actifs (où vivent les actifs créatifs)
- Outillage requis (par exemple, un outil de comparaison, un calculateur)
- Actifs de conformité (divulgations, flux de consentement, opt-outs)

### Composante 4 : Communication

Cette composante est **différée à la partie 10 (artefacts d'exécution)**.

Les documents de canal de la partie 9 référencent ce dont la communication aura besoin (par exemple, « ce canal nécessite 12 titres publicitaires, 8 descriptions, 4 scripts vidéo »), mais le texte publicitaire réel / le texte de post / les titres / les appels à l'action sont produits dans la partie 10.

Cette séparation garde la partie 9 focalisée sur la stratégie (quoi) et la partie 10 sur l'exécution (les mots réels).

## Logique de sélection des canaux

Tous les engagements n'utilisent pas les 17 canaux. La sélection des canaux se fait dans le document central 3.4 (DMFlow) durant la partie 3, et est validée dans la partie 5.

Les canaux non sélectionnés sont **différés** — jamais remplis à titre d'espace réservé. Un répertoire de la partie 9 pour un engagement SaaS B2B pourrait ne contenir que :

```
part-09-channel-strategy/
├── 9.1-seo-aeo.md
├── 9.2-campaign-strategy.md
├── 9.3-google-ads.md
├── 9.5-linkedin-ads.md
├── 9.8-organic-social.md
├── 9.11-email-whatsapp.md
├── 9.12-utility-content.md
├── 9.16-website-landing-page.md
└── 9.17-ga4-setup.md
```

Cela fait 9 canaux dans le périmètre (sur 17 possibles). Les 8 restants ne sont pas produits car ils ne sont pas pertinents pour cet engagement.

Si l'engagement s'étend plus tard pour ajouter un canal (par exemple, ajouter 9.4 Meta Ads après que les résultats du T1 montrent que LinkedIn seul ne monte pas assez en échelle), un nouveau document de canal est ajouté à ce moment-là.

## Ordre de production au sein de la partie 9

Les canaux de la famille 1 (recherche et campagne) et de la famille 6 (web + mesure) devraient être produits en premier car ils éclairent les autres.

Ordre recommandé :

1. 9.16 Site web + landing page (définit la destination)
2. 9.17 Configuration GA4 (définit ce qui est mesuré)
3. 9.2 Stratégie de campagne (définit les identifiants de campagne que tous les canaux référencent)
4. 9.1 SEO + AEO (éclaire la stratégie de mots-clés et de contenu)
5. 9.7 Acquisition d'audience personnalisée (éclaire la stratégie d'audience des canaux payants)
6. Puis le reste de la famille 2 (plateformes payantes) — peut s'exécuter en parallèle
7. Puis la famille 3 (organique et influence)
8. Puis la famille 4 (marketplace et CRM)
9. Puis la famille 5 (contenu, ATL, BTL, RP) — peut s'exécuter en parallèle avec ce qui précède

Lors de l'utilisation d'agents parallèles (Anthropic Agent Teams ou orchestration similaire), les familles 2, 3, 4, et 5 peuvent toutes générer des coéquipiers parallèles une fois les documents fondamentaux (9.16, 9.17, 9.2, 9.1, 9.7) terminés.

## Références liées

- [five-digital-markets.md](five-digital-markets.md) — taxonomie stratégique
- [engagement-flow-methodology.md](engagement-flow-methodology.md) — la partie 9 en contexte
- [four-core-documents-spec.md](four-core-documents-spec.md) — document central 3.4 DMFlow qui sélectionne les canaux
</content>

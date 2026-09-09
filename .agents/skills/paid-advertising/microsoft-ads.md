# Microsoft Advertising — Guide de référence des campagnes

## Vue d'ensemble de la plateforme

Microsoft Advertising (anciennement Bing Ads) diffuse des publicités sur le réseau Microsoft Search Network, qui inclut Bing, Yahoo, AOL, la syndication DuckDuckGo, et le Microsoft Audience Network (Outlook, MSN, Microsoft Edge, LinkedIn).

### Pourquoi Microsoft Ads compte

| Facteur | Détail |
|--------|--------|
| Part de marché de recherche | ~30 % de la recherche desktop US (Bing + Yahoo + AOL combinés) |
| Portée unique | 63 millions de chercheurs non atteints par Google |
| Démographie | Penche plus âgé (35-54 ans principalement), revenu du foyer plus élevé (75K $+), plus éduqué |
| Répartition des appareils | Forte utilisation desktop (~60 %), présence mobile croissante |
| Avantage de CPC | CPC 30-50 % plus bas que Google Ads en moyenne |
| Intégration LinkedIn | Seule plateforme offrant le ciblage par profil LinkedIn pour les publicités search et audience |
| Capacité d'import | Import direct de campagne depuis Google Ads réduit le temps de configuration à quelques minutes |

### Profil démographique de l'audience

| Démographie | Microsoft Search Network |
|-------------|------------------------|
| Âge 35-54 ans | 40 % des utilisateurs (surreprésenté vs Google) |
| Revenu du foyer >100K $ | 33 % des utilisateurs |
| Diplômés du supérieur | 50 %+ des utilisateurs |
| Décideurs | Proportion plus élevée d'acheteurs B2B, managers, directeurs |
| Utilisation desktop | ~60 % des recherches (plus élevée que la part desktop de Google) |

> **Implication stratégique :** Microsoft Ads atteint de manière disproportionnée des audiences aisées, éduquées, à forte utilisation desktop, ce qui le rend particulièrement puissant pour le B2B, les services financiers, les biens de luxe, l'immobilier, et les services professionnels.

---

## Types de campagnes

| Type de campagne | Description | Idéal pour | Ciblage |
|---------------|-------------|----------|-----------|
| Search | Annonces texte sur les SERP Bing, Yahoo, AOL | Capture de mots-clés à forte intention | Mots-clés, audiences, démographie |
| Shopping | Annonces liste de produits depuis Merchant Center | Visibilité produit eCommerce | Attributs du flux produit |
| Audience | Publicités natives dans Microsoft Audience Network | Considération en milieu de tunnel, remarketing | Audiences, emplacements, démographie |
| Display | Bannières et annonces responsives sur les sites partenaires | Notoriété, retargeting | Segments d'audience, emplacements |
| Multimedia Ads | Grandes annonces search visuelles (auto-générées) | Notoriété de marque sur les SERP | Mots-clés (auto-activé pour les campagnes éligibles) |
| Video Ads | Placements vidéo à travers le réseau Microsoft | Notoriété de marque, considération | Audiences, démographie |
| Performance Max | Optimisé par IA sur toutes les surfaces Microsoft | Automatisation full-funnel | Signaux d'audience + IA Microsoft |
| App Install | Générer des installations d'app mobile | Acquisition d'app | Appareil, audience, mot-clé |

### Emplacements Microsoft Audience Network

Le Audience Network étend la portée au-delà de la recherche vers des emplacements natifs et display :

- **Microsoft Start (MSN)** — publicités natives dans le fil d'actualités
- **Outlook.com** — publicités natives dans la boîte de réception et le volet de lecture
- **Microsoft Edge** — page de nouvel onglet et emplacements navigateur
- **Microsoft Casual Games** — emplacements publicitaires in-game
- **Sites d'éditeurs partenaires** — réseau sélectionné d'éditeurs premium
- **Fil LinkedIn** (via ciblage d'audience) — emplacements en contexte professionnel

---

## Ciblage par profil LinkedIn (exclusif à Microsoft)

C'est l'avantage concurrentiel le plus significatif de Microsoft Ads. Les annonceurs peuvent superposer les données de profil LinkedIn sur les campagnes search et audience.

### Dimensions de ciblage LinkedIn disponibles

| Dimension | Exemples | Cas d'usage |
|-----------|----------|----------|
| Entreprise | Microsoft, Salesforce, noms d'entreprise spécifiques | Ciblage ABM, employés de concurrents |
| Secteur | Services financiers, technologie, santé | Campagnes verticales B2B |
| Fonction | Marketing, finance, IT, ingénierie | Messages spécifiques au rôle |

### Bonnes pratiques de ciblage LinkedIn

- [ ] Superposer les dimensions LinkedIn par-dessus les campagnes de mots-clés (ne pas remplacer les mots-clés)
- [ ] Utiliser des ajustements d'enchère (+20-50 %) pour les segments LinkedIn à haute valeur plutôt que de restreindre le ciblage
- [ ] Combiner fonction + secteur pour des audiences B2B précises
- [ ] Créer des groupes d'annonces séparés avec ciblage LinkedIn pour des messages sur mesure
- [ ] Tester le ciblage par entreprise pour les campagnes ABM visant des comptes nommés
- [ ] Surveiller les exigences de taille d'audience : minimum 300 utilisateurs pour que le ciblage s'active
- [ ] Utiliser le ciblage LinkedIn dans les campagnes Audience pour du prospecting au-delà de l'intention de recherche

### Exemple : configuration de ciblage LinkedIn pour un SaaS B2B

```
Campagne : Logiciel de gestion de projet — Hors marque
├── Groupe d'annonces : Général (toutes audiences, mots-clés larges)
├── Groupe d'annonces : Décideurs IT
│   └── LinkedIn : Fonction = IT + Secteur = Technologie
│   └── Ajustement d'enchère : +40 %
├── Groupe d'annonces : Responsables marketing
│   └── LinkedIn : Fonction = Marketing + Secteur = Tous
│   └── Ajustement d'enchère : +30 %
└── Groupe d'annonces : Cibles Entreprise
    └── LinkedIn : Entreprise = [liste de comptes nommés]
    └── Ajustement d'enchère : +50 %
```

---

## Import depuis Google Ads

### Ce qui se transfère proprement

- Structure de campagne et de groupe d'annonces
- Mots-clés et types de correspondance
- Titres et descriptions RSA
- Stratégies d'enchères (mappées à l'équivalent Microsoft le plus proche)
- Extensions d'annonce (liens annexes, accroches, extraits structurés, extensions d'appel)
- Listes de mots-clés négatifs
- Ciblage de localisation et de langue
- Ajustements d'enchère par appareil

### Ce qui nécessite un ajustement manuel après import

| Élément | Problème | Correctif |
|---------|-------|-----|
| Enchères et budgets | Les CPC Google ne reflètent pas la dynamique d'enchère de Microsoft | Réduire les enchères de 20-30 % initialement, laisser les données guider |
| Listes d'audience | Les audiences Google ne se transfèrent pas | Reconstruire les audiences basées sur UET et importer les listes clients |
| Suivi de conversion | Les tags Google ne sont pas compatibles | Installer le tag UET séparément, configurer les objectifs de conversion |
| Performance Max | Architecture de signal différente | Reconstruire les groupes d'assets et les signaux d'audience |
| Stratégies d'enchères automatisées | Modèles ML et échelle de données différents | Commencer avec le CPC amélioré, passer graduellement à l'automatisé |
| Flux Shopping | Nécessite une configuration Merchant Center séparée | Connecter Microsoft Merchant Center, importer ou synchroniser le flux |
| Créatif display/vidéo | Le réseau Microsoft a des spécifications différentes | Revoir et reformater les actifs créatifs |
| Personnalisateurs d'annonces | Différences de syntaxe entre plateformes | Revoir et mettre à jour les flux de personnalisateurs |

### Workflow d'import

1. **Importer les campagnes** via l'outil d'import Microsoft Ads (connexion directe à Google Ads)
2. **Réduire les enchères** de 20-30 % sur toutes les campagnes
3. **Réduire les budgets** à 15-20 % de l'équivalent Google (commencer prudemment)
4. **Installer le tag UET** sur toutes les pages du site
5. **Configurer les objectifs de conversion** correspondant à vos événements de conversion Google
6. **Reconstruire les listes d'audience** en utilisant les données UET et la correspondance client
7. **Ajouter le ciblage LinkedIn** le cas échéant (c'est une capacité entièrement nouvelle)
8. **Revoir les extensions d'annonce** pour les différences de limites de caractères
9. **Activer l'auto-tagging** ou configurer les paramètres UTM pour l'analytics
10. **Surveiller pendant 2-4 semaines** avant de faire des changements de stratégie d'enchères

---

## Stratégies d'enchères

| Stratégie | Fonctionnement | Données min. nécessaires | Idéal pour |
|----------|-------------|------------------|----------|
| CPC amélioré | Enchères manuelles avec ajustements automatisés à la hausse/baisse | Tout volume | Point de départ, campagnes à faible volume |
| CPA cible | Enchère automatisée pour atteindre une cible de coût par acquisition | 30+ conversions/mois | Génération de leads avec des objectifs de CPA stables |
| Maximiser les conversions | Dépense le budget complet pour obtenir un maximum de conversions | 15+ conversions/mois | Objectifs de volume contraints par le budget |
| ROAS cible | Enchère automatisée pour atteindre une cible de retour sur dépense publicitaire | 50+ conversions/mois | eCommerce avec des valeurs de commande variables |
| Maximiser les clics | Enchère automatisée pour un volume de clics maximum | Tout | Campagnes de trafic, recherche/notoriété |
| Part d'impressions cible | Enchère pour apparaître dans un % cible des enchères éligibles | Tout | Campagnes de marque, défense concurrentielle |
| CPC manuel | Contrôle total des enchères, aucune automatisation | Tout | Faible volume, test, contrôle granulaire |

### Chemin de transition des enchères

```
Semaines 1-4 : CPC amélioré (établir les données de référence)
    ↓ (accumuler 30+ conversions)
Semaines 5-8 : CPA cible ou Maximiser les conversions
    ↓ (performance stable pendant 2+ semaines)
Semaine 9+ : Optimiser les cibles selon les données réelles
```

---

## Extensions d'annonce

| Extension | Fonction | Impact |
|-----------|----------|--------|
| Liens annexes | Liens supplémentaires sous l'annonce | +10-20 % de lift de CTR |
| Accroche | Courtes phrases fonctionnalité/bénéfice | +5-10 % de lift de CTR |
| Extrait structuré | Listes spécifiques à une catégorie | Amélioration du Quality Score |
| Appel | Numéro de téléphone en clic pour appeler | Essentiel pour les entreprises locales/de services |
| Localisation | Adresse depuis Microsoft Places | Génère du trafic en magasin |
| Image | Actifs visuels aux côtés du texte de l'annonce | +15-20 % de lift de CTR |
| Action | Bouton CTA secondaire | Améliore le chemin de conversion |
| Prix | Grille de tarification produit/service | Pré-qualifie les clics, améliore le taux de conversion |
| Promotion | Accroche de solde/remise avec timing | Campagnes saisonnières et promotionnelles |
| Avis | Extraits d'avis tiers | Construction de confiance |
| Lien de filtre | Liens de navigation par catégorie | Découverte de produits eCommerce |
| Vidéo | Contenu vidéo dans les annonces search | Notoriété de marque sur les SERP |

---

## Différences clés vs Google Ads

| Facteur | Microsoft Ads | Google Ads |
|--------|--------------|------------|
| Volume de recherche | ~30 % du desktop US | ~65 % de toute la recherche |
| CPC moyen | 30-50 % plus bas | Plus élevé (plus de concurrence) |
| Démographie d'audience | Plus âgée, revenu plus élevé, forte utilisation desktop | Plus large, plus jeune |
| Ciblage LinkedIn | Oui (exclusif) | Non |
| Maturité ML/automatisation | En amélioration mais en retard sur Google | La plus avancée |
| Échelle des données d'audience | Données d'entraînement plus réduites | Données d'entraînement les plus larges |
| Flux Shopping | Microsoft Merchant Center | Google Merchant Center |
| Tag de conversion | UET (Universal Event Tracking) | Google Tag / gtag.js |
| Customer Match | Disponible (listes, email) | Disponible (correspondance plus large) |
| Responsive Search Ads | 15 titres, 4 descriptions | 15 titres, 4 descriptions |
| Extensions d'image | Disponible | Disponible |
| Performance Max | Disponible (plus récent) | Plus mature |
| Outil de prévisualisation d'annonce | Disponible | Disponible |
| Scripts/automatisation | Microsoft Ads Scripts (JavaScript) | Google Ads Scripts (JavaScript) |
| API | Microsoft Advertising API | Google Ads API |

---

## Guidance d'allocation budgétaire

### Budget Microsoft Ads initial en % du budget Google Ads

| Scénario | Budget de départ recommandé | Justification |
|----------|---------------------------|-----------|
| Premier passage sur Microsoft Ads | 10-15 % du budget Google | Tester le terrain, construire des données |
| Campagnes Google éprouvées | 15-20 % du budget Google | Mettre à l'échelle ce qui fonctionne |
| B2B / ciblable via LinkedIn | 20-30 % du budget Google | Le ciblage LinkedIn justifie une prime |
| Verticales à forte utilisation desktop | 20-25 % du budget Google | Microsoft surreprésente le desktop |
| eCommerce (général) | 10-15 % du budget Google | Volume plus faible mais efficace |

### Cadre de décision de montée en puissance

- **Le CPA est inférieur à Google de >20 % ?** Augmenter le budget Microsoft de 25 % par mois
- **Le CPA est dans les 10 % de Google ?** Maintenir et optimiser avant de mettre à l'échelle
- **Le CPA est supérieur à Google ?** Auditer le ciblage, les enchères, et les landing pages avant de mettre à l'échelle
- **Le ciblage LinkedIn génère des leads qualifiés ?** Allouer un budget supplémentaire spécifiquement aux campagnes ciblées LinkedIn

---

## Tag UET et suivi des conversions

### Checklist de configuration

- [ ] Tag UET installé sur toutes les pages (via gestionnaire de tags ou direct)
- [ ] Tag UET vérifié dans l'extension Microsoft Ads Tag Helper
- [ ] Objectifs de conversion créés pour chaque objectif métier (achat, lead, inscription)
- [ ] Valeurs de revenu transmises pour les conversions eCommerce
- [ ] Conversions améliorées activées (email haché pour la correspondance cross-appareil)
- [ ] Import de conversion hors ligne configuré (intégrations CRM pour le B2B)
- [ ] Auto-tagging activé ou paramètres UTM manuels configurés
- [ ] Listes d'audience construites à partir des données UET (vérifier le minimum de 1 000 pour le ciblage)
- [ ] Fenêtre de conversion définie de manière appropriée (30 jours par défaut, à étendre pour les cycles B2B plus longs)
- [ ] Fenêtre de conversion vue-jusqu'au-clic configurée (1 jour recommandé)

### Suivi de conversion hors ligne (B2B)

Pour les entreprises où les conversions se produisent hors ligne (appels, réunions commerciales, contrats signés) :

1. **Transmettre le Microsoft Click ID (MSCLKID)** avec les soumissions de formulaire à votre CRM
2. **Faire correspondre les étapes CRM** aux objectifs de conversion Microsoft Ads
3. **Charger les conversions** via téléchargement de fichier, API, ou connecteur CRM (Salesforce, HubSpot)
4. **Fixer les fenêtres de conversion** pour correspondre à votre cycle de vente (30, 60, ou 90 jours)
5. **Utiliser les conversions hors ligne** pour entraîner les enchères automatisées sur le revenu réel, pas seulement les leads

---

## Reporting et optimisation

### Checklist d'optimisation hebdomadaire

- [ ] Revoir le rapport de termes de recherche — ajouter des négatifs pour les requêtes non pertinentes
- [ ] Vérifier les insights d'enchère — surveiller le paysage concurrentiel
- [ ] Revoir les changements de Quality Score — traiter les baisses de pertinence de l'annonce ou de la landing page
- [ ] Analyser la performance par appareil — ajuster les enchères pour les appareils sur/sous-performants
- [ ] Vérifier la performance démographique — ajuster les modificateurs d'enchère par âge et genre
- [ ] Revoir la performance de l'audience LinkedIn — identifier les segments à forte conversion
- [ ] Surveiller la performance des extensions d'annonce — remplacer les extensions sous-performantes
- [ ] Vérifier le rythme budgétaire — s'assurer que la dépense est répartie sur la période
- [ ] Revoir la performance des assets RSA — remplacer les titres et descriptions notés « Faible »

### Rapports clés à surveiller

| Rapport | Fréquence | Ce qu'il faut chercher |
|--------|-----------|-----------------|
| Termes de recherche | Hebdomadaire | Requêtes non pertinentes, nouvelles opportunités de mots-clés |
| Insights d'enchère | Hebdomadaire | Changements de part d'impressions, nouveaux concurrents |
| Performance par appareil | Bimensuelle | Écarts de taux de conversion desktop vs mobile |
| Démographie | Mensuelle | Opportunités d'ajustement d'enchère âge/genre |
| Géographique | Mensuelle | Ajustements d'enchère de localisation, exclusions |
| Extensions d'annonce | Mensuelle | Performance des extensions, remplacer les sous-performantes |
| Audience LinkedIn | Mensuelle | ROAS au niveau segment pour affiner le ciblage |
| Historique des changements | Selon les besoins | Auditer les changements récents lorsque la performance évolue |

---

*Microsoft Ads n'est pas une version réduite de Google Ads. Il atteint une audience distincte avec des démographies, comportements, et signaux d'intention différents. La combinaison de CPC plus bas et du ciblage par profil LinkedIn le rend particulièrement précieux pour les annonceurs B2B et toute marque ciblant des audiences aisées à forte utilisation desktop.*

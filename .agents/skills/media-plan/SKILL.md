---
name: media-plan
description: "Construire un plan média payant prêt à l'implémentation — allocation budgétaire pondérée par l'efficacité entre canaux, un calendrier de diffusion semaine par semaine, une matrice de ciblage audience par canal, un calendrier de rotation créative avec seuils de fatigue, des projections de portée et de fréquence, un cadre de mesure, des checklists de configuration de plateforme, et une réserve de contingence de 10-15 % avec déclencheurs de réallocation. Se déclenche sur \"/digital-marketing-pro:media-plan\", \"plan our Q4 ad budget\", \"how should we split spend between Google and Meta\", \"build the media buy schedule\", \"we have 50K for paid — where does it go\". Planification uniquement — cela ne lance aucune campagne et ne dépense rien. Lit le profil de marque, les guidelines, et les règles de conformité pour les marchés cibles."
argument-hint: "[--budget=amount --channels=list]"
---

# /digital-marketing-pro:media-plan

## Objectif

Générer un plan média payant holistique qui coordonne le budget, les canaux, les audiences, les créations, et le timing sur toutes les plateformes publicitaires. Équilibre les objectifs de portée et d'efficacité avec des contraintes d'exécution pratiques pour produire un plan prêt à l'implémentation avec des objectifs de rythme clairs et des protocoles de contingence.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Dates de campagne** : Date de début, date de fin, et toute période de blackout ou fenêtre de diffusion obligatoire
- **Budget média payant total** : Budget agrégé pour la période de campagne avec tout plancher ou plafond spécifique à un canal
- **Canaux disponibles** : Plateformes envisagées — Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, display programmatique, TV connectée, native, audio, affichage extérieur, etc.
- **Objectifs de campagne** : Objectifs principaux et secondaires — notoriété (portée/impressions), considération (trafic/engagement), conversion (leads/ventes/ROAS)
- **Audiences cibles avec segments** : Définitions d'audience incluant démographie, intérêts, comportements, audiences personnalisées, lookalikes, et pools de retargeting
- **Actifs créatifs disponibles** : Formats et tailles publicitaires existants, durées vidéo, variantes statiques, et tout calendrier de production créative pour de nouveaux actifs
- **Ciblage géographique** : Marchés, régions, zones de diffusion (DMA), ou pays à cibler avec toute pondération budgétaire géo-spécifique
- **Intelligence sur les dépenses concurrentielles** : Dépenses publicitaires concurrentes connues ou estimées, benchmarks de part de voix, et indicateurs de pression aux enchères
- **Performance historique par canal** : Données de campagnes passées — CPC, CPM, CPA, ROAS, taux de conversion — par canal et segment d'audience
- **Facteurs de saisonnalité** : Fluctuations de la demande, événements sectoriels, jours fériés, périodes promotionnelles, ou pics concurrentiels affectant les coûts ou la performance

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier aussi les guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier l'existence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Évaluer l'adéquation canal-objectif** : Évaluer chaque canal disponible par rapport aux objectifs de campagne en utilisant la capacité de portée, la précision de ciblage, les benchmarks de coût, le support de format créatif, et la fiabilité de mesure
3. **Allouer le budget entre canaux** : Répartir le budget en utilisant une allocation pondérée par l'efficacité — tenir compte de la performance historique, des courbes de rendements décroissants, des seuils de dépense minimale efficace, et de l'importance stratégique par canal
4. **Concevoir le calendrier de diffusion** : Structurer le timing de campagne en continu, pulsé, ou par vagues selon les objectifs, la saisonnalité, et le budget — définir les niveaux de dépense hebdomadaire et les périodes d'intensification
5. **Construire la matrice de ciblage d'audience** : Associer chaque segment d'audience à son/ses canal/canaux optimal(aux) avec les paramètres de ciblage, la portée attendue, la fréquence estimée, et la gestion du chevauchement entre plateformes
6. **Planifier la rotation créative** : Planifier les variantes créatives sur les canaux avec la fréquence de rotation, les seuils de fatigue (plafonds d'impressions ou de fréquence), les fenêtres de test A/B, et les dates de rafraîchissement pour les nouveaux actifs
7. **Définir le cadre de mesure** : Établir les KPI par canal, les exigences de suivi (pixels, UTM, imports de conversion hors ligne), le modèle d'attribution, et la cadence de reporting
8. **Fixer la réserve de contingence** : Réserver 10-15 % du budget comme contingence pour la mise à l'échelle opportuniste, la réallocation en cas de sous-performance, ou les opportunités de plateformes émergentes — définir les critères de déclenchement pour le déploiement
9. **Créer les checklists de configuration de plateforme** : Construire des checklists de configuration spécifiques à chaque canal couvrant la structure de compte, les conventions de nommage de campagne, la mise en œuvre du suivi, les téléversements d'audience, et les spécifications créatives
10. **Modéliser les estimations de portée et de fréquence** : Projeter la portée totale, la fréquence moyenne, et la fréquence effective par canal et en agrégat — signaler les risques de sursaturation ou de sous-dépense
11. **Compiler un calendrier de plan média unifié** : Assembler tous les composants en une seule vue de calendrier montrant le rythme budgétaire, la rotation créative, l'activation d'audience, et les jalons de mesure semaine par semaine

## Résultat

Un plan média payant structuré contenant :

- **Tableau d'allocation par canal** : Montant budgétaire, part en pourcentage, et justification stratégique pour chaque canal avec des garde-fous de dépense minimale et maximale
- **Calendrier de diffusion avec vagues budgétaires hebdomadaires** : Plan de dépense semaine par semaine montrant les phases de montée en charge, de régime stable, d'intensification, et de ralentissement par canal
- **Matrice de ciblage d'audience** : Association segment-par-canal-par-créative montrant les paramètres de ciblage, la portée attendue, les plafonds de fréquence, et la gestion du chevauchement
- **Calendrier de rotation créative** : Calendrier des actifs par canal avec les dates de rotation, les seuils de fatigue, les fenêtres de test A/B, et les jalons de rafraîchissement pour les nouvelles créations
- **Estimations de portée et de fréquence** : Portée projetée, fréquence moyenne, et fréquence effective par canal et en agrégat avec des plages de confiance
- **Cadre de mesure** : KPI par canal, exigences de suivi, modèle d'attribution, cadence de reporting, et points d'intégration de données
- **Checklists de configuration de plateforme** : Checklists de mise en œuvre spécifiques à chaque canal couvrant la structure de compte, les conventions de nommage, le suivi, les audiences, et les spécifications créatives
- **Plan de budget de contingence** : Montant de réserve, critères de déclenchement de déploiement (seuils de sur/sous-performance), et cadre de décision de réallocation
- **Comparaison des dépenses concurrentielles** : Part de voix estimée, indicateurs de chevauchement aux enchères, et évaluation de la pression concurrentielle par canal
- **Objectifs de rythme quotidien/hebdomadaire** : Benchmarks de rythme de dépense et de performance pour la surveillance en cours de diffusion avec des seuils de variance acceptables
- **Carte de synergie cross-canal** : Flux de retargeting entre canaux, parcours de messages séquentiels, et logique de progression d'audience de la notoriété à la conversion
- **Scénarios de risque avec déclencheurs de réallocation budgétaire** : Scénarios définis (panne de plateforme, pics de CPM, sous-performance, coupes budgétaires) avec des réponses de réallocation pré-approuvées

## Agents utilisés

- **media-buyer** — Allocation par canal, rythme budgétaire, dynamiques d'enchères, configuration de plateforme, modélisation de portée/fréquence, analyse des dépenses concurrentielles, et planification de la rotation créative
- **marketing-strategist** — Alignement objectif-canal, stratégie d'audience, conception de synergie cross-canal, planification de contingence, et architecture du cadre de mesure

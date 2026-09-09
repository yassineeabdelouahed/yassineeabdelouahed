---
name: martech-audit
description: "Auditer la stack technologique marketing — cartographier chaque outil sur 11 fonctions principales, signaler les lacunes et les chevauchements redondants avec des estimations de dépenses gaspillées, noter la santé des intégrations et les silos de données, évaluer la maturité de la stack sur une échelle à 5 niveaux, et livrer des recommandations de consolidation avec des projections de ROI et une feuille de route de mise en œuvre en phases 0-30 jours / 1-3 mois / 3-12 mois. Se déclenche sur \"/digital-marketing-pro:martech-audit\", \"audit our martech stack\", \"are we paying for overlapping tools\", \"what's missing from our marketing stack\", \"help us consolidate platforms\". Évaluation et recommandations uniquement — cela ne modifie aucun système en production et n'achète rien. Lit le profil de marque pour le benchmarking sectoriel et les contraintes de conformité."
---

# /digital-marketing-pro:martech-audit

## Objectif

Évaluer la stack technologique marketing actuelle pour identifier les lacunes, chevauchements, problèmes d'intégration, et opportunités d'optimisation. Produit une évaluation complète de la stack avec des recommandations actionnables de consolidation et de mise à niveau liées à des projections de ROI et à la faisabilité de mise en œuvre.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **Outils/plateformes actuels** : Liste des outils marketing en usage, organisée par catégorie si possible (par exemple, CRM : Salesforce, E-mail : Mailchimp)
- **Budget martech** : Dépenses martech annuelles actuelles et budget disponible pour les changements ou ajouts
- **Taille d'équipe et niveau de compétence technique** : Combien de personnes utilisent la stack, leurs rôles, et leur maîtrise technique (débutant, intermédiaire, avancé)
- **Objectifs marketing principaux** : Ce que la stack doit soutenir (génération de leads, e-commerce, content marketing, ABM, rétention, etc.)
- **Points de friction avec la stack actuelle** : Problèmes connus, goulots d'étranglement, contournements manuels, silos de données, ou frustrations d'équipe
- **Plans de croissance** : Croissance attendue de l'équipe ou de l'entreprise pouvant affecter les besoins de stack dans les 12-18 prochains mois
- **Exigences de conformité** : Toute contrainte de confidentialité des données, de sécurité, ou réglementaire (RGPD, HIPAA, SOC 2, etc.)
- **Priorités d'intégration** : Quels outils doivent absolument communiquer entre eux (par exemple, CRM-vers-e-mail, publicités-vers-analytics)
- **Périmètre d'évaluation** : Audit complet de la stack ou évaluation ciblée de catégories spécifiques (par exemple, seulement l'analytics, seulement l'automatisation)

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier aussi les guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier l'existence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier l'existence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Cartographier la stack actuelle aux fonctions marketing** : Catégoriser chaque outil selon 11 fonctions principales — CRM, e-mail/automatisation marketing, analytics/BI, publicité payante, gestion des réseaux sociaux, CMS, attribution/suivi, données/CDP, création de contenu, SEO, et support client
3. **Identifier les lacunes** : Signaler les fonctions marketing sans couverture d'outil, évaluer l'impact business de chaque lacune, et recommander des solutions à plusieurs niveaux de prix
4. **Identifier les chevauchements** : Détecter plusieurs outils servant la même fonction, quantifier les coûts de licence redondants, et estimer les dépenses gaspillées par duplication de fonctionnalités
5. **Évaluer la qualité des intégrations** : Évaluer le flux de données entre outils — intégrations natives, connexions API, middleware (Zapier, Make), transferts CSV manuels, et silos de données isolés qui cassent le reporting
6. **Comparer aux schémas de stack sectoriels** : Comparer la composition de la stack, le nombre d'outils, et les dépenses par employé par rapport aux normes sectorielles pour la taille, la verticale, et l'étape de croissance de la marque
7. **Évaluer l'efficacité coût-par-fonction** : Calculer ce que chaque fonction marketing coûte à exploiter en tenant compte des frais d'outils, du temps d'équipe supplémentaire, de la maintenance des intégrations, et des coûts de formation
8. **Noter la maturité de la stack** : Évaluer la maturité globale de la stack sur une échelle à 5 niveaux (manuel, basique, intégré, optimisé, intelligent) avec des critères spécifiques pour progresser
9. **Recommander une consolidation ou des ajouts** : Proposer des échanges d'outils spécifiques, des mises à niveau, ou des ajouts avec justification — priorisés par impact, effort de mise en œuvre, et préparation de l'équipe
10. **Évaluer la préparation future** : Évaluer si la stack actuelle ou proposée peut soutenir les plans de croissance de la marque, les canaux émergents (IA, conversationnel, vidéo), et les exigences de confidentialité en évolution
11. **Créer une feuille de route de migration/mise en œuvre** : Phaser les recommandations en gains immédiats (0-30 jours), changements à court terme (1-3 mois), et évolutions stratégiques (3-12 mois) avec atténuation des risques et plans de repli pour chaque transition

## Résultat

Un rapport d'audit martech structuré contenant :

- **Carte de la stack** : Matrice visuelle des outils actuels cartographiés aux fonctions marketing montrant la couverture, les lacunes, et les chevauchements
- **Analyse des lacunes** : Fonctions non couvertes avec des solutions recommandées à plusieurs niveaux de prix et classement de priorité
- **Analyse des chevauchements** : Outils redondants avec recommandations de consolidation, économies projetées, et complexité de migration
- **Évaluation des intégrations** : Diagramme de flux de données, scores de santé des intégrations, identification des silos, et dépendances aux middleware
- **Analyse des coûts** : Décomposition des coûts par fonction comparant les dépenses actuelles aux dépenses optimisées avec projection d'économies annuelles
- **Score de maturité de la stack** : Niveau de maturité actuel avec les actions spécifiques nécessaires pour atteindre le niveau suivant
- **Changements recommandés** : Liste priorisée d'ajouts, retraits, et remplacements avec estimations de ROI et périodes de retour sur investissement
- **Notes de comparaison de fournisseurs** : Pour les nouveaux outils recommandés, brève comparaison des 2-3 meilleures options avec avantages/inconvénients
- **Feuille de route de mise en œuvre** : Plan de migration en phases avec calendriers, dépendances, facteurs de risque, besoins de formation, et plans de repli
- **Évaluation de préparation future** : Dans quelle mesure la stack recommandée soutient les plans de croissance, les canaux émergents, et les réglementations de confidentialité en évolution
- **Résumé des gains rapides** : Les 3 principaux changements offrant le plus d'impact avec le moins d'effort — pour obtenir l'adhésion des parties prenantes exécutives

## Agents utilisés

- **marketing-strategist** — Alignement de la stratégie de stack avec les objectifs business, priorisation des fonctions, benchmarking sectoriel, évaluation de la maturité
- **analytics-analyst** — Évaluation des intégrations, analyse du flux de données, évaluation de l'infrastructure de mesure, revue de la stack d'attribution

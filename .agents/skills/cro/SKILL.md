---
name: cro
description: "Auditer les landing pages, formulaires, pages de tarification et parcours de paiement à la recherche de tueurs de conversion, et concevoir des tests A/B statistiquement solides — recommandations priorisées par ICE, modèles d'hypothèse, et tailles d'échantillon et vérifications de significativité calculées par script. Conseille et planifie ; ne modifie pas votre site et ne lance pas les tests. Se déclenche sur « /digital-marketing-pro:cro », « audite cette landing page », « pourquoi notre taux de conversion est-il si bas », « combien de temps ce test A/B doit-il durer », « réduire l'abandon de panier ». Lit le profil de marque, les benchmarks sectoriels, et l'historique des campagnes avant de formuler des recommandations."
---

# CRO (Optimisation du taux de conversion)

## Quand utiliser cette compétence

Activez cette compétence lorsque la demande de l'utilisateur implique l'un des éléments suivants :

- Auditer une landing page pour sa performance de conversion
- Concevoir ou améliorer la mise en page, le texte, ou le parcours utilisateur d'une landing page
- Configurer, analyser, ou interpréter des tests A/B ou multivariés
- Optimiser des formulaires web (génération de leads, inscription, contact, candidature)
- Concevoir ou auditer des pages de tarification et la présentation des prix
- Réduire l'abandon de panier ou améliorer les taux de finalisation du paiement
- Améliorer tout indicateur de conversion d'un site web (soumissions de formulaire de leads, inscriptions, achats, démarrages d'essai)
- Calculer les tailles d'échantillon, la durée de test, ou la significativité statistique pour des expériences
- Prioriser les améliorations de conversion à traiter en premier
- Diagnostiquer pourquoi une page ou un tunnel a un faible taux de conversion
- Poser des questions sur les signaux de confiance, la preuve sociale, les éléments d'urgence, ou l'optimisation des appels à l'action

## Contexte de marque (appliqué automatiquement)

Avant de produire tout résultat marketing depuis ce module :

1. **Vérifier le contexte de session** — Le résumé de la marque active a été affiché au démarrage de la session. Utiliser le nom de marque, le secteur, les paramètres de voix, les canaux, les objectifs, la conformité, et les concurrents indiqués.
2. **Si vous avez besoin du profil complet**, lire : `~/.claude-marketing/brands/{slug}/profile.json`
3. **Appliquer la voix de marque** — Les niveaux de formalité, d'énergie, d'humour, et d'autorité doivent façonner tout le ton et les choix de mots du contenu
4. **Vérifier la conformité** — Appliquer automatiquement les règles pour les target_markets et le secteur de la marque via `skills/context-engine/compliance-rules.md`
5. **Référencer les benchmarks sectoriels** — Consulter `skills/context-engine/industry-profiles.md` pour le secteur de la marque
6. **Utiliser les spécifications de plateforme** — Référencer `skills/context-engine/platform-specs.md` pour les limites de caractères et exigences de format
7. **Vérifier l'historique des campagnes** — Exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/campaign-tracker.py" --brand {slug} --action list-campaigns` avant de planifier un nouveau travail
8. **Si aucune marque n'existe**, dire : « Aucun profil de marque trouvé. Utilisez /digital-marketing-pro:brand-setup pour en créer un, ou je peux continuer avec les meilleures pratiques générales. »
9. **Vérifier les directives de marque** — Si `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` existe, charger et appliquer : `restrictions.md` pour les mots interdits, les revendications restreintes, et les mentions légales obligatoires ; `channel-styles.md` pour les déclinaisons de ton propres à chaque canal (peuvent différer de la voix de base) ; `messaging.md` pour les messages clés approuvés, les slogans, et le langage de positionnement ; `voice-and-tone.md` pour les règles de voix détaillées au-delà des 4 scores numériques. Si le contenu produit est destiné à un canal spécifique, les règles de style du canal priment sur les paramètres de voix de base.

Ne demandez pas à l'utilisateur des informations qui existent déjà dans son profil de marque.

## Contexte requis

Avant l'exécution, rassembler les éléments suivants auprès de l'utilisateur (demander s'ils ne sont pas fournis) :

- **URL ou description de la page** : La page ou le parcours spécifique à optimiser
- **Taux de conversion actuel** : Indicateur de référence à améliorer (si connu)
- **Volume de trafic mensuel** : Nécessaire pour les calculs de durée de test et de significativité statistique
- **Objectif de conversion** : Ce qui compte comme une conversion (soumission de formulaire, achat, inscription, téléchargement)
- **Modèle économique** : B2B, B2C, D2C, SaaS, e-commerce, génération de leads
- **Sources de trafic** : D'où viennent les visiteurs (payant, organique, e-mail, direct) puisque la source affecte le niveau d'intention
- **Répartition par appareil** : Pourcentage de trafic mobile vs bureau
- **Historique de test existant** : Ce qui a été testé auparavant et les résultats
- **Pile technologique** : CMS, outils de test (Optimizely, VWO, successeur de Google Optimize, personnalisé), plateforme analytique
- **Contraintes** : Mentions légales requises, directives de marque, restrictions de conformité

## Capacités

### Audits de landing page
- **Test des 5 secondes** : La page communique-t-elle sa proposition de valeur dans les 5 secondes suivant le chargement ?
- **Analyse au-dessus de la ligne de flottaison** : Clarté du titre, soutien du sous-titre, pertinence de l'image principale, visibilité de l'appel à l'action principal
- **Inventaire des signaux de confiance** : Logos, témoignages, avis, certifications, badges de sécurité, garanties
- **Évaluation de l'appel à l'action** : Clarté, contraste, placement, spécificité du texte, nombre d'appels à l'action concurrents
- **Évaluation du formulaire** : Nombre de champs, libellés de champs, obligatoire vs optionnel, gestion des erreurs, multi-étapes vs étape unique
- **Impact de la vitesse de page** : Corrélation entre le temps de chargement et le taux de rebond, les Core Web Vitals comme facteurs de conversion
- **Expérience mobile** : Zones tactiles, profondeur de défilement, placement de l'appel à l'action dans la zone du pouce, points de friction spécifiques au mobile
- **Hiérarchie du contenu** : Architecture de l'information, hiérarchie visuelle, support du balayage en motif F ou Z
- **Gestion des objections** : Si la page traite les objections courantes avant le point de conversion

### Cadre de test A/B
- **Priorisation ICE** : Noter les tests potentiels par Impact (1-10), Confiance (1-10), et Facilité (1-10) pour déterminer l'ordre des tests
- **Format d'hypothèse** : Structuré comme « Si nous [changement], alors [indicateur] va [s'améliorer/diminuer] parce que [raisonnement] »
- **Calcul de la taille d'échantillon** : Basé sur le taux de conversion de référence, l'effet minimum détectable, la puissance statistique (80 %), et le niveau de significativité (95 %)
- **Estimation de la durée de test** : En tenant compte du volume de trafic, du taux de conversion, et des cycles d'activité complets (minimum 1 à 2 semaines pour capturer les schémas hebdomadaires)
- **Interprétation des résultats** : Significativité statistique, significativité pratique, analyse par segment, et projection d'impact sur le revenu
- **Test séquentiel** : Quand utiliser des méthodes à horizon fixe vs séquentielles/bayésiennes pour des décisions plus rapides

### Optimisation des formulaires
- **Réduction des champs** : Supprimer ou différer les champs non essentiels. Chaque champ supplémentaire réduit la conversion d'environ 2 à 7 %
- **Profilage progressif** : Collecter les informations sur plusieurs interactions plutôt que d'un seul coup
- **Validation en ligne** : Un retour en temps réel pendant que les utilisateurs remplissent les champs réduit l'abandon de formulaire
- **Valeurs par défaut intelligentes** : Pré-remplir les données connues, utiliser des valeurs par défaut sensées, et fournir l'auto-complétion
- **Formulaires multi-étapes** : Découper les longs formulaires en étapes logiques avec des indicateurs de progression
- **Optimisation du type de champ** : Menus déroulants vs boutons radio vs champs de texte selon le nombre d'options et le contexte
- **Messages d'erreur** : Messages d'erreur précis et utiles positionnés près du champ concerné

### Psychologie des prix
- **Ancrage** : Présenter une option plus chère en premier pour rendre l'option cible plus raisonnable
- **Effet leurre** : Introduire une option stratégiquement inférieure pour pousser les utilisateurs vers le plan cible
- **Prix charme** : 99 $ vs 100 $ — quand cela fonctionne (B2C, achats impulsifs) et quand cela se retourne contre vous (B2B premium)
- **Cadrage du prix** : Affichage annuel vs mensuel, par utilisateur vs forfait unique, équivalence quotidienne (« moins qu'une tasse de café »)
- **Nommage des plans** : Conventions de nommage guidant l'auto-sélection (Starter/Growth/Enterprise vs Basic/Pro/Premium)
- **Différenciation des fonctionnalités** : Quelles fonctionnalités verrouiller à chaque palier pour créer une pression naturelle de mise à niveau
- **Preuve sociale sur la tarification** : Afficher des badges « le plus populaire », le nombre de clients par palier, ou des logos

### Optimisation du paiement
- **Réduction de l'abandon de panier** : Offres d'intention de sortie, e-mails de récupération de panier, indicateurs de progression, panier persistant
- **Paiement invité** : Toujours proposer le paiement invité ; la création de compte forcée cause 24 % d'abandon
- **Couverture des modes de paiement** : Cartes de crédit, PayPal, Apple Pay, Google Pay, paiement différé (Buy Now Pay Later), méthodes régionales
- **Transparence de la livraison** : Afficher les coûts tôt, proposer des seuils de livraison gratuite, fournir des estimations de délai
- **Persistance du résumé de commande** : Garder les détails de la commande visibles tout au long du paiement
- **Renforcement de la sécurité** : Badges SSL, logos de paiement, garanties de remboursement au point de paiement
- **Paiement en une page vs multi-étapes** : Cadre de décision basé sur la complexité du produit et les exigences d'information
- **Optimisation après achat** : Ventes additionnelles sur la page de confirmation, e-mail de confirmation de commande, création de compte après l'achat

## Processus

### Audit standard de landing page (cas d'usage le plus courant)

1. **Balayage de 5 secondes** — Examiner la page comme un visiteur pour la première fois. Pouvez-vous identifier ce que fait l'entreprise, à qui elle s'adresse, et quelle action entreprendre en 5 secondes ?
2. **Audit au-dessus de la ligne de flottaison** — Évaluer la spécificité du titre, le soutien du sous-titre, la pertinence de l'image principale, et la visibilité de l'appel à l'action. La ligne de flottaison est l'espace le plus précieux.
3. **Confiance et crédibilité** — Inventorier tous les signaux de confiance (témoignages, logos, avis, certifications, garanties). Identifier les lacunes où la preuve sociale manque aux points de décision critiques.
4. **Analyse des appels à l'action** — Compter tous les appels à l'action sur la page. Vérifier les actions concurrentes, la spécificité du texte de bouton (« Obtenir mon essai gratuit » l'emporte sur « Envoyer »), le ratio de contraste, et la fréquence de placement.
5. **Flux de contenu** — Parcourir la page section par section. Suit-elle une séquence de persuasion logique ? Problème, solution, preuve, action ?
6. **Formulaire/point de conversion** — Évaluer le formulaire ou le mécanisme de conversion. Compter les champs, évaluer les libellés, vérifier la gestion des erreurs, et évaluer le micro-texte autour du bouton de soumission.
7. **Audit mobile** — Examiner la même page sur mobile. Vérifier les zones tactiles (minimum 44x44px), la profondeur de défilement jusqu'à l'appel à l'action, les problèmes de défilement horizontal, et le temps de chargement.
8. **Vérification de la vitesse** — Noter tout problème de performance visible. Recommander un audit des Core Web Vitals si la vitesse semble être un facteur.
9. **Recommandations priorisées** — Livrer les constats sous forme de liste priorisée utilisant le cadre ICE. Gains rapides d'abord, changements structurels ensuite, changements de niveau refonte en dernier.

### Processus de conception de test A/B

1. **Identifier le problème** — Utiliser les données (analytics, cartes de chaleur, enregistrements de session, retours utilisateurs) pour cerner le goulot d'étranglement de conversion.
2. **Formuler l'hypothèse** — Rédiger une hypothèse structurée : « Si nous [changeons X], alors [l'indicateur Y] va [augmenter/diminuer] de [montant estimé] parce que [raisonnement basé sur des preuves]. »
3. **Noter avec ICE** — Évaluer l'Impact, la Confiance, et la Facilité sur une échelle de 1 à 10. Prioriser les tests avec les scores composites les plus élevés.
4. **Calculer les exigences** — Déterminer la taille d'échantillon avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/sample-size-calculator.py" --baseline-rate {rate} --mde {mde} --mde-type absolute --significance 0.95 --power 0.80` (passer `--mde-type relative` si le MDE est une hausse relative — les deux diffèrent d'environ deux ordres de grandeur, ~200×, à une référence de 5 %). Estimer la durée de test en fonction du trafic quotidien.
5. **Concevoir la variation** — Créer la variation de test. Ne changer qu'une seule variable par test (sauf pour un test multivarié avec un trafic suffisant).
6. **Contrôler qualité le test** — Vérifier le suivi, contrôler les deux variations sur tous les appareils et navigateurs, confirmer que le test ne casse pas les flux en aval.
7. **Lancer et surveiller** — Lancer le test. Ne pas jeter un œil aux résultats avant d'atteindre la taille d'échantillon calculée. Surveiller uniquement les problèmes techniques.
8. **Analyser et documenter** — À la fin du test, évaluer la significativité statistique avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/significance-tester.py" --control-visitors {n} --control-conversions {n} --variant-visitors {n} --variant-conversions {n} --confidence 0.95`, vérifier les résultats au niveau des segments, calculer l'impact sur le revenu, et documenter les enseignements quel que soit le résultat.

## Fichiers de référence

- `landing-page-audit.md` — Checklist d'audit détaillée, grille de notation, et taux de conversion de référence par secteur
- `ab-testing.md` — Modèles de conception de test, calculateurs de taille d'échantillon, méthodes statistiques, et pièges de test courants
- `form-optimization.md` — Guide d'optimisation champ par champ, mise en œuvre du profilage progressif, et schémas d'expérience utilisateur de formulaire
- `pricing-psychology.md` — Modèles de page de tarification, principes psychologiques avec exemples, et cadres de structure de paliers
- `checkout-optimization.md` — Diagnostic de l'abandon de panier, modèles de parcours de paiement, et stratégies d'optimisation du paiement
- `personalization-testing.md` — Conception de test de personnalisation par segment, tailles minimales de segment, et pièges de mesure de la personnalisation

## Formats de résultat

- **Rapport d'audit de landing page** : Constats section par section avec niveaux de sévérité (critique/élevé/moyen/faible), captures d'écran ou références à des éléments précis, et actions priorisées avec scores ICE
- **Plan de test A/B** : Hypothèse, description de la variation, exigences de taille d'échantillon, durée estimée, critères de réussite, et plan de segmentation
- **Spécification d'optimisation de formulaire** : Liste des champs actuels vs recommandés, description de wireframe de mise en page, règles de validation, et texte des messages d'erreur
- **Recommandation de page de tarification** : Structure des paliers, présentation des prix, matrice de fonctionnalités, et déclencheurs psychologiques avec justification
- **Plan d'optimisation du paiement** : Analyse par étape de tunnel, diagnostic des points d'abandon, et liste ordonnée d'améliorations avec impact attendu

## Cas particuliers

### Sites à faible trafic
Les sites avec moins de 1 000 conversions mensuelles ne peuvent souvent pas atteindre une significativité statistique dans un délai raisonnable. Pour ces sites, sauter le test A/B et mettre en œuvre directement les meilleures pratiques sur la base des constats d'audit. Utiliser une mesure avant/après en étant conscient des variables confondantes. Envisager des méthodes qualitatives (un test utilisateur avec 5 utilisateurs détecte 85 % des problèmes d'utilisabilité) plutôt qu'un test quantitatif.

### Pages B2B longues vs B2C courtes
Les landing pages B2B doivent souvent être plus longues car les décisions d'achat impliquent plusieurs parties prenantes, des prix plus élevés, et des cycles d'évaluation plus longs. Ne pas partir par défaut du principe que « plus court c'est mieux ». Au lieu de cela, s'assurer que la section au-dessus de la ligne de flottaison qualifie rapidement l'intention, et laisser le reste de la page traiter les objections de manière exhaustive. Les achats impulsifs B2C bénéficient de pages courtes, rapides, à appel à l'action unique.

### Optimisation mobile-first vs desktop-first
Vérifier la répartition par appareil avant de formuler des recommandations. Si 70 % ou plus du trafic est mobile, optimiser pour mobile en premier et s'assurer que le bureau ne casse pas. Si le trafic est dominé par le bureau (courant en B2B), optimiser pour le bureau mais ne jamais négliger le mobile. Le terrain d'entente « responsive » ne sert souvent bien ni l'un ni l'autre.

### Secteurs réglementés avec mentions légales obligatoires
Les pages de santé, finance, juridique, et assurance nécessitent souvent de longues mentions légales, divulgations, ou textes de conformité. Ne pas recommander de les supprimer. Travailler plutôt sur la mise en forme (sections repliables, notes de bas de page, police plus petite mais lisible) et s'assurer que le contenu requis ne concurrence pas visuellement l'appel à l'action principal. Positionner les mentions légales après le point de conversion là où c'est légalement permis.

### Test pendant les pics saisonniers
Éviter de lancer des tests A/B pendant le Black Friday, les périodes de fêtes, ou les grandes périodes promotionnelles. Le comportement utilisateur pendant les pics n'est pas représentatif du comportement normal. Les tests menés pendant ces périodes produiront des résultats peu fiables. Si un test doit se dérouler pendant un pic, noter cette réserve et prévoir un nouveau test de validation pendant une période normale.

## Compétences liées

- **Publicité payante** — Le CRO impacte directement le ROAS des campagnes publicitaires ; la qualité de la landing page affecte le Quality Score et la pertinence des annonces
- **Analytics et insights** — Analyse de données pour identifier les goulots d'étranglement de conversion et mesurer les résultats de test
- **Content Engine** — Rédaction pour les titres, appels à l'action, et contenu de page persuasif
- **Funnel Architect** — Le CRO s'inscrit dans la stratégie plus large d'optimisation du tunnel
- **Growth Engineering** — L'optimisation de l'activation et de l'intégration recoupe le CRO pour les produits SaaS
- **SEO** — La vitesse de page et les Core Web Vitals affectent à la fois le classement et les taux de conversion

## Agents utilisés

- **cro-specialist** — Agent principal pour toutes les tâches CRO : audits de landing page, conception de tests A/B, optimisation de formulaire, psychologie des prix, optimisation du paiement, calculs de significativité statistique, et documentation d'expérience
</content>

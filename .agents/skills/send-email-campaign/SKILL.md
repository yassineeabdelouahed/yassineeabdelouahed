---
name: send-email-campaign
description: "Envoyer une campagne email ciblée via un MCP SendGrid, Klaviyo, Customer.io, Brevo, ou Mailchimp connecté — notation de l'objet et du score de spam, personnalisation avec valeurs de repli, variantes A/B, vérifications de conformité CAN-SPAM/RGPD/CASL, un envoi de test que vous confirmez, puis l'envoi complet avec suivi de délivrabilité et instantanés d'engagement précoce. Aucun email ne part sans la porte d'exécution obligatoire : un résumé de campagne avec le nombre de destinataires et un niveau de risque (medium/high/critical selon la taille de la liste) que vous devez approuver explicitement. Se déclenche sur \"/digital-marketing-pro:send-email-campaign\", \"send this newsletter to the active list\", \"deploy the Q1 announcement email\", \"launch the promo email with two subject lines\", \"email this segment tomorrow at 9am\". Lit le profil de marque, les guidelines, et les spécifications de publication par plateforme."
disable-model-invocation: false
argument-hint: "[campaign-name]"
---

# /digital-marketing-pro:send-email-campaign

## Objectif

Créer et envoyer une campagne email ciblée via la plateforme email connectée de la marque avec personnalisation, objets A/B, vérifications de conformité, et suivi de délivrabilité. Gère le cycle de vie complet de la validation du contenu jusqu'à l'exécution de l'envoi et le suivi post-envoi, avec des contrôles de risque graduels selon la taille de la liste de destinataires. Garantit que chaque envoi passe les portes de spam, de conformité, et de voix de marque avant d'atteindre une quelconque boîte de réception.

## Porte d'exécution (OBLIGATOIRE — ne peut pas être contournée)

1. Présenter l'aperçu complet — destinataires / dépense / changements / conformité — comme un **résumé d'exécution** avant de toucher à un système en production.
2. L'utilisateur doit taper `yes` (ou une approbation explicite équivalente). TOUTE autre entrée — ambiguë, implicite, partielle ou absente — annule l'exécution.
3. Ne jamais procéder sur une entrée ambiguë. Ne jamais relancer automatiquement une exécution échouée ; un échec nécessite une revue humaine avant toute nouvelle tentative.
4. Enregistrer l'approbation avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action create-approval --data '{"risk_level":"<tier>","summary":"..."}'` **avant** l'exécution, puis `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action mark-executed --id {approval_id}` une fois que la plateforme confirme le succès.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Contenu de l'email** : Objet, texte d'aperçu (40-90 caractères), texte du corps avec structure HTML, et CTA principal — ou un brouillon à affiner
- **Liste ou segment cible** : Le nom de la liste de destinataires, l'ID de segment, ou les critères d'audience pour l'envoi — avec confirmation du statut d'hygiène de la liste (date de dernier nettoyage)
- **Plateforme email** : Quel service email utiliser — SendGrid, Klaviyo, Customer.io, Brevo, ou Mailchimp — le MCP correspondant doit être connecté
- **Champs de personnalisation** : Champs dynamiques à personnaliser — prénom, entreprise, intérêt produit, dernier achat, localisation, ou tags de fusion personnalisés avec valeurs de repli par défaut pour les données manquantes
- **Variantes A/B** : Optionnel — 2-3 variantes d'objet ou de contenu pour un test fractionné avec le pourcentage de test souhaité (10-50 %), la durée du test, et la métrique gagnante (taux d'ouverture ou taux de clic)
- **Heure d'envoi** : Envoi immédiat, date et heure planifiées avec fuseau horaire, ou « optimal » pour utiliser une optimisation du timing d'envoi basée sur les données d'engagement historiques par segment
- **Adresse de réponse** : Adresse email de réponse si différente de l'expéditeur par défaut configuré dans la plateforme
- **Nom d'expéditeur et adresse d'envoi** : Nom d'affichage et adresse d'envoi — doivent correspondre au domaine d'envoi authentifié (SPF, DKIM, DMARC)
- **Gestion du désabonnement** : Confirmer le placement du lien de désabonnement, la conformité de l'en-tête de désabonnement en un clic (requis pour les expéditeurs en masse selon les règles Gmail/Yahoo de 2024), et le lien vers le centre de préférences
- **Suivi UTM** : Paramètres UTM Google Analytics pour tous les liens dans le corps de l'email (source, medium, campaign), ou générer automatiquement selon les conventions de nommage de la marque
- **Liste de suppression** : Toute adresse ou domaine email additionnel à exclure de cet envoi au-delà de la liste de suppression globale de la plateforme
- **Modèle d'email** : Optionnel — ID de modèle de plateforme à utiliser, ou construire à partir de zéro avec le contenu fourni et le style de marque
- **Stratégie de texte de préheader** : Si le texte d'aperçu doit compléter, teaser, ou prolonger l'objet — affecte l'apparence de l'email dans la vue liste de la boîte de réception
- **Contenu de repli** : Version texte brut de l'email pour les destinataires dont le client ne rend pas le HTML, ou générer automatiquement à partir du corps HTML

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. Vérifier également les guidelines à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions. Vérifier les SOP d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Vérifier la connexion de la plateforme email** : Vérifier quel MCP email est connecté et confirmer qu'il correspond à la plateforme cible de l'utilisateur. Vérifier que le domaine d'envoi est authentifié (enregistrements SPF, DKIM, DMARC). S'il n'est pas connecté ou non authentifié, indiquer à l'utilisateur les étapes de configuration.
3. **Noter les objets d'email** : Exécuter `email-subject-tester.py` sur toutes les variantes d'objet pour évaluer la longueur (optimal 30-50 caractères), les mots percutants, l'efficacité du token de personnalisation, l'usage d'emoji, et le taux d'ouverture prédit. Recommander des améliorations si une variante est en dessous du seuil.
4. **Vérifier le score de spam** : Exécuter `spam-score-checker.py` pour analyser les objets et le contenu du corps à la recherche de mots déclencheurs de spam, de majuscules excessives, de points d'exclamation, de ratio lien-texte, de ratio image-texte, et d'alignement d'authentification. Signaler tout risque de délivrabilité avec des étapes de remédiation spécifiques.
5. **Optimiser l'heure d'envoi — la logique en cascade** : Si l'utilisateur a sélectionné le timing « optimal » : (a) si la plateforme email connectée propose une optimisation du timing d'envoi par destinataire, utiliser CELLE-CI — elle surpasse toute fenêtre globale (le `sto_note` du script énonce la doctrine) ; (b) si la liste dispose d'un journal d'envoi (horodatages + ouvertures + destinataires), l'écrire en JSON et exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/send-time-optimizer.py" --industry {industry} --audience-type {b2b|b2c|mixed} --history {file}` pour des fenêtres de première partie classées par taux d'ouverture mesuré avec les tailles d'échantillon ; (c) sinon, la même commande sans `--history` retourne la référence de population DATÉE (`baseline_as_of` + plafond limité à moyen ; les références obsolètes refusent avec le code de sortie 3). Prendre en compte la distribution des fuseaux horaires de la liste de destinataires.
6. **Construire la charge utile spécifique à la plateforme** : Structurer la charge utile de l'email selon les exigences de l'API de la plateforme cible — consulter `skills/context-engine/platform-publishing-specs.md` pour les correspondances de champs, le rendu de modèle, la syntaxe des tags de fusion (par ex. `{{first_name}}` vs `{first_name}`), les paramètres de configuration de test A/B, et le format de l'API de planification.
7. **Vérifier la taille de la liste et la conformité au consentement** : Confirmer le nombre de destinataires et la définition du segment. Vérifier que la liste dispose des indicateurs de consentement d'opt-in appropriés pour la juridiction applicable. Vérifier que le mécanisme de désabonnement est fonctionnel, que l'en-tête de désabonnement en un clic est présent, que l'adresse postale physique est incluse, et la conformité avec CAN-SPAM (US), RGPD (UE), CASL (Canada), et toute autre réglementation pour les marchés cibles de la marque.
8. **Noter la voix de marque** : Exécuter `brand-voice-scorer.py` sur le contenu du corps de l'email pour vérifier l'alignement avec le ton et les guidelines de message de la marque. Signaler tout texte s'écartant des standards de marque.
9. **Créer l'enregistrement d'approbation** : Créer l'enregistrement via `approval-manager.py --action create-approval` avec le niveau de risque graduel à l'intérieur du JSON `--data` — `{"risk_level":"medium",...}` pour moins de 1 000 destinataires, `"high"` pour 1 000-10 000, `"critical"` pour plus de 10 000. Il n'y a pas de flag `--risk-level` ; voir la porte d'exécution ci-dessus pour la commande exacte. Générer un résumé d'envoi avec tous les détails de campagne, les scores, et le statut de conformité.
10. **Présenter le résumé de campagne** : Afficher le résumé complet pour revue par l'utilisateur — objets avec scores, texte d'aperçu, nombre de destinataires et nom du segment, heure d'envoi, aperçu de personnalisation avec des données de destinataire d'exemple, score de spam, score de voix de marque, et checklist de conformité. Attendre la confirmation explicite.
11. **Envoyer un email de test** : Après l'approbation initiale, envoyer un email de test à l'adresse de l'utilisateur (et à toute adresse de test additionnelle) via le serveur MCP. Demander à l'utilisateur de confirmer que le test s'affiche correctement sur desktop et mobile, que les tokens de personnalisation se résolvent, que les liens fonctionnent, et que les images se chargent.
12. **Exécuter l'envoi complet via le MCP** : Après confirmation du test, déclencher l'envoi de la campagne via la plateforme email connectée par MCP. Gérer la configuration du split de test A/B, la planification, et toute option d'envoi spécifique à la plateforme (suivi des ouvertures, suivi des clics, tagging UTM Google Analytics).
13. **Surveiller la délivrabilité** : Après l'envoi, interroger l'API de la plateforme à intervalles de 15 minutes pendant la première heure pour suivre les métriques de livraison — taux de rebond, taux de livraison, rebonds légers, rebonds durs, et plaintes de spam. Alerter l'utilisateur si le taux de rebond dépasse 3 % ou si le taux de plainte de spam dépasse 0,1 %.
14. **Capturer les signaux d'engagement précoces** : Après 1 heure puis à nouveau après 4 heures, récupérer les données de taux d'ouverture et de taux de clic. Comparer aux moyennes historiques de la marque pour le même segment. En cas de test A/B, indiquer quelle variante est en tête.
15. **Journaliser l'exécution** : Exécuter `execution-tracker.py` pour journaliser l'événement d'envoi avec l'horodatage, la plateforme, l'ID de campagne, la taille de la liste, les objets, la configuration A/B, l'heure d'envoi, les métriques de livraison initiales, et le statut de vérification de conformité. Enregistrer un insight sur la performance de l'objet pour l'optimisation future de la stratégie email.

## Résultat

Une confirmation d'envoi structurée contenant :

- **Confirmation d'envoi** : ID de campagne, plateforme, statut d'envoi (envoyé, planifié, ou test A/B en cours), et horodatage avec fuseau horaire
- **Détails de la liste** : Nombre de destinataires, nom du segment, statut de vérification du consentement, et notes d'hygiène de la liste
- **Scores d'objet** : Ventilation des scores pour chaque variante — longueur, mots percutants, efficacité de personnalisation, taux d'ouverture prédit, et indicateurs de risque de spam
- **Rapport de score de spam** : Notation globale du risque de délivrabilité (faible/moyen/élevé) avec des signalements spécifiques pour tout indicateur de spam déclenché et les étapes de remédiation
- **Score de voix de marque** : Score d'alignement du contenu de l'email avec des notes sur la cohérence de ton et tout ajustement de texte recommandé
- **Heure d'envoi** : Heure d'envoi réelle avec justification — spécifiée par l'utilisateur, planifiée avec fuseau horaire, ou optimisée avec les données d'engagement à l'appui
- **Configuration du test A/B** : Le cas échéant — descriptions des variantes, pourcentage de split, durée du test, métrique gagnante, et paramètres d'envoi automatique du gagnant
- **Rapport de délivrabilité** : Taux de livraison initial, taux de rebond (dur et léger), taux de plainte de spam, et comparaison aux benchmarks sectoriels pour le secteur de la marque
- **Checklist de conformité** : Réussite/échec pour CAN-SPAM, RGPD, CASL, mécanisme de désabonnement, en-tête de désabonnement en un clic, adresse physique, en-têtes d'authentification (SPF, DKIM, DMARC), et identité de l'expéditeur
- **Signaux d'engagement précoces** : Instantanés de taux d'ouverture et de taux de clic à 1 heure et 4 heures avec comparaison aux moyennes historiques de la marque et aux benchmarks sectoriels
- **Aperçu de personnalisation** : Rendu d'exemple montrant l'apparence de l'email pour 2-3 destinataires représentatifs avec des valeurs de tag de fusion différentes et des valeurs de repli
- **Résumé de suivi UTM** : Paramètres UTM complets appliqués à tous les liens de l'email pour le suivi d'attribution dans la plateforme analytics de la marque
- **Entrée de journal d'exécution** : Enregistrement horodaté de l'action d'envoi avec toutes les métadonnées de campagne pour la piste d'audit et le benchmarking de performance

## Agents utilisés

- **email-specialist** — Optimisation de l'objet, stratégie de personnalisation du contenu, analyse de délivrabilité, notation de spam, optimisation du timing d'envoi, vérification de conformité, notation de voix de marque, conception de test A/B avec seuils de significativité statistique, et stratégie de texte de préheader
- **execution-coordinator** — Flux d'approbation avec contrôles de risque graduels selon la taille de la liste, coordination de l'envoi de test sur desktop et mobile, exécution API de plateforme, surveillance de la délivrabilité avec alerte en temps réel, capture des signaux d'engagement précoces, et journalisation d'exécution avec archivage d'insight
</content>

---
name: credential-switch
description: "Basculer le profil d'identifiants actif vers une autre marque cliente, en validant les clés API, variables d'environnement et expiration des jetons de chaque plateforme configurée avant toute exécution — évitant les fuites de données entre clients et les dépenses publicitaires mal orientées. Produit un rapport de validation par plateforme ainsi qu'une confirmation de bascule journalisée avec piste d'audit. Se déclenche sur « /digital-marketing-pro:credential-switch », « bascule vers le compte de l'autre client », « active les clés API d'Acme », « les bons identifiants sont-ils actifs », « change la marque sur laquelle on travaille ». Lit les profils de marque et d'identifiants sous ~/.claude-marketing/ et se combine avec /digital-marketing-pro:client-onboarding lorsqu'un profil est manquant."
disable-model-invocation: false
argument-hint: "[brand-slug]"
---

# /digital-marketing-pro:credential-switch

## Objectif

Basculer le profil d'identifiants actif vers une marque différente pour la gestion d'agence multi-clients. Valide toutes les connexions de plateforme et rend compte des services disponibles pour la marque cible. Garantit que les bonnes clés API, jetons et variables d'environnement sont actifs avant d'exécuter toute opération de plateforme — évitant les fuites de données entre clients, les dépenses publicitaires mal orientées, ou les opérations accidentelles sur le mauvais compte.

## Point de contrôle d'exécution (OBLIGATOIRE — ne peut pas être ignoré)

1. Présenter le résumé de validation — marque cible, statut des identifiants par plateforme, et tout avertissement — sous forme de **résumé d'exécution**.
2. Si la validation est propre **et qu'un seul** profil d'identifiants client est configuré, la bascule peut se faire automatiquement. Si **plus d'un** profil client existe, ou si un avertissement / identifiant manquant / identifiant expirant est présent, l'utilisateur doit taper `yes` (ou une approbation explicite équivalente) — TOUTE autre saisie annule.
3. Ne jamais continuer sur une saisie ambiguë. Ne jamais relancer automatiquement une bascule échouée.
4. Lorsqu'une confirmation est requise, l'enregistrer avec `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action create-approval --data '{"risk_level":"medium","summary":"credential switch to {slug}"}'` **avant** la bascule, puis `python "${CLAUDE_PLUGIN_ROOT}/scripts/approval-manager.py" --brand {slug} --action mark-executed --id {approval_id}` une fois la bascule vérifiée.

## Éléments à fournir

L'utilisateur doit fournir (ou se verra demander) :

- **Slug de la marque cible** : Le slug de la marque vers laquelle basculer les identifiants — doit correspondre à une marque configurée dans `~/.claude-marketing/brands/` avec un profil d'identifiants correspondant dans `~/.claude-marketing/credentials/`
- **Profondeur de validation (optionnel)** : L'une des options suivantes :
  - Rapide : Vérifier que les variables d'environnement existent et ne sont pas vides — rapide, sans appel API
  - Complète : Tester la connectivité API en direct et la validité des jetons pour chaque plateforme configurée — plus lent mais confirme un accès réel
  - Par défaut sur « rapide » pour une bascule plus rapide
- **Bascule forcée (optionnel)** : Si le profil cible a des identifiants manquants ou expirés, basculer quand même avec des avertissements ou tout annuler — par défaut, annulation en cas d'identifiants critiques manquants (plateformes publicitaires, analytique)
- **Raison (optionnel)** : Note brève pour le journal de bascule — utile pour la piste d'audit lorsque plusieurs membres de l'équipe partagent le système (par exemple, « Démarrage du reporting mensuel pour Acme Corp »)
- **Plateformes à valider (optionnel)** : Plateformes spécifiques à valider au lieu de toutes — utile lorsque seules certaines intégrations sont nécessaires pour la tâche en cours (par exemple, « google-ads, google-analytics » pour une session de média payant)

## Processus

1. **Vérifier le contexte actuel** : Lire `~/.claude-marketing/brands/_active-brand.json` pour identifier la marque actuellement active, et `~/.claude-marketing/credentials/_active-profile.json` pour le profil d'identifiants actuel. Afficher l'état actuel avant la bascule.
2. **Vérifier que la marque cible existe** : Confirmer que le slug de la marque cible dispose d'un profil configuré à `~/.claude-marketing/brands/{slug}/profile.json`. Si introuvable, lister toutes les marques disponibles depuis `~/.claude-marketing/brands/` et suggérer `/digital-marketing-pro:brand-setup` pour de nouvelles marques ou `/digital-marketing-pro:client-onboarding` pour la configuration d'un nouveau client
3. **Vérifier l'existence du profil d'identifiants** : Exécuter `credential-manager.py --action get-profile --id {slug}` pour vérifier qu'un profil d'identifiants existe pour la marque cible. S'il est manquant, expliquer comment en créer un avec les identifiants de plateforme requis et annuler avec des instructions de configuration
4. **Valider le profil d'identifiants** : Exécuter `credential-manager.py --action validate-profile --id {slug}` pour vérifier les identifiants de chaque plateforme — vérifier que les clés API sont présentes et non vides, que les jetons OAuth ne sont pas expirés, et que les variables d'environnement requises sont définies pour tous les serveurs MCP configurés dans `.mcp.json`
5. **Présenter le résumé de validation** : Afficher un rapport de validation plateforme par plateforme — pour chaque service configuré :
   - Nom et type de plateforme (plateforme publicitaire, analytique, CRM, social, e-mail)
   - Statut des identifiants : configuré / non configuré / expiré
   - Variables d'environnement requises : définies ou manquantes (avec les noms de variables précis)
   - Date d'expiration du jeton, le cas échéant
   - Horodatage de la dernière connexion réussie, si disponible
6. **Vérifier les opérations récentes** : Avant de basculer, examiner `python "${CLAUDE_PLUGIN_ROOT}/scripts/execution-tracker.py" --brand {slug} --action get-history --limit 20` pour les exécutions et livraisons récemment journalisées sous le profil actuel qu'un changement de contexte pourrait affecter. Le traceur enregistre les exécutions terminées (succès/échec) — il n'existe pas de flux « en cours » en direct, donc traiter les entrées les plus récentes comme potentiellement encore en cours de stabilisation et avertir avec les détails précis de l'opération si l'une d'elles semble active
7. **Confirmer l'intention de bascule** : Si la validation est passée sans problème, procéder automatiquement. Si des avertissements existent (identifiants non critiques manquants, jetons expirant sous 7 jours), présenter les avertissements et demander confirmation. Si des identifiants critiques sont manquants et que la bascule forcée n'est pas activée, annuler avec des indications précises sur ce qui doit être configuré
8. **Exécuter la bascule d'identifiants** : Exécuter `credential-manager.py --action switch-profile --id {slug}` pour activer le profil d'identifiants de la marque cible. Cela met à jour la référence du profil actif et charge les variables d'environnement correspondantes pour tous les serveurs MCP
9. **Basculer la marque active** : Mettre à jour `~/.claude-marketing/brands/_active-brand.json` pour définir la marque cible comme contexte de marque actif — garantissant que le profil de marque et les identifiants sont alignés afin que toutes les commandes suivantes utilisent le bon client
10. **Vérifier le succès de la bascule** : Relire `_active-brand.json` et `_active-profile.json` pour confirmer que la bascule s'est terminée avec succès. Si une validation complète a été demandée, exécuter un test de connectivité rapide sur les plateformes critiques (Google Ads, Analytics, CRM) pour confirmer que l'accès en direct fonctionne
11. **Journaliser la bascule** : Enregistrer l'événement de bascule avec horodatage, marque précédente, nouvelle marque, résultat de validation, tout avertissement, et raison (le cas échéant) dans `~/.claude-marketing/credentials/switch-log.json` à des fins de piste d'audit
12. **Rendre compte du nouveau contexte actif** : Afficher le nom de la nouvelle marque active, son slug, son secteur d'activité, son modèle économique, les plateformes configurées avec leur statut de validation, et tout avertissement concernant des identifiants manquants ou expirants. Suggérer des prochaines étapes pertinentes basées sur les flux de travail courants après une bascule

## Résultat

Une confirmation de bascule d'identifiants contenant :

- **Contexte précédent** : Nom de marque, slug, et profil d'identifiants qui étaient actifs avant la bascule — afin que l'utilisateur puisse vérifier depuis quoi il a basculé et y revenir si nécessaire
- **Nouveau contexte actif** : Nom de marque, slug, secteur d'activité, modèle économique, canaux marketing principaux, type d'engagement, et statut de contrat désormais actifs
- **Rapport de validation par plateforme** : Tableau de statut par plateforme — nom de la plateforme, configurée (oui/non), variables d'environnement (définies/manquantes avec les noms de variables précis listés), statut du jeton (valide/expiré/N/A avec date d'expiration le cas échéant), et résultat de connectivité (vérifié/non testé/échoué avec détail de l'erreur)
- **Avertissements d'identifiants manquants** : Toute plateforme configurée dans le profil de marque mais dont les clés API ou jetons sont manquants, avec des instructions précises pour les ajouter — quelle variable d'environnement définir, où obtenir l'identifiant, et si la plateforme est critique ou optionnelle pour les flux de travail actuels
- **Alertes d'identifiants expirants** : Tout jeton ou clé approchant de l'expiration sous 7 jours, avec instructions de renouvellement, niveau d'urgence (informatif/action nécessaire/critique), et impact en cas de non-renouvellement
- **Vérification des opérations actives** : Confirmation qu'aucune opération en cours n'a été perturbée, ou avertissements détaillés listant toute opération pouvant nécessiter de l'attention après la bascule
- **Entrée du journal de bascule** : Horodatage, marque précédente, nouvelle marque, résumé de validation, nombre d'avertissements, et raison — enregistrés à des fins d'audit et de dépannage
- **Prochaines étapes** : Message de confirmation — « Toutes les opérations utiliseront désormais les identifiants de [brand_name]. Plateformes configurées : [liste]. Utilisez `/digital-marketing-pro:agency-dashboard` pour voir le statut de ce client, `/digital-marketing-pro:client-report` pour générer un rapport de performance, ou relancez `/digital-marketing-pro:credential-switch` pour revenir à la marque précédente. »

## Agents utilisés

- **agency-operations** — Gestion des profils d'identifiants, logique de validation de plateforme, vérification de sécurité des opérations actives, exécution de la bascule, vérification de l'alignement du contexte, journalisation d'audit, et moteur de recommandation post-bascule
</content>

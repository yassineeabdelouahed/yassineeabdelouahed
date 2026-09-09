# Cadre d'approbation — Classification des risques et règles d'approbation

Chaque action marketing exécutée via le plugin Digital Marketing Pro est classée selon un niveau de risque. Ce cadre détermine si une action peut s'exécuter automatiquement ou nécessite l'approbation explicite de l'utilisateur. Les agents doivent évaluer le risque avant toute étape d'exécution.

---

## 1. Niveaux de risque

Les actions sont classées en quatre niveaux de risque. La classification détermine le flux d'approbation.

| Niveau de risque | Approbation requise | Délai de réponse | Description |
|---|---|---|---|
| **Faible** | Confirmation automatique + exécution | Immédiat | Opérations en lecture seule et livrables strictement internes. Aucun impact sur une audience externe, aucune dépense budgétaire, aucune modification de données. |
| **Moyen** | Revue + approbation explicite | L'utilisateur confirme une fois | Contenu destiné à l'externe avec un rayon d'impact limité. Audience de taille modérée, aucun engagement budgétaire, actions réversibles. |
| **Élevé** | Confirmation budget/données requise | L'utilisateur confirme avec des précisions (montant, nombre) | Actions impliquant de l'argent, de larges audiences, ou des modifications de données en masse. Nécessite que l'utilisateur reconnaisse la portée spécifique. |
| **Critique** | Double confirmation + revue de conformité | L'utilisateur confirme deux fois ; les règles de conformité sont vérifiées automatiquement | Actions à forte dépense, secteurs réglementés, envois à grande échelle, ou opérations irréversibles. |

### Risque faible — Confirmation automatique

| Action | Pourquoi faible |
|---|---|
| Notifications Slack et messages internes | Usage interne uniquement, aucune audience externe |
| Exports Google Sheets et extractions de données | Lecture/écriture sur l'espace de travail propre de l'utilisateur |
| Stockage de connaissances et opérations de mémoire | Persistance interne, aucun impact externe |
| Requêtes analytiques en lecture seule | Aucune modification de données, aucun impact sur l'audience |
| Rapports de performance internes | Non destinés au client, aucune diffusion externe |
| Notation de la voix de marque et évaluation du contenu | Analyse uniquement, aucune publication |
| Recherche de mots-clés et analyses concurrentielles | Recherche uniquement, aucune exécution |

### Risque moyen — Revue + approbation

| Action | Pourquoi moyen |
|---|---|
| Publication d'un article de blog | Destiné à l'externe mais une seule URL, réversible (repasser en brouillon) |
| Programmation de publications sur les réseaux sociaux | Destiné à l'externe mais limité aux abonnés, supprimable |
| Campagnes e-mail <1 000 destinataires | Destiné à l'externe, audience modérée, non rappelable mais rayon d'impact limité |
| Création de contacts CRM individuels (<10 enregistrements) | Modification de données mais portée réduite, réversible |
| Création de segments d'audience | Aucun envoi direct, mais définit un ciblage futur |
| Envoi de rapports à des destinataires externes | Contenu destiné au client, ne peut pas être annulé après envoi |
| Mises à jour du calendrier de contenu | Artefact de planification, aucune exécution directe |

### Risque élevé — Confirmation budget/données

| Action | Pourquoi élevé |
|---|---|
| Création de campagne publicitaire (toute plateforme) | L'engagement budgétaire commence immédiatement à l'activation |
| Modifications de budget >100 $/jour | Impact financier, peut dépasser la dépense approuvée |
| Envois d'e-mails en masse (1 000-10 000 destinataires) | Large audience, non rappelable, risque pour la réputation |
| Imports CRM en masse (100-1 000 enregistrements) | Risque d'intégrité des données à grande échelle |
| Campagnes SMS (toute taille) | Coût par message, complexité de conformité, non rappelable |
| Mises à jour de champs CRM affectant >10 enregistrements | Modification de données en masse, perte de données potentielle |
| Renouvellement de créations publicitaires sur des campagnes actives | Peut perturber des campagnes performantes |

### Risque critique — Double confirmation + conformité

| Action | Pourquoi critique |
|---|---|
| Campagnes publicitaires avec budget quotidien >1 000 $ | Exposition financière significative |
| Envois d'e-mails en masse >10 000 destinataires | Risque majeur pour la réputation, impact sur la délivrabilité |
| Campagnes dans des secteurs réglementés (santé, finance, alcool, cannabis, jeux d'argent, pharmaceutique) | Responsabilité juridique, amendes potentielles |
| Suppression de données CRM (tout volume) | Perte de données irréversible |
| Campagnes marketing WhatsApp | Coût par conversation, approbation de modèle requise, complexité de conformité |
| Actions sur une plateforme nouvelle/non testée | Modes de défaillance inconnus, aucun playbook établi |
| Campagnes transfrontalières vers de nouvelles juridictions | De nouvelles exigences de conformité peuvent s'appliquer |
| Campagnes ciblant des mineurs ou des audiences à accès restreint par l'âge | COPPA, article 8 du RGPD, exigences de contrôle d'âge des plateformes |

---

## 2. Portes de contrôle sectorielles

Les campagnes dans des secteurs réglementés nécessitent des contrôles de conformité supplémentaires avant que toute approbation de niveau de risque ne puisse avancer. Ces portes sont obligatoires et ne peuvent pas être contournées.

| Secteur | Porte requise | Contrôles spécifiques |
|---|---|---|
| **Santé** | Revue HIPAA | Aucune PHI (donnée de santé protégée) dans le contenu marketing ; aucune allégation de traitement non approuvée ; mention « consultez votre professionnel de santé » ; équilibre des informations pour les produits sur ordonnance ; justification des allégations médicales |
| **Finance** | Mentions FINRA/SEC | Avertissement « performances passées » sur toute mention de rendement ; divulgation du TAEG pour les produits de crédit ; aucune promesse de rendement garanti ; divulgation des frais ; données de performance nettes de frais |
| **Alcool** | Contrôle d'âge + conformité TTB | Vérification d'âge 21 ans et plus sur les pages d'atterrissage ; aucune imagerie attirante pour les mineurs ; message de consommation responsable ; aucune allégation de santé ; seuil d'audience adulte de 70 %+ pour le placement publicitaire |
| **Cannabis** | Vérification de juridiction + plateforme | Vérification de la juridiction légale ; aucun marketing transfrontalier ; les principales plateformes publicitaires interdisent les publicités cannabis payantes ; aucune allégation médicale/de santé ; mentions d'avertissement spécifiques à l'état ; divulgation du numéro de licence |
| **Jeux d'argent** | Message de jeu responsable | Message de jeu responsable dans toutes les créations ; liens d'auto-exclusion ; vérification des licences spécifiques à la juridiction ; aucun ciblage de mineurs ; numéro d'assistance pour le jeu problématique |
| **Pharmaceutique** | Conformité FDA | Exigence d'équilibre des informations (risques et bénéfices) ; inclusion de l'avertissement encadré (« black box ») lorsque requis ; aucune promotion hors indication ; exigences de publicité DTC (grand public) ; résumé bref ou disposition adéquate |
| **Immobilier** | Fair Housing Act | Déclaration d'égalité d'accès au logement ; aucun langage ou ciblage discriminatoire ; catégorie publicitaire spéciale sur Meta/Google ; imagerie diversifiée ; aucun critère d'audience excluant |
| **Compléments alimentaires** | Revue FTC/FDA | Aucune allégation de maladie ; mention structure/fonction FDA ; « résultats non typiques » pour les témoignages ; justification pour toutes les allégations d'efficacité ; aucune mention « approuvé par la FDA » |

---

## 3. Flux d'approbation

Chaque action suit cet arbre de décision, du brouillon à l'exécution.

```
Draft Action
    |
    v
Compliance Check (auto)
    |-- Fail --> BLOCK: Show violation, cite specific rule, suggest fix
    |-- Pass --> continue
    |
    v
Industry Gate Check (auto, if regulated industry)
    |-- Fail --> BLOCK: Show missing compliance element
    |-- Pass --> continue
    |
    v
Risk Assessment (auto)
    |
    +-- Low Risk --------> Auto-approve --> Execute --> Verify --> Log
    |
    +-- Medium Risk -----> Present summary to user
    |                          |-- User approves --> Execute --> Verify --> Log
    |                          |-- User rejects --> Revise or cancel
    |
    +-- High Risk -------> Present summary with budget/scope details
    |                          |-- User confirms specifics --> Execute --> Verify --> Log
    |                          |-- User rejects --> Revise or cancel
    |
    +-- Critical Risk ---> Present summary + compliance report
                               |-- User confirms (1st) --> "Please confirm again: [action summary]"
                               |-- User confirms (2nd) --> Execute --> Verify --> Log
                               |-- User rejects --> Revise or cancel
```

### Modèles de messages de confirmation

| Niveau de risque | Invite de confirmation |
|---|---|
| **Moyen** | « Prêt à publier [type d'action] vers [destination]. [Résumé bref]. Continuer ? » |
| **Élevé** | « Ceci va [action] affectant [portée]. Budget quotidien : [montant] $. Taille de l'audience : [nombre]. Confirmez pour continuer. » |
| **Critique** | « ACTION CRITIQUE : [type d'action] dans [secteur réglementé / contexte à forte dépense]. Budget : [montant] $/jour. Audience : [nombre] destinataires dans [juridictions]. Contrôles de conformité passés. Veuillez confirmer pour continuer. » Puis : « Veuillez confirmer une nouvelle fois pour exécuter cette action. » |

---

## 4. Procédures d'annulation (rollback)

Lorsqu'une action exécutée doit être annulée, suivez immédiatement ces procédures.

| Type d'action | Procédure d'annulation | Sensibilité au temps | Récupération des données |
|---|---|---|---|
| **Article de blog** | Repasser le statut de l'article en « brouillon ». Retirer l'URL du sitemap. Demander une nouvelle exploration au moteur de recherche si indexé. Vider le cache CDN. | Faible (minutes à heures) | Récupération complète |
| **Campagne e-mail** | Impossible de rappeler les e-mails envoyés. Envoyer immédiatement un e-mail de correction/rétractation si le contenu était incorrect. Mettre à jour les listes de suppression. Documenter l'incident. | N/A — la prévention est essentielle | Aucun rappel possible |
| **Campagne publicitaire** | Mettre la campagne en pause immédiatement. Examiner la dépense engagée. Documenter les données de performance avant la mise en pause. En cas de problème de conformité, retirer/archiver également les créations. | Élevée (la dépense s'accumule à chaque minute) | Financier : partielle (budget non dépensé restitué) |
| **Publication sur les réseaux sociaux** | Supprimer la publication de la plateforme. Archiver le contenu localement. Si une capture d'écran a circulé, préparer une déclaration de réponse. | Moyenne (les partages se propagent rapidement) | Publication supprimée ; les partages persistent |
| **Import CRM** | Revenir à l'instantané de sauvegarde pré-import (voir l'étape 4 du flux d'opérations CRM). Vérifier que le nombre d'enregistrements revient à l'état pré-import. Valider l'absence d'enregistrements orphelins. | Moyenne | Récupération complète depuis l'instantané |
| **SMS/WhatsApp** | Impossible de rappeler les messages envoyés. Si la campagne est en cours, la mettre en pause immédiatement. Pour un contenu incorrect, envoyer une correction de suivi. Mettre à jour les listes de désabonnement. | N/A — la prévention est essentielle | Aucun rappel possible |
| **Envoi de rapport** | Envoyer un avis de correction à tous les destinataires. Fournir le rapport corrigé. Marquer l'original comme remplacé. | Moyenne | La correction remplace l'original |

### Journalisation des annulations

Chaque annulation doit être journalisée avec :
- L'ID et l'horodatage de l'action d'origine
- Le motif de l'annulation (problème de conformité, contenu incorrect, demande de l'utilisateur, erreur)
- Les étapes d'annulation effectuées
- La vérification que l'annulation s'est terminée avec succès
- Les notes de revue d'incident (ce qui s'est mal passé, comment éviter que cela se reproduise)

---

## 5. Règles d'escalade

Escaladez vers l'utilisateur immédiatement (ne poursuivez pas l'exécution) lorsque l'une des conditions suivantes est détectée.

| Déclencheur | Seuil | Action d'escalade |
|---|---|---|
| **Dépassement de budget** | La dépense réelle dépasse le budget prévu de plus de 10 % | Mettre la campagne en pause. Rapport : dépense prévue vs réelle, dépassement projeté, action recommandée. |
| **Signalement de conformité** | Toute violation de conformité de niveau BLOCAGE détectée (voir les niveaux de gravité dans `compliance-rules.md`) | Arrêter l'exécution. Rapport : règle spécifique violée, contenu ayant déclenché le signalement, correction recommandée. |
| **Erreur de plateforme** | L'API renvoie une erreur lors de la création ou de la modification de campagne | Réessayer une fois après 60 secondes. Si la seconde tentative échoue, rapport : code d'erreur, message d'erreur, lien vers la page de statut de la plateforme. |
| **Taille d'audience inattendue** | La taille de l'audience diffère de l'estimation de plus de 50 % (dans un sens ou dans l'autre) | Mettre en pause avant l'envoi/le lancement. Rapport : nombre attendu vs réel, causes possibles (changement de définition du segment, croissance/déclin de la liste). |
| **Pic de sentiment négatif** | L'écoute sociale ou les métriques d'engagement montrent un taux de réponse négative supérieur à 3 fois la normale en 2 heures | Alerter l'utilisateur. Fournir : exemples de commentaires négatifs, score de sentiment, réponse recommandée (mettre en pause la campagne, préparer une déclaration, ou surveiller). |
| **Baisse de délivrabilité** | Taux de rebond e-mail >5 % ou taux de plaintes pour spam >0,3 % durant un envoi | Mettre en pause les envois restants. Rapport : nombre de rebonds/plaintes, FAI affectés, actions d'hygiène de liste recommandées. |
| **Anomalie de performance** | Tout KPI principal chute de plus de 50 % par rapport à la période précédente sans cause connue | Alerter l'utilisateur. Fournir : comparaison de métriques, causes possibles (problème de suivi, changement de plateforme, action concurrentielle, saisonnalité). |
| **Problème d'intégrité des données** | La validation de l'import CRM détecte plus de 5 % d'enregistrements en échec de validation | Arrêter l'import. Rapport : nombre d'échecs, motifs d'échec, échantillon d'enregistrements en échec, correction recommandée. |

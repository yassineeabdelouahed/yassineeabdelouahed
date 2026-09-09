# Guide des opérations de campagne auto-réparatrices — Surveillance et correction automatisées

## Vue d'ensemble

Les opérations auto-réparatrices détectent automatiquement les problèmes de campagne et appliquent des corrections dans des garde-fous de sécurité prédéfinis. Le système surveille en continu les campagnes actives, note leur santé, identifie les anomalies, et corrige automatiquement les problèmes à faible risque ou escalade les situations à haut risque pour une revue humaine.

```
Monitor → Detect → Diagnose → Decide (auto-correct or escalate) → Act → Log → Learn
```

L'objectif n'est pas de remplacer le jugement humain mais de détecter et corriger les défaillances mécaniques (pages d'atterrissage cassées, dépassement de budget, baisses de délivrabilité) avant qu'elles ne gaspillent un budget significatif, tout en signalant les problèmes stratégiques (changement d'audience, pression concurrentielle, changements d'algorithme) pour la prise de décision humaine.

---

## Notation de santé de campagne

### Méthodologie

Chaque campagne active reçoit un score de santé de 0 à 100, recalculé à chaque cycle de surveillance. Les scores sont pondérés selon le type de campagne car différents objectifs ont différentes métriques critiques.

### Pondérations des campagnes de notoriété

| Métrique | Pondération | Saine (80-100) | Avertissement (50-79) | Critique (0-49) |
|---|---|---|---|---|
| **Rythme de portée** | 30 % | À moins de 10 % de l'objectif | 10-25 % d'écart avec l'objectif | >25 % d'écart avec l'objectif |
| **Efficacité du CPM** | 25 % | À ou en dessous du CPM cible | 1-1,5x le CPM cible | >1,5x le CPM cible |
| **Sécurité de marque** | 20 % | 0 violation | 1-2 violations mineures | Toute violation majeure |
| **Gestion de la fréquence** | 15 % | Fréquence moyenne 2-4x/semaine | 5-7x/semaine | >7x/semaine (risque de lassitude) |
| **Visibilité** | 10 % | 70 %+ visible | 50-69 % visible | <50 % visible |

### Pondérations des campagnes de conversion

| Métrique | Pondération | Saine (80-100) | Avertissement (50-79) | Critique (0-49) |
|---|---|---|---|---|
| **CPA / ROAS** | 35 % | À ou mieux que l'objectif | 1-1,5x le CPA cible | >1,5x le CPA cible |
| **Rythme de volume de conversion** | 25 % | À moins de 15 % de l'objectif quotidien | 15-35 % d'écart avec l'objectif | >35 % d'écart avec l'objectif |
| **Santé de la page d'atterrissage** | 20 % | 200 OK, temps de chargement <3s | 200 OK, temps de chargement 3-5s | Non-200, >5s, ou cassée |
| **Score de qualité** | 10 % | 7+ (Google), pertinent (Meta) | 5-6 (Google), modéré | <5 (Google), faible pertinence |
| **Rythme budgétaire** | 10 % | 90-110 % de l'objectif quotidien | 60-89 % ou 111-120 % | <60 % ou >120 % |

### Pondérations des campagnes de rétention (E-mail/CRM)

| Métrique | Pondération | Saine (80-100) | Avertissement (50-79) | Critique (0-49) |
|---|---|---|---|---|
| **Taux d'ouverture / clic** | 30 % | Au-dessus de la moyenne sectorielle | À la moyenne sectorielle | >30 % en dessous de la moyenne |
| **Taux de désabonnement** | 20 % | <0,2 % par envoi | 0,2-0,5 % par envoi | >0,5 % par envoi |
| **Délivrabilité** | 20 % | >95 % placement en boîte de réception | 90-95 % de placement | <90 % de placement |
| **Profondeur d'engagement** | 15 % | Clics multiples, transferts | Clic unique | Ouvertures uniquement, aucun clic |
| **Santé de la liste** | 15 % | <2 % taux de rebond | 2-5 % taux de rebond | >5 % taux de rebond |

### Seuils du score de santé

| Score | Statut | Réponse du système |
|---|---|---|
| **80-100** | Saine | Surveillance uniquement — aucune action nécessaire |
| **60-79** | Avertissement | Augmenter la fréquence de surveillance, préparer des recommandations |
| **40-59** | Dégradée | Auto-corriger dans les garde-fous, alerter l'opérateur |
| **20-39** | Critique | Mettre en pause automatiquement les éléments affectés, escalader immédiatement |
| **0-19** | Urgence | Pause complète de la campagne, réponse à incident initiée |

---

## Schémas de détection de problèmes

### Surveillance de la page d'atterrissage

| Vérification | Méthode | Fréquence | Seuil d'échec |
|---|---|---|---|
| **Statut HTTP** | Requête HEAD vers l'URL de la page d'atterrissage | Toutes les 15 minutes | Réponse non-200 |
| **Temps de chargement de la page** | Mesure du chargement complet de la page | Toutes les 30 minutes | >5 secondes |
| **Vérification du rendu** | Vérifier la présence d'éléments clés de la page (formulaire, CTA, produit) | Toutes les 30 minutes | Éléments critiques manquants |
| **Certificat SSL** | Vérification de la validité du certificat | Quotidien | Expire sous 7 jours ou expiré |
| **Chaîne de redirection** | Suivre les redirections, vérifier l'URL finale | Toutes les 30 minutes | >3 redirections ou redirection vers une page d'erreur |

**Impact des pages d'atterrissage cassées :** Une page d'atterrissage non fonctionnelle gaspille 100 % de la dépense publicitaire qui y est dirigée. C'est la détection la plus prioritaire — toute autre métrique est sans importance si les utilisateurs ne peuvent pas atteindre la destination.

### Surveillance de la délivrabilité e-mail

| Vérification | Seuil | Diagnostic |
|---|---|---|
| **Pic de taux de rebond** | >3 % sur un seul envoi (depuis une référence <1 %) | Problème d'hygiène de liste ou blocage |
| **Placement en dossier spam** | >10 % allant en spam (test de sonde) | Échec d'authentification ou problème de contenu |
| **Échec DKIM** | Tout échec DKIM sur les e-mails envoyés | Mauvaise configuration DNS ou rotation de clé nécessaire |
| **Échec SPF** | Tout échec SPF | IP d'envoi absente de l'enregistrement SPF |
| **Échec DMARC** | Tout échec DMARC | DKIM ou SPF non alignés avec le domaine From |
| **Effondrement du taux d'ouverture** | >40 % de chute par rapport à la moyenne mobile sur 7 jours | Problème de délivrabilité ou lassitude de liste |

### Analyse du rythme

| Condition | Signal | Cause probable |
|---|---|---|
| **Surdépense** (>120 % du budget quotidien) | La dépense s'accélère au-delà du plan | Dynamique d'enchère, enchère trop élevée, nouvelle concurrence |
| **Sous-dépense** (<60 % du budget quotidien) | Vélocité de dépense trop faible | Ciblage trop étroit, enchère trop basse, désapprobations d'annonces |
| **Chargée en avant** (50 %+ du budget dépensé dans les 25 premiers % de la journée) | Pic matinal | Découpage horaire non configuré, diffusion accélérée activée |
| **Bloquée** (aucune dépense pendant 2+ heures durant les heures ouvrées) | Diffusion nulle | Annonce désapprouvée, problème de paiement, audience épuisée |

### Anomalies d'engagement

| Anomalie | Règle de détection | Cause possible |
|---|---|---|
| **Chute de CTR >30 %** | Le CTR tombe sous 70 % de la moyenne mobile sur 7 jours | Lassitude créative, saturation d'audience, saisonnier |
| **Pic de CPC >40 %** | Le CPC dépasse 140 % de la moyenne mobile sur 7 jours | Augmentation de la concurrence d'enchère, baisse du score de qualité |
| **Effondrement du taux de conversion** | Le CVR chute de plus de 50 % par rapport à la référence | Problème de page d'atterrissage, suivi cassé, offre modifiée |
| **Schéma de trafic inhabituel** | CTR élevé mais CVR proche de zéro | Fraude au clic ou trafic de bot |
| **Surexposition en fréquence** | Fréquence moyenne >7x/semaine | Audience trop petite pour le budget, aucun plafond de fréquence |

---

## Garde-fous d'auto-correction

### Limites de sécurité par défaut

Celles-ci définissent ce que le système peut faire SANS approbation humaine :

| Action | Autorisée automatiquement | Limite |
|---|---|---|
| **Mettre en pause des publicités individuelles** | Oui | Toute publicité avec un score de santé <30 |
| **Mettre en pause des ensembles d'annonces** | Oui, si toutes les publicités qu'ils contiennent sont en pause | Uniquement quand toutes les publicités enfants sont éligibles |
| **Réduire l'enchère** | Oui | Jusqu'à 15 % de réduction par cycle |
| **Réguler le budget quotidien** | Oui | Jusqu'à 20 % de réduction par cycle |
| **Mettre en pause la campagne (page d'atterrissage en panne)** | Oui | Immédiat si non-200 pour 2 vérifications consécutives |
| **Reprendre la campagne (page d'atterrissage rétablie)** | Oui | Après 2 vérifications saines consécutives, à 80 % de l'enchère d'origine |
| **Basculer vers la prochaine variante créative** | Non | Nécessite une approbation |
| **Augmenter le budget** | Non | Nécessite toujours une approbation |
| **Changer le ciblage** | Non | Nécessite toujours une approbation |
| **Mettre en pause tout le compte** | Non | Nécessite toujours une approbation |
| **Changer la stratégie d'enchère** | Non | Nécessite toujours une approbation |

### Configuration des garde-fous

Les garde-fous sont configurables par marque à `~/.claude-marketing/brands/{slug}/guardrails.json` :

```json
{
  "auto_pause_threshold": 30,
  "max_bid_reduction_pct": 15,
  "max_budget_throttle_pct": 20,
  "landing_page_check_interval_min": 15,
  "landing_page_failure_threshold": 2,
  "resume_at_bid_pct": 80,
  "creative_swap_auto": false,
  "budget_increase_auto": false,
  "require_approval_for": ["targeting_change", "bidding_strategy_change", "account_pause", "budget_increase"]
}
```

---

## Types de correction par niveau de risque

| Niveau de risque | Correction | Quand appliquée | Réversibilité |
|---|---|---|---|
| **Le plus faible** | Mettre en pause une publicité individuelle | Santé de la publicité <30, lassitude créative détectée | Réactivable manuellement |
| **Faible** | Réduire l'enchère (jusqu'à 15 %) | Pic de CPC, rythme de surdépense | L'enchère peut être remontée |
| **Faible** | Réguler le budget quotidien (jusqu'à 20 %) | Rythme de surdépense, CPA dépassant l'objectif | Le budget peut être restauré |
| **Moyen** | Transfert de budget entre ensembles d'annonces | Un ensemble d'annonces surperformant significativement un autre | Rééquilibrer manuellement |
| **Moyen** | Basculement créatif | Lassitude créative (déclin du CTR >20 % par rapport au pic) | Faire tourner à nouveau si nécessaire |
| **Élevé** | Mettre en pause toute la campagne | Page d'atterrissage en panne, problème au niveau du compte | Reprendre après investigation |
| **Le plus élevé** | Mettre en pause tout le compte | Échec de paiement, violation de politique, fraude suspectée | Nécessite une revue humaine complète |

---

## Matrice de décision auto-réparation vs alerte

| Clarté du signal | Risque de correction | Action |
|---|---|---|
| **Signal clair** (par ex., page d'atterrissage 404) + **correction à faible risque** (mettre en pause la campagne) | Faible | **Auto-réparation** — exécuter et notifier |
| **Signal clair** + **correction à haut risque** (changer le ciblage) | Élevé | **Alerte** — recommander une correction, attendre l'approbation |
| **Signal ambigu** (par ex., déclin graduel du CTR) + **correction à faible risque** | Faible | **Alerte** — notifier avec les données, suggérer une investigation |
| **Signal ambigu** + **correction à haut risque** | Élevé | **Alerte** — escalader avec un rapport diagnostique complet |
| **Problèmes multiples simultanés** | Tout | **Alerte** — problème systémique possible, revue humaine requise |
| **Facteur externe suspecté** (panne de plateforme, changement d'algorithme) | Tout | **Alerte** — rassembler des preuves, ne pas corriger automatiquement |

### Règle de décision

```
Auto-réparation UNIQUEMENT quand TOUT ceci est vrai :
  1. Le signal diagnostique n'est pas ambigu (dépassement de seuil de métrique clair)
  2. La correction est à faible risque (pause, régulation, réduction mineure d'enchère)
  3. La correction est entièrement réversible
  4. La correction s'inscrit dans les garde-fous configurés
  5. Aucun autre problème simultané détecté sur la même campagne

Sinon → Alerter avec une recommandation et attendre l'approbation
```

---

## Piste d'audit

Chaque auto-correction est journalisée avec un contexte complet pour la revue et l'annulation.

### Structure d'entrée de journal

```json
{
  "timestamp": "2026-02-13T14:30:00Z",
  "campaign_id": "camp_abc123",
  "ad_set_id": "adset_def456",
  "ad_id": "ad_ghi789",
  "issue_detected": "landing_page_down",
  "diagnostic_evidence": {
    "http_status": 503,
    "consecutive_failures": 2,
    "last_healthy_check": "2026-02-13T14:00:00Z",
    "page_url": "https://example.com/offer"
  },
  "correction_applied": "campaign_paused",
  "expected_impact": "Zero ad spend until landing page restored",
  "reversal_instructions": "Resume campaign after landing page returns 200 for 2 consecutive checks. Set bid to 80% of pre-pause level for first 6 hours.",
  "approval_status": "auto_approved_within_guardrails",
  "health_score_before": 35,
  "health_score_after": null
}
```

Journaux stockés à `~/.claude-marketing/brands/{slug}/ops-log.json` et remontés via les commandes `/digital-marketing-pro:campaign-status` et `/digital-marketing-pro:anomaly-scan`.

---

## Vérifications de santé spécifiques à la plateforme

### Google Ads

| Vérification | Fréquence | Seuil critique | Action |
|---|---|---|---|
| Surveillance du score de qualité | Quotidien | Baisse de >2 points sur les mots-clés à forte dépense | Alerter avec le détail au niveau du mot-clé |
| Désapprobations d'annonces | Toutes les 30 min | Toute nouvelle désapprobation | Mettre en pause la publicité, alerter avec le détail de la violation de politique |
| Violations de politique | Toutes les 30 min | Toute violation | Mettre en pause la publicité affectée, escalader |
| Changement des insights d'enchère | Hebdomadaire | Baisse de la part d'impressions >15 % | Alerter avec une analyse concurrentielle |
| Gaspillage de termes de recherche | Quotidien | >20 % de dépense sur des termes de recherche non pertinents | Alerter avec des recommandations de mots-clés négatifs |

### Meta Ads

| Vérification | Fréquence | Seuil critique | Action |
|---|---|---|---|
| Score de pertinence / qualité | Quotidien | Le score tombe à « Inférieur à la moyenne » | Alerter avec une recommandation de renouvellement créatif |
| Fréquence vs lassitude | Quotidien | Fréquence >5 et CTR en déclin | Mettre en pause automatiquement la publicité, alerter pour un basculement créatif |
| Détection de phase d'apprentissage | Après des modifications | La campagne réentre en phase d'apprentissage | Alerter — ne pas faire d'autres changements pendant 48h |
| Limite de dépense du compte | Quotidien | À moins de 10 % de la limite | Alerter pour augmenter la limite avant que les campagnes ne se mettent en pause |
| Chevauchement d'audience | Hebdomadaire | >30 % de chevauchement entre les ensembles d'annonces | Alerter avec une recommandation de consolidation |

### Campagnes e-mail

| Vérification | Fréquence | Seuil critique | Action |
|---|---|---|---|
| Score de délivrabilité | Par envoi | Score <90 | Alerter avec une vérification d'authentification |
| Classification des rebonds | Par envoi | Rebond dur >1 % | Supprimer automatiquement les adresses rebondies, alerter |
| Métriques d'engagement | Par envoi | Taux d'ouverture <50 % de la moyenne des 5 derniers envois | Alerter avec une analyse de l'objet/liste |
| Taux de décroissance de liste | Hebdomadaire | >2 % d'adresses invalides par mois | Alerter avec une recommandation de nettoyage de liste |
| Frappes de piège à spam | Par envoi | Toute frappe de piège à spam | Alerter immédiatement — risque potentiel de liste noire |

### LinkedIn Ads

| Vérification | Fréquence | Seuil critique | Action |
|---|---|---|---|
| Compétitivité d'enchère | Quotidien | Enchère suggérée >2x l'enchère actuelle | Alerter avec une recommandation d'ajustement d'enchère |
| Saturation d'audience | Hebdomadaire | Fréquence >8 (petite audience) | Alerter — élargir l'audience ou réduire le budget |
| Taux de complétion de formulaire de lead | Quotidien | Chute de >30 % par rapport à la référence | Alerter — vérifier la longueur du formulaire, les champs, l'expérience mobile |
| Taux d'engagement du contenu | Quotidien | Taux d'engagement <0,3 % | Alerter avec une recommandation de renouvellement créatif |

---

## Flux d'escalade

### Structure des niveaux

| Niveau | Déclencheur | Action du système | Action humaine requise |
|---|---|---|---|
| **Niveau 1** | Problème unique, dans les garde-fous | Auto-corriger, journaliser, notifier via résumé | Revoir le prochain rapport d'opérations (aucune action immédiate) |
| **Niveau 2** | Problème unique, dépasse les garde-fous | Alerter avec une recommandation spécifique | Approuver, modifier, ou rejeter la recommandation |
| **Niveau 3** | Problèmes multiples simultanés sur la même campagne | Pause complète de la campagne (auto), rapport d'incident | Revoir l'incident, diagnostiquer la cause profonde, approuver le plan de récupération |
| **Niveau 4** | Problème au niveau du compte (paiement, politique, panne généralisée) | Toutes les campagnes en pause (auto), escalade d'incident | Investigation humaine complète, contacter le support de la plateforme si nécessaire |

### Timing d'escalade

- **Niveau 1 :** Auto-corrigé immédiatement. Résumé dans le prochain rapport `/digital-marketing-pro:campaign-status`.
- **Niveau 2 :** Alerte envoyée immédiatement. S'auto-escalade au Niveau 3 en l'absence de réponse sous 4 heures.
- **Niveau 3 :** Alerte envoyée immédiatement avec un indicateur « URGENT ». Les campagnes restent en pause jusqu'à réponse humaine.
- **Niveau 4 :** Alerte envoyée immédiatement. Toute activité arrêtée. Aucune reprise automatique à aucun niveau pour les événements de Niveau 4.

---

## Schémas de récupération

### Après une auto-pause (page d'atterrissage en panne)

```
1. Campagne mise en pause automatiquement à la détection
2. La surveillance de la page d'atterrissage continue à l'intervalle normal
3. La page d'atterrissage renvoie 200 OK pour 2 vérifications consécutives (30 min d'écart)
4. Le système reprend automatiquement la campagne à 80 % de l'enchère pré-pause
5. Surveiller pendant 6 heures à fréquence élevée
6. Si saine pendant 6 heures → restaurer l'enchère d'origine
7. Si le problème réapparaît sous 6 heures → remettre en pause et escalader au Niveau 2
```

### Après une régulation budgétaire

```
1. Budget quotidien réduit jusqu'à 20 %
2. Surveiller le rythme de dépense et le CPA pendant 24 heures
3. Si le rythme se normalise → montée en puissance progressive : +5 % par jour jusqu'au budget d'origine
4. Si le problème persiste → maintenir le budget régulé, escalader pour revue humaine
5. La restauration complète du budget prend 4-5 jours (montée en puissance prudente)
```

### Après un basculement créatif (une fois approuvé)

```
1. La création lassée est mise en pause, la variante suivante est activée
2. La nouvelle création entre en période d'évaluation (24 heures minimum)
3. Surveiller le CTR, le CPC, et le CVR vs la moyenne de campagne
4. Si la nouvelle création performe dans les 80 % de la moyenne de campagne → confirmer et continuer
5. Si la nouvelle création sous-performe → alerter avec une recommandation de tester des variantes supplémentaires
6. L'ancienne création entre en refroidissement de 7 jours avant d'être à nouveau éligible à la rotation
```

### Après un problème de délivrabilité (e-mail)

```
1. L'envoi affecté est signalé, les futurs envois vers le segment affecté sont mis en pause
2. Exécuter des diagnostics d'authentification (DKIM, SPF, DMARC)
3. Si un problème d'authentification est trouvé → alerter avec des instructions de correction, mettre en pause tous les envois
4. Si un problème de qualité de liste → exécuter un nettoyage de liste, retirer les adresses rebondies/non engagées
5. Après application de la correction → envoyer un petit lot de test (1 000 adresses)
6. Si le lot de test délivre >95 % en boîte de réception → reprendre l'envoi normal
7. Si le lot de test échoue encore → escalader au Niveau 3 pour investigation FAI
```

---

## Apprentissage continu

Le système auto-réparateur s'améliore avec le temps en enregistrant ce qui a fonctionné :

- **Suivi des faux positifs :** Quand une auto-correction était inutile (la baisse de métrique était transitoire), la journaliser et ajuster les seuils
- **Efficacité de la correction :** Suivre si le score de santé s'est amélioré après chaque correction. Sinon, le type de correction est peut-être erroné pour ce schéma de problème.
- **Calibration des seuils :** Revoir les seuils trimestriellement. Resserrer les seuils qui détectent de vrais problèmes. Assouplir les seuils qui génèrent du bruit.
- **Bibliothèque de schémas :** Construire une bibliothèque de schémas problème → diagnostic → correction. De nouveaux schémas sont ajoutés à partir des incidents de Niveau 2/3 après résolution humaine.

> **Principe clé :** Les opérations auto-réparatrices existent pour protéger le budget et maintenir la santé des campagnes durant les heures où aucun humain ne surveille. Le système devrait être prudent — il vaut toujours mieux mettre en pause et préserver le budget que de tenter une correction risquée qui pourrait aggraver les choses. En cas de doute, mettre en pause et escalader.

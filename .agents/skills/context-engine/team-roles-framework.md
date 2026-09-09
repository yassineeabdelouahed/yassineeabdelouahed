# Cadre des rôles d'équipe — Permissions, flux de travail et capacité

Comment le plugin Digital Marketing Pro gère les rôles d'équipe, les chaînes d'approbation, les flux de travail inter-équipes, les opérations régionales et la planification de capacité pour les équipes marketing d'agence et internes.

---

## Section 1 : Définitions des rôles

| Rôle | Permissions par défaut | Canaux | Niveau d'approbation | Capacité typique |
|---|---|---|---|---|
| **agency-admin** | Toutes les permissions | Tous les canaux | Critique | 10 tâches/semaine (charge de gestion) |
| **brand-manager** | Toutes sauf la gestion des identifiants | Tous les canaux | Élevé | 15 tâches/semaine |
| **content-lead** | publish-blog, schedule-social, content-repurpose, video-script | Canaux de contenu (blog, social, vidéo) | Moyen | 20 tâches/semaine |
| **media-buyer** | launch-ad-campaign, budget-tracker, retargeting-strategy | Canaux payants (Google, Meta, LinkedIn, TikTok, Amazon) | Moyen | 15 tâches/semaine |
| **email-manager** | send-email-campaign, segment-audience, ab-test-plan | Canal e-mail | Moyen | 20 tâches/semaine |
| **social-manager** | schedule-social, review-response | Canaux sociaux (toutes plateformes) | Moyen | 25 tâches/semaine |
| **analytics-lead** | performance-check, anomaly-scan, data-export, exec-summary | Tous les canaux (lecture seule) | Moyen | 15 tâches/semaine |
| **seo-specialist** | tech-seo-audit, local-seo-audit, keyword-research, publish-blog (revue SEO) | Canal organique (recherche, blog) | Faible | 18 tâches/semaine |
| **cro-specialist** | ab-test-plan, analyse de formulaire, revue de page d'atterrissage | Canal site web | Faible | 15 tâches/semaine |
| **growth-engineer** | martech-audit, lead-import, pipeline-update | Inter-canaux | Faible | 12 tâches/semaine |

---

## Section 2 : Matrice de permissions

Grille complète des permissions. « Oui » = autorisé, « --- » = non autorisé.

| Rôle | publish-blog | send-email | launch-ad | schedule-social | crm-write | approve-low | approve-medium | approve-high | approve-critical | manage-credentials | manage-team | view-portfolio | export-data |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **agency-admin** | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui |
| **brand-manager** | Oui | Oui | Oui | Oui | Oui | Oui | Oui | Oui | --- | --- | Oui | Oui | Oui |
| **content-lead** | Oui | --- | --- | Oui | --- | Oui | Oui | --- | --- | --- | --- | --- | Oui |
| **media-buyer** | --- | --- | Oui | --- | --- | Oui | Oui | --- | --- | --- | --- | --- | Oui |
| **email-manager** | --- | Oui | --- | --- | --- | Oui | Oui | --- | --- | --- | --- | --- | Oui |
| **social-manager** | --- | --- | --- | Oui | --- | Oui | Oui | --- | --- | --- | --- | --- | Oui |
| **analytics-lead** | --- | --- | --- | --- | --- | Oui | --- | --- | --- | --- | --- | Oui | Oui |
| **seo-specialist** | Oui | --- | --- | --- | --- | Oui | --- | --- | --- | --- | --- | --- | Oui |
| **cro-specialist** | --- | --- | --- | --- | --- | Oui | --- | --- | --- | --- | --- | --- | Oui |
| **growth-engineer** | --- | --- | --- | --- | Oui | Oui | --- | --- | --- | --- | --- | --- | Oui |

---

## Section 3 : Chaînes d'approbation par niveau de risque

| Niveau de risque | Exemples | Approbateur | Escalade |
|---|---|---|---|
| **Faible** | Publication sociale, réponse à un commentaire de blog, rapport interne | Tout membre de l'équipe ayant la permission du canal concerné | Une seule approbation suffit |
| **Moyen** | Publication de blog, envoi de campagne e-mail, lancement de publicité, campagne sociale | Responsable de canal (content-lead pour le blog, email-manager pour l'e-mail, media-buyer pour les publicités, social-manager pour le social) | Si aucun responsable de canal n'est assigné, brand-manager approuve |
| **Élevé** | Changement de budget > 20 %, lancement d'un nouveau canal, réponse à un concurrent, brouillon de communication de crise | brand-manager doit approuver | Dans un contexte d'agence, le directeur de compte (rôle brand-manager) approuve |
| **Critique** | Changement de budget > 50 %, contenu sensible sur le plan juridique/conformité, excuse publique, pivot de marque | agency-admin doit approuver | Pour les secteurs réglementés, une revue de conformité est requise avant l'approbation admin (processus en deux étapes) |

**Dérogation d'urgence :** agency-admin peut déroger à toute chaîne d'approbation avec une raison documentée. Toutes les dérogations sont journalisées dans la piste d'audit avec : raison de la dérogation, approbateur d'origine, horodatage, et référence du contenu.

**Délai d'approbation :** Si aucune action n'est prise dans les 24 heures (configurable par marque), la demande s'escalade au niveau suivant. Les approbations critiques ne s'auto-escaladent pas — elles bloquent jusqu'à approbation explicite.

---

## Section 4 : Flux de travail inter-équipes

Schémas de transmission documentés qui définissent comment le travail circule entre les rôles.

### Pipeline de contenu

```
Brief (strategist) → Draft (content-lead) → SEO Review (seo-specialist) → Brand Review (brand-manager) → Publish (execution-coordinator) → Monitor (analytics-lead)
```

| Étape | Responsable | Intrant | Livrable | SLA |
|---|---|---|---|---|
| Brief | Stratège / brand-manager | Objectifs de campagne, audience, messages clés | Brief de contenu avec mots-clés, ton, CTA | 1 jour ouvré |
| Rédaction | content-lead | Brief de contenu | Contenu au brouillon (blog, social, e-mail) | 2-3 jours ouvrés |
| Revue SEO | seo-specialist | Contenu au brouillon | Brouillon optimisé SEO avec placement de mots-clés, liens internes, métadonnées | 1 jour ouvré |
| Revue de marque | brand-manager | Brouillon revu SEO | Approuvé ou notes de révision | 1 jour ouvré |
| Publication | Coordinateur d'exécution | Contenu approuvé | Contenu publié avec suivi | Le jour même |
| Surveillance | analytics-lead | Contenu publié | Rapport de performance à 7j, 30j, 90j | Continu |

### Lancement de campagne

```
Strategy (strategist) → Creative (content-lead) → Audience (media-buyer) → Budget Approval (brand-manager) → Launch (execution-coordinator) → Optimize (media-buyer) → Report (analytics-lead)
```

### Nurturing de leads

```
Capture (growth-engineer) → Score (automation) → Segment (email-manager) → Nurture Sequence (email-manager) → Sales Handoff (crm-manager) → Close (sales/CRM) → Report (analytics-lead)
```

### Réponse à une crise

```
Detect (performance-monitor) → Alert (slack notification) → Assess (brand-manager) → Pause Campaigns (media-buyer) → Draft Response (content-lead) → Approve (agency-admin) → Execute (execution-coordinator)
```

**SLA de crise :** Détection à évaluation sous 1 heure. Évaluation à exécution de la réponse sous 4 heures. Toutes les campagnes payantes actives mises en pause dans les 30 minutes suivant l'évaluation.

---

## Section 5 : Gestion régionale

### Hiérarchie

Les régions sont organisées en une hiérarchie à trois niveaux : **Région** → **Marché** → **Locale** (par ex., APAC → Japon → ja-JP).

### Paramètres par région

| Paramètre | Description | Exemple |
|---|---|---|
| Fuseau horaire | Fuseau horaire principal pour la programmation | `America/New_York`, `Asia/Tokyo` |
| Langue principale | Langue de contenu par défaut | `en-US`, `ja-JP`, `pt-BR` |
| Jeu de règles de conformité | Réglementations applicables en matière de confidentialité/publicité | RGPD, CCPA, CASL, PDPA |
| Plateformes préférées | Canaux prioritaires pour la région | Google, Meta, LINE, WeChat |
| Devise | Devise de reporting et de budget | USD, EUR, JPY, BRL |
| Heures d'ouverture | Heures de travail standard | 9h00-18h00 heure locale |

### Préférences de plateforme par région

| Région | Plateformes principales | Remarques |
|---|---|---|
| **Amérique du Nord** | Google, Meta, LinkedIn, Twitter/X, TikTok | Anglais principal, espagnol secondaire. CAN-SPAM + CCPA/lois d'état. |
| **Europe** | Google, Meta, LinkedIn, Instagram | Conformité RGPD obligatoire. Multilingue requis (minimum : anglais + local). |
| **APAC** | Google, LINE (Japon), WeChat/Weibo (Chine), KakaoTalk (Corée), Meta | Localisation critique. Les préférences de plateforme varient considérablement selon le marché. |
| **LATAM** | Google, Meta, WhatsApp, Instagram, TikTok | Portugais (Brésil), espagnol (reste). WhatsApp est un canal marketing principal. |
| **MEA** | Google, Meta, Instagram, TikTok, Snapchat | Support RTL arabe requis. Calendrier des fêtes locales critique (Ramadan, Aïd). |

### Programmation tenant compte du fuseau horaire

- Tout le contenu programmé utilise le fuseau horaire de la région de la marque, pas l'UTC
- Heures calmes pour SMS/push : 21h-8h heure locale (ne jamais envoyer pendant les heures calmes)
- Restriction de marketing nocturne en Corée du Sud : 21h-8h heure locale (exigence légale selon la PIPA)
- Campagnes multi-régions : programmer des envois par région à l'heure optimale de chaque région
- Utiliser `send-time-optimizer.py --industry {industry} --audience-type {type} --timezone {offset}` pour des recommandations ajustées au fuseau horaire (ajouter `--history {file}` lorsque le journal d'envoi de la région existe — les données de première partie battent la référence)

---

## Section 6 : Planification de capacité

### Pondération des tâches

| Type de tâche | Poids (unités) | Durée typique | Fréquence |
|---|---|---|---|
| Article de blog | 3 | 2-4 heures | 2-4x/mois |
| Publication sociale (par plateforme) | 1 | 30 min | 3-7x/semaine |
| Campagne e-mail | 4 | 3-5 heures | 2-4x/mois |
| Configuration de campagne publicitaire | 8 | 4-8 heures | 1-2x/mois |
| Cycle d'optimisation publicitaire | 2 | 1-2 heures | 2-3x/semaine |
| Rapport (pulse hebdomadaire) | 1 | 30 min (généré automatiquement) | Hebdomadaire |
| Rapport (revue mensuelle) | 4 | 3-4 heures | Mensuel |
| Préparation QBR | 10 | 8-12 heures | Trimestriel |
| Audit SEO | 6 | 4-6 heures | Mensuel |
| Import de données CRM | 3 | 1-3 heures | Au besoin |
| Revue de page d'atterrissage | 2 | 1-2 heures | Par campagne |
| Analyse de test A/B | 2 | 1-2 heures | Par test |

### Seuils d'utilisation

| Utilisation | Statut | Action |
|---|---|---|
| < 70 % | Disponible | Disponible pour du nouveau travail, peut prendre en charge des marques supplémentaires |
| 70-85 % | Optimal | Rythme durable, livrable de qualité attendu |
| 85-95 % | Proche de la capacité | Signaler au brand-manager — reporter le travail non urgent, aucune nouvelle marque |
| > 95 % | Surchargé | Réaffecter les tâches immédiatement, escalader vers agency-admin |

### Auto-assignation

Lors de l'assignation de tâches, `team-manager.py --action check-capacity` recommande le meilleur membre de l'équipe en fonction de :

1. **Correspondance de rôle** — Le rôle du membre de l'équipe couvre-t-il les permissions requises ?
2. **Expertise de canal** — Est-ce son canal principal ou secondaire ?
3. **Utilisation actuelle** — Est-il sous le seuil de 85 % ?
4. **Alignement régional** — Couvre-t-il le fuseau horaire et la langue du marché cible ?
5. **Performance historique** — A-t-il déjà mené à bien des tâches similaires avec succès ?

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/team-manager.py" --brand {slug} --action check-capacity --data '{"task_type":"email-campaign","region":"europe","weight":4}'
```

Résultat : liste classée des membres d'équipe disponibles avec les pourcentages d'utilisation et les scores d'adéquation.

---

## Section 7 : Reporting exécutif

### Hiérarchie de remontée des KPI

```
Channel Metrics → Brand Aggregate → Portfolio Summary
```

| Niveau | Métriques | Audience | Fréquence |
|---|---|---|---|
| **Canal** | KPI spécifiques à la plateforme (CTR, CPC, taux d'ouverture, impressions) | Responsables de canal | Hebdomadaire |
| **Marque** | CAC mixte, ROAS, contribution au pipeline, taux d'engagement | brand-manager | Mensuel |
| **Portefeuille** | ROI marketing total, CAC pondéré, ratio LTV:CAC, part de marché | agency-admin / direction générale | Trimestriel |

### Métriques pour la direction générale

| Métrique | Définition | Référence cible |
|---|---|---|
| ROI marketing total | (Chiffre d'affaires attribué au marketing - Dépense marketing) / Dépense marketing | > 3:1 pour le SaaS B2B, > 4:1 pour l'e-commerce |
| Coût d'acquisition client (CAC) | Dépense marketing + vente totale / Nouveaux clients acquis | Dépend du secteur (voir industry-profiles.md) |
| Valeur vie client (LTV) | Chiffre d'affaires moyen par client x durée de vie moyenne | Ratio LTV:CAC > 3:1 |
| Part de marché (estimée) | Part de voix + part de recherche + part sociale | Tendance à la hausse trimestre sur trimestre |
| Score de santé de marque | Composite : NPS + notoriété de marque + sentiment + part de voix | > 70/100 |

### Format du résumé exécutif

Résumé d'une page généré par `/digital-marketing-pro:exec-summary` :

| Section | Contenu | Longueur |
|---|---|---|
| KPI phares | 5 métriques avec flèches de tendance (hausse/baisse/stable vs période précédente) | 5 lignes |
| Top 3 des succès | Résultats positifs à plus fort impact avec chiffres précis | 3 puces |
| Top 3 des risques | Problèmes nécessitant une attention avec actions recommandées | 3 puces |
| Performance par canal | Mini-tableau : canal, dépense, chiffre d'affaires, ROI, tendance | 5-8 lignes |
| Annexe détaillée | Tableaux de données complets, ventilations au niveau campagne, notes méthodologiques | En pièce jointe |

**Livraison :** La commande `/digital-marketing-pro:exec-summary` orchestre trois agents : `agency-operations` (contexte de portefeuille), `analytics-analyst` (données et métriques), et `marketing-strategist` (enseignements et recommandations). Le livrable est formaté pour un export Google Slides ou Google Sheets via MCP.

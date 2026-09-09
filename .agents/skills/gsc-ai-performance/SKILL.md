---
name: gsc-ai-performance
description: "Établir la référence et interpréter le rapport AI Performance de Google Search Console — impressions combinées AI Overviews + AI Mode, pages citées, répartition pays et appareil (pas de données de clic, l'attribution reste dans GA4) — à partir d'un export CSV fourni par l'utilisateur, avec une recommandation d'opt-out IA dans Search Console et un tableau de bord qualité verrouillé. Se déclenche sur « /digital-marketing-pro:gsc-ai-performance », « lis le nouveau rapport IA de GSC », « établis la référence de notre visibilité IA », « combien d'impressions AI Overviews recevons-nous », « devrions-nous nous retirer des résultats IA ». Analyse et archive les exports via gsc-ai-performance.py, réconcilie les sondages avec /digital-marketing-pro:aeo-audit, et alimente /digital-marketing-pro:seo-drift."
argument-hint: "[brand-name or site URL]"
---

# /digital-marketing-pro:gsc-ai-performance

## Objectif

Google a déployé un nouveau **rapport AI Performance de GSC** le **3 juin 2026**
([annonce de Search Engine Land](https://searchengineland.com/google-search-console-ai-performance-reports-and-controls-to-block-your-content-in-ai-responses-479298))
couvrant à la fois AI Overviews et AI Mode dans une seule surface combinée. Cette
compétence vous aide à (a) établir la référence de visibilité d'une marque dans le
nouveau rapport, (b) comprendre les compromis des métriques, et (c) décider d'utiliser
ou non le nouveau bouton d'opt-out intégré à Search Console.

## Ce qui est réellement nouveau (3 juin 2026)

| Métrique / surface | Statut |
|---|---|
| Impressions combinées AI Overviews + AI Mode | NOUVEAU — un seul rapport pour les deux surfaces |
| Pages citées (par groupe de requêtes) | NOUVEAU |
| Répartition par pays | NOUVEAU |
| Répartition par appareil | NOUVEAU |
| Filtrage par plage de dates | NOUVEAU |
| **Données de clic** | **NON INCLUSES** (Google les a explicitement exclues — mise en garde importante pour l'attribution) |
| Bouton d'opt-out dans Search Console | NOUVEAU (remplace la nécessité de déployer robots.txt / balises meta pour l'exclusion spécifique à l'IA) |
| Surface API | **PAS ENCORE PUBLIÉE** — interface uniquement (toujours vrai en juillet 2026) |
| **Surfaces génératives de Discover** | **NOUVEAU (juin–juillet 2026)** — la famille de rapports couvre désormais aussi les fonctionnalités d'IA générative dans Discover ([annonce Google](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)) |
| Disponibilité des données | Rétroactif depuis le **18 mai 2026** ; accès élargi largement en juillet 2026, avec un document d'aide complémentaire approfondi sur les contrôles IA |
| Déploiement géographique | Royaume-Uni d'abord, puis mondial ([source](https://searchengineland.com/google-search-console-ai-performance-reports-and-controls-to-block-your-content-in-ai-responses-479298)) |

**Conseil d'interprétation critique :** Le rapport montre quand vos pages ont été
MONTRÉES dans AI Overviews / AI Mode, pas quand les utilisateurs ont cliqué pour s'y
rendre. Comme les données de clic sont absentes, toute attribution en aval du trafic IA
doit provenir de votre analytics (le nouveau canal `AI Assistant` de GA4 — ajouté le 13
mai 2026 — est la surface analytics correspondante ; voir
`/digital-marketing-pro:analytics-insights`).

## Quand utiliser cette compétence

- Établir la référence de visibilité IA pour une nouvelle marque (première capture de
  30 jours des impressions AI Overview + AI Mode)
- Comparer la visibilité IA réelle de la marque aux résultats synthétiques de
  `aeo-audit` — le rapport GSC montre les impressions RÉELLES vs les requêtes sondées
  par `aeo-audit`
- Décider d'activer ou non le bouton d'opt-out IA dans GSC pour une marque (secteur
  réglementé, préoccupation de sécurité de marque, ou contenu payant/derrière connexion)
- Preuve pour une revue trimestrielle d'affaires — « les impressions de recherche IA ont
  augmenté de X% » en utilisant des données Google faisant autorité

## Contexte de marque (appliqué automatiquement)

1. Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis
   charger `~/.claude-marketing/brands/{slug}/profile.json`
2. Si aucune marque n'existe : demander « Configurer une marque d'abord
   (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut
3. Appliquer les conseils spécifiques au secteur depuis
   `skills/context-engine/industry-profiles.md` (les secteurs YMYL pourraient vouloir
   activer l'opt-out jusqu'à ce qu'un audit E-E-A-T soit propre)
4. Se référer à `skills/context-engine/compliance-rules.md` pour les règles spécifiques
   à la juridiction (marchés de l'UE — voir
   `skills/context-engine/eu-code-of-practice.md` pour le contexte de transparence de
   l'Article 50)

## Convention de sortie numérotée

Toutes les sorties vont dans
`${CLAUDE_PLUGIN_DATA}/{brand}/seo/gsc-ai-performance/{YYYY-MM-DD}/` :

```
00-input.md                  brand domain, GSC access status, UK-cohort flag, date range
01-access-check.md           verification result; if no access, instructions for adding the user
02-export.csv                raw CSV export from GSC (preserved for reproducibility)
03-script-output.json        gsc-ai-performance.py parsed output (impressions, pages, countries, devices)
04-reconciliation.md         vs aeo-audit synthetic probe results — gap analysis
05-opt-out-decision.md       y/n on the in-SC opt-out toggle, with rationale
06-quality-scorecard.md      the gates below
PLAN.md                      single-page summary with tracking cadence
```

## Tableau de bord qualité

| Porte | Ce qu'elle vérifie |
|---|---|
| **gsc_access_verified** | L'utilisateur a confirmé que Search Console a validé la propriété du domaine de la marque |
| **export_completeness** | Le CSV contient ≥ 1 jour de données + au minimum la colonne des impressions |
| **cohort_documented** | `00-input.md` note si la marque fait partie du déploiement UK (données en direct) ou du déploiement mondial en attente (pas de données encore — attendre) |
| **reconciliation_done** | `04-reconciliation.md` recoupe avec le dernier aeo-audit de la marque |

Si la marque ne fait pas encore partie du déploiement UK, le cadre de portes s'applique
toujours mais `export_completeness` sera `fail` jusqu'au déploiement mondial de Google —
c'est attendu, pas une régression.

## Transferts en chaîne

- **En amont :** `/digital-marketing-pro:brand-setup` pour la vérification de propriété
- **En aval :**
  - `/digital-marketing-pro:aeo-geo` — optimisation basée sur ce qui apparaît (ou pas)
  - `/digital-marketing-pro:seo-drift` — suivi mois par mois à l'aide des CSV exportés
  - `/digital-marketing-pro:analytics-insights` — l'attribution du canal AI Assistant de
    GA4 comble l'écart côté clic

## Processus

1. **Vérification d'accès** — confirmer que l'utilisateur dispose d'un accès vérifié à
   Google Search Console pour le domaine de la marque. Si la marque fait partie de la
   cohorte du déploiement UK, le rapport est en direct ; sinon il apparaîtra quand le
   déploiement mondial l'atteindra.
2. **Localiser le rapport** — Search Console → menu de gauche → **Performance** →
   basculer sur l'onglet **Résultats de recherche** → chercher le nouvel onglet **AI
   Overviews & AI Mode** (le titre de l'onglet peut varier légèrement pendant le
   déploiement ; le nom de travail de Google pendant les tests était « Search
   Generative AI »). Sur les déploiements pré-onglet, les données peuvent aussi
   apparaître dans le rapport Performance existant avec un filtre AI Features.
3. **Exécuter l'export de référence** — définir la plage de dates sur « 28 derniers
   jours » (ou le maximum disponible depuis le déploiement), exporter en CSV/Sheets via
   le bouton d'export de Search Console. Capturer : impressions, pages, répartition
   pays, répartition appareil, principales requêtes (si disponible dans votre cohorte).
   Puis analyser et archiver avec le script d'assistance :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/gsc-ai-performance.py" \
       --brand {slug} \
       --csv "${CLAUDE_PLUGIN_DATA}/{brand}/seo/gsc-ai-performance/{date}/02-export.csv" \
       --format json \
       --archive
   ```
   Seuls les indicateurs réels : `--brand` (requis), `--csv` (chemin vers l'export
   GSC), `--api` (au mieux ; Google n'a pas encore publié d'API pour le rapport IA),
   `--site`, `--format text|json`, `--archive`. Il n'y a **pas** de sous-commande
   `summary` — le script lit le CSV et produit les métriques analysées.
4. **Réconcilier avec `aeo-audit`** — les requêtes synthétiques de
   `/digital-marketing-pro:aeo-audit` testent ce que les moteurs IA *pourraient*
   afficher ; le rapport GSC montre ce qu'ils ont *réellement* affiché. Des écarts
   significatifs dans un sens ou dans l'autre sont des signaux :
   - GSC montre bien plus que ce que aeo-audit a trouvé → votre ensemble de requêtes de
     test est trop restreint ; élargissez-le
   - aeo-audit a trouvé la marque dans les résultats synthétiques mais GSC montre peu
     d'impressions → faible volume de requêtes pour ces sujets ; réorientez l'effort AEO
     vers des sujets à plus fort volume
5. **Décision d'opt-out** — si l'un des éléments suivants s'applique, envisager le
   bouton d'opt-out dans GSC :
   - Le secteur présente un risque YMYL / réglementaire et l'E-E-A-T de la marque n'est
     pas encore entièrement audité
   - Le contenu de la marque est payant ou derrière connexion (l'affichage partiel par
     l'IA peut nuire au tunnel)
   - La marque fait l'objet d'une gestion active de réputation — apparaître dans les
     réponses IA amplifie le sentiment que les modèles IA ont déjà absorbé
   - L'équipe éditoriale veut d'abord livrer des corrections via les propriétés propres
     de la marque, pas via la synthèse IA
6. **Exécuter des recommandations d'optimisation** — pour les marques qui NE se
   retirent PAS, router vers `/digital-marketing-pro:aeo-geo` pour le plan
   d'optimisation (cohérence d'entité, extraits citables, alignement du knowledge
   graph).
7. **Mettre en place un suivi mensuel** — planifier une référence `gsc-ai-performance`
   récurrente (export CSV → dossier archivé daté) afin que des lignes de tendance
   émergent au cours des 6 à 12 prochains mois à mesure que l'adoption de la recherche
   IA croît.

## Résultat

Un rapport structuré de performance IA GSC contenant :

- **Métriques de référence** — impressions de la période actuelle, pages, répartition
  pays, répartition appareil
- **Analyse de tendance** — évolution période sur période (là où des données
  antérieures existent)
- **Tableau de réconciliation** — réel GSC vs résultats synthétiques `aeo-audit`, avec
  notes d'écart
- **Recommandation d'opt-out** — décision explicite d'opt-in / opt-out avec
  justification ancrée dans le profil sectoriel et le contexte de marque
- **Transfert d'optimisation** — liste des sujets à fort impact où la marque est
  sous-citée (router vers `aeo-geo`)
- **Cadence de suivi** — calendrier d'export mensuel recommandé, chemin d'archive

## Mises en garde et limites connues (juin 2026)

1. **Pas de données de clic.** Google a explicitement choisi de ne pas inclure de
   métriques de clic. L'attribution IA vers site web doit provenir de GA4 (le nouveau
   groupe de canaux `AI Assistant`, ajouté le 13 mai 2026, capture les référents
   `Medium=ai-assistant` depuis ChatGPT/Gemini/Claude). Note : le canal de GA4 peut ou
   non attribuer spécifiquement le trafic AI Mode propre à Google de la même façon —
   vérifiez dans votre propriété.
2. **Interface uniquement au lancement.** Pas d'API publique. Attendre que Google
   publie le rapport IA sous l'API Search Analytics de Search Console
   (`searchanalytics.query`) avant d'automatiser dessus. L'automatisation actuelle doit
   s'appuyer sur l'export CSV + téléversement manuel.
3. **Déploiement achevé largement en juillet 2026.** Le rapport a commencé par le
   Royaume-Uni mais l'accès s'est élargi largement en juillet 2026, donc la plupart des
   propriétés devraient maintenant le voir. Notez la date à laquelle vous voyez des
   données pour la première fois afin que les comparaisons mois sur mois suivantes
   partent d'une véritable référence.
4. **L'emplacement de l'onglet peut bouger pendant le déploiement.** Google affine
   souvent l'interface dans les 30 à 60 premiers jours. Si le chemin exact de l'onglet
   diffère de l'étape 2 ci-dessus, cherchez n'importe où dans la zone Performance >
   Résultats de recherche les libellés « AI », « Generative », « AI Mode » ou « AI
   Overviews ».
5. **Ne comparez pas les impressions AI Overviews aux impressions SERP classiques une
   pour une.** AI Overviews s'affiche différemment — une « impression » là-bas signifie
   que votre page a été utilisée comme source d'ancrage, ce qui est une barre plus
   stricte qu'apparaître dans un résultat classique à 10 liens bleus.

## Agents utilisés

- `seo-specialist` (principal) — pour l'interprétation et la mise en forme des recommandations
- `analytics-analyst` — pour la réconciliation GA4 lorsque les données du canal AI Assistant sont disponibles
- `brand-guardian` — pour la décision d'opt-out lorsque la sécurité de marque ou la conformité est en jeu

## Voir aussi

- `/digital-marketing-pro:aeo-audit` — sondage synthétique des moteurs IA
- `/digital-marketing-pro:aeo-geo` — plan d'optimisation pour la visibilité IA
- `/digital-marketing-pro:analytics-insights` — attribution du canal AI Assistant de GA4
- `skills/context-engine/eu-code-of-practice.md` — contexte de transparence de l'Article 50 de l'UE pour le contenu cité par l'IA
- `scripts/gsc-ai-performance.py` — script d'assistance (placeholder en attendant que Google publie une API ; lit l'export CSV aujourd'hui)

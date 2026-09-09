---
name: campaign-audit
description: "Inventorier et noter tout ce qui tourne actuellement pour une marque sur la recherche payante, les réseaux sociaux payants, l'e-mail, l'organique, le SEO, l'AEO/GEO, le CRM et l'analytics — produit un document d'audit daté avec un tri à 4 niveaux (sain / gain rapide / lacune stratégique / signal d'alerte), un backlog de gains rapides, et une section sur la posture de conformité. Strictement en lecture seule : ne met jamais en pause, ne modifie ni ne lance quoi que ce soit. Se déclenche sur \"/digital-marketing-pro:campaign-audit\", \"what's currently running for this brand\", \"audit our existing campaigns\", \"we just inherited this account\", \"where is budget leaking\". Nécessite un profil de marque validé (exécuter validate-profile d'abord) ; les connecteurs manquants se dégradent proprement en constats. Alimente /digital-marketing-pro:campaign-plan et se combine avec /digital-marketing-pro:performance-check."
user-invocable: true
triggers:
  - audit existing campaigns
  - campaign audit
  - what's currently running for this brand
  - inventory active marketing
  - current-state campaign audit
  - run first campaign audit
allowed-tools: Read Bash Glob Grep
---

# /digital-marketing-pro:campaign-audit — Audit transversal de l'état actuel

Cette compétence produit un document unique décrivant **tout ce qui tourne actuellement pour une marque sur chaque canal** — ce qui est en ligne, ce qui dépense, ce qui performe, où le budget fuit, ce qui est discrètement cassé. C'est le préalable à tout `/digital-marketing-pro:campaign-plan`, `/digital-marketing-pro:performance-report` ou rafraîchissement de `/digital-marketing-pro:competitor-analysis` mené en connaissance de cause.

## Efficacité du contexte

Compétence lourde. **Grep avant Read** sur tout fichier référencé, puis `Read` uniquement les plages trouvées avec `offset` + `limit`. Listez le répertoire de données de la marque (`~/.claude-marketing/brands/{slug}/`, ou `$CLAUDE_PLUGIN_DATA/digital-marketing-pro/brands/{slug}/` quand cette variable d'environnement est définie) avant d'ouvrir les fichiers. En cas de ré-invocation en cours de session, ignorez les fichiers déjà en contexte.

Utilisez cette compétence :

- **Pendant l'intégration d'une agence** (étape 8 du flux d'opérations d'agence) — dans la première semaine de reprise d'un nouveau client, avant de proposer quoi que ce soit de nouveau.
- **Avant un rafraîchissement de campagne trimestriel** — pour établir la ligne de base sur laquelle vous allez argumenter.
- **Après une acquisition ou une restructuration de marque** — quand la propriété du marketing change de mains et que la nouvelle équipe a besoin d'une source unique de vérité sur « qu'est-ce qu'on fait tourner réellement ? ».
- **Après une longue pause dans le travail sur le compte** (vacances, congé parental, interruption de contrat) — pour rétablir la connaissance de la situation sans rien modifier.

## Pourquoi cette compétence existe

Quand des agences reprennent une marque, le « plan de campagne » du précédent titulaire est généralement une feuille Google à 40 onglets, six tableaux de bord sur trois plateformes, et une liste d'intégrations API dont plus personne ne se souvient. Sans audit explicite, la nouvelle équipe soit (a) laisse discrètement les choses tourner pendant qu'elle monte en puissance — et hérite des erreurs, soit (b) rase tout et reconstruit — et perd la connaissance institutionnelle de ce qui fonctionnait réellement.

Cette compétence produit la troisième option : un document d'audit unique qui capture proprement l'état en cours, note chaque élément, et alimente directement la prochaine conversation de planification. Elle est **en lecture seule** — elle ne met jamais en pause, ne modifie ni ne tue une campagne.

## Ce qui est audité

| Canal | Ce qui est inventorié | Ce qui est noté |
|---|---|---|
| **Recherche payante** | Campagnes Google Ads / Microsoft Ads actives, groupes d'annonces, mots-clés, budgets journaliers, dates de dernière modification | Efficacité de la dépense, quality scores, santé du suivi de conversion, couverture des mots-clés négatifs, groupes d'annonces morts qui dépensent encore |
| **Réseaux sociaux payants** | Campagnes Meta / LinkedIn / TikTok / Pinterest / X actives + audiences + créations | Fréquence, statut de phase d'apprentissage, fatigue créative, chevauchement d'audiences, exactitude de la fenêtre d'attribution |
| **Retail media** | Comptes et campagnes Amazon Ads, Walmart Connect, Instacart Ads | ACOS, répartition marque vs non-marque, part de voix pour les SKU principaux |
| **E-mail** | Automatisations / parcours actifs (Klaviyo, HubSpot, ActiveCampaign, Brevo, Marketo), listes d'envoi, indicateurs de délivrabilité | Taux d'ouverture, réputation d'envoi, ancienneté d'hygiène de liste, provenance du consentement RGPD/DPDPA pour chaque liste, modèles cassés |
| **Réseaux sociaux organiques** | Cadence de publication par plateforme (90 derniers jours), taux d'engagement, tendance des abonnés | Cohérence de la cadence, conformité à la divulgation IA, couverture des locales |
| **Contenu / SEO** | Pages publiées ces 90 derniers jours, mots-clés positionnés (top 50), état du balisage schema, densité de maillage interne | Santé de l'indexation (GSC), Core Web Vitals, taux de citation dans les AI Overviews, éléments de dette technique |
| **AEO / GEO** | Taux de mention de la marque sur Google AI Mode, Perplexity, ChatGPT search, Claude search, Copilot, application Gemini | Taux de mention vs top 5 concurrents, part de citation, part de recommandation |
| **CRM + automatisation** | Workflows actifs dans HubSpot / Salesforce / Pipedream / Zapier / Make, segments utilisés, correspondances d'étapes de cycle de vie | Workflows orphelins (sans exécution récente), connecteurs cassés, taux de contacts en doublon |
| **Web analytics** | Propriétés GA4 + GSC reliées à quels domaines, événements de conversion configurés, état du mode consentement | Santé du déclenchement des tags, cohérence de la nomenclature des événements, modèle d'attribution sélectionné |
| **Influenceurs / RP** | Contrats créateurs actifs (en cours + en pause), livrables contractualisés, conformité de divulgation FTC | Coût par engagement, vérification d'authenticité de l'audience du créateur, exhaustivité de la divulgation |
| **Posture de conformité** | Déclarations actives au niveau marque, état de divulgation de l'article 50 de l'AI Act européen sur le contenu IA, état de signature C2PA, version de la bannière de cookies/consentement | Chaque déclaration réglementée reliée à une source primaire ; divulgations manquantes escaladées |

L'audit capture aussi **ce qui NE se passe PAS** mais devrait — canaux sans aucune activité, pixels de suivi manquants, jetons API expirés, automatisations abandonnées.

## Processus

### Étape 0 — Prérequis

Cette compétence suppose :

1. Le profil de marque existe et `/digital-marketing-pro:validate-profile --brand {brand}` renvoie `passed` ou `passed_with_warnings`. S'il renvoie `blocked`, refusez et dites à l'utilisateur de corriger d'abord les blocages — auditer sur un profil cassé produit une ligne de base corrompue.
2. Les identifiants des connecteurs pour les canaux concernés sont configurés (Google Ads, Meta Business, LinkedIn Campaign Manager, la plateforme e-mail, le CRM, GA4, GSC, etc.). Les connecteurs manquants dégradent l'audit avec élégance — ils ne le bloquent pas ; l'audit note simplement « {canal} ignoré — connecteur non configuré » dans la section concernée.

### Étape 1 — Confirmer la marque active et le périmètre de l'audit

Si `--brand <slug>` a été fourni, utilisez-le. Sinon, utilisez la marque active. Si ni l'un ni l'autre, erreur : `"--brand <slug> requis, ou exécutez d'abord /digital-marketing-pro:switch-brand."`

Si `--channels <list>` a été fourni (ex. `paid_search,email,seo`), limitez-vous à ces canaux. Sinon, auditez chaque canal pour lequel un connecteur est configuré.

Si `--quick` a été fourni, n'exécutez que la passe d'inventaire au niveau canal (sautez la récupération de performance historique et la vérification AEO/GEO) — utile pour un instantané rapide « qu'est-ce qui est en ligne ».

### Étape 2 — Inventorier chaque canal

Pour chaque canal dans le périmètre, appelez le script de récupération de données correspondant avec `--read-only`. Exemples :

```bash
# Recherche payante
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel google_ads --action inventory --read-only

# Réseaux sociaux payants
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel meta_ads --action inventory --read-only
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel linkedin_ads --action inventory --read-only

# E-mail
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel email --action automations --read-only

# Organique + SEO
python "${CLAUDE_PLUGIN_ROOT}/scripts/seo-executor.py" --brand "{brand}" --action audit-current
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel organic_social --action cadence

# AEO / GEO (à sauter pour un audit rapide)
python "${CLAUDE_PLUGIN_ROOT}/scripts/ai-visibility-checker.py" --brand "{brand}" \
    --mode api --competitors "{auto-from-profile or --competitors arg}"

# Santé CRM + automatisation
python "${CLAUDE_PLUGIN_ROOT}/scripts/crm-sync.py" --brand "{brand}" --action audit-workflows

# Santé du web analytics
python "${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py" --brand "{brand}" \
    --channel ga4_health --action diagnostic
```

Si un script renvoie `{"error": "..."}` au lieu d'un inventaire, marquez ce canal comme `skipped: <reason>` et continuez. **Ne faites jamais échouer l'audit entier parce qu'un canal est cassé** — le canal cassé EST le constat.

### Étape 3 — Noter et trier

Pour chaque élément découvert, appliquez la **grille de notation** (4 niveaux, conservatrice) :

| Niveau | Signification | Exemples |
|---|---|---|
| **🟢 Sain** | Performe dans les standards, aucune action nécessaire | Automatisation e-mail avec >25 % de taux d'ouverture ; campagne Google Ads avec QS ≥ 7 ; page SEO dans le top 10 pour le mot-clé principal |
| **🟡 Gain rapide** | Un petit correctif débloque un gain significatif (<2h d'effort) | Texte d'annonce sans extension de liens annexes ; modèle e-mail avec balise de fusion cassée ; landing page sans balisage schema |
| **🟠 Lacune stratégique** | Nécessite une vraie intervention (atelier, actif, décision) | Pas d'audience de retargeting active ; pas de liste de mots-clés négatifs ; pas de divulgation AEO sur le contenu généré par IA |
| **🔴 Signal d'alerte / fuite** | Perte d'argent active OU risque de conformité | Campagne dépensant avec un suivi de conversion cassé ; liste e-mail sans provenance RGPD ; workflow CRM se déclenchant sur des contacts en doublon |

Un signal d'alerte est tout ce qui répond à AU MOINS UN des critères suivants : (a) gaspillage mensuel mesurable > X $ (par défaut 500 $, à surcharger avec `--red-flag-spend-threshold`), (b) violation réglementaire (consentement manquant, divulgation IA manquante, déclaration fabriquée), (c) risque pour la sécurité de la marque (campagne active sur un produit retiré, contradiction avec une autre campagne en cours).

### Étape 4 — Composer le document d'audit

Écrivez l'audit dans `~/.claude-marketing/brands/{slug}/audits/campaign-audit-{YYYY-MM-DD}.md` ET publiez une copie visible par l'utilisateur dans `~/Documents/DigitalMarketingPro/{brand}/audits/{YYYY-MM-DD}-campaign-audit.md` (le modèle à double copie). Structure du document :

```markdown
# Current-State Campaign Audit — {brand_name}

**Run date:** {YYYY-MM-DD}
**Auditor:** /digital-marketing-pro:campaign-audit
**Active brand profile:** {profile_version_or_last_modified}
**Channels in scope:** {list}
**Channels skipped:** {list with reason}

---

## 1. Executive Summary

- **{N} active campaigns** across {M} channels
- **Estimated monthly spend (managed):** {currency} {amount}
- **Healthy items:** {count} · **Quick wins:** {count} · **Strategic gaps:** {count} · **🔴 Red flags:** {count}
- **Top three red flags** — bulleted, with the specific cost or risk
- **Recommended next conversation** — usually one of: budget reallocation, conversion-tracking fix, compliance remediation, channel-mix shift

## 2. By channel

### 2.1 Paid search
| Account | Campaign | Status | Daily budget | Last modified | Spend (30d) | Conversions (30d) | Triage |
|---|---|---|---|---|---|---|---|
| ... | ... | ACTIVE | $X | YYYY-MM-DD | $Y | N | 🟡 Add sitelink extensions |

[Repeat for each channel section. Include the inventory table, the scoring summary, and the per-item triage.]

## 3. Cross-channel observations
- Attribution model in use (and which channels override it)
- Cross-channel audience overlap (Meta retargeting includes Google Ads converters?)
- Cadence collisions (email send + LinkedIn organic + paid social all hitting the same audience the same morning?)
- Funnel gaps (channel produces leads but no nurture sequence wired up)

## 4. Compliance posture
- EU AI Act Article 50 disclosure state on AI content
- C2PA signing state for AI images/video distributed in EU markets
- Consent-mode (cookie banner) version + last consent rate
- Regulated-industry claim register (linked to primary sources)

## 5. AEO / GEO snapshot
Mention rate vs top 5 competitors across Google AI Mode, Perplexity, ChatGPT search, Claude search, Copilot, Gemini App. Citation share, recommendation share, trend vs last audit.

## 6. Quick-wins backlog (do these this week)
Bulleted list. Each item: action · channel · effort · expected impact · who owns it.

## 7. Strategic gaps (queue for next planning conversation)
Bulleted list. Each item: gap · why it matters · what would close it · estimated investment.

## 8. 🔴 Red flags (escalate before continuing routine work)
Bulleted list. Each item: the specific issue · cost or risk in concrete numbers · the literal command or platform action to remediate.

## 9. Channels NOT running that probably should be
Bulleted list. Each item: channel · why it's missing · what minimum viable activation looks like.

---

**Next steps:**
- Take the quick-wins backlog into a 30-min triage with the account lead.
- Bring the strategic gaps to the next `/digital-marketing-pro:campaign-plan` conversation.
- Resolve every 🔴 red flag before the next routine work cycle.
```

### Étape 5 — Mettre à jour l'historique d'audit de la marque

Ajoutez une courte entrée à `~/.claude-marketing/brands/{slug}/audit-history.json` :

```json
{
  "audits": [
    {
      "type": "campaign-audit",
      "date": "{YYYY-MM-DD}",
      "channels_audited": ["paid_search", "email", "seo", "..."],
      "channels_skipped": [{"channel": "linkedin_ads", "reason": "connector_unauthenticated"}],
      "healthy_count": N, "quickwin_count": N, "gap_count": N, "redflag_count": N,
      "report_path": "{tracking_path}",
      "published_path": "{user_visible_path}"
    }
  ]
}
```

### Étape 6 — Présenter le rapport à l'utilisateur

Dans la conversation, affichez :

```
✅ Campaign audit complete for {brand_name}.

   Channels in scope: {list}
   {N} healthy · {N} quick wins · {N} strategic gaps · {N} 🔴 red flags

   📂 Report saved to:
      {published_path}

   Top 3 red flags:
   1. {item}
   2. {item}
   3. {item}

   Next: walk the quick-wins backlog in a 30-min triage, or run
   /digital-marketing-pro:performance-check for a metrics-only snapshot,
   or /digital-marketing-pro:campaign-plan to start the next planning cycle.
```

## Règles de comportement

1. **Lecture seule sur tous les canaux.** Aucune campagne n'est mise en pause, modifiée ou supprimée. Aucun e-mail n'est envoyé. Aucun enregistrement CRM n'est touché. C'est une passe d'inventaire + de notation.
2. **L'échec d'un canal ≠ l'échec de l'audit entier.** Un connecteur en échec devient un constat dans la liste « Channels skipped », pas une exception qui interrompt toute la compétence.
3. **Des chiffres concrets, pas des adjectifs.** « Gaspille X $/mois » vaut mieux que « dépense inefficacement ». Si un chiffre n'est pas disponible, dites « inconnu — {connector} ne l'a pas renvoyé » plutôt que d'en inventer un.
4. **Citez des sources primaires pour les constats de conformité.** Ne citez jamais Wikipédia, des articles de blog ou une sortie de LLM comme source pour « la réglementation X exige Y ». Utilisez les entrées de `skills/context-engine/compliance-rules.md`, et si une juridiction n'y est pas couverte, marquez le constat comme `compliance_basis: unverified` plutôt que de deviner.
5. **Doublez la copie du rapport.** Interne (suivi) dans `~/.claude-marketing/brands/{slug}/audits/` ; visible par l'utilisateur dans `~/Documents/DigitalMarketingPro/{brand}/audits/` (ou `$DIGITAL_MARKETING_PRO_PUBLISH_DIR` si défini). Le modèle à double copie existe pour que l'utilisateur puisse trouver le fichier sans fouiller dans des dossiers cachés.

## Arguments

```
/digital-marketing-pro:campaign-audit [--brand <slug>] [--channels <list>] [--quick]
    [--competitors <list>] [--red-flag-spend-threshold <amount>] [--json]
```

- `--brand <slug>` — marque à auditer (sinon utilise la marque active)
- `--channels <list>` — sous-ensemble séparé par des virgules à auditer (sinon chaque canal avec un connecteur configuré)
- `--quick` — inventaire de canal uniquement ; saute la récupération historique + la vérification AEO/GEO
- `--competitors <list>` — liste explicite de concurrents pour la section AEO/GEO (sinon issue du profil de marque)
- `--red-flag-spend-threshold <amount>` — surcharge le seuil par défaut de 500 $/mois pour signaler du gaspillage en 🔴
- `--json` — émet un résumé JSON lisible par machine en plus du rapport markdown

## Compétences et commandes associées

- [`validate-profile`](../validate-profile/SKILL.md) — vérification préalable (à exécuter en premier)
- [`campaign-plan`](../campaign-plan/SKILL.md) — quoi faire des lacunes stratégiques mises au jour
- [`launch-campaign`](../launch-campaign/SKILL.md) — quoi faire une fois le plan approuvé
- [`performance-check`](../performance-check/SKILL.md) — instantané plus léger, uniquement axé sur les indicateurs
- [`competitor-analysis`](../competitor-analysis/SKILL.md) — s'associe naturellement à la section AEO/GEO
- [`aeo-audit`](../aeo-audit/SKILL.md) — audit plus approfondi de la visibilité sur les moteurs IA si la section 5 soulève des inquiétudes
- `${CLAUDE_PLUGIN_ROOT}/scripts/performance-monitor.py` — récupérations de données sous-jacentes

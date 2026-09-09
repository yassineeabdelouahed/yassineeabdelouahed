---
name: validate-profile
description: "Contrôle de santé en lecture seule vérifiant qu'un profil de marque est prêt pour la production : champs requis, exhaustivité de la voix et de l'audience, garde-fous, couverture des juridictions de conformité, configuration des connecteurs et joignabilité MCP, capacité d'écriture des chemins de sortie, et ancienneté du registre de modèles — signalé par contrôle en BLOQUANT ou AVERTISSEMENT sans jamais afficher de valeurs d'identifiants. Se déclenche sur \"/digital-marketing-pro:validate-profile\", \"is the brand setup correct\", \"check connector credentials\", \"profile sanity check\", \"we rotated an API key — is it wired up\". Lit profile.json et sonde les connecteurs via connector-status.py ; c'est la porte prérequise avant /digital-marketing-pro:engagement, /digital-marketing-pro:campaign-plan, et /digital-marketing-pro:launch-campaign."
user-invocable: true
triggers:
  - valider le profil de marque
  - vérifier la santé du profil de marque
  - la configuration de la marque est-elle correcte
  - vérifier les identifiants des connecteurs
  - contrôle de cohérence du profil
  - valider le profil
allowed-tools: Read Bash Glob Grep
---

# /digital-marketing-pro:validate-profile — Contrôle de santé du profil de marque + des identifiants

Cette compétence est la porte canonique « cette marque est-elle prête à produire du travail ? ». Elle valide qu'un profil de marque est suffisamment complet pour une utilisation en production ET que chaque identifiant/connecteur référencé par le profil est effectivement joignable — **sans jamais afficher de valeurs d'identifiants**.

Utiliser cette compétence :

- Après **`/digital-marketing-pro:brand-setup`** (ou `/digital-marketing-pro:client-onboarding`) pour confirmer que le nouveau profil est prêt pour la production.
- Après **la rotation de toute clé API** (Slack, HubSpot, Stripe, Ahrefs, compte de service GA4, etc.) afin que la connectivité soit reconfirmée sans exposer la nouvelle valeur dans les logs.
- Après **l'import de guidelines de marque** (`/digital-marketing-pro:import-guidelines`) pour confirmer que la fusion a réussi.
- Comme **contrôle prérequis** avant `/digital-marketing-pro:engagement`, `/digital-marketing-pro:campaign-plan`, ou `/digital-marketing-pro:launch-campaign`.

## Pourquoi cette compétence existe

Pour les agences gérant 50 à 200 marques clientes, les profils de marque et les identifiants dérivent constamment : un junior change un canal Slack, une clé API tourne, une voix de marque est modifiée. Le coût de faire tourner un engagement de 60 minutes sur un profil cassé se traduit en heures de reprise. Cette compétence détecte ces cas de dérive en moins de 60 secondes.

La compétence est **en lecture seule** — elle inspecte l'état, ne le modifie jamais. Elle **n'affiche non plus jamais de valeurs d'identifiants** — les contrôles de connecteurs émettent un statut réussite / échec / classe d'erreur sans faire écho du secret.

## Dimensions de validation

| Dimension | Ce qui est vérifié | Sévérité |
|---|---|---|
| **Identité requise** | `brand_name`, `industry`, et une liste de marché/juridiction non vide — accepte **`target_markets`** (ce que `brand-setup` écrit réellement) ou `target_jurisdictions` (ancien). Ne vérifier que l'ancien nom faisait échouer chaque marque nouvellement créée à son propre validateur avec un BLOQUANT | BLOQUANT |
| **Profil de voix** | ton, formalité et énergie renseignés sous **`brand_voice`** (ce que `brand-setup` écrit, et ce que `content-engine` et `brand-voice-scorer.py` lisent tous deux) ou sous `voice` (ancien). Le générateur fait ici autorité — deux consommateurs le suivent déjà, donc ce validateur était l'exception | BLOQUANT pour le travail de contenu |
| **Profil d'audience** | `target_audience.primary_persona` avec `role` + `reading_level` | AVERTISSEMENT |
| **Garde-fous** | `guardrails.prohibited_terms` + `guardrails.prohibited_claims` non vides. `brand-setup` ne crée pas ce bloc, donc le signaler comme un AVERTISSEMENT avec la commande exacte pour l'ajouter pour une marque non réglementée, et réserver le BLOQUANT aux secteurs réglementés — où un garde-fou manquant est un risque réel, pas une lacune de configuration | BLOQUANT pour les secteurs réglementés (pharma, BFSI, santé, juridique) ; AVERTISSEMENT sinon |
| **Juridictions de conformité** | Chaque juridiction déclarée a une entrée de règles correspondante dans `skills/context-engine/compliance-rules.md` | BLOQUANT |
| **Configuration de connecteur présente** | Chaque connecteur nommé dans `tracking.backend`, `integrations.*`, `analytics.*` a ses variables d'environnement / entrée `.mcp.json` présentes (contrôle local ; la joignabilité en direct provient de la sonde MCP/curl ci-dessous) | BLOQUANT par connecteur non configuré |
| **Santé du serveur MCP** | Chaque entrée dans `.mcp.json` (si présent) répond à un ping tools/list | AVERTISSEMENT |
| **Stockage des identifiants** | `~/.claude-marketing/brands/{brand}/credentials.json` (ou variables d'environnement) présent pour chaque backend référencé | BLOQUANT |
| **Chemins de sortie inscriptibles** | `~/.claude-marketing/brands/{brand}/` est inscriptible ; le répertoire de publication visible par l'utilisateur (`$DIGITAL_MARKETING_PRO_PUBLISH_DIR` ou `~/Documents/DigitalMarketingPro/`) est inscriptible | BLOQUANT |
| **Actualité du curateur de modèles** | `scripts/resolve_model.py --registry-age` renvoie < 90 jours | AVERTISSEMENT |

Un **BLOQUANT** signifie « ne pas laisser l'utilisateur exécuter engagement / campaign-plan / launch-campaign avant correction ». Un **AVERTISSEMENT** est signalé mais ne bloque pas.

## Processus

### Étape 0 — Résoudre la marque à valider

Si `--brand <slug>` a été passé, l'utiliser. Sinon, lire la marque active depuis `~/.claude-marketing/brands/_active-brand.json` (défini par `/digital-marketing-pro:switch-brand`). Si aucun des deux n'est disponible, erreur : `"--brand <slug> required, or run /digital-marketing-pro:switch-brand first."` Ne PAS valider « tout » — la validation est par marque par conception.

### Étape 1 — Charger le profil de marque

```bash
BRAND_DIR="$HOME/.claude-marketing/brands/{brand}"
test -d "$BRAND_DIR" || { echo "Brand directory not found at $BRAND_DIR — run /digital-marketing-pro:brand-setup first."; exit 1; }
PROFILE="$BRAND_DIR/profile.json"
test -f "$PROFILE" || { echo "profile.json missing under $BRAND_DIR — run /digital-marketing-pro:brand-setup."; exit 1; }
```

Analyser le JSON du profil et capturer : `brand_name`, `industry`, `target_jurisdictions`, `voice.*`, `target_audience.*`, `guardrails.*`, `tracking.backend`, `integrations.*`, `analytics.*`.

### Étape 2 — Contrôles des champs requis

Parcourir la checklist du tableau **Dimensions de validation** ci-dessus. Pour chaque champ, enregistrer l'un de : `OK` / `WARN: <raison>` / `BLOCK: <raison>`. Ne PAS s'arrêter au premier problème — collecter chaque problème afin que l'utilisateur voie l'image complète en une seule passe.

Pour les secteurs réglementés (`industry` correspond à l'un de `pharma`, `pharmaceuticals`, `bfsi`, `banking`, `insurance`, `healthcare`, `legal`, `medical-devices`), élever les problèmes de garde-fous d'AVERTISSEMENT à BLOQUANT.

### Étape 3 — Vérification croisée des juridictions de conformité

Pour chaque entrée dans `target_jurisdictions`, confirmer que `skills/context-engine/compliance-rules.md` contient un en-tête de section correspondant (par ex. `### 1.11 India — DPDPA`). Si une juridiction est déclarée mais non couverte, BLOQUER avec : `"Jurisdiction {X} declared in profile but no compliance rules for it — engagement will produce non-compliant deliverables."`

### Étape 4 — Joignabilité des connecteurs (sûre pour les identifiants)

Pour chaque backend référencé dans `tracking.backend`, `integrations.crm`, `integrations.email`, `integrations.cms`, `integrations.analytics`, `integrations.social`, exécuter la sonde de santé correspondante via `scripts/connector-status.py` :

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/connector-status.py" \
    --action status \
    --brand "{brand}" \
    --connectors "{comma-separated list inferred from profile}" \
    --probe-only --no-secrets
```

`connector-status.py --probe-only` exécute un contrôle de préparation **local** : il vérifie que les variables d'environnement requises / l'entrée `.mcp.json` de chaque connecteur sont présentes et non vides. Il n'ouvre PAS de connexion réseau en direct ni n'effectue d'appel `whoami` — il rapporte donc une classe **au niveau configuration** (CONFIGURED / MISSING_ENV / NOT_IN_MCP), pas un statut HTTP en direct. `--no-secrets` garantit qu'il ne fait jamais écho, ne journalise, ni n'écrit une valeur d'identifiant. Pour un contrôle de vivacité réel, utiliser le point de terminaison MCP `tools/list` du connecteur ou la sonde HTTP curl ci-dessous.

Pour les serveurs MCP dans `.mcp.json` (si présent au niveau de la marque ou du projet), exécuter un ping `tools/list` contre chacun via `mcp__connector__*` si le connecteur est chargé, ou invoquer un HEAD curl de 5 secondes contre l'`url` configurée pour les MCP HTTP :

```bash
for url in $(jq -r '.mcpServers[] | select(.type=="http") | .url' .mcp.json); do
    code=$(curl -sS -o /dev/null -w "%{http_code}" -m 5 "$url" || echo "000")
    echo "$url -> HTTP $code"
done
```

HTTP `200`, `204`, `401` (authentification requise pour GET — POST fonctionnera), et `405` (méthode non autorisée pour GET — POST fonctionnera) comptent tous comme « joignable ». `404`, `000` (DNS / délai dépassé), `5xx` comptent comme BLOCK.

### Étape 5 — Capacité d'écriture des chemins de sortie

```bash
test -w "$HOME/.claude-marketing/brands/{brand}/" || echo "BLOCK: brand directory is not writeable"
# Répertoire de publication visible par l'utilisateur (schéma double copie)
if [ -n "$DIGITAL_MARKETING_PRO_PUBLISH_DIR" ]; then
    test -w "$DIGITAL_MARKETING_PRO_PUBLISH_DIR" || echo "WARN: DIGITAL_MARKETING_PRO_PUBLISH_DIR ($DIGITAL_MARKETING_PRO_PUBLISH_DIR) is not writeable"
elif [ -d "$HOME/Documents" ]; then
    test -w "$HOME/Documents" || echo "WARN: ~/Documents is not writeable — the user-visible publish copy will fail"
fi
```

### Étape 6 — Actualité du curateur de modèles

```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/resolve_model.py" --registry-age
```

Si le registre a plus de **90 jours**, AVERTIR : `"model_registry.json is {N} days old — frontier models change every ~6 weeks. Run scripts/refresh_models.py to check drift."` (Ne pas bloquer — le curateur retombe automatiquement en avant sur les identifiants dépréciés, donc un registre plus ancien est dégradé, pas cassé.)

### Étape 7 — Rapport

Imprimer un rapport structuré. TOUJOURS afficher chaque contrôle (ne pas n'imprimer que les échecs — les agences ont besoin d'une confirmation positive pour le reste) :

```
🔎 Validation du profil de marque — {brand_name}
   Slug : {brand} · Secteur : {industry} · Juridictions : {list}

✅ Identité requise         brand_name, industry, target_jurisdictions tous définis
✅ Profil de voix           tone={tone} · formality={formality} · energy={energy}
⚠️  Profil d'audience        primary_persona.role défini, reading_level MANQUANT
✅ Garde-fous                {N} prohibited_terms, {M} prohibited_claims (secteur={industry})
✅ Juridictions de conformité  EU-GDPR ✓ · IN-DPDPA ✓ · US-CCPA ✓
🛑 Connecteur — Slack        MISSING_ENV (variables SLACK_* non définies — ajouter via /digital-marketing-pro:add-integration slack)
✅ Connecteur — HubSpot      OK (espace de travail acme-corp, 1247 contacts)
✅ Connecteur — Stripe       OK
✅ MCP — gmailmcp.googleapis.com  HTTP 405 (actif)
✅ Chemins de sortie          ~/.claude-marketing/brands/{brand}/ inscriptible ; ~/Documents/DigitalMarketingPro/ inscriptible
⚠️  Curateur de modèles       le registre a 102 jours — envisager scripts/refresh_models.py

Décision : 🛑 BLOQUÉ — connecteur Slack non configuré. Corriger avant d'exécuter :
  • /digital-marketing-pro:engagement
  • /digital-marketing-pro:campaign-plan
  • /digital-marketing-pro:launch-campaign

Relancer /digital-marketing-pro:validate-profile après correction.
```

Émettre aussi un résumé JSON exploitable par machine afin qu'il puisse être consommé par `/digital-marketing-pro:check`, `/digital-marketing-pro:status`, ou une automatisation en aval :

```json
{
  "brand": "{slug}",
  "decision": "blocked | passed | passed_with_warnings",
  "blockers": [{"check": "connector_slack", "reason": "..."}],
  "warnings": [{"check": "audience_persona", "reason": "reading_level missing"}],
  "passed": ["required_identity", "voice_profile", ...]
}
```

## Règles de comportement

1. **Ne jamais afficher de valeurs d'identifiants.** Les sondes de connecteurs utilisent `--no-secrets` ; si une sonde renvoie accidentellement un identifiant dans sa chaîne d'erreur, le rédiger avant impression. La sortie de la compétence va dans des logs et des presse-papiers — supposer qu'elle fuit.
2. **En lecture seule.** Ne jamais modifier le profil de marque, les identifiants, la configuration MCP, ou tout état persistant. C'est un vérificateur, pas un correcteur. Renvoyer plutôt des commandes suivantes exploitables.
3. **Ne pas s'arrêter au premier problème.** Exécuter chaque contrôle même après le premier BLOQUANT — les agences veulent la liste complète des points à corriger en une seule passe.
4. **Ne pas valider inter-marques.** Par marque uniquement, par conception. Boucler sur toutes les marques est un flux de travail séparé (`/digital-marketing-pro:agency-dashboard --health`).
5. **Idempotent.** Exécuter cette compétence deux fois de suite produit une sortie identique (aux horodatages près). Aucune nouvelle tentative dans la compétence — les nouvelles tentatives relèvent du choix de l'utilisateur.

## Arguments

```
/digital-marketing-pro:validate-profile [--brand <slug>] [--json] [--connectors <list>] [--quick]
```

- `--brand <slug>` — marque à valider (sinon utilise la marque active)
- `--json` — n'émettre que le résumé JSON, aucun rapport lisible par un humain (utile pour l'enchaînement)
- `--connectors <list>` — sous-ensemble séparé par des virgules à sonder au lieu de chaque connecteur du profil (utile lorsque seul Slack a tourné)
- `--quick` — ignorer les sondes de joignabilité des connecteurs (n'exécuter que les contrôles au niveau des champs)

## Compétences et commandes associées

- [`brand-setup`](../brand-setup/SKILL.md) — création interactive de marque
- [`import-guidelines`](../import-guidelines/SKILL.md) — chargement en masse de guidelines de marque existantes dans le profil
- [`status`](../status/SKILL.md) — instantané unifié en lecture seule de la marque active
- [`check`](../check/SKILL.md) — porte qualité de contenu avant publication
- [`switch-brand`](../switch-brand/SKILL.md) — définir la marque active
- `scripts/connector-status.py` — la sonde de santé de connecteur sous-jacente
- `scripts/resolve_model.py` — curateur de modèles (utilisé pour le contrôle d'actualité)
</content>

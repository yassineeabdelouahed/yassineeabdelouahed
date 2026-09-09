# Couche d'intelligence — Système marketing adaptatif

## Comment le plugin apprend et s'adapte

Digital Marketing Pro n'est pas statique — il construit de l'intelligence au fil du temps grâce à :

### 1. Conscience du contexte de marque
Chaque résultat marketing est filtré à travers ceux de la marque active :
- **Profil de voix** (formalité, énergie, humour, autorité sur des échelles de 1 à 10)
- **Contexte sectoriel** (repères, conformité, efficacité des canaux)
- **Modèle économique** (type de tunnel, cadre de KPI, leviers de croissance)
- **Objectifs** (l'objectif principal façonne toutes les recommandations)
- **Concurrents** (les écarts de positionnement éclairent la différenciation)

### 2. Notation adaptative
Les pondérations de notation de contenu s'ajustent automatiquement selon :
- **Le secteur** : la santé reçoit une pondération de conformité/spam plus élevée ; la tech reçoit une pondération SEO plus élevée
- **Le modèle économique** : l'e-commerce B2C priorise l'appel à l'action ; les services B2B priorisent la lisibilité
- **Les objectifs** : la génération de leads renforce la pondération de l'appel à l'action ; la notoriété de marque renforce la pondération de lisibilité
- **Les secteurs réglementés** : augmentation automatique de la pondération de conformité

Utilisez `adaptive-scorer.py` pour calculer les pondérations spécifiques à la marque avant de noter le contenu.

### 3. Mémoire de campagne
Chaque plan de campagne, instantané de performance, et décision marketing est enregistré dans le répertoire de la marque :
- `~/.claude-marketing/brands/{slug}/campaigns/` — Plans de campagne et résultats
- `~/.claude-marketing/brands/{slug}/performance/` — Instantanés de performance dans le temps
- `~/.claude-marketing/brands/{slug}/insights.json` — Enseignements et observations marketing

Utilisez `campaign-tracker.py` pour enregistrer et récupérer les données de campagne.

### 4. Apprentissage inter-sessions
Lors de la formulation de recommandations, vérifiez toujours :
1. **Les campagnes passées** — Qu'est-ce qui a fonctionné auparavant ? Quels canaux ont le mieux performé ?
2. **Les insights enregistrés** — Y a-t-il des enseignements issus de sessions précédentes ?
3. **Les tendances de performance** — La performance s'améliore-t-elle ou décline-t-elle ?
4. **Les échantillons de voix** — Disposons-nous d'exemples de contenu conforme à la marque à référencer ?

### 5. Intelligence renforcée par MCP
Lorsque des serveurs MCP sont connectés (Google Analytics, Search Console, plateformes publicitaires) :
- Extraire des données de performance RÉELLES plutôt que de s'appuyer sur des repères
- Valider les recommandations par rapport aux indicateurs réels
- Détecter les anomalies dans les données en temps réel
- Construire des rapports à partir de données en direct, pas de modèles

## Cadre de décision pour les agents

Lorsqu'un agent ou un module formule une recommandation :

1. **Charger le contexte de marque** — Toujours commencer par vérifier le profil de marque actif
2. **Vérifier l'historique des campagnes** — Référencer les campagnes passées pour le même type de travail
3. **Appliquer les repères sectoriels** — Utiliser les données de industry-profiles.md, ajustées aux spécificités de la marque
4. **Vérifier la conformité** — Appliquer automatiquement les réglementations géographiques et sectorielles du profil de marque
5. **Adapter la notation** — Utiliser des pondérations adaptatives plutôt que des valeurs par défaut statiques
6. **Enregistrer les enseignements** — Après toute analyse significative, enregistrer les insights pour référence future

## Schémas de persistance des données

### Enregistrer les données de campagne
Après avoir généré un plan de campagne :
```bash
python campaign-tracker.py --brand {slug} --action save-campaign --data '{"name": "...", "channels": [...], "budget": "...", "goals": [...]}'
```

### Enregistrer les instantanés de performance
Après avoir généré un rapport de performance :
```bash
python campaign-tracker.py --brand {slug} --action save-performance --data '{"campaign_id": "...", "metrics": {...}, "period": "..."}'
```

### Enregistrer les insights marketing
Après toute analyse ou découverte significative :
```bash
python campaign-tracker.py --brand {slug} --action save-insight --data '{"type": "learning|benchmark|anomaly|recommendation", "insight": "...", "context": "..."}'
```

### Récupérer les données passées
Avant de formuler des recommandations :
```bash
python campaign-tracker.py --brand {slug} --action list-campaigns
python campaign-tracker.py --brand {slug} --action get-insights --type learning --limit 10
```
</content>

# Modèles d'attribution — Guide de comparaison & de mise en œuvre

## Comparaison des modèles

| Modèle | Fonctionnement | Idéal pour | Limite |
|-------|-------------|----------|-----------|
| **Dernier clic** | 100 % du crédit au dernier point de contact | Cycles de vente courts, réponse directe | Ignore la notoriété/considération |
| **Premier clic** | 100 % du crédit au premier point de contact | Campagnes de notoriété de marque | Ignore les étapes de nurturing/conversion |
| **Linéaire** | Crédit égal à tous les points de contact | Vue d'ensemble équilibrée | Sur-crédite les touches à faible impact |
| **Dégressif dans le temps** | Plus de crédit aux touches proches de la conversion | Cycles de vente longs, B2B | Sous-crédite la notoriété |
| **Basé sur la position (forme U)** | 40 % premier, 40 % dernier, 20 % réparti au milieu | Équilibré avec emphase sur intro/clôture | Répartitions quelque peu arbitraires |
| **Data-driven** | Un modèle ML alloue selon l'impact réel | Grands jeux de données (300+ conversions/mois) | Nécessite un volume de données important |
| **Marketing Mix Modeling** | Modèle économétrique utilisant des données agrégées | Allocation budgétaire entre canaux | Lent, nécessite des données historiques |

---

## Arbre de décision pour la sélection du modèle

```
DÉBUT : combien de conversions par mois ?
├── < 300 → utiliser Basé sur la position ou Dégressif dans le temps
│   ├── Cycle de vente court (< 7 jours) ? → Dernier clic ou Linéaire
│   └── Cycle de vente long (> 30 jours) ? → Dégressif dans le temps
├── 300-1000 → envisager Data-driven
│   └── Votre plateforme analytics en est-elle capable ? → utiliser Data-driven
└── > 1000 → utiliser Data-driven + MMM pour la planification budgétaire

DÉROGATIONS PAR MODÈLE ÉCONOMIQUE :
- E-commerce / DTC → référence Dernier clic, passer à Data-driven quand possible
- SaaS B2B → Basé sur la position ou Dégressif dans le temps (cycles longs, nombreuses touches)
- Entreprise locale → Dernier clic (parcours simples)
- Marketplace → attribution séparée pour les côtés offre et demande
```

---

## Guides de mise en œuvre par plateforme

### Google Analytics 4 (GA4)

- **Par défaut** : attribution data-driven (cross-canal)
- **Modèles configurables** : depuis 2023, les Paramètres Admin → Attribution de GA4 n'exposent que **`data-driven` et `dernier clic` (canaux payants & organiques)** — l'ancien menu linéaire / dégressif dans le temps / basé sur la position / premier clic a été supprimé. Pour appliquer un modèle linéaire, dégressif dans le temps, basé sur la position, ou toute règle de crédit personnalisée, la modéliser dans votre **couche d'entrepôt de données / BI** (export BigQuery + SQL, ou un outil BI) — pas dans l'interface GA4.
- **Fenêtres de lookback** : 30 jours pour l'acquisition, 90 jours pour les autres conversions
- **Rapports** : Publicité → Attribution → Comparaison de modèles (compare les deux modèles disponibles)
- **Canal Assistant IA** : le regroupement de canaux par défaut de GA4 inclut désormais un canal **« Assistant IA »** qui isole le trafic de référence provenant des assistants IA (ChatGPT, Gemini, Copilot, Perplexity, etc.). L'inclure dans les répartitions par canal afin que les conversions issues de l'IA ne soient pas mal classées sous « Référence » ou « Direct ».
- **Limite** : ne suit que les points de contact visibles par Google, ne peut pas voir toutes les données des jardins clos

### Attribution Meta (Facebook)

- **Par défaut** : attribution 7 jours clic, 1 jour vue
- **Conversions API (CAPI)** : suivi d'événements côté serveur pour de meilleurs taux de correspondance
- **Aggregated Event Measurement** : pour les limitations de suivi iOS 14+
- **Recommandé** : configurer CAPI + pixel navigateur pour une couverture de données maximale
- **Comparer** : les conversions auto-déclarées de Meta vs la vue cross-canal de GA4

### Google Ads

- **Par défaut** : dernier clic au sein de Google Ads
- **Data-driven** : disponible dans les paramètres de conversion quand les données sont suffisantes
- **Cross-campagne** : l'attribution s'applique sur Search, Display, YouTube, Shopping
- **Recommandation** : activer l'attribution data-driven, définir des fenêtres de conversion appropriées

---

## Attribution cross-device

### Défis
- Le même utilisateur sur différents appareils apparaît comme plusieurs utilisateurs
- Le suivi par cookie se rompt entre les appareils
- Les réglementations de confidentialité limitent le lien cross-device

### Solutions
1. **Correspondance déterministe** : identifiants d'utilisateur connecté sur les appareils (la plus précise, nécessite une authentification)
2. **Correspondance probabiliste** : modèles statistiques reliant les schémas d'appareil (moins précise)
3. **Google Signals** : données cross-device des utilisateurs Google connectés dans GA4
4. **Intégration CRM** : faire correspondre les conversions aux contacts connus sur les points de contact

---

## Cadre de conception de modèle personnalisé

Quand les modèles standard ne conviennent pas :

1. **Définir les catégories de points de contact** : Notoriété, Engagement, Assistance à la conversion, Conversion
2. **Assigner des poids par catégorie** selon le modèle économique :
   - SaaS B2B : Notoriété 20 %, Engagement 30 %, Assistance 20 %, Conversion 30 %
   - E-commerce : Notoriété 15 %, Engagement 15 %, Assistance 20 %, Conversion 50 %
3. **Tester par rapport aux résultats réels** : comparer les prédictions du modèle aux schémas observés
4. **Itérer trimestriellement** : ajuster les poids selon les résultats des tests d'incrémentalité

---

## Validation de l'attribution

### Comment vérifier que votre modèle est précis

1. **Tests par retenue (holdout)** : mettre en pause un canal, mesurer l'impact réel vs l'impact prédit par le modèle
2. **Tests d'incrémentalité** : expériences géo-split ou user-split par canal
3. **Comparaison cross-modèle** : exécuter 2-3 modèles en parallèle, comparer les conclusions
4. **Vérifications de bon sens** : l'attribution correspond-elle à ce que vous savez intuitivement de la performance des canaux ?
5. **Réconciliation du chiffre d'affaires** : les conversions attribuées totalisent-elles le chiffre d'affaires réel ?

### Signaux d'alerte

- Un seul canal revendique >80 % des conversions (probable biais de mesure)
- Le modèle change soudainement et radicalement l'attribution (vérifier les problèmes de suivi)
- La recherche de marque obtient la majorité du crédit (elle capte la demande, elle ne la crée pas)
- Le modèle ignore des canaux dont vous savez qu'ils génèrent de la notoriété (revoir la capture des points de contact)

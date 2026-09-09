---
name: switch-brand
description: "Changer de profil de marque actif pour le travail multi-client et agence en exécutant setup.py --switch-brand, après avoir listé les marques configurées avec celle active marquée d'une étoile ; confirme le secteur, le modèle économique et le canal principal de la nouvelle marque afin que les sorties suivantes utilisent sa voix et ses règles de conformité. Se déclenche sur \"/digital-marketing-pro:switch-brand\", \"switch to the other client\", \"change brand to Acme\", \"list available brands\", \"what brands do I have set up\". Peut présenter une comparaison côte à côte de deux profils de marque sur demande ; propose /digital-marketing-pro:brand-setup si la marque est introuvable ; s'utilise avec /digital-marketing-pro:status pour vérifier le contexte actif."
argument-hint: "[brand-slug]"
---

# Switch Brand

## Quand l'utiliser
- L'utilisateur dit « passe à [nom de marque] » ou « change la marque pour... »
- L'utilisateur veut travailler sur un client/une marque différent(e)
- L'utilisateur demande à lister les marques disponibles

## Processus

### 1. Lister les marques disponibles
Exécuter le script de configuration pour afficher toutes les marques configurées :
```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/setup.py" --list-brands
```

La marque actuellement active est marquée d'un `*`.

### 2. Changer la marque active
Lorsque l'utilisateur sélectionne une marque, exécuter :
```bash
python "${CLAUDE_PLUGIN_ROOT}/scripts/setup.py" --switch-brand BRAND_SLUG
```

### 3. Confirmer le changement
Après le changement, confirmer :
- Le nom et le slug de la marque
- Les détails clés du profil (secteur, modèle économique, canal principal)
- Rappeler : « Toutes les sorties marketing utiliseront désormais la voix, les règles de conformité et le contexte de [brand_name]. »

## Si la marque est introuvable
- Afficher la liste des marques disponibles
- Proposer de créer un nouveau profil : « Marque introuvable. Souhaitez-vous créer un nouveau profil ? Utilisez /digital-marketing-pro:brand-setup »

## Comparaison multi-marques
Si l'utilisateur demande à comparer des marques, charger les deux profils et présenter une comparaison côte à côte des attributs clés (paramètres de voix, canaux, objectifs).
</content>

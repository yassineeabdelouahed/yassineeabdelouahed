---
name: landing-page-audit
description: "Auditer une landing page selon six dimensions de conversion — clarté au-dessus de la ligne de flottaison, signaux de confiance, friction du formulaire, cohérence du message avec la publicité ou l'email d'origine, vitesse de la page, et expérience mobile — chacune notée de 1 à 10, agrégées en un score global comparé aux moyennes du secteur, avec les 5 principaux correctifs classés par impact de conversion attendu. Évaluation et recommandations uniquement ; ne modifie jamais la page. Se déclenche sur \"/digital-marketing-pro:landing-page-audit\", \"audit this landing page\", \"why isn't this page converting\", \"score our signup page\", \"does the page match the ad copy\". Lit le profil de marque, les guidelines, les modèles personnalisés et les SOP d'agence avant la notation."
argument-hint: "[URL]"
---

# /digital-marketing-pro:landing-page-audit

## Objectif

Évaluer une landing page selon six dimensions clés de conversion et livrer une évaluation notée avec des recommandations précises et actionnables pour améliorer le taux de conversion.

## Entrée requise

L'utilisateur doit fournir (ou se verra demander) :

- **URL de la landing page** : la page à auditer
- **Source de trafic** : d'où viennent les visiteurs (recherche payante, publicités sociales, email, organique)
- **Action cible** : conversion souhaitée (soumission de formulaire, achat, inscription, téléchargement, appel)
- **Texte publicitaire ou email** : le message amont qui envoie le trafic (pour l'analyse de cohérence du message)
- **Taux de conversion actuel** : s'il est connu, pour l'étalonnage

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de guidelines** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Clarté au-dessus de la ligne de flottaison** (note 1-10) : clarté du titre, proposition de valeur, hiérarchie visuelle, visibilité du CTA dans le premier écran
3. **Signaux de confiance** (note 1-10) : preuve sociale, témoignages, logos, badges de sécurité, garanties, avis
4. **Friction du formulaire** (note 1-10) : nombre de champs, libellés des champs, gestion des erreurs, divulgation progressive, UX du formulaire mobile
5. **Cohérence du message** (note 1-10) : alignement entre la source de trafic (publicité/email) et le titre, les visuels, l'offre de la landing page
6. **Vitesse de la page** (note 1-10) : temps de chargement, Core Web Vitals, ressources bloquant le rendu, optimisation des images
7. **Expérience mobile** (note 1-10) : design responsive, cibles tactiles, profondeur de défilement, CTA spécifiques au mobile
8. Calculer le score global et comparer aux moyennes du secteur
9. Prioriser les recommandations par impact de conversion attendu

## Sortie

Un audit de landing page structuré contenant :

- Le score de conversion global (1-10) avec comparaison au benchmark sectoriel
- La notation dimension par dimension avec preuves et captures d'écran/notes
- Les 5 principaux correctifs classés par impact attendu
- Des recommandations détaillées par dimension avec des indications de mise en œuvre
- Une analyse de cohérence du message avec des signalements précis des écarts
- Les problèmes et correctifs spécifiques au mobile
- Les gains rapides vs. les éléments nécessitant une refonte majeure

## Agents utilisés

- **analytics-analyst** — Notation de performance, étalonnage de conversion, recommandations basées sur les données
- **brand-guardian** — Cohérence de marque, évaluation des signaux de confiance, alignement du message
- **cro-specialist** — Notation de conversion, analyse de friction du formulaire, calcul de taille d'échantillon pour test A/B, hiérarchie au-dessus de la ligne de flottaison, optimisation du CTA

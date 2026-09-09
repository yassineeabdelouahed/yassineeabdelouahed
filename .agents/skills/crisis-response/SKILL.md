---
name: crisis-response
description: "Évaluer une crise de relations publiques et livrer un plan de réponse structuré — classification de sévérité (niveau 1-3), une déclaration d'attente prête à publier, des messages adaptés par groupe de parties prenantes, un calendrier de communication heure par heure, et une feuille de route de reconstruction de la confiance. Rédige et planifie uniquement ; ne publie rien. Se déclenche sur « /digital-marketing-pro:crisis-response », « on se fait démolir sur les réseaux sociaux », « rédige rapidement une déclaration d'attente », « une histoire négative vient d'éclater sur nous », « comment répondre à ce contrecoup ». Lit le profil de marque, les paramètres de voix, les guidelines et les règles de conformité du marché avant de rédiger la moindre déclaration."
argument-hint: "[situation-description]"
---

# /digital-marketing-pro:crisis-response

## Objectif

Fournir une évaluation rapide de crise et un plan de réponse structuré. Classe la sévérité, identifie les parties prenantes, rédige des messages pour chaque public, et construit un calendrier de communication pour contenir les dégâts et reconstruire la confiance.

## Éléments à fournir

L'utilisateur doit fournir (ou se verra demander) :

- **Ce qui s'est passé** : Description de la crise ou de l'incident
- **Quand cela a commencé** : Chronologie des événements jusqu'à présent
- **Exposition actuelle** : Jusqu'où est-ce connu (interne uniquement, réseaux sociaux, couverture presse)
- **Parties prenantes concernées** : Clients, employés, investisseurs, partenaires, grand public
- **Actions déjà entreprises** : Toute déclaration, correctif, ou réponse déjà émise
- **Porte-parole** : Qui s'exprimera au nom de la marque

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour connaître le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les directives** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les procédures d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Classification de sévérité** : Niveau 1 (surveillance), niveau 2 (réponse), niveau 3 (mobilisation totale) selon la portée, l'impact, et la trajectoire
3. Évaluer le récit : Que dit-on ? Quel est le sentiment du public ? Quelle est la pire escalade possible ?
4. Identifier tous les groupes de parties prenantes et prioriser l'ordre de communication
5. Rédiger une déclaration d'attente pour publication immédiate (dans la première heure)
6. Rédiger des messages adaptés par partie prenante : clients, employés, médias, partenaires, réseaux sociaux
7. Construire un calendrier de communication : première heure, premières 24 heures, première semaine, en continu
8. Définir la stratégie de canal : quels messages vont où (réseaux sociaux, e-mail, presse, communication interne)
9. Esquisser un plan de rétablissement : actions correctives, mises à jour de transparence, initiatives de reconstruction de la confiance
10. Fixer la cadence de surveillance et les déclencheurs d'escalade

## Résultat

Un plan de réponse de crise structuré contenant :

- Classification de sévérité avec justification
- Évaluation de la situation et analyse du récit
- Déclaration d'attente (prête à publier)
- Messages spécifiques par partie prenante (clients, médias, employés, partenaires)
- Calendrier de communication avec jalons et points de décision
- Plan de déploiement par canal
- Directives de réponse sur les réseaux sociaux (à quoi répondre, quoi ignorer, quand escalader)
- Feuille de route de rétablissement et de reconstruction de la confiance
- Plan de surveillance avec déclencheurs d'escalade

## Agents utilisés

- **brand-guardian** — Protection de la marque, cohérence des messages, communication avec les parties prenantes, conformité
- **pr-outreach** — Relations médias, déclaration de presse, stratégie d'engagement des journalistes
</content>

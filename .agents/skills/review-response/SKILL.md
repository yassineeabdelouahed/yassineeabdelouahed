---
name: review-response
description: "Rédiger des réponses prêtes à publier aux avis positifs, neutres et négatifs sur n'importe quelle plateforme (Google, Yelp, G2, Capterra, Trustpilot, Amazon, App Store), avec des variantes formelles et décontractées, une notation d'alignement à la voix de marque, des recommandations d'escalade, et un mode batch qui varie le langage sur des avis similaires pour éviter des réponses à l'allure de modèles préfabriqués. Se déclenche sur \"/digital-marketing-pro:review-response\", \"reply to this 1-star review\", \"write a response to this Google review\", \"we got a nasty Yelp review, what do we say\", \"draft replies for this batch of reviews\". Lit le profil de marque, les guidelines de voix et de ton, et les modèles personnalisés ; il rédige et note les réponses — leur publication sur la plateforme reste de votre ressort."
---

# /digital-marketing-pro:review-response

## Objectif

Générer des réponses professionnelles et alignées à la marque pour les avis positifs, neutres et négatifs sur n'importe quelle plateforme. Garantit que chaque réponse conserve la voix de marque, traite les points spécifiques du client, et suit les meilleures pratiques de gestion de la réputation et de récupération client.

## Entrées requises

L'utilisateur doit fournir (ou se voir demander) :

- **Texte de l'avis** : Le texte complet de l'avis auquel répondre
- **Note** : Note en étoiles (1 à 5 étoiles)
- **Plateforme** : Où l'avis a été publié (Google, Yelp, G2, Capterra, Trustpilot, Amazon, TripAdvisor, App Store, etc.)
- **Nom du client** : Nom d'affichage du client (optionnel — pour la personnalisation)
- **Problème spécifique mentionné** : Plainte, éloge, ou sujet principal soulevé dans l'avis (optionnel — pour une réponse ciblée)
- **Contexte métier** : Tout contexte interne sur la situation — le problème a-t-il été résolu, y a-t-il un bug produit connu, y a-t-il eu une défaillance de service (optionnel — aide à rédiger une réponse précise)
- **Mode batch** : En cas de réponse à plusieurs avis, les fournir en un ensemble pour une cohérence de ton et une variation de langage
- **Exigence de rapidité de réponse** : Si l'avis nécessite une réponse urgente (situation de crise) ou un délai de traitement standard
- **Statut de résolution interne** : Si le problème a été corrigé, est en cours, ou n'est pas résolu (pour les avis négatifs — aide à déterminer ce qu'il faut promettre)

## Processus

1. **Charger le contexte de la marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également les guidelines** à `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier les modèles personnalisés à `~/.claude-marketing/brands/{slug}/templates/`. Vérifier les SOP d'agence à `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Appliquer les paramètres de voix de marque** : Charger les guidelines de voix et de ton et toute règle de style spécifique au canal pour la plateforme d'avis — les réponses aux avis nécessitent souvent un ton plus chaleureux et personnel que les autres communications de marque
3. **Classifier le sentiment et la sévérité de l'avis** : Catégoriser comme positif (4-5 étoiles), neutre (3 étoiles), ou négatif (1-2 étoiles) — classifier davantage les avis négatifs par niveau de sévérité : plainte mineure, défaillance de service, défaut produit, ou problème de sécurité/légal
4. **Pour les avis négatifs** : Reconnaître la préoccupation spécifique par son nom, exprimer une empathie sincère sans platitudes génériques, prendre ses responsabilités lorsque c'est approprié, offrir un chemin de résolution concret avec des détails, et déplacer la conversation hors ligne avec une méthode de contact directe (email ou téléphone)
5. **Pour les avis positifs** : Exprimer une gratitude sincère, renforcer l'aspect spécifique loué par le client, ajouter une touche personnelle ou humanisante, et encourager l'engagement continu — mentionner des produits, services, ou programmes de parrainage liés lorsque c'est naturel
6. **Pour les avis neutres** : Reconnaître le retour équilibré, traiter toute préoccupation spécifique soulevée avec des détails actionnables, mettre en avant les forces pertinentes de la marque sans être défensif ou désinvolte, et inviter à un dialogue plus poussé pour améliorer leur expérience
7. **Vérifier les guidelines de marque pour le langage de réponse approuvé** : Vérifier la réponse par rapport à tout terme restreint, revendication limitée, avertissement légal requis, ou élément de réponse imposé dans les guidelines de marque
8. **Appliquer les conventions de plateforme** : Ajuster la longueur, le formatage et le ton de la réponse selon les normes de la plateforme — Google (concis), Yelp (conversationnel), G2 (professionnel), TripAdvisor (orienté hospitalité), etc.
9. **Noter la réponse pour l'alignement à la voix de marque** : Évaluer la réponse rédigée par rapport aux paramètres de voix de marque — ton, formalité, chaleur, et personnalité — et ajuster jusqu'à ce que la réponse sonne authentiquement dans le ton de la marque
10. **Vérifier les pièges courants** : S'assurer que la réponse évite la posture défensive, le report de responsabilité, les promesses excessives, la divulgation d'informations privées, ou l'utilisation d'un langage répétitif entre plusieurs réponses d'avis
11. **Optimiser pour le SEO le cas échéant** : Sur les plateformes où les réponses sont indexées (Google, Yelp), incorporer naturellement des mots-clés pertinents et le nom de l'entreprise sans que cela paraisse forcé
12. **Générer des variations en batch** : En cas de réponse à plusieurs avis similaires, varier le langage, la structure, et l'ouverture pour éviter des réponses à l'allure de modèles préfabriqués qui nuisent à l'authenticité

## Résultat

Un ensemble structuré de réponses aux avis contenant :

- **Réponse d'avis prête à publier** : Réponse principale adaptée aux limites de caractères, aux conventions et aux attentes de l'audience de la plateforme
- **Versions alternatives** : Variantes formelle et décontractée pour plus de flexibilité, plus une version plus courte si la réponse principale dépasse les normes de la plateforme
- **Consignes de réponse** : Meilleures pratiques spécifiques à la plateforme appliquées — longueur recommandée, ton optimal, timing de réponse idéal, et considérations SEO
- **Recommandation d'escalade** : Pour les avis négatifs — si cela nécessite l'implication d'un manager, une revue légale, une notification à l'équipe produit, ou une prise de contact hors ligne immédiate
- **Score de qualité de la réponse** : Note d'alignement à la voix de marque et checklist des meilleures pratiques appliquées
- **Note de suivi** : Éléments d'action internes suggérés si l'avis révèle un problème systémique valant la peine d'être traité
- **Mots-clés SEO appliqués** : Pour les plateformes indexées, mots-clés naturellement incorporés dans la réponse
- **Analyse de ton** : Répartition du ton de la réponse (empathique, reconnaissant, professionnel, chaleureux) confrontée aux paramètres de voix de marque
- **Recommandation de timing de réponse** : Fenêtre optimale pour publier la réponse en fonction des algorithmes de plateforme et des attentes des clients
- **Extraction de modèle** : Si la réponse est solide, une version modèle généralisée enregistrée pour de futurs avis similaires

## Agents utilisés

- **content-creator** — Rédaction de la réponse, calibrage du ton, personnalisation, langage adapté à la plateforme, rédaction de versions alternatives
- **brand-guardian** — Application de la cohérence de la voix, conformité aux guidelines, vérifications de langage restreint, évaluation d'escalade, revue de sensibilité légale
</content>

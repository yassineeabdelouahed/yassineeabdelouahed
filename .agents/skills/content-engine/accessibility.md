# Accessibilité — Guide de contenu WCAG 2.2 AA

## Contenu textuel
- [ ] Niveau de lecture adapté à l'audience (B2C : niveau collège, B2B : niveau lycée/études supérieures)
- [ ] Langage simple utilisé (éviter le jargon sans explication)
- [ ] Phrases de moins de 20 mots en moyenne
- [ ] Paragraphes courts (2-4 phrases)
- [ ] Les instructions ne reposent pas uniquement sur la couleur, la forme, ou l'emplacement (« cliquez sur le bouton rouge »)
- [ ] Les abréviations sont expliquées à la première utilisation

## Images
- [ ] Toutes les images informatives ont un texte alt descriptif
- [ ] Le texte alt transmet le sens/l'objectif de l'image, pas juste une description
- [ ] Les images décoratives ont des attributs alt vides (`alt=""`)
- [ ] Les images complexes (graphiques, infographies) ont des descriptions longues
- [ ] Le texte n'est pas intégré dans les images sans alternative accessible
- [ ] Les images ont un contraste suffisant

### Guide de rédaction de texte alt
- **Image informative** : Décrire ce qu'elle montre et pourquoi c'est important — « Graphique à barres montrant le taux d'ouverture des e-mails en baisse de 22 % à 18 % sur 6 mois »
- **Image fonctionnelle (bouton/lien)** : Décrire l'action — « Soumettre le formulaire de contact »
- **Image décorative** : Laisser alt vide — `alt=""`
- **Image complexe** : Fournir une description longue à proximité ou via un lien — « Voir le tableau de données détaillé ci-dessous »

## Liens
- [ ] Le texte de lien est descriptif (PAS « cliquez ici » ou « en savoir plus »)
- [ ] Les liens sont distinguables du texte environnant (pas uniquement par la couleur)
- [ ] Les liens s'ouvrant dans de nouvelles fenêtres/onglets sont indiqués
- [ ] Les liens sont navigables au clavier

## Couleur et contraste
- [ ] Le texte a un rapport de contraste minimum de 4,5:1 par rapport à l'arrière-plan (norme AA)
- [ ] Le texte large (18px+ ou 14px+ gras) a un rapport de contraste minimum de 3:1
- [ ] L'information n'est pas transmise uniquement par la couleur
- [ ] Les composants d'interface ont un rapport de contraste minimum de 3:1

## Titres et structure
- [ ] La hiérarchie de titres est logique (H1 → H2 → H3, pas de niveaux sautés)
- [ ] Un seul H1 par page
- [ ] Les titres décrivent le contenu qui suit
- [ ] Les listes utilisent des éléments HTML de liste appropriés

## Vidéo et audio
- [ ] Les vidéos ont des sous-titres précis (les sous-titres automatiques sont revus pour les erreurs)
- [ ] L'audio préenregistré dispose de transcriptions
- [ ] Des descriptions vidéo sont disponibles pour les informations purement visuelles
- [ ] La lecture automatique est évitée ; si utilisée, elle peut être mise en pause/arrêtée

## Accessibilité e-mail
- [ ] Mise en page mono-colonne (pas de multi-colonnes qui casse avec les lecteurs d'écran)
- [ ] Taille de police minimum de 14px pour le corps de texte
- [ ] Les boutons CTA ont un texte descriptif (pas juste « Cliquez ici »)
- [ ] Texte alt sur toutes les images (les clients e-mail bloquent les images par défaut)
- [ ] Version texte brut disponible
- [ ] Le texte de préheader est significatif
- [ ] Les tableaux utilisés pour la mise en page ont `role="presentation"`

## Accessibilité réseaux sociaux
- [ ] **Instagram/Facebook** : Texte alt ajouté aux images (utiliser l'outil intégré)
- [ ] **Twitter/X** : Descriptions d'image activées et utilisées
- [ ] **Vidéo** : Sous-titres sur tout contenu vidéo (surtout TikTok, Reels)
- [ ] **Hashtags** : CamelCase pour les tags à plusieurs mots (#DigitalMarketing et non #digitalmarketing)
- [ ] **Emoji** : Utilisé avec parcimonie, sans remplacer les mots, sans être regroupé

## Langage inclusif
- [ ] Handicap : Utiliser un langage centré sur la personne ou centré sur l'identité selon la préférence de la communauté
- [ ] Genre : Utiliser des termes inclusifs sauf pertinence spécifique
- [ ] Âge : Éviter les hypothèses ou stéréotypes âgistes
- [ ] Culture : Éviter les idiomes qui ne se traduisent pas entre les cultures
- [ ] Socioéconomique : Ne pas présumer l'accès à une technologie ou des ressources spécifiques

## Tests
- **Vérificateur de contraste** : WebAIM Contrast Checker
- **Test avec lecteur d'écran** : NVDA (Windows, gratuit), VoiceOver (Mac/iOS, intégré)
- **Lisibilité** : Hemingway Editor, bibliothèque textstat
- **Audit complet** : WAVE, axe DevTools, score d'accessibilité Lighthouse

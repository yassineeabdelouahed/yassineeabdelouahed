---
name: brand-setup
description: "Créer ou mettre à jour le profil de marque que toutes les autres compétences consultent — une configuration interactive rapide en 5 questions ou complète en 17 questions, capturant l'identité, le modèle économique, le secteur d'activité et les marchés de conformité, les échelles de voix à 4 dimensions, les canaux, les objectifs et les concurrents, enregistrés dans ~/.claude-marketing/brands/{slug}/profile.json via scripts/setup.py. Se déclenche sur \"/digital-marketing-pro:brand-setup\", \"configurer une nouvelle marque\", \"intégrer un nouveau client\", \"passer à une autre marque\", \"mettre à jour la voix de notre marque\". Gère aussi le changement de marque (met à jour _active-brand.json) et les modifications ponctuelles de champs du profil ; à exécuter en premier — toutes les compétences marketing appliquent automatiquement le profil, les échantillons de voix et les règles de conformité qui en résultent."
argument-hint: "[brand-name or --full]"
---

# Brand Setup — Profilage de marque interactif

## Quand utiliser cette compétence

- L'utilisateur dit « configurer une nouvelle marque » ou « créer un profil de marque »
- L'utilisateur mentionne un nouveau client ou projet marketing
- L'utilisateur veut basculer entre plusieurs marques (cas d'usage agence)
- L'utilisateur veut mettre à jour la voix de marque, les audiences ou les objectifs
- Première utilisation d'une compétence marketing sans marque active

## Modes de configuration

### Configuration rapide (5 questions — recommandée pour démarrer vite)
Si l'utilisateur veut démarrer rapidement, ou dit « configuration rapide », ne posez que ces 5 questions essentielles :
1. **Nom de la marque** — « Quel est le nom de votre marque ou entreprise ? »
2. **Ce que vous faites** — « En une phrase, que fait [marque] ? » (pour en extraire le secteur, le modèle économique, l'USP)
3. **Audience cible** — « Qui est votre client principal ? » (pour en extraire le type B2B/B2C, la démographie)
4. **Voix de marque** — « Choisissez 3 mots qui décrivent la façon dont votre marque communique » (à mapper sur les échelles de formalité/énergie/humour/autorité)
5. **Canal principal** — « Où faites-vous principalement votre marketing ? (réseaux sociaux, e-mail, SEO, publicité payante, etc.) »

À partir de ces 5 réponses, remplissez intelligemment le profil complet :
- Déduisez le secteur, le type de modèle économique et les exigences de conformité
- Faites correspondre les descripteurs de voix aux échelles de 1 à 10 (ex. : « professionnel » → formalité : 8, « fun » → humour : 7)
- Définissez des valeurs par défaut raisonnables pour tout le reste
- Dites à l'utilisateur : « Profil rapide créé ! Vous pouvez l'affiner à tout moment avec /digital-marketing-pro:brand-setup --full »

### Configuration complète (17 questions — profilage exhaustif)
Utilisez la configuration complète lorsque :
- L'utilisateur demande explicitement une configuration détaillée/complète/exhaustive
- L'utilisateur dit « /digital-marketing-pro:brand-setup --full »
- L'utilisateur veut mettre à jour des sections spécifiques d'un profil existant

## Processus (configuration complète)

### Étape 1 : Identité de marque

Posez une question à la fois à l'utilisateur (ne le submergez pas) :

1. **Nom de la marque** : « Quel est le nom de la marque/l'entreprise ? »
2. **Pitch en une phrase** : « En une phrase, que fait [marque] ? »
3. **USP** : « Qu'est-ce qui différencie [marque] de ses concurrents ? »
4. **Mission/Valeurs** : « Quelle est la mission de la marque ? Quelles valeurs la portent ? »

### Étape 2 : Modèle économique

5. **Type d'entreprise** : Présentez les options :
   - B2B SaaS / Logiciel
   - B2C eCommerce / DTC
   - Services B2B / Conseil
   - Commerce local
   - Agence (gestion de plusieurs clients)
   - Créateur / Marque personnelle
   - Grand compte
   - Association à but non lucratif
   - Place de marché

6. **Modèle de revenus** : abonnement, transactionnel, freemium, commission de place de marché, don, forfait de gestion (retainer), publicité
7. **Fourchette de prix et cycle de vente** : « Quelle est la taille type de vos transactions et combien de temps faut-il pour les conclure ? »

### Étape 3 : Secteur et conformité

8. **Secteur** : « Dans quel secteur êtes-vous ? » (à faire correspondre avec industry-profiles.md)
9. **Réglementé ?** : « Êtes-vous dans un secteur réglementé ? (santé, finance, juridique, alcool, cannabis, etc.) »
10. **Marchés cibles** : « Dans quels pays/régions vendez-vous ? » (déclenche les règles de conformité)

### Étape 4 : Voix de marque

11. **Dimensions de la voix** — Demandez à l'utilisateur de noter de 1 à 10 ou de décrire :
    - Formalité (1 = très décontracté comme un ami, 10 = très formel comme un cabinet d'avocats)
    - Énergie (1 = calme et posé, 10 = enthousiaste et audacieux)
    - Humour (1 = jamais d'humour, 10 = l'humour est au cœur de la marque)
    - Autorité (1 = niveau pair, guide amical, 10 = leader d'opinion expert)

12. **Traits de personnalité** : « Choisissez 3 à 5 mots qui décrivent la personnalité de la marque » (ex. : spirituel, empathique, direct, audacieux, réfléchi, joueur, autoritaire, chaleureux)

13. **Ceci-Pas-Cela** : « Donnez-moi des exemples de comment vous diriez quelque chose vs. comment vous ne le diriez pas » (ex. : « On dit "Réglons ça ensemble" et non "Contactez notre service client" »)

14. **Exemple de contenu** : « Partagez 2-3 URL ou extraits de texte de contenus qui reflètent parfaitement la voix de votre marque »

### Étape 5 : Canaux et objectifs

15. **Canaux actifs** : « Quels canaux marketing utilisez-vous actuellement ? » (site web, Instagram, LinkedIn, Twitter, TikTok, YouTube, Facebook, Pinterest, e-mail, Google Ads, Meta Ads, etc.)

16. **Objectifs** : « Quel est votre objectif marketing numéro 1 en ce moment ? » + KPI cibles + fourchette de budget + taille de l'équipe

### Étape 6 : Concurrents

17. **Concurrents** : « Nommez 3 à 5 concurrents (directs ou aspirationnels) »
    - Pour chacun : nom, URL, relation (direct/indirect/aspirationnel), forces/faiblesses connues

### Étape 7 : Enregistrer et confirmer

Après avoir recueilli toutes les informations :

1. Exécutez : `python "${CLAUDE_PLUGIN_ROOT}/scripts/setup.py" --create-brand "[brand name]"`
2. Mettez à jour le profile.json créé avec toutes les données recueillies
3. Ajoutez le bloc de divulgation de l'assistance par IA (valeurs par défaut, sauf choix contraire de l'utilisateur) : `"ai_disclosure": {"mode": "claude-surfaces", "text": null, "author": null}`. Modes : `claude-surfaces` (par défaut — la divulgation s'affiche quand le contenu est exécuté sur une surface Claude ou en cas d'incertitude sur la surface, elle est omise seulement en cas de détection avérée d'un environnement non-Claude), `always` (toutes les surfaces — le plus sûr pour les marques ayant leurs propres obligations de transparence sur l'IA), `off` (jamais ; la marque garde la main sur ce choix). `author` est FACULTATIF et peut rester null — le texte par défaut (« relu par notre équipe éditoriale ») ne nécessite aucun nom. Un `text` personnalisé remplace le texte par défaut mot pour mot ; notez que le texte par défaut est neutre vis-à-vis du fournisseur et ne revendique que la relecture effectivement réalisée par le pipeline
4. Confirmez à l'utilisateur : « Profil de marque créé pour [brand_name]. Tous les modules marketing utiliseront désormais ce contexte. Vous pouvez le mettre à jour à tout moment en disant "mettre à jour mon profil de marque." »

## Changer de marque

Quand l'utilisateur dit « passer à [nom de marque] » :
1. Exécutez : `python "${CLAUDE_PLUGIN_ROOT}/scripts/setup.py" --list-brands`
2. Trouvez la marque correspondante
3. Mettez à jour `~/.claude-marketing/brands/_active-brand.json`
4. Confirmez : « Passé à [brand_name]. »

## Mettre à jour une marque

Quand l'utilisateur veut mettre à jour des champs spécifiques :
1. Chargez le profil actuel depuis `~/.claude-marketing/brands/{slug}/profile.json`
2. Interrogez sur le(s) champ(s) spécifique(s) à mettre à jour
3. Réécrivez le profil mis à jour
4. Confirmez les modifications

## Remarques importantes

- Ne sautez JAMAIS la section voix de marque — c'est elle qui rend tous les contenus produits fidèles à la marque
- Pour les agences : chaque client doit avoir un profil de marque distinct
- Stockez les échantillons de voix sous forme de fichiers markdown dans le répertoire voice-samples/ de la marque
- Détectez automatiquement les règles de conformité sectorielles selon le secteur et les marchés sélectionnés

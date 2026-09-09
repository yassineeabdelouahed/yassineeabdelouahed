# Sécurité de marque — Cadre de protection à 4 couches

> Protéger votre marque contre une apparition aux côtés de contenu nuisible, inapproprié, ou hors de la ligne de marque. Un seul mauvais placement peut détruire des années de construction de marque. Ce cadre fournit quatre couches de défense pour que cela n'arrive jamais.

---

## Le modèle de protection à 4 couches

```
Couche 4 : Sécurité du contenu détenu       ← Ce que vous publiez
Couche 3 : Sécurité des partenaires          ← Avec qui vous vous associez
Couche 2 : Sécurité de plateforme            ← Où vos publicités apparaissent
Couche 1 : Adjacence de contenu              ← Ce qui apparaît à côté de vos publicités
```

Chaque couche traite une surface d'attaque différente. Une sécurité de marque robuste nécessite les quatre.

---

## Couche 1 — Adjacence de contenu

L'adjacence de contenu est le risque de sécurité de marque le plus courant : votre publicité apparaissant à côté de contenu répréhensible sur des sites d'éditeurs, des vidéos YouTube, ou des fils sociaux.

### Catégories de sécurité de marque dérivées de GARM (cadre sectoriel historique)

*Remarque : GARM (Global Alliance for Responsible Media) a cessé ses activités en août 2024, mais sa taxonomie de sécurité/adéquation de marque reste la référence de facto utilisée par les plateformes et les fournisseurs de vérification.*

| Catégorie | Niveau de risque | Exemples | Action par défaut |
|----------|-----------|----------|----------------|
| Contenu sexuel adulte et explicite | Élevé | Pornographie, contenu sexuel graphique | Bloquer |
| Armes et munitions | Élevé | Vente d'armes, équipement tactique | Bloquer (la plupart des marques) |
| Crime et actes nuisibles | Élevé | Promotion de violence, tutoriels d'activité illégale | Bloquer |
| Décès, blessures et conflit militaire | Élevé | Images de guerre graphiques, vidéos d'accident | Bloquer |
| Piratage en ligne | Élevé | Sites torrent, streaming illégal | Bloquer |
| Discours de haine et discrimination | Élevé | Contenu extrémiste, insultes | Bloquer |
| Obscénité et vulgarité | Moyen | Vulgarité occasionnelle dans le divertissement | Au cas par cas |
| Drogues illégales / tabac / alcool | Moyen | Contenu de culture de la drogue, promotion du vapotage | Selon le secteur |
| Spam / malware | Élevé | Fermes de clics, sites malveillants | Bloquer |
| Terrorisme | Élevé | Propagande extrémiste | Bloquer |
| Sujets sociaux sensibles | Moyen | Débats politiques, justice sociale | Au cas par cas |
| Désinformation | Élevé | Fausses nouvelles, théories du complot | Bloquer |

### Listes d'exclusion de mots-clés

**Liste de blocage universelle (à appliquer à toutes les campagnes) :**
```
tragedy, shooting, terrorist, bomb, assault, murder, scandal,
arrest, abuse, trafficking, extremist, conspiracy, hoax,
pornography, explicit, hate crime, mass shooting, genocide,
drug overdose, suicide, self-harm
```

**Liste de blocage sensible à l'actualité (à activer pendant les événements d'actualité) :**
```
breaking news, developing story, crisis, emergency, disaster,
casualties, victims, manhunt, evacuation
```

**Liste de blocage politique (pour les marques évitant l'adjacence politique) :**
```
election, candidate name, party name, impeach, ballot,
partisan, left-wing, right-wing, propaganda
```

> **Important :** Un blocage de mots-clés trop agressif peut faire chuter la portée. Revoir les listes de blocage trimestriellement et surveiller le compromis entre perte d'impressions et sécurité.

---

## Couche 2 — Sécurité de plateforme

### Google Ads — Paramètres de sécurité de marque

| Paramètre | Emplacement | Recommandation |
|---------|----------|----------------|
| Exclusions de contenu | Campagne → Paramètres → Exclusions de contenu | Exclure : DL-MA, diffusion en direct (sauf pertinence), domaines parqués |
| Exclusions de thèmes | Campagne → Contenu → Thèmes (Exclusions) | Exclure les thèmes sensibles selon les catégories GARM |
| Exclusions d'emplacements | Campagne → Contenu → Emplacements (Exclusions) | Maintenir une liste d'exclusion de 500+ sites (mise à jour mensuelle) |
| Type d'inventaire | Campagne → Paramètres → Type d'inventaire | Utiliser « Inventaire limité » pour une sécurité maximale |
| Adéquation de marque | Google Ads → Outils → Adéquation de marque | Activer et configurer les labels de contenu |

### Meta (Facebook / Instagram) — Paramètres de sécurité de marque

| Paramètre | Emplacement | Recommandation |
|---------|----------|----------------|
| Filtre d'inventaire | Paramètres Business → Sécurité de marque → Filtre d'inventaire | Inventaire complet (le plus large), Standard (recommandé), Limité (le plus strict) |
| Listes de blocage | Paramètres Business → Sécurité de marque → Listes de blocage | Téléverser une liste de blocage d'éditeurs (CSV) |
| Exclusions de type de contenu | Ensemble de publicités → Emplacements → Sécurité de marque | Exclure le in-stream pour les marques sensibles |
| Listes d'autorisation d'éditeurs | Paramètres Business → Sécurité de marque → Listes d'éditeurs | Utiliser pour les stratégies de placement premium uniquement |

### YouTube — Paramètres de sécurité de marque

| Paramètre | Emplacement | Recommandation |
|---------|----------|----------------|
| Adéquation du contenu | Google Ads → Type d'inventaire | « Inventaire limité » exclut la plupart des risques |
| Exclusions de chaînes | Emplacements → Exclusions | Exclure les chaînes spécifiques signalées par le suivi |
| Exclusions de thèmes | Contenu → Thèmes → Exclusions | Refléter les exclusions GARM |
| Lineups | Google Ads → Lineups YouTube | Utiliser des lineups sélectionnées pour l'inventaire premium |

### Programmatique (DV360, TTD, Xandr)

| Paramètre | Recommandation |
|---------|----------------|
| Filtrage pré-enchère | Activer les segments pré-enchère IAS ou DV |
| Listes d'autorisation/blocage de domaines | Maintenir une liste d'autorisation sélectionnée (préféré) ou une liste de blocage exhaustive |
| Listes d'autorisation/blocage d'applications | Bloquer les catégories d'applications : jeux occasionnels, utilitaires, VPN |
| Optimisation du chemin d'approvisionnement | Privilégier l'inventaire vendu directement, les revendeurs autorisés uniquement (vérifiés ads.txt) |
| Achat basé sur des accords | Utiliser les PMP et accords PG pour la sécurité maximale |

---

## Couche 3 — Sécurité des partenaires

### Checklist de sécurité de marque pour les influenceurs

Avant d'engager tout influenceur ou créateur :

- [ ] Auditer les 12 derniers mois de contenu pour des déclarations controversées
- [ ] Vérifier les incidents passés de sécurité de marque (rechercher : « [nom] controverse »)
- [ ] Revoir la démographie des abonnés (vérifications de bots, qualité de l'audience)
- [ ] Rechercher une association avec des groupes ou personnalités extrémistes
- [ ] Vérifier qu'ils n'ont pas récemment promu des marques concurrentes ou conflictuelles
- [ ] Inclure une clause de moralité/sécurité de marque dans le contrat
- [ ] Exiger une approbation du contenu avant publication
- [ ] Mettre en place un suivi en temps réel pendant la fenêtre de campagne

### Sécurité des partenariats / sponsorships

| Critère d'évaluation | Question de risque | Action si signalé |
|---------------------|--------------|-------------------|
| Sponsoring d'événement | Cet événement a-t-il déjà eu des incidents de sécurité ? | Diligence raisonnable renforcée, clause de sortie dans le contrat |
| Co-branding | La marque partenaire s'aligne-t-elle avec nos valeurs ? | Évaluation de l'alignement des valeurs de marque |
| Programmes d'affiliation | Les affiliés placent-ils des publicités sur un inventaire sûr ? | Exiger que les affiliés utilisent vos listes de placement approuvées |
| Revendeur / distributeur | Vendent-ils sur des canaux autorisés ? | Application MAP, suivi des canaux |

---

## Couche 4 — Sécurité du contenu détenu

### Revue de contenu avant publication

| Type de contenu | Processus de revue | Réviseurs |
|-------------|---------------|-----------|
| Articles de blog | Lecture de sensibilité + revue légale (si des revendications sont faites) | Éditeur + Légal |
| Publications sociales | Vérification de voix de marque + revue de sensibilité culturelle | Responsable social + défenseur de la diversité |
| Campagnes email | Vérification de conformité (CAN-SPAM, RGPD) + revue de ton | Responsable email + Légal |
| Contenu vidéo | Revue complète du script + revue du montage final | Directeur créatif + Légal |
| Contenu généré par les utilisateurs | Modération avant amplification | Community Manager |
| Contenu généré par IA | Vérification des faits + revue d'hallucination + vérification de biais | Expert du domaine |

### Calendrier de sensibilité culturelle

Maintenir une conscience des dates/événements où le message de marque doit être ajusté :

| Période | Considération |
|--------|--------------|
| Fêtes religieuses (toutes confessions) | Éviter les promotions déconnectées de la réalité |
| Tragédies nationales / anniversaires | Mettre en pause le message promotionnel |
| Saisons électorales politiques | Éviter tout ce qui pourrait être interprété comme partisan |
| Mois de sensibilisation culturelle | Participer authentiquement ou pas du tout |
| Campagnes internationales | Revue culturelle locale pour chaque marché |

---

## Évaluation des fournisseurs de sécurité de marque

| Fournisseur | Points forts | Idéal pour | Intégration |
|--------|-----------|----------|--------------|
| **IAS (Integral Ad Science)** | Fort en pré-enchère, ciblage contextuel, benchmarks sectoriels | Annonceurs à forte composante programmatique | DV360, TTD, Xandr, Meta, YouTube |
| **DoubleVerify (DV)** | Couverture exhaustive, métriques d'attention, catégories personnalisées | Marques entreprise nécessitant un contrôle granulaire | Tous les principaux DSP, plateformes sociales |
| **Zefr** | Adéquation de marque spécifique à YouTube, ciblage au niveau vidéo | Annonceurs à forte composante YouTube | YouTube, TV connectée |
| **Channel Factory** | Optimisation YouTube, équilibre performance + sécurité | Marketeurs de performance sur YouTube | YouTube |

### Critères de sélection du fournisseur

| Critère | Poids | Questions à poser |
|----------|--------|-----------------|
| Couverture | 25 % | Quelles plateformes/places de marché sont couvertes ? |
| Précision | 25 % | Quel est le taux de faux positifs/négatifs ? |
| Granularité | 20 % | Puis-je créer des catégories de sécurité de marque personnalisées ? |
| Reporting | 15 % | Tableaux de bord en temps réel ? Analyse post-campagne ? |
| Coût | 15 % | Surcharge CPM ? Frais fixe ? Tarification échelonnée ? |

---

## Checklist d'audit de sécurité de marque (trimestrielle)

- [ ] Revoir et mettre à jour les listes d'exclusion de mots-clés
- [ ] Auditer les rapports de placement pour toutes les campagnes actives (signaler tout mauvais placement)
- [ ] Mettre à jour les listes de blocage/autorisation d'éditeurs en fonction des données du dernier trimestre
- [ ] Revoir le portefeuille d'influenceurs pour toute nouvelle controverse
- [ ] Tester la précision du fournisseur de sécurité de marque (audit d'échantillon de 100 placements)
- [ ] Mettre à jour les paramètres de catégorie GARM si le positionnement de marque a évolué
- [ ] Revoir les chemins d'approvisionnement programmatiques (conformité ads.txt/sellers.json)
- [ ] Réaliser une revue du calendrier de sensibilité culturelle pour le prochain trimestre
- [ ] Vérifier les résultats de contenu généré par IA pour les motifs de biais ou d'hallucination
- [ ] Informer les équipes créatives et médias de toute nouvelle politique de sécurité de marque

---

## Protocoles de sécurité de marque déclenchés par une crise

Lorsqu'une crise survient (voir `crisis-communication.md`), activer immédiatement :

| Action | Chronologie | Responsable |
|--------|----------|-------|
| Mettre en pause toutes les campagnes programmatiques | Dans les 15 minutes | Équipe média |
| Mettre en pause les campagnes publicitaires sociales | Dans les 15 minutes | Équipe sociale |
| Revoir les publications organiques planifiées pour l'adéquation du ton | Dans les 30 minutes | Équipe contenu |
| Ajouter des mots-clés spécifiques à la crise aux listes de blocage | Dans l'heure | Équipe média |
| Notifier le fournisseur de sécurité de marque d'un risque élevé | Dans l'heure | Équipe média |
| Reprendre les campagnes uniquement après approbation explicite du commandant de crise | Une fois autorisé | Commandant de l'incident |

---

> **La sécurité de marque n'est pas une configuration à faire une fois pour toutes.** Elle nécessite une surveillance continue, des audits trimestriels, et une adaptation rapide lorsque l'environnement change. Le coût d'un échec de sécurité de marque dépasse toujours le coût de la prévention.
</content>

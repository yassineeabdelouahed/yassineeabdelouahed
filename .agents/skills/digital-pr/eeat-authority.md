# Guide de renforcement de l'autorité E-E-A-T

## Checklist d'audit E-E-A-T

### Expérience
- [ ] Le contenu démontre une expérience directe du sujet
- [ ] L'auteur a utilisé/testé les produits ou services évoqués
- [ ] Photos, captures d'écran, ou données originales issues d'un usage réel
- [ ] Anecdotes personnelles et exemples d'application concrète

### Expertise
- [ ] L'auteur a des références vérifiables (formation, certifications, parcours professionnel)
- [ ] Une page de bio auteur existe, avec références, photo et liens
- [ ] Le contenu démontre une connaissance approfondie du sujet (pas superficielle)
- [ ] L'exactitude technique a été vérifiée par un relecteur qualifié

### Autorité
- [ ] La marque est reconnue dans le secteur (mentions média, récompenses, citations)
- [ ] D'autres sources faisant autorité renvoient vers la marque ou la citent
- [ ] Des experts du secteur référencent ou soutiennent la marque
- [ ] La marque participe à des organisations et événements sectoriels

### Fiabilité
- [ ] Les coordonnées sont facilement accessibles
- [ ] La politique de confidentialité et les conditions d'utilisation sont à jour
- [ ] Le contenu est factuellement exact et bien sourcé
- [ ] Les corrections/mises à jour sont transparentes
- [ ] Le site est sécurisé (HTTPS) sans avertissement de sécurité
- [ ] Les avis et notes sont authentiques (non manipulés)

---

## Optimisation des auteurs

### Exigences de la page auteur
- Photo professionnelle
- Nom complet et références (diplômes, certifications)
- Poste et entreprise actuels
- Expérience pertinente (années, réalisations notables)
- Publications et apparitions médiatiques
- Preuve sociale (prises de parole, récompenses)
- Liens vers les profils sociaux (LinkedIn, Twitter)

### Schema auteur
```json
{
  "@type": "Person",
  "name": "Author Name",
  "url": "https://yoursite.com/team/author-name",
  "jobTitle": "Title",
  "worksFor": {"@type": "Organization", "name": "Company"},
  "alumniOf": {"@type": "Organization", "name": "University"},
  "sameAs": ["https://linkedin.com/in/...", "https://twitter.com/..."],
  "knowsAbout": ["Marketing", "SEO", "Content Strategy"]
}
```

---

## Taxonomie des signaux de confiance

### Signaux au niveau du site
| Signal | Mise en œuvre |
|--------|---------------|
| Page « À propos » | Historique détaillé de l'entreprise, mission, équipe, et coordonnées |
| Politique éditoriale | Comment le contenu est créé, revu, et mis à jour |
| Politique de correction | Comment les erreurs sont traitées (transparence) |
| Page contact | Plusieurs moyens de contact (téléphone, email, adresse, chat) |
| Confidentialité/conditions | À jour, complètes, faciles à trouver |
| Sécurité | HTTPS, badges de sécurité sur les pages de transaction |

### Signaux au niveau du contenu
| Signal | Mise en œuvre |
|--------|---------------|
| Citations de sources | Lien vers des recherches primaires, études, sources officielles |
| Citations d'experts | Inclure des citations d'experts tiers crédibles |
| Attribution des données | Chaque statistique a une source et une date |
| Signature de l'auteur | Chaque article a un auteur identifié et crédible |
| Date de publication/mise à jour | Des dates visibles montrent que le contenu est à jour |
| Transparence méthodologique | Expliquer comment les conclusions ont été obtenues |

### Signaux externes
| Signal | Comment le construire |
|--------|-------------|
| Backlinks de sites faisant autorité | RP, articles invités, recherche originale |
| Mentions média | Sollicitation RP, commentaire d'expert, études de données |
| Citations sectorielles | Publier des données uniques que d'autres veulent référencer |
| Références Wikipédia | Créer des recherches originales citables (sans modifier directement Wikipédia) |
| Avis sur plateformes tierces | Programme de génération d'avis clients |

---

## Exigences de contenu YMYL

Pour les sujets « Your Money Your Life » (santé, finance, droit, sécurité) :

- **Auteur expert requis** : l'auteur doit avoir des références professionnelles pertinentes
- **Revue médicale/juridique/financière** : le contenu est revu par un professionnel agréé
- **Divulgation** : indiquer clairement qui a rédigé et revu le contenu
- **Allégations prudentes** : aucune allégation santé/financière non étayée
- **Informations actuelles** : mettre à jour plus fréquemment que le contenu non-YMYL
- **Sources primaires** : lien vers des sources gouvernementales, académiques, ou évaluées par des pairs
- **Avertissements** : « Ceci ne constitue pas un conseil médical/juridique/financier » lorsque c'est approprié

---

## Mesure

| Métrique | Outil | Objectif |
|--------|------|--------|
| Domain Authority / Domain Rating | Moz / Ahrefs | Tendance à la hausse |
| Domaines référents | Ahrefs / SEMrush | Croissance mensuelle |
| Volume de recherche de marque | Google Trends | Tendance à la hausse |
| Présence dans le Knowledge Panel | Google Search | Actif et exact |
| Mentions média | Google Alerts, Mention | Nombre mensuel en hausse |
| Autorité de l'auteur | Placements d'articles signés, invitations à parler | Portfolio en croissance |

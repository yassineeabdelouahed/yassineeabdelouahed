---
name: seo-audit
description: "Réalise un audit SEO complet couvrant la santé technique, l'optimisation on-page, la qualité de contenu, l'E-E-A-T, le profil de liens et le SEO local — produisant des livrables numérotés et datés (de l'inventaire de crawl aux actions priorisées) ainsi qu'un PLAN.md sur une page avec un plan d'action impact/effort et un tableau de bord qualité à quatre portes. Se déclenche sur \"/digital-marketing-pro:seo-audit\", \"audit my site's SEO\", \"why did our rankings drop\", \"check our technical SEO health\", \"how strong is our E-E-A-T\". Lit le profil de marque ; PLAN.md alimente /digital-marketing-pro:seo-implement, /digital-marketing-pro:seo-plan et /digital-marketing-pro:seo-drift, la prospection de liens étant confiée à /digital-marketing-pro:backlink-gap."
argument-hint: "[URL]"
---

# /digital-marketing-pro:seo-audit

## Objectif

Réaliser un audit SEO complet qui évalue un site web selon toutes les dimensions majeures de classement. Produit un plan d'action priorisé avec impact et effort estimés pour chaque recommandation.

### Contexte de la mise à jour Core de mai 2026 (à lire avant de trier la volatilité)

> **Consigne limitée dans le temps — valable jusqu'à ~2026-08.** Ce bloc est spécifique à la fenêtre de la mise à jour Core de mai 2026. Après ~août 2026, il est obsolète : revérifiez le [Google Search Status Dashboard](https://status.search.google.com/) pour connaître la mise à jour Core actuelle ou la plus récente et ses dates avant d'appliquer l'un des conseils de timing ci-dessous.

Google a déployé une **mise à jour large de l'algorithme Core à partir du 21 mai 2026**, avec la fenêtre de déploiement habituelle d'environ 2 semaines. Si l'audit est réalisé dans cette fenêtre (ou dans les 4 semaines suivantes) et que la marque montre une volatilité de classement :

- **Ne procédez à aucun changement réactif pendant le déploiement.** Attendez que la mise à jour soit entièrement déployée (Google annonce l'achèvement dans le Search Status Dashboard), plus 7 à 14 jours de stabilisation post-déploiement, avant de tirer des conclusions.
- **Diagnostiquez la direction avant l'ampleur.** Une baisse à l'échelle du site, une baisse d'une seule section, ou une baisse d'un seul gabarit ont des causes profondes très différentes. Utilisez Search Console pour comparer les impressions et clics avant déploiement (21 jours avant le 21 mai), pendant le déploiement, et après le déploiement, segmentés par groupe de pages.
- **Les mises à jour Core repondèrent des signaux existants, elles n'en introduisent pas de nouveaux.** Les dimensions d'audit ci-dessous restent la référence ; la bonne réponse à un impact de mise à jour Core consiste généralement à approfondir l'E-E-A-T, à améliorer la valeur unique, à corriger le contenu pauvre ou dupliqué, et à réduire les pages affiliées ou de spam IA de faible qualité — pas à courir après des signaux rumeurs.
- **Signalez dans le résumé exécutif** si les écarts de classement précèdent le déploiement (problèmes probablement propres au site) ou coïncident avec lui (repondération probable liée à la mise à jour Core). Cela détermine si des gains rapides sont appropriés ou si la marque a besoin d'un programme qualité sur plusieurs trimestres.

## Informations requises

L'utilisateur doit fournir (ou se verra demander) :

- **URL du site web** : Le domaine ou les pages spécifiques à auditer
- **Mots-clés cibles** : Les mots-clés principaux sur lesquels le site devrait se positionner (optionnel — peuvent être recherchés)
- **Concurrents** : 2 à 3 URL de concurrents pour l'étalonnage (optionnel)
- **Périmètre de l'audit** : Site complet ou zone spécifique (technique, contenu, local, liens)
- **Problèmes connus** : Tout problème existant dont l'utilisateur a connaissance

## Processus

1. **Charger le contexte de marque** : Lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer la voix de marque, les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`), et le contexte sectoriel. **Vérifier également la présence de directives** dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions et les fichiers de catégorie pertinents. Vérifier la présence de modèles personnalisés dans `~/.claude-marketing/brands/{slug}/templates/`. Vérifier la présence de procédures d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : "Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ?" — ou procéder avec les valeurs par défaut.
2. **Audit technique** : Crawlabilité, indexation, Core Web Vitals, ergonomie mobile, données structurées, HTTPS, sitemap XML, robots.txt, balises canoniques, chaînes de redirection
3. **Audit on-page** : Balises title, meta descriptions, hiérarchie des titres, usage des mots-clés, texte alternatif des images, structure de maillage interne, structure des URL
4. **Audit de contenu** : Contenu pauvre, contenu dupliqué, lacunes de contenu, fraîcheur, signaux E-E-A-T (pages auteur, citations, qualifications, expérience de première main)
5. **SEO local** (le cas échéant) : Google Business Profile, cohérence NAP, schema local, avis, profil de liens local
6. **Profil de liens** : Autorité de domaine, qualité des backlinks, liens toxiques, distribution du texte d'ancrage, vélocité des liens, écart de liens avec les concurrents. Notez le profil du domaine propre avec l'analyseur (alimente `05-link-profile.md`) :
   ```bash
   python "${CLAUDE_PLUGIN_ROOT}/scripts/link-profile-analyzer.py" \
       --file "${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-audit/{date}/links-export.json" \
       --brand-domain {brand-domain}
   ```
   (`--file` est un tableau JSON d'objets de lien `[{"url","anchor_text","domain","da","follow"}]`, ou passez `--links '<json>'` en ligne ; `--brand-domain` exclut les liens internes.) Pour la prospection d'écart de liens concurrentiels, confiez la tâche à `/digital-marketing-pro:backlink-gap`.
7. Notez chaque dimension sur une échelle de 1 à 10
8. Priorisez les constats par impact (haut/moyen/faible) et effort (gain rapide/moyen/projet majeur)
9. Générez le rapport d'audit avec des recommandations exploitables

## Résultat

Un rapport d'audit SEO structuré contenant :

- Un résumé exécutif avec un score de santé global
- Un tableau de bord SEO technique avec des problèmes spécifiques et leurs corrections
- Des constats d'optimisation on-page par page/gabarit
- Une évaluation de la qualité de contenu avec analyse des lacunes
- Une évaluation E-E-A-T et des recommandations d'amélioration
- Une évaluation SEO local (le cas échéant)
- Une analyse du profil de liens avec les opportunités
- Un plan d'action priorisé selon le ratio impact/effort

## Convention de sortie numérotée

Tous les livrables d'audit vont dans `${CLAUDE_PLUGIN_DATA}/{brand}/seo/seo-audit/{YYYY-MM-DD}/` :

```
00-input.md                    URL cible, périmètre de l'audit, contexte de marque, drapeau de fenêtre de mise à jour Core
01-crawl-inventory.md          URL découvertes, codes de statut, chaînes de redirection
02-technical-scorecard.md      Core Web Vitals, crawlabilité, validité du schema (1-10 par dimension)
03-onpage-findings.md          problèmes par gabarit avec liste des URL concernées
04-content-quality.md          E-E-A-T, contenu pauvre/dupliqué, couverture thématique
05-link-profile.md             santé du backlink propre (confier la prospection à backlink-gap)
06-eeat-evaluation.md          signaux auteur, indicateurs d'expertise, éléments de confiance
07-local-seo.md                uniquement si profile.target_markets a une intention locale
08-quality-scorecard.md        les portes ci-dessous — doivent passer pour status: ready
09-prioritised-actions.md      matrice impact × effort, top 20 des actions
PLAN.md                        livrable sur une seule page
```

Les compétences en aval (`seo-implement`, `seo-plan`, `content-engine`) consomment `PLAN.md` et le fichier numéroté pertinent plutôt que de refaire une requête.

## Tableau de bord qualité

| Porte | Ce qu'elle vérifie |
|---|---|
| **crawl_coverage** | ≥ 90 % des URL du sitemap crawlées avec succès (sinon les données d'entrée sont incomplètes) |
| **dimension_completeness** | Scores renseignés pour les 6 dimensions obligatoires (technique, on-page, contenu, E-E-A-T, liens, local le cas échéant) |
| **finding_actionability** | Chaque constat « impact élevé » a un responsable nommé + une estimation d'effort (sinon il n'est pas exploitable) |
| **core_update_flag_set** | Si l'audit se déroule dans une fenêtre de mise à jour Core, `00-input.md` le signale ET `PLAN.md` porte l'encadré « attendre 7-14 jours avant tout changement réactif » |

`status: ready` requiert la réussite des quatre portes.

## Transmissions de la chaîne

- **En amont :** profil de marque + (optionnel) résultats antérieurs de `tech-seo-audit`, `aeo-audit`
- **En aval :**
  - `/digital-marketing-pro:seo-implement` — applique les N principaux constats au CMS / backlog de développement
  - `/digital-marketing-pro:seo-plan` — consomme via la notation par pilier du répartiteur
  - `/digital-marketing-pro:backlink-gap` — pour le volet prospection de liens que `05-link-profile.md` ne couvre que sous l'angle du domaine propre
  - `/digital-marketing-pro:seo-drift` — le trimestre suivant, comparer deux instantanés d'audit

## Astuces et mises en garde

- **Audit réalisé pendant une mise à jour Core ?** Signalez-le clairement dans `00-input.md` et ne recommandez pas de changements réactifs. Les constats de l'audit restent valides ; c'est le timing de l'action qui ne l'est pas.
- **N'auditez pas au niveau de l'URL pour les sites de plus de 10 000 pages.** Échantillonnez par gabarit (regroupez par gabarit, auditez une URL représentative par gabarit, généralisez).
- **La notation E-E-A-T relève du jugement, pas de la mesure.** Deux SEO seniors seront en désaccord d'environ 1 point par dimension sur le même site. Calibrez selon le secteur de la marque : un signal auteur de 7/10 est excellent pour du SaaS mais tout juste viable pour un éditeur santé YMYL.
- **La dimension SEO local** ne s'applique que si le profil de marque a `business_model: local` ou si `target_markets` inclut des zones géographiques spécifiques avec un service physique. Sinon, l'ignorer.
- **La dimension profil de liens ici concerne la santé du domaine propre** (liens cassés, chaînes de redirection, distribution du texte d'ancrage sur les liens entrants). Pour l'analyse d'écart de liens concurrentiels, confiez la tâche à `/digital-marketing-pro:backlink-gap` — n'essayez pas de faire les deux dans cet audit.

## Agents utilisés

- **seo-specialist** — Toutes les dimensions d'audit, la notation, la priorisation et les recommandations

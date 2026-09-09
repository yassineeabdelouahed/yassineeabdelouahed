---
name: verify-claims
description: "Extraire chaque affirmation vérifiable dans un texte marketing — statistiques, classements, récompenses, citations, et assertions de performance et limitées dans le temps — et vérifier chacune par rapport à un JSON de preuves fourni par l'utilisateur, en la classifiant vérifiée, partiellement vérifiée, non vérifiée, ou contredite, avec des suggestions de texte corrigé et de langage nuancé. Sans fichier de preuves, elle fonctionne en extraction uniquement et génère un modèle à remplir. Se déclenche sur \"/digital-marketing-pro:verify-claims\", \"fact-check this case study\", \"can we back up these numbers\", \"is this statistic real\", \"check our award claims before the press release\". Exécute claim-verifier.py et applique les règles de conformité de marque pour les secteurs réglementés ; l'approfondissement dédié à l'intégrité des affirmations, en complément de /digital-marketing-pro:eval-content."
argument-hint: "[content-path]"
---

# /digital-marketing-pro:verify-claims

## Objectif

Recouper les affirmations marketing avec des données de preuve fournies par l'utilisateur. Extrait toutes les affirmations vérifiables du contenu — statistiques, pourcentages, classements, récompenses, certifications, citations nommées, indicateurs de performance, comptes de clients, et assertions limitées dans le temps — puis fait correspondre chacune à un fichier de preuves et la classifie comme vérifiée, partiellement vérifiée, non vérifiée, ou contredite. Cette commande est l'approfondissement dédié à l'intégrité des affirmations, tandis que /digital-marketing-pro:eval-content inclut la vérification des affirmations comme une dimension parmi son évaluation qualité plus large.

Un contenu marketing citant des chiffres précis, des récompenses, ou des résultats sans preuve vérifiée constitue un risque de marque. Les affirmations contredites érodent la confiance si elles sont repérées par des clients, des journalistes, ou des régulateurs. Cette commande garantit que chaque assertion factuelle de votre contenu est étayée par des données réelles, clairement sourcée, et défendable sous examen.

## Entrées requises

L'utilisateur doit fournir (ou se verra demander) :

- **Contenu avec affirmations** : le texte à vérifier — fourni en ligne, en tant que bloc collé, ou en tant que chemin de fichier. Tout contenu marketing faisant des assertions factuelles : landing pages, études de cas, communiqués de presse, textes publicitaires, pitch decks, documents pour investisseurs, pages produit, ou rapports clients
- **Fichier de preuves** (optionnel mais fortement recommandé) : un fichier JSON contenant les données source par rapport auxquelles vérifier. Format : `[{"claim": "texte de l'affirmation descriptive", "source": "nom ou URL de la source de données", "date": "AAAA-MM-JJ de la vérification", "verified": true/false, "value": "le chiffre ou fait vérifié"}]`. Peut être exporté depuis GA4, le CRM, les données de vente, les organismes de certification, ou assemblé manuellement. S'il n'est pas fourni, la commande fonctionne en mode extraction uniquement et guide l'utilisateur sur la création d'un fichier de preuves
- **Affirmation spécifique à vérifier** (optionnel) : une affirmation unique sur laquelle se concentrer plutôt que de scanner tout le contenu — utile pour des vérifications ponctuelles rapides sur une statistique ou une assertion particulière

## Processus

1. **Charger le contexte de marque** : lire `~/.claude-marketing/brands/_active-brand.json` pour obtenir le slug actif, puis charger `~/.claude-marketing/brands/{slug}/profile.json`. Appliquer les règles de conformité pour les marchés cibles (`skills/context-engine/compliance-rules.md`) — certains secteurs et régions ont des exigences plus strictes pour étayer les affirmations (services financiers, santé, protection des consommateurs de l'UE). Vérifier aussi la présence de guidelines dans `~/.claude-marketing/brands/{slug}/guidelines/_manifest.json` — si présentes, charger les restrictions de messaging pouvant définir les affirmations approuvées et les assertions interdites. Vérifier la présence de SOP d'agence dans `~/.claude-marketing/sops/`. Si aucune marque n'existe, demander : « Configurer d'abord une marque (/digital-marketing-pro:brand-setup) ? » — ou continuer avec les valeurs par défaut.
2. **Extraire les affirmations du contenu** : exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/claim-verifier.py" --action extract-claims --text "{content}"` pour identifier toutes les assertions vérifiables. L'extracteur catégorise les affirmations par type :
   - **Affirmations statistiques** : pourcentages, ratios, chiffres de croissance, données de taille de marché (« augmentation de 73 % des conversions », « ROAS de 4,8x »)
   - **Affirmations de classement** : assertions de position, déclarations comparatives (« leader du marché », « n°1 noté », « à la croissance la plus rapide »)
   - **Affirmations de récompense et certification** : récompenses nommées, certifications sectorielles, badges de conformité (« certifié ISO 27001 », « G2 Leader »)
   - **Affirmations de citation nommée** : citations attribuées, références de source, citations d'étude (« selon Gartner », « Forrester rapporte »)
   - **Affirmations de performance** : nombre de clients, résultats limités dans le temps, promesses de SLA (« plus de 10 000 clients », « résultats en 30 jours »)
   - **Affirmations temporelles** : assertions spécifiques à une date, affirmations de récence (« en date de 2026 », « les dernières données montrent »)
3. **Vérifier les affirmations par rapport aux preuves** : si un fichier de preuves est fourni, exécuter `python "${CLAUDE_PLUGIN_ROOT}/scripts/claim-verifier.py" --action verify --text "{content}" --evidence {evidence_file}`. Pour chaque affirmation extraite, le vérificateur :
   - Tente de faire correspondre l'affirmation à une entrée de preuve par similarité sémantique et type d'affirmation
   - Classifie le résultat de correspondance : **Vérifiée** (l'affirmation correspond à la preuve dans une tolérance acceptable), **Partiellement vérifiée** (l'affirmation est directionnellement correcte mais les chiffres précis diffèrent, ou la date source est obsolète), **Non vérifiée** (aucune entrée de preuve correspondante trouvée), ou **Contredite** (la preuve est en conflit direct avec l'affirmation)
   - Attribue un score de confiance (0-100) à chaque vérification en fonction de la qualité de correspondance, de la récence de la source, et de l'alignement de spécificité
4. **Gérer l'absence de fichier de preuves** : si aucun fichier de preuves n'est fourni, ignorer l'étape de vérification. Présenter à la place toutes les affirmations extraites avec leurs types et signaler chacune comme « non vérifiée — aucune preuve fournie ». Guider l'utilisateur sur la création d'un fichier de preuves :
   - Expliquer le format JSON avec des exemples pour chaque type d'affirmation
   - Suggérer des sources de données : GA4 pour les indicateurs de performance, le CRM pour le nombre de clients, les organismes de certification pour les récompenses, les rapports publiés pour les statistiques sectorielles
   - Proposer de générer un modèle de fichier de preuves pré-rempli avec les affirmations extraites (valeurs laissées vides pour que l'utilisateur les remplisse)
5. **Détailler les contradictions** : pour chaque affirmation contredite, présenter une comparaison côte à côte : le texte de l'affirmation tel qu'écrit dans le contenu, les données de preuve en conflit, l'écart précis (par ex. « le contenu dit augmentation de 73 %, la preuve montre une augmentation de 61 % »), et l'impact potentiel de la publication de l'affirmation incorrecte (réputationnel, réglementaire, concurrentiel).
6. **Recommander des corrections** : pour les affirmations non vérifiées et contredites, fournir des recommandations précises :
   - **Affirmations contredites** : suggérer un texte corrigé utilisant la valeur de preuve, avec des options de langage nuancé si les chiffres exacts sont sensibles (« approximativement », « plus de X », « près de Y »)
   - **Affirmations non vérifiées** : suggérer d'ajouter une attribution de source, d'adoucir les déclarations absolues en déclarations nuancées, ou de retirer l'affirmation jusqu'à ce qu'une preuve soit disponible
   - **Preuve obsolète** : signaler les affirmations dont la date de preuve a plus de 12 mois et recommander de rafraîchir les données
7. **Générer un résumé de vérification** : produire un score de vérification global (pourcentage d'affirmations vérifiées ou partiellement vérifiées), une évaluation des risques basée sur le nombre et la sévérité des affirmations contredites et non vérifiées, et une note de conformité si la marque opère dans un secteur réglementé où les affirmations non étayées comportent un risque légal.

## Sortie

Un rapport de vérification structuré contenant :

- **Score de vérification** : pourcentage d'affirmations vérifiées ou partiellement vérifiées — la métrique phare de l'intégrité des affirmations du contenu
- **Inventaire des affirmations** : total des affirmations extraites, réparties par type (statistique, classement, récompense, citation, performance, temporelle) — montrant l'étendue des assertions factuelles dans le contenu
- **Résultats de vérification par affirmation** : pour chaque affirmation :
  - Le texte de l'affirmation tel qu'il apparaît dans le contenu, avec son emplacement
  - La classification du type d'affirmation
  - Le statut de vérification : Vérifiée, Partiellement vérifiée, Non vérifiée, ou Contredite
  - La correspondance de preuve : l'entrée de preuve spécifique par rapport à laquelle elle a été vérifiée (le cas échéant), avec source et date
  - Le score de confiance (0-100) pour la vérification
  - Les détails du problème : pour les affirmations partiellement vérifiées ou contredites, l'écart précis
  - L'action recommandée : conserver tel quel, mettre à jour avec la valeur correcte, ajouter une attribution de source, adoucir le langage, ou retirer
- **Détails des contradictions** : comparaison côte à côte pour chaque affirmation contredite — texte du contenu vs données de preuve, avec l'écart précis mis en évidence et une suggestion de texte corrigé
- **Liste des affirmations non vérifiées** : toutes les affirmations sans preuve correspondante, regroupées par niveau de risque (risque élevé : chiffres précis et déclarations absolues ; risque modéré : affirmations comparatives et classements ; risque faible : assertions qualitatives générales)
- **Avertissements de preuve obsolète** : affirmations dont la preuve à l'appui a plus de 12 mois, avec une recommandation de rafraîchir les données
- **Suggestions de texte corrigé** : pour chaque affirmation nécessitant une correction, le texte original et une ou plusieurs options de remplacement — une version à valeur exacte utilisant les données de preuve et une version nuancée avec un langage qualificatif
- **Modèle de fichier de preuves** : si aucun fichier de preuves n'a été fourni, un modèle JSON pré-rempli avec toutes les affirmations extraites prêt pour que l'utilisateur y renseigne les valeurs et sources vérifiées
- **Notes de conformité** : si la marque opère dans un secteur réglementé (services financiers, santé, juridique, assurance), les exigences réglementaires précises pour l'étayage des affirmations avec des références aux règles pertinentes (FTC Act, directive européenne relative aux droits des consommateurs, code CAP de l'ASA, réglementations sectorielles spécifiques)

## Agents utilisés

- **quality-assurance** — extraction des affirmations du contenu par correspondance de motifs et heuristiques NLP, mise en correspondance affirmation-preuve par similarité sémantique et alignement de type, classification du statut de vérification avec notation de confiance, détection de contradiction avec quantification des écarts, génération de texte de correction avec options de nuance, et évaluation des risques tenant compte de la conformité pour les secteurs réglementés
</content>

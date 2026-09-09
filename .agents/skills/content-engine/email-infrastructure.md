# Infrastructure e-mail — Authentification et délivrabilité

## SPF (Sender Policy Framework)

### Ce que ça fait
Spécifie quels serveurs de messagerie sont autorisés à envoyer des e-mails au nom de votre domaine.

### Configuration
1. Identifier tous les services qui envoient des e-mails depuis votre domaine (ESP, CRM, e-mail transactionnel, support)
2. Créer un enregistrement TXT sur votre domaine :
```
v=spf1 include:_spf.google.com include:sendgrid.net include:amazonses.com ~all
```
3. **Limites importantes** : Maximum 10 recherches DNS. Chaque `include:` compte comme une recherche.
4. Utiliser `~all` (softfail) pendant les tests, passer à `-all` (hardfail) une fois confirmé.

---

## DKIM (DomainKeys Identified Mail)

### Ce que ça fait
Ajoute une signature numérique aux e-mails sortants prouvant que le message n'a pas été altéré.

### Configuration
1. Générer une paire de clés DKIM dans votre ESP (publique + privée)
2. Ajouter la clé publique comme enregistrement TXT :
```
selector._domainkey.yourdomain.com TXT "v=DKIM1; k=rsa; p=[public key]"
```
3. L'ESP signe les e-mails sortants avec la clé privée
4. Les serveurs récepteurs vérifient à l'aide de la clé publique dans le DNS
5. Utiliser des clés 2048 bits (1024 bits est le minimum, 2048 recommandé)

---

## DMARC (Domain-based Message Authentication)

### Ce que ça fait
Indique aux serveurs récepteurs quoi faire lorsque SPF ou DKIM échouent, et vous envoie des rapports.

### Configuration (progressive)

**Phase 1 : Surveillance** (commencer ici)
```
_dmarc.yourdomain.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100"
```

**Phase 2 : Quarantaine** (après avoir revu les rapports pendant 2-4 semaines)
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=25
```
Augmenter progressivement `pct` de 25 → 50 → 100.

**Phase 3 : Rejet** (une fois confiant que tous les expéditeurs légitimes sont authentifiés)
```
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com
```

---

## BIMI (Brand Indicators for Message Identification)

### Exigences
1. La politique DMARC doit être à `p=quarantine` ou `p=reject`
2. Fichier logo SVG respectant les spécifications BIMI
3. VMC (Verified Mark Certificate) de DigiCert ou Entrust (~1 500 $/an)
4. Enregistrement DNS :
```
default._bimi.yourdomain.com TXT "v=BIMI1; l=https://yourdomain.com/logo.svg; a=https://yourdomain.com/cert.pem"
```

### Bénéfices
- Le logo de marque s'affiche à côté des e-mails dans les clients pris en charge (Gmail, Yahoo)
- Augmente les taux d'ouverture de 10-30 % (reconnaissance de marque dans la boîte de réception)

---

## Plan de montée en charge de domaine

Pour les nouveaux domaines ou IP d'envoi :

| Jour | Volume quotidien | Notes |
|-----|-------------|-------|
| 1-3 | 50-100 | Envoyer uniquement aux abonnés les plus engagés |
| 4-7 | 200-500 | Étendre aux récemment engagés |
| 8-14 | 500-2 000 | Ajouter progressivement des segments |
| 15-21 | 2 000-5 000 | Continuer l'expansion |
| 22-30 | 5 000-10 000 | Approche du volume normal |
| 31-45 | 10 000-50 000 | Montée vers le volume complet |
| 46+ | Volume complet | Envoi normal |

### Règles de montée en charge
- Envoyer d'abord aux utilisateurs engagés (ouverture dans les 30 derniers jours)
- Surveiller le taux de rebond (<2 %), les plaintes spam (<0,1 %), et le placement en boîte de réception
- Si le taux de rebond grimpe ou la délivrabilité chute, réduire le volume et enquêter
- Ne pas sauter de jours — la constance compte
- Éviter le contenu promotionnel pendant la montée en charge — envoyer du contenu axé valeur d'abord

---

## Meilleures pratiques de délivrabilité

### Hygiène de liste
- Supprimer immédiatement les hard bounces (ne jamais réessayer)
- Suspendre les soft bounces après 3 échecs consécutifs
- Supprimer les abonnés non engagés après 6-12 mois sans ouvertures/clics
- Exécuter une vérification e-mail sur les listes anciennes/importées avant l'envoi
- Nettoyer la liste trimestriellement

### Pratiques d'envoi
- Maintenir un calendrier d'envoi cohérent (les FAI attendent des schémas prévisibles)
- Garder le taux de plaintes spam en dessous de 0,1 % (Google exige <0,3 %)
- Inclure un lien de désabonnement clair dans chaque e-mail
- Honorer les désabonnements dans les 24 heures (requis) — viser l'instantané
- Segmenter et personnaliser (meilleur engagement = meilleure délivrabilité)

### Pratiques de contenu
- Ratio texte/image équilibré (pas d'e-mails uniquement composés d'images)
- Éviter les mots déclencheurs de spam dans les objets et le corps
- Inclure une adresse postale physique (exigence CAN-SPAM)
- Utiliser un nom « De » reconnaissable
- Le texte de préheader doit être intentionnel (pas « Voir dans le navigateur »)

---

## Débogage des problèmes de délivrabilité

| Symptôme | Cause probable | Investigation |
|---------|-------------|--------------|
| Les e-mails vont en spam | Échec d'authentification, mauvaise réputation | Vérifier SPF/DKIM/DMARC, revoir le contenu |
| Baisse soudaine des taux d'ouverture | Placement en boîte de réception dégradé | Vérifier Google Postmaster Tools, test seed |
| Taux de rebond élevé | Liste obsolète, mauvaises données | Exécuter une vérification, vérifier la source d'acquisition |
| Liste noire | Plaintes spam ayant dépassé le seuil | Vérifier les bases de données de liste noire, soumettre une demande de retrait |
| Onglet Gmail Promotions | Signaux de contenu | Réduire les images, simplifier le formatage |

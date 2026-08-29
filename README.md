# Talentis Connect

Plateforme de gestion du processus de recrutement pour Talentis Consult (cabinet de recrutement, Casablanca) — Next.js (App Router) + TypeScript + PostgreSQL (Prisma) + NextAuth.

Trois espaces : **Client** (entreprise), **Cabinet** (équipe interne), **Candidat**, plus un job board public.

📄 **Documentation complète** (fonctionnelle, technique, architecture) : voir [`docs/`](./docs).

## Démarrage local

```bash
npm install
npm run db:migrate   # applique les migrations Prisma sur DATABASE_URL
npm run db:seed      # crée le compte admin cabinet + des offres de démo
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env` et renseigner :

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connexion PostgreSQL (Prisma) |
| `AUTH_SECRET` | Secret NextAuth — générer avec `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL publique de l'app (`http://localhost:3000` en local) |

### Connexion sociale (Google / LinkedIn)

Optionnelle — les boutons "Continuer avec Google/LinkedIn" n'apparaissent que si les variables correspondantes sont définies. Réservée aux comptes **Candidat** (le recruteur et le cabinet restent en email/mot de passe).

**Google** :
1. [Google Cloud Console](https://console.cloud.google.com/) → créer un projet
2. "APIs & Services" → "OAuth consent screen" → configurer (type External, infos de base)
3. "Credentials" → "Create Credentials" → "OAuth client ID" → type "Web application"
4. Ajouter comme "Authorized redirect URI" : `<NEXTAUTH_URL>/api/auth/callback/google`
5. Copier le Client ID et Client Secret dans `.env` :
   ```
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

**LinkedIn** :
1. [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps) → créer une app
2. Onglet "Products" → activer "Sign In with LinkedIn using OpenID Connect"
3. Onglet "Auth" → ajouter comme "Authorized redirect URL" : `<NEXTAUTH_URL>/api/auth/callback/linkedin`
4. Copier le Client ID et Client Secret dans `.env` :
   ```
   LINKEDIN_CLIENT_ID="..."
   LINKEDIN_CLIENT_SECRET="..."
   ```

Après avoir ajouté ces variables, redémarrer le serveur pour qu'elles soient prises en compte.

### E-mails transactionnels (Resend)

Optionnel — sans `RESEND_API_KEY`, les e-mails (notifications, vérification de compte, mot de passe oublié) sont simplement affichés dans les logs du serveur au lieu d'être envoyés, ce qui permet de développer sans compte Resend.

1. Créer un compte sur [resend.com](https://resend.com) (offre gratuite suffisante pour démarrer)
2. "API Keys" → créer une clé, la copier dans `.env` :
   ```
   RESEND_API_KEY="re_..."
   ```
3. Par défaut les e-mails partent de `onboarding@resend.dev` (domaine de test Resend, aucune configuration DNS requise). Pour envoyer depuis un domaine propre (ex. `noreply@talentisconsult.com`), le vérifier dans Resend ("Domains") puis définir :
   ```
   EMAIL_FROM="Talentis Connect <noreply@talentisconsult.com>"
   ```

## Déploiement (Vercel + Neon/Supabase)

1. Créer une base PostgreSQL sur [neon.tech](https://neon.tech) ou [supabase.com](https://supabase.com), copier l'URL de connexion
2. Sur [vercel.com](https://vercel.com), importer le dépôt GitHub
3. Renseigner les variables d'environnement ci-dessus dans les réglages du projet Vercel
4. Le script `npm run vercel-build` (déjà configuré) applique les migrations Prisma puis build l'app automatiquement au déploiement

## Comptes de démo (après `npm run db:seed`)

| Rôle | Email | Mot de passe |
|---|---|---|
| Cabinet (admin) | `admin@talentisconsult.com` | `TalentisAdmin2026!` |

Les comptes Client et Candidat s'inscrivent librement depuis `/register`.

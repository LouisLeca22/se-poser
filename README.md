# 🛖 Se Poser

**Se Poser** est une application web de réservation d’hébergements insolites en ligne. Que vous cherchiez une cabane perchée, une bulle en pleine nature ou une tiny house au bord de l’eau, **Se Poser** vous aide à trouver le lieu parfait pour vous évader.

---

## ✨ Fonctionnalités

- 🔐 **Authentification sécurisée** via e-mail, Google et GitHub (Clerk)
- 🏡 **CRUD complet** pour les hébergements (ajout, modification, suppression, visualisation)
- 🔍 **Recherche avancée** par :
  - Nom
  - Ville
  - Catégorie (ex. cabane, bulle, chalet...)
- ❤️ **Liste de favoris** pour enregistrer les hébergements préférés
- 📝 **Avis utilisateurs** avec note sur 5 étoiles
- 📅 **Système de réservation** pour choisir ses dates de séjour
- 💳 **Paiement de test** intégré avec Stripe

---

## 🛠️ Stack technique

| Technologie | Rôle |
|------------|------|
| [Next.js](https://nextjs.org/) | Framework React full-stack |
| [shadcn/ui](https://ui.shadcn.com/) | Composants UI modernes et accessibles |
| [Clerk](https://clerk.dev/) | Authentification et gestion des utilisateurs |
| [Prisma](https://www.prisma.io/) | ORM pour la base de données |
| [Supabase](https://supabase.com/) | Backend as a Service (base de données, stockage, API) |
| [Stripe](https://stripe.com/) | Paiement en ligne (mode test) |

---

## 🚀 Lancer le projet en local

### 1. Cloner le repo

```bash
git clone https://github.com/LouisLeca22/se-poser.git
cd se-poser
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier `.env.local` à la racine :

```env
DATABASE_URL=...
DIRECT_URL=...
SUPABASE_URL=...
SUPABASE_KEY=...
ADMIN_USER_ID=...
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=...
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=...
NEXT_PUBLIC_WEBSITE_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...

```

### 4. Lancer le serveur de développement

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🧪 Tests de paiement

Stripe fonctionne en **mode test**. Vous pouvez utiliser la carte suivante pour tester les paiements :

```text
Numéro : 4242 4242 4242 4242
Date d'expiration : n'importe quelle date future
CVC : 123
```

---

## 📄 Licence

Ce projet est sous licence MIT.  
© Louis Leca – 2025

---

## 🙌 Remerciements

Merci aux outils open-source qui rendent ce projet possible ❤️

# TP 4. Sécuriser son API Web

## Objectif du TP

L’objectif de ce TP4  est d’implémenter un système d’authentification pour gérer les accès à notre API REST développée dans les précédents TP. Cette authentification devra également intégrer une **gestion des rôles** (ex. : utilisateur standard, administrateur), permettant un contrôle d’accès différencié sur certaines routes.

Ce TP est à rendre au plus tard le **12 juin 2025 (AnyTime On Earth)** et sera comptabilisé à **25%** de la note finale du module.

## **Rendu**

Vous devez nous indiquer le lien vers votre repo. github comprenant l’implémentation du travail demandé (le lien d’une table tomuss vous sera communiqué dès que possible).

---

## Travail demandé

Dans la suite, une description du travail demandé est présentée. Pour vous aider, une description brève et probalement *incomplète* des différents aspects et étapes à suivre pour répondre aux besoins du travail demandé.

Dans ce TP, plusieurs éléments doivent être mis en place (en plus de ceux mis en place dans les TP précédents):

- Créer deux nouvelles routes:
  - `POST /signup` pour l’inscription d’un nouvel utilisateur
  - `POST /login` pour l’authentification
- Protéger les mots de passe des utilisateurs avec la bibliothèque `bcrypt` (hachage).
- Sauvegarder dans la base de données MongoDB les comptes des utilisateurs, y compris leur **rôle**.
- Vérifier et générer des jetons JWT (JSON Web Token) au moment de la connexion de l’utilisateur, en y intégrant son rôle, et les utiliser pour vérifier l’identité et les privilèges des utilisateurs lors des appels à l’API.
- Créer un **middleware** pour contrôler l’accès à certaines routes selon le rôle de l’utilisateur (ex. : seuls les administrateurs peuvent supprimer un tour).

---

## Etapes à suivre

### 1. **Modélisation de l’utilisateur**

- Créer le schéma `userSchema`. Un utilisateur possède un nom, un email et un mot de passe requis (champs obligatoires). L’email permettra aux utilisateurs de s’authentifier. Un mot de passe doit comprendre au moins 8 caractères.
- Ajouter un champ `role` de type `String`, avec une valeur par défaut `"user"` et des valeurs autorisées comme `"user"`et `"admin"`  et `"moderator"` .
- Créer votre modèle `User` en utilisant le schéma `userSchema`.

```jsx
const User = mongoose.model('User', userSchema);
```

- Utiliser MongoDB pour la persistance des données utilisateurs.

### 2. Inscription d’un nouvel utilisateur

- Permettre à un utilisateur de s’inscrire en fournissant les informations requises.
- Dans `auth.controller.js`, créer une fonction `signup` qui :
  - Hashe le mot de passe avec `bcrypt`
  - Enregistre l'utilisateur avec son rôle dans MongoDB
  - Retourne un message de succès ou une erreur
- Par défaut, les utilisateurs ont le rôle `user`.
- **Restreindre la création d’administrateurs à un administrateur déjà authentifié.**
- Mettre à jour `userRouter.js` pour gérer la route `/signup`

### 3. Méthodes CRUD pour la gestion des utilisateurs

Implémenter les méthodes CRUD pour la gestion des utilisateurs par un administrateur

### 4. Authentification de l’utilisateur

- Implémenter une fonction `login` dans `auth.controller.js` :
  - Vérifie si l’utilisateur existe via son email
  - Compare le mot de passe saisi avec celui en base
  - Génère un jeton JWT valide 24h, contenant `userId` et `role`
  - Retourne `userId`, `role` et `token`

### **5. Sécurisation des routes**

- Créer un middleware `verifyToken` qui valide le JWT reçu dans les en-têtes.
- Ajouter un middleware `checkRole(role)` pour restreindre certaines routes à des rôles spécifiques (ex. : `admin`).
- Protéger les routes critiques (création, suppression de tours, gestion utilisateurs) avec ces deux middlewares.

# 👥 Gestion des Utilisateurs — CRUD

Application web complète de gestion des utilisateurs avec **Express.js** (back-end) et **React.js** (front-end).

---

## 📁 Structure du projet

```
user-manager/
├── backend/
│   ├── server.js          ← Serveur Express.js avec les routes CRUD
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.jsx            ← Composant principal (logique CRUD + useEffect)
    │   ├── App.css            ← Styles globaux
    │   ├── index.js           ← Point d'entrée React
    │   ├── components/
    │   │   ├── UserCard.jsx   ← Carte d'affichage d'un utilisateur
    │   │   ├── UserForm.jsx   ← Formulaire création/modification
    │   │   ├── ConfirmModal.jsx ← Modal de confirmation suppression
    │   │   └── Toast.jsx      ← Notifications
    │   └── services/
    │       └── api.js         ← Fonctions d'appels HTTP vers le back-end
    └── package.json
```

---

## 🚀 Installation et démarrage

### 1. Démarrer le back-end

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur **http://localhost:5000**

### 2. Démarrer le front-end

```bash
cd frontend
npm install
npm start
```

L'application s'ouvre sur **http://localhost:3000**

---

## 🔌 Routes API (back-end)

| Méthode | Route          | Description                    |
|---------|----------------|--------------------------------|
| GET     | /users         | Récupérer tous les utilisateurs |
| GET     | /users/:id     | Récupérer un utilisateur par ID |
| POST    | /users         | Créer un nouvel utilisateur     |
| PUT     | /users/:id     | Modifier un utilisateur         |
| DELETE  | /users/:id     | Supprimer un utilisateur        |

---

## 🧩 Concepts React utilisés

- **useState** — Gestion de l'état local (liste, formulaire, modals)
- **useEffect** — Chargement des données au montage du composant
- **useCallback** — Optimisation des fonctions (notification toast)
- **Props** — Communication entre composants parents/enfants
- **Lifting state up** — État centralisé dans App.jsx
- **Conditional rendering** — Affichage conditionnel des modals

---

## ✨ Fonctionnalités

- ✅ **Lister** tous les utilisateurs
- ✅ **Créer** un utilisateur avec validation du formulaire
- ✅ **Modifier** un utilisateur existant
- ✅ **Supprimer** un utilisateur avec confirmation
- ✅ **Recherche** par nom, prénom ou email
- ✅ **Filtrer** par rôle (Admin, Modérateur, Utilisateur)
- ✅ **Statistiques** en temps réel
- ✅ **Notifications** toast (succès/erreur)
- ✅ **Responsive** mobile/desktop

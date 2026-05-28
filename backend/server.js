const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ─── Middlewares ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Données en mémoire (simule une base de données) ────────────────────────
let users = [
  { id: 1, nom: "Alaoui", prenom: "Mohammed", email: "m.alaoui@email.com", role: "Admin" },
  { id: 2, nom: "Benali", prenom: "Fatima", email: "f.benali@email.com", role: "Utilisateur" },
  { id: 3, nom: "Cherkaoui", prenom: "Youssef", email: "y.cherkaoui@email.com", role: "Utilisateur" },
  { id: 4, nom: "Idrissi", prenom: "Aicha", email: "a.idrissi@email.com", role: "Modérateur" },
];

let nextId = 5;

// ─── Routes CRUD ─────────────────────────────────────────────────────────────

// GET /users — Récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  res.json(users);
});

// GET /users/:id — Récupérer un utilisateur par ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

// POST /users — Créer un nouvel utilisateur
app.post("/users", (req, res) => {
  const { nom, prenom, email, role } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ message: "Les champs nom, prénom et email sont obligatoires" });
  }

  const emailExists = users.find((u) => u.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
  }

  const newUser = {
    id: nextId++,
    nom,
    prenom,
    email,
    role: role || "Utilisateur",
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id — Modifier un utilisateur
app.put("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const { nom, prenom, email, role } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ message: "Les champs nom, prénom et email sont obligatoires" });
  }

  const emailExists = users.find(
    (u) => u.email === email && u.id !== parseInt(req.params.id)
  );
  if (emailExists) {
    return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
  }

  users[index] = { ...users[index], nom, prenom, email, role: role || "Utilisateur" };
  res.json(users[index]);
});

// DELETE /users/:id — Supprimer un utilisateur
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const deleted = users.splice(index, 1)[0];
  res.json({ message: "Utilisateur supprimé avec succès", user: deleted });
});

// ─── Démarrage du serveur ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📋 Routes disponibles :`);
  console.log(`   GET    http://localhost:${PORT}/users`);
  console.log(`   GET    http://localhost:${PORT}/users/:id`);
  console.log(`   POST   http://localhost:${PORT}/users`);
  console.log(`   PUT    http://localhost:${PORT}/users/:id`);
  console.log(`   DELETE http://localhost:${PORT}/users/:id`);
});

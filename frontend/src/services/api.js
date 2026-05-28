// ─── Service API ──────────────────────────────────────────────────────────────
// Ce fichier centralise tous les appels HTTP vers le back-end Express.js

const API_URL = "http://localhost:5000";

// Récupérer tous les utilisateurs
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
  return response.json();
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error("Utilisateur non trouvé");
  return response.json();
};

// Créer un nouvel utilisateur
export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur lors de la création");
  return data;
};

// Modifier un utilisateur
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur lors de la modification");
  return data;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur lors de la suppression");
  return data;
};

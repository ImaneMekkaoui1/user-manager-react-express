import { useState, useEffect, useCallback } from "react";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";
import "./App.css";

function App() {
  // ─── États ──────────────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);           // Liste des utilisateurs
  const [loading, setLoading] = useState(true);     // Chargement initial
  const [actionLoading, setActionLoading] = useState(false); // Chargement action

  const [showForm, setShowForm] = useState(false);  // Afficher le formulaire
  const [userToEdit, setUserToEdit] = useState(null); // Utilisateur à modifier
  const [userToDelete, setUserToDelete] = useState(null); // Utilisateur à supprimer

  const [search, setSearch] = useState("");         // Recherche
  const [filterRole, setFilterRole] = useState(""); // Filtre par rôle

  const [toast, setToast] = useState({ message: "", type: "success" });

  // ─── Chargement des utilisateurs (useEffect) ────────────────────────────────
  // useEffect s'exécute au montage du composant pour récupérer les données
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      showToast("Impossible de charger les utilisateurs. Le serveur est-il démarré ?", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Afficher une notification ───────────────────────────────────────────────
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  // ─── Créer ou modifier un utilisateur ───────────────────────────────────────
  const handleSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (userToEdit) {
        // Modification
        const updated = await updateUser(userToEdit.id, formData);
        setUsers((prev) =>
          prev.map((u) => (u.id === updated.id ? updated : u))
        );
        showToast(`${updated.prenom} ${updated.nom} a été modifié avec succès.`);
      } else {
        // Création
        const newUser = await createUser(formData);
        setUsers((prev) => [...prev, newUser]);
        showToast(`${newUser.prenom} ${newUser.nom} a été créé avec succès.`);
      }
      closeForm();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Supprimer un utilisateur ────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!userToDelete) return;
    setActionLoading(true);
    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showToast(`${userToDelete.prenom} ${userToDelete.nom} a été supprimé.`);
      setUserToDelete(null);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Ouvrir le formulaire en mode modification ───────────────────────────────
  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  // ─── Fermer le formulaire ────────────────────────────────────────────────────
  const closeForm = () => {
    setShowForm(false);
    setUserToEdit(null);
  };

  // ─── Filtrage et recherche ───────────────────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const searchLower = search.toLowerCase();
    const matchSearch =
      u.nom.toLowerCase().includes(searchLower) ||
      u.prenom.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower);
    const matchRole = filterRole ? u.role === filterRole : true;
    return matchSearch && matchRole;
  });

  // ─── Statistiques ────────────────────────────────────────────────────────────
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "Admin").length,
    moderateurs: users.filter((u) => u.role === "Modérateur").length,
    utilisateurs: users.filter((u) => u.role === "Utilisateur").length,
  };

  // ─── Rendu ───────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* En-tête */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>👥 Gestion des Utilisateurs</h1>
            <p>Application CRUD — Express.js + React.js</p>
          </div>
          <button
            className="btn btn-primary btn-add"
            onClick={() => setShowForm(true)}
          >
            ＋ Ajouter un utilisateur
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Statistiques */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-admin">
            <span className="stat-number">{stats.admins}</span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat-card stat-mod">
            <span className="stat-number">{stats.moderateurs}</span>
            <span className="stat-label">Modérateurs</span>
          </div>
          <div className="stat-card stat-user">
            <span className="stat-number">{stats.utilisateurs}</span>
            <span className="stat-label">Utilisateurs</span>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          <select
            className="filter-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Tous les rôles</option>
            <option value="Admin">Admin</option>
            <option value="Modérateur">Modérateur</option>
            <option value="Utilisateur">Utilisateur</option>
          </select>

          <button className="btn btn-refresh" onClick={fetchUsers} title="Actualiser">
            🔄 Actualiser
          </button>
        </div>

        {/* Résultats */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement des utilisateurs...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">🔍</p>
            <h3>Aucun utilisateur trouvé</h3>
            <p>
              {search || filterRole
                ? "Modifiez vos critères de recherche."
                : "Commencez par ajouter un utilisateur."}
            </p>
          </div>
        ) : (
          <>
            <p className="results-count">
              {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? "s" : ""} trouvé{filteredUsers.length > 1 ? "s" : ""}
            </p>
            <div className="users-grid">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={setUserToDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Formulaire création/modification */}
      {showForm && (
        <UserForm
          userToEdit={userToEdit}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          loading={actionLoading}
        />
      )}

      {/* Modal de confirmation suppression */}
      {userToDelete && (
        <ConfirmModal
          user={userToDelete}
          onConfirm={handleDelete}
          onCancel={() => setUserToDelete(null)}
          loading={actionLoading}
        />
      )}

      {/* Notification toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

export default App;

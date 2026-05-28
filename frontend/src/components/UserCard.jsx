// ─── Composant Carte Utilisateur ─────────────────────────────────────────────

// Retourne les initiales d'un utilisateur
const getInitials = (prenom, nom) => {
  return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
};

// Couleur de badge selon le rôle
const getRoleBadgeClass = (role) => {
  switch (role) {
    case "Admin": return "badge badge-admin";
    case "Modérateur": return "badge badge-mod";
    default: return "badge badge-user";
  }
};

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {getInitials(user.prenom, user.nom)}
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.prenom} {user.nom}</h3>
          <p className="user-email">📧 {user.email}</p>
        </div>
        <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
      </div>

      <div className="user-card-footer">
        <span className="user-id">ID: #{user.id}</span>
        <div className="user-actions">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(user)}
            title="Modifier"
          >
            ✏️ Modifier
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete(user)}
            title="Supprimer"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

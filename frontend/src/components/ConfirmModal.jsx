// ─── Composant Modal de Confirmation ─────────────────────────────────────────

function ConfirmModal({ user, onConfirm, onCancel, loading }) {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal modal-confirm">
        <div className="confirm-icon">⚠️</div>
        <h2>Confirmer la suppression</h2>
        <p>
          Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
          <strong>{user.prenom} {user.nom}</strong> ?
        </p>
        <p className="confirm-warning">Cette action est irréversible.</p>

        <div className="form-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "⏳ Suppression..." : "🗑️ Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

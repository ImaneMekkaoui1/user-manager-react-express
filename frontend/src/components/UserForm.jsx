import { useState, useEffect } from "react";

// ─── Composant Formulaire ─────────────────────────────────────────────────────
// Utilisé pour CRÉER ou MODIFIER un utilisateur

const ROLES = ["Utilisateur", "Modérateur", "Admin"];

function UserForm({ userToEdit, onSubmit, onCancel, loading }) {
  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "Utilisateur",
  });

  const [errors, setErrors] = useState({});

  // Si on est en mode "modifier", pré-remplir le formulaire
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nom: userToEdit.nom,
        prenom: userToEdit.prenom,
        email: userToEdit.email,
        role: userToEdit.role,
      });
    } else {
      setFormData({ nom: "", prenom: "", email: "", role: "Utilisateur" });
    }
    setErrors({});
  }, [userToEdit]);

  // Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est obligatoire";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    return newErrors;
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{userToEdit ? "✏️ Modifier l'utilisateur" : "➕ Nouvel utilisateur"}</h2>
          <button className="btn-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Entrez le prénom"
                className={errors.prenom ? "input-error" : ""}
              />
              {errors.prenom && <span className="error-msg">{errors.prenom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Entrez le nom"
                className={errors.nom ? "input-error" : ""}
              />
              {errors.nom && <span className="error-msg">{errors.nom}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "⏳ En cours..." : userToEdit ? "💾 Enregistrer" : "✅ Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;

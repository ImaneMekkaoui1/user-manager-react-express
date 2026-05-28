import { useEffect } from "react";

// ─── Composant Notification Toast ────────────────────────────────────────────

function Toast({ message, type, onClose }) {
  // Se ferme automatiquement après 3 secondes
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span>
        {type === "success" ? "✅" : "❌"} {message}
      </span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}

export default Toast;

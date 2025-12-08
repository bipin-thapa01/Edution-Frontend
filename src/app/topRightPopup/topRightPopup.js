// TopRightPopupNoDeps.jsx
import React, { useEffect, useState } from "react";
import "./topRightPopup.css";

export default function TopRightPopupNoDeps({
  message = "This is a popup message",
  duration = 10000,
  show = true,
  onClose,
}) {
  const [visible, setVisible] = useState(!!show && !!message);
  useEffect(() => setVisible(!!show && !!message), [show, message]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="trp-container" role="status" aria-live="polite">
      <div className="trp-toast" style={{ animationDuration: "350ms" }}>
        <div className="trp-icon" aria-hidden>
          i
        </div>

        <div className="trp-body">
          <div className="trp-title">Notification</div>
          <div className="trp-message">{message}</div>
        </div>

        <div className="trp-controls">
          <button
            aria-label="Dismiss notification"
            className="trp-close"
            onClick={() => {
              setVisible(false);
              if (onClose) onClose();
            }}
          >
            ×
          </button>

          <div
            className="trp-progress"
            style={{ animationDuration: `${duration}ms` }}
            aria-hidden
          >
            <div className="trp-progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}

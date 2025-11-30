import React, { useEffect } from "react";
import "./toast.css";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={`toast ${show ? "toast-show" : ""}`}>
      {message}
    </div>
  );
}

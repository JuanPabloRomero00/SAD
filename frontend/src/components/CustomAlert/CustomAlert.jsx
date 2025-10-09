import React from "react";

function CustomAlert({ message, type = "info" }) {
  // Si no hay mensaje, no mostrar nada
  if (!message) return null;

  const getAlertStyles = () => {
    const baseStyles = {
      padding: "12px 16px",
      borderRadius: "4px",
      marginBottom: "16px",
      fontWeight: "500",
      textAlign: "center",
      position: "absolute",
      bottom: "100px",
      left: "0",
      right: "0",
      margin: "0 auto",
      maxWidth: "300px",
    };

    switch (type) {
      case "success":
        return {
          ...baseStyles,
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: "#f7a4aaff",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        };
      case "warning":
        return {
          ...baseStyles,
          backgroundColor: "#fff3cd",
          color: "#856404",
          border: "1px solid #ffeeba",
        };
      default: // info
        return {
          ...baseStyles,
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          border: "1px solid #bee5eb",
        };
    }
  };

  return <div style={getAlertStyles()}>{message}</div>;
}

export default CustomAlert;

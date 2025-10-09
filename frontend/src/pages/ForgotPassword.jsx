import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import CustomAlert from "../components/CustomAlert/CustomAlert";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    securityAnswer: "",
  });
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [userId, setUserId] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      showAlert("Por favor, ingresa tu email", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.getSecurityQuestion(formData.email);
      setSecurityQuestion(response.securityQuestion);
      setUserId(response.userId);
      setStep(2);
    } catch (error) {
      showAlert(error.message || "Email no encontrado", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();

    if (!formData.securityAnswer) {
      showAlert("Por favor, responde la pregunta de seguridad", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifySecurityQuestion(
        formData.email,
        formData.securityAnswer,
      );

      navigate("/reset-password", {
        state: {
          userId: response.userId,
          email: formData.email,
        },
      });
    } catch (error) {
      showAlert(error.message || "Respuesta incorrecta", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="formTitle">
        {step === 1 ? "Recuperar Contraseña" : "Pregunta de Seguridad"}
      </h2>
      <h3 className="subTitle">
        {step === 1
          ? "Ingresa tu email para continuar."
          : "Responde la pregunta de seguridad."}
      </h3>

      <div className="formContainer">
        {alert.show && (
          <CustomAlert message={alert.message} type={alert.type} />
        )}

        <div className="loginData">
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="loginGroup">
                <label className="loginLabel">
                  <strong>Email</strong>
                </label>
                <input
                  className="loginInput"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Ingresa tu email"
                  disabled={loading}
                />
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  type="submit"
                  className="logeoButton"
                  disabled={loading}
                >
                  {loading ? "Verificando..." : "Continuar"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSecuritySubmit}>
              <div className="loginGroup">
                <label className="loginLabel">
                  <strong>Email</strong>
                </label>
                <p className="loginText">{formData.email}</p>
              </div>

              <div className="loginGroup">
                <label className="loginLabel">
                  <strong>{securityQuestion}</strong>
                </label>
                <input
                  className="loginInput"
                  type="text"
                  value={formData.securityAnswer}
                  onChange={(e) =>
                    setFormData({ ...formData, securityAnswer: e.target.value })
                  }
                  placeholder="Tu respuesta"
                  disabled={loading}
                />
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  type="submit"
                  className="logeoButton"
                  disabled={loading}
                >
                  {loading ? "Verificando..." : "Verificar"}
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Cambiar email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <p className="formReturn">
        ¿Recordaste tu contraseña?{" "}
        <Link to="/login" className="toLogin">
          Ingresa acá.
        </Link>
      </p>
    </>
  );
};

export default ForgotPassword;

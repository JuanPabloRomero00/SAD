import React, { useState, useEffect } from "react";
import './Login.css';
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { useAuth } from "../context/useAuth";

function Login() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const { login } = useAuth();


  useEffect(() => {
    // Al cargar, revisa si hay bloqueo
    const blockedUntil = localStorage.getItem("loginBlockedUntil");
    if (blockedUntil) {
      const now = Date.now();
      if (now < Number(blockedUntil)) {
        setIsBlocked(true);
        setRemaining(Math.ceil((Number(blockedUntil) - now) / 1000));
      } else {
        localStorage.removeItem("loginBlockedUntil");
        localStorage.removeItem("loginAttempts");
      }
    }
  }, []);

  useEffect(() => {
    if (!isBlocked) return;
    if (remaining <= 0) {
      setIsBlocked(false);
      setRemaining(0);
      localStorage.removeItem("loginBlockedUntil");
      localStorage.removeItem("loginAttempts");
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isBlocked, remaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isBlocked) {
      setError("Demasiados intentos fallidos. Intenta nuevamente en unos minutos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni, password }),
      });

      if (!response.ok) {
        // Manejo de intentos fallidos
        let attempts = Number(localStorage.getItem("loginAttempts")) || 0;
        attempts += 1;
        localStorage.setItem("loginAttempts", attempts);
        if (attempts >= 3) {
          const blockTime = Date.now() + 1 * 60 * 1000; // 10 minutos
          localStorage.setItem("loginBlockedUntil", blockTime);
          setIsBlocked(true);
          setRemaining(10 * 60);
          setError("Demasiados intentos fallidos. Intenta nuevamente en 10 minutos.");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en el login");
      }

      // Si login exitoso, limpia los intentos
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("loginBlockedUntil");

      const data = await response.json();

      // Guardar usuario en el contexto
      login(data.user);
      setShowSuccessAlert(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <h2 className='formTitle'>Ingresa al Club</h2>
    <h3 className='subTitle'>Usa tu DNI y contraseña para entrar al panel de socio.</h3>

      <form className='formContainer' onSubmit={handleSubmit}>
        <div className='loginData'>
          <div className='loginGroup'>
            <label className='loginLabel'>
              <strong>DNI</strong>
            </label>
            <input
              className='loginInput'
              type='number'
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <p className='loginText'>
              Ingresa solo números, sin puntos ni guiones
            </p>
          </div>
          <div className='loginGroup'>
            <label className='loginLabel'>
              <strong>Contraseña</strong>
            </label>
            <input
              className='loginInput'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className='logeoButton' type='submit' disabled={isBlocked}>
              {isBlocked ? `Bloqueado (${remaining}s)` : 'Ingresar'}
            </button>
          </div>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className='formReturn'>
        ¿No tenés cuenta? <a href="/register">Asociate al Club</a> y crea tu
        Usuario.
      </p>

      {showSuccessAlert && (<CustomAlert message="¡Login exitoso!" redirectTo="/activities" />)}
    </>
  );
}

export default Login;
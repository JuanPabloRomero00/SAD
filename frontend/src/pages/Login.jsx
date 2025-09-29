import React, { useState } from "react";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { useAuth } from "../context/useAuth";

function Login() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en el login");
      }

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
            <button className='logeoButton' type='submit'>
              Ingresar
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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert/CustomAlert';

function Login() {
  const [formData, setFormData] = useState({
    dni: '',
    password: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.dni || !formData.password) {
      showAlert('Por favor, completa todos los campos', 'error');
      return;
    }

    setLoading(true);
    try {
      // Simulamos el login por ahora
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular carga
      
      showAlert('¡Bienvenido! Iniciando sesión...', 'success');
      
      // Redirigir después de 1 segundo
      setTimeout(() => {
        navigate('/'); // Redirigir a la página principal o dashboard
      }, 1000);
      
    } catch (error) {
      showAlert(error.message || 'Error al iniciar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Nueva página para el primer paso
  };

  return (
    <>
      <h2 className='formTitle'>Ingresa al Club</h2>
      <h3 className='subTitle'>Usa tu DNI y contraseña para entrar al panel de socio.</h3>

      <div className='formContainer'>
        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
          />
        )}

        <form onSubmit={handleSubmit} className='loginData'>
          <div className='loginGroup'>
            <label className='loginLabel'><strong>DNI</strong></label>
            <input 
              className='loginInput' 
              type='number' 
              value={formData.dni}
              onChange={(e) => handleChange('dni', e.target.value)}
              disabled={loading}
            />
            <p className='loginText'>Ingresa solo números, sin puntos ni guiones</p>
          </div>
          
          <div className='loginGroup'>
            <label className='loginLabel'><strong>Contraseña</strong></label>
            <input 
              className='loginInput' 
              type='password' 
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={loading}
            />
          </div>
           
          <div>
            <button 
              type="submit" 
              className='logeoButton'
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
      
      <p className='formReturn'> 
        ¿No tenés cuenta? <Link to="/signup" className='toLogin'>Asociate al Club</Link> y crea tu Usuario.
      </p>
    </>
  )
}

export default Login
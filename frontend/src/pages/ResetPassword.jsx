import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import CustomAlert from '../components/CustomAlert/CustomAlert';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, email } = location.state || {};

  React.useEffect(() => {
    if (!userId || !email) {
      navigate('/login');
    }
  }, [userId, email, navigate]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      showAlert('Todos los campos son obligatorios', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert('Las contraseñas no coinciden', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(userId, newPassword);
      showAlert('Contraseña actualizada exitosamente', 'success');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      showAlert(error.message || 'Error al cambiar la contraseña', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className='formTitle'>Cambiar Contraseña</h2>
      <h3 className='subTitle'>Ingresa tu nueva contraseña.</h3>

      <div className='formContainer'>
        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
          />
        )}

        <div className='loginData'>
          <div className='loginGroup'>
            <label className='loginLabel'><strong>Email</strong></label>
            <p className='loginText'>{email}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='loginGroup'>
              <label className='loginLabel'><strong>Nueva contraseña</strong></label>
              <input
                className='loginInput'
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                disabled={loading}
              />
            </div>

            <div className='loginGroup'>
              <label className='loginLabel'><strong>Confirmar contraseña</strong></label>
              <input
                className='loginInput'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu nueva contraseña"
                disabled={loading}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="submit"
                className='logeoButton'
                disabled={loading}
              >
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className='formReturn'>
        ¿Recordaste tu contraseña? <Link to="/login" className='toLogin'>Volver al Login</Link>
      </p>
    </>
  );
};

export default ResetPassword;
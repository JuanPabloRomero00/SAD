import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Form, Link } from 'react-router-dom';



function Login() {
  return (
    <>
    <h2 className='formTitle'>Ingresa al Club</h2>
    <h3 className='subTitle'>Usa tu DNI y contraseña para entrar al panel de socio.</h3>

    <div className='formContainer'>
    <div className='loginData'>
  <div className='loginGroup'>
    <label className='loginLabel'><strong>DNI</strong></label>
    <input className='loginInput' label="DNI" type='number' />
    <p className='loginText'>Ingresa solo números, sin puntos ni guiones</p>
  </div>
  <div className='loginGroup'>
    <label className='loginLabel'><strong>Contraseña</strong></label>
    <input className='loginInput' label="Altura" type='string' />
  </div>
   
    <div className='loginButton'>
        <button className='loginButton'>Ingresar</button>
    </div>
    </div>
     </div>
    <p className='formReturn'> ¿No tenés cuenta? <Link className='toLogin'> Asociate al club. </Link>para crear tu usuario</p>

    </>
  )
}

export default Login
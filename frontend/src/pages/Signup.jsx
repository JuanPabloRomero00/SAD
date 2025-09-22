import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Form, Link } from 'react-router-dom';



function Signup() {
  return (
    <>
    <h2 className='formTitle'>Asociate al Club</h2>
    <h3 className='subTitle'>Completar formulario con tus datos.</h3>

<div className='formContainer'>
    <div className='formStep'>
    <button className='stepButton'>1. Datos Personales</button>
    <button className='stepButton'>2. Plan</button>
    <button className='stepButton'>3. Revisión</button>
    </div>
    <div className='formData'>
  <div className='formGroup'>
    <label className='formLabel'>DNI</label>
    <input className='formInput' label="DNI" type='number' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>NOMBRE</label>
    <input className='formInput' label="Nombre" type='text' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>APELLIDO</label>
    <input className='formInput' label="Apellido" type='text' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>EMAIL</label>
    <input className='formInput' label="Email" type='email' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>TELEFONO</label>
    <input className='formInput' label="Telefono" type='number' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>FECHA DE NACIMIENTO</label>
    <input className='formInput' label="FechaNacimiento" type='date' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>CALLE</label>
    <input className='formInput' label="Calle" type='text' />
  </div>

  <div className='formGroup'>
    <label className='formLabel'>ALTURA</label>
    <input className='formInput' label="Altura" type='number' />
  </div>
   
    <div className='formButton'>
        <button className='backButton'>Atras</button>
        <button className='nextButton'>Continuar</button>
        </div>
    </div>
     </div>
    <p className='formReturn'> ¿Ya tenés cuenta? <Link className='toLogin'> Ingresa acá. </Link></p>
    
    </>
   
  )
}

export default Signup
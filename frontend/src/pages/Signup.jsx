import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Form, Link } from 'react-router-dom';

const Step1 = () => {
  const [dni, setDni] = useState("");

  const preventArrows = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='dni'>DNI</label>
        <input id='dni' className='formInput' type='number' value={dni} placeholder='Ingrese su DNI'
          onChange={(e) => setDni(e.target.value)}
          onKeyDown={preventArrows}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='nombre'>Nombre</label>
        <input id='nombre' className='formInput' placeholder='Ingrese su nombre' type='text' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='apellido'>Apellido</label>
        <input id='apellido' className='formInput' placeholder='Ingrese su apellido' type='text' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='email'>Email</label>
        <input id='email' className='formInput' placeholder='sucorreo@dominio.com' type='email' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='telefono'>Teléfono</label>
        <input id='telefono' className='formInput' placeholder='11 1234 5678' maxLength="15" type='tel' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='fechaNacimiento'>Fecha de Nacimiento</label>
        <input id='fechaNacimiento' className='formInput' type='date' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='direccion'>Dirección</label>
        <input id='direccion' className='formInput' placeholder='Calle del domicilio' type='text' />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='altura'>Altura</label>
        <input id='altura' className='formInput' type='number' placeholder='Numeración del domicilio' onKeyDown={preventArrows} />
      </div>
    </>
  );
};

const Step2 = () => {
  return (
    <div>
      <h3 className='subTitle'>Elegí tu plan ideal</h3>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='plan'>Tipo de Plan</label>
        <select id='plan' className='formInput'>
          <option value="">Seleccione un plan</option>
          <option value="basico">Plan Básico - $5000/mes</option>
          <option value="completo">Plan Completo - $8000/mes</option>
          <option value="premium">Plan Premium - $12000/mes</option>
        </select>
      </div>
    </div>
  );
};

const Step3 = () => {
  return (
    <div>
      <h3 className='subTitle'>Revisá tus datos</h3>
      <p>Por favor, confirmá que toda la información ingresada sea correcta antes de finalizar.</p>
      {}
    </div>
  );
};

function Signup() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("¡Asociación completada con éxito!");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <>
      <h2 className='formTitle'>Asociate al Club</h2>
      <h3 className='subTitle'>Completá el formulario con tus datos.</h3>

      <div className='formContainer'>
        <div className='formStep'>
          <button className={`stepButton ${step === 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>1. Datos Personales</button>
          <button className={`stepButton ${step === 2 ? 'active' : ''}`} onClick={() => goToStep(2)}>2. Plan</button>
          <button className={`stepButton ${step === 3 ? 'active' : ''}`} onClick={() => goToStep(3)}>3. Revisión</button>
        </div>

        <div className='formData'>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

          <div className='formButton'>
            {step > 1 && (
              <button className='backButton' onClick={prevStep}>Atras</button>
            )}
            <button className='nextButton' onClick={nextStep}>
              {step === 3 ? 'Finalizar' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
      <p className='formReturn'> ¿Ya tenés cuenta? <Link to="/login" className='toLogin'> Ingresa acá. </Link></p>
    </>
  );
}

export default Signup;
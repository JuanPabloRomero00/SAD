import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'basico', name: 'Plan Básico', price: 8000, description: [
      'Acceso a 1 actividad.',
      'Carnet digital.'
    ]
  },
  {
    id: 'completo', name: 'Plan Completo', price: 12000, description: [
      'Acceso hasta 3 actividades.',
      'Carnet digital.',
      '10% de descuento.'
    ]
  },
  {
    id: 'premium', name: 'Plan Premium', price: 16000, description: [
      'Acceso a todas las actividades.',
      'Carnet digital.',
      '15% de descuento.'
    ]
  }
];

const Step1 = ({ data, handleChange }) => {
  const preventArrows = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='dni'>DNI</label>
        <input id='dni' className='formInput' type='number' placeholder='Ingrese su DNI'
          value={data.dni}
          onChange={(e) => handleChange('dni', e.target.value)}
          onKeyDown={preventArrows}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='nombre'>Nombre</label>
        <input id='nombre' className='formInput' placeholder='Ingrese su nombre' type='text'
          value={data.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='apellido'>Apellido</label>
        <input id='apellido' className='formInput' placeholder='Ingrese su apellido' type='text'
          value={data.apellido}
          onChange={(e) => handleChange('apellido', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='email'>Email</label>
        <input id='email' className='formInput' placeholder='sucorreo@dominio.com' type='email'
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='telefono'>Teléfono</label>
        <input id='telefono' className='formInput' placeholder='11 1234 5678' maxLength="15" type='tel'
          value={data.telefono}
          onChange={(e) => handleChange('telefono', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='fechaNacimiento'>Fecha de Nacimiento</label>
        <input id='fechaNacimiento' className='formInput' type='date'
          value={data.fechaNacimiento}
          onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='direccion'>Dirección</label>
        <input id='direccion' className='formInput' placeholder='Calle y altura del domicilio' type='text'
          value={data.direccion}
          onChange={(e) => handleChange('direccion', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='localidad'>Localidad</label>
        <input id='localidad' className='formInput' type='text' placeholder='Ingrese localidad' onKeyDown={preventArrows}
          value={data.localidad}
          onChange={(e) => handleChange('localidad', e.target.value)}
        />
      </div>
    </>
  );
};

const Step2 = ({ data, handleChange, selectedPlan, onPlanSelect }) => {

  return (
    <>
      <div className='planContainer'>
        <h3 className='subTitlePlan'>Elegí tu plan</h3>
        <div className='planCardsContainer'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`planCard ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => onPlanSelect(plan.id)}
            >
              <h4 className='planName'>{plan.name}</h4>
              <p className='planPrice'>${plan.price}/mes</p>
              <ul className='planDescription'>
                {plan.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='passContainer'>
          <div className='formGroup'>
            <label className='formLabel' htmlFor='password'>Contraseña</label>
            <input id='password' className='formInput' placeholder='Genere su contraseña' type='text'
              value={data.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label className='formLabel' htmlFor='passConfirm'>Confirmar contraseña</label>
            <input id='passConfirm' className='formInput' placeholder='Reingrese la contraseña' type='text' />
          </div>
        </div>
      </div>
    </>
  );
};

const Step3 = ({ data, plans }) => {
  const planSeleccionado = plans.find(p => p.id === data.plan);

  return (
    <>
      <div className='newContainer'>
        <h3 className='subTitleDetail'>Revisá tus datos</h3>
        <p>Por favor, confirmá que toda la información ingresada sea correcta.</p>
        <div className='newUserContainer'>
          <ul className='newUserDetail'>
            <li><strong>DNI:</strong><br /> {data.dni}</li>
            <li><strong>Nombre:</strong><br /> {data.nombre} {data.apellido}</li>
            <li><strong>Correo:</strong><br /> {data.email}</li>
            <li><strong>Teléfono:</strong><br /> {data.telefono}</li>
            <li><strong>Fecha de Nacimiento:</strong><br /> {data.fechaNacimiento}</li>
            <li><strong>Dirección:</strong><br /> {data.direccion}, {data.localidad}</li>
          </ul>
          <div className='planDetail'>
            <h4>Plan Seleccionado</h4>
            <p><strong>Plan: </strong>&nbsp; {planSeleccionado ? planSeleccionado.name : 'No seleccionado'}</p>
            <p><strong>Precio: </strong>&nbsp; {planSeleccionado ? `${'$' + planSeleccionado.price}` : 'No seleccionado'}</p>
            <p><strong>Medio de Pago: </strong>&nbsp;Sede</p>
          </div>
        </div>
      </div>
    </>
  );
};

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: '',
    localidad: '',
    plan: null,
    password: ''
  });

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Enviando al backend:", formData);
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
          {step === 1 && <Step1 data={formData} handleChange={handleChange} />}
          {step === 2 && <Step2 selectedPlan={formData.plan} data={formData} handleChange={handleChange} onPlanSelect={(planId) => handleChange('plan', planId)} />}
          {step === 3 && <Step3 data={formData} plans={plans} />}

          <div className='formButton'>
            {step > 1 && <button className='backButton' onClick={prevStep}>Atrás</button>}
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
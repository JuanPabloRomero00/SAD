import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import authService from '../services/authService';

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

const securityQuestions = [
  "¿Cuál es el nombre de tu primera mascota?",
  "¿En qué ciudad naciste?",
  "¿Cuál es el nombre de tu mejor amigo de la infancia?",
  "¿Cuál es tu color favorito?",
  "¿Cómo se llamaba tu primer maestro/a?"
];

const Step1 = ({ data, handleChange, handleAddress }) => {
  const preventArrows = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='dni'>DNI</label>
        <input id='dni' className='formInput' autoComplete='on' type='number' placeholder='Ingrese su DNI'
          value={data.dni}
          onChange={(e) => handleChange('dni', e.target.value)}
          onKeyDown={preventArrows}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='nombre'>Nombre</label>
        <input id='nombre' className='formInput' placeholder='Ingrese su nombre' autoComplete='on' type='text'
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='apellido'>Apellido</label>
        <input id='apellido' className='formInput' placeholder='Ingrese su apellido' type='text'
          value={data.surname}
          onChange={(e) => handleChange('surname', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='email'>Email</label>
        <input id='email' className='formInput' autoComplete='email' placeholder='sucorreo@dominio.com' type='email'
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='telefono'>Teléfono</label>
        <input id='telefono' className='formInput' placeholder='11 1234 5678' maxLength="15" type='tel'
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='fechaNacimiento'>Fecha de Nacimiento</label>
        <input id='fechaNacimiento' autoComplete='off' className='formInput' type='date'
          value={data.birthdate}
          onChange={(e) => handleChange('birthdate', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='direccion'>Dirección</label>
        <input id='direccion' autoComplete='off' className='formInput' placeholder='Calle y altura del domicilio' type='text'
          value={data.address.street}
          onChange={(e) => handleAddress('street', e.target.value)}
        />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='localidad'>Localidad</label>
        <input id='localidad' className='formInput' type='text' placeholder='Ingrese localidad' onKeyDown={preventArrows}
          value={data.address.city}
          onChange={(e) => handleAddress('city', e.target.value)}
        />
      </div>
    </>
  );
};

const Step2 = ({ data, handleChange, passConfirm, setPassConfirm, passwordError }) => {
  return (
    <>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='password'>Contraseña</label>
        <input id='password' className='formInput' autoComplete='off' placeholder='Genere su contraseña' type='password'
          value={data.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {passwordError && <p className="inputError">{passwordError}</p>}
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='passConfirm'>Confirmar contraseña</label>
        <input id='passConfirm' autoComplete='off' className='formInput' placeholder='Reingrese la contraseña' type='password'
          value={passConfirm}
          onChange={(e) => setPassConfirm(e.target.value)} />
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='securityQuestion'>Pregunta de seguridad</label>
        <select id='securityQuestion' className='formInput' 
          value={data.securityQuestion}
          onChange={(e) => handleChange('securityQuestion', e.target.value)}
        >
          <option value="">Selecciona una pregunta de seguridad</option>
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>
      </div>
      <div className='formGroup'>
        <label className='formLabel' htmlFor='securityAnswer'>Respuesta de seguridad</label>
        <input id='securityAnswer' className='formInput' placeholder='Respuesta a la pregunta de seguridad' type='text'
          value={data.securityAnswer}
          onChange={(e) => handleChange('securityAnswer', e.target.value)}
        />
      </div>
    </>
  );
};

const Step3 = ({ data, selectedPlan, onPlanSelect }) => {
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
      </div>
    </>
  );
};

const Step4 = ({ data, plans }) => {
  const planSeleccionado = plans.find(p => p.id === data.plan);

  return (
    <>
      <div className='newContainer'>
        <h3 className='subTitleDetail'>Revisá tus datos</h3>
        <p>Por favor, confirmá que toda la información ingresada sea correcta.</p>
        <div className='newUserContainer'>
          <ul className='newUserDetail'>
            <li><strong>DNI:</strong><br /> {data.dni}</li>
            <li><strong>Nombre:</strong><br /> {data.name} {data.surname}</li>
            <li><strong>Correo:</strong><br /> {data.email}</li>
            <li><strong>Teléfono:</strong><br /> {data.phone}</li>
            <li><strong>Fecha de Nacimiento:</strong><br /> {data.birthdate}</li>
            <li><strong>Dirección:</strong><br /> {data.address.street}, {data.address.city}</li>
          </ul>
          <div className='planDetail'>
            <h4>Plan Seleccionado</h4>
            <p><strong>Plan: </strong>&nbsp;{planSeleccionado ? planSeleccionado.name : 'No seleccionado.'}</p>
            <p><strong>Precio: </strong>&nbsp;{planSeleccionado ? `${'$' + planSeleccionado.price}` : 'No seleccionado.'}</p>
            <p><strong>Medio de Pago: </strong>&nbsp;Sede</p>
          </div>
        </div>
      </div>
    </>
  );
};

function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    birthdate: '',
    address: {
      street: '',
      city: ''
    },
    plan: null,
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleAddress = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value
      }
    }));
  };

  const [passConfirm, setPassConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const isStep1Valid = () => {
    return formData.dni && formData.name && formData.surname && formData.email && formData.phone;
  };

  const isStep2Valid = () => {
    return formData.password && (formData.password === passConfirm) && 
           formData.securityQuestion && formData.securityAnswer;
  };

  const isStep3Valid = () => {
    return formData.plan;
  };


  const nextStep = async () => {
    if (step === 1) {
      if (!isStep1Valid()) {
        alert("Por favor, completá todos los campos obligatorios.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setPasswordError('');
      if (formData.password !== passConfirm) {
        setPasswordError("Las contraseñas no coinciden.");
        return;
      }
      if (!formData.password || !passConfirm || !formData.securityQuestion || !formData.securityAnswer) {
        alert("Por favor, completá todos los campos requeridos.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.plan) {
        alert("Por favor, seleccioná un plan.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setIsLoading(true);
      try {
        const responseData = await authService.registerUser(formData);
        showAlert('¡Te registraste exitosamente!', 'success');
        console.log("Respuesta del backend:", responseData);
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } catch (err) {
        console.error("Error al enviar el formulario:", err);
        showAlert(err.message || 'Error al registrar usuario', 'error');
        console.log(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber === 1) {
      setStep(1);
    } else if (stepNumber === 2 && isStep1Valid()) {
      setStep(2);
    } else if (stepNumber === 3 && isStep1Valid() && isStep2Valid()) {
      setStep(3);
    } else if (stepNumber === 4 && isStep1Valid() && isStep2Valid() && isStep3Valid()) {
      setStep(4);
    }
  };

  return (
    <>
      <h2 className='formTitle'>Asociate al Club</h2>
      <h3 className='subTitle'>Completá el formulario con tus datos.</h3>

      <div className='formContainer'>
        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
          />
        )}
        
        <div className='formStep'>
          <button className={`stepButton ${step === 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>1. Datos Personales</button>
          <button className={`stepButton ${step === 2 ? 'active' : ''}`} disabled={!isStep1Valid()} onClick={() => goToStep(2)}>2. Seguridad</button>
          <button className={`stepButton ${step === 3 ? 'active' : ''}`} disabled={!isStep2Valid() || !isStep1Valid()} onClick={() => goToStep(3)}>3. Plan</button>
          <button className={`stepButton ${step === 4 ? 'active' : ''}`} disabled={!isStep3Valid() || !isStep2Valid() || !isStep1Valid() || isLoading} onClick={() => goToStep(4)}>4. Revisión</button>
        </div>

        <div className='formData'>
          {step === 1 && <Step1 data={formData} handleChange={handleChange} handleAddress={handleAddress} />}
          {step === 2 &&
            <Step2
              data={formData}
              handleChange={handleChange}
              passConfirm={passConfirm}
              setPassConfirm={setPassConfirm}
              passwordError={passwordError}
            />
          }
          {step === 3 && 
            <Step3 
              data={formData} 
              selectedPlan={formData.plan} 
              onPlanSelect={(planId) => handleChange('plan', planId)} 
            />
          }
          {step === 4 && <Step4 data={formData} plans={plans} />}

          <div className='formButton'>
            {step > 1 && <button className='backButton' onClick={prevStep}>Atrás</button>}
            <button className='nextButton' onClick={nextStep}>
              {step === 4 ? 'Finalizar' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
      <p className='formReturn'> ¿Ya tenés cuenta? <Link to="/login" className='toLogin'> Ingresa acá. </Link></p>
<<<<<<< HEAD
      {showSuccessAlert && <CustomAlert message="¡Te registraste exitosamente!" redirectTo="/login"  />}
=======
>>>>>>> backend
    </>
  );
}

export default Signup;
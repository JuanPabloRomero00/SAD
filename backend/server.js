require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./src/config/db');
const User = require('./src/models/User'); 
const port = 3000
const Credential = require('./src/models/Credential'); 
const Activity = require('./src/models/Activity'); // Agrega esta línea
const Plan = require('./src/models/Plan'); // Agrega esta línea
const authRoutes = require('./src/routes/usersRoutes');

app.use(cors());
app.use(express.json());

//Esta fue la forma de crear un admin por defecto para probar la conexión con la base de datos
//const createDefaultAdmin = require('./src/config/createDefaultAdmin');

connectDB();
//createDefaultAdmin();

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Ruta para crear usuario y su credencial digital
app.post('/users/create', async (req, res) => {
  try {
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email ya registrado",
        message: "Ya existe un usuario con este email"
      });
    }

    const user = new User(req.body);
    await user.save();

    // Crear la credencial digital
    const memberId = `${user._id}-${user.dni}`;
    const credential = new Credential({
      name: user.name,
      surname: user.surname,
      dni: user.dni,
      birthdate: user.birthdate,
      memberId: memberId,
      role: user.role
    });
    await credential.save();

    res.status(201).json({ user, credential });
  } catch (err) {
    res.status(400).json({
      error: "El usuario no se pudo crear correctamente",
      message: err.message
    });
  }
});

// Ruta para obtener pregunta de seguridad por email
app.post('/users/get-security-question', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: "No existe un usuario con este email"
      });
    }

    res.status(200).json({
      securityQuestion: user.securityQuestion,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al buscar usuario",
      message: err.message
    });
  }
});

// Ruta para verificar email y pregunta de seguridad
app.post('/users/verify-security', async (req, res) => {
  try {
    const { email, securityAnswer } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: "No existe un usuario con este email"
      });
    }

    if (user.securityAnswer.toLowerCase().trim() !== securityAnswer.toLowerCase().trim()) {
      return res.status(400).json({
        error: "Respuesta incorrecta",
        message: "La respuesta de seguridad no es correcta"
      });
    }

    res.status(200).json({
      message: "Verificación exitosa",
      securityQuestion: user.securityQuestion,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({
      error: "Error en la verificación",
      message: err.message
    });
  }
});

// Ruta para cambiar contraseña
app.post('/users/reset-password', async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: "No se pudo encontrar el usuario"
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Contraseña actualizada exitosamente"
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al cambiar contraseña",
      message: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`SAD app listening on port ${port}`)
})


// Obtener todos los usuarios (GET /users)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({ active: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener usuario por ID (GET /users/:id)
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Actualizar usuario por ID (PATCH /users/:id)
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Modificar el rol de un usuario por ID (PATCH /users/:id/role)
app.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: "El campo 'role' es requerido" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Rol actualizado correctamente", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Dar de baja lógica a un usuario por ID (PATCH /users/:id/deactivate)
app.patch('/users/:id/deactivate', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario dado de baja.", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener solo los usuarios dados de baja (inactivos) (GET /users/inactive)
app.get('/users/inactive', async (req, res) => {
  try {
    const users = await User.find({ active: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener todas las credenciales (GET /credentials)
app.get('/credentials', async (req, res) => {
  try { 
    const credentials = await Credential.find();
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Baja logica de credencial
app.patch('/credentials/:id/deactivate', async (req, res) => {
  try {
    const credential = await Credential.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!credential) return res.status(404).json({ error: "Credencial no encontrada" });
    res.json({ message: "Credencial dada de baja.", credential });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Obtener solo las credenciales dadas de baja
app.get('/credentials/inactive', async (req, res) => {
  try {
    const credentials = await Credential.find({ active: false });
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una actividad/taller
app.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: "No se pudo crear la actividad" });
  }
});

// Obtener todas las actividades/talleres
app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "No se encontraron las actividades" });
  }
});
// Actualizar actividad por ID (PATCH /activities/:id)
app.patch('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
    res.json({ message: "Actividad actualizada correctamente", activity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Anotar usuario a una actividad (POST /activities/:id/join)
app.post('/activities/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });

    // Verifica si el usuario ya está anotado
    if (activity.participants.includes(userId)) {
      return res.status(400).json({ error: "El usuario ya está anotado en esta actividad" });
    }

    activity.participants.push(userId);
    await activity.save();
    res.json({ message: "Usuario anotado correctamente", activity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Desanotar usuario de una actividad (POST /activities/:id/leave)
app.post('/activities/:id/leave', async (req, res) => {
  try {
    const { userId } = req.body;
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });

    activity.participants = activity.participants.filter(
      id => id.toString() !== userId
    );
    await activity.save();
    res.json({ message: "Usuario desanotado correctamente", activity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elegir o modificar el plan de un usuario (PATCH /users/:id/plan)
app.patch('/users/:id/plan', async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) {
      return res.status(400).json({ error: "El campo 'planId' es requerido" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    if (user.role !== 'user') {
      return res.status(403).json({ error: "Solo los usuarios con rol 'user' pueden elegir un plan" });
    }
    user.plan = planId;
    await user.save();
    res.json({ message: "Plan asignado correctamente", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login de usuario
app.use('/auth', authRoutes);

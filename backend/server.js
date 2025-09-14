require('dotenv').config({ path: '../.env' });
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./src/config/db');
const User = require('./src/models/User'); 
const port = 3000
const Credential = require('./src/models/Credential'); 

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
    const user = new User(req.body);
    await user.save();

    // Crear la credencial digital
    const memberId = `${user._id}-${user.document}`;
    const credential = new Credential({
      name: user.name,
      surname: user.surname,
      document: user.document,
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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


// Dar de baja lógica a un usuario por ID (PATCH /users/:id/deactivate)
app.patch('/users/:id/deactivate', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario dado de baja lógicamente", user });
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






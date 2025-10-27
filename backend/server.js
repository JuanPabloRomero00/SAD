require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./src/config/db");
const User = require("./src/models/User");
const port = 3000;
const Credential = require("./src/models/Credential");
const Activity = require("./src/models/Activity"); // Agrega esta línea
const Plan = require("./src/models/Plan"); // Agrega esta línea
const authRoutes = require("./src/routes/userRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use(cors());
app.use(express.json());

//Esta fue la forma de crear un admin por defecto para probar la conexión con la base de datos
//const createDefaultAdmin = require('./src/config/createDefaultAdmin');

connectDB();
//createDefaultAdmin();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Ruta para verificar email y pregunta de seguridad
app.post("/auth/verify-security", async (req, res) => {
  try {
    const { email, securityAnswer } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: "No existe un usuario con este email",
      });
    }

    if (
      user.securityAnswer.toLowerCase().trim() !==
      securityAnswer.toLowerCase().trim()
    ) {
      return res.status(400).json({
        error: "Respuesta incorrecta",
        message: "La respuesta de seguridad no es correcta",
      });
    }

    res.status(200).json({
      message: "Verificación exitosa",
      securityQuestion: user.securityQuestion,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error en la verificación",
      message: err.message,
    });
  }
});

// Ruta para cambiar contraseña
app.post("/auth/reset-password", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: "No se pudo encontrar el usuario",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Contraseña actualizada exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al cambiar contraseña",
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`SAD app listening on port ${port}`);
});

// Obtener solo los usuarios dados de baja (inactivos) (GET /users/inactive)
app.get("/users/inactive", async (req, res) => {
  try {
    const users = await User.find({ active: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las credenciales (GET /credentials)
app.get("/credentials", async (req, res) => {
  try {
    const credentials = await Credential.find();
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Baja logica de credencial
app.patch("/credentials/:id/deactivate", async (req, res) => {
  try {
    const credential = await Credential.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true },
    );
    if (!credential)
      return res.status(404).json({ error: "Credencial no encontrada" });
    res.json({ message: "Credencial dada de baja.", credential });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener solo las credenciales dadas de baja
app.get("/credentials/inactive", async (req, res) => {
  try {
    const credentials = await Credential.find({ active: false });
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una actividad/taller
app.post("/activities", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: "No se pudo crear la actividad" });
  }
});

// Obtener todas las actividades/talleres
app.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "No se encontraron las actividades" });
  }
});

// Actualizar actividad por ID (PATCH /activities/:id)
app.patch("/activities/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity)
      return res.status(404).json({ error: "Actividad no encontrada" });
    res.json({ message: "Actividad actualizada correctamente", activity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Anotar usuario a una actividad (POST /activities/:id/join)
app.post("/activities/:id/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const activity = await Activity.findById(req.params.id);
    if (!activity)
      return res.status(404).json({ error: "Actividad no encontrada" });

    // Verifica si el usuario ya está anotado
    if (activity.participants.includes(userId)) {
      return res
        .status(400)
        .json({ error: "El usuario ya está anotado en esta actividad" });
    }

    activity.participants.push(userId);
    await activity.save();
    res.json({ message: "Usuario anotado correctamente", activity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para desanotar usuario de una actividad
app.post("/activities/:id/leave", async (req, res) => {
  try {
    const { userId } = req.body;

    // Validar que el ID de usuario y actividad sean válidos
    if (!userId) {
      return res.status(400).json({ error: "El ID del usuario es requerido" });
    }

    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }

    // Verificar si el usuario está inscrito en la actividad
    const isParticipant = activity.participants.some(
      (id) => id.toString() === userId
    );
    if (!isParticipant) {
      return res.status(400).json({ error: "El usuario no está inscrito en esta actividad" });
    }

    // Remover al usuario de la lista de participantes
    activity.participants = activity.participants.filter(
      (id) => id.toString() !== userId
    );

    // Agregar al historial de bajas
    activity.pastParticipants.push({ userId, removedAt: new Date() });

    // Guardar los cambios en la base de datos
    await activity.save();

    res.status(200).json({ message: "Usuario desanotado correctamente", activity });
  } catch (err) {
    res.status(500).json({ error: "Error al desanotar usuario", message: err.message });
  }
});

// Elegir o modificar el plan de un usuario (PATCH /users/:id/plan)
app.patch("/users/:id/plan", async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) {
      return res.status(400).json({ error: "El campo 'planId' es requerido" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    if (user.role !== "user") {
      return res
        .status(403)
        .json({
          error: "Solo los usuarios con rol 'user' pueden elegir un plan",
        });
    }
    user.plan = planId;
    await user.save();
    res.json({ message: "Plan asignado correctamente", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para listar actividades a las que un usuario está inscrito
app.get("/users/:id/activities", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const activities = await Activity.find({ participants: user._id });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades", message: err.message });
  }
});

// Ruta para listar actividades según el filtro de actividad
app.get("/activities/filter", async (req, res) => {
  try {
    const { title, day, time } = req.query;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" }; // Búsqueda por título (case-insensitive)
    if (day) filter.days = Number(day); 
    if (time) filter.time = time; 
    const activities = await Activity.find(filter);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Error al filtrar actividades", message: err.message });
  }
});

// Ruta para obtener el historial de actividades de un usuario (incluyendo bajas)
app.get("/users/:id/activities/history", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const activities = await Activity.find({
      $or: [
        { participants: user._id }, // Actividades actuales
        { "pastParticipants.userId": user._id }, // Historial de bajas
      ],
    });

    const history = activities.map((activity) => {
      const wasRemoved = activity.pastParticipants?.some(
        (p) => p.userId.toString() === user._id.toString()
      );

      return {
        activityId: activity._id,
        title: activity.title,
        description: activity.description,
        days: activity.days,
        time: activity.time,
        wasRemoved,
      };
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener historial de actividades", message: err.message });
  }
});

// Ruta para obtener detalles de una actividad específica
app.get("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id).populate("participants", "name email");
    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }

    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener detalles de la actividad", message: err.message });
  }
});

// Ruta para actualizar una actividad
app.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const activity = await Activity.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }

    res.status(200).json({ message: "Actividad actualizada correctamente", activity });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la actividad", message: err.message });
  }
});

// Ruta para eliminar una actividad
app.delete("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }

    res.status(200).json({ message: "Actividad eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la actividad", message: err.message });
  }
});

// Login de usuario
app.use("/auth", authRoutes);

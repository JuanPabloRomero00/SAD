const { 
    createUser: createUserService,
    getAllUsers: getAllUsersService,
    getUserById: getUserByIdService,
    updateUserById: updateUserByIdService,
    updateRoleByUserId: updateRoleByUserIdService,
    deleteUserById: deleteUserByIdService
} = require("../services/userService");

const createUser = async (req, res) => {
    try {
        const result = await createUserService(req.body);
        return res.status(201).json({ message: "Usuario creado", data: result.user });
    } catch (err) {
        res.status(err.status || 500).json({
        error: "No se pudo crear el usuario",
        message: err.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await updateUserByIdService(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateRoleByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await updateRoleByUserIdService(id, role);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({ message: "Rol actualizado correctamente", user });
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUserByIdService(id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ message: "Usuario dado de baja.", user });
    } catch (err) {
         res.status(err.status || 400).json({ error: err.message });
    }
};

const getInactiveUsers = async (req, res) => {
  try {
    const users = await getInactive();
    res.json(users);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


const assignPlanToUser = async (req, res) => {
  try {
    const { planId } = req.body;
    const user = await assignPlan(req.params.id, planId);
    res.json({ message: "Plan asignado correctamente", user });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUserById, 
  updateRoleByUserId, 
  deleteUserById,
  getInactiveUsers,
  assignPlanToUser
};

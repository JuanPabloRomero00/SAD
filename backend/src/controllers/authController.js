const {
    getSecurityQuestion: getSecurityQuestionService,
    verifySecurity: verifySecurityService,
    resetPassword: resetPasswordService,
    loginUser: loginUserService
} = require("../services/authService");

const getSecurityQuestion = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await getSecurityQuestionService(email);
        if (!result) {
            return res.status(404).json({
                error: "Usuario no encontrado",
                message: "No existe un usuario con este email",
            });
        } 
        res.status(200).json({
            securityQuestion: result,
        });
    } catch (err) {
        res.status(500).json({
            error: "Error al buscar usuario",
            message: err.message,
        });
    }
};

const verifySecurity = async (req, res) => {
    try {
        const { email, securityAnswer } = req.body;
        const result = await verifySecurityService(email, securityAnswer);
        res.status(200).json({
            message: "Verificación exitosa",
            securityQuestion: result.securityQuestion,
            userId: result.userId,
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.status === 404 ? "Usuario no encontrado" : "Respuesta incorrecta",
            message: err.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        await resetPasswordService(userId, newPassword);
        res.status(200).json({
            message: "Contraseña actualizada exitosamente",
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: "Error al cambiar contraseña",
            message: err.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { dni, password } = req.body;
        const user = await loginUserService(dni, password);
        res.json({
            message: "Login exitoso",
            user
        });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Exporta todos los handlers en un solo objeto
module.exports = {
    getSecurityQuestion,
    verifySecurity,
    resetPassword,
    loginUser
};
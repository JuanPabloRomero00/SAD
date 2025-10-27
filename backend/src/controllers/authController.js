const {
    getSecurityQuestion: getSecurityQuestionService
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
            securityQuestion: user.securityQuestion,
            userId: user._id,
        });
    } catch (err) {
        res.status(500).json({
            error: "Error al buscar usuario",
            message: err.message,
        });
    }
}

module.exports = {
    getSecurityQuestion
};
const SERVER_URL = 'http://localhost:3000';

const authService = {

    registerUser: async (userData) => {
        console.log(userData);
        
        const response = await fetch(`${SERVER_URL}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.log(response);
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar el usuario.');
        }

        return response.json();
    },

    getSecurityQuestion: async (email) => {
        const response = await fetch(`${SERVER_URL}/users/get-security-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al buscar el usuario.');
        }

        return response.json();
    },

    verifySecurityQuestion: async (email, securityAnswer) => {
        const response = await fetch(`${SERVER_URL}/users/verify-security`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, securityAnswer }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la verificación.');
        }

        return response.json();
    },

    resetPassword: async (userId, newPassword) => {
        const response = await fetch(`${SERVER_URL}/users/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, newPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar la contraseña.');
        }

        return response.json();
    },
};

export default authService;
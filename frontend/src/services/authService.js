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
};

export default authService;
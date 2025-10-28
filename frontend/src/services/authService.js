const SERVER_URL = "http://localhost:3000";

const authService = {
  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {}
        throw new Error(errorData.message || "Error en el login");
      }
      return await response.json();
    } catch (err) {
      throw err;
    }
  },
  getSecurityQuestion: async (email) => {
    const response = await fetch(`${SERVER_URL}/auth/get-security-question`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al buscar el usuario.");
    }

    return response.json();
  },

  verifySecurityQuestion: async (email, securityAnswer) => {
    const response = await fetch(`${SERVER_URL}/auth/verify-security`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, securityAnswer }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la verificación.");
    }

    return response.json();
  },

  resetPassword: async (userId, newPassword) => {
    const response = await fetch(`${SERVER_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cambiar la contraseña.");
    }

    return response.json();
  },
};

export default authService;

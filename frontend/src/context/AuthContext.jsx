import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  // Inicializa el estado con el valor de localStorage si existe
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Mantiene sincronizado el estado con localStorage si cambia el usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);


  const login = (userData) => {
    setUser(userData);
    console.log(userData);
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
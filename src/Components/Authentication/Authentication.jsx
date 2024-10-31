import { createContext, useState, useContext } from "react";
const AuthContext = createContext();
import PropTypes from "prop-types";

export function Authentication({ children }) {
  // Carga el estado de autenticación desde localStorage al iniciar
  const [isAuthenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Función de login que actualiza el estado y lo guarda en localStorage
  const login = () => {
    setAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Función de logout que actualiza el estado y lo borra de localStorage
  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

Authentication.propTypes = {
  children: PropTypes.node,
};

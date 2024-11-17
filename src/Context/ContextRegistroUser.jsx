/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

// Crear el contexto de usuario
export const UserContext = createContext();

// Proveedor del contexto
export const ContextRegistroUser = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Escuchar cambios de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Guarda el usuario actual si está autenticado
    });

    return () => unsubscribe(); // Limpia el observador al desmontar el componente
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

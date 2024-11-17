/* eslint-disable react/prop-types */
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./Authentication";
// import PropTypes from "prop-types";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} replace />;
//   }

//   return children;
// }

// ProtectedRoute.propTypes = {
//   children: PropTypes.node,
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/firebase";

const ProtectedRoute = ({ children, ruta }) => {
  const [user, loading] = useAuthState(auth); //Permite verificar el estado de autenticacion de un usuario y obtener el usuario actual en REACT

  if (loading) {
    return children; // Se muestra un estado de carga mientras se verifica el usuario
  }

  if (!user) {
    return <Navigate to={ruta} replace />;
  }

  return children;
};

export default ProtectedRoute;

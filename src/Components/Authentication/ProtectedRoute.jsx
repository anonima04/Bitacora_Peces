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
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children, ruta }) => {
  const [user, loading] = useAuthState(getAuth());

  if (loading) {
    return children; // Se muestra un estado de carga mientras se verifica el usuario
  }

  if (!user) {
    return <Navigate to={ruta} replace />;
  }

  return children;
};

export default ProtectedRoute;

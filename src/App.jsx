/* eslint-disable no-unused-vars */
// Importando modulos de FireBase
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import TipsPage from "./Page/TipsPage/TipsPage";
import AboutUsPage from "./Page/AboutUsPage/AboutUsPage";
import FeaturedSpeciesPage from "./Page/FeaturedSpeciesPage/FeaturedSpeciesPage";
import appFireBase from "./Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Page/LoginPage/Login";
import Home from "./Page/Home/Home";
import { useState } from "react";
import RecoverPassword from "./Page/RecoverPassword/RecoverPassword";
import RegisterUser from "./Page/RegisterUser/RegisterUser";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import { Authentication } from "./Components/Authentication/Authentication";
import FormBitacora from "./Components/FormBitacora/FormBitacora";

const auth = getAuth(appFireBase);

function App() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFireBase) => {
    if (usuarioFireBase) {
      setUsuario(usuarioFireBase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <Authentication>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Pagina inicio */}
          <Route path="/login" element={<Login />} /> {/* Pagina de Login */}
          <Route path="/recoverPass" element={<RecoverPassword />} />{" "}
          {/* Recuperar contraseña */}
          <Route path="/registerUser" element={<RegisterUser />} />{" "}
          {/* Registro usuario */}
          <Route path="/consejos" element={<TipsPage />} />
          <Route path="/sobre-nosotros" element={<AboutUsPage />} />
          <Route
            path="/especies-destacadas"
            element={<FeaturedSpeciesPage />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/crearBitacora"
            element={
              <ProtectedRoute>
                <FormBitacora />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Authentication>
  );
}

export default App;

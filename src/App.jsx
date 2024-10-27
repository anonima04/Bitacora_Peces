/* eslint-disable no-unused-vars */
//Importando modulos de FireBase
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import TipsPage from "./Page/TipsPage/TipsPage";
import AboutUsPage from "./Page/AboutUsPage/AboutUsPage";
import FeaturedSpeciesPage from "./Page/FeaturedSpeciesPage/FeaturedSpeciesPage";
import appFireBase from "./Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFireBase);
import Login from "./Page/LoginPage/Login";
import Home from "./Page/HomePage/HomePage";
import { useState } from "react";

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consejos" element={<TipsPage />} />
        <Route path="/sobre-nosotros" element={<AboutUsPage />} />
        <Route path="/especies-destacadas" element={<FeaturedSpeciesPage />} />
      </Routes>
    </Router>
  );
}

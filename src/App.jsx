import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import TipsPage from "./Page/TipsPage/TipsPage";
import AboutUsPage from "./Page/AboutUsPage/AboutUsPage";
import FeaturedSpeciesPage from "./Page/FeaturedSpeciesPage/FeaturedSpeciesPage";
import Login from "./Page/LoginPage/Login";
import Home from "./Page/Home/Home";
import RecoverPassword from "./Page/RecoverPassword/RecoverPassword";
import RegisterUser from "./Page/RegisterUser/RegisterUser";

import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import FormBitacora from "./Components/Registrar_Bitacora/FormBitacora";
import "./Fonts.css"; // Familia de fuentes GLOBAL
import ProfilePage from "./Page/ProfilePage/ProfilePage";
import File from "./Components/File/File";
import ManageAcountsPage from "./Page/ManageAcountsPage/ManageAcountsPage";
import SearchBitacoraPage from "./Page/SearchBitacoraPage/SearchBitacoraPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recoverPass" element={<RecoverPassword />} />
        <Route path="/consejos" element={<TipsPage nav={true} />} />
        <Route path="/sobre-nosotros" element={<AboutUsPage />} />
        <Route path="/especies-destacadas" element={<FeaturedSpeciesPage />} />
        {/* Protected Routes */}
        <Route
          path="/registerUser"
          element={
            <ProtectedRoute ruta={"/login"}>
              <RegisterUser />
            </ProtectedRoute>
          }
        />
        <Route path="/formBitacora" element={<FormBitacora />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute ruta={"/login"}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/:userId"
          element={
            <ProtectedRoute ruta={"/login"}>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/file/:idbitacora"
          element={
            <ProtectedRoute ruta={"/login"}>
              <File />
            </ProtectedRoute>
          }
        />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/gestionarCuentas" element={<ManageAcountsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil/:userId" element={<ProfilePage />}></Route>
        <Route path="/file/:idbitacora" element={<File />} />
        <Route path="/crearBitacora" />
        <Route
          path="/buscarBitacora"
          element={<SearchBitacoraPage></SearchBitacoraPage>}
        />
      </Routes>
    </Router>
  );
}

export default App;

/* eslint-disable no-unused-vars */
//Importando modulos de FireBase
import "./App.css";
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
    <div>{usuario ? <Home correoUsuario={usuario.email} /> : <Login />}</div>
  );
}

export default App;

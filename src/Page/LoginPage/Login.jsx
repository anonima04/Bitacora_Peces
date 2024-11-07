/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import imgLogin from "./img/img-login.png";
import imgLogo from "./img/LogoPag.png";
import appFireBase from "../../Firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
const auth = getAuth(appFireBase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const navigate = useNavigate(); // useNavigate debe estar dentro del componente
  // const { login } = useAuth();

  const functAutenticacion = async (e) => {
    e.preventDefault(); // Evitar recargue de página
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    // alert("Correo: " + correo + " | Contraseña: " + contraseña);

    try {
      if (registrando) {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        alert("Registro exitoso");
        navigate("/registerUser"); // Redirige después del registro exitoso
      } else {
        const user = await signInWithEmailAndPassword(auth, correo, contraseña);
        alert("Inicio de sesión exitoso");
        user.user.password = contraseña;
        // login();
        navigate("/home"); // Redirige después del inicio de sesión exitoso
      }
    } catch (error) {
      if (correo !== "" && contraseña !== "") {
        alert("El correo o la contraseña son incorrectos");
      } else {
        alert("Completar campos vacíos");
      }
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="div-form">
          <img src={imgLogo} alt="Imagen Logo Pagina" id="img-logoPag" />

          <form onSubmit={functAutenticacion} className="form-login">
            <h4 className="text">Correo</h4>
            <input type="email" id="email" placeholder="Ingresar Correo" />
            <h4 className="text">Contraseña</h4>
            <input
              type="password"
              id="password"
              placeholder="Ingresar Contraseña"
            />
            <button className="btn1 btn">
              {registrando ? "Registrate" : "Iniciar Sesion"}
            </button>
          </form>

          <h4 className="text2 text">
            {registrando ? "¿ Ya tienes cuenta ?" : " ¿ No tienes cuenta ?"}
            <button
              className="btn2 btn"
              onClick={() => {
                setRegistrando(!registrando);
              }}
            >
              {registrando ? "Iniciar Sesion" : "Registrate"}
            </button>
          </h4>

          <Link to="/recoverPass" id="link-RecContra">
            {registrando ? "" : "¿ Has olvidado la contraseña ?"}
          </Link>
        </div>
        <div className="div-imgLogin">
          <img src={imgLogin} alt="Imagen Login" id="img-login" />
        </div>
      </div>
    </>
  );
};

export default Login;

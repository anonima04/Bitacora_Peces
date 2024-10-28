/* eslint-disable react-hooks/rules-of-hooks */
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

  const functAutenticacion = async (e) => {
    e.preventDefault(); // Evitar recargue de página
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    alert("Correo: " + correo + " | Contraseña: " + contraseña);

    try {
      if (registrando) {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        alert("Registro exitoso");
        navigate("/registerUser"); // Redirige después del registro exitoso
      } else {
        const user = await signInWithEmailAndPassword(auth, correo, contraseña);
        alert("Inicio de sesión exitoso");
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

// const images = [
//   "https://img.freepik.com/foto-gratis/fondo-natural-lago-peces-colores_501050-118.jpg",
//   "https://st2.depositphotos.com/45239516/44388/i/450/depositphotos_443882360-stock-photo-goldfish-water-pond-park.jpg",
//   "https://static.wixstatic.com/media/0ba5c5_39741a10d9894a9aaba5387d6fa7fe75~mv2.jpg/v1/fill/w_602,h_339,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/morelia_foto1.jpg",
//   "https://img.freepik.com/foto-gratis/lindo-pez-agua_23-2150699367.jpg",
//   "https://img.freepik.com/fotos-premium/trucha-arroyo-pez-agua-exuberante-naturaleza-ia-generativa_853901-1863.jpg",
//   "https://cdn.pixabay.com/video/2022/05/31/118756-715736002_tiny.jpg",
//   "https://img.freepik.com/foto-gratis/lindo-pez-agua_23-2150699267.jpg?semt=ais_hybrid",
//   "https://c4.wallpaperflare.com/wallpaper/682/597/199/animales-arrecife-coral-peces-wallpaper-preview.jpg",
//   "https://portalefood.com.br/wp-content/uploads/2023/08/iStock-630068832-scaled.jpeg",
// ];

export default Login;

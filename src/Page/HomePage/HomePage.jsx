/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import appFireBase from "../../Firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import AutoplayCarousels from "../../Components/AutoplayCarousels/AutoplayCarousels";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
const auth = getAuth(appFireBase);

const HomePage = ({ correoUsuario }) => {
  return (
    <div>
      {/* <h2 className="text-center">
        Bienvenido usuario: {correoUsuario}{" "}
        <button
          className="btn btn-primary"
          onClick={() => {
            signOut(auth); //Cerramos Sesion, redirige a Login
          }}
        >
          Logout
        </button>
      </h2> */}
      <NavBar></NavBar>
      <AutoplayCarousels></AutoplayCarousels>
      <Footer></Footer>
      <button
        onClick={() => {
          signOut(auth);
          window.location.href = "/sobre-nosotros";
        }}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default HomePage;

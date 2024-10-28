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

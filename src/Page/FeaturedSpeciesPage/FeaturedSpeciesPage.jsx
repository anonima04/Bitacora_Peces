// import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./FeaturedSpeciesPage.css";

const FeaturedSpeciesPage = () => {
  return (
    <div id="featured">
      <NavBar />
      <div className="featured-species-section">
        <h1>Especies Destacadas</h1>
        <div className="species-list">
          <div className="species-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/pez%20dorado.avif?alt=media&token=431eb62a-57c2-46e3-af00-4cc7b0d6b47a"
              alt="Pez Dorado"
            />
            <h2>Pez Dorado</h2>
            <p>
              El Pez Dorado es uno de los peces de acuario más populares y
              conocidos. Es fácil de cuidar y puede vivir en una amplia gama de
              condiciones.
            </p>
          </div>
          <div className="species-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/pez%20disco.jpg?alt=media&token=8643c8a9-9b7c-4afa-8054-546081be0675"
              alt="Pez Disco"
            />
            <h2>Pez Disco</h2>
            <p>
              El Pez Disco es famoso por sus colores vibrantes y su forma
              redonda. Requiere un cuidado específico y es mejor para acuaristas
              experimentados.
            </p>
          </div>
          <div className="species-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/pez%20betta.jpg?alt=media&token=ae9c7b7c-c3f0-4c74-b236-563ab76aebd6"
              alt="Pez Betta"
            />
            <h2>Pez Betta</h2>
            <p>
              El Pez Betta es conocido por su comportamiento agresivo y sus
              aletas llamativas. Puede vivir solo en un acuario pequeño o con
              compañeros compatibles.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedSpeciesPage;

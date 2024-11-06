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
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/Lavanda.webp?alt=media&token=901be920-1993-44a5-a488-75da3ec3c6f7"
              alt="Lavanda"
            />
            <h2>Lavanda</h2>
            <p>
              La lavanda es una planta perteneciente a la familia Lamiaceae.
              Esta planta es originaria de la región mediterránea, pero se ha
              cultivado en diversas partes del mundo debido a sus múltiples
              beneficios y su fragancia distintiva.
            </p>
          </div>
          <div className="species-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/ceriman.webp?alt=media&token=95f4bd0c-3273-41a3-822f-a55f9452b7a15"
              alt="Ceriman"
            />
            <h2>Ceriman</h2>
            <p>
              Es una planta trepadora originaria de las selvas tropicales de
              América Central, desde el sur de México hasta el norte de
              Argentina.
            </p>
          </div>
          <div className="species-item planta3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/lengua%20de%20suegra.jpg?alt=media&token=a2131d8e-ae64-4b04-93e1-98e4315727d3"
              alt="Lengua de suegra"
            />
            <h2>Lengua de suegra</h2>
            <p>
              La lengua de suegra, es una planta de interior popular y
              resistente, conocida por su capacidad para purificar el aire,
              eliminando toxinas como el formaldehído y el benceno.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedSpeciesPage;

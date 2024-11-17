// import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./FeaturedSpeciesPage.css";

const FeaturedSpeciesPage = () => {
  return (
    <div>
      <NavBar />
      <div className="featured-species-section">
        <h1>Especies Destacadas</h1>
        <div className="species-list">
          <div className="species-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/Imgs_HomePage%2FPlanta_Lavanda.png?alt=media&token=dfd7b9be-ddbc-4d1d-8350-330bfebc5d26"
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
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/Imgs_HomePage%2FPlanta_Ceriman.webp?alt=media&token=f2cb9e97-6eca-4deb-9d79-fe84d5590fee"
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
              src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/Imgs_HomePage%2FPlanta_LenguaSuegra.png?alt=media&token=aa944145-bf80-4349-aae5-84919555b746"
              alt="LenguaSuegra"
            />
            <h2>Lengua de suegra</h2>
            <p>
              La lengua de suegra, es una planta de interior popular y
              resistente, conocida por su capacidad para purificar el aire,
              eliminando toxinas como el formaldehído y el benceno.
            </p>

            <div id="featured">
              <div className="featured-species-section">
                <h1>Especies Destacadas</h1>
                <div className="species-list">
                  <div className="species-item">
                    <img src="" alt="Lavanda" />
                    <h2>Lavanda</h2>
                    <p>
                      La lavanda es una planta perteneciente a la familia
                      Lamiaceae. Esta planta es originaria de la región
                      mediterránea, pero se ha cultivado en diversas partes del
                      mundo debido a sus múltiples beneficios y su fragancia
                      distintiva.
                    </p>
                  </div>
                  <div className="species-item">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/ceriman.webp?alt=media&token=95f4bd0c-3273-41a3-822f-a55f9452b7a15"
                      alt="Ceriman"
                    />
                    <h2>Ceriman</h2>
                    <p>
                      Es una planta trepadora originaria de las selvas
                      tropicales de América Central, desde el sur de México
                      hasta el norte de Argentina.
                    </p>
                  </div>
                  <div className="species-item">
                    <img
                      src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUYWKWNBE4ZOO1Km41mdhs4FJQ6LM9YSyRVwR43Wnb9lReLBQl"
                      alt="Lengua de suegra"
                    />
                    <h2>Lengua de suegra</h2>
                    <p>
                      La lengua de suegra, es una planta de interior popular y
                      resistente, conocida por su capacidad para purificar el
                      aire, eliminando toxinas como el formaldehído y el
                      benceno.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpeciesPage;

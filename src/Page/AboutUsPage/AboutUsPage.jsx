// import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div id="about">
      <NavBar />
      <div className="header-about">
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenidos a Bitácora de Plantas, la plataforma definitiva para los
          entusiastas de las plantas y flores. Nuestra misión es proporcionar un
          espacio donde los amantes de las plantas puedan documentar, compartir
          y aprender sobre el cuidado de sus amigos las plantas.
        </p>
      </div>

      <div className="cards-container">
        <div className="card mission">
          <div className="icon">🌱</div>
          <h2>Nuestra Misión</h2>
          <p>
            Facilitar el registro y seguimiento de la salud, comportamiento y
            condiciones del hábitat de las plantas.
          </p>
        </div>

        <div className="card services">
          <div className="icon">📚</div>
          <h2>¿Qué Ofrecemos?</h2>
          <ul>
            <li>
              <strong>Bitácoras Personalizadas:</strong> Crea y personaliza tus
              bitácoras para documentar cada detalle de tus plantas y flores.
            </li>
            <li>
              <strong>Recursos Educativos:</strong> Accede a artículos, videos y
              guías sobre el cuidado de plantas.
            </li>
            <li>
              <strong>Comunidad:</strong> Únete a una comunidad de entusiastas.
            </li>
          </ul>
        </div>

        <div className="card team">
          <div className="icon">👨‍🔬</div>
          <h2>Nuestro Equipo</h2>
          <p>
            Estamos formados por un equipo de biólogos y desarrolladores
            apasionados por la vida y la tecnología.
          </p>
        </div>

        <div className="card contact">
          <div className="icon">📬</div>
          <h2>Contacto</h2>
          <p>
            ¿Tienes alguna pregunta o sugerencia? Contáctanos en{" "}
            <strong>info@bitacoradeplantas.com</strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;

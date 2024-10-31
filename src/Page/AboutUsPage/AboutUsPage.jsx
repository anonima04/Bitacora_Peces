// import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div id="div-background-about">
      <NavBar />
      <div id="about">
        <div className="about-us-section">
          <h1>Sobre Nosotros</h1>
          <p>
            Bienvenidos a Bitácora de Plantas, la plataforma definitiva para los
            entusiastas de las plantas y flores. Nuestra misión es proporcionar
            un espacio donde los amantes de las plantas puedan documentar,
            compartir y aprender sobre el cuidado de sus amigos las plantas.
          </p>
          <h2>Nuestra Misión</h2>
          <p>
            Facilitar el registro y seguimiento de la salud, comportamiento y
            condiciones del hábitat de las plantas, proporcionando herramientas
            y recursos que ayuden a mejorar la calidad de vida de tus plantas.
          </p>
          <h2>¿Qué Ofrecemos?</h2>
          <ul>
            <li>
              <strong>Bitácoras Personalizadas:</strong> Crea y personaliza tus
              bitácoras para documentar cada detalle de tus plantas y flores.
            </li>
            <li>
              <strong>Recursos Educativos:</strong> Accede a artículos, videos y
              guías sobre el cuidado de plantas y el mantenimiento de tu jardin.
            </li>
            <li>
              <strong>Comunidad:</strong> Únete a una comunidad de entusiastas
              que comparten tus mismos intereses y pasiones.
            </li>
          </ul>
          <h2>Nuestro Equipo</h2>
          <p>
            Estamos formados por un equipo de biólogos y desarrolladores
            apasionados por la vida y la tecnología. Trabajamos continuamente
            para mejorar nuestra plataforma y ofrecerte la mejor experiencia
            posible.
          </p>
          <h2>Contacto</h2>
          <p className="contact-info">
            ¿Tienes alguna pregunta o sugerencia? No dudes en ponerte en
            contacto con nosotros a través de nuestro correo electrónico:{" "}
            <strong>info@bitacoradeplantas.com</strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;

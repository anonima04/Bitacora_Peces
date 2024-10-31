// import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import './TipsPage.css';

const TipsPage = () => {
  return (
    <div className="tips-page">
      <NavBar />
      <div id='tips-page-margin'>
      <div className="tips-content">
        <h1>Consejos para crear una buena Bitácora de Plantas</h1>
        <div className="tip">
          <h2>1. Registro Detallado</h2>
          <p>Incluye detalles precisos sobre cada planta, como su especie, tamaño, comportamiento y condiciones de la tierra.</p>
        </div>
        <div className="tip">
          <h2>2. Fotografía Regular</h2>
          <p>Documenta el crecimiento y cambios en tus plantas con fotos regulares. Esto te ayudará a identificar cualquier problema temprano.</p>
        </div>
        <div className="tip">
          <h2>3. Control de Parámetros de la Tierra</h2>
          <p>Registra parámetros esenciales de la tierra como pH, la materia orgánica y textura. Mantén un historial de estos valores.</p>
        </div>
        <div className="tip">
          <h2>4. Observaciones de Comportamiento</h2>
          <p>Anota cualquier comportamiento inusual. Cambios en el crecimiento o en el color de las raíces pueden ser signos de problemas.</p>
        </div>
        <div className="tip">
          <h2>5. Registro de Hidratación</h2>
          <p>Lleva un registro de lo que alimentas a tus plantas y con qué frecuencia. Esto ayuda a evitar la sobrehidratación y a detectar preferencias de hidratación.</p>
        </div>
        <div className="tip">
          <h2>6. Uso de Tecnología</h2>
          <p>Utiliza aplicaciones o herramientas digitales para facilitar el seguimiento y la actualización de tu bitácora.</p>
        </div>
        <div className="tip">
          <h2>7. Colaboración con la Comunidad</h2>
          <p>Comparte tu bitácora con otros entusiastas de las plantas. Esto puede proporcionarte valiosos consejos y apoyo.</p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TipsPage;

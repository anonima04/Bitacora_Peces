// import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import './TipsPage.css';

const TipsPage = () => {
  return (
    <>
    <div className="tips-page">
      <NavBar />
      <div className="tips-content">
        <h1>Consejos para crear una buena Bitácora de Peces</h1>
        <div className="tip">
          <h2>1. Registro Detallado</h2>
          <p>Incluye detalles precisos sobre cada pez, como su especie, tamaño, comportamiento y condiciones del agua.</p>
        </div>
        <div className="tip">
          <h2>2. Fotografía Regular</h2>
          <p>Documenta el crecimiento y cambios en tus peces con fotos regulares. Esto te ayudará a identificar cualquier problema temprano.</p>
        </div>
        <div className="tip">
          <h2>3. Control de Parámetros del Agua</h2>
          <p>Registra parámetros esenciales del agua como pH, temperatura, y niveles de amoníaco. Mantén un historial de estos valores.</p>
        </div>
        <div className="tip">
          <h2>4. Observaciones de Comportamiento</h2>
          <p>Anota cualquier comportamiento inusual. Cambios en la actividad o alimentación pueden ser signos de problemas.</p>
        </div>
        <div className="tip">
          <h2>5. Registro de Alimentación</h2>
          <p>Lleva un registro de lo que alimentas a tus peces y con qué frecuencia. Esto ayuda a evitar la sobrealimentación y a detectar preferencias alimenticias.</p>
        </div>
        <div className="tip">
          <h2>6. Uso de Tecnología</h2>
          <p>Utiliza aplicaciones o herramientas digitales para facilitar el seguimiento y la actualización de tu bitácora.</p>
        </div>
        <div className="tip">
          <h2>7. Colaboración con la Comunidad</h2>
          <p>Comparte tu bitácora con otros entusiastas de los peces. Esto puede proporcionarte valiosos consejos y apoyo.</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default TipsPage;

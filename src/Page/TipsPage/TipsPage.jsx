/* eslint-disable react/prop-types */
// import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./TipsPage.css";

const TipsPage = ({ nav }) => {
  return (
    <>
      {nav && <NavBar />}
      <div className="tips-page">
        <h1 id="titulo-consejos">
          Consejos para crear una buena Bitácora de Plantas
        </h1>
        <div className="tips-content">
          <div className="tip">
            <img
              src="https://img.freepik.com/vector-gratis/gran-conjunto-flores-colores-sobre-rocas-madera_1308-33900.jpg?t=st=1730831622~exp=1730835222~hmac=7194d83eca9d97b6d337236af3c3908df0ca25b848a80287df753225d26cbd98&w=826"
              alt="Registro Detallado"
            />
            <div>
              <h2>1. Registro Detallado</h2>
              <p>
                Incluye detalles precisos sobre cada planta, como su especie,
                tamaño, comportamiento y condiciones de la tierra.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/foto-gratis/retrato-mujer-sosteniendo-dispositivo-tomando-fotos-dia-mundial-fotografia_23-2151704398.jpg?t=st=1730862725~exp=1730866325~hmac=fd392b87329dac517a63aaa52b396af64c7397a8546ebe07995e23396cc8f18d&w=826"
              alt="Fotografía Regular"
            />
            <div>
              <h2>2. Fotografía Regular</h2>
              <p>
                Documenta el crecimiento y cambios en tus plantas con fotos
                regulares. Esto te ayudará a identificar cualquier problema
                temprano.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/foto-gratis/flat-lay-planta-copyspace_23-2148198702.jpg?t=st=1730831927~exp=1730835527~hmac=c0c3109b508de688c30822dd78501f542e41625bbf896805b332b4a6ebb1a643&w=826"
              alt="Control de Parámetros de la Tierra"
            />
            <div>
              <h2>3. Control de Parámetros de la Tierra</h2>
              <p>
                Registra parámetros esenciales de la tierra como pH, materia
                orgánica, y textura. Mantén un historial de estos valores.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/foto-gratis/nino-aprendiendo-plantar-arbol_23-2148943276.jpg?t=st=1730832007~exp=1730835607~hmac=46c6a84a3ed5595f60e07539fe316cb3f202b443a391e899b168073ee970cb2e&w=826"
              alt="Observaciones de Comportamiento"
            />
            <div>
              <h2>4. Observaciones de Comportamiento</h2>
              <p>
                Anota cualquier comportamiento inusual. Cambios en el
                crecimiento o en el color de las raíces pueden ser signos de
                problemas.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/fotos-premium/abono-liquido-plantulas-cuidados-primavera-plantas-energia-crecimiento-plantas_158388-624.jpg?w=826"
              alt="Registro de Hidratación"
            />
            <div>
              <h2>5. Registro de Hidratación</h2>
              <p>
                Lleva un registro de lo que alimentas a tus plantas y con qué
                frecuencia. Esto ayuda a evitar la sobrehidratación y a detectar
                preferencias de hidratación.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/foto-gratis/equipo-multietnico-que-analiza-muestra-carne-biologica-que-trabaja-experimento-bioquimica-que-discute-experiencia-medica-laboratorio-hospital-biologos-diversidad-que-investigan-alimentos-modificados-geneticamente_482257-29955.jpg?t=st=1730832199~exp=1730835799~hmac=a6b9b37e8b1a51c26ae875058ee27cdb05d724a2873d5241447f2d236aa2efad&w=826"
              alt="Uso de Tecnología"
            />
            <div>
              <h2>6. Uso de Tecnología</h2>
              <p>
                Utiliza aplicaciones o herramientas digitales para facilitar el
                seguimiento y la actualización de tu bitácora.
              </p>
            </div>
          </div>

          <div className="tip">
            <img
              src="https://img.freepik.com/fotos-premium/nota-libro-hoja-verde-sobre-fondo-blanco-aislado_52253-1430.jpg?w=826"
              alt="Colaboración con la Comunidad"
            />
            <div>
              <h2>7. Colaboración con la Comunidad</h2>
              <p>
                Comparte tu bitácora con otros entusiastas de las plantas. Esto
                puede proporcionarte valiosos consejos y apoyo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
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

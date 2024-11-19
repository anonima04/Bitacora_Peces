import PropTypes from "prop-types";
import "./ResultByTitle.css"; // Asegúrate de tener este archivo CSS para los estilos
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../../Firebase/firebase"; // Importa tu configuración de Firebase
import { useState } from "react";

const ResultByTitle = ({ busqueda }) => {
  const [resultados, setResultados] = useState(busqueda);
  if (!busqueda || busqueda.length === 0) {
    return <p className="no-results">No se encontraron resultados</p>;
  }

  const EliminarBitacora = async (idBitacora, muestreos) => {
    try {
      if (muestreos && muestreos.length > 0) {
        alert(
          "No se puede eliminar la bitácora porque tiene muestreos asociados."
        );
        return;
      }
      // Eliminar la bitácora de la colección BITACORA
      await deleteDoc(doc(db, "BITACORA", idBitacora));

      // Actualizar el estado de los resultados
      setResultados(resultados.filter((item) => item.id !== idBitacora));

      alert("Bitácora eliminada con éxito.");
    } catch (error) {
      console.error("Error eliminando la bitácora:", error);
      alert("Error al eliminar la bitácora.");
    }
  };

  // Función para eliminar un muestreo
  const EliminarMuestreo = async (idMuestreo, especies, idBitacora) => {
    try {
      if (especies && especies.length > 0) {
        alert(
          "No se puede eliminar el muestreo porque tiene especies asociadas."
        );
        return;
      }
      // Eliminar el muestreo de la colección MUESTREO
      await deleteDoc(doc(db, "MUESTREO", idMuestreo));

      // Eliminar el muestreo de la bitácora (usando el id de la bitácora)
      const bitacoraRef = doc(db, "BITACORA", idBitacora);
      await updateDoc(bitacoraRef, {
        muestreos: arrayRemove(idMuestreo),
      });

      // Actualizar los muestreos en el estado
      setResultados((prevResults) =>
        prevResults.map((item) =>
          item.id === idBitacora
            ? {
                ...item,
                muestreos: item.muestreos.filter(
                  (muestreo) => muestreo.id !== idMuestreo
                ),
              }
            : item
        )
      );

      alert("Muestreo eliminado con éxito.");
    } catch (error) {
      console.error("Error eliminando el muestreo:", error);
      alert("Error al eliminar el muestreo.");
    }
  };

  // Función para eliminar una especie de un muestreo
  const EliminarEspecie = async (idMuestreo, idEspecie) => {
    try {
      const muestreoRef = doc(db, "MUESTREO", idMuestreo);
      await updateDoc(muestreoRef, {
        ESPECIES: arrayRemove(idEspecie),
      });

      // Eliminar la especie de la colección ESPECIE
      await deleteDoc(doc(db, "ESPECIE", idEspecie));

      // Actualizar las especies en el estado
      setResultados((prevResults) =>
        prevResults.map((item) => ({
          ...item,
          muestreos: item.muestreos.map((muestreo) =>
            muestreo.id === idMuestreo
              ? {
                  ...muestreo,
                  especies: muestreo.especies.filter(
                    (especie) => especie.id !== idEspecie
                  ),
                }
              : muestreo
          ),
        }))
      );

      alert(
        `Especie con ID ${idEspecie} eliminada del muestreo ${idMuestreo}.`
      );
    } catch (error) {
      console.error("Error eliminando la especie:", error);
      alert("Error al eliminar la especie.");
    }
  };
  if (!resultados || resultados.length === 0) {
    return <p className="no-results">No se encontraron resultados</p>;
  }

  return (
    <div className="results-wrapper">
      {busqueda.map((item) => (
        <div key={item.id} className="result-item">
          {/* Botón para eliminar la bitácora */}

          <button
            className="delete-bitacora"
            onClick={() => EliminarBitacora(item.id, item.muestreos)}
          >
            Eliminar Bitácora
          </button>

          <div className="result-header">
            <h2 className="result-title">{item.TITULO}</h2>
            <p className="result-description">
              <strong>Descripción: </strong>
              {item.DESCRIPCION}
            </p>
            <p className="result-date">
              <strong>Fecha de creación:</strong> {item.FECHA_CREACION}
            </p>
          </div>

          <div className="muestreos-container">
            <h3 className="muestreos-header">Muestreos</h3>
            {item.muestreos && item.muestreos.length > 0 ? (
              item.muestreos.map((muestreo) => (
                <div key={muestreo.id} className="muestreo-card">
                  {/* Botón para eliminar el muestreo */}
                  <button
                    className="delete-muestreo"
                    onClick={() =>
                      EliminarMuestreo(muestreo.id, muestreo.especies, item.id)
                    }
                  >
                    Eliminar Muestreo
                  </button>

                  <p className="muestreo-info">
                    <strong>Observaciones:</strong> {muestreo.OBSERVACION}
                  </p>
                  <p className="muestreo-info">
                    <strong>Descripción de hábitat:</strong>{" "}
                    {muestreo.DESCRIPCION_HABITAD}
                  </p>
                  <p className="muestreo-info">
                    <strong>Condiciones climáticas:</strong>{" "}
                    {muestreo.CONDICION_CLIMATICA}
                  </p>
                  <p className="muestreo-info">
                    <strong>Fecha de creación:</strong>{" "}
                    {muestreo.FECHA_CREACION}
                  </p>
                  <p className="muestreo-info">
                    <strong>Localización geográfica: </strong>
                    {muestreo.LOCALIZACION_GEOGRAFICA.lat}{" "}
                    {muestreo.LOCALIZACION_GEOGRAFICA.lng}
                  </p>

                  {muestreo.especies && muestreo.especies.length > 0 ? (
                    <div className="especies-section">
                      <h4 className="especies-title">Especies</h4>
                      {muestreo.especies.map((especie) => (
                        <div key={especie.id} className="especie-card">
                          {/* Botón para eliminar una especie */}
                          <button
                            className="delete-especie"
                            onClick={() =>
                              EliminarEspecie(muestreo.id, especie.id)
                            }
                          >
                            Eliminar Especie
                          </button>

                          <p className="especie-name">
                            <strong>Nombre científico:</strong>{" "}
                            {especie.NOMBRE_CIENTIFICO}
                          </p>
                          <p className="especie-common-name">
                            <strong>Nombre común:</strong>{" "}
                            {especie.NOMBRE_COMUN}
                          </p>
                          <p className="especie-family">
                            <strong>Familia:</strong> {especie.FAMILIA}
                          </p>
                          <p className="especie-state">
                            <strong>Estado:</strong> {especie.ESTADO}
                          </p>
                          <p className="especie-sample-count">
                            <strong>Cantidad de muestras: </strong>
                            {especie.CANT_MUESTRA}
                          </p>

                          {especie.FOTOGRAFIAS &&
                          especie.FOTOGRAFIAS.length > 0 ? (
                            <div className="especie-photos">
                              {especie.FOTOGRAFIAS.map((foto, index) => (
                                <img
                                  key={index}
                                  src={foto}
                                  alt={`Fotografía ${index + 1}`}
                                  onError={(e) =>
                                    (e.target.style.display = "none")
                                  }
                                  className="especie-photo"
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="no-photos">
                              No se encontraron fotos para esta especie
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-especies">No se encontraron especies</p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-muestreos">No se encontraron muestreos</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

ResultByTitle.propTypes = {
  busqueda: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      TITULO: PropTypes.string,
      DESCRIPCION: PropTypes.string,
      FECHA_CREACION: PropTypes.string,
      muestreos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          OBSERVACION: PropTypes.string,
          DESCRIPCION_HABITAD: PropTypes.string,
          CONDICION_CLIMATICA: PropTypes.string,
          FECHA_CREACION: PropTypes.string,
          LOCALIZACION_GEOGRAFICA: PropTypes.shape({
            lat: PropTypes.string,
            lng: PropTypes.string,
          }),
          especies: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              NOMBRE_CIENTIFICO: PropTypes.string,
              NOMBRE_COMUN: PropTypes.string,
              FAMILIA: PropTypes.string,
              ESTADO: PropTypes.string,
              CANT_MUESTRA: PropTypes.number,
              FOTOGRAFIAS: PropTypes.arrayOf(PropTypes.string),
            })
          ),
        })
      ),
    })
  ),
};

export default ResultByTitle;

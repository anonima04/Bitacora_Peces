import PropTypes from "prop-types";
// import './ResultByTitle.css';  // Asegúrate de tener este archivo CSS para los estilos
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db} from "../../../../Firebase/firebase"; // Importa tu configuración de Firebase
import { useState } from "react";

// // Método para editar una bitácora
// const editarBitacora = async (idBitacora, cambios) => {
//   const bitacoraRef = doc(db, "BITACORA", idBitacora);

//   try {
//     await updateDoc(bitacoraRef, cambios); // "cambios" es un objeto con los campos a actualizar
//     alert("Bitácora actualizada con éxito.");
//   } catch (error) {
//     console.error("Error al actualizar la bitácora:", error);
//     alert("Hubo un error al actualizar la bitácora.");
//   }
// };

// const EditarMuestreo = async (idMuestreo, cambios) => {
//   const bitacoraRef = doc(db, "MUESTREO", idMuestreo);

//   try {
//     await updateDoc(bitacoraRef, cambios); // "cambios" es un objeto con los campos a actualizar
//     alert("Muestreo actualizada con éxito.");
//   } catch (error) {
//     console.error("Error al actualizar la muestreo:", error);
//     alert("Hubo un error al actualizar la muestreo.");
//   }
// };



// const editarEspecie = async (idMuestreo, idEspecie, campo, nuevoValor) => {
//   const muestreoRef = doc(db, "MUESTREO", idMuestreo);

//   try {
//     const muestreoDoc = await getDoc(muestreoRef);
//     const especies = muestreoDoc.data().ESPECIES;

//     const especieIndex = especies.findIndex(
//       (especie) => especie.id === idEspecie
//     );
//     if (especieIndex > -1) {
//       especies[especieIndex][campo] = nuevoValor;

//       await updateDoc(muestreoRef, {
//         ESPECIES: especies,
//       });

//       alert("Especie actualizada con éxito.");
//     }
//   } catch (error) {
//     console.error("Error al actualizar la especie:", error);
//     alert("Hubo un error al actualizar la especie.");
//   }
// };

const ResultByDate = ({ busqueda }) => {
  const [resultados, setResultados] = useState(busqueda);
  if (!busqueda || busqueda.length === 0) {
    return <p className="no-results">No se encontraron resultados</p>;
  }
  

  // Función para eliminar una bitácora
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
      {resultados.map((item) => (
        <div key={item.id} className="result-item">
          <button
            className="delete-bitacora"
            onClick={() => EliminarBitacora(item.id, item.muestreos)}
          >
            Eliminar Bitácora
          </button>
          {/* <button
            className="delete-bitacora"
            onClick={() => editarBitacora(item.id, item.muestreos)}
          >
            Editar Bitácora
          </button> */}
          <div className="result-header">
            <h2 className="result-title">{item.TITULO}</h2>
            <p className="result-description">{item.DESCRIPCION}</p>
            <p className="result-date">
              Fecha de creación: {item.FECHA_CREACION}
            </p>
          </div>

          <div className="muestreos-container">
            <h3 className="muestreos-header">Muestreos</h3>
            {item.muestreos && item.muestreos.length > 0 ? (
              item.muestreos.map((muestreo, index) => (
                <div key={index} className="muestreo-card">
                  <button
                    className="delete-muestreo"
                    onClick={() =>
                      EliminarMuestreo(muestreo.id, muestreo.especies, item.id)
                    }
                  >
                    Eliminar Muestreo
                  </button>
                  {/* <button
                    className="delete-bitacora"
                    onClick={() => EditarMuestreo(item.id, muestreo.id)}
                  >
                    Editar Muestreo
                  </button> */}
                  <p className="muestreo-info">
                    Observaciones: {muestreo.OBSERVACION}
                  </p>
                  <p className="muestreo-info">
                    Descripción de hábitat: {muestreo.DESCRIPCION_HABITAD}
                  </p>
                  <p className="muestreo-info">
                    Condiciones climáticas: {muestreo.CONDICION_CLIMATICA}
                  </p>
                  <p className="muestreo-info">
                    Fecha de creación: {muestreo.FECHA_CREACION}
                  </p>
                  <p className="muestreo-info">
                    Localización geográfica:{" "}
                    {muestreo.LOCALIZACION_GEOGRAFICA.lat}{" "}
                    {muestreo.LOCALIZACION_GEOGRAFICA.lng}
                  </p>

                  {muestreo.especies && muestreo.especies.length > 0 ? (
                    <div className="especies-section">
                      <h4 className="especies-title">Especies</h4>
                      {muestreo.especies.map((especie, index) => (
                        <div key={index} className="especie-card">
                          <button
                            className="delete-especie"
                            onClick={() =>
                              EliminarEspecie(muestreo.id, especie.id)
                            }
                          >
                            Eliminar Especie
                          </button>
                          {/* <button
                            className="delete-bitacora"
                            onClick={() =>
                              editarEspecie(muestreo.id, especie.id)
                            }
                          >
                            Editar Bitácora
                          </button> */}
                          <p className="especie-name">
                            Nombre científico: {especie.NOMBRE_CIENTIFICO}
                          </p>
                          <p className="especie-common-name">
                            Nombre común: {especie.NOMBRE_COMUN}
                          </p>
                          <p className="especie-family">
                            Familia: {especie.FAMILIA}
                          </p>
                          <p className="especie-state">
                            Estado: {especie.ESTADO}
                          </p>
                          <p className="especie-sample-count">
                            Cantidad de muestras: {especie.CANT_MUESTRA}
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
                                  } // Manejar error si la imagen no carga
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

ResultByDate.propTypes = {
  busqueda: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      TITULO: PropTypes.string,
      DESCRIPCION: PropTypes.string,
      FECHA_CREACION: PropTypes.string,
      muestreos: PropTypes.arrayOf(
        PropTypes.shape({
          OBSERVACION: PropTypes.string,
          DESCRIPCION_HABITAD: PropTypes.string,
          CONDICION_CLIMATICA: PropTypes.string,
          FECHA_CREACION: PropTypes.string,
          LOCALIZACION_GEOGRAFICA: PropTypes.shape({
            lat: PropTypes.string,
            lng: PropTypes.string,
          }).isRequired,
          especies: PropTypes.arrayOf(
            PropTypes.shape({
              NOMBRE_CIENTIFICO: PropTypes.string,
              NOMBRE_COMUN: PropTypes.string,
              FAMILIA: PropTypes.string,
              ESTADO: PropTypes.string,
              CANT_MUESTRA: PropTypes.number.isRequired,
              FOTOGRAFIAS: PropTypes.arrayOf(PropTypes.string),
            })
          ),
        })
      ),
    })
  ),
};

export default ResultByDate;

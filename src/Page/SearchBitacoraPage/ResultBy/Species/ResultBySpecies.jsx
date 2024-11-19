import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Title/ResultByTitle.css";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../../Firebase/firebase";

const ResultBySpecie = ({ busqueda }) => {
  const [speciesData, setSpeciesData] = useState({}); // Almacena los datos de las especies
  const [resultados, setResultados] = useState(busqueda);

  // Estado para controlar la carga de las especies
  const [loadingSpecies, setLoadingSpecies] = useState({});

  // Estado de edición para las especies
  // const [editingSpecies, setEditingSpecies] = useState({});

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

  // Solo cargar los detalles de las especies cuando se haya actualizado la búsqueda
  useEffect(() => {
    const uniqueSpecies = new Set();
    busqueda.forEach((item) => {
      if (item.muestreo && item.muestreo.ESPECIES) {
        item.muestreo.ESPECIES.forEach((id) => uniqueSpecies.add(id));
      }
    });

    // Solo llamar a fetchSpecieDetails para especies no cargadas
    uniqueSpecies.forEach((speciesId) => {
      if (!speciesData[speciesId]) {
        fetchSpecieDetails(speciesId);
      }
    });
  }, [busqueda, speciesData]); // `speciesData` es una dependencia, pero no debe estar directamente en el estado

  // Función para buscar detalles de una especie
  const fetchSpecieDetails = async (especieId) => {
    setLoadingSpecies((prev) => ({ ...prev, [especieId]: true }));
    try {
      const response = await fetch(
        `http://localhost:5000/api/especie/${especieId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSpeciesData((prev) => ({ ...prev, [especieId]: data }));
      } else {
        console.error(
          `Error al obtener datos de la especie con ID ${especieId}`
        );
      }
    } catch (error) {
      console.error("Error al buscar detalles de la especie:", error);
    } finally {
      setLoadingSpecies((prev) => ({ ...prev, [especieId]: false }));
    }
  };

  // Función para habilitar el modo de edición
  // const toggleEditMode = (especieId) => {
  //   setEditingSpecies((prev) => ({
  //     ...prev,
  //     [especieId]: {
  //       ...prev[especieId],
  //       isEditing: !prev[especieId]?.isEditing,
  //     },
  //   }));
  // };

  // Función para guardar los cambios en los datos de la especie
  // const saveEspecieChanges = async (especieId, updatedData) => {
  //   try {
  //     const especieRef = doc(db, "ESPECIE", especieId);
  //     await updateDoc(especieRef, updatedData);

  //     // Actualizar el estado con los nuevos datos
  //     setSpeciesData((prev) => ({
  //       ...prev,
  //       [especieId]: {
  //         ...prev[especieId],
  //         ...updatedData,
  //       },
  //     }));

  //     toggleEditMode(especieId); // Desactivar el modo de edición
  //     alert("Datos de la especie actualizados con éxito.");
  //   } catch (error) {
  //     console.error("Error al actualizar los datos de la especie:", error);
  //     alert("Error al guardar los cambios.");
  //   }
  // };

  if (!busqueda || busqueda.length === 0) {
    return <p className="no-results">No se encontraron resultados</p>;
  }

  return (
    <div className="results-wrapper">
      {busqueda.map((item) => (
        <div key={item.id} className="result-item">
          <button
            className="delete-bitacora"
            onClick={() => EliminarBitacora(item.id, item.muestreos)}
          >
            Eliminar Bitácora
          </button>
          <div className="result-header">
            <h2 className="result-title">{item.TITULO}</h2>
            <p className="result-description">
              <strong>Descripcion: </strong>
              {item.DESCRIPCION}
            </p>
            <p className="result-date">
              <strong>Fecha de creación:</strong> {item.FECHA_CREACION}
            </p>
          </div>

          <div className="muestreos-container">
            <h3 className="muestreos-header">Muestreos</h3>
            {item.muestreo ? (
              <div className="muestreo-card">
                <button
                  className="delete-muestreo"
                  onClick={() =>
                    EliminarMuestreo(
                      item.muestreo.id,
                      item.muestreo.especies,
                      item.id
                    )
                  }
                >
                  Eliminar Muestreo
                </button>
                <p className="muestreo-info">
                  <strong>Observaciones: </strong>
                  {item.muestreo.OBSERVACION}
                </p>
                <p className="muestreo-info">
                  <strong>Descripción de hábitat:</strong>{" "}
                  {item.muestreo.DESCRIPCION_HABITAD}
                </p>
                <p className="muestreo-info">
                  <strong>Condiciones climáticas:</strong>{" "}
                  {item.muestreo.CONDICION_CLIMATICA}
                </p>
                <p className="muestreo-info">
                  <strong>Fecha de creación:</strong>{" "}
                  {item.muestreo.FECHA_CREACION}
                </p>
                <p className="muestreo-info">
                  <strong> Localización geográfica:</strong>{" "}
                  {item.muestreo.LOCALIZACION_GEOGRAFICA.lat},{" "}
                  {item.muestreo.LOCALIZACION_GEOGRAFICA.lng}
                </p>
                <div className="imagenes-container">
                  {item.muestreo.FOTOGRAFIAS &&
                  item.muestreo.FOTOGRAFIAS.length > 0 ? (
                    item.muestreo.FOTOGRAFIAS.map((foto, idx) => (
                      <img
                        key={idx}
                        src={foto}
                        alt={`Foto ${idx}`}
                        className="foto"
                      />
                    ))
                  ) : (
                    <p>No hay fotos disponibles</p>
                  )}
                </div>
                <div className="especies-container">
                  <h4>Especies:</h4>
                  {item.muestreo.ESPECIES &&
                  item.muestreo.ESPECIES.length > 0 ? (
                    item.muestreo.ESPECIES.map((especieId) => {
                      const especieData = speciesData[especieId];
                      return (
                        <div className="especie-card" key={especieId}>
                          <button
                            className="delete-especie"
                            onClick={() =>
                              EliminarEspecie(item.muestreo.id, especieId)
                            }
                          >
                            Eliminar Especie
                          </button>

                          {especieData ? (
                            <>
                              
                              <p>
                                <strong>Nombre común: </strong>
                                {especieData.NOMBRE_COMUN}
                              </p>
                              <p>
                                <strong>Nombre científico: </strong>
                                {especieData.NOMBRE_CIENTIFICO}
                              </p>
                              <p>
                                <strong>Familia: </strong>
                                {especieData.FAMILIA}
                              </p>
                              <p>
                                <strong>Estado: </strong>
                                {especieData.ESTADO}
                              </p>
                              <p>
                                <strong>Cantidad de muestras: </strong>
                                {especieData.CANT_MUESTRA}
                              </p>
                              <div className="imagenes-container">
                                {especieData.FOTOGRAFIAS &&
                                especieData.FOTOGRAFIAS.length > 0 ? (
                                  especieData.FOTOGRAFIAS.map((foto, idx) => (
                                    <img
                                      key={idx}
                                      src={foto}
                                      alt={`Foto ${idx}`}
                                      className="foto"
                                    />
                                  ))
                                ) : (
                                  <p>No hay fotos disponibles</p>
                                )}
                              </div>
                            </>
                          ) : loadingSpecies[especieId] ? (
                            <p>Cargando...</p>
                          ) : (
                            <p>No se encontraron datos para esta especie.</p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p>No hay especies asociadas a este muestreo.</p>
                  )}
                </div>
              </div>
            ) : (
              <p>No se encontraron muestreos para esta bitácora.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

ResultBySpecie.propTypes = {
  busqueda: PropTypes.array.isRequired,
};

export default ResultBySpecie;

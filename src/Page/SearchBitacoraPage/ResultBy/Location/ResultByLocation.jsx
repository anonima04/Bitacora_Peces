import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../../Firebase/firebase"; // Importa tu configuración de Firebase
import PropTypes from "prop-types"; // Asegúrate de importar PropTypes
import "./ResultByLocation.css"; // Estilos personalizados para el componente

const ResultByLocation = ({ busqueda }) => {
  const [resultados, setResultados] = useState(busqueda);
  const [loading, setLoading] = useState(true);
  const [bitacoras, setBitacoras] = useState([]);

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
      setResultados((prevResults) =>
        prevResults.filter((item) => item.id !== idBitacora)
      );

      alert("Bitácora eliminada con éxito.");
    } catch (error) {
      console.error("Error eliminando la bitácora:", error);
      alert("Error al eliminar la bitácora.");
    }
  };
  useEffect(() => {
    if (busqueda) {
      console.log("Datos recibidos de la búsqueda:", busqueda);
      setBitacoras(busqueda);
      setLoading(false);
    }
  }, [busqueda]);

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

  // Al recibir nuevos datos de 'busqueda', actualizamos los estados
  useEffect(() => {
    if (busqueda) {
      setBitacoras(busqueda); // Asignamos los datos de la búsqueda a 'bitacoras'
      setLoading(false);
    }
  }, [busqueda]);

  if (loading) {
    return <CircularProgress />;
  }

  // if (!resultados || resultados.length === 0) {
  //   return <p className="no-results">No se encontraron resultados</p>;
  // }

  return (
    <div className="result-location-container">
      {bitacoras.length > 0 ? (
        bitacoras.map((bitacora) => (
          <div key={bitacora.id} className="bitacora-card">
            {/* -------------------- */}
            <button
              className="delete-bitacora"
              onClick={() => EliminarBitacora(bitacora.id, bitacora.muestreos)}
            >
              Eliminar Bitácora
            </button>
            <h3>{bitacora.TITULO}</h3>
            <p>
              <strong>Descripción: </strong>
              {bitacora.DESCRIPCION}
            </p>
            <p>
              <strong>Fecha de Creación:</strong> {bitacora.FECHA_CREACION}
            </p>
            {/* -------------------- */}
            <button
              className="delete-muestreo"
              onClick={() =>
                EliminarMuestreo(
                  bitacora.muestreo.id,
                  bitacora.muestreo.especies,
                  bitacora.id
                )
              }
            >
              Eliminar Muestreo
            </button>
            <h4>Muestreo</h4>
            <p>
              <strong>Localización geográfica:</strong>{" "}
              {bitacora.muestreo.LOCALIZACION_GEOGRAFICA
                ? `${bitacora.muestreo.LOCALIZACION_GEOGRAFICA.lat}, ${bitacora.muestreo.LOCALIZACION_GEOGRAFICA.lng}`
                : "No disponible"}
            </p>

            <p>
              <strong>Condición Climática:</strong>{" "}
              {bitacora.muestreo.CONDICION_CLIMATICA}
            </p>
            <p>
              <strong>Descripción del Hábitat:</strong>{" "}
              {bitacora.muestreo.DESCRIPCION_HABITAD}
            </p>
            <p>
              <strong>Observaciones:</strong> {bitacora.muestreo.OBSERVACION}
            </p>
            <p>
              <strong>Fecha creación:</strong>{" "}
              {bitacora.muestreo.FECHA_CREACION}
            </p>

            <div className="imagenes-container">
              {bitacora.muestreo.FOTOGRAFIAS &&
              bitacora.muestreo.FOTOGRAFIAS.length > 0 ? (
                bitacora.muestreo.FOTOGRAFIAS.map((foto, idx) => (
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
            {/* -------------------- */}
            <h5>Especies</h5>
            {bitacora.muestreo.especies &&
            bitacora.muestreo.especies.length > 0 ? (
              bitacora.muestreo.especies.map((especie, idx) => (
                <div key={idx} className="especie">
                  <button
                    className="delete-especie"
                    onClick={() =>
                      EliminarEspecie(bitacora.muestreo.id, especie.id)
                    }
                  >
                    Eliminar Especie
                  </button>
                  <p>
                    <strong>Nombre común: </strong>
                    {especie.NOMBRE_COMUN}
                  </p>
                  <p>
                    <strong>Nombre científico: </strong>
                    {especie.NOMBRE_CIENTIFICO}
                  </p>
                  <p>
                    <strong>Familia:</strong> {especie.FAMILIA}
                  </p>
                  <p>
                    <strong>Estado:</strong> {especie.ESTADO}
                  </p>
                  <p>
                    <strong>Cantidad de Muestra:</strong> {especie.CANT_MUESTRA}
                  </p>
                  <div className="imagenes-container">
                    {especie.FOTOGRAFIAS && especie.FOTOGRAFIAS.length > 0 ? (
                      especie.FOTOGRAFIAS.map((foto, idx) => (
                        <img
                          key={idx}
                          src={foto}
                          alt={`Especie Foto ${idx}`}
                          className="foto"
                        />
                      ))
                    ) : (
                      <p>No hay fotos disponibles</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron especies para esta bitácora.</p>
            )}
          </div>
        ))
      ) : (
        <p>No se encontraron resultados para esta ubicación.</p>
      )}
    </div>
  );
};

// Validación de las propiedades que recibe el componente
ResultByLocation.propTypes = {
  busqueda: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      TITULO: PropTypes.string,
      DESCRIPCION: PropTypes.string,
      FECHA_CREACION: PropTypes.string,
      muestreo: PropTypes.shape({
        id: PropTypes.string,
        LOCALIZACION_GEOGRAFICA: PropTypes.shape({
          lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,

          lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        }),
        CONDICION_CLIMATICA: PropTypes.string,
        DESCRIPCION_HABITAD: PropTypes.string,
        OBSERVACION: PropTypes.string,
        FECHA_CREACION: PropTypes.string,
        FOTOGRAFIAS: PropTypes.arrayOf(PropTypes.string),
        especies: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            NOMBRE_COMUN: PropTypes.string,
            NOMBRE_CIENTIFICO: PropTypes.string,
            FAMILIA: PropTypes.string,
            ESTADO: PropTypes.string,
            CANT_MUESTRA: PropTypes.number,
            FOTOGRAFIAS: PropTypes.arrayOf(PropTypes.string),
          })
        ),
      }),
    })
  ),
};

export default ResultByLocation;

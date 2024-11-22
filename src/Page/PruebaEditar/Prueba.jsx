import { useState } from "react";
import PropTypes from "prop-types";
import "./Prueba.css";
import { doc, updateDoc } from "firebase/firestore"; // Importa estas funciones
import { db } from "../../Firebase/firebase";

const Prueba = ({ busqueda }) => {
  const [resultados, setResultados] = useState(busqueda || []); // Asegura que resultados sea un array
  const [titulo, setTitulo] = useState("");  // Para almacenar el título ingresado
  const [editando, setEditando] = useState(null);

  // Función para consultar la API con el título ingresado usando fetch
  const consultarBitacora = async () => {
    if (!titulo) {
      alert("Por favor ingrese un título para buscar.");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/bitacora/bitacoras/titulo/${titulo}`);
      
      if (!response.ok) {
        throw new Error("Error al consultar la API");
      }

      const data = await response.json();
      setResultados(data);  // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error al consultar la API:", error);
      alert("Error al consultar los datos.");
    }
  };

  const handleEditChange = (id, campo, valor, nivel = "bitacora", parentId) => {
    setResultados((prevResults) =>
      prevResults.map((item) => {
        if (item.id === id && nivel === "bitacora") {
          return { ...item, [campo]: valor };
        }
        return item;
      })
    );
  };

  const guardarCambios = async (nivel, id, datos, parentId) => {
    try {
      let ref;
      if (nivel === "bitacora") {
        ref = doc(db, "BITACORA", id);
      }

      await updateDoc(ref, datos);
      alert("Cambios guardados con éxito.");
      setEditando(null);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Error al guardar los cambios.");
    }
  };

  return (
    <div className="results-wrapper">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}  // Captura el título ingresado
        placeholder="Buscar por título"
      />
      <button onClick={consultarBitacora}>Buscar</button>  {/* Botón para hacer la consulta */}

      {/* Verificación de que 'resultados' es un array antes de intentar mapear */}
      {Array.isArray(resultados) && resultados.length > 0 ? (
        resultados.map((item) => (
          <div key={item.id} className="result-item">
            {/* Botón para editar la bitácora */}
            <button
              className="edit-bitacora"
              onClick={() =>
                setEditando(
                  editando === item.id ? null : { nivel: "bitacora", id: item.id }
                )
              }
            >
              {editando?.id === item.id && editando?.nivel === "bitacora"
                ? "Cancelar Edición"
                : "Editar Bitácora"}
            </button>
            {editando?.id === item.id && editando?.nivel === "bitacora" ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={item.TITULO}
                  onChange={(e) =>
                    handleEditChange(
                      item.id,
                      "TITULO",
                      e.target.value,
                      "bitacora"
                    )
                  }
                />
                <textarea
                  value={item.DESCRIPCION}
                  onChange={(e) =>
                    handleEditChange(
                      item.id,
                      "DESCRIPCION",
                      e.target.value,
                      "bitacora"
                    )
                  }
                />
                <button
                  onClick={() =>
                    guardarCambios("bitacora", item.id, {
                      TITULO: item.TITULO,
                      DESCRIPCION: item.DESCRIPCION,
                    })
                  }
                >
                  Guardar Cambios
                </button>
              </div>
            ) : (
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
            )}
          </div>
        ))
      ) : (
        <p>No se encontraron resultados para el título ingresado.</p>
      )}
    </div>
  );
};

Prueba.propTypes = {
  busqueda: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      TITULO: PropTypes.string,
      DESCRIPCION: PropTypes.string,
      FECHA_CREACION: PropTypes.string,
    })
  ),
};

export default Prueba;

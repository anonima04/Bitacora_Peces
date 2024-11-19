import PropTypes from "prop-types";

const onDelete = ({ busqueda, onDeleteBitacora, onDeleteMuestreo, onDeleteEspecie }) => {
  if (!busqueda || busqueda.length === 0) {
    return <p className="no-results">No se encontraron resultados</p>;
  }

  return (
    <div className="results-wrapper">
      {busqueda.map((item) => (
        <div key={item.id} className="result-item">
          <div className="result-header">
            <h2 className="result-title">{item.TITULO}</h2>
            <p className="result-description">{item.DESCRIPCION}</p>
            <p className="result-date">Fecha de creación: {item.FECHA_CREACION}</p>
            <button onClick={() => onDeleteBitacora(item.id)} className="delete-btn">
              Eliminar Bitácora
            </button>
          </div>

          <div className="muestreos-container">
            <h3 className="muestreos-header">Muestreos</h3>
            {item.muestreos && item.muestreos.length > 0 ? (
              item.muestreos.map((muestreo) => (
                <div key={muestreo.id} className="muestreo-card">
                  <button
                    onClick={() => onDeleteMuestreo(muestreo.id)}
                    className="delete-btn"
                  >
                    Eliminar Muestreo
                  </button>
                  <p className="muestreo-info">Observaciones: {muestreo.OBSERVACION}</p>
                  <p className="muestreo-info">Descripción de hábitat: {muestreo.DESCRIPCION_HABITAD}</p>
                  <p className="muestreo-info">Condiciones climáticas: {muestreo.CONDICION_CLIMATICA}</p>
                  <p className="muestreo-info">Fecha de creación: {muestreo.FECHA_CREACION}</p>
                  <p className="muestreo-info">
                    Localización geográfica: {muestreo.LOCALIZACION_GEOGRAFICA.lat},{" "}
                    {muestreo.LOCALIZACION_GEOGRAFICA.lng}
                  </p>

                  {muestreo.especies && muestreo.especies.length > 0 ? (
                    <div className="especies-section">
                      <h4 className="especies-title">Especies</h4>
                      {muestreo.especies.map((especie) => (
                        <div key={especie.id} className="especie-card">
                          <button
                            onClick={() => onDeleteEspecie(especie.id)}
                            className="delete-btn"
                          >
                            Eliminar Especie
                          </button>
                          <p className="especie-name">Nombre científico: {especie.NOMBRE_CIENTIFICO}</p>
                          <p className="especie-common-name">Nombre común: {especie.NOMBRE_COMUN}</p>
                          <p className="especie-family">Familia: {especie.FAMILIA}</p>
                          <p className="especie-state">Estado: {especie.ESTADO}</p>
                          <p className="especie-sample-count">Cantidad de muestras: {especie.CANT_MUESTRA}</p>
                          {especie.FOTOGRAFIAS && especie.FOTOGRAFIAS.length > 0 ? (
                            <div className="especie-photos">
                              {especie.FOTOGRAFIAS.map((foto, index) => (
                                <img
                                  key={index}
                                  src={foto}
                                  alt={`Fotografía ${index + 1}`}
                                  onError={(e) => (e.target.style.display = "none")}
                                  className="especie-photo"
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="no-photos">No se encontraron fotos para esta especie</p>
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

onDelete.propTypes = {
  busqueda: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      TITULO: PropTypes.string.isRequired,
      DESCRIPCION: PropTypes.string.isRequired,
      FECHA_CREACION: PropTypes.string.isRequired,
      muestreos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          OBSERVACION: PropTypes.string.isRequired,
          DESCRIPCION_HABITAD: PropTypes.string.isRequired,
          CONDICION_CLIMATICA: PropTypes.string.isRequired,
          FECHA_CREACION: PropTypes.string.isRequired,
          LOCALIZACION_GEOGRAFICA: PropTypes.shape({
            lat: PropTypes.string.isRequired,
            lng: PropTypes.string.isRequired,
          }).isRequired,
          especies: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              NOMBRE_CIENTIFICO: PropTypes.string.isRequired,
              NOMBRE_COMUN: PropTypes.string.isRequired,
              FAMILIA: PropTypes.string.isRequired,
              ESTADO: PropTypes.string.isRequired,
              CANT_MUESTRA: PropTypes.number.isRequired,
              FOTOGRAFIAS: PropTypes.arrayOf(PropTypes.string),
            })
          ),
        })
      ),
    })
  ),
  onDeleteBitacora: PropTypes.func.isRequired,
  onDeleteMuestreo: PropTypes.func.isRequired,
  onDeleteEspecie: PropTypes.func.isRequired,
};

export default onDelete;

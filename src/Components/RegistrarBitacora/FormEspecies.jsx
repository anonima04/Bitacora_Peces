/* eslint-disable react/prop-types */
import "./FormEspecies.css";
import { getURLFotos, addDocumento } from "../../Firebase/RegisterBitacora";

export const FormEspecies = ({ especies }) => {
  const onSubmitEspecie = async (e) => {
    e.preventDefault();
    const URLFotos = await getURLFotos(
      "Imgs_Especies/",
      e.target.fotosEspecies.files
    );
    const nuevaEspecie = {
      NOMBRE_CIENTIFICO: e.target.nombreCientifico.value,
      NOMBRE_COMUN: e.target.nombreComun.value,
      CANTIDAD_MUESTRAS: e.target.cantidadMuestras.value,
      FAMILIA: e.target.familia.value,
      ESTADO: e.target.estadoPlanta.value,
      FOTOGRAFIAS: URLFotos,
    };
    const documento = await addDocumento("ESPECIE", nuevaEspecie);
    especies((estadoAnterior) => [...estadoAnterior, documento]);
    e.target.reset();
  };

  return (
    <form className="especies-form" onSubmit={onSubmitEspecie}>
      <h2>Detalles de las Especies</h2>
      <div className="divCamposMuestreo">
        <label>Nombre Científico</label>
        <input
          id="nombreCientifico"
          type="text"
          placeholder="Ej: Ficus insipida"
          required
        />
        <label>Nombre Común</label>
        <input
          id="nombreComun"
          type="text"
          placeholder="Ej: Higuerón"
          required
        />
        <label>Familia</label>
        <input id="familia" type="text" placeholder="Ej: Moraceae" required />
        <label>Cantidad de Muestras</label>
        <input
          id="cantidadMuestras"
          type="number"
          min="1"
          defaultValue={0}
          required
        />
        <label>Estado de la Planta</label>
        <select id="estadoPlanta" required>
          <option value="">Seleccione un estado</option>
          <option value="viva">Viva</option>
          <option value="seca">Seca</option>
          <option value="enferma">Enferma</option>
          <option value="muerta">Muerta</option>
        </select>
        <label>Fotografías de la Especie</label>
        <input
          id="fotosEspecies"
          type="file"
          accept="image/*"
          multiple
          required
        />
      </div>
      <div>
        <button id="btnAgregarEspecie">Registrar especie</button>
      </div>
    </form>
  );
};

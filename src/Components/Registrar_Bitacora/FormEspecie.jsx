/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./FormEspecie.css";
import { useRef, useState } from "react";
import {
  getURLFotos,
  agregarMuestreoBitacora,
  addDocumento,
  agregarIdBitacora_Especie,
} from "../../Firebase/RegisterBitacora";

//
const FormEspecie = ({
  formularioMuestreo,
  idBitacora,
  idPersona,
  formEspecie,
  coordenadas,
}) => {
  const formRef = useRef(null); // Referencia al formulario
  const [btnCrearMuestreo, setCrearMuestreo] = useState(false);
  const [btnCrearEspecie, setCrearEspecie] = useState(false);
  const [especies, setEspecies] = useState([]);
  //

  const validarFormulario = () => {
    if (formRef.current.checkValidity()) {
      setCrearEspecie(true);
    } else {
      setCrearEspecie(false);
    }
  };

  const CrearMuestreo = async () => {
    if (formularioMuestreo.current.checkValidity()) {
      const URLFotos = await getURLFotos(
        "Imgs_LugarMuestreo/",
        formularioMuestreo.current.fotografias.files
      );

      const muestreo = {
        CONDICIONES_CLIMATICAS: formularioMuestreo.current.condicionesCli.value,
        DESCRIPCION_HABITAT: formularioMuestreo.current.descripcion.value,
        ESPECIES: especies,
        FECHA_MUESTREO: formularioMuestreo.current.fecha.value,
        FOTOGRAFIAS: URLFotos,
        ID_BITACORA: idBitacora,
        ID_PERSONA: idPersona,
        LOCALIZACION_GEOGRAFICA: coordenadas,
        OBSERVACIONES: formularioMuestreo.current.observaciones.value,
        UBICACION: formularioMuestreo.current.ubicacion.value,
      };

      const idMuestreo = await agregarMuestreoBitacora(muestreo, idBitacora);
      await agregarIdBitacora_Especie(especies, idMuestreo);

      formularioMuestreo.current.reset();
      formRef.current.reset();
      setEspecies([]);
      formEspecie(false);
    } else {
      alert("Completar Campos de Muestreo");
    }
  };

  const CrearEspecie = async (e) => {
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
      ID_BITACORA: idBitacora,
      ID_PERSONA: idPersona,
    };

    const documento = await addDocumento("ESPECIE", nuevaEspecie); //Agregamos Especie obteniendo ID
    setEspecies((estadoAnterior) => {
      const nuevaLista = [...estadoAnterior, documento];
      if (nuevaLista.length > 0) {
        setCrearMuestreo(true);
      }
      return nuevaLista; // Actualiza el estado
    });

    e.target.reset();
    setCrearEspecie(false);
  };

  return (
    <>
      <Box
        ref={formRef}
        onSubmit={CrearEspecie}
        component="form"
        sx={{ m: 0, width: "100%" }}
        noValidate
        autoComplete="off"
      >
        <div className="padreCamposEspecie">
          <h1>Datos de la Especie</h1>
          <div className="camposEspecie1">
            <TextField
              onChange={validarFormulario}
              required
              id="nombreCientifico"
              label="Nombre Cientifico"
              sx={styles}
            />
            <TextField
              onChange={validarFormulario}
              required
              id="nombreComun"
              label="Nombre Comun"
              sx={styles}
            />
            <TextField
              onChange={validarFormulario}
              required
              id="familia"
              label="Familia"
              sx={styles}
            />
          </div>
          <div className="camposEspecie2">
            <TextField
              required
              onChange={validarFormulario}
              id="cantidadMuestras"
              label="Cantidad Muestras"
              type="number"
              variant="outlined"
              defaultValue={1}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={styles}
            />
            <select id="estadoPlanta" required>
              <option value="">Seleccione un estado</option>
              <option value="viva">Viva</option>
              <option value="seca">Seca</option>
              <option value="enferma">Enferma</option>
              <option value="muerta">Muerta</option>
            </select>

            <input
              onChange={validarFormulario}
              id="fotosEspecies"
              type="file"
              accept="image/*"
              multiple
              required
            />
          </div>
        </div>

        <div className="div-Btn-CrearMuestreo-Especie">
          {btnCrearEspecie && (
            //button sin "type" = submit
            <button className="btn-FormEspecie btn-CrearEspecie">
              Agregar Especie
            </button>
          )}
          {btnCrearMuestreo && (
            <button
              type="button"
              onClick={() => CrearMuestreo()}
              className="btn-FormEspecie btn-CrearMuestreo"
            >
              Agregar Muestreo
            </button>
          )}
        </div>
      </Box>
    </>
  );
};

const styles = {
  "& .css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root": {
    fontFamily: "var(--font3)",
    fontWeight: "bold",
  },
  "& .MuiInputBase-root": {
    fontFamily: "var(--font3)",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0",
    boxShadow: "0px 2px 2px cornFlowerblue",
  },
};

export default FormEspecie;

/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./FormMuestreo.css";
import { useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import FormEspecie from "./FormEspecie";

const FormMuestreo = ({ idBitacora, idPersona, titulo }) => {
  const formRef = useRef(null); // Referencia al formulario
  const [formEspecie, setFormEspecie] = useState(false);
  const [coordenadas, setCoordenadas] = useState({
    lat: 1.61438,
    lng: -75.60623,
  });

  const manejarClickMapa = (e) => {
    setCoordenadas({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };
  //   e.preventDefault();
  //   if (formRef.current.checkValidity()) {
  //     alert("Muestreo creado (Simulación)");
  //   } else {
  //     alert("Campos vacíos (Simulación)");
  //   }
  // };

  const validarFormulario = () => {
    if (formRef.current.checkValidity()) {
      setFormEspecie(true);
    }
  };

  return (
    <>
      <div className="padreFormMuestreo">
        <div className="padreSpanTituloBitacora">
          <span id="spanTituloBitacora">{titulo}</span>
        </div>
        <h1>Datos del muestreo</h1>
        <Box
          ref={formRef}
          // onSubmit={crearMuestreo}
          component="form"
          sx={{ m: 0, width: "100%" }}
          noValidate
          autoComplete="off"
        >
          <div className="padreCamposMuestreo">
            <div className="camposMuestreo1">
              <TextField
                onChange={validarFormulario}
                required
                id="descripcion"
                label="Descripcion Hábitat"
                multiline
                sx={styles}
              />
              <TextField
                onChange={validarFormulario}
                required
                id="condicionesCli"
                label="Condiciones Climaticas"
                multiline
                sx={styles}
              />
              <TextField
                onChange={validarFormulario}
                required
                id="observaciones"
                label="Observaciones Adicionales"
                sx={styles}
                multiline
              />
            </div>
            <div className="camposMuestreo2">
              <TextField
                onChange={validarFormulario}
                required
                id="ubicacion"
                label="Ubicacion"
                sx={styles}
              />
              <input
                onChange={validarFormulario}
                required
                type="file"
                id="fotografias"
                accept="image/*"
                multiple
              />
              <input
                onChange={validarFormulario}
                id="fecha"
                type="date"
                defaultValue={maxFecha()}
                required
                max={maxFecha()}
              />
            </div>
            <div className="camposMuestreo3">
              <LoadScript googleMapsApiKey="AIzaSyA0y00mkDr-lq0OHrscslA47lRbKBZ59zs">
                <GoogleMap
                  id="mapa-muestreo"
                  mapContainerStyle={{
                    height: "450px",
                    width: "80%",
                    borderRadius: "5px",
                  }}
                  zoom={10}
                  center={coordenadas}
                  onClick={manejarClickMapa}
                  options={{ minZoom: 3 }}
                ></GoogleMap>
              </LoadScript>
              <div className="divLatLng">
                <label>Latitud: {coordenadas.lat}</label>
                <label>Longitud: {coordenadas.lng}</label>
              </div>
            </div>
          </div>
        </Box>
        {formEspecie && (
          <FormEspecie
            formularioMuestreo={formRef}
            idBitacora={idBitacora}
            idPersona={idPersona}
            formEspecie={setFormEspecie}
            coordenadas={coordenadas}
          />
        )}
      </div>
    </>
  );
};

//Metodos

const maxFecha = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear(),
    mes = String(fecha.getMonth() + 1).padStart(2, "0"),
    dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

// Sobreescribiendo CSS MUI

const styles = () => {
  return {
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
};

export default FormMuestreo;

/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./FormMuestreo.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { getURLFotos, addDocumento } from "../../Firebase/RegisterBitacora.js";

const maxFecha = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear(),
    mes = String(fecha.getMonth() + 1).padStart(2, "0"),
    dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

export const FormMuestreo = ({ especies, setEspecies, setMuestreos }) => {
  const formRef = useRef(null); //Para usar referencia al formulario
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

  const onSubmitMuestreo = async (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      alert("Todos los campos están completos.");
      // Aquí puedes proceder con el envío o el procesamiento del formulario
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
    maxFecha();
    alert(e.target.fecha.value);
    if (especies.length > 0) {
      const URLFotos = await getURLFotos(
        "Imgs_LugarMuestreo/",
        e.target.fotografias.files
      );
      const muestreo = {
        FECHA_Y_HORA: e.target.fecha.value,
        LOCALIZACION_GEOGRAFICA: coordenadas,
        CONDICIONES_CLIMATICAS: e.target.conClimaticas.value,
        DESCRIPCION_HABITAT: e.target.habitat.value,
        FOTOGRAFIAS: URLFotos,
        OBSERVACIONES: e.target.observaciones.value,
        ESPECIES: especies,
      };
      const documento = await addDocumento("MUESTREO", muestreo);
      setMuestreos((estadoAnterior) => [...estadoAnterior, documento]);
      setEspecies([]);
      e.target.reset();
    } else {
      alert(
        "No se puede registrar el muestreo, no se ha registrado ninguna especia recolectada"
      );
    }
  };

  return (
    <form ref={formRef} className="muestreo-form" onSubmit={onSubmitMuestreo}>
      <h2>Datos del Muestreo</h2>
      <label>Fecha y Hora</label>
      <input id="fecha" type="date" required max={maxFecha()} />
      {/*  */}
      <label>Localización Geografica (Coordenadas)</label>
      <div id="divMap">
        <LoadScript googleMapsApiKey="AIzaSyA0y00mkDr-lq0OHrscslA47lRbKBZ59zs">
          <GoogleMap
            id="mapa-muestreo"
            mapContainerStyle={{
              height: "500px",
              width: "80%",
              borderRadius: "20px",
            }}
            zoom={10}
            center={coordenadas}
            onClick={manejarClickMapa}
            options={{ minZoom: 3 }}
          ></GoogleMap>
        </LoadScript>
        <div id="divCoordenadas">
          <label>Latitud: {coordenadas.lat}</label>
          <img
            id="imgTierra"
            src="https://cdn.pixabay.com/photo/2016/04/02/21/01/earth-1303628_640.png"
            alt="Planeta Tierra"
          />
          <label>Longitud: {coordenadas.lng}</label>
        </div>
      </div>
      <div id="divCamposMuestreo">
        {/*  */}
        <label>Condiciones Climáticas</label>
        <input
          id="conClimaticas"
          type="text"
          placeholder="Ej: Soleado, 28°C"
          required
        />
        {/*  */}
        <label>Descripción del Hábitat</label>
        <textarea
          required
          id="habitat"
          placeholder="Describa el tipo de vegetación, altitud, etc."
        ></textarea>
        {/*  */}
        <label>Fotografías del Sitio de Muestreo</label>
        <input
          required
          type="file"
          id="fotografias"
          accept="image/*"
          multiple
        />
        {/*  */}
        <label>Observaciones Adicionales</label>
        <textarea
          required
          id="observaciones"
          placeholder="Ingrese cualquier observación adicional"
        ></textarea>
      </div>
      <div id="div-btn">
        <button id="btn-muestreo">Crear Muestreo</button>
      </div>
    </form>
  );
};

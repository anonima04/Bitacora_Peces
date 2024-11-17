/* eslint-disable no-unused-vars */
import "./FormBitacora.css";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { FormEspecies } from "../RegistrarBitacora/FormEspecies";
import { FormMuestreo } from "../RegistrarBitacora/FormMuestreo";
import { addDocumento } from "../../Firebase/RegisterBitacora.js";

function FormBitacora() {
  //Estados del formulario en general
  //Bitacora
  const [titulo, setTitulo] = useState("");
  //Arrays muestreos y especies
  const [muestreos, setMuestreos] = useState([]); //Guarda el ID cada Muestreo
  const [especies, setEspecies] = useState([]); //Guarda el ID de cada especie recolectada

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo != "" && titulo.length > 20) {
      if (muestreos.length > 0) {
        const nuevaBitacora = {
          TITULO: titulo,
          MUESTREOS: muestreos,
        };
        await addDocumento("BITACORA", nuevaBitacora);
        setTitulo("");
        setMuestreos([]);
        setEspecies([]);
      } else {
        alert(
          "No se puede agregar la bitacora, no se ha resgitrado ningun muestreo"
        );
      }
    } else {
      alert(
        titulo == ""
          ? "Ingresar un titulo para la bitacora"
          : "Titulo demasiado corto"
      );
    }
  };

  return (
    <>
      <div id="contenedorPadreCrearBitacora">
        <div id="contenedorBitacora">
          <h2>Datos de la Bitácora</h2>
          <label>Título</label>
          <input
            type="text"
            id="inputTituloBitacora"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ingrese el título de la bitácora"
            required
          />
        </div>

        <FormMuestreo
          especies={especies}
          setEspecies={setEspecies}
          setMuestreos={setMuestreos}
        />
        <FormEspecies especies={setEspecies} />
        {/*  */}
        <button className="btnFormBitacora" onClick={handleSubmit}>
          Crear Bitacora
        </button>
      </div>
    </>
  );
}

export default FormBitacora;

// async function crearBitacora(bitacora) {
//   try {
//     const documento = await addDoc(collection(db, "BITACORA"), bitacora);
//     alert("Bitácora agregada con éxito: " + documento.id);
//   } catch (e) {
//     alert("Error al agregar Bitácora :(" + e);
//   }
// }

// const prepararBitacora = async (e) => {
//   e.preventDefault();
//   const bitacoraNueva = {
//     AUTOR: e.target.autor.value,
//     DESCRIPCION: e.target.descripcion.value,
//     FECHA_CREACION: e.target.fecha.value,
//     TITULO: e.target.titulo.value,
//     COORDENADAS: coordenadas,
//     CONDICIONES_CLIMATICAS: e.target.condiciones.value,
//     HABITAT: e.target.habitat.value,
//     ESPECIES: e.target.especies.value,
//     OBSERVACIONES: e.target.observaciones.value,
//   };

/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./FormBitacora.css";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase"; //Importamos para poder interactuar con la bases de datos de firestore
import { collection, addDoc } from "firebase/firestore"; // Funciones para manejar Firestore

async function crearBitacora(bitacora) {
  try {
    const documento = await addDoc(collection(db, "BITACORA"), bitacora);
    alert("Bitacora agregada con exito: " + documento);
  } catch (e) {
    alert("Error al agregar Bitacora :(");
  }
}

function FormBitacora() {
  const prepararBitacora = (e) => {
    e.preventDefault();
    const bitacoraNueva = {
      AUTOR: e.target.autor.value,
      DESCRIPCION: e.target.descripcion.value,
      FECHA_CREACION: e.target.fecha.value,
      TITULO: e.target.titulo.value,
    };

    crearBitacora(bitacoraNueva);
    // alert("AUTOR: " + bitacoraNueva.AUTOR);
  };

  return (
    <div className="bitacora-background">
      <div className="bitacora-container">
        <span id="textCrearBit">Nueva Bitácora</span>
        <form className="bitacora-form" onSubmit={prepararBitacora}>
          <div className="form-group">
            <label id="tituloBitacora">Titulo de la Bitácora</label>
            <input
              required
              type="text"
              id="titulo"
              placeholder="Ingrese el nombre de la bitácora"
            />
          </div>
          <div className="form-group">
            <label id="descripcionBitacora">Descripción</label>
            <textarea
              required
              id="descripcion"
              placeholder="Describa el propósito de la bitácora"
            ></textarea>
          </div>
          <div className="form-group">
            <label id="nombreAutor">Autor</label>
            <input
              required
              type="text"
              id="autor"
              placeholder="Nombre del autor"
            />
          </div>
          <div className="form-group">
            <label id="fechaCreacion">Fecha de Creación</label>
            <input required type="date" id="fecha" />
          </div>
          <button type="submit" id="submit-btn">
            Crear Bitácora
          </button>
        </form>
      </div>
      <div className="div-ball">
        <div className="ball"></div>
      </div>
    </div>
  );
}

export default FormBitacora;

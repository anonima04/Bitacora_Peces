/* eslint-disable no-unused-vars */
import "./RegisterUser.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/ContextRegistroUser";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const RegisterUser = () => {
  const navigate = useNavigate();
  // const [registro, setRegistro] = useState(false);
  const [roles] = useState(["Investigador", "Colaborador"]);
  const { user } = useContext(UserContext);

  async function crearPersona(persona) {
    try {
      const documento = await addDoc(collection(db, "PERSONA"), persona);
      alert("Persona agregada con exito: " + persona.CORREO);
      navigate("/home");
    } catch (e) {
      alert("Error al agregar Persona :(");
    }
  }

  const prepararPersona = (e) => {
    e.preventDefault();
    const nuevaPersona = {
      UID: user.uid,
      CORREO: user.email,
      PRIMER_NOMBRE: e.target.primerNombre.value,
      SEGUNDO_NOMBRE: e.target.segundoNombre.value,
      PRIMER_APELLIDO: e.target.primerApellido.value,
      SEGUNDO_APELLIDO: e.target.segundoApellido.value,
      TELEFONO: e.target.telefono.value,
      ROL: e.target.rol.value,
    };

    crearPersona(nuevaPersona);
  };

  return (
    <div className="padre">
      <div className="container-form">
        <form onSubmit={prepararPersona} className="formRegister">
          <span className="textInfo">Cuentanos más sobre ti</span>

          <div className="divInputNombres">
            <span className="textNombres">Nombres</span>
            <input
              type="text"
              name="primerNombre"
              placeholder="Primer Nombre"
              className="inputNombre"
              required
            />
            <input
              type="text"
              name="segundoNombre"
              placeholder="Segundo Nombre ( Opcional )"
              className="inputNombre"
            />
          </div>

          <div className="divInputApellidos">
            <span className="textApellidos">Apellidos</span>
            <input
              type="text"
              name="primerApellido"
              placeholder="Primer Apellido"
              className="inputApellido"
              required
            />
            <input
              type="text"
              name="segundoApellido"
              placeholder="Segundo Apellido"
              className="inputApellido"
              required
            />
          </div>

          <div className="divInputTelefono">
            <span className="textTelefono">Telefono</span>
            <input
              type="text"
              name="telefono"
              placeholder="Ingresa tu telefono"
              className="inputTelefono"
              required
            />
          </div>

          <div className="divInputRol">
            <span className="textRol">Rol</span>
            <select name="rol" className="selectRol" required>
              <option value="">Seleccionar Rol</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol} className="option">
                  {rol}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btnSubmit">
            Continuar
          </button>
        </form>
      </div>
      {/*  */}
      <div className="floating-div">
        <img
          src="https://img.freepik.com/fotos-premium/uma-planta-que-esta-crescendo-na-terra_849715-2537.jpg"
          alt=""
          className="floating-img"
        />
      </div>
    </div>
  );
};

export default RegisterUser;

/* eslint-disable no-unused-vars */
import "./RegisterUser.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState(false);
  const [roles] = useState(["Investigador", "Colaborador"]);

  return (
    <div className="padre">
      <div className="container-form">
        <form onSubmit={""} className="formRegister">
          <span className="textInfo">Cuentanos más sobre ti</span>
          {/* Nombres */}
          <div className="divInputNombres">
            <span className="textNombres">Nombres</span>
            <input
              type="text"
              placeholder="Primer Nombre"
              className="inputNombre"
              required
            />
            <input
              type="text"
              placeholder="Segundo Nombre ( Opcional )"
              className="inputNombre"
            />
          </div>

          {/* Apellidos */}
          <div className="divInputApellidos">
            <span className="textApellidos">Apellidos</span>
            <input
              type="text"
              placeholder="Primer Apellido"
              className="inputApellido"
              required
            />
            <input
              type="text"
              placeholder="Segundo Apellido"
              className="inputApellido"
              required
            />
          </div>

          {/* Nacionalidad */}
          <div className="divInputTelefono">
            <span className="textTelefono">Telefono</span>
            <input
              type="text"
              placeholder="Ingresa tu telefono"
              className="inputTelefono"
              required
            />
          </div>

          {/* Rol */}
          <div className="divInputRol">
            <span className="textRol">Rol</span>
            <select className="selectRol">
              <option value="">Seleccionar Rol</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol} className="option">
                  {rol}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="btnSubmit"
            onClick={(e) => {
              {
                setRegistro(!registro);
                if (registro) {
                  navigate("/home");
                }
              }
            }}
          >
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

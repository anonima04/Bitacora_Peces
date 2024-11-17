/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./RecoverPassword.css";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Correo para recuperación enviado!");
  };

  return (
    <div className="pagina-recuperar">
      <div className="div-FORM-RC">
        <h1>Recuperar Contraseña</h1>
        <p className="descripcionRC">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>
        <form onSubmit={handleSubmit} className="formularioRC">
          <label htmlFor="correo" className="labelCorreo">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="inputCorreoRC"
            placeholder="tucorreo@dominio.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="boton-recuperar">
            Enviar enlace
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;

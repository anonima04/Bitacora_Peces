import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./RecoverPassword.css";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error
  const [loading, setLoading] = useState(false); // Para mostrar si la solicitud está en proceso

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Indica que el proceso de envío está en curso
    const auth = getAuth(); // Obtén la instancia de autenticación de Firebase

    try {
      // Intenta enviar el correo para restablecer la contraseña
      await sendPasswordResetEmail(auth, email);
      setMessage("Correo para recuperación enviado!"); // Mensaje de éxito
    } catch (error) {
      setMessage("Error al enviar el correo. Verifica tu correo electrónico.");
      console.error(error.message); // En caso de error, muestra el mensaje en consola
    } finally {
      setLoading(false); // Termina el proceso de carga
    }
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
          <button type="submit" className="boton-recuperar" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>
        {message && <p className="mensaje">{message}</p>}{" "}
        {/* Muestra el mensaje de éxito o error */}
      </div>
    </div>
  );
};

export default RecoverPassword;
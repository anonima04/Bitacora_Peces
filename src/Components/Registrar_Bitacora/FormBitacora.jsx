import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./FormBitacora.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FormMuestreo from "../Registrar_Bitacora/FormMuestreo";
import { addDocumento, getPersonaID } from "../../Firebase/RegisterBitacora.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/firebase.js";

const FormBitacora = () => {
  const [mensajeCrearBitacora, setMensajeCrearBitacora] = useState(true);
  const [bitacoraRegistrada, setBitacoraRegistrada] = useState(false);
  const [llenarCampos, setLlenarCampos] = useState(false);
  const [user] = useAuthState(auth);
  const [idBitacora, setIdBitacora] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [titulo, setTitulo] = useState("");

  const fechaActual = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear(),
      mes = String(fecha.getMonth() + 1).padStart(2, "0"),
      dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

  const crearBitacora = async (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      setBitacoraRegistrada(true); //Mostrara Muestreo
      setLlenarCampos(false);
      setTimeout(() => {
        setMensajeCrearBitacora(false); //No se mostrara Form Bitacora
        setBitacoraRegistrada(false); // Ocultarlo después de 3 segundos
      }, 2500);
      const bitacora = {
        TITULO: e.target.titulo.value,
        DESCRIPCION: e.target.descripcion.value,
        FECHA_CREACION: fechaActual(),
        ID_PERSONA: await getPersonaID(user.uid),
        MUESTREOS: [],
      };
      setIdPersona(bitacora.ID_PERSONA);
      setTitulo(bitacora.TITULO);
      setIdBitacora(await addDocumento("BITACORA", bitacora));
    } else {
      setLlenarCampos(true);
    }
  };

  return (
    <>
      {mensajeCrearBitacora && (
        <div className="padreFormBitacora">
          <h1>Datos de la Bitacora</h1>
          {bitacoraRegistrada && (
            <Stack sx={stylesStack}>
              <Alert severity="success" sx={stylesAlerta}>
                ¡Bitacora registrada con Exito! 😉
              </Alert>
            </Stack>
          )}
          {llenarCampos && (
            <Stack sx={stylesStack}>
              <Alert severity="error" con sx={stylesAlerta}>
                Llenar todos los campos. 🥹
              </Alert>
            </Stack>
          )}
          <Box
            onSubmit={(e) => {
              crearBitacora(e);
            }}
            component="form"
            sx={{ m: 0, width: "100%" }}
            noValidate
            autoComplete="off"
          >
            <div className="camposFormBitacora">
              <TextField
                required
                disabled={bitacoraRegistrada ? true : false}
                id="titulo"
                label="Titulo"
                className="campoBitacora"
                sx={styles()}
              />
              <TextField
                required
                disabled={bitacoraRegistrada ? true : false}
                id="descripcion"
                label="Descripcion"
                multiline
                className="campoBitacora"
                sx={styles()}
              />
              <button
                className="btn-FormBitacora btn-CrearBitacora"
                style={{ backgroundColor: "rgb(146, 255, 142)" }}
              >
                Crear Bitacora
              </button>
            </div>
          </Box>

          <label id="label-Info">
            <img
              id="imgInfo"
              src="https://cdn.icon-icons.com/icons2/2596/PNG/512/attention_icon_155783.png"
              alt="Atention-img"
            />
            Primero debes crear la bitacora, posterior puedes registrar
            muestreos y especies asociadas.
          </label>
        </div>
      )}
      {!mensajeCrearBitacora && (
        <FormMuestreo
          idBitacora={idBitacora}
          idPersona={idPersona}
          titulo={titulo}
        />
      )}
    </>
  );
};

// Sobreescribir CSS MUI
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
      boxShadow: "0px 2px 1px rgb(146, 255, 142)",
    },
  };
};

const stylesStack = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingBottom: "0.5rem",
};

const stylesAlerta = {
  width: "50%",
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
};

export default FormBitacora;

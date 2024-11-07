import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db, appFireBase } from "../../Firebase/firebase";
import FormBitacora from "../FormBitacora/FormBitacora";
import TipsPage from "../../Page/TipsPage/TipsPage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const pages = ["Crear", "Buscar"];
// const rutas = ["/crearBitacora", "/buscarBitacora"];
const auth = getAuth(appFireBase);

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(false);
  const [namePage, setNamePage] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleMenu = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    signOut(auth)
      .then(() => {
        alert("Cierre de sesión exitoso");
        // navigate("/login"); // Redirige a la página de inicio de sesión
      })
      .catch((error) => {
        alert("Error al cerrar sesión:", error);
      });
  };
  const handleProfile = async () => {
    const userUid = auth.currentUser.uid; // UID del usuario autenticado

    try {
      // Supón que el UID está asociado a la colección `PERSONA`
      const q = query(collection(db, "PERSONA"), where("UID", "==", userUid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const personaId = querySnapshot.docs[0].id; // ID de la colección `PERSONA`
        navigate(`/perfil/${personaId}`);
      } else {
        console.error("No se encontró el documento de persona");
      }
    } catch (error) {
      console.error("Error al obtener ID de persona:", error);
    }
  };
  const handleFile = async () => {
    const userUid = auth.currentUser.uid;

    try {
      // Consulta para obtener el ID de la persona autenticada
      const personaQuery = query(
        collection(db, "PERSONA"),
        where("UID", "==", userUid)
      );
      const personaSnapshot = await getDocs(personaQuery);

      if (!personaSnapshot.empty) {
        const personaId = personaSnapshot.docs[0].id;

        // Consulta para obtener la bitácora asociada al `personaId`
        const bitacoraQuery = query(
          collection(db, "BITACORA"),
          where("ID_PERSONA", "==", personaId)
        );
        const bitacoraSnapshot = await getDocs(bitacoraQuery);

        if (!bitacoraSnapshot.empty) {
          const bitacoraId = bitacoraSnapshot.docs[0].id;
          navigate(`/file/${bitacoraId}`); // Redirige a `FilePage` con el ID de la bitácora en la URL
        } else {
          console.error("No se encontró ninguna bitácora para la persona");
        }
      } else {
        console.error("No se encontró el documento de persona");
      }
    } catch (error) {
      console.error("Error al obtener bitácora:", error);
    }
  };

  const visiblePage = (namePage) => {
    setNamePage(namePage);
    setPage(!page);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="100%" className="container-appBar_Home">
        <div id="primer-div">
          <img src="/logoPag1.jpg" alt="Logo Pagina" className="logoPag" />
          <span onClick={() => setNamePage("")} id="span-home">
            BITAC-DS
          </span>
          <div className="pages">
            {pages.map((page) => (
              // <a key={page} className="a-page" href={`${rutas[index]}`}>
              //   {page}
              // </a>
              <a
                key={page}
                className="a-page"
                onClick={(event) => visiblePage(page, event)}
              >
                {page}
              </a>
            ))}
          </div>
        </div>
        {/*  */}

        <div className="perfil-menu" onClick={handleMenu}>
          <IconButton>
            <AccountCircle
              id="iconoCuenta"
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </IconButton>
          {/*  */}

          {namePage === "Crear" ? (
            <FormBitacora />
          ) : namePage === "Buscar" ? (
            <div>BUSCAR</div>
          ) : (
            <TipsPage /> //No envio prop -> no se renderiza el NavBar
          )}

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleFile}>Bitacora</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
          </Menu>
        </div>
        {/*  */}
      </Container>
    </AppBar>
  );
}

export default AppBar_Home;

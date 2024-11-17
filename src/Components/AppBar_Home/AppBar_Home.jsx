import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import { useState } from "react";
import { getPersonaID } from "../../Firebase/ProfilePage";
import { useNavigate } from "react-router-dom";
import TipsPage from "../../Page/TipsPage/TipsPage.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase.js";
import TableBitacora from "../TableBitacora/TableBitacora.jsx";

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [bitacoras, setBitacoras] = useState(false);

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

  // const handleFile = async () => {
  //   const userUid = auth.currentUser.uid;

  //   try {
  //     // Consulta para obtener el ID de la persona autenticada
  //     const personaQuery = query(
  //       collection(db, "PERSONA"),
  //       where("UID", "==", userUid)
  //     );
  //     const personaSnapshot = await getDocs(personaQuery);

  //     if (!personaSnapshot.empty) {
  //       const personaId = personaSnapshot.docs[0].id;

  //       // Consulta para obtener la bitácora asociada al `personaId`
  //       const bitacoraQuery = query(
  //         collection(db, "BITACORA"),
  //         where("ID_PERSONA", "==", personaId)
  //       );
  //       const bitacoraSnapshot = await getDocs(bitacoraQuery);

  //       if (!bitacoraSnapshot.empty) {
  //         const bitacoraId = bitacoraSnapshot.docs[0].id;
  //         navigate(`/file/${bitacoraId}`); // Redirige a `FilePage` con el ID de la bitácora en la URL
  //       } else {
  //         console.error("No se encontró ninguna bitácora para la persona");
  //       }
  //     } else {
  //       console.error("No se encontró el documento de persona");
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener bitácora:", error);
  //   }
  // };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="100%" className="container-appBar_Home">
          <div id="primer-div">
            <img src="/logoPag1.jpg" alt="Logo Pagina" className="logoPag" />
            <span id="span-home" onClick={() => setBitacoras(false)}>
              BITAC-DS
            </span>
            <div className="pages">
              <a
                className="a-page"
                onClick={() => {
                  navigate("/crearBitacora");
                }}
              >
                Nueva Bitacora
              </a>
              <a
                className="a-page"
                onClick={() => {
                  // navigate("/verBitacoras");
                  setBitacoras(true);
                }}
              >
                Mis Bitacoras
              </a>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={open}
            >
              <MenuItem
                onClick={() => {
                  getPersonaID(navigate);
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem onClick={""}>Bitacora</MenuItem>
              <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
            </Menu>
          </div>
          {/*  */}
        </Container>
      </AppBar>
      {bitacoras ? <TableBitacora /> : <TipsPage />}
    </>
  );
}

export default AppBar_Home;

import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import appFireBase from "../../Firebase/firebase";
import FormBitacora from "../FormBitacora/FormBitacora";
import TipsPage from "../../Page/TipsPage/TipsPage";
// import { useNavigate } from "react-router-dom";

const pages = ["Crear", "Buscar"];
// const rutas = ["/crearBitacora", "/buscarBitacora"];
const auth = getAuth(appFireBase);

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(false);
  const [namePage, setNamePage] = useState("");
  // const navigate = useNavigate(); // Inicializa useNavigate

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

  const visiblePage = (namePage) => {
    setNamePage(namePage);
    setPage(!page);
  };

  return (
    <>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={open}
            >
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Configuracion</MenuItem>
              <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
            </Menu>
          </div>
          {/*  */}
        </Container>
      </AppBar>
      {namePage === "Crear" ? (
        <FormBitacora />
      ) : namePage === "Buscar" ? (
        <div>BUSCAR</div>
      ) : (
        <TipsPage /> //No envio prop -> no se renderiza el NavBar
      )}
    </>
  );
}

export default AppBar_Home;

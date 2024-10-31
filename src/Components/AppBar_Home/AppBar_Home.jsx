import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import appFireBase from "../../Firebase/firebase";
// import { useNavigate } from "react-router-dom";

const pages = ["Crear", "Buscar"];
const rutas = ["/crearBitacora", "/buscarBitacora"];
const auth = getAuth(appFireBase);

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const navigate = useNavigate(); // Inicializa useNavigate

  const handleMenu = (event) => {
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

  return (
    <AppBar position="fixed">
      <Container maxWidth="100%" className="container-appBar_Home">
        <div id="primer-div">
          <img src="/logoPag1.jpg" alt="Logo Pagina" className="logoPag" />
          <span>BITAC-DS</span>
          <div className="pages">
            {pages.map((page, index) => (
              <a key={page} className="a-page" href={`${rutas[index]}`}>
                {page}
              </a>
            ))}
          </div>
        </div>
        {/*  */}

        <div className="perfil-menu">
          <IconButton onClick={handleMenu}>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configuracion</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
          </Menu>
        </div>
        {/*  */}
      </Container>
    </AppBar>
  );
}

export default AppBar_Home;

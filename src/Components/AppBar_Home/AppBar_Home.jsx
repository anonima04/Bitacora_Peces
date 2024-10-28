import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import React from "react";

const pages = ["Crear", "Buscar"];
const rutas = ["/crearBitacora", "/buscarBitacora"];

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

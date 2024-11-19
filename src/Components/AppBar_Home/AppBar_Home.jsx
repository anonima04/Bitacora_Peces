import { AppBar, Container } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar_Home.css";
import { useState, useEffect } from "react";
import { getPersonaID } from "../../Firebase/ProfilePage";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  getDocs,
  db,
  where,
  auth,
} from "../../Firebase/firebase.js";
import TipsPage from "../../Page/TipsPage/TipsPage.jsx";
import { signOut } from "firebase/auth";
import TableBitacora from "../TableBitacora/TableBitacora.jsx";
import RegistrarBitacora from "../RegistrarBitacora/FormBitacora.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import ManageAcountsPage from "../../Page/ManageAcountsPage/ManageAcountsPage.jsx";
import SearchBitacoraPage from "../../Page/SearchBitacoraPage/SearchBitacoraPage.jsx";
import PruebaEditar from "../../Page/PruebaEditar/Prueba.jsx";

function AppBar_Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar el rol
  const navigate = useNavigate(); // Inicializa useNavigate
  const [open, setOpen] = useState(false);
  const [bitacoras, setBitacoras] = useState(false);
  const [crearBitacora, setCrearBitacora] = useState(false);
  const [buscarBitacora, setBuscarBitacora] = useState(false);
  const [verTips, setTips] = useState(true);
  const [user] = useAuthState(auth); // Obtener usuario actual en REACT
  const [gestionarUsuarios, setGestionarUsuarios] = useState(false);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    if (!user) return; // No hacer nada si no hay usuario autenticado

    const fetchUserRole = async () => {
      try {
        const q = query(
          collection(db, "PERSONA"),
          where("UID", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.ROL === "Administrador") {
            setIsAdmin(true);
          }
        } else {
          console.log("No se encontró el documento de persona");
        }
      } catch (error) {
        console.log("Error al obtener rol de usuario:", error);
      }
    };
    fetchUserRole();
  }, [user]);

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

  const actualizarVistaComponentes = (
    Tips,
    NuevaBitacora,
    verBitacoras,
    verGestionarUsuarios,
    buscar,
    edit
  ) => {
    setTips(Tips);
    setCrearBitacora(NuevaBitacora);
    setBitacoras(verBitacoras);
    setGestionarUsuarios(verGestionarUsuarios);
    setBuscarBitacora(buscar);
    setEditar(edit);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="100%" className="container-appBar_Home">
          <div id="primer-div">
            <img src="/logoPag1.jpg" alt="Logo Pagina" className="logoPag" />
            <span
              id="span-home"
              onClick={() =>
                actualizarVistaComponentes(true, false, false, false, false, false)
              }
            >
              BITAC-DS
            </span>
            <div className="pages">
              <a
                className="a-page"
                onClick={() => {
                  // navigate("/crearBitacora");
                  actualizarVistaComponentes(false, true, false, false, false, false);
                }}
              >
                Nueva Bitacora
              </a>
              <a
                className="a-page"
                onClick={() => {
                  // navigate("/verBitacoras");
                  actualizarVistaComponentes(false, false, true, false, false, false);
                }}
              >
                Mis Bitacoras
              </a>
              {/* Agregar "Gestionar Cuentas" solo si es admin */}
              {isAdmin && (
                <a
                  className="a-page"
                  onClick={() =>
                    actualizarVistaComponentes(false, false, false, true, false, false)
                  }
                >
                  Gestionar Cuentas
                </a>
              )}
              {/* Agregar "Buscar bitacora" solo si es admin */}

              <a
                className="a-page"
                onClick={() =>
                  actualizarVistaComponentes(false, false, false, false, true, false)
                }
              >
                Buscar Bitacoras
              </a>
              <a
                className="a-page"
                onClick={() =>
                  actualizarVistaComponentes(false, false, false, false,false, true)
                }
              >
                Editar Bitacoras
              </a>
            </div>
          </div>
          {/* Menú de perfil */}
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
        </Container>
      </AppBar>
      {/* Mostrar páginas según los estados */}
      {verTips && <TipsPage />}
      {crearBitacora && <RegistrarBitacora />}
      {bitacoras && <TableBitacora />}
      {gestionarUsuarios && <ManageAcountsPage />}
      {buscarBitacora && <SearchBitacoraPage />}
      {editar && <PruebaEditar/>}
    </>
  );
}

export default AppBar_Home;

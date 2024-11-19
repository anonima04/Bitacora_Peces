import { useEffect, useState } from "react";
import { db, appFireBase } from "../../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Typography, Grid, Container } from "@mui/material";
import "./ManageAcountsPage.css";

const auth = getAuth(appFireBase);

const ManageAcountsPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    PRIMER_NOMBRE: "",
    SEGUNDO_NOMBRE: "",
    PRIMER_APELLIDO: "",
    SEGUNDO_APELLIDO: "",
    ROL: "",
    TELEFONO: "",
    EMAIL: "",
    PASSWORD: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const q = query(
      collection(db, "PERSONA"),
      where("ROL", "!=", "Administrador")
    );
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      // Crear el usuario en Firebase Authentication
      const { EMAIL, PASSWORD } = newUser;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        EMAIL,
        PASSWORD
      );

      // Obtener el UID del usuario creado
      const user = userCredential.user;

      // Guardar la información adicional del usuario en Firestore
      await addDoc(collection(db, "PERSONA"), {
        PRIMER_NOMBRE: newUser.PRIMER_NOMBRE,
        SEGUNDO_NOMBRE: newUser.SEGUNDO_NOMBRE,
        PRIMER_APELLIDO: newUser.PRIMER_APELLIDO,
        SEGUNDO_APELLIDO: newUser.SEGUNDO_APELLIDO,
        ROL: newUser.ROL,
        TELEFONO: newUser.TELEFONO,
        EMAIL: newUser.EMAIL,
        UID: user.uid, // Guardamos el UID del usuario en Firestore
      });

      // Limpiar los campos
      setNewUser({
        PRIMER_NOMBRE: "",
        SEGUNDO_NOMBRE: "",
        PRIMER_APELLIDO: "",
        SEGUNDO_APELLIDO: "",
        ROL: "",
        TELEFONO: "",
        EMAIL: "",
        PASSWORD: "",
      });

      fetchUsers(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userDoc = doc(db, "PERSONA", userId);
      await deleteDoc(userDoc);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleEditUser = async () => {
    if (editingUser) {
      try {
        const userDoc = doc(db, "PERSONA", editingUser.id);
        await updateDoc(userDoc, {
          PRIMER_NOMBRE: editingUser.PRIMER_NOMBRE,
          SEGUNDO_NOMBRE: editingUser.SEGUNDO_NOMBRE,
          PRIMER_APELLIDO: editingUser.PRIMER_APELLIDO,
          SEGUNDO_APELLIDO: editingUser.SEGUNDO_APELLIDO,
          ROL: editingUser.ROL,
          TELEFONO: editingUser.TELEFONO,
        });

        // Limpiar la edición y actualizar la lista
        setEditingUser(null);
        fetchUsers();
      } catch (error) {
        console.error("Error al editar usuario:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    <Container maxWidth="lg" className="manage-accounts-container">
      <div className="form-container">
        <Typography variant="h6" gutterBottom className="form-title">
          CREAR NUEVA CUENTA
        </Typography>
        <Grid container spacing={3} className="create-user-form">
          <Grid item xs={12} md={6}>
            <TextField
              label="Primer Nombre"
              fullWidth
              value={newUser.PRIMER_NOMBRE}
              onChange={(e) =>
                setNewUser({ ...newUser, PRIMER_NOMBRE: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Segundo Nombre"
              fullWidth
              value={newUser.SEGUNDO_NOMBRE}
              onChange={(e) =>
                setNewUser({ ...newUser, SEGUNDO_NOMBRE: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Primer Apellido"
              fullWidth
              value={newUser.PRIMER_APELLIDO}
              onChange={(e) =>
                setNewUser({ ...newUser, PRIMER_APELLIDO: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Segundo Apellido"
              fullWidth
              value={newUser.SEGUNDO_APELLIDO}
              onChange={(e) =>
                setNewUser({ ...newUser, SEGUNDO_APELLIDO: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Rol"
              fullWidth
              value={newUser.ROL}
              onChange={(e) => setNewUser({ ...newUser, ROL: e.target.value })}
              className="input-field"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono"
              fullWidth
              value={newUser.TELEFONO}
              onChange={(e) =>
                setNewUser({ ...newUser, TELEFONO: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo Electrónico"
              fullWidth
              value={newUser.EMAIL}
              onChange={(e) =>
                setNewUser({ ...newUser, EMAIL: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              fullWidth
              type="password"
              value={newUser.PASSWORD}
              onChange={(e) =>
                setNewUser({ ...newUser, PASSWORD: e.target.value })
              }
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleCreateUser}
              className="create-user-btn"
            >
              Crear Usuario
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="user-list">
        <Typography variant="h6" gutterBottom className="form-title">
          USUARIOS EXISTENTES
        </Typography>
        <div className="user-list-card">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <Typography variant="h6" className="user-name">
                {user.PRIMER_NOMBRE} {user.PRIMER_APELLIDO}
              </Typography>
              <Typography className="user-phone">
                Teléfono: {user.TELEFONO}
              </Typography>
              <Typography className="user-role">Rol: {user.ROL}</Typography>
              <div className="button-container">
                <Button
                  variant="contained"
                  className="edit-btn"
                  onClick={() => setEditingUser(user)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingUser && (
        <div className="edit-user-form">
          <Typography variant="h6" className="form-title">
            EDITAR USUARIO
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Primer Nombre"
                fullWidth
                name="PRIMER_NOMBRE"
                value={editingUser.PRIMER_NOMBRE}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Segundo Nombre"
                fullWidth
                name="SEGUNDO_NOMBRE"
                value={editingUser.SEGUNDO_NOMBRE}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Primer Apellido"
                fullWidth
                name="PRIMER_APELLIDO"
                value={editingUser.PRIMER_APELLIDO}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Segundo Apellido"
                fullWidth
                name="SEGUNDO_APELLIDO"
                value={editingUser.SEGUNDO_APELLIDO}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rol"
                fullWidth
                name="ROL"
                value={editingUser.ROL}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                fullWidth
                name="TELEFONO"
                value={editingUser.TELEFONO}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleEditUser}
                className="save-btn"
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
    </>
  );
};

export default ManageAcountsPage;

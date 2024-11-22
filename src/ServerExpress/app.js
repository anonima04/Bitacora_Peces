import express from "express";
import cors from "cors"; // Para habilitar CORS
import admin from "firebase-admin";
import PersonaRoutes from "./ServerRoutes/PersonaRoutes.js";
import BitacoraRoutes from "./ServerRoutes/BitacoraRoutes.js";
import MuestraRoutes from "./ServerRoutes/MuestraRoutes.js";
import EspecieRouter from "./ServerRoutes/EspecieRoutes.js";
// import serviceAccount from "./bitagorapeces-firebase-adminsdk-v84va-7a507cbfb3.json" assert { type: "json" };
import serviceAccount from "./bitagorapeces-firebase-adminsdk-v84va-7a507cbfb3.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Habilita CORS
app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes

// Usa las rutas de PERSONA con el prefijo /api/persona
app.use("/api/persona", PersonaRoutes);
app.use("/api/bitacora", BitacoraRoutes);
app.use("/api/muestra", MuestraRoutes); // Usa solo una de las dos rutas para "muestra"
app.use("/api/especie", EspecieRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

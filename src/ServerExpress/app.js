import express from 'express';
import cors from 'cors'; // Para habilitar CORS
import admin from 'firebase-admin';
import PersonaRoutes from './ServerRoutes/PersonaRoutes.js';
import BitacoraRoutes from './ServerRoutes/BitacoraRoutes.js';
import MuestraRoutes from './ServerRoutes/MuestraRoutes.js';
import EspecieRouter from './ServerRoutes/EspecieRoutes.js';
import serviceAccount from './bitagorapeces-firebase-adminsdk-v84va-e769b64e9b.json' assert { type: 'json' };

// Inicializa Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bitagorapeces.firebaseio.com', // URL de tu proyecto Firebase
  });
}

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Procesa JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api/persona', PersonaRoutes);
app.use('/api/bitacora', BitacoraRoutes);
app.use('/api/muestra', MuestraRoutes);
app.use('/api/especie', EspecieRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

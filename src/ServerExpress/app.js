import express from 'express';
import cors from 'cors'; // Mantén solo esta línea
import admin from 'firebase-admin';
import serviceAccount from './bitagorapeces-firebase-adminsdk-v84va-1c37492f2e.json' assert { type: 'json' };
import PersonaRoutes from './ServerRoutes/PersonaRoutes.js';
import BitacoraRoutes from './ServerRoutes/BitacoraRoutes.js';
import MuestraRoutes from './ServerRoutes/MuestraRoutes.js';
import EspecieRouter from './ServerRoutes/EspecieRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bitagorapeces.firebaseio.com', // URL de Firebase correcta
});

app.use(cors()); // Habilita CORS
app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes

// Usa las rutas de PERSONA con el prefijo /api/persona
app.use('/api/persona', PersonaRoutes);
app.use('/api/bitacora', BitacoraRoutes);
app.use('/api/muestra', MuestraRoutes);   // Usa solo una de las dos rutas para "muestra"
// app.use('/api/recurso', RecursosRoutes);
app.use('/api/especie', EspecieRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

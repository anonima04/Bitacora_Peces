import express from 'express';
const router = express.Router();
import admin from 'firebase-admin';

// Ruta para obtener muestras de una persona específica
router.get('/muestreo/:idPersona', async (req, res) => {
  const { idPersona } = req.params;

  try {
    const snapshot = await admin.firestore().collection('MUESTREO')
      .where('ID_PERSONA', '==', idPersona)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No se encontraron muestreo creadas por esta persona' });
    }

    // Mapea los documentos obtenidos
    const muestras = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(muestras);
  } catch (error) {
    console.error("Error al obtener muestreo:", error);
    res.status(500).json({ error: 'Error al obtener muestreo' });
  }
});

router.get('/bitacora/:idBitacora', async (req, res) => {
    const { idBitacora } = req.params;
  
    try {
      const snapshot = await admin.firestore().collection('MUESTREO')
        .where('ID_BITACORA', '==', idBitacora)
        .get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'No se encontraron muestreo creadas en esa bitacora' });
      }
  
      // Mapea los documentos obtenidos
      const muestras = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(muestras);
    } catch (error) {
      console.error("Error al obtener muestreo:", error);
      res.status(500).json({ error: 'Error al obtener muestreo' });
    }
  });

  

export default router;

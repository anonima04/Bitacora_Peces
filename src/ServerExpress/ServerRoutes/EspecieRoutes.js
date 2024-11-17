import express from 'express';
const router = express.Router();
import admin from 'firebase-admin';

// Ruta para obtener especies de bitácoras
router.get('/bitacoras/:idBitacora', async (req, res) => {
  const { idBitacora } = req.params;

  try {
    const snapshot = await admin.firestore().collection('ESPECIE')
      .where('ID_BITACORA', '==', idBitacora)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No se encontraron ESPECIES en esta bitácora' });
    }

    // Mapea los documentos obtenidos
    const bitacorasRecursos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(bitacorasRecursos);
  } catch (error) {
    console.error("Error al obtener especies:", error);
    res.status(500).json({ error: 'Error al obtener especies' });
  }
});

//routa para obtener a los especies guardadas por persona
router.get('/persona/:idPersona', async (req, res) => {
    const { idPersona } = req.params;
  
    try {
      const snapshot = await admin.firestore().collection('ESPECIE')
        .where('ID_PERSONA', '==', idPersona)
        .get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'No se encontraron ESPECIES guardas por esta persona' });
      }
  
      // Mapea los documentos obtenidos
      const recursos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(recursos);
    } catch (error) {
      console.error("Error al obtener especies:", error);
      res.status(500).json({ error: 'Error al obtener especies' });
    }
  });

  //routa para obtener a los especies por muestra
router.get('/muestra/:idMuestra', async (req, res) => {
    const { idMuestra } = req.params;
  
    try {
      const snapshot = await admin.firestore().collection('ESPECIE')
        .where('ID_MUESTREO', '==', idMuestra)
        .get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'No se encontraron ESPECIES guardas en muestra' });
      }
  
      // Mapea los documentos obtenidos
      const recursos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(recursos);
    } catch (error) {
      console.error("Error al obtener especies:", error);
      res.status(500).json({ error: 'Error al obtener especies' });
    }
  });

export default router;

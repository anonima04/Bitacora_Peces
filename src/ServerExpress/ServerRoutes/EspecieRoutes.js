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

  // Endpoint para obtener la información de una especie por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Captura el ID de la especie desde los parámetros de la URL

  try {
    // Consulta el documento en la colección "ESPECIE" por su ID
    const docSnapshot = await admin.firestore().collection('ESPECIE').doc(id).get();

    // Si el documento no existe, envía un mensaje de error
    if (!docSnapshot.exists) {
      return res.status(404).json({ message: 'No se encontró la especie con ese ID' });
    }

    // Si el documento existe, extrae sus datos
    const especieData = { id: docSnapshot.id, ...docSnapshot.data() };

    // Devuelve la información de la especie
    res.json(especieData);
  } catch (error) {
    console.error("Error al obtener la especie:", error);
    res.status(500).json({ error: 'Error al obtener la especie' });
  }
});
router.delete("/eliminar/:idEspecie", async (req, res) => {
  const { idEspecie} = req.params;
  
  try {
    const bitacoraRef = admin.firestore().collection('ESPECIE').doc(idEspecie);
    await bitacoraRef.delete();
    res.status(200).json({ message: `Especie con ID ${idEspecie} eliminada exitosamente` });
  } catch (error) {
    console.error("Error al eliminar la especie:", error);
    res.status(500).json({ error: 'Error al eliminar la especie' });
  }
});


export default router;

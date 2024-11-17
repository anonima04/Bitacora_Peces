import admin from 'firebase-admin';
import express from 'express';
const router = express.Router();

router.get('/data', async (req, res) => {
    try {
      const snapshot = await admin.firestore().collection('PERSONA').get();
      const data = snapshot.docs.map(doc => doc.data());
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener datos' });
    }
});

router.get('/:idPersona', async (req, res) => {
  const { idPersona } = req.params;  // Cambié uidPersona a idPersona

  try {
    const personaRef = await admin.firestore().collection('PERSONA').doc(idPersona).get();  // Asegúrate de esperar la respuesta

    if (!personaRef.exists) {  // Verificamos si el documento existe
      return res.status(404).json({ message: 'No se encontró esa persona' });
    }

    // Aquí no necesitas mapear, ya que solo se obtiene un documento
    res.json({ id: personaRef.id, ...personaRef.data() });

  } catch (error) {
    console.error("Error al obtener persona:", error);
    res.status(500).json({ error: 'Error al obtener persona' });
  }
});


router.delete('/delete/:idPersona', async (req, res) => {
  const { idPersona } = req.params; // Obtiene el id de la persona desde los parámetros de la URL

  try {
    const personaRef = admin.firestore().collection('PERSONA').doc(idPersona); // Referencia al documento de la persona

    // Eliminar el documento de la persona
    await personaRef.delete();

    res.status(200).json({ message: `Persona con ID ${idPersona} eliminada exitosamente` });
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    res.status(500).json({ error: 'Error al eliminar la persona' });
  }
});



export default router;

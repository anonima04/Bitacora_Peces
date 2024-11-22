import express from "express";
const router = express.Router();
import admin from "firebase-admin";

// Ruta para obtener muestras de una persona específica
router.get("/muestreo/:idPersona", async (req, res) => {
  const { idPersona } = req.params;

  try {
    const snapshot = await admin
      .firestore()
      .collection("MUESTREO")
      .where("ID_PERSONA", "==", idPersona)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({
          message: "No se encontraron muestreo creadas por esta persona",
        });
    }

    // Mapea los documentos obtenidos
    const muestras = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(muestras);
  } catch (error) {
    console.error("Error al obtener muestreo:", error);
    res.status(500).json({ error: "Error al obtener muestreo" });
  }
});

router.get("/bitacora/:idBitacora", async (req, res) => {
  const { idBitacora } = req.params;

  try {
    const snapshot = await admin
      .firestore()
      .collection("MUESTREO")
      .where("ID_BITACORA", "==", idBitacora)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({
          message: "No se encontraron muestreo creadas en esa bitacora",
        });
    }

    // Mapea los documentos obtenidos
    const muestras = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(muestras);
  } catch (error) {
    console.error("Error al obtener muestreo:", error);
    res.status(500).json({ error: "Error al obtener muestreo" });
  }
});

router.delete("/muestreo/eliminar/:idMuestreo", async (req, res) => {
  const { idMuestreo } = req.params;

  try {
    const bitacoraRef = admin
      .firestore()
      .collection("MUESTREO")
      .doc(idMuestreo);
    await bitacoraRef.delete();
    res
      .status(200)
      .json({
        message: `El muestreo con ID ${idMuestreo} eliminada exitosamente`,
      });
  } catch (error) {
    console.error("Error al eliminar el muestreo:", error);
    res.status(500).json({ error: "Error al eliminar la muestreo" });
  }
});

router.patch("/actualizar-especies/:idMuestreo", async (req, res) => {
  try {
    const { idMuestreo } = req.params;
    const { especieId } = req.body;

    // Actualizar el muestreo eliminando el ID de la especie
    const result = await Muestreo.updateOne(
      { id: idMuestreo },
      { $pull: { especies: especieId } } // Elimina el ID de la especie del array
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Muestreo no encontrado o sin cambios." });
    }

    res.status(200).json({ message: "Muestreo actualizado con éxito." });
  } catch (error) {
    console.error("Error actualizando el muestreo:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;

import express from "express";
const router = express.Router();
import admin from "firebase-admin";

// Ruta para obtener bitácoras de una persona específica
router.get("/bitacoras/:idPersona", async (req, res) => {
  const { idPersona } = req.params;

  try {
    const snapshot = await admin
      .firestore()
      .collection("BITACORA")
      .where("ID_PERSONA", "==", idPersona)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No se encontraron bitácoras para esta persona" });
    }

    // Mapea los documentos obtenidos
    const bitacoras = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(bitacoras);
  } catch (error) {
    console.error("Error al obtener bitácoras:", error);
    res.status(500).json({ error: "Error al obtener bitácoras" });
  }
});

// Ruta POST para crear una nueva bitácora
router.post("/bitacora", async (req, res) => {
  // Obtener el UID del usuario autenticado desde el token de Firebase
  const idToken = req.headers.authorization; // El token se pasa en los headers de la solicitud

  if (!idToken) {
    return res
      .status(401)
      .json({ error: "Se requiere token de autenticación" });
  }

  try {
    // Verificar el token y obtener el UID del usuario
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const idPersona = decodedToken.uid; // El UID es el idPersona

    // Obtener los datos del cuerpo de la solicitud
    const { titulo, descripcion } = req.body;

    // Verificar si se enviaron los datos requeridos
    if (!titulo || !descripcion) {
      return res
        .status(400)
        .json({ error: "Faltan datos necesarios (titulo, descripcion)" });
    }

    // Crear la nueva bitácora
    const nuevaBitacora = {
      ID_PERSONA: idPersona, // Relacionamos la bitácora con la persona
      TITULO: titulo,
      DESCRIPCION: descripcion,
      FECHA_CREACION: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Agregar la nueva bitácora a la colección 'BITACORAS'
    const bitacoraRef = await admin
      .firestore()
      .collection("BITACORA")
      .add(nuevaBitacora);

    // Responder con éxito y el ID del nuevo documento
    res.status(201).json({
      message: "Bitácora creada exitosamente",
      id: bitacoraRef.id,
      bitacora: nuevaBitacora,
    });
  } catch (error) {
    console.error("Error al crear la bitácora:", error);
    res.status(500).json({ error: "Error al crear la bitácora" });
  }
});

// Buscar bitácora por título
router.get("/bitacoras/titulo/:titulo", async (req, res) => {
  const { titulo } = req.params;

  try {
    // Buscar la bitácora en la colección BITACORA
    const snapshotBitacora = await admin.firestore().collection("BITACORA").get();

    // Filtrar las bitácoras que coinciden con el título (insensibilidad a mayúsculas y minúsculas)
    const bitacorasFiltradas = snapshotBitacora.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (doc) =>
          doc.TITULO &&
          doc.TITULO.toLowerCase() === titulo.trim().toLowerCase()
      );

    if (bitacorasFiltradas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron bitácoras con ese título" });
    }

    // Obtener las bitácoras con sus muestreos y especies
    const bitacoras = await Promise.all(
      bitacorasFiltradas.map(async (bitacoraData) => {
        // Obtener los IDs de los muestreos asociados a la bitácora
        const muestreoIds = bitacoraData.MUESTREOS || [];

        // Obtener los muestreos asociados a la bitácora
        const snapshotMuestreos = await Promise.all(
          muestreoIds.map(async (muestreoId) => {
            const docMuestreo = await admin
              .firestore()
              .collection("MUESTREO")
              .doc(muestreoId)
              .get();

            if (!docMuestreo.exists) return null;

            const muestreoData = docMuestreo.data();

            // Obtener las especies asociadas al muestreo (asumimos que las especies están en un campo llamado 'ESPECIES')
            const especieIds = muestreoData.ESPECIES || [];
            const especies = await Promise.all(
              especieIds.map(async (especieId) => {
                const docEspecie = await admin
                  .firestore()
                  .collection("ESPECIE")
                  .doc(especieId)
                  .get();

                return docEspecie.exists ? docEspecie.data() : null;
              })
            );

            return {
              ...muestreoData,
              especies: especies.filter((especie) => especie !== null), // Filtrar las especies válidas
            };
          })
        );

        // Filtrar los muestreos que son válidos (es decir, que existen)
        const validMuestreos = snapshotMuestreos.filter(
          (muestreo) => muestreo !== null
        );

        return {
          ...bitacoraData,
          muestreos: validMuestreos, // Incluir los muestreos asociados con sus especies
        };
      })
    );

    // Devolver las bitácoras con la información de los muestreos y especies
    res.json(bitacoras);
  } catch (error) {
    console.error("Error al buscar por título:", error);
    res.status(500).json({ error: "Error al buscar bitácoras" });
  }
});


// Buscar bitácoras por fecha de creación
router.get("/bitacoras/fecha/:fecha", async (req, res) => {
  const { fecha } = req.params;

  try {
    // Asegurarse de que la fecha proporcionada sea una cadena válida
    const fechaBuscada = fecha.trim();

    // Verificar si la fecha proporcionada tiene el formato correcto (YYYY-MM-DDTHH:mm)
    const fechaRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!fechaRegex.test(fechaBuscada)) {
      return res.status(400).json({ error: "Fecha proporcionada no tiene formato válido (YYYY-MM-DDTHH:mm)" });
    }

    // Obtener todas las bitácoras que tienen la fecha exacta como string
    const snapshot = await admin
      .firestore()
      .collection("BITACORA")
      .where("FECHA_CREACION", "==", fechaBuscada) // Compara las fechas como strings
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No se encontraron bitácoras con esa fecha" });
    }

    // Obtener todas las bitácoras encontradas
    const bitacoras = await Promise.all(
      snapshot.docs.map(async (docBitacora) => {
        const bitacoraData = { id: docBitacora.id, ...docBitacora.data() };

        // Obtener los IDs de los muestreos que están en el array de MUESTREOS de la bitácora
        const muestreoIds = bitacoraData.MUESTREOS || [];

        // Obtener los documentos de los muestreos correspondientes
        const snapshotMuestreos = await Promise.all(
          muestreoIds.map(async (muestreoId) => {
            const docMuestreo = await admin
              .firestore()
              .collection("MUESTREO")
              .doc(muestreoId)
              .get();

            if (!docMuestreo.exists) return null;

            const muestreoData = docMuestreo.data();

            // Obtener las especies asociadas al muestreo (asumimos que las especies están en un campo llamado 'ESPECIES')
            const especieIds = muestreoData.ESPECIES || [];
            const especies = await Promise.all(
              especieIds.map(async (especieId) => {
                const docEspecie = await admin
                  .firestore()
                  .collection("ESPECIE")
                  .doc(especieId)
                  .get();

                return docEspecie.exists ? docEspecie.data() : null;
              })
            );

            return {
              ...muestreoData,
              especies: especies.filter((especie) => especie !== null), // Filtramos las especies válidas
            };
          })
        );

        // Filtramos los muestreos que son válidos (es decir, que existen)
        const validMuestreos = snapshotMuestreos.filter(
          (muestreo) => muestreo !== null
        );

        return {
          ...bitacoraData,
          muestreos: validMuestreos, // Incluir los muestreos asociados con sus especies
        };
      })
    );

    // Devolver las bitácoras con la información de los muestreos y especies
    res.json(bitacoras);
  } catch (error) {
    console.error("Error al buscar por fecha:", error);
    res.status(500).json({ error: "Error al buscar bitácoras" });
  }
});



// Buscar muestreo por localización aproximada y obtener bitácora y especies relacionadas
router.get("/bitacoras/localizacion/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "Debe proporcionar lat y lng para la búsqueda",
    });
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return res.status(400).json({
      error: "lat y lng deben ser números válidos",
    });
  }

  const tolerancia = 0.0001; // Ajusta la tolerancia según la precisión requerida

  try {
    // Obtener todos los muestreos
    const snapshotMuestreos = await admin
      .firestore()
      .collection("MUESTREO")
      .get();

    // Filtrar los muestreos por coincidencia aproximada de lat y lng
    const muestreosFiltrados = snapshotMuestreos.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => {
        const localizacion = doc.LOCALIZACION_GEOGRAFICA;
        if (!localizacion) return false;

        const latDiff = Math.abs(localizacion.lat - latNum);
        const lngDiff = Math.abs(localizacion.lng - lngNum);

        return latDiff <= tolerancia && lngDiff <= tolerancia;
      });

    if (muestreosFiltrados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron muestreos en esa localización",
      });
    }

    // Obtener las bitácoras y especies asociadas a los muestreos filtrados
    const resultados = await Promise.all(
      muestreosFiltrados.map(async (muestreo) => {
        // Obtener la bitácora asociada usando el ID_BITACORA
        const docBitacora = muestreo.ID_BITACORA
          ? await admin
              .firestore()
              .collection("BITACORA")
              .doc(muestreo.ID_BITACORA)
              .get()
          : null;

        if (!docBitacora || !docBitacora.exists) {
          console.error(`Bitácora no encontrada para ID_BITACORA: ${muestreo.ID_BITACORA}`);
          return null; // Si no existe la bitácora, devolver null
        }

        const bitacoraData = docBitacora.data();

        // Obtener las especies asociadas a este muestreo
        const especies = Array.isArray(muestreo.ESPECIES)
          ? await Promise.all(
              muestreo.ESPECIES.filter(
                (especieId) => especieId && typeof especieId === "string" && especieId.trim() !== ""
              ).map(async (especieId) => {
                try {
                  const docEspecie = await admin
                    .firestore()
                    .collection("ESPECIE")
                    .doc(especieId)
                    .get();
                  return docEspecie.exists ? docEspecie.data() : null;
                } catch (error) {
                  console.error(`Error al obtener especie con ID: ${especieId}`, error);
                  return null;
                }
              })
            )
          : [];

        // Retornar el muestreo con la bitácora y las especies asociadas
        return {
          ...bitacoraData,
          muestreo: {
            ...muestreo,
            especies: especies.filter((especie) => especie !== null), // Filtrar especies no válidas
          },
        };
      })
    );

    // Filtramos las bitácoras válidas (en caso de que alguna no exista)
    const validResultados = resultados.filter(
      (resultado) => resultado !== null
    );

    res.json(validResultados);
  } catch (error) {
    console.error("Error al buscar por localización:", error);
    res.status(500).json({ error: "Error al buscar muestreos" });
  }
});


// Buscar bitácora por especie
router.get("/bitacoras/especie/:especie", async (req, res) => {
  const { especie } = req.params;

  try {
    // Obtener todas las especies que coinciden con el nombre común
    const snapshotEspecies = await admin.firestore().collection("ESPECIE").get();

    // Filtrar las especies que coinciden con el nombre común (insensibilidad a mayúsculas y minúsculas)
    const especiesFiltradas = snapshotEspecies.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (doc) =>
          doc.NOMBRE_COMUN &&
          doc.NOMBRE_COMUN.toLowerCase() === especie.trim().toLowerCase()
      );

    if (especiesFiltradas.length === 0) {
      return res.status(404).json({
        message: "No se encontraron especies con ese nombre común",
      });
    }

    // Obtener los IDs de las especies encontradas
    const especieIds = especiesFiltradas.map((especie) => especie.id);

    // Obtener los muestreos que contienen estas especies
    const snapshotMuestreos = await admin.firestore().collection("MUESTREO").get();

    // Filtrar los muestreos que contienen al menos una de las especies encontradas
    const muestreosFiltrados = snapshotMuestreos.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (doc) => doc.ESPECIES && doc.ESPECIES.some((idEspecie) => especieIds.includes(idEspecie))
      );

    if (muestreosFiltrados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron muestreos con esa especie",
      });
    }

    // Obtener las bitácoras asociadas a los muestreos filtrados
    const resultadosBitacoras = await Promise.all(
      muestreosFiltrados.map(async (muestreo) => {
        const docBitacora = await admin.firestore().collection("BITACORA").doc(muestreo.ID_BITACORA).get();

        if (!docBitacora.exists) return null;

        const bitacoraData = docBitacora.data();

        return {
          ...bitacoraData,
          muestreo: muestreo,
        };
      })
    );

    const validResultados = resultadosBitacoras.filter((resultado) => resultado !== null);

    if (validResultados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron bitácoras asociadas a la especie",
      });
    }

    // Enviar los resultados filtrados
    res.json(validResultados);
  } catch (error) {
    console.error("Error al buscar bitácoras por especie:", error);
    res.status(500).json({ error: "Error al buscar bitácoras por especie" });
  }
});


export default router;

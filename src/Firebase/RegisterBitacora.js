/*
  1. getStorage inicializa una referencia al servicio de almacenamiento de Firebase.
  2. ref permite crear una referencia a una ubicación en Firebase Storage.
  3. uploadBytes sube un archivo a Firebase Storage.
  4. getDownloadURL obtiene la URL de descarga pública de un archivo almacenado en Firebase.
*/
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, db, where, query, getDocs } from "./firebase.js";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";

export const subirImagenAStorage = async (carpeta, file) => {
  const storage = getStorage();
  const storageRef = ref(storage, carpeta + file.name); // Ruta en Firebase Storage
  try {
    // Subir el archivo
    await uploadBytes(storageRef, file);
    // Obtener la URL de descarga de la imagen
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    alert("Error al subir la imagen: " + error);
    return null;
  }
};

export const getURLFotos = async (carpeta, fotos) => {
  const urlsFotos = [];
  for (let i = 0; i < fotos.length; i++) {
    const url = await subirImagenAStorage(carpeta, fotos[i]);
    if (url) {
      urlsFotos.push(url);
    }
  }

  return urlsFotos;
};

export const addDocumento = async (coleccion, objeto) => {
  try {
    // Agregar el documento a la colección
    const docMuestreo = await addDoc(collection(db, coleccion), objeto);
    alert("Documento registrado");
    return docMuestreo.id; // Retorna el ID del DOCUMENTO
  } catch (e) {
    alert("Error al agregar el documento: " + e.message);
  }
};

export const getPersonaID = async (UID) => {
  try {
    // Supone que el UID está asociado a la colección `PERSONA`
    const q = query(collection(db, "PERSONA"), where("UID", "==", UID)); // Consulta la colección 'PERSONA' buscando el documento donde 'UID' coincide con userUID
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const personaId = querySnapshot.docs[0].id; // ID del documento
      return personaId;
    } else {
      alert("No se encontró el documento de persona");
    }
  } catch (error) {
    alert("Error al obtener ID de persona: " + error.message);
  }
};

export const agregarMuestreoBitacora = async (muestreo, ID_Bitacora) => {
  const documentoID = await addDocumento("MUESTREO", muestreo);
  const bitacoraRef = doc(db, "BITACORA", ID_Bitacora);
  await updateDoc(bitacoraRef, {
    MUESTREOS: arrayUnion(documentoID),
  });
  return documentoID;
};

export const agregarIdBitacora_Especie = async (ids_especies, ID_Muestreo) => {
  try {
    //Se recorre cada posicio  de ids de especies
    for (const ID of ids_especies) {
      const especieRef = doc(db, "ESPECIE", ID); //Se Referencia al documento de cada especie en la colección 'ESPECIE'
      //Se actualiza el documento con el nuevo campo ID_BITACORA
      await updateDoc(especieRef, {
        ID_MUESTREO: ID_Muestreo,
      });
    }
  } catch (error) {
    alert("Error al agregar ID_BITACORA a las especies: " + error.message);
  }
};

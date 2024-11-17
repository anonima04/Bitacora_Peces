/*
  1. getStorage inicializa una referencia al servicio de almacenamiento de Firebase.
  2. ref permite crear una referencia a una ubicación en Firebase Storage.
  3. uploadBytes sube un archivo a Firebase Storage.
  4. getDownloadURL obtiene la URL de descarga pública de un archivo almacenado en Firebase.
*/
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, db } from "./firebase.js";

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
    return docMuestreo.id; // Retorna el ID del MUESTREO
  } catch (e) {
    alert("Error al agregar el documento: " + e.message);
  }
};

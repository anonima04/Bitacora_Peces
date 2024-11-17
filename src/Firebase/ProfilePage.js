import {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  auth,
} from "../Firebase/firebase.js";

/*Método para obtener el ID del documento cuando el UID de la persona sea 
  igual al UID del usuario autenticado, este metodo es necesario para que 
  funcione el componente ProfilePage*/
export const getPersonaID = async (navigate) => {
  const userUID = auth.currentUser.uid; // UID del usuario autenticado

  try {
    // Supone que el UID está asociado a la colección `PERSONA`
    const q = query(collection(db, "PERSONA"), where("UID", "==", userUID)); // Consulta la colección 'PERSONA' buscando el documento donde 'UID' coincide con userUID
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const personaId = querySnapshot.docs[0].id; // ID del documento
      navigate(`/perfil/${personaId}`); // personaId usado como parametro para que sea usado en ProfilePage con useParams()
    } else {
      alert("No se encontró el documento de persona");
    }
  } catch (error) {
    alert("Error al obtener ID de persona: " + error.message);
  }
};

// Método para obtener los datos de una persona basado en el ID del documento
export const getDatosPersonaID = async (personaID, setLoading, setError) => {
  try {
    // Referencia al documento específico en la colección 'PERSONA'
    const userDoc = doc(db, "PERSONA", personaID);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return userSnapshot.data(); // Devuelve los datos del usuario si el documento existe
    } else {
      setError("No se encontró el usuario con ese ID");
      return null;
    }
  } catch (error) {
    setError(`Hubo un error al obtener los datos: ${error.message}`);
    return null;
  } finally {
    setLoading(false);
  }
};

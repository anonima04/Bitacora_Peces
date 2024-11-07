import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useParams } from "react-router-dom";
import './File.css';

const File = () => {
  const { bitacoraId } = useParams(); // Captura el bitacoraId de la URL
  const [bitacora, setBitacora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBitacora = async () => {
      try {
        const bitacoraDocRef = doc(db, "BITACORA", bitacoraId);
        const bitacoraDoc = await getDoc(bitacoraDocRef);

        if (bitacoraDoc.exists()) {
          setBitacora(bitacoraDoc.data());
        } else {
          console.error("No se encontró la bitácora para el ID proporcionado.");
        }
      } catch (error) {
        console.error("Error obteniendo bitácora:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (bitacoraId) {
      fetchBitacora();
    }
  }, [bitacoraId]);

  if (loading) return <div>Cargando bitácora...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="div-file-body">
      {bitacora ? (
        <>
          <h2>{bitacora.TITULO}</h2>
          {/* Renderiza otros campos de la bitácora según lo necesites */}
        </>
      ) : (
        <p>No hay bitácora disponible.</p>
      )}
    </div>
  );
};

export default File;

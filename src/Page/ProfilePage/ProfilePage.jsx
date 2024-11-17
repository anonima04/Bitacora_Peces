import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import Footer from "../../Components/Footer/Footer";
import { getDatosPersonaID } from "../../Firebase/ProfilePage.js";

const ProfilePage = () => {
  const { userId } = useParams(); //Utiliza el parametro de la ruta ejemplo perfil/123; "123" seria el userId
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [bitacoras, setBitacoras] = useState(null);
  // const [muestreo, setMuestreo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getDatosPersonaID(userId, setLoading, setError)); // await para esperar su resolucion debido a que devuelve una promesa
    };

    fetchUser();
  }, [userId]);

  // useEffect(() => {
  //   const fetchBitacoras = async () => {
  //     try {
  //       const bitacoraCollection = collection(db, "BITACORA");
  //       const q = query(bitacoraCollection, where("ID_PERSONA", "==", userId));
  //       const querySnapshot = await getDocs(q);

  //       const fetchedBitacoras = querySnapshot.docs.map((doc) => doc.data());
  //       setBitacoras(fetchedBitacoras);
  //     } catch (error) {
  //       console.error("Error haciendo fetching de bitácoras:", error);
  //       setError(error.message);
  //     }
  //   };
  //   fetchBitacoras();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchMuestreo = async () => {
  //     try {
  //       const muestreoCollection = collection(db, "MUESTREO");
  //       const q = query(muestreoCollection, where("ID_PERSONA", "==", userId));
  //       const querySnapshot = await getDocs(q);

  //       const fetchedMuestreo = querySnapshot.docs.map((doc) => doc.data());
  //       setMuestreo(fetchedMuestreo);
  //     } catch (error) {
  //       console.error("Error haciendo fetching de muestreo:", error);
  //       setError(error.message);
  //     }
  //   };
  //   fetchMuestreo();
  // }, [userId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="body-div-profile">
      <section id="profile" className="profile-section">
        <div className="profile-container">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/276/776/non_2x/logo-icon-person-on-white-background-free-vector.jpg"
            alt="Foto del Usuario"
            className="profile-pic"
          />
          <h2>
            {user.PRIMER_NOMBRE} {user.SEGUNDO_NOMBRE} {user.PRIMER_APELLIDO}{" "}
            {user.SEGUNDO_APELLIDO}
          </h2>
          <p>
            <strong>EMAIL: </strong> {user.CORREO}
          </p>
          <p>
            <strong>ROL: </strong>
            {user.ROL}
          </p>
          <p>
            <strong>TELEFONO: </strong>
            {user.TELEFONO}
          </p>
        </div>
      </section>

      <section className="bitagora-section">
        <h2>Bitácoras colaboradas</h2>
        {/* {bitacoras.length > 0 ? (
          bitacoras.map((bitacora, index) => (
            <div key={index} className="bitacora-item">
              <p>
                <strong>TITULO: </strong>
                {bitacora.TITULO}
              </p>
              <p>
                <strong>DESCRIPCION:</strong> {bitacora.DESCRIPCION}
              </p>
              <p>
                <strong>FECHA CREACION:</strong> {bitacora.FECHA_CREACION}
              </p>
            </div>
          ))
        ) : (
          <p>No hay bitácoras colaboradas</p>
        )} */}
      </section>
      <section className="muestra-section">
        <h2>Muestras creadas</h2>
        {/* {muestreo.length > 0 ? (
          muestreo.map((muestra, index) => (
            <div key={index} className="muestra-item">
              <p>
                <strong>OBSERVACION:</strong> {muestra.OBSERVACION}
              </p>
              <p>
                <strong>CONDICION CLIMATICA:</strong>{" "}
                {muestra.CONDICION_CLIMATICA}
              </p>
              <p>
                <strong>DESCRIPCION:</strong> {muestra.DESCRIPCION_HABITAD}
              </p>
              <p>
                <strong>CANTIDAD MUESTRAS:</strong> {muestra.CANT_MUESTRA}
              </p>
            </div>
          ))
        ) : (
          <p>No hay muestras creadas</p>
        )} */}
      </section>
      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;

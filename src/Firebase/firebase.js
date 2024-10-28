// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Se importa la función para acceder a Firestore
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0fuN8CGrV2HtBOzS19nPL0A8cCuhZ7Pw",
  authDomain: "bitagorapeces.firebaseapp.com",
  projectId: "bitagorapeces",
  storageBucket: "bitagorapeces.appspot.com",
  messagingSenderId: "655875001351",
  appId: "1:655875001351:web:2dcd551a617522200deea2",
  measurementId: "G-BED12BW95X",
};

// Iniciamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);
// Inicializamos la base de datos Firestore
const db = getFirestore(app);

//Exportamos app y db para hacer uso de ellas en otros componentes
export default app;
export { db };

import { motion } from "framer-motion";
import AutoplayCarousels from "../../Components/AutoplayCarousels/AutoplayCarousels";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>

      <NavBar />
      <div className="div-leaf">
        <div id="div-leaf-home">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="homepage-title"
          >
            Bitácora de Plantas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="homepage-subtitle"
          ><strong>
            Sumérgete en el mundo de la botánica y explora cada etapa de
            crecimiento de tus plantas favoritas. En nuestro sitio, puedes
            registrar y crear bitácoras personalizadas para cada especie que
            cuidas, desde los primeros brotes hasta sus momentos de esplendor.
            Aquí, cada planta tiene una historia que contar, y tú eres el
            narrador. Organiza, documenta y aprende sobre el crecimiento, los
            cuidados y las curiosidades de cada planta mientras construyes un
            archivo vivo de tu propio oasis verde. ¡Empieza hoy tu bitácora y
            conecta con la naturaleza como nunca antes!
            </strong></motion.p>
        </div>
        {/* Contenedor único para el AutoplayCarousels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="carousel-container"
        >
          <AutoplayCarousels />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

import { useEffect, useState } from "react";
import AppBar_Home from "../../Components/AppBar_Home/AppBar_Home";
import "./Home.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % plantas.length);
    }, 2000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <div id="div-transition">
        <AppBar_Home />
        <div className="div-planta">
          <img src={plantas[currentIndex]} alt="planta" id="img-planta" />
        </div>
      </div>
    </>
  );
};

const plantas = [
  "https://img.freepik.com/fotos-premium/plantas-que-pueden-cambiar-su-sabor-fondo-color-solido-4k-ultra-hd_964851-139486.jpg",
  "https://img.freepik.com/fotos-premium/plantas-que-pueden-hablar-contando-historias-sobre-su-crecimiento-fondo-color-solido-4k-ultra-hd_964851-139834.jpg",
  "https://img.freepik.com/fotos-premium/plantas-em-crescimento-hd-8k-papel-de-parede-imagem-fotografica_1030895-18.jpg",
  "https://img.freepik.com/fotos-premium/plantas-hd-fondo-pantalla-imagen-fotografica_993236-911.jpg",
  "https://img.freepik.com/fotos-premium/riego-plantas-vegetales-primer-plano-riego-goteo-campo-ai-generado_653623-1887.jpg",
  "https://img.freepik.com/fotos-premium/planta-joven-diseno-concepto-agricultura-cultivar-alimentos-concepto-agricultura-concepto-vida-saludable-fondo-natural-concepto-cuidado-naturaleza-tierra-concepto-hoja-natural-concepto-ecologia_155807-7939.jpg",
];

export default Home;

import { useState, useEffect } from "react";
import "./AutoplayCarousels.css";

const images = [
  "https://wallpapers.com/images/featured/plantas-omkgbojkkw14dmmv.jpg",
  "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2024/06/14/17183517565791.jpg",
  "https://images.pexels.com/photos/1379627/pexels-photo-1379627.jpeg",
  "https://www.farbio.com/cdn/shop/articles/die-5-seltensten-pflanzen-der-welt-666343.jpg?v=1683570226",
];

const AutoplayCarousels = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      siguienteImagen();
    }, 3000);

    return () => clearInterval(interval); // Limpieza del intervalo
  });

  const siguienteImagen = () => {
    setIndex((index + 1) % images.length);
  };

  const imagenAnterior = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      {images.map((src, i) => (
        <img
          key={index}
          src={src}
          alt={`Imagen ${index + 1}`}
          className={(i === index ? "active" : "") + " img-plantas"}
        />
      ))}

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={imagenAnterior}>
          &lt;
        </button>
        <button className="carousel-arrow" onClick={siguienteImagen}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AutoplayCarousels;

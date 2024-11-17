import { useState, useEffect } from "react";
import "./AutoplayCarousels.css";

const images = [
  "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2024/06/14/17183517565791.jpg",
  "https://images.pexels.com/photos/1379627/pexels-photo-1379627.jpeg",
  "https://www.farbio.com/cdn/shop/articles/die-5-seltensten-pflanzen-der-welt-666343.jpg?v=1683570226",
];

const AutoplayCarousels = () => {
  const [image, setImage] = useState(images);

  useEffect(() => {
    const animation = setInterval(() => {
      setImage((prevImages) => {
        const newImages = [...prevImages]; //Hago copia -> estado anterior
        newImages.unshift(newImages.pop()); //Elimino ultimo elemento y se agrega al inicio del arreglo
        return newImages; //Devuelvo el nuevo estado
      });
    }, 3000); //Actualizacion cada 2 Segundos

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="div-itemsPlantas">
      {image.map((img, i) => (
        <div key={i} className={`itemPlanta  itemPlanta${i}`}>
          <img
            src={img}
            alt="Planta"
            className="imgPlanta"
            id={`imgPlanta${i}`}
          />
        </div>
      ))}
    </div>
  );
};

export default AutoplayCarousels;

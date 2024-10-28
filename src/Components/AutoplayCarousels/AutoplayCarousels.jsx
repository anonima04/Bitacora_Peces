import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AutoplayCarousels.css";

const AutoplayCarousels = () => {
  return (
    <div className="carousel-container">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide carousel-wrapper"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <a href="https://www.clarin.com/internacional/plantas-flores-tipos-ideales-tener-casa_0_XOM1fHe2Kk.html">
              <img
                src="https://www.clarin.com/2023/10/05/O2hopEADA_720x0__1.jpg"
                className="d-block w-100 carousel-image"
                alt="Flores para tener en casa"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>Plantas con flores, ideales para tener en casa</h5>
            </div>
          </div>
          <div className="carousel-item">
            <a href="https://www.elmundo.es/yodona/lifestyle/2024/06/17/666bf6a2e85ece68648b4585.html">
              <img
                src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2024/06/14/17183517565791.jpg"
                className="d-block w-100 carousel-image"
                alt="20 plantas aromáticas de interior y exterior"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>20 plantas aromáticas de interior y exterior fáciles de cultivar para tu jardín y tus recetas</h5>
            </div>
          </div>
          <div className="carousel-item">
            <a href="https://blog.homedepot.com.mx/club-jardineria/tipos-de-tierra">
              <img
                src="https://blog.homedepot.com.mx/wp-content/uploads/2023/07/flores-1-1024x683.jpeg"
                className="d-block w-100 carousel-image"
                alt="peces"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>Conoce distintos tipos de tierra para el cuidado de las plantas</h5>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default AutoplayCarousels;

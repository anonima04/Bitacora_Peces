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
            <a href="https://es.mongabay.com/2018/08/oceanos-plaga-pez-leon-en-caribe/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/pez%20tigre.webp?alt=media&token=294b76d6-4841-4471-8b84-f82e1adce653"
                className="d-block w-100 carousel-image"
                alt="Pez leon en el Caribe Colombiano"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>Pez león en el Caribe Colombiano</h5>
            </div>
          </div>
          <div className="carousel-item">
            <a href="https://colombia.inaturalist.org/taxa/132688-Amphiprion-ocellaris">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/pez%20payaso.webp?alt=media&token=dd79b2c2-9771-45e2-9f57-67b2cb8f8cd3"
                className="d-block w-100 carousel-image"
                alt="pez payaso"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>Todo sobre el pez payaso</h5>
            </div>
          </div>
          <div className="carousel-item">
            <a href="https://www.hola.com/mascotas/20220211204436/peces-mas-bonitos-llamativos-para-acuario-dn/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bitagorapeces.appspot.com/o/peces.webp?alt=media&token=d4b7d602-cb7b-4a68-9b48-7c47bf0f70b8"
                className="d-block w-100 carousel-image"
                alt="peces"
              />
            </a>
            <div className="carousel-caption d-none d-md-block">
              <h5>Peces llamativos y bonitos para tu acuario</h5>
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

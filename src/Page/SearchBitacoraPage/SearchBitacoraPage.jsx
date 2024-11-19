import { useState } from "react";
import "./SearchBitacoraPage.css";
import Footer from "../../Components/Footer/Footer";
import { CircularProgress } from "@mui/material";
import ResultByTitle from "./ResultBy/Title/ResultByTitle";
import ResultByDate from "./ResultBy/Date/ResultByDate";
import ResultByLocation from "./ResultBy/Location/ResultByLocation";
import ResultBySpecies from "./ResultBy/Species/ResultBySpecies";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const SearchBitacoraPage = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("titulo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordenadas, setCoordenadas] = useState({ lat: "", lng: "" });

  const handleSearch = async () => {
    // Validación de los campos de búsqueda
    if (
      (searchType !== "ubicacion" && !query.trim()) || // Validar campo vacío excepto para ubicación
      (searchType === "ubicacion" && (!coordenadas.lat || !coordenadas.lng))
    ) {
      setError("Debe completar los campos de búsqueda.");
      return;
    }

    if (
      searchType === "ubicacion" &&
      (isNaN(parseFloat(coordenadas.lat)) || isNaN(parseFloat(coordenadas.lng)))
    ) {
      setError("Las coordenadas deben ser valores numéricos válidos.");
      return;
    }

    setLoading(true);
    setError(null);
    setBusqueda([]);

    try {
      let url;
      if (searchType === "ubicacion") {
        // URL para búsqueda por ubicación
        url = `http://localhost:5000/api/bitacora/bitacoras/localizacion/${coordenadas.lat}/${coordenadas.lng}`;
      } else {
        // URL para otros tipos de búsqueda
        url = `http://localhost:5000/api/bitacora/bitacoras/${searchType}/${query}`;
      }

      // Realizar la petición
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error al buscar por ${searchType}`);

      const data = await response.json();
      setBusqueda(data);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      const mensajeError =
        searchType === "ubicacion"
          ? "Error al buscar por ubicación. Verifica las coordenadas ingresadas."
          : `Error al buscar por ${searchType}`;
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  const manejarClickMapa = (e) => {
    setCoordenadas({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const maxFecha = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

  return (
    <div className="search-bitacora-page">
      <div className="search-container">
        <h1 className="titulo-buscar">Buscar Bitácoras</h1>
        <div className="search-form">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="titulo">Por Título</option>
            <option value="fecha">Por Fecha</option>
            <option value="ubicacion">Por Ubicación</option>
            <option value="especie">Por Especies Recolectadas</option>
          </select>

          {searchType === "fecha" ? (
            <input
              id="id_date_inp"
              type="date"
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              max={maxFecha()}
            />
          ) : searchType === "ubicacion" ? (
            <div className="map-container">
              <LoadScript googleMapsApiKey="AIzaSyA0y00mkDr-lq0OHrscslA47lRbKBZ59zs">
                <GoogleMap
                  id="mapa-busqueda"
                  mapContainerStyle={{
                    height: "300px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  zoom={10}
                  center={{ lat: 1.61438, lng: -75.60623 }}
                  onClick={manejarClickMapa}
                  options={{ minZoom: 3 }}
                ></GoogleMap>
              </LoadScript>
              <div className="coords-input">
                <label>
                  Latitud:
                  <input
                    type="text"
                    value={coordenadas.lat}
                    onChange={(e) =>
                      setCoordenadas({ ...coordenadas, lat: e.target.value })
                    }
                    placeholder="Ingrese latitud"
                  />
                </label>
                <label>
                  Longitud:
                  <input
                    type="text"
                    value={coordenadas.lng}
                    onChange={(e) =>
                      setCoordenadas({ ...coordenadas, lng: e.target.value })
                    }
                    placeholder="Ingrese longitud"
                  />
                </label>
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ingrese ${searchType}`}
              className="search-input"
            />
          )}

          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>

        {loading && <CircularProgress className="loading-message" />}
        {error && <p className="error-message">Error: {error}</p>}

        <div className="results-container">
          {searchType === "titulo" && <ResultByTitle busqueda={busqueda} />}
          {searchType === "fecha" && <ResultByDate busqueda={busqueda} />}
          {searchType === "ubicacion" && <ResultByLocation busqueda={busqueda} />}
          {searchType === "especie" && <ResultBySpecies busqueda={busqueda} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchBitacoraPage;

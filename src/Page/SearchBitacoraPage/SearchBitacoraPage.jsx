import { useState } from "react";
import "./SearchBitacoraPage.css";
import Footer from "../../Components/Footer/Footer";
import AppBar_Home from "../../Components/AppBar_Home/AppBar_Home";
import { CircularProgress } from "@mui/material";
import ResultByTitle from "./ResultBy/ResultByTitle";
import ResultByDate from "./ResultBy/ResultByDate";
import ResultByLocation from "./ResultBy/ResultByLocation";
import ResultBySpecies from "./ResultBy/ResultBySpecies";

const SearchBitacoraPage = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("titulo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setBusqueda([]);

    try {
      const response = await fetch(
        `http://localhost:5000/api/bitacora/bitacoras/${searchType}/${query}`
      );
      if (!response.ok) throw new Error(`Error al buscar por ${searchType}`);
      
      const data = await response.json();
      setBusqueda(data);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bitacora-page">
      <AppBar_Home />
      <div className="search-container">
        <h1>Buscar Bitácoras</h1>
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
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ingrese ${searchType}`}
            className="search-input"
          />
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
          
          {busqueda.length === 0 && !loading && !error && <p>No se encontraron resultados</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchBitacoraPage;

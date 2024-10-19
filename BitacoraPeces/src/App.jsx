// src/App.js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> // Ajusta esto según la estructura de tu dato
        ))}
      </ul>
    </div>
  );
}

export default App;

import "./CPelicula.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CPelicula({ peliculas, setPeliculas }) {
  const [pelicula, setPelicula] = useState({
    nombre: "",
    genero: "",
    duracion: "",
    inventario: 1,
  });

  const [peliculaAgregada, setPeliculaAgregada] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPelicula((prevPelicula) => ({
      ...prevPelicula,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const agregarPelicula = () => {
    const total = peliculas.length;
    const ultimaPelicula = peliculas[total - 1];
    const ultimoId = ultimaPelicula.idPelicula;
    const idPelicula = ultimoId + 1;
    const nuevaPelicula = { idPelicula, ...pelicula };
    setPeliculas((prevPeliculas) => [...prevPeliculas, nuevaPelicula]);
    setPeliculaAgregada(true);
  };

  const handleOkClick = () => {
    navigate("/pelicula");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarPelicula();
  };

  return (
    <div className="CPelicula">
      <h1>Agregar Pelicula</h1>
      <div className="mensaje">
        {peliculaAgregada && (
          <div className="caja">
            <p>Pelicula agregada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!peliculaAgregada && (
        <div className="Pedir-container">
          <div className="Pedir">
            <br></br>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">
                Nombre<span className="required">*</span>:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={pelicula.nombre}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="genero">Genero:</label>
              <input
                type="text"
                id="genero"
                name="genero"
                value={pelicula.genero}
                onChange={handleChange}
              />
              <br></br>
              <label htmlFor="duracion">Duracion:</label>
              <input
                type="number"
                id="duracion"
                name="duracion"
                value={pelicula.duracion}
                min={1}
                step={1}
                onChange={handleChange}
              />
              <br></br>
              <label htmlFor="inventario">
                Inventario<span className="required">*</span>:
              </label>
              <input
                type="number"
                id="inventario"
                name="inventario"
                value={pelicula.inventario}
                min={0}
                step={1}
                onChange={handleChange}
                required
              />
              <br></br>
              <span className="required">*</span> Campos obligatorios
              <br></br>
              <div className="section">
                <ul className="botC">
                  <button>Agregar</button>
                </ul>
              </div>
            </form>
            <div className="section">
              <ul className="botC">
                <Link
                  to={{
                    pathname: "/pelicula",
                    state: { peliculas, setPeliculas },
                  }}
                >
                  <button>Regresar</button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CPelicula;

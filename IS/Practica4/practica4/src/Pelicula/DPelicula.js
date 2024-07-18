import "./DPelicula.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DPelicula({ peliculas, setPeliculas, rentas }) {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(false);
  const [peliculaEliminada, setPeliculaEliminada] = useState(false);
  const [peliculaConRenta, setPeliculaConRenta] = useState(false);

  const navigate = useNavigate();

  const handlePeliculaSeleccionada = (event) => {
    const peliculaId = event.target.value;
    const pelicula = peliculas.find(
      (pelicula) => pelicula.idPelicula === parseInt(peliculaId)
    );
    setPeliculaSeleccionada(pelicula);
  };

  const verificarPeliculaConRenta = () => {
    return rentas.some(
      (renta) => renta.idPelicula === peliculaSeleccionada.idPelicula
    );
  };

  const eliminarPelicula = () => {
    if (verificarPeliculaConRenta()) {
      setPeliculaConRenta(true);
    } else {
      const nuevasPeliculas = peliculas.filter(
        (pelicula) => pelicula.idPelicula !== peliculaSeleccionada.idPelicula
      );
      setPeliculas(nuevasPeliculas);
      setPeliculaEliminada(true);
    }
  };

  const handleOkClick = () => {
    navigate("/pelicula");
  };

  return (
    <div className="DPelicula">
      <h1>Eliminar Pelicula</h1>
      {!peliculaSeleccionada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <br></br>
            <label htmlFor="peliculaSelect">
              Seleccione una pelicula para eliminar
            </label>
            <br></br>
            <div className="custom-select-container">
              <select
                className="custom-select"
                id="peliculaSelect"
                onChange={handlePeliculaSeleccionada}
              >
                <option value="">Seleccionar pelicula</option>
                {peliculas.map((pelicula) => (
                  <option key={pelicula.idPelicula} value={pelicula.idPelicula}>
                    {pelicula.idPelicula} - {pelicula.nombre} -{" "}
                    {pelicula.inventario} unidades
                  </option>
                ))}
              </select>
              <div className="section">
                <ul className="botC">
                  <Link
                    to={{
                      pathname: "/pelicula",
                      state: { peliculas, setPeliculas, rentas },
                    }}
                  >
                    <button>Regresar</button>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {peliculaEliminada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Pelicula eliminada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>La pelicula tiene rentas asociadas, no se puede eliminar</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaSeleccionada && !peliculaEliminada && !peliculaConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>¿Eliminar la pelicula?</p>
            <p>Nombre: {peliculaSeleccionada.nombre}</p>
            <p>Genero: {peliculaSeleccionada.genero}</p>
            <p>Duracion: {peliculaSeleccionada.duracion}</p>
            <p>Inventario: {peliculaSeleccionada.inventario}</p>
            <div className="section">
              <ul className="botC">
                <button onClick={eliminarPelicula}>Eliminar</button>
              </ul>
              <ul className="botC">
                <Link
                  to={{
                    pathname: "/pelicula",
                    state: { peliculas, setPeliculas, rentas },
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

export default DPelicula;

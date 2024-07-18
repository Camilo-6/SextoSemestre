import "./RPelicula.css";

import React from "react";
import { Link } from "react-router-dom";

function RPelicula({ peliculas, setPeliculas, rentas }) {
  return (
    <div className="RPelicula">
      <h1>Lista de Peliculas</h1>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Genero</th>
              <th>Duracion</th>
              <th>inventario</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.map((pelicula) => (
              <tr key={pelicula.idPelicula}>
                <td>{pelicula.idPelicula}</td>
                <td>{pelicula.nombre}</td>
                <td>{pelicula.genero}</td>
                <td>{pelicula.duracion}</td>
                <td>{pelicula.inventario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/agregar",
              state: { peliculas, setPeliculas },
            }}
          >
            <button>Agregar Pelicula</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/modificar",
              state: { peliculas, setPeliculas },
            }}
          >
            <button>Modificar Pelicula</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/eliminar",
              state: { peliculas, setPeliculas, rentas },
            }}
          >
            <button>Eliminar Pelicula</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/",
            }}
          >
            <button>Regresar</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default RPelicula;

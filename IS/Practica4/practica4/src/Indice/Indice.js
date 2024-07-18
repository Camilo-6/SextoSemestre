import "./Indice.css";

import React from "react";
import { Link } from "react-router-dom";

function Indice({
  usuarios,
  SetUsuarios,
  peliculas,
  setPeliculas,
  rentas,
  setRentas,
}) {
  return (
    <div className="Indice">
      <h2>Indice</h2>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/usuario",
              state: { usuarios, SetUsuarios, rentas },
            }}
          >
            <button>Usuarios</button>
          </Link>
        </ul>
      </div>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/pelicula",
              state: { peliculas, setPeliculas, rentas },
            }}
          >
            <button>Peliculas</button>
          </Link>
        </ul>
      </div>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/renta",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button>Rentas</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Indice;

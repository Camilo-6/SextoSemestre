import "./RRenta.css";

import React from "react";
import { Link } from "react-router-dom";

function RRenta({ usuarios, peliculas, rentas, setRentas }) {
  return (
    <div className="RRenta">
      <h1>Lista de Rentas</h1>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID del Usuario</th>
              <th>ID de la Pelicula</th>
              <th>Fecha de Renta</th>
              <th>Dias de Renta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rentas.map((renta) => (
              <tr key={renta.idRentar}>
                <td>{renta.idRentar}</td>
                <td>{renta.idUsuario}</td>
                <td>{renta.idPelicula}</td>
                <td>
                  {(() => {
                    const fecha = new Date(renta.fecha_renta);
                    fecha.setDate(fecha.getDate() + 1); // sumar un dia a la fecha, sino se muestra un dia menos
                    return fecha.toLocaleDateString();
                  })()}
                </td>
                <td>{renta.dias_de_renta}</td>
                <td>{renta.estatus ? "Activa" : "Inactiva"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/renta/agregar",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button>Agregar Renta</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/renta/modificar",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button>Modificar Renta</button>
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

export default RRenta;

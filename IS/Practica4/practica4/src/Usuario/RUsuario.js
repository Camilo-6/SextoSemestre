import "./RUsuario.css";

import React from "react";
import { Link } from "react-router-dom";

function RUsuario({ usuarios, setUsuarios, rentas }) {
  return (
    <div className="RUsuario">
      <h1>Lista de Usuarios</h1>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Contraseña</th>
              <th>Email</th>
              <th>Super Usuario</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apPat}</td>
                <td>{usuario.apMat}</td>
                <td>{usuario.password}</td>
                <td>{usuario.email}</td>
                <td>{usuario.superUser ? "Si" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/agregar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button>Agregar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/modificar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button>Modificar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/eliminar",
              state: { usuarios, setUsuarios, rentas },
            }}
          >
            <button>Eliminar Usuario</button>
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

export default RUsuario;

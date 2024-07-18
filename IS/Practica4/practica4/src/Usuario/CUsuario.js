import "./CUsuario.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CUsuario({ usuarios, setUsuarios }) {
  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState({
    nombre: "",
    apPat: "",
    apMat: "",
    password: "",
    email: "",
    superUser: false,
  });

  const [usuarioAgregado, setUsuarioAgregado] = useState(false); // Estado para controlar la visibilidad del mensaje de usuario agregado
  const [correoEnUso, setCorreoEnUso] = useState(false); // Estado para controlar la visibilidad del mensaje de correo en uso

  // Hook useNavigate para redireccionar despues de agregar un usuario
  const navigate = useNavigate();

  // Manejar cambios en los campos de entrada y actualizar el estado del usuario
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const verificarCorreoEnUso = () => {
    return usuarios.some((u) => u.email === usuario.email);
  };

  const agregarUsuario = () => {
    if (verificarCorreoEnUso()) {
      setCorreoEnUso(true); // Mostrar mensaje de correo en uso
    } else {
      const total = usuarios.length;
      const ultimoUsuario = usuarios[total - 1];
      const ultimoId = ultimoUsuario.idUsuario;
      const idUsuario = ultimoId + 1;
      const nuevoUsuario = { idUsuario, ...usuario };
      setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
      setUsuarioAgregado(true); // Mostrar mensaje de usuario agregado
    }
  };

  const handleOkClick = () => {
    navigate("/usuario");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarUsuario();
  };

  return (
    <div className="CUsuario">
      <h1>Agregar Usuario</h1>
      <div className="mensaje">
        {usuarioAgregado && (
          <div className="caja">
            <p>Usuario agregado</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        )}
        {correoEnUso && (
          <div className="caja">
            <p>Correo en uso, intente con otro</p>
            <div className="section">
              <ul className="botC">
                <button onClick={() => setCorreoEnUso(false)}>OK</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!usuarioAgregado && !correoEnUso && (
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
                value={usuario.nombre}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="apPat">
                Apellido Paterno<span className="required">*</span>:
              </label>
              <input
                type="text"
                id="apPat"
                name="apPat"
                value={usuario.apPat}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="apMat">Apellido Materno:</label>
              <input
                type="text"
                id="apMat"
                name="apMat"
                value={usuario.apMat}
                onChange={handleChange}
              />
              <br></br>
              <label htmlFor="password">
                Contraseña<span className="required">*</span>:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={usuario.password}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="email">
                Email<span className="required">*</span>:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="superUser">Super Usuario:</label>
              <input
                type="checkbox"
                id="superUser"
                name="superUser"
                checked={usuario.superUser}
                onChange={handleChange}
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
                    pathname: "/usuario",
                    state: { usuarios, setUsuarios },
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

export default CUsuario;

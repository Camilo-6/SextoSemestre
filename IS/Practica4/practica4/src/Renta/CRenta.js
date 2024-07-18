import "./CRenta.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CRenta({ usuarios, peliculas, rentas, setRentas }) {
  const [renta, setRenta] = useState({
    idUsuario: "",
    idPelicula: "",
    fecha_renta: "",
    dias_de_renta: 5,
    estatus: false,
  });

  const [rentaAgregada, setRentaAgregada] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRenta((prevRenta) => ({
      ...prevRenta,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const agregarRenta = () => {
    if (renta.dias_de_renta === "") {
      renta.dias_de_renta = 5;
    }
    const total = rentas.length;
    const ultimaRenta = rentas[total - 1];
    const ultimoId = ultimaRenta.idRentar;
    const idRentar = ultimoId + 1;
    const nuevaRenta = { idRentar, ...renta };
    setRentas((prevRentas) => [...prevRentas, nuevaRenta]);
    setRentaAgregada(true);
  };

  const handleOkClick = () => {
    navigate("/renta");
  };

  const handleUsuarioSeleccionado = (event) => {
    const idUsuario = event.target.value;
    setRenta((prevRenta) => ({
      ...prevRenta,
      idUsuario,
    }));
  };

  const handlePeliculaSeleccionada = (event) => {
    const idPelicula = event.target.value;
    setRenta((prevRenta) => ({
      ...prevRenta,
      idPelicula,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarRenta();
  };

  return (
    <div className="CRenta">
      <h1>Agregar Renta</h1>
      <div className="mensaje">
        {rentaAgregada && (
          <div className="caja">
            <p>Renta agregada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!rentaAgregada && (
        <div className="Pedir-container">
          <div className="Pedir">
            <br></br>
            <form onSubmit={handleSubmit}>
              <label htmlFor="idUsuario">
                ID del Usuario<span className="required">*</span>:
              </label>
              <select
                name="idUsuario"
                value={renta.idUsuario}
                onChange={handleUsuarioSeleccionado}
                required
              >
                <option value="">Seleccionar usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                    {usuario.idUsuario} - {usuario.nombre} - {usuario.email}
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="idPelicula">
                ID de la Pelicula<span className="required">*</span>:
              </label>
              <select
                name="idPelicula"
                value={renta.idPelicula}
                onChange={handlePeliculaSeleccionada}
                required
              >
                <option value="">Seleccionar pelicula</option>
                {peliculas.map((pelicula) => (
                  <option key={pelicula.idPelicula} value={pelicula.idPelicula}>
                    {pelicula.idPelicula} - {pelicula.nombre} -{" "}
                    {pelicula.inventario} unidades
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="fecha_renta">
                Fecha de Renta<span className="required">*</span>:
              </label>
              <input
                type="date"
                name="fecha_renta"
                value={renta.fecha_renta}
                onChange={handleChange}
                required
              />
              <br></br>
              <label htmlFor="dias_de_renta">Dias de Renta:</label>
              <input
                type="number"
                name="dias_de_renta"
                value={renta.dias_de_renta}
                min={1}
                step={1}
                onChange={handleChange}
              />
              <br></br>
              <label htmlFor="estatus">Estado:</label>
              <input
                type="checkbox"
                name="estatus"
                checked={renta.estatus}
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
                    pathname: "/renta",
                    state: { usuarios, peliculas, rentas, setRentas },
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

export default CRenta;

import "./URenta.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function URenta({ usuarios, peliculas, rentas, setRentas }) {
  const [datosRenta, setDatosRenta] = useState({
    idUsuario: "",
    idPelicula: "",
    fecha_renta: "",
    dias_de_renta: 5,
    estatus: false,
  });

  const [rentaSeleccionada, setRentaSeleccionada] = useState(false);
  const [rentaModificada, setRentaModificada] = useState(false);

  const navigate = useNavigate();

  const handleRentaSeleccionada = (event) => {
    const rentaId = event.target.value;
    const renta = rentas.find((renta) => renta.idRentar === parseInt(rentaId));
    setRentaSeleccionada(renta);
    setDatosRenta({ ...renta });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDatosRenta((prevDatosRenta) => ({
      ...prevDatosRenta,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const modificarRenta = () => {
    const idRentar = rentaSeleccionada.idRentar;
    const rentaModi = { idRentar, ...datosRenta };
    const nuevasRentas = rentas.map((renta) =>
      renta.idRentar === idRentar ? rentaModi : renta
    );
    setRentas(nuevasRentas);
    setRentaModificada(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    modificarRenta();
  };

  const handleOkClick = () => {
    navigate("/renta");
  };

  const fechaBonita = (fecha) => {
    const fechaDate = new Date(fecha);
    fechaDate.setDate(fechaDate.getDate() + 1); // sumar un dia a la fecha, sino se muestra un dia menos
    return fechaDate.toLocaleDateString();
  };

  return (
    <div className="URenta">
      <h1>Actualizar Renta</h1>
      {!rentaSeleccionada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <br></br>
            <label htmlFor="rentaSelect">
              Selecciona una renta para modificar
            </label>
            <br></br>
            <div className="custom-select-container">
              <select
                className="custom-select"
                id="rentaSelect"
                onChange={handleRentaSeleccionada}
              >
                <option value="">Selecciona una renta</option>
                {rentas.map((renta) => (
                  <option key={renta.idRentar} value={renta.idRentar}>
                    {renta.idRentar} - {fechaBonita(renta.fecha_renta)}
                  </option>
                ))}
              </select>
            </div>
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
      {rentaModificada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Renta modificada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Ok</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {rentaSeleccionada && !rentaModificada && (
        <div>
          <form>
            <div className="Cajita-container">
              <div className="Cajita">
                <br></br>
                <label htmlFor="idUsuario">ID del Usuario:</label>
                <input
                  type="text"
                  id="idUsuario"
                  name="idUsuario"
                  value={datosRenta.idUsuario}
                  readOnly
                />
                <br></br>
                <label htmlFor="idPelicula">ID de la Pelicula:</label>
                <input
                  type="text"
                  id="idPelicula"
                  name="idPelicula"
                  value={datosRenta.idPelicula}
                  readOnly
                />
                <br></br>
                <label htmlFor="fecha_renta">Fecha de Renta:</label>
                <input
                  type="text"
                  id="fecha_renta"
                  name="fecha_renta"
                  value={fechaBonita(datosRenta.fecha_renta)}
                  readOnly
                />
                <br></br>
                <label htmlFor="dias_de_renta">Dias de Renta:</label>
                <input
                  type="number"
                  id="dias_de_renta"
                  name="dias_de_renta"
                  value={datosRenta.dias_de_renta}
                  readOnly
                />
                <br></br>
                <label htmlFor="estatus">Estado:</label>
                <input
                  type="checkbox"
                  id="estatus"
                  name="estatus"
                  checked={datosRenta.estatus}
                  onChange={handleChange}
                />
                <br></br>
                <div className="section">
                  <ul className="botC">
                    <button type="button" onClick={handleSubmit}>
                      Guardar Cambios
                    </button>
                  </ul>
                </div>
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
          </form>
        </div>
      )}
    </div>
  );
}

export default URenta;

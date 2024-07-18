import "./UPelicula.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UPelicula({ peliculas, setPeliculas }) {
  const [datosPelicula, setDatosPelicula] = useState({
    nombre: "",
    genero: "",
    duracion: "",
    inventario: 1,
  });

  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(false);
  const [peliculaModificada, setPeliculaModificada] = useState(false);
  const [datosFaltantes, setDatosFaltantes] = useState(false);

  const navigate = useNavigate();

  const handlePeliculaSeleccionada = (event) => {
    const peliculaId = event.target.value;
    const pelicula = peliculas.find(
      (pelicula) => pelicula.idPelicula === parseInt(peliculaId)
    );
    setPeliculaSeleccionada(pelicula);
    setDatosPelicula({ ...pelicula });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosPelicula((prevDatosPelicula) => ({
      ...prevDatosPelicula,
      [name]: value,
    }));
  };

  const verificarDatosFaltantes = () => {
    return datosPelicula.nombre === "" || datosPelicula.inventario === "";
  };

  const modificarPelicula = () => {
    if (verificarDatosFaltantes()) {
      setDatosFaltantes(true);
    } else {
      const idPelicula = peliculaSeleccionada.idPelicula;
      const peliculaModi = { idPelicula, ...datosPelicula };
      const nuevasPeliculas = peliculas.map((pelicula) =>
        pelicula.idPelicula === idPelicula ? peliculaModi : pelicula
      );
      setPeliculas(nuevasPeliculas);
      setPeliculaModificada(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    modificarPelicula();
  };

  const handleOkClick = () => {
    navigate("/pelicula");
  };

  const handleOkClick3 = () => {
    setDatosFaltantes(false);
  };

  return (
    <div className="UPelicula">
      <h1>Modificar Pelicula</h1>
      {!peliculaSeleccionada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <br></br>
            <label htmlFor="peliculaSelect">
              Selecciona una pelicula para modificar
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
            </div>
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
      {peliculaModificada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Pelicula modificada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {datosFaltantes && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Por favor complete los campos de nombre e inventario</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick3}>OK</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaSeleccionada && !peliculaModificada && !datosFaltantes && (
        <div>
          <form>
            <div className="Cajita-container">
              <div className="Cajita">
                <br></br>
                <label htmlFor="nombre">
                  Nombre<span className="required">*</span>:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datosPelicula.nombre}
                  onChange={handleChange}
                  required
                />
                <br></br>
                <label htmlFor="genero">Genero:</label>
                <input
                  type="text"
                  id="genero"
                  name="genero"
                  value={datosPelicula.genero}
                  onChange={handleChange}
                />
                <br></br>
                <label htmlFor="duracion">Duracion:</label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  value={datosPelicula.duracion}
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
                  value={datosPelicula.inventario}
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
                    <button type="button" onClick={handleSubmit}>
                      Guardar Cambios
                    </button>
                  </ul>
                </div>
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
          </form>
        </div>
      )}
    </div>
  );
}

export default UPelicula;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Registro.css";

function Registro() {
  const [cookies] = useCookies(["id_usuario"]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("c");
  const [infoNombreVacio, setInfoNombreVacio] = useState(false);
  const [correoEnUso, setCorreoEnUso] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [errorCrearCuenta, setErrorCrearCuenta] = useState(false);
  const [errorEnviarCorreo, setErrorEnviarCorreo] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const [crearCuentaEnProceso, setCrearCuentaEnProceso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario !== undefined && cookies.id_usuario !== -1) {
      navigate("/menu");
    }
  }, [cookies.id_usuario, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crearCuentaEnProceso) {
      return;
    }
    if (nombre === "") {
      setInfoNombreVacio(true);
      return;
    }
    if (correo === "") {
      setInfoNombreVacio(true);
      return;
    }
    setCrearCuentaEnProceso(true);
    fetch("http://127.0.0.1:5000/registrar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        rol: rol,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.error) {
          case 0:
            setCorreoEnUso(true);
            break;
          case 1:
            setErrorCrearCuenta(true);
            break;
          case 2:
            setErrorEnviarCorreo(true);
            break;
          case 3:
            setCorreoEnviado(true);
            break;
          default:
            setErrorCrearCuenta(true);
            break;
        }
      })
      //.catch((error) => console.error("Error:", error));
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      })
      .finally(() => setCrearCuentaEnProceso(false));
  };

  return (
    <div>
      {infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>Faltan datos. El nombre y/o correo no pueden estar vacíos.</h2>
            <button onClick={() => setInfoNombreVacio(false)}>Ok</button>
          </div>
        )}
      {!infoNombreVacio &&
        correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>El correo ya esta en uso, intenta con uno diferente.</h2>
            <button onClick={() => setCorreoEnUso(false)}>Ok</button>
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>
              Tu cuenta fue creada exitosamente, por favor revisa tu correo para
              conocer tu contraseña.
            </h2>
            <button onClick={() => navigate("/menu")}>OK</button>
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>
              Hubo un error al crear la cuenta, por favor intentalo mas tarde.
            </h2>
            <button onClick={() => navigate("/inicio")}>OK</button>
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>Error en el envío de correo</h2>
            <p>
              Hubo un problema al enviar el correo con la contraseña, pero la
              cuenta se creó exitosamente
            </p>
            <p>
              Envíe un correo a atención al cliente para conocer la contraseña
            </p>
            <br></br>
            <button onClick={() => navigate("/inicio")}>Regresar</button>
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>Hay un problema con la conexión</h2>
            <p>Por favor intente más tarde</p>
            <img src="/penguin-error.gif" alt="Penguin Error" />
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        crearCuentaEnProceso && (
          <div>
            <h2>Creando la cuenta</h2>
            <p>Por favor espere...</p>
            <img src="/penguin.gif" alt="Penguin" />
          </div>
        )}
      {!infoNombreVacio &&
        !correoEnUso &&
        !correoEnviado &&
        !errorCrearCuenta &&
        !errorEnviarCorreo &&
        !errorConexion &&
        !crearCuentaEnProceso && (
          <div>
            <h2>Crea una cuenta</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <br />
              <label>Correo Electrónico:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <br />
              <label>Teléfono (Opcional):</label>
              <input
                type="number"
                value={telefono}
                min={1}
                max={9999999999}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <br />
              <br></br>
              <label>Rol:</label>
              <select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="c">Comprador</option>
                <option value="v">Vendedor</option>
              </select>
              <div style={{ marginBottom: "10px" }}></div>
              <div align="center">
                <button type="submit" disabled={crearCuentaEnProceso}>
                  Registrarse
                </button>
              </div>
            </form>
            <br></br>
            <div align="center">
              <button onClick={() => navigate("/inicio")}>Regresar</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Registro;

import "./InicioSesion.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function InicioSesion() {
  const [cookies, setCookie] = useCookies(["id_usuario", "rol", "clave"]);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [infoIncorrecta, setInfoIncorrecta] = useState(false);
  const [datosFaltantes, setDatosFaltantes] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario !== undefined && cookies.id_usuario !== -1) {
      navigate("/menu");
    }
  }, [cookies.id_usuario, navigate]);

  const handleChangeCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handleChangeContrasenia = (e) => {
    setContrasenia(e.target.value);
  };

  const handleSubmit = () => {
    if (correo === "" || contrasenia === "") {
      setDatosFaltantes(true);
      return;
    }
    fetch("http://127.0.0.1:5000/iniciar/revisar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ correo: correo, contrasenia: contrasenia }),
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.iden) {
          case -1:
            setInfoIncorrecta(true);
            break;
          default:
            setCookie("id_usuario", data.iden, { path: "/" });
            setCookie("rol", data.rol, { path: "/" });
            setCookie("clave", data.clave, { path: "/" });
            navigate("/menu");
            break;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
  };

  const handleClic1 = () => {
    setInfoIncorrecta(false);
  };

  const handleClic2 = () => {
    navigate("/inicio");
  };

  const handleClic3 = () => {
    setDatosFaltantes(false);
  };

  return (
    <div>
      {datosFaltantes && !infoIncorrecta && !errorConexion && (
        <div>
          <h2>Datos faltantes</h2>
          <button onClick={handleClic3}>Aceptar</button>
        </div>
      )}
      {!datosFaltantes && infoIncorrecta && !errorConexion && (
        <div>
          <h2>El correo y/o contraseña son incorrectos</h2>
          <button onClick={handleClic1}>Aceptar</button>
        </div>
      )}
      {!datosFaltantes && !infoIncorrecta && errorConexion && (
        <div>
          <h2>Hay un problema con la conexión</h2>
          <p>Por favor intente más tarde</p>
          <img src="/penguin-error.gif" alt="Penguin Error" />
        </div>
      )}
      {!datosFaltantes && !infoIncorrecta && !errorConexion && (
        <div className="login_container">
          <h2>Inicio de sesión</h2>
          <br></br>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={handleChangeCorreo}
          />
          <br></br>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={handleChangeContrasenia}
          />
          <br></br>
          <div align="center">
            <button onClick={handleSubmit}>Iniciar</button>
          </div>
          <br></br>
          <div align="center">
            <button onClick={handleClic2}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InicioSesion;

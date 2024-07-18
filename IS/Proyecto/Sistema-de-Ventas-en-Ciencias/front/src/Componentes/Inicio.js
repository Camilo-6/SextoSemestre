import "./Inicio.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Inicio() {
  const [cookies] = useCookies(["id_usuario", "rol"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario !== undefined && cookies.id_usuario !== -1) {
      navigate("/menu");
    }
  }, [cookies.id_usuario, navigate]);

  const handleCrearCuenta = () => {
    navigate("/registro");
  };

  const handleClic1 = () => {
    navigate("/iniciar");
  };

  return (
    <div className="Inicio">
      <div className="header-inicio">
        <h2>Inicio</h2>
        <img src="/logo.jpg" alt="Logo" className="logo-inicio" />
      </div>
      <br></br>
      <button onClick={handleClic1}>Iniciar Sesion</button>
      <br />
      <br />
      <button onClick={handleCrearCuenta}>Registrarse</button>
    </div>
  );
}

export default Inicio;

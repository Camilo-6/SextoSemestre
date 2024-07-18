import "./SeleccionarProductoR.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SeleccionarProductoR() {
  const [cookies, setCookie] = useCookies(["id_usuario", "rol", "productoR"]);
  const [noHayCompras, setNoHayCompras] = useState(false);
  const [listaProductosComprados, setListaProductosComprados] = useState([]);
  const [errorConexion, setErrorConexion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      setCookie("productoR", -1, { path: "/" });
      navigate("/inicio");
    }
    if (cookies.rol === "v") {
      setCookie("productoR", -1, { path: "/" });
      navigate("/menu");
    } else if (cookies.rol !== "c") {
      setCookie("id_usuario", -1, { path: "/" });
      setCookie("rol", "", { path: "/" });
      setCookie("productoR", -1, { path: "/" });
      navigate("/inicio");
    }
    fetch("http://127.0.0.1:5000/seleccionar_producto_r/productos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ id: cookies.id_usuario }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListaProductosComprados(data.productos);
        if (data.productos.length === 0) {
          setNoHayCompras(true);
        }
      })
      //.catch((error) => console.error("Error:", error));
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
  }, [cookies.id_usuario, cookies.rol, navigate, setCookie]);

  const handleClic1 = (event) => {
    setCookie("productoR", event.target.value, { path: "/" });
    navigate("/dejar_review");
  };

  const handleClic2 = () => {
    setCookie("productoR", -1, { path: "/" });
    navigate("/menu");
  };

  return (
    <div>
      {noHayCompras && !errorConexion && (
        <div>
          <h2>No hay productos comprados</h2>
          <p>Necesitas comprar un producto para poder dejarle una review</p>
          <button onClick={handleClic2}>Regresar</button>
        </div>
      )}
      {!noHayCompras && errorConexion && (
        <div>
          <h2>Hay un problema con la conexión</h2>
          <p>Por favor intente más tarde</p>
          <img src="/penguin-error.gif" alt="Penguin Error" />
        </div>
      )}
      {!noHayCompras && !errorConexion && (
        <div>
          <h2>Selecciona un producto para dejarle una review</h2>
          <select onChange={handleClic1}>
            <option value="">Selecciona un producto</option>
            {listaProductosComprados.map((producto) => (
              <option key={producto.IDProducto} value={producto.IDProducto}>
                Nombre: {producto.NombreProducto} - Categoria:{" "}
                {producto.CategoriaProducto} - Precio: {producto.PrecioProducto}
              </option>
            ))}
          </select>
          <br></br>
          <br></br>
          <button onClick={handleClic2}>Regresar</button>
        </div>
      )}
    </div>
  );
}

export default SeleccionarProductoR;

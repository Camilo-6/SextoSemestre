import "./Comprar.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Comprar() {
  const [cookies, setCookie] = useCookies([
    "id_usuario",
    "rol",
    "producto",
    "clave",
  ]);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const [productoNoDisponible, setProductoNoDisponible] = useState(false);
  const [errorCompra, setErrorCompra] = useState(false);
  const [errorEnvioCorreo, setErrorEnvioCorreo] = useState(false);
  const [errorConCuenta, setErrorConCuenta] = useState(false);
  const [productoComprado, setProductoComprado] = useState(false);
  const [idProducto, setIdProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [foto, setFoto] = useState("");
  const [compraEnProceso, setCompraEnProceso] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      setCookie("producto", -1, { path: "/" });
      navigate("/inicio");
    }
    if (cookies.rol === "v") {
      setCookie("producto", -1, { path: "/" });
      navigate("/menu");
    } else if (cookies.rol !== "c") {
      setCookie("id_usuario", -1, { path: "/" });
      setCookie("rol", "", { path: "/" });
      setCookie("producto", -1, { path: "/" });
      navigate("/inicio");
    } else if (cookies.producto === undefined || cookies.producto === -1) {
      navigate("/lista_productos");
    }
    fetch("http://127.0.0.1:5000/ventas/obtener", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ IDProducto: cookies.producto }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.resultado === 0) {
          setProductoNoEncontrado(true);
        } else {
          setIdProducto(data.IDProducto);
          setNombre(data.NombreProducto);
          setDescripcion(data.DescripcionProducto);
          setCategoria(data.CategoriaProducto);
          setPrecio(data.PrecioProducto);
          setCantidad(data.CantidadProducto);
          setFoto(data.FotoProducto);
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
    //.catch((error) => console.error("Error:", error));
  }, [cookies.id_usuario, cookies.rol, cookies.producto, navigate, setCookie]);

  const comprarProducto = () => {
    if (compraEnProceso) {
      return;
    }
    setCompraEnProceso(true);
    if (cantidad === 0) {
      setCompraEnProceso(false);
      setProductoNoDisponible(true);
      return;
    }
    fetch("http://127.0.0.1:5000/ventas/comprar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        IDProducto: idProducto,
        IDUsuarioComprador: cookies.id_usuario,
        clave: cookies.clave,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.resultado) {
          case 0:
            setProductoNoEncontrado(true);
            return;
          case -1:
            setErrorConCuenta(true);
            return;
          case -2:
            alert("Necesita ser comprador para comprar productos");
            setCookie("producto", -1, { path: "/" });
            setCookie("rol", "v", { path: "/" });
            navigate("/menu");
            return;
          case -3:
            setErrorCompra(true);
            return;
          case -4:
            setErrorEnvioCorreo(true);
            return;
          case -6:
            setErrorConCuenta(true);
            return;
          case 1:
            setProductoComprado(true);
            return;
          default:
            setErrorCompra(true);
            return;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        //setErrorCompra(true);
        console.error("Error:", error);
      })
      .finally(() => {
        setCompraEnProceso(false);
      });
  };

  const handleClic1 = () => {
    setProductoNoEncontrado(false);
    setCookie("producto", -1, { path: "/" });
    navigate("/lista_productos");
  };

  const handleClic2 = () => {
    setErrorConCuenta(false);
    setCookie("id_usuario", -1, { path: "/" });
    setCookie("rol", "", { path: "/" });
    setCookie("producto", -1, { path: "/" });
    setCookie("clave", "", { path: "/" });
    navigate("/inicio");
  };

  return (
    <div>
      {productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Producto no encontrado</h2>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Producto no disponible</h2>
            <p>Intente comprar el producto en otro momento</p>
            <br></br>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Compra realizada con éxito</h2>
            <p>Revise su correo para la confirmación de la compra</p>
            <br></br>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Error en la compra</h2>
            <p>Intente comprar el producto en otro momento</p>
            <br></br>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Error en el envío de correo</h2>
            <p>
              Hubo un problema al enviar el correo de confirmación, pero la
              compra se realizó
            </p>
            <p>
              Envíe un correo a atención al cliente para confirmar la compra
            </p>
            <br></br>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Error en la cuenta</h2>
            <p>Hubo un problema con tu cuenta</p>
            <br></br>
            <button onClick={() => handleClic2()}>Regresar</button>
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Procesando la compra</h2>
            <p>Por favor espere...</p>
            <img src="/penguin.gif" alt="Penguin" />
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        errorConexion && (
          <div>
            <h2>Hay un problema con la conexión</h2>
            <p>Por favor intente más tarde</p>
            <img src="/penguin-error.gif" alt="Penguin Error" />
          </div>
        )}
      {!productoNoEncontrado &&
        !productoNoDisponible &&
        !productoComprado &&
        !errorCompra &&
        !errorEnvioCorreo &&
        !errorConCuenta &&
        !compraEnProceso &&
        !errorConexion && (
          <div>
            <h2>Producto</h2>
            <p>Nombre: {nombre}</p>
            <p>Descripción: {descripcion}</p>
            <p>Categoría: {categoria}</p>
            <p>Precio: {precio}</p>
            <p>Cantidad: {cantidad}</p>
            <img
              src={`data:image/png;base64,${foto}`}
              alt="Foto de producto"
              style={{ width: "200px", height: "200px" }}
            />
            <br></br>
            <br></br>
            <button
              disabled={compraEnProceso}
              onClick={() => comprarProducto()}
            >
              Comprar
            </button>
            <br></br>
            <br></br>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
    </div>
  );
}

export default Comprar;

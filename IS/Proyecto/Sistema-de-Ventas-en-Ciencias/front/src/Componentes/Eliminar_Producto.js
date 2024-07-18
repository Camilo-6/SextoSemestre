import "./Eliminar_Producto.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function EliminarProducto() {
  const [image, setImage] = useState(null);
  const [cookies, setCookie] = useCookies([
    "id_usuario",
    "rol",
    "clave",
    "productoE",
  ]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(1);
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("Comida");
  const [eliminandoEnProceso, setEliminandoEnProceso] = useState(false);
  const [errorCuenta, setErrorCuenta] = useState(false);
  const [errorEliminarProducto, setErrorEliminarProducto] = useState(false);
  const [productoEliminado, setProductoEliminado] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const [noPuedesEliminar, setNoPuedesEliminar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      navigate("/inicio");
    }
    if (cookies.rol === "c") {
      navigate("/menu");
    } else if (cookies.rol !== "v") {
      setCookie("id_usuario", -1, { path: "/" });
      setCookie("rol", "", { path: "/" });
      navigate("/inicio");
    }
    fetch("http://127.0.0.1:5000/eliminar_producto/obtener", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        IDUsuarioVendedor: cookies.id_usuario,
        IDProducto: cookies.productoE,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.resultado) {
          case 0:
            setProductoNoEncontrado(true);
            return;
          case -1:
            setErrorCuenta(true);
            return;
          case -2:
            alert("Necesita ser vendedor para eliminar productos");
            setCookie("rol", "c", { path: "/" });
            setCookie("productoE", -1, { path: "/" });
            navigate("/menu");
            return;
          case -3:
            setNoPuedesEliminar(true);
            return;
          case 1:
            setNombre(data.NombreProducto);
            setDescripcion(data.DescripcionProducto);
            setPrecio(data.PrecioProducto);
            setCantidad(data.CantidadProducto);
            setCategoria(data.CategoriaProducto);
            setImage(data.FotoProducto);
            return;
          default:
            setErrorConexion(true);
            return;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
  }, [cookies.id_usuario, cookies.rol, cookies.productoE, navigate, setCookie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eliminandoEnProceso) {
      return;
    }
    if (image === null) {
      alert("Por favor seleccione una imagen válida");
      return;
    }
    setEliminandoEnProceso(true);
    fetch("http://127.0.0.1:5000/eliminar_producto/eliminar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        IDProducto: cookies.productoE,
        IDUsuarioVendedor: cookies.id_usuario,
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
            setErrorCuenta(true);
            return;
          case -2:
            alert("Necesita ser vendedor para eliminar productos");
            setCookie("rol", "c", { path: "/" });
            navigate("/menu");
            return;
          case -3:
            setNoPuedesEliminar(true);
            return;
          case -4:
            setErrorCuenta(true);
            return;
          case -5:
            setErrorEliminarProducto(true);
            return;
          case 1:
            setProductoEliminado(true);
            return;
          default:
            setErrorEliminarProducto(true);
            return;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      })
      .finally(() => setEliminandoEnProceso(false));
  };

  const handleClic1 = () => {
    setCookie("productoE", -1, { path: "/" });
    navigate("/lista_productos_vendedor");
  };

  const handleClic3 = () => {
    setErrorCuenta(false);
    setCookie("id_usuario", -1, { path: "/" });
    setCookie("rol", "", { path: "/" });
    setCookie("clave", "", { path: "/" });
    setCookie("productoE", -1, { path: "/" });
    navigate("/inicio");
  };

  const handleClic4 = () => {
    setCookie("productoE", -1, { path: "/" });
    navigate("/lista_productos_vendedor");
  };

  return (
    <div>
      {eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Eliminando el producto</h2>
            <p>Por favor espere...</p>
            <img src="/penguin.gif" alt="Penguin" />
          </div>
        )}
      {!eliminandoEnProceso &&
        errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Error en la cuenta</h2>
            <p>Hubo un problema con tu cuenta</p>
            <br></br>
            <button onClick={handleClic3}>Aceptar</button>
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Error al eliminar el producto</h2>
            <p>Intente eliminar el producto en otro momento</p>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Producto eliminado con éxito</h2>
            <br></br>
            <button onClick={handleClic4}>Regresar</button>
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Hay un problema con la conexión</h2>
            <p>Por favor intente más tarde</p>
            <img src="/penguin-error.gif" alt="Penguin Error" />
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        productoNoEncontrado &&
        !noPuedesEliminar && (
          <div>
            <h2>Producto no encontrado</h2>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        noPuedesEliminar && (
          <div>
            <h2>No puedes eliminar este producto</h2>
            <p>Solo puedes eliminar productos que hayas agregado</p>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!eliminandoEnProceso &&
        !errorCuenta &&
        !errorEliminarProducto &&
        !productoEliminado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesEliminar && (
          <div className="cajita-container">
            <h2>Eliminar Producto</h2>
            <div>
              <div className="row">
                <div className="column">
                  <label htmlFor="nombre">Nombre del Producto:</label>
                  <p>{nombre}</p>
                </div>
                <br></br>
                <div className="column">
                  <label htmlFor="precio">Precio:</label>
                  <p>${precio}</p>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="descripcion">Descripción:</label>
                  <p>{descripcion}</p>
                </div>
                <br></br>
                <div className="column">
                  <label htmlFor="cantidad">Cantidad:</label>
                  <p>{cantidad}</p>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="categoria">Categoría:</label>
                  <p>
                    {categoria === "Comida"
                      ? "Comida"
                      : categoria === "Ropa"
                      ? "Ropa"
                      : categoria === "Electronicos"
                      ? "Electrónicos"
                      : categoria === "Mascotas"
                      ? "Mascotas"
                      : categoria === "Joyeria"
                      ? "Joyería"
                      : "Otros"}
                  </p>
                </div>
                <br></br>
                <div className="column image-upload-container">
                  <label htmlFor="imagen">Imagen del Producto:</label>
                  <p>
                    <img
                      src={`data:image/png;base64,${image}`}
                      alt="Imagen del Producto"
                      className="product-image"
                      align="center"
                      style={{ width: "50", height: "50px" }}
                    />
                  </p>
                </div>
              </div>
              <br></br>
              <div align="center">
                <button disabled={eliminandoEnProceso} onClick={handleSubmit}>
                  Eliminar Producto
                </button>
              </div>
              <br></br>
              <div align="center">
                <button onClick={handleClic1}>Regresar</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default EliminarProducto;

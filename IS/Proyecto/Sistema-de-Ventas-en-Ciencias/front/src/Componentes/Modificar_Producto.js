import "./Modificar_Producto.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function ModificarProducto() {
  const [image, setImage] = useState(null);
  const [cookies, setCookie] = useCookies([
    "id_usuario",
    "rol",
    "clave",
    "productoM",
  ]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(1);
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("Comida");
  const [modificandoEnProceso, setModificandoEnProceso] = useState(false);
  const [errorCuenta, setErrorCuenta] = useState(false);
  const [errorModificarProducto, setErrorModificarProducto] = useState(false);
  const [productoModificado, setProductoModificado] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const [cargandoImagen, setCargandoImagen] = useState(false);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const [noPuedesModificar, setNoPuedesModificar] = useState(false);
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
    fetch("http://127.0.0.1:5000/modificar_producto/obtener", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        IDUsuarioVendedor: cookies.id_usuario,
        IDProducto: cookies.productoM,
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
            alert("Necesita ser vendedor para modificar productos");
            setCookie("rol", "c", { path: "/" });
            setCookie("productoM", -1, { path: "/" });
            navigate("/menu");
            return;
          case -3:
            setNoPuedesModificar(true);
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
  }, [cookies.id_usuario, cookies.rol, cookies.productoM, navigate, setCookie]);

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handlePrecio = (event) => {
    setPrecio(event.target.value);
  };

  const handleCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const handleCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleImageChange = async (e) => {
    setCargandoImagen(true);
    const file = e.target.files[0];
    if (file) {
      const image = await readFileAsImage(file);
      const imageBase64 = await readFileAsBase64(file);
      if (image.width <= 256 && image.height <= 256) {
        setImage(imageBase64);
        setCargandoImagen(false);
      } else {
        setImage(null);
        setCargandoImagen(false);
        alert(
          `La imagen debe ser de un tamaño menor o igual a 256x256 píxeles, pero las dimensiones de la imagen cargada son ${image.width}x${image.height} píxeles.`
        );
      }
    }
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Extraer solo la parte base64
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const readFileAsImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => resolve(image);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modificandoEnProceso) {
      return;
    }
    if (image === null) {
      alert("Por favor seleccione una imagen válida");
      return;
    }
    setModificandoEnProceso(true);
    fetch("http://127.0.0.1:5000/modificar_producto", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        IDProducto: cookies.productoM,
        IDUsuarioVendedor: cookies.id_usuario,
        NombreProducto: nombre,
        DescripcionProducto: descripcion,
        CategoriaProducto: categoria,
        PrecioProducto: precio,
        CantidadProducto: cantidad,
        FotoProducto: image,
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
            alert("Necesita ser vendedor para modificar productos");
            setCookie("rol", "c", { path: "/" });
            navigate("/menu");
            return;
          case -3:
            setNoPuedesModificar(true);
            return;
          case -4:
            setErrorCuenta(true);
            return;
          case -5:
            setErrorModificarProducto(true);
            return;
          case 1:
            setProductoModificado(true);
            return;
          default:
            setErrorModificarProducto(true);
            return;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      })
      .finally(() => setModificandoEnProceso(false));
  };

  const handleClic1 = () => {
    setCookie("productoM", -1, { path: "/" });
    navigate("/lista_productos_vendedor");
  };

  const handleClic3 = () => {
    setErrorCuenta(false);
    setCookie("id_usuario", -1, { path: "/" });
    setCookie("rol", "", { path: "/" });
    setCookie("clave", "", { path: "/" });
    setCookie("productoM", -1, { path: "/" });
    navigate("/inicio");
  };

  const handleClic4 = () => {
    setCookie("productoM", -1, { path: "/" });
    navigate("/lista_productos_vendedor");
  };

  return (
    <div>
      {modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Modificando el producto</h2>
            <p>Por favor espere...</p>
            <img src="/penguin.gif" alt="Penguin" />
          </div>
        )}
      {!modificandoEnProceso &&
        errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Error en la cuenta</h2>
            <p>Hubo un problema con tu cuenta</p>
            <br></br>
            <button onClick={handleClic3}>Aceptar</button>
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Error al modificar el producto</h2>
            <p>Intente modificar el producto en otro momento</p>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Producto modificado con éxito</h2>
            <br></br>
            <button onClick={handleClic4}>Regresar</button>
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Hay un problema con la conexión</h2>
            <p>Por favor intente más tarde</p>
            <img src="/penguin-error.gif" alt="Penguin Error" />
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        productoNoEncontrado &&
        !noPuedesModificar && (
          <div>
            <h2>Producto no encontrado</h2>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        noPuedesModificar && (
          <div>
            <h2>No puedes modificar este producto</h2>
            <p>Solo puedes modificar productos que hayas agregado</p>
            <button onClick={() => handleClic1()}>Regresar</button>
          </div>
        )}
      {!modificandoEnProceso &&
        !errorCuenta &&
        !errorModificarProducto &&
        !productoModificado &&
        !errorConexion &&
        !productoNoEncontrado &&
        !noPuedesModificar && (
          <div className="form-container">
            <h2>Modificar Producto</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="column">
                  <label htmlFor="nombre">Nombre del Producto:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleNombre}
                    required
                  />
                </div>
                <br></br>
                <div className="column">
                  <label htmlFor="precio">Precio:</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>$</span>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={precio}
                      onChange={handlePrecio}
                      min={0.01}
                      max={999999.99}
                      step={0.01}
                      required
                      style={{ marginLeft: "5px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleDescripcion}
                  />
                </div>
                <br></br>
                <div className="column">
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleCantidad}
                    min={0}
                    max={999999}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="categoria">Categoría:</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={handleCategoria}
                    required
                  >
                    <option value="Comida">Comida</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Electronicos">Electrónicos</option>
                    <option value="Mascotas">Mascotas</option>
                    <option value="Joyeria">Joyería</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <br></br>
                <div className="column image-upload-container">
                  <label htmlFor="imagen">Imagen del Producto:</label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {image && (
                    <img
                      src={`data:image/png;base64,${image}`}
                      alt="Imagen del Producto"
                      className="product-image"
                      align="center"
                      style={{ width: "50", height: "50px" }}
                    />
                  )}
                </div>
              </div>
              <br></br>
              <div align="center">
                <button disabled={modificandoEnProceso || cargandoImagen}>
                  Modificar Producto
                </button>
              </div>
              <br></br>
              <div align="center">
                <button onClick={handleClic1}>Regresar</button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
}

export default ModificarProducto;

import "./ListaProductos.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function ListaProductos() {
  const [cookies, setCookie] = useCookies([
    "id_usuario",
    "rol",
    "producto",
    "productoCR",
  ]);
  const [categoria, setCategoria] = useState("Todas");
  const [nombre, setNombre] = useState("");
  const [productos, setProductos] = useState([]);
  const [errorConexion, setErrorConexion] = useState(false);
  const [sortBy, setSortBy] = useState("NombreProducto");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      navigate("/inicio");
    }
    if (cookies.rol === "v") {
      navigate("/menu");
    } else if (cookies.rol !== "c") {
      setCookie("id_usuario", -1, { path: "/" });
      setCookie("rol", "", { path: "/" });
      setCookie("producto", -1, { path: "/" });
      setCookie("productoCR", -1, { path: "/" });
      navigate("/inicio");
    }
    fetch("http://127.0.0.1:5000/consulta_producto/lista", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ categoria: categoria, nombre: nombre }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductos(data.productos);
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
    //.catch((error) => console.error("Error:", error));
  }, [cookies.id_usuario, cookies.rol, categoria, nombre, navigate, setCookie]);

  const handleCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/consulta_producto/lista", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ categoria: categoria, nombre: nombre }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductos(data.productos);
      })
      //.catch((error) => console.error("Error:", error));
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
  };
  */

  const handleClic1 = (idProducto) => {
    setCookie("producto", idProducto, { path: "/" });
    navigate("/comprar");
  };

  const handleClic2 = () => {
    setCookie("producto", -1, { path: "/" });
    setCookie("productoCR", -1, { path: "/" });
    navigate("/menu");
  };

  const handleClic3 = (idProducto) => {
    setCookie("productoCR", idProducto, { path: "/" });
    navigate("/consultar_review");
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const nuevaDireccion = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(nuevaDireccion);
  };

  return (
    <div>
      {errorConexion && (
        <div>
          <h2>Hay un problema con la conexión</h2>
          <p>Por favor intente más tarde</p>
          <img src="/penguin-error.gif" alt="Penguin Error" />
        </div>
      )}
      {!errorConexion && (
        <div>
          <div className="header-container">
            <div className="title-container">
              <h2>Lista de Productos</h2>
            </div>
            <div className="filter-container">
              <div className="filter-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={handleNombre}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="filter-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={handleCategoria}
                >
                  <option value="Todas">Todas</option>
                  <option value="Comida">Comida</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Electronicos">Electronicos</option>
                  <option value="Mascotas">Mascotas</option>
                  <option value="Joyeria">Joyeria</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("NombreProducto")}
                    style={{ cursor: "pointer" }}
                  >
                    Nombre{" "}
                    {sortBy === "NombreProducto" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Descripción</th>
                  <th
                    onClick={() => handleSort("CategoriaProducto")}
                    style={{ cursor: "pointer" }}
                  >
                    Categoría{" "}
                    {sortBy === "CategoriaProducto" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("PrecioProducto")}
                    style={{ cursor: "pointer" }}
                  >
                    Precio{" "}
                    {sortBy === "PrecioProducto" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("CantidadProducto")}
                    style={{ cursor: "pointer" }}
                  >
                    Cantidad{" "}
                    {sortBy === "CantidadProducto" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Foto</th>
                  <th>Comprar</th>
                  <th>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {productos
                  .sort((a, b) => {
                    if (sortBy === "NombreProducto") {
                      const comparison = a.NombreProducto.localeCompare(
                        b.NombreProducto
                      );
                      return sortDirection === "asc" ? comparison : -comparison;
                    } else if (sortBy === "CategoriaProducto") {
                      const comparison = a.CategoriaProducto.localeCompare(
                        b.CategoriaProducto
                      );
                      return sortDirection === "asc" ? comparison : -comparison;
                    } else if (sortBy === "PrecioProducto") {
                      const comparison = a.PrecioProducto - b.PrecioProducto;
                      return sortDirection === "asc" ? comparison : -comparison;
                    } else if (sortBy === "CantidadProducto") {
                      const comparison =
                        a.CantidadProducto - b.CantidadProducto;
                      return sortDirection === "asc" ? comparison : -comparison;
                    }
                    return 0;
                  })
                  .map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.NombreProducto}</td>
                      <td>{producto.DescripcionProducto}</td>
                      <td>{producto.CategoriaProducto}</td>
                      <td>${producto.PrecioProducto}</td>
                      <td>{producto.CantidadProducto}</td>
                      <td>
                        <img
                          src={`data:image/png;base64,${producto.FotoProducto}`}
                          alt="Foto de producto"
                          style={{ width: "90px", height: "90px" }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleClic1(producto.IDProducto)}
                        >
                          Comprar
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleClic3(producto.IDProducto)}
                        >
                          Reviews
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button onClick={() => handleClic2()}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaProductos;

import "./ConsultarReview.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function ConsultarReview() {
  const [cookies, setCookie] = useCookies(["id_usuario", "rol", "productoCR"]);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const [noHayReviews, setNoHayReviews] = useState(false);
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [reviews, setReviews] = useState([]);
  const [errorConexion, setErrorConexion] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      setCookie("productoCR", -1, { path: "/" });
      navigate("/inicio");
    }
    if (cookies.rol === "v") {
      setCookie("productoCR", -1, { path: "/" });
      navigate("/menu");
    } else if (cookies.rol !== "c") {
      setCookie("id_usuario", -1, { path: "/" });
      setCookie("rol", "", { path: "/" });
      setCookie("productoCR", -1, { path: "/" });
      navigate("/inicio");
    } else if (cookies.productoCR === undefined || cookies.productoCR === -1) {
      navigate("/lista_productos");
    }
    fetch("http://127.0.0.1:5000/revisar_review/obtener", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({ producto: cookies.productoCR }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.resultado === 0) {
          setProductoNoEncontrado(true);
        } else {
          setNombreProducto(data.NombreProducto);
          setCategoriaProducto(data.CategoriaProducto);
          setPrecioProducto(data.PrecioProducto);
          setReviews(data.Reviews);
          if (data.Reviews.length === 0) {
            setNoHayReviews(true);
          }
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
      });
  }, [
    cookies.id_usuario,
    cookies.rol,
    cookies.productoCR,
    navigate,
    setCookie,
  ]);

  const handleClic1 = () => {
    setCookie("productoCR", -1, { path: "/" });
    navigate("/lista_productos");
  };

  const handleSort = () => {
    const nuevaDireccion = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(nuevaDireccion);
  };

  return (
    <div>
      {productoNoEncontrado && !noHayReviews && !errorConexion && (
        <div>
          <h2>Producto no encontrado</h2>
          <button onClick={handleClic1}>Regresar</button>
        </div>
      )}
      {!productoNoEncontrado && noHayReviews && !errorConexion && (
        <div>
          <h2>No hay reviews para este producto</h2>
          <button onClick={handleClic1}>Regresar</button>
        </div>
      )}
      {!productoNoEncontrado && !noHayReviews && errorConexion && (
        <div>
          <h2>Hay un problema con la conexión</h2>
          <p>Por favor intente más tarde</p>
          <img src="/penguin-error.gif" alt="Penguin Error" />
        </div>
      )}
      {!productoNoEncontrado && !noHayReviews && !errorConexion && (
        <div>
          <div className="header-container">
            <h2>Reviews del producto {nombreProducto}</h2>
            <p>
              Con categoría {categoriaProducto} y precio ${precioProducto}
            </p>
          </div>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th
                    className="header"
                    onClick={handleSort}
                    style={{ cursor: "pointer" }}
                  >
                    Calificación {sortDirection === "asc" ? "↑" : "↓"}
                  </th>
                  <th className="header">Comentario</th>
                  <th className="header">Usuario que dejó el review</th>
                </tr>
              </thead>
              <tbody>
                {reviews
                  .sort((a, b) => {
                    const comparison =
                      a.CalificacionReview - b.CalificacionReview;
                    return sortDirection === "asc" ? comparison : -comparison;
                  })
                  .map((review, index) => (
                    <tr key={index}>
                      <td>{review.CalificacionReview}</td>
                      <td>{review.ComentarioReview}</td>
                      <td>{review.NombreUsuario}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button onClick={handleClic1}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarReview;

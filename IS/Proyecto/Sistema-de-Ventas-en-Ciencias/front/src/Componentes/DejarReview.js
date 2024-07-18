import "./DejarReview.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function DejarReview() {
  const [cookies, setCookie] = useCookies([
    "id_usuario",
    "rol",
    "productoR",
    "clave",
  ]);
  const [calificacion, setCalificacion] = useState(10);
  const [comentario, setComentario] = useState("");
  const [errorDeCalificacion, setErrorDeCalificacion] = useState(false);
  const [errorDeCuenta, setErrorDeCuenta] = useState(false);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const [productoNoComprado, setProductoNoComprado] = useState(false);
  const [errorReview, setErrorReview] = useState(false);
  const [reviewEnProceso, setReviewEnProceso] = useState(false);
  const [reviewRealizada, setReviewRealizada] = useState(false);
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
    } else if (cookies.productoR === undefined || cookies.productoR === -1) {
      navigate("/seleccionar_producto_r");
    }
  }, [cookies.id_usuario, cookies.rol, cookies.productoR, navigate, setCookie]);

  const dejarReview = () => {
    if (reviewEnProceso) {
      return;
    }
    setReviewEnProceso(true);
    if (calificacion < 1 || calificacion > 10) {
      setReviewEnProceso(false);
      setErrorDeCalificacion(true);
      return;
    }
    fetch("http://127.0.0.1:5000/dejar_review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      credentials: "include",
      body: JSON.stringify({
        idProducto: cookies.productoR,
        idComprador: cookies.id_usuario,
        calificacion: calificacion,
        comentario: comentario,
        clave: cookies.clave,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.resultado);
        switch (data.resultado) {
          case 0:
            setErrorReview(true);
            return;
          case 1:
            setReviewRealizada(true);
            return;
          case -1:
            setErrorDeCuenta(true);
            return;
          case -2:
            setProductoNoEncontrado(true);
            return;
          case -3:
            alert("Necesita ser comprador para dejar una review");
            setCookie("productoR", -1, { path: "/" });
            setCookie("rol", "v", { path: "/" });
            navigate("/menu");
            return;
          case -4:
            setProductoNoComprado(true);
            return;
          case -6:
            setErrorDeCuenta(true);
            return;
          default:
            setErrorReview(true);
            return;
        }
      })
      .catch((error) => {
        setErrorConexion(true);
        console.error("Error:", error);
        //setErrorReview(true);
      })
      .finally(() => {
        setReviewEnProceso(false);
      });
  };

  const handleClic1 = () => {
    setCookie("productoR", -1, { path: "/" });
    navigate("/menu");
  };

  const handleClic2 = () => {
    setErrorDeCalificacion(false);
  };

  const handleClic3 = () => {
    setErrorDeCuenta(false);
    setCookie("id_usuario", -1, { path: "/" });
    setCookie("rol", "", { path: "/" });
    setCookie("productoR", -1, { path: "/" });
    setCookie("clave", "", { path: "/" });
    navigate("/inicio");
  };

  return (
    <div>
      {errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>La calificación debe ser un número entre 1 y 10</h2>
            <button onClick={handleClic2}>Aceptar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Error en la cuenta</h2>
            <p>Hubo un problema con tu cuenta</p>
            <br></br>
            <button onClick={handleClic3}>Aceptar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Producto no encontrado</h2>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Producto no comprado</h2>
            <p>Nececitas comprar el producto para dejar una review</p>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Error al dejar la review</h2>
            <p>Intente dejar la review en otro momento</p>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Procesando la review</h2>
            <p>Por favor espere...</p>
            <img src="/penguin.gif" alt="Penguin" />
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Review realizada con éxito</h2>
            <p>Gracias por dejar tu opinión</p>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        errorConexion && (
          <div>
            <h2>Hay un problema con la conexión</h2>
            <p>Por favor intente más tarde</p>
            <img src="/penguin-error.gif" alt="Penguin Error" />
          </div>
        )}
      {!errorDeCalificacion &&
        !errorDeCuenta &&
        !productoNoEncontrado &&
        !productoNoComprado &&
        !errorReview &&
        !reviewEnProceso &&
        !reviewRealizada &&
        !errorConexion && (
          <div>
            <h2>Review</h2>
            <label>
              Calificación:
              <input
                type="number"
                value={calificacion}
                required
                min={1}
                max={10}
                step={1}
                onChange={(e) => setCalificacion(e.target.value)}
              />
            </label>
            <br></br>
            <label>
              Comentario:
              <input
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </label>
            <br></br>
            <button disabled={reviewEnProceso} onClick={dejarReview}>
              Dejar
            </button>
            <br></br>
            <br></br>
            <button onClick={handleClic1}>Regresar</button>
          </div>
        )}
    </div>
  );
}

/*
<h2>Dejar Review</h2>
      <p> El id del producto es: {cookies.productoR} </p>
      <br></br>
      <button onClick={handleClic1}>Regresar</button>
*/

export default DejarReview;

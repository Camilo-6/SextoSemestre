import "./Menu.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Menu() {
  const [cookies, setCookies] = useCookies(["id_usuario", "rol", "clave"]);
  const [menuComprador, setMenuComprador] = useState(false);
  const [menuVendedor, setMenuVendedor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.id_usuario === undefined || cookies.id_usuario === -1) {
      console.log(" 🍪 No hay cookie 🍪");
      navigate("/inicio");
      return;
    }
    if (cookies.rol === "c") {
      setMenuComprador(true);
    } else if (cookies.rol === "v") {
      setMenuVendedor(true);
    } else {
      setCookies("id_usuario", -1, { path: "/" });
      setCookies("rol", "", { path: "/" });
      navigate("/inicio");
    }
  }, [cookies.id_usuario, cookies.rol, navigate, setCookies]);

  const handleLogout = () => {
    setCookies("id_usuario", -1, { path: "/" });
    setCookies("rol", "", { path: "/" });
    setCookies("clave", "", { path: "/" });
    navigate("/inicio");
  };

  const handleVerProductos = () => {
    navigate("/lista_productos");
  };

  const handleDejarReview = () => {
    navigate("/seleccionar_producto_r");
  };

  const handleVerProductosVendedor = () => {
    navigate("/lista_productos_vendedor");
  };

  const handleAgregarProducto = () => {
    navigate("/agregar_producto");
  };

  return (
    <div>
      {menuComprador && !menuVendedor && (
        <div align="center">
          <h2>Menu Comprador</h2>
          <b></b>
          <button onClick={handleVerProductos}>Ver Productos</button>
          <br></br>
          <br></br>
          <button onClick={handleDejarReview}>Dejar Review</button>
          <br></br>
          <br></br>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      )}
      {menuVendedor && !menuComprador && (
        <div align="center">
          <h2>Menu Vendedor</h2>
          <b></b>
          <button onClick={handleVerProductosVendedor}>
            Ver tus Productos
          </button>
          <br></br>
          <br></br>
          <button onClick={handleAgregarProducto}>Agregar Producto</button>
          <br></br>
          <br></br>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      )}
    </div>
  );
}

export default Menu;

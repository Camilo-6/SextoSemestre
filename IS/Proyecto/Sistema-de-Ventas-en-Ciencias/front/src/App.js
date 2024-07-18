import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // npm install react-router-dom
import Inicio from "./Componentes/Inicio";
import Registro from "./Componentes/Registro";
import InicioSesion from "./Componentes/InicioSesion";
import Menu from "./Componentes/Menu";
import ListaProductos from "./Componentes/ListaProductos";
import Comprar from "./Componentes/Comprar";
import SeleccionarProductoR from "./Componentes/SeleccionarProductoR";
import DejarReview from "./Componentes/DejarReview";
import ConsultarReview from "./Componentes/ConsultarReview";
import AgregarProducto from "./Componentes/Agregar_Producto";
import ListaProductosV from "./Componentes/ListaProductosV";
import ModificarProducto from "./Componentes/Modificar_Producto";
import EliminarProducto from "./Componentes/Eliminar_Producto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciar" element={<InicioSesion />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/lista_productos" element={<ListaProductos />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route
          path="/seleccionar_producto_r"
          element={<SeleccionarProductoR />}
        />
        <Route path="/dejar_review" element={<DejarReview />} />
        <Route path="/consultar_review" element={<ConsultarReview />} />
        <Route path="/agregar_producto" element={<AgregarProducto />} />
        <Route path="/lista_productos_vendedor" element={<ListaProductosV />} />
        <Route path="/modificar_producto" element={<ModificarProducto />} />
        <Route path="/eliminar_producto" element={<EliminarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;

/*
Requerimientos
npm install react-router-dom 
npm install react-cookie
*/

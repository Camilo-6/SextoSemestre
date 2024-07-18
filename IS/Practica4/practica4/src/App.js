// import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Indice from "./Indice/Indice";
import RUsuario from "./Usuario/RUsuario";
import CUsuario from "./Usuario/CUsuario";
import UUsuario from "./Usuario/UUsuario";
import DUsuario from "./Usuario/DUsuario";
import RPelicula from "./Pelicula/RPelicula";
import CPelicula from "./Pelicula/CPelicula";
import UPelicula from "./Pelicula/UPelicula";
import DPelicula from "./Pelicula/DPelicula";
import RRenta from "./Renta/RRenta";
import CRenta from "./Renta/CRenta";
import URenta from "./Renta/URenta";

function App() {
  const [usuarios, setUsuarios] = useState([
    {
      idUsuario: 1,
      nombre: "Juan",
      apPat: "Perez",
      apMat: "Gomez",
      password: "1234",
      email: "juan@example.com",
      superUser: false,
    },
    {
      idUsuario: 2,
      nombre: "Maria",
      apPat: "Patito",
      password: "gidjfdj",
      email: "algo@gmail.com",
      superUser: true,
    },
    {
      idUsuario: 3,
      nombre: "Pedro",
      apPat: "Ganso",
      password: "o",
      email: "yeah@gmail.com",
      superUser: false,
    },
    {
      idUsuario: 4,
      nombre: "Paquito",
      apPat: "Wowi",
      apMat: "YEE",
      password: "contrasegura",
      email: "paquitolol@gmail.com",
      superUser: false,
    },
    {
      idUsuario: 5,
      nombre: "Ana",
      apPat: "Lopez",
      password: "clave123",
      email: "ana@example.com",
      superUser: false,
    },
    {
      idUsuario: 6,
      nombre: "Luis",
      apPat: "Ramirez",
      apMat: "Gutierrez",
      password: "password",
      email: "luis@gmail.com",
      superUser: false,
    },
    {
      idUsuario: 7,
      nombre: "Laura",
      apPat: "Martinez",
      password: "123456",
      email: "laura@example.com",
      superUser: true,
    },
    {
      idUsuario: 8,
      nombre: "Carlos",
      apPat: "Gonzalez",
      apMat: "Hernandez",
      password: "securepass",
      email: "carlos@gmail.com",
      superUser: false,
    },
    {
      idUsuario: 9,
      nombre: "Sofia",
      apPat: "Diaz",
      password: "sofipass",
      email: "sofia@example.com",
      superUser: false,
    },
    {
      idUsuario: 10,
      nombre: "Javier",
      apPat: "Sanchez",
      apMat: "Lopez",
      password: "javier123",
      email: "javier@gmail.com",
      superUser: false,
    },
  ]);

  const [peliculas, setPeliculas] = useState([
    {
      idPelicula: 1,
      nombre: "A Penguin's Memory: Shiawase Monogatari",
      genero: "Drama",
      duracion: 101,
      inventario: 5,
    },
    {
      idPelicula: 2,
      nombre: "El bueno, el malo y el feo",
      genero: "Western",
      duracion: 161,
      inventario: 1,
    },
    {
      idPelicula: 3,
      nombre: "Happy Feet",
      genero: "Animacion",
      duracion: 108,
      inventario: 3,
    },
    {
      idPelicula: 4,
      nombre: "Blade Runner 2049",
      genero: "Accion",
      duracion: 163,
      inventario: 2,
    },
    {
      idPelicula: 5,
      nombre: "El espanta tiburones",
      genero: "Animacion",
      duracion: 90,
      inventario: 4,
    },
    {
      idPelicula: 6,
      nombre: "Como entrenar a tu dragon 3",
      genero: "Animacion",
      duracion: 104,
      inventario: 1,
    },
    {
      idPelicula: 7,
      nombre: "La chica que saltaba a traves del tiempo",
      genero: "Ciencia Ficcion",
      duracion: 98,
      inventario: 0,
    },
    {
      idPelicula: 8,
      nombre: "Hellboy",
      genero: "Accion",
      duracion: 122,
      inventario: 10,
    },
    {
      idPelicula: 9,
      nombre: "El señor de los anillos: La comunidad del anillo",
      genero: "Fantasia",
      duracion: 178,
      inventario: 2,
    },
    {
      idPelicula: 10,
      nombre: "La tierra antes del tiempo",
      genero: "Familiar",
      duracion: 70,
      inventario: 3,
    },
  ]);

  const [rentas, setRentas] = useState([
    {
      idRentar: 1,
      idUsuario: 2,
      idPelicula: 3,
      fecha_renta: new Date("2021-10-01"),
      dias_de_renta: 5,
      estatus: false,
    },
    {
      idRentar: 2,
      idUsuario: 3,
      idPelicula: 1,
      fecha_renta: new Date("2024-10-10"),
      dias_de_renta: 3,
      estatus: true,
    },
    {
      idRentar: 3,
      idUsuario: 6,
      idPelicula: 9,
      fecha_renta: new Date("2023-10-10"),
      dias_de_renta: 7,
      estatus: false,
    },
    {
      idRentar: 4,
      idUsuario: 4,
      idPelicula: 4,
      fecha_renta: new Date("2022-10-10"),
      dias_de_renta: 2,
      estatus: true,
    },
    {
      idRentar: 5,
      idUsuario: 7,
      idPelicula: 1,
      fecha_renta: new Date("2021-10-10"),
      dias_de_renta: 1,
      estatus: false,
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Indice />} />
        <Route
          path="/usuario"
          element={
            <RUsuario
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              rentas={rentas}
            />
          }
        />
        <Route
          path="/usuario/agregar"
          element={<CUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
        />
        <Route
          path="/usuario/modificar"
          element={<UUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
        />
        <Route
          path="/usuario/eliminar"
          element={
            <DUsuario
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              rentas={rentas}
            />
          }
        />
        <Route
          path="/pelicula"
          element={
            <RPelicula
              peliculas={peliculas}
              setPeliculas={setPeliculas}
              rentas={rentas}
            />
          }
        />
        <Route
          path="/pelicula/agregar"
          element={
            <CPelicula peliculas={peliculas} setPeliculas={setPeliculas} />
          }
        />
        <Route
          path="/pelicula/modificar"
          element={
            <UPelicula peliculas={peliculas} setPeliculas={setPeliculas} />
          }
        />
        <Route
          path="/pelicula/eliminar"
          element={
            <DPelicula
              peliculas={peliculas}
              setPeliculas={setPeliculas}
              rentas={rentas}
            />
          }
        />
        <Route
          path="/renta"
          element={
            <RRenta
              usuarios={usuarios}
              peliculas={peliculas}
              rentas={rentas}
              setRentas={setRentas}
            />
          }
        />
        <Route
          path="/renta/agregar"
          element={
            <CRenta
              usuarios={usuarios}
              peliculas={peliculas}
              rentas={rentas}
              setRentas={setRentas}
            />
          }
        />
        <Route
          path="/renta/modificar"
          element={
            <URenta
              usuarios={usuarios}
              peliculas={peliculas}
              rentas={rentas}
              setRentas={setRentas}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

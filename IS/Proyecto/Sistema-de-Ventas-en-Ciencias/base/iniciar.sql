-- Crear la base de datos 'base_penguin' con codificación UTF-8 y cotejamiento utf8_spanish_ci
CREATE DATABASE base_penguin
  CHARACTER SET utf8
  COLLATE utf8_spanish_ci;

-- Crear un usuario 'intento_1' con contraseña 'Penguin15' y darle todos los privilegios sobre la base de datos 'base_penguin'
CREATE USER 'intento_1'@'localhost' IDENTIFIED BY 'Penguin15';

-- Darle todos los privilegios al usuario 'intento_1' sobre la base de datos 'base_penguin'
GRANT ALL PRIVILEGES ON base_penguin.* TO 'intento_1'@'localhost' WITH GRANT OPTION;

-- Conectar a la base de datos 'base_penguin' para crear sus tablas
USE base_penguin;

-- Crear las tablas de la base de datos 'base_penguin'
CREATE TABLE Usuario
(
  IDUsuario INT NOT NULL AUTO_INCREMENT,
  NombreUsuario TEXT NOT NULL CHECK (NombreUsuario <> ''),
  CorreoUsuario TEXT NOT NULL,
  ContraseniaUsuario VARCHAR(100) NOT NULL,
  TelefonoUsuario INT,
  RolUsuario CHAR(1) NOT NULL CHECK (RolUsuario IN ('c', 'v')),
  PRIMARY KEY (IDUsuario),
  UNIQUE (CorreoUsuario)
) AUTO_INCREMENT=1;

CREATE TABLE Comprador
(
  IDUsuarioComprador INT NOT NULL,
  PRIMARY KEY (IDUsuarioComprador),
  FOREIGN KEY (IDUsuarioComprador) REFERENCES Usuario(IDUsuario)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE Vendedor
(
  IDUsuarioVendedor INT NOT NULL,
  PRIMARY KEY (IDUsuarioVendedor),
  FOREIGN KEY (IDUsuarioVendedor) REFERENCES Usuario(IDUsuario)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE Producto
(
  IDProducto INT NOT NULL AUTO_INCREMENT,
  NombreProducto TEXT NOT NULL CHECK (NombreProducto <> ''),
  DescripcionProducto TEXT,
  CategoriaProducto VARCHAR(20) NOT NULL CHECK (CategoriaProducto IN ('Comida', 'Ropa', 'Electronicos', 'Mascotas', 'Joyeria', 'Otros')),
  PrecioProducto FLOAT NOT NULL CHECK (PrecioProducto > 0.00),
  CantidadProducto INT NOT NULL CHECK (CantidadProducto >= 0),
  FotoProducto TEXT NOT NULL,
  IDUsuarioVendedor INT NOT NULL,
  PRIMARY KEY (IDProducto),
  FOREIGN KEY (IDUsuarioVendedor) REFERENCES Vendedor(IDUsuarioVendedor)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE Review
(
  IDReview INT NOT NULL AUTO_INCREMENT,
  CalificacionReview INT NOT NULL CHECK (CalificacionReview >= 1 AND CalificacionReview <= 10),
  ComentarioReview TEXT,
  IDUsuarioComprador INT NOT NULL,
  IDProducto INT NOT NULL,
  PRIMARY KEY (IDReview),
  FOREIGN KEY (IDUsuarioComprador) REFERENCES Comprador(IDUsuarioComprador)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE Venta
(
  IDVenta INT NOT NULL AUTO_INCREMENT,
  IDProducto INT NOT NULL,
  IDUsuarioVendedor INT NOT NULL,
  IDUsuarioComprador INT NOT NULL,
  PRIMARY KEY (IDVenta),
  FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (IDUsuarioVendedor) REFERENCES Vendedor(IDUsuarioVendedor)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (IDUsuarioComprador) REFERENCES Comprador(IDUsuarioComprador)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) AUTO_INCREMENT=1;

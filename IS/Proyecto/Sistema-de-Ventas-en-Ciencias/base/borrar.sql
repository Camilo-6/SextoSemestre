-- Eliminar los privilegios del usuario 'intento_1' sobre la base de datos 'base_penguin'
REVOKE ALL PRIVILEGES ON base_penguin.* FROM 'intento_1'@'localhost';

-- Eliminar al usuario 'intento_1' de la lista de usuarios
DROP USER 'intento_1'@'localhost';

-- Conectar a la base de datos 'base_penguin' para eliminar sus tablas
USE base_penguin;

-- Eliminar las tablas de la base de datos 'base_penguin'
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Venta;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Vendedor;
DROP TABLE IF EXISTS Comprador;
DROP TABLE IF EXISTS Usuario;

-- Conectar a la base de datos 'mysql' para eliminar la base de datos 'base_penguin'
USE mysql;

-- Eliminar la base de datos 'base_penguin'
DROP DATABASE IF EXISTS base_penguin;

-- Borrar inserts de tablas
DELETE FROM NombreDeLaTabla;

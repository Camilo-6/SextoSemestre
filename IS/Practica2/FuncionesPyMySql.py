import pymysql
import random
from cryptoUtils.CryptoUtils import cipher
from hashlib import sha256


# Función para insertar registros
def insertar_registros():
    # Conexión
    conexion = pymysql.connect(host='localhost',
                               user='lab',
                               password='Developer123!',
                               database='lab_ing_software',
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)
    try:
        with conexion.cursor() as cursor:

            # Insertar un registro en la tabla usuarios
            sql_usuarios = "INSERT INTO usuarios (nombre, apPat, apMat, password, email, superUser) VALUES (%s, %s, %s, %s, %s, %s)"
            num_aleatorio = random.randint(0, 1000)
            usuario = f'Usuario{num_aleatorio}'
            num_aleatorio = random.randint(0, 1000)
            apPat = f'ApellidoP{num_aleatorio}'
            num_aleatorio = random.randint(0, 1000)
            apMat = f'ApellidoM{num_aleatorio}'
            num_aleatorio = random.randint(0, 1000)
            contrasenia = f'contrasenia{num_aleatorio}'
            # contrasenia = sha256(cipher(contrasenia)).hexdigest() version con cryptoUtils
            correo = f'{usuario}@correo.com'
            cursor.execute(sql_usuarios, (usuario, apPat, apMat, contrasenia, correo, 0))
            conexion.commit()
            print(f"Usuario insertado: {usuario} {apPat} {apMat}")

            # Insertar un registro en la tabla peliculas
            sql_peliculas = "INSERT INTO peliculas (nombre, genero, duracion, inventario) VALUES (%s, %s, %s, %s)"
            num_aleatorio = random.randint(0, 1000)
            nombre_pelicula = f'Pelicula{num_aleatorio}'
            cursor.execute(sql_peliculas, (nombre_pelicula, 'Accion', 160, 1))
            conexion.commit()
            print(f"Pelicula insertada: {nombre_pelicula}")

            # Insertar un registro en la tabla rentar
            cursor.execute("SELECT idUsuario FROM usuarios LIMIT 1")
            id_usuario = cursor.fetchone()['idUsuario']
            cursor.execute("SELECT idPelicula FROM peliculas LIMIT 1")
            id_pelicula = cursor.fetchone()['idPelicula']
            sql_rentar = "INSERT INTO rentar (idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus) VALUES (%s, %s, NOW(), %s, %s)"
            cursor.execute(sql_rentar, (id_usuario, id_pelicula, 3, 1))
            conexion.commit()
            print(f"Renta insertada del usuario con id: {id_usuario} y pelicula con id: {id_pelicula}")
    finally:
        conexion.close()


# Funcion para filtar usuarios con terminacion de apellido
def filtrar_usuarios_apellido(apellido_terminacion):
    # Conexión
    conexion = pymysql.connect(host='localhost',
                               user='lab',
                               password='Developer123!',
                               database='lab_ing_software',
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)
    try:
        with conexion.cursor() as cursor:
            # Consulta
            # sql = "SELECT * FROM usuarios WHERE apPat LIKE %s" version con apPat
            sql = "SELECT * FROM usuarios WHERE apPat LIKE %s OR apMat LIKE %s"
            patron = f'%{apellido_terminacion}'
            cursor.execute(sql, (patron, patron))
            resultado = cursor.fetchall()
            # Imprimir resultado
            if not resultado:
                print("No se encontraron usuarios")
            for usuario in resultado:
                print(usuario)
    finally:
        conexion.close()


# Funcion para cambiar genero de cierta pelicula
def cambiar_genero_pelicula(pelicula, genero):
    # Conexión
    conexion = pymysql.connect(host='localhost',
                               user='lab',
                               password='Developer123!',
                               database='lab_ing_software',
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)
    try:
        with conexion.cursor() as cursor:
            # Consulta
            sql_buscar_pelicula = "SELECT * FROM peliculas WHERE nombre = %s"
            cursor.execute(sql_buscar_pelicula, (pelicula,))
            pelicula_cambiar = cursor.fetchone()
            # Cambiar genero
            if pelicula_cambiar:
                sql_cambiar_genero = "UPDATE peliculas SET genero = %s WHERE nombre = %s"
                cursor.execute(sql_cambiar_genero, (genero, pelicula))
                conexion.commit()
                print("Genero cambiado con éxito!")
            else:
                print("Pelicula no encontrada!")
    finally:
        conexion.close()


# Funcion que elimina las rentas de 3 dias anteriores
def eliminar_rentas_antiguas():
    # Conexión
    conexion = pymysql.connect(host='localhost',
                               user='lab',
                               password='Developer123!',
                               database='lab_ing_software',
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)
    try:
        with conexion.cursor() as cursor:
            # Fecha limite y consulta
            sql_eliminar_rentas = """
                            DELETE FROM rentar 
                            WHERE fecha_renta < DATE_SUB(NOW(), INTERVAL 4 DAY)
                        """
            cursor.execute(sql_eliminar_rentas)
            conexion.commit()  # Confirmar la transacción
            eliminadas = cursor.rowcount
            print(f"Rentas eliminadas: {eliminadas}")
    finally:
        conexion.close()


# Realizar funciones
print("Funciones de PyMySql")
insertar_registros()
apellido_t = input("Ingrese la terminación del apellido a buscar: ")
filtrar_usuarios_apellido(apellido_t)
pelicula_c = input("Ingrese el nombre de la pelicula a cambiar: ")
genero_c = input("Ingrese el nuevo genero de la pelicula: ")
cambiar_genero_pelicula(pelicula_c, genero_c)
eliminar_rentas_antiguas()
print("Fin de funciones de PyMySql")
from datetime import datetime
from flask import Flask
from alchemyClasses import db
from model import model_usuarios
from model import model_peliculas
from model import model_rentar
from alchemyClasses.Usuarios import Usuarios
from alchemyClasses.Peliculas import Peliculas
from alchemyClasses.Rentar import Rentar

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_software'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        listo = False
        while not listo:
            print("Que quieres hacer?")
            print("1. Ver registros de una tabla")
            print("2. Filtrar registros de una tabla por id")
            print("3. Actualizar nombre de un registro (fecha de la renta para el caso de rentar)")
            print("4. Eliminar un registro o todos los registros")
            print("5. Terminar")
            opcion = input("Opcion: ")
            if opcion == "1":
                terminado = False
                while not terminado:
                    print("De que tabla quieres ver los registros?")
                    print("1. Usuarios")
                    print("2. Peliculas")
                    print("3. Rentar")
                    print("4. Regresar")
                    opcion = input("Opcion: ")
                    if opcion == "1":
                        model_usuarios.mostrar_usuarios()
                    elif opcion == "2":
                        model_peliculas.mostrar_peliculas()
                    elif opcion == "3":
                        model_rentar.mostrar_rentar()
                    elif opcion == "4":
                        terminado = True
                    else:
                        print("Opcion no valida")
            elif opcion == "2":
                terminado = False
                while not terminado:
                    print("De que tabla quieres filtrar los registros?")
                    print("1. Usuarios")
                    print("2. Peliculas")
                    print("3. Rentar")
                    print("4. Regresar")
                    opcion = input("Opcion: ")
                    if opcion == "1":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id del usuario que quieres filtrar: "))
                                model_usuarios.filtrar_usuario_por_id(iden)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "2":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id de la pelicula que quieres filtrar: "))
                                model_peliculas.filtrar_pelicula_por_id(iden)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "3":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id de la renta que quieres filtrar: "))
                                model_rentar.filtrar_renta_por_id(iden)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "4":
                        terminado = True
                    else:
                        print("Opcion no valida")
            elif opcion == "3":
                terminado = False
                while not terminado:
                    print("De que tabla quieres actualizar un registro?")
                    print("1. Usuarios")
                    print("2. Peliculas")
                    print("3. Rentar")
                    print("4. Regresar")
                    opcion = input("Opcion: ")
                    if opcion == "1":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id del usuario que quieres actualizar: "))
                                nuevo_nombre = input("Escribe el nuevo nombre: ")
                                model_usuarios.actualizar_nombre(iden, nuevo_nombre)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "2":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id de la pelicula que quieres actualizar: "))
                                nuevo_nombre = input("Escribe el nuevo nombre: ")
                                model_peliculas.actualizar_nombre(iden, nuevo_nombre)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "3":
                        completo = False
                        while not completo:
                            try:
                                iden = int(input("Escribe el id de la renta que quieres actualizar: "))
                                nueva_fecha = input("Escribe la nueva fecha (yyyy-mm-dd): ")
                                try:
                                    datetime.strptime(nueva_fecha, "%Y-%m-%d")
                                except ValueError:
                                    print("El formato de la fecha es incorrecto. Debe ser yyyy-mm-dd o la fecha no es valida")
                                    continue
                                model_rentar.actualizar_fecha(iden, nueva_fecha)
                                completo = True
                            except ValueError:
                                print("Escribe un numero entero")
                    elif opcion == "4":
                        terminado = True
                    else:
                        print("Opcion no valida")
            elif opcion == "4":
                terminado = False
                while not terminado:
                    print("De que tabla quieres borrar un registro o todos los registros?")
                    print("1. Usuarios")
                    print("2. Peliculas")
                    print("3. Rentar")
                    print("4. Regresar")
                    opcion = input("Opcion: ")
                    if opcion == "1":
                        completo = False
                        while not completo:
                            print("1. Borrar un usuario")
                            print("2. Borrar todos los usuarios")
                            print("3. Regresar")
                            opcion = input("Opcion: ")
                            if opcion == "1":
                                ya_termine = False
                                while not ya_termine:
                                    try:
                                        iden = int(input("Escribe el id del usuario que quieres borrar: "))
                                        model_usuarios.borrar_usuario(iden)
                                        ya_termine = True
                                    except ValueError:
                                        print("Escribe un numero entero")
                            elif opcion == "2":
                                model_usuarios.borrar_todo()
                                completo = True
                            elif opcion == "3":
                                completo = True
                            else:
                                print("Opcion no valida")
                    elif opcion == "2":
                        completo = False
                        while not completo:
                            print("1. Borrar una pelicula")
                            print("2. Borrar todas las peliculas")
                            print("3. Regresar")
                            opcion = input("Opcion: ")
                            if opcion == "1":
                                ya_termine = False
                                while not ya_termine:
                                    try:
                                        iden = int(input("Escribe el id de la pelicula que quieres borrar: "))
                                        model_peliculas.borrar_pelicula(iden)
                                        ya_termine = True
                                    except ValueError:
                                        print("Escribe un numero entero")
                            elif opcion == "2":
                                model_peliculas.borrar_todo()
                                completo = True
                            elif opcion == "3":
                                completo = True
                            else:
                                print("Opcion no valida")
                    elif opcion == "3":
                        completo = False
                        while not completo:
                            print("1. Borrar una renta")
                            print("2. Borrar todas las rentas")
                            print("3. Regresar")
                            opcion = input("Opcion: ")
                            if opcion == "1":
                                ya_termine = False
                                while not ya_termine:
                                    try:
                                        iden = int(input("Escribe el id de la renta que quieres borrar: "))
                                        model_rentar.borrar_renta(iden)
                                        ya_termine = True
                                    except ValueError:
                                        print("Escribe un numero entero")
                            elif opcion == "2":
                                model_rentar.borrar_todo()
                                completo = True
                            elif opcion == "3":
                                completo = True
                            else:
                                print("Opcion no valida")
                    elif opcion == "4":
                        terminado = True
                    else:
                        print("Opcion no valida")
            elif opcion == "5":
                listo = True
                print("Adios!")
            else:
                print("Opcion no valida")

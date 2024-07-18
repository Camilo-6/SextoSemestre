from alchemyClasses.Peliculas import Peliculas
from alchemyClasses import db
from alchemyClasses.Rentar import Rentar


def mostrar_peliculas():
    for pelicula in Peliculas.query.all():
        print(pelicula)


def filtrar_pelicula_por_id(iden):
    pelicula = Peliculas.query.filter_by(idPelicula=iden).first()
    if pelicula:
        print(pelicula)
    else:
        print("No existe una pelicula con ese id")


def actualizar_nombre(iden, nuevo_nombre):
    pelicula = Peliculas.query.filter_by(idPelicula=iden).first()
    if pelicula:
        pelicula.nombre = nuevo_nombre
        db.session.commit()
        print("Pelicula actualizada")
    else:
        print("No existe una pelicula con ese id")


def borrar_pelicula(iden):
    pelicula = Peliculas.query.filter_by(idPelicula=iden).first()
    if pelicula:
        rentas = Rentar.query.filter_by(idPelicula=pelicula.idPelicula).all()
        if rentas:
            print("Pelicula con rentas asociadas, omitiendo eliminacion")
            return
        else:
            db.session.delete(pelicula)
            db.session.commit()
            print("Pelicula eliminada")
    else:
        print("No existe una pelicula con ese id")


def borrar_todo():
    peliculas = Peliculas.query.all()
    omitidos = 0
    for pelicula in peliculas:
        rentas = Rentar.query.filter_by(idPelicula=pelicula.idPelicula).all()
        if rentas:
            omitidos += 1
            continue
        else:
            db.session.delete(pelicula)
    db.session.commit()
    if omitidos > 0:
        print(f"Peliculas eliminadas, {omitidos} omitidas por tener rentas asociadas")
    else:
        print("Peliculas eliminadas")
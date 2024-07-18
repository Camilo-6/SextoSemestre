from alchemyClasses.Rentar import Rentar
from alchemyClasses import db
from datetime import datetime


def mostrar_rentar():
    for renta in Rentar.query.all():
        print(renta)


def filtrar_renta_por_id(iden):
    renta = Rentar.query.filter_by(idRentar=iden).first()
    if renta:
        print(renta)
    else:
        print("No existe una renta con ese id")


def actualizar_fecha(iden, nueva_fecha):
    renta = Rentar.query.filter_by(idRentar=iden).first()
    fecha_datetime = datetime.strptime(nueva_fecha, "%Y-%m-%d")
    if renta:
        renta.fecha_renta = fecha_datetime
        db.session.commit()
        print("Renta actualizada")
    else:
        print("No existe una renta con ese id")


def borrar_renta(iden):
    renta = Rentar.query.filter_by(idRentar=iden).first()
    if renta:
        db.session.delete(renta)
        db.session.commit()
        print("Renta eliminada")
    else:
        print("No existe una renta con ese id")


def borrar_todo():
    rentas = Rentar.query.all()
    for renta in rentas:
        db.session.delete(renta)
    db.session.commit()
    print("Rentas eliminadas")
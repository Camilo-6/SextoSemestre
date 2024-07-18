from alchemyClasses.Usuarios import Usuarios
from alchemyClasses import db
from alchemyClasses.Rentar import Rentar


def mostrar_usuarios():
    for usuario in Usuarios.query.all():
        print(usuario)


def filtrar_usuario_por_id(iden):
    usuario = Usuarios.query.filter_by(idUsuario=iden).first()
    if usuario:
        print(usuario)
    else:
        print("No existe un usuario con ese id")


def actualizar_nombre(iden, nuevo_nombre):
    usuario = Usuarios.query.filter_by(idUsuario=iden).first()
    if usuario:
        usuario.nombre = nuevo_nombre
        db.session.commit()
        print("Usuario actualizado")
    else:
        print("No existe un usuario con ese id")


def borrar_usuario(iden):
    usuario = Usuarios.query.filter_by(idUsuario=iden).first()
    if usuario:
        rentas = Rentar.query.filter_by(idUsuario=usuario.idUsuario).all()
        if rentas:
            print("Usuario con rentas asociadas, omitiendo eliminacion")
            return
        else:
            db.session.delete(usuario)
            db.session.commit()
            print("Usuario eliminado")
    else:
        print("No existe un usuario con ese id")


def borrar_todo():
    usuarios = Usuarios.query.all()
    omitidos = 0
    for usuario in usuarios:
        rentas = Rentar.query.filter_by(idUsuario=usuario.idUsuario).all()
        if rentas:
            omitidos += 1
            continue
        else:
            db.session.delete(usuario)
    db.session.commit()
    if omitidos > 0:
        print(f"Usuarios eliminados, {omitidos} omitidos por tener rentas asociadas")
    else:
        print("Usuarios eliminados")
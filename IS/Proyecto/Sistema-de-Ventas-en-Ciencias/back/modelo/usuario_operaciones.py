from modelo.usuario_modelo import Usuario
from modelo.vendedor_modelo import Vendedor
from modelo.comprador_modelo import Comprador
from modelo.venta_modelo import Venta
from modelo import db

import random

def correoUso(correo):
    usuario = Usuario.query.filter(Usuario.CorreoUsuario == correo).first()
    if usuario:
        return True
    else:
        return False

def agregar(nombre, correo, telefono, rol):
    # respuesta None = error, respuesta usuario = exito
    respuesta = None
    numero_1 = random.randint(00000, 99999)
    numero_cadena = str(numero_1)
    contrasenia = nombre + numero_cadena
    if telefono == "":
        telefono = None
    usuario = Usuario(NombreUsuario=nombre, CorreoUsuario=correo, ContraseniaUsuario=contrasenia, TelefonoUsuario=telefono, RolUsuario=rol)
    db.session.add(usuario)
    db.session.commit()
    if rol == "v":
        vendedor = Vendedor(IDUsuarioVendedor=usuario.IDUsuario)
        db.session.add(vendedor)
    if rol == "c":
        comprador = Comprador(IDUsuarioComprador=usuario.IDUsuario)
        db.session.add(comprador)
        
    db.session.commit()

    respuesta = usuario
    return respuesta

def correcto(correo, contrasenia):
    # respuesta 0 = datos incorrectos, respuesta id = exito
    respuesta = 0
    usuario = Usuario.query.filter(Usuario.CorreoUsuario == correo).first()
    if usuario:
        if usuario.ContraseniaUsuario == contrasenia:
            respuesta = usuario.IDUsuario
    return respuesta

def obtener(id):
    return Usuario.query.filter(Usuario.IDUsuario == id).first()

def revisarP(id, producto):
    # respuesta True = exito, respuesta False = error
    respuesta = False
    usuario = Usuario.query.filter(Usuario.IDUsuario == id).first()
    if usuario:
        if usuario.getRolUsuario() == "c":
            compras = Venta.query.filter(Venta.IDUsuarioComprador == id).all()
            for compra in compras:
                if compra.IDProducto == producto:
                    respuesta = True
                    break
    return respuesta

def generar_clave_unica(id):
    return (id + 101) * 3000 - 1 # Clave unica generada como dios nos dio a entender 😎
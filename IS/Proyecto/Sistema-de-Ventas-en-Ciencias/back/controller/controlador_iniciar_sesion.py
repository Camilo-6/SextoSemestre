from flask import Blueprint, jsonify, request
from modelo import usuario_operaciones

iniciar_bp = Blueprint('iniciar', __name__)

# Caso de uso: Iniciar sesion
@iniciar_bp.route('/iniciar/revisar', methods=['POST'])
def iniciar():
    resultado = 0
    # resultado id = exito, resultado -1 = contrasenia o correo incorrecto
    data = request.get_json()
    correo = data.get('correo', '')
    contrasenia = data.get('contrasenia', '')
    resultado = usuario_operaciones.correcto(correo, contrasenia)
    if resultado == 0:
        resultado = -1
        return jsonify({'iden':resultado, 'rol':resultado})
    usuario = usuario_operaciones.obtener(resultado)
    id = usuario.getIDUsuario()
    rol = usuario.getRolUsuario()
    clave = usuario_operaciones.generar_clave_unica(id)
    return jsonify({'iden':id, 'rol':rol, 'clave':clave})


# Caso de uso: Cerrar sesion
# En React, InicioSesion.js
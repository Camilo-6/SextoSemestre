from flask import Blueprint, jsonify, request
from modelo import review_operaciones
from modelo import producto_operaciones
from modelo import usuario_operaciones

dejar_review_bp = Blueprint('dejar_review', __name__)

# Caso de uso: Dejar review
@dejar_review_bp.route('/dejar_review', methods=['POST'])
def agregar():
    # TODO: Revisar rango de calificacion en el front
    # resultado 1 = exito, resultado -1 = usuario no existe, resultado -2 = producto no existe, resultado -3 = usuario no es comprador, resultado -4 = usuario no compro el producto, resultado 0 = error, resultado -6 = error en la clave de usuario
    data = request.get_json()
    calificacion = data.get('calificacion', '')
    comentario = data.get('comentario', '')
    idComprador = data.get('idComprador', '')
    idProducto = data.get('idProducto', '')
    clave = data.get('clave', '')
    resultado = 0
    comprador = usuario_operaciones.obtener(idComprador)
    if not comprador:
        return jsonify({'resultado': -1})
    producto = producto_operaciones.obtener(idProducto)
    if not producto:
        return jsonify({'resultado': -2})
    if comprador.getRolUsuario() != 'c':
        return jsonify({'resultado': -3})
    if not usuario_operaciones.revisarP(idComprador, idProducto):
        return jsonify({'resultado': -4})
    claveReal = usuario_operaciones.generar_clave_unica(idComprador)
    if claveReal != clave:
        return jsonify({'resultado': -6})
    resultado = review_operaciones.agregar(calificacion, comentario, idComprador, idProducto)
    return jsonify({'resultado': resultado})
    
from flask import Blueprint, jsonify, request
from modelo import venta_operaciones
from modelo import producto_operaciones
from modelo import usuario_operaciones
from modelo import correos

ventas_bp = Blueprint('ventas', __name__)

# Caso de uso: Realizar compra
@ventas_bp.route('/ventas/comprar', methods=['POST'])
def comprar():
    # resultado 0 = producto no existe, -1 = usuario no existe, -2 = usuario no es comprador, -3 = error al realizar compra, -4 = error al enviar correo, 1 = exito, -6 = error en la clave de usuario
    data = request.get_json()
    id_producto = data.get('IDProducto', '')
    id_usuario_comprador = data.get('IDUsuarioComprador', '')
    clave = data.get('clave', '')
    producto = producto_operaciones.obtener(id_producto)
    if not producto:
        return jsonify({'resultado': 0})
    comprador = usuario_operaciones.obtener(id_usuario_comprador)
    if not comprador:
        return jsonify({'resultado': -1})
    if comprador.getRolUsuario() != 'c':
        return jsonify({'resultado': -2})
    claveReal = usuario_operaciones.generar_clave_unica(id_usuario_comprador)
    if claveReal != clave:
        return jsonify({'resultado': -6})
    venta = venta_operaciones.agregar(id_producto, id_usuario_comprador)
    if not venta:
        return jsonify({'resultado': -3})
    resultado = correos.envioCorreoCompra(venta.getIDVenta())
    if resultado == 0:
        return jsonify({'resultado': -4})
    return jsonify({'resultado': 1})

@ventas_bp.route('/ventas/obtener', methods=['POST'])
def obtener():
    # resultado 0 = producto no existe, resultado 1 = exito
    data = request.get_json()
    id_producto = data.get('IDProducto', '')
    producto = producto_operaciones.obtener(id_producto)
    if not producto:
        return jsonify({'resultado': 0})
    idp = producto.getIDProducto()
    nombre = producto.getNombreProducto()
    descripcion = producto.getDescripcionProducto()
    categoria = producto.getCategoriaProducto()
    precio = producto.getPrecioProducto()
    cantidad = producto.getCantidadProducto()
    foto = producto.getFotoProducto()
    return jsonify({'resultado': 1, 'IDProducto': idp, 'NombreProducto': nombre, 'DescripcionProducto': descripcion, 'CategoriaProducto': categoria, 'PrecioProducto': precio, 'CantidadProducto': cantidad, 'FotoProducto': foto})

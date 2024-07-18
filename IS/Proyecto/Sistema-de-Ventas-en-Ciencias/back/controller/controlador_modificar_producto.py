from flask import Blueprint, jsonify, request
from modelo import producto_operaciones as po
from modelo import usuario_operaciones as uo

modificar_producto_bp = Blueprint('modificar_producto', __name__)

# Caso de uso: Modificar producto
@modificar_producto_bp.route('/modificar_producto', methods=['POST'])
def modificar():
    data = request.get_json()
    id_producto = data.get('IDProducto', '')
    id_usuario_vendedor = data.get('IDUsuarioVendedor', '')
    clave = data.get('clave', '')
    producto = po.obtener(id_producto)
    if not producto:
        return jsonify({'resultado': 0}) # Error no existe el producto
    vendedor = uo.obtener(id_usuario_vendedor)
    if not vendedor:
        return jsonify({'resultado': -1}) # Error no existe el usuario
    if vendedor.getRolUsuario() != 'v':
        return jsonify({'resultado': -2}) # Error no eres un vendedor
    if producto.getIDUsuarioVendedor() != id_usuario_vendedor:
        return jsonify({'resultado': -3}) # Error no eres el vendedor de este producto
    claveReal = uo.generar_clave_unica(id_usuario_vendedor)
    if claveReal != clave:
        return jsonify({'resultado': -4}) # Error clave unica incorrecta
    nombre = data.get('NombreProducto', '')
    descripcion = data.get('DescripcionProducto', '')
    categoria = data.get('CategoriaProducto', '')
    precio = data.get('PrecioProducto', '')
    cantidad = data.get('CantidadProducto', '')
    foto = data.get('FotoProducto', '')
    resultado = po.modificar(id_producto, nombre, descripcion, categoria, precio, cantidad, foto)
    if resultado == 0:
        return jsonify({'resultado': -5}) # Error no se pudo modificar el producto
    return jsonify({'resultado': 1})

@modificar_producto_bp.route('/modificar_producto/obtener', methods=['POST'])
def obtener():
    data = request.get_json()
    id_producto = data.get('IDProducto', '')
    id_usuario_vendedor = data.get('IDUsuarioVendedor', '')
    producto = po.obtener(id_producto)
    if not producto:
        return jsonify({'resultado': 0}) # Error no existe el producto
    vendedor = uo.obtener(id_usuario_vendedor)
    if not vendedor:
        return jsonify({'resultado': -1}) # Error no existe el usuario
    if vendedor.getRolUsuario() != 'v':
        return jsonify({'resultado': -2}) # Error no eres un vendedor
    if producto.getIDUsuarioVendedor() != id_usuario_vendedor:
        return jsonify({'resultado': -3}) # Error no eres el vendedor de este producto
    nombre = producto.getNombreProducto()
    descripcion = producto.getDescripcionProducto()
    categoria = producto.getCategoriaProducto()
    precio = producto.getPrecioProducto()
    cantidad = producto.getCantidadProducto()
    foto = producto.getFotoProducto()
    return jsonify({'resultado': 1, 'NombreProducto': nombre, 'DescripcionProducto': descripcion, 'CategoriaProducto': categoria, 'PrecioProducto': precio, 'CantidadProducto': cantidad, 'FotoProducto': foto})
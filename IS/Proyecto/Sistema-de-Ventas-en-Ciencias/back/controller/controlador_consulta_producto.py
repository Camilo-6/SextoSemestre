from flask import Blueprint, jsonify, request
from modelo import producto_operaciones

consulta_producto_bp = Blueprint('consulta_producto', __name__)

# Caso de uso: Consultar productos
# Caso de uso: Buscar productos
@consulta_producto_bp.route('/consulta_producto/lista', methods=['POST'])
def obtener():
    data = request.get_json()
    categoria = data.get('categoria', '')
    nombre = data.get('nombre', '')
    productos = producto_operaciones.lista(categoria, nombre)
    lista_productos = []
    for producto in productos:
        idp = producto.getIDProducto()
        nombre = producto.getNombreProducto()
        descripcion = producto.getDescripcionProducto()
        categoria = producto.getCategoriaProducto()
        precio = producto.getPrecioProducto()
        cantidad = producto.getCantidadProducto()
        foto = producto.getFotoProducto()
        idv = producto.getIDUsuarioVendedor()
        lista_productos.append({'IDProducto': idp, 'NombreProducto': nombre, 'DescripcionProducto': descripcion, 'CategoriaProducto': categoria, 'PrecioProducto': precio, 'CantidadProducto': cantidad, 'FotoProducto': foto, 'IDVendedor': idv})
    return jsonify({'productos': lista_productos})

# Caso de uso: Consultar producto vendedor
# Caso de uso: Buscar producto vendedor
@consulta_producto_bp.route('/consulta_producto/lista_vendedor', methods=['POST'])
def obtener_vendedor():
    data = request.get_json()
    idv = data.get('idv', '')
    categoria = data.get('categoria', '')
    nombre = data.get('nombre', '')
    productos = producto_operaciones.listaVendedorFiltrar(idv, categoria, nombre)
    lista_productos = []
    for producto in productos:
        idp = producto.getIDProducto()
        nombre = producto.getNombreProducto()
        descripcion = producto.getDescripcionProducto()
        categoria = producto.getCategoriaProducto()
        precio = producto.getPrecioProducto()
        cantidad = producto.getCantidadProducto()
        foto = producto.getFotoProducto()
        lista_productos.append({'IDProducto': idp, 'NombreProducto': nombre, 'DescripcionProducto': descripcion, 'CategoriaProducto': categoria, 'PrecioProducto': precio, 'CantidadProducto': cantidad, 'FotoProducto': foto})
    return jsonify({'productos': lista_productos})

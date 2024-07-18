from flask import Blueprint, jsonify, request
from modelo import venta_operaciones

seleccionar_producto_r_bp = Blueprint('seleccionar_producto_r', __name__)

# Caso de uso: Dejar review
@seleccionar_producto_r_bp.route('/seleccionar_producto_r/productos', methods=['POST'])
def obtener():
    data = request.get_json()
    id = data.get('id', '')
    lista = venta_operaciones.listaC(id)
    lista_productos = []
    for producto in lista:
        idp = producto.getIDProducto()
        nombre = producto.getNombreProducto()
        categoria = producto.getCategoriaProducto()
        precio = producto.getPrecioProducto()
        lista_productos.append({'IDProducto': idp, 'NombreProducto': nombre, 'CategoriaProducto': categoria, 'PrecioProducto': precio})
    return jsonify({'productos': lista_productos})
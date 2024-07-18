from flask import Blueprint, jsonify, request
from modelo import review_operaciones
from modelo import usuario_operaciones
from modelo import producto_operaciones

revisar_review_bp = Blueprint('revisar_review', __name__)

# Caso de uso: Revisar reviews
@revisar_review_bp.route('/revisar_review/obtener', methods=['POST'])
def obtener():
    # resultado 0 = no hay reviews, resultado 1 = exito
    data = request.get_json()
    idp = data.get('producto', '')
    producto = producto_operaciones.obtener(idp)
    if not producto:
        return jsonify({'resultado': 0})
    nombrep = producto.getNombreProducto()
    categoria = producto.getCategoriaProducto()
    precio = producto.getPrecioProducto()
    reviews = review_operaciones.lista(idp)
    lista_reviews = []
    for review in reviews:
        calificacion = review.getCalificacionReview()
        comentario = review.getComentarioReview()
        idc = review.getIDUsuarioComprador()
        usuario = usuario_operaciones.obtener(idc)
        nombreu = usuario.getNombreUsuario()
        lista_reviews.append({'CalificacionReview': calificacion, 'ComentarioReview': comentario, 'NombreUsuario': nombreu})
    return jsonify({'resultado': 1, 'NombreProducto': nombrep, 'CategoriaProducto': categoria, 'PrecioProducto': precio, 'Reviews': lista_reviews})

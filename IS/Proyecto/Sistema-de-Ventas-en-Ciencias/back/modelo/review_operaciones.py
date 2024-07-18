from modelo.review_modelo import Review
from modelo import db

def agregar(calificacion, comentario, idComprador, idProducto):
    # respuesta 1 = exito, respuesta 0 = error
    respuesta = 0
    review = Review(CalificacionReview=calificacion, ComentarioReview=comentario, IDUsuarioComprador=idComprador, IDProducto=idProducto)
    db.session.add(review)
    db.session.commit()
    respuesta = 1
    return respuesta

def lista(producto):
    reviews = Review.query.filter(Review.IDProducto == producto).all()
    return reviews
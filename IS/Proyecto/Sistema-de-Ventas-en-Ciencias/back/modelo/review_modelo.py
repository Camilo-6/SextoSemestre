from sqlalchemy import Column, Integer, ForeignKey, Text, CheckConstraint

from modelo import db

class Review(db.Model):

    __tablename__ = 'Review'
    IDReview = Column(Integer, primary_key=True, autoincrement=True)
    CalificacionReview = Column(Integer, nullable=False)
    ComentarioReview = Column(Text)
    IDUsuarioComprador = Column(Integer, ForeignKey('Comprador.IDUsuarioComprador'), nullable=False)
    IDProducto = Column(Integer, ForeignKey('Producto.IDProducto'), nullable=False)
    __table_args__ = (
        CheckConstraint('CalificacionReview >= 1 AND CalificacionReview <= 10', name='chk_calificacion_review_valid'),
    )

    def __init__(self, CalificacionReview, ComentarioReview, IDUsuarioComprador, IDProducto):
        self.CalificacionReview = CalificacionReview
        self.ComentarioReview = ComentarioReview
        self.IDUsuarioComprador = IDUsuarioComprador
        self.IDProducto = IDProducto

    def getIDReview(self):
        return self.IDReview
    
    def getCalificacionReview(self):
        return self.CalificacionReview
    
    def getComentarioReview(self):
        return self.ComentarioReview
    
    def getIDUsuarioComprador(self):
        return self.IDUsuarioComprador
    
    def getIDProducto(self):
        return self.IDProducto
    
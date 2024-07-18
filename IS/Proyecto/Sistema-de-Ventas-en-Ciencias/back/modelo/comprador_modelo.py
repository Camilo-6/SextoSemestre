from sqlalchemy import Column, Integer, ForeignKey

from modelo import db

class Comprador(db.Model):

    __tablename__ = 'Comprador'
    IDUsuarioComprador = Column(Integer, ForeignKey('Usuario.IDUsuario'), primary_key=True)

    def __init__(self, IDUsuarioComprador):
        self.IDUsuarioComprador = IDUsuarioComprador

    def getIDUsuarioComprador(self):
        return self.IDUsuarioComprador
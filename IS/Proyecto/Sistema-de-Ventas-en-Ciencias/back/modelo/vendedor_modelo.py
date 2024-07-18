from sqlalchemy import Column, Integer, ForeignKey

from modelo import db

class Vendedor(db.Model):

    __tablename__ = 'Vendedor'
    IDUsuarioVendedor = Column(Integer, ForeignKey('Usuario.IDUsuario'), primary_key=True)

    def __init__(self, IDUsuarioVendedor):
        self.IDUsuarioVendedor = IDUsuarioVendedor

    def getIDUsuarioVendedor(self):
        return self.IDUsuarioVendedor
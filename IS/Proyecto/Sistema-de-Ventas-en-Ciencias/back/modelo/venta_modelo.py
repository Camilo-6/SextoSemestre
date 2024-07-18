from sqlalchemy import Column, Integer, ForeignKey

from modelo import db

class Venta(db.Model):

    __tablename__ = 'Venta'
    IDVenta = Column(Integer, primary_key=True, autoincrement=True)
    IDProducto = Column(Integer, ForeignKey('Producto.IDProducto'), nullable=False)
    IDUsuarioVendedor = Column(Integer, ForeignKey('Vendedor.IDUsuarioVendedor'), nullable=False)
    IDUsuarioComprador = Column(Integer, ForeignKey('Comprador.IDUsuarioComprador'), nullable=False)

    def __init__(self, IDProducto, IDUsuarioVendedor, IDUsuarioComprador):
        self.IDProducto = IDProducto
        self.IDUsuarioVendedor = IDUsuarioVendedor
        self.IDUsuarioComprador = IDUsuarioComprador

    def getIDVenta(self):
        return self.IDVenta
    
    def getIDProducto(self):
        return self.IDProducto

    def getIDUsuarioVendedor(self):
        return self.IDUsuarioVendedor
    
    def getIDUsuarioComprador(self):
        return self.IDUsuarioComprador
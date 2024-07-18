from sqlalchemy import Column, Integer, Text, String, ForeignKey, CheckConstraint, Float

from modelo import db

class Producto(db.Model):

    __tablename__ = 'Producto'
    IDProducto = Column(Integer, primary_key=True, autoincrement=True)
    NombreProducto = Column(Text, nullable=False)
    DescripcionProducto = Column(Text)
    CategoriaProducto = Column(String(20), nullable=False)
    PrecioProducto = Column(Float, nullable=False)
    CantidadProducto = Column(Integer, nullable=False)
    FotoProducto = Column(Text, nullable=False)
    IDUsuarioVendedor = Column(Integer, ForeignKey('Vendedor.IDUsuarioVendedor'), nullable=False)
    __table_args__ = (
        CheckConstraint('NombreProducto <> \'\'', name='chk_nombre_producto_not_empty'),
        CheckConstraint('CategoriaProducto IN (\'Comida\', \'Ropa\', \'Electronicos\', \'Mascotas\', \'Joyeria\', \'Otros\')', name='chk_categoria_producto_valid'),
        CheckConstraint('PrecioProducto > 0.00', name='chk_precio_producto_positive'),
        CheckConstraint('CantidadProducto >= 0', name='chk_cantidad_producto_nonnegative'),
    )
    
    def __init__(self, NombreProducto, DescripcionProducto, CategoriaProducto, PrecioProducto, CantidadProducto, FotoProducto, IDUsuarioVendedor):
        self.NombreProducto = NombreProducto
        self.DescripcionProducto = DescripcionProducto
        self.CategoriaProducto = CategoriaProducto
        self.PrecioProducto = PrecioProducto
        self.CantidadProducto = CantidadProducto
        self.FotoProducto = FotoProducto
        self.IDUsuarioVendedor = IDUsuarioVendedor

    def getIDProducto(self):
        return self.IDProducto
    
    def getNombreProducto(self):
        return self.NombreProducto
    
    def setNombreProducto(self, NombreProducto):
        self.NombreProducto = NombreProducto

    def getDescripcionProducto(self):
        return self.DescripcionProducto
    
    def setDescripcionProducto(self, DescripcionProducto):
        self.DescripcionProducto = DescripcionProducto

    def getCategoriaProducto(self):
        return self.CategoriaProducto

    def setCategoriaProducto(self, CategoriaProducto):
        self.CategoriaProducto = CategoriaProducto

    def getPrecioProducto(self):
        return self.PrecioProducto

    def setPrecioProducto(self, PrecioProducto):
        self.PrecioProducto = PrecioProducto
    
    def getCantidadProducto(self):
        return self.CantidadProducto
    
    def setCantidadProducto(self, CantidadProducto):
        self.CantidadProducto = CantidadProducto

    def getFotoProducto(self):
        return self.FotoProducto
    
    def setFotoProducto(self, FotoProducto):
        self.FotoProducto = FotoProducto

    def getIDUsuarioVendedor(self):
        return self.IDUsuarioVendedor
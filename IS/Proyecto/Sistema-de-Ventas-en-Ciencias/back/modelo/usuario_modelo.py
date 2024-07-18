from sqlalchemy import Column, Integer, Text, String, CHAR, CheckConstraint

from modelo import db

class Usuario(db.Model):

    __tablename__ = 'Usuario'
    IDUsuario = Column(Integer, primary_key=True, autoincrement=True)
    NombreUsuario = Column(Text, nullable=False)
    CorreoUsuario = Column(Text, nullable=False, unique=True)
    ContraseniaUsuario = Column(String(100), nullable=False)
    TelefonoUsuario = Column(Integer)
    RolUsuario = Column(CHAR(1), nullable=False)
    __table_args__ = (
        CheckConstraint('NombreUsuario <> \'\'', name='chk_nombre_usuario_not_empty'),
        CheckConstraint('RolUsuario IN (\'c\', \'v\')', name='chk_rol_usuario_valid'),
    )

    def __init__(self, NombreUsuario, CorreoUsuario, ContraseniaUsuario, TelefonoUsuario, RolUsuario):
        self.NombreUsuario = NombreUsuario
        self.CorreoUsuario = CorreoUsuario
        self.ContraseniaUsuario = ContraseniaUsuario
        self.TelefonoUsuario = TelefonoUsuario
        self.RolUsuario = RolUsuario

    def getIDUsuario(self):
        return self.IDUsuario
    
    def getNombreUsuario(self):
        return self.NombreUsuario
    
    def getCorreoUsuario(self):
        return self.CorreoUsuario
    
    def getContraseniaUsuario(self):
        return self.ContraseniaUsuario
    
    def getTelefonoUsuario(self):
        return self.TelefonoUsuario
    
    def getRolUsuario(self):
        return self.RolUsuario

    
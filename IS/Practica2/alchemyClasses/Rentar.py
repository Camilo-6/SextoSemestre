from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from alchemyClasses import db
from datetime import date


class Rentar(db.Model):

    __tablename__ = 'rentar'
    __table_args__ = {'mysql_engine': 'InnoDB', 'mysql_auto_increment': 2, 'mysql_charset': 'utf8mb4'}
    idRentar = Column(Integer, primary_key=True, autoincrement=True)
    idUsuario = Column(Integer, ForeignKey('usuarios.idUsuario'), nullable=False)
    idPelicula = Column(Integer, ForeignKey('peliculas.idPelicula'), nullable=False)
    fecha_renta = Column(DateTime, nullable=False)
    dias_de_renta = Column(Integer, default=5)
    estatus = Column(Boolean, default=False)

    def __init__(self, id_usuario, id_pelicula, fecha_renta=date.today(), dias_renta=5, estatus=False):
        self.idUsuario = id_usuario
        self.idPelicula = id_pelicula
        self.fecha_renta = fecha_renta
        self.dias_de_renta = dias_renta
        self.estatus = estatus

    def __str__(self):
        return (f'idRentar: {self.idRentar}, idUsuario: {self.idUsuario}, idPelicula: {self.idPelicula}, fecha_renta:'
                f' {self.fecha_renta}, dias_de_renta: {self.dias_de_renta}, estatus: {self.estatus}')



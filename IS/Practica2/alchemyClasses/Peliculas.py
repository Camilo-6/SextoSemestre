from sqlalchemy import Column, Integer, String
from alchemyClasses import db


class Peliculas(db.Model):

    __tablename__ = 'peliculas'
    __table_args__ = {'mysql_engine': 'InnoDB', 'mysql_charset': 'utf8mb4'}
    idPelicula = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    genero = Column(String(45), default=None)
    duracion = Column(Integer, default=None)
    inventario = Column(Integer, default=1, nullable=False)

    def __init__(self, nombre, genero=None, duracion=None, inventario=None):
        self.nombre = nombre
        self.genero = genero
        self.duracion = duracion
        self.inventario = inventario

    def __str__(self):
        return (f'idPelicula: {self.idPelicula}, nombre: {self.nombre}, genero: {self.genero}, duracion: '
                f'{self.duracion}, inventario: {self.inventario}')

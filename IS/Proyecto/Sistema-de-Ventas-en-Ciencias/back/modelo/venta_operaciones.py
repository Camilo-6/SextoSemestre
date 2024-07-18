from modelo.venta_modelo import Venta
from modelo.usuario_modelo import Usuario
from modelo.producto_modelo import Producto
from modelo import db
import modelo.producto_operaciones as po

def agregar(idProducto, idComprador):
    # respuesta None = error, respuesta venta = exito
    respuesta = None
    comprador = Usuario.query.filter(Usuario.IDUsuario == idComprador).first()
    producto = Producto.query.filter(Producto.IDProducto == idProducto).first()
    vendedor = Usuario.query.filter(Usuario.IDUsuario == producto.IDUsuarioVendedor).first()
    if comprador:
        if vendedor:
            if producto:
                cantidad = producto.CantidadProducto
                if cantidad == 0:
                    return respuesta
                producto.setCantidadProducto(cantidad - 1)
                venta = Venta(idProducto, producto.IDUsuarioVendedor, idComprador)
                db.session.add(venta)
                db.session.commit()
                respuesta = venta
    return respuesta

def listaC(comprador):
    ventas = Venta.query.filter(Venta.IDUsuarioComprador == comprador).all()
    lista = []
    lista_agregados = []
    for venta in ventas:
        idProducto = venta.IDProducto
        producto = po.obtener(idProducto)
        if producto:
            if idProducto not in lista_agregados:
                lista.append(producto)
                lista_agregados.append(idProducto)
    return lista

def obtener(id):
    return Venta.query.filter(Venta.IDVenta == id).first()
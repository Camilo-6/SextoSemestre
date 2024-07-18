from modelo.producto_modelo import Producto
from modelo import db

def agregar(nombre, descripcion, categoria, precio, cantidad, foto, idvendedor):
    # respuesta 1 = exito, respuesta 0 = error
    respuesta = 0
    producto = Producto(NombreProducto=nombre, DescripcionProducto=descripcion, CategoriaProducto=categoria, PrecioProducto=precio, CantidadProducto=cantidad, FotoProducto=foto, IDUsuarioVendedor=idvendedor)
    db.session.add(producto)
    db.session.commit()
    respuesta = 1
    return respuesta

def obtener(id):
    return Producto.query.filter(Producto.IDProducto == id).first()

def modificar(id, nombre, descripcion, categoria, precio, cantidad, foto):
    # respuesta 1 = exito, respuesta 0 = error
    respuesta = 0
    producto = Producto.query.filter(Producto.IDProducto == id).first()
    if producto:
        producto.setNombreProducto(nombre)
        producto.setDescripcionProducto(descripcion)
        producto.setCategoriaProducto(categoria)
        producto.setPrecioProducto(precio)
        producto.setCantidadProducto(cantidad)
        producto.setFotoProducto(foto)
        db.session.commit()
        respuesta = 1
    return respuesta

def eliminar(id):
    # respuesta 1 = exito, respuesta 0 = error
    respuesta = 0
    producto = Producto.query.filter(Producto.IDProducto == id).first()
    if producto:
        db.session.delete(producto)
        db.session.commit()
        respuesta = 1
    return respuesta

def lista(categoria, nombre):
    productos = []
    if categoria == "Todas":
        if (nombre == ""):
            productos = Producto.query.all()
        else:
            productos = Producto.query.filter(Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Comida":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Comida").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Comida", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Ropa":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Ropa").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Ropa", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Electronicos":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Electronicos").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Electronicos", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Mascotas":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Mascotas").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Mascotas", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Joyeria":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Joyeria").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Joyeria", Producto.NombreProducto.contains(nombre)).all()
    else: 
        if (nombre == ""):
            productos = Producto.query.filter(Producto.CategoriaProducto == "Otros").all()
        else:
            productos = Producto.query.filter(Producto.CategoriaProducto == "Otros", Producto.NombreProducto.contains(nombre)).all()
    return productos

def listaVendedorFiltrar(idv, categoria, nombre):
    productos = []
    if categoria == "Todas":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv).all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Comida":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Comida").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Comida", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Ropa":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Ropa").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Ropa", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Electronicos":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Electronicos").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Electronicos", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Mascotas":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Mascotas").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Mascotas", Producto.NombreProducto.contains(nombre)).all()
    elif categoria == "Joyeria":
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Joyeria").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Joyeria", Producto.NombreProducto.contains(nombre)).all()
    else: 
        if (nombre == ""):
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Otros").all()
        else:
            productos = Producto.query.filter(Producto.IDUsuarioVendedor == idv, Producto.CategoriaProducto == "Otros", Producto.NombreProducto.contains(nombre)).all()
    return productos

def listaV(vendedor):
    productos = Producto.query.filter(Producto.IDUsuarioVendedor == vendedor).all()
    return productos
    
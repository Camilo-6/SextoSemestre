from flask import Blueprint, request, jsonify
import modelo.producto_operaciones as po
import modelo.usuario_operaciones as uo

producto_controlador_agregar_bp = Blueprint('producto_controlador_agregar_bp', __name__)

@producto_controlador_agregar_bp.route('/agregar_producto', methods=['POST'])
def agregar_producto():
    data = request.get_json()
    id = data.get('id', '')
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    categoria = data.get('categoria')
    precio = data.get('precio')
    cantidad = data.get('cantidad')
    foto = data.get('foto')
    clave = data.get('clave')
    usuario = uo.obtener(id)
    if not usuario:
        return jsonify({"error": 0}) # Error no existe el usuario
    if usuario.getRolUsuario() != 'v':
        return jsonify({"error": 1}) # Error no eres un vendedor, que haces aqui? lol
    if uo.generar_clave_unica(id) != clave:
        return jsonify({"error": 4}) # Error clave unica incorrecta
    exito = po.agregar(nombre, descripcion, categoria, precio, cantidad, foto, id)
    if exito == 0:
        return jsonify({"error": 2}) # Error no se pudo agregar producto D:
    return jsonify({"error": 3}) # Producto agregado exitosamente :D - owo
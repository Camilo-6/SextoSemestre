from flask import Blueprint, jsonify, request
from modelo import usuario_operaciones
import modelo.correos as correos

registrar_bp = Blueprint('registrar', __name__)

@registrar_bp.route('/registrar', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    nombre = data.get('nombre', '')
    correo = data.get('correo', '')
    telefono = data.get('telefono', '')
    rol = data.get('rol', '')

    # Revisar que faltan datos obligatorios es un problema del front
    # if not nombre or not correo or not rol:
    #     return jsonify({'error': 'Faltan datos obligatorios'}), 400

    if usuario_operaciones.correoUso(correo):
        return jsonify({'error': 0}), 409 # El correo electrónico ya está en uso
    
    nuevo_usuario = usuario_operaciones.agregar(nombre, correo, telefono, rol)
    
    if nuevo_usuario is None:
        return jsonify({'error': 1}), 500 # Error al registrar el usuario

    # Enviar correo electrónico de confirmación 
    a = correos.confirmarCuenta(nuevo_usuario.getIDUsuario())
    if a == 0:
        return jsonify({'error': 2}), 500 # Error al enviar el correo de confirmación
    
    return jsonify({'error': 3}), 201 # Usuario registrado correctamente


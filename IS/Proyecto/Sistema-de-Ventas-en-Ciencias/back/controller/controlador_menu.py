from flask import Blueprint, jsonify, request
from modelo import usuario_operaciones

menu_bp = Blueprint('menu', __name__)

@menu_bp.route('/menu/datos', methods=['POST'])
def datos():
    data = request.get_json()
    id_usuario = data.get('id_usuario', '')
    if not id_usuario:
        return jsonify({'error': 'No se ha enviado el ID del usuario'})
    usuario = usuario_operaciones.obtener(id_usuario)
    #usuario = Usuario.query.filter_by(IDUsuario=id_usuario).first()
    if not usuario:
        return jsonify({'error': 'No se ha encontrado el usuario'})
    #idu = usuario.IDUsuario
    idu = usuario.getIDUsuario()
    #nombre = usuario.NombreUsuario
    nombre = usuario.getNombreUsuario()
    #correo = usuario.CorreoUsuario
    correo = usuario.getCorreoUsuario()
    #contra = usuario.ContraseniaUsuario
    contra = usuario.getContraseniaUsuario()
    #tel = usuario.TelefonoUsuario
    tel = usuario.getTelefonoUsuario()
    #rol = usuario.RolUsuario
    rol = usuario.getRolUsuario()
    if tel:
        return jsonify({'IDUsuario': idu, 'NombreUsuario': nombre, 'CorreoUsuario': correo, 'ContraseniaUsuario': contra, 'TelefonoUsuario': tel, 'RolUsuario': rol})
    else: return jsonify({'IDUsuario': idu, 'NombreUsuario': nombre, 'CorreoUsuario': correo, 'ContraseniaUsuario': contra, 'TelefonoUsuario': -1, 'RolUsuario': rol})
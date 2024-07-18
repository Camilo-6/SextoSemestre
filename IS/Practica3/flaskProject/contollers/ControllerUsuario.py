from flask import Blueprint, render_template, request, flash, url_for, redirect
from alchemyClasses.Usuarios import Usuarios
from alchemyClasses.Rentar import Rentar
from alchemyClasses import db

usuario_blueprint = Blueprint('usuario', __name__, url_prefix='/usuario')

@usuario_blueprint.route('/') #localhost:5001/usuario/
def ver_usuarios():
    usuarios = Usuarios.query.all()
    return render_template('usuarios.html', usuarios=usuarios)

@usuario_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_usuario():
    if request.method == 'GET':
        return render_template('agregar_usuario.html')
    else:
        nombre = request.form['nombre']
        apPat = request.form['apPat']
        apMat = request.form.get('apMat')
        password = request.form['password']
        email = request.form['email']
        superUser = True if request.form.get('superUser') else False
        if not nombre or not apPat or not password or not email:
            flash('Faltan campos por llenar', 'error')
            return redirect(url_for('usuario.agregar_usuario'))
        if Usuarios.query.filter_by(email=email).first():
            flash('El correo electrónico ya está en uso.', 'error')
            return render_template('agregar_usuario.html')
        nuevousuario = Usuarios(nombre, apPat, apMat, password, email, superUser)
        db.session.add(nuevousuario)
        db.session.commit()
        flash('Usuario agregado', 'success')
        return redirect(url_for('usuario.ver_usuarios'))

@usuario_blueprint.route('/modificar', methods=['GET', 'POST'])
def modificar_usuario():
    if request.method == 'POST':
        id_usuario = request.form.get('id_usuario')
        try:
            id_usuario = int(id_usuario)
            return redirect(url_for('usuario.modificar_usuario_id', id=id_usuario))
        except ValueError:
            flash('Por favor, ingrese un ID válido.', 'error')
    return render_template('solicitar_id_usuario.html')

@usuario_blueprint.route('/modificar/<int:id>', methods=['GET', 'POST'])
def modificar_usuario_id(id):
    usuario = Usuarios.query.get(id)
    if not usuario:
        return render_template('usuario_no_encontrado.html')
    if request.method == 'GET':
        return render_template('modificar_usuario.html', usuario=usuario)
    elif request.method == 'POST':
        nuevocorreo = request.form['email']
        correousado = Usuarios.query.filter((Usuarios.email == nuevocorreo) & (Usuarios.idUsuario != usuario.idUsuario)).first()
        if correousado:
            flash('El correo electrónico ya está en uso.', 'error')
            return render_template('modificar_usuario.html', usuario=usuario)
        usuario.nombre = request.form['nombre']
        usuario.apPat = request.form['apPat']
        usuario.apMat = request.form['apMat']
        usuario.password = request.form['password']
        usuario.email = nuevocorreo
        usuario.superUser = True if request.form.get('superUser') else False
        if not usuario.nombre or not usuario.apPat or not usuario.password or not usuario.email:
            flash('Faltan campos por llenar', 'error')
            return render_template('modificar_usuario.html', usuario=usuario)
        db.session.commit()
        flash('Usuario modificado', 'success')
        return redirect(url_for('usuario.ver_usuarios'))

@usuario_blueprint.route('/eliminar', methods=['GET', 'POST'])
def eliminar_usuario():
    if request.method == 'POST':
        id_usuario = request.form.get('id_usuario')
        try:
            id_usuario = int(id_usuario)
            return redirect(url_for('usuario.eliminar_usuario_id', id=id_usuario))
        except ValueError:
            flash('Por favor, ingrese un ID válido.', 'error')
    return render_template('solicitar_id_usuario.html')

@usuario_blueprint.route('/eliminar/<int:id>', methods=['GET', 'POST'])
def eliminar_usuario_id(id):
    usuario = Usuarios.query.get(id)
    if not usuario:
        return render_template('usuario_no_encontrado.html')
    else:
        rentas = Rentar.query.filter_by(idUsuario=usuario.idUsuario).all()
        if rentas:
            flash('El usuario tiene rentas asociadas y no puede ser eliminado', 'error')
        else:
            db.session.delete(usuario)
            db.session.commit()
            flash('Usuario eliminado correctamente', 'success')
    return redirect(url_for('usuario.ver_usuarios'))


from flask import Blueprint, render_template, request, flash, url_for, redirect
from alchemyClasses.Peliculas import Peliculas
from alchemyClasses.Rentar import Rentar
from alchemyClasses import db

pelicula_blueprint = Blueprint('pelicula', __name__, url_prefix='/pelicula')

@pelicula_blueprint.route('/') #localhost:5001/pelicula/
def ver_peliculas():
    peliculas = Peliculas.query.all()
    return render_template('peliculas.html', peliculas=peliculas)

@pelicula_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_pelicula():
    if request.method == 'GET':
        return render_template('agregar_pelicula.html')
    else:
        nombre = request.form['nombre']
        genero = request.form.get('genero')
        duracion = request.form.get('duracion')
        inventario = request.form.get('inventario')
        if not nombre:
            flash('Falta el campo nombre.', 'error')
            return redirect(url_for('pelicula.agregar_pelicula'))
        if not genero:
            genero = None
        if not duracion:
            duracion = None
        if not inventario:
            inventario = 1
        nuevapelicula = Peliculas(nombre=nombre, genero=genero, duracion=duracion, inventario=inventario)
        db.session.add(nuevapelicula)
        db.session.commit()
        flash('Pelicula agregada exitosamente.', 'success')
        return redirect(url_for('pelicula.ver_peliculas'))

@pelicula_blueprint.route('/modificar', methods=['GET', 'POST'])
def modificar_pelicula():
    if request.method == 'POST':
        id_pelicula = request.form.get('id_pelicula')
        try:
            id_pelicula = int(id_pelicula)
            return redirect(url_for('pelicula.modificar_pelicula_id', id=id_pelicula))
        except ValueError:
            flash('Por favor, ingrese un ID válido.', 'error')
    return render_template('solicitar_id_pelicula.html')

@pelicula_blueprint.route('/modificar/<int:id>', methods=['GET', 'POST'])
def modificar_pelicula_id(id):
    pelicula = Peliculas.query.get(id)
    if not pelicula:
        return render_template('pelicula_no_encontrada.html')
    if request.method == 'GET':
        return render_template('modificar_pelicula.html', pelicula=pelicula)
    elif request.method == 'POST':
        pelicula.nombre = request.form['nombre']
        pelicula.genero = request.form.get('genero')
        pelicula.duracion = request.form.get('duracion')
        pelicula.inventario = request.form.get('inventario')
        if not pelicula.nombre:
            flash('Falta el campo nombre.', 'error')
            return render_template('modificar_pelicula.html', pelicula=pelicula)
        if not pelicula.genero:
            pelicula.genero = None
        if not pelicula.duracion:
            pelicula.duracion = None
        if not pelicula.inventario:
            pelicula.inventario = 1
        db.session.commit()
        flash('Pelicula modificada exitosamente.', 'success')
        return redirect(url_for('pelicula.ver_peliculas'))

@pelicula_blueprint.route('/eliminar', methods=['GET', 'POST'])
def eliminar_pelicula():
    if request.method == 'POST':
        id_pelicula = request.form.get('id_pelicula')
        try:
            id_pelicula = int(id_pelicula)
            return redirect(url_for('pelicula.eliminar_pelicula_id', id=id_pelicula))
        except ValueError:
            flash('Por favor, ingrese un ID válido.', 'error')
    return render_template('solicitar_id_pelicula.html')

@pelicula_blueprint.route('/eliminar/<int:id>', methods=['GET', 'POST'])
def eliminar_pelicula_id(id):
    pelicula = Peliculas.query.get(id)
    if not pelicula:
        return render_template('pelicula_no_encontrada.html')
    else:
        rentas = Rentar.query.filter_by(idPelicula=pelicula.idPelicula).all()
        if rentas:
            flash('La pelicula tiene rentas asociadas y no puede ser eliminada', 'error')
        else:
            db.session.delete(pelicula)
            db.session.commit()
            flash('Pelicula eliminada exitosamente', 'success')
        return redirect(url_for('pelicula.ver_peliculas'))
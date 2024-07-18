from flask import Blueprint, render_template, request, flash, url_for, redirect
from alchemyClasses.Rentar import Rentar
from alchemyClasses.Usuarios import Usuarios
from alchemyClasses.Peliculas import Peliculas
from alchemyClasses import db
from datetime import datetime, timedelta, date

renta_blueprint = Blueprint('renta', __name__, url_prefix='/renta')

@renta_blueprint.route('/') #localhost:5001/renta/
def ver_rentas():
    rentas = Rentar.query.all()
    rentasinfo = []
    for renta in rentas:
        fecha_vencimiento = renta.fecha_renta + timedelta(days=renta.dias_de_renta)
        renta_pasada = fecha_vencimiento < datetime.combine(date.today(), datetime.min.time())
        rentasinfo.append({'renta': renta, 'renta_pasada': renta_pasada})
    return render_template('rentas.html', rentas=rentasinfo)

@renta_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_renta():
    if request.method == 'GET':
        return render_template('agregar_renta.html')
    else:
        idUsuario = request.form.get('idUsuario')
        idPelicula = request.form.get('idPelicula')
        fecha_renta = request.form.get('fecha_renta')
        dias_de_renta = request.form.get('dias_de_renta')
        estatus = True if request.form.get('estatus') else False
        if not idUsuario or not idPelicula:
            flash('Faltan campos por llenar', 'error')
            return redirect(url_for('renta.agregar_renta'))
        infovalida = True
        usuario = Usuarios.query.filter_by(idUsuario=idUsuario).first()
        if not usuario:
            flash('El usuario no existe', 'error')
            infovalida = False
        pelicula = Peliculas.query.filter_by(idPelicula=idPelicula).first()
        if not pelicula:
            flash('La película no existe', 'error')
            infovalida = False
        if not infovalida:
            return redirect(url_for('renta.agregar_renta'))
        if not fecha_renta:
            fecha_renta = date.today()
        if not dias_de_renta:
            dias_de_renta = 5
        nuevarenta = Rentar(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus)
        db.session.add(nuevarenta)
        db.session.commit()
        flash('Renta agregada exitosamente.', 'success')
        return redirect(url_for('renta.ver_rentas'))

@renta_blueprint.route('/modificar', methods=['GET', 'POST'])
def modificar_renta():
    if request.method == 'POST':
        id_renta = request.form.get('id_renta')
        try:
            id_renta = int(id_renta)
            return redirect(url_for('renta.modificar_renta_id', id=id_renta))
        except ValueError:
            flash('Por favor, ingrese un ID válido.', 'error')
    return render_template('solicitar_id_renta.html')

@renta_blueprint.route('/modificar/<int:id>', methods=['GET', 'POST'])
def modificar_renta_id(id):
    renta = Rentar.query.get(id)
    if not renta:
        return render_template('renta_no_encontrada.html')
    if request.method == 'GET':
        return render_template('modificar_renta.html', renta=renta)
    elif request.method == 'POST':
        renta.estatus = True if request.form.get('estatus') else False
        db.session.commit()
        flash('Renta modificada exitosamente.', 'success')
        return redirect(url_for('renta.ver_rentas'))
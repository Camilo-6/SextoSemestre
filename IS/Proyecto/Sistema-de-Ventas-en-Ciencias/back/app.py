from flask import Flask
from flask_cors import CORS # pip install flask-cors
from modelo import db
from controller.controlador_iniciar_sesion import iniciar_bp
from controller.controlador_menu import menu_bp
from controller.controlador_consulta_producto import consulta_producto_bp
from controller.controlador_venta import ventas_bp
from controller.controlador_seleccionar_producto_r import seleccionar_producto_r_bp
from controller.controlador_dejar_review import dejar_review_bp
from controller.controlador_revisar_review import revisar_review_bp
from controller.controlador_registrar import registrar_bp
from controller.controlador_producto_agregar import producto_controlador_agregar_bp
from controller.controlador_modificar_producto import modificar_producto_bp
from controller.controlador_eliminar_producto import eliminar_producto_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://intento_1:Penguin15@localhost:3306/base_penguin'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)
app.register_blueprint(iniciar_bp)
app.register_blueprint(menu_bp)
app.register_blueprint(consulta_producto_bp)
app.register_blueprint(ventas_bp)
app.register_blueprint(seleccionar_producto_r_bp)
app.register_blueprint(dejar_review_bp)
app.register_blueprint(revisar_review_bp)
app.register_blueprint(registrar_bp)
app.register_blueprint(producto_controlador_agregar_bp)
app.register_blueprint(modificar_producto_bp)
app.register_blueprint(eliminar_producto_bp)

if __name__ == '__main__':
    app.run(debug=True)

# Requerimientos
# pip install flask
# pip install flask-cors
# pip install flask-sqlalchemy
# pip install sqlalchemy
# pip install pymysql
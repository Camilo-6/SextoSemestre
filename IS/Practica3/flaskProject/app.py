from flask import Flask, render_template

from alchemyClasses import db
from contollers.ControllerUsuario import usuario_blueprint
from contollers.ControllerPelicula import pelicula_blueprint
from contollers.ControllerRenta import renta_blueprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_software'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)
app.register_blueprint(usuario_blueprint)
app.register_blueprint(pelicula_blueprint)
app.register_blueprint(renta_blueprint)

@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')

if __name__ == '__main__':
    app.run()

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from modelo.venta_modelo import Venta
from modelo.usuario_modelo import Usuario
from modelo.producto_modelo import Producto
from modelo.config import GMAIL_PASSWORD

# Obtener la ruta completa del directorio actual
current_directory = os.path.dirname(__file__)

# Ruta completa del archivo de imagen
image_path = os.path.join(current_directory, 'logo.jpg')

# Configuracion del servidor SMTP de Gmail
smtp_server = 'smtp.gmail.com'
smtp_port = 587  # Puerto de conexion SMTP TLS para Gmail

# Correo electronico y contrasenia de tu cuenta de Gmail
gmail_username = 'cuentaparaingenieriadesoftware@gmail.com'
gmail_password = GMAIL_PASSWORD

# ----Registro

def enviar_correo_confirmacion(destinatario, asunto, mensaje):
    remitente = 'cuentaparaingenieriadesoftware@gmail.com'
    password = GMAIL_PASSWORD

    msg = MIMEMultipart()
    msg['From'] = remitente
    msg['To'] = destinatario
    msg['Subject'] = asunto

    cuerpo = mensaje
    msg.attach(MIMEText(cuerpo, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(remitente, password)
    texto = msg.as_string()
    server.sendmail(remitente, destinatario, texto)
    server.quit()

# ---

def envioCorreoCompra(ventaID):
    # resultado 0 = error, 1 = exito
    resultado = 0
    res1 = confirmarCompra(ventaID)
    res2 = avisarCompra(ventaID)
    if res1 == 1 and res2 == 1:
        resultado = 1
    return resultado

def confirmarCompra(ventaID):
    # resultado 0 = error, 1 = exito
    resultado = 0

    venta = Venta.query.filter(Venta.IDVenta == ventaID).first()
    if not venta:
        return resultado
    
    producto = Producto.query.filter(Producto.IDProducto == venta.IDProducto).first()
    comprador = Usuario.query.filter(Usuario.IDUsuario == venta.IDUsuarioComprador).first()
    vendedor = Usuario.query.filter(Usuario.IDUsuario == venta.IDUsuarioVendedor).first()
    if not producto or not comprador or not vendedor:
        return resultado

    # Configuracion del correo electronico
    sender = 'cuentaparaingenieriadesoftware@gmail.com'  # Remitente
    receiver = comprador.getCorreoUsuario()  # Destinatario
    subject = f'Confirmacion de Compra {venta.getIDVenta()}'
    body = f'<html><body>'
    body += f'<p>Hola, {comprador.getNombreUsuario()}</p>'
    body += f'<p>Este es un correo para confirmar la compra del producto {producto.getNombreProducto()} por un precio de ${producto.getPrecioProducto()}</p>'
    # poner opcion de telefono si existe
    telefono = vendedor.getTelefonoUsuario()
    if telefono:
        body += f'<p>Para ponerse en contacto con el vendedor {vendedor.getNombreUsuario()}, llame al {telefono} o envie un correo a {vendedor.getCorreoUsuario()} y acuerden un lugar de entrega</p>'
    else:
        body += f'<p>Para ponerse en contacto con el vendedor {vendedor.getNombreUsuario()}, envie un correo a {vendedor.getCorreoUsuario()} y acuerden un lugar de entrega</p>'
    body += f'<p>Gracias por su compra</p>'
    body += f'<p><a href="https://tinyurl.com/penguin-clic" rel="noopener noreferrer"><img src="cid:{image_path}" width="150" height="150"></a></p>'
    body += f'<p>Para no recibir más correos, por favor ingrese a esta <a href="https://tinyurl.com/cancelar-correos" rel="noopener noreferrer">página</a></p>'
    body += f'</body></html>'
    
    # Crear el objeto del mensaje
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = receiver
    msg['Subject'] = subject

    # Agregar el cuerpo del mensaje como HTML
    msg.attach(MIMEText(body, 'html'))

    try:
        # Crear una conexion segura con el servidor SMTP de Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Iniciar sesion en el servidor SMTP de Gmail
        server.login(gmail_username, gmail_password)

        # Leer la imagen y adjuntarla como una parte del mensaje
        with open(image_path, 'rb') as fp:
            img = MIMEImage(fp.read())
            img.add_header('Content-Disposition', 'inline', filename=image_path)
            img.add_header('Content-ID', f'<{image_path}>')
            msg.attach(img)
        
        # Enviar el correo electronico
        server.sendmail(sender, receiver, msg.as_string())
        resultado = 1

    except Exception as e:
        print(e)
        return resultado

    finally:
        # Cerrar la conexión con el servidor SMTP de Gmail
        server.quit()
        return resultado

def avisarCompra(ventaID):
    # resultado 0 = error, 1 = exito
    resultado = 0

    venta = Venta.query.filter(Venta.IDVenta == ventaID).first()
    if not venta:
        return resultado
    
    producto = Producto.query.filter(Producto.IDProducto == venta.IDProducto).first()
    comprador = Usuario.query.filter(Usuario.IDUsuario == venta.IDUsuarioComprador).first()
    vendedor = Usuario.query.filter(Usuario.IDUsuario == venta.IDUsuarioVendedor).first()
    if not producto or not comprador or not vendedor:
        return resultado

    # Configuracion del correo electronico
    sender = 'cuentaparaingenieriadesoftware@gmail.com'  # Remitente
    receiver = vendedor.getCorreoUsuario()  # Destinatario
    subject = f'Aviso de Compra {venta.getIDVenta()}'
    body = f'<html><body>'
    body += f'<p>Hola, {vendedor.getNombreUsuario()}</p>'
    body += f'<p>Este es un correo para avisar la compra del producto {producto.getNombreProducto()} por un precio de ${producto.getPrecioProducto()}</p>'
    # poner opcion de telefono si existe
    telefono = comprador.getTelefonoUsuario()
    if telefono:
        body += f'<p>El comprador {comprador.getNombreUsuario()} se pondra en contacto con usted para acordar un lugar de entrega. Puede llamar al {telefono} o enviar un correo a {comprador.getCorreoUsuario()}</p>'
    else:
        body += f'<p>El comprador {comprador.getNombreUsuario()} se pondra en contacto con usted para acordar un lugar de entrega. Puede enviar un correo a {comprador.getCorreoUsuario()}</p>'
    body += f'<p>Gracias por usar nuestro servicio</p>'
    body += f'<p><a href="https://tinyurl.com/penguin-clic" rel="noopener noreferrer"><img src="cid:{image_path}" width="150" height="150"></a></p>'
    body += f'<p>Para no recibir más correos, por favor ingrese a esta <a href="https://tinyurl.com/cancelar-correos" rel="noopener noreferrer">página</a></p>'
    body += f'</body></html>'

    # Crear el objeto del mensaje
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = receiver
    msg['Subject'] = subject

    # Agregar el cuerpo del mensaje como HTML
    msg.attach(MIMEText(body, 'html'))

    try:
        # Crear una conexion segura con el servidor SMTP de Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Iniciar sesion en el servidor SMTP de Gmail
        server.login(gmail_username, gmail_password)

        # Leer la imagen y adjuntarla como una parte del mensaje
        with open(image_path, 'rb') as fp:
            img = MIMEImage(fp.read())
            img.add_header('Content-Disposition', 'inline', filename=image_path)
            img.add_header('Content-ID', f'<{image_path}>')
            msg.attach(img)
        
        # Enviar el correo electronico
        server.sendmail(sender, receiver, msg.as_string())
        resultado = 1

    except Exception as e:
        print(e)
        return resultado

    finally:
        # Cerrar la conexión con el servidor SMTP de Gmail
        server.quit()
        resultado = 1
        return resultado
    
def confirmarCuenta(usuarioID):
    # resultado 0 = error, 1 = exito
    resultado = 0

    usuario = Usuario.query.filter(Usuario.IDUsuario == usuarioID).first()
    if not usuario:
        return resultado

    # Configuracion del correo electronico
    sender = 'cuentaparaingenieriadesoftware@gmail.com'  # Remitente
    receiver = usuario.getCorreoUsuario()  # Destinatario
    subject = f'Confirmacion de Creacion de Cuenta'
    body = f'<html><body>'
    body += f'<p>Hola, <b>{usuario.getNombreUsuario()}</b></p>'
    body += f'<p>Este es un correo para confirmar la creacion de su cuenta en nuestro servicio</p>'
    body += f'<p>La contraseña para ingresar a su cuenta es:</p>'
    body += f'<p><b>{usuario.getContraseniaUsuario()}</b></p>'
    body += f'<p>Para cambiar su contraseña, por favor ingrese a esta <a href="https://tinyurl.com/cambiar-cont" rel="noopener noreferrer">página</a></p>'
    body += f'<p>Gracias por usar nuestro servicio</p>'
    body += f'<p><a href="https://tinyurl.com/penguin-clic" rel="noopener noreferrer"><img src="cid:{image_path}" width="150" height="150"></a></p>'
    body += f'<p>Para no recibir más correos, por favor ingrese a esta <a href="https://tinyurl.com/cancela-correos" rel="noopener noreferrer">página</a></p>'
    body += f'</body></html>'

    # Crear el objeto del mensaje
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = receiver
    msg['Subject'] = subject

    # Agregar el cuerpo del mensaje como HTML
    msg.attach(MIMEText(body, 'html'))

    try:
        # Crear una conexion segura con el servidor SMTP de Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Iniciar sesion en el servidor SMTP de Gmail
        server.login(gmail_username, gmail_password)

        # Leer la imagen y adjuntarla como una parte del mensaje
        with open(image_path, 'rb') as fp:
            img = MIMEImage(fp.read())
            img.add_header('Content-Disposition', 'inline', filename=image_path)
            img.add_header('Content-ID', f'<{image_path}>')
            msg.attach(img)
        
        # Enviar el correo electronico
        server.sendmail(sender, receiver, msg.as_string())
        resultado = 1

    except Exception as e:
        print(e)
        return resultado

    finally:
        # Cerrar la conexión con el servidor SMTP de Gmail
        server.quit()
        return resultado
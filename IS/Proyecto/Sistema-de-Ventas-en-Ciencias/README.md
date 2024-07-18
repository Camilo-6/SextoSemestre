# <img src="https://www.pkparaiso.com/imagenes/ultra_sol_ultra_luna/sprites/animados-sinbordes-gigante/piplup-s.gif" width="40"> **Sistema de Ventas en Ciencias**

<p style="text-align: justify;">
El sistema de ventas en ciencias es un proyecto desarrollado con la intención de ser un medio para facilitar la compra y venta de productos en la Facultad de Ciencias de la UNAM. 
</p>

## Tabla de Contenido

- [**Get Started**](#get-started)
  - [Base de Datos](#-base-de-datos)
  - [Backend](#-backend)
  - [Frontend](#-frontend)
- [**How to Use**](#how-to-use)
  - [Linux](#linux)
  - [Windows](#windows)
- [**A Quick Demo**](#a-quick-demo)
- [**Colaboradores**](#-colaboradores)

## Get Started

### 📊 Base de Datos

<p style="text-align: justify;">
Para poder ejecutar y testear el sistema de ventas, primero será necesario crear de la base de datos e insertarle datos. Para ello, podremos seguir los pasos mencionados a continuación en el orden establecido. Así mismo, el usuario que otorgamos con acceso a la base de datos es:
</p>

- **Usuario:** `intento_1`
- **Contraseña:** `Penguin15`

1. Para comenzar, debemos acceder a la base de datos con el usuario y contraseña proporcionados desde `Sistema-de-Ventas-en-Ciencias\base`:

      ```bash
      > mysql -u intento_1 -p
      Enter password: Penguin15
      
      Welcome to the MySQL monitor.  Commands end with ; or \g.
      Your MySQL connection id is 2099
      Server version: 8.0.35 MySQL Community Server - GPL
      
      Copyright (c) 2000, 2023, Oracle and/or its affiliates.
      
      Oracle is a registered trademark of Oracle Corporation and/or its
      affiliates. Other names may be trademarks of their respective
      owners.
      
      Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
      ```

2. Ahora, creamos la base de datos y hacemos los inserts (ambos sciprts se encuentran en [**iniciar.sql**](./base/iniciar.sql) e [**insertar.sql**](./base/insertar.sql)       respectivamente).

      ```bash
      mysql> source iniciar.sql
      ```
      
      ```bash
      mysql> source insertar.sql
      ```
---

### 👾​​ Backend

Para configurar el backend del sistema podemos usar el entorno virtual que proporcionamos llamado `entorno` y que se encuentra en `Sistema-de-Ventas-en-Ciencias/back/entorno`. Este entorno virutal ya se encuentra preconfigurado con todo lo necesario para ejecutar la aplicación. Además, si en su defecto elegimos instalar manualmente todos los componentes necesario, abajo se mencionan los comandos necesarios 

#### **Entorno Virtual**

- **Linux:**

- **Windows:**

#### **Instalación Manual**

En caso de querer realizar la instalación manual, desde `Sistema-de-Ventas-en-Ciencias\back` ejecutamos:

  ```bash
  > pip install flask
  ```
  
  ```bash
  > pip install flask-cors
  ```
  
  ```bash
  > pip install flask-sqlalchemy
  ```
  
  ```bash
  > pip install sqlalchemy
  ```
  
  ```bash
  > pip install pymysql 
  ```
---

### 💻 Frontend

Finalmente, para terminar la configuración del sistema tendremos que instalar los componentes necesario para poder ver el frontend de la aplicación. Para ello, desde `Sistema-de-Ventas-en-Ciencias\front>` ejecutamos:

```bash
> npm install react-router-dom
```

```bash
> npm install react-cookie
```

## ​How to Use

Una vez que se haya completado correctamente la configuración del sistema indicada en la sección de [**Get Started**](#get-started), podremos usar el sistema de ventas de ciencias. Para ello, tendremos que ejecutar los siguientes comandos (dependiendo del sistema operativo que estemos usando):

### Uso del Backend

### Uso del Frontend

1. Desde `\Sistema-de-Ventas-en-Ciencias\back`:

    ### Linux
    
    ```Julia
    > python3 app.py
    
     * Serving Flask app 'app'
     * Debug mode: on
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
     * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
     * Restarting with stat
     * Debugger is active!
     * Debugger PIN: 000-000-000
    ```

    ### Windows
    
    ```Julia
    > python app.py
    
     * Serving Flask app 'app'
     * Debug mode: on
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
     * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
     * Restarting with stat
     * Debugger is active!
     * Debugger PIN: 000-000-000
    ```

En caso de tener complicaciones corriendo lo anterior, sugerimos enormemente hacer uso de nuestro entorno virtual operativo en sistemas Linux o en su defecto crear uno en Windows con los mismos requerimientos
para poder correr lo anterior.

2. Desde `\Sistema-de-Ventas-en-Ciencias\front`:

### Linux y Windows

```Julia
\Sistema-de-Ventas-en-Ciencias\front> npm start

> front@0.1.0 start
> react-scripts start

Starting the development server...
Compiled successfully!

You can now view front in the browser.

  Local:            http://localhost:3002
  On Your Network:  http://192.000.00.0:3002

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully

```

>[!Warning]
>**Jan is currently in Development**: Expect breaking changes and bugs!

>[!Note]
>**Jan is currently in Development**: Expect breaking changes and bugs!

>[!Note]
>**Jan is currently in Development**: Expect breaking changes and bugs!

>[!Tip]
>**Jan is currently in Development**: Expect breaking changes and bugs!

>[!Important]
>**Jan is currently in Development**: Expect breaking changes and bugs!

>[!Caution]
>**Jan is currently in Development**: Expect breaking changes and bugs!

##  **Nota:**

- Requerimientos (se encuentan en App.js y app.js)
- Requerimientos de React: npm install react-router-dom y npm install react-cookie
- Requerimientos de Python: pip install flask, pip install flask-cors, pip install flask-sqlalchemy, pip install sqlalchemy y pip install pymysql 
- En caso de que no funcione npm start se puede correr el comando npm install desde el directorio front/ para instalar las dependencias faltantes de la aplicacion.

---

### **A Quick Demo**

### 👾 **Colaboradores**
<h3 align="left">

- <img src="https://media.tenor.com/gPI9EkLBgkIAAAAi/pokemon-piplup.gif" width="30"> Bonilla Reyes Dafne 

- <img src="https://pa1.aminoapps.com/7220/b5f0fe7b490d2d43f641c19fd087fd043fc5a1e6r1-200-200_hq.gif" width="30"> Castañón Maldonado Carlos Emilio 

- <img src="https://38.media.tumblr.com/0461af477744296c6bb6cbbc99e53380/tumblr_n9gdocW21y1s3bc1no1_500.gif" width="30"> García Ponce José Camilo 

- <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/557702fa-72e6-49cd-a6f0-7a3782fa0eff/d4jbn8s-8a943cc6-5a30-489f-93a8-a0d95ba77669.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU1NzcwMmZhLTcyZTYtNDljZC1hNmYwLTdhMzc4MmZhMGVmZlwvZDRqYm44cy04YTk0M2NjNi01YTMwLTQ4OWYtOTNhOC1hMGQ5NWJhNzc2NjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dTA-flsPwEevI2wqsMufw6gOsoWSKQfSoCxO_cJsPkc" width="30"> León Pérez Mario Eduardo

- <img src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/e/e1/latest/20191201185119/Eiscue_EpEc.gif/180px-Eiscue_EpEc.gif" width="17"> &nbsp; Nepomuceno Escarcega Arizdelcy Lizbeth 

</h3> 


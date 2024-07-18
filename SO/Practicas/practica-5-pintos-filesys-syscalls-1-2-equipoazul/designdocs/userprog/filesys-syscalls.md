# PROJECT 2: USER PROGRAMS. FILE SYSTEM, SYSTEM CALLS

## EQUIPO

> Pon aquí los nombres y correos electrónicos de los integrantes de tu equipo.

Dafne Bonilla Reyes daphnebonilla@ciencias.unam.mx
José Camilo García Ponce jcamilo@ciencias.unam.mx

## PRELIMINARES

> Si tienes algún comentario preliminar a tu entrega, notas para los ayudantes o extra créditos, por favor déjalos aquí.

> Por favor cita cualquier recurso offline u online que hayas consultado mientras preparabas tu entrega, otros que no sean la documentación de Pintos, las notas del curso, o el equipo de enseñanza

## SYSTEM CALLS - FILE SYSTEM

### ESTRUCTURAS DE DATOS

> C1: A cada declaración nueva o modificación de un `struct` o `struct member`,
> variable global o estática, `typedef` o `enum`. Agrega comentarios en el código
> en el que describas su propósito en 25 palabras o menos.

R: Va directo en el código.

> C2: Describe cómo asocias _file descriptors_ con archivos _open files_. En tu
> implementación los _file descriptors_ son únicos dentro del _sistema operativo_
> completo, o solamente dentro de un proceso?

En nuestra implementación los `file_descriptor` son unicos dentro de cada proceso ya que cada `thread` o cada hilo tiene una lista de los archivos que tiene abiertos los cuales tinen un `file_descriptor` único para llevar un mejor control y cada vez que abrimos un nuevo archivo le damos un nuevo `file_descriptor` y esto va a ser un atributo llamado `contador_de_archivos_abiertos` del `thread` que vamos aumentando cada vez que abrimos un archivo. Además,estos son guardados en la lista `archivos_abiertos` de `thread`.

### ALGORITMOS

> No hay preguntas en esta práctica

### SYNCHRONIZATION

> C8: El acceso al _File System_ en pintos no es _thread-safe_, en consecuencia necesitas
> manejar la concurrencia cuando manipulas archivos, para este propósito puedes utilizar un
> _semaphore_ o un _lock_. Cuales operaciones deben de ser protegidas y cómo? Es un único
> _semaphore_ o _lock_ global suficiente para resolver los problemas de concurrencia de esta
> tarea?

Para esto usamos un `rlock mutex` que esta en `filesys-syscall.c`, de esta manera, cada vez que vayamos a abrir, cerrar o manipular algún archivo adquirimos el candado antes de llamar las operaciones de `filesys.c`, para evitar problemas que puedan causar que 2 `threads` intenten manipular el mismo archivo. Solo este candado fue necesario para resolver este problema.

### RATIONALE

> C10: Qué ventajas o desventajas puedes ver en tu diseño de _file descriptors_? Menciona por lo menos
> dos alternativas de diseño y expón los _pros_ y _contras_ de cada una de ellas.

- Nuestro diseño:

  - Ventajas: Como cada `thread` tiene su lista de archivos abiertos es facil de manejar y no tan complicado de entender. Ademas, como cada hilo tiene su propia lista no puede haber conflicto de que otros hilos quieran acceder a su lista.

  - Desventajas: Entre los hilos no pueden compartir `file_descriptor` y no pueden compartir varias cosas en general.

- Alternativas de diseño:

  1. Que hubiera una lista global de archivos abiertos que todos los `thread` compartan.

  - Ventajas: Los `file_descriptor` son compartidos por los threads
  - Desventajas: Tendriamos que tener mas cuidado en la sincronizacion porque estan compartiendo una lista y eso puede causar `race_condition`s

  2. Otro diseño que sea un intermediario que maneje todos los `file_descriptor`s y los hilos solo se pidan `file_descriptor`s a el

  - Ventajas: Todos los hilos pueden compartir `file_descriptor`s
  - Desventajas: Puede ser algo complejo

## READ ONLY EXECUTABLES

### RATIONALE

> C11: Cómo haces para mantener abierto un archivo ejecutable asociado a un proceso que no ha concluido su ejecución?

En `start_process` creamos un archivo y lo abrimos dado el nombre del archivo que va a ejecutar el proceso y luego, obtenemos el `file` de dicho archivo y llamamos a `file_deny_write` para tenerlo como un ejecutable y que nadie pueda modificarlo. Por último, en `process_exit` cerramos todos los archivos abiertos por el proceso y hacemos `file_allow_write` a los archivos que estamos cerrando.

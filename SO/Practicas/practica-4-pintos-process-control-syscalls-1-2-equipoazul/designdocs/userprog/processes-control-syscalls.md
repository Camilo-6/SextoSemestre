# PROJECT 2: USER PROGRAMS. PROCESS CONTROL SYSTEM CALLS

## EQUIPO

> Pon aquí los nombres y correos electrónicos de los integrantes de tu equipo.

Dafne Bonilla Reyes daphnebonilla@ciencias.unam.mx
José Camilo García Ponce jcamilo@ciencias.unam.mx

## PRELIMINARES

> Si tienes algún comentario preliminar a tu entrega, notas para los ayudantes o extra créditos, por favor déjalos aquí.

No sabemos muy bien si los semaforos y la lista de hijos estan bien "guardados" en la `struct thread`, intentamos guardarlos en `struct process` pero no funciono como esperabamos (tal vez por el tiempo en el que se crea la estructura `process` y cuando se usan los semaforos y otros datos) y guardalos en la `struct` thread se nos facilitó más que enviar los semaforos/datos por otro tipo de estructuras.

> Por favor cita cualquier recurso offline u online que hayas consultado mientras preparabas tu entrega, otros que no sean la documentación de Pintos, las notas del curso, o el equipo de enseñanza

## SYSTEM CALLS - PROCESS CONTROL

### ESTRUCTURAS DE DATOS

> B1: A cada declaración nueva o modificación de un `struct` o `struct member`, variable global o estática, `typedef` o `enum`. Agrega comentarios en el código en el que describas su propósito en 25 palabras o menos.

R: Va directo en el código.

### ALGORITMOS

> B5: Describe brevemente tu implementación de la **system call** "wait" y cómo interactúa con la terminación del proceso.

Cuando la llamada wait llega a `syscall_handler()`, se hace un case, luego pasamos a `wait_wrapper()` para obtener el id del proceso a esperar. Después, se llama a `process_wait()` con parametros el id obtenido y lo que regresa `process_wait()` se guarda en f->eax.

Obtenemos la lista de hijos del proceso que va a esperar. Si no hay hijos regresamos -1, en otro caso recorremos la lista de hijos hasta encontrar al hijo con el ID buscado, mediante un semáforo esperamos a que el hijo termine (esperar a que el hijo produzca su estado de salida).

Después de que terminó removemos al proceso de la lista de hijos y regresamos el estado de salida asociado a estado de proceso hijo.

En `process_exit()` imprimimos el mensaje de que terminamos y hacemos `sema_up()` al semaforo de wait, de esta manera si su padre lo intenta esperar, va a saber que ya termino.

### SINCRONIZACION

> B7: La **system call** `exec` regresa `-1` si falla la carga del ejecutable, por lo cual no puede regresar antes de que se complete la carga en el proceso hijo. ¿Cómo se garantiza que `exec` no regrese antes de que finalice la carga del ejecutable? ¿Cómo se pasa el resultado de la carga (éxito/fallo) hacia el **thread** que llama a `exec`?

En `process_execute()` llamamos a `thread_create()` y hacemos `sema_down()` al semaforo load (los semaforos son inicializados en `init_thread()`) para esperar a que el hijo termine de cargar (esperar a que el hijo produzca el booleano de si cargo o no). Cuando el hijo termino de cargar revisamos si cargo correctamente o no (lo que produjo), en caso de que no, regresamos -1.

El valor lo obtenemos revisando el valor loaded del thread padre, el cual es modificado por el hijo en `start_process()`, el cual luego de cargar el ejecutable obtiene su thread padre, hace `sema_up()` para avisar que ya cargo, obtenemos el valor loaded de su padre y en caso de que falle cargar ponemos false y si no true.

> B8: Considera un proceso padre `P` con un proceso hijo `C`. ¿Cómo se evitan **race conditions** cuando `P` llama `wait(C)` antes de que `C` finalice? ¿Cómo se evitan **race conditions** cuando `P` llama `wait(C)` luego de que `C` finalice? ¿Cómo se garantiza que todos los recursos se liberen en cada caso? ¿Qué ocurre cuando `P` finaliza su ejecución sin llamar a `wait(C)`, antes de que `C` finalice? ¿Luego de que `C` finalice? ¿Existe algún caso especial que se deba tener en cuenta?

Mediante el uso del semaforo wait_s el cual se inicializa en `init_thread()` y el padre hace `sema_down()` luego de encontrar el hijo con el id correcto en `process_wait()`. El hijo hace `sema_up()` cuando esta en `process_exit()`, indicando que ya termino. De esta manera, el padre espera hasta que el hijo haya producido su estado de salida y si el hijo ya termino entonces, gracias al semaforo, el padre solo toma el estado de salida del hijo.

Para garantizar la eliminacion de recursos, en `process_wait()` luego de que el semaforo nos deje pasar y obtener el estado de salida del hijo, removemos al hilo esperado de la lista de hijos y asi los recursos del hijo relacionados con el padre ya son liberados.

Si el padre termina antes, su hijo puede intentar obtener el estado de salida del padre, ya que con el proceso relacionado al hilo hijo, tenemos una referencia al padre y como el `exit_status` se guarda en la estructura `process` (que se creo con `malloc()`) entonces podemos intentar obtenerlo, esto depende de como haya finalizado padre (se libero memoria o no). Y si ambos procesos finalizaron, no creemos que pase nada malo, aunque no estamos tan seguros.

A nuestro conocimiento no se nos ocurre algun tipo de caso que pueda causar problemas, pero no descartamos la idea de que pueda existir algo que cause problemas (como liberar memoria o algo similar).

### RATIONALE

> B11: El mapeo de `tid_t` a `pid_t` utilizado por defecto es la función identidad. Si se utilizó un mapeo diferente, ¿Cuáles son las ventajas del mapeo utilizado?

No se utilizó otra.

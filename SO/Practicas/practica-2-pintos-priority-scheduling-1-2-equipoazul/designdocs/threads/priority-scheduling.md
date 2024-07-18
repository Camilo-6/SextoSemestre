# PROJECT 1: THREADS - PRIORITY SCHEDULER. DESIGN DOCUMENT

## EQUIPO

> Pon aquí los nombres y correos electrónicos de los integrantes de tu equipo.

José Camilo García Ponce jcamilo@ciencias.unam.mx
Dafne Bonilla Reyes daphnebonilla@ciencias.unam.mx

## PRELIMINARES

> Si tienes algún comentario preliminar a tu entrega, notas para los ayudantes
> o extra créditos, por favor déjalos aquí.

> Por favor cita cualquier recurso offline u online que hayas consultadok
> mientras preparabas tu entrega, otros que no sean la documentación de Pintos,
> las notas del curso, o el equipo de enseñanza.

#### 📚 Recursos Utilizados

- [Design a Data Structure that Supports Insert](https://www.geeksforgeeks.org/design-a-data-structure-that-supports-insert-delete-search-and-getrandom-in-constant-time/)

## PRIORITY SCHEDULING

### ESTRUCTURAS DE DATOS

> B1: A cada declaración nueva o modificación de un `struct` o `struct member`,
> variable global o estática, `typedef` o `enum`. Agrega comentarios en el
> código en el que describas su propósito en 25 palabras o menos.

R: Va directo en el código.

### ALGORITMOS

> B3: (Punto Extra) Cómo aseguras que el _thread_ de más alta
> prioridad que está esperando en un _semaphore_, _lock_ o
> _condition_ despierta primero?

No hicimos el punto extra

> B4: Qué tan eficientes es tu estrategia para insertar y borrar
> elementos de la `ready_list`? Puedes imaginar una estructura de
> datos para representar la `ready_list` en la que las inserciones y
> operaciones de borrado tomen **O(1)**?

Al insertar ordenadamente a la `ready_list` podemos tener que la lista siempre tenga un orden y asi facilitar las acciones requeridas con la lista.
Ademas como estamos agregando ordenadamente, al momento de elegir el siguiente hilo a ejecutarse solo hacemos pop y nos ahorramos tener que ordenar la lista cada vez que queramos elegir un hilo a ejecutar.
Una estructura de datos con inserción y eliminación constante podría ser un arreglo (o arreglo de arreglos) o una hash table, donde insertemos usando de llave o identificador la prioridad. De esta manera podemos hacer las operaciones constantates, solo revisar bien las prioridad de los hilos para poder saber en que lugar se tienen que insertar.

### SINCRONIZACIÓN

> B6: Describe una posible _race condition_ en la función
> `thread_set_priority ()` y explica cómo tu implementación la evita.
> Puedes utilizar un _lock_ para evitarla?

Podría pasar que cuando un hilo modifique la prioridad de otro hilo para ser mayor que el hilo que se ejecuta actualmente, entonces tendría que ceder el procesador a este hilo con mayor prioridad. Sin embargo, si por alguna razón algun hilo crea o agrega un nuevo hilo con mayor prioridad (al hilo que se le cambio la prioridad) a la `ready_list` mientras se esta seleccionando al siguente hilo a ejecutar, podría pasar que hubiera problemas con la `ready_list` que fue modificada mientras se cedía el procesador, lo cual podría causar una _race condition_ ya que el hilo que hacía el `thread_yield ()` y el que agregó un nuevo hilo quieren acceder a la `ready_list` al mismo tiempo.
Por eso en nuestra solución revisamos que si al ver que hay un hilo con mayor prioridad al hilo actual y ceder el procesador, revisamos si las interrupciones estamos o están en algún ambiente de interrupción y de esta manera elegir entre usar `thread_yield ()` o `intr_yield_on_return()`, evitando resultados no esperados.
Tal vez podría ser arreglado con un _lock_ en la `ready_list`, aunque no sabemos aún como funcionan los _lock_ s bien, pero se puede resolver solo teniendo cuidado con las interrupciones.
Otra manera de arreglar estos conflictos podría ser apagando las interrupciones, como en la práctica anterior.

### RATIONALE

> B7: Por qué elegiste este diseño? En qué maneras es superior a otros
> diseños que hayas considerado?

Elegimos este diseño porque está en la guía de solución vista en el laboratorio, por lo que se nos facilitó poder hacer los cambios necesarios.
Pensamos que también es un diseño eficiente por la manera de tener ordenada la lista y que cumple con las pruebas. Además, no sabemos de otros posibles diseños aparte del que usa arreglos/hash tables (del punto extra), pero pensamos que es más complicado. También, creemos que es mejor insertar ordenadamente que ordenar la lista antes de elegir al proximo hilo a ejecutar y así no ordenar cada vez que queramos obtener el proximo hilo a ejecutar.

# PROJECT 1: THREADS - MLFQ SCHEDULER. DESIGN DOCUMENT

## EQUIPO

> Pon aquí los nombres y correos electrónicos de los integrantes de tu equipo.

Dafne Bonilla Reyes daphnebonilla@ciencias.unam.mx
José Camilo García Ponce jcamilo@ciencias.unam.mx

## PRELIMINARES

> Si tienes algún comentario preliminar a tu entrega, notas para los ayudantes
> o extra créditos, por favor déjalos aquí.
> Por favor cita cualquier recurso offline u online que hayas consultado
> mientras preparabas tu entrega, otros que no sean la documentación de Pintos,
> las notas del curso, o el equipo de enseñanza

## ADVANCED SCHEDULER

### ESTRUCTURAS DE DATOS

> B1: A cada declaración nueva o modificación de un `struct` o `struct member`,
> variable global o estática, `typedef` o `enum`. Agrega comentarios en el
> código en el que describas su propósito en 25 palabras o menos.

R: Va directo en el código.

### ALGORITMOS

> C2: Dados los threads A, B y C con el valor nice de 0, 1 y 2 respectivamente.
> Cada uno con un valor recent_cpu de 0. Llena la tabla que se muestra a
> continuación con los valores de recent_cpu, prioridad y el thread que esta
> corriendo para cada tick de la primera columna.

timer  recent_cpu  prioridad    thread
ticks   A   B   C   A   B   C   corriendo
-----  --  --  --  --  --  --   ------
 0     0   0   0   31  31  31   A 
 4     4   0   0   62  61  59   A
 8     8   0   0   61  61  59   A
12     12  0   0   60  61  59   B
16     12  4   0   60  60  59   A
20     16  4   0   59  60  59   B
24     16  8   0   59  59  59   A
28     20  8   0   58  59  59   B
32     20  12  0   58  58  59   C
36     20  12  4   58  58  58   A

timer  recent_cpu  prioridad    thread
ticks   A   B   C   A   B   C   corriendo
-----  --  --  --  --  --  --   ------
 0     0   0   0   31  31  31   A 
 4     4   0   0   62  61  59   A
 8     8   0   0   61  61  59   B
12     8   4   0   61  60  59   A
16     12  4   0   60  60  59   B
20     12  8   0   60  59  59   A
24     16  8   0   59  59  59   C
28     16  8   4   59  59  58   B
32     16  12  4   59  58  58   A
36     20  12  4   58  58  58   C

> C3: ¿Alguna ambigüedad en la especificación del _scheduler_ hace que los valores en la tabla sean inciertos?
> En caso de ser así, ¿Qué regla usaste para resolver dichos
> valores? ¿Esta regla está implementada en tu solución?

La ambigüedad que puede surgir es que hilo elegir cuando varios hilos tienen las misma prioridad, por ejemplo en el tick 0 se pone al hilo corriendo al A ya que es primer hilo a nuestro punto de vista (ya que esta A B C), esta regla no esta implementada creo...

> C4. En tu implementación, ¿Como afecta el rendimiento del sistema operativo
> el costo que agregan las operaciones del scheduler dentro y fuera del contexto
> de interrupción?

Aumenta el espacio consumido por la `ready_list`, debido a que ya no es una lista simple si no un arreglo de listas, por lo tanto ocupará más memoria.
También, ya que tenemos que actualizar los valores de `load_avg`, `priority` y `recent_cpu`, esto nos consume más tiempo en cada tick, ya que las actualizaciones son a todos los hilos y esto puede tomar mucho si es que hubieran muchos hilos.
Además, como usamos el arreglo de lista, ya no tenemos que buscar el lugar adecuado para insertar hilos, si no solo insertar en la lsita de la prioridad correspondiente, pero para buscar el hilo con mayor prioridad tenemos que buscar la primera lista no vacía.

### ARGUMENTACIÓN

> C5: Brevemente critica tu diseño, añade ventajas y desventajas que
> tiene la solución que elegiste. Si tuvieras más tiempo para trabajar
> en el scheduler, ¿Que cambios harías para refinar y mejorar tu
> diseño?

Está bonito uwu, ya que al usar un arreglo de listas nos ahorramos algunos problemas de comparaciones. Una ventaja es que es más sencillo agregar hilos a la `ready_list` y también nos ahorramos usar metodos para comparar las prioridades entre hilos.
Una desventaja puede ser que para encontrar el hilo de mayor prioridad puede tomar más tiempo ahora, y la actualizacion de algunas variables cada tick, lleva más tiempo.
Si hubiera más tiempo podriamos mejorar la forma en la que nuestras nuevas funciones o cambios se comportan en terminos de complejidad, seguridad y facilidad de entender. Pero para estos cambios, tal vez necesitemos más conocimientos del curso, los cuales no tenemos de momento.

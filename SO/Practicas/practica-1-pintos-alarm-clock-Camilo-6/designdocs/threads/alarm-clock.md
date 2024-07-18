# PROJECT 1: THREADS. DESIGN DOCUMENT

## EQUIPO

> Pon aquí los nombres y correos electrónicos de los integrantes de tu equipo.

<García_Ponce_José_Camilo> <jcamilo@ciencias.unam.mx>

## PRELIMINARES

> Si tienes algún comentario preliminar a tu entrega, notas para los ayudantes
> o extra créditos, por favor déjalos aquí.

En los archivos thread.h, timer.c y timer.h hay algunos espacios que faltan (comparando con la version original)
Esto paso ya qye tengo una extension para darle formato al codigo (Prettier)

> Por favor cita cualquier recurso offline u online que hayas consultado
> mientras preparabas tu entrega, otros que no sean la documentación de Pintos,
> las notas del curso, o el equipo de enseñanza

Use de guia las consejos del pdf de la practica

## ALARM CLOCK

### ESTRUCTURAS DE DATOS

> A1: A cada declaración nueva o modificación de un `struct` o `struct member`,
> variable global o estática, `typedef` o enumeración. Agrega comentarios en el
> código en el que describas su propósito en 25 palabras o menos.

R: Va directo en el código.

### ALGORITMOS

> A2: Describe brevemente qué sucede en una llamada a `timer_sleep ()`
> incluyendo los efectos del **interrupt_handler** del **timer**.

Primero revisamos que los ticks sean mayores a 0, para no dormir 0 ticks o ticks negativos
Luego checamos que las interrupciones esten activas
Obtenemos el numero de tick acutal y ponemos como wake_time al tick actual más los ticks por dormir
Despues desactivamos las interrupciones
Agregamos ordenadamente el thread a la lista de dormidos (comparando con wake_time)
Bloqueamos al thread
Regresamos al nivel de interrupcion
Y ya para despertar en el interrupt handler se revisa la lista de dormidos y se despierta a los threads que ya paso sus ticks de dormir
Al momento de revisar la lista de dormidos y despertar threads, desactivamos las interrupciones para poder desbloquear a los nodos y poder modificar la lista de dormidos

> A3: Qué pasos son tomados para minimizar la cantidad de tiempo gastada
> por el **interrupt_handler** del **timer**?

Cuando revisamos la lista de threads dormidos, no revisamos siempre toda la lista de dormidos
Lo que hacemos, gracias a que guardamos en que tick se debe despertar y es una lista ordenada, es revisar el primero de la lista, checar si se debe despertar
Si se tiene que despertar, lo despertamos, lo sacamos de la lista y seguimos con el nuevo primero de la lista
Si no se tiene que despertar aun, entonces significa que ninguna de los restantes de la lista se tiene que despertar aun, por lo tanto terminamos y ya no revisamos a los demas
Y si la lista esta vacia entonces no la revisamos
De esta manera nos ahorramos siempre recorrer toda la lista

### SINCRONIZACIÓN

> A4: Cómo evitas **race conditions** cuando multiples **threads** llaman
> `timer_sleep ()` simultaneamente?

Primero checando que las interrupciones esten activas y luego desactivando interrupciones
Por lo tanto ya no tenemos concurrencia y no pueden pasar race conditions
Y de esta manera los threads se duermen ordenadamente y evitamos que existan race conditions al agregarse a la lista de dormidos
Ya despues regresamos el nivel de interrupciones

> A5: Cómo evitas **race conditions** cuando ocurre una interrupción del **timer**
> durante una llamada a `timer_sleep ()`?

Luego de checar que las interrupciones estan activas, las desactivamos
Asi evitamos alguna interrupcion y al final las volvemos a regresar a su nivel original
De esta manera al desactivar las interrupciones, evitamos la concurrencia en ciertas partes y asi que no existan race conditions

### ARGUMENTACIÓN

> A6: Por qué elegiste este diseño? En qué formas es superior a otros diseños
> que hayas considerado?

Este diseño fue el que más facil se me hizo para implementar, debido a que puedo guiarme en los consejos
Ademas siento que no es tan complicado, ademas que nos evita siempre recorrer toda la lista de dormidos

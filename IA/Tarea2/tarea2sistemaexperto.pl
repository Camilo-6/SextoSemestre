go:-
hipotesis(Pinguino),
write('Creo que el pinguino es: '),
write(Pinguino),
nl,
explicar(Pinguino),
nl,
undo.

% Hipotesis para identificar el pinguino
hipotesis(magallanes) :- magallanes, !.
hipotesis(rockhopper) :- rockhopper, !.
hipotesis(humboldt) :- humboldt, !.
hipotesis(adelie) :- adelie, !.
hipotesis(little) :- little, !.
hipotesis(emporador) :- emporador, !.
hipotesis(desconocido).

:- discontiguous verificar_pareja_por/1.

% Reglas para identificar el pinguino
magallanes :-
verificar_tamanio(mediano),
verificar_vive(sudamerica),
verificar_patron_pecho(dos_lineas).

little :-
verificar_tamanio(pequenio),
verificar_vive(oceania),
verificar_patron_pecho(nada).
verificar_pareja_por(vida).

emporador :-
verificar_tamanio(grande),
verificar_vive(antartida),
verificar_patron_pecho(nada).
verificar_pareja_por(vida).

rockhopper :-
verificar_tamanio(mediano),
verificar_vive(sudamerica),
verificar_pluma_cabeza(amarilla).

humboldt :-
verificar_tamanio(mediano),
verificar_vive(sudamerica),
verificar_patron_pecho(una_linea).

adelie :-
verificar_tamanio(mediano),
verificar_vive(antartida),
verificar_patron_pecho(nada).

% Preguntar al usuario
preguntar_tamanio(Pregunta) :-
write('¿El pinguino es tiene tamanio '),
write(Pregunta),
write('? '),
nl,
write('Responde si o no'),
read(Respuesta),
nl,
( (Respuesta == si ; Respuesta == s)
->
assert(si(Pregunta));
assert(no(Pregunta)), fail).

preguntar_vive(Pregunta) :-
write('¿El pinguino vive en '),
write(Pregunta),
write('? '),
nl,
write('Responde si o no'),
read(Respuesta),
nl,
( (Respuesta == si ; Respuesta == s)
->
assert(si(Pregunta));
assert(no(Pregunta)), fail).

preguntar_patron_pecho(Pregunta) :-
write('¿El pinguino tiene '),
write(Pregunta),
write(' en el pecho? '),
nl,
write('Responde si o no'),
read(Respuesta),
nl,
( (Respuesta == si ; Respuesta == s)
->
assert(si(Pregunta));
assert(no(Pregunta)), fail).

preguntar_pareja_por(Pregunta) :-
write('¿El pinguino se empareja por '),
write(Pregunta),
write('? '),
nl,
write('Responde si o no'),
read(Respuesta),
nl,
( (Respuesta == si ; Respuesta == s)
->
assert(si(Pregunta));
assert(no(Pregunta)), fail).

preguntar_pluma_cabeza(Pregunta) :-
write('¿El pinguino tiene plumas '),
write(Pregunta),
write(' en la cabeza? '),
nl,
write('Responde si o no'),
read(Respuesta),
nl,
( (Respuesta == si ; Respuesta == s)
->
assert(si(Pregunta));
assert(no(Pregunta)), fail).

:- dynamic si/1, no/1.

% Verificar respuestas
verificar_tamanio(X) :-
(si(X)
->
true ;
(no(X)
->
fail ;
preguntar_tamanio(X))).

verificar_vive(X) :-
(si(X)
->
true ;
(no(X)
->
fail ;
preguntar_vive(X))).

verificar_patron_pecho(X) :-
(si(X)
->
true ;
(no(X)
->
fail ;
preguntar_patron_pecho(X))).

verificar_pluma_cabeza(X) :-
(si(X)
->
true ;
(no(X)
->
fail ;
preguntar_pluma_cabeza(X))).

verificar_pareja_por(X) :-
(si(X)
->
true ;
(no(X)
->
fail ;
preguntar_pareja_por(X))).

% Quita todas las respuestas
undo :- retract(si(_)),fail.
undo :- retract(no(_)),fail.
undo.

% Explicar el pinguino
explicar(magallanes) :-
nl,
write("El pinguino puede ser un Pinguino de Magallanes"),
nl,
write("Su nombre cientifico es Spheniscus magellanicus"),
nl,
write("Dato curioso: el Pinguino de Magallanes fue descubierto en 1520, durante el viaje del explorador espaniol Fernando de Magallanes por Sudamerica"),
nl.

explicar(little) :-
nl,
write("El pinguino puede ser un Pinguino azul"),
nl,
write("Su nombre cientifico es Eudyptula Minor"),
nl,
write("Dato curioso: la mascota pinguino de Linux (Tux) fue inspirada por un Pinguino azul que picoteo al creador del sistema operativo durante unas vacaciones en Australia"),
nl.

explicar(emporador) :-
nl,
write("El pinguino puede ser un Pinguino emperador"),
nl,
write("Su nombre cientifico es Aptenodytes forsteri"),
nl,
write("Dato curioso: los Pinguinos emperador no construyen nidos, el pinguino macho se mantiene erguido e incuba un solo huevo encima de sus patas, bajo un pliegue suelto de piel abdominal llamado parche de cria"),
nl.

explicar(rockhopper) :-
nl,
write("El pinguino puede ser un Pinguino de penacho amarillo austral"),
nl,
write("Su nombre cientifico es Eudyptes chrysocome"),
nl,
write("Dato curioso: como su nombre indica (Southern rockhopper penguin), estos pinguinos han sido observados saltando de roca en roca"),
nl.

explicar(humboldt) :-
nl,
write("El pinguino puede ser un Pinguino de Humboldt"),
nl,
write("Su nombre cientifico es Spheniscus humboldti"),
nl,
write("Dato curioso: los Pinguinos de Humboldt deben su nombre al cientifico aleman Alexander Von Humboldt, que exploro Cuba, Mexico y Sudamerica en 1799"),
nl.

explicar(adelie) :-
nl,
write("El pinguino puede ser un Pinguino de Adelia"),
nl,
write("Su nombre cientifico es Pygoscelis adeliae"),
nl,
write("Dato curioso: los Pinguinos de Adelia construyen sus nidos con piedras y son conocidos por robar piedras de los nidos de parejas reproductoras rivales"),
nl.

explicar(desconocido) :-
nl,
write("No se puede identificar el pinguino"),
nl,
write("Puede ser que el pinguino no este en la base de datos"),
nl,
write("Dato curioso: los Pinguinos son aves marinas no voladoras que se encuentran unicamente en el hemisferio sur"),
nl.

% Ejecutar el programa
% go.

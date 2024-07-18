:- dynamic probabilidad/2.

% Base de conocimiento para predecir un pinguino
% Caracteristicas: tamanio_mediano, tamanio_pequenio, tamanio_grande
% Caracteristicas: vive_Sudamerica, vive_Oceania, vive_Antartida
% Caracteristicas: patron_pecho_una_raya, patron_pecho_dos_rayas, patron_pecho_nada
% Caracteristicas: pareja_por_vida, plumas_cabeza_amarilla

% Probabilidades iniciales de los pinguinos
:- assert(probabilidad(magallanes, 0.1)).
:- assert(probabilidad(rockhopper, 0.2)).
:- assert(probabilidad(humboldt, 0.1)).
:- assert(probabilidad(adelie, 0.1)).
:- assert(probabilidad(little, 0.1)).
:- assert(probabilidad(emporador, 0.3)).
:- assert(probabilidad(desconocido, 0.1)).

% Caracteristicas especificas para cada pinguino
caracteristicas(magallanes, [tamanio_mediano, vive_Sudamerica, patron_pecho_dos_rayas]).
caracteristicas(rockhopper, [tamanio_mediano, vive_Sudamerica, plumas_cabeza_amarilla]).
caracteristicas(humboldt, [tamanio_mediano, vive_Sudamerica, patron_pecho_una_raya]).
caracteristicas(adelie, [tamanio_mediano, vive_Antartida, patron_pecho_nada]).
caracteristicas(little, [tamanio_pequenio, vive_Oceania, patron_pecho_nada, pareja_por_vida]).
caracteristicas(emporador, [tamanio_grande, vive_Antartida, patron_pecho_nada, pareja_por_vida]).

% Actualizar probabilidades usando el teorema de Bayes
actualizar_probabilidades(Caracteristica) :-
    findall(Prob, probabilidad(_, Prob), Probabilidades),
    sumlist(Probabilidades, Total),
    findall(Pinguino, probabilidad(Pinguino, _), Pinguinos),
    actualizar_probabilidades_aux(Pinguinos, Total, Caracteristica).

actualizar_probabilidades_aux([], _, _).
actualizar_probabilidades_aux([Pinguino|T], Total, Caracteristica) :-
    retract(probabilidad(Pinguino, ProbabilidadAnterior)),
    calcular_probabilidad_posterior(Pinguino, ProbabilidadAnterior, Total, Caracteristica, ProbabilidadPosterior),
    assert(probabilidad(Pinguino, ProbabilidadPosterior)),
    actualizar_probabilidades_aux(T, Total, Caracteristica).

calcular_probabilidad_posterior(Pinguino, ProbabilidadAnterior, Total, Caracteristica, ProbabilidadPosterior) :-
    caracteristicas(Pinguino, CaracteristicasPinguino),
    (   member(Caracteristica, CaracteristicasPinguino)
    ->  Factor = 0.8 % Suponiendo que una caracteristica especifica tiene una alta probabilidad de estar presente si el pinguino es el correcto
    ;   Factor = 0.1 % Suponiendo que una caracteristica especifica tiene una baja probabilidad de estar presente si el pinguino no es la correcto
    ),
    ProbabilidadPosterior is (ProbabilidadAnterior * Factor) / Total.

% ´redecir el pinguino basado en probabilidades posteriores
predecir_pinguino :-
    write('¿Cuales caracteristicas tiene el pinguino? (escriba "fin" para terminar)'), nl,
    leer_caracteristicas.

leer_caracteristicas :-
    read(Caracteristica),
    (   Caracteristica \= fin
    ->  actualizar_probabilidades(Caracteristica),
        leer_caracteristicas
    ;   explicar_resultado
    ).

explicar_resultado :-
    findall([Probabilidad, Pinguino], probabilidad(Pinguino, Probabilidad), ProbabilidadLista),
    sort(0, @>=, ProbabilidadLista, ProbabilidadOrdenada),
    write('Prediccion:'), nl,
    explicar_resultado_aux(ProbabilidadOrdenada).

explicar_resultado_aux([]).
explicar_resultado_aux([[Probabilidad, Pinguino]|T]) :-
    write('Probabilidad de '), write(Pinguino), write(': '), write(Probabilidad), nl,
    explicar_resultado_aux(T).

% Ejecutar el diagnóstico
:- predecir_pinguino.

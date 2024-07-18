:- dynamic probabilidad/2.

% Base de conocimiento para diagnóstico médico
% Síntomas: fiebre, dolor_de_cabeza, malestar, dolor_de_garganta, tos, congestión, fatiga

% Probabilidades iniciales de las enfermedades
:- assert(probabilidad(resfriado, 0.2)).
:- assert(probabilidad(gripe, 0.2)).
:- assert(probabilidad(alergia, 0.2)).
:- assert(probabilidad(covid, 0.2)).
:- assert(probabilidad(desconocido, 0.2)).

% Síntomas específicos para cada enfermedad
sintomas(resfriado, [congestión, tos]).
sintomas(gripe, [fiebre, dolor_de_cabeza, malestar]).
sintomas(alergia, [congestión, tos]).
sintomas(covid, [fiebre, malestar, dolor_de_garganta]).

% Actualizar probabilidades usando el teorema de Bayes
actualizar_probabilidades(Sintoma) :-
    findall(Prob, probabilidad(_, Prob), Probabilidades),
    sumlist(Probabilidades, Total),
    findall(Enfermedad, probabilidad(Enfermedad, _), Enfermedades),
    actualizar_probabilidades_aux(Enfermedades, Total, Sintoma).

actualizar_probabilidades_aux([], _, _).
actualizar_probabilidades_aux([Enfermedad|T], Total, Sintoma) :-
    retract(probabilidad(Enfermedad, ProbabilidadAnterior)),
    calcular_probabilidad_posterior(Enfermedad, ProbabilidadAnterior, Total, Sintoma, ProbabilidadPosterior),
    assert(probabilidad(Enfermedad, ProbabilidadPosterior)),
    actualizar_probabilidades_aux(T, Total, Sintoma).

calcular_probabilidad_posterior(Enfermedad, ProbabilidadAnterior, Total, Sintoma, ProbabilidadPosterior) :-
    sintomas(Enfermedad, SintomasEnfermedad),
    (   member(Sintoma, SintomasEnfermedad)
    ->  Factor = 0.8 % Suponiendo que un síntoma específico tiene una alta probabilidad de estar presente si la enfermedad es la correcta
    ;   Factor = 0.1 % Suponiendo que un síntoma específico tiene una baja probabilidad de estar presente si la enfermedad no es la correcta
    ),
    ProbabilidadPosterior is (ProbabilidadAnterior * Factor) / Total.

% Diagnóstico de enfermedad basado en probabilidades posteriores
diagnosticar_enfermedad :-
    write('¿Cuáles síntomas tiene? (escriba "fin" para terminar)'), nl,
    leer_sintomas.

leer_sintomas :-
    read(Sintoma),
    (   Sintoma \= fin
    ->  actualizar_probabilidades(Sintoma),
        leer_sintomas
    ;   explicar_diagnostico
    ).

explicar_diagnostico :-
    findall([Probabilidad, Enfermedad], probabilidad(Enfermedad, Probabilidad), ProbabilidadLista),
    sort(0, @>=, ProbabilidadLista, ProbabilidadOrdenada),
    write('Diagnóstico:'), nl,
    explicar_diagnostico_aux(ProbabilidadOrdenada).

explicar_diagnostico_aux([]).
explicar_diagnostico_aux([[Probabilidad, Enfermedad]|T]) :-
    write('Probabilidad de '), write(Enfermedad), write(': '), write(Probabilidad), nl,
    explicar_diagnostico_aux(T).

% Ejecutar el diagnóstico
:- diagnosticar_enfermedad.
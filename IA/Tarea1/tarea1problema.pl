% problema escrito

% personas
% principal: jorge
% viuda: katia
% hija de viuda: emma
% padre de principal: arturo
% hija de madrasta del principal: lucia
% hijo de la mujer del principal: leo

hombre(jorge). % jorge es hombre
hombre(arturo). % arturo es hombre
hombre(leo). % leo es hombre
mujer(katia). % katia es mujer
mujer(emma). % emma es mujer
mujer(lucia). % lucia es mujer
padre(emma,katia). % katia es mama de emma
padre(jorge,arturo). % arturo es papa de jorge
padre(lucia,emma). % emma es mama de lucia
padre(leo,katia). % katia es mama de leo
casado(jorge,katia). % katia esta casada con jorge
casado(katia,jorge).
casado(arturo,emma). % emma esta casada con arturo
casado(emma,arturo).
hijo(X,Y) :- padre(Y,X), hombre(Y). % Y es hijo de X
hijo(X,Y) :- padre(Y,Z), casado(X,Z), hombre(Y). % Y es hijo de X
hija(X,Y) :- padre(Y,X), mujer(Y). % Y es hija de X
hija(X,Y) :- padre(Y,Z), casado(X,Z), mujer(Y). % Y es hija de X
papa(X,Y) :- hijo(Y,X), hombre(Y). % Y es papa de X
papa(X,Y) :- hija(Y,X), hombre(Y). % Y es papa de X
mama(X,Y) :- hijo(Y,X), mujer(Y). % Y es mama de X
mama(X,Y) :- hija(Y,X), mujer(Y). % Y es mama de X
hermano(X,Y) :- hijo(Z,X), hijo(Z,Y), dif(X,Y), hombre(Y). % Y es hermano de X
hermano(X,Y) :- hija(Z,X), hijo(Z,Y), dif(X,Y), hombre(Y). % Y es hermano de X
hermana(X,Y) :- hijo(Z,X), hija(Z,Y), dif(X,Y), mujer(Y). % Y es hermana de X
hermana(X,Y) :- hija(Z,X), hija(Z,Y), dif(X,Y), mujer(Y). % Y es hermana de X
abuelo(X,Y) :- hijo(Z,X), hijo(Y,Z), hombre(Y). % Y es abuelo de X
abuelo(X,Y) :- hija(Z,X), hijo(Y,Z), hombre(Y). % Y es abuelo de X
abuelo(X,Y) :- hijo(Z,X), hija(Y,Z), hombre(Y). % Y es abuelo de X
abuelo(X,Y) :- hija(Z,X), hija(Y,Z), hombre(Y). % Y es abuelo de X
abuela(X,Y) :- hijo(Z,X), hijo(Y,Z), mujer(Y). % Y es abuela de X
abuela(X,Y) :- hija(Z,X), hijo(Y,Z), mujer(Y). % Y es abuela de X
abuela(X,Y) :- hijo(Z,X), hija(Y,Z), mujer(Y). % Y es abuela de X
abuela(X,Y) :- hija(Z,X), hija(Y,Z), mujer(Y). % Y es abuela de X
nieto(X,Y) :- abuelo(Y,X), hombre(Y). % Y es nieto de X
nieto(X,Y) :- abuela(Y,X), hombre(Y). % Y es nieto de X
nieta(X,Y) :- abuelo(Y,X), mujer(Y). % Y es nieta de X
nieta(X,Y) :- abuela(Y,X), mujer(Y). % Y es nieta de X
tio(X,Y) :- hijo(Z,X), hermano(Z,Y), hombre(Y). % Y es tio de X
tio(X,Y) :- hija(Z,X), hermano(Z,Y), hombre(Y). % Y es tio de X
tia(X,Y) :- hijo(Z,X), hermana(Z,Y), mujer(Y). % Y es tia de X
tia(X,Y) :- hija(Z,X), hermana(Z,Y), mujer(Y). % Y es tia de X
primo(X,Y) :- hijo(Z,X), tio(Y,Z), hombre(Y). % Y es primo de X
primo(X,Y) :- hija(Z,X), tio(Y,Z), hombre(Y). % Y es primo de X
primo(X,Y) :- hijo(Z,X), tia(Y,Z), hombre(Y). % Y es primo de X
primo(X,Y) :- hija(Z,X), tia(Y,Z), hombre(Y). % Y es primo de X
prima(X,Y) :- hijo(Z,X), tio(Y,Z), mujer(Y). % Y es prima de X
prima(X,Y) :- hija(Z,X), tio(Y,Z), mujer(Y). % Y es prima de X
prima(X,Y) :- hijo(Z,X), tia(Y,Z), mujer(Y). % Y es prima de X
prima(X,Y) :- hija(Z,X), tia(Y,Z), mujer(Y). % Y es prima de X
sobrino(X,Y) :- tio(Y,X), hombre(Y). % Y es sobrino de X
sobrino(X,Y) :- tia(Y,X), hombre(Y). % Y es sobrino de X
sobrina(X,Y) :- tio(Y,X), mujer(Y). % Y es sobrino de X
sobrina(X,Y) :- tia(Y,X), mujer(Y). % Y es sobrino de X
suegro(X,Y) :- casado(X,Z), hijo(Y,Z), hombre(Y). % Y es suegro de X
suegro(X,Y) :- casado(X,Z), hija(Y,Z), hombre(Y). % Y es suegro de X
suegra(X,Y) :- casado(X,Z), hijo(Y,Z), mujer(Y). % Y es suegra de X
suegra(X,Y) :- casado(X,Z), hija(Y,Z), mujer(Y). % Y es suegra de X
nuero(X,Y) :- suegro(Y,X), hombre(Y). % Y es nuero de X
nuero(X,Y) :- suegra(Y,X), hombre(Y). % Y es nuero de X
nuera(X,Y) :- suegro(Y,X), mujer(Y). % Y es nuera de X
nuera(X,Y) :- suegra(Y,X), mujer(Y). % Y es nuera de X
yerno(X,Y) :- hijo(X,Z), casado(Y,Z), hombre(Y). % Y es yerno de X
yerno(X,Y) :- hija(X,Z), casado(Y,Z), hombre(Y). % Y es yerno de X
yerna(X,Y) :- hijo(X,Z), casado(Y,Z), mujer(Y). % Y es yerna de X
yerna(X,Y) :- hija(X,Z), casado(Y,Z), mujer(Y). % Y es yerna de X
cuñado(X,Y) :- casado(X,Z), hermano(Z,Y), hombre(Y). % Y es cuñado de X
cuñada(X,Y) :- casado(X,Z), hermana(Z,Y), mujer(Y). % Y es cuñada de X
bisabuelo(X,Y) :- hijo(Z,X), abuelo(Z,Y), hombre(Y). % Y es bisabuelo de X
bisabuelo(X,Y) :- hija(Z,X), abuelo(Z,Y), hombre(Y). % Y es bisabuelo de X
bisabuela(X,Y) :- hijo(Z,X), abuela(Z,Y), mujer(Y). % Y es bisabuela de X
bisabuela(X,Y) :- hija(Z,X), abuela(Z,Y), mujer(Y). % Y es bisabuela de X
bisnieto(X,Y) :- bisabuelo(Y,X), hombre(Y). % Y es bisnieto de X
bisnieto(X,Y) :- bisabuela(Y,X), hombre(Y). % Y es bisnieto de X
bisnieta(X,Y) :- bisabuelo(Y,X), mujer(Y). % Y es bisnieta de X
bisnieta(X,Y) :- bisabuela(Y,X), mujer(Y). % Y es bisnieta de X

% consultas

% su mujer es suegra del suegro de su mujer
% casado(jorge,A). -> A=katia, suegro(katia,B). -> B=arturo y suegra(arturo,katia). -> true

% su hija se volvio su mama
% hija(jorge,A). -> A=emma y mama(jorge,emma). -> true

% su padre es su yerno
% papa(jorge,A). -> A=arturo y yerno(jorge,arturo). -> true

% la hija de la madrasta es su hermana
% mama(jorge,A). -> A=emma, hija(emma,B). -> B=lucia y hermana(jorge,lucia). -> true

% su hermana es nieta de su mujer
% hermana(jorge,A). -> A=lucia, casado(jorge,B). -> B=katia, nieta(katia,lucia). -> true

% es abuelo de su hermana
% hermana(jorge,A). -> A=lucia y abuelo(lucia,jorge). -> true

% el hijo de su mujer es hermano de su madre
% casado(jorge,A). -> A=katia, hijo(katia,B). -> B=leo, mama(jorge,C). -> C=emma y hermano(emma,leo). -> true

% el hijo de su mujer es cuñado de su padre
% casado(jorge,A). -> A=katia, hijo(katia,B). -> B=leo, papa(jorge,C). -> C=arturo y cuñado(arturo,leo). -> true

% el hijo de su mujer es nieto de la hermana del hijo
% casado(jorge,A). -> A=katia, hijo(katia,B). -> B=leo, hermana(leo,C). -> C=emma y nieto(emma,leo). -> true
% 
% el hijo de su mujer es su tio
% casado(jorge,A). -> A=katia, hijo(katia,B). -> B=leo y tio(jorge,leo). -> true

% su mujer es nuera de la hija de su mujer
% casado(jorge,A). -> A=katia, hija(katia,B). -> B=emma y nuera(emma,katia). -> true

% es padre de su madre
% mama(jorge,A). -> A=emma y papa(emma,jorge). -> true

% su padre es su hijo
% papa(jorge,A). -> A=arturo y hijo(jorge,arturo). -> false??? (no funciona ya que deberia estar casado con su abuela paterna, pero solo esta casado consu abuela materna)

% la mujer de su padre es su hija
% papa(jorge,A). -> A=arturo, casado(arturo,B). -> B=emma y hija(jorge,emma). -> true

% su hijo es su bisnieto
% hijo(jorge,A). -> A=leo y bisnieto(jorge,leo). -> true

% su hijo es tio de la tia su hijo
% hijo(jorge,A). -> A=leo, tia(leo,B). -> B=lucia y tio(lucia,leo). -> true

% es su propio abuelo
% abuelo(jorge,jorge). -> true

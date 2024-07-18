% familia

hombre(carlos). % carlos es hombre
hombre(pedro). % pedro es hombre
hombre(diego). % diego es hombre
hombre(cain). % cain es hombre
hombre(alex). % alex es hombre
hombre(luis). % luis es hombre
hombre(uriel). % uriel es hombre
hombre(dan). % dan es hombre
mujer(kate). % katia es mujer
mujer(ana). % ana es mujer
mujer(luna). % luna es mujer
mujer(gloria). % gloria es mujer
mujer(perla). % perla es mujer
mujer(iris). % iris es mujer
padre(ana,kate). % kate es mama de ana
padre(alex,ana). % ana es mama de alex
padre(cain,ana). % ana es mama de cain
padre(gloria,pedro). % pedro es papa de gloria
padre(luis,diego). % diego es papa de luis
padre(uriel,luna). % luna es mama de uriel
padre(perla,cain). % cain es papa de perla
padre(dan,iris). % iris es mama de dan
casado(kate,carlos). % kate esta casada con carlos
casado(carlos,kate).
casado(ana,pedro). % ana esta casada con pedro
casado(pedro,ana).
casado(diego,gloria). % diego esta casado con gloria
casado(gloria,diego).
casado(cain,luna). % cain esta casado con luna
casado(luna,cain).
casado(iris,alex). % iris esta casada con alex
casado(alex,iris).
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
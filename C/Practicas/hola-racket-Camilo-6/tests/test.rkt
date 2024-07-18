#lang racket
(require rackunit)
(require rackunit/text-ui)
(require "../solucion.rkt")

;Sobre este ejercicio hubieron muchas dudas y deben saber que existen variantes, si especifican
;sus consideraciones en el readme las entendere
(run-tests (test-suite "my-map"
    #:before (lambda () (display "my-map: \n" ))
    (test-case "my-map"
        (check-equal? (my-map (lambda (n) (+ n 1)) '(1 2 3 4 5)) '(2 3 4 5 6)))
    (test-case "my-map"
        (check-equal? (my-map (lambda (n) (- n 1)) '(1 2 3 4 5)) '(0 1 2 3 4)))
    (test-case "my-map"
        (check-equal? (my-map (lambda (n) (+ n 1)) '()) '()))
    'normal))

(run-tests (test-suite "my-filter"
    #:before (lambda () (display "my-filter: \n" ))
    (test-case "my-filter"
        (check-equal? (my-filter (lambda (n) (> n 1)) '(1 2 3 4 5)) '(2 3 4 5)))
    (test-case "my-filter"
        (check-equal? (my-filter (lambda (n) (>= n 1)) '(1 2 3 4 5)) '(1 2 3 4 5)))
    (test-case "my-filter"
        (check-equal? (my-filter (+ 1 2) '()) '()))
    'normal))

(run-tests (test-suite "my-foldr"
    #:before (lambda () (display "my-foldr: \n" ))
    (test-case "my-foldr"
        (check-eq? (my-foldr (lambda (n c) (- n c)) 0 '(1 2 3 4 5)) 3))
    (test-case "my-foldr"
        (check-eq? (my-foldr (lambda (n c) (- n c)) 0 '(1 2 3 4)) -2))
    (test-case "my-foldr"
        (check-eq? (my-foldr (lambda (n c) (- n c)) 0 '()) 0))
    'normal))

(run-tests (test-suite "my-foldl"
    #:before (lambda () (display "my-foldl: \n" ))
    (test-case "my-foldl"
        (check-eq? (my-foldl (lambda (n c) (- n c)) 0 '(1 2 3 4 5)) -15))
    (test-case "my-foldl"
        (check-eq? (my-foldl (lambda (n c) (- n c)) 0 '(1 2 3 4)) -10))
    (test-case "my-foldl"
        (check-eq? (my-foldl (lambda (n c) (- n c)) 0 '()) 0))
    'normal))


(run-tests (test-suite "caesar-encoder"
    #:before (lambda () (display "caesar-encoder: \n" ))
    (test-case "clave negativa"
        (check-equal? (caesar-encoder "Lorem Ipsum" -15) "Wzcpx Tadfx"))
    (test-case "mensaje simple"
        (check-equal? (caesar-encoder "Racket is cool" 0) "Racket is cool"))
    (test-case "simbolos"
        (check-equal? (caesar-encoder "!#$%&/()123" -15) "!#$%&/()123"))
    (test-case "mensaje largo con acentos"
        (check-equal?
          (caesar-encoder "Ojalá no ser el momento más humilde de alguien" 2023)
                          "Jevgá ij nzm zg hjhzioj hán cphdgyz yz vgbpdzi"))
    (test-case "mayusculas"
        (check-equal?
          (caesar-encoder "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" 26)
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"))
    (test-case "minusculas"
        (check-equal?
          (caesar-encoder "abcdefghijklmnopqrstuvwxyz" 1)
                          "bcdefghijklmnopqrstuvwxyza"))
    'normal))

(run-tests (test-suite "caesar-decoder"
    #:before (lambda () (display "caesar-decoder: \n" ))
    (test-case "llave negativa"
        (check-equal? (caesar-decoder "Wzcpx Tadfx" -15) "Lorem Ipsum"))
    (test-case "mensaje simple"
        (check-equal? (caesar-decoder "Racket is cool" 0) "Racket is cool"))
    (test-case "simbolos"
        (check-equal? (caesar-decoder "!#$%&/()123" -15) "!#$%&/()123"))
    (test-case "mensaje largo con acentos"
        (check-equal?
          (caesar-decoder "Jevgá ij nzm zg hjhzioj hán cphdgyz yz vgbpdzi" 2023)
                          "Ojalá no ser el momento más humilde de alguien"))
    (test-case "mayusculas"
        (check-equal?
          (caesar-decoder "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" 26)
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"))
    (test-case "minusculas"
        (check-equal?
          (caesar-decoder "bcdefghijklmnopqrstuvwxyza" 1)
                          "abcdefghijklmnopqrstuvwxyz"))
    'normal))


(run-tests (test-suite "get-two"
    #:before (lambda () (display "get-two: \n" ))
    (test-case "objetivo negativo"
        (check-equal? (get-two '(-10 2 3 1 5 1 2 -5) -15) '(0 7)))
    (test-case "mismo numero diferentes indices"
        (check-equal? (get-two '(3 3) 6) '(0 1)))
    (test-case ""
        (check-equal? (get-two '(13 24 1 52 43 2) 3) '(2 5)))
    (test-case ""
        (check-equal? (get-two '(7 0 1 52 43 2) 7) '(0 1)))
    (test-case "objetivo 0"
        (check-equal? (get-two '(0 4 6 23 453 1 52 43 0) 0) '(0 8)))
    'normal))

(run-tests (test-suite "palindromo"
    #:before (lambda () (display "palindromo: \n" ))
    (test-case "cadena minusculas"
        (check-equal? (palindromo "anitalavalatina") #t))
    (test-case "cadena mayusculas"
        (check-equal? (palindromo "ANITALAVALATINA") #t))
    (test-case "cadena alternada"
        (check-equal? (palindromo "Anita Lava La Tina") #t))
    (test-case "Poema"
        (check-equal? (palindromo "Amor azul Ramera de todo te di Mariposa colosal sí yo de todo te di Poda la rosa Venus El átomo como tal es un evasor alado Pide todo te doy isla sol ocaso pirámide Todo te daré mar luz aroma") #t))
    (test-case "numero"
        (check-equal? (palindromo 10000000001) #t))
    (test-case "numero"
        (check-equal? (palindromo 1000000001) #t))
    (test-case "numero"
        (check-equal? (palindromo 10000000012) #f))
    (test-case "lista"
        (check-equal? (palindromo '(#\a #\m #\o #\r #\a #\z #\u #\l #\r #\a #\m #\e #\r #\a #\d #\e #\t #\o #\d #\o #\t #\e #\d #\i #\m #\a #\r #\i #\p #\o #\s #\a #\c #\o #\l #\o #\s #\a #\l #\s #\i #\y #\o #\d #\e #\t #\o #\d #\o #\t #\e #\d #\i #\p #\o #\d #\a #\l #\a #\r #\o #\s #\a #\v #\e #\n #\u #\s #\e #\l #\a #\t #\o #\m #\o #\c #\o #\m #\o #\t #\a #\l #\e #\s #\u #\n #\e #\v #\a #\s #\o #\r #\a #\l #\a #\d #\o #\p #\i #\d #\e #\t #\o #\d #\o #\t #\e #\d #\o #\y #\i #\s #\l #\a #\s #\o #\l #\o #\c #\a #\s #\o #\p #\i #\r #\a #\m #\i #\d #\e #\t #\o #\d #\o #\t #\e #\d #\a #\r #\e #\m #\a #\r #\l #\u #\z #\a #\r #\o #\m #\a)) #t))
    'normal))

(run-tests (test-suite "anagramas-de"
    #:before (lambda () (display "anagramas-de: \n" ))
    (test-case "26 palabras"
        (check-equal? (anagramas-de "aperos" '("apreso" "apresó" "aproes" "arpeos" "áspero" "aspero" "espora" "operas" "óperas" "opresa" "pareos" "pasero" "peoras" "posare" "posaré" "raspeo" "raspeó" "repaso" "repasó" "reposa" "separo" "separó" "sopare" "soparé" "sopear" "sopera"))
                      '("apreso" "apresó" "aproes" "arpeos" "áspero" "aspero" "espora" "operas"
                        "óperas" "opresa" "pareos" "pasero" "peoras" "posare" "posaré" "raspeo"
                        "raspeó" "repaso" "repasó" "reposa" "separo" "separó" "sopare" "soparé"
                        "sopear" "sopera")))
    (test-case "Cadena de una sola letra"
        (check-equal? (anagramas-de "s" '("s" "s" "s" "arpeos" "áspero" "aspero" "espora" "operas" "óperas" "opresa" "pareos" "pasero" "peoras" "posare" "posaré" "raspeo" "raspeó" "repaso" "repasó" "reposa" "separo" "separó" "sopare" "soparé" "s" "sopera"))
                      '("s" "s" "s" "s")))
    (test-case "Cadena de una sola letra"
        (check-equal? (anagramas-de "s" '("s" "s" "s" "arpeos" "áspero" "aspero" "espora" "operas" "óperas" "opresa" "pareos" "pasero" "peoras" "posare" "posaré" "raspeo" "raspeó" "repaso" "repasó" "reposa" "separo" "separó" "sopare" "soparé" "s" "sopera"))
                      '("s" "s" "s" "s")))

    (test-case "ninguna"
        (check-equal? (anagramas-de "Alopolisia" '("arpeos" "áspero" "aspero" "espora" "operas" "óperas" "opresa" "pareos" "pasero" "peoras" "posare" "posaré" "raspeo" "raspeó" "repaso" "repasó" "reposa" "separo" "separó" "sopare" "soparé" "s" "sopera"))
                      '()))

    (test-case "15 palabras"
        (check-equal? (anagramas-de "apesto" '("apestó" "aposte" "aposté" "espato" "estopa" "optase" "pasote" "pateos" "petaso" "pétaso" "poetas" "potase" "sapote" "topase" "topeas"))
                      '("apestó" "aposte" "aposté" "espato" "estopa" "optase" "pasote" "pateos"  "petaso" "pétaso" "poetas" "potase" "sapote" "topase" "topeas")))
     'normal))

(run-tests (test-suite "pasos-collatz"
    #:before (lambda () (display "pasos-collatz: \n" ))
    (test-case "12"
        (check-equal? (pasos-collatz 12) 9))
    (test-case "123"
        (check-equal? (pasos-collatz 123) 46))
    (test-case "1234"
        (check-equal? (pasos-collatz 1234) 132))
    (test-case "12345"
        (check-equal? (pasos-collatz 12345) 50))
    (test-case "123456"
        (check-equal? (pasos-collatz 123456) 61))
    (test-case "1234567"
        (check-equal? (pasos-collatz 1234567) 111))
    'normal))

(run-tests (test-suite "pasos-collatz"
    #:before (lambda () (display "pasos-collatz: \n" ))
    (test-case "5"
        (check-equal? (lista-collatz 12) '(12 6 3 10 5 16 8 4 2 1)))
    (test-case "6"
        (check-equal? (lista-collatz 6) '(6 3 10 5 16 8 4 2 1)))
    (test-case "7"
        (check-equal? (lista-collatz 7) '(7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1)))
    (test-case "20"
        (check-equal? (lista-collatz 20) '(20 10 5 16 8 4 2 1)))
    (test-case "15"
        (check-equal? (lista-collatz 15) '(15 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1)))
    (test-case "123456"
        (check-equal? (lista-collatz 123456) '(123456 61728 30864 15432 7716 3858 1929 5788 2894 1447 4342 2171 6514 3257 9772 4886 2443 7330 3665 10996 5498 2749 8248 4124 2062 1031 3094 1547 4642 2321 6964 3482 1741 5224 2612 1306 653 1960 980 490 245 736 368 184 92 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1)))
    'normal))
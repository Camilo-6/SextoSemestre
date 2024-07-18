#lang nanopass              ;Decimos que el lenguaje con el que vamos a trabajar es nanopass
(provide (all-defined-out)) ;Indicamos que todas las funciones que se definan aqui son publicas,
                            ;así que podran ser utilizadas en otros modulos siempre y cuando se
                            ;importe solucion.rkt

; Funcion my-map
; Usa match para hacer pattern matching con la lista l
; Usa cons para construir una lista con el resultado de aplicar la funcion f a cada elemento de la lista l
(define (my-map f l)
    (match l
        ['() '()]
        [(cons x xs) (cons (f x) (my-map f xs))]))

; Funcion my-filter
; Usa match para hacer pattern matching con la lista l
; Usa cons para construir una lista con los elementos de la lista l que cumplen con la condicion f
(define (my-filter f l)
    (match l
        ['() '()]
        [(cons x xs) (if (f x) (cons x (my-filter f xs)) (my-filter f xs))]))

; Funcion my-foldr
; Usa match para hacer pattern matching con la lista l
; Usa cons para construir una lista con el resultado de aplicar la funcion f a cada elemento de la lista l
(define (my-foldr f i l)
    (match l
        ['() i]
        [(cons x xs) (f x (my-foldr f i xs))]))

; Funcion my-foldl
; Usa match para hacer pattern matching con la lista l
; Usa cons para construir una lista con el resultado de aplicar la funcion f a cada elemento de la lista l
(define (my-foldl f i l)
    (match l
        ['() i]
        [(cons x xs) (my-foldl f (f i x) xs)]))

; Funcion cesar-encoder
; Usa cond para checar si el caracter c es una letra valida
; Usa let para definir la variable base dependiendo de si el caracter c es mayuscula o minuscula
; Usa integer->char para convertir un entero a un caracter
; Usa char->integer para convertir un caracter a un entero
; Usa list->string para convertir una lista de caracteres a un string
; Usa string->list para convertir un string a una lista de caracteres
(define (caesar-encoder s n)
    (define (shift-letter c)
        (cond
            [(valid-letter? c)
                (let ([base (if (char-upper-case? c) 65 97)])
                    (integer->char (+ base (modulo (+ (- (char->integer c) base) n) 26))))]
            [else c]))
    (list->string (my-map shift-letter (string->list s))))

; Funcion valid-letter?
; Usa and para checar si cumple con las condiciones de ser un caracter valido
; Usa char? para checar si el caracter c es un caracter
; Usa char-alphabetic? para checar si el caracter c es una letra
(define (valid-letter? c)
    (and (char? c) (char-alphabetic? c) (not (special-letter? c))))

; Funcion special-letter?
; Usa or para checar si el caracter c es una letra especial
(define (special-letter? c)
    (or (char=? c #\ñ) (char=? c #\Ñ) (char=? c #\á) (char=? c #\Á) (char=? c #\é) (char=? c #\É) (char=? c #\í) (char=? c #\Í) (char=? c #\ó) (char=? c #\Ó) (char=? c #\ú) (char=? c #\Ú)))

; Funcion caesar-decoder
(define (caesar-decoder s n)
    (caesar-encoder s (- n)))

; Funcion get-two
; Usa let para definir la variable complement como el resultado de restar o y v
; Usa hash-has-key? para checar si la tabla tiene una llave con el valor complement
; Usa list para hacer una lista
; Usa hash-ref para obtener el valor de la tabla con la llave complement
; Usa begin para hacer una cosa y devolver otra
; Usa hash-set! para agregar el valor v a la tabla con la llave complement
; Usa null? para checar si la lista l esta vacia
; Usa let para definir la variable result como el resultado de buscar el complemento de v en la tabla
; Usa car para obtener el primer elemento de la lista l
; Usa cdr para obtener el resto de la lista l
(define (get-two l o)
    (define table (make-hash))
    (define (search-complement v i)
        (let ((complement (- o v)))
            (if (hash-has-key? table complement)
                (list (hash-ref table complement) i)
                (begin (hash-set! table v i) #f))))
    (define (loop l i)
        (if (null? l)
            #f
            (let ((result (search-complement (car l) i)))
                (if result
                    result
                    (loop (cdr l) (+ i 1))))))
    (loop l 0))

; Funcion palindromo
; Usa cond para checar si x es un string, un numero o una lista
; Usa string? para checar si x es un string
; Usa equal? para checar si dos listas son iguales
; Usa string->list para convertir un string a una lista de caracteres
; Usa reverse para invertir una lista
; Usa number? para checar si x es un numero
; Usa equal? para checar si dos listas son iguales
; Usa number->string para convertir un numero a un string
; Usa list? para checar si x es una lista
(define (palindromo x)
    (cond
        [(string? x) (equal? (string->list (clean x)) (reverse (string->list (clean x))))]
        [(number? x) (equal? (string->list (number->string x)) (reverse (string->list (number->string x))))]
        [(list? x) (equal? x (reverse x))]))

; Funcion clean
; Usa void? para checar si x es un void
; Usa cond para ver si el caracter c es un espacio en blanco o una letra
; Usa char-whitespace? para checar si el caracter c es un espacio en blanco
; Usa char-alphabetic? para checar si el caracter c es una letra
; Usa char=? para checar si el caracter c es igual a un caracter en especifico
; Usa list->string para convertir una lista de caracteres a un string
; Usa string->list para convertir un string a una lista de caracteres
(define (clean s)
    (define (not-void? x)
        (not (void? x)))
    (define (clean-char c)
        (cond
            [(char-whitespace? c) (void)]
            [(char-alphabetic? c)(cond
                [(char=? c #\A) #\a]
                [(char=? c #\Á) #\a]
                [(char=? c #\á) #\a]
                [(char=? c #\B) #\b]
                [(char=? c #\C) #\c]
                [(char=? c #\D) #\d]
                [(char=? c #\E) #\e]
                [(char=? c #\É) #\e]
                [(char=? c #\é) #\e]
                [(char=? c #\F) #\f]
                [(char=? c #\G) #\g]
                [(char=? c #\H) #\h]
                [(char=? c #\I) #\i]
                [(char=? c #\Í) #\i]
                [(char=? c #\í) #\i]
                [(char=? c #\J) #\j]
                [(char=? c #\K) #\k]
                [(char=? c #\L) #\l]
                [(char=? c #\M) #\m]
                [(char=? c #\N) #\n]
                [(char=? c #\Ñ) #\ñ]
                [(char=? c #\O) #\o]
                [(char=? c #\Ó) #\o]
                [(char=? c #\ó) #\o]
                [(char=? c #\P) #\p]
                [(char=? c #\Q) #\q]
                [(char=? c #\R) #\r]
                [(char=? c #\S) #\s]
                [(char=? c #\T) #\t]
                [(char=? c #\U) #\u]
                [(char=? c #\Ú) #\u]
                [(char=? c #\ú) #\u]
                [(char=? c #\V) #\v]
                [(char=? c #\W) #\w]
                [(char=? c #\X) #\x]
                [(char=? c #\Y) #\y]
                [(char=? c #\Z) #\z]
                [else c])]
            [else c]))
    (list->string (my-filter not-void? (my-map clean-char (string->list s)))))

; Funcion anagramas-de
; Usa equal? para checar si dos listas son iguales
; Usa list->string para convertir una lista de caracteres a un string
; Usa sort para ordenar una lista
; Usa string->list para convertir un string a una lista de caracteres
; Usa char<? para comparar dos caracteres de manera lexicografica
(define (anagramas-de s l)
    (define (anagrama? s1 s2)
        (equal? (list->string (sort (string->list (clean s1)) char<?)) (list->string (sort (string->list (clean s2)) char<?))))
    (my-filter (lambda (x) (anagrama? s x)) l))

; Funcion pasos-collatz
; Usa length para obtener la longitud de la lista
(define (pasos-collatz n)
    (- (length (lista-collatz n)) 1))

; Funcion lista-collatz
; Usa even? para checar si n es par
; Usa reverse para invertir una lista
; Usa cons para agregar un elemento a una lista
(define (lista-collatz n)
    (define (collatz n)
        (if (even? n)
            (/ n 2)
            (+ (* n 3) 1)))
    (define (cycle n l)
        (if (= n 1)
            (reverse (cons n l))
            (cycle (collatz n) (cons n l))))
    (cycle n '()))

; Funcion my-length
; Usa lambda para definir una funcion que recibe dos parametros
(define (my-length l)
    (my-foldr (lambda (x a) (+ a 1)) 0 l))

; Funcion my-reverse
; Usa lambda para definir una funcion que recibe dos parametros
; Usa cons para construir la lista resultante
(define (my-reverse l)
    (my-foldl (lambda (a x) (cons x a)) '() l))

; Funcion my-append
; Usa cons para construir la lista resultante
(define (my-append l1 l2)
    (my-foldr cons l2 l1))

; Funcion my-concatenate
(define (my-concatenate ls)
    (my-foldr my-append '() ls))

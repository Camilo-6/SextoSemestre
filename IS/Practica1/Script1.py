# Marcador de Tenis

# Numeros aleatorios
import random

# Funcion para jugar un partido
def jugar_partido():
    sacar = random.randint(1, 2)
    j1 = pedir_jugador()
    j2 = pedir_jugador()
    puntaje = [[0, 0, 0], [0, 0, 0]]
    ganador = 0
    setn = 1
    # imprimir_puntaje_set(j1, j2, puntaje)
    while ganador == 0:
        print("Set: ", setn)
        sacar = jugar_set(j1, j2, puntaje, sacar)
        ganador = verificar_ganador(puntaje)
        setn += 1
        # if ganador == 0:
        #     imprimir_puntaje_set(j1, j2, puntaje)
    # imprimir_puntaje_set(j1, j2, puntaje)
    if ganador == 1:
        jugador_ganador = j1
    elif ganador == 2:
        jugador_ganador = j2
    print(f"El ganador del Partido es {jugador_ganador}!!!")

# Funcion para imprimir el puntaje
def imprimir_puntaje_set(j1, j2, puntaje):
    print(f"Marcador Set {j1}: {puntaje[0][0]} - {puntaje[1][0]} :{j2}")

# Funcion para pedir el nombre del jugador
def pedir_jugador():
    jugador = input("Ingresa el nombre del jugador: ")
    if jugador == "":
        print("El nombre del jugador no puede estar vacio")
        return pedir_jugador()
    return jugador

# Funcion para verificar si hay un ganador basado en los sets ganados (usando mejor de 3)
def verificar_ganador(puntaje):
    if puntaje[0][0] == 2:
        return 1
    if puntaje[1][0] == 2:
        return 2
    return 0

# Funcion para jugar un set
def jugar_set(j1, j2, puntaje, sacar):
    ganador_set = 0
    juego = 1
    imprimir_puntaje_juego(j1, j2, puntaje)
    while ganador_set == 0:
        print("Juego: ", juego)
        if juego % 2 == 0:
            print("Cambio de cancha")
        sacar = jugar_juego(j1, j2, puntaje, sacar)
        sacar = 1 if sacar == 2 else 2
        ganador_set = verificar_ganador_set(puntaje)
        if ganador_set == 0:
            imprimir_puntaje_juego(j1, j2, puntaje)
        juego += 1
    # imprimir_puntaje_juego(j1, j2, puntaje)
    if ganador_set == 1:
        puntaje[0][0] += 1
        puntaje[0][1] = 0
        puntaje[1][1] = 0
        jugador_ganador_set = j1
    else:
        puntaje[1][0] += 1
        puntaje[1][1] = 0
        puntaje[0][1] = 0
        jugador_ganador_set = j2
    print(f"El ganador del Set es {jugador_ganador_set}")
    return sacar

# Funcion para imprimir el puntaje
def imprimir_puntaje_juego(j1, j2, puntaje):
    print(f"Marcador Juego {j1}: {puntaje[0][1]} - {puntaje[1][1]} :{j2}")

# Funcion para verificar si hay un ganador del set basado en los juegos ganados
def verificar_ganador_set(puntaje):
    juegos_j1 = puntaje[0][1]
    juegos_j2 = puntaje[1][1]
    if juegos_j1 >= 6 and juegos_j1 - juegos_j2 >= 2:
        return 1
    if juegos_j2 >= 6 and juegos_j2 - juegos_j1 >= 2:
        return 2
    return 0

# Funcion para jugar un juego
def jugar_juego(j1, j2, puntaje, sacar):
    ganador_juego = 0
    if sacar == 1:
        jugador_sacar = j1
    else:
        jugador_sacar = j2
    imprimir_puntaje_punto(j1, j2, puntaje)
    while ganador_juego == 0:
        print(f"El jugador {jugador_sacar} saca")
        punto = pedir_punto(j1, j2)
        actualizar_puntaje(punto, puntaje)
        ganador_juego = verificar_ganador_juego(puntaje)
        if ganador_juego == 0:
            imprimir_puntaje_punto(j1, j2, puntaje)
    if ganador_juego == 1:
        puntaje[0][1] += 1
        puntaje[0][2] = 0
        puntaje[1][2] = 0
        jugador_ganador_juego = j1
    else:
        puntaje[1][1] += 1
        puntaje[1][2] = 0
        puntaje[0][2] = 0
        jugador_ganador_juego = j2
    print(f"El ganador del Juego es {jugador_ganador_juego}")
    return sacar

# Funcion para imprimir el puntaje
def imprimir_puntaje_punto(j1, j2, puntaje):
    print(f"Marcador Puntos {j1}: {puntaje[0][2]} - {puntaje[1][2]} :{j2}")

# Funcion para pedir un punto
def pedir_punto(j1, j2):
    try:
        punto = int(input(f"Ingresa el jugador que gano el punto, (1 para {j1} y 2 para {j2}): "))
        if punto != 1 and punto != 2:
            print("El valor ingresado no es valido")
            return pedir_punto(j1, j2)
        return punto
    except ValueError:
        print("El valor ingresado no es valido")
        return pedir_punto(j1, j2)

# Funcion para actualizar el puntaje
def actualizar_puntaje(punto, puntaje):
    puntaje_j1 = puntaje[0][2]
    puntaje_j2 = puntaje[1][2]
    if punto == 1:
        if puntaje_j1 == 0:
            puntaje[0][2] = 15
        elif puntaje_j1 == 15:
            puntaje[0][2] = 30
        elif puntaje_j1 == 30:
            puntaje[0][2] = 40
        elif puntaje_j1 == 40:
            if puntaje_j2 == 40:
                puntaje[0][2] = "AD"
                puntaje[1][2] = 40
            elif puntaje_j2 == "AD":
                puntaje[1][2] = 40
            else:
                puntaje[0][2] = "Ganador"
        else:
            puntaje[0][2] = "Ganador"
    else:
        if puntaje_j2 == 0:
            puntaje[1][2] = 15
        elif puntaje_j2 == 15:
            puntaje[1][2] = 30
        elif puntaje_j2 == 30:
            puntaje[1][2] = 40
        elif puntaje_j2 == 40:
            if puntaje_j1 == 40:
                puntaje[1][2] = "AD"
                puntaje[0][2] = 40
            elif puntaje_j1 == "AD":
                puntaje[0][2] = 40
            else:
                puntaje[1][2] = "Ganador"
        else:
            puntaje[1][2] = "Ganador"

def verificar_ganador_juego(puntaje):
    puntaje_j1 = puntaje[0][2]
    puntaje_j2 = puntaje[1][2]
    if puntaje_j1 == "Ganador":
        return 1
    if puntaje_j2 == "Ganador":
        return 2
    return 0

# Llamado a la funcion para jugar un partido
jugar_partido()




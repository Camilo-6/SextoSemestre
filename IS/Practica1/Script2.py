# Problema y Arbol Binario

# Problema Montaña contar cuantos valles se recorren
def contar_valles(cadena):
    tam_recorrido = len(cadena)
    recorrido = []
    recorrido.append(0)
    altura = 0
    for i in range(1, tam_recorrido + 1):
        if cadena[i - 1] == "U":
            altura += 1
        else:
            altura -= 1
        recorrido.append(altura)
    segmentos = partir_alturas(recorrido)
    valles = 0
    for segmento in segmentos:
        if es_valle(segmento):
            valles += 1
    return valles

def aux(cadena):
    tam_recorrido = len(cadena)
    recorrido = []
    recorrido.append(0)
    altura = 0
    for i in range(1, tam_recorrido + 1):
        if cadena[i - 1] == "U":
            altura += 1
        else:
            altura -= 1
        recorrido.append(altura)
    return recorrido

# Partir en segmentos
def partir_alturas(recorrido):
    resultado = []
    temporal = []
    for elemento in recorrido:
        if elemento == 0:
            if len(temporal) > 0:
                resultado.append(temporal)
                temporal = []
        else:
            temporal.append(elemento)
    return resultado

# Verificar si es valle
def es_valle(segmento):
    es_valle = True
    for elemento in segmento:
        if elemento > -1:
            es_valle = False
            break
    return es_valle


# Arbol Binario Ordenado

# Clase Nodo
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierda = None
        self.derecha = None

# Clase Arbol
class ArbolBinarioOrdenado:
    def __init__(self):
        self.raiz = None

    def agregar(self, valor):
        if self.raiz is None:
            self.raiz = Nodo(valor)
        else:
            self.agregar_aux(valor, self.raiz)

    def agregar_aux(self, valor, nodo):
        if valor < nodo.valor:
            if nodo.izquierda is None:
                nodo.izquierda = Nodo(valor)
            else:
                self.agregar_aux(valor, nodo.izquierda)
        else:
            if nodo.derecha is None:
                nodo.derecha = Nodo(valor)
            else:
                self.agregar_aux(valor, nodo.derecha)

    def recorrido_preorden(self):
        lista = []
        self.recorrido_preorden_aux(self.raiz, lista)
        return lista

    def recorrido_preorden_aux(self, nodo, lista):
        if nodo is not None:
            lista.append(nodo.valor)
            self.recorrido_preorden_aux(nodo.izquierda, lista)
            self.recorrido_preorden_aux(nodo.derecha, lista)

    def recorrido_inorden(self):
        lista = []
        self.recorrido_inorden_aux(self.raiz, lista)
        return lista

    def recorrido_inorden_aux(self, nodo, lista):
        if nodo is not None:
            self.recorrido_inorden_aux(nodo.izquierda, lista)
            lista.append(nodo.valor)
            self.recorrido_inorden_aux(nodo.derecha, lista)

    def recorrido_postorden(self):
        lista = []
        self.recorrido_postorden_aux(self.raiz, lista)
        return lista

    def recorrido_postorden_aux(self, nodo, lista):
        if nodo is not None:
            self.recorrido_postorden_aux(nodo.izquierda, lista)
            self.recorrido_postorden_aux(nodo.derecha, lista)
            lista.append(nodo.valor)

import random
import numpy as np
from deap import base, creator, tools, algorithms

# Version 2: Algoritmo genetico para resolver el problema de la mochila
# Usando la biblioteca DEAP (instalada con pip install deap)

# Definir los objetos con valores aleatorios
# Pesos entre 100 y 1000 gramos
# Valores entre 1 y 10
objetos = [(random.randint(100, 1000), random.randint(1, 10)) for _ in range(30)]

# Capacidad de la mochila
capacidad = 3000

# Crear el tipo de objeto "Fitness" que maximiza
creator.create("Fitness", base.Fitness, weights=(1.0,))

# Crear el tipo de individuo "Individual" basado en listas
creator.create("Individual", list, fitness=creator.Fitness)

# Definir las operaciones geneticas
toolbox = base.Toolbox()
toolbox.register("attr_bool", random.randint, 0, 1)
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_bool, n=len(objetos))
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

# Definir la funcion de evaluacion
def evaluar(individuo):
    peso = 0
    valor = 0
    for i in range(len(objetos)):
        if individuo[i] == 1:
            peso += objetos[i][0]
            valor += objetos[i][1]
    if peso > capacidad:
        return 0,
    else:
        return valor,

# Registrar la funcion de evaluacion
toolbox.register("evaluate", evaluar)

# Registrar las operaciones geneticas
toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
toolbox.register("select", tools.selTournament, tournsize=3)

# Configurar la poblacion
poblacion = toolbox.population(n=100)
NGEN = 1000
for gen in range(NGEN):
    hijos = algorithms.varAnd(poblacion, toolbox, cxpb=0.5, mutpb=0.2)
    fit = list(map(toolbox.evaluate, hijos))
    for fit, ind in zip(fit, hijos):
        ind.fitness.values = fit
    poblacion = toolbox.select(hijos + poblacion, k=len(poblacion))

# Obtener el mejor individuo
mejor = tools.selBest(poblacion, k=1)[0]

# Mostrar la solucion
print("Mejor solucion encontrada con biblioteca DEAP: ")
print("Mejor crosmoma:", mejor)
print("Con el valor de:", sum(objetos[i][1] for i in range(len(mejor)) if mejor[i]))
print("Y un peso de:", sum(objetos[i][0] for i in range(len(mejor)) if mejor[i]), " gramos")
print("Lista de los 30 objetos:")
for i in range(len(objetos)):
    print("Objeto", i+1, "peso:", objetos[i][0], " gramos y valor:", objetos[i][1])
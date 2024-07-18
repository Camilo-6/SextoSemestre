from matplotlib import pyplot as plt
import numpy as np

# Definir rango de valores x
x = np.linspace(0, 10, 100)

# Definir rango de valores y
y = np.cos(x)

# Graficar
plt.plot(x, y)

# Añadir titulo
plt.title("Grafica de la funcion coseno")

# Añadir etiquetas a los ejes
plt.xlabel("x")
plt.ylabel("cos(x)")

# Mostrar grafica
plt.show()
# plt.savefig('grafica.png')

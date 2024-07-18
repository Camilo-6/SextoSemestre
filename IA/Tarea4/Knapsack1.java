import java.util.Arrays;
import java.util.Random;

// Version 1: Algoritmo genetico para resolver el problema de la mochila
// Sin usar bibliotecas de algoritmos geneticos
public class Knapsack1 {

    private static final int[][] objetos = new int[30][2];
    private static final int capacidad = 3000;
    private static final int poblacion = 100;
    private static final int generaciones = 1000;
    private static final int mutacion = 5;

    public static void main(String[] args) {
        // Inicar los objetos con valores aleatorios
        // Pesos entre 100 y 1000 gramos
        // Valores entre 1 y 10
        Random random = new Random();
        for (int i = 0; i < 30; i++) {
            objetos[i][0] = random.nextInt(901) + 100;
            objetos[i][1] = random.nextInt(10) + 1;
        }
        // Poblacion inicial, con cromosomas aleatorios
        // Cromosoma i, indica si el objeto i se incluye o no
        int[][] poblacion = new int[Knapsack1.poblacion][30];
        for (int i = 0; i < Knapsack1.poblacion; i++) {
            for (int j = 0; j < 30; j++) {
                poblacion[i][j] = random.nextInt(2);
            }
        }

        // Evolucionar la poblacion
        for (int g = 0; g < Knapsack1.generaciones; g++) {
            // Calcular el fitness de cada cromosoma
            double[] fitnessPuntaje = new double[Knapsack1.poblacion];
            for (int i = 0; i < Knapsack1.poblacion; i++) {
                fitnessPuntaje[i] = evaluarFitness(poblacion[i]);
            }

            // Seleccionar los mejores cromosomas
            int[][] nuevaPoblacion = new int[Knapsack1.poblacion][30];
            for (int i = 0; i < Knapsack1.poblacion; i++) {
                int padre = seleccionarPadre(fitnessPuntaje);
                int madre = seleccionarPadre(fitnessPuntaje);
                nuevaPoblacion[i] = cruzar(poblacion[padre], poblacion[madre]);
            }

            // Mutaciones
            for (int i = 0; i < Knapsack1.poblacion; i++) {
                mutar(nuevaPoblacion[i]);
            }

            // Reemplazar la poblacion
            poblacion = nuevaPoblacion;
        }

        // Encontrar mejor solucion
        double mejorPuntaje = Double.MIN_VALUE;
        int[] mejorCromosoma = null;
        for (int i = 0; i < Knapsack1.poblacion; i++) {
            double puntaje = evaluarFitness(poblacion[i]);
            if (puntaje > mejorPuntaje) {
                mejorPuntaje = puntaje;
                mejorCromosoma = poblacion[i];
            }
        }

        // Imprimir la mejor solucion
        System.out.println("Mejor solucion encontrada sin biblioteca: ");
        System.out.println("Mejor cromosoma: " + Arrays.toString(mejorCromosoma));
        System.out.println("Con el valor de: " + calcularValor(mejorCromosoma));
        System.out.println("Y un peso de: " + calcularPeso(mejorCromosoma) + " gramos");
        System.out.println("Lista de los 30 objetos: ");
        for (int i = 0; i < 30; i++) {
            System.out.println("Objeto " + i + " con peso " + objetos[i][0] + " gramos y valor " + objetos[i][1]);
        }
    }

    private static double evaluarFitness(int[] cromosoma) {
        double valorTotal = 0;
        double pesoTotal = 0;
        for (int i = 0; i < 30; i++) {
            if (cromosoma[i] == 1) {
                valorTotal += objetos[i][1];
                pesoTotal += objetos[i][0];
            }
        }
        if (pesoTotal > Knapsack1.capacidad) {
            return 0;
        } else {
            return valorTotal;
        }
    }

    private static int seleccionarPadre(double[] fitnessPuntaje) {
        double total = Arrays.stream(fitnessPuntaje).sum();
        double r = Math.random() * total;
        double acumulado = 0;
        for (int i = 0; i < Knapsack1.poblacion; i++) {
            acumulado += fitnessPuntaje[i];
            if (acumulado >= r) {
                return i;
            }
        }
        return 0;
    }

    private static int[] cruzar(int[] padre, int[] madre) {
        Random random = new Random();
        int[] hijo = new int[30];
        int puntoCruce = random.nextInt(29) + 1;
        for (int i = 0; i < 30; i++) {
            if (i < puntoCruce) {
                hijo[i] = padre[i];
            } else {
                hijo[i] = madre[i];
            }
        }
        return hijo;
    }

    private static void mutar(int[] cromosoma) {
        Random random = new Random();
        for (int i = 0; i < 30; i++) {
            if (random.nextInt(100) < Knapsack1.mutacion) {
                cromosoma[i] = 1 - cromosoma[i];
            }
        }
    }

    private static double calcularValor(int[] cromosoma) {
        double valorTotal = 0;
        for (int i = 0; i < 30; i++) {
            if (cromosoma[i] == 1) {
                valorTotal += objetos[i][1];
            }
        }
        return valorTotal;
    }

    private static double calcularPeso(int[] cromosoma) {
        double pesoTotal = 0;
        for (int i = 0; i < 30; i++) {
            if (cromosoma[i] == 1) {
                pesoTotal += objetos[i][0];
            }
        }
        return pesoTotal;
    }
}
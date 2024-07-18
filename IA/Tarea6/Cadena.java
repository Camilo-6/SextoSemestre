import java.util.Scanner;
import java.util.Random;

// # Algoritmo genético para encontrar una cadena de caracteres dada desde terminal
// Al final mostrar la cadena encontrada y el número de generaciones necesarias
// Si es posible, cada 500 generaciones mostrar la mejor cadena encontrada
public class Cadena {

    private static final int poblacion = 100;
    private static boolean cadenaEncontrada = false;
    private static final int mutacion = 5;

    public static void main(String[] args) {
        // Recibir cadena desde terminal
        Scanner scanner = new Scanner(System.in);
        System.out.println("Introduce la cadena a encontrar: ");
        String cadena = scanner.nextLine();
        cadena = limpiarCadena(cadena);
        scanner.close();

        // Poblacion inicial, con cromosomas aleatorios
        // Cromosoma i, indica que caracter se incluye (0-27)
        int[][] poblacion = new int[Cadena.poblacion][cadena.length()];
        Random random = new Random();
        for (int i = 0; i < Cadena.poblacion; i++) {
            for (int j = 0; j < cadena.length(); j++) {
                poblacion[i][j] = random.nextInt(28);
            }
        }

        int[] solucion = new int[cadena.length()];

        // Evolucionar la poblacion
        int generaciones = 0;
        while (!cadenaEncontrada) {
            // Calcular el fitness de cada cromosoma
            double[] fitnessPuntaje = new double[Cadena.poblacion];
            for (int i = 0; i < Cadena.poblacion; i++) {
                fitnessPuntaje[i] = evaluarFitness(poblacion[i], cadena);
            }

            // Verificar si se encontro la cadena
            for (int i = 0; i < Cadena.poblacion; i++) {
                if (fitnessPuntaje[i] == cadena.length()) {
                    solucion = poblacion[i];
                    cadenaEncontrada = true;
                    break;
                }
            }

            // Seleccionar los mejores cromosomas
            int[][] nuevaPoblacion = new int[Cadena.poblacion][cadena.length()];
            for (int i = 0; i < Cadena.poblacion; i++) {
                int[] padres = seleccionarPadre(fitnessPuntaje);
                int padre = padres[0];
                int madre = padres[1];
                nuevaPoblacion[i] = cruzar(poblacion[padre], poblacion[madre]);
            }

            // Mutaciones
            for (int i = 0; i < Cadena.poblacion; i++) {
                mutar(nuevaPoblacion[i]);
            }

            // Reemplazar la poblacion
            poblacion = nuevaPoblacion;
            generaciones++;

            // Mostrar la mejor cadena cada 500 generaciones
            if (generaciones % 500 == 0) {
                int[] mejores = seleccionarPadre(fitnessPuntaje);
                int[] mejorCromosoma = poblacion[mejores[0]];
                System.out.println("Generacion: " + generaciones);
                System.out.println("Mejor cadena: " + cromosomaToString(mejorCromosoma));
            }
        }

        // Imprimir la mejor solucion y el numero de generaciones necesarias
        System.out.println("-----------------------------------------------------");
        System.out.println("Cadena encontrada: " + cromosomaToString(solucion));
        System.out.println("Numero de generaciones: " + generaciones);
    }

    // Limpiar la cadena de caracteres de caracteres especiales, solo dejando las letras ABCDEFGHIJKLMNÑOPQRSTUVWXYZ y el espacio
    // Transformando minusculas a mayusculas
    private static String limpiarCadena(String cadena) {
        String resultado = "";
        for (int i = 0; i < cadena.length(); i++) {
            char c = cadena.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                resultado += c;
            } else if (c >= 'a' && c <= 'z') {
                resultado += (char) (c - 32);
            } else if (c == ' ') {
                resultado += c;
            }
        }
        return resultado;
    }

    // Convertir un numero entero a un string
    private static String intToString(int n) {
        switch (n) {
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "C";
            case 3:
                return "D";
            case 4:
                return "E";
            case 5:
                return "F";
            case 6:
                return "G";
            case 7:
                return "H";
            case 8:
                return "I";
            case 9:
                return "J";
            case 10:
                return "K";
            case 11:
                return "L";
            case 12:
                return "M";
            case 13:
                return "N";
            case 14:
                return "Ñ";
            case 15:
                return "O";
            case 16:
                return "P";
            case 17:
                return "Q";
            case 18:
                return "R";
            case 19:
                return "S";
            case 20:
                return "T";
            case 21:
                return "U";
            case 22:
                return "V";
            case 23:
                return "W";
            case 24:
                return "X";
            case 25:
                return "Y";
            case 26:
                return "Z";
            case 27:
                return " ";
            default:
                return "";
        }
    }

    // Convertir un cromosoma a una cadena de caracteres
    private static String cromosomaToString(int[] cromosoma) {
        String resultado = "";
        for (int i = 0; i < cromosoma.length; i++) {
            resultado += intToString(cromosoma[i]);
        }
        return resultado;
    }


    // Calcular el fitness de un cromosoma
    private static double evaluarFitness(int[] cromosoma, String cadena) {
        double puntaje = 0;
        for (int i = 0; i < cromosoma.length; i++) {
            if (intToString(cromosoma[i]).equals(cadena.substring(i, i + 1))) {
                puntaje++;
            }
        }
        return puntaje;
    }

    // Seleccionar a los dos mejores cromosomas (deben ser diferentes)
    private static int[] seleccionarPadre(double[] fitnessPuntaje) {
        int[] padres = new int[2];
        double mejorPuntaje = Double.MIN_VALUE;
        for (int i = 0; i < fitnessPuntaje.length; i++) {
            if (fitnessPuntaje[i] > mejorPuntaje) {
                mejorPuntaje = fitnessPuntaje[i];
                padres[0] = i;
            }
        }
        double segundoMejorPuntaje = Double.MIN_VALUE;
        for (int i = 0; i < fitnessPuntaje.length; i++) {
            if (fitnessPuntaje[i] > segundoMejorPuntaje && i != padres[0]) {
                segundoMejorPuntaje = fitnessPuntaje[i];
                padres[1] = i;
            }
        }
        return padres;
    }

    // Cruzar dos cromosomas
    private static int[] cruzar(int[] padre, int[] madre) {
        Random random = new Random();
        int[] hijo = new int[padre.length];
        int puntoCruce = random.nextInt(padre.length);
        for (int i = 0; i < puntoCruce; i++) {
            hijo[i] = padre[i];
        }
        for (int i = puntoCruce; i < padre.length; i++) {
            hijo[i] = madre[i];
        }
        return hijo;
    }

    // Mutar un cromosoma
    private static void mutar(int[] cromosoma) {
        Random random = new Random();
        for (int i = 0; i < cromosoma.length; i++) {
            if (random.nextInt(100) < Cadena.mutacion) {
                cromosoma[i] = random.nextInt(28);
            }
        }
    }
}


#include <stdio.h>
#include "userprog/filesys-syscall.h"
#include "threads/synch.h"
#include "filesys/filesys.h"
#include "filesys/file.h"
#include "devices/input.h"
#include "threads/thread.h"
#include "threads/malloc.h"

static struct rlock mutex;

void filesys_syscall_init(void)
{
  rlock_init(&mutex);
}

bool filesys_syscall_create(const char *file_name, unsigned initial_size)
{
  // Resultado inicial
  bool resultado = false;
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Creamos el archivo
  resultado = filesys_create(file_name, initial_size);
  // Liberamos el candado
  rlock_release(&mutex);
  // Retornamos el resultado
  return resultado;
}

bool filesys_syscall_remove(const char *file_name)
{
  // Resultado inicial
  bool resultado = false;
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Eliminamos el archivo
  resultado = filesys_remove(file_name);
  // Liberamos el candado
  rlock_release(&mutex);
  // Retornamos el resultado
  return resultado;
}

int32_t
filesys_syscall_open(const char *file_name)
{
  // Resultado inicial
  int32_t resultado = 0;
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Abrimos el archivo
  struct file *archivo = filesys_open(file_name);
  // Liberamos el candado
  rlock_release(&mutex);
  // Si el archivo es null retornamos -1
  if (archivo == NULL)
  {
    // Regresamos -1
    resultado = -1;
  }
  else
  {
    // Si no es null, creamos un nuevo archivo abierto
    struct process_open_file *archivo_abierto = malloc(sizeof(struct process_open_file));
    // Asignamos la estructura del archivo
    archivo_abierto->file_descriptor = thread_current()->contador_archivos_abiertos++;
    archivo_abierto->file_handle = archivo;
    // Agregamos el archivo a la lista de archivos abiertos
    list_push_back(&thread_current()->archivos_abiertos, &archivo_abierto->elem);
    // Regresamos el file descriptor
    resultado = archivo_abierto->file_descriptor;
  }
  // Retornamos el resultado
  return resultado;
}

void filesys_syscall_close(int32_t file_descriptor)
{
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos la lista de archivos abiertos
  struct list *archivos_abiertos = &thread_current()->archivos_abiertos;
  // Buscamos el archivo relacionado al file descriptor
  struct list_elem *elemento;
  elemento = list_begin(archivos_abiertos);
  while (elemento != list_end(archivos_abiertos))
  {
    // Obtenemos el archivo abierto
    struct process_open_file *archivo_abierto = list_entry(elemento, struct process_open_file, elem);
    // Si el file descriptor es igual al que estamos buscando
    if (archivo_abierto->file_descriptor == file_descriptor)
    {
      // Cerramos el archivo
      file_close(archivo_abierto->file_handle);
      // Eliminamos el archivo de la lista de archivos abiertos
      list_remove(elemento);
      // Liberamos la memoria
      free(archivo_abierto);
      // Salimos del ciclo
      break;
    }
    // Avanzamos al siguiente elemento
    elemento = list_next(elemento);
  }
  // Liberamos el candado
  rlock_release(&mutex);
}

void filesys_syscall_close_all(void)
{
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos la lista de archivos abiertos
  struct list *archivos_abiertos = &thread_current()->archivos_abiertos;
  // Iteramos sobre la lista de archivos abiertos
  while (!list_empty(archivos_abiertos))
  {
    // Obtenemos el primer elemento
    struct list_elem *elemento = list_pop_front(archivos_abiertos);
    // Obtenemos el archivo abierto
    struct process_open_file *archivo_abierto = list_entry(elemento, struct process_open_file, elem);
    // Cerramos el archivo
    file_close(archivo_abierto->file_handle);
    // Liberamos la memoria
    free(archivo_abierto);
  }
}

int32_t
filesys_syscall_write(int32_t file_descriptor, const void *buffer, unsigned size)
{
  // Si el file descriptor es igual a 1
  if (file_descriptor == 1)
  {
    // Escribimos en la salida estandar
    putbuf(buffer, size);
    // Retornamos el numero de bytes escritos
    return size;
  }
  else
  {
    // Buscamos el archivo relacionado al file descriptor
    struct file *archivo = filesys_syscall_get_file_handle(file_descriptor);
    // Si el archivo es null, retornamos -1
    if (archivo == NULL)
    {
      return -1;
    }
    else
    {
      // Obtenemos el candado del archivo
      rlock_acquire(&mutex);
      // Escribimos en el archivo
      off_t resultado = file_write(archivo, buffer, size);
      // Liberamos el candado
      rlock_release(&mutex);
      // Retornamos el resultado
      return resultado;
    }
  }
}

int32_t
filesys_syscall_read(int32_t file_descriptor, void *buffer, unsigned size)
{
  // Si el file descriptor es igual a 0
  if (file_descriptor == 0)
  {
    // Leemos de la entrada estandar, size veces
    int i = 0;
    uint8_t *buffer = (uint8_t *)buffer;
    for (i = 0; i < size; i++)
    {
      // Leemos un caracter
      buffer[i] = input_getc();
    }
    // Retornamos el numero de bytes leidos
    return size;
  }
  else
  {
    // Buscamos el archivo relacionado al file descriptor
    struct file *archivo = filesys_syscall_get_file_handle(file_descriptor);
    // Si el archivo es null, retornamos -1
    if (archivo == NULL)
    {
      return -1;
    }
    else
    {
      // Obtenemos el candado del archivo
      rlock_acquire(&mutex);
      // Leemos del archivo
      off_t resultado = file_read(archivo, buffer, size);
      // Liberamos el candado
      rlock_release(&mutex);
      // Retornamos el resultado
      return resultado;
    }
  }
}

int32_t
filesys_syscall_size(int32_t file_descriptor)
{
  // Resultado inicial
  off_t resultado = 0;
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos el tamanio
  resultado = file_length(filesys_syscall_get_file_handle(file_descriptor));
  // Liberamos el candado
  rlock_release(&mutex);
  // Retornamos el resultado
  return resultado;
}

void filesys_syscall_seek(int32_t file_descriptor, unsigned position)
{
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos el archivo
  struct file *archivo = filesys_syscall_get_file_handle(file_descriptor);
  // Si el archivo no es null
  if (archivo != NULL)
  {
    // Movemos el puntero de lectura
    file_seek(archivo, position);
  }
  // Liberamos el candado
  rlock_release(&mutex);
}

unsigned
filesys_syscall_tell(int32_t file_descriptor)
{
  // Resultado inicial
  off_t resultado = 0;
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos el archivo
  struct file *archivo = filesys_syscall_get_file_handle(file_descriptor);
  // Si el archivo no es null
  if (archivo != NULL)
  {
    // Obtenemos la posicion del puntero de lectura
    resultado = file_tell(archivo);
  }
  // Liberamos el candado
  rlock_release(&mutex);
  // Retornamos el resultado
  return resultado;
}

void filesys_syscall_deny_write(int32_t file_descriptor)
{
  // Obtenemos el candado del archivo
  rlock_acquire(&mutex);
  // Obtenemos el archivo
  struct file *archivo = filesys_syscall_get_file_handle(file_descriptor);
  // Si el archivo no es null
  if (archivo != NULL)
  {
    // Denegamos la escritura
    file_deny_write(archivo);
  }
  // Liberamos el candado
  rlock_release(&mutex);
}

struct file *
filesys_syscall_get_file_handle(int32_t file_descriptor)
{
  // Buscamos el archivo dentro de la lista de archivos abiertos
  struct list_elem *elemento;
  struct list *archivos_abiertos = &thread_current()->archivos_abiertos;
  // Iteramos sobre la lista de archivos abiertos
  elemento = list_begin(archivos_abiertos);
  while (elemento != list_end(archivos_abiertos))
  {
    // Obtenemos el archivo abierto
    struct process_open_file *archivo_abierto = list_entry(elemento, struct process_open_file, elem);
    // Si el file descriptor es igual al que estamos buscando
    if (archivo_abierto->file_descriptor == file_descriptor)
    {
      // Retornamos el archivo
      return archivo_abierto->file_handle;
    }
    // Avanzamos al siguiente elemento
    elemento = list_next(elemento);
  }
  // Si no encontramos el archivo, retornamos NULL
  return NULL;
}

int32_t
filesys_syscall_locate_fd(const struct file *file)
{
  // Buscamos el file descriptor dentro de la lista de archivos abiertos
  struct list_elem *elemento;
  struct list *archivos_abiertos = &thread_current()->archivos_abiertos;
  // Iteramos sobre la lista de archivos abiertos
  elemento = list_begin(archivos_abiertos);
  while (elemento != list_end(archivos_abiertos))
  {
    // Obtenemos el archivo abierto
    struct process_open_file *archivo_abierto = list_entry(elemento, struct process_open_file, elem);
    // Si el archivo es igual al que estamos buscando
    if (archivo_abierto->file_handle == file)
    {
      // Retornamos el file descriptor
      return archivo_abierto->file_descriptor;
    }
    // Avanzamos al siguiente elemento
    elemento = list_next(elemento);
  }
  // Si no encontramos el archivo, retornamos -1
  return -1;
}

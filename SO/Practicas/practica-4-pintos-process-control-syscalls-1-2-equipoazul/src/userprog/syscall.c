#include "userprog/syscall.h"
#include <stdio.h>
#include <syscall-nr.h>
#include "threads/interrupt.h"
#include "threads/thread.h"
#include "userprog/filesys-syscall.h"
#include "userprog/validate-user-memory.h"
#include "userprog/process.h"

static void syscall_handler(struct intr_frame *);
static int32_t write_wrapper(int32_t *esp);
static void exit_wrapper(int32_t *esp);
static int32_t write(int file_descriptor, char *buffer, unsigned size);
static void exit(int exit_status);
static int32_t exec_wrapper(int32_t *esp);
static int32_t exec(char *cmd_line);
static int32_t wait_wrapper(int32_t *esp);
static int32_t wait(int cid);

void syscall_init(void)
{
  intr_register_int(0x30, 3, INTR_ON, syscall_handler, "syscall");
  filesys_syscall_init();
}

static void
syscall_handler(struct intr_frame *f UNUSED)
{
  int32_t *esp = f->esp;
  int32_t syscall = get_user_int_or_fail((uint32_t *)esp++);

  switch (syscall)
  {
  case SYS_WRITE:
  {
    f->eax = write_wrapper(esp);
    break;
  }
  // Caso de la llamada al sistema exec
  case SYS_EXIT:
  {
    exit_wrapper(esp);
    break;
  }
  // Caso de la llamada al sistema exec
  case SYS_EXEC:
  {
    f->eax = exec_wrapper(esp);
    break;
  }
  // Caso de la llamada al sistema wait
  case SYS_WAIT:
  {
    f->eax = wait_wrapper(esp);
    break;
  }
  default:
  {
    printf("unsupported syscall\n");
    thread_exit();
  }
  }
}

/* Write Syscall Implementation */
static int32_t
write_wrapper(int32_t *esp)
{
  int file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  char *buffer = (char *)get_user_int_or_fail((uint32_t *)esp++);
  unsigned size = (unsigned)get_user_int_or_fail((uint32_t *)esp++);
  return write(file_descriptor, buffer, size);
}

static int32_t
write(int file_descriptor UNUSED, char *buffer, unsigned size)
{
  putbuf(buffer, size);
  return size;
}

/* Write Syscall Implementation */
static void
exit_wrapper(int32_t *esp)
{
  int exit_status = get_user_int_or_fail((uint32_t *)esp);
  exit(exit_status);
}

static void
exit(int exit_status UNUSED)
{
  struct thread *actual = thread_current();
  // Actualizamos el estado de salida del proceso
  actual->proceso->estado_de_salida = exit_status;
  thread_exit();
}

// Wrapper para la llamada al sistema exec
static int32_t
exec_wrapper(int32_t *esp)
{
  // Obtenemos el nombre del programa a ejecutar
  char *cmd_line = (char *)get_user_int_or_fail((uint32_t *)esp);
  return exec(cmd_line);
}

// Implementacion de la llamada al sistema exec
static int32_t
exec(char *cmd_line)
{
  // Ejecutamos el programa
  return process_execute(cmd_line);
}

// Wrapper para la llamada al sistema wait
static int32_t
wait_wrapper(int32_t *esp)
{
  // Obtenemos el identificador del proceso al que se espera
  int cid = get_user_int_or_fail((uint32_t *)esp);
  return wait(cid);
}

// Implementacion de la llamada al sistema wait
static int32_t
wait(int cid)
{
  // Esperamos a que el proceso termine
  return process_wait(cid);
}

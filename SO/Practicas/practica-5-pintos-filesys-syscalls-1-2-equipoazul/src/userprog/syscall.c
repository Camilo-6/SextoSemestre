#include "userprog/syscall.h"
#include <stdint.h>
#include <stdio.h>
#include <syscall-nr.h>
#include "threads/interrupt.h"
#include "threads/thread.h"
#include "userprog/process.h"
#include "userprog/filesys-syscall.h"
#include "userprog/validate-user-memory.h"

static void syscall_handler(struct intr_frame *);
static int32_t write_wrapper(int32_t *esp);
static void exit_wrapper(int32_t *esp);
static int32_t exec_wrapper(int32_t *esp);
static int32_t wait_wrapper(int32_t *esp);
static int32_t write(int file_descriptor, char *buffer, unsigned size);
static void exit(int exit_status);
static int32_t exec(char *cmd_line);
static int32_t wait(int32_t pid);
// Metodo para create
static bool create_wrapper(int32_t *esp);
// Metodo para remove
static bool remove_wrapper(int32_t *esp);
// Metodo para open
static int32_t open_wrapper(int32_t *esp);
// Metodo para file size
static int32_t filesize_wrapper(int32_t *esp);
// Metodo para read
static int32_t read_wrapper(int32_t *esp);
// Metodo para write
static int32_t write_wrapper(int32_t *esp);
// Metodo para seek
static void seek_wrapper(int32_t *esp);
// Metodo para tell
static unsigned tell_wrapper(int32_t *esp);
// Metodo para close
static void close_wrapper(int32_t *esp);

void syscall_init(void)
{
  intr_register_int(0x30, 3, INTR_ON, syscall_handler, "syscall");
  filesys_syscall_init();
}

static void
syscall_handler(struct intr_frame *f)
{
  int32_t *esp = f->esp; // esp -> stack pointer
  int32_t syscall_number = get_user_int_or_fail((uint32_t *)esp++);

  switch (syscall_number)
  {
  // Caso para write
  case SYS_WRITE:
  {
    f->eax = write_wrapper(esp);
    break;
  }
  case SYS_EXIT:
  {
    exit_wrapper(esp);
    break;
  }
  case SYS_EXEC:
  {
    f->eax = exec_wrapper(esp);
    break;
  }
  case SYS_WAIT:
  {
    f->eax = wait_wrapper(esp);
    break;
  }
  // Caso para create
  case SYS_CREATE:
  {
    f->eax = create_wrapper(esp);
    break;
  }
  // Caso para remove
  case SYS_REMOVE:
  {
    f->eax = remove_wrapper(esp);
    break;
  }
  // Caso para open
  case SYS_OPEN:
  {
    f->eax = open_wrapper(esp);
    break;
  }
  // Caso para file size
  case SYS_FILESIZE:
  {
    f->eax = filesize_wrapper(esp);
    break;
  }
  // Caso de read
  case SYS_READ:
  {
    f->eax = read_wrapper(esp);
    break;
  }
  // Caso de seek
  case SYS_SEEK:
  {
    seek_wrapper(esp);
    break;
  }
  // Caso de tell
  case SYS_TELL:
  {
    f->eax = tell_wrapper(esp);
    break;
  }
  // Caso de close
  case SYS_CLOSE:
  {
    close_wrapper(esp);
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
  /* Codigo original
  return write(file_descriptor, buffer, size);
  */
  return filesys_syscall_write(file_descriptor, buffer, size);
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
exit(int exit_status)
{
  process_set_exit_status(exit_status);
  thread_exit();
}

/* Exec syscall*/
static int32_t
exec_wrapper(int32_t *esp)
{
  char *cmd_line = (char *)get_user_int_or_fail((uint32_t *)esp++);
  return exec(cmd_line);
}

static int32_t
exec(char *cmd_line)
{
  return process_execute(cmd_line);
}

/* wait */
static int32_t
wait_wrapper(int32_t *esp)
{
  int32_t pid = get_user_int_or_fail((uint32_t *)esp++);
  return wait(pid);
}

static int32_t
wait(int32_t pid)
{
  return process_wait(pid);
}

// Metodo para create
static bool create_wrapper(int32_t *esp)
{
  char *file_name = (char *)*esp++;
  unsigned initial_size = (unsigned)*esp++;
  return filesys_syscall_create(file_name, initial_size);
}

// Metodo para remove
static bool remove_wrapper(int32_t *esp)
{
  char *file_name = (char *)*esp++;
  return filesys_syscall_remove(file_name);
}

// Metodo para open
static int32_t open_wrapper(int32_t *esp)
{
  char *file_name = (char *)*esp++;
  return filesys_syscall_open(file_name);
}

// Metodo para file size
static int32_t filesize_wrapper(int32_t *esp)
{
  int32_t file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  return filesys_syscall_size(file_descriptor);
}

// Metodo para read
static int32_t read_wrapper(int32_t *esp)
{
  int32_t file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  char *buffer = (char *)get_user_int_or_fail((uint32_t *)esp++);
  unsigned size = (unsigned)get_user_int_or_fail((uint32_t *)esp++);
  return filesys_syscall_read(file_descriptor, buffer, size);
}

// Metodo para seek
static void seek_wrapper(int32_t *esp)
{
  int32_t file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  unsigned position = (unsigned)get_user_int_or_fail((uint32_t *)esp++);
  filesys_syscall_seek(file_descriptor, position);
}

// Metodo para tell
static unsigned tell_wrapper(int32_t *esp)
{
  int32_t file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  return filesys_syscall_tell(file_descriptor);
}

// Metodo para close
static void close_wrapper(int32_t *esp)
{
  int32_t file_descriptor = get_user_int_or_fail((uint32_t *)esp++);
  filesys_syscall_close(file_descriptor);
}
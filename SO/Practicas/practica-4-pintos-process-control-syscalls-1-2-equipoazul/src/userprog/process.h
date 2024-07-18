#ifndef USERPROG_PROCESS_H
#define USERPROG_PROCESS_H

#include "threads/thread.h"

typedef int tid_t;

struct process
{
  tid_t tid;
  // TODO: define other fields needed for a user process
  int32_t estado_de_salida;   // Estado de salida
  struct thread *thr;         // Hilo asociado al proceso
  struct list_elem elementos; // Lista elem del hilo
  struct thread *padre;       // Padre del hilo
};

tid_t process_execute(const char *file_name);
int process_wait(tid_t);
void process_exit(void);
void process_activate(void);

#endif /* userprog/process.h */

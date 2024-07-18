#ifndef USERPROG_PROCESS_H
#define USERPROG_PROCESS_H

#include <stdint.h>
#include <list.h>
#include "threads/synch.h"

typedef int tid_t;

struct process 
  {
    tid_t tid;
    struct list child_procs;
    struct list_elem elem;
    struct semaphore wait_sync;
    int32_t exit_status;
    int32_t references;
    struct lock mutex;
  };

void process_init (struct process* process, int tid);
tid_t process_execute (const char *file_name);
int process_wait (tid_t);
void process_exit (void);
void process_activate (void);
void process_set_exit_status (int32_t);
int32_t process_get_exit_status (void);

#endif /* userprog/process.h */

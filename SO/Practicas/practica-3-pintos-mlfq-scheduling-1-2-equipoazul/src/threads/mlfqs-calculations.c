#include "threads/thread.h"
#include "threads/mlfqs-calculations.h"
#include <stdlib.h>

fixpoint_t
mlfqs_calculate_load_avg(fixpoint_t load_avg UNUSED, int active_threads UNUSED)
{
    /* Not yet implemented */
    fixpoint_t num1 = rational_to_fixpoint(59, 60);
    fixpoint_t num2 = rational_to_fixpoint(1, 60);
    fixpoint_t num3 = fixpoint_mult(num1, load_avg);
    fixpoint_t num4 = fixpoint_mult(num2, int_to_fixpoint(active_threads));
    return num3 + num4;
}

fixpoint_t
mlfqs_calculate_recent_cpu(fixpoint_t recent_cpu UNUSED, int nice UNUSED, fixpoint_t load_avg UNUSED)
{
    /* Not yet implemented */
    fixpoint_t num1 = fixpoint_mult(load_avg, int_to_fixpoint(2));
    fixpoint_t num2 = num1 + int_to_fixpoint(1);
    fixpoint_t num3 = fixpoint_div(num1, num2);
    fixpoint_t num4 = fixpoint_mult(num3, recent_cpu);
    fixpoint_t num5 = int_to_fixpoint(nice);
    return num4 + num5;
}

int mlfqs_calculate_priority(fixpoint_t recent_cpu UNUSED, int nice UNUSED)
{
    /* Not yet implemented */
    fixpoint_t num1 = int_to_fixpoint(PRI_MAX);
    fixpoint_t num2 = fixpoint_div(recent_cpu, int_to_fixpoint(4));
    fixpoint_t num4 = num1 - num2;
    fixpoint_t num5 = int_to_fixpoint(2 * nice);
    int result = fixpoint_to_int(num4 - num5);
    if (result < PRI_MIN)
    {
        return PRI_MIN;
    }
    else if (result > PRI_MAX)
    {
        return PRI_MAX;
    }
    return result;
}

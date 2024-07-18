#include <stdlib.h>
#include <stdio.h>
#include "connect4.h"

void connect4_init(connect4 *game, int rows, int columns, int num_of_players, int win_size)
{
  if (rows <= 0)
    rows = DEFAULT_ROWS;
  if (columns <= 0)
    columns = DEFAULT_COLUMNS;
  if (num_of_players <= 0)
    num_of_players = DEFAULT_PLAYERS;
  if (win_size <= 0)
    win_size = DEFAULT_WIN_SIZE;
  game->rows = rows;
  game->columns = columns;
  game->num_of_players = num_of_players;
  game->win_size = win_size;
  game->board = (int **)malloc(rows * sizeof(int *));
  for (int i = 0; i < rows; i++)
  {
    game->board[i] = (int *)malloc(columns * sizeof(int));
    for (int j = 0; j < columns; j++)
    {
      game->board[i][j] = 0;
    }
  }
}

void connect4_free(connect4 *game)
{
  if (game == NULL)
  {
    return;
  }
  for (int i = 0; i < game->rows; i++)
  {
    free(game->board[i]);
  }
  free(game->board);
}

char *
connect4_to_string(connect4 *game)
{
  int rows = game->rows;
  int columns = game->columns;
  char *str = (char *)malloc((rows * columns + rows + 1) * sizeof(char));
  int k = 0;
  for (int i = 0; i < rows; i++)
  {
    for (int j = 0; j < columns; j++)
    {
      str[k++] = game->board[i][j] + '0';
    }
    if (i < rows - 1)
      str[k++] = '\n';
  }
  str[k] = '\0';
  return str;
}

int connect4_make_play(connect4 *game, int player, int column)
{
  if (player < 1 || player > game->num_of_players)
  {
    return INVALID_PLAYER;
  }
  if (column < 0 || column >= game->columns)
  {
    return INVALID_COLUMN;
  }
  for (int i = game->rows - 1; i >= 0; i--)
  {
    if (game->board[i][column] == 0)
    {
      game->board[i][column] = player;
      return game->rows - i - 1;
    }
  }
  return FULL_COLUMN;
}

bool connect4_player_won(connect4 *game, int player, int row, int column)
{
  int rows = game->rows;
  int columns = game->columns;
  int win_size = game->win_size;
  row = rows - row - 1;
  int count = 0;
  // Check horizontal
  for (int i = 0; i < columns; i++)
  {
    if (game->board[row][i] == player)
    {
      count++;
      if (count == win_size)
      {
        return true;
      }
    }
    else
    {
      count = 0;
    }
  }
  // Check vertical
  count = 0;
  for (int i = 0; i < rows; i++)
  {
    if (game->board[i][column] == player)
    {
      count++;
      if (count == win_size)
      {
        return true;
      }
    }
    else
    {
      count = 0;
    }
  }
  // Check diagonal
  count = 0;
  for (int i = -win_size + 1; i < win_size; i++)
  {
    if (row + i >= 0 && row + i < rows && column + i >= 0 && column + i < columns)
    {
      if (game->board[row + i][column + i] == player)
      {
        count++;
        if (count == win_size)
        {
          return true;
        }
      }
      else
      {
        count = 0;
      }
    }
  }
  count = 0;
  for (int i = -win_size + 1; i < win_size; i++)
  {
    if (row - i >= 0 && row - i < rows && column + i >= 0 && column + i < columns)
    {
      if (game->board[row - i][column + i] == player)
      {
        count++;
        if (count == win_size)
        {
          return true;
        }
      }
      else
      {
        count = 0;
      }
    }
  }
  return false;
}

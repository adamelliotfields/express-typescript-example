import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Todo } from '../entities/todo.entity';

/**
 * GET /todos
 */
export async function findTodos(req: Request, res: Response): Promise<Response | void> {
  const todos = await getConnection()
    .createQueryBuilder()
    .select('t')
    .from(Todo, 't')
    .getMany();

  return res.status(200).json(todos);
}

/**
 * POST /todos
 */
export async function insertTodo(req: Request, res: Response): Promise<void | Response> {
  // TypeORM will mutate the objects you pass to .values(), so make a copy
  const body = { ...req.body };

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Todo)
    .values([body])
    .execute();

  return res.status(200).json(body);
}

/**
 * GET /todos/:id
 */
// TODO
// export async function findTodo(req: Request, res: Response) {}

/**
 * PUT /todos/:id
 */
// TODO
// export async function updateTodo(req: Request, res: Response) {}

/**
 * DELETE /todos/:id
 */
// TODO
// export async function deleteTodo(req: Request, res: Response) {}

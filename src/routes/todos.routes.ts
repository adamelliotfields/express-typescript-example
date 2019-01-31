import express from 'express';
import { celebrate } from 'celebrate';

import { findTodos, insertTodo } from '../controllers/todos.controller';
import { insertTodoSchema } from '../schemas/todo.schemas';
import { wrap } from '../utils';

const todos = express.Router();

// Make sure to wrap all async route handlers
todos
  .route('/todos')
  .get(wrap(findTodos))
  .post(celebrate({ body: insertTodoSchema }), wrap(insertTodo));

// TODO
// todos
//   .route('/todos/:id')
//   .get()
//   .put()
//   .delete();

export { todos };

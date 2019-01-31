import Joi from 'joi';

export const insertTodoSchema = Joi.object().keys({
  todo: Joi.string().min(1).required(),
  done: Joi.boolean().required(),
});

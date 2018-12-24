import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Boom from 'boom';

import DB, { Message } from '../db/DB';
import messageSchema from '../schemas/message-schema';

const db = DB.getDB();

/**
 * GET /messages
 */
export function getMessages(req: Request, res: Response): Response {
  const messages = db.getMessages();

  return res.status(200).json(messages);
}

/**
 * POST /messages
 */
export function postMessages(req: Request, res: Response, next: NextFunction): void | Response {
  const { error } = Joi.validate(req.body, messageSchema, { convert: false });

  if (error !== null) {
    const badRequest = Boom.badRequest(error.message);
    return next(badRequest);
  }

  db.addMessage(req.body as Message);

  return res.status(200).json(req.body);
}

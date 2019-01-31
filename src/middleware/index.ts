import Boom from 'boom';
import { isCelebrate } from 'celebrate';
import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

/**
 * Handles not found requests.
 */
export function notFound(): RequestHandler {
  return (req: Request, res: Response): Response => {
    const { statusCode, payload } = Boom.notFound().output;
    return res.status(statusCode).json(payload);
  };
}

/**
 * Handles all errors.
 */
export function errors(): ErrorRequestHandler {
  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void | Response => {
    // Delegate to the default Express error handler if headers have already been sent
    // https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
    if (res.headersSent) return next(err);

    // Send 400 for validation errors, otherwise 500
    const { output } = isCelebrate(err) ? Boom.badRequest(err.message) : Boom.boomify(err);
    const { statusCode, payload } = output;

    return res.status(statusCode).json(payload);
  };
}

import { Request, Response, NextFunction } from 'express';
import Boom from 'boom';

/**
 * Handles 404 requests by creating an Error object and forwarding to the error handler.
 */
export function handleNotFound(req: Request, res: Response, next: NextFunction): void {
  const notFound = Boom.notFound();
  return next(notFound);
}

/**
 * Handles all errors by sending the Error object or a new Error object.
 */
export function handleError(
  err: Error | Boom<any>,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  if (res.headersSent) return next(err);

  // Use the Boom error or boomify the Error object
  const { output } = Boom.isBoom(err) ? err : Boom.boomify(err);
  const { statusCode, payload } = output;

  return res.status(statusCode).json(payload);
}

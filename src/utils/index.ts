import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

/**
 * Normalize a port into a string, number or boolean.
 */
export function normalizePort(val: string): string | number | boolean {
  const port = parseInt(val, 10);

  // Named pipe
  if (Number.isNaN(port)) return val;

  // Port number
  if (port >= 0) return port;

  return false;
}

/**
 * Wrap an async function and call next(err) if the Promise rejects.
 * @see https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#using-es7-asyncawait
 */
export function wrap(handler: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => handler(req, res, next).catch(next);
}

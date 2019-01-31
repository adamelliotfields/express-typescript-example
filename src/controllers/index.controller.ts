import { Request, Response } from 'express';
import http from 'http';

/**
 * GET /
 */
export function getIndex(req: Request, res: Response): Response {
  return res.status(200).json({
    statusCode: 200,
    message: http.STATUS_CODES[200],
  });
}

/**
 * GET /favicon.ico
 */
export function getFavicon(req: Request, res: Response): Response {
  return res.sendStatus(204);
}

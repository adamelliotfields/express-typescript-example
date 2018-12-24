import onHeaders from 'on-headers';
import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

/**
 * Remove headers from a Response object.
 */
export default function removeHeaders(headers: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (headers.length) {
      onHeaders(res, (): void => {
        const headerNames = res.getHeaderNames();

        headers.forEach((header: string): void => {
          if (headerNames.includes(header)) {
            res.removeHeader(header);
          }
        });
      });
    }

    return next();
  };
}

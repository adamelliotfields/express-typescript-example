import debug from 'debug';
import http from 'http';

import { app } from '../app/app';

const port: string | number | boolean = app.get('port');

// Create HTTP server
const server = http.createServer(app);

// Event listener for HTTP server "error" event
const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug('server:error')(`${bind} requires elevated privileges`);
      return process.exit(1);
    case 'EADDRINUSE':
      debug('server:error')(`${bind} is already in use`);
      return process.exit(1);
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event
const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug('server')(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);

export { server };

import debug from 'debug';
import http from 'http';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';

import app from './app/app';
import normalizePort from './utils/normalize-port';

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '3000');

// Get host from environment and store in Express
const host = process.env.HOST || '0.0.0.0';

app.set('port', port);
app.set('host', host);

// Create HTTP server
const server = http.createServer(app);

// Event listener for HTTP server "error" event
const onError = (error: any): void => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      /* eslint-disable-next-line no-console */
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      /* eslint-disable-next-line no-console */
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
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

createTerminus(
  server,
  {
    // Server health endpoint
    // Promise should resolve if ok, reject on error (e.g., cannot connect to database)
    healthChecks: {
      '/health': (): Promise<undefined> => new Promise(resolve => resolve()),
    },
    // Listen for these signals
    // SIGUSR2 is sent by Nodemon
    signals: [
      'SIGTERM',
      'SIGINT',
      'SIGUSR2',
    ],
    // Event listener for Terminus "signal" event
    onSignal(): Promise<undefined> {
      return new Promise((resolve) => {
        // Terminus will call server.close for you using the stoppable package
        debug('server')('Shutting down');
        return resolve();
      });
    },
  } as TerminusOptions,
);

// Listen on provided port, on provided network interface
server.listen({ host, port });
server.on('error', onError);
server.on('listening', onListening);

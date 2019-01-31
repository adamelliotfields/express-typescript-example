import 'reflect-metadata';

import debug from 'debug';
import fs from 'fs-extra';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

import { app } from './app/app';
import { server } from './server/server';
import { Todo } from './entities/todo.entity';

const host = app.get('host');
const port = app.get('port');

const terminusOptions: TerminusOptions = {
  // Server health endpoint
  // Promise should resolve if ok, reject on error
  healthChecks: {
    '/healthz': () => getConnection().isConnected
      ? Promise.resolve()
      : Promise.reject(new Error('Database connection not established.')),
  },
  // Listen for these signals
  // SIGUSR2 is sent by Nodemon
  signals: [
    'SIGTERM',
    'SIGINT',
    'SIGUSR2',
  ],
  // Event listener for Terminus "signal" event
  async onSignal() {
    // Terminus will call server.close for you using the stoppable package
    debug('server')('Gracefully shutting down');
    await getConnection().close();
  },
};

(async function main() {
  try {
    const connectionOptions = await getConnectionOptions();

    // Ensure the database file exists
    await fs.ensureFile(connectionOptions.database as string);

    await createConnection({
      ...connectionOptions,
      entities: [Todo],
    });

    createTerminus(
      server,
      terminusOptions,
    );

    // Listen on provided port, on provided network interface
    server.listen({ host, port });
  } catch (error) {
    debug('server:error')(error);
    process.exit(0);
  }
}());

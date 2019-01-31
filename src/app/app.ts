import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

import { notFound, errors } from '../middleware';
import { router } from '../router/router';
import { normalizePort } from '../utils';

const app = express();
const { HOST, PORT, NODE_ENV } = process.env;

// Get port and host from environment
const host = HOST as string;
const port = normalizePort(PORT as string);

// Store host and port
app.set('port', port);
app.set('host', host);

// Don't log when running tests
if (NODE_ENV !== 'test') {
  app.use(logger(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use(helmet());
app.use(cors());
app.use(compression());
// express.json is just bodyParser.json re-exported
app.use(express.json());

// Routes
app.use(router);

// Handle 404
app.use(notFound());

// Handle all errors
app.use(errors());

export { app };

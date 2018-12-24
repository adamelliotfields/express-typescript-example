import Express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import removeHeaders from '../middlewares/remove-headers';
import indexRouter from '../routers/index-router';
import messagesRouter from '../routers/messages-router';
import { handleNotFound, handleError } from '../handlers/app-handlers';

const app = Express();
const { NODE_ENV } = process.env;

if (NODE_ENV !== 'test') {
  app.use(logger(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Remove headers added by apicache
app.use(removeHeaders(['apicache-store', 'apicache-version']));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(Express.json());

// Route handlers
app.use(indexRouter);
app.use(messagesRouter);

// Catch 404 and forward to error handler
app.use(handleNotFound);

// Error handler
app.use(handleError);

export default app;

import Express from 'express';
import apicache from 'apicache';

import { getFavicon, getIndex } from '../handlers/index-handlers';

const indexRouter = Express.Router();
const cache = apicache.middleware;

indexRouter.get('/favicon.ico', getFavicon);

indexRouter.get('/', cache('1 minute'), getIndex);

export default indexRouter;

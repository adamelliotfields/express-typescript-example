import Express from 'express';

import { getMessages, postMessages } from '../handlers/messages-handlers';

const messagesRouter = Express.Router();

messagesRouter.get('/messages', getMessages);

messagesRouter.post('/messages', postMessages);

export default messagesRouter;

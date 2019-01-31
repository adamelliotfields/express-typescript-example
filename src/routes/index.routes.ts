import express from 'express';

import { getFavicon, getIndex } from '../controllers/index.controller';

const index = express.Router();

index.get('/favicon.ico', getFavicon);
index.get('/', getIndex);

export { index };

import express from 'express';

import { index } from '../routes/index.routes';
import { todos } from '../routes/todos.routes';

const router = express.Router();

router.use(index);
router.use(todos);

export { router };

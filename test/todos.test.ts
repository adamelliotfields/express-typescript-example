/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs-extra';
import path from 'path';
import request from 'supertest';
import test from 'ava';
import { createConnection, getConnection } from 'typeorm';

import { app } from '../src/app/app';
import { Todo } from '../src/entities/todo.entity';

const database = path.resolve(__dirname, '../database/database.test.db');

test.before(async () => {
  await fs.ensureFile(database);

  await createConnection({
    database,
    type: 'sqlite',
    entities: [Todo],
    synchronize: true,
  });
});

test.after.always(async () => {
  await getConnection().close();

  await fs.remove(database);
});

test('it should not allow invalid payloads', async (t) => {
  const { status } = await request(app).post('/todos').send({ todo: '', done: '' });

  t.is(status, 400);
});

test('it should not allow invalid schemas', async (t) => {
  const { status } = await request(app).post('/todos').send({ foo: 'bar' });

  t.is(status, 400);
});

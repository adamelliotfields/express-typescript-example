/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
import test from 'ava';

import { app } from '../src/app/app';

test('it should return 200', async (t) => {
  const { status } = await request(app).get('/');

  t.is(status, 200);
});

test('it should return 204 when requesting favicon', async (t) => {
  const { status } = await request(app).get('/favicon.ico');

  t.is(status, 204);
});

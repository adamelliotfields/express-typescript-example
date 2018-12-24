/* eslint-disable-next-line import/no-extraneous-dependencies */
import request from 'supertest';

import app from '../app/app';
import DB, { Message } from '../db/DB';

/**
 * GET /
 */
describe('GET /', (): void => {
  test('it should return 200', async (): Promise<number> => {
    const { status } = await request(app).get('/');

    return expect(status).toBe(200);
  });

  test('it should return 204 when requesting favicon', async (): Promise<number> => {
    const { status } = await request(app).get('/favicon.ico');

    return expect(status).toBe(204);
  });
});

/**
 * POST /messages
 */
describe('POST /messages', (): void => {
  const db = DB.getDB();

  test('it should write to the database', async (): Promise<Message[]> => {
    await request(app).post('/messages').send({ message: 'foo' });

    const messages = db.getMessages();

    return expect(messages).toEqual([{ message: 'foo' }]);
  });

  test('it should not allow invalid payloads', async (): Promise<number> => {
    const { status } = await request(app).post('/messages').send({ message: 'FOO' });

    return expect(status).toBe(400);
  });

  test('it should not allow invalid schemas', async (): Promise<number> => {
    const { status } = await request(app).post('/messages').send({ foo: 'bar' });

    return expect(status).toBe(400);
  });
});

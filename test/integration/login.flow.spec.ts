import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';

describe('Login Flow', () => {
    test('login Return StatusCode 200', async () => {
        const response = await request(server).get(base + '/login');

        expect(response.statusCode).toBe(200);
    });

    test('login Return Payload {}', async () => {
        const response = await request(server).get(base + '/login');

        expect(response.body).toEqual({});
    });
});

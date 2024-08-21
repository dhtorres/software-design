import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';

describe('Login Flow', () => {
    test('my test', async () => {
        const response = await request(server).get(base + '/login');

        expect(response.statusCode).toBe(200);
    });
});

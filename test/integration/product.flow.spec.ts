import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';

describe('Product Flow', () => {
    test('create Return StatusCode 200', async () => {
        const response = await request(server)
            .post(base + '/product')
            .send();

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload', async () => {
        const response = await request(server)
            .post(base + '/product')
            .send();

        expect(response.body).toEqual({ test: 'test' });
    });
});

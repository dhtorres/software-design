import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';

describe('Health Flow', () => {
    it('healthCheck Retorna StatusCode 204', async () => {
        const response = await request(server).get(base + '/healthcheck');
        expect(response.statusCode).toBe(204);
    });
});

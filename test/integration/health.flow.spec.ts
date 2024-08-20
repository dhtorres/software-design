import request from 'supertest';
import { server } from '../../src/server/server';

describe('Health Flow', () => {
	const base = '/api/v1';

	it('healthCheck Retorna StatusCode 204', async () => {
		const response = await request(server).get(base + '/healthcheck');
		expect(response.statusCode).toBe(204);
	});
});

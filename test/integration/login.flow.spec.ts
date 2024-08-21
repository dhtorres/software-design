import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { User } from '../../src/app/mongoose/user.model';

describe('Login Flow', () => {
    const body = { username: 'test', password: 'test' };
    const dbUser = { password: 'test' };

    test('login Return StatusCode 404', async () => {
        User.findOne = jest.fn().mockResolvedValue(undefined);

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.statusCode).toBe(404);
    });

    test('login Return StatusCode 401', async () => {
        User.findOne = jest.fn().mockResolvedValue({ password: 'incorrect' });

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.statusCode).toBe(401);
    });

    test('login Return StatusCode 200', async () => {
        User.findOne = jest.fn().mockResolvedValue(dbUser);

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('login Return Payload {}', async () => {
        User.findOne = jest.fn().mockResolvedValue(dbUser);

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.body).toEqual({ token: 'super-ultra-mega-token' });
    });
});

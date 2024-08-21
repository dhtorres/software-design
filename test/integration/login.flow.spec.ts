import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { User } from '../../src/app/mongoose/user.model';
import { Token } from '../../src/app/login/token.model';

describe('Login Flow', () => {
    const body = { username: 'test', password: 'test' };

    const dbUser = {
        username: 'dtorres',
        name: 'Daniel',
        lastName: 'Torres',
        email: 'admin@email.com',
        password: 'test',
        rol: 'ADMIN',
    };

    const token = 'token-super-ultra-secreto';

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
        Token.prototype.sign = jest.fn().mockReturnValue(token);

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('login Return Payload {}', async () => {
        User.findOne = jest.fn().mockResolvedValue(dbUser);
        Token.prototype.sign = jest.fn().mockReturnValue(token);

        const response = await request(server)
            .post(base + '/login')
            .send(body);

        expect(response.body).toEqual({ token });
    });
});

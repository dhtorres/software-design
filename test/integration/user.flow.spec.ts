import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { User } from '../../src/app/mongoose/user.model';

describe('User Flow', () => {
    const body = {
        name: 'Daniel',
        lastName: 'Torres',
        username: 'dtorres',
        password: 'super-ultra-mega-password',
        email: 'mi-super-email@email.com',
        rol: 'ADMIN',
    };

    test('create Return StatusCode 200', async () => {
        User.prototype.save = jest.fn().mockResolvedValue({});

        const response = await request(server)
            .post(base + '/user')
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload User', async () => {
        User.prototype.save = jest.fn().mockResolvedValue({});

        const response = await request(server)
            .post(base + '/user')
            .send(body);

        expect(response.body).toEqual(body);
    });
});

import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { IToken, Token } from '../../src/app/login/token.model';
import { Rol } from '../../src/app/mongoose/rol.enum';

describe('Product Flow', () => {
    const url = base + '/product';
    const token = 'super-token';
    let user: IToken;

    beforeEach(() => {
        user = {
            username: 'dtorres',
            name: 'Daniel',
            lastName: 'Torres',
            email: 'admin@email.com',
            rol: 'ADMIN',
        };
    });

    test('create Return StatusCode 200', async () => {
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload', async () => {
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.body).toEqual({ test: 'test' });
    });

    test('create Return StatusCode 401 | Without Authorization', async () => {
        const response = await request(server).post(url).send();

        expect(response.statusCode).toBe(401);
    });

    test('create Return Message 401 | Without Authorization', async () => {
        const response = await request(server).post(url).send();

        const expected = { message: 'Authorization Header is Empty' };
        expect(response.body).toEqual(expected);
    });

    test('create Return StatusCode 401 | Invalid Token', async () => {
        Token.prototype.decode = jest.fn().mockImplementation(() => {
            throw 'test';
        });

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(401);
    });

    test('create Return Message 401 | Invalid Token', async () => {
        Token.prototype.decode = jest.fn().mockImplementation(() => {
            throw 'test';
        });

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        const expected = { message: 'Invalid Token' };
        expect(response.body).toEqual(expected);
    });

    test('create Return Message 401 | Action NOT Allowed', async () => {
        user.rol = Rol.CUSTOMER;
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        const expected = { message: 'Action Not Allowed' };
        expect(response.body).toEqual(expected);
    });

    test('create Return StatusCode 401 | Action NOT Allowed', async () => {
        user.rol = Rol.CUSTOMER;
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(401);
    });
});

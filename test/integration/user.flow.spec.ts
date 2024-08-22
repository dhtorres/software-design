import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { User } from '../../src/app/mongoose/user.model';
import { IToken, Token } from '../../src/app/login/token.model';
import { Rol } from '../../src/app/mongoose/rol.enum';

describe('User Flow', () => {
    const url = base + '/user';
    const token = 'super-token';
    let user: IToken;

    const body = {
        name: 'Daniel',
        lastName: 'Torres',
        username: 'dtorres',
        password: 'super-ultra-mega-password',
        email: 'mi-super-email@email.com',
        rol: 'ADMIN',
    };

    beforeEach(() => {
        user = {
            username: 'dtorres',
            name: 'Daniel',
            lastName: 'Torres',
            email: 'admin@email.com',
            rol: 'ADMIN',
        };
    });

    test('create Return StatusCode 401 | Without Authorization', async () => {
        const response = await request(server).post(url).send(body);

        expect(response.statusCode).toBe(401);
    });

    test('create Return Error Message for 401 | Without Authorization', async () => {
        const response = await request(server).post(url).send(body);

        const expected = { message: 'Authorization Header is Empty' };
        expect(response.body).toEqual(expected);
    });

    test('create Return StatusCode 401 | Invalid Token', async () => {
        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.statusCode).toBe(401);
    });

    test('create Return Error Message for 401 | Invalid Token', async () => {
        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        const expected = { message: 'Invalid Token' };
        expect(response.body).toEqual(expected);
    });

    test('create Return StatusCode 401 | Action NOT Allowed', async () => {
        user.rol = Rol.CUSTOMER;
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.statusCode).toBe(401);
    });

    test('create Return Error Message for 401 | Action NOT Allowed', async () => {
        user.rol = Rol.CUSTOMER;
        Token.prototype.decode = jest.fn().mockReturnValue(user);
        Token.prototype.isValid = jest.fn().mockReturnValue(true);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        const expected = { message: 'Action Not Allowed' };
        expect(response.body).toEqual(expected);
    });

    test('create Return StatusCode 200', async () => {
        User.prototype.save = jest.fn().mockResolvedValue({});
        Token.prototype.decode = jest.fn().mockReturnValue(user);
        Token.prototype.isValid = jest.fn().mockReturnValue(true);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload User', async () => {
        User.prototype.save = jest.fn().mockResolvedValue({});
        Token.prototype.decode = jest.fn().mockReturnValue(user);
        Token.prototype.isValid = jest.fn().mockReturnValue(true);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.body).toEqual(body);
    });
});

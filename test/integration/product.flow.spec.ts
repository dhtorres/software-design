import request from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { IToken, Token } from '../../src/app/login/token.model';
import { Rol } from '../../src/app/mongoose/rol.enum';
import { Product } from '../../src/app/mongoose/product.model';

describe('Product Flow', () => {
    const url = base + '/product';
    const token = 'Bearer super-token';
    let user: IToken;

    const body = {
        code: 'A1',
        name: 'product super cool',
        description: 'El producto que te hará feliz!',
        stock: 10,
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

    test('create Return StatusCode 200', async () => {
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        Product.findOne = jest.fn().mockResolvedValue(undefined);
        Product.prototype.save = jest.fn().mockResolvedValue({});

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload', async () => {
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
        Token.prototype.decode = jest.fn().mockReturnValue(user);
        Product.findOne = jest.fn().mockResolvedValue(undefined);

        const savedProduct = { id: 'super-id' };
        Product.prototype.save = jest.fn().mockResolvedValue(savedProduct);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.body).toEqual(savedProduct);
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
        Token.prototype.isValid = jest.fn().mockReturnValue(false);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(401);
    });

    test('create Return Message 401 | Invalid Token', async () => {
        Token.prototype.isValid = jest.fn().mockReturnValue(false);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        const expected = { message: 'Invalid Token' };
        expect(response.body).toEqual(expected);
    });

    test('create Return Message 401 | Action NOT Allowed', async () => {
        user.rol = Rol.CUSTOMER;
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
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
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(401);
    });

    test('create Return StatusCode 400 | Body Incorrect', async () => {
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        expect(response.statusCode).toBe(400);
    });

    test('create Return Message 400 | Body Incorrect', async () => {
        Token.prototype.isValid = jest.fn().mockReturnValue(true);
        Token.prototype.decode = jest.fn().mockReturnValue(user);

        const response = await request(server)
            .post(url)
            .set('authorization', token)
            .send();

        const expected = [
            {
                location: 'body',
                msg: 'Campo Requerido',
                path: 'code',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'El Campo debe ser String',
                path: 'code',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'Campo Requerido',
                path: 'name',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'El Campo debe ser String',
                path: 'name',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'Campo Requerido',
                path: 'description',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'El Campo debe ser String',
                path: 'description',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'Campo Requerido',
                path: 'stock',
                type: 'field',
            },
            {
                location: 'body',
                msg: 'El Campo debe ser Numérico',
                path: 'stock',
                type: 'field',
            },
        ];

        expect(response.body).toEqual(expected);
    });
});

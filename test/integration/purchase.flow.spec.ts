import supertest from 'supertest';
import { server } from '../../src/server/server';
import { base } from '../../src/routes';
import { Product } from '../../src/app/mongoose/product.model';
import { Purchase } from '../../src/app/mongoose/purchase.model';

describe('Purchase Flow', () => {
    const url = base + '/purchase';
    const token = 'Bearer super-token';
    const product = { save() {} };

    const products = [
        {
            _id: '66c741a19b6a7df1980b0e09',
            code: 'S1',
            name: 'Super Producto',
            description: 'Este producto te hará feliz!',
            stock: 10,
            __v: 0,
        },
        {
            _id: '66c743b89b6a7df1980b0e0b',
            code: 'S2',
            name: 'Producto Estrella',
            description: 'Este producto te llevará al cielo!',
            stock: 15,
            __v: 0,
        },
        {
            _id: '66c7825039da64059c83b385',
            code: 'S3',
            name: 'Producto Estelar',
            description: 'Con este producto brillarás!',
            stock: 20,
            __v: 0,
        },
    ];

    const body = {
        purchases: [
            {
                id: 'super-id',
                code: 'S1',
                quantity: 1,
                userId: '66c7718137ab534a74c12695',
            },
            {
                id: 'super-id',
                code: 'S2',
                quantity: 1,
                userId: '66c7718137ab534a74c12695',
            },
        ],
    };

    test('create Return StatusCode 200', async () => {
        Product.findOne = jest.fn().mockResolvedValue(product);
        Purchase.prototype.save = jest.fn().mockResolvedValue({});
        Product.find = jest.fn().mockResolvedValue(products);

        const response = await supertest(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        expect(response.statusCode).toBe(200);
    });

    test('create Return Payload', async () => {
        Product.findOne = jest.fn().mockResolvedValue(product);
        Purchase.prototype.save = jest.fn().mockResolvedValue({});
        Product.find = jest.fn().mockResolvedValue(products);

        const response = await supertest(server)
            .post(url)
            .set('authorization', token)
            .send(body);

        const expected = [
            { code: 'S1', stock: 10 },
            { code: 'S2', stock: 15 },
            { code: 'S3', stock: 20 },
        ];

        expect(response.body).toEqual(expected);
    });
});

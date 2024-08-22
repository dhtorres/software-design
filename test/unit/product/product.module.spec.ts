import { IProduct, Product } from '../../../src/app/mongoose/product.model';
import { ProductModule } from '../../../src/app/product/product.module';

describe('Product Module', () => {
    let module: ProductModule;

    beforeEach(() => {
        module = new ProductModule();
    });

    test('create Return Success', async () => {
        Product.findOne = jest.fn().mockResolvedValue(undefined);

        const productSaved = { id: 'super-id' };
        Product.prototype.save = jest.fn().mockResolvedValue(productSaved);

        const product: IProduct = {
            code: 'S1',
            name: 'Mock Name',
            description: 'Mock Description',
            stock: 0,
        };

        const result = await module.create(product);

        const expected = { code: 200, data: productSaved };

        expect(result).toEqual(expected);
    });

    test('create Return Forbidden', async () => {
        Product.findOne = jest.fn().mockResolvedValue({});

        const product: IProduct = {
            code: 'S1',
            name: 'Mock Name',
            description: 'Mock Description',
            stock: 0,
        };

        const result = await module.create(product);

        const expected = {
            code: 403,
            data: { message: 'Product Already Exist' },
        };

        expect(result).toEqual(expected);
    });
});

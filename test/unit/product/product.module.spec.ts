import { IProduct, Product } from '../../../src/app/mongoose/product.model';
import { ProductModule } from '../../../src/app/product/product.module';

describe('Product Module', () => {
    let module: ProductModule;

    const product: IProduct = {
        code: 'S1',
        name: 'Mock Name',
        description: 'Mock Description',
        stock: 0,
    };

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

        const result = await module.create(product);

        const expected = {
            code: 403,
            data: { message: 'Product Already Exist' },
        };

        expect(result).toEqual(expected);
    });

    test('edit Return Success', async () => {
        const updatedProduct = { id: 'updated-id' };
        Product.findOne = jest.fn().mockResolvedValue({
            save() {
                return updatedProduct;
            },
        });

        const result = await module.edit(product);

        const expected = { code: 200, data: updatedProduct };

        expect(result).toEqual(expected);
    });

    test('edit Return Not Found', async () => {
        Product.findOne = jest.fn().mockResolvedValue(undefined);

        const result = await module.edit(product);

        const expected = { code: 404, data: { message: 'Product Not Found' } };

        expect(result).toEqual(expected);
    });

    test('edit Return Internal Error', async () => {
        Product.findOne = jest.fn().mockResolvedValue({
            save() {
                throw 'Test Exception';
            },
        });

        const result = await module.edit(product);

        const expected = { code: 500, data: 'Test Exception' };

        expect(result).toEqual(expected);
    });

    test('delete Return Not Found', async () => {
        Product.findOne = jest.fn().mockResolvedValue(undefined);

        const result = await module.delete(product);

        const expected = { code: 404, data: { message: 'Product Not Found' } };

        expect(result).toEqual(expected);
    });

    test('delete Return No Content', async () => {
        Product.findOne = jest.fn().mockResolvedValue({
            deleteOne() {},
        });

        const result = await module.delete(product);

        const expected = { code: 204 };

        expect(result).toEqual(expected);
    });

    test('delete Return Internal Error', async () => {
        Product.findOne = jest.fn().mockResolvedValue({
            deleteOne() {
                throw 'Test Exception';
            },
        });

        const result = await module.delete(product);

        const expected = { code: 500, data: 'Test Exception' };

        expect(result).toEqual(expected);
    });
});

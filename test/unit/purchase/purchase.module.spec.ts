import { PurchaseModule } from '../../../src/app/purchase/purchase.module';

xdescribe('Purchase Module', () => {
    let module: PurchaseModule;

    const purchases = [
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
    ];

    beforeEach(() => {
        module = new PurchaseModule();
    });

    test('create Return Success', async () => {



        const result = await module.create(purchases);

        const expected = { code: 200, data: { test: 'test' } };

        expect(result).toEqual(expected);
    });
});

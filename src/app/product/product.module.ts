import { Module } from '../base/module';
import { IProduct } from '../mongoose/product.model';
import { ProductBuilder } from './product.builder';
import { ProductValidator } from './product.validator';

export class ProductModule extends Module {
    private validator = new ProductValidator();
    private productBuilder = new ProductBuilder();

    public async create(product: IProduct) {
        const existProduct = await this.validator.exist(product.code);
        if (existProduct)
            return this.forbidden({ message: 'Product Already Exist' });

        const dbProduct = await this.productBuilder.wantNew().build(product);
        return this.success(await dbProduct.save());
    }

    public async edit(product: IProduct) {
        const existProduct = await this.validator.exist(product.code);
        if (!existProduct)
            return this.notFound({ message: 'Product Not Found' });

        try {
            const dbProduct = await this.productBuilder
                .wantUpdate()
                .build(product);

            return this.success(await dbProduct.save());
        } catch (error) {
            return this.internalError(error);
        }
    }
}

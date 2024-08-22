import { Module } from '../base/module';
import { IProduct, Product } from '../mongoose/product.model';

export class ProductModule extends Module {
    public async create(product: IProduct) {
        const dbProduct = new Product({
            code: product.code,
            name: product.name,
            description: product.description,
            stock: product.stock,
        });

        const productSaved = await dbProduct.save();
        return this.success(productSaved);
    }
}

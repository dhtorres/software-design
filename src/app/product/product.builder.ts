import { IProduct, Product } from '../mongoose/product.model';

export class ProductBuilder {
    private isNew = false;
    private isUpdate = false;

    public wantNew() {
        if (this.isUpdate) throw 'Violación de Contrato';

        this.isNew = true;
        return this;
    }

    public wantUpdate() {
        if (this.isNew) throw 'Violación de Contrato';

        this.isUpdate = true;
        return this;
    }

    public async build(product: IProduct) {
        if (this.isNew) return this.new(product);
        if (this.isUpdate) return await this.update(product);

        return await Product.findOne({ code: product.code });
    }

    private new(product: IProduct) {
        return new Product({
            code: product.code,
            name: product.name,
            description: product.description,
            stock: product.stock,
        });
    }

    private async update(product: IProduct) {
        const dbProduct = await Product.findOne({ code: product.code });

        dbProduct.code = product.code;
        dbProduct.name = product.name;
        dbProduct.description = product.description;
        dbProduct.stock = product.stock;

        return dbProduct;
    }
}

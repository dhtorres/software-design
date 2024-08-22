import { Product } from '../mongoose/product.model';

export class Discounter {
    public async discount(code: string, quantity: number) {
        const product = await Product.findOne({ code });
        product.stock = product.stock - quantity;
        await product.save();
    }

    public async getStocks(): Promise<IStatus[]> {
        const products = await Product.find();

        const productStatus: IStatus[] = [];
        for (const product of products) {
            productStatus.push({ code: product.code, stock: product.stock });
        }

        return productStatus;
    }
}

interface IStatus {
    code: string;
    stock: number;
}

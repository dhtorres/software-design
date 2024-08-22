import { Module } from '../base/module';
import { IPurchase, Purchase } from '../mongoose/purchase.model';
import { Discounter } from './discounted.model';

export class PurchaseModule extends Module {
    private discounted = new Discounter();

    public async create(purchases: IPurchase[]) {
        for (const purchase of purchases) {
            await this.discounted.discount(purchase.code, purchase.quantity);

            const dbPurchase = new Purchase({
                id: purchase.id,
                code: purchase.code,
                quantity: purchase.quantity,
                userId: purchase.userId,
            });

            await dbPurchase.save();
        }

        const status = await this.discounted.getStocks();
        return this.success(status);
    }
}

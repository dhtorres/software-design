import { Express } from 'express';
import { PurchaseValidator } from './purchase.validator';
import { PurchaseController } from './purchase.controller';

export function purchaseRoutes(app: Express, prefix: string) {
    const url = prefix + '/purchase';
    const validator = new PurchaseValidator();

    app.post(url, validator.isValidPurchase, (req, res) =>
        new PurchaseController(req, res).create(),
    );
}

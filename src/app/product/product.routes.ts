import { Express } from 'express';
import { ProductValidator } from './product.validator';
import { ProductController } from './product.controller';

export function productRoutes(app: Express, prefix: string) {
    const url = prefix + '/product';
    const validator = new ProductValidator();

    app.post(url, validator.isAdmin, validator.isValidProduct, (req, res) =>
        new ProductController(req, res).create(),
    );

    app.put(url, validator.isAdmin, validator.isValidProduct, (req, res) =>
        new ProductController(req, res).edit(),
    );

    app.delete(url, validator.isAdmin, validator.isValidProduct, (req, res) =>
        new ProductController(req, res).delete(),
    );
}

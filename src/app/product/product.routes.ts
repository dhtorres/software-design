import { Express } from 'express';
import { ProductValidator } from './product.validator';
import { ProductController } from './product.controller';

export function productRoutes(app: Express, prefix: string) {
    const validator = new ProductValidator();

    app.post(
        prefix + '/product',
        validator.isAdmin,
        validator.isValidProduct,
        (req, res) => new ProductController(req, res).create(),
    );
}

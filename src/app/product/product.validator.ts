import { Request, Response } from 'express';

export class ProductValidator {
    public isValidRol(request: Request, response: Response, next: any) {
        next();
    }

    public isValidProduct(request: Request, response: Response, next: any) {
        next();
    }
}

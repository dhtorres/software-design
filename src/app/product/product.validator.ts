import { Request, Response } from 'express';
import { Validator } from '../base/validator';

export class ProductValidator extends Validator {
    public isValidProduct(request: Request, response: Response, next: any) {
        next();
    }
}

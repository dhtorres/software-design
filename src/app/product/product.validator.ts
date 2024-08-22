import { Request, Response } from 'express';
import { Validator } from '../base/validator';
import { body } from 'express-validator';

export class ProductValidator extends Validator {
    public isValidProduct(request: Request, response: Response, next: any) {
        const validations = [
            body('code')
                .notEmpty()
                .withMessage('Campo Requerido')
                .isString()
                .withMessage('El Campo debe ser String'),
            body('name')
                .notEmpty()
                .withMessage('Campo Requerido')
                .isString()
                .withMessage('El Campo debe ser String'),
            body('description')
                .notEmpty()
                .withMessage('Campo Requerido')
                .isString()
                .withMessage('El Campo debe ser String'),
            body('stock')
                .notEmpty()
                .withMessage('Campo Requerido')
                .isNumeric()
                .withMessage('El Campo debe ser Numérico'),
        ];

        return super.validateRequest(validations, request, response, next);
    }
}

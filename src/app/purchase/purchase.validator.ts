import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Validator } from '../base/validator';

export class PurchaseValidator extends Validator {
    public isValidPurchase(request: Request, response: Response, next: any) {
        const validations = [
            body('purchases')
                .isArray()
                .notEmpty()
                .withMessage('Campo Obligatorio'),
            body('purchases.*.id').notEmpty().withMessage('Campo Obligatorio'),
            body('purchases.*.code')
                .notEmpty()
                .withMessage('Campo Obligatorio'),
            body('purchases.*.quantity')
                .notEmpty()
                .withMessage('Campo Obligatorio'),
            body('purchases.*.userId')
                .notEmpty()
                .withMessage('Campo Obligatorio'),
        ];

        return super.validateRequest(validations, request, response, next);
    }
}

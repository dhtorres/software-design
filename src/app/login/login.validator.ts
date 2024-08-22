import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Validator } from '../base/validator';

export class LoginValidator extends Validator {
    public async isValidLogin(request: Request, response: Response, next: any) {
        const validations = [
            body('username').notEmpty().withMessage('Campo Requerido'),
            body('password').notEmpty().withMessage('Campo Requerido'),
        ];

        return super.validateRequest(validations, request, response, next);
    }
}

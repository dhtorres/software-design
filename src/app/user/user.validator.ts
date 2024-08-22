import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Validator } from '../base/validator';

export class UserValidator extends Validator {
    public async isValidUser(request: Request, response: Response, next: any) {
        const validations = [
            body('name').notEmpty().withMessage('Campo Obligatorio'),
            body('lastName').notEmpty(),
            body('username').notEmpty(),
            body('password').notEmpty(),
            body('email').notEmpty(),
            body('rol').notEmpty(),
        ];

        return super.validateRequest(validations, request, response, next);
    }
}

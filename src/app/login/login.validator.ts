import { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../base/validator';

export async function loginValidator(
    request: Request,
    response: Response,
    next: any,
) {
    const validations = [
        body('username').notEmpty().withMessage('Campo Requerido'),
        body('password').notEmpty().withMessage('Campo Requerido'),
    ];

    return validateRequest(validations, request, response, next);
}

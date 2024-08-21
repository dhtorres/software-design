import { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../base/validator';

export async function userValidator(
    request: Request,
    response: Response,
    next: any,
) {
    const validations = [
        body('name').notEmpty().withMessage('Campo Obligatorio'),
        body('lastName').notEmpty(),
        body('username').notEmpty(),
        body('password').notEmpty(),
        body('email').notEmpty(),
        body('rol').notEmpty(),
    ];

    return validateRequest(validations, request, response, next);
}

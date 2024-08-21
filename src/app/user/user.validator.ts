import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export async function userValidator(
    request: Request,
    response: Response,
    next: any,
) {
    const validations = [
        body('name').notEmpty().withMessage('Campo Obligatorio'),
        body('lastName').notEmpty(),
        body('userName').notEmpty(),
        body('password').notEmpty(),
        body('email').notEmpty(),
        body('rol').notEmpty(),
    ];

    for (const validation of validations) await validation.run(request);

    const result = validationResult(request);

    if (result.isEmpty()) return next();

    return response.status(400).send(result.array());
}

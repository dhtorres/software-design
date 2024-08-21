import { Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export async function validateRequest(
    validations: ValidationChain[],
    request: Request,
    response: Response,
    next: any,
) {
    for (const validation of validations) await validation.run(request);
    const result = validationResult(request);

    if (result.isEmpty()) return next();
    return response.status(400).send(result.array());
}

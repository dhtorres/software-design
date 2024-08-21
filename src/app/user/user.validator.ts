import { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../base/validator';
import { IToken, Token } from '../login/token.model';
import { Rol } from '../mongoose/rol.enum';

export class UserValidator {
    public async isValidCreate(
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

    public async isValidRol(request: Request, response: Response, next: any) {
        if (!request.headers.authorization)
            return response
                .status(401)
                .send({ message: 'Authorization Header is Empty' });

        let user: IToken;
        try {
            user = new Token().decode(request.headers.authorization) as IToken;
        } catch (error) {
            return response.status(401).send({ message: 'Invalid Token' });
        }

        if (user.rol !== Rol.ADMIN)
            return response.status(401).send({ message: 'Action Not Allowed' });

        next();
    }
}

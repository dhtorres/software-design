import { Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { IToken, Token } from '../login/token.model';
import { Rol } from '../mongoose/rol.enum';

const _token = new Token();

export class Validator {
    protected async validateRequest(
        validations: ValidationChain[],
        request: Request,
        response: Response,
        next: any,
    ) {
        for (const validation of validations) await validation.run(request);
        const result = validationResult(request);

        if (result.isEmpty()) return next();
        return badRequest(response, result.array());
    }

    public isAdmin(request: Request, response: Response, next: any) {
        if (!hasAuthorization(request))
            return unauthorize(response, 'Authorization Header is Empty');

        if (!isValidToken(request.headers.authorization))
            return unauthorize(response, 'Invalid Token');

        if (!isAdmin(request.headers.authorization))
            return unauthorize(response, 'Action Not Allowed');

        next();
    }
}

function isValidToken(token: string) {
    return _token.isValid(token);
}

function isAdmin(token: string) {
    const user = _token.decode(token) as IToken;
    return user.rol === Rol.ADMIN;
}

function hasAuthorization(request: Request) {
    return !!request.headers.authorization;
}

function unauthorize(response: Response, message: string) {
    return response.status(401).send({ message });
}

function badRequest(response: Response, message: any) {
    return response.status(400).send(message);
}

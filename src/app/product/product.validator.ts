import { Request, Response } from 'express';
import { IToken, Token } from '../login/token.model';
import { Rol } from '../mongoose/rol.enum';

export class ProductValidator {
    public isValidRol(request: Request, response: Response, next: any) {
        if (!request.headers.authorization)
            return unauthorize(response, 'Authorization Header is Empty');

        let user: IToken;
        try {
            user = new Token().decode(request.headers.authorization) as IToken;
        } catch (error) {
            return unauthorize(response, 'Invalid Token');
        }

        if (user.rol !== Rol.ADMIN)
            return unauthorize(response, 'Action Not Allowed');

        next();
    }

    public isValidProduct(request: Request, response: Response, next: any) {
        next();
    }
}

function unauthorize(response: Response, message: string) {
    return response.status(401).send({ message });
}

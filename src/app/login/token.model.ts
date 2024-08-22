import * as jwt from 'jsonwebtoken';
import { JWT } from '../../environment/environment';

export class Token {
    public sign(user: IToken) {
        return jwt.sign(user, JWT.KEY);
    }

    public decode(token: string) {
        const parsedToken = token.split(' ')[1];
        return jwt.verify(parsedToken, JWT.KEY);
    }

    public isValid(token: string) {
        const parsedToken = token.split(' ')[1];
        const decodedToken = jwt.decode(parsedToken);
        return !!decodedToken;
    }
}

export interface IToken {
    username: string;
    name: string;
    lastName: string;
    email: string;
    rol: string;
}

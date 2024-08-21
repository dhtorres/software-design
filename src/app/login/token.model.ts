import * as jwt from 'jsonwebtoken';
import { JWT } from '../../environment/environment';

export class Token {
    public sign(user: IToken) {
        return jwt.sign(user, JWT.KEY);
    }

    public decode(token: string) {
        return jwt.verify(token, JWT.KEY);
    }
}

export interface IToken {
    username: string;
    name: string;
    lastName: string;
    email: string;
    rol: string;
}

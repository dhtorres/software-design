import * as jwt from 'jsonwebtoken';

export class Token {
    private key = 'super-key-secreta';

    public sign(user: IToken) {
        return jwt.sign(user, this.key);
    }

    public decode(token: string) {
        return jwt.verify(token, this.key);
    }
}

interface IToken {
    name: string;
    lastName: string;
    email: string;
    rol: string;
}

import { Module } from '../base/module';
import { User } from '../mongoose/user.model';
import { Token } from './token.model';
import { IUser } from './user.interface';

export class LoginModule extends Module {
    private token = new Token();

    public async login(user: IUser) {
        const dbUser = await User.findOne({ username: user.username });

        if (!dbUser) return this.notFound();
        if (dbUser.password !== user.password) return this.unauthorize();

        const token = this.token.sign({
            username: dbUser.username,
            name: dbUser.name,
            lastName: dbUser.lastName,
            email: dbUser.email,
            rol: dbUser.rol,
        });

        return this.success({ token });
    }
}

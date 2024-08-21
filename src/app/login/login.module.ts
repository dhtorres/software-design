import { Module } from '../base/module';
import { User } from '../mongoose/user.model';
import { IUser } from './user.interface';

export class LoginModule extends Module {
    public async login(user: IUser) {
        const dbUser = await User.findOne({ username: user.username });

        if (!dbUser) return this.notFound();
        if (dbUser.password !== user.password) return this.unauthorize();

        return this.success({ token: 'super-ultra-mega-token' });
    }
}

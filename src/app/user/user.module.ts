import { Module } from '../base/module';
import { IUser, User } from '../mongoose/user.model';

//TODO-dtorres: la operación debe ser ejecutada solo por el admin
export class UserModule extends Module {
    public async create(user: IUser) {
        const dbUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            password: user.password,
            rol: user.rol,
        });

        await dbUser.save();
        return this.success(user);
    }
}

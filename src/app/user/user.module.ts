import { Module } from '../base/module';
import { IUser, User } from '../mongoose/user.model';

//TODO-dtorres: el username y email son únicos; controlar excepción al insertar
export class UserModule extends Module {
    public async create(user: IUser) {
        const dbUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            rol: user.rol,
        });

        const savedUser = await dbUser.save();
        return this.success(savedUser);
    }
}

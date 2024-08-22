import { Module } from '../base/module';
import { IUser } from '../mongoose/user.model';
import { UserFactory } from './user.factory';
import { UserValidator } from './user.validator';

export class UserModule extends Module {
    private userFactory = new UserFactory();
    private validator = new UserValidator();

    public async create(user: IUser) {
        const existUsername = await this.validator.existUsername(user);
        if (existUsername)
            return this.forbidden({ message: 'Username Already Exist' });

        const existEmail = await this.validator.existEmail(user);
        if (existEmail)
            return this.forbidden({ message: 'Email Already Exist' });

        try {
            const savedUser = await this.userFactory.build(user).save();
            return this.success(savedUser);
        } catch (error) {
            return this.internalError(error);
        }
    }

    public async edit(user: IUser) {}
}

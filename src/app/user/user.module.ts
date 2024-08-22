import { Module } from '../base/module';
import { IUser } from '../mongoose/user.model';
import { UserBuilder } from './user.builder';
import { UserValidator } from './user.validator';

export class UserModule extends Module {
    private userBuilder = new UserBuilder();
    private validator = new UserValidator();

    public async create(user: IUser) {
        const existUsername = await this.validator.existUsername(user);
        if (existUsername)
            return this.forbidden({ message: 'Username Already Exist' });

        const existEmail = await this.validator.existEmail(user);
        if (existEmail)
            return this.forbidden({ message: 'Email Already Exist' });

        try {
            const savedUser = await this.userBuilder.wantNew().build(user);

            return this.success(await savedUser.save());
        } catch (error) {
            return this.internalError(error);
        }
    }

    public async edit(user: IUser) {
        try {
            const updatedUser = await this.userBuilder
                .wantUpdate()
                .findByEmail()
                .build(user);

            return this.success(await updatedUser.save());
        } catch (error) {
            return this.internalError(error);
        }
    }
}

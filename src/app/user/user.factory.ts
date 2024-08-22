import { IUser, User } from '../mongoose/user.model';

export class UserFactory {
    public build(user: IUser) {
        return new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            rol: user.rol,
        });
    }
}

import { IUser, User } from '../mongoose/user.model';

export class UserBuilder {
    private isNew = false;
    private isUpdate = false;
    private isSearchByEmail = false;
    private isSearchByUsername = false;

    public wantNew() {
        if (this.isSearchByUsername || this.isSearchByEmail)
            throw 'Violación de Contrato';

        this.isNew = true;
        return this;
    }

    public wantUpdate() {
        this.isUpdate = true;
        return this;
    }

    public findByEmail() {
        if (this.isSearchByUsername || this.isNew)
            throw 'Violación de Contrato';

        this.isSearchByEmail = true;
        return this;
    }

    public findByUsername() {
        if (this.isSearchByEmail || this.isNew) throw 'Violación de Contrato';

        this.isSearchByUsername = true;
        return this;
    }

    public async build(user: IUser) {
        if (this.isNew) return this.new(user);
        if (this.isUpdate) return await this.update(user);
    }

    private new(user: IUser) {
        return new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            rol: user.rol,
        });
    }

    private async update(user: IUser) {
        if (this.isSearchByEmail) return await this.findForEmail(user);
        return await this.findForUsername(user);
    }

    private async findForEmail(user: IUser) {
        const dbUser = await User.findOne({ email: user.email });

        dbUser.name = user.name;
        dbUser.lastName = user.lastName;
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.email = user.email;
        dbUser.rol = user.rol;

        return dbUser;
    }

    private async findForUsername(user: IUser) {
        const dbUser = await User.findOne({ username: user.username });

        dbUser.name = user.name;
        dbUser.lastName = user.lastName;
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.email = user.email;
        dbUser.rol = user.rol;

        return dbUser;
    }
}

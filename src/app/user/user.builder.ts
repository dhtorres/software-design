import { contract } from '../base/contract';
import { IUser, User } from '../mongoose/user.model';

export class UserBuilder {
    private isNew = false;
    private isUpdate = false;
    private isSearchByEmail = false;
    private isSearchByUsername = false;

    public wantNew() {
        contract.mustBeFalse(this.isSearchByUsername);
        contract.mustBeFalse(this.isSearchByEmail);
        contract.mustBeFalse(this.isUpdate);

        this.isNew = true;
        return this;
    }

    public wantUpdate() {
        contract.mustBeFalse(this.isNew);

        this.isUpdate = true;
        return this;
    }

    public findByEmail() {
        contract.mustBeFalse(this.isNew);
        contract.mustBeFalse(this.isSearchByUsername);

        this.isSearchByEmail = true;
        return this;
    }

    public findByUsername() {
        contract.mustBeFalse(this.isSearchByEmail);
        contract.mustBeFalse(this.isNew);

        this.isSearchByUsername = true;
        return this;
    }

    public async build(user: IUser) {
        if (this.isNew) return this.new(user);
        if (this.isUpdate) return await this.update(user);

        if (!this.isNew && !this.isUpdate) return await this.delete(user);
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
        const dbUser = await this.searchByEmail(user.email);

        dbUser.name = user.name;
        dbUser.lastName = user.lastName;
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.email = user.email;
        dbUser.rol = user.rol;

        return dbUser;
    }

    private async findForUsername(user: IUser) {
        const dbUser = await this.searchByUsername(user.username);

        dbUser.name = user.name;
        dbUser.lastName = user.lastName;
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.email = user.email;
        dbUser.rol = user.rol;

        return dbUser;
    }

    private async delete(user: IUser) {
        if (this.isSearchByEmail) return await this.searchByEmail(user.email);
        return await this.searchByUsername(user.username);
    }

    private async searchByEmail(email: string) {
        return await User.findOne({ email });
    }

    private async searchByUsername(username: string) {
        return await User.findOne({ username });
    }
}

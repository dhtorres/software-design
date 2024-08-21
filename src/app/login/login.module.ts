import { Module } from '../base/module';

export class LoginModule extends Module {
    public async login() {
        return this.success({});
    }
}

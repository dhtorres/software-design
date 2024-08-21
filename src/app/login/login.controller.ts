import { Controller } from '../base/controller';

export class LoginController extends Controller {
    public async login() {
        return this.response.status(200).send();
    }
}

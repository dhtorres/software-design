import { Controller } from '../base/controller';
import { LoginModule } from './login.module';

export class LoginController extends Controller {
    private module = new LoginModule();

    public async login() {
        return await this.resolve(this.module.login(this.request.body));
    }
}

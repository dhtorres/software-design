import { Controller } from '../base/controller';
import { UserModule } from './user.module';

export class UserController extends Controller {
    private module = new UserModule();

    public async create() {
        return await this.resolve(this.module.create(this.request.body));
    }

    public async edit() {
        return await this.resolve(this.module.edit(this.request.body));
    }
}

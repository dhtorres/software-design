import { Controller } from '../base/controller';

export class HealthController extends Controller {
    public async check() {
        return this.response.status(204).send();
    }
}

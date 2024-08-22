import { Controller } from '../base/controller';
import { PurchaseModule } from './purchase.module';

export class PurchaseController extends Controller {
    private module = new PurchaseModule();

    public async create() {
        return this.resolve(this.module.create(this.request.body.purchases));
    }
}

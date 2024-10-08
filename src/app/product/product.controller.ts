import { Controller } from '../base/controller';
import { ProductModule } from './product.module';

export class ProductController extends Controller {
    private module = new ProductModule();

    public async create() {
        return this.resolve(this.module.create(this.request.body));
    }

    public async edit() {
        return this.resolve(this.module.edit(this.request.body));
    }

    public async delete() {
        return this.resolve(this.module.delete(this.request.body));
    }

    public async getAll() {
        return this.resolve(this.module.getAll());
    }
}

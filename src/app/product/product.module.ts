import { Module } from '../base/module';

export class ProductModule extends Module {
    public async create() {
        return this.success({ test: 'test' });
    }
}

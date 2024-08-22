import { model, Schema } from 'mongoose';

export interface IProduct {
    code: string;
    name: string;
    description: string;
    stock: number;
}

const schema = new Schema<IProduct>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
});

export const Product = model<IProduct>('Product', schema);

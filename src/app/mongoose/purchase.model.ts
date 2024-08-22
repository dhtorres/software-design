import { model, Schema, Types } from 'mongoose';

export interface IPurchase {
    id: string;
    code: string;
    quantity: number;
    userId: Types.ObjectId | string;
}

const schema = new Schema<IPurchase>({
    id: { type: String, required: true },
    code: { type: String, required: true },
    quantity: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Purchase = model<IPurchase>('Purchase', schema);

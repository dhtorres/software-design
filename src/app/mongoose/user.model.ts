import { model, Schema } from 'mongoose';
import { Rol } from './rol.enum';

interface IUser {
    name: string;
    email: string;
    rol: Rol;
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rol: { type: String, required: true },
});

export const User = model<IUser>('User', schema);

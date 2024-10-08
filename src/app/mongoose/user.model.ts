import { model, Schema } from 'mongoose';
import { Rol } from './rol.enum';

export interface IUser {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    rol: Rol;
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
});

export const User = model<IUser>('User', schema);

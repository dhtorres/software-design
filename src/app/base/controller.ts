import { Request, Response } from 'express';
import { Payload } from './payload';

export class Controller {
    constructor(
        protected request: Request,
        protected response: Response,
    ) {}

    protected async resolve(payload: Promise<Payload>) {
        try {
            const res = await payload;
            return this.response.status(res.code).send(res.data);
        } catch (error) {
            console.log(error);
        }
    }
}

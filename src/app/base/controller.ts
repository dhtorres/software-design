import { Request, Response } from 'express';

export class Controller {
    constructor(
        protected request: Request,
        protected response: Response,
    ) {}
}

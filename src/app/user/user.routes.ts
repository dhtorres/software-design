import { Express } from 'express';
import { base } from '../../routes';
import { UserController } from './user.controller';
import { userValidator } from './user.validator';

export function userRoutes(app: Express, prefix: string) {
    app.post(base + '/user', userValidator, (req, res) =>
        new UserController(req, res).create(),
    );
}

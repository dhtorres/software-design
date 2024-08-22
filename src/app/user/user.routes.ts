import { Express } from 'express';
import { UserController } from './user.controller';
import { UserValidator } from './user.validator';

export function userRoutes(app: Express, prefix: string) {
    const validator = new UserValidator();

    app.post(
        prefix + '/user',
        validator.isAdmin,
        validator.isValidUser,
        (req, res) => new UserController(req, res).create(),
    );
}

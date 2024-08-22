import { Express } from 'express';
import { UserController } from './user.controller';
import { UserValidator } from './user.validator';

export function userRoutes(app: Express, prefix: string) {
    const url = prefix + '/user';
    const validator = new UserValidator();

    app.post(url, validator.isAdmin, validator.isValidUser, (req, res) =>
        new UserController(req, res).create(),
    );

    app.put(url, validator.isAdmin, validator.isValidUser, (req, res) =>
        new UserController(req, res).edit(),
    );

    app.delete(url, validator.isAdmin, validator.isValidUser, (req, res) =>
        new UserController(req, res).delete(),
    );
}

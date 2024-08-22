import { Express } from 'express';
import { LoginController } from './login.controller';
import { LoginValidator } from './login.validator';

export function loginRoutes(app: Express, prefix: string): void {
    const validator = new LoginValidator();

    app.post(prefix + '/login', validator.isValidLogin, (req, res) =>
        new LoginController(req, res).login(),
    );
}

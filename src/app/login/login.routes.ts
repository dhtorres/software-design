import { Express } from 'express';
import { LoginController } from './login.controller';
import { loginValidator } from './login.validator';

export function loginRoutes(app: Express, prefix: string): void {
    app.post(prefix + '/login', loginValidator, (req, res) =>
        new LoginController(req, res).login(),
    );
}

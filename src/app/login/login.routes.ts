import { Express } from 'express';
import { LoginController } from './login.controller';

export function loginRoutes(app: Express, prefix: string): void {
    app.get(prefix + '/login', (req, res) =>
        new LoginController(req, res).login(),
    );
}

import { Express } from 'express';
import { healthRoutes } from '../app/health/health.routes';
import { loginRoutes } from '../app/login/login.routes';
import { userRoutes } from '../app/user/user.routes';

export const base = '/api/v1';

export function appRoutes(app: Express) {
    healthRoutes(app, base);
    loginRoutes(app, base);
    userRoutes(app, base);
}

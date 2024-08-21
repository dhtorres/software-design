import { Request, Response } from 'express';
import { LoginController } from '../../../src/app/login/login.controller';
import { createRequest, createResponse } from 'node-mocks-http';
import { LoginModule } from '../../../src/app/login/login.module';

describe('Login Controller', () => {
    let controller: LoginController;
    let request: Request;
    let response: Response;

    beforeEach(() => {
        request = createRequest();
        response = createResponse();
        controller = new LoginController(request, response);
    });

    test('login Return StatusCode 200 ', async () => {
        LoginModule.prototype.login = jest
            .fn()
            .mockResolvedValue({ code: 200 });

        const result = await controller.login();

        expect(result.statusCode).toBe(200);
    });
});

import { Request, Response } from 'express';
import { LoginController } from '../../../src/app/login/login.controller';
import { createRequest, createResponse } from 'node-mocks-http';

describe('Login Controller', () => {
    let controller: LoginController;
    let request: Request;
    let response: any;

    beforeEach(() => {
        request = createRequest();
        response = createResponse();
        controller = new LoginController(request, response);
    });

    test('login Return StatusCode 200 ', async () => {
        const result = await controller.login();

        expect(result.statusCode).toBe(200);
    });
});

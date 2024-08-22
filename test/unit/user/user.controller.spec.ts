import { Request, Response } from 'express';
import { UserController } from '../../../src/app/user/user.controller';
import { createRequest, createResponse } from 'node-mocks-http';
import { UserModule } from '../../../src/app/user/user.module';

describe('User Controller', () => {
    let controller: UserController;
    let request: Request;
    let response: Response;

    beforeEach(() => {
        request = createRequest();
        response = createResponse();
        controller = new UserController(request, response);
    });

    test('my test', async () => {
        UserModule.prototype.create = jest
            .fn()
            .mockResolvedValue({ code: 200 });

        const result = await controller.create();

        expect(result.statusCode).toBe(200);
    });
});

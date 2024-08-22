import { Rol } from '../../../src/app/mongoose/rol.enum';
import { IUser, User } from '../../../src/app/mongoose/user.model';
import { UserModule } from '../../../src/app/user/user.module';

describe('User Module', () => {
    let module: UserModule;

    const user: IUser = {
        name: 'Awesome Name',
        lastName: 'Awesome LastName',
        email: 'awesome@email.com',
        username: 'awesome',
        password: 'awesome-password',
        rol: Rol.ADMIN,
    };

    beforeEach(() => {
        module = new UserModule();
    });

    test('create Return User', async () => {
        User.findOne = jest.fn().mockResolvedValue(undefined);

        const savedUser = {
            id: 'awesome-id',
        };

        User.prototype.save = jest.fn().mockResolvedValue(savedUser);

        const result = await module.create(user);

        const expected = { code: 200, data: savedUser };
        expect(result).toEqual(expected);
    });

    test('create Return Forbidden | Username Already Exist', async () => {
        User.findOne = jest.fn().mockResolvedValue({});

        const result = await module.create(user);

        const expected = {
            code: 403,
            data: { message: 'Username Already Exist' },
        };

        expect(result).toEqual(expected);
    });

    test('create Return Forbidden | Email Already Exist', async () => {
        User.findOne = jest
            .fn()
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue({});

        const result = await module.create(user);

        const expected = {
            code: 403,
            data: { message: 'Email Already Exist' },
        };

        expect(result).toEqual(expected);
    });

    test('create Return Internal Error', async () => {
        User.findOne = jest
            .fn()
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue(undefined);

        User.prototype.save = jest.fn().mockImplementation(() => {
            throw 'Test Exception';
        });

        const result = await module.create(user);

        const expected = {
            code: 500,
            data: 'Test Exception',
        };

        expect(result).toEqual(expected);
    });

    test('edit Return Internal Error', async () => {
        User.findOne = jest.fn().mockResolvedValue({
            async save() {
                throw 'Test Exception';
            },
        });

        const result = await module.edit(user);

        const expected = {
            code: 500,
            data: 'Test Exception',
        };

        expect(result).toEqual(expected);
    });
});

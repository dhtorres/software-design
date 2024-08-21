import { Payload } from './payload';

export class Module {
    protected success(payload: any): Payload {
        return { code: 200, data: payload };
    }

    protected notFound(payload?: any): Payload {
        return { code: 404, data: payload };
    }
}

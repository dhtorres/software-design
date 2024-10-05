import { server } from './server/server';
import { APPLICATION, MONGO } from './environment/environment';
import { connect } from 'mongoose';

async function main() {
    try {
        server.listen(APPLICATION.PORT);
        console.log(`Server listening on port ${APPLICATION.PORT}`);

        await connect(MONGO.CONNECTION_STRING);
    } catch (error) {
        console.log(error);
    }
}

main();

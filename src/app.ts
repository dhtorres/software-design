import { server } from './server/server';
import { APPLICATION } from './environment/environment';
import { connect } from 'mongoose';

async function main() {
    try {
        server.listen(APPLICATION.PORT);
        console.log(`Server listening on port ${APPLICATION.PORT}`);

        await connect('mongodb://localhost:27017/software-design');
    } catch (error) {
        console.log(error);
    }
}

main();

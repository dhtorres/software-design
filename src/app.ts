import { server } from './server/server';
import { APPLICATION } from './environment/environment';

function main() {
    try {
        server.listen(APPLICATION.PORT);
        console.log(`Server listening on port ${APPLICATION.PORT}`);
    } catch (error) {
        console.log(error);
    }
}

main();

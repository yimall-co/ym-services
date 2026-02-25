import 'source-map-support/register';

import {
    createApp,
    Config,
    Logger,
    ServiceManager
} from '@foal/core';

import { AppController } from 'presentation/app.controller';

async function main() {
    const serviceManager = new ServiceManager();
    const logger = serviceManager.get(Logger);

    const app = await createApp(AppController, { serviceManager });

    const port = Config.get('port', 'number', 3001);
    app.listen(port, () => logger.info(`Listening on port ${port}...`));
}

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
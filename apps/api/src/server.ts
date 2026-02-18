import 'lib/di';

import fastify from 'fastify';

async function init(): Promise<void> { }

async function bootstrap(): Promise<void> {
    const server = fastify({
        logger: true,
    });

    const port = +(process.env.PORT ?? 4000);

    const address = await server.listen({ port });
    console.log('Server listening at: ', address);
}

init()
    .then(bootstrap)
    .catch((error) => console.error(error));
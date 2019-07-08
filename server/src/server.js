'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
    });

    await server.register(Inert);

    // Serve static content on root route
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

    // Serve 404 for anything not found
    server.route({
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {

            return '404 Error! Page Not Found!';
        }
    });    

    await server.start();
    server.log(['init'], 'Server running on %s', server.info.uri);
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
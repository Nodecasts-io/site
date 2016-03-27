'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('inert'), (err) => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hello, world!');
    }
  });

  server.start((err) => {

      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
  });
});


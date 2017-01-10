'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    cache: [{
      name: 'redis',
      engine: require('catbox-redis'),
      host: 'pizza-redis.74de1x.0001.usw2.cache.amazonaws.com',
      partition: 'cache'
    }]
});

server.connection({ port: process.env.PORT || 3000 });

function startServer() {
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });
}

require('./plugins.js').registerPlugins(server, (err) => {
  if (err) throw err;
  require('./routes.js').registerRoutes(server);
  startServer();
});

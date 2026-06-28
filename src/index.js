'use strict';

const { createApp } = require('./app');

const app = createApp(process.env);

app.server.listen(app.config.service.port, app.config.service.host, () => {
  console.log(
    `BFM integration starter listening on ${app.config.service.host}:${app.config.service.port} (${app.config.service.environment})`,
  );
});

'use strict';

const { createProvider } = require('../provider-factory');

function createMysqlStorageProvider(config) {
  const configured = Boolean(config.credentials.mysqlUrl);
  return createProvider({
    name: 'mysql',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'mysql', payload }),
    },
  });
}

module.exports = { createMysqlStorageProvider };

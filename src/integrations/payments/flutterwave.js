'use strict';

const { createProvider } = require('../provider-factory');

function createFlutterwaveProvider(config) {
  const configured = Boolean(config.credentials.flutterwaveSecretKey);
  return createProvider({
    name: 'flutterwave',
    configured,
    actions: {
      createCharge: async (payload) => ({ success: true, provider: 'flutterwave', payload }),
    },
  });
}

module.exports = { createFlutterwaveProvider };

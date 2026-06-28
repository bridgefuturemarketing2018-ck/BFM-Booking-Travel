'use strict';

const { createProvider } = require('../provider-factory');

function createPaypalProvider(config) {
  const configured = Boolean(config.credentials.paypalClientId && config.credentials.paypalSecret);
  return createProvider({
    name: 'paypal',
    configured,
    actions: {
      createOrder: async (payload) => ({ success: true, provider: 'paypal', payload }),
    },
  });
}

module.exports = { createPaypalProvider };

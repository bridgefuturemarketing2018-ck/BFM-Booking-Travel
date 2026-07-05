'use strict';

const { createProvider } = require('../provider-factory');

function createPaystackProvider(config) {
  const configured = Boolean(config.credentials.paystackSecretKey);
  return createProvider({
    name: 'paystack',
    configured,
    actions: {
      initializeTransaction: async (payload) => ({ success: true, provider: 'paystack', payload }),
    },
  });
}

module.exports = { createPaystackProvider };

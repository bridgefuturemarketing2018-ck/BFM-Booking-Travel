'use strict';

const { createProvider } = require('../provider-factory');

function createStripeProvider(config) {
  const configured = Boolean(config.credentials.stripeSecretKey);
  return createProvider({
    name: 'stripe',
    configured,
    actions: {
      createPaymentIntent: async (payload) => ({ success: true, provider: 'stripe', payload }),
    },
  });
}

module.exports = { createStripeProvider };

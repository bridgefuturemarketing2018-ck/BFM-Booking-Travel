'use strict';

const { createStripeProvider } = require('./stripe');
const { createPaypalProvider } = require('./paypal');
const { createPaystackProvider } = require('./paystack');
const { createFlutterwaveProvider } = require('./flutterwave');

function createPaymentProvider(config) {
  const providers = {
    stripe: createStripeProvider(config),
    paypal: createPaypalProvider(config),
    paystack: createPaystackProvider(config),
    flutterwave: createFlutterwaveProvider(config),
  };

  return providers[config.providers.payment] || providers.stripe;
}

module.exports = {
  createPaymentProvider,
};

'use strict';

const { createProvider } = require('../provider-factory');

function createSendgridProvider(config) {
  const configured = Boolean(config.credentials.sendgridApiKey);
  return createProvider({
    name: 'sendgrid',
    configured,
    actions: {
      sendEmail: async (payload) => ({ success: true, provider: 'sendgrid', payload }),
    },
  });
}

module.exports = { createSendgridProvider };

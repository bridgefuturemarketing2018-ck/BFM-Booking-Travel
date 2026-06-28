'use strict';

const { createProvider } = require('../provider-factory');

function createMailgunProvider(config) {
  const configured = Boolean(config.credentials.mailgunApiKey);
  return createProvider({
    name: 'mailgun',
    configured,
    actions: {
      sendEmail: async (payload) => ({ success: true, provider: 'mailgun', payload }),
    },
  });
}

module.exports = { createMailgunProvider };

'use strict';

const { createProvider } = require('../provider-factory');

function createSmtpProvider(config) {
  const configured = Boolean(config.credentials.smtpHost && config.credentials.smtpUser && config.credentials.smtpPass);
  return createProvider({
    name: 'smtp',
    configured,
    actions: {
      sendEmail: async (payload) => ({ success: true, provider: 'smtp', payload }),
    },
  });
}

module.exports = { createSmtpProvider };

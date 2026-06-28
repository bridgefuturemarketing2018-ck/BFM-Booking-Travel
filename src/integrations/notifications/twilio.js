'use strict';

const { createProvider } = require('../provider-factory');

function createTwilioProvider(config) {
  const configured = Boolean(config.credentials.twilioSid && config.credentials.twilioToken);
  return createProvider({
    name: 'twilio',
    configured,
    actions: {
      sendSms: async (payload) => ({ success: true, provider: 'twilio', payload }),
    },
  });
}

module.exports = { createTwilioProvider };

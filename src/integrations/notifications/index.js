'use strict';

const { createTwilioProvider } = require('./twilio');
const { createSendgridProvider } = require('./sendgrid');
const { createSmtpProvider } = require('./smtp');
const { createMailgunProvider } = require('./mailgun');

function createNotificationProvider(config) {
  const providers = {
    twilio: createTwilioProvider(config),
    sendgrid: createSendgridProvider(config),
    smtp: createSmtpProvider(config),
    mailgun: createMailgunProvider(config),
  };

  return providers[config.providers.notification] || providers.sendgrid;
}

module.exports = {
  createNotificationProvider,
};

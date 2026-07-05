'use strict';

const { createProvider } = require('../provider-factory');

function createS3Provider(config) {
  const configured = Boolean(config.credentials.s3Bucket);
  return createProvider({
    name: 's3',
    configured,
    actions: {
      upload: async (payload) => ({ success: true, provider: 's3', payload }),
    },
  });
}

module.exports = { createS3Provider };

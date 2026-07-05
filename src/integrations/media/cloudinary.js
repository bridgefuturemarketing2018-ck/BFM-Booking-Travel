'use strict';

const { createProvider } = require('../provider-factory');

function createCloudinaryProvider(config) {
  const configured = Boolean(config.credentials.cloudinaryCloudName);
  return createProvider({
    name: 'cloudinary',
    configured,
    actions: {
      upload: async (payload) => ({ success: true, provider: 'cloudinary', payload }),
    },
  });
}

module.exports = { createCloudinaryProvider };

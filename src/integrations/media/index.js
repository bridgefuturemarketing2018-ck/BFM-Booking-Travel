'use strict';

const { createS3Provider } = require('./s3');
const { createCloudinaryProvider } = require('./cloudinary');

function createMediaProvider(config) {
  const providers = {
    s3: createS3Provider(config),
    cloudinary: createCloudinaryProvider(config),
  };

  return providers[config.providers.media] || providers.s3;
}

module.exports = {
  createMediaProvider,
};

'use strict';

const { createGoogleMapsProvider } = require('./google-maps');
const { createMapboxProvider } = require('./mapbox');

function createMapsProvider(config) {
  const providers = {
    'google-maps': createGoogleMapsProvider(config),
    mapbox: createMapboxProvider(config),
  };

  return providers[config.providers.maps] || providers['google-maps'];
}

module.exports = {
  createMapsProvider,
};

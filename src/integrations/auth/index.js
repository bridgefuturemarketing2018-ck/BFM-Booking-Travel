'use strict';

const { createOAuthProvider } = require('./oauth');
const { createAuth0Provider } = require('./auth0');
const { createFirebaseAuthProvider } = require('./firebase-auth');

function createAuthProvider(config) {
  const providers = {
    oauth: createOAuthProvider(config),
    auth0: createAuth0Provider(config),
    'firebase-auth': createFirebaseAuthProvider(config),
  };

  return providers[config.providers.auth] || providers.oauth;
}

module.exports = {
  createAuthProvider,
};
